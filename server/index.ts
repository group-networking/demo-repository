import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import { handleDemo } from "./routes/demo";
import { handleProjects } from "./routes/projects";

export function createServer() {
  const app = express();

  // Trust proxy (if behind reverse proxy) so secure cookies work
  if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

  // Block requests for source map files for security (returns 404)
  app.use((req, res, next) => {
    if (req.path.endsWith('.map')) return res.status(404).end();
    next();
  });

  // Helmet for secure headers
  app.use(helmet());

  // Basic rate limiter
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // Logging
  if (process.env.NODE_ENV !== 'test') app.use(morgan('combined'));

  // Set a restrictive CSP in production to reduce risk of injected scripts
  // Note: helmet already sets some headers, but we explicitly add CSP for clarity
  if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
      );
      next();
    });
  }

  // Cookies & sessions (httpOnly, secure in production)
  app.use(cookieParser());
  app.use(
    session({
      name: process.env.SESSION_NAME || 'sid',
      secret: process.env.SESSION_SECRET || 'change-this-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );

  // CORS: restrict to allowed origins from env if provided
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  if (allowed.length > 0) {
    app.use(cors({ origin: allowed }));
  } else {
    app.use(cors());
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Simple auth middleware using session
  function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    if ((req as any).session && (req as any).session.user) return next();
    res.status(401).json({ error: 'Unauthorized' });
  }

  // Auth endpoints (example, replace with real auth in production)
  app.post('/api/login', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing name' });
    (req as any).session.user = { name };
    res.json({ ok: true, user: (req as any).session.user });
  });

  app.post('/api/logout', (req, res) => {
    (req as any).session.destroy((err: any) => {
      if (err) return res.status(500).json({ error: 'Failed to logout' });
      res.json({ ok: true });
    });
  });

  app.get('/api/me', (req, res) => {
    res.json({ user: (req as any).session?.user || null });
  });

  // Example API routes (protected)
  app.get('/api/ping', (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? 'ping';
    res.json({ message: ping });
  });

  // Protect demo and projects endpoints
  app.get('/api/demo', requireAuth, handleDemo);
  app.get('/api/projects', requireAuth, handleProjects);

  return app;
}

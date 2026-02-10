import { loginService } from "../services/auth.service.js";

export function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    const result = loginService(email, password);

    res.json(result);
}

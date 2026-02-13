import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server rodando na porta 3000");
});

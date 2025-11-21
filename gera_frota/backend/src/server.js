import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import veiculosRouter from "./routes/veiculos.js";
import authRouter from "./routes/auth.js";
dotenv.config();
const app = express();

app.use(cors({
  origin: [
    'https://shocking-mausoleum-jj946594j5rqh5rq-5173.app.github.dev',
    'http://localhost:5173' // para testes locais
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.get("/", (req, res) => res.send("API Gestão de Frota — ativo"));
app.use("/veiculos", veiculosRouter);
app.use("/login", authRouter);
const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);

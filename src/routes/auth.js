import { Router } from "express";
const router = Router();
// usuários pré-cadastrados (matricula + senha)
const usuarios = [
{ matricula: "20240001", senha: "Frota@2024" },
{ matricula: "20240002", senha: "Rodar123!" },
{ matricula: "20240003", senha: "AdminFrota#1" },
{ matricula: "20240004", senha: "Seguranca99" }
];
router.post("/login", (req, res) => {
const { matricula, senha } = req.body;
const user = usuarios.find(u => u.matricula === matricula && u.senha ===
senha);
if (!user) return res.status(401).json({ message: "Credenciais inválidas" });
return res.json({ message: "Login OK", matricula: user.matricula });
});
export default router;
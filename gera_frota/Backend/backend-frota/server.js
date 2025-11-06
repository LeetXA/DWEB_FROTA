// Importa as bibliotecas necessárias
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// Cria a aplicação Express
const app = express();

// Configura o servidor para entender JSON e aceitar requisições de outras origens (ex: React)
app.use(cors());
app.use(express.json());

// Cria uma instância do Prisma para acessar o banco
const prisma = new PrismaClient();

// =============================
// ROTAS CRUD para Veiculo
// =============================

// 🟢 LISTAR todos os veículos
app.get("/veiculos", async (req, res) => {
  try {
    const veiculos = await prisma.veiculo.findMany();
    res.json(veiculos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar veículos" });
  }
});

// 🟢 LISTAR UM veículo específico (por ID)
app.get("/veiculos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await prisma.veiculo.findUnique({
      where: { id: Number(id) },
    });
    if (!veiculo) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }
    res.json(veiculo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar veículo" });
  }
});

// 🟢 CRIAR um novo veículo
app.post("/veiculos", async (req, res) => {
  try {
    const data = req.body;
    const novoVeiculo = await prisma.veiculo.create({ data });
    res.status(201).json(novoVeiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar veículo" });
  }
});

// 🟢 ATUALIZAR um veículo
app.put("/veiculos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const veiculoAtualizado = await prisma.veiculo.update({
      where: { id: Number(id) },
      data,
    });

    res.json(veiculoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar veículo" });
  }
});

// 🟢 EXCLUIR um veículo
app.delete("/veiculos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.veiculo.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Veículo removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover veículo" });
  }
});

app.get("/", (req, res) => {
  res.send("🚀 API da Gestão de Frota está rodando!");
});

// =============================
// Inicializa o servidor
// =============================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚗 Servidor rodando em http://localhost:${PORT}`);
});


// ---------------- ROTA DE LOGIN ----------------
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca um usuário com e-mail e senha correspondentes
    const usuario = await prisma.usuario.findFirst({
      where: { email, senha },
    });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    // Retorna apenas informações seguras (sem senha)
    res.json({
      message: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

import axios from "axios";

const api = axios.create({
  baseURL: "https://shocking-mausoleum-jj946594j5rqh5rq-3000.app.github.dev/",
  headers: {
    "Content-Type": "application/json",
  },
});

// -------- ROTAS DE LOGIN --------
export const loginUsuario = (email, senha) => {
  return api.post("/login", { email, senha });
};

// -------- ROTAS DE VEÍCULOS --------
export const listarVeiculos = () => {
  return api.get("/veiculos");
};

export const buscarVeiculoPorId = (id) => {
  return api.get(`/veiculos/${id}`);
};

export const criarVeiculo = (data) => {
  return api.post("/veiculos", data);
};

export const atualizarVeiculo = (id, data) => {
  return api.put(`/veiculos/${id}`, data);
};

export const deletarVeiculo = (id) => {
  return api.delete(`/veiculos/${id}`);
};

// Exporta para usar no projeto
export default api;

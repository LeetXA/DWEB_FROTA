import { db } from "../db/index.js";
import { veiculos } from "../db/schema.js";
import { Veiculo } from "../classes/Veiculo.js";
import { eq } from "drizzle-orm";
export const listVeiculos = async (req, res) => {
const rows = await db.select().from(veiculos);
return res.json(rows);
};
export const getVeiculo = async (req, res) => {
const id = Number(req.params.id);
const rows = await db.select().from(veiculos).where(eq(veiculos.id, id));
if (!rows || rows.length === 0) return res.status(404).json({ message:
"Não encontrado" });
return res.json(rows[0]);
};
export const createVeiculo = async (req, res) => {
const p = req.body;
const v = new Veiculo(0, p.tipo, p.marca, p.modelo, p.placa,
p.anoFabricacao, p.kmAtual, p.combustivel, p.status, p.responsavel,
p.dataUltimaManutencao, p.proximaRevisaoKm, p.documentacaoValidade);
const result = await db.insert(veiculos).values({
tipo: v.getTipo(),
marca: v.getMarca(),
modelo: v.getModelo(),
placa: v.getPlaca(),
ano_fabricacao: v.getAnoFabricacao(),
km_atual: v.getKmAtual(),
combustivel: v.getCombustivel(),
status: v.getStatus(),
responsavel: v.getResponsavel(),
data_ultima_manutencao: v.getDataUltimaManutencao(),
proxima_revisao_km: v.getProximaRevisaoKm(),
documentacao_validade: v.getDocumentacaoValidade()
});
return res.status(201).json({ message: "Criado", result });
};
export const updateVeiculo = async (req, res) => {
const id = Number(req.params.id);
const p = req.body;
await db.update(veiculos).set({
tipo: p.tipo,
marca: p.marca,
modelo: p.modelo,
placa: p.placa,
ano_fabricacao: p.anoFabricacao,
km_atual: p.kmAtual,
combustivel: p.combustivel,
status: p.status,
responsavel: p.responsavel,
data_ultima_manutencao: p.dataUltimaManutencao,
proxima_revisao_km: p.proximaRevisaoKm,
documentacao_validade: p.documentacaoValidade
}).where(eq(veiculos.id, id));
return res.json({ message: "Atualizado" });
};
export const deleteVeiculo = async (req, res) => {
const id = Number(req.params.id);
await db.delete(veiculos).where(eq(veiculos.id, id));
return res.json({ message: "Removido" });
};
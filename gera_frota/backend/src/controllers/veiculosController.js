import { db } from "../db/index.js";
import { veiculos } from "../db/schema.js";
import { Veiculo } from "../classes/Veiculo.js";
import { eq } from "drizzle-orm";
import { inArray } from "drizzle-orm";

// Listar todos os veículos
export const listVeiculos = async (req, res) => {
  try {
    const rows = await db.select().from(veiculos);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar veículos" });
  }
};

// Obter um veículo pelo ID
export const getVeiculo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const rows = await db.select().from(veiculos).where(eq(veiculos.id, id));
    if (!rows || rows.length === 0) return res.status(404).json({ message: "Veículo não encontrado" });
    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar veículo" });
  }
};

// Criar um novo veículo
export const createVeiculo = async (req, res) => {
  try {
    const p = req.body;
    if (!p || !p.tipo || !p.marca || !p.modelo || !p.placa) {
      return res.status(400).json({ message: "Campos obrigatórios faltando" });
    }

    const v = new Veiculo(
      0,
      p.tipo,
      p.marca,
      p.modelo,
      p.placa,
      p.anoFabricacao,
      p.kmAtual,
      p.combustivel,
      p.status,
      p.responsavel,
      p.dataUltimaManutencao,
      p.proximaRevisaoKm,
      p.documentacaoValidade
    );

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

    return res.status(201).json({ message: "Veículo criado", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar veículo" });
  }
};

// Atualizar veículo pelo ID
export const updateVeiculo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const p = req.body;

    if (!p) return res.status(400).json({ message: "Corpo da requisição vazio" });

    // Checa se o veículo existe
    const rows = await db.select().from(veiculos).where(eq(veiculos.id, id));
    if (!rows || rows.length === 0) return res.status(404).json({ message: "Veículo não encontrado" });

    // Atualização parcial: só atualiza campos que vieram no body
    const updateData = {};
    const campos = [
      "tipo", "marca", "modelo", "placa", "anoFabricacao",
      "kmAtual", "combustivel", "status", "responsavel",
      "dataUltimaManutencao", "proximaRevisaoKm", "documentacaoValidade"
    ];

    campos.forEach(c => {
      if (p[c] !== undefined) {
        // converte nomes de campo para os do banco, se necessário
        const dbField = c === "anoFabricacao" ? "ano_fabricacao" :
          c === "kmAtual" ? "km_atual" :
            c === "dataUltimaManutencao" ? "data_ultima_manutencao" :
              c === "proximaRevisaoKm" ? "proxima_revisao_km" :
                c === "documentacaoValidade" ? "documentacao_validade" :
                  c;
        updateData[dbField] = p[c];
      }
    });

    await db.update(veiculos).set(updateData).where(eq(veiculos.id, id));
    return res.json({ message: "Veículo atualizado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar veículo" });
  }
};

// Deletar veículo pelo ID
export const deleteVeiculo = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Checa se o veículo existe
    const rows = await db.select().from(veiculos).where(eq(veiculos.id, id));
    if (!rows || rows.length === 0) return res.status(404).json({ message: "Veículo não encontrado" });

    await db.delete(veiculos).where(eq(veiculos.id, id));
    return res.json({ message: "Veículo removido" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao remover veículo" });
  }
};

// Atualizar vários veículos em lote
export const updateVeiculosEmLote = async (req, res) => {
  try {
    const { ids, updateData } = req.body;
    if (!ids || !updateData) return res.status(400).json({ message: "IDs e dados para atualizar são obrigatórios" });

    const dbUpdateData = {};
    Object.keys(updateData).forEach(c => {
      const dbField = c === "anoFabricacao" ? "ano_fabricacao" :
        c === "kmAtual" ? "km_atual" :
          c === "dataUltimaManutencao" ? "data_ultima_manutencao" :
            c === "proximaRevisaoKm" ? "proxima_revisao_km" :
              c === "documentacaoValidade" ? "documentacao_validade" :
                c;
      dbUpdateData[dbField] = updateData[c];
    });

    await db.update(veiculos).set(dbUpdateData).where(inArray(veiculos.id, ids));

    return res.json({ message: `${ids.length} veículo(s) atualizado(s)` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar veículos em lote" });
  }
};

// Deletar vários veículos em lote
export const deleteVeiculosEmLote = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids) return res.status(400).json({ message: "IDs são obrigatórios" });

    await db.delete(veiculos).where(inArray(veiculos.id, ids));
    return res.json({ message: `${ids.length} veículo(s) removido(s)` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar veículos em lote" });
  }
};

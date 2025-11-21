import { db } from "./db/index.js";
import { veiculos } from "./db/schema.js";
async function seed() {
await db.insert(veiculos).values({
tipo: "Carro",
marca: "Toyota",
modelo: "Corolla",
placa: "ABC1234",
ano_fabricacao: 2020,
km_atual: 45000,
combustivel: "Gasolina",
status: "Disponível",
responsavel: "João",
data_ultima_manutencao: "2024-11-01",
proxima_revisao_km: 50000,
documentacao_validade: "2025-01-01"
});
console.log("Seed finalizada");
process.exit(0);
}
seed().catch(e => { console.error(e); process.exit(1); });
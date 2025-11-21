import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
export const veiculos = sqliteTable("veiculos", {
id: integer("id").primaryKey({ autoIncrement: true }),
tipo: text("tipo").notNull(),
marca: text("marca").notNull(),
modelo: text("modelo").notNull(),
placa: text("placa").notNull().unique(),
ano_fabricacao: integer("ano_fabricacao").notNull(),
km_atual: integer("km_atual").notNull(),
combustivel: text("combustivel").notNull(),
status: text("status").notNull(),
responsavel: text("responsavel").notNull(),
data_ultima_manutencao: text("data_ultima_manutencao"),
proxima_revisao_km: integer("proxima_revisao_km"),
documentacao_validade: text("documentacao_validade")
});
export const usuarios = sqliteTable("usuarios", {
id: integer("id").primaryKey({ autoIncrement: true }),
matricula: text("matricula").notNull().unique(),
senha: text("senha").notNull()
});

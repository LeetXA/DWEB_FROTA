-- CreateTable
CREATE TABLE "Veiculo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "anoFabricacao" INTEGER NOT NULL,
    "kmAtual" INTEGER NOT NULL,
    "combustivel" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Disponível',
    "responsavel" TEXT,
    "dataUltimaManutencao" DATETIME,
    "proximaRevisaoKm" INTEGER,
    "documentacaoValidade" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");

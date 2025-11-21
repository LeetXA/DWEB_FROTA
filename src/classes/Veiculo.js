export class Veiculo {
    constructor(
id,
tipo,
marca,
modelo,
status,
responsavel,
dataUltimaManutencao,
proximaRevisaoKm,
documentacaoValidade
) {
this.id = id;
this.tipo = tipo;
this.marca = marca;
this.modelo = modelo;
this.placa = placa;
this.anoFabricacao = anoFabricacao;
this.kmAtual = kmAtual;
this.combustivel = combustivel;
this.status = status;
this.responsavel = responsavel;
this.dataUltimaManutencao = dataUltimaManutencao;
this.proximaRevisaoKm = proximaRevisaoKm;
this.documentacaoValidade = documentacaoValidade;
}


/* GETTERS */
getId() { return this.id; }
getTipo() { return this.tipo; }
getMarca() { return this.marca; }
getModelo() { return this.modelo; }
getPlaca() { return this.placa; }
getAnoFabricacao() { return this.anoFabricacao; }
getKmAtual() { return this.kmAtual; }
getCombustivel() { return this.combustivel; }
getStatus() { return this.status; }
getResponsavel() { return this.responsavel; }
getDataUltimaManutencao() { return this.dataUltimaManutencao; }
getProximaRevisaoKm() { return this.proximaRevisaoKm; }
getDocumentacaoValidade() { return this.documentacaoValidade; }


/* SETTERS */
setTipo(v) { this.tipo = v; }
setMarca(v) { this.marca = v; }
setModelo(v) { this.modelo = v; }
setPlaca(v) { this.placa = v; }
setAnoFabricacao(v) { this.anoFabricacao = v; }
setKmAtual(v) { this.kmAtual = v; }
setCombustivel(v) { this.combustivel = v; }
setStatus(v) { this.status = v; }
setResponsavel(v) { this.responsavel = v; }
setDataUltimaManutencao(v) { this.dataUltimaManutencao = v; }
setProximaRevisaoKm(v) { this.proximaRevisaoKm = v; }
setDocumentacaoValidade(v) { this.documentacaoValidade = v; }


getDescricaoCompleta() {
return `${this.tipo} ${this.marca} ${this.modelo} (${this.anoFabricacao}) - ${this.placa}`;
}
}
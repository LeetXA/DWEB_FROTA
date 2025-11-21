export class Veiculo {
  constructor({
    id = 0,
    tipo = "",
    marca = "",
    modelo = "",
    placa = "",
    anoFabricacao = null,
    kmAtual = 0,
    combustivel = "",
    status = "",
    responsavel = "",
    dataUltimaManutencao = null,
    proximaRevisaoKm = null,
    documentacaoValidade = null
  } = {}) {
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
  setTipo(v = "") { this.tipo = v; }
  setMarca(v = "") { this.marca = v; }
  setModelo(v = "") { this.modelo = v; }
  setPlaca(v = "") { this.placa = v; }
  setAnoFabricacao(v = null) { this.anoFabricacao = v; }
  setKmAtual(v = 0) { this.kmAtual = v; }
  setCombustivel(v = "") { this.combustivel = v; }
  setStatus(v = "") { this.status = v; }
  setResponsavel(v = "") { this.responsavel = v; }
  setDataUltimaManutencao(v = null) { this.dataUltimaManutencao = v; }
  setProximaRevisaoKm(v = null) { this.proximaRevisaoKm = v; }
  setDocumentacaoValidade(v = null) { this.documentacaoValidade = v; }

  /* MÉTODOS */
  getDescricaoCompleta() {
    return `${this.tipo || "N/A"} ${this.marca || "N/A"} ${this.modelo || "N/A"} (${this.anoFabricacao || "?"}) - ${this.placa || "N/A"}`;
  }
}

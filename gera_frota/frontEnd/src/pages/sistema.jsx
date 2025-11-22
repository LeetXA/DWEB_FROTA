import React, { useEffect, useState } from "react";
import "./sistema.css";

function Sistema() {
  const [matriculaUser, setMatriculaUser] = useState("");
  const [id, setId] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [resultado, setResultado] = useState([]);

  const labels = {
    tipo: "Tipo",
    marca: "Marca",
    modelo: "Modelo",
    placa: "Placa",
    anoFabricacao: "Ano de Fabricação",
    kmAtual: "KM Atual",
    combustivel: "Combustível",
    status: "Status",
    responsavel: "Responsável",
    dataUltimaManutencao: "Última Manutenção",
    proximaRevisaoKm: "Próxima Revisão (KM)",
    documentacaoValidade: "Validade do Documento"
  };

  const [showConfirmCard, setShowConfirmCard] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");
  const [updateData, setUpdateData] = useState({
    tipo: "",
    marca: "",
    modelo: "",
    placa: "",
    anoFabricacao: "",
    kmAtual: "",
    combustivel: "",
    status: "",
    responsavel: "",
    dataUltimaManutencao: "",
    proximaRevisaoKm: "",
    documentacaoValidade: ""
  });
  const [showUpdateCard, setShowUpdateCard] = useState(false);
  const [message, setMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const matricula = localStorage.getItem("matriculaUser");
    setMatriculaUser(matricula);
  }, []);

  /* === PESQUISAR === */
  const handlePesquisar = async () => {
    try {
      let url = '/api/veiculos';
      if (id) url += `/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        setResultado([]);
        return;
      }
      let data = await response.json();
      if (!Array.isArray(data)) data = [data];
      if (!id) {
        if (modelo) data = data.filter(v => v.modelo.toLowerCase().includes(modelo.toLowerCase()));
        if (placa) data = data.filter(v => v.placa.toLowerCase().includes(placa.toLowerCase()));
      }
      setResultado(data);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
      setResultado([]);
    }
  };

  /* === DELETAR === */
  const handleDeletar = () => {
    if (resultado.length === 0) return;
    setConfirmAction("delete");
    setShowConfirmCard(true);
  };

  const confirmarDelete = async () => {
    try {
      const ids = resultado.map(v => v.id);
      await Promise.all(ids.map(id => fetch(`/api/veiculos/${id}`, { method: "DELETE" })));
      setResultado([]);
    } catch (error) {
      console.error(error);
      setMessage("Erro ao deletar os dados.");
    } finally {
      setShowConfirmCard(false);
    }
  };

  /* === ATUALIZAR === */
  const handleAbrirUpdateCard = () => {
    if (resultado.length === 0) return;
    setShowUpdateCard(true);
    setIsCreating(false);
    setMessage("");
  };

  const handleAbrirConfirmUpdate = () => {
    const camposParaAtualizar = {};
    Object.keys(updateData).forEach(key => {
      const value = updateData[key];
      if (value) {
        camposParaAtualizar[key] =
          key === "anoFabricacao" || key === "kmAtual" || key === "proximaRevisaoKm"
            ? Number(value)
            : value;
      }
    });
    if (Object.keys(camposParaAtualizar).length === 0) return;
    setConfirmAction("update");
    setShowUpdateCard(false);
    setShowConfirmCard(true);
  };

  const confirmarUpdate = async () => {
    const camposParaAtualizar = {};
    Object.keys(updateData).forEach(key => {
      const value = updateData[key];
      if (value) {
        camposParaAtualizar[key] =
          key === "anoFabricacao" || key === "kmAtual" || key === "proximaRevisaoKm"
            ? Number(value)
            : value;
      }
    });
    try {
      const ids = resultado.map(v => v.id);
      const response = await fetch('/api/veiculos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, updateData: camposParaAtualizar })
      });
      if (!response.ok) throw new Error("Erro ao atualizar veículos.");
      setUpdateData({
        tipo: "", marca: "", modelo: "", placa: "", anoFabricacao: "",
        kmAtual: "", combustivel: "", status: "", responsavel: "",
        dataUltimaManutencao: "", proximaRevisaoKm: "", documentacaoValidade: ""
      });
      handlePesquisar();
    } catch (error) {
      console.error(error);
      setMessage("Erro ao atualizar veículos.");
    } finally {
      setShowConfirmCard(false);
    }
  };

  //LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("matriculaUser");
    window.location.href = "/";
  };

  /* === CRIAR === */
  const handleAbrirCreateCard = () => {
    setIsCreating(true);
    setUpdateData({
      tipo: "",
      marca: "",
      modelo: "",
      placa: "",
      anoFabricacao: "",
      kmAtual: "",
      combustivel: "",
      status: "",
      responsavel: "",
      dataUltimaManutencao: "",
      proximaRevisaoKm: "",
      documentacaoValidade: ""
    });
    setShowUpdateCard(true);
  };

  const confirmarCreate = async () => {
    try {
      // Verifica se todos os campos foram preenchidos
      const camposObrigatorios = [
        "tipo", "marca", "modelo", "placa", "anoFabricacao", "kmAtual",
        "combustivel", "status", "responsavel", "dataUltimaManutencao",
        "proximaRevisaoKm", "documentacaoValidade"
      ];
      for (let campo of camposObrigatorios) {
        if (!updateData[campo]) {
          setMessage("Todos os campos são obrigatórios.");
          return;
        }
      }

      const body = {
        tipo: updateData.tipo,
        marca: updateData.marca,
        modelo: updateData.modelo,
        placa: updateData.placa,
        ano_fabricacao: Number(updateData.anoFabricacao),
        km_atual: Number(updateData.kmAtual),
        combustivel: updateData.combustivel,
        status: updateData.status,
        responsavel: updateData.responsavel,
        data_ultima_manutencao: updateData.dataUltimaManutencao,
        proxima_revisao_km: Number(updateData.proximaRevisaoKm),
        documentacao_validade: updateData.documentacaoValidade
      };

      const response = await fetch("/api/veiculos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        setMessage("Erro ao criar veículo.");
        return;
      }

      setShowUpdateCard(false);
      setIsCreating(false);
      handlePesquisar();
    } catch (error) {
      console.error(error);
      setMessage("Erro ao criar veículo.");
    }
  };

  return (
    <div className="sistema-bg">
      <div className="sistema-card">
        <div className="titulo-sistema-container">
          <h1 className="titulo-sistema">
            Acesso liberado para: <span>{matriculaUser}</span>
          </h1>
          <button className="btn-logout" onClick={handleLogout}>Sair</button>
        </div>

        <div className="search-area">
          <input type="text" placeholder="Buscar ID" className="search-input" value={id} onChange={e => setId(e.target.value)} />
          <input type="text" placeholder="Buscar Modelo" className="search-input" value={modelo} onChange={e => setModelo(e.target.value)} />
          <input type="text" placeholder="Buscar Placa" className="search-input" value={placa} onChange={e => setPlaca(e.target.value)} />
          <button className="btn btn-pesquisar" onClick={handlePesquisar}></button>
          <button className="btn btn-deletar" onClick={handleDeletar}></button>
          <button className="btn btn-atualizar" onClick={handleAbrirUpdateCard}></button>
          <button className="btn btn-adicionar" onClick={handleAbrirCreateCard}></button>
        </div>

        {message && <div className="message">{message}</div>}

        {showConfirmCard && (
          <div className="confirm-card">
            <div className="confirm-content">
              <h2>Confirmação</h2>
              <p>{confirmAction === "delete" ? `Deseja realmente deletar ${resultado.length} item(s)?` : `Deseja realmente atualizar ${resultado.length} veículo(s)?`}</p>
              <button className="btn-card" onClick={confirmAction === "delete" ? confirmarDelete : confirmarUpdate}>Sim</button>
              <button className="btn-card" onClick={() => setShowConfirmCard(false)}>Não</button>
            </div>
          </div>
        )}

        {showUpdateCard && (
          <div className="update-card">
            <h3>{isCreating ? "Adicionar Veículo" : "Atualização em Massa"}</h3>
            <p>Preencha todos os campos obrigatórios.</p>
            {Object.keys(updateData).map(key => (
              <input
                key={key}
                type="text"
                placeholder={labels[key]}
                value={updateData[key]}
                onChange={e => setUpdateData(prev => ({ ...prev, [key]: e.target.value }))}
                className="update-input"
              />
            ))}
            <div className="update-buttons">
              <button onClick={isCreating ? confirmarCreate : handleAbrirConfirmUpdate}>OK</button>
              <button onClick={() => { setShowUpdateCard(false); setIsCreating(false); }}>Cancelar</button>
            </div>
          </div>
        )}

        <table className="tabela-resultados">
          <thead>
            <tr>
              <th>ID</th><th>Tipo</th><th>Marca</th><th>Modelo</th><th>Placa</th>
              <th>Fabricação</th><th>KM Atual</th><th>Combustível</th><th>Status</th>
              <th>Responsável</th><th>Última Manutenção</th><th>Próxima Revisão</th><th>Documento</th>
            </tr>
          </thead>
          <tbody>
            {resultado.map(v => (
              <tr key={v.id}>
                <td>{v.id}</td><td>{v.tipo}</td><td>{v.marca}</td><td>{v.modelo}</td><td>{v.placa}</td>
                <td>{v.ano_fabricacao}</td><td>{v.km_atual}</td><td>{v.combustivel}</td><td>{v.status}</td>
                <td>{v.responsavel}</td><td>{v.data_ultima_manutencao}</td><td>{v.proxima_revisao_km}</td><td>{v.documentacao_validade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sistema;

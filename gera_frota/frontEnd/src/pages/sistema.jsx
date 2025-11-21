import React, { useEffect, useState } from "react";
import "./sistema.css";

function Sistema() {

  const [matriculaUser, setMatriculaUser] = useState("");
  const [id, setId] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    const matricula = localStorage.getItem("matriculaUser");
    setMatriculaUser(matricula);
  }, []);

  /*BOTÃO PESQUISAR */
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

      // Se retornar um objeto (busca por ID), transforma em array
      if (!Array.isArray(data)) {
        data = [data];
      }

      // Filtrar por modelo ou placa
      if (!id) {
        if (modelo) {
          data = data.filter(v =>
            v.modelo.toLowerCase().includes(modelo.toLowerCase())
          );
        }
        if (placa) {
          data = data.filter(v =>
            v.placa.toLowerCase().includes(placa.toLowerCase())
          );
        }
      }

      setResultado(data);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
      setResultado([]);
    }
  };

  /*BOTÃO DELETAR */

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeletar = () => {
    if (resultado.length === 0) {
      alert("Não há itens para deletar.");
      return;
    }
    setShowConfirm(true); // mostra o card
  };


  const confirmarDelete = async () => {
    try {
      for (let veiculo of resultado) {
        await fetch(`/api/veiculos/${veiculo.id}`, { method: "DELETE" });
      }
      setResultado([]); // limpa tabela
      alert(`${resultado.length} item(s) deletado(s) com sucesso!`);
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Ocorreu um erro ao deletar os dados.");
    } finally {
      setShowConfirm(false); // fecha card
    }
  };

  /*BOTÃO ATUALIZAR */
  const [showUpdateCard, setShowUpdateCard] = useState(false);
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

  const handleAbrirAtualizar = () => {
    if (resultado.length === 0) {
      alert("Nenhum veículo para atualizar.");
      return;
    }
    setShowUpdateCard(true);
  };

  const handleAtualizar = async () => {
    if (!window.confirm(`Você está prestes a atualizar ${resultado.length} veículos. Confirmar?`)) {
      return;
    }

    // Filtra apenas os campos preenchidos
    const camposParaAtualizar = {};
    Object.keys(updateData).forEach(key => {
      if (updateData[key]) camposParaAtualizar[key] = updateData[key];
    });

    try {
      const ids = resultado.map(v => v.id);
      const response = await fetch('/api/veiculos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, updateData: camposParaAtualizar })
      });

      if (!response.ok) {
        alert("Erro ao atualizar veículos.");
        return;
      }

      alert(`${resultado.length} veículos atualizados com sucesso!`);
      setShowUpdateCard(false);
      setUpdateData({
        tipo: "",
        marca: "",
        modelo: "",
        placa: "",
        ano_fabricacao: "",
        km_atual: "",
        combustivel: "",
        status: "",
        responsavel: "",
        data_ultima_manutencao: "",
        proxima_revisao_km: "",
        documentacao_validade: ""
      });

      handlePesquisar(); // Recarrega os veículos
      
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar veículos.");
    }
  };



  return (
    <div className="sistema-bg">
      <div className="sistema-card">

        <h1 className="titulo-sistema">
          Acesso liberado para: <span>{matriculaUser}</span>
        </h1>

        {/* Campo de pesquisa */}
        <div className="search-area">

          <input
            type="text"
            placeholder="Buscar ID"
            className="search-input"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Buscar Modelo"
            className="search-input"
            value={modelo}
            onChange={e => setModelo(e.target.value)}
          />

          <input
            type="text"
            placeholder="Buscar Placa"
            className="search-input"
            value={placa}
            onChange={e => setPlaca(e.target.value)}
          />

          <button className="btn btn-pesquisar" onClick={handlePesquisar}></button>
          <button className="btn btn-deletar" onClick={handleDeletar}></button>
          <button className="btn btn-atualizar" onClick={handleAbrirAtualizar}></button>

        </div>

        {showConfirm && (
          <div className="confirm-card">
            <div className="confirm-content">
              <h2>Confirmação</h2>
              <p>Deseja realmente deletar {resultado.length} item(s)?</p>
              <button className="btn-card" onClick={confirmarDelete}>Sim</button>
              <button className="btn-card" onClick={() => setShowConfirm(false)}>Não</button>
            </div>
          </div>
        )}

        {showUpdateCard && (
          <div className="update-card">
            <h3>Atualização em Massa</h3>
            <p>Preencha os campos que deseja atualizar. Campos vazios serão ignorados.</p>
            {Object.keys(updateData).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.replace(/_/g, " ")}
                value={updateData[key]}
                onChange={(e) => setUpdateData(prev => ({ ...prev, [key]: e.target.value }))}
              />
            ))}
            <div className="update-buttons">
              <button onClick={handleAtualizar}>OK</button>
              <button onClick={() => setShowUpdateCard(false)}>Cancelar</button>
            </div>
          </div>
        )}



        {/* Tabela */}
        <table className="tabela-resultados">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Placa</th>
              <th>Fabricação</th>
              <th>KM Atual</th>
              <th>Combustível</th>
              <th>Status</th>
              <th>Responsável</th>
              <th>Última Manutenção</th>
              <th>Próxima Revisão</th>
              <th>Documento</th>
            </tr>
          </thead>
          <tbody>
            {resultado.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.tipo}</td>
                <td>{v.marca}</td>
                <td>{v.modelo}</td>
                <td>{v.placa}</td>
                <td>{v.ano_fabricacao}</td>
                <td>{v.km_atual}</td>
                <td>{v.combustivel}</td>
                <td>{v.status}</td>
                <td>{v.responsavel}</td>
                <td>{v.data_ultima_manutencao}</td>
                <td>{v.proxima_revisao_km}</td>
                <td>{v.documentacao_validade}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Sistema;

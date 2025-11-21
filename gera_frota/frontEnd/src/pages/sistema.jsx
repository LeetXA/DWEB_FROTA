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

  const testarConexao = async () => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/`);
    const data = await response.text();
    console.log("Resposta do backend:", data);
    alert(`Backend respondeu: ${data}`);
  } catch (error) {
    console.error("Erro ao conectar com o backend:", error);
    alert("Não foi possível conectar ao backend. Veja o console.");
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

          <button onClick={testarConexao}>Testar Conexão com Backend</button>

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

          <button className="btn btn-pesquisar"></button>
          <button className="btn btn-deletar"></button>
          <button className="btn btn-atualizar"></button>

        </div>

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
                <td>{v.fabricacao}</td>
                <td>{v.kmAtual}</td>
                <td>{v.combustivel}</td>
                <td>{v.status}</td>
                <td>{v.responsavel}</td>
                <td>{v.ultimaManutencao}</td>
                <td>{v.proximaRevisao}</td>
                <td>{v.documento}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Sistema;

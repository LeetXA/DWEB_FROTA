import React, { useEffect, useState } from "react";
import "./sistema.css";

function Sistema() {
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const nome = localStorage.getItem("nomeUsuario");
    setNomeUsuario(nome);
  }, []);

  /* Botão Pesquisar*/
  const [id, setId] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [resultado, setResultado] = useState([]);

  const handlePesquisar = async () => {
  try {
    let url = "http://localhost:3000/veiculos";

    if (id) {
      url += `/id/${id}`;
    } else if (modelo) {
      url += `/modelo/${modelo}`;
    } else if (placa) {
      url += `/placa/${placa}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setResultado(Array.isArray(data) ? data : [data]); // garante tabela
  } catch (error) {
    console.error("Erro ao pesquisar:", error);
  }
};



  return (
    <div className="sistema-bg">
      <div className="sistema-card">

        <h1 className="titulo-sistema">
          Acesso liberado para: <span>{nomeUsuario}</span>
        </h1>

        {/* Campo de pesquisa */}
        <div className="search-area">

          <input 
            type="text"
            placeholder="Buscar ID"
            className="search-input"
          />

          <input 
            type="text"
            placeholder="Buscar Modelo"
            className="search-input"
          />

          <input 
            type="text"
            placeholder="Buscar Placa"
            className="search-input"
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
            <tr>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Sistema;

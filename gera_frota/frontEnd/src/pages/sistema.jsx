import React from "react";
import "./sistema.css";

function Sistema() {
  const emailLogado = localStorage.getItem("emailUsuario") || "usuário@example.com";

  return (
    <div className="sistema-bg">
      <div className="sistema-card">

        <h1 className="titulo-sistema">
          Acesso liberado para: <span>{emailLogado}</span>
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

          <button className="btn btn-pesquisar">Pesquisar</button>
          <button className="btn btn-deletar">Deletar</button>
          <button className="btn btn-atualizar">Atualizar</button>

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
            {/* Exemplo de linha */}
            <tr>
              <td>001</td>
              <td>Fiat Uno</td>
              <td>ABC-1234</td>
              <td>Ativo</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Sistema;

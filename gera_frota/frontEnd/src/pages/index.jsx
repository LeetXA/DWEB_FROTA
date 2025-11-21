import { useState, useEffect, useRef } from 'react';
import { User, Lock } from 'lucide-react'; // Ícones modernos
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
//import api from '../services/api'
import { loginUsuario } from "../services/api";

function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    matricula: "",
    senha: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUsuario(form.matricula, form.senha);

      console.log("Resposta do servidor:", response.data);

      // pega o nome do usuário:
      const matriculaUser = response.data.usuario.matricula;

      // guarda no navegador:
      localStorage.setItem("matriculaUser", matriculaUser);

      navigate("/sistema");

      //Limpa os inputs
      setForm({
        matricula: "",
        senha: "",
      });

    } catch (error) {
      setErroLogin("Matrícula ou senha incorretos!");

      //Limpa os inputs
      setForm({
        matricula: "",
        senha: "",
      });

      //Some com o erro após 10 segundos
      setTimeout(() => {
        setErroLogin("");
      }, 5000);

      console.error("Erro no login:", error.response?.data || error);
    }
  };


  //erro
  const [erroLogin, setErroLogin] = useState("");

  //apenas teste de layout
  function entrar() {
    navigate("/sistema"); // vai direto para a página Sistema
  }


  return (
    <div className="page">

      {/* Card de login */}
      <div className="container">
        <form onSubmit={handleLogin}>
          <h1>Portal de Controle de Veículos</h1>
          <p className="subtitle">Acesse sua conta</p>

          <div className="input-group">
            <User className="icon" size={20} />
            <input
              name="matricula"
              type="text"
              placeholder="Matrícula"
              value={form.matricula}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="icon" size={20} />
            <input
              name="senha"
              type="password"
              placeholder="Senha"
              value={form.senha}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" onClick={entrar}>Entrar</button>

          {erroLogin && <p className="erro">{erroLogin}</p>}

          <p className="register">
            <Link to="/cadastro">Cadastrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Home;

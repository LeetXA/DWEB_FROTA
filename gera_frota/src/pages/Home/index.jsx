import { useState } from 'react';
import { User, Lock } from 'lucide-react'; // Ícones modernos
import './style.css';
import { Link } from 'react-router-dom';

function Home() {
  const [form, setForm] = useState({ matricula: '', senha: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', form);
  };

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

          <button type="submit">Entrar</button>

          <p className="register">
          <Link to="/cadastro">Cadastrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Home;

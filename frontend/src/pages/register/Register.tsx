import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register(form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Erro ao registrar usuário. Tente outro nome.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Criar Conta</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              required
              className="register-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              className="register-input"
            />
          </div>
          {error && <p className="register-error">{error}</p>}
          {success && <p className="register-success">Usuário criado com sucesso!</p>}
          <button type="submit" className="register-button">
            Registrar
          </button>
        </form>
        <p className="register-footer">
          Já tem uma conta? <a href="/login">Entrar</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(form);
      localStorage.setItem("token", response.data.auth_token);
      navigate("/dashboard");
    } catch (err) {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="inazuma-login-page">
      <div className="inazuma-login-container">
        <div className="inazuma-login-box">
          <h2>Inazuma Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Usuário"
              value={form.username}
              onChange={handleChange}
              required
              className="inazuma-login-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              required
              className="inazuma-login-input"
            />
            {error && <p className="inazuma-login-error">{error}</p>}
            <button type="submit" className="inazuma-login-button">
              Entrar
            </button>
          </form>
          <p className="inazuma-login-footer">
            Não tem uma conta? <a href="/register">Registre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

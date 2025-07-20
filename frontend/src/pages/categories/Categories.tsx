import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { type Category } from "../../types/task";
import "./categories.css";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Categorias";
  }, []);

  const loadCategories = async () => {
    try {
      const res = await API.get("/categories/");
      const data = res.data;
      if (Array.isArray(data)) setCategories(data);
      else if (Array.isArray(data.results)) setCategories(data.results);
      else {
        console.error("Formato inválido:", data);
        setCategories([]);
      }
    } catch (err) {
      console.error("Erro ao carregar categorias", err);
    }
  };

  const handleCreate = async () => {
    if (!newCategory.trim()) return;
    try {
      await API.post("/categories/", { name: newCategory });
      setNewCategory("");
      loadCategories();
    } catch (err) {
      console.error("Erro ao criar categoria", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir esta categoria?")) return;
    try {
      await API.delete(`/categories/${id}/`);
      loadCategories();
    } catch (err) {
      console.error("Erro ao excluir categoria", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="categories-wrapper">
      <div className="categories-header">
        <h2>📂 Categorias</h2>
        <div className="header-buttons">
          <button onClick={() => navigate("/dashboard")} className="create-task-button">
            Criar Tarefa
          </button>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </div>
      </div>

      <div className="category-form">
        <input
          type="text"
          placeholder="Nova categoria"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleCreate}>Adicionar</button>
      </div>

      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat.id} className="category-card">
            <span>{cat.name}</span>
            <button
              onClick={() => handleDelete(cat.id)}
              className="delete-button"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

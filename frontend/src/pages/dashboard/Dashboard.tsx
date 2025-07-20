import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../../services/task";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { type Task, type Category } from "../../types/task";
import "./dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [filterCompleted, setFilterCompleted] = useState<boolean | undefined>();
  const [newTitle, setNewTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const res = await getTasks(filterCompleted, page, 2);
      const data = res.data;
      if (Array.isArray(data.results)) {
        setTasks(data.results);
        const total = Math.max(1, Math.ceil(data.count / 2));
        setTotalPages(total);
        if (page > total) setPage(total);
      } else {
        setTasks([]);
        setTotalPages(1);
      }
    } catch {
      setTasks([]);
      setTotalPages(1);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await API.get("/categories/");
      const data = res.data;
      if (Array.isArray(data)) setCategories(data);
      else if (Array.isArray(data.results)) setCategories(data.results);
      else setCategories([]);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    document.title = "Dashboard";
    loadTasks();
    loadCategories();
  }, [filterCompleted, page]);

  const handleCreateOrUpdate = async () => {
    if (!newTitle) return;
    if (editingTaskId) {
      await updateTask(editingTaskId, { title: newTitle, description });
      setEditingTaskId(null);
    } else {
      await createTask({
        title: newTitle,
        description,
        category: selectedCategory,
      });
    }
    setNewTitle("");
    setDescription("");
    setSelectedCategory(null);
    loadTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
    setDescription(task.description || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  const toggleComplete = async (task: Task) => {
    await updateTask(task.id, { is_completed: !task.is_completed });
    loadTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📋 Minhas Tarefas</h2>
        <div className="header-buttons">
          <button
            onClick={() => navigate("/categories")}
            className="create-category-button"
          >
            Criar Categoria
          </button>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="left-panel">
          <h3>{editingTaskId ? "Editar Tarefa" : "Nova Tarefa"}</h3>
          <input
            type="text"
            placeholder="Título"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {!editingTaskId && (
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              <option value="">Categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
          <button onClick={handleCreateOrUpdate}>
            {editingTaskId ? "Salvar" : "Criar"}
          </button>
          {editingTaskId && (
            <button
              className="delete-button"
              onClick={() => {
                setEditingTaskId(null);
                setNewTitle("");
                setDescription("");
              }}
            >
              Cancelar
            </button>
          )}
        </div>

        <div className="right-panel">
          <div className="filters">
            <button onClick={() => setFilterCompleted(undefined)}>Todas</button>
            <button onClick={() => setFilterCompleted(false)}>Pendentes</button>
            <button onClick={() => setFilterCompleted(true)}>Concluídas</button>
          </div>

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-card">
                <div className="task-header">
                  <strong>{task.title}</strong>
                  <span
                    className={
                      task.is_completed ? "status-done" : "status-pending"
                    }
                  >
                    {task.is_completed ? "✅ Concluída" : "⏳ Pendente"}
                  </span>
                </div>
                <p className="task-desc">{task.description}</p>
                {task.category && (
                  <p className="task-category">
                    <b>Categoria:</b> {task.category.name}
                  </p>
                )}
                <div className="task-actions">
                  <button onClick={() => toggleComplete(task)}>
                    {task.is_completed ? "Desmarcar" : "Concluir"}
                  </button>
                  <button onClick={() => handleEdit(task)}>Editar</button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(task.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="pagination">
            {tasks.length === 0 ? (
              <span>Nenhuma tarefa encontrada</span>
            ) : (
              <>
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Anterior
                </button>
                <span>
                  Página {page} de {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Próxima →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

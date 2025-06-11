import { useEffect, useState } from 'react';
import './App.css';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const suggestions = [
  "Beber água",
  "Estudar 30 minutos",
  "Organizar a mesa",
  "Responder e-mails",
  "Fazer uma caminhada",
  "Meditar por 5 minutos",
  "Planejar o dia",
  "Ler 5 páginas de um livro"
];

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = tasks.length > 0 ? `Tarefas (${tasks.length})` : 'Minha Lista de Tarefas';
  }, [tasks]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const suggestTask = () => {
    const random = suggestions[Math.floor(Math.random() * suggestions.length)];
    setInput(random);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Minha Lista de Tarefas</h1>
        <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Tema Claro' : '🌙 Tema Escuro'}
        </button>
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Digite uma tarefa ou peça sugestão"
        />
        <button onClick={addTask}>Adicionar</button>
        <button onClick={suggestTask}>Sugestão</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.text}</span>
            <div className="actions">
              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? 'Cancelar' : 'Concluir'}
              </button>
              <button onClick={() => removeTask(task.id)} className="remove">
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
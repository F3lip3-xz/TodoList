import TodoList from './components/TodoList';
import './styles/main.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="todo-app flex flex-col items-center">

      <Button
        onClick={toggleTheme}
        className={`mb-3 px-4 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm
        ${theme === 'light' ? 'btn-dark' : 'btn-light border'}`}
      >
        {theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
      </Button>


      <TodoList />
    </div>
  );

}

export default App;
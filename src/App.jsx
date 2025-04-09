import TodoList from './components/TodoList';
import { Container } from 'react-bootstrap';
import './styles/main.css';

function App() {
  return (
    <Container>
      <div className="todo-app">
        <TodoList />
      </div>
    </Container>
  );
}

export default App;
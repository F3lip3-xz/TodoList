import {Fragment, useState} from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
	const [todos, setTodos] = useState([
		{id: 1, tarea: 'Tarea 1 - Ir al supermercado'},
		{id: 2, tarea: 'Tarea 2 - Pasear al perro'},
		{id: 3, tarea: 'Tarea 3 - Hacer la comida'},
		{id: 4, tarea: 'Tarea 4 - Estudiar React'},
		{id: 5, tarea: 'Tarea 5 - Hacer deporte'},
	]);

	return (
		<Fragment>
			<h1 className="display-5 my-3">Lista de tareas ✔️😎</h1>

			<div className="input-group my-5">
				<input className="form-control" placeholder="Ingrese una tarea" />
				<button className="btn btn-primary ms-2">
					<i className="bi bi-clipboard-plus"></i>
				</button>
				<button className="btn btn-danger ms-2">
					<i className="bi bi-trash"></i>
				</button>
			</div>

			<ul className="list-group mt-5">
				{todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} /> 
				))}
			</ul>
		</Fragment>
	);
};

export default TodoList;

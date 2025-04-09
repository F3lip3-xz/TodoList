import { Fragment, useState, useRef, useEffect } from 'react';
import TodoItem from './TodoItem';
import uuid4 from 'uuid4';
import { Modal, Button } from 'react-bootstrap';

const TodoList = () => {
    const [todos, setTodos] = useState([

    ]);

    const [showModal, setShowModal] = useState(false);
    const [tareasParaEliminar, setTareasParaEliminar] = useState([]);

    const agregarTareas = () => {
        const tarea = tareaRef.current.value.trim();
        if (tarea === "") return;
        setTodos((prevTodos) => {
            const nuevaTarea = {
                id: uuid4(),
                tarea: tarea,
                estado: false
            };
            return [...prevTodos, nuevaTarea];
        });
        tareaRef.current.value = null;
    };

    const cambiarEstadoTarea = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.estado = !todo.estado;
        setTodos(newTodos);
    };

    const eliminarTareaCompletas = () => {
        setTareasParaEliminar(todos.filter((todo) => todo.estado));
        setShowModal(true);
    };

    const confirmarEliminacion = () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.estado));
        setShowModal(false);
    };

    const contarTareasPendientes = () => todos.filter(todo => !todo.estado).length;

    const ResumenTareas = () => {
        const cantidad = contarTareasPendientes();
        if (cantidad === 0) {
            return (
                <div className='alert alert-success mt-3 text-center'>
                    Felicidades, no tienes tareas pendientes
                </div>
            );
        }
        if (cantidad === 1) {
            return (
                <div className='alert alert-info mt-3 text-center'>
                    Cuentas con {cantidad} tarea pendiente
                </div>
            );
        }
        if (cantidad > 9) {
            return (
                <div className='alert alert-danger mt-3 text-center'>
                    Cuentas con {cantidad} tareas pendientes, son muchas
                </div>
            );
        }
        return (
            <div className='alert alert-warning mt-3 text-center'>
                Cuentas con {cantidad} tareas pendientes
            </div>
        );
    };

    const KEY = "todos";
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const tareaRef = useRef();

    return (
        <Fragment>
            <h1 className="display-5 my-3">Lista de tareas ✔️😎</h1>

            <div className="input-group my-5">
                <input className="form-control" placeholder="Ingrese una tarea" ref={tareaRef} />
                <button className="btn btn-primary ms-2" onClick={agregarTareas}>
                    <i className="bi bi-clipboard-plus"></i>
                </button>
                <button className="btn btn-danger ms-2" onClick={eliminarTareaCompletas}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>

            <ul className="list-group mt-5">
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} cambiarEstado={cambiarEstadoTarea} />
                ))}
            </ul>

            <ResumenTareas />
		{/* crear ventanas modales (ventanas emergentes) */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ESPERA ESTAS SEGURO DE ELIMINAR ES TAREAS? 🤔
                </Modal.Body>
                <Modal.Footer>
                    <Button  variant="secondary" onClick={() => setShowModal(false)}> 
						Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmarEliminacion}>
                        Eliminar Trea
                    </Button>
                </Modal.Footer>
            </Modal>

        </Fragment>
    );
};


export default TodoList;



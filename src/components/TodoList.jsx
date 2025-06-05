import { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form, Badge, ListGroup, Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';
import TodoItem from './TodoItem';
import ProgressChart from './ProgressChart'; // Nuevo componente para el progreso

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('all');
    const tareaRef = useRef();
    const KEY = "todos-app-felipe";

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY)) || [];
        setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const agregarTarea = (e) => {
        e.preventDefault();
        const tarea = tareaRef.current.value.trim();
        if (!tarea) {
            toast.warning('¡Debes escribir una tarea!');
            return;
        }
        const nuevaTarea = {
            id: uuidv4(),
            tarea,
            estado: false,
            fecha: new Date().toISOString(),
            importante: false,
            fechaVencimiento: null,
            tags: []
        };
        setTodos(prev => [nuevaTarea, ...prev]);
        tareaRef.current.value = '';
        toast.success('✅ Tarea agregada');
    };

    const toggleEstadoTarea = (id) => {
        setTodos(prev => prev.map(todo => 
            todo.id === id ? {...todo, estado: !todo.estado} : todo
        ));
    };

    const toggleImportante = (id) => {
        setTodos(prev => prev.map(todo => 
            todo.id === id ? {...todo, importante: !todo.importante} : todo
        ));
    };

    const eliminarTarea = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        toast.info('🗑️ Tarea eliminada');
    };

    const updateTarea = (id, updatedData) => {
        setTodos(prev => prev.map(todo => 
            todo.id === id ? { ...todo, ...updatedData } : todo
        ));
    };

    const eliminarCompletadas = () => {
        const completadas = todos.filter(todo => todo.estado);
        if (completadas.length === 0) {
            toast.info('No hay tareas completadas para eliminar');
            return;
        }
        setShowModal(true);
    };

    const confirmarEliminacion = () => {
        setTodos(prev => prev.filter(todo => !todo.estado));
        setShowModal(false);
        toast.success('🧹 Tareas completadas eliminadas');
    };

    const tareasFiltradas = todos.filter(todo => {
        if (filter === 'active') return !todo.estado;
        if (filter === 'completed') return todo.estado;
        if (filter === 'important') return todo.importante;
        return true;
    });

    const tareasPendientes = todos.filter(todo => !todo.estado).length;
    const tareasCompletadas = todos.length - tareasPendientes;
    const tareasImportantes = todos.filter(todo => todo.importante).length;

    return (
        <div className="todo-container">
            <div className="todo-header text-center mb-5">
                <h1 className="display-5 fw-bold text-primary">
                    <i className="bi bi-check2-circle me-2"></i>
                    Lista de Tareas
                </h1>
                <p className="text-muted">Organiza tu día con eficiencia</p>
                <Badge bg="primary" pill className="fs-6">
                    {todos.length} {todos.length === 1 ? 'tarea' : 'tareas'}
                </Badge>
            </div>

            <Form onSubmit={agregarTarea} className="mb-4 p-4 bg-light rounded-3 shadow-sm">
                <div className="d-flex gap-2">
                    <Form.Control
                        ref={tareaRef}
                        placeholder="¿Qué necesitas hacer hoy?"
                        aria-label="Nueva tarea"
                        className="py-2"
                    />
                    <Button variant="primary" type="submit" className="px-4">
                        <i className="bi bi-plus-lg me-1"></i> Agregar
                    </Button>
                </div>
            </Form>

            <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
                <Button 
                    variant={filter === 'all' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('all')}
                    className="rounded-pill px-3"
                >
                    <i className="bi bi-list-ul me-1"></i> Todas
                </Button>
                <Button 
                    variant={filter === 'active' ? 'success' : 'outline-success'}
                    onClick={() => setFilter('active')}
                    className="rounded-pill px-3"
                >
                    <i className="bi bi-hourglass-top me-1"></i> Pendientes
                </Button>
                <Button 
                    variant={filter === 'completed' ? 'secondary' : 'outline-secondary'}
                    onClick={() => setFilter('completed')}
                    className="rounded-pill px-3"
                >
                    <i className="bi bi-check2-all me-1"></i> Completadas
                </Button>
                <Button 
                    variant={filter === 'important' ? 'warning' : 'outline-warning'}
                    onClick={() => setFilter('important')}
                    className="rounded-pill px-3"
                >
                    <i className="bi bi-star me-1"></i> Importantes
                </Button>
            </div>

            {todos.length === 0 ? (
                <div className="text-center py-5 my-4 bg-light rounded-3">
                    <i className="bi bi-emoji-smile fs-1 text-muted"></i>
                    <p className="text-muted mt-2 fs-5">¡Tu lista está vacía!</p>
                    <p className="text-muted">Agrega tu primera tarea arriba</p>
                </div>
            ) : (
                <ListGroup className="mb-4 shadow-sm">
                    {tareasFiltradas.map(todo => (
                        <TodoItem 
                            key={todo.id}
                            todo={todo}
                            toggleEstado={toggleEstadoTarea}
                            toggleImportante={toggleImportante}
                            eliminarTarea={eliminarTarea}
                            updateTarea={updateTarea}
                        />
                    ))}
                </ListGroup>
            )}

            <ProgressChart total={todos.length} completed={tareasCompletadas} />

            <div className="todo-stats p-3 bg-light rounded-3 d-flex justify-content-between flex-wrap">
                <div className="stat-item">
                    <span className="text-primary fw-bold">{todos.length}</span>
                    <span className="text-muted ms-1">Total</span>
                </div>
                <div className="stat-item">
                    <span className="text-success fw-bold">{tareasCompletadas}</span>
                    <span className="text-muted ms-1">Completadas</span>
                </div>
                <div className="stat-item">
                    <span className="text-warning fw-bold">{tareasPendientes}</span>
                    <span className="text-muted ms-1">Pendientes</span>
                </div>
                <div className="stat-item">
                    <span className="text-danger fw-bold">{tareasImportantes}</span>
                    <span className="text-muted ms-1">Importantes</span>
                </div>
            </div>

            {tareasCompletadas > 0 && (
                <div className="text-center mt-3">
                    <Button 
                        variant="outline-danger" 
                        onClick={eliminarCompletadas}
                        className="rounded-pill px-4"
                    >
                        <i className="bi bi-trash me-1"></i> 
                        Limpiar completadas
                    </Button>
                </div>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title className="fw-bold">
                        <i className="bi bi-exclamation-triangle text-danger me-2"></i>
                        Confirmar eliminación
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de eliminar {todos.filter(t => t.estado).length} tareas completadas?
                    <div className="alert alert-warning mt-3">
                        <i className="bi bi-info-circle me-2"></i>
                        Esta acción no se puede deshacer
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)} className="rounded-pill px-4">
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmarEliminacion} className="rounded-pill px-4">
                        <i className="bi bi-trash me-1"></i> Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TodoList;
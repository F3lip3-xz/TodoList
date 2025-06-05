import { useState } from 'react';
import { ListGroup, Form, Button, Badge, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const TodoItem = ({ todo, toggleEstado, toggleImportante, eliminarTarea, updateTarea }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [dueDate, setDueDate] = useState(todo.fechaVencimiento ? new Date(todo.fechaVencimiento) : null);
    const [tags, setTags] = useState(todo.tags || []);
    const [editedTarea, setEditedTarea] = useState(todo.tarea);
    const { id, tarea, estado, fecha, importante } = todo;

    const handleDeleteConfirm = () => {
        eliminarTarea(id);
        setShowDeleteModal(false);
    };

    const handleSaveEdit = () => {
        updateTarea(id, { tarea: editedTarea, fechaVencimiento: dueDate, tags });
        setIsEditing(false);
    };

    return (
        <>
            <ListGroup.Item 
                className={`todo-item ${estado ? 'completed' : ''} ${importante ? 'important' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="d-flex align-items-center justify-content-between">
                    {isEditing ? (
                        <div className="d-flex align-items-center flex-grow-1 w-100">
                            <Form.Control
                                value={editedTarea}
                                onChange={(e) => setEditedTarea(e.target.value)}
                                className="me-3"
                            />
                            <DatePicker
                                selected={dueDate}
                                onChange={(date) => setDueDate(date)}
                                locale={es}
                                dateFormat="PPP"
                                className="me-3"
                                placeholderText="Fecha de vencimiento"
                            />
                            <Form.Control
                                value={tags.join(', ')}
                                onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
                                placeholder="Etiquetas (separadas por coma)"
                                className="me-3"
                            />
                            <Button variant="success" onClick={handleSaveEdit} className="me-2">
                                Guardar
                            </Button>
                            <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                Cancelar
                            </Button>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center flex-grow-1">
                            <Form.Check 
                                type="checkbox"
                                checked={estado}
                                onChange={() => toggleEstado(id)}
                                className={`me-3 ${importante ? 'important-check' : ''}`}
                                id={`todo-check-${id}`}
                            />
                            <label 
                                htmlFor={`todo-check-${id}`}
                                className={`todo-text mb-0 flex-grow-1 ${estado ? 'text-muted' : ''}`}
                                onDoubleClick={() => setIsEditing(true)}
                            >
                                <div className="d-flex align-items-center">
                                    {importante && (
                                        <i className="bi bi-star-fill text-warning me-2"></i>
                                    )}
                                    <span style={{ textDecoration: estado ? 'line-through' : 'none' }}>
                                        {tarea}
                                    </span>
                                </div>
                                {dueDate && (
                                    <small className="d-block text-muted mt-1">
                                        <i className="bi bi-calendar me-1"></i>
                                        Vence: {format(dueDate, 'PPP', { locale: es })}
                                    </small>
                                )}
                                {tags.length > 0 && (
                                    <div className="mt-1">
                                        {tags.map((tag, index) => (
                                            <Badge key={index} bg="secondary" className="me-1">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </label>
                        </div>
                    )}
                    
                    <div className="actions d-flex align-items-center">
                        <Button 
                            variant="link" 
                            className={`text-${importante ? 'warning' : 'secondary'} p-1 me-1`}
                            onClick={() => toggleImportante(id)}
                            title={importante ? 'Quitar importante' : 'Marcar como importante'}
                        >
                            <i className={`bi ${importante ? 'bi-star-fill' : 'bi-star'}`}></i>
                        </Button>
                        {isHovered && !isEditing && (
                            <Button 
                                variant="link" 
                                className="text-danger p-1"
                                onClick={() => setShowDeleteModal(true)}
                                title="Eliminar tarea"
                            >
                                <i className="bi bi-trash"></i>
                            </Button>
                        )}
                    </div>
                </div>
            </ListGroup.Item>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title className="fw-bold">
                        <i className="bi bi-exclamation-triangle text-danger me-2"></i>
                        Confirmar eliminación
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de eliminar la tarea "{tarea}"?
                    <div className="alert alert-warning mt-3">
                        <i className="bi bi-info-circle me-2"></i>
                        Esta acción no se puede deshacer
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className="rounded-pill px-4">
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm} className="rounded-pill px-4">
                        <i className="bi bi-trash me-1"></i> Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TodoItem;
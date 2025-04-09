import { useState } from 'react';
import { ListGroup, Form, Button, Badge } from 'react-bootstrap';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const TodoItem = ({ todo, toggleEstado, toggleImportante, eliminarTarea }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { id, tarea, estado, fecha, importante } = todo;

    return (
        <ListGroup.Item 
            className={`todo-item ${estado ? 'completed' : ''} ${importante ? 'important' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="d-flex align-items-center justify-content-between">
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
                    >
                        <div className="d-flex align-items-center">
                            {importante && (
                                <i className="bi bi-star-fill text-warning me-2"></i>
                            )}
                            <span style={{ textDecoration: estado ? 'line-through' : 'none' }}>
                                {tarea}
                            </span>
                        </div>
                        
                        {fecha && (
                            <small className="d-block text-muted mt-1">
                                <i className="bi bi-calendar me-1"></i>
                                {format(new Date(fecha), 'PPP', { locale: es })}
                            </small>
                        )}
                    </label>
                </div>
                
                <div className="actions d-flex align-items-center">
                    <Button 
                        variant="link" 
                        className={`text-${importante ? 'warning' : 'secondary'} p-1 me-1`}
                        onClick={() => toggleImportante(id)}
                        title={importante ? 'Quitar importante' : 'Marcar como importante'}
                    >
                        <i className={`bi ${importante ? 'bi-star-fill' : 'bi-star'}`}></i>
                    </Button>
                    
                    {isHovered && (
                        <Button 
                            variant="link" 
                            className="text-danger p-1"
                            onClick={() => eliminarTarea(id)}
                            title="Eliminar tarea"
                        >
                            <i className="bi bi-trash"></i>
                        </Button>
                    )}
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default TodoItem;
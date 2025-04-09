import { Fragment } from 'react';

const TodoItem = ({ todo, cambiarEstado }) => {
    const { id, tarea, estado } = todo;
    const fnCambiarEstado = () => {
        cambiarEstado(id);
    };
    return (
        <Fragment>
            <li className='list-group-item d-flex justify-content-between'>
                {tarea}
                <input 
                type="checkbox" 
                className="form-check-input" 
                checked={estado} 
                onChange={fnCambiarEstado} 
                />
            </li>
        </Fragment>
    );
};

export default TodoItem;
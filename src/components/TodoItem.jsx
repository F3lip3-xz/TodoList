import { Fragment } from "react";

const TodoItem = (props) => {
    return(
        <Fragment>
            <li className='list-group-item'>{props.todo.tarea}</li>
        </Fragment>
    )
}

export default TodoItem;
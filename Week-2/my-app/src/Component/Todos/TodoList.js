import React from 'react';
import {useTodoCrud} from "./TodoCrud";
function TodoList({todo}) {
    const {updateTodo, deleteTodo} = useTodoCrud()

    return (
        <div
            className="todo"
            style={{textDecoration: todo.isCompleted ? "line-through" : ""}}
        >
            {todo.name}
            <div>
                <button onClick={() => updateTodo(todo.id)}>Complete</button>
                <button onClick={() => deleteTodo(todo.id)}>x</button>
            </div>
        </div>
    );
};

export default TodoList;
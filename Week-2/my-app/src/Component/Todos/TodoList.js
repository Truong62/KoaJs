import React from 'react';
import { useTodoCrud } from "./TodoCrud";
import useFetchApi from "../../Hook/useFetchApi";
import AddFormTodoList from "../Todos/formTodoList";

function TodoList() {
    const { updateTodo, deleteTodo } = useTodoCrud()
    const { datas, loading, setDatas } = useFetchApi("http://localhost:5001/api/todolist/");

    return (
        <div>
            {loading ? <h1>Loading</h1> :
                <div className="todo-list">
                    {datas.map((todo, index) => (
                        <div
                            key={index}
                            className="todo"
                            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
                        >
                            {todo.name}
                            <div>
                                <button onClick={() => updateTodo(todo.id)}>Complete</button>
                                <button onClick={() => deleteTodo(todo.id)}>x</button>
                            </div>
                        </div>
                    ))}
                    <AddFormTodoList setdatas={setDatas}></AddFormTodoList>
                </div>}
        </div>
    );
};

export default TodoList;
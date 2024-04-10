import React from 'react';
import { useTodoCrud } from "./TodoCrud";
import useFetchApi from "../../Hook/useFetchApi";
import AddFormTodoList from "../Todos/formTodoList";

function TodoList() {
    const { updateTodo, deleteTodo } = useTodoCrud()
    const { datas, loading, setDatas } = useFetchApi("http://localhost:5001/api/todolist/");
    const updateOnClick = async (id) => {
       const req =  await updateTodo(id)
       setDatas((prev) =>{
        return prev.map((item) => {
            if(item.id === req.id){
                return req
            }
            return item
        })
       })
    }
    const deleteOnClick = async (id) => {
       const req =  await deleteTodo(id)
       setDatas(req)
    }
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
                                <button onClick={() => updateOnClick(todo.id)}>Complete</button>
                                <button onClick={() => deleteOnClick(todo.id)}>x</button>
                            </div>
                        </div>
                    ))}
                    <AddFormTodoList setdatas={setDatas}></AddFormTodoList>
                </div>}
        </div>
    );
};

export default TodoList;
import React from "react";
import "./App.css";
import useFetchApi from "../../Hook/useFetchApi";
import AddFormTodoList from "../Todos/formTodoList";
import TodoList from "../Todos/TodoList";


function App() {

    const {datas, loading} = useFetchApi("http://localhost:5000/api/todolist/");

    return (
        <div className="app">
            {loading ? <h1>Loading</h1> :
                <div className="todo-list">
                    {datas.map((todo, index) => (
                        <TodoList
                            key={index}
                            todo={todo}
                        />
                    ))}
                    <AddFormTodoList ></AddFormTodoList>
                </div>}
        </div>
    );
}

export default App;

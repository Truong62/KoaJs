import React from "react";
import "./App.css";
import TodoList from "../Todos/TodoList";
import TopBarExample from "../Shopify/topBar";


function App() {
    return (
        <>
            <TopBarExample></TopBarExample>
            <TodoList ></TodoList>
        </>
    )
}

export default App;

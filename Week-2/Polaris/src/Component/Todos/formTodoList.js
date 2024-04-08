import React from 'react';
import {useTodoCrud} from "./TodoCrud";

function AddFormTodoList() {
    const { addTodo } = useTodoCrud();
    const [value, setValue] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}
export default AddFormTodoList;


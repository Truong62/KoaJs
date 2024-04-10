import React from 'react';
import {useTodoCrud} from "./TodoCrud";

function AddFormTodoList({setdatas}) {
    const { addTodo } = useTodoCrud();
    const [value, setValue] = React.useState("");

    const handleSubmit =async e => {
        e.preventDefault();
        if (!value) return;
        const dataNew =  await addTodo(value);
        setdatas(dataNew)
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


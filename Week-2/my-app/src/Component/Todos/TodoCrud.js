import useFetchApi from "../../Hook/useFetchApi";

const fetchApi = async (url, method, body) => {
    const req = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return req.json()
}
export const useTodoCrud = () => {
    const { datas } = useFetchApi("http://localhost:5001/api/todolist/");
    const addTodo = async text => {
        const req = await fetchApi("http://localhost:5001/api/todolist", "POST", { name: text, "isCompleted": false })
        return req.data
    };
    const updateTodo = async id => {
        const todoById = datas.find(todo => todo.id === id);
        console.log(JSON.stringify({ id: todoById.id, name: todoById.name, "isCompleted": true }))
        await fetchApi("http://localhost:5001/api/todolist/" + id, "PUT", {
            id: todoById.id,
            name: todoById.name,
            "isCompleted": true
        })
    };
    const deleteTodo = async id => {
        const newData = datas.filter(todo => todo.id === id);
        if (newData.length > 0) {
            await fetchApi("http://localhost:5001/api/todolist/" + id, "DELETE")
        }
    };
    return { addTodo, updateTodo, deleteTodo };
};
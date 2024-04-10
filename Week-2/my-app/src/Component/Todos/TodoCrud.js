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
        if (todoById) {
            const req = await fetchApi("http://localhost:5001/api/todolist/" + id, "PUT", {
                name: todoById.name,
                "isCompleted": true
            })
            return req.data
        }
    };
    const deleteTodo = async id => {
        const newData = datas.filter(todo => todo.id === id);
        if (newData.length > 0) {
            const req = await fetchApi("http://localhost:5001/api/todolist/" + id, "DELETE")
            return req.data
        }
    };
    return { addTodo, updateTodo, deleteTodo };
};
import useFetchApi from "../../Hook/useFetchApi";

const fetchApi = async (url, method, body) => {
    await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export const useTodoCrud = () => {
    const {datas} = useFetchApi("http://localhost:5001/api/todolist/");
    const addTodo = async text => {
        let id = Math.floor(Math.random() * 1000);
        while (datas.some(todo => todo.id === id)) {
            id = Math.floor(Math.random() * 1000);
        }
        await fetchApi("http://localhost:5001/api/todolist", "POST", {id, name: text, "isCompleted": false})
    };
    const updateTodo = async id => {
        const todoById = datas.find(todo => todo.id === id);
        console.log(JSON.stringify({id: todoById.id, name: todoById.name, "isCompleted": true}))
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
    return {addTodo, updateTodo, deleteTodo};
};
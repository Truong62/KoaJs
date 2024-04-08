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
    const {datas,setDatas} = useFetchApi("http://localhost:5001/api/todolist/");
    const addTodo = async text => {
        const data = { name: text,isCompleted: false}
        await fetchApi("http://localhost:5001/api/todolist", "POST",data)
       return data
    };
    const updateTodo = async id => {
        const todoById = datas.find(todo => todo.id === id);
       const Newdata =  await fetchApi("http://localhost:5001/api/todolist/" + id, "PUT", {
            name: todoById.name,
            "isCompleted": true
        })
        return Newdata
    };
    const deleteTodo = async id => {
        const newData = datas.filter(todo => todo.id === id);
        if (newData.length > 0) {
            await fetchApi("http://localhost:5001/api/todolist/" + id, "DELETE")
        }
    };

    return {addTodo, updateTodo, deleteTodo};
};
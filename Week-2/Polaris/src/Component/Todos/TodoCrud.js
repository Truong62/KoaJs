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
    const addTodo = async text => {
        const data = { name: text, isCompleted: false }
        const req = await fetchApi("http://localhost:5001/api/todolist", "POST", data)
        return req.data
    };
    const updateTodo = async (id, status) => {
        try {
            const req = await fetchApi("http://localhost:5001/api/todolist", "PUT", {
                dataId: id,
                status
            })
            return req.data
        } catch (e) {
            console.log(e)
        }
    };
    const deleteTodo = async id => {
        try {
            const req = await fetchApi("http://localhost:5001/api/todolist/" + id, "DELETE");
            return req.data;
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    };
    const deletes = async id => {
        try {
            const req = await fetchApi("http://localhost:5001/api/todolists", "PUT", {
                dataId: id
            });
            return req.data;
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    };

    return { addTodo, updateTodo, deleteTodo, deletes };
};
const fs = require("fs");
const db = require("./connectFirebase")

const getTodosList = async () => {
  const citiesRef = db.collection('cities');
  const snapshot = await citiesRef.get();
  const todos = snapshot.docs.map(doc => doc.data())
  return todos
}

async function getAll() {
  const req = await getTodosList()
  return req
}

function getOne(id) {
  return todos.find((todo) => todo.id === parseInt(id));
}

function add(data) {
  let id;
  do {
    id = Math.floor(Math.random() * 1000);
  } while (todos.some((todo) => todo.id === id))
  const dataNew = [{ id, ...data }, ...todos];
  fs.writeFileSync(
    "./src/database/todoList.json",
    JSON.stringify({
      data: dataNew,
    })
  );
  return dataNew;
}
async function updates(ids) {
  if (ids.dataId.length > 1) {
    console.log(ids.status)
    const newData = todos.map(todo => {
      if (ids.dataId.includes(todo.id)) {
        return (ids.status === "complete" ? { ...todo, isCompleted: true } : { ...todo, isCompleted: false });
      } else {
        return todo;
      }
    });
    await fs.writeFile(
      "./src/database/todoList.json",
      JSON.stringify({ data: newData }),
      err => { }
    );
    return newData
  }
  if (Array.isArray(ids.dataId) || typeof ids.dataId === 'number') {
    const newData = todos.map(todo => {
      if (Array.isArray(ids.dataId) ? ids.dataId.includes(todo.id) : todo.id === ids.dataId) {
        return (ids.status === "complete" ? { ...todo, isCompleted: true } : { ...todo, isCompleted: false });
      }
      return todo;
    });
    await fs.promises.writeFile(
      "./src/database/todoList.json",
      JSON.stringify({ data: newData })
    );
    return newData;
  }
}

async function deleteById(id) {
  const newData = todos.filter((todo) => todo.id !== parseInt(id));
  if (newData.length !== todos.length) {
    await fs.writeFile(
      "./src/database/todoList.json",
      JSON.stringify({ data: newData }),
      (err) => { }
    );
    return newData
  }
  if (newData.length === todos.length) {
    return todos
  }
}

async function multipleDelete(ids) {
  const newData = todos.filter(todo => !ids.dataId.includes(todo.id));

  if (newData.length !== todos.length) {
    await fs.writeFile(
      "./src/database/todoList.json",
      JSON.stringify({ data: newData }),
      err => { }
    );
    return newData;
  } else {
    return todos;
  }
}
module.exports = {
  getOne,
  getAll,
  add,
  updates,
  deleteById,
  multipleDelete
};

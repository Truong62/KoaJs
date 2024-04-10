const fs = require("fs");
const { data: todos } = require("./todoList.json");

function getAll() {
  return todos;
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
function updateById(id, newData) {
  const todo = todos.find((product) => product.id === parseInt(id));
  if (todo) {
    Object.assign(todo, { id: parseInt(id), ...newData });
    fs.writeFile(
      "./src/database/todoList.json",
      JSON.stringify({ data: todos }),
      (err) => { }
    );
    return todo
  }
  if (!todo) {
    return todos
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
module.exports = {
  getOne,
  getAll,
  add,
  updateById,
  deleteById,
};

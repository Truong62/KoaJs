const db = require("./connectFirebase")

async function getAll() {
  const citiesRef = db.collection('Products');
  const snapshot = await citiesRef.get();
  const todos = snapshot.docs.map(doc => doc.data())
  return todos
}

async function getOne(id) {
  const cityRef = db.collection('Products').doc(id);
  const doc = await cityRef.get();
  return doc.data()
}

async function add(data) {
  console.log(data)
  const res = await db.collection('Products').add(data);
  const dataNew=  await db.collection('Products').doc(res.id).get();
  return dataNew.data()
}
async function updates(ids) {
  if (ids.dataId.length > 1) {
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

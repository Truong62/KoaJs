const db = require("./connectFirebase")

async function getAll() {
  const citiesRef = db.collection('todos');
  const snapshot = await citiesRef.get();
  const todos = snapshot.docs.map(doc => doc.data())
  return todos
}

async function getOne(id) {
  const cityRef = db.collection('todos').doc(id);
  const doc = await cityRef.get();
  return doc.data()
}

async function add(data) {
  const res = await db.collection('todos').add({
    ...data,
    isCompleted: false
  });
  const dataNew = await db.collection('todos').doc(res.id).get();
  return dataNew.data()
}
async function updates(data) {
  try {
    const docRef = db.collection('todos').doc(data.id);
    let updatedData;

    if (data.status === "complete") {
      await docRef.update({ isCompleted: true });
    } else if (data.status === "incomplete") {
      await docRef.update({ isCompleted: false });
    }

    const doc = await docRef.get();
    updatedData = doc.data();

    return updatedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteById(id) {
  const res = await db.collection('cities').doc(id).delete();
  const newData = await getAll(); 
  return newData;
}

async function multipleDelete(ids) {
  const deletePromises = ids.map(id => deleteById(id));

  try {
    await Promise.all(deletePromises);
    const newData = await getAll();
    await updateDataOnFirebase(newData);
    return newData;
  } catch (error) {
    console.error("Error deleting multiple items:", error);
    throw error;
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
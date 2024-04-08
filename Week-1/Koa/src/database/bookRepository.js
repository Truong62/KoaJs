const fs = require("fs");
const { data: books } = require("./books.json");

/**
 *
 * @returns {[{author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}, {author: string, name: string, id: number}]}
 */
function getAll() {
  return books;
}

/**
 *
 * @param id
 * @returns {{author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number}}
 */
function getOne(id) {
  return books.find((book) => book.id === parseInt(id));
}

/**
 *
 * @param data
 */
function add(data) {
  let id;
  while (books.some((todo) => todo.id === id)) {
    id = Math.floor(Math.random() * 1000);
  }
  const updatedBooks = [{ id, ...data }, ...books];
  return fs.writeFileSync(
    "./src/database/books.json",
    JSON.stringify({
      data: updatedBooks,
    })
  );
}
function updateById(id, newData) {
  const book = books.find((product) => product.id === parseInt(id));
  if (book) {
    Object.assign(book, {id ,...newData});
     fs.writeFile(
      "./src/database/books.json",
      JSON.stringify({ data: books }),
      (err) => {}
    );
    return{ data: books }
  }
}

function deleteById(id) {
  const newData = books.filter((book) => book.id !== parseInt(id));
  if (newData.length !== books.length) {
    return fs.writeFile(
      "./src/database/books.json",
      JSON.stringify({ data: newData }),
      (err) => {}
    );
  }
}
module.exports = {
  getOne,
  getAll,
  add,
  updateById,
  deleteById,
};

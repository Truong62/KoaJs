const Router = require('koa-router');
const todos = require('../handlers/todos/todosHandlers');
const productHandler = require('../handlers/product/productHandler');
const todoInputMiddleware = require('../middleware/todoInputMiddleware');
const productInputCheckJsonMiddleware = require('../middleware/productInputCheckJsonMiddleware');
const productUpdateMiddleware = require('../middleware/productUpdateMiddleware');


// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

// Routes will go here
router.get('/todolist', todos.getTodos);
router.get('/todolist/:id', todos.getTodo);
router.post('/todolist',todoInputMiddleware, todos.save);
router.put('/todolist', todos.update);
router.delete('/todolist/:id', todos.deleteTodo);
router.put('/todolists', todos.deletes);

//product
router.get('/products', productHandler.getProducts);
router.get('/product/:id', productHandler.getProduct);
router.post('/products', productInputCheckJsonMiddleware, productHandler.save);
router.put('/product/:id', productUpdateMiddleware, productHandler.update);
router.delete('/product/:id', productHandler.deleteProductById);

//view
router.get('/views', productHandler.viewALlProduct);
router.get('/view/:id', productHandler.viewProductById);

module.exports = router;

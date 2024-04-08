const Router = require('koa-router');
const bookHandler = require('../handlers/books/bookHandlers');
const productHandler = require('../handlers/product/productHandler');

const bookInputMiddleware = require('../middleware/bookInputMiddleware');
const productInputCheckJsonMiddleware = require('../middleware/productInputCheckJsonMiddleware');
const productUpdateMiddleware = require('../middleware/productUpdateMiddleware');


// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

// Routes will go here
router.get('/todolist', bookHandler.getBooks);
router.get('/todolist/:id', bookHandler.getBook);
router.post('/todolist',bookInputMiddleware, bookHandler.save);
router.put('/todolist/:id', bookHandler.update);
router.delete('/todolist/:id', bookHandler.deleteBook);

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

const express = require("express")
const router = express.Router();

const{ fetch,store, update, remove ,getProductById}= require("../controller/products");

const { checkAuthentication } = require("../middleware/auth");


router.get('/api/products', fetch)

router.get('/api/products/:id', getProductById)

router.post('/api/products', checkAuthentication, store )

router.put('/api/products/:id', checkAuthentication, update);

router.delete('/api/products/:id', checkAuthentication, remove);

router.post('/api/orders', checkAuthentication, (req, res) => {
    res.send("orders created.")
})


module.exports = router;
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/multer');

// Middleware for overriding methods
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

router.get('/',productController.getAllProducts); //show all product
router.get('/create',productController.renderCreateForm); //show create form
router.post('/', upload.single('image'),productController.createProduct); //create 
router.get('/:id', productController.getProductById); // Show product details
router.get('/:id/edit', productController.renderEditForm); // Show edit form
router.put('/:id', upload.single('image'),productController.updateProduct); // Update product
router.delete('/:id', productController.deleteProduct); // Delete product
// router.get('/show/:id',productController.exploreRecipe);
router.get('/products/:id' , productController.getProductById); // To link to product details



module.exports = router;


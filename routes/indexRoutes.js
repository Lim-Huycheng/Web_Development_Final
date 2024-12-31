const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Middleware for overriding methods
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

router.get('/',indexController.getListProduct);
//link to explore-latest and random-recipe
router.get('/explore-latest', (req, res) => {
    res.render('index/explore-latest'); 
  });

  router.get('/random-recipe', (req, res) => {
    res.render('index/random-recipe'); 
  });

  router.get('/explore-categories', (req, res) => {
    res.render('index/explore-categories'); 
  });
//

module.exports = router;
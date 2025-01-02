const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const mysql = require('mysql');
const multer = require('multer');

// Middleware for overriding methods
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gproducts'
});

db.connect(err => {
  if (err) {
      console.error('Database connection failed:', err.message);
      return;
  }
  console.log('Connected to the database');
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Adjust path to save images in the "public/uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid duplicate filenames
  },
});
const upload = multer({ storage });

// Route to display all reviews
router.get('/index-review', (req, res) => {
  const query = 'SELECT * FROM product_review'; // Fetch all reviews from the "reviews" table
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('index/index-review', { 'product_review': results }); // Pass the fetched reviews to the EJS template
  });
});

// Route to display the "Add New Review" form
router.get('/index/create-review', (req, res) => {
  res.render('index/create-review'); // Render the review creation form
});

// Route to handle form submissions and save reviews to the database
router.post('/index', upload.single('image'), (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO reviews (food_name, price, review, image) VALUES (?, ?, ?, ?)';
  db.query(query, [name, parseFloat(price), description, image], (err) => {
    if (err) {
      console.error('Error saving the review:', err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.redirect('/index-review'); // Redirect to the reviews page after successful submission
  });
});


router.get('/',indexController.getListProduct);
//link to explore-latest and random-recipe
  router.get('/explore-latest', (req, res) => {
    res.render('index/exploremenu'); 
  });

  router.get('/random-recipe', (req, res) => {
    res.render('index/random-recipe'); 
  });

  router.get('/explore-categories', (req, res) => {
    res.render('index/explore-categories'); 
  });

  router.get('/index-review', (req, res) => {
    res.render('index/index-review'); 
  });
//

router.get('/user/about', (req, res) => {
    const pageTitle = 'About Us';
    const pageDescription = 'Welcome to our website! Learn more about who we are and what we do.';
    const missionImage = 'https://media1.popsugar-assets.com/files/thumbor/oYivacUQxsjybVn80tgpJo2bahw/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/06/10/017/n/1922398/bc378e5c_shutterstock_93720934.jpg';
    const teamMembers = [
        { name: 'Mao Sophanit', role: 'Founder & CEO', image: 'https://th.bing.com/th/id/OIP.iFDtKpFs4zo6nFgdtQlMgwHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3' },
        { name: 'Lim Huycheng', role: 'Restaurant Manager', image: 'https://th.bing.com/th/id/OIP.UVA3L3Y5jgBDnxHvBYWCpgHaHQ?pid=ImgDet&w=184&h=179&c=7&dpr=1.3' },
        { name: 'Keo Sokanya', role: 'Marketing Director', image: 'https://th.bing.com/th/id/OIP.iOT9EqE55c6X0lsmUymxFgHaJ4?pid=ImgDet&w=184&h=246&c=7&dpr=1.3' },
        { name: 'Huon Sreynuth', role: 'Head Chef', image: 'https://th.bing.com/th/id/OIP.wNhO_nVpnxLtXq4vPT-6tgHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3' }
    ];

    res.render('user/about', { pageTitle, pageDescription, missionImage, teamMembers });
});


router.get('/user/contact', (req, res) => {
  const pageTitle = 'Contact Us';
  res.render('user/contact', { pageTitle }); // Correct file path
});

// Route for displaying the explore menu
router.get('/exploremenu', (req, res) => {
  const query = 'SELECT id, name, price, description, image, created_at FROM products'; // Fetch 10 foods with id, name, description, and image_path
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching food data:', err.message);
          res.status(500).send('Internal Server Error');
          return;
      }
      res.render('index/exploremenu', { products: results }); // Pass the fetched foods to the template
  });
});

// Route for displaying food details
router.get('/exploremenu/:id', (req, res) => {
  const foodId = req.params.id;
  const query = 'SELECT * FROM products WHERE id = ?'; // Fetch food details by id
  db.query(query, [foodId], (err, results) => {
      if (err) {
          console.error('Error fetching food details:', err.message);
          res.status(500).send('Internal Server Error');
          return;
      }
      if (results.length === 0) {
          res.status(404).send('Food not found');
          return;
      }
      res.render('index/food-details', { food: results[0] }); // Pass the food details to the template
  });
});


module.exports = router;

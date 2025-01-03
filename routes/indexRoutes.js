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
  database: 'gproducts',
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
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Route to display all reviews
router.get('/index-review', (req, res) => {
  const query = 'SELECT food_name, price, review, image FROM product_review';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err.message);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.render('index/index-review', {
      productReview: results,
      success: req.query.success === 'true',
    });
  });
});

// Route to display the "Add New Review" form
router.get('/index/create-review', (req, res) => {
  res.render('index/create-review');
});

// Route to handle form submissions and save reviews to the database
router.post('/index', upload.single('image'), (req, res) => {
  const { name: food_name, price, description: review } = req.body;
  const image = req.file ? req.file.filename : null;

  const query = 'INSERT INTO product_review (food_name, price, review, image) VALUES (?, ?, ?, ?)';
  const values = [food_name, price, review, image];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting review:', err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.redirect('/index-review?success=true');
  });
});

// Route to display the reviews in a table format
router.get('/index/see-review', (req, res) => {
  const query = 'SELECT food_name, price, review, image FROM product_review';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err.message);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render the "see-review" template with data
    res.render('index/see-review', {
      productReview: results,
    });
  });
});


//link to explore-latest
  router.get('/explore-latest', (req, res) => {
    res.render('index/exploremenu'); 
  });


//About Us section
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

//Contact Us page
router.get('/user/contact', (req, res) => {
  const pageTitle = 'Contact Us';
  res.render('user/contact', { pageTitle }); // Correct file path
});

// Route for displaying the explore menu
router.get('/exploremenu', (req, res) => {
  const query = 'SELECT id, name, price, description, image, created_at FROM products';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching food data:', err.message);
          res.status(500).send('Internal Server Error');
          return;
      }
      res.render('index/exploremenu', { products: results });
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

// Search route for products
//router.get("/", indexController.getListProduct); // Route to show all products
router.get('/search', indexController.search);

router.get("/", indexController.getListRecentProducts); //route to show 5 recents  product


//Show 5 latest products
//router.get('/latest-product', async (req, res) => {
//  try {
      // Fetch 5 most recent products
//      const [products] = await db.query(
//          'SELECT * FROM products ORDER BY created_at DESC LIMIT 5'
//      );

      // Ensure only 5 products are being sent
//      console.log('Fetched Products:', products); // Debugging

      // Render the homepage with the 5 products
//      res.render('index/latest-product', { products });
//  } catch (error) {
//      console.error('Error fetching products:', error);
//      res.status(500).send('Internal Server Error');
//  }
//});

module.exports = router;

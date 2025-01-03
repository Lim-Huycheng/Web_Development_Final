const Product = require("../models/productModel");

//exports.getListProduct = async (req,res) => {
//    try{
//        const products = await Product.getAll();
//        title = "List Product";
//        res.render('index/index',{products ,title});
    
//    }catch(err){
//        res.status(500).send("Error fetching products");
//    }
//};

exports.getListRecentProducts = async (req, res) => {
  try {
      const products = await Product.getRecent(); // Fetch 5 most recent products
      const title = "Recent Products";
      res.render('index/index', { products, title });
  } catch (err) {
      res.status(500).send("Error fetching recent products");
  }
};

exports.search = async (req, res) => {
    try {
      const searchTerm = req.query.searchTerm; // Get the search term from the query string
  
      // Use the search method in the Product model to find matching products
      const products = await Product.search(searchTerm);
  
      // Render the search results page and pass the products
      res.render("index/search", { products, searchTerm });
    } catch (err) {
      console.error("Error during search:", err);
      res.status(500).send("Internal Server Error");
    }
  };

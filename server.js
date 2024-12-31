require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const productRoutes = require('./routes/productRoutes');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
// Middleware
app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret: 'cyber cadt idri idt idg',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }));
//   // Configure flash middleware
// app.use(flash());
  


app.use(session({ 
    secret:'cyber cadt idri idt idg', 
    saveUninitialized: true, 
    resave: true
})); 
  
// Configure flash middleware
app.use(flash());

// Make flash messages available in all views (with res.locals)
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});


app.set('view engine','ejs');

//######### login
app.get('/user/login', (req, res) => {
 res.render('user/login');  // This will automatically look for views/user/login.ejs
});

 app.post('/user/login', (req, res) => {
  const { username, password } = req.body;

  // Example validation (replace with your actual logic)
 
});


 app.use(express.static(path.join(__dirname, 'public')));
//###################
//######### new login


// Set up routes

app.use(express.json());
app.use('/user', userRoutes);



//#############
const PORT = process.env.PORT || 3000;



app.use('/uploads', express.static('public/uploads'));
app.use('/product',productRoutes);
app.use('/', indexRoutes);


app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
});
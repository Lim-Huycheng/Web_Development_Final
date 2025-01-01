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





app.get('/about', (req, res) => {
    const pageTitle = 'About Us';
    const pageDescription = 'Welcome to our website! Learn more about who we are and what we do.';
    const missionImage = 'https://media1.popsugar-assets.com/files/thumbor/oYivacUQxsjybVn80tgpJo2bahw/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/06/10/017/n/1922398/bc378e5c_shutterstock_93720934.jpg';
    const teamMembers = [
        { name: 'Mao Sophanith', role: 'Founder & CEO', image: 'https://th.bing.com/th/id/OIP.iFDtKpFs4zo6nFgdtQlMgwHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3' },
        { name: 'Lim Huycheng', role: 'Restaurant Manager', image: 'https://th.bing.com/th/id/OIP.UVA3L3Y5jgBDnxHvBYWCpgHaHQ?pid=ImgDet&w=184&h=179&c=7&dpr=1.3' },
        { name: 'Keo Sokanya', role: 'Marketing Director', image: 'https://th.bing.com/th/id/OIP.iOT9EqE55c6X0lsmUymxFgHaJ4?pid=ImgDet&w=184&h=246&c=7&dpr=1.3' },
        { name: 'Huon Sreynuth', role: 'Head Chef', image: 'https://th.bing.com/th/id/OIP.wNhO_nVpnxLtXq4vPT-6tgHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3' }
    ];

    res.render('about', { pageTitle, pageDescription, missionImage, teamMembers });
});


app.get('/contact', (req, res) => {
    const pageTitle = 'Contact Us';
    res.render('contact', { pageTitle });
});

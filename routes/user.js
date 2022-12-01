const express = require('express');
const router = express.Router();
 
const sessions = require('express-session');
router.use(sessions({
    resave: true,
    saveUninitialized: true,
    secret: 'secretpassword',
}))

router.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

const usercontroller = require('../controllers/userController');

router.get('/register', usercontroller.register,);

router.post('/register', usercontroller.insertUser);

router.get('/', usercontroller.loadUser);

router.get('/login', usercontroller.loadUser);

router.post('/login', usercontroller.userverification);

router.get('/home', usercontroller.loadHome);

router.get('/logout', usercontroller.logout);

module.exports = router;

const express=require('express');
const router=express.Router();

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

const admincontroller=require('../controllers/adminController');

router.get('/',admincontroller.loadAdmin);

router.get('/login',admincontroller.loadAdmin);

router.post('/login',admincontroller.adminverification);

router.get('/home',admincontroller.adminhomepageload);

router.get('/adminlogout',admincontroller.adminlogout);

router.get('/new-user',admincontroller.newUserLoad);

router.post('/new-user',admincontroller.addUser);

router.get('/edit-user',admincontroller.editUser);

router.post('/edit-user',admincontroller.updateUser);

router.get('/delete-user',admincontroller.deleteUser);

module.exports=router; 
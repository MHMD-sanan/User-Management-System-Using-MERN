const User = require('../models/userModel');

const loadUser = async (req, res) => {
    if (req.session.email) {
        res.redirect('/home');
    }
    else {
        try {
            res.render('../views/User/userLogin');
        } catch (error) {
            console.log(error.message)
        }
    }
}

const register = async (req, res) => {
    if (req.session.email) {
        res.redirect('/home')
    } else {
        try {
            res.render('../views/User/register.ejs');
        } catch (error) {
            console.log(error.message);
        }
    }
}

const insertUser = async (req, res) => {
    let user1;
    try {
        user1 = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (email === user.email) {
            res.render('../views/User/register', { error: "Email Already Exits" });
        }
    } catch (error) {
        const userData = user1.save();
        res.render('../views/User/register', { succ: "Registration Success Please Sign In" });
    }
}

let user;
const userverification = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        user = await User.findOne({ email: email });
        if (user) {
            if (email === user.email && password === user.password) {
                req.session.email = req.body.email;
                console.log('session created');
                res.redirect('/home');
            } else {
                res.render('../views/User/userLogin.ejs', { wrong: "Invalid Credentials" });
            }
        } else {
            res.render('../views/User/userLogin.ejs', { wrong: "User Not Found" });
        }
    } catch (error) {
        console.log(error.message);
        //edit
        res.render('../views/User/userLogin.ejs', { wrong: "Invalid Credentials" });
    }
}

const loadHome = async (req, res) => {
    if (req.session.email) {
        res.render('../views/User/userHome.ejs', { user });
    }
    else {  
        res.redirect('/');
    }
}

const logout = async (req, res) => {
    req.session.destroy();
    console.log('session disstroyed');
    res.redirect('/');
    res.end();
}

module.exports = {
    userverification,
    loadUser,
    insertUser,
    register,
    loadHome,
    logout
}
const { response } = require('express');
const Admin = require('../models/adminModel');
const User = require('../models/userModel');

const loadAdmin = async (req, res) => {
    if(req.session.email){
        res.redirect('/admin/home');
    }else{
        res.render('../views/Admin/adminLogin');
    }
}

const adminverification = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const admin = await Admin.findOne({ email: email });
        if (admin) {
            if (email === admin.email && password === admin.password) {
                req.session.email = req.body.email;
                console.log('session created');
                res.redirect('/admin/home');
            } else {
                res.render('../views/Admin/adminLogin.ejs', { wrong: "Invalid Credentials" });
            }
        } else {
            res.render('../views/Admin/adminLogin.ejs', { wrong: "Admin Not Found" });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const adminhomepageload = async (req, res) => {
    if(req.session.email){
        try {
            User.find({}, (err, userdetails) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('../views/Admin/adminHome.ejs', { details: userdetails })
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }else{
        res.redirect('/admin');
    }
}

const adminlogout = async (req, res) => {
    req.session.destroy();
    console.log('session deleted');
    res.redirect('/admin');
    res.end();
}

const newUserLoad = async (req, res) => {
    if(req.session.email){
        try {
            res.render('../views/Admin/new-user',)
        } catch (error) {
            console.log(error.message);
        }
    }else{
        res.redirect('/admin');
    }
}

const addUser = async (req, res) => {
    let user1;
    if(req.session.email){
        try {
            user1 = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            const email = req.body.email;
            const user = await User.findOne({ email: email });
            if (email === user.email) {
                res.render('../views/Admin/new-user', { wrong: "Email Already Exits" });
            }
            //else{
            //     const userData= user1.save();
            //     res.render('../views/Admin/new-user',{wrong:"Registration success"});
            // }
        } catch (error) {
            user1.save();
            res.render('../views/Admin/new-user', { wrong: "Registration Success" });
        }
    }else{
        res.redirect('/admin')
    }
}

const editUser = async (req, res) => {
    if(req.session.email){
        try {
            const id = req.query.id;
            const userData = await User.findById({ _id: id });
            if (userData) {
                res.render('../views/Admin/edit-user', { user: userData });
            } else {
                res.redirect('/admin/home');
            }
    
        } catch (error) {
            console.log(error.message);
        }
    }else{
        res.redirect('/admin');
    }
}

const updateUser = async (req, res) => {
    if(req.session.email){
        try {
            const userData = await User.findByIdAndUpdate({ _id: req.query.id }, { $set: { name: req.body.name, email: req.body.email, password: req.body.password } });
            res.redirect('/admin/home');
        } catch (error) {
            console.log(error.message);
        }
    }else{
        res.redirect('/admin');
    }
}

const deleteUser = async (req, res) => {
    if(req.session.email){
        try {
            const usedrData = await User.findByIdAndDelete({ _id: req.query.id });
            res.redirect('/admin/home');
        } catch (error) {
            console.log(error.message);
        }
    }else{
        res.redirect('/admin');
    }
}

module.exports = {
    adminverification,
    loadAdmin,
    addUser,
    newUserLoad,
    adminlogout,
    editUser,
    updateUser,
    adminhomepageload,
    deleteUser,
}
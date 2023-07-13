const express = require("express");
const PageRouter = express.Router();
const db = require("../models");


PageRouter.get('/', (req, res) => {
    res.render('index');
});
PageRouter.get('/photos', (req, res) => {
    console.log('/photos')
    res.render('photo');
});
PageRouter.get('/login', (req, res) => {
    console.log('/Logging in')
    res.render('login');
});
PageRouter.get('/signUp', (req, res) => {
    console.log('/signUp')
    res.render('signUp');
});
PageRouter.get('/logout', (req, res) => {
    console.log('User logout', req.session.userId)
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = PageRouter;
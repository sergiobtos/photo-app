const { request, response } = require("express");
const express = require("express");
const UsersRouter = express.Router();
const db = require("../models");
const bodyParser = require("body-parser");
UsersRouter.use(bodyParser.urlencoded());
UsersRouter.use(bodyParser.json());
const bcrypt = require("bcryptjs");
const saltRounds = 10;

UsersRouter.route('/login')
.post((request, response)=>{
    const password = request.body.password
    const username = request.body.username
    db.User.findOne({where:{username: username, password: password}})
        .then(async(user)=>{
            if(user) {
                bcrypt.compare(user.password, password, (error, result)=>{
                  if(result) {
                    console.log('logged in, user id = ', user.id)
                    response.redirect('/');
                  } else {
                    response.redirect('/login');
                  }  
                })
            }
        response.send(user)
    }).catch(err=>{
        response.send('You don\'t have an account. Try signing up!')
    })
})

UsersRouter.route('/signUp')
.post(async(request, response)=>{
    // email, password, username
    const email = request.body.email[0]
    const password = request.body.password
    const encryptedPwd = await bcrypt.hash(password, saltRounds);
    const username = request.body.username

    db.User.create({email: email, password: encryptedPwd, username: username}).then(user=>{
      //response.send(user)
      response.redirect('/login');
    }).catch((err)=>{
        console.log(err)
        response.send('You don\'t have an account. Try signing up');
    })
})

module.exports = UsersRouter;
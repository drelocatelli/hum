const express = require('express');
const app = express();
const router = express.Router();
const User = require('../schemas/UserSchema');
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async(req, res) => {
    
    let firstName = req.body.firstName.trim();
    let lastName = req.body.lastName.trim();
    let username = req.body.logUsername.trim();
    let email = req.body.email.trim();
    let password = req.body.logPassword;

    let payload = req.body;

    // check email
    let regexEmail = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
		        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
                
    if(firstName && lastName && username && email.match(regexEmail) && password) {
        var user = await User.findOne({ 
            $or: [
                { username: username },
                { email: email }
            ]
         }).catch((error) => {

            res.render('register', {messageType:'warning', message: 'Something went wrong.'})
         })

        if(user == null) {

            var data = {
                firstName,
                lastName,
                username,
                email,
                password
            };

            data.password = await bcrypt.hash(password, 10)

            User.create(data)
            .then((user) => {
                
                req.session.user = user;
                
                return res.redirect('/')
            })

        }else {
            // user found
            if(email == user.email) {
                res.render('register', {messageType:'danger', message: 'Email already in use!'})
            }else {
                res.render('register', {messageType:'danger', message: 'Username already in use!'})
            }
            
        }

    }else {
        res.render('register', {messageType: 'danger', message: 'Make sure each field has a valid value.'})
    }

    
})

module.exports = router;
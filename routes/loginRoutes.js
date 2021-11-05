const express = require('express');
const app = express();
const router = express.Router();
const User = require('../schemas/UserSchema')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    
    res.render('login');
});

router.post('/', async (req, res, next) => {
    if(req.body.logUsername && req.body.logPassword) {

        var user = await User.findOne({ 
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
         }).catch((error) => {

            res.render('login', {messageType:'warning', message: 'Something went wrong.'})
         })

        if(user != null) {
            let result = await bcrypt.compare(req.body.logPassword, user.password)

            if(result === true) {

                req.session.user = user;
                return res.redirect('/')
            }

            res.render('login', {messageType:'danger', message: 'User found, but credentials incorrect.'})
                  
        }

        res.render('login', {messageType:'warning', message: 'User not found.'})
         
    }

    res.render('login', {messageType:'info', message: 'You need to login.'});
})

module.exports = router;
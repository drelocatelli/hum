const express = require('express');
const app = express();
const router = express.Router();

app.set("view engine", "ejs");
app.set("views", "app/views");
app.use('/public', express.static('public'));

// bodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.logUsername;
    let email = req.body.email;
    let password = req.body.logPassword;

    let payload = req.body;

    // check email
    let regexEmail = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
		        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

    if(!email.match(regexEmail)) {
        res.render('register', {messageType: 'danger', message: 'Make sure email field has a correct pattern.'})
    }
                
    if(firstName && lastName && username && email && password) {
        res.render('register', {messageType: 'success', message: 'You were successfully registered!'})
    }else {
        res.render('register', {messageType: 'danger', message: 'Make sure each field has a valid value.'})
    }

    
})

module.exports = router;
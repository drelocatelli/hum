const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBCLUSTERNAME}.wkgwx.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`)
.then(() => {
    console.log('database connection successful')
})
.catch((err) => {
    console.log('database connection error: '+ err)
})

const middleware = require('./middleware');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => { console.log('Server listening on port: ' + port) });

app.set("view engine", "ejs");
app.set("views", "app/views");
app.use(express.static('public'));

// bodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Routes 
const loginRoute = require('./routes/loginRoutes')
const registerRoute = require('./routes/registerRoute')

app.use('/login', loginRoute)

app.use('/register', registerRoute)

app.get('/', middleware.requireLogin, (req, res) => {
    res.render('home');
})
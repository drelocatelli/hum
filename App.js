const express = require('express');
const app = express();
const session = require('express-session')
require('dotenv').config()
const dbConnection = require('./dbConnection')

const middleware = require('./middleware');

const server = app.listen((process.env.PORT || 3000), () => { console.log('[Server] listening on port: ' + process.env.PORT) });

// static and views
app.set("view engine", "ejs");
app.set("views", "app/views");
app.use(express.static('public'));

// session
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false
}))

// bodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routes 
const loginRoute = require('./routes/loginRoutes')
const registerRoute = require('./routes/registerRoute')
const logoutRoute = require('./routes/logoutRoute')
const postsRoute = require('./routes/postsRouter')

app.use('/login', loginRoute)

app.use('/logout', logoutRoute)

app.use('/register', registerRoute)

app.use('/api/posts', postsRoute)

app.get('/', middleware.requireLogin, (req, res) => {
    let payload = {
        userLoggedIn: req.session.user
    }
    
    res.render('panel/home', payload);
})
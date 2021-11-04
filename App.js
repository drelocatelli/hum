const express = require('express');
const app = express();

const middleware = require('./middleware');

const port = 3000;

const server = app.listen(port, () => { console.log('Server listening on port: ' + port) });

app.set("view engine", "ejs");
app.set("views", "app/views");
app.use(express.static('public'));

// Routes 
const loginRoute = require('./routes/loginRoutes')

app.use('/login', loginRoute)

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/', middleware.requireLogin, (req, res) => {
    res.render('home');
})
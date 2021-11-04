const express = require('express');
const app = express();
const router = express.Router();

app.set("view engine", "ejs");
app.set("views", "app/views");
app.use('/public', express.static('public'));

router.get('/', (req, res) => {
    res.render('login');
});

module.exports = router;
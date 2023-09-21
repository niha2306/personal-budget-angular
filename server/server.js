const express = require("express")
const cors = require('cors');
const app= express();

const port = 3000;

const budget = require('./mybudget.json');


app.use('/', express.static('public'));
app.use(cors());

app.get('/hello', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/budget', (req, res) => {
    res.json(budget);
});


app.listen(port, () => {
    console.log('App Running at localhost:3000/');
});
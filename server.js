const express = require("express")
const app= express();
const port = 3000;

const budget = {
    mybudget: [
        {
            title: 'Eat Out',
            budget: 30
        }, 
        {
            title: 'Rent',
            budget: 350
        }, 
        {
            title: 'Groceries',
            budget: 100
        }
    ]
}  


app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/budget', (req, res) => {
    res.json(budget);
});


app.listen(port, () => {
    console.log('App Running at localhost:3000/');
});
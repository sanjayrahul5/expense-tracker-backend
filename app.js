const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { getExpenses, getExpenseById, addExpense, deleteExpense, loggerFunc, checkAdmin } = require('./controller/expense');

mongoose.connect('mongodb://0.0.0.0:27017/expense-tracker')
    .then(() => console.log('Connected!!'));

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(loggerFunc);  // logging - used by all the api functionalities

app.get('/api/v1/health', (req, res) => {
    res.sendStatus(200).json({
        message: "It worked",
        status: "Success"
    })
});

app.get('/api/v1/expenses', getExpenses);
app.get('/api/v1/expenses/:id', getExpenseById);
app.post('/api/v1/expenses', addExpense);
app.delete('/api/v1/expense/:id', checkAdmin, deleteExpense);

app.listen(8080, () => {
    console.log("Server is running");
})
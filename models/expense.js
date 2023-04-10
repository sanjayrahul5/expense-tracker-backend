const mongoose = require('mongoose');

const ExpensesSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive number']
    },
    desc: {
        type: String
    }
});

module.exports = mongoose.model('Expenses', ExpensesSchema);
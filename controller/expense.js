const Expenses = require('../models/expense');

exports.getExpenses = async (req, res, next) => {
    try {
        const expenses = await Expenses.find();
        console.log(expenses);
        return res.status(200).json({
            expenses
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.getExpenseById = async (req, res, next) => {
    try {
        const expense = await Expenses.findById(req.params.id);
        if(!expense) {
            return res.status(404).json({
                success: false,
                error: 'No expense found'
            });
        }

        return res.status(200).json(expense);
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.addExpense = async (req, res, next) => {
    try {
        const { name, amount, desc } = req.body;
        console.log(name, amount, desc);
        const expense = await Expenses.create(req.body);

        return res.status(201).json({
            success: true,
            data: expense
        });
    } catch (err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
        const expense = await Expenses.findById(req.params.id);

        if(!expense) {
            return res.status(404).json({
                success: false,
                error: 'No Expense found'
            });
        }

        await expense.remove();

        return res.status(200).json({
            success: true,
            data: {}
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// Middleware
exports.loggerFunc = (req, res, next) => {
    console.log("logging");
    console.log(req.method, req.url);
    next();
}

exports.checkAdmin = (req, res, next) => {
    const isAdmin = true;
    if(!isAdmin) {
        res.status(401).json({
            message: "Unauthorized access"
        })
    }
    next();
}
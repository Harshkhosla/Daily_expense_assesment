const Expense = require('../models/expense');
const User = require('../models/user');

// Add an expense
exports.addExpense = async (req, res) => {
  const { title, totalAmount, participants, createdBy } = req.body;
  try {
    const expense = new Expense({ title, totalAmount, participants, createdBy });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ 'participants.userId': req.params.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOverallExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


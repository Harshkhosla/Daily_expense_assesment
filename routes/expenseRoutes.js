const express = require('express');
const { addExpense, getUserExpenses, getOverallExpenses, downloadBalanceSheet } = require('../controllers/expenseController');
const router = express.Router();

router.post('/expenses', addExpense);
router.get('/expenses/user/:userId', getUserExpenses);
router.get('/expenses', getOverallExpenses);
router.get('/expenses/balance-sheet', downloadBalanceSheet);

module.exports = router;

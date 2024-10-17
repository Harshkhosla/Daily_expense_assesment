const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  participants: [{ userId: mongoose.Schema.Types.ObjectId, amountOwed: Number }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Expense', expenseSchema);

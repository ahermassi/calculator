const express = require('express');
const router = express.Router();
const data = require('../data');
const calculationsData = data.calculations;

router.get('/', async (req, res) => {
    res.render('calculator', {title: "The Best Calculator in the World!"});
});

router.post('/', async (req, res) => {
    let data = req.body;
    let firstOperand = data['first-operand'], secondOperand = data['second-operand'], operator = data.operator;
    let operation = {'+': (a, b) => a + b, '-': (a, b) => a - b, '*': (a, b) => a * b, '/': (a, b) => a / b};
    const result = operation[operator](parseFloat(firstOperand), parseFloat(secondOperand));
    console.log(result);
    try {
        const newCalculation = await calculationsData.addCalculation(firstOperand + operator + secondOperand,
            result, Date.now());
        res.redirect('/');
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

router.post('/fetch', async (req, res) => {
    try {
        const last10Calculations = await calculationsData.getCalculationsByLimit(10);
        res.render('partials/fetch', {layout:null, data: last10Calculations});
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
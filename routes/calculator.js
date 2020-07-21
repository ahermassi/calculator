const express = require('express');
const router = express.Router();
const data = require('../data');
const calculationsData = data.calculations;

router.get('/', async (req, res) => {
    res.render('calculator', {title: "The Best Calculator in the World!"});
});

router.post('/', async (req, res) => {
    let data = req.body;
    let errors = [];

    if(data.firstOperand === null)
        errors.push('First operand field can\'t be empty');

    else if (isNaN(data.firstOperand))
            errors.push('First operand has to be a number');

    if(data.secondOperand === null)
        errors.push('Second operand field can\'t be empty');

    else if (isNaN(data.secondOperand))
        errors.push('Second operand has to be a number');

    if (errors.length > 0) {
        res.render('/', {
            errors: errors,
            hasErrors: true
        });
        return;
    }

    let firstOperand = data.firstOperand, secondOperand = data.secondOperand, operator = data.operator;
    let operation = {'+': (a, b) => a + b, '-': (a, b) => a - b, '*': (a, b) => a * b, '/': (a, b) => a / b};
    const result = operation[operator](parseFloat(firstOperand), parseFloat(secondOperand));
    console.log(result);
    try {
        let secondOperandToken = secondOperand;
        if (secondOperand < 0)
            secondOperandToken = "(" + secondOperand + ")";
        const newCalculation = await calculationsData.addCalculation(firstOperand + " " + operator +
            " " + secondOperandToken, result, Date.now());
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
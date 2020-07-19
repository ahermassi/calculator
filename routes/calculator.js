const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('calculator', {title: "The Best Calculator in the World!"});
});

router.post('/', async (req, res) => {
    let data = req.body;
    let firstOperand = data['first-operand'], secondOperand = data['second-operand'], operator = data.operator;
    let operation = {'add': (a, b) => a + b, 'subtract': (a, b) => a - b, 'multiply': (a, b) => a * b,
        'divide': (a, b) => a / b};
    console.log(operation[operator](parseFloat(firstOperand), parseFloat(secondOperand)));
});

module.exports = router;
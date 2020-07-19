const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('calculator', {title: "The Best Calculator in the World!"});
});

module.exports = router;
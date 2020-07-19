const express = require('express');
const app = express();

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});


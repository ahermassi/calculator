const calculatorRoutes = require('./calculator');

const constructorMethod = (app) => {
    app.use('/', calculatorRoutes);
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;
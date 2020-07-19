const mongoCollections = require('../config/mongoCollections');
const calculations = mongoCollections.calculations;

module.exports = {
    async addCalculation(calculation, result, timestamp) {
        if(!calculation || typeof calculation!= 'string') throw 'You must provide a valid calculation string';
        if(result === null || typeof result!= 'number') throw 'You must provide a valid calculation result';
        if(!timestamp) throw 'You must provide a valid timestamp';

        const calculationsCollection = await calculations();
        let newCalculation = {
            calculation: calculation,
            result: result,
            timestamp: timestamp
            };
        const insertInfo = await calculationsCollection.insertOne(newCalculation);
        if (insertInfo.insertedCount === 0) throw 'Could not add calculation';
    },
    async getCalculationsByLimit(limit) {
        const calculationsCollection = await calculations();
        return calculationsCollection.find().sort({timestamp: -1}).limit(limit).toArray();
    }
};


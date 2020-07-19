const mongoCollections = require('../config/mongoCollections');
const calculations = mongoCollections.calculations;
const { ObjectId } = require('mongodb');

module.exports = {
    async addCalculation(calculation, result, timestamp) {
        if(!calculation || typeof calculation!= 'string') throw 'you must provide a valid calculation string';
        if(!result || typeof result!= 'number') throw 'you must provide a valid calculation result';
        if(!timestamp) throw 'you must provide a valid timestamp';

        const calculationsCollection = await calculations();
        let newCalculation = {
            calculation: calculation,
            result: result,
            timestamp: timestamp
            };
        const insertInfo = await calculationsCollection.insertOne(newCalculation);
        if (insertInfo.insertedCount === 0) throw 'Could not add calculation';
        const newId = insertInfo.insertedId;
        return await this.getCalculation(newId);
    },

    async getAllCalculations() {
        const calculationsCollection = await calculations();
        return calculationsCollection.find({}).toArray();
    },

    async getCalculation(id) {
        if (!id) throw 'You must provide a calculation id to search for';

        const objId = ObjectId(id);
        const calculationsCollection = await calculations();
        const calculation = await calculationsCollection.findOne({ _id: objId });
        if (calculation === null) throw 'No calculation with this id';

        return calculation;
    }
};


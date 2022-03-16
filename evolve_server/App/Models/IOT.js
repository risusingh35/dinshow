'use strict';
const Evolve = require("../../Boot/Evolve");
const Schema = Evolve.Mongoose.Schema;
const IOTSchema = new Schema({
	name: { type: 'string', required: true },
	code: { type: 'string', default: '' },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },

}, { collection: 'IOT' });
Evolve.Mongoose.model('IOT', IOTSchema);

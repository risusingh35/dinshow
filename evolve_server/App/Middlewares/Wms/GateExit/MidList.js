'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
	getallInvoiceDo: async function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveInvoice_ID: Evolve.Joi.number().required()
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});

		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2461: Error while getallInvoiceDo "+validateEvolveData.error);
			res.send({
				statusCode: 400,
				status: 'fail',
				message: validateEvolveData.error.toString(),
				result: null
			});
		} else {
			next();
		}
	},

	getDoSoInvoice: async function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveInvoice_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});

		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2462: Error while getting Do So Invoice "+validateEvolveData.error);
			res.send({
				statusCode: 400,
				status: 'fail',
				message: validateEvolveData.error.toString(),
				result: null
			});
		} else {
			next();
		}
	},

	addGetExit: async function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveDO_ID: Evolve.Joi.number().required(),
			EvolveDOLine: Evolve.Joi.array().required(),
			EvolveGateExit_SoNumber: Evolve.Joi.string().required().allow(''),
			EvolveGateExit_InvoiceNo: Evolve.Joi.string().required().allow(''),
			EvolveGateExit_Transporter: Evolve.Joi.string().required().allow(''),
			EvolveGateExit_VehicleNumber: Evolve.Joi.string().required().allow(''),
			EvolveGateExit_IsWayBill: Evolve.Joi.boolean().required(),
			EvolveGateExit_EwayShipValue: Evolve.Joi.string().required().allow(''),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});

		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2463: Error while adding Get Exit "+validateEvolveData.error);
			res.send({
				statusCode: 400,
				status: 'fail',
				message: validateEvolveData.error.toString(),
				result: null
			});
		} else {
			next();
		}
	},

	addGateEntry: async function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			truckData: Evolve.Joi.required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});

		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2464: Error while adding Get Entry "+validateEvolveData.error);
			res.send({
				statusCode: 400,
				status: 'fail',
				message: validateEvolveData.error.toString(),
				result: null
			});
		} else {
			next();
		}
	},





}
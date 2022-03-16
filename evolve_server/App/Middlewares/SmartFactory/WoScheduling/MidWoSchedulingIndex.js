'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

	addWOScheduling: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			tableData: Evolve.Joi.array().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2436: Error while adding WO Scheduling " + validateEvolveData.error.toString());
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
	deleteWos: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveWoSchedule_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2437: Error while deleting Wos " + validateEvolveData.error.toString());
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
	updateWOSSqc: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			WOSSqcList: Evolve.Joi.array().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2438: Error while updating WO SS qc " + validateEvolveData.error.toString());
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
	getPreviousShiftAvailableTime: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveShift_ID: Evolve.Joi.number().required(),
			EvolveWoSchedule_Date: Evolve.Joi.string().required(),
			EvolveMachine_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2439: Error while getting Previous Shift Available Time " + validateEvolveData.error.toString());
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
	getItemWorkOrderList: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveItem_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2440: Error while getting Item Work Order List " + validateEvolveData.error.toString());
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
	getListByWorkOrderID: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveProdOrders_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2441: Error while getting List By Work Order ID " + validateEvolveData.error.toString());
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
	getMachineToItemList: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveMachine_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2442: Error while getting Machine To Item List " + validateEvolveData.error.toString());
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
	workOrderSchedulingLock: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveWoSchedule_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2443: Error while working Order Scheduling Lock " + validateEvolveData.error.toString());
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
	getWOSDetails: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveWoSchedule_ID: Evolve.Joi.number().required(),
			EvolveProdOrders_ID: Evolve.Joi.number().required(),
			EvolveWoSchedule_SEQ: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(" EERR2444: Error while getting WOS Details " + validateEvolveData.error.toString());
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
	getWOSSingleData: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveWoSchedule_ID: Evolve.Joi.number().required(),
			EvolveWoSchedule_SEQ: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	updateWOScheduling: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			tableData: Evolve.Joi.array().required(),

		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	wosPlanPause: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveWoSchedule_ID: Evolve.Joi.number().required(),
			CompleteQty: Evolve.Joi.number().required(),
			CompleteDate: Evolve.Joi.string().required(),
			newQty: Evolve.Joi.number().required(),
			newStartDate: Evolve.Joi.string().required(),
			newEndDate: Evolve.Joi.string().required(),

		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	getWosSplitData: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveWoSchedule_ID: Evolve.Joi.number().required(),
			EvolveProdOrders_ID: Evolve.Joi.number().required(),
			EvolveWoSchedule_SEQ: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	addSplitWOS: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveWoSchedule_StartDateTime: Evolve.Joi.string().required(),
			EvolveWoSchedule_EndDateTime: Evolve.Joi.string().required(),
			EvolveWoSchedule_OrderQty: Evolve.Joi.number().required(),
			EvolveWoSchedule_ID: Evolve.Joi.number().required(),
			EvolveShift_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	// addNewMoveJob: function (req, res, next) {
	// 	const rulesSchema = Evolve.Joi.object({
	// 		tableData: Evolve.Joi.array().required(),
	// 		EvolveWoSchedule_ID: Evolve.Joi.number().required(),
	// 	});
	// 	const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
	// 		allowUnknown: false,
	// 		abortEarly: false
	// 	});
	// 	if (validateEvolveData.error) {
	// 		Evolve.Log.error(validateEvolveData.error.toString());
	// 		res.send({
	// 			statusCode: 400,
	// 			status: 'fail',
	// 			message: validateEvolveData.error.toString(),
	// 			result: null
	// 		});
	// 	} else {
	// 		next();
	// 	}
	// },
	getMoveJobData: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveMachine_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	AddWosPlannerComment: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveWoSchedule_ID: Evolve.Joi.number().required(),
			EvolveWoSchedule_Comments: Evolve.Joi.string().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	getWoSchedulingList: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveSection_ID: Evolve.Joi.number().required(),
			EvolveMachine_ID: Evolve.Joi.number().required(),
			EvolveItem_ID: Evolve.Joi.number().required().allow(''),
			EvolveProdOrders_ID: Evolve.Joi.number().required().allow(''),
			searchDateRange: Evolve.Joi.string().required().allow(''),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	getDepartmentToMachineList: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveSection_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	getMachineShiftList: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveMachine_ID: Evolve.Joi.number().required(),
			EvolveMachineCalendar_Date: Evolve.Joi.string().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	AddWosDownTimeReasonCode: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveWoSchedule_ID: Evolve.Joi.number().required(),
			EvolveReason_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	publishPlan: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			tableData: Evolve.Joi.array().required(),
			EvolveWoSchedule_Comments: Evolve.Joi.string().required(),
			EvolveMachine_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
	AddWosEditPlan: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			tableData: Evolve.Joi.array().required(),
			EvolveWoSchedule_SEQ: Evolve.Joi.number().required(),
			EvolveMachine_ID: Evolve.Joi.number().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});
		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
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
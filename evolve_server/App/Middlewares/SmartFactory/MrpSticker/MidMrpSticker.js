'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getSingleDoData: function (req, res, next) {
      
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2360: Error while getting Single Do Data "+validateEvolveData.error.toString());
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

    getSingleDoSoLine: function (req, res, next) {
           const rulesSchema = Evolve.Joi.object({
            EvolveDO_ID: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2361: Error while getting Single Do So Line "+validateEvolveData.error.toString());
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

    getSalesOrderDetails: function (req, res, next) {

        const rulesSchema = Evolve.Joi.object({
            EvolveSalesOrder_ID: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2362: Error while getting Sales Order Details "+validateEvolveData.error.toString());
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

    getDoDetails: function (req, res, next) {

        const rulesSchema = Evolve.Joi.object({
            EvolveSalesOrder_ID: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2363: Error while getting Do Details "+validateEvolveData.error.toString());
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

    addDoList: function (req, res, next) {
 
        const rulesSchema = Evolve.Joi.object({
            EvolveSalesOrder_ID: Evolve.Joi.number().required(),
            doLineArrayData: Evolve.Joi.required(),
            EvolveDO_ShipDate: Evolve.Joi.string().required(),
            EvolveDO_VehicelNumber: Evolve.Joi.required().allow(''),
            EvolveDO_Transporter: Evolve.Joi.required().allow('')


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2364: Error while adding Do List "+validateEvolveData.error.toString());
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

    updateDoList: function (req, res, next) {
     
        const rulesSchema = Evolve.Joi.object({
            EvolveDO_ID: Evolve.Joi.number().required(),
            EvolveDO_Number: Evolve.Joi.string().required(),
            doLineArrayData: Evolve.Joi.required(),
            EvolveDO_VehicelNumber: Evolve.Joi.required().allow(''),
            EvolveDO_Transporter: Evolve.Joi.required().allow(''),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2365: Error while updating Do List "+validateEvolveData.error.toString());
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

    deleteDoLine: function (req, res, next) {
     
        const rulesSchema = Evolve.Joi.object({
            EvolveDOLine_ID: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2366: Error while deleting Do Line "+validateEvolveData.error.toString());
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


    getSingleDOSOData: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDO_ID: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2367: Error while getting Single DO SO Data "+validateEvolveData.error.toString());
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


    getDoLine: function (req, res, next) {
      
        const rulesSchema = Evolve.Joi.object({
            EvolveDO_ID: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2368: Error while getting Do Line "+validateEvolveData.error.toString());
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

    getDoDataTable : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            Do_Id: Evolve.Joi.string().required().allow(''),
            So_Id: Evolve.Joi.string().required().allow(''),
            Customer_Code: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2369: Error while getting Do Data Table "+validateEvolveData.error);
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
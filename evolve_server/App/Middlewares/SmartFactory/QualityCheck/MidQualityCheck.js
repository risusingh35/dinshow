'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    // QC General Start

    getLotTabelData: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2409: Error while getting Lot Tabel Data "+validateEvolveData.error.toString());
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
    saveQCData: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            tableData: Evolve.Joi.array().required(),
            QCOrderNo: Evolve.Joi.string().required(),
            IotCheckbox: Evolve.Joi.string().required().allow(''),
            paramAcceptData: Evolve.Joi.array().required().allow(''),
            paramRejectData: Evolve.Joi.array().required().allow(''),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2410: Error while saving QC Data "+validateEvolveData.error.toString());
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
    getQCPalletParamData: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveQC_Pallet_No: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2411: Error while getting QC Pallet Param Data "+validateEvolveData.error.toString());
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

    //end

    // QC Cooper start

    getQCTabelData: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2412: Error while getting QC Tabel Data "+validateEvolveData.error.toString());
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
    saveQCTableData: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            tableData: Evolve.Joi.array().required(),
            param: Evolve.Joi.array().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2413: Error while saving QC Table Data "+validateEvolveData.error.toString());
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


    getQCLocationTableList: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2416: Error while getting QC Location Table List "+validateEvolveData.error.toString());
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
    saveQCLocation: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID: Evolve.Joi.number().required(),
            EvolveLocation_ID: Evolve.Joi.number().required(),
            EvolveOldLocationName: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2417: Error while saving QC Location "+validateEvolveData.error.toString());
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
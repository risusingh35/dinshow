'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

   
    getSoNoList: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSalesOrder_Shipto: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
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
    getSoLineList: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSalesOrder_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
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
    getSoTableData: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSalesOrder_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
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
    getAvailablePalletsList: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
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
    getPickedPalletsList: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
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

    soQtyPick: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            SoLineData: Evolve.Joi.array().required(),
            PalletNo: Evolve.Joi.string().required(),
            QtyPick: Evolve.Joi.number().required(),
            EvolveInventory_ID: Evolve.Joi.number().required(),
            EvolveSoPickList_ShipID: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
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
    soQtyUnPick: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            SoLineData: Evolve.Joi.array().required(),
            EvolveInventory_ID: Evolve.Joi.number().required(),
            EvolveLocation_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
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
    soQtyPickSplitPallet: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            SoLineData: Evolve.Joi.array().required(),
            PalletNo: Evolve.Joi.string().required(),
            TotalQty: Evolve.Joi.number().required(),
            QtyPick: Evolve.Joi.number().required(),
            EvolveInventory_ID: Evolve.Joi.number().required(),
            EvolveSoPickList_ShipID: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
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
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
   
    // QC

    getQCMachineList: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSection_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2632: Error while get Machine List "+validateEvolveData.error.toString());
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
    getQCLotSerialList: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachine_ID: Evolve.Joi.number().required(),
            StartDateTime: Evolve.Joi.string().required(),
            EndDateTime: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2633: Error while get Lot/serial List "+validateEvolveData.error.toString());
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
    
    
    
    getQCTabelData: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
            EvolveMachine_ID: Evolve.Joi.number().required(),
            StartDateTime: Evolve.Joi.string().required(),
            EndDateTime: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2634: Error while getting QC Tabel Data "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2635: Error while saving QC Table Data "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2636: Error while getting QC Location Table List "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2637: Error while saving QC Location "+validateEvolveData.error.toString());
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
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemsListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord : Evolve.Joi.number().required(),
            startFrom : Evolve.Joi.number().required(),
            search : Evolve.Joi.string().required().allow(''),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2232: Error while getting Items List Auth "+validateEvolveData.error.toString());
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
    deleteItem: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2233: Error while deleting Item "+validateEvolveData.error);
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
    getSingleItem: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2234: Error while getting Single Item "+validateEvolveData.error);
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

    createItem: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_Code: Evolve.Joi.string().required(),
            EvolveItem_Desc: Evolve.Joi.string().required(),
            EvolveProcessTemp_Id: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
            EvolveItem_BrakeNum: Evolve.Joi.string().required().allow(''),
            EvolveItem_BrakeApprovalNum: Evolve.Joi.string().required().allow(''),
            EvolveItem_Type: Evolve.Joi.string().required(),
            EvolveItem_CustomizeNum: Evolve.Joi.string().required().allow(''),
            EvolveItem_CustPart: Evolve.Joi.string().required(),
            EvolveItem_load_capacity: Evolve.Joi.number().required().allow(''),
            EvolveItem_CycleTime: Evolve.Joi.number().required(),
            EvolveSerial_ID: Evolve.Joi.number().required(),
            EvolveItemGroup_ID: Evolve.Joi.number().required(),
            EvolvePDITemplate_ID: Evolve.Joi.number().required(),
            EvolveQCTemp_ID: Evolve.Joi.number().required().allow('').allow('null'),
            EvolveQc_IsRequired: Evolve.Joi.boolean().required().allow('').allow('null'),
            EvolveQc_TempStatus: Evolve.Joi.string().required().allow('').allow('null'),
            selectedSuppliers: Evolve.Joi.array().required().allow('').allow('null'),
            EvolveItemSupLink_recInvetory_Location: Evolve.Joi.number().required().allow('').allow('null'),
            EvolveItemSupLink_Approved: Evolve.Joi.boolean().required().allow('').allow('null'),
            EvolveItemSupLink_recInvetory_Status: Evolve.Joi.boolean().required().allow('').allow('null'),
            EvolveLocation_ID: Evolve.Joi.number().required().allow('').allow(null),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2235: Error while creating Item "+validateEvolveData.error);
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

    updateItem: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveItem_Code: Evolve.Joi.string().required(),
            EvolveItem_Desc: Evolve.Joi.string().required(),
            EvolveProcessTemp_Id: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
            EvolveItem_BrakeNum: Evolve.Joi.string().required().allow(''),
            EvolveItem_BrakeApprovalNum: Evolve.Joi.string().required().allow(''),
            EvolveItem_Type: Evolve.Joi.string().required(),
            EvolveItem_CustomizeNum: Evolve.Joi.string().required().allow(''),
            EvolveItem_CustPart: Evolve.Joi.string().required(),
            EvolveItem_load_capacity: Evolve.Joi.number().required().allow(''),
            EvolveItem_CycleTime: Evolve.Joi.number().required(),
            EvolveSerial_ID: Evolve.Joi.number().required(),
            EvolveItemGroup_ID: Evolve.Joi.number().required(),
            EvolvePDITemplate_ID: Evolve.Joi.number().required(),
            EvolveQCTemp_ID: Evolve.Joi.number().required().allow('').allow('null'),
            EvolveQc_IsRequired: Evolve.Joi.boolean().required().allow('').allow('null'),
            EvolveQc_TempStatus: Evolve.Joi.string().required().allow('').allow('null'),
            selectedSuppliers: Evolve.Joi.array().required().allow('').allow('null'),
            EvolveItemSupLink_recInvetory_Location: Evolve.Joi.number().required().allow('').allow('null'),
            EvolveItemSupLink_Approved: Evolve.Joi.boolean().required().allow('').allow('null'),
            EvolveItemSupLink_recInvetory_Status: Evolve.Joi.boolean().required().allow('').allow('null'),
            EvolveLocation_ID: Evolve.Joi.number().required().allow(null),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2236: Error while updating Item "+validateEvolveData.error);
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
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getApiAttributesAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApi_ID: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2577: Error while get atributes"+validateEvolveData.error);
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

    getTableFieldsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            mappingTable: Evolve.Joi.string().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2578: Error while get table fileds  "+validateEvolveData.error);
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
    addErpAttrMappingAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApiAttributes_ID: Evolve.Joi.number().required(),
            EvolveERPApiAttrMapping_Table: Evolve.Joi.string().required(),
            EvolveERPApiAttrMapping_Feild: Evolve.Joi.string().required(),
            EvolveERPApi_ID: Evolve.Joi.number().required(),
            EvolveERPApiAttrMapping_MatchFeild: Evolve.Joi.string().required(),
            EvolveERPApiAttrMapping_Status: Evolve.Joi.required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2579: Error while add mapping "+validateEvolveData.error);
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
    getAttrmappingListAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord: Evolve.Joi.number().required(),
            startFrom: Evolve.Joi.number().required(),
            search : Evolve.Joi.string().required().allow(''),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2580: Error while get mapping list "+validateEvolveData.error);
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
    getSingleMappingDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApiAttrMapping_ID: Evolve.Joi.number().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2581: Error while get mapping details "+validateEvolveData.error);
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
    updateMappingDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApiAttrMapping_ID : Evolve.Joi.number().required(),  
            EvolveERPApiAttributes_ID: Evolve.Joi.number().required(),
            EvolveERPApiAttrMapping_Table: Evolve.Joi.string().required(),
            EvolveERPApiAttrMapping_Feild: Evolve.Joi.string().required(),
            EvolveERPApi_ID: Evolve.Joi.number().required(),
            EvolveERPApiAttrMapping_MatchFeild: Evolve.Joi.string().required(),
            EvolveERPApiAttrMapping_Status: Evolve.Joi.required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2582: Error while update mapping  details "+validateEvolveData.error);
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
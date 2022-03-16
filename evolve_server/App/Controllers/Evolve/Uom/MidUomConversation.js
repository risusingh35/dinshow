'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllConversationListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord : Evolve.Joi.number().required(),
            startFrom : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2341: Error while getting all conversation list auth "+validateEvolveData.error.toString());
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
    createUomConversationAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveUomConv_AlternateUom_ID: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
            EvolveUomConv_Conversion: Evolve.Joi.required(),

          
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2342: Error while creating  Uom Conversation Auth "+validateEvolveData.error.toString());
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

    selectSingleConversationAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUomConv_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2343: Error while selecting Single Conversation Auth "+validateEvolveData.error.toString());
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

    updateConversionAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
          
            EvolveUomConv_ID: Evolve.Joi.number().required(),
         
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveUomConv_AlternateUom_ID: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
            EvolveUomConv_Conversion: Evolve.Joi.required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2344: Error while updating Conversion Auth "+validateEvolveData.error.toString());
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
    deleteRole: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2345: Error while deleting Role "+validateEvolveData.error);
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

    getdefaultUomAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
          
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2346: Error while getting default Uom Auth "+validateEvolveData.error.toString());
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
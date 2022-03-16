'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addErpGateWay : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERP_ID: Evolve.Joi.number().required(),
            EvolveERPGateway_Method: Evolve.Joi.string().required(),
            EvolveERPGateway_Host: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_User: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_Password: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_Port: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_InPath: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_OutPath: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_FileType: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_URL: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR3071 : Error while validating add ERP Gateway "+validateEvolveData.error);
            res.send({
                statusCode: 400,
                status: 'fail',
                message: "EERR3071 : Error while validating add ERP Gateway "+validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },

    getSingleErpGateWay: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPGateway_ID : Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error("EERR3072 : Error while validating single ERP Gateway "+validateEvolveData.error);
            res.send({
                statusCode: 400,
                status: 'fail',
                message: "EERR3072 : Error while validating single ERP Gateway "+validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },

    updateErpGateWay : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPGateway_ID: Evolve.Joi.number().required(),
            EvolveERP_ID: Evolve.Joi.number().required(),
            EvolveERPGateway_Method: Evolve.Joi.string().required(),
            EvolveERPGateway_Host: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_User: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_Password: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_Port: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_InPath: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_OutPath: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_FileType: Evolve.Joi.string().required().allow(''),
            EvolveERPGateway_URL: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR3073 : Error while validating update ERP gateway "+validateEvolveData.error);
            res.send({
                statusCode: 400,
                status: 'fail',
                message: "EERR3073 : Error while validating update ERP gateway "+validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },

}
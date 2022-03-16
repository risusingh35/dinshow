'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getBusinessObjectMappingList : async function (req, res, next) {
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
            Evolve.Log.error(" EERR32541: Error while getting Business Object Mapping List "+validateEvolveData.error);
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

    createBusinessObject : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveBusinessObjectMapping_Name: Evolve.Joi.string().required(),
            EvolveBusinessObjectMapping_XmlDataName: Evolve.Joi.string().required(),
            
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32542: Error while creating Business Object Mapping List "+validateEvolveData.error);
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

    updateBusinessObject : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveBusinessObjectMapping_Name: Evolve.Joi.string().required(),
            EvolveBusinessObjectMapping_XmlDataName: Evolve.Joi.string().required(),
            
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32543: Error while update Business Object Mapping List "+validateEvolveData.error);
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    }

}
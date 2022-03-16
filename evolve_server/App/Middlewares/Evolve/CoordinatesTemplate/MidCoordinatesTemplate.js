'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addTemplate: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCoordinatesTemplate_Name: Evolve.Joi.string().required(),
            EvolveCoordinatesTemplate_Code: Evolve.Joi.string().required(),
            EvolveCoordinatesTemplate_Status: Evolve.Joi.boolean().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2213: Error while adding Template "+validateEvolveData.error);
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
    updateTemplate: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCoordinatesTemplate_ID: Evolve.Joi.number().required(),
            EvolveCoordinatesTemplate_Name: Evolve.Joi.string().required(),
            EvolveCoordinatesTemplate_Code: Evolve.Joi.string().required(),
            EvolveCoordinatesTemplate_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2214: Error while updating Template "+validateEvolveData.error);
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
    getTemplateList : async function (req, res, next) {
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
            Evolve.Log.error(" EERR2215: Error while getting Template List "+validateEvolveData.error);
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
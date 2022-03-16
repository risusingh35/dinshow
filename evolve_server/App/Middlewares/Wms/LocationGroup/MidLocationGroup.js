'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addLocationGroup: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            // EvolveLocationGroup_ID: Evolve.Joi.string().required(),
            EvolveLocationGroup_Code: Evolve.Joi.string().required(),
            EvolveLocationGroup_Status: Evolve.Joi.boolean().required(),
            EvolveLocationGroup_Sequence: Evolve.Joi.number().required(),
            EvolveLocationGroup_Description: Evolve.Joi.string().required(),



        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2250: Error while adding Location Group "+validateEvolveData.error);
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
    updateLocationGroup: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveLocationGroup_ID: Evolve.Joi.number().required(),
            EvolveLocationGroup_Name: Evolve.Joi.string().required(),
            EvolveLocationGroup_Code: Evolve.Joi.string().required(),
            EvolveLocationGroup_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2251: Error while updating Location Group "+validateEvolveData.error);
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

    getLocationGroupList : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            // displayRecord : Evolve.Joi.number().required(),
            // startFrom : Evolve.Joi.number().required(),
            // search : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2252: Error while getting Location Group List "+validateEvolveData.error);
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
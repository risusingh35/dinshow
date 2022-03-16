'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addLocation: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveLocationGroup_ID: Evolve.Joi.number().required(),
            EvolveLocation_Name: Evolve.Joi.string().required(),
            EvolveLocation_Code: Evolve.Joi.string().required(),
            EvolveLocation_Desc: Evolve.Joi.string().required().allow(''),
            EvolveLocation_Type: Evolve.Joi.string().required(),
            EvolveLocation_Address: Evolve.Joi.string().required(),
            EvolveStatusCodeMstr_Id: Evolve.Joi.number().required(),
            EvolveLocation_Rule: Evolve.Joi.string().required().allow(""),
            // EvolveLocation_Status: Evolve.Joi.string().required()

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2244: Error while adding Location "+validateEvolveData.error);
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
    updateLocation: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveLocation_ID: Evolve.Joi.number().required(),
            EvolveLocationGroup_ID: Evolve.Joi.number().required(),
            EvolveLocation_Name: Evolve.Joi.string().required(),
            EvolveLocation_Code: Evolve.Joi.string().required(),
            EvolveLocation_Desc: Evolve.Joi.string().required().allow(''),
            EvolveLocation_Type: Evolve.Joi.string().required(),
            EvolveLocation_Address: Evolve.Joi.string().required(),
            EvolveLocation_Rule: Evolve.Joi.string().required().allow(""),
            EvolveStatusCodeMstr_Id: Evolve.Joi.number().required(),

            // EvolveLocation_Status: Evolve.Joi.string().required()


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2245: Error while updating Location "+validateEvolveData.error);
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

    getLocationList  : async function (req, res, next) {
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
            Evolve.Log.error(" EERR2246: Error while getting Location List "+validateEvolveData.error);
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
    getStatusCodeListAuth  : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveStatusCodeMstr_Type : Evolve.Joi.string().required().allow(''),
            
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3043: Error while getting status code list "+validateEvolveData.error);
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
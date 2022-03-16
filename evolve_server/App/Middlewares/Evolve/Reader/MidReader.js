'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getReaderListMid : async function (req, res, next) {
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
            Evolve.Log.error(" EERR####: Error while getting Reader List "+validateEvolveData.error);
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

    addReaderMid : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReader_Name : Evolve.Joi.string().required(),
            EvolveReader_Code : Evolve.Joi.string().required(),
            EvolveReader_Type : Evolve.Joi.string().required(),
            EvolveReader_Status : Evolve.Joi.boolean().required(),           

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR####: Error while Adding Reader "+validateEvolveData.error);
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

    editReaderMid : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReader_ID : Evolve.Joi.string().required(),
            EvolveReader_Name : Evolve.Joi.string().required(),
            EvolveReader_Code : Evolve.Joi.string().required(),
            EvolveReader_Type : Evolve.Joi.string().required(),
            EvolveReader_Status : Evolve.Joi.boolean().required(),           

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR####: Error while Editing Reader "+validateEvolveData.error);
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
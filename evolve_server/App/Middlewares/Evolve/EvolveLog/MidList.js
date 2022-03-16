'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getDirectoryTreeAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            selectedServer: Evolve.Joi.string().required(),
          
           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR32739 : Error while validating getDirectoryTreeAuth  "+validateEvolveData.error.toString());
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
    deleteResourceAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            path : Evolve.Joi.string().required(),
            type : Evolve.Joi.string().required(),
           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR32740 : Error while validating deleteResourceAuth  "+validateEvolveData.error.toString());
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
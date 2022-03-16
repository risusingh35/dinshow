'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addTypes: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveType_Name: Evolve.Joi.string().required(),
            EvolveType_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2182: Error in adding types "+validateEvolveData.error.toString());
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
    editTypes: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveType_ID: Evolve.Joi.number().required(),
            EvolveType_Name: Evolve.Joi.string().required(),
            EvolveType_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2186: Error in editing types "+validateEvolveData.error.toString());
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

    getTypes: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            draw : Evolve.Joi.string().required(),
            columns : Evolve.Joi.array().required(),
            start : Evolve.Joi.number().required(),
            length : Evolve.Joi.number().required(),
            search : Evolve.Joi.object().required(),
            startDate: Evolve.Joi.string().required().allow(''),
            item_number: Evolve.Joi.string().required().allow(''),
            location: Evolve.Joi.string().required().allow(''),
            location_type: Evolve.Joi.string().required().allow('')
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2187: Error in getting types "+validateEvolveData.error);
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
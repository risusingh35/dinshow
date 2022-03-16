'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addBeds: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveBed_RFID: Evolve.Joi.string().required(),
            EvolveBed_Make: Evolve.Joi.string().required(),
            EvolveBedSize_ID: Evolve.Joi.number().required(),
            EvolveBedType_ID: Evolve.Joi.number().required(),
            EvolveBed_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2177: Error in adding beds "+validateEvolveData.error.toString());
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
    editBeds: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveBed_ID: Evolve.Joi.number().required(),
            EvolveBed_RFID: Evolve.Joi.string().required(),
            EvolveBed_Make: Evolve.Joi.string().required(),
            EvolveBedSize_ID: Evolve.Joi.number().required(),
            EvolveBedType_ID: Evolve.Joi.number().required(),
            EvolveBed_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2178: Error in editing beds "+validateEvolveData.error.toString());
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

    getBedsHistory: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            draw : Evolve.Joi.string().required(),
            columns : Evolve.Joi.array().required(),
            start : Evolve.Joi.number().required(),
            length : Evolve.Joi.number().required(),
            search : Evolve.Joi.object().required(),
            bed_id: Evolve.Joi.string().required().allow(''),
            inorouttime: Evolve.Joi.string().required().allow(''),
            startDate : Evolve.Joi.string().required().allow(''),
            endDate: Evolve.Joi.string().required().allow('')
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2179: Error in getting Beds History "+validateEvolveData.error);
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
    
    getBeds : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            draw : Evolve.Joi.string().required(),
            columns : Evolve.Joi.array().required(),
            start : Evolve.Joi.number().required(),
            length : Evolve.Joi.number().required(),
            search : Evolve.Joi.object().required(),
            bedCode: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2180: Error in getting Beds "+validateEvolveData.error);
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
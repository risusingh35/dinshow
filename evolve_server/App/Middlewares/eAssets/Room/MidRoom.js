'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addRooms: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveRoom_Name: Evolve.Joi.string().required(),
            EvolveRoom_Status: Evolve.Joi.number().required(),
            EvolveRoom_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2188: Error while adding Rooms "+validateEvolveData.error.toString());
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
    editRoom: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveRoom_Id: Evolve.Joi.number().required(),
            EvolveRoom_Name: Evolve.Joi.string().required(),
            EvolveRoom_Status: Evolve.Joi.number().required(),
            EvolveRoom_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2189: Error while editing Room "+validateEvolveData.error.toString());
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

    getRooms: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            draw : Evolve.Joi.string().required(),
            columns : Evolve.Joi.array().required(),
            start : Evolve.Joi.number().required(),
            length : Evolve.Joi.number().required(),
            search : Evolve.Joi.object().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2190: Error while getting Rooms "+validateEvolveData.error);
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
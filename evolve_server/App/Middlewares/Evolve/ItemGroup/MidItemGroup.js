'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addItemGroup: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItemGroup_Name: Evolve.Joi.string().required(),
            EvolveItemGroup_Code: Evolve.Joi.string().required(),
            EvolveItemGroup_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2247: Error while adding Item Group "+validateEvolveData.error.toString());
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
    updateItemGroup: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItemGroup_ID: Evolve.Joi.number().required(),
            EvolveItemGroup_Name: Evolve.Joi.string().required(),
            EvolveItemGroup_Code: Evolve.Joi.string().required(),
            EvolveItemGroup_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2248: Error while updating Item Group "+validateEvolveData.error.toString());
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
    getSingleGroupData: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItemGroup_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2249: Error while getting Single Group Data "+validateEvolveData.error.toString());
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
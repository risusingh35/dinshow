'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    updateEpodErework: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrdersDetail_ID: Evolve.Joi.number().required(),
            EvolveReworkSrNo_ID: Evolve.Joi.number().required(),
            EvolveProdOrdersDetail_NxtSeq: Evolve.Joi.string().required(),
            EvolveReworkSrNo_Remarks: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2426: Error while updating Epod Erework "+validateEvolveData.error.toString());
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

    updateEpodEreworkScrap: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrdersDetail_ID: Evolve.Joi.number().required(),
            EvolveReworkSrNo_ID: Evolve.Joi.number().required(),
            EvolveReworkSrNo_Remarks: Evolve.Joi.string().required(),
            EvolveScrap_From: Evolve.Joi.string().required(),
            EvolveScrap_SupplierCode: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2427: Error while updating Epod Erework Scrap "+validateEvolveData.error.toString());
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
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getPalletData: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_RefNumber: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
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
    addUnplannedIssue: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID: Evolve.Joi.number().required(),
            EvolveInventory_RefNumber: Evolve.Joi.string().required(),
            TotalQty: Evolve.Joi.number().required(),
            IssueQty: Evolve.Joi.number().required(),
            EvolveReason_ID: Evolve.Joi.number().required(),
            Remark: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
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
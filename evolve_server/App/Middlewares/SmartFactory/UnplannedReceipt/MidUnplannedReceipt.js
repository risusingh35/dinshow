'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemData: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
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
    addUnplannedReceipt: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            RCPTQty: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
            SecUom_ID: Evolve.Joi.number().required().allow(''),
            SecQty: Evolve.Joi.number().required().allow(''),
            EvolveLocation_ID: Evolve.Joi.number().required(),
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
            EvolveInventory_CustLotRef: Evolve.Joi.string().required().allow(''),
            EvolveReason_ID: Evolve.Joi.number().required(),
            Remark: Evolve.Joi.string().required().allow(''),
            RCPTDate: Evolve.Joi.string().required(),
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
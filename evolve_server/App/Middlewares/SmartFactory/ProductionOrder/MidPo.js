'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    createWorkOrder: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveProdOrders_Quantity: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2407: Error while creating Work Order "+validateEvolveData.error.toString());
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


    getProductionOrderList : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            // draw : Evolve.Joi.string().required(),
            // columns : Evolve.Joi.array().required(),
            start : Evolve.Joi.number().required(),
            length : Evolve.Joi.number().required(),
            startDate: Evolve.Joi.string().required().allow(''),
            endDate : Evolve.Joi.string().required().allow(''),
            EvolveProdOrders_ID : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2408: Error while getting Production Order List "+validateEvolveData.error);
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
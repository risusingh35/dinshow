'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    rejectComponantItem: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrdersDetail_Serial: Evolve.Joi.string().required(),
            EvolvePickList_QtyReturn: Evolve.Joi.number().required(),
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveReason_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2371: Error while rejecting Componant Item "+ validateEvolveData.error.toString());
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
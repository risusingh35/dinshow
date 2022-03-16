'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getImageUrlAuth: function (req, res, next) {
       
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required(),
            // EvolveCompany_DBUser: Evolve.Joi.string().required(),
            // EvolveCompany_Password: Evolve.Joi.string().required(),
            // EvolveCompany_Port: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
           Evolve.Log.error(" EERR2191: Error in getting Image Url Auth "+validateEvolveData.error.toString());
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

    addParcelDataAuth: function (req, res, next) {
     
        const rulesSchema = Evolve.Joi.object({
            EvolveGate_Weight: Evolve.Joi.number().required().allow(null),
            image: Evolve.Joi.string().required().allow(''),
            EvolveGate_Notes: Evolve.Joi.string().required().allow(''),
            EvolveGate_DeliverTo: Evolve.Joi.string().required(),
            EvolveGate_ParcelFrom: Evolve.Joi.string().required(),
            EvolveGate_ParcelTrackingNum: Evolve.Joi.string().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
              Evolve.Log.error(" EERR2192: Error in adding Parcel Data Auth "+validateEvolveData.error.toString());
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
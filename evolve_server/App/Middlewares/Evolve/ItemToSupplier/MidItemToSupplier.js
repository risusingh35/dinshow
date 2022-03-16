'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    createReasonAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReason_Name: Evolve.Joi.string().required(),
            EvolveReason_Desc: Evolve.Joi.string().required(),
            EvolveReason_Code: Evolve.Joi.string().required(),
            EvolveReason_Colour: Evolve.Joi.string().required(),
            EvolveReason_Status: Evolve.Joi.number().required(),
            // selectedMachineArray : Evolve.Joi.array().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2241: Error while creating Reason Auth "+validateEvolveData.error.toString());
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

    
    assignItemToSuppliersAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
            selectedSuppliers: Evolve.Joi.array().required(),
            EvolveItemSupLink_CustomerItem: Evolve.Joi.string().required(),
            EvolveItemSupLink_Comments: Evolve.Joi.string().allow(''),

            // selectedMachineArray : Evolve.Joi.array().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2242: Error while assigning Item To Suppliers Auth "+validateEvolveData.error.toString());
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
        
    getSingleAssignDataAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
        
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2243: Error while getting Single Assign Data Auth "+validateEvolveData.error.toString());
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
    getAssignedListAuth : function (req,res,next){
        const rulesSchema = Evolve.Joi.object({
            displayRecord : Evolve.Joi.number().required(),
            startFrom : Evolve.Joi.number().required(),
            search : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2337: Error while getting Unit List Auth  " +validateEvolveData.error.toString());
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

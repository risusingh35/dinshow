'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getReaderAttributesList : async function (req, res, next) {
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
            Evolve.Log.error(" EERR####: Error while getting Reader Attributes List "+validateEvolveData.error);
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

    addReaderAttributesData : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReader_ID : Evolve.Joi.number().required(),
            EvolveReaderAttributes_Code : Evolve.Joi.string().required(),
            EvolveReaderAttributes_Parent : Evolve.Joi.string().required(),
            EvolveReaderAttributes_Datatype : Evolve.Joi.string().required(),
            EvolveReaderAttributes_Replace : Evolve.Joi.string().required().allow(''),
            EvolveReaderAttributes_Default : Evolve.Joi.string().required(),
            EvolveReaderAttributes_IsDefault : Evolve.Joi.boolean().required(),
            EvolveReaderAttributes_Status : Evolve.Joi.boolean().required(),           

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR####: Error while Adding Reader Attribute "+validateEvolveData.error);
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

    editReaderAttributesData : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReader_ID : Evolve.Joi.number().required(),
            EvolveReaderAttributes_ID : Evolve.Joi.number().required(),
            EvolveReaderAttributes_Code : Evolve.Joi.string().required(),
            EvolveReaderAttributes_Parent : Evolve.Joi.string().required(),
            EvolveReaderAttributes_Datatype : Evolve.Joi.string().required(),
            EvolveReaderAttributes_Replace : Evolve.Joi.string().required().allow(''),
            EvolveReaderAttributes_Default : Evolve.Joi.string().required(),
            EvolveReaderAttributes_IsDefault : Evolve.Joi.boolean().required(),
            EvolveReaderAttributes_Status : Evolve.Joi.boolean().required(),           

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR####: Error while Editing Reader Attribute "+validateEvolveData.error);
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
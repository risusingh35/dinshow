'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getReaderAttMappingList : async function (req, res, next) {
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

    addReaderAttMapping : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReader_ID : Evolve.Joi.number().required(),
            EvolveReaderAttributes_ID : Evolve.Joi.number().required(),
            EvolveReaderAttrMapping_Table : Evolve.Joi.string().required(),
            EvolveReaderAttrMapping_Field : Evolve.Joi.string().required(),
            EvolveReaderAttrMapping_MatchField : Evolve.Joi.string().required(),
            EvolveReaderAttrMapping_Status : Evolve.Joi.boolean().required(),           

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR####: Error while Adding Reader Attribute Mapping "+validateEvolveData.error);
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

    editReaderAttMapping : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReaderAttrMapping_ID : Evolve.Joi.number().required(),
            EvolveReader_ID : Evolve.Joi.number().required(),
            EvolveReaderAttributes_ID : Evolve.Joi.number().required(),
            EvolveReaderAttrMapping_Table : Evolve.Joi.string().required(),
            EvolveReaderAttrMapping_Field : Evolve.Joi.string().required(),
            EvolveReaderAttrMapping_MatchField : Evolve.Joi.string().required(),
            EvolveReaderAttrMapping_Status : Evolve.Joi.boolean().required(),            

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR####: Error while Editing Reader Attribute Mapping "+validateEvolveData.error);
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
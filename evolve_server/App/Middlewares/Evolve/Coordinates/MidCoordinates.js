'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addCoordinate: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCoordinatesTemplate_ID: Evolve.Joi.number().required(),
            EvolveCoordinates_Name: Evolve.Joi.string().required(),
            EvolveCoordinates_Code: Evolve.Joi.string().required(),
            EvolveCoordinates_X: Evolve.Joi.string().required(),
            EvolveCoordinates_Y: Evolve.Joi.string().required(),
            EvolveCoordinates_MaxX: Evolve.Joi.string().required(),
            EvolveCoordinates_MinX: Evolve.Joi.string().required(),
            EvolveCoordinates_ExtraText: Evolve.Joi.string().required().allow(''),
            EvolveCoordinates_Status: Evolve.Joi.boolean().required(),
            EvolveCoordinates_IsMultiple: Evolve.Joi.boolean().required(),
            EvolveCoordinates_DiffWithLineNumber: Evolve.Joi.string().required(),
            EvolveCoordinates_InvoiceFeild: Evolve.Joi.string().required().allow(''),
            EvolveCoordinates_InvoiceItemFeild: Evolve.Joi.string().required().allow(''),
            EvolveCoordinates_IsCordRequired: Evolve.Joi.boolean().required(),
            EvolveCoordinates_MinY: Evolve.Joi.string().required(),
            EvolveCoordinates_MaxY: Evolve.Joi.string().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2210: Error while adding Co-ordinate " + validateEvolveData.error);
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
    updateCoordinate: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCoordinates_ID: Evolve.Joi.number().required(),
            EvolveCoordinatesTemplate_ID: Evolve.Joi.number().required(),
            EvolveCoordinates_Name: Evolve.Joi.string().required(),
            EvolveCoordinates_Code: Evolve.Joi.string().required(),
            EvolveCoordinates_X: Evolve.Joi.string().required(),
            EvolveCoordinates_Y: Evolve.Joi.string().required(),
            EvolveCoordinates_MaxX: Evolve.Joi.string().required(),
            EvolveCoordinates_MinX: Evolve.Joi.string().required(),
            EvolveCoordinates_ExtraText: Evolve.Joi.string().required().allow(''),
            EvolveCoordinates_Status: Evolve.Joi.boolean().required(),
            EvolveCoordinates_IsMultiple: Evolve.Joi.boolean().required(),
            EvolveCoordinates_DiffWithLineNumber: Evolve.Joi.string().required(),
            EvolveCoordinates_InvoiceFeild: Evolve.Joi.string().required().allow(''),
            EvolveCoordinates_InvoiceItemFeild: Evolve.Joi.string().required().allow(''),
            EvolveCoordinates_IsCordRequired: Evolve.Joi.boolean().required(),
            EvolveCoordinates_MinY: Evolve.Joi.string().required(),
            EvolveCoordinates_MaxY: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2211: Error while updating Coordinate " + validateEvolveData.error);
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

    getCoordinateList: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            // draw: Evolve.Joi.string().required(),
            // columns: Evolve.Joi.array().required(),
            // start: Evolve.Joi.number().required(),
            // length: Evolve.Joi.number().required(),
            // search: Evolve.Joi.object().required(),
            displayRecord: Evolve.Joi.number().required(),
            startFrom: Evolve.Joi.number().required(),
            search: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2212: Error while getting Co-ordinate List " + validateEvolveData.error);
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
    deleteCoordinates: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCoordinates_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2212: Error while getting Co-ordinate List " + validateEvolveData.error);
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
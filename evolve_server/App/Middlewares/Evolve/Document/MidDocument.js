'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addDocument: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocument_Name: Evolve.Joi.string().required(),
            EvolveDocument_Code: Evolve.Joi.string().required(),
            EvolveDocumentType_ID: Evolve.Joi.number().required(),
            EvolveDocumentSubType_ID: Evolve.Joi.number().required(),
            EvolveDocument_Data_Input_Type: Evolve.Joi.string().required(),
            EvolveDocument_Status: Evolve.Joi.string().required(),
            EvolveDocument_Data_Input_Folder: Evolve.Joi.string().required(),
            EvolveCoordinatesTemplate_ID: Evolve.Joi.number().required(),
            EvolveDocument_E_Invoice: Evolve.Joi.string().required(),
            EvolveGSP_ID: Evolve.Joi.number().required(),
            EvolveDocument_IsCSV_Required: Evolve.Joi.boolean().required(),
            EvolveDocument_IsGST_Process: Evolve.Joi.boolean().required(),
            EvolveDocument_IsDS_Process: Evolve.Joi.boolean().required(),
            EvolveCustQRTemplate_ID: Evolve.Joi.number().required(),

            EvolveDocument_IsEmail_Process: Evolve.Joi.boolean().required(),
            // EvolveDocument_ToEmail_ID: Evolve.Joi.string().required().allow(''),
            // EvolveDocument_CCEmail_IDS: Evolve.Joi.string().required().allow(''),
            // EvolveDocument_EmailBody: Evolve.Joi.string().required().allow(''),

            EvolveDocument_IsIRN: Evolve.Joi.boolean().required(),
            EvolveDocument_IsIRNQRCode: Evolve.Joi.boolean().required(),
            EvolveDocument_IsCustomerQRCode: Evolve.Joi.boolean().required(),
            EvolveDocument_CustomerQRCodeField: Evolve.Joi.string().required().allow(''),

            EvolveDocument_IsEWayBill: Evolve.Joi.boolean().required(),
            EvolveDocument_IsDistanceAPI: Evolve.Joi.boolean().required(),
            EvolveDocument_IsVahanValidation: Evolve.Joi.boolean().required(),
            EvolveDocument_IsGPRSTracking: Evolve.Joi.boolean().required(),

            EvolveDocument_SignatureSetting: Evolve.Joi.string().required(),
            EvolveDocument_SignatureSettingDetails: Evolve.Joi.string().required().allow(''),
            EvolveDocumentMappingSetting: Evolve.Joi.array().required(),
            EvolveDocument_DS_Setting: Evolve.Joi.string().required().allow(''),
            EvolveDocument_IsPrintRequired: Evolve.Joi.boolean().required(),
            EvolveDocument_EmailSetting: Evolve.Joi.string().required().allow(''),
            EvolveDocument_PrintCopy: Evolve.Joi.string().required().allow(''),



        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2221: Error while adding Document " + validateEvolveData.error);
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
    updateDocument: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            Evolvedocument_ID: Evolve.Joi.number().required(),
            EvolveDocument_Name: Evolve.Joi.string().required(),
            EvolveDocument_Code: Evolve.Joi.string().required(),
            EvolveDocumentType_ID: Evolve.Joi.number().required(),
            EvolveDocumentSubType_ID: Evolve.Joi.number().required(),
            EvolveDocument_Data_Input_Type: Evolve.Joi.string().required(),
            EvolveDocument_Status: Evolve.Joi.string().required(),
            EvolveDocument_Data_Input_Folder: Evolve.Joi.string().required(),
            EvolveCoordinatesTemplate_ID: Evolve.Joi.number().required(),
            EvolveDocument_E_Invoice: Evolve.Joi.string().required(),
            EvolveGSP_ID: Evolve.Joi.number().required(),
            EvolveDocument_IsCSV_Required: Evolve.Joi.boolean().required(),
            EvolveDocument_IsGST_Process: Evolve.Joi.boolean().required(),
            EvolveDocument_IsDS_Process: Evolve.Joi.boolean().required(),
            EvolveDocument_IsEmail_Process: Evolve.Joi.boolean().required(),
            EvolveCustQRTemplate_ID: Evolve.Joi.number().required(),
            // EvolveDocument_ToEmail_ID: Evolve.Joi.string().required().allow(''),
            // EvolveDocument_CCEmail_IDS: Evolve.Joi.string().required().allow(''),
            // EvolveDocument_EmailBody: Evolve.Joi.string().required().allow(''),
            EvolveDocument_IsIRN: Evolve.Joi.boolean().required(),
            EvolveDocument_IsIRNQRCode: Evolve.Joi.boolean().required(),
            EvolveDocument_IsCustomerQRCode: Evolve.Joi.boolean().required(),
            EvolveDocument_CustomerQRCodeField: Evolve.Joi.string().required().allow(''),
            EvolveDocument_IsPrintRequired: Evolve.Joi.boolean().required(),



            EvolveDocument_IsEWayBill: Evolve.Joi.boolean().required(),
            EvolveDocument_IsDistanceAPI: Evolve.Joi.boolean().required(),
            EvolveDocument_IsVahanValidation: Evolve.Joi.boolean().required(),
            EvolveDocument_IsGPRSTracking: Evolve.Joi.boolean().required(),

            EvolveDocument_SignatureSetting: Evolve.Joi.string().required(),
            EvolveDocument_SignatureSettingDetails: Evolve.Joi.string().required().allow(''),
            EvolveDocumentMappingSetting: Evolve.Joi.array().required(),
            EvolveDocument_DS_Setting: Evolve.Joi.string().required().allow(''),
            EvolveDocument_EmailSetting: Evolve.Joi.string().required().allow(''),
            EvolveDocument_PrintCopy: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2222: Error while updating Document " + validateEvolveData.error);
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

    getDocumentList: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord: Evolve.Joi.number().required(),
            startFrom: Evolve.Joi.number().required(),
            search: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2223: Error while getting Document List " + validateEvolveData.error);
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
            EvolveCoordinatesTemplate_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2223: Error while getting Document List " + validateEvolveData.error);
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
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addGsp: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveGSP_Code: Evolve.Joi.string().required(),
            EvolveGSP_Name: Evolve.Joi.string().required(),
            EvolveGSP_Integration_Type: Evolve.Joi.string().required(),
            EvolveGSP_URL_Type: Evolve.Joi.string().required().allow(''),
            EvolveGSP_URL: Evolve.Joi.string().required().allow(''),
            EvolveGSP_OutPut_Drive: Evolve.Joi.string().required().allow(''),
            EvolveGSP_Input_Drive: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_Server_PORT: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_Output_Folder: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_Input_Folder: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_Username: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_Password: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_HOST: Evolve.Joi.string().required().allow(''),
            EvolveGSP_Contact_Name: Evolve.Joi.string().required(),
            EvolveGSP_Contact_Email: Evolve.Joi.string().required(),
            EvolveGSP_Contact_Phone: Evolve.Joi.number().required(),
            EvolveGSP_Status: Evolve.Joi.string().required(),
            EvolveGSP_IRPUsername: Evolve.Joi.string().required(),
            EvolveGSP_IRPPassword: Evolve.Joi.string().required(),
            EvolveGSP_GSPUsername: Evolve.Joi.string().required(),
            EvolveGSP_GSPPassword: Evolve.Joi.string().required(),
            EvolveGSP_GSPSecrateKey: Evolve.Joi.string().required(),
            EvolveGSP_GSPPemFilePath: Evolve.Joi.string().required(),
            EvolveGSP_GSTIN: Evolve.Joi.string().required(),
            EvolveGSP_GSPOrganizationID: Evolve.Joi.string().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2224: Error while adding Gsp " + validateEvolveData.error);
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
    updateGsp: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveGSP_ID: Evolve.Joi.number().required(),
            EvolveGSP_Code: Evolve.Joi.string().required(),
            EvolveGSP_Name: Evolve.Joi.string().required(),
            EvolveGSP_Integration_Type: Evolve.Joi.string().required(),
            EvolveGSP_URL_Type: Evolve.Joi.string().required().allow(''),
            EvolveGSP_URL: Evolve.Joi.string().required().allow(''),
            EvolveGSP_OutPut_Drive: Evolve.Joi.string().required().allow(''),
            EvolveGSP_Input_Drive: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_Server_PORT: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_Output_Folder: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_Input_Folder: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_Username: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_Password: Evolve.Joi.string().required().allow(''),
            EvolveGSP_SFTP_HOST: Evolve.Joi.string().required().allow(''),
            EvolveGSP_Contact_Name: Evolve.Joi.string().required(),
            EvolveGSP_Contact_Email: Evolve.Joi.string().required(),
            EvolveGSP_Contact_Phone: Evolve.Joi.number().required(),
            EvolveGSP_Status: Evolve.Joi.string().required(),
            EvolveGSP_IRPUsername: Evolve.Joi.string().required(),
            EvolveGSP_IRPPassword: Evolve.Joi.string().required(),
            EvolveGSP_GSPUsername: Evolve.Joi.string().required(),
            EvolveGSP_GSPPassword: Evolve.Joi.string().required(),
            EvolveGSP_GSPSecrateKey: Evolve.Joi.string().required(),
            EvolveGSP_GSPPemFilePath: Evolve.Joi.string().required(),
            EvolveGSP_GSTIN: Evolve.Joi.string().required(),
            EvolveGSP_GSPOrganizationID: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2225: Error while updating Gsp " + validateEvolveData.error);
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
    getGspList: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord: Evolve.Joi.number().required(),
            startFrom: Evolve.Joi.number().required(),
            search : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting Gsp List " + validateEvolveData.error);
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
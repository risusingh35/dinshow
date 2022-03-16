'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getCompanyList  : async function (req, res, next) {
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
            Evolve.Log.error(" EERR2205: Error while getting company list  "+validateEvolveData.error);
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
    createCompanyAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCompany_Deployment: Evolve.Joi.string().required(),
            EvolveCompany_Name: Evolve.Joi.string().required(),
            EvolveCompany_Location: Evolve.Joi.string().required(),
            EvolveCompany_Description: Evolve.Joi.string().required(),
            EvolveCompany_LogoImage: Evolve.Joi.string().required(),
            EvolveCompany_DBName: Evolve.Joi.string().required(),
            EvolveCompany_DBUser: Evolve.Joi.string().required(),
            EvolveCompany_Password: Evolve.Joi.string().required(),
            EvolveCompany_Host: Evolve.Joi.string().required(),
            EvolveCompany_Instance: Evolve.Joi.string().required(),
            Evolve_Apps: Evolve.Joi.array().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2206: Error while creating Company Auth "+validateEvolveData.error.toString());
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
    updateCompanyAuth : function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCompany_Deployment: Evolve.Joi.string().required(),
            EvolveCompany_Name: Evolve.Joi.string().required(),
            EvolveCompany_Location: Evolve.Joi.string().required(),
            EvolveCompany_Description: Evolve.Joi.string().required(),
            EvolveCompany_LogoImage: Evolve.Joi.string().required(),
            EvolveCompany_DBName: Evolve.Joi.string().required(),
            EvolveCompany_DBUser: Evolve.Joi.string().required(),
            EvolveCompany_Password: Evolve.Joi.string().required(),
            EvolveCompany_Host: Evolve.Joi.string().required(),
            EvolveCompany_Instance: Evolve.Joi.string().required(),
            Evolve_Apps: Evolve.Joi.array().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: true,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2206: Error while creating Company Auth "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    }
}
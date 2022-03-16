const Evolve = require('../../Boot/Evolve');

module.exports = {

    addDevice: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDevice_Name: Evolve.Joi.string().required(),
            EvolveDeviceType_ID: Evolve.Joi.number().required(),
            EvolveDevice_Code: Evolve.Joi.string().required(),
            EvolveDevice_Status: Evolve.Joi.string().required(),
            EvolveDevice_SendOption: Evolve.Joi.string().required(),
            EvolveDevice_String: Evolve.Joi.string().required(),
            EvolveDevice_MqttIP: Evolve.Joi.string().required().allow(''),
            EvolveDevice_Port: Evolve.Joi.string().required().allow(''),
            EvolveDevice_Subscriber: Evolve.Joi.string().required().allow(''),
            EvolveDevice_API: Evolve.Joi.string().required().allow(''),
            EvolveLocation_ID: Evolve.Joi.number().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error.toString());
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
    updateDevice: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDevice_ID: Evolve.Joi.number().required(),
            EvolveDevice_Name: Evolve.Joi.string().required(),
            EvolveDeviceType_ID: Evolve.Joi.number().required(),
            EvolveDevice_Code: Evolve.Joi.string().required(),
            EvolveDevice_Status: Evolve.Joi.string().required(),
            EvolveDevice_SendOption: Evolve.Joi.string().required(),
            EvolveDevice_String: Evolve.Joi.string().required(),
            EvolveDevice_MqttIP: Evolve.Joi.string().required().allow(''),
            EvolveDevice_Port: Evolve.Joi.string().required().allow(''),
            EvolveDevice_Subscriber: Evolve.Joi.string().required().allow(''),
            EvolveDevice_API: Evolve.Joi.string().required().allow(''),
            EvolveLocation_ID: Evolve.Joi.number().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error.toString());
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
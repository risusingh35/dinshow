'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    sendMail: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EmailHost : Evolve.Joi.string().required(),
            EmailPort : Evolve.Joi.string().required(),
            EmailSecure : Evolve.Joi.boolean().required(),
            TLS : Evolve.Joi.boolean().required(),
            EmailUser : Evolve.Joi.string().required(),
            EmailPassword : Evolve.Joi.string().required(),
            FromEmail : Evolve.Joi.string().required(),
            ToEmail : Evolve.Joi.string().required(),
            CCEmail : Evolve.Joi.string().required(),
            EmailSubject : Evolve.Joi.string().required(),
            EmailBody : Evolve.Joi.string().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2229: Error while getting Test Send Mail Data "+validateEvolveData.error);
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
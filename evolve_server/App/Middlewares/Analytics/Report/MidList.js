'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getReportData: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            reportMenuUrl: Evolve.Joi.string().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2175: Error while getting report data "+validateEvolveData.error);
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

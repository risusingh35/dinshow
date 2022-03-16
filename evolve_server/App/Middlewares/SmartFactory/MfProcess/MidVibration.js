'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    checkVibrationMachinBarcodeAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrdersDetail_Serial: Evolve.Joi.string().required(),
            Force: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2372: Error while checking Vibration Machin Barcode Auth "+validateEvolveData.error.toString());
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
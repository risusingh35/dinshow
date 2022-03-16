'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getStockListAuth: function (req, res, next) {
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
            Evolve.Log.error(" EERR32462: Error while authenticate getStockListAuth "+validateEvolveData.error.toString());
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


    getStockListHistAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord : Evolve.Joi.number().required(),
            startFrom : Evolve.Joi.number().required(),
            search : Evolve.Joi.string().required().allow(''),
            unitId : Evolve.Joi.number().required().allow(null),
            itemId : Evolve.Joi.number().required().allow(null),
            batcNo : Evolve.Joi.string().required().allow(''),
            maxDate : Evolve.Joi.string().required().allow(''),



        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32489: Error while authenticate getStockListAuth "+validateEvolveData.error.toString());
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
    getInvDetailsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
           
            batchNo : Evolve.Joi.string().required(),
            wereHouseName : Evolve.Joi.string().required(),
            uploadedDate : Evolve.Joi.string().required(),


           


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32490: Error while authenticate getInvDetailsAuth "+validateEvolveData.error.toString());
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
    updateInvQtyAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
           
           
            qty : Evolve.Joi.number().required(),
            stockId : Evolve.Joi.number().required(),


                   });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32491: Error while authenticate updateInvQtyAuth "+validateEvolveData.error.toString());
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
    getStockDetaisByDateAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            uploadedDate : Evolve.Joi.string().required(),


                   });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32492: Error while authenticate getStockDetaisByDateAuth "+validateEvolveData.error.toString());
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
    getLastDatearomWHNameAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            wareHouseName : Evolve.Joi.string().required(),


                   });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32493: Error while authenticate getLastDatearomWHNameAuth "+validateEvolveData.error.toString());
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
    addOrUpdateStockAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
           
           
            EvolveCustomStockTake_ID : Evolve.Joi.number().required().allow(null),
            EvolveCustomStockTake_WarehouseName : Evolve.Joi.string().required(),
            EvolveCustomStockTake_BatchNo : Evolve.Joi.string().required(),
            EvolveCustomStockTake_ItemCode : Evolve.Joi.string().required().allow(''),
            EvolveCustomStockTake_TotalQty : Evolve.Joi.number().required(),
            EvolveCustomStockTake_UploadedAt : Evolve.Joi.string().required(),
            EvolveCustomStockTake_ItemDesc : Evolve.Joi.string().required().allow(''),
            EvolveCustomStockTake_InternalCode : Evolve.Joi.string().required().allow(''),
            EvolveCustomStockTake_VendItemCode : Evolve.Joi.string().required().allow(''),
            EvolveCustomStockTake_Uom : Evolve.Joi.string().required().allow(''),



                   });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32494: Error while authenticate updateInvQtyAuth "+validateEvolveData.error.toString());
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
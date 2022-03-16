'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    //sreial number wise picklist issue 

    addPickListDetails: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
          resultArray : Evolve.Joi.required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2373: Error while adding Pick List Details "+validateEvolveData.error.toString());
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

    getPickListForIssueAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrders_ID: Evolve.Joi.number().required().allow(''),
            EvolveSalesOrder_ID: Evolve.Joi.number().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2374: Error while getting Pick List For Issue Auth "+validateEvolveData.error.toString());
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

    getPickListByWorkOrderAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            draw : Evolve.Joi.string().required(),
            columns : Evolve.Joi.array().required(),
            start : Evolve.Joi.number().required(),
            length : Evolve.Joi.number().required(),
            search : Evolve.Joi.object().required(),
            EvolveProdOrders_ID : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2375: Error while getting Pick List By Work Order Auth "+validateEvolveData.error.toString());
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

    generatePickListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrders_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2376: Error while generating Pick List Auth "+validateEvolveData.error.toString());
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

    getItemLocationAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2377: Error while getting Item Location Auth "+validateEvolveData.error.toString());
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

    updateInventoryAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
          
          
            EvolveProdOrders_ID: Evolve.Joi.number().required(),
            itemList: Evolve.Joi.array().required(),
            EvolveItem_ID :  Evolve.Joi.number().required(),
            EvolvePickList_ID :  Evolve.Joi.number().required(),
             

         
            

           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2378: Error while updating Inventory Auth "+validateEvolveData.error.toString());
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

    checkQuntityAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID: Evolve.Joi.number().required(),
            weight: Evolve.Joi.required(),
         

            

           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2379: Error while checking Quntity Auth "+validateEvolveData.error.toString());
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

    // getPickListByWorkOrderCountAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //       EvolveSection_ID  : Evolve.Joi.number().required(),
    //       EvolveMachine_ID  : Evolve.Joi.number().required(),
    //       EvolveProdOrders_ID  : Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });
    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error.toString());
    //         res.send({
    //             statusCode: 400,
    //             status: 'fail',
    //             message: validateEvolveData.error.toString(),
    //             result: null
    //         });
    //     } else {
    //         next();
    //     }
    //   },

    // middleware for woPicklist  15-06-20

    getWoProduceDetailsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID  : Evolve.Joi.number().required(),
     
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2380: Error while getting Wo Produce Details Auth "+validateEvolveData.error.toString());
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
    getWobomIssueDetailsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID  : Evolve.Joi.number().required(),
     
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2381: Error while getting Wo bom Issue Details Auth "+validateEvolveData.error.toString());
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
    getPalletDetailsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrders_ID  : Evolve.Joi.number().required(),
            EvolveItem_ID  : Evolve.Joi.number().required(),

     
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2382: Error while getting Pallet Details Auth "+validateEvolveData.error.toString());
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
    pickPalletsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrders_ID  : Evolve.Joi.number().required(),
            itemToMade  : Evolve.Joi.number().required(),
            itemToMadeQty  : Evolve.Joi.number().required(),
            selectedIssueLine  : Evolve.Joi.number().required(),
            selectedItem  : Evolve.Joi.number().required(),
            pickToLoc  : Evolve.Joi.number().required(),
            pickedPallets : Evolve.Joi.array().required(),
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2383: Error while picking Pallets Auth "+validateEvolveData.error.toString());
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
    unpickPalletsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            selectedIssueLine  : Evolve.Joi.number().required(),
            EvolveLocation_ID  : Evolve.Joi.number().required(),
            unPickedPallets : Evolve.Joi.array().required(),
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2384: Error while unpicking Pallets Auth "+validateEvolveData.error.toString());
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
    getSubItemListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID  : Evolve.Joi.number().required(),
     
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2385: Error while getting Sub Item List Auth "+validateEvolveData.error.toString());
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
    getSubItemAvailPalletsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID  : Evolve.Joi.number().required(),
     
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2386: Error while getting Sub Item Avail Pallets Auth "+validateEvolveData.error.toString());
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
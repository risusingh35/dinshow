const Evolve = require('../../Boot/Evolve');

module.exports = {

    // Purchase Order Auth
    getPoDetailsByPoIdAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePurchaseOrder_ID: Evolve.Joi.number().required(),
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

    checkUomConvAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            CurrentUOM: Evolve.Joi.number().required(),
            ContverUOM: Evolve.Joi.number().required(),
            EvolveItem_ID: Evolve.Joi.number().required(),
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
    getPoDetailsByLineNumberAndPoIdAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePurchaseOrder_ID: Evolve.Joi.number().required(),
            EvolvePurchaseOrderDetail_Line: Evolve.Joi.array().required(),
            EvolveSupplier_Invoice: Evolve.Joi.string().required(),
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


    receivePurchaseOrderAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePurchaseOrderDetail_ID: Evolve.Joi.number().required(),
            EvolvePurchaseOrderDetail_QuantityReceived: Evolve.Joi.number().required(),
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
            EvolveTransitionHistory_SupplierInvoice_ChallanNumber: Evolve.Joi.string().required(),
            EvolveLocation_ID: Evolve.Joi.number().required(),
            EvolveTransitionHistory_GateEntryNumber: Evolve.Joi.string().required(),
            EvolveTransitionHistory_GateEntryDate: Evolve.Joi.string().required(),
            EvolveTransitionHistory_SupplierShipDate: Evolve.Joi.string().required(),
            EvolveTransitionHistory_SupplierShipLocation: Evolve.Joi.string().required(),
            EvolveUOM_ID: Evolve.Joi.number().required(),
            CurrentUOM: Evolve.Joi.number().required(),
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

    // Move Pallet

    movePalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID: Evolve.Joi.number().required(),
            EvolveInventory_QtyAllocated: Evolve.Joi.number().required(),
            EvolveReason_ID: Evolve.Joi.number().required(),
            EvolveToLocation_ID: Evolve.Joi.number().required(),
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

    getPalletListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.array().required(),
            EvolveInventory_Refnumber: Evolve.Joi.string().required(),
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


    getPalletListExternalAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.array().required(),
            EvolveInventory_Refnumber: Evolve.Joi.string().required(),
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

    getReasonListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveInventory_Refnumber: Evolve.Joi.string().required(),
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

    // getReasonListAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveItem_ID  : Evolve.Joi.number().required(),
    //         EvolveInventory_Refnumber  : Evolve.Joi.string().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error(validateEvolveData.error.toString());
    //         res.send({
    //             statusCode: 400,
    //             status: 'fail',
    //             message: validateEvolveData.error.toString(),
    //             result: null
    //         });
    //     } else {
    //         next();
    //     }
    // },

    // Get Exit
    getDoSoInvoice: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInvoice_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
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
    addGetExit: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDO_ID: Evolve.Joi.number().required(),
            EvolveDOLine: Evolve.Joi.array().required(),
            EvolveGateExit_SoNumber: Evolve.Joi.string().required().allow(''),
            EvolveGateExit_InvoiceNo: Evolve.Joi.string().required().allow(''),
            EvolveGateExit_Transporter: Evolve.Joi.string().required().allow(''),
            EvolveGateExit_VehicleNumber: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
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
    getallInvoiceDo: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInvoice_ID: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
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
    getSingleDo: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDO_ID: Evolve.Joi.number().required().allow(''),
            // EvolveInvoice_ID: Evolve.Joi.number().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
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

    getHistoryReportToday : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            draw : Evolve.Joi.string().required(),
            columns : Evolve.Joi.array().required(),
            start : Evolve.Joi.number().required(),
            length : Evolve.Joi.number().required(),
            search : Evolve.Joi.object().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
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
    getInventoryReport : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            draw : Evolve.Joi.string().required(),
            columns : Evolve.Joi.array().required(),
            start : Evolve.Joi.number().required(),
            length : Evolve.Joi.number().required(),
            search : Evolve.Joi.object().required(),
            startDate : Evolve.Joi.string().required().allow(''),
            endDate : Evolve.Joi.string().required().allow(''),
            item_number : Evolve.Joi.string().required().allow(''),
            location : Evolve.Joi.string().required().allow(''),
            location_type : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
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

    subContractorReport : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            draw : Evolve.Joi.string().required(),
            columns : Evolve.Joi.array().required(),
            start : Evolve.Joi.number().required(),
            length : Evolve.Joi.number().required(),
            search : Evolve.Joi.object().required(),
            startDate : Evolve.Joi.string().required().allow(''),
            endDate : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
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
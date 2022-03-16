'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getMachineListBySectionIdAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            workCenterId: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2400: Error while getting Machine List By Section Id Auth "+validateEvolveData.error.toString());
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

    getItemListByWorkOrderAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrders_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2401: Error while getting Item List By Work Order Auth "+validateEvolveData.error.toString());
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

    getProdOrdersBomAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrders_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2402: Error while getting Prod Orders Bom Auth "+validateEvolveData.error.toString());
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

    getWorkOrderByItemAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            machineId: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2403: Error while getting Work Order By Item Auth "+validateEvolveData.error.toString());
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

    createOperatorAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveOperator_Name: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2404: Error while creating Operator Auth "+validateEvolveData.error.toString());
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

    saveInventoryAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveLocation_ID: Evolve.Joi.number().required(),
            EvolveProdOrders_ID: Evolve.Joi.number().required(),
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
            EvolveInventory_Weight: Evolve.Joi.number().required(),
            EvolveInventory_LotNotes: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2405: Error while saving Inventory Auth "+validateEvolveData.error.toString());
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

    getProductionBookingListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveProdOrders_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2400: Error while getting Machine List By Section Id Auth "+validateEvolveData.error.toString());
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

    // Production  booking  V1 middlewares 

    getMachineListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSection_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2658: Error while Authenticate  getMachineListAuth "+validateEvolveData.error.toString());
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
    getWoListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachine_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2655: Error while Authenticate get wo list "+validateEvolveData.error.toString());
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
    getWoDetailsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            currentShiftDateTime: Evolve.Joi.required().allow({}),
            shiftAvailable: Evolve.Joi.boolean().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2656: Error while Authenticate getWoDetailsAuth"+validateEvolveData.error.toString());
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
    addProdCommentsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            EvolveWoSchedule_ProdComments: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2657: Error while Authenticate addProdCommentsAuth "+validateEvolveData.error.toString());
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
    checkPalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            EvolveInventory_RefNumber: Evolve.Joi.string().required(),
            EvolveLocation_ID: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2659: Error while Authenticate checkPalletAuth "+validateEvolveData.error.toString());
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
    issuePalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            EvolveSubItem_SubItem_ID: Evolve.Joi.number().required(),
            EvolvePickListDetail_IssQty: Evolve.Joi.number().required(),
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveInventory_ID: Evolve.Joi.number().required(),
            EvolveLocation_ID: Evolve.Joi.number().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2660: Error while Authenticate issuePalletAuth "+validateEvolveData.error.toString());
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
    getRtsUomListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
           


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2661: Error while Authenticate getRtsUomListAuth "+validateEvolveData.error.toString());
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
    rtsQtyAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            rtsItemId: Evolve.Joi.number().required(),
            EvolveLocation_ID: Evolve.Joi.number().required(),
            EvolveInventory_ID: Evolve.Joi.number().required(),
            EvolvePickListDetail_ID: Evolve.Joi.number().required(),
            qty: Evolve.Joi.number().required(),
            rtsOrignalItemId: Evolve.Joi.number().required(),
      });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2662: Error while Authenticate rtsQtyAuth "+validateEvolveData.error.toString());
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
    getProdBookingDetailsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),

      });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2663: Error while Authenticate getProdBookingDetailsAuth "+validateEvolveData.error.toString());
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
    completeProductionBookingAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
            EvolveInventory_SecondaryUom: Evolve.Joi.number().required().allow(null),
            EvolveInventory_SecondaryUomQty: Evolve.Joi.number().required().allow(null),
            EvolveInventory_PalletNotes: Evolve.Joi.string().required().allow(''),
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
            EvolveInventory_LotNotes: Evolve.Joi.string().required().allow(''),
            EvolveInventory_QtyOnHand: Evolve.Joi.number().required(),
            EvolveProdOrders_ID: Evolve.Joi.number().required(),
            EvolveLocation_ID: Evolve.Joi.number().required(),
            EvolveMachine_ID: Evolve.Joi.number().required(),
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            EvolveQc_IsRequired: Evolve.Joi.boolean().required(),

      });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2664: Error while Authenticate completeProductionBookingAuth "+validateEvolveData.error.toString());
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
    deleteBookedPalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrdersDetail_ID: Evolve.Joi.number().required(),
            EvolveInventory_ID: Evolve.Joi.number().required(),
            qty: Evolve.Joi.number().required().allow(''),
            EvolveWoSchedule_ID: Evolve.Joi.number().required().allow(''),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2665: Error while Authenticate deleteBookedPalletAuth "+validateEvolveData.error.toString());
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
    confirmBookingAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            palletsToConfirm: Evolve.Joi.array().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2666: Error while Authenticate confirmBookingAuth "+validateEvolveData.error.toString());
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
    updateBookedPalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            palletDetails: Evolve.Joi.object().required(),
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),

          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2667: Error while Authenticate updateBookedPalletAuth "+validateEvolveData.error.toString());
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
    getTsShiftListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            
            EvolveMachine_ID: Evolve.Joi.number().required(),

          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2668: Error while Authenticate getTsShiftListAuth "+validateEvolveData.error.toString());
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
    getSubReasonCodeListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            
            EvolveSubReason_ActualReason_ID: Evolve.Joi.number().required(),


          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2669: Error while Authenticate getSubReasonCodeListAuth "+validateEvolveData.error.toString());
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
    addTimeSheetAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            
            EvolveProdOrders_ID: Evolve.Joi.number().required().allow(null),
            EvolveWoSchedule_ID: Evolve.Joi.number().required().allow(null),
            EvolveActivityCode_ID: Evolve.Joi.number().required(),
            EvolveActivitySubCode_ID: Evolve.Joi.number().required().allow(null),
            EvolveTimesheet_Qty: Evolve.Joi.number().allow(null),
            EvolveTimesheet_StartDateTime: Evolve.Joi.string().required(),
            EvolveTimesheet_StopDateTime: Evolve.Joi.string().required(),
            EvolveTimesheet_TotalMin: Evolve.Joi.number().required(),
            EvolveShift_ID: Evolve.Joi.number().required(),
            EvolveScrapCode_ID: Evolve.Joi.number().required().allow(null),
            EvolveScrapSubCode_ID: Evolve.Joi.number().required().allow(null),
            EvolveScrapUOM: Evolve.Joi.number().required().allow(null),
            EvolveTimesheet_ScrapQty: Evolve.Joi.number().required().allow(null),
            EvolveTimesheet_Comments: Evolve.Joi.string().required().allow(''),
            EvolveTimesheet_WOStatus: Evolve.Joi.string().required().allow(''),
            EvolveTimesheet_ERPStatus: Evolve.Joi.string().required(),
            EvolveMachine_ID: Evolve.Joi.number(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2670: Error while Authenticate addTimeSheetAuth "+validateEvolveData.error.toString());
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
    getTimesheetListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            
            currentShiftData: Evolve.Joi.object().required().allow({}),
            EvolveMachine_ID: Evolve.Joi.number().required(),



          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2671: Error while Authenticate getTimesheetListAuth "+validateEvolveData.error.toString());
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
    getItemSecUomListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
           EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2672: Error while Authenticate getWoDetailsAuth "+validateEvolveData.error.toString());
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
    deleteTimeSheetAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            deleteSheetId: Evolve.Joi.number().required(),
            updateArray: Evolve.Joi.array().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2673: Error while Authenticate deleteTimeSheetAuth "+validateEvolveData.error.toString());
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
    addSubTimeSheetAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            tsData: Evolve.Joi.object().required(),
            updateArray: Evolve.Joi.array().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2674: Error while Authenticate addSubTimeSheetAuth "+validateEvolveData.error.toString());
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

    getMachinePlanDetailsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachine_ID: Evolve.Joi.number().required(),
            

          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2675: Error while Authenticate getMachinePlanDetailsAuth "+validateEvolveData.error.toString());
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
    getPlanMtIssueDetailsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            EvolveItem_ID: Evolve.Joi.number().required(),

          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2676: Error while Authenticate getPlanMtIssueDetailsAuth "+validateEvolveData.error.toString());
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
    completeJobAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),


          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2677: Error while Authenticate completeJobAuth "+validateEvolveData.error.toString());
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
    addEditedTimeSheetAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            tsData: Evolve.Joi.object().required(),
            updateArray: Evolve.Joi.array().required(),



          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2678: Error while Authenticate addEditedTimeSheetAuth "+validateEvolveData.error.toString());
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
    getMachineSheduleCommentsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            currentShiftData: Evolve.Joi.object().required().allow({}),
            EvolveMachine_ID: Evolve.Joi.number().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2679: Error while Authenticate getMachineSheduleCommentsAuth "+validateEvolveData.error.toString());
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
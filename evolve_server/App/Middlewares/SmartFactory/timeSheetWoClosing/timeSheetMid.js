'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    createVarianceGroup: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_Code: Evolve.Joi.string().required(),
            EvolveVarianceGroup_Name: Evolve.Joi.string().required(),
            EvolveVarianceGroup_Description: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2539 : All Validations are required while create variance  group");
            let obj = {statusCode: 400,status: "fail",message: "EERR2539 : All Validations are required while create variance group",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    getSingleVarianceGroup: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2540 : All Validations are required while get single variance group");
            let obj = {statusCode: 400,status: "fail",message: "EERR2540 : All Validations are required while get single variance group",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    updateVarianceGroup: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_ID: Evolve.Joi.number().required(),
            EvolveVarianceGroup_Code: Evolve.Joi.string().required(),
            EvolveVarianceGroup_Name: Evolve.Joi.string().required(),
            EvolveVarianceGroup_Description: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2541 : All Validations are required while update variance  group");
            let obj = {statusCode: 400,status: "fail",message: "EERR2541 : All Validations are required while update variance group",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    createVariance: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_ID: Evolve.Joi.number().required(),
            EvolveVariance_Code: Evolve.Joi.string().required(),
            EvolveVariance_Name: Evolve.Joi.string().required(),
            EvolveVariance_Description: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2542 : All Validations are required while create variance");
            let obj = {statusCode: 400,status: "fail",message: "EERR2542 : All Validations are required while create variance",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    getVarianceAll: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord: Evolve.Joi.number().required(),
            startFrom: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2542 : All Validations are required while get variance");
            let obj = {statusCode: 400,status: "fail",message: "EERR2542 : All Validations are required while get variance",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    getSingleVariance: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVariance_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2544 : All Validations are required while get single variance");
            let obj = {statusCode: 400,status: "fail",message: "EERR2544 : All Validations are required while get single variance",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    updateVariance: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVariance_ID: Evolve.Joi.number().required(),
            EvolveVarianceGroup_ID: Evolve.Joi.number().required(),
            EvolveVariance_Code: Evolve.Joi.string().required(),
            EvolveVariance_Name: Evolve.Joi.string().required(),
            EvolveVariance_Description: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2545 : All Validations are required while update variance");
            let obj = {statusCode: 400,status: "fail",message: "EERR2545 : All Validations are required while update variance",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    // time sheet review and closing  

    getTimesheetListAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachine_ID: Evolve.Joi.number().required(),
            dateRang: Evolve.Joi.array().required().allow([]),
         
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2819: Error while Authenticate getTimesheetListAuth "+validateEvolveData.error.toString());
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
    onTsPostToErpAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            tsToPostErp: Evolve.Joi.array().required(),
         
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) { 
          Evolve.Log.error(" EERR2820: Error while Authenticate onTsPostToErpAuth "+validateEvolveData.error.toString());
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
    onTimeSheetApproveAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveTimesheet_ID: Evolve.Joi.number().required(),
         
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) { 
          Evolve.Log.error(" EERR2821: Error while Authenticate onTimeSheetApproveAuth "+validateEvolveData.error.toString());
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
    deleteTimeSheetAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            deleteSheetId: Evolve.Joi.number().required(),
            updateArray: Evolve.Joi.array().required().allow([]),

         
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) { 
          Evolve.Log.error(" EERR2822: Error while Authenticate deleteTimeSheetAuth "+validateEvolveData.error.toString());
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
    getWoListAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachine_ID: Evolve.Joi.number().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) { 
          Evolve.Log.error(" EERR2823: Error while Authenticate getWoListAuth "+validateEvolveData.error.toString());
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
    getTsShiftListAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachine_ID: Evolve.Joi.number().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) { 
          Evolve.Log.error(" EERR2824: Error while Authenticate getTsShiftListAuth "+validateEvolveData.error.toString());
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
    addSubTimeSheetAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            tsData: Evolve.Joi.object().required(),
            updateArray: Evolve.Joi.array().required().allow([]),

          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) { 
            Evolve.Log.error(" EERR2825: Error while Authenticate addSubTimeSheetAuth "+validateEvolveData.error.toString());
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

    getWoDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2826: Error while Authenticate getWoDetailsAuth "+validateEvolveData.error.toString());
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
    
    addEditedTimeSheetAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            tsData: Evolve.Joi.object().required(),
            updateArray: Evolve.Joi.object().required(),
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2827: Error while Authenticate addEditedTimeSheetAuth "+validateEvolveData.error.toString());
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
    getTsDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2828: Error while Authenticate getTsDetailsAuth "+validateEvolveData.error.toString());
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
    getWcWOListAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachine_ID: Evolve.Joi.number().required(),
            
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2829: Error while Authenticate getWcWOListAuth "+validateEvolveData.error.toString());
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
    getWcDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSection_ID: Evolve.Joi.number().required(),
            EvolveMachine_ID: Evolve.Joi.number().required().allow(''),
            EvolveWoSchedule_ID: Evolve.Joi.number().required().allow(''),
            EvolveVarianceGroup_ID: Evolve.Joi.number().required().allow(''),
            
 
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2830: Error while Authenticate getWcDetailsAuth "+validateEvolveData.error.toString());
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
    getWcSummaryAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2831: Error while Authenticate getWcSummaryAuth "+validateEvolveData.error.toString());
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
    closeWorkOrderAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            EvolveWoSchedule_ClosingComments: Evolve.Joi.string().required(),

            
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2832: Error while Authenticate closeWorkOrderAuth "+validateEvolveData.error.toString());
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
    closeAllWoAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            wcWoToClose: Evolve.Joi.array().required(),            
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2833: Error while Authenticate closeAllWoAuth "+validateEvolveData.error.toString());
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
    getWcIssueSummaryAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),     
            EvolveItem_ID: Evolve.Joi.number().required(),            
            EvolveUOM_ID: Evolve.Joi.number().required(),                   
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2834: Error while Authenticate getWcIssueSummaryAuth "+validateEvolveData.error.toString());
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
    getRtsUomListAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),     
            EvolveUom_ID: Evolve.Joi.number().required(),                             
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2835: Error while Authenticate getRtsUomListAuth "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2836: Error while Authenticate rtsQtyAuth "+validateEvolveData.error.toString());
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
    getWcBookingSummaryAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
            EvolveItem_ID: Evolve.Joi.number().required(),
      });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2837 : Error while Authenticate getWcBookingSummaryAuth "+validateEvolveData.error.toString());
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
    addVarianceGroupAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_Name: Evolve.Joi.string().required(),
            EvolveVarianceGroup_TimeSheetVarParam: Evolve.Joi.string().required(),
            EvolveVarianceGroup_TimeSheetVarValue: Evolve.Joi.number().required(),
            EvolveVarianceGroup_BookingVarParam: Evolve.Joi.string().required(),
            EvolveVarianceGroup_BookingVarValue: Evolve.Joi.number().required(),
            EvolveVarianceGroup_IssueVarParam: Evolve.Joi.string().required(),
            EvolveVarianceGroup_IssueVarValue: Evolve.Joi.number().required(),

           
      });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2838: Error while Authenticate addVarianceGroupAuth "+validateEvolveData.error.toString());
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
    getWcBookingSummaryAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
            EvolveItem_ID: Evolve.Joi.number().required(),
      });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2839: Error while Authenticate getWcBookingSummaryAuth "+validateEvolveData.error.toString());
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
    deleteVarianceGroupAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_ID: Evolve.Joi.number().required(),
      });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2840: Error while Authenticate deleteVarianceGroupAuth "+validateEvolveData.error.toString());
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
    getVarGroupDetailsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_ID: Evolve.Joi.number().required(),
      });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2841: Error while Authenticate getVarGroupDetailsAuth "+validateEvolveData.error.toString());
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
    updateVarianceGroupAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_ID: Evolve.Joi.number().required(),
            EvolveVarianceGroup_Name: Evolve.Joi.string().required(),
            EvolveVarianceGroup_TimeSheetVarParam: Evolve.Joi.string().required(),
            EvolveVarianceGroup_TimeSheetVarValue: Evolve.Joi.number().required(),
            EvolveVarianceGroup_BookingVarParam: Evolve.Joi.string().required(),
            EvolveVarianceGroup_BookingVarValue: Evolve.Joi.number().required(),
            EvolveVarianceGroup_IssueVarParam: Evolve.Joi.string().required(),
            EvolveVarianceGroup_IssueVarValue: Evolve.Joi.number().required(),

           
      });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2842: Error while Authenticate updateVarianceGroupAuth "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2843: Error while Authenticate getSubReasonCodeListAuth "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2844: Error while Authenticate getItemSecUomListAuth "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2845: Error while Authenticate checkPalletAuth "+validateEvolveData.error.toString());
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
    confirmPalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2846: Error while Authenticate confirmPalletAuth "+validateEvolveData.error.toString());
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
            EvolveInventory_LotNotes: Evolve.Joi.string().required().allow(''),


          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2847: Error while Authenticate updateBookedPalletAuth "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2848: Error while Authenticate deleteBookedPalletAuth "+validateEvolveData.error.toString());
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
    addNewBookingPalletAuth: function (req, res, next) {
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
            palletNumber: Evolve.Joi.string().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2849: Error while Authenticate addNewBookingPalletAuth "+validateEvolveData.error.toString());
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
    getWcTimesheetSumaryAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveWoSchedule_ID: Evolve.Joi.number().required(),
            EvolveMachine_ID: Evolve.Joi.number().required(),

          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2850: Error while Authenticate getWcTimesheetSumaryAuth "+validateEvolveData.error.toString());
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
    addTsSummaryAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            tsData: Evolve.Joi.object().required(),
            updateArray: Evolve.Joi.array().required(),

          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2851 : Error while Authenticate addTsSummaryAuth "+validateEvolveData.error.toString());
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
    updateWcTsSummaryAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveTimesheet_ID: Evolve.Joi.number().required(),
            EvolveTimesheet_Qty: Evolve.Joi.number().required(),

          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2852: Error while Authenticate updateWcTsSummaryAuth "+validateEvolveData.error.toString());
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
    
    
    
}
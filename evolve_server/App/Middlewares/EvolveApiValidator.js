const Evolve = require('../../Boot/Evolve');

module.exports = {
    testConnectionAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCompany_Instance: Evolve.Joi.string().required(),
            EvolveCompany_DBUser: Evolve.Joi.string().required(),
            EvolveCompany_Password: Evolve.Joi.string().required(),
            EvolveCompany_Port: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error.toString());
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

    userCompanyListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUser_ID: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error.toString());
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
            EvolveUser_ID: Evolve.Joi.string().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error.toString());
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

    createUnitAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCompany_ID: Evolve.Joi.number().required(),
            EvolveUnit_Name: Evolve.Joi.string().required(),
            EvolveUnit_Description: Evolve.Joi.string().required(),
            EvolveUnit_Location: Evolve.Joi.string().required(),
            EvolveUnit_LogoImage: Evolve.Joi.string().required(),
            EvolveUnit_DBUser: Evolve.Joi.string().required(),
            EvolveUnit_Password: Evolve.Joi.string().required(),
            EvolveUnit_Instance: Evolve.Joi.string().required(),
            EvolveUnit_Port: Evolve.Joi.number().required(),
            EvolveUnit_IsActive: Evolve.Joi.boolean().required(),
            EvolveUser_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error.toString());
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







    validateEvolveUserTest: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EUserID: Evolve.Joi.string().required(),
            // EUserName: Evolve.Joi.string().required(),
            // EUserRole: Evolve.Joi.string().required(),
            // EUserEmail: Evolve.Joi.string().required(),
            // EUserPass: Evolve.Joi.string().required(),
            // EStatus: Evolve.Joi.string().required(),
            //status: Evolve.Joi.string().min(3).max(30).required(),
            //role: Evolve.Joi.string().min(3).max(30).required(),
            //email: Evolve.Joi.string().email().required(),
            //password: Evolve.Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error.toString());
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
    validateEsfProdDetails: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            //EUserID: Evolve.Joi.string().required(),
            // EUserName: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error.toString());
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

    // getCompanyListById: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveCompany_ID: Evolve.Joi.number().required(),
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
    // },

    // createUserAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveUser_login: Evolve.Joi.string().required(),
    //         EvolveUser_Name: Evolve.Joi.string().required(),
    //         EvolveUser_EmailID: Evolve.Joi.string().required(),
    //         EvolveUser_password: Evolve.Joi.string().required(),
    //         EvoleCompany_ID: Evolve.Joi.number().required(),
    //         EvoleUnit_ID: Evolve.Joi.array().required(),
    //         EvoleRole_ID: Evolve.Joi.array().required(),
    //         EvolveUser_IsActive: Evolve.Joi.boolean().required(),
    //         EvolveUser_PrintAllow: Evolve.Joi.boolean().required(),
    //         EvolveUser_CreatePoAllow: Evolve.Joi.boolean().required(),
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
    // },

    // createRoleAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveRole_Name: Evolve.Joi.string().required(),
    //         EvolveRole_Description: Evolve.Joi.string().required(),
    //         EvolveRole_IsActive: Evolve.Joi.boolean().required(),
    //         EvolveUser_ID: Evolve.Joi.number().required(),
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
    // },

    // selectSingleUserAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveUser_ID: Evolve.Joi.number().required(),
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
    // },

    // updateUserAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveUser_login: Evolve.Joi.string().required(),
    //         EvolveUser_Name: Evolve.Joi.string().required(),
    //         EvolveUser_EmailID: Evolve.Joi.string().required(),
    //         EvolveUser_password: Evolve.Joi.string().allow('').allow(null).required(),
    //         EvoleCompany_ID: Evolve.Joi.number().required(),
    //         EvolveUnit_ID: Evolve.Joi.array().required(),
    //         EvolveRole_ID: Evolve.Joi.array().required(),
    //         EvolveUser_IsActive: Evolve.Joi.boolean().required(),
    //         EvolveUser_ID: Evolve.Joi.number().required(),
    //         EvolveUser_PrintAllow: Evolve.Joi.boolean().required(),
    //         EvolveUser_CreatePoAllow: Evolve.Joi.boolean().required(),

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
    // },


    selectSingleUnitAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUnit_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error.toString());
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

    updateUnitAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUnit_ID: Evolve.Joi.number().required(),
            EvolveUnit_Description: Evolve.Joi.string().required(),
            EvolveUnit_Location: Evolve.Joi.string().required(),
            EvolveUnit_LogoImage: Evolve.Joi.string().required(),
            EvolveUnit_IsActive: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error.toString());
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

    // getMenusByAppIdAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveMenu_AppId: Evolve.Joi.number().required(),
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
    // },



    // selectSingleRoleAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveRole_ID: Evolve.Joi.number().required(),
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
    // },

    // updateRoleAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveRole_ID: Evolve.Joi.number().required(),
    //         EvolveRole_Name: Evolve.Joi.string().required(),
    //         EvolveRole_Description: Evolve.Joi.string().required(),
    //         EvolveRole_IsActive: Evolve.Joi.boolean().required(),
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
    // },

    // selectSingleMenuAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveMenu_ID: Evolve.Joi.number().required(),
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
    // },

    // updateMenuAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveMenu_Id: Evolve.Joi.number().required(),
    //         EvolveMenu_AppId: Evolve.Joi.number().required().allow(''),
    //         EvolveMenu_Parent: Evolve.Joi.string().required(),
    //         EvolveMenu_Name: Evolve.Joi.string().required(),
    //         EvolveMenu_Desc: Evolve.Joi.string().required(),
    //         EvolveMenu_Url: Evolve.Joi.string().required(),
    //         EvolveMenu_IsActive: Evolve.Joi.boolean().required(),
    //         EvolveMenu_Icon: Evolve.Joi.string().required(),
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
    // },
    // process To machine Darshan
    // createProcessToMachineAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveMachine_id: Evolve.Joi.array().required(),
    //         EvolveProcess_id: Evolve.Joi.number().required(),

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
    // },
    // section Darshan
    // addsection: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveSection_Name: Evolve.Joi.string().required(),
    //         EvolveSection_Desc: Evolve.Joi.string().required(),

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
    // },
    // updateSection: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveSection_ID: Evolve.Joi.number().required(),
    //         EvolveSection_Name: Evolve.Joi.string().required(),
    //         EvolveSection_Desc: Evolve.Joi.string().required(),

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
    // },
    // addserialnumber: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveSerial_SeqID: Evolve.Joi.string().required(),
    //         EvolveSerial_Desc: Evolve.Joi.string().required(),
    //         EvolveSerial_Active: Evolve.Joi.number().required(),
    //         EvolveSerial_Prefix: Evolve.Joi.string().required(),
    //         EvolveSerial_Start: Evolve.Joi.number().required(),
    //         EvolveSerial_Next: Evolve.Joi.number().required(),
    //         EvolveSerial_WoLimit: Evolve.Joi.number().required(),
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
    // },

    // updateserialnumber: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveSerial_ID: Evolve.Joi.number().required(),
    //         EvolveSerial_SeqID: Evolve.Joi.string().required(),
    //         EvolveSerial_Desc: Evolve.Joi.string().required(),
    //         EvolveSerial_Active: Evolve.Joi.number().required(),
    //         EvolveSerial_Prefix: Evolve.Joi.string().required(),
    //         EvolveSerial_Start: Evolve.Joi.number().required(),
    //         EvolveSerial_Next: Evolve.Joi.number().required(),
    //         EvolveSerial_WoLimit: Evolve.Joi.number().required(),
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
    // },
    // updateProcessValAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveProcessVal_ID: Evolve.Joi.number().required(),
    //         EvolveProcess_ID: Evolve.Joi.number().required(),
    //         EvolveProcessVal_Seq: Evolve.Joi.number().required(),
    //         EvolveProcessVal_Desc: Evolve.Joi.string().required(),
    //         EvolveProcessVal_Type: Evolve.Joi.string().required(),
    //         EvolveProcessVal_Compare_Type: Evolve.Joi.string().required().allow('').allow(null),
    //         EvolveProcessVal_Compare_Value: Evolve.Joi.number().required().allow('').allow(null),
    //         EvolveProcessVal_required: Evolve.Joi.number().required(),
    //         EvolveProcessVal_auto: Evolve.Joi.number().required(),
    //         EvolveProcessVal_Value: Evolve.Joi.string().required().allow(''),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // addProcessValAuth: async function (req, res, next) {
    //     console.log("add process validation running");


    //     const rulesSchema = Evolve.Joi.object({
    //         // EvolveProcessVal_ID : Evolve.Joi.number().required(),
    //         selected_process: Evolve.Joi.number().required(),
    //         validation_sequence_number: Evolve.Joi.number().required(),
    //         validation_description: Evolve.Joi.string().required(),
    //         selected_validation_type: Evolve.Joi.string().required(),
    //         process_default_value: Evolve.Joi.string().required().allow(''),
    //         selected_process_validation_type: Evolve.Joi.string().required().allow(''),
    //         process_validation_value: Evolve.Joi.number().required().allow(''),
    //         is_required: Evolve.Joi.number().required(),
    //         is_auto: Evolve.Joi.number().required(),

    //         // req.body.EvolveUser_ID  :     Evolve.Joi.number().required(),    
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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

    //

    addMachineToUserAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveUser_ID: Evolve.Joi.number().required(),
            EvolveMachine_ID: Evolve.Joi.number().required(),
            EvolveMachineToUser_DefaultMenu: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    // updateMachineToUserAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({

    //         EvolveMachineToUser_ID: Evolve.Joi.number().required(),
    //         EvolveUser_ID: Evolve.Joi.number().required(),
    //         EvolveMachine_ID: Evolve.Joi.number().required(),
    //         EvolveMachineToUser_DefaultMenu: Evolve.Joi.number().required(),


    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    getUnitConfigListAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            startFrom: Evolve.Joi.number().required(),
            displayRecord: Evolve.Joi.number().required(),
            search: Evolve.Joi.required().allow('')
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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

    addUnitConfigurationAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveUnitConfig_Key: Evolve.Joi.string().required(),
            EvolveUnitConfig_Value: Evolve.Joi.string().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    updateUnitConfigurationAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveUnitConfig_Key: Evolve.Joi.string().required(),
            EvolveUnitConfig_Value: Evolve.Joi.string().required(),
            EvolveUnitConfig_ID: Evolve.Joi.number().required()


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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

    addMachineMasterAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveMachine_Name: Evolve.Joi.string().required(),
            EvolveMachine_Desc: Evolve.Joi.string().required(),
            EvolveMachine_Capacity: Evolve.Joi.string().required(),
            EvolveSection_ID: Evolve.Joi.number().required(),
            EvolveMachine_Supplier: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Address: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Contact: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Email: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Status: Evolve.Joi.number().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    updateMachineMasterAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveMachine_ID: Evolve.Joi.number().required(),
            EvolveMachine_Name: Evolve.Joi.string().required(),
            EvolveMachine_Desc: Evolve.Joi.string().required(),
            EvolveMachine_Capacity: Evolve.Joi.string().required(),
            EvolveSection_ID: Evolve.Joi.number().required(),
            EvolveMachine_Supplier: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Address: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Contact: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Email: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Status: Evolve.Joi.number().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    //new
    // deleteUser: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.number().required()
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // deleteRole: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.number().required()
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // deleteMenu: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.number().required()
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // deleteItem: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.number().required()
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // getSingleItemData: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveItem_ID: Evolve.Joi.number().required()
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // createItem: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveItem_Code: Evolve.Joi.string().required(),
    //         EvolveItem_Desc: Evolve.Joi.string().required(),
    //         EvolveProcessTemp_Id: Evolve.Joi.number().required(),
    //         EvolveItem_BrakeNum: Evolve.Joi.string().required().allow(''),
    //         EvolveItem_BrakeApprovalNum: Evolve.Joi.string().required().allow(''),
    //         EvolveItem_Type: Evolve.Joi.string().required(),
    //         EvolveItem_CustomizeNum: Evolve.Joi.string().required().allow(''),
    //         EvolveItem_CustPart: Evolve.Joi.string().required(),
    //         EvolveItem_load_capacity: Evolve.Joi.number().required().allow(''),
    //         EvolveItem_CycleTime: Evolve.Joi.number().required(),
    //         EvolveSerial_ID: Evolve.Joi.number().required(),
    //         EvolveItemGroup_ID: Evolve.Joi.number().required(),
    //         EvolvePDITemplate_ID: Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // selectSingleSection: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.number().required()
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // deleteSection: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.number().required()
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // selectSingleserialnumber: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.number().required()
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // deleteserialnumber: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.number().required()
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // addProcess: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         processName: Evolve.Joi.string().required(),
    //         processDescription: Evolve.Joi.string().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // selectSingleProcess: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveProcess_ID: Evolve.Joi.number().required()
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // updateProcess: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveProcess_ID: Evolve.Joi.number().required(),
    //         EvolveProcess_Name: Evolve.Joi.string().required(),
    //         EvolveProcess_Description: Evolve.Joi.string().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // addprocesstemplate: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveprocessTemp_Name: Evolve.Joi.string().required(),
    //         EvolveprocessTemp_Desc: Evolve.Joi.string().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // selectSingleprocesstempalte: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.number().required()
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // updateprocesstempalte: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveprocessTemp_ID: Evolve.Joi.number().required(),
    //         EvolveprocessTemp_Name: Evolve.Joi.string().required(),
    //         EvolveprocessTemp_Desc: Evolve.Joi.string().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // checksequenceprocessname: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveProcess_ID: Evolve.Joi.number().required(),
    //         EvolveProcessTemp_ID: Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // selectprocesssequenceON: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // addprocesssequence: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveProcessTemp_ID: Evolve.Joi.number().required(),
    //         EvolveProcess_ID: Evolve.Joi.number().required(),
    //         EvolveProcessTemp_Seq: Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // selectprocessteplatesequence: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveProcessTemp_ID: Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // selectprocessvalidations: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveProcess_ID: Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // selectSingleProcessVal: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveProcessVal_ID: Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // selectSingleMachineToUser: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveMachineToUser_ID: Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // addpartbommaster: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolvePartBom_ParentItem_ID: Evolve.Joi.number().required(),
    //         EvolvePartBom_CompItem_ID: Evolve.Joi.number().required(),
    //         EvolvePartBom_QtyPer: Evolve.Joi.number().required(),
    //         EvolvePartBom_DispSeq: Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    getpartbom_dispseq: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    // selectSinglePartBomMaster: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // updatepartbommaster: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolvePartBom_ID: Evolve.Joi.number().required(),
    //         EvolvePartBom_ParentItem_ID: Evolve.Joi.number().required(),
    //         EvolvePartBom_CompItem_ID: Evolve.Joi.number().required(),
    //         EvolvePartBom_QtyPer: Evolve.Joi.number().required(),
    //         EvolvePartBom_DispSeq: Evolve.Joi.number().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // addshift: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveShift_Name: Evolve.Joi.string().required(),
    //         EvolveShift_Start: Evolve.Joi.string().required(),
    //         EvolveShift_End: Evolve.Joi.string().required(),
    //         EvolveShift_Desc: Evolve.Joi.string().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // selectSingleshift: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         id: Evolve.Joi.string().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    // updateshift: async function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveShift_ID: Evolve.Joi.number().required(),
    //         EvolveShift_Name: Evolve.Joi.string().required(),
    //         EvolveShift_Start: Evolve.Joi.string().required(),
    //         EvolveShift_End: Evolve.Joi.string().required(),
    //     });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error("  "+validateEvolveData.error);
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
    selectSingleMaster: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachine_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    addSubItemList: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSubItem_ActualItemID: Evolve.Joi.number().required(),
            EvolveSubItem_SubItem_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    selectSingleSubItem: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    updateSubItem: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSubItem_ID: Evolve.Joi.number().required(),
            EvolveSubItem_ActualItemID: Evolve.Joi.number().required(),
            EvolveSubItem_SubItem_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    addPDITemp: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePDITemplate_ID: Evolve.Joi.number().required(),
            EvolvePDITemplateDetail_Label: Evolve.Joi.string().required(),
            EvolvePDITemplateDetail_Type: Evolve.Joi.string().required(),
            EvolvePDITemplateDetail_Value: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    updatePDITempDetail: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePDITemplateDetail_ID: Evolve.Joi.number().required(),
            EvolvePDITemplate_ID: Evolve.Joi.number().required(),
            EvolvePDITemplateDetail_Label: Evolve.Joi.string().required(),
            EvolvePDITemplateDetail_Type: Evolve.Joi.string().required(),
            EvolvePDITemplateDetail_Value: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    addPDITempCode: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePDITemplate_Code: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
    selectSinglePDITemp: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePDITemplateDetail_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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

    getIoReportData: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            startDate: Evolve.Joi.required().allow(''),
            endDate: Evolve.Joi.required().allow(''),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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


    getSingleIoCodeData: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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

    changeIoCodeStatus: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  " + validateEvolveData.error);
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
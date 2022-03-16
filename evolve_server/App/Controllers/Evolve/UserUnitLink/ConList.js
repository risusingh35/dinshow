'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getUserUnitList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            
            let settingList = [{
                label  : 'User Name',
                value : 'EvolveUser_Name',
                isShow : true
            } ,
            {
                label  : 'User Login',
                value : 'EvolveUser_login',
                isShow : true

            },
            {
                label  : 'User Email',
                value : 'EvolveUser_EmailID',
                isShow : true

            },
            {
                label  : 'Unit Code',
                value : 'EvolveUnit_Code',
                isShow : true

            },
            {
                label  : 'Unit Name',
                value : 'EvolveUnit_Name',
                isShow : true

            },
            {
                label  : 'Unit Description',
                value : 'EvolveUnit_Description',
                isShow : true

            },
            {
                label  : 'Role Name',
                value : 'EvolveRole_Name',
                isShow : true

            },       {
                label  : 'Role Description',
                value : 'EvolveRole_Description',
                isShow : true

            },
            {
                label  : 'Status',
                value : 'EvolveUserUnitLink_IsActive',
                isShow : true

            },
            {
                label  : 'Options',
                value : 'EvolveUserUnitLink_IsActive',
                isShow : true

            },
            ]

            let condition = '';
            if(req.body.EvolveUnit_ID != '' && req.body.EvolveUnit_ID != null){

                condition += ' AND euserunit.EvolveUnit_ID ='+req.body.EvolveUnit_ID +" ";

            }

            if(req.body.EvolveUser_ID != '' && req.body.EvolveUser_ID != null){
                condition += ' AND euserunit.EvolveUser_ID ='+req.body.EvolveUser_ID+" " ;

            }

            if(req.body.EvolveRole_ID != '' && req.body.EvolveRole_ID != null){
                condition += ' AND euserunit.EvolveRole_ID ='+req.body.EvolveRole_ID+" " ;

            }

            let count = await Evolve.App.Services.Evolve.UserUnitLink.SrvList.getUserUnitListCount(search,condition);

            let result = await Evolve.App.Services.Evolve.UserUnitLink.SrvList.getUserUnitList(start, length, search,condition);

            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get user unit link ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get user unit link!",
                    result: result.message
                };
                res.send(obj);
            } else {
                console.log("count :::::::;", count.recordset[0].count);
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: result.recordset ,
                    settingList : settingList 
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get user unit link " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get user unit link " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getRoleList: async function (req, res) {
        try {

            let result = await Evolve.App.Services.Evolve.UserUnitLink.SrvList.getRoleList();
            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get role list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get role list!",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get role list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get role list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },




    getUserList: async function (req, res) {
        try {
            let data = {
                search: req.body.term,
            }
            let result = await Evolve.App.Services.Evolve.UserUnitLink.SrvList.getUserList(data)
            
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get user  list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get user  list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
                res.send(obj);
            }
            // }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get user  list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get user  list " + error.message, result: null };
            res.send(obj);
        }
    },
    getUnitList: async function (req, res) {
        try {
            let data = {
                search: req.body.term,
            }
            console.log("data>>>"    ,data)
            let result = await Evolve.App.Services.Evolve.UserUnitLink.SrvList.getUnitList(data)
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get user  list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get user  list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
                res.send(obj);
            }
            // }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get user  list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get user  list " + error.message, result: null };
            res.send(obj);
        }
    },

    // getRoleList: async function (req, res) {
    //     try {
    //         let data = {
    //             search: req.body.term,
    //         }
    //         let result = await Evolve.App.Services.Evolve.UserUnitLink.SrvList.getRoleList(data)
        

    //         if (result instanceof Error) {
    //             Evolve.Log.error("EERR#### : Error while get role  list")
    //             let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get role  list", result: null };
    //             res.send(obj);
    //         } else {
    //             let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
    //             res.send(obj);
    //         }
    //         // }

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####: Error while get role  list " + error.message);
    //         let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get role  list " + error.message, result: null };
    //         res.send(obj);
    //     }
    // },


    
    addUserUnitLink: async function (req, res) {
        try {
            req.body.condition = '';
            let errorMessage = '';
            let deleteLink = await Evolve.App.Services.Evolve.UserUnitLink.SrvList.deleteCurrentLink(req.body);
            if (deleteLink instanceof Error) {
                errorMessage = 'Error while delete User To Unit Link'
            }else {

                for(let i=0 ; i<req.body.roleList.length ; i++){

                    if(req.body.roleList[i].isSelected == true){

                    req.body.roleList[i].EvolveUser_ID = req.body.EvolveUser_ID ;
                    req.body.roleList[i].EvolveUnit_ID = req.body.EvolveUnit_ID ;

                let addNewApp = await Evolve.App.Services.Evolve.UserUnitLink.SrvList.adNEwUserUnitLink(req.body.roleList[i]);
                if (addNewApp instanceof Error || addNewApp.rowsAffected < 1) {

                    errorMessage = " Error While Create User To Unit Link"

                }
            }

            }
        }

            let obj = {
                statusCode: errorMessage == '' ? 200 : 400,
                status: errorMessage == '' ? "success" : "fail",
                message: errorMessage == '' ? "User To Unit Linked Created Successfully " : errorMessage,
                result: null
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while create User To Unit Link  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while create User To Unit Link  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    activeDeactiveLink: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            // req.body.condition = ' AND EvolveMenuType_ID  != ' + req.body.EvolveMenuType_ID;

            let errorMessage = '';

            let updateStatus = await Evolve.App.Services.Evolve.UserUnitLink.SrvList.activeDeactiveLink(req.body);

            if (updateStatus instanceof Error || updateStatus.rowsAffected  < 1 ) {
                errorMessage = 'Error while check existing menu type'
            }
            let obj = {
                statusCode: errorMessage == '' ? 200 : 400,
                status: errorMessage == '' ? "success" : "fail",
                message: errorMessage == '' ? "User Unit-Role Link Updated Successfully " : errorMessage,
                result: null
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update User Unit link  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Update User Unit link  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getAssignedRoleList: async function (req, res) {
        try {

            let assignedRole = await Evolve.App.Services.Evolve.UserUnitLink.SrvList.getAssignedRoleList(req.body);
            if (assignedRole instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get Assigned Role List  ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get Assigned Role List !",
                    result: assignedRole.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: assignedRole.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Assigned Role List  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Assigned Role List  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },







}
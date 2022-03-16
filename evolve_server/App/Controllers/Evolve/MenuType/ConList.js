'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getAllMenuTypeList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let Count = await Evolve.App.Services.Evolve.MenuType.SrvList.getAllMenuTypeListCount(search);
            let List = await Evolve.App.Services.Evolve.MenuType.SrvList.getAllMenuTypeList(start, length, search);

            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Menu Type List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: List.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Menu Type List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get menu type list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get menu type list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleMenuTypeDetails: async function (req, res) {
        try {

            let details = await Evolve.App.Services.Evolve.MenuType.SrvList.getSingleMenuTypeDetails(req.body);
            if (details instanceof Error || details.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get single menu type details !",
                    result: details.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Menu Type Details",
                    result: details.recordset[0]
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while menu type details" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while menu type details" + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    createMenuType: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.condition = '';

            let errorMessage = '';
            // let condition = '' ;


            let checkType = await Evolve.App.Services.Evolve.MenuType.SrvList.checkExistingMenuType(req.body);
            if (checkType instanceof Error) {
                errorMessage = 'Error while check existing menu type'
            } else if (checkType.rowsAffected > 0) {


                errorMessage = 'Menu Type Already Exist !'


            } else {


                let addNewApp = await Evolve.App.Services.Evolve.MenuType.SrvList.createMenuType(req.body);
                if (addNewApp instanceof Error || addNewApp.rowsAffected < 1) {

                    errorMessage = " Error While Create Menu Type"

                }

                let obj = {
                    statusCode: errorMessage == '' ? 200 : 400,
                    status: errorMessage == '' ? "success" : "fail",
                    message: errorMessage == '' ? "Menu Type Created Successfully " : errorMessage,
                    result: null
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while create new menu type  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while create new menu type  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    upateMenuType: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.condition = ' AND EvolveMenuType_ID  != ' + req.body.EvolveMenuType_ID;

            let errorMessage = '';
            // let condition = '' ;

            let checkType = await Evolve.App.Services.Evolve.MenuType.SrvList.checkExistingMenuType(req.body);
            console.log("checkType/??", checkType)
            if (checkType instanceof Error) {
                errorMessage = 'Error while check existing menu type'
            } else if (checkType.rowsAffected > 0) {


                errorMessage = 'Menu Type Already Exist !'


            } else {


                let addNewApp = await Evolve.App.Services.Evolve.MenuType.SrvList.upateMenuType(req.body);
                if (addNewApp instanceof Error || addNewApp.rowsAffected < 1) {

                    errorMessage = " Error While Update Menu Type"

                }



            }
            let obj = {
                statusCode: errorMessage == '' ? 200 : 400,
                status: errorMessage == '' ? "success" : "fail",
                message: errorMessage == '' ? "Menu Type Updated Successfully " : errorMessage,
                result: null
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update new menu type  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Update new menu type  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getMdiIconList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.MenuType.SrvList.getMdiIconList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Icon List !",
                    result: null
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
            Evolve.Log.error(" EERR#### Error while get Icon List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### Error while get Icon List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteMenuType: async function (req, res) {
        try {
            let  errorMessage = '';
            let count = await Evolve.App.Services.Evolve.MenuType.SrvList.checkMenuLinkedToType(req.body);
            if (count instanceof Error) {

                errorMessage = 'Error While Check  Menu Linked To Type'

            } else if (count.rowsAffected > 0) {

                errorMessage = 'Menus Linked With this Menu Type'


            } else {
                let result = await Evolve.App.Services.Evolve.MenuType.SrvList.deleteMenuType(req.body);

                if (result instanceof Error || result.rowsAffected < 1) {

                    errorMessage = 'Error While Delete Menu Type List !'
                }

                let obj = {
                    statusCode: errorMessage == '' ? 200 : 400,
                    status: errorMessage == '' ? "success" : "fail",
                    message: errorMessage == '' ? "Menu Type Deleted Successfully " : errorMessage,
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete menu type " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while delete menu type " + error.message,
                result: null
            };
            res.send(obj);
        }
    },




}
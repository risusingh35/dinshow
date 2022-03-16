'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    getGroupList: async function(req, res) {
        try {

            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let error = false;
            let errorMessage = "";

            let getGroupListListCount = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceItemGroupList.getGroupListListCount(search);
            let getGroupList = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceItemGroupList.getGroupList(start, length, search);

            if (getGroupList instanceof Error) {
                error = true;
                errorMessage = "Error on get Group list !" + getGroupList.message;

            } else {

                for (let i = 0; i < getGroupList.recordset.length; i++) {

                    let getGroupItemList = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceItemGroupList.getGroupItemList(getGroupList.recordset[i])
                    if (getGroupItemList instanceof Error) {
                        error = true;
                        errorMessage = "Error on get Group Item list !" + getGroupItemList.message;
                    } else {

                        getGroupList.recordset[i].ItemList = getGroupItemList.recordset;
                    }
                }
                if (error == false) {

                    let resObj = {
                        noOfRecord: getGroupListListCount.recordset[0].count,
                        records: getGroupList.recordset
                    }
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Group List",
                        result: resObj
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: errorMessage,
                        result: null
                    };
                    res.send(obj);
                }
            }


        } catch (error) {
            Evolve.Log.error(" EERR32519: Error while getting Group list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32519: Error while getting Group list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getGroupItemList: async function(req, res) {
        try {

            let getGroupItemList = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceItemGroupList.itemList();

            if (getGroupItemList instanceof Error) {
                console.log(getGroupItemList.message);
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Getting Item List",
                    result: null
                };
                res.send(obj);

            } else {
                console.log("the records is ", getGroupItemList.recordset);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Group List",
                    result: getGroupItemList.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32519: Error while getting Item list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32519: Error while getting Item list " + error.message,
                result: null
            };
            res.send(obj);

        }
    },

    createGroup: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            let errorMessage = "";

            let createGroup = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceItemGroupList.createGroup(req.body);

            if (createGroup instanceof Error) {
                errorMessage = createGroup.message;
                error = true;


            } else {
                let EvolveLicenceItemGroup_ID = createGroup.recordset[0].inserted_id
                console.log("EvolveLicenceItemGroup_ID", EvolveLicenceItemGroup_ID);
                if (req.body.EvolveItemGroupList.length > 0) {
                    for (let i = 0; i < req.body.EvolveItemGroupList.length; i++) {

                        let updateItem = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceItemGroupList.updateItem(req.body.EvolveItemGroupList[i], EvolveLicenceItemGroup_ID);
                        if (updateItem instanceof Error) {
                            errorMessage = createGroup.message;
                            error = true;
                        }
                    }
                }


            }
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Licence Item Group Add Successfully",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Add Licence Item Group" + errorMessage,
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32519: Error while Adding Licence Item Group " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32519: Error while Adding Licence Item Group " + error.message,
                result: null
            };
            res.send(obj);

        }
    },

    selectSingleLicenceItemGroup: async function(req, res) {
        try {

            let selectSingleLicenceItemGroup = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceItemGroupList.selectSingleLicenceItemGroup(req.body);

            if (selectSingleLicenceItemGroup instanceof Error) {
                console.log(selectSingleLicenceItemGroup.message);
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Getting Single Licence Item Group",
                    result: null
                };
                res.send(obj);

            } else {
                console.log("the records is ", selectSingleLicenceItemGroup.recordset);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Group List",
                    result: selectSingleLicenceItemGroup.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32519: Error while getting Single Licence Item Group " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32519: Error while getting Single Licence Item Group " + error.message,
                result: null
            };
            res.send(obj);

        }
    },

    updateLicenceItemGroup: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            let errorMessage = "";

            let updateLicenceItemGroup = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceItemGroupList.updateLicenceItemGroup(req.body);

            if (updateLicenceItemGroup instanceof Error) {
                errorMessage = updateLicenceItemGroup.message;
                error = true;


            } else {
                let removeOldItemGroupIdInItem = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceItemGroupList.removeOldItemGroupIdInItem(req.body.EvolveLicenceItemGroup_ID)
                if (removeOldItemGroupIdInItem instanceof Error) {
                    errorMessage = removeOldItemGroupIdInItem.message;
                    error = true;
                } else {
                    let EvolveLicenceItemGroup_ID = req.body.EvolveLicenceItemGroup_ID
                    console.log("EvolveLicenceItemGroup_ID", EvolveLicenceItemGroup_ID);
                    if (req.body.EvolveItemGroupList != []) {
                        for (let i = 0; i < req.body.EvolveItemGroupList.length; i++) {

                            let updateItem = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceItemGroupList.updateItem(req.body.EvolveItemGroupList[i], EvolveLicenceItemGroup_ID);
                            if (updateItem instanceof Error) {
                                errorMessage = updateLicenceItemGroup.message;
                                error = true;
                            }
                        }
                    }

                }


            }
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Licence Item Group Update Succesfully",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Licence Item Group" + errorMessage,
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32519: Error while update Licence Item Group  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32519: Error while update Licence Item Group  " + error.message,
                result: null
            };
            res.send(obj);

        }
    },
}
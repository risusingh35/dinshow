'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getLicenceItemGroupList: async function(req, res) {
        try {
            console.log(">>>>>>>>>>>>>>>>>>.");
            let List = await Evolve.App.Services.eMdm.AdvanceLicenseModule.AddLicence.getLicenceItemGroupList();
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Licence Item Group !",
                    result: List.message
                };
                res.send(obj);
            } else {
                console.log("List.recordset>>>>>>>>>>>>", List.recordset);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Licence Item Group",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Licence Item Group " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Licence Item Group " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    creactLicence: async function(req, res) {
        try {
            console.log(">>>>>>>>>>>>>>>>>>.", req.body);
            let error = false;
            let errmsg = ''
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let addLicence = await Evolve.App.Services.eMdm.AdvanceLicenseModule.AddLicence.creactLicence(req.body);
            if (addLicence instanceof Error) {
                errmsg = "Error While add Licence !"
                error = true
            } else {
                let licenceId = addLicence.recordset[0].inserted_id
                let licenceDetail = req.body.LicenceDetail
                if (licenceDetail.length > 0) {
                    for (let i = 0; i < licenceDetail.length; i++) {
                        let addLicenceDetail = await Evolve.App.Services.eMdm.AdvanceLicenseModule.AddLicence.addLicenceDetail(licenceDetail[i], licenceId);
                        if (addLicenceDetail instanceof Error) {
                            errmsg = "Error While add Licence Detail !"
                            error = true
                            break
                        }
                    }
                }


                if (error == false) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: " Licence AND Licence Detail add successfully",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: errmsg,
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add Licence " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add Licence " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    selectSingleLicenceAndLicenceDetaliData: async function(req, res) {
        try {
            console.log(">>>>>>>>>>>>>>>>>>.", req.body);
            let List = await Evolve.App.Services.eMdm.AdvanceLicenseModule.AddLicence.selectSingleLicenceAndLicenceDetaliData(req.body.EvolveLicence_ID);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Customer List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                console.log("List.recordset>>>>>>>>>>>>", List.recordset);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Customer List",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Customer list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Customer list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateLicence: async function(req, res) {
        try {
            console.log("update>>>>>>>>>>>>>>>>>>.", req.body);
            let error = false;
            let errmsg = ''
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let addLicence = await Evolve.App.Services.eMdm.AdvanceLicenseModule.AddLicence.updateLicence(req.body);
            if (addLicence instanceof Error) {
                errmsg = "Error While Update Licence !"
                error = true
            } else {
                for (let i = 0; i < req.body.updateLicenceDetail.length; i++) {
                    if (req.body.updateLicenceDetail[i].isDelete != undefined && req.body.updateLicenceDetail[i].isDelete == true) {
                        console.log(">>>>>>>>delete");
                        let deleteLicenceDetali = await Evolve.App.Services.eMdm.AdvanceLicenseModule.AddLicence.deleteOldLicenceDetali(req.body.updateLicenceDetail[i].licenceItemGroupId, req.body.EvolveLicence_ID);
                        if (deleteLicenceDetali instanceof Error) {
                            errmsg = "Error While Delete Old Licence Detali !"
                            error = true
                        }
                    }
                }
                let licenceId = req.body.EvolveLicence_ID
                let licenceDetail = req.body.LicenceDetail
                if (licenceDetail.length > 0) {
                    for (let i = 0; i < licenceDetail.length; i++) {
                        console.log("check>>>...");
                        let checkLicenceDetail = await Evolve.App.Services.eMdm.AdvanceLicenseModule.AddLicence.checkLicenceDetail(licenceDetail[i].licenceItemGroupId, licenceId)
                        console.log("checkLicenceDetail>>>>>>>...", checkLicenceDetail);
                        if (checkLicenceDetail instanceof Error) {
                            errmsg = "Error While check Licence Detail !"
                            error = true
                        } else if (checkLicenceDetail.rowsAffected < 1) {
                            console.log("add>>>>>>");
                            let addLicenceDetail = await Evolve.App.Services.eMdm.AdvanceLicenseModule.AddLicence.addLicenceDetail(licenceDetail[i], licenceId);
                            if (addLicenceDetail instanceof Error) {
                                errmsg = "Error While add Licence Detail !"
                                error = true
                            }
                        } else {
                            console.log("update>>>>>>>>.");
                            let updateLicenceDetail = await Evolve.App.Services.eMdm.AdvanceLicenseModule.AddLicence.updateLicenceDetail(licenceDetail[i], licenceId);
                            if (updateLicenceDetail instanceof Error) {
                                errmsg = "Error While Update Licence Detail !"
                                error = true
                            }
                        }
                    }
                }
            }



            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Licence AND Licence Detail Update successfully",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errmsg,
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update Licence " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Update Licence " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
}
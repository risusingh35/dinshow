'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getBilOfEntrryDetailList: async function(req, res) {
        try {
            console.log("req>>>>>>>>>", req.body);
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let condition = ""
            if (req.body.EvolveLicence_ID != "" && req.body.EvolveLicence_ID != null && req.body.EvolveLicence_ID != undefined) {
                condition += " ebod.EvolveLicence_ID = " + req.body.EvolveLicence_ID + " AND "
            }
            if (req.body.EvolveLicenceItemGroup_ID != "" && req.body.EvolveLicenceItemGroup_ID != null && req.body.EvolveLicenceItemGroup_ID != undefined) {
                condition += " ebod.EvolveLicenceItemGroup_ID = " + req.body.EvolveLicenceItemGroup_ID + " AND "
            }

            let Count = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.getBilOfEntrryDetailListCount(search, condition);
            let List = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.getBilOfEntrryDetailList(start, length, search, condition);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Bill OF Entry List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: List.recordset
                }
                console.log(">>>>>>>>>>>>>>>>>>>>>.....", resObj);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Bill OF Entry List ",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Bill OF Entry List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Key Value list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getlicencelNumber: async function(req, res) {
        try {
            let List = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.getlicencelNumber();
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get licence Number List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "licence List",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get licence Number list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get licence Number list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getLicenceItemDetailCode: async function(req, res) {
        try {
            let List = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.getLicenceItemDetailCode();
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get licence Item Group Code !",
                    result: null
                };
                res.send(obj);
            } else {
                console.log("List.recordset>>>>>>>>>>>.", List.recordset);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "licence Item Group Code ",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get licence Item Group Code " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get licence Item Group Code " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    selectSingleBillOfentry: async function(req, res) {
        try {
            console.log(">>>>>>>>>>>>>>>>>>.", req.body);
            let List = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.selectSingleBillOfentry(req.body.EvolveBillOfEntryDetail_ID);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Customer List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                // console.log("List.recordset>>>>>>>>>>>>", List.recordset);
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

    getLicenceItemDetailCodeByLicenceNumber: async function(req, res) {
        try {
            let List = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.getLicenceItemDetailCodeByLicenceNumber(req.body.EvolveLicence_ID);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get licence Item Group Code By Licence Number !",
                    result: null
                };
                res.send(obj);
            } else {
                console.log("List.recordset>>>>>>>>>>>.", List.recordset);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "licence Item Group Code By Licence Number ",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get licence Item Group Code By Licence Number " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get licence Item Group Code By Licence Number " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


    creactBillOfEntry: async function(req, res) {
        try {
            console.log("req.bod>>>>>>>>>>", req.body);
            let error = false
            let errmsg = ''
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let getLicenceDetail = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.getLicenceDetail(req.body)
            if (getLicenceDetail instanceof Error) {
                error = true
                errmsg = "Error While get Licence Detail !!"
            } else if (getLicenceDetail.rowAffected < 1) {
                error = true
                errmsg = "Licence Detail Data Not Found !!"
            } else {
                let data = req.body
                console.log("getLicenceDetail.recordset>>>>>>.", getLicenceDetail.recordset);
                if (new Date(getLicenceDetail.recordset[0].EvolveLicence_ExpiryDate) >= new Date(data.EvolveBillOfEntryDetail_Date)) {
                    let licenceDetailRemaingvalueInINR = parseFloat(getLicenceDetail.recordset[0].EvolveLicenceDetail_ValueInINR) - parseFloat(getLicenceDetail.recordset[0].EvolveLicenceDetail_RemaingValueInINR)

                    let licenceDetailRemaingvalueInForeign = parseFloat(getLicenceDetail.recordset[0].EvolveLicenceDetail_ValueInForeign) - parseFloat(getLicenceDetail.recordset[0].EvolveLicenceDetail_RemaingValueInForeign)



                    if (data.EvolveBillOfEntryDetail_ValueInINR <= licenceDetailRemaingvalueInINR && data.EvolveBillOfEntryDetail_ValueInForeign <= licenceDetailRemaingvalueInForeign) {
                        let updateLicenceDetailValue = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.updateLicenceDetailValue(data)
                        if (updateLicenceDetailValue instanceof Error) {
                            error = true
                            errmsg = "Error While Update Licence Detail Remaing Value !!"
                        } else {
                            let updateLicenceValue = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.updateLicenceValue(data)
                            if (updateLicenceValue instanceof Error) {
                                error = true
                                errmsg = "Error While Update Licence Remaing Value !!"
                            } else {
                                let addBillOfEntry = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.addBillOfEntry(data)
                                if (addBillOfEntry instanceof Error) {
                                    error = true
                                    errmsg = "Error While Add BillOfEntry Detail !!"
                                }
                            }
                        }
                    } else {
                        error = true
                        errmsg = " Please Enter lasethan OR Equal to Licence Detail remaing Value "
                    }

                } else {
                    error = true
                    errmsg = " Licence is Expired !! "
                }




            }
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Bill Entry Add Successfully ",
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
            Evolve.Log.error(" EERR####: Error while get licence Item Group Code By Licence Number " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get licence Item Group Code By Licence Number " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateBillOfEntry: async function(req, res) {
        try {
            console.log("req.bod>>>>>>>>>>", req.body);
            let error = false
            let errmsg = ''
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let getLicenceDetail = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.getLicenceAndItemGroupDetail(req.body)
            if (getLicenceDetail instanceof Error) {
                error = true
                errmsg = "Error While get Licence Item Group Detail !!"
            } else if (getLicenceDetail.rowAffected < 1) {
                error = true
                errmsg = "Licence Item Group Detail Data Not Found !!"
            } else {
                let data = req.body
                console.log("getLicenceDetail.recordset>>>>>>.", getLicenceDetail.recordset);
                // let INRVal = parseFloat(req.body.EvolveBillOfEntryDetail_ValueInINR) - parseFloat(getLicenceDetail.recordset[0].EvolveBillOfEntryDetail_ValueInINR)
                // let ForeignVal = parseFloat(req.body.EvolveBillOfEntryDetail_ValueInForeign) - parseFloat(getLicenceDetail.recordset[0].EvolveBillOfEntryDetail_ValueInForeign)

                if (new Date(getLicenceDetail.recordset[0].EvolveLicence_ExpiryDate) >= new Date(data.EvolveBillOfEntryDetail_Date)) {
                    let newValueInINR = parseFloat(getLicenceDetail.recordset[0].EvolveLicenceDetail_RemaingValueInINR) - parseFloat(getLicenceDetail.recordset[0].EvolveBillOfEntryDetail_ValueInINR)

                    let newValueInForeign = parseFloat(getLicenceDetail.recordset[0].EvolveLicenceDetail_RemaingValueInForeign) - parseFloat(getLicenceDetail.recordset[0].EvolveBillOfEntryDetail_ValueInForeign)

                    console.log("newValueInINR>>>>>>.", newValueInINR);
                    console.log("newValueInForeign>>>>>>.", newValueInForeign);


                    let licenceDetailRemaingvalueInINR = parseFloat(getLicenceDetail.recordset[0].EvolveLicenceDetail_ValueInINR) - parseFloat(newValueInINR)

                    let licenceDetailRemaingvalueInForeign = parseFloat(getLicenceDetail.recordset[0].EvolveLicenceDetail_ValueInForeign) - parseFloat(newValueInForeign)

                    console.log("licenceDetailRemaingvalueInINR>>>>..", licenceDetailRemaingvalueInINR);
                    console.log("licenceDetailRemaingvalueInForeign>>>>..", licenceDetailRemaingvalueInForeign);


                    if (data.EvolveBillOfEntryDetail_ValueInINR <= licenceDetailRemaingvalueInINR && data.EvolveBillOfEntryDetail_ValueInForeign <= licenceDetailRemaingvalueInForeign) {

                        req.body.EvolveBillOfEntryDetail_ValueInINR = parseFloat(req.body.EvolveBillOfEntryDetail_ValueInINR) - parseFloat(getLicenceDetail.recordset[0].EvolveBillOfEntryDetail_ValueInINR)

                        req.body.EvolveBillOfEntryDetail_ValueInForeign = parseFloat(req.body.EvolveBillOfEntryDetail_ValueInForeign) - parseFloat(getLicenceDetail.recordset[0].EvolveBillOfEntryDetail_ValueInForeign)

                        let updateLicenceDetailValue = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.updateLicenceDetailValue(data)
                        if (updateLicenceDetailValue instanceof Error) {
                            error = true
                            errmsg = "Error While Update Licence Detail Remaing Value !!"
                        } else {
                            let updateLicenceValue = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.updateLicenceValue(data)
                            if (updateLicenceValue instanceof Error) {
                                error = true
                                errmsg = "Error While Update Licence Remaing Value !!"
                            } else {
                                let addBillOfEntry = await Evolve.App.Services.eMdm.AdvanceLicenseModule.BillOfEntryDetail.updateBillOfEntry(data)
                                if (addBillOfEntry instanceof Error) {
                                    error = true
                                    errmsg = "Error While Update BillOfEntry Detail !!"
                                }
                            }
                        }
                    } else {
                        error = true
                        errmsg = " Please Enter lasethan OR Equal to Licence Detail remaing Value "
                    }

                } else {
                    error = true
                    errmsg = " Licence is Expired !! "
                }




            }
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Bill Entry Update  Successfully ",
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
            Evolve.Log.error(" EERR####: Error while Update Bill Entry " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Update Bill Entry " + error.message,
                result: null
            };
            res.send(obj);
        }
    },




}
'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addBranch: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let addBranchData = await Evolve.App.Services.Snop.Branch.SrvBranchList.addBranch(req.body);
            if (addBranchData instanceof Error || addBranchData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add Branch ",
                    addBranchData: addBranchData.message
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Branch  Added Successfully !",
                    result: addBranchData.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0907: Error while adding branch "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0907: Error while adding branch "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    
    updateBranch: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateBranchData = await Evolve.App.Services.Snop.Branch.SrvBranchList.updateBranch(req.body);
            if (updateBranchData instanceof Error || updateBranchData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Update ranch ",
                    updateBranchData: updateBranchData.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Branch  Updated  Successfully !",
                    updateBranchData: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0908: Error while updating Branch "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0908: Error while updating Branch "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getbusinessLineList: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getBusinessLineList = await Evolve.App.Services.Snop.Branch.SrvBranchList.getbusinessLineList(req.body);
            if (getBusinessLineList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add Business Line ",
                    getBusinessLineList: getBusinessLineList.message
                };
                res.send(obj);
            }

            if (getBusinessLineList.rowsAffected < 1) {
                let obj = {
                    statusCode: 200,
                    status: "succsess",
                    result: [],
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    result: getBusinessLineList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0909: Error while getting business line list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0909: Error while getting business line list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getBranchList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getBranchListCount = await Evolve.App.Services.Snop.Branch.SrvBranchList.getBranchListCount(search);
            let getBranchList = await Evolve.App.Services.Snop.Branch.SrvBranchList.getBranchList(start , length,search);
            if (getBranchList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add Business Line ",
                    result: getBranchList.message
                };
                res.send(obj);
            }
            else {
                let resObj = {
                    noOfRecord: getBranchListCount.recordset[0].count,
                    records: getBranchList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Branch Master",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0910: Error while getting Branch List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0910: Error while getting Branch List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    selectSingleBranch: async function (req, res) {
        try {
            let record = []
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let getSingleBranchData = await Evolve.App.Services.Snop.Branch.SrvBranchList.selectSingleBranch(req.body);

            if (getSingleBranchData instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Line data ",
                    getSingleBranchData: getSingleBranchData.message
                };
                res.send(obj);
            } else {
                record.push(getSingleBranchData.recordset[0])
                let selectAssignments = await Evolve.App.Services.Snop.Branch.SrvBranchList.selectAssignMent(req.body);
                if (selectAssignments instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on get Line data ",
                    };
                    res.send(obj);
                }
                else {
                    record.push(selectAssignments.recordset)

                    let obj = {
                        statusCode: 200,
                        result: record,
                    };
                    res.send(obj)
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0911: Error while selecting single branch "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0911: Error while selecting single branch "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteSingleBranch: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let deActiveBranchData = await Evolve.App.Services.Snop.Branch.SrvBranchList.deleteSingleBranch(req.body);
            if (deActiveBranchData instanceof Error || deActiveBranchData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on delete Business Line ",
                    deActiveBranchData: deActiveBranchData.message
                };
                res.send(obj);
            } else {
                let deActiveAssignMent = await Evolve.App.Services.Snop.Branch.SrvBranchList.deActiveAssignMent(req.body);
                if (deActiveAssignMent instanceof Error || deActiveAssignMent.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on delete Business Line ",
                        result: deActiveBranchData.message
                    };
                    res.send(obj);
                }
                else {


                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Business Line  deleted Successfully !",
                        deActiveBranchData: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0912: Error while deleting Single Branch "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0912: Error while deleting Single Branch "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    assignLineToBranch: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID;


            let deleteLineToBranch = await Evolve.App.Services.Snop.Branch.SrvBranchList.deleteLineToBranch(req.body.EvolveBranch_ID);
            if (deleteLineToBranch instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete old assignmnet !",
                    result: null
                };
                res.send(obj);

            } else {

                console.log("entered in assign ment >> ");
                console.log("body data for assignment is >>  ", req.body)

                // let assignLineToBranch = await Evolve.App.Services.Snop.Branch.SrvBranchList.assignLineToBranch(req.body);
                // if (assignLineToBranch instanceof Error || assignLineToBranch.rowsAffected < 1) {
                //     let obj = {
                //         statusCode: 400,
                //         status: "fail",
                //         message: "Error on Assign Business Line Branch ",
                //         assignLineToBranch: assignLineToBranch.message
                //     };
                //     res.send(obj);
                // } else {

                //     let obj = {
                //         statusCode: 200,
                //         status: "success",
                //         message: "BusinessLine Assigned  Successfully !",
                //         result : []
                //     };
                //     res.send(obj);
                // }

                let error = false;
                for (let i = 0; i < req.body.businesslineArray.length; i++) {
                    let EvolveBusinessLine_ID = req.body.businesslineArray[i].EvolveBusinessLine_ID;
                    let assignLine = await Evolve.App.Services.Snop.Branch.SrvBranchList.assignLineToBranch(req.body.EvolveBranch_ID, req.body.EvolveUser_ID, EvolveBusinessLine_ID);
                    if (assignLine instanceof Error || assignLine.rowsAffected < 1) {
                        error = true;
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error while asign business line to branch !",
                            result: null
                        };
                        res.send(obj);
                        break;
                    }
                }
                if (error == false) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "business line  asigned successfully",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0913: Error while assigning Line To Branch "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0913: Error while assigning Line To Branch "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateBusinessLineToBranch: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID;


            let deleteLineToBranch = await Evolve.App.Services.Snop.Branch.SrvBranchList.deleteLineToBranch(req.body.EvolveBranch_ID);
            if (deleteLineToBranch instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete old assignmnet !",
                    result: null
                };
                res.send(obj);

            } else {



                // let updateBusinessLineToBranchData = await Evolve.App.Services.Snop.Branch.SrvBranchList.updateBusinessLineToBranch(req.body);
                // if (updateBusinessLineToBranchData instanceof Error ) {
                //     let obj = {
                //         statusCode: 400,
                //         status: "fail",
                //         message: "Error on Assign Business Line Branch ",

                //     };
                //     res.send(obj);
                // } else {

                //     let obj = {
                //         statusCode: 200,
                //         status: "success",
                //         message: "BusinessLine Assigned  Successfully !",
                //         result : []
                //     };
                //     res.send(obj);
                // }



                let error = false;
                for (let i = 0; i < req.body.businesslineArray.length; i++) {
                    let EvolveBusinessLine_ID = req.body.businesslineArray[i].EvolveBusinessLine_ID;
                    let assignLine = await Evolve.App.Services.Snop.Branch.SrvBranchList.updateBusinessLineToBranch(req.body.EvolveBranch_ID, req.body.EvolveUser_ID, EvolveBusinessLine_ID);
                    if (assignLine instanceof Error || assignLine.rowsAffected < 1) {
                        error = true;
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error while asign business line to branch !",
                            result: null
                        };
                        res.send(obj);
                        break;
                    }
                }
                if (error == false) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "business line  asigned successfully",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0914: Error while update Business Line To Branch "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0914: Error while update Business Line To Branch "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}
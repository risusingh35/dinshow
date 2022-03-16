'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  
    getRoleList: async function (req, res) {
        try {
            let roleList = await Evolve.App.Services.Suraksha.Approval.SrvList.getRoleList();
            if (roleList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32771 : Error while get role list !",
                    result: roleList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: roleList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32772 : Error while getting role List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32772 : Error while getting role List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getMatrixList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Suraksha.Approval.SrvList.getMatrixCount(search);

            let result = await Evolve.App.Services.Suraksha.Approval.SrvList.getMatrixList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32773 : Error While get Matrix List !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.rowsAffected,
                    records: result.recordset
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
            Evolve.Log.error("EERR32774 : Error while get matrix list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32774 : Error while get matrix list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getUserList: async function (req, res) {
        try {
            let roleList = await Evolve.App.Services.Suraksha.Approval.SrvList.getUserList(req.body);
            if (roleList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32775 : Error while get user list by role !",
                    result: roleList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: roleList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32776 : Error while getting user list by role " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32776 : Error while getting user list by role " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addMatrix: async function (req, res) {
        try {
            let error = false ;
            let errorMessege ='' ;

            
            let checkMatrixName = await Evolve.App.Services.Suraksha.Approval.SrvList.checkMatrixName(req.body);
            
            if (checkMatrixName instanceof Error) {
                 error = true ;
                 errorMessege = 'Error While Check  Matrix Exist Or Not'
            }else if(checkMatrixName.rowsAffected >0){
                error = true ;
                errorMessege = 'Matrix Already Exist Please Change matrix Name'

            }else{

                for(let i=0 ; i<req.body.matrix.length ; i++){

                    if(error == false){
                        req.body.matrix[i].EvolveApproval_name = req.body.EvolveApproval_name;
                        req.body.matrix[i].EvolveUser_ID = req.EvolveUser_ID;
                        let addData = await Evolve.App.Services.Suraksha.Approval.SrvList.addMatrixData(req.body.matrix[i]);
                        if (addData instanceof Error || addData.rowsAffected <1) {

                            error = false ;
                            errorMessege = 'Error While Add Matrix Data'


                        }
                    }

                }

                if(error == false){

                    let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Matrix Data Added Successfully",
                    result: null
                    };
                    res.send(obj);


                }else{
                     let obj = {
                     statusCode: 400,
                     status: "fail",
                     message: 'EERR32777 : '+errorMessege,
                     result: result.message
                     };
                     res.send(obj);
                }

            }

        } catch (error) {
            Evolve.Log.error(" EERR32778: Error while add matrix " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32778: Error while add matrix " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleMatrixDetails: async function (req, res) {
        try {
            let details = await Evolve.App.Services.Suraksha.Approval.SrvList.getSingleMatrixDetails(req.body);
            if (details instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32779 : Error while get matrix details !",
                    result: details.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: details.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32780 : Error while getting matrix details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32780 : Error while getting matrix details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateMatrixDetails: async function (req, res) {
        try {
            let error = false ;
            let errorMessege ='' ;

            let checkMatrixName = await Evolve.App.Services.Suraksha.Approval.SrvList.checkMatrixNameOnUpdate(req.body);
            
            if (checkMatrixName instanceof Error) {
                 error = true ;
                 errorMessege = 'Error While Check  Matrix Exist Or Not'
            }else if(checkMatrixName.rowsAffected >0){
                error = true ;
                errorMessege = 'Matrix Already Exist Please Change matrix Name'

            }else{

            let deleteOldData = await Evolve.App.Services.Suraksha.Approval.SrvList.deleteMatrixDetails(req.body);
            if (deleteOldData instanceof Error) {

                error = true ;
                errorMessege = "Error While Update Matrix Details" ;

            }else{
                for(let i=0 ; i<req.body.matrix.length ; i++){

                    if(error == false){
                        req.body.matrix[i].EvolveApproval_name = req.body.EvolveApproval_name;
                        req.body.matrix[i].EvolveUser_ID = req.EvolveUser_ID;
                        let addData = await Evolve.App.Services.Suraksha.Approval.SrvList.addMatrixData(req.body.matrix[i]);
                        if (addData instanceof Error || addData.rowsAffected <1) {

                            error = false ;
                            errorMessege = 'Error While Add Matrix Data'


                        }
                    }

                }
            }

      

            }
            if(error == false){

                let obj = {
                statusCode: 200,
                status: "success",
                message: "Matrix Updated Successfully",
                result: null
                };
                res.send(obj);


            }else{
                 let obj = {
                 statusCode: 400,
                 status: "fail",
                 message: 'EERR32781 '+errorMessege,
                 result: result.message
                 };
                 res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32782: Error while update matrix " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32782: Error while update matrix " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteMatrixDetails: async function (req, res) {
        try {
            let details = await Evolve.App.Services.Suraksha.Approval.SrvList.deleteMatrixDetails(req.body);
            if (details instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32783 : Error while delete matrix details !",
                    result: details.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Matrix Deleted Successfully !",
                    result: details.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32784 : Error while delete matrix details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32784 : Error while delete matrix details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },





}
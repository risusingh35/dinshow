'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getApprovalProcessHistory: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let list = await Evolve.App.Services.eDoa.SendedBackApproval.SrvOptions.getApprovalProcessHistory(req.body);

            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get Approval Process History ",
                    result: null
                    };
                    res.send(obj);

            }else{

                    let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Approval Process History",
                    result: list.recordset
                    };
                    res.send(obj); 
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Approval Process History "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error  while get Approval Process History"+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getApprovalDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false ;
            let approvalDetails = {} ;
            let matrixDetails = await Evolve.App.Services.eDoa.SendedBackApproval.SrvOptions.getApprovalMatrixDetails(req.body);

            if (matrixDetails instanceof Error || matrixDetails.rowsAffected <1) {
              
                error =true ;
            }else{

                matrixDetails = matrixDetails.recordset[0];
                if(matrixDetails.EvolveApprovalMatrix_Type == 'SALESQUOTE'){

                    let quoteDetails = await Evolve.App.Services.eDoa.SendedBackApproval.SrvOptions.getquoteDetails( matrixDetails.EvolveApprovalProcess_PrimaryID);
                    if (quoteDetails instanceof Error || matrixDetails.rowsAffected <1) {

                        error = true ;  

                    }else{
    
                         
                        approvalDetails.headDetails = [] ;

                        approvalDetails.headDetails.push({
                            attr : 'Sales Quote No' ,
                            value : quoteDetails.recordset[0].EvolveSalesQuote_Serial
                        })
                        
                        approvalDetails.headDetails.push({
                            attr : 'Customer Name' ,
                            value : quoteDetails.recordset[0].EvolveCustomer_name
                        })
                        
                        approvalDetails.headDetails.push({
                            attr : 'Bill To Address' ,
                            value : quoteDetails.recordset[0].billtoAdress
                        })
                     
                    }
                    approvalDetails.lineDetails = {} ;
                }

                
            }
            if(error){

                    let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Approval Details",
                    result: list.recordset
                    };
                    res.send(obj); 

            }else{

                    let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: approvalDetails
                    };
                    res.send(obj); 

            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Approval Process History "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error  while get Approval Process History"+error.message,
                result: null
            };
            res.send(obj);
        }
    },



}
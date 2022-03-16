'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {




    getApprovalProcessHistory: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let list = await Evolve.App.Services.eDoa.ApprovalProcessHistory.SrvOptions.getApprovalProcessHistory(req.body);

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
            let matrixDetails = await Evolve.App.Services.eDoa.ApprovalProcessHistory.SrvOptions.getApprovalMatrixDetails(req.body);

            if (matrixDetails instanceof Error || matrixDetails.rowsAffected <1) {
              
                error =true ;
            }else{

                matrixDetails = matrixDetails.recordset[0];
                if(matrixDetails.EvolveApprovalMatrix_Type == 'SALESQUOTE'){

                    let quoteDetails = await Evolve.App.Services.eDoa.ApprovalProcessHistory.SrvOptions.getquoteDetails( matrixDetails.EvolveApprovalProcessHistory_PrimaryID);
                    if (quoteDetails instanceof Error || matrixDetails.rowsAffected <1) {

                        error = true ;  

                    }else{
    
                         
                        approvalDetails.headDetails = [] ;

                        approvalDetails.headDetails.push({
                            attr : 'Sales Quote No' ,
                            value : quoteDetails.recordset[0].EvolveSalesQuoteAPHistory_Serial
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
    getApprovalProcessDetails: async function (req, res) {
        try {
            let list = await Evolve.App.Services.eDoa.ApprovalProcessHistory.SrvOptions.getApprovalProcessDetails(req.body);

            if (list instanceof Error || list.rowsAffected < 1  ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get Approval Process Details ",
                    result: null
                    };
                    res.send(obj);

            }else{

                    let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Approval Process Details",
                    result: list.recordset[0]
                    };
                    res.send(obj); 
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Approval Process Details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error  while get Approval Process Details"+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSQAPHistoryDetails: async function (req, res) {
        try {
            console.log("body data >" ,  req.body)
            let getSingelSalesQuoteHead = await Evolve.App.Services.eDoa.ApprovalProcessHistory.SrvOptions.getSingelSalesQuoteHead(req.body);

            if (getSingelSalesQuoteHead instanceof Error || getSingelSalesQuoteHead.rowsAffected < 1) {
                Evolve.Log.error("EERR#### : Error while get SQ Approval Process History Head Details ")
                let obj = { statusCode: 400, status: "fail", message: "Error while get SQ Approval Process History Head Details ", result: null };
                res.send(obj);
            }
            else {
                let availableList = [];
                let documentList = (getSingelSalesQuoteHead.recordset[0].EvolveSalesQuoteAPHistory_AttachedDocument == null || getSingelSalesQuoteHead.recordset[0].EvolveSalesQuoteAPHistory_AttachedDocument == '') ? [] : JSON.parse(getSingelSalesQuoteHead.recordset[0].EvolveSalesQuoteAPHistory_AttachedDocument);
                for (let i = 0; i < documentList.length; i++) {
                    if (Evolve.Fs.existsSync(documentList[i].filePath)) {

                        availableList.push(documentList[i])
                    }
                }
                getSingelSalesQuoteHead.recordset[0].EvolveSalesQuoteAPHistory_AttachedDocument = availableList;

                let EvolveSalesQuoteAPHistory_ID = getSingelSalesQuoteHead.recordset[0].EvolveSalesQuoteAPHistory_ID ;

        
                let getSingelSalesQuoteDetails = await Evolve.App.Services.eDoa.ApprovalProcessHistory.SrvOptions.getSingelSalesQuoteDetails(EvolveSalesQuoteAPHistory_ID);



                if (getSingelSalesQuoteDetails instanceof Error || getSingelSalesQuoteDetails.rowsAffected < 1) {
                    Evolve.Log.error("EERR#### : Error while get SQ Approval Process history line details ")
                    let obj = { statusCode: 400, status: "fail", message: "Error while get SQ Approval Process history line details", result: null };
                    res.send(obj);
                }
                else {

                    for(let i=0 ; i<getSingelSalesQuoteDetails.recordset.length ; i++){


                        
                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_AfterDiscountCustUnitPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_CustomerUnitPrice - ((getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_CustomerDiscount/100)* getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_CustomerUnitPrice) + '';


                         getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_AfterDiscountCustTotalPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_Qty * (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_CustomerUnitPrice - ((getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_CustomerDiscount/100))*getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_CustomerUnitPrice)+''  ;

                         getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_TotalPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_Qty  * getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice ;


                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_Qty = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_Qty.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")) ;
                        
                        
                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_CustomerUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_CustomerUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")) ;
                        
                        getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")) ;
                        
                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_TotalPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_TotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")) ;
                        
                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_AfterDiscountCustUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_AfterDiscountCustUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_AfterDiscountCustTotalPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteAPHistoryDetails_AfterDiscountCustTotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
                    }
                    
                    let resObj = {
                        salesQuoteHead: getSingelSalesQuoteHead.recordset,
                        salesQuoteDetails: getSingelSalesQuoteDetails.recordset,
                    }
                    let obj = { statusCode: 200, status: "success", message: "SQ DETAILS", result: resObj };
                    res.send(obj);

                }

            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while save Salse Quote " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get sales Quote Approval Process History Details " + error.message, result: null };
            res.send(obj);
        }
    },



}
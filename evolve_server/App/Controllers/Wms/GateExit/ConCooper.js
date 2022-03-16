'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {


    getDocumentTypeList: async function (req, res) {
        try {
            let getDocTypeLIst = await Evolve.App.Services.Wms.GateExit.SrvCooper.getDocumentTypeList();
            if (getDocTypeLIst instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get document Type!",
                    getDocTypeLIst: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: getDocTypeLIst.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0963: Error while getting document type list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0963: Error while getting document type list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSupplierList: async function (req, res) {
        try {
           
            let getDocTypeLIst = await Evolve.App.Services.Wms.GateExit.SrvCooper.getSupplierList();
            if (getDocTypeLIst instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get supplier data!",
                    getDocTypeLIst: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: getDocTypeLIst.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0964: Error while gettting supplier list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0964: Error while gettting supplier list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getGateTransactionList: async function (req, res) {
        try {

            let gateEntries = await Evolve.App.Services.Wms.GateExit.SrvCooper.getGateTransactionList();
            if (gateEntries instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get List !",
                    gateEntries: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: gateEntries.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0965: Error while getting gate transaction list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0965: Error while getting gate transaction list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    
    addGateEntry: async function (req, res) {
        try {
             req.body.EvolveUser_ID = req.EvolveUser_ID;

             let lastEntry = await Evolve.App.Services.Wms.GateExit.SrvCooper.getTopEntry(req.body);
               if (lastEntry instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error on get last code ", result: null };
                res.send(obj);
              }
              else{
             let date = new Date();
            let mm =date.getMonth()+1;
            if(mm < 10)
            {
                mm = '0'+mm
            }
            let yy = date.getFullYear()+"" ;
            yy =  yy.substring(1) ;
            yy =  yy.substring(1) ;
            let barcode ;

            if(lastEntry.rowsAffected  == 1)
            {
             let count = await Evolve.App.Services.Wms.GateExit.SrvCooper.getIdCount();
                 count  =  count.recordset[0].count
                   let lastCode = lastEntry.recordset[0].EvolveGateEntry_QRCode;
                    lastCode = lastCode.substring(1)
                    lastCode = lastCode.substring(1)
                    console.log("last code >>>>>" , lastCode);
                      let num = parseInt(count) + 1;
                            var str = "" + num;
                            var pad = "0000";
                            var codeString = pad.substring(0, pad.length - str.length) + str; //0001
                            barcode = mm+yy+codeString;
            }
              else
              {
                barcode =  mm+yy+"0001";
                console.log("barcode is >> "  ,barcode)
              }

                     let gateEntries = await Evolve.App.Services.Wms.GateExit.SrvCooper.addGateEntry(req.body , barcode);
          
            if (gateEntries instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add entery !",
                    gateEntries: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Gate entry added succsessfully",
                    message: "Success",
                    result: gateEntries.recordset
                };
                res.send(obj);
            }


           }

            
        } catch (error) {
            Evolve.Log.error(" EERR0966: Error while adding entry gate number "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0966: Error while adding entry gate number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleEnteryData: async function (req, res) {
        try {

            let getSingleEntryData = await Evolve.App.Services.Wms.GateExit.SrvCooper.getSingleEnteryData(req.body.EvolveGateEntry_ID);
            if (getSingleEntryData instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while entry data  !",
                    getSingleEntryData: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: getSingleEntryData.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0967: Entry while getting single entry data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0967: Entry while getting single entry data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },




}
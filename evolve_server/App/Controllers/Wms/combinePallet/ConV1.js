'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    combinePallet: async function (req, res) {
        try {

            // new Version 

            let addnewPallet = '' ;
            let errorMessage = '';
            let combinedPalletDetails = req.body.combinePallets[0] ;

            let finalQty = 0 ; 
            combinedPalletDetails.EvolveUser_ID = req.EvolveUser_ID ; 

            let mewPalletId = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PORECIEVEPALLET') // get po barcode details 
            if (mewPalletId == 0) {
                Evolve.Log.error(" EERR3200 :Error while assign pallet number ")
                errorMessage = 'Error while assign pallet number';
            } else {

                combinedPalletDetails.EvolveInventory_SerialNo   = mewPalletId ;


                for(let i=0 ; i<req.body.combinePallets.length; i++ ){

                    finalQty   +=  req.body.combinePallets[i].EvolveInventory_QtyAvailable ;
                }

                combinedPalletDetails.EvolveInventory_QtyRecieved   = finalQty ;
                combinedPalletDetails.EvolveInventory_QtyAvailable   = finalQty ;

                combinedPalletDetails.EvolveInventory_QtyIssued   = 0 ;

                combinedPalletDetails.EvolveUser_ID   = req.EvolveUser_ID ;
                addnewPallet = await Evolve.App.Services.Wms.combinePallet.SrvV1.addInventory(combinedPalletDetails);
                if (addnewPallet instanceof Error || addnewPallet.rowsAffected < 1) {
                    errorMessage = 'Error While Update Inventory';
                } else {
                    
                for(let i=0 ; i<req.body.combinePallets.length; i++ ){

              
                    let removePallets = await Evolve.App.Services.Wms.combinePallet.SrvV1.removeInventory(req.body.combinePallets[i].EvolveInventory_ID);

            
                     if (removePallets instanceof Error || removePallets.rowsAffected < 1) {
                        errorMessage = 'Error While Remove Pallet '+req.body.combinePallets[i].EvolveInventory_SerialNo;
                    }

                }

                if(errorMessage == ''){

                     addnewPallet.recordset = addnewPallet.recordset.map(v => {

                        if (v.EvolveItem_ID == null || v.EvolveItem_ID == undefined || v.EvolveItem_ID == '') {

                            v.EvolveItem_Part = v.EvolveInventory_MemoItem;
                        }
                        return v
                    })
                }

                }
            }

            if (errorMessage == '') {
                let obj = { statusCode: 200, status: "success", message: "Combined Successfully", result: addnewPallet.recordset[0] };
                res.send(obj);
            } else {
                let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                res.send(obj);
            }



         // old version 

        // let totalPalletQty = 0;
        // let totalAllocQty = 0;
        // let inventoryRemoveError = "false";
        // let inventoryDetail = [];
        // let date = new Date();
        // if(req.body.lotArray.length == 1)
        // {

            // req.body.EvolveInventory_LotNumber = req.body.combinePallets[0].EvolveInventory_LotNumber;
        // }
        // else
        // {
            // let getLastCombineLot = await Evolve.App.Services.Wms.combinePallet.SrvV1.getLastCombineLot();
            // if(getLastCombineLot.rowsAffected < 1)
            // {
            //     req.body.EvolveInventory_LotNumber = "LOTCOMBINE0001";
            // }
            // else
            // {
            //     let lastLotNo = getLastCombineLot.recordset[0].EvolveInventory_LotNumber;
            //     let lastLotNoDigit = lastLotNo.slice(10,lastLotNo.length);
            //     lastLotNo = (parseInt(lastLotNoDigit) + 1)+"";
            //     var pad = "0000";
            //     req.body.EvolveInventory_LotNumber = "LOTCOMBINE"+(pad.substring(0, pad.length - lastLotNo.length) + lastLotNo)
            // }
        // }
        // let getLastInvRefNumber = await Evolve.App.Services.Wms.combinePallet.SrvV1.getLastInvRefNumber();
        // if(getLastInvRefNumber.rowsAffected < 1)
        // {
        //     req.body.EvolveInventory_RefNumber = "CP0001";
        // }
        // else
        // {
        //     let lastRefNo = getLastInvRefNumber.recordset[0].EvolveInventory_RefNumber;
        //     let lastRefNoDigit = lastRefNo.slice(2,lastRefNo.length);
        //     lastRefNo = (parseInt(lastRefNoDigit) + 1)+"";
        //     var pad = "0000";
        //     req.body.EvolveInventory_RefNumber = "CP"+(pad.substring(0, pad.length - lastRefNo.length) + lastRefNo)
        // }

    //     let newPalletId =  await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PORECIEVEPALLET') // get po barcode details 
    //     if (newPalletId == 0  ) {
    //         Evolve.Log.error(" EERR3172 : Error while assign pallet number ")

    //        let obj = { statusCode: 400, status: "fail", message: " EERR3172 :Error while assign pallet number ", result: null };
    //        res.send(obj);
    //        // newPalletId = {}
    //    }
    //    else {
    //     req.body.EvolveInventory_RefNumber =newPalletId; 
    //     let getLocationCode = await Evolve.App.Services.Wms.combinePallet.SrvV1.getLocationCode(req.body.EvolveLocation_ID);
    //     if(getLocationCode instanceof Error || getLocationCode.rowsAffected < 1)
    //     {
    //         let obj = { statusCode: 400, status: "fail", message: "EERR3173 : Location  not  found !", result: null };
    //         res.send(obj);
    //     }else{
    //         for(let i = 0; i < req.body.combinePallets.length ; i++)
    //         {
    //             if(inventoryRemoveError == "false")
    //             {
    //                 let inventoryData = req.body.combinePallets[i];
    //                 totalPalletQty = totalPalletQty + parseFloat(inventoryData.EvolveInventory_QtyOnHand);
    //                 totalAllocQty = totalAllocQty + parseFloat(inventoryData.EvolveInventory_QtyAllocated);
    //                 let removeInventory = await Evolve.App.Services.Wms.combinePallet.SrvV1.removeInventory(inventoryData.EvolveInventory_ID);
    //                 if(removeInventory instanceof Error || removeInventory.rowsAffected < 1)
    //                 {
    //                     inventoryRemoveError = "true";
    //                     Evolve.Log.error(" EERR3174: Inventory Delete have some issue ");
    //                     Evolve.Log.error(removeInventory.message);
    //                 }
    //                 else
    //                 {
    //                     let history_Data = {
    //                         'EvolveCompany_ID': req.EvolveCompany_ID,
    //                         'EvolveUnit_ID': req.EvolveUnit_ID,
    //                         'EvolveTranstype_code': 'ISS-COM-PLT',
    //                         'EvolveItem_ID': parseInt(inventoryData.EvolveItem_ID),
    //                         'EvolveInventoryTransHistory_Number' : null, // WO / PO / SO NUMBER 
    //                         'EvolveInventoryTransHistory_Line' : null, // PO / SO LINE NUMBER
    //                         'EvolveInventoryTransHistory_LotSerial' : inventoryData.EvolveInventory_LotNumber,
    //                         'EvolveInventoryTransHistory_RefNumber' : inventoryData.EvolveInventory_RefNumber,
    //                         'EvolveInventoryTransHistory_FromRefNumber' : req.body.EvolveInventory_RefNumber,
    //                         'EvolveInventoryTransHistory_QtyRequire' : 0,
    //                         'EvolveInventoryTransHistory_Qty' : 0 - parseInt(inventoryData.EvolveInventory_QtyOnHand),
    //                         'EvolveUom_ID': parseInt(inventoryData.EvolveUom_ID),
    //                         'EvolveLocation_FromID': req.body.EvolveLocation_ID,
    //                         'EvolveLocation_ToID': null,
    //                         'EvolveReason_ID' : null,
    //                         'EvolveInventoryTransHistory_InventoryStatus' : req.body.combinePallets[0].EvolveInventory_Status,
    //                         'EvolveInventoryTransHistory_PostingStatus' : 'ERPPOSTED',
    //                         'EvolveInventoryTransHistory_Remark' : null,
    //                         'EvolveUser_ID' : req.EvolveUser_ID
    //                     };
    //                     let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
    //                     if(add_history instanceof Error || add_history.rowsAffected < 1)
    //                     {
    //                         inventoryRemoveError = "true";
    //                         Evolve.Log.error(" EERR3175 : Inventory Delete have some issue ");
    //                         Evolve.Log.error(add_history.message);
    //                     }
    //                     else
    //                     {
    //                         inventoryRemoveError = "false";
    //                         inventoryDetail.push({
    //                             'operation': 'A',
    //                             "lotserialQty" : inventoryData.EvolveInventory_QtyOnHand,
    //                             "effDate" : date.getFullYear()+"-"+('0' + (date.getMonth() + 1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2),
    //                             "nbr" : "text",
    //                             "soJob" : "text",
    //                             "rmks" : "text",
    //                             "siteFrom" : '10-100',
    //                             "locFrom" : inventoryData.EvolveLocation_Code,
    //                             "lotserFrom" : inventoryData.EvolveInventory_LotNumber,
    //                             "lotrefFrom" : inventoryData.EvolveInventory_RefNumber,
    //                             "siteTo" :  '10-100',
    //                             "locTo" : getLocationCode.recordset[0].EvolveLocation_Code,
    //                             "lotserTo" : req.body.EvolveInventory_LotNumber,
    //                             "lotrefTo" : req.body.EvolveInventory_RefNumber,
    //                             "yn" : "true",
    //                         })
    //                     }
    //                 }
    //             }
    //         }
    //         if(inventoryRemoveError == "true")
    //         {
    //             Evolve.Log.error(" EERR3176 : Error while remove inventory ");
    //             let obj = { statusCode: 400, status: "fail", message: "EERR3176 : Error while remove inventory", result: null };
    //             res.send(obj);
    //         }
    //         else
    //         {
    //             let getTransType_ID = await  Evolve.App.Services.Common.SrvCommon.getTransTypeID('RCPT-COM-PLT');
    //             if(getTransType_ID instanceof Error || getTransType_ID.rowAffected < 1)
    //             {
    //                 Evolve.Log.error(" EERR3177 : Transaction type not found ");

    //                 let obj = { statusCode: 400, status: "fail", message: "EERR3177 : Transaction type not found", result: null };
    //                 res.send(obj);
    //             }
    //             else
    //             {
    //                 let addInventoryObj = {
    //                     "EvolveCompany_ID" : req.EvolveCompany_ID ,
    //                     "EvolveUnit_ID" : req.EvolveUnit_ID ,
    //                     "EvolveItem_ID" : req.body.combinePallets[0].EvolveItem_ID,
    //                     "EvolveLocation_ID" : req.body.EvolveLocation_ID ,
    //                     "EvolveInventory_QtyOnHand" : totalPalletQty , 
    //                     "EvolveInventory_QtyAllocated" : totalAllocQty ,
    //                     "EvolveInventory_LotNumber" : req.body.EvolveInventory_LotNumber,
    //                     "EvolveInventory_RefNumber" : req.body.EvolveInventory_RefNumber,
    //                     "EvolveInventory_ExpireDateTime" : null,
    //                     "EvolveInventory_LotNotes" : null,
    //                     "EvolveReason_ID" : null,
    //                     "EvolveInventory_CustLotRef" : req.body.combinePallets[0].EvolveInventory_CustLotRef,
    //                     "EvolveInventory_Status" : req.body.combinePallets[0].EvolveInventory_Status,
    //                     "EvolveTranstype_ID" : getTransType_ID.recordset[0].EvolveTranstype_ID,
    //                     "EvolveUser_ID" : req.EvolveUser_ID,
    //                 };
    //                 let addInventory = await Evolve.App.Services.Wms.combinePallet.SrvV1.addInventory(addInventoryObj);
    //                 if(addInventory instanceof Error || addInventory.rowsAffected < 1)
    //                 {
    //                     Evolve.Log,error(" EERR3178: Error while add inventory ");
    //                     Evolve.Log.error(addInventory.message);
    //                     let obj = { statusCode: 400, status: "fail", message: "EERR3178 : Error while add inventory", result: null };
    //                     res.send(obj);
    //                 }
    //                 else
    //                 {
    //                     let history_Data = {
    //                         'EvolveCompany_ID': req.EvolveCompany_ID,
    //                         'EvolveUnit_ID': req.EvolveUnit_ID,
    //                         'EvolveTranstype_code': 'RCPT-COM-PLT',
    //                         'EvolveItem_ID': parseInt(req.body.combinePallets[0].EvolveItem_ID),
    //                         'EvolveInventoryTransHistory_Number' : null,
    //                         'EvolveInventoryTransHistory_Line' : null,
    //                         'EvolveInventoryTransHistory_LotSerial' : req.body.EvolveInventory_LotNumber,
    //                         'EvolveInventoryTransHistory_RefNumber' : req.body.EvolveInventory_RefNumber,
    //                         'EvolveInventoryTransHistory_FromRefNumber' : null,
    //                         'EvolveInventoryTransHistory_QtyRequire' : 0,
    //                         'EvolveInventoryTransHistory_Qty' : totalPalletQty,
    //                         'EvolveUom_ID': parseInt(req.body.combinePallets[0].EvolveUom_ID),
    //                         'EvolveLocation_FromID': req.body.EvolveLocation_ID,
    //                         'EvolveLocation_ToID': null,
    //                         'EvolveReason_ID' : null,
    //                         'EvolveInventoryTransHistory_InventoryStatus' : req.body.combinePallets[0].EvolveInventory_Status,
    //                         'EvolveInventoryTransHistory_PostingStatus' : 'ERPPOSTED',
    //                         'EvolveInventoryTransHistory_Remark' : null,
    //                         'EvolveUser_ID' : req.EvolveUser_ID
    //                     };

    //                     let add_history =  Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data)
    //                     if (add_history instanceof Error || add_history.rowsAffected < 1) {
    //                         Evolve.Log.error(" EERR3179: Error while add transaction history ");
    //                         Evolve.Log.error(add_history.message);
    //                         let obj = { statusCode: 400, status: "fail", message: "EERR3179 : Error while add transaction history", result: null };
    //                         res.send(obj);
    //                     } else {
    //                         let EvolveIO_Data = {
    //                             "part" : req.body.combinePallets[0].EvolveItem_Code,
    //                             "lotserialQty" : 0,
    //                             "effDate" : date.getFullYear()+"-"+('0' + (date.getMonth() + 1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2),
    //                             "inventoryDetail" : inventoryDetail,
    //                         };
    //                         let ioData = {
    //                             'EvolveIO_Data': EvolveIO_Data,
    //                             'EvolveIO_Direction': 0, // 1 Means IN Direction , 0 Means Out Direction
    //                             'EvolveIO_Code': 'EVOLVECOMBINEOB', // EVOLVE COMBINE PALLT INBOUND.
    //                             'EvolveIO_Data_Formate': 'XML',
    //                             'EvolveIO_ERP_Type': 'QAD',
    //                             'EvolveIO_Status': 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
    //                             'EvolveIO_File_Data': ""
    //                         }
    //                         let ioDataResponce = await Evolve.App.Services.Wms.combinePallet.SrvV1.addIOData(ioData);
    //                         if (ioDataResponce instanceof Error || ioDataResponce.rowsAffected < 1) 
    //                         {
    //                             Evolve.Log.error(" EERR3180: Error while add data in IO ");

    //                             let obj = { statusCode: 400, status: "fail", message: "EERR3180 : Error while add data in IO", result: null };
    //                             res.send(obj);
    //                         }
    //                         else
    //                         {

    //                             let details = await Evolve.App.Services.Wms.combinePallet.SrvV1.getCombinedPalletDetails(addInventory.recordset[0].inserted_id);
    //                             if(details instanceof Error || details.rowsAffected < 1)
    //                             {
    //                                 Evolve.Log,error(" EERR3181: Error while add inventory ");
    //                                 Evolve.Log.error(details.message);
    //                                 let obj = { statusCode: 400, status: "fail", message: "EERR3181 : Error while add inventory", result: null };
    //                                 res.send(obj);
    //                             }
    //                             else
    //                             {
    //                                 let obj = { statusCode: 200, status: "success", message: "Pallet combine successfully ", result: details.recordset[0] };
    //                             res.send(obj);
    //                             }

    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //      }
    //     }
    }catch (error) {
        Evolve.Log.error(" EERR3182: Error while combine pallets "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR3182: Error while combine pallets "+ error.message, result: null };
        res.send(obj);
    }
    },

    printPallet: async function (req, res) {
        try {
            // let  getInvPalletNumber = await Evolve.App.Services.Wms.combinePallet.SrvV1.getInvPalletNumber(req.body);
            // if(getInvPalletNumber instanceof Error || getInvPalletNumber.rowsAffected < 1)
            // {
            //     let obj = { statusCode: 400, status: "fail", message: "Inventory not found", result: null};
            //     res.send(obj);
            // }
            // else
            // {
                // let palletRefNumber = getInvPalletNumber.recordset[0].EvolveInventory_RefNumber;
                // if(Evolve.Config.defaultPrinter)
                // {
                //     if(Evolve.Config.defaultPrinter == "ZEBRA")
                //     {
                //         let ZplData =
                //             "^XA\r\n" +
                //             "^MMT^PW360\r\n" +
                //             "^LL0160^LS10\r\n" +
                //             "^FX\r\n" +
                //             "^BY2,2,100\r\n" +
                //             "^FO10,20^BY0,5,5^BQ,3,6^FDQA," +
                //             palletRefNumber +
                //             "^FS\r\n" +
                //             "^CF0,30 \r\n" +
                //             "^FO10,170^FD" +
                //             palletRefNumber +
                //             "^FS\r\n" +
                //             "^XZ";
                //             Evolve.Fs.writeFile(Evolve.Config.dirPrintLabel + "/" + palletRefNumber + ".txt", ZplData, function (err) 
                //             {
                //                 if (err) 
                //                 {
                //                     Evolve.Log.error(' EERR0962: Error while print pallet label. ')
                //                     Evolve.Log.error(err);
                //                     let obj = { statusCode: 400, status: "fail", message: "Error while print pallet code.", result: null };
                //                     res.send(obj);
                //                 } 
                //                 else
                //                 {
                //                     let  updateInventoryPrint = Evolve.App.Services.Wms.combinePallet.SrvIndex.updateInventoryPrint(req.body);
                //                     if(updateInventoryPrint instanceof Error || updateInventoryPrint.rowsAffected < 1)
                //                     {
                //                         let obj = { statusCode: 400, status: "success", message: "Update barcode status failed", result: null };
                //                         res.send(obj);
                //                     }
                //                     else
                //                     {
                //                         let obj = { statusCode: 200, status: "success", message: palletRefNumber+" printed successfully !", result: null };
                //                         res.send(obj);
                //                     }
                //                 }
                //             });
                      
                //     }
                //     else
                //     {
                //         let obj = { statusCode: 400, status: "fail", message: "Default Printer code not found", result: null };
                //         res.send(obj);
                //     }
                // }
                // else
                // {
                //     let obj = { statusCode: 400, status: "fail", message: "Default Printer configration not found", result: null };
                //     res.send(obj);
                // }


                // let obj = { statusCode: 400, status: "fail", message: "Pallet Printed Successfully !", result: null };
                // res.send(obj);
                let pallet = await Evolve.App.Services.Wms.combinePallet.SrvV1.printPallet(req.body);
                if (pallet instanceof Error  ) {
                      Evolve.Log.error("EERR3233: Error while  print pallet ");
                      let obj = { statusCode: 400, status: "fail", message: "EERR3233 : Error while  print pallet", result: null };
                    res.send(obj);
                }else{ 
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Barcode printed successfully",
                    result: null
                };
                res.send(obj);
                }
            // }
        } catch (error) {
            Evolve.Log.error(" EERR0963: Error while printing pallet "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0963: Error while printing pallet "+ error.message, result: null };
            res.send(obj);
        }
    },
    // getscannedPallet: async function (req, res) {
    //     try {
    //         console.log("entered in  controller >>> ")
    //        let pallet = await Evolve.App.Services.Wms.combinePallet.SrvV1.getscannedPallet(req.body);
    //         if (pallet instanceof Error  ) {
    //               Evolve.Log.error("EERR3183: Error while get pallet details ");
    //               let obj = { statusCode: 400, status: "fail", message: "EERR3183 : Error while get pallet details", result: null };
    //             res.send(obj);
    //         }
    //         else if(pallet.rowsAffected <1){
    //             let obj = { statusCode: 400, status: "fail", message: "Invalid pallet id. Please re-enter correct pallet id !", result: null };
    //             res.send(obj);
    //         }else{
    //           let obj = { statusCode: 200, status: "success", message: "Pallet details", result: pallet.recordset[0] };
    //           res.send(obj);
    //         }
    //     } catch (error) {
    //       Evolve.Log.error("EERR3184 : Error while get pallet details "+error.message);
    //       let obj = {
    //             statusCode: 400,
    //             status: "fail",
    //             message: "EERR3184 : Error while get pallet details "+error.message,
    //             result: null
    //       };
    //       res.send(obj);
    //     }  
    // },


    getscannedPallet: async function (req, res) {
        try {
            let pallet = await Evolve.App.Services.Wms.splitPallet.SrvV1.getscannedPallet(req.body);
            if (pallet instanceof Error) {
                Evolve.Log.error("EERR3183: Error while get pallet details ");
                let obj = { statusCode: 400, status: "fail", message: "EERR3183 : Error while get pallet details", result: null };
                res.send(obj);
            }
            else if (pallet.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Invalid pallet id. Please re-enter correct pallet id !", result: null };
                res.send(obj);
            } else {

                pallet.recordset = pallet.recordset.map(v => {

                    if (v.EvolveItem_ID == null || v.EvolveItem_ID == undefined || v.EvolveItem_ID == '') {

                        v.EvolveItem_Part = v.EvolveInventory_MemoItem;
                    }
                    return v
                })

                let obj = { statusCode: 200, status: "success", message: "Pallet details", result: pallet.recordset[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR3184 : Error while get pallet details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3184 : Error while get pallet details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    
}
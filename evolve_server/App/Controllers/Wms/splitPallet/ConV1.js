'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getscannedPallet: async function (req, res) {
        try {
            let pallet = await Evolve.App.Services.Wms.splitPallet.SrvV1.getscannedPallet(req.body);
            if (pallet instanceof Error) {
                Evolve.Log.error("EERR3140: Error while get pallet details ");
                let obj = { statusCode: 400, status: "fail", message: "EERR3140 : Error while get pallet details", result: null };
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
            Evolve.Log.error("EERR3141 : Error while get pallet details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3141 : Error while get pallet details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    splitPallet: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let errorMessage = '';
            let addnewPallet  ;

            req.body.EvolveInventory_SerialNo = Evolve.Generator.generate("PLT"); 
            console.log("req.body.EvolveInventory_SerialNo????" ,  req.body.EvolveInventory_SerialNo)
            if (req.body.EvolveInventory_SerialNo == undefined || req.body.EvolveInventory_SerialNo.length == 0) {
                Evolve.Log.error(" EERR3200 :Error while assign pallet number ")
                errorMessage = 'Error while assign pallet number';
            } else {

                console.log("req.body.EvolveInventory_SerialNo??" ,  req.body.EvolveInventory_SerialNo)
                req.body.EvolveInventory_SerialNo  = (req.body.EvolveInventory_SerialNo.toString()).replace(/ -/g ,'') 
                req.body.EvolveInventory_SerialNo = req.body.EvolveInventory_SerialNo.split(" ").join("") ;


                let upateInv = await Evolve.App.Services.Wms.splitPallet.SrvV1.updateInventory(req.body);
                if (upateInv instanceof Error || upateInv.rowsAffected < 1) {

                    errorMessage = 'Error While Update Inventory';

                } else {

                    req.body.EvolveInventory_QtyRecieved = req.body.qtyToSplit;
                    req.body.EvolveInventory_QtyAvailable = req.body.qtyToSplit;
        
                    addnewPallet = await Evolve.App.Services.Wms.splitPallet.SrvV1.addInventory(req.body);
                    if (addnewPallet instanceof Error || addnewPallet.rowsAffected < 1) {
                        errorMessage = 'Error While Update Inventory';
                    } else {
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
                let obj = { statusCode: 200, status: "success", message: "Pallet Splitted Successfully", result: addnewPallet.recordset[0] };
                res.send(obj);
            } else {
                let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                res.send(obj);
            }






            // let getInventoryData = await Evolve.App.Services.Wms.splitPallet.SrvV1.getInventoryData(req.body);
            // if(getInventoryData instanceof Error || getInventoryData.rowsAffected < 1)
            // {   
            //     Evolve.Log.error("EERR3198 : Inventory not found");
            //     let obj = { statusCode: 400, status: "fail", message: "EERR3198 : Inventory not found", result: null};
            //     res.send(obj);
            // }
            // else
            // {
            //     let remainQty = parseFloat(getInventoryData.recordset[0].EvolveInventory_QtyOnHand) - parseFloat(req.body.EvolveInventory_QtyOnHand);
            //     let updateInventoryQty = await Evolve.App.Services.Wms.splitPallet.SrvV1.updateInventoryQty(req.body,remainQty);
            //     if(updateInventoryQty instanceof Error || updateInventoryQty.rowsAffected < 1)
            //     {
            //         Evolve.Log,error(" EERR3199: Error while update inventory qty ");
            //         Evolve.Log.error(updateInventoryQty.message);
            //     }
            //     else
            //     {   
            //              let addInventoryObj = getInventoryData.recordset[0];
            //             let mewPalletId =  await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PORECIEVEPALLET') // get po barcode details 
            //             if (mewPalletId == 0  ) {
            //                 Evolve.Log.error(" EERR3200 :Error while assign pallet number ")

            //                let obj = { statusCode: 400, status: "fail", message: " EERR3200 :Error while assign pallet number ", result: null };
            //                res.send(obj);
            //            }
            //            else {
            //             addInventoryObj.EvolveInventory_RefNumberNew = mewPalletId;
            //             let history_Data = {
            //                 'EvolveCompany_ID': addInventoryObj.EvolveCompany_ID,
            //                 'EvolveUnit_ID': addInventoryObj.EvolveUnit_ID,
            //                 'EvolveTranstype_code': 'ISS-SP-PLT',
            //                 'EvolveItem_ID': parseInt(addInventoryObj.EvolveItem_ID),
            //                 'EvolveInventoryTransHistory_Number' : null,
            //                 'EvolveInventoryTransHistory_Line' : null,
            //                 'EvolveInventoryTransHistory_LotSerial' : addInventoryObj.EvolveInventory_LotNumber,
            //                 'EvolveInventoryTransHistory_RefNumber' : addInventoryObj.EvolveInventory_RefNumber,
            //                 'EvolveInventoryTransHistory_FromRefNumber' : addInventoryObj.EvolveInventory_RefNumberNew,
            //                 'EvolveInventoryTransHistory_QtyRequire' : 0,
            //                 'EvolveInventoryTransHistory_Qty' : 0 - parseFloat(req.body.EvolveInventory_QtyOnHand),
            //                 'EvolveUom_ID': addInventoryObj.EvolveUom_ID,
            //                 'EvolveLocation_FromID': addInventoryObj.EvolveLocation_ID,
            //                 'EvolveLocation_ToID': null,
            //                 'EvolveReason_ID' : null,
            //                 'EvolveInventoryTransHistory_InventoryStatus' : addInventoryObj.EvolveInventory_Status,
            //                 'EvolveInventoryTransHistory_PostingStatus' : 'ERPPOSTED',
            //                 'EvolveInventoryTransHistory_Remark' : null,
            //                 'EvolveUser_ID' : req.EvolveUser_ID
            //             };

            //         let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data)
            //         if(add_history instanceof Error || add_history.rowsAffected < 1)
            //         {
            //             Evolve.Log.error(" EERR3201 : Error while add inventory history ");
            //             Evolve.Log.error(addInventory.message);
            //         }
            //         else
            //         {
            //             let getTransType_ID = await  Evolve.App.Services.Common.SrvCommon.getTransTypeID('RCPT-SP-PLT');
            //             if(getTransType_ID instanceof Error || getTransType_ID.rowAffected < 1)
            //             {
            //                 let obj = { statusCode: 400, status: "fail", message: "EERR3202 : Transaction type not found", result: null };
            //                 res.send(obj);
            //             }
            //             else
            //             {
            //                 addInventoryObj.EvolveInventory_RefNumberOld = addInventoryObj.EvolveInventory_RefNumber
            //                 addInventoryObj.EvolveInventory_RefNumber = addInventoryObj.EvolveInventory_RefNumberNew
            //                 addInventoryObj.EvolveInventory_QtyOnHandOld = addInventoryObj.EvolveInventory_QtyOnHand
            //                 addInventoryObj.EvolveInventory_QtyOnHand = req.body.EvolveInventory_QtyOnHand;
            //                 addInventoryObj.EvolveUser_ID = req.EvolveUser_ID
            //                 addInventoryObj.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
            //                 let addInventory = await Evolve.App.Services.Wms.splitPallet.SrvV1.addInventory(addInventoryObj);
            //                 if(addInventory instanceof Error || addInventory.rowsAffected < 1)
            //                 {
            //                     Evolve.Log.error(" EERR3203: Error while add inventory");
            //                     Evolve.Log.error(addInventory.message);
            //                 }
            //                 else
            //                 {
            //                     let history_Data = {
            //                         'EvolveCompany_ID': addInventoryObj.EvolveCompany_ID,
            //                         'EvolveUnit_ID': addInventoryObj.EvolveUnit_ID,
            //                         'EvolveTranstype_code': 'RCPT-SP-PLT',
            //                         'EvolveItem_ID': parseInt(addInventoryObj.EvolveItem_ID),
            //                         'EvolveInventoryTransHistory_Number' : null,
            //                         'EvolveInventoryTransHistory_Line' : null,
            //                         'EvolveInventoryTransHistory_LotSerial' : addInventoryObj.EvolveInventory_LotNumber,
            //                         'EvolveInventoryTransHistory_RefNumber' : addInventoryObj.EvolveInventory_RefNumber,
            //                         'EvolveInventoryTransHistory_FromRefNumber' : null,
            //                         'EvolveInventoryTransHistory_QtyRequire' : 0,
            //                         'EvolveInventoryTransHistory_Qty' : parseFloat(req.body.EvolveInventory_QtyOnHand),
            //                         'EvolveUom_ID': addInventoryObj.EvolveUom_ID,
            //                         'EvolveLocation_FromID': addInventoryObj.EvolveLocation_ID,
            //                         'EvolveLocation_ToID': null,
            //                         'EvolveInventoryTransHistory_InventoryStatus' : addInventoryObj.EvolveInventory_Status,
            //                         'EvolveInventoryTransHistory_PostingStatus' : 'ERPPOSTED',
            //                         'EvolveUser_ID' : req.EvolveUser_ID
            //                     };

            //                     let add_history = await Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data)

            //                     if (add_history instanceof Error || add_history.rowsAffected < 1) {
            //                         Evolve.Log.error(" EERR3204: Error while add transaction history ");
            //                         Evolve.Log.error(add_history.message);
            //                         let obj = { statusCode: 400, status: "fail", message: "EERR3204 : Error while add transaction history", result: null };
            //                         res.send(obj);
            //                     } else {
            //                         // console.log("addInventoryObj ",addInventoryObj);
            //                         let date = new Date();
            //                         let EvolveIO_Data = {
            //                             "part" : addInventoryObj.EvolveItem_Code,
            //                             "lotserialQty" : 0,
            //                             "effDate" : date.getFullYear()+"-"+('0' + (date.getMonth() + 1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2),
            //                             "inventoryDetail" : {
            //                                 'operation': 'text',
            //                                 "lotserialQty" : req.body.EvolveInventory_QtyOnHand,
            //                                 "effDate" : date.getFullYear()+"-"+('0' + (date.getMonth() + 1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2),
            //                                 "nbr" : "text",
            //                                 "soJob" : "text",
            //                                 "rmks" : "text",
            //                                 "siteFrom" : '10-100',
            //                                 "locFrom" : addInventoryObj.EvolveLocation_Code,
            //                                 "lotserFrom" : addInventoryObj.EvolveInventory_LotNumber,
            //                                 "lotrefFrom" : addInventoryObj.EvolveInventory_RefNumberOld,
            //                                 "siteTo" : '10-100',
            //                                 "locTo" : addInventoryObj.EvolveLocation_Code,
            //                                 "lotserTo" : addInventoryObj.EvolveInventory_LotNumber,
            //                                 "lotrefTo" : addInventoryObj.EvolveInventory_RefNumber,
            //                                 "yn" : "true",
            //                             },
            //                         };
            //                         let ioData = {
            //                             'EvolveIO_Data': EvolveIO_Data,
            //                             'EvolveIO_Direction': 0, // 1 Means IN Direction , 0 Means Out Direction
            //                             'EvolveIO_Code': 'EVOLVESPLITOB', // EVOLVE SPLIT PALLT OUTBOUND.
            //                             'EvolveIO_Data_Formate': 'XML',
            //                             'EvolveIO_ERP_Type': 'QAD',
            //                             'EvolveIO_Status': 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
            //                             'EvolveIO_File_Data': ""
            //                         }
            //                         let ioDataResponce = await Evolve.App.Services.Wms.splitPallet.SrvV1.addIOData(ioData);
            //                         if (ioDataResponce instanceof Error || ioDataResponce.rowsAffected < 1) 
            //                         {
            //                             Evolve.Log.error(" EERR3205 : Error while add transaction history ");
            //                             let obj = { statusCode: 400, status: "fail", message: "Error while add data in IO", result: null };
            //                             res.send(obj);
            //                         }
            //                         else
            //                         {
            //                             let updatedDetails = await Evolve.App.Services.Wms.splitPallet.SrvV1.getUpdatedPalletDetails(req.body.EvolveInventory_ID ,addInventory.recordset[0].inserted_id );
            //                             if (updatedDetails instanceof Error || updatedDetails.rowsAffected < 1) 
            //                             {
            //                                 let obj = { statusCode: 400, status: "fail", message: "EERR3206 : Error while get updated pallet details", result: null };
            //                                 res.send(obj);
            //                             }
            //                             else
            //                             {
            //                             let obj = { statusCode: 200, status: "success", message: "Pallet splitted successfully ", result: updatedDetails.recordset };
            //                             res.send(obj);
            //                             }
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
            // }
        } catch (error) {
            Evolve.Log.error(" EERR3207 : Error while splitting pallet " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR3207 : Error while splitting pallet " + error.message, result: null };
            res.send(obj);
        }
    },

    printPallet: async function (req, res) {
        try {
            // let  getInvPalletNumber = await Evolve.App.Services.Wms.splitPallet.SrvV1.getInvPalletNumber(req.body);
            // if(getInvPalletNumber instanceof Error || getInvPalletNumber.rowsAffected < 1)
            // {
            //     Evolve.Log.error(" EERR3208 : Inventory not found ");
            //    let obj = { statusCode: 400, status: "fail", message: "EERR3208 : Inventory not found", result: null};
            //     res.send(obj);
            // }
            // else
            // {


            console.log("body data >>>", req.body)
            let palletRefNumber = req.body.EvolveInventory_RefNumber;
            // if(Evolve.Config.defaultPrinter)
            // {
            // if(Evolve.Config.defaultPrinter == "ZEBRA")
            // {
            let ZplData =
                "^XA\r\n" +
                "^MMT^PW360\r\n" +
                "^LL0160^LS10\r\n" +
                "^FX\r\n" +
                "^BY2,2,100\r\n" +
                "^FO10,20^BY0,5,5^BQ,3,6^FDQA," +
                palletRefNumber +
                "^FS\r\n" +
                "^CF0,30 \r\n" +
                "^FO10,170^FD" +
                palletRefNumber +
                "^FS\r\n" +
                "^XZ";
            // Evolve.Fs.writeFile(Evolve.Config.dirPrintLabel + "/" + palletRefNumber + ".txt", ZplData, function (err) 
            // {
            //     if (err) 
            //     {
            //         Evolve.Log.error(' EERR0993: Error while print pallet label. ')
            //         Evolve.Log.error(err);
            //         let obj = { statusCode: 400, status: "fail", message: "Error while print pallet code.", result: null };
            //         res.send(obj);
            //     } 
            //     else
            //     {
            //         let  updateInventoryPrint = Evolve.App.Services.Wms.splitPallet.SrvIndex.updateInventoryPrint(req.body);
            //         if(updateInventoryPrint instanceof Error || updateInventoryPrint.rowsAffected < 1)
            //         {
            //             let obj = { statusCode: 400, status: "success", message: "Update barcode status failed", result: null };
            //             res.send(obj);
            //         }
            //         else
            //         {
            let pallet = await Evolve.App.Services.Wms.splitPallet.SrvV1.printPallet(req.body);
            if (pallet instanceof Error) {
                Evolve.Log.error("EERR3232 : Error while  print pallet ");
                let obj = { statusCode: 400, status: "fail", message: "EERR3232 : Error while  print pallet", result: null };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Barcode printed successfully",
                    result: null
                };
                res.send(obj);
            }
            // let obj = { statusCode: 200, status: "success", message: palletRefNumber+" printed successfully !", result: null };
            // res.send(obj);
            // }
            //     }
            // });

            // }
            // else
            // {
            //     let obj = { statusCode: 400, status: "fail", message: "Default Printer code not found", result: null };
            //     res.send(obj);
            // }
            // }
            // else
            // {
            //     let obj = { statusCode: 400, status: "fail", message: "Default Printer configration not found", result: null };
            //     res.send(obj);
            // }
            // }
        } catch (error) {
            Evolve.Log.error(" EERR3209 : Error while printing pallet " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR3209 : Error while printing pallet " + error.message, result: null };
            res.send(obj);
        }
    },

}
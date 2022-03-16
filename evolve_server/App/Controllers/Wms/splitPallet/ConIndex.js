'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getInventoryList: async function (req, res) {
        try {
            let getInventoryList = await Evolve.App.Services.Wms.splitPallet.SrvIndex.getInventoryList(req.body);
            if(getInventoryList instanceof Error || getInventoryList.rowsAffected < 1)
            {
                let obj = { statusCode: 400, status: "fail", message: "Inventory not found", result: null};
                res.send(obj);
            }
            else
            {
                let obj = { statusCode: 200, status: "success", message: "Inventory List", result: getInventoryList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0987: Error while getting Inventory List "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0987: Error while getting Inventory List "+error.message, result: null };
            res.send(obj);
        }
    },

    splitPallet: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let getInventoryData = await Evolve.App.Services.Wms.splitPallet.SrvIndex.getInventoryData(req.body);
            if(getInventoryData instanceof Error || getInventoryData.rowsAffected < 1)
            {
                let obj = { statusCode: 400, status: "fail", message: "Inventory not found", result: null};
                res.send(obj);
            }
            else
            {
                let remainQty = parseFloat(getInventoryData.recordset[0].EvolveInventory_QtyOnHand) - parseFloat(req.body.EvolveInventory_QtyOnHand);
                let updateInventoryQty = await Evolve.App.Services.Wms.splitPallet.SrvIndex.updateInventoryQty(req.body,remainQty);
                if(updateInventoryQty instanceof Error || updateInventoryQty.rowsAffected < 1)
                {
                    Evolve.Log,error(" EERR0988: Error while update inventory qty ");
                    Evolve.Log.error(updateInventoryQty.message);
                }
                else
                {   
                    let addInventoryObj = getInventoryData.recordset[0];
                    let getLastInvRefNumber = await Evolve.App.Services.Wms.splitPallet.SrvIndex.getLastInvRefNumber();
                    if(getLastInvRefNumber.rowsAffected < 1)
                    {
                        addInventoryObj.EvolveInventory_RefNumberNew = "SP0001";
                    }
                    else
                    {
                        let lastRefNo = getLastInvRefNumber.recordset[0].EvolveInventory_RefNumber;
                        let lastRefNoDigit = lastRefNo.slice(2,lastRefNo.length);
                        lastRefNo = (parseInt(lastRefNoDigit) + 1)+"";
                        var pad = "0000";
                        addInventoryObj.EvolveInventory_RefNumberNew = "SP"+(pad.substring(0, pad.length - lastRefNo.length) + lastRefNo)
                    }
                    let history_Data = {
                        'EvolveCompany_ID': addInventoryObj.EvolveCompany_ID,
                        'EvolveUnit_ID': addInventoryObj.EvolveUnit_ID,
                        'EvolveTranstype_code': 'ISS-SP-PLT',
                        'EvolveItem_ID': parseInt(addInventoryObj.EvolveItem_ID),
                        'EvolveInventoryTransHistory_Number' : null,
                        'EvolveInventoryTransHistory_Line' : null,
                        'EvolveInventoryTransHistory_LotSerial' : addInventoryObj.EvolveInventory_LotNumber,
                        'EvolveInventoryTransHistory_RefNumber' : addInventoryObj.EvolveInventory_RefNumber,
                        'EvolveInventoryTransHistory_FromRefNumber' : addInventoryObj.EvolveInventory_RefNumberNew,
                        'EvolveInventoryTransHistory_QtyRequire' : 0,
                        'EvolveInventoryTransHistory_Qty' : 0 - parseFloat(req.body.EvolveInventory_QtyOnHand),
                        'EvolveUom_ID': addInventoryObj.EvolveUom_ID,
                        'EvolveLocation_FromID': addInventoryObj.EvolveLocation_ID,
                        'EvolveLocation_ToID': null,
                        'EvolveReason_ID' : null,
                        'EvolveInventoryTransHistory_InventoryStatus' : addInventoryObj.EvolveInventory_Status,
                        'EvolveInventoryTransHistory_PostingStatus' : 'ERPPOSTED',
                        'EvolveInventoryTransHistory_Remark' : null,
                        'EvolveUser_ID' : req.EvolveUser_ID
                    };

                    let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data)
                    if(add_history instanceof Error || add_history.rowsAffected < 1)
                    {
                        Evolve.Log.error(" EERR0989: Error while add inventory history ");
                        Evolve.Log.error(addInventory.message);
                    }
                    else
                    {
                        let getTransType_ID = await  Evolve.App.Services.Common.SrvCommon.getTransTypeID('RCPT-SP-PLT');
                        if(getTransType_ID instanceof Error || getTransType_ID.rowAffected < 1)
                        {
                            let obj = { statusCode: 400, status: "fail", message: "Transaction type not found", result: null };
                            res.send(obj);
                        }
                        else
                        {
                            addInventoryObj.EvolveInventory_RefNumberOld = addInventoryObj.EvolveInventory_RefNumber
                            addInventoryObj.EvolveInventory_RefNumber = addInventoryObj.EvolveInventory_RefNumberNew
                            addInventoryObj.EvolveInventory_QtyOnHandOld = addInventoryObj.EvolveInventory_QtyOnHand
                            addInventoryObj.EvolveInventory_QtyOnHand = req.body.EvolveInventory_QtyOnHand;
                            addInventoryObj.EvolveUser_ID = req.EvolveUser_ID
                            addInventoryObj.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                            let addInventory = await Evolve.App.Services.Wms.splitPallet.SrvIndex.addInventory(addInventoryObj);
                            if(addInventory instanceof Error || addInventory.rowsAffected < 1)
                            {
                                Evolve.Log.error(" EERR0990: Error while add inventory");
                                Evolve.Log.error(addInventory.message);
                            }
                            else
                            {
                                let history_Data = {
                                    'EvolveCompany_ID': addInventoryObj.EvolveCompany_ID,
                                    'EvolveUnit_ID': addInventoryObj.EvolveUnit_ID,
                                    'EvolveTranstype_code': 'RCPT-SP-PLT',
                                    'EvolveItem_ID': parseInt(addInventoryObj.EvolveItem_ID),
                                    'EvolveInventoryTransHistory_Number' : null,
                                    'EvolveInventoryTransHistory_Line' : null,
                                    'EvolveInventoryTransHistory_LotSerial' : addInventoryObj.EvolveInventory_LotNumber,
                                    'EvolveInventoryTransHistory_RefNumber' : addInventoryObj.EvolveInventory_RefNumber,
                                    'EvolveInventoryTransHistory_FromRefNumber' : null,
                                    'EvolveInventoryTransHistory_QtyRequire' : 0,
                                    'EvolveInventoryTransHistory_Qty' : parseFloat(req.body.EvolveInventory_QtyOnHand),
                                    'EvolveUom_ID': addInventoryObj.EvolveUom_ID,
                                    'EvolveLocation_FromID': addInventoryObj.EvolveLocation_ID,
                                    'EvolveLocation_ToID': null,
                                    'EvolveInventoryTransHistory_InventoryStatus' : addInventoryObj.EvolveInventory_Status,
                                    'EvolveInventoryTransHistory_PostingStatus' : 'ERPPOSTED',
                                    'EvolveUser_ID' : req.EvolveUser_ID
                                };

                                let add_history = await Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data)

                                if (add_history instanceof Error || add_history.rowsAffected < 1) {
                                    Evolve.Log.error(" EERR0991: Error while add transaction history ");
                                    Evolve.Log.error(add_history.message);
                                    let obj = { statusCode: 400, status: "fail", message: "Error while add transaction history", result: null };
                                    res.send(obj);
                                } else {
                                    // console.log("addInventoryObj ",addInventoryObj);
                                    let date = new Date();
                                    let EvolveIO_Data = {
                                        "part" : addInventoryObj.EvolveItem_Code,
                                        "lotserialQty" : 0,
                                        "effDate" : date.getFullYear()+"-"+('0' + (date.getMonth() + 1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2),
                                        "inventoryDetail" : {
                                            'operation': 'text',
                                            "lotserialQty" : req.body.EvolveInventory_QtyOnHand,
                                            "effDate" : date.getFullYear()+"-"+('0' + (date.getMonth() + 1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2),
                                            "nbr" : "text",
                                            "soJob" : "text",
                                            "rmks" : "text",
                                            "siteFrom" : '10-100',
                                            "locFrom" : addInventoryObj.EvolveLocation_Code,
                                            "lotserFrom" : addInventoryObj.EvolveInventory_LotNumber,
                                            "lotrefFrom" : addInventoryObj.EvolveInventory_RefNumberOld,
                                            "siteTo" : '10-100',
                                            "locTo" : addInventoryObj.EvolveLocation_Code,
                                            "lotserTo" : addInventoryObj.EvolveInventory_LotNumber,
                                            "lotrefTo" : addInventoryObj.EvolveInventory_RefNumber,
                                            "yn" : "true",
                                        },
                                    };
                                    let ioData = {
                                        'EvolveIO_Data': EvolveIO_Data,
                                        'EvolveIO_Direction': 0, // 1 Means IN Direction , 0 Means Out Direction
                                        'EvolveIO_Code': 'EVOLVESPLITOB', // EVOLVE SPLIT PALLT OUTBOUND.
                                        'EvolveIO_Data_Formate': 'XML',
                                        'EvolveIO_ERP_Type': 'QAD',
                                        'EvolveIO_Status': 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
                                        'EvolveIO_File_Data': ""
                                    }
                                    let ioDataResponce = await Evolve.App.Services.Wms.splitPallet.SrvIndex.addIOData(ioData);
                                    if (ioDataResponce instanceof Error || ioDataResponce.rowsAffected < 1) 
                                    {
                                        let obj = { statusCode: 400, status: "fail", message: "Error while add data in IO", result: null };
                                        res.send(obj);
                                    }
                                    else
                                    {
                                        let obj = { statusCode: 200, status: "success", message: "Pallet split successfully : "+addInventoryObj.EvolveInventory_RefNumber, result: addInventoryObj.EvolveInventory_RefNumber };
                                        res.send(obj);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0992: Error while splitting pallet "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0992: Error while splitting pallet "+error.message, result: null };
            res.send(obj);
        }
    },

    printPallet: async function (req, res) {
        try {
            let  getInvPalletNumber = await Evolve.App.Services.Wms.splitPallet.SrvIndex.getInvPalletNumber(req.body);
            if(getInvPalletNumber instanceof Error || getInvPalletNumber.rowsAffected < 1)
            {
                let obj = { statusCode: 400, status: "fail", message: "Inventory not found", result: null};
                res.send(obj);
            }
            else
            {
                let palletRefNumber = getInvPalletNumber.recordset[0].EvolveInventory_RefNumber;
                if(Evolve.Config.defaultPrinter)
                {
                    if(Evolve.Config.defaultPrinter == "ZEBRA")
                    {
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
                            Evolve.Fs.writeFile(Evolve.Config.dirPrintLabel + "/" + palletRefNumber + ".txt", ZplData, function (err) 
                            {
                                if (err) 
                                {
                                    Evolve.Log.error(' EERR0993: Error while print pallet label. ')
                                    Evolve.Log.error(err);
                                    let obj = { statusCode: 400, status: "fail", message: "Error while print pallet code.", result: null };
                                    res.send(obj);
                                } 
                                else
                                {
                                    let  updateInventoryPrint = Evolve.App.Services.Wms.splitPallet.SrvIndex.updateInventoryPrint(req.body);
                                    if(updateInventoryPrint instanceof Error || updateInventoryPrint.rowsAffected < 1)
                                    {
                                        let obj = { statusCode: 400, status: "success", message: "Update barcode status failed", result: null };
                                        res.send(obj);
                                    }
                                    else
                                    {
                                        let obj = { statusCode: 200, status: "success", message: palletRefNumber+" printed successfully !", result: null };
                                        res.send(obj);
                                    }
                                }
                            });
                      
                    }
                    else
                    {
                        let obj = { statusCode: 400, status: "fail", message: "Default Printer code not found", result: null };
                        res.send(obj);
                    }
                }
                else
                {
                    let obj = { statusCode: 400, status: "fail", message: "Default Printer configration not found", result: null };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0994: Error while printing pallet "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0994: Error while printing pallet "+error.message, result: null };
            res.send(obj);
        }
    },

}
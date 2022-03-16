'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getItemList: async function (req, res) {
        try {
            let getItemList = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialIn.getItemList();
            let obj = { statusCode: 200, status: "success", message: "Item List", result: getItemList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0140: Error while getting Item list "+error.message);
            let obj = { statusCode: 400, status: "fail", 
                        message: " EERR0140: Error while getting Item list "+error.message,
                        result: null };
            res.send(obj);
        }
    },

    getUomList: async function (req, res) {
        try {
            let getUomList = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialIn.getUomList();
            let obj = { statusCode: 200, status: "success", message: "UOM List", result: getUomList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0141: Error while getting Uom list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0141: Error while getting Uom list "+error.message, result: null };
            res.send(obj);
        }
    },

    getSupplierList: async function (req, res) {
        try {
            let getSupplierList = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialIn.getSupplierList();
            let obj = { statusCode: 200, status: "success", message: "Supplier List", result: getSupplierList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0142: Error while getting Uom list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0142: Error while getting Uom list "+error.message, result: null };
            res.send(obj);
        }
    },

    getDocument: async function (req, res) {
        try {
            let getDocument = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialIn.getDocument();
            let obj = { statusCode: 200, status: "success", message: "Document List", result: getDocument.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0143: Error while getting document "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0143: Error while getting document "+error.message, result: null };
            res.send(obj);
        }
    },

    addGateDataMaterialIn: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveGate_ModuleType = "MATRL";
            if (req.body.image != '') {
                let imageData = req.body.image;
                let extention = imageData.substring("data:image/".length, imageData.indexOf(";base64"));
                let fileName = req.body.EvolveGate_RefNumber + "." + extention;
                req.body.imageName = fileName;
                let base64Data = imageData.replace(/^data:image\/png;base64,/, "");
                base64Data = imageData.replace(/^data:image\/jpeg;base64,/, "");
                Evolve.Fs.writeFile(
                    Evolve.Config.imageUploadPath + fileName,
                    base64Data, "base64", function (err) {
                    if (err) {
                        Evolve.Log.error("Error while save image");
                        // res.json(0);
                    } else {
                        Evolve.Log.info("Image Saved Successfully");
                    }
                }
                );
                req.body.EvolveGate_Image = req.body.imageName;
            }
            else {
                req.body.EvolveGate_Image = "";
            }
            let addGateDataMaterialIn = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialIn.addGateDataMaterialIn(req.body);
            if (addGateDataMaterialIn instanceof Error || addGateDataMaterialIn.rowsAffected < 1) {
                Error.Log.error(addGateDataMaterialIn.message);
                let obj = { statusCode: 400, status: "fail", message: "Error while in material ", result: null };
                res.send(obj);
            }
            else {
                let gateDetailError = false;
                for (let i = 0; i < req.body.EvolveGateDetails_Data.length; i++) {
                    if (gateDetailError == false) {
                        let gateDetailArray = req.body.EvolveGateDetails_Data[i];
                        gateDetailArray.EvolveGate_ID = addGateDataMaterialIn.recordset[0].inserted_id;
                        gateDetailArray.EvolveUser_ID = req.body.EvolveUser_ID;
                        gateDetailArray.EvolveGateDetails_Status = "IN";
                        let addGateDataDetailMaterialIn = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialIn.addGateDataDetailMaterialIn(gateDetailArray);
                        if (addGateDataDetailMaterialIn instanceof Error || addGateDataMaterialIn.rowsAffected < 1) {
                            Evolve.Log.error(addGateDataDetailMaterialIn.message);
                            gateDetailError = true;
                        }
                    }
                }
                if (gateDetailError == false) {
                    let obj = { statusCode: 200, status: "success", message: "Material In Successfully ", result: addGateDataMaterialIn.recordset };
                    res.send(obj);
                    await Evolve.App.Controllers.eGateControl.GateIn.ConMaterialIn.updateEntryGateNumber();
                }
                else {
                    let obj = { statusCode: 400, status: "fail", message: "Error while add material item ", result: addGateDataMaterialIn.recordset };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0144: Error while add Gate Data Material in "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0144: Error while add Gate Data Material in "+error.message, result: null };
            res.send(obj);
        }
    },

    getEntryGateNumber: async function (req, res) {
        try {
            // let getEntryGateNumber = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('gateEntryNumber');
            let barcode;
            let date = new Date();
            let mm = date.getMonth() + 1;
            if (mm < 10) {
              mm = '0' + mm
            }
            let yy = date.getFullYear() + "";
            yy = yy.substring(1);
            yy = yy.substring(1);

          let getEntryGateNumber = await Evolve.App.Services.eGateControl.GateIn.SrvParcelIn.getLastReference();
          

            if (getEntryGateNumber instanceof Error ) {
                let obj = { statusCode: 400, status: "fail", message: "Error While Get Gate Entry number not found ! ", result: null };
                res.send(obj);
            }
            else {
                if (getEntryGateNumber.rowsAffected == 1) {

                   
                    let count = await Evolve.App.Services.eGateControl.GateIn.SrvParcelIn.getIdCount();
                    count = count.recordset[0].count
                    let lastCode = getEntryGateNumber.recordset[0].EvolveGate_RefNumber;
                    lastCode = lastCode.substring(1)
                    lastCode = lastCode.substring(1)
                    console.log("last code >>>>>", lastCode);
                    let num = parseInt(count) + 1;
                    var str = "" + num;
                    var pad = "0000";
                    var codeString = pad.substring(0, pad.length - str.length) + str; //0001
                    barcode = "GN"+mm + yy + codeString;
                  }
                  else {
                    barcode = "GN"+mm + yy + "0001";
          
                  }
                let obj = { statusCode: 200, status: "success", message: "Gate entry number ", result: barcode};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0145: Error while getting Entry Gate Number "+error.message);
        }
    },

    updateEntryGateNumber: async function () {
        try {
            let getExitGateNumber = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('gateEntryNumber');
            var lastExitGateNumber = getExitGateNumber.recordset[0].EvolveUnitConfig_Value;
            var dateObj = new Date();
            var month = dateObj.getMonth() + 1;
            var year = dateObj.getFullYear().toString().substr(-2);
            var newExitGateNumber = ''
            if (lastExitGateNumber.includes(month + "" + year)) {
                var padMonth = "00";
                var newMonth = padMonth.substring(0, padMonth.length - (month.toString()).length) + month;
                var oldCount = (parseInt(lastExitGateNumber.toString().substr(6, 9)) + 1).toString(); // Get Old Incremental Number from Old 
                var pad = "0000";
                var newCount = pad.substring(0, pad.length - oldCount.length) + oldCount; //0001
                newExitGateNumber = 'GN' + newMonth + '' + year + '' + newCount;
            }
            else {
                var padMonth = "00";
                var newMonth = padMonth.substring(0, padMonth.length - (month.toString()).length) + month;
                newExitGateNumber = 'GN' + newMonth + '' + year + '0001';
            }
            let updateExitGateNumber = await Evolve.App.Services.Unit.UnitServices.updateUnitConfigValue('gateEntryNumber', newExitGateNumber);
            Evolve.Log.info("New gate entry number updated :" + newExitGateNumber);

        } catch (error) {
            Evolve.Log.error(" EERR0146: Error while updating Entry Gate Number "+error.message);
        }
    },

    getSupplierPo: async function (req, res) {
        try {
            let getSupplierPo = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialIn.getSupplierPo(req.body.EvolveSupplier_Code);;
            if (getSupplierPo instanceof Error || getSupplierPo.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Supplier Purchase Order Not Found ! ", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 200, status: "success", message: "Supplier Purchase Order ", result: getSupplierPo.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0147: Error while getting supplier Po "+error.message);
        }
    },

    getPoDetails: async function (req, res) {
        try {
            let getPoDetails = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialIn.getPoDetails(req.body.EvolvePurchaseOrder_Number);;
            if (getPoDetails instanceof Error || getPoDetails.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "PO detail not found ! ", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 200, status: "success", message: "Purchase Order detail ", result: getPoDetails.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0148: Error while getting Po Details "+error.message);
        }
    },

    checkEwayBillNo: async function (req, res) {
        try {
            Evolve.Log.info("EWAY Bill No. " + req.body.eWayBillNo);
            // let getDocument = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialIn.getDocument();
            let response = {
                vehicalNo: "GJ13AC2107",
                transporter: "USHA",
                driverName: "Rakesh Patel",
                driverContactNo: "9426180624",
                supplierCode: "CEV001",
            }
            //let obj = {statusCode: 200,status: "success",message: "Document List",result: getDocument.recordset};
            let obj = { statusCode: 200, status: "success", message: "Document List", result: response };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0149: Error while checking E-way Bill No "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0149: Error while checking E-way Bill No "+error.message, result: null };
            res.send(obj);
        }
    },
}

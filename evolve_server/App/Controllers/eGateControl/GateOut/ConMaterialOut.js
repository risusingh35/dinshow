'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getItemList: async function (req, res) {
        try {
            let getItemList = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.getItemList();
            let obj = { statusCode: 200, status: "success", message: "Item List", result: getItemList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0165: Error while getting item list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0165: Error while getting item list "+error.message, result: null };
            res.send(obj);
        }
    },

    getUomList: async function (req, res) {
        try {
            let getUomList = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.getUomList();
            let obj = { statusCode: 200, status: "success", message: "UOM List", result: getUomList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0166: Error while getting Uom list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0166: Error while getting Uom list "+error.message, result: null };
            res.send(obj);
        }
    },

    getGateEntryNumbers: async function (req, res) {
        try {
            let getGateEntryNumbers = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.getGateEntryNumbers();
            let obj = { statusCode: 200, status: "success", message: "Gate entry number list", result: getGateEntryNumbers.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0167: Error while getting gate entry numbers "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0167: Error while getting gate entry numbers "+error.message, result: null };
            res.send(obj);
        }
    },

    getSupplierList: async function (req, res) {
        try {
            let getSupplierList = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.getSupplierList();
            let obj = { statusCode: 200, status: "success", message: "Supplier List", result: getSupplierList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0168: Error while getting supplier list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0168: Error while getting supplier list "+error.message, result: null };
            res.send(obj);
        }
    },

    getDocument: async function (req, res) {
        try {
            let getDocument = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.getDocument();
            let obj = { statusCode: 200, status: "success", message: "Document List", result: getDocument.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0169: Error while getting document "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0169: Error while getting document "+error.message, result: null };
            res.send(obj);
        }
    },

    checkGateEntryNo: async function (req, res) {
        try {
            let checkGateEntryNo = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.checkGateEntryNo(req.body.EvolveGate_PassNumber);
            if (checkGateEntryNo instanceof Error || checkGateEntryNo.recordset < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Invalid Gate entry number scan", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 200, status: "success", message: "Document List", result: checkGateEntryNo.recordset[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0170: Error while checking gate entry no. "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0170: Error while checking gate entry no. "+error.message, result: null };
            res.send(obj);
        }
    },


    addGateDataMaterialOut: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
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
            let gateDetailError = false;
            for (let i = 0; i < req.body.EvolveGateDetails_Data.length; i++) {
                if (gateDetailError == false) {
                    let gateDetailArray = req.body.EvolveGateDetails_Data[i];
                    gateDetailArray.EvolveGate_ID = req.body.EvolveGate_ID;
                    gateDetailArray.EvolveUser_ID = req.body.EvolveUser_ID;
                    gateDetailArray.EvolveGateDetails_Status = "OUT";
                    let addGateDataDetailMaterialIn = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.addGateDataDetailMaterialOut(gateDetailArray);
                    if (addGateDataDetailMaterialIn instanceof Error || addGateDataDetailMaterialIn.rowsAffected < 1) {
                        Evolve.Log.error(addGateDataDetailMaterialIn.message);
                        gateDetailError = true;
                    }
                }
            }
            if (gateDetailError == false) {
                let updateGateDataMaterialOut = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.updateGateDataMaterialOut(req.body);
                if (updateGateDataMaterialOut instanceof Error || updateGateDataMaterialOut.rowsAffected < 1) {
                    let obj = { statusCode: 400, status: "fail", message: "Error while gate material out ", result: null };
                    res.send(obj);
                }
                else {
                    let obj = { statusCode: 200, status: "success", message: "Material Out Successfully ", result: null };
                    res.send(obj);
                }
            }
            else {
                let obj = { statusCode: 400, status: "fail", message: "Error while add material item ", result: null };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0171: Error while adding Gate Data Material Out. "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0171: Error while adding Gate Data Material Out "+error.message, result: null };
            res.send(obj);
        }
    },

    getSupplierInvoice: async function (req, res) {
        try {
            let getSupplierInvoice = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.getSupplierInvoice(req.body.EvolveSupplier_Code);
            if (getSupplierInvoice instanceof Error || getSupplierInvoice.recordset < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Invoice found based on supplier", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 200, status: "success", message: "Invoice Numbers", result: getSupplierInvoice.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0172: Error while getting supplier invoice "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0172: Error while getting supplier invoice "+error.message, result: null };
            res.send(obj);
        }
    },

    getInvoiceLines: async function (req, res) {
        try {
            let getInvoiceLines = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.getInvoiceLines(req.body.EvolveInvoice_Number);
            if (getInvoiceLines instanceof Error || getInvoiceLines.recordset < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Invoice line found based on selected invoice", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 200, status: "success", message: "Invoice Lines", result: getInvoiceLines.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0173: Error while getting Invoice lines "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0173: Error while getting Invoice lines "+error.message, result: null };
            res.send(obj);
        }
    },

    addGateData: async function (req, res) {
        try {
            let getEntryGateNumber = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('gateEntryNumber');
            if (getEntryGateNumber instanceof Error || getEntryGateNumber.rowsAffected < 1) {
                Evolve.Log.error(getEntryGateNumber.message);
                let obj = { statusCode: 400, status: "fail", message: "Gate entry number not found", result: null };
                res.send(obj);
            }
            else {
                req.body.EvolveUser_ID = req.EvolveUser_ID;
                req.body.EvolveGate_RefNumber = getEntryGateNumber.recordset[0].EvolveUnitConfig_Value;
                req.body.EvolveGate_ModuleType = 'MATRL';
                req.body.EvolveGate_Direction = 0;
                req.body.EvolveGate_Weight = 0;
                req.body.EvolveGate_Orgenization = '';
                let addGateData = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.addGateData(req.body);
                if (addGateData instanceof Error || addGateData.recordset < 1) {
                    let obj = { statusCode: 400, status: "fail", message: "Error while add material out", result: null };
                    res.send(obj);
                }
                else {
                    let obj = { statusCode: 200, status: "success", message: "Gate entry number : " + req.body.EvolveGate_RefNumber, result: req.body.EvolveGate_RefNumber };
                    res.send(obj);
                    await Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.updateEntryGateNumber();
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR0174: Error while adding gate data "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0174: Error while adding gate data "+error.message, result: null };
            res.send(obj);
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
            Evolve.Log.error(" EERR0175: Error while updating Entry gate number "+error.message);
        }
    },

    checkInvoiceNumber: async function (req, res) {
        try {
            let checkInvoiceNumber = await Evolve.App.Services.eGateControl.GateOut.SrvMaterialOut.checkInvoiceNumber(req.body.EvolveInvoice_Number);
            if (checkInvoiceNumber instanceof Error || checkInvoiceNumber.recordset < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Invalid Invoice number scan", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 200, status: "success", message: "Invoice List", result: checkInvoiceNumber.recordset[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0170: Error while checking Invoice Number "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0170: Error while checking Invoice Number "+error.message, result: null };
            res.send(obj);
        }
    },


}

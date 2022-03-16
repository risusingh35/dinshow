'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    checkVibrationMachinBarcode: async function (req, res) {
        try {
            let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvVibration.checkVibrationMachinBarcode(req.body.EvolveProdOrdersDetail_Serial);
            if (itemDetail instanceof Error || itemDetail.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error While Get Barcode Details", result: null };
                res.send(obj);
            } else {
                if (Evolve.vibrationMessageStatus.step >= 7) {
                    console.log("Barcode Valid So Send Machine Start Signal")
                    Evolve.vibrationMessageStatus.step = 1;
                    // Brcode is Valid so Send Data to kepware Server.
                    await Evolve.socketClient.emit('vibrationMachineStart', {
                        barcode: req.body.EvolveProdOrdersDetail_Serial
                    });
                    Evolve.vibrationBarcode = req.body.EvolveProdOrdersDetail_Serial;
                    let obj = { statusCode: 200, status: "success", message: "Barcode Item Successfully", result: itemDetail.recordset[0] };
                    res.send(obj);

                } else {
                    if (req.body.Force == 1) {
                        console.log("Barcode Valid So Send Machine Start Signal")
                        Evolve.vibrationMessageStatus.step = 1;
                        // Brcode is Valid so Send Data to kepware Server.

                        await Evolve.socketClient.emit('vibrationMachineStart', {
                            barcode: req.body.EvolveProdOrdersDetail_Serial
                        });

                        Evolve.vibrationBarcode = req.body.EvolveProdOrdersDetail_Serial;
                        let obj = { statusCode: 200, status: "success", message: "Barcode Item Successfully", result: itemDetail.recordset[0] };
                        res.send(obj);
                    } else {
                        let obj = { statusCode: 300, status: "success", message: "Barcode Item Successfully", result: itemDetail.recordset[0] };
                        res.send(obj);
                    }

                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0605: Error while checking vibration machine barcode "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0605: Error while checking vibration machine barcode "+error.message, result: null };
            res.send(obj);
        }
    },

    getVibrationWoList: async function (req, res) {
        try {
            let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvVibration.getVibrationWoList();
            if (woList instanceof Error || woList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: woList.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0606: Error while getting vibration Wo List "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0606: Error while getting vibration Wo List "+error.message, result: null };
            res.send(obj);
        }
    },

    getVibrationCompletedTriggers: async function (req, res) {
        try {
            let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvVibration.getVibrationCompletedTriggers();
            if (woList instanceof Error || woList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: woList.recordset[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0607: Error while getting Vibration Completed triggers "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0607: Error while getting Vibration Completed triggers "+error.message, result: null };
            res.send(obj);
        }
    },



}
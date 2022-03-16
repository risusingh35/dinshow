'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    // Report Dump
    getReportDumpCountList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                .query("SELECT COUNT(epod.EvolveProdOrdersDetail_Serial) AS count FROM EvolveProdOrdersDetail epod JOIN EvolveProdOrders epo ON epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID JOIN EvolveItem ei ON ei.EvolveItem_ID = epo.EvolveItem_ID JOIN EvolveSection es ON es.EvolveSection_ID = epo.EvolveSection_ID WHERE epod.EvolveProdOrdersDetail_Serial = @SerialNo AND ");

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getReportDumpDatatableList: async function (start, length,data) {
        try {
        let reportData = [];
        let serial_data = await Evolve.SqlPool.request()
                .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query("SELECT epod.EvolveProdOrdersDetail_Serial,epo.EvolveProdOrders_Order, epo.EvolveProdOrders_OrderId, ei.EvolveItem_Code, epod.EvolveProdOrdersDetail_Status, es.EvolveSection_Name, epod.EvolveProdOrdersDetail_CreatedAt, epod.EvolveProdOrdersDetail_UpdatedAt FROM EvolveProdOrdersDetail epod JOIN EvolveProdOrders epo ON epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID JOIN EvolveItem ei ON ei.EvolveItem_ID = epo.EvolveItem_ID JOIN EvolveSection es ON es.EvolveSection_ID = epo.EvolveSection_ID WHERE epod.EvolveProdOrdersDetail_Serial = @SerialNo ORDER BY epod.EvolveProdOrdersDetail_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");

            if(serial_data.rowsAffected > 0){
                let serial_main = serial_data.recordset[0];

                //Milling Cycle Start
                let milling_CycleStart = await Evolve.SqlPool.request()
                    .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                    .query("SELECT Evolve_Milling_Cycle_Start FROM EvolveMilling WHERE Evolve_Milling_Barcode = @SerialNo");
                let tempMcycleStart = {};
                if (milling_CycleStart.rowsAffected > 0) {
                    if (milling_CycleStart.recordset[0].Evolve_Milling_Cycle_Start == true) {
                        tempMcycleStart = {
                            "serial_data": serial_main,
                            "validation": "Cycle Start",
                            "process": "Milling",
                            "value": "Started"
                        };
                    } else {
                        tempMcycleStart = {
                            "serial_data": serial_main,
                            "validation": "Cycle Start",
                            "process": "Milling",
                            "value": "Not Started"
                        };
                    }
                } else {
                    tempMcycleStart = {
                        "serial_data": serial_main,
                        "validation": "Cycle Start",
                        "process": "Milling",
                        "value": "-"
                    };
                }
                reportData.push(tempMcycleStart);

                //Milling Cycle Stop
                let milling_CycleStop = await Evolve.SqlPool.request()
                    .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                    .query("SELECT Evolve_Milling_Cycle_Finished FROM EvolveMilling WHERE Evolve_Milling_Barcode = @SerialNo");
                let tempMcycleStop = {};
                if (milling_CycleStop.rowsAffected > 0) {
                    if (milling_CycleStop.recordset[0].Evolve_Milling_Cycle_Finished == true) {
                        tempMcycleStop = {
                            "serial_data": serial_main,
                            "validation": "Cycle Stop",
                            "process": "Milling",
                            "value": "Stopped",

                        };
                    } else {
                        tempMcycleStop = {
                            "serial_data": serial_main,
                            "validation": "Cycle Stop",
                            "process": "Milling",
                            "value": "Not Stopped"
                        };
                    }
                } else {
                    tempMcycleStop = {
                        "serial_data": serial_main,
                        "validation": "Cycle Stop",
                        "process": "Milling",
                        "value": "-"
                    };
                }
                reportData.push(tempMcycleStop);

                //Milling Part Ok

                let milling_Part_Ok = await Evolve.SqlPool.request()
                    .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                    .query("SELECT Evolve_Milling_Cycle_Part_OK FROM EvolveMilling WHERE Evolve_Milling_Barcode = @SerialNo");
                let tempMPart_Ok = {};
                if (milling_Part_Ok.rowsAffected > 0) {
                    if (milling_Part_Ok.recordset[0].Evolve_Milling_Cycle_Part_OK == true) {
                        tempMPart_Ok = {
                            "serial_data": serial_main,
                            "validation": "Part Ok",
                            "process": "Milling",
                            "value": "OK"
                        };
                    } else {
                        tempMPart_Ok = {
                            "serial_data": serial_main,
                            "validation": "Part Ok",
                            "process": "Milling",
                            "value": "Not Ok"
                        };
                    }
                } else {
                    tempMPart_Ok = {
                        "serial_data": serial_main,
                        "validation": "Part Ok",
                        "process": "Milling",
                        "value": "-"
                    };
                }
                reportData.push(tempMPart_Ok);

                // vibration
                // Vibration machine  Started
                let vibrationMachineStart = await Evolve.SqlPool.request()
                    .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                    .query("SELECT EvolveVibration_Machine_Start_VALUE FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @SerialNo");
                let tempvmachinestart = {};
                if (vibrationMachineStart.rowsAffected > 0) {
                    if (vibrationMachineStart.recordset[0].EvolveVibration_Machine_Start_VALUE == true) {
                        tempvmachinestart = {
                            "serial_data": serial_main,
                            "validation": "Machine Start",
                            "process": "Vibration",
                            "value": "Started"
                        };
                    } else {
                        tempvmachinestart = {
                            "serial_data": serial_main,
                            "validation": "Machine Start",
                            "process": "Vibration",
                            "value": "Not Started"
                        };
                    }
                } else {
                    tempvmachinestart = {
                        "serial_data": serial_main,
                        "validation": "Machine Start",
                        "process": "Vibration",
                        "value": "-"
                    };
                }
                reportData.push(tempvmachinestart);

                // vibration Cycle start 
                let vibrationCycleStart = await Evolve.SqlPool.request()
                    .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                    .query("SELECT EvolveVibration_Cycle_Start_VALUE FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @SerialNo");
                let tempvCycleStart = {};
                if (vibrationCycleStart.rowsAffected > 0) {
                    if (vibrationCycleStart.recordset[0].EvolveVibration_Cycle_Start_VALUE == true) {
                        tempvCycleStart = {
                            "serial_data": serial_main,
                            "validation": "Cycle Start",
                            "process": "Vibration",
                            "value": "Started"
                        };
                    } else {
                        tempvCycleStart = {
                            "serial_data": serial_main,
                            "validation": "Cycle Start",
                            "process": "Vibration",
                            "value": "Not Started"
                        };
                    }
                } else {
                    tempvCycleStart = {
                        "serial_data": serial_main,
                        "validation": "Cycle Start",
                        "process": "Vibration",
                        "value": "-"
                    };
                }
                reportData.push(tempvCycleStart);

                // vibration Cycle Stop 
                let vibrationCycleStop = await Evolve.SqlPool.request()
                    .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                    .query("SELECT EvolveVibration_Cycle_Stop_VALUE FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @SerialNo");
                let tempvCycleStop = {};
                if (vibrationCycleStop.rowsAffected > 0) {
                    if (vibrationCycleStop.recordset[0].EvolveVibration_Cycle_Stop_VALUE == true) {
                        tempvCycleStop = {
                            "serial_data": serial_main,
                            "validation": "Cycle Stop",
                            "process": "Vibration",
                            "value": "Stopped"
                        };
                    } else {
                        tempvCycleStop = {
                            "serial_data": serial_main,
                            "validation": "Cycle Stop",
                            "process": "Vibration",
                            "value": "Not Stopped"
                        };
                    }
                } else {
                    tempvCycleStop = {
                        "serial_data": serial_main,
                        "validation": "Cycle Stop",
                        "process": "Vibration",
                        "value": "-"
                    };
                }
                reportData.push(tempvCycleStop);

                // Vibration Part Oky
                let vibrationPartOk = await Evolve.SqlPool.request()
                    .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                    .query("SELECT EvolveVibration_Part_Ok_VALUE FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @SerialNo");
                let tempvPartOk = {};
                if (vibrationPartOk.rowsAffected > 0) {
                    if (vibrationPartOk.recordset[0].EvolveVibration_Part_Ok_VALUE == true) {
                        tempvPartOk = {
                            "serial_data": serial_main,
                            "validation": "Part Ok",
                            "process": "Vibration",
                            "value": "OK"
                        };
                    } else {
                        tempvPartOk = {
                            "serial_data": serial_main,
                            "validation": "Part Ok",
                            "process": "Vibration",
                            "value": "Not Ok"
                        };
                    }
                } else {
                    tempvPartOk = {
                        "serial_data": serial_main,
                        "validation": "Part Ok",
                        "process": "Vibration",
                        "value": "-"
                    };
                }
                reportData.push(tempvPartOk);

                // Vibration machine  Stop
                let vibrationMachineStop = await Evolve.SqlPool.request()
                    .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                    .query("SELECT EvolveVibration_Machine_at_Home_VALUE FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @SerialNo");
                let tempvmachinestop = {};
                if (vibrationMachineStop.rowsAffected > 0) {
                    if (vibrationMachineStop.recordset[0].EvolveVibration_Machine_at_Home_VALUE == true) {
                        tempvmachinestop = {
                            "serial_data": serial_main,
                            "validation": "Machine Stop",
                            "process": "Vibration",
                            "value": "Stopped"
                        };
                    } else {
                        tempvmachinestop = {
                            "serial_data": serial_main,
                            "validation": "Machine Stop",
                            "process": "Vibration",
                            "value": "Not Stopped"
                        };
                    }
                } else {
                    tempvmachinestop = {
                        "serial_data": serial_main,
                        "validation": "Machine Stop",
                        "process": "Vibration",
                        "value": "-"
                    };
                }
                reportData.push(tempvmachinestop);
            }
            return reportData;

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },




}
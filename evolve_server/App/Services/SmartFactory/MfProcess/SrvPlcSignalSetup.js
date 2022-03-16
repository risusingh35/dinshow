'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {


    checkPlcSetupBarcode  : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar,data.EvolveProdOrdersDetail_Serial)
                .query("SELECT * FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial LIKE @EvolveProdOrdersDetail_Serial         AND (EvolveProdOrdersDetail_NxtSeq = 1 or EvolveProdOrdersDetail_NxtSeq = 2) AND EvolveProdOrdersDetail_Status LIKE 'In Process'");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    
    insertMillingDataPlcSetup  : async function (data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('Evolve_Milling_Barcode', Evolve.Sql.NVarChar,data.Evolve_Milling_Barcode)
                .input('Evolve_Milling_Cycle_Start', Evolve.Sql.Int,data.Evolve_Milling_Cycle_Start)
                .input('Evolve_Milling_Cycle_Start_TIMESTAMP', Evolve.Sql.NVarChar, dataTime)
                .input('Evolve_Milling_Cycle_Finished', Evolve.Sql.Int,data.Evolve_Milling_Cycle_Finished)
                .input('Evolve_Milling_Cycle_Finished_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('Evolve_Milling_Cycle_Part_Not_OK', Evolve.Sql.Int,data.Evolve_Milling_Cycle_Part_Not_OK)
                .input('Evolve_Milling_Cycle_Part_Not_OK_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('Evolve_Milling_Cycle_Part_OK', Evolve.Sql.Int,data.Evolve_Milling_Cycle_Part_OK)
                .input('Evolve_Milling_Cycle_Part_OK_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('Evolve_Milling_Cycle_Knife_Test', Evolve.Sql.Int,data.Evolve_Milling_Cycle_Knife_Test)
                .input('Evolve_Milling_Cycle_Knife_Test_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('Evolve_Milling_Cycle_NCK_Alarm', Evolve.Sql.Int,data.Evolve_Milling_Cycle_NCK_Alarm)
                .input('Evolve_Milling_Cycle_NCK_Alarm_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('Evolve_Milling_Cycle_PLC_Feed_stop', Evolve.Sql.Int,data.Evolve_Milling_Cycle_PLC_Feed_stop)
                .input('Evolve_Milling_Cycle_PLC_Feed_stop_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('Evolve_Milling_Cycle_PLC_NC', Evolve.Sql.Int,data.Evolve_Milling_Cycle_PLC_NC)
                .input('Evolve_Milling_Cycle_PLC_NC_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .query("INSERT INTO EvolveMilling (Evolve_Milling_Barcode,Evolve_Milling_Cycle_Start,Evolve_Milling_Cycle_Start_TIMESTAMP,Evolve_Milling_Cycle_Finished,Evolve_Milling_Cycle_Finished_TIMESTAMP,Evolve_Milling_Cycle_Part_Not_OK,Evolve_Milling_Cycle_Part_Not_OK_TIMESTAMP,Evolve_Milling_Cycle_Part_OK,Evolve_Milling_Cycle_Part_OK_TIMESTAMP,Evolve_Milling_Cycle_Knife_Test,Evolve_Milling_Cycle_Knife_Test_TIMESTAMP,Evolve_Milling_Cycle_NCK_Alarm,Evolve_Milling_Cycle_NCK_Alarm_TIMESTAMP,Evolve_Milling_Cycle_PLC_Feed_stop,Evolve_Milling_Cycle_PLC_Feed_stop_TIMESTAMP,Evolve_Milling_Cycle_PLC_NC,Evolve_Milling_Cycle_PLC_NC_TIMESTAMP) VALUES (@Evolve_Milling_Barcode,@Evolve_Milling_Cycle_Start,@Evolve_Milling_Cycle_Start_TIMESTAMP,@Evolve_Milling_Cycle_Finished,@Evolve_Milling_Cycle_Finished_TIMESTAMP,@Evolve_Milling_Cycle_Part_Not_OK,@Evolve_Milling_Cycle_Part_Not_OK_TIMESTAMP,@Evolve_Milling_Cycle_Part_OK,@Evolve_Milling_Cycle_Part_OK_TIMESTAMP,@Evolve_Milling_Cycle_Knife_Test,@Evolve_Milling_Cycle_Knife_Test_TIMESTAMP,@Evolve_Milling_Cycle_NCK_Alarm,@Evolve_Milling_Cycle_NCK_Alarm_TIMESTAMP,@Evolve_Milling_Cycle_PLC_Feed_stop,@Evolve_Milling_Cycle_PLC_Feed_stop_TIMESTAMP,@Evolve_Milling_Cycle_PLC_NC,@Evolve_Milling_Cycle_PLC_NC_TIMESTAMP)");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    updateIpTreshBarcode  : async function (barcode,newSeq,status) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar,barcode)
                .input('EvolveProdOrdersDetail_NxtSeq', Evolve.Sql.Int,newSeq)
                .input('EvolveProdOrdersDetail_Status', Evolve.Sql.NVarChar,status)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = EvolveProdOrdersDetail_NxtSeq ,EvolveProdOrdersDetail_NxtSeq = EvolveProdOrdersDetail_NxtSeq + @EvolveProdOrdersDetail_NxtSeq , EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status WHERE EvolveProdOrdersDetail_Serial LIKE @EvolveProdOrdersDetail_Serial");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    insertVibrationDataPlcSetup  : async function (data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveVibration_K3220_Barcode_VALUE', Evolve.Sql.NVarChar,data.EvolveVibration_K3220_Barcode_VALUE)
                .input('EvolveVibration_Cycle_Start_VALUE', Evolve.Sql.Int,data.EvolveVibration_Cycle_Start_VALUE)
                .input('EvolveVibration_CycleStart_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('EvolveVibration_Cycle_Stop_VALUE', Evolve.Sql.Int,data.EvolveVibration_Cycle_Stop_VALUE)
                .input('EvolveVibration_CycleStop_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('EvolveVibration_Input_Parameter_09_VALUE', Evolve.Sql.Int,data.EvolveVibration_Input_Parameter_09_VALUE)
                .input('EvolveVibration_Input_Parameter_09_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('EvolveVibration_Input_Parameter_10_VALUE', Evolve.Sql.Int,data.EvolveVibration_Input_Parameter_10_VALUE)
                .input('EvolveVibration_Input_Parameter_10_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('EvolveVibration_Input_Parameter_11_VALUE', Evolve.Sql.Int,data.EvolveVibration_Input_Parameter_11_VALUE)
                .input('EvolveVibration_Input_Parameter_11_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('EvolveVibration_Input_Parameter_12_VALUE', Evolve.Sql.Int,data.EvolveVibration_Input_Parameter_12_VALUE)
                .input('EvolveVibration_Input_Parameter_12_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('EvolveVibration_Machine_Start_VALUE', Evolve.Sql.Int,data.EvolveVibration_Machine_Start_VALUE)
                .input('EvolveVibration_Machine_Status_VALUE', Evolve.Sql.Int,data.EvolveVibration_Machine_Status_VALUE)
                .input('EvolveVibration_Machine_at_Home_VALUE', Evolve.Sql.Int,data.EvolveVibration_Machine_at_Home_VALUE)
                .input('EvolveVibration_Machine_at_Home_TIMESTAMP', Evolve.Sql.NVarChar,dataTime)
                .input('EvolveVibration_Part_NOK_VALUE', Evolve.Sql.Int,data.EvolveVibration_Part_NOK_VALUE)
                .input('EvolveVibration_Part_Ok_VALUE', Evolve.Sql.Int,data.EvolveVibration_Part_Ok_VALUE)
                .query("INSERT INTO EvolveVibration (EvolveVibration_K3220_Barcode_VALUE,EvolveVibration_Cycle_Start_VALUE,EvolveVibration_CycleStart_TIMESTAMP,EvolveVibration_Cycle_Stop_VALUE,EvolveVibration_CycleStop_TIMESTAMP,EvolveVibration_Input_Parameter_09_VALUE,EvolveVibration_Input_Parameter_09_TIMESTAMP,EvolveVibration_Input_Parameter_10_VALUE,EvolveVibration_Input_Parameter_10_TIMESTAMP,EvolveVibration_Input_Parameter_11_VALUE,EvolveVibration_Input_Parameter_11_TIMESTAMP,EvolveVibration_Input_Parameter_12_VALUE,EvolveVibration_Input_Parameter_12_TIMESTAMP,EvolveVibration_Machine_Start_VALUE,EvolveVibration_Machine_Status_VALUE,EvolveVibration_Machine_at_Home_VALUE,EvolveVibration_Machine_at_Home_TIMESTAMP,EvolveVibration_Part_NOK_VALUE,EvolveVibration_Part_Ok_VALUE) VALUES(@EvolveVibration_K3220_Barcode_VALUE,@EvolveVibration_Cycle_Start_VALUE,@EvolveVibration_CycleStart_TIMESTAMP,@EvolveVibration_Cycle_Stop_VALUE,@EvolveVibration_CycleStop_TIMESTAMP,@EvolveVibration_Input_Parameter_09_VALUE,@EvolveVibration_Input_Parameter_09_TIMESTAMP,@EvolveVibration_Input_Parameter_10_VALUE,@EvolveVibration_Input_Parameter_10_TIMESTAMP,@EvolveVibration_Input_Parameter_11_VALUE,@EvolveVibration_Input_Parameter_11_TIMESTAMP,@EvolveVibration_Input_Parameter_12_VALUE,@EvolveVibration_Input_Parameter_12_TIMESTAMP,@EvolveVibration_Machine_Start_VALUE,@EvolveVibration_Machine_Status_VALUE,@EvolveVibration_Machine_at_Home_VALUE,@EvolveVibration_Machine_at_Home_TIMESTAMP,@EvolveVibration_Part_NOK_VALUE,@EvolveVibration_Part_Ok_VALUE)");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    updateIpTreshBarcode  : async function (barcode,newSeq,status) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar,barcode)
                .input('EvolveProdOrdersDetail_NxtSeq', Evolve.Sql.Int,newSeq)
                .input('EvolveProdOrdersDetail_Status', Evolve.Sql.NVarChar,status)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = EvolveProdOrdersDetail_NxtSeq ,EvolveProdOrdersDetail_NxtSeq = EvolveProdOrdersDetail_NxtSeq + @EvolveProdOrdersDetail_NxtSeq , EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status WHERE EvolveProdOrdersDetail_Serial LIKE @EvolveProdOrdersDetail_Serial");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    getCompletedWoCount  : async function (barcode) {
        try {
            let getWo_Id =  await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,barcode)
                .query("SELECT EvolveProdOrders_ID FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")

            return await Evolve.SqlPool.request()
                .input('EvolveProdOrders_ID',Evolve.Sql.Int,getWo_Id.recordset[0].EvolveProdOrders_ID)
                .query("SELECT EvolveProdOrders_ID , EvolveProdOrders_Quantity , EvolveProdOrders_Status ,(SELECT COUNT(EvolveProdOrdersDetail_ID) FROM EvolveProdOrdersDetail WHERE (EvolveProdOrdersDetail_Status = 'Completed' OR EvolveProdOrdersDetail_Status = 'Rejected') AND EvolveProdOrders_ID = @EvolveProdOrders_ID) as cmp_qty FROM EvolveProdOrders WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID")
        
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    completeWo  : async function (EvolveProdOrders_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrders_ID',Evolve.Sql.Int,EvolveProdOrders_ID)
                .query("UPDATE EvolveProdOrders SET EvolveProdOrders_Status = 'Completed' WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    








}
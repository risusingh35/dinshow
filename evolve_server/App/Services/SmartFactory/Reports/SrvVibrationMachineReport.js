'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    // vibration Report 
    getVibrationMachineReportCountList: async function (data,search) {
        try {
            let startDate ;
            let endDate ;
            if(data.startDate != '' && data.endDate != '' ){
                
                let dt = data.startDate.split("/")
                let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                dt = data.endDate.split("/")
                let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
            }else{
                startDate = '';
                endDate = '';


            }
            return await Evolve.SqlPool.request()
                .input('startDate', Evolve.Sql.NVarChar, startDate)
                .input('endDate', Evolve.Sql.NVarChar, endDate)
                .input('search', Evolve.Sql.NVarChar, "%"+search+"%")
                .query("SELECT COUNT(ev.EvolveVibration_ID) as count FROM EvolveVibration ev , EvolveItem ei WHERE ev.EvolveVibration_Part_Ok_VALUE = 1 AND cast(ev.EvolveVibration_CycleStart_TIMESTAMP as date) >= @startDate AND cast(ev.EvolveVibration_CycleStop_TIMESTAMP as date) <= @endDate AND ei.EvolveItem_ID IN (SELECT ep.EvolveItem_ID FROM EvolveProdOrdersDetail as eod, EvolveProdOrders as ep WHERE eod.EvolveProdOrders_ID = ep.EvolveProdOrders_ID AND ev.EvolveVibration_K3220_Barcode_VALUE = eod.EvolveProdOrdersDetail_Serial) AND ei.EvolveItem_Code LIKE @search");


            } catch (error) {
                Evolve.Log.error(error.message);
                return new Error(error.message);
            }
    },
    getVibrationMachineReportDatatableList: async function (start,length,data , search) {
    try {
        let startDate ;
        let endDate ;
        if(data.startDate != '' && data.endDate != '' ){
            
            let dt = data.startDate.split("/")
            let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
            startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
            dt = data.endDate.split("/")
            let edt = new Date(dt[2], dt[1] - 1, dt[0]);
            endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
        }else{
            startDate = '';
            endDate = '';


        }
        return await Evolve.SqlPool.request()
            .input('start', Evolve.Sql.Int, start)
            .input('length', Evolve.Sql.Int, length)
            .input('startDate', Evolve.Sql.NVarChar, startDate)
            .input('endDate', Evolve.Sql.NVarChar, endDate)
            .input('search', Evolve.Sql.NVarChar, "%"+search+"%")
            .query("SELECT ev.EvolveVibration_K3220_Barcode_VALUE , ei.EvolveItem_Code , CONVERT(VARCHAR , ei.EvolveItem_Desc) as item_desc,                  ev.EvolveVibration_Input_Parameter_09_VALUE , ev.EvolveVibration_Input_Parameter_10_VALUE , ev.EvolveVibration_Input_Parameter_11_VALUE ,ev.EvolveVibration_Input_Parameter_12_VALUE , ev.EvolveVibration_Part_Ok_VALUE , ev.EvolveVibration_CycleStart_TIMESTAMP ,                     ev.EvolveVibration_CycleStop_TIMESTAMP FROM EvolveVibration ev , EvolveItem ei WHERE ev.EvolveVibration_Part_Ok_VALUE = 1 AND cast(ev.EvolveVibration_CycleStart_TIMESTAMP as date) >= @startDate AND cast(ev.EvolveVibration_CycleStop_TIMESTAMP as date) <= @endDate AND ei.EvolveItem_ID IN (SELECT ep.EvolveItem_ID FROM EvolveProdOrdersDetail as eod, EvolveProdOrders as ep WHERE eod.EvolveProdOrders_ID = ep.EvolveProdOrders_ID                   AND ev.EvolveVibration_K3220_Barcode_VALUE = eod.EvolveProdOrdersDetail_Serial) AND ei.EvolveItem_Code LIKE @search ORDER BY ev.EvolveVibration_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },


}
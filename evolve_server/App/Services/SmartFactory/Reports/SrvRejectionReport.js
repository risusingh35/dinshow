'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    //Rejection Report
    getRejectionReportCountList: async function (data) {
        try {
            let dt = data.startDate.split("/")
            let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
            let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
            dt = data.endDate.split("/")
            let edt = new Date(dt[2], dt[1] - 1, dt[0]);
            let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
            return await Evolve.SqlPool.request()
                .input('startDate', Evolve.Sql.NVarChar, startDate)
                .input('endDate', Evolve.Sql.NVarChar, endDate)
                .query("SELECT  COUNT(epod.EvolveProdOrdersDetail_ID) as count FROM EvolveProdOrdersDetail epod WHERE epod.EvolveProdOrdersDetail_Status = 'Rejected' AND cast(epod.EvolveProdOrdersDetail_UpdatedAt as date) >= FORMAT(getDate(), @startDate) AND cast(epod.EvolveProdOrdersDetail_UpdatedAt as date) <= FORMAT(getDate(), @endDate)");


        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getRejectionReportDatatableList: async function (start, length, data) {
        try {
            let dt = data.startDate.split("/")
            let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
            let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
            dt = data.endDate.split("/")
            let edt = new Date(dt[2], dt[1] - 1, dt[0]);
            let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('startDate', Evolve.Sql.NVarChar, startDate)
                .input('endDate', Evolve.Sql.NVarChar, endDate)
                .query("SELECT epo.EvolveProdOrders_Order , ei.EvolveItem_Code ,epod.EvolveProdOrdersDetail_Serial , epod.EvolveProdOrdersDetail_UpdatedAt,(SELECT ep.Evolveprocess_name FROM EvolveProcessTempSeq epts, EvolveProcess ep WHERE epts.Evolveprocesstemp_seq = epod.EvolveProdOrdersDetail_PrvSeq AND ep.Evolveprocess_id = epts.Evolveprocess_id AND epts.Evolveprocesstemp_id = et.Evolveprocesstemp_id) as 'rejected_seq' FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei, EvolveProcessTemp et WHERE epod.EvolveProdOrdersDetail_Status = 'Rejected' AND cast(epod.EvolveProdOrdersDetail_UpdatedAt as date) >= FORMAT(getDate(), @startDate) AND cast(epod.EvolveProdOrdersDetail_UpdatedAt as date) <= FORMAT(getDate(), @endDate) AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND ei.EvolveProcessTemp_Id = et.EvolveprocessTemp_ID ORDER BY epod.EvolveProdOrdersDetail_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },




}
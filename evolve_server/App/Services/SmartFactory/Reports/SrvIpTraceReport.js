'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getIpTraceReportCountListDateWise: async function (data) {
        try {
            // let dt = data.startDate.split("/")
            // let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
            // let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
            // dt = data.endDate.split("/")
            // let edt = new Date(dt[2], dt[1] - 1, dt[0]);
            // let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
            //console.log("Count ",startDate+" : "+endDate)
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
                .query("SELECT  COUNT(EvolveProdOrdersDetail_ID) as count FROM EvolveProdOrdersDetail WHERE cast(EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getDate(), @startDate) AND cast(EvolveProdOrdersDetail_UpdatedAt as date) <= FORMAT(getDate(), @endDate)");


        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getIpTraceReportDatatableListDateWise: async function (start, length, data) {
        try {
            // let dt = data.startDate.split("/")
            // let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
            // let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
            // dt = data.endDate.split("/")
            // let edt = new Date(dt[2], dt[1] - 1, dt[0]);
            // let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
            // console.log("Count ", startDate + " : " + endDate)
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
                .query("EXEC ipTraceReportDateWise @StartDate = @startDate, @EndDate = @endDate, @start = @start, @length = @length");

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getIpTraceReportCountListSerialWise: async function (data) {
        try {
            
            return await Evolve.SqlPool.request()
                .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                .query("SELECT  COUNT(EvolveProdOrdersDetail_ID) as count FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial = @SerialNo ");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getIpTraceReportDatatableListSerialWise: async function (start, length, data) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                .query("EXEC ipTraceReportSerialWise @SerialNo = @SerialNo, @start = @start, @length = @length");

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },




}
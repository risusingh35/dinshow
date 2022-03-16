'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getSerialChartData: async function (data) {
        try {
            if (data.period == 'day') {
                let dt = data.Date.split("/")
                let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                let TodayDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                console.log('final Date--', TodayDate)
                return await Evolve.SqlPool.request()
                    .input('TodayDate', Evolve.Sql.NVarChar, TodayDate)
                    .query("SELECT COUNT(EvolveProdOrderHistory_ID) AS Completed, (SELECT CONVERT(date, getdate())) as 'Date', (select COUNT(EvolveProdOrderHistory_ID) FROM EvolveProdOrdersHistory WHERE  EvolveProdOrderHistoryType_Code = 'PRODORD' AND EvolveProdOrdersDetails_Status = 'Rejected' AND cast(EvolveProdOrderHistory_UpdatedAt as date) = FORMAT(getDate(), @TodayDate)) as 'Rework' FROM EvolveProdOrdersHistory WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND  EvolveProdOrdersDetails_Status = 'Completed' AND cast(EvolveProdOrderHistory_UpdatedAt as date) = FORMAT(getDate(), @TodayDate)")
            }
            // if (data.period == 'day') {
            //     console.log('data.Date', data.Date)
            //     let dt = data.Date.split("/")
            //     let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
            //     let TodayDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
            //     console.log('final Date--', TodayDate)
            //     return await Evolve.SqlPool.request()
            //         .input('TodayDate', Evolve.Sql.NVarChar, TodayDate)
            //         .query("SELECT COUNT(EvolveProdOrderHistory_ID) AS Completed, FORMAT(EvolveProdOrderHistory_UpdatedAt,'yyy-MM-dd') as 'Date', (select COUNT(EvolveProdOrderHistory_ID) FROM EvolveProdOrdersHistory WHERE  EvolveProdOrderHistoryType_Code = 'PRODORD' AND EvolveProdOrdersDetails_Status = 'Rejected' AND cast(EvolveProdOrderHistory_UpdatedAt as date) = FORMAT(getDate(), @TodayDate)) as 'Rework' FROM EvolveProdOrdersHistory WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND  EvolveProdOrdersDetails_Status = 'Completed' AND cast(EvolveProdOrderHistory_UpdatedAt as date) = FORMAT(getDate(), @TodayDate) group by FORMAT(EvolveProdOrderHistory_UpdatedAt,'yyy-MM-dd'),FORMAT(EvolveProdOrderHistory_UpdatedAt,'yyy')")
            // }
            else if (data.period == 'months') {
                return await Evolve.SqlPool.request()
                    .query("SELECT FORMAT(epoh.EvolveProdOrderHistory_UpdatedAt,'yyy-MM-01') as 'Month', sum(case when epoh.EvolveProdOrdersDetails_Status = 'Completed' then 1 else 0 end) Completed, sum(case when epoh.EvolveProdOrdersDetails_Status = 'Rejected' then 1 else 0 end) Rework FROM EvolveProdOrdersHistory epoh WHERE epoh.EvolveProdOrderHistoryType_Code = 'PRODORD'  group by FORMAT(epoh.EvolveProdOrderHistory_UpdatedAt,'yyy-MM-01'),FORMAT(epoh.EvolveProdOrderHistory_UpdatedAt,'yyy') order by FORMAT(epoh.EvolveProdOrderHistory_UpdatedAt,'yyy') DESC ")
            }
            else if (data.period == 'year') {
                return await Evolve.SqlPool.request()
                    .query("SELECT FORMAT(epoh.EvolveProdOrderHistory_UpdatedAt,'yyy-01-01') as 'Year', sum(case when epoh.EvolveProdOrdersDetails_Status = 'Completed' then 1 else 0 end) Completed, sum(case when epoh.EvolveProdOrdersDetails_Status = 'Rejected' then 1 else 0 end) Rework FROM EvolveProdOrdersHistory epoh WHERE epoh.EvolveProdOrderHistoryType_Code = 'PRODORD'  group by FORMAT(epoh.EvolveProdOrderHistory_UpdatedAt,'yyy-01-01'), FORMAT(epoh.EvolveProdOrderHistory_UpdatedAt,'yyy') order by FORMAT(epoh.EvolveProdOrderHistory_UpdatedAt,'yyy') DESC")
            }
            else if (data.period == 'searchchart') {
                if (data.EvolveItem_ID != '' && data.startDate == '' && data.endDate == '') {
                    return await Evolve.SqlPool.request()
                        .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                        .query("SELECT COUNT(EvolveProdOrderHistory_ID) AS Completed, (SELECT CONVERT(date, getdate())) as 'itemcode', (select COUNT(EvolveProdOrderHistory_ID) FROM EvolveProdOrdersHistory WHERE  EvolveProdOrderHistoryType_Code = 'PRODORD' AND EvolveProdOrdersDetails_Status = 'Rejected' AND EvolveItem_ID = @EvolveItem_ID) as 'Rework' FROM EvolveProdOrdersHistory WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND  EvolveProdOrdersDetails_Status = 'Completed' AND EvolveItem_ID = @EvolveItem_ID")
                }
                else if (data.startDate != '' && data.endDate != '' && data.EvolveItem_ID == '') {
                    let dt = data.startDate.split("/")
                    let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                    let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                    dt = data.endDate.split("/")
                    let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                    let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                    return await Evolve.SqlPool.request()
                        .input('startDate', Evolve.Sql.NVarChar, startDate)
                        .input('endDate', Evolve.Sql.NVarChar, endDate)
                        .query("SELECT COUNT(EvolveProdOrderHistory_ID) AS Completed, (SELECT CONVERT(date, getdate())) as 'itemcode', (select COUNT(EvolveProdOrderHistory_ID) FROM EvolveProdOrdersHistory WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND EvolveProdOrdersDetails_Status = 'Rejected' AND cast(EvolveProdOrderHistory_UpdatedAt as date) >= FORMAT(getDate(), @startDate) AND cast(EvolveProdOrderHistory_UpdatedAt as date) <= FORMAT(getDate(), @endDate)) as 'Rework' FROM EvolveProdOrdersHistory WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND  EvolveProdOrdersDetails_Status = 'Completed' AND cast(EvolveProdOrderHistory_UpdatedAt as date) >= FORMAT(getDate(), @startDate) AND cast(EvolveProdOrderHistory_UpdatedAt as date) <= FORMAT(getDate(), @endDate)")
                }
                else if (data.startDate != '' && data.endDate != '' && data.EvolveItem_ID != '') {
                    let dt = data.startDate.split("/")
                    let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                    let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                    dt = data.endDate.split("/")
                    let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                    let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                    return await Evolve.SqlPool.request()
                        .input('startDate', Evolve.Sql.NVarChar, startDate)
                        .input('endDate', Evolve.Sql.NVarChar, endDate)
                        .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                        .query("SELECT COUNT(EvolveProdOrderHistory_ID) AS Completed, (SELECT CONVERT(date, getdate())) as 'itemcode', (select COUNT(EvolveProdOrderHistory_ID) FROM EvolveProdOrdersHistory WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND EvolveProdOrdersDetails_Status = 'Rejected'  AND EvolveItem_ID = @EvolveItem_ID AND cast(EvolveProdOrderHistory_UpdatedAt as date) >= FORMAT(getDate(), @startDate) AND cast(EvolveProdOrderHistory_UpdatedAt as date) <= FORMAT(getDate(), @endDate)) as 'Rework' FROM EvolveProdOrdersHistory WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND  EvolveProdOrdersDetails_Status = 'Completed' AND cast(EvolveProdOrderHistory_UpdatedAt as date) >= FORMAT(getDate(), @startDate) AND cast(EvolveProdOrderHistory_UpdatedAt as date) <= FORMAT(getDate(), @endDate) AND EvolveItem_ID = @EvolveItem_ID")
                }
                else if (data.startDate == '' && data.endDate == '' && data.EvolveItem_ID == '') {
                    let dt = data.Date.split("/")
                    let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                    let TodayDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                    console.log('final Date--', TodayDate)
                    return await Evolve.SqlPool.request()
                        .input('TodayDate', Evolve.Sql.NVarChar, TodayDate)
                        .query("SELECT COUNT(EvolveProdOrderHistory_ID) AS Completed, (SELECT CONVERT(date, getdate())) as 'itemcode',(select COUNT(EvolveProdOrderHistory_ID) FROM EvolveProdOrdersHistory WHERE  EvolveProdOrderHistoryType_Code = 'PRODORD' AND EvolveProdOrdersDetails_Status = 'Rejected' AND cast(EvolveProdOrderHistory_UpdatedAt as date) = FORMAT(getDate(), @TodayDate)) as 'Rework' FROM EvolveProdOrdersHistory WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND  EvolveProdOrdersDetails_Status = 'Completed' AND cast(EvolveProdOrderHistory_UpdatedAt as date) = FORMAT(getDate(), @TodayDate)")
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR1215: Error while getting Serial chart data "+error.message);
            return new Error(" EERR1215: Error while getting Serial chart data "+error.message);
        }
    },

    // getAllSerial: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query("SELECT EvolveItem_ID, EvolveItem_Code FROM EvolveItem");
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    getAllSerial: async function (search) {
        try {
            let query = "SELECT TOP(20) EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE  '%" + search + "%'";
            return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error(" EERR1216: Error while getting all serial "+error.message);
            return new Error(" EERR1216: Error while getting all serial "+error.message);
        }
    },
    getAllCountData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveProdOrdersDetail_Serial) as totalSerial,(SELECT COUNT(EvolveProdOrders_ID) FROM EvolveProdOrders WHERE EvolveProdOrders_Status = 'Completed') as 'totalWorkOrder', (SELECT COUNT(EvolveDO_ID) FROM EvolveDo WHERE EvolveDO_Status = 'open') as 'openDo', (SELECT COUNT(EvolveInvoice_ID) FROM EvolveInvoice WHERE EvolveInvoice_Status = 'open') as 'openInvoice' FROM EvolveprodOrdersHistory WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND EvolveProdOrdersDetails_Status = 'Completed'");
        } catch (error) {
            Evolve.Log.error(" EERR1217: Error while getting All Count Data "+error.message);
            return new Error(" EERR1217: Error while getting All Count Data "+error.message);
        }
    },
}
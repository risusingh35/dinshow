'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    // DoorAssembly report
    getDoorAssyReportCountList: async function (data) {
        try {
            let  query ="SELECT count(edc.EvolveDCDetailsChild_ID) as count FROM EvolveItem ei , EvolveProdOrders epo , EvolveProdOrdersDetail epod , EvolveDCDetailsChild edc WHERE ei.EvolveItemGroup_ID = @EvolveItemGroup_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID    AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND edc.EvolveProdOrderDetails_ID = epod.EvolveProdOrdersDetail_ID"
            let startDate  = '';
            let endDate  = '';
            if(data.startDate != '' && data.endDate != '' ){
                let dt = data.startDate.split("/")
                let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                dt = data.endDate.split("/")
                let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                query += "AND CONVERT(DATE , epo.EvolveProdOrders_CreatedAt) BETWEEN "+startDate+ " AND "+endDate

            }

            console.log("Count  query <<<<" ,query )
            return await Evolve.SqlPool.request()
                .input('startDate', Evolve.Sql.NVarChar, startDate)
                .input('endDate', Evolve.Sql.NVarChar, endDate)
                .input('EvolveItemGroup_ID', Evolve.Sql.Int, 2)
                .query(query);


        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getDoorAssyReportDatatableList : async function (start, length, data) {
        try {
            let  query ="SELECT ei.EvolveItem_CustPart , ei.EvolveItem_Code , ei.EvolveItem_Desc , epod.EvolveProdOrdersDetail_RefNumber ,    epod.EvolveProdOrdersDetail_InProcess , edc.EvolveDCDetailsChild_Barcode , edc.EvolveDCDetailsChild_CreatedAt , epod.EvolveProdOrdersDetail_UpdatedAt , (SELECT eim.EvolveItem_Unique FROM EvolveItem eim  WHERE eim.EvolveItem_id = edc.EvolveDCDetailsChild_ItemID) as uniqueItem , epo.EvolveProdOrders_OrderId , epo.EvolveProdOrders_Order FROM EvolveItem ei , EvolveProdOrders epo , EvolveProdOrdersDetail epod , EvolveDCDetailsChild edc WHERE ei.EvolveItemGroup_ID = 2 AND epo.EvolveItem_ID = ei.EvolveItem_ID AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND edc.EvolveProdOrderDetails_ID = epod.EvolveProdOrdersDetail_ID" 
            let startDate  = '';
            let endDate  = '';
            if(data.startDate != '' && data.endDate != '' ){
                let dt = data.startDate.split("/")
                let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                dt = data.endDate.split("/")
                let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                query += "AND CONVERT(DATE , epo.EvolveProdOrders_CreatedAt) BETWEEN "+startDate+ " AND "+endDate
            }
            query += " ORDER BY epod.EvolveProdOrdersDetail_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY "

            console.log("data  query <<<<" ,query )

            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('startDate', Evolve.Sql.NVarChar, startDate)
                .input('endDate', Evolve.Sql.NVarChar, endDate)
                .input('EvolveItemGroup_ID', Evolve.Sql.Int, 2)
                .query(query);

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },




}
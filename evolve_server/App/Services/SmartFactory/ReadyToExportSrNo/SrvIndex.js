'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getCompletedWoList: async function () {
        try {
          return await Evolve.SqlPool.request()
          .query("SELECT epo.EvolveProdOrders_ID , epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrders epo , EvolveItem ei WHERE epo.Evolveprodorders_status ='COMPLETED' AND ei.EvolveItem_ID = epo.EvolveItem_ID");
        } catch (error) {
          Evolve.Log.error("EERR2617 : Error while getting Completed Work Order List "+error.message);
          return new Error("EERR2617 : Error while getting Completed Work Order List "+error.message);
        }
      },

      getAllItem: async function () {
        try {
          return await Evolve.SqlPool.request()
          .query("SELECT * FROM EvolveItem");
        } catch (error) {
          Evolve.Log.error("EERR2618 : Error while getting item list "+error.message);
          return new Error("EERR2618 : Error while getting item list "+error.message);
        }
      },

    getReadySerialNumberListCount  : async function (condition) {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT COUNT(epod.EvolveProdOrdersDetail_ID) as count FROM EvolveProdOrdersDetail epod INNER JOIN EvolvePDIHistory eph ON eph.EvolvePDIHistory_ParaValue LIKE epod.EvolveProdOrdersDetail_Serial INNER JOIN EvolveProdOrders epo ON epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = epo.EvolveItem_ID WHERE epod.EvolveProdOrdersDetail_Status = 'COMPLETED' AND epod.EvolveProdOrdersDetail_IsExported = 0 "+condition)
        } catch (error) {
            Evolve.Log.error("EERR2619 : Error while count ready to export serial list "+error.message);
            return new Error("EERR2619 : Error while count ready to export serial list "+error.message);
        }
    },

    getReadySerialNumberList : async function (condition , start, length) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query("SELECT epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_CreatedAt , epod.EvolveProdOrdersDetail_Serial , epo.EvolveProdOrders_Order , ei.EvolveItem_Code , eph.EvolvePDIHistory_CreatedAt FROM EvolveProdOrdersDetail epod INNER JOIN EvolvePDIHistory eph ON eph.EvolvePDIHistory_ParaValue LIKE epod.EvolveProdOrdersDetail_Serial INNER JOIN EvolveProdOrders epo ON epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = epo.EvolveItem_ID WHERE epod.EvolveProdOrdersDetail_Status = 'COMPLETED' AND epod.EvolveProdOrdersDetail_IsExported = 0 "+condition+" ORDER BY epod.EvolveProdOrdersDetail_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error("EERR2620 : Error while getting ready to export serial number list "+error.message);
            return new Error("EERR2620 : Error while getting ready to export serial number list "+error.message);
        }
    },

    exportSerialNumber: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_ID",Evolve.Sql.Int,data.EvolveProdOrdersDetail_ID)
                .input("EvolveProdOrdersDetail_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
                .input("EvolveProdOrdersDetail_UpdatedAt" , Evolve.Sql.NVarChar,dataTime)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_IsExported = 1 , EvolveProdOrdersDetail_UpdatedUser = @EvolveProdOrdersDetail_UpdatedUser ,EvolveProdOrdersDetail_UpdatedAt = @EvolveProdOrdersDetail_UpdatedAt WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID");
        } catch (error) {
            Evolve.Log.error("EERR2621 : Error while export serial number "+error.message);
            return new Error("EERR2621 : Error while export serial number "+error.message);
        }
    },

    exportSerialBulkNumber: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_ID",Evolve.Sql.NVarChar,data.EvolveProdOrdersDetail_ID)
                .input("EvolveProdOrdersDetail_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
                .input("EvolveProdOrdersDetail_UpdatedAt" , Evolve.Sql.NVarChar,dataTime)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_IsExported = 1 , EvolveProdOrdersDetail_UpdatedUser = @EvolveProdOrdersDetail_UpdatedUser ,EvolveProdOrdersDetail_UpdatedAt = @EvolveProdOrdersDetail_UpdatedAt WHERE EvolveProdOrdersDetail_ID IN (select value from string_split(@EvolveProdOrdersDetail_ID,','))");
        } catch (error) {
            Evolve.Log.error("EERR2622 : Error while export bulk serial number "+error.message);
            return new Error("EERR2622 : Error while export bulk serial number "+error.message);
        }
    },
    
}
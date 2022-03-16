'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getFGManufacturingReportCount : async function (search, data) {
        try {
            if (data.searchStartDate != '' && data.searchStartDate != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                return await Evolve.SqlPool.request()
                    .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                    .query("SELECT COUNT(epoh.EvolveProdOrderHistory_ID) as count FROM EvolveProdOrdersHistory epoh WHERE cast(epoh.EvolveProdOrderHistory_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(epoh.EvolveProdOrderHistory_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND (epoh.EvolveItem_Code LIKE @search OR epoh.EvolveProdOrdersDetail_Serial LIKE @search OR epoh.EvolveProcess_Value LIKE @search)");
            }else{
                return await Evolve.SqlPool.request()
                    .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                    .query("SELECT COUNT(epoh.EvolveProdOrderHistory_ID) as count FROM EvolveProdOrdersHistory epoh WHERE epoh.EvolveItem_Code LIKE @search OR epoh.EvolveProdOrdersDetail_Serial LIKE @search OR epoh.EvolveProcess_Value LIKE @search");
            }   
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
      getFGManufacturingReport: async function (start,length,search, data) {
        try {
            console.log("data ==",data)
            if (data.searchStartDate != '' && data.searchStartDate != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                return await Evolve.SqlPool.request()
                .input('start',Evolve.Sql.Int,start)
                .input('length',Evolve.Sql.Int,length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT epoh.*, epo.EvolveProdOrders_Quantity FROM EvolveProdOrdersHistory epoh, EvolveProdOrders epo WHERE epoh.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND cast(epoh.EvolveProdOrderHistory_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(epoh.EvolveProdOrderHistory_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND (epoh.EvolveItem_Code LIKE @search OR epoh.EvolveProdOrdersDetail_Serial LIKE @search OR epoh.EvolveProcess_Value LIKE @search) ORDER BY epoh.EvolveProdOrderHistory_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
            }else{
                return await Evolve.SqlPool.request()
                .input('start',Evolve.Sql.Int,start)
                .input('length',Evolve.Sql.Int,length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT epoh.*, epo.EvolveProdOrders_Quantity FROM EvolveProdOrdersHistory epoh, EvolveProdOrders epo WHERE epoh.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND (epoh.EvolveItem_Code LIKE @search OR epoh.EvolveProdOrdersDetail_Serial LIKE @search OR epoh.EvolveProcess_Value LIKE @search) ORDER BY epoh.EvolveProdOrderHistory_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
            }
           
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting report Data List "+error.message);
            return new Error(" EERR1240: Error while getting report Data List "+error.message);
        }
    },
   

}   
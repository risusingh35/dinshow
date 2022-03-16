'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllProdOrderListCount: async function (search ,  EvolveUnit_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)

            .query('select count (epo.EvolveProdOrders_ID) as count from EvolveProdOrders epo LEFT JOIN EvolveItem ei on epo.EvolveItem_ID = ei.EvolveItem_ID  LEFT JOIN EvolveSection es on es.EvolveSection_ID = epo.EvolveSection_ID LEFT JOIN EvolveMachine em on em.EvolveMachine_ID = epo.EvolveMachine_ID LEFT JOIN EvolveUnit eu on eu.EvolveUnit_ID = epo.EvolveUnit_ID  where epo.EvolveUnit_ID = @EvolveUnit_ID AND  (epo.EvolveProdOrders_OrderNo LIKE @search or ei.EvolveItem_Part LIKE @search or es.EvolveSection_Code LIKE @search or em.EvolveMachine_Code LIKE @search or eu.EvolveUnit_Code LIKE @search )')
            // .query('select count (epo.EvolveProdOrders_ID) as count from EvolveProdOrders epo LEFT JOIN EvolveItem ei on epo.EvolveItem_ID = ei.EvolveItem_ID  LEFT JOIN EvolveSection es on es.EvolveSection_ID = epo.EvolveSection_ID LEFT JOIN EvolveMachine em on em.EvolveMachine_ID = epo.EvolveMachine_ID LEFT JOIN EvolveUnit eu on eu.EvolveUnit_ID = epo.EvolveUnit_ID LEFT JOIN EvolveCustomer ec on ec.EvolveCustomer_ID = epo.EvolveCustomer_ID LEFT JOIN EvolveSalesOrder eso on eso.EvolveSalesOrder_ID = epo.EvolveSalesOrder_ID where (epo.EvolveProdOrders_OrderNo LIKE @search or ei.EvolveItem_Part LIKE @search or es.EvolveSection_Code LIKE @search or em.EvolveMachine_Code LIKE @search or eu.EvolveUnit_Code LIKE @search or ec.EvolveCustomer_Code LIKE @search or eso.EvolveSalesOrder_No LIKE @search)');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get ProdOrder List Count "+error.message);
            return new Error(" EERR####: Error while get ProdOrder List Count "+error.message);
        }
    },

    getAllProdOrderList: async function (start, length ,search , EvolveUnit_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)

                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('  select epo.* , ei.EvolveItem_Part , es.EvolveSection_Code , em.EvolveMachine_Code , eu.EvolveUnit_Code  from EvolveProdOrders epo LEFT JOIN EvolveItem ei on epo.EvolveItem_ID = ei.EvolveItem_ID  LEFT JOIN EvolveSection es on es.EvolveSection_ID = epo.EvolveSection_ID LEFT JOIN EvolveMachine em on em.EvolveMachine_ID = epo.EvolveMachine_ID LEFT JOIN EvolveUnit eu on eu.EvolveUnit_ID = epo.EvolveUnit_ID  where   epo.EvolveUnit_ID=@EvolveUnit_ID AND (epo.EvolveProdOrders_OrderNo LIKE @search or ei.EvolveItem_Part LIKE @search or es.EvolveSection_Code LIKE @search or em.EvolveMachine_Code LIKE @search or eu.EvolveUnit_Code LIKE @search ) ORDER BY epo.EvolveProdOrders_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY')
                // .query('select epo.* , ei.EvolveItem_Part , es.EvolveSection_Code , em.EvolveMachine_Code , eu.EvolveUnit_Code , ec.EvolveCustomer_Code , eso.EvolveSalesOrder_No from EvolveProdOrders epo LEFT JOIN EvolveItem ei on epo.EvolveItem_ID = ei.EvolveItem_ID  LEFT JOIN EvolveSection es on es.EvolveSection_ID = epo.EvolveSection_ID LEFT JOIN EvolveMachine em on em.EvolveMachine_ID = epo.EvolveMachine_ID LEFT JOIN EvolveUnit eu on eu.EvolveUnit_ID = epo.EvolveUnit_ID LEFT JOIN EvolveCustomer ec on ec.EvolveCustomer_ID = epo.EvolveCustomer_ID LEFT JOIN EvolveSalesOrder eso on eso.EvolveSalesOrder_ID = epo.EvolveSalesOrder_ID where (epo.EvolveProdOrders_OrderNo LIKE @search or ei.EvolveItem_Part LIKE @search or es.EvolveSection_Code LIKE @search or em.EvolveMachine_Code LIKE @search or eu.EvolveUnit_Code LIKE @search or ec.EvolveCustomer_Code LIKE @search or eso.EvolveSalesOrder_No LIKE @search ) ORDER BY epo.EvolveProdOrders_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get ProdOrder list "+error.message);
            return new Error(" EERR####: Error while get ProdOrder list "+error.message);
        }
    },

    updateProdOrderStatus : async function (data){
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
                .input('EvolveProdOrders_Status', Evolve.Sql.NVarChar, data.EvolveProdOrders_Status)
                .query('UPDATE EvolveProdOrders SET EvolveProdOrders_Status = @EvolveProdOrders_Status WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID')
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update Status "+error.message);
            return new Error(" EERR####: Error while Update Status "+error.message);
        }
    },


      getWoDetails: async function (EvolveProdOrders_ID) {
        try {
          return await Evolve.SqlPool.request()
            .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
            .query("SELECT  euom.EvolveUom_Uom ,   ei.EvolveItem_Desc1 ,  ei.EvolveItem_Part ,  epo.*   , esec.EvolveSection_Code ,  em.EvolveMachine_Code   FROM EvolveUom euom ,  EvolveItem ei ,    EvolveProdOrders epo  LEFT JOIN  EvolveSection esec ON  epo.EvolveSection_ID  = esec.EvolveSection_ID LEFT JOIN   EvolveMachine em   ON epo.EvolveMachine_ID = em.EvolveMachine_ID WHERE  EvolveProdOrders_ID  = @EvolveProdOrders_ID AND euom.EvolveUom_ID = ei.EvolveUom_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID")
        } catch (error) {
          Evolve.Log.error(" EERR1799: Erorr while getting Wo  Details " + error.message);
          return new Error(" EERR1799: Erorr while getting Wo  Details " + error.message);
        }
      },

      getWoBomDetails: async function (EvolveProdOrders_ID) {
        try {
          return await Evolve.SqlPool.request()
            .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
            .query("SELECt epod.*  ,ei.EvolveItem_Part   ,  ei.EvolveItem_Desc1 , ei.EvolveItem_Desc2   FROM  EvolveProdOrdersDetail epod   ,  EvolveItem ei  WHERE epod.EvolveProdOrders_ID = @EvolveProdOrders_ID AND epod.EvolveItem_ID = ei.EvolveItem_ID")
        } catch (error) {
          Evolve.Log.error(" EERR1799: Erorr while getting Wo  Details " + error.message);
          return new Error(" EERR1799: Erorr while getting Wo  Details " + error.message);
        }
      },

      updateWoStatus : async function (data){
        try {
          return await Evolve.SqlPool.request()
              .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
              .input('EvolveProdOrders_Status', Evolve.Sql.NVarChar, 'Closed')
              .query('UPDATE EvolveProdOrders SET EvolveProdOrders_Status = @EvolveProdOrders_Status WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID')
        } catch (error) {
          Evolve.Log.error(" EERR####: Error while Update Status "+error.message);
          return new Error(" EERR####: Error while Update Status "+error.message);
        }
      },

      getTransHistory : async function (data) {
        try {

          // console
          console.log("data.EvolveProdOrders_OrderNo" , data.EvolveProdOrders_OrderNo)
          console.log("data.EvolveProdOrders_OrderID" , data.EvolveProdOrders_OrderID)
          console.log("data.EvolveTransHistory_Type" , data.EvolveTransHistory_Type)



          return await Evolve.SqlPool.request()
            .input("EvolveProdOrders_OrderNo", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderNo)
            .input("EvolveProdOrders_OrderID", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderID)
            .input("EvolveTransHistory_Type", Evolve.Sql.NVarChar, data.EvolveTransHistory_Type)
            .query(" SELECT * FROM EvolveTransHistory WHERE EvolveProdOrders_OrderNo=@EvolveProdOrders_OrderNo AND EvolveProdOrders_OrderID=@EvolveProdOrders_OrderID AND EvolveTransHistory_Type=@EvolveTransHistory_Type ORDER BY EvolveTransHistory_ID DESC")
        } catch (error) {
          Evolve.Log.error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
          return new Error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
        }
      },

      getPublishedorderDatils : async function (data){
        try {
          return await Evolve.SqlPool.request()
              .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
              .query('SELECT epo.EvolveProdOrders_ID ,  epo.EvolveProdOrders_OrderNo ,  epo.EvolveItem_ID , ei.EvolveItem_Part , ei.EvolveItem_HighSpeedTime , epo.EvolveMachine_ID  , es.EvolveSection_Code , em.EvolveMachine_Code from EvolveProdOrders epo , EvolveSection es , EvolveItem ei , EvolveMachine em where epo.EvolveProdOrders_ID = @EvolveProdOrders_ID AND es.EvolveSection_ID = epo.EvolveSection_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND em.EvolveMachine_ID = epo.EvolveMachine_ID')
        } catch (error) {
          Evolve.Log.error(" EERR####: Error while get pubish order "+error.message);
          return new Error(" EERR####: Error while get pubish order "+error.message);
        }
      },

      addMixingPeramiter : async function (data){
        try {
          let date = new Date();
          let datetime = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
          return await Evolve.SqlPool.request()
              .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
              .input('EvolveProdOrders_OrderNo', Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderNo)
              .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
              .input('EvolveItem_Part', Evolve.Sql.NVarChar, data.EvolveItem_Part)
              .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
              .input('EvolveMachine_Code', Evolve.Sql.NVarChar, data.EvolveMachine_Code)
              .input('EvolveMixingParameter_CreatedAt', Evolve.Sql.NVarChar, datetime)
              .input('EvolveMixingParameter_ProdOrderStartTime', Evolve.Sql.NVarChar, datetime)
              .query('INSERT INTO EvolveMixingParameter ( EvolveProdOrders_ID , EvolveProdOrders_OrderNo , EvolveItem_ID , EvolveItem_Part , EvolveMachine_ID , EvolveMachine_Code , EvolveMixingParameter_CreatedAt , EvolveMixingParameter_ProdOrderStartTime) VALUES (@EvolveProdOrders_ID , @EvolveProdOrders_OrderNo ,@EvolveItem_ID , @EvolveItem_Part ,  @EvolveMachine_ID , @EvolveMachine_Code , @EvolveMixingParameter_CreatedAt , @EvolveMixingParameter_ProdOrderStartTime) ')

        } catch (error) {
          Evolve.Log.error(" EERR####: Error while add  MixingPeramiter "+error.message);
          return new Error(" EERR####: Error while add MixingPeramiter "+error.message);
        }
      },

      updateorderCloseTime : async function (data){
        try {
          let date = new Date();
          let datetime = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
          return await Evolve.SqlPool.request()
              .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
              .input('EvolveMixingParameter_ProdOrderStopTime', Evolve.Sql.NVarChar, datetime)
              .query('UPDATE EvolveMixingParameter SET EvolveMixingParameter_ProdOrderStopTime = @EvolveMixingParameter_ProdOrderStopTime WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID ')

        } catch (error) {
          Evolve.Log.error(" EERR####: Error while Update orderCloseTime "+error.message);
          return new Error(" EERR####: Error while Update orderCloseTime "+error.message);
        }
      },

      getcloseOrderDatils : async function (data){
        try {
          return await Evolve.SqlPool.request()
              .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
              .query('SELECT epo.EvolveProdOrders_ID ,   es.EvolveSection_Code from EvolveProdOrders epo , EvolveSection es where epo.EvolveProdOrders_ID = @EvolveProdOrders_ID AND es.EvolveSection_ID = epo.EvolveSection_ID')
        } catch (error) {
          Evolve.Log.error(" EERR####: Error while get pubish order "+error.message);
          return new Error(" EERR####: Error while get pubish order "+error.message);
        }
      },

      getItemDetail: async function (EvolveItem_ID) {
        try {
          return await Evolve.SqlPool.request()
            .input("EvolveItem_ID", Evolve.Sql.Int, EvolveItem_ID)
            .query("select EvolveItem_Part from EvolveItem where EvolveItem_ID = @EvolveItem_ID")
        } catch (error) {
          Evolve.Log.error(" EERR1799: Erorr while getting Item  Details " + error.message);
          return new Error(" EERR1799: Erorr while getting Item  Details " + error.message);
        }
      },

      getSalesOrderData: async function (data) {
        try {
          console.log(data);
          return await Evolve.SqlPool.request()
            .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
            .query(" select esol.EvolveSalesOrderLine_Number , esol.EvolveSalesOrderLine_ID , eso.EvolveSalesOrder_Number,eso.EvolveSalesOrder_ID from EvolveSalesOrderLine esol left join EvolveSalesOrder eso on   eso.EvolveSalesOrder_ID = esol.EvolveSalesOrder_ID  where EvolveItem_ID = @EvolveItem_ID")
        } catch (error) {
          Evolve.Log.error(" EERR1799: Erorr while getting Sales Order Details " + error.message);
          return new Error(" EERR1799: Erorr while getting Sales Order Details " + error.message);
        }
      },

      getMachineList: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("select EvolveMachine_ID,EvolveMachine_Code from EvolveMachine")
        } catch (error) {
          Evolve.Log.error(" EERR1799: Erorr while getting Machine Details " + error.message);
          return new Error(" EERR1799: Erorr while getting Machine Details " + error.message);
        }
      },

      getToolList: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("select * from EvolveItem")
        } catch (error) {
          Evolve.Log.error(" EERR1799: Erorr while getting Tool Details " + error.message);
          return new Error(" EERR1799: Erorr while getting Tool Details " + error.message);
        }
      },

      getCoreList: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("select * from EvolveItem")
        } catch (error) {
          Evolve.Log.error(" EERR1799: Erorr while getting Core Details " + error.message);
          return new Error(" EERR1799: Erorr while getting Core Details " + error.message);
        }
      },

      getLdpList: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("select * from EvolveItem")
        } catch (error) {
          Evolve.Log.error(" EERR1799: Erorr while getting Ldp Details " + error.message);
          return new Error(" EERR1799: Erorr while getting Ldp Details " + error.message);
        }
      },

      getPaperList: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("select * from EvolveItem")
        } catch (error) {
          Evolve.Log.error(" EERR1799: Erorr while getting Paper Details " + error.message);
          return new Error(" EERR1799: Erorr while getting Paper Details " + error.message);
        }
      },

      updateProOrder: async function (query) {
        try {
          return await Evolve.SqlPool.request()
           
            .query(query)
        } catch (error) {
          Evolve.Log.error(" EERR1799: Erorr while Update ProOrder Details " + error.message);
          return new Error(" EERR1799: Erorr while Update ProOrder Details " + error.message);
        }
      },



}
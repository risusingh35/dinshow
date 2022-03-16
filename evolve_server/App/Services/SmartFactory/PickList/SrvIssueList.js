'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addPickListDetails: async function (id, data) {
        try {
           
          try {
            let date = new Date();
            let dataTime =
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate() +
              " " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds();
            return await Evolve.SqlPool.request()
              .input("EvolvePickListDetail_IssQty", Evolve.Sql.Int, data.Value)
              .input("EvolveUser_ID", Evolve.Sql.Int, id)
              .input("EvolvePickList_ID", Evolve.Sql.Int, data.ID)
              .input("EvolvePickListDetail_CreatedUser", Evolve.Sql.Int, id)
              .input(
                "EvolvePickListDetail_CreatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input("EvolvePickListDetail_UpdateAt", Evolve.Sql.NVarChar, dataTime)
              .input("EvolvePickListDetail_UpdateUser", Evolve.Sql.Int, id)
              .input("EvolveUser_ID", Evolve.Sql.Int, id)
              .query(
                "INSERT INTO EvolvePickListDetail (EvolvePickList_ID, EvolvePickListDetail_IssQty, EvolvePickListDetail_CreatedUser,EvolvePickListDetail_CreatedAt,EvolvePickListDetail_UpdateAt,EvolvePickListDetail_UpdateUser,EvolveUser_ID) VALUES (@EvolvePickList_ID,@EvolvePickListDetail_IssQty,@EvolvePickListDetail_CreatedUser,@EvolvePickListDetail_CreatedAt,@EvolvePickListDetail_UpdateAt,@EvolvePickListDetail_UpdateUser,@EvolveUser_ID)"
              );
          } catch (error) {
            Evolve.Log.error(" EERR1756: Error in adding Pick List Details "+error.message);
            return new Error(" EERR1756: Error in adding Pick List Details "+error.message);
          }
        } catch (error) {
          Evolve.Log.error(" EERR1757: Error while adding Pick List Details "+error.message);
          return new Error(" EERR1757: Error while adding Pick List Details "+error.message);
        }
      },

      updatePickList: async function (totalQuntity, EvolveUser_ID ,EvolvePickList_ID) {
        try {
          let date = new Date();
          let dataTime =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
    
          return await Evolve.SqlPool.request()
            .input("EvolvePickList_UpdateAt", Evolve.Sql.NVarChar, dataTime)
            .input("EvolvePickList_UpdateUser", Evolve.Sql.Int, EvolveUser_ID)
            .input("issueQty", Evolve.Sql.Int, totalQuntity)
            .input("EvolvePickList_ID", Evolve.Sql.Int,EvolvePickList_ID)
    
            .query(
              " UPDATE EvolvePickList SET EvolvePickList_QtyIss = EvolvePickList_QtyIss+ @issueQty WHERE EvolvePickList_ID = @EvolvePickList_ID"
            );
        } catch (error) {
          Evolve.Log.error(" EERR1758: Error while updating Pick List "+error.message);
          return new Error(" EERR1758: Error while updating Pick List "+error.message);
        }
      },

      
  getWorkOrderListIssue: async function () {
    try {
      return await Evolve.SqlPool.request()
        // .input('workCenterId', Evolve.Sql.Int, workCenterId)
        .query(
          "  SELECT epo.EvolveProdOrders_ID , epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrders epo , EvolveItem ei WHERE (epo.Evolveprodorders_status ='INQUEUE' )AND ei.EvolveItem_ID = epo.EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1759: Error while getting Work Order List Issue "+error.message);
      return new Error(" EERR1759: Error while getting Work Order List Issue "+error.message);
    }
  },
  getSalesOrderList: async function () {
    try {
     
      return await Evolve.SqlPool.request().query(
        "SELECT * FROM EvolveSalesOrder WHERE EvolveSalesOrder_Status = 'open'"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1760: Error while getting Sales Order List "+error.message);
      return new Error(" EERR1760: Error while getting Sales Order List "+error.message);
    }
  },
  
  getPickListForIssue: async function (data) {
    try {
     
      let condition = "";
      if (data.EvolveProdOrders_ID != "") {
        condition = "epl.EvolveProdOrders_ID = " + data.EvolveProdOrders_ID;
      } else {
        condition = "epl.EvolveSalesOrder_ID = " + data.EvolveSalesOrder_ID;
      }
      return await Evolve.SqlPool.request().query(
        "SELECT DISTINCT epl.EvolvePickList_Number FROM EvolvePickList epl WHERE " +
        condition
      );
    } catch (error) {
      Evolve.Log.error(" EERR1761: Error while getting Pick List For Issue "+error.message);
      return new Error(" EERR1761: Error while getting Pick List For Issue "+error.message);
    }
  },

  
  getPickListItemForIssue: async function (data) {
    try {
       let condition = "";
      if (data.EvolveProdOrders_ID != "") {
        condition = "epl.EvolveProdOrders_ID = " + data.EvolveProdOrders_ID;
      } else {
        condition = "epl.EvolveSalesOrder_ID = " + data.EvolveSalesOrder_ID;
      }
      return await Evolve.SqlPool.request().query(
        "SELECT epl.EvolvePickList_ID,ei.EvolveItem_Code, ei.EvolveItem_ID , epl.EvolvePickList_QtyReq , epl.EvolvePickList_QtyIss ,epl.EvolvePickList_QtyReturn ,  epl.EvolvePickList_Number  FROM EvolvePickList epl, EvolveItem ei WHERE " +
        condition +
        " AND ei.EvolveItem_ID = epl.EvolveItem_ID"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1762: Error while getting Pick List Item For Issue "+error.message);
      return new Error(" EERR1762: Error while getting Pick List Item For Issue "+error.message);
    }
  },

  getItemLocation: async function (data) {
    try {

      console.log("item id >> " , data.EvolveItem_ID) 
      return await Evolve.SqlPool.request()
        .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
        .query("SELECT ei.*  , el.EvolveLocation_Name FROM EvolveInventory ei , EvolveLocation el WHERE ei.EvolveLocation_ID = el.EvolveLocation_ID AND  ei.EvolveItem_ID =@EvolveItem_ID AND el.EvolveLocation_Code like '%STORES%'");
    } catch (error) {
      Evolve.Log.error(" EERR1763: Error while getting Item Location "+error.message);
      return new Error(" EERR1763: Error while getting Item Location "+error.message);
    }
  },

  
  updateInventory: async function (data) {
    try {

    
      return await Evolve.SqlPool.request()
        .input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
        .input('EvolveInventory_QtyOnHand', Evolve.Sql.NVarChar, data.weight)


        .query("UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = EvolveInventory_QtyOnHand - @EvolveInventory_QtyOnHand WHERE EvolveInventory_ID = @EvolveInventory_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1764: Error while updating Inventory "+error.message);
      return new Error(" EERR1764: Error while updating Inventory "+error.message);
    }
  },

    
  NewgetLicationId: async function (data) {
    try {

    
      return await Evolve.SqlPool.request()
        .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
    
        .query("SELECT EvolveMachine_ID FROM  EvolveProdOrders WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1765: Error while New get Location Id "+error.message);
      return new Error(" EERR1765: Error while New get Location Id "+error.message);
    }
  },

  addInventory: async function (locationId , totalQuntity , EvolveUser_ID , EvolveItem_ID) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();


    
      return await Evolve.SqlPool.request()
        .input('EvolveLocation_ID', Evolve.Sql.Int, locationId)
        .input('EvolveInventory_QtyOnHand', Evolve.Sql.NVarChar, totalQuntity)
        .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
        .input("EvolveInventory_CreatedUser", Evolve.Sql.Int, EvolveUser_ID)
        .input( "EvolveInventory_CreatedAt",Evolve.Sql.NVarChar, datetime)



        .query(" INSERT INTO EvolveInventory (EvolveItem_ID ,EvolveLocation_ID ,EvolveInventory_QtyOnHand ,EvolveInventory_CreatedAt ,EvolveInventory_CreatedUser) VALUES ( @EvolveItem_ID ,@EvolveLocation_ID ,@EvolveInventory_QtyOnHand ,@EvolveInventory_CreatedAt ,@EvolveInventory_CreatedUser)");
    } catch (error) {
      Evolve.Log.error(" EERR1766: Error while adding Inventory "+error.message);
      return new Error(" EERR1766: Error while adding Inventory "+error.message);
    }
  },

  checkQuntity: async function (data) {
    try {

    
      return await Evolve.SqlPool.request()
        .input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
        .input('EvolveInventory_QtyOnHand', Evolve.Sql.NVarChar, data.weight)

    
        .query("SELECT EvolveInventory_QtyOnHand  FROM  EvolveInventory WHERE EvolveInventory_QtyOnHand < @EvolveInventory_QtyOnHand AND EvolveInventory_ID = @EvolveInventory_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1767: Error while checking Quantity "+error.message);
      return new Error(" EERR1767: Error while checking Quantity "+error.message);
    }
  },


}
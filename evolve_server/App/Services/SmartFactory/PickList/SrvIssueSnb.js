'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addPickListDetails: async function (id, data) {
        try {
           
          try {
            let date = new Date();
            let dataTime = date.getFullYear() +"-" +(date.getMonth() + 1) +"-" +date.getDate() +" " +date.getHours() +":" +date.getMinutes() +":" +date.getSeconds();
            return await Evolve.SqlPool.request()
              .input("EvolvePickListDetail_IssQty", Evolve.Sql.Int, data.Value)
              .input("EvolveUser_ID", Evolve.Sql.Int, id)
              .input("EvolvePickList_ID", Evolve.Sql.Int, data.ID)
              .input("EvolvePickListDetail_RefNumber", Evolve.Sql.NVarChar, data.LotNumber)
              .input("EvolvePickListDetail_CreatedUser", Evolve.Sql.Int, id)
              .input("EvolvePickListDetail_CreatedAt",Evolve.Sql.NVarChar,dataTime)
              .input("EvolvePickListDetail_UpdateAt", Evolve.Sql.NVarChar, dataTime)
              .input("EvolvePickListDetail_UpdateUser", Evolve.Sql.Int, id)
              .input("EvolveUser_ID", Evolve.Sql.Int, id)
              .query("INSERT INTO EvolvePickListDetail (EvolvePickList_ID, EvolvePickListDetail_IssQty, EvolvePickListDetail_CreatedUser,EvolvePickListDetail_CreatedAt,EvolvePickListDetail_UpdateAt,EvolvePickListDetail_UpdateUser, EvolvePickListDetail_RefNumber) VALUES (@EvolvePickList_ID,@EvolvePickListDetail_IssQty,@EvolvePickListDetail_CreatedUser,@EvolvePickListDetail_CreatedAt,@EvolvePickListDetail_UpdateAt,@EvolvePickListDetail_UpdateUser, @EvolvePickListDetail_RefNumber)");
          } catch (error) {
            Evolve.Log.error(" EERR1768: Error in adding Pick List Details "+error.message);
            return new Error(" EERR1768: Error in adding Pick List Details "+error.message);
          }
        } catch (error) {
          Evolve.Log.error(" EERR1769: Error while adding Pick List Details "+error.message);
          return new Error(" EERR1769: Error while adding Pick List Details "+error.message);
        }
      },

      updatePickList: async function (id, data) {
        try {
          let date = new Date();
          let dataTime = date.getFullYear() +"-" +(date.getMonth() + 1) +"-" +date.getDate() +" " +date.getHours() +":" +date.getMinutes() +":" +date.getSeconds();
          return await Evolve.SqlPool.request()
            .input("EvolvePickList_UpdateAt", Evolve.Sql.NVarChar, dataTime)
            .input("EvolvePickList_UpdateUser", Evolve.Sql.Int, id)
            .input("issueQty", Evolve.Sql.Int, data.Value)
            .input("EvolvePickList_ID", Evolve.Sql.Int, data.ID)
            .query("UPDATE EvolvePickList SET EvolvePickList_QtyIss = EvolvePickList_QtyIss+ @issueQty WHERE EvolvePickList_ID = @EvolvePickList_ID");
        } catch (error) {
          Evolve.Log.error(" EERR1770: Error while updating Pick List "+error.message);
          return new Error(" EERR1770: Error while updating Pick List "+error.message);
        }
      },

      
  getWorkOrderListIssue: async function () {
    try {
      return await Evolve.SqlPool.request()
        // .input('workCenterId', Evolve.Sql.Int, workCenterId)
        .query(
          "SELECT epo.EvolveProdOrders_ID , epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrders epo , EvolveItem ei WHERE (epo.Evolveprodorders_status ='open' OR epo.Evolveprodorders_status ='started') AND ei.EvolveItem_ID = epo.EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1771: Error while getting Work Order List Issue "+error.message);
      return new Error(" EERR1771: Error while getting Work Order List Issue "+error.message);
    }
  },
  getSalesOrderList: async function () {
    try {
     
      return await Evolve.SqlPool.request().query(
        "SELECT * FROM EvolveSalesOrder WHERE EvolveSalesOrder_Status = 'open'"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1772: Error while getting Sales Order List "+error.message);
      return new Error(" EERR1772: Error while getting Sales Order List "+error.message);
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
      Evolve.Log.error(" EERR1773: Error while getting Pick List For Issue "+error.message);
      return new Error(" EERR1773: Error while getting Pick List For Issue "+error.message);
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
      Evolve.Log.error(" EERR1774: Error while getting Pick List Item For Issue "+error.message);
      return new Error(" EERR1774: Error while getting Pick List Item For Issue "+error.message);
    }
  },

  getPickListDetailsById: async function (EvolvePickList_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolvePickList_ID", Evolve.Sql.Int, EvolvePickList_ID)
        .query("SELECT ei.EvolveItem_Code, epl.* FROM EvolvePickList epl , EvolveItem ei WHERE epl.EvolveItem_ID = ei.EvolveItem_ID AND epl.EvolvePickList_ID = @EvolvePickList_ID");
    } catch (error) {
      Evolve.Log.error("Error while get Pick List by ID "+error.message);
      return new Error("Error while get Pick List by ID "+error.message);
    }
  },
  addIOData: async function (data) {
    try {
      let date = new Date();
      let dataTime = date.getFullYear() +"-" +(date.getMonth() + 1) +"-" +date.getDate() +" " +date.getHours() +":" +date.getMinutes() +":" +date.getSeconds();
      return await Evolve.SqlPool.request()
        .input("EvolveIO_Data",Evolve.Sql.NVarChar,JSON.stringify(data.EvolveIO_Data))
        .input("EvolveIO_File_Data",Evolve.Sql.NVarChar,JSON.stringify(data.EvolveIO_File_Data))
        .input("EvolveIO_File_InTime", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveIO_Data_Formate",Evolve.Sql.NVarChar,data.EvolveIO_Data_Formate)
        .input("EvolveIO_Code", Evolve.Sql.NVarChar, data.EvolveIO_Code)
        .input("EvolveIO_Direction", Evolve.Sql.Bit, data.EvolveIO_Direction)
        .input("EvolveIO_Status", Evolve.Sql.Bit, data.EvolveIO_Status)
        .input("EvolveIO_ERP_Type", Evolve.Sql.NVarChar, data.EvolveIO_ERP_Type)
        .query("INSERT INTO EvolveIO(EvolveIO_Data,EvolveIO_File_Data,EvolveIO_File_InTime,EvolveIO_Data_Formate,EvolveIO_Code,EvolveIO_Direction,EvolveIO_Status,EvolveIO_ERP_Type) VALUES (@EvolveIO_Data,@EvolveIO_File_Data,@EvolveIO_File_InTime,@EvolveIO_Data_Formate,@EvolveIO_Code,@EvolveIO_Direction,@EvolveIO_Status,@EvolveIO_ERP_Type)");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  checkInventoryQty: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.LotNumber)
        .query("SELECT * FROM EvolveInventory WHERE EvolveInventory_LotNumber = @EvolveInventory_LotNumber AND EvolveItem_ID = @EvolveItem_ID");
    } catch (error) {
      Evolve.Log.error("Error while get Pick List by ID "+error.message);
      return new Error("Error while get Pick List by ID "+error.message);
    }
  },
  updateInventoryQty: async function (EvolveInventory_ID, EvolveInventory_QtyAllocated) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveInventory_QtyAllocated", Evolve.Sql.Int, EvolveInventory_QtyAllocated)
        .input("EvolveInventory_ID", Evolve.Sql.Int, EvolveInventory_ID)
        .query("UPDATE EvolveInventory SET EvolveInventory_QtyAllocated = @EvolveInventory_QtyAllocated WHERE EvolveInventory_ID = @EvolveInventory_ID");
    } catch (error) {
      Evolve.Log.error("Error while get Pick List by ID "+error.message);
      return new Error("Error while get Pick List by ID "+error.message);
    }
  },


}
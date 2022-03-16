'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getPickListByWorkOrderCount: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        // .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
        // .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "SELECT COUNT(epl.EvolvePickList_ID) AS count FROM EvolvePickList epl, EvolveItem ei WHERE   epl.EvolveProdOrders_ID =@EvolveProdOrders_ID AND ei.EvolveItem_ID = epl.EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1750: Error while getting Pick List By Work Order Count "+error.message);
      return new Error(" EERR1750: Error while getting Pick List By Work Order Count "+error.message);
    }
  },




  getPickListByWorkOrderDatatableList: async function (start, length, data) {
    try {
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        // .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
        // .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "SELECT epl.EvolvePickList_ID,ei.EvolveItem_Code, epl.EvolvePickList_QtyReq, epl.EvolvePickList_QtyIss,epl.EvolvePickList_Number  FROM EvolvePickList epl, EvolveItem ei WHERE epl.EvolveProdOrders_ID =@EvolveProdOrders_ID AND ei.EvolveItem_ID = epl.EvolveItem_ID order by epl.EvolvePickList_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1751: Error while getting Pick List By Work Order Datatable List "+error.message);
      return new Error(" EERR1751: Error while getting Pick List By Work Order Datatable List "+error.message);
    }
  },

  getWorkCenterList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT EvolveSection_ID,EvolveSection_Name  FROM EvolveSection"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1752: Error while getting Work Center List "+error.message);
      return new Error(" EERR1752: Error while getting Work Center List "+error.message);
    }
  },

  getWorkOrderList: async function () {
    try {

      if (Evolve.Config.project == 'Ganesh') {

        console.log("correct services called >> ")
        return await Evolve.SqlPool.request().query(
          "SELECT epo.EvolveProdOrders_ID , epo.EvolveProdOrders_OrderId , epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrders epo , EvolveItem ei WHERE epo.Evolveprodorders_status ='inqueue' AND ei.EvolveItem_ID = epo.EvolveItem_ID"
        );
      }
      else {
        return await Evolve.SqlPool.request().query(
          "SELECT epo.EvolveProdOrders_ID , epo.EvolveProdOrders_OrderId , epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrders epo , EvolveItem ei WHERE (epo.Evolveprodorders_status ='open' or epo.Evolveprodorders_status ='OPEN') AND ei.EvolveItem_ID = epo.EvolveItem_ID"
        );

      }
    } catch (error) {
      Evolve.Log.error(" EERR1753: Error while getting Work Order List "+error.message);
      return new Error(" EERR1753: Error while getting Work Order List "+error.message);
    }
  },

  getPickListByWorkOrderCountList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        // .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
        // .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "SELECT epl.EvolvePickList_ID,ei.EvolveItem_Code, epl.EvolvePickList_QtyReq, epl.EvolvePickList_QtyIss,epl.EvolvePickList_Number, ei.EvolveItem_ID, epl.EvolvePickList_CreatedAt,(SELECT epo.EvolveProdOrders_Order FROM EvolveProdOrders epo WHERE epo.EvolveItem_ID = ei.EvolveItem_ID AND epo.EvolveProdOrders_ID = @EvolveProdOrders_ID) AS 'EvolveProdOrders_Order' FROM EvolvePickList epl, EvolveItem ei WHERE epl.EvolveProdOrders_ID = @EvolveProdOrders_ID AND ei.EvolveItem_ID = epl.EvolveItem_ID "
        );
    } catch (error) {
      Evolve.Log.error(" EERR1754: Error while getting Pick List By Work Order Count List "+error.message);
      return new Error(" EERR1754: Error while getting Pick List By Work Order Count List "+error.message);
    }
  },

  generatePickList: async function (data) {
    try {
      let dateTime = new Date();
      let dataTime =
        dateTime.getFullYear() +
        "-" +
        (dateTime.getMonth() + 1) +
        "-" +
        dateTime.getDate() +
        " " +
        dateTime.getHours() +
        ":" +
        dateTime.getMinutes() +
        ":" +
        dateTime.getSeconds();
      let EvolveProdOrders = await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query("SELECT * From EvolveProdOrders WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID");
      // console.log("EvolveProdOrders??????? " ,  EvolveProdOrders)


      if (EvolveProdOrders.rowsAffected < 1) 
      {
        // console.log("EvolveProdOrders.rowsAffected < 1")
        return new Error("Error In Production Orders");
      } else {
        let plln = await Evolve.SqlPool.request()
          .query("SELECT TOP(1) EvolvePickList_Number From EvolvePickList ORDER BY EvolvePickList_ID DESC");
        let last_pln = "PL0001";
        if (plln.rowsAffected > 0) {
          last_pln = plln.recordset[0].EvolvePickList_Number;
        }
        let pad = "0000";
        let pl_new = parseInt(last_pln.substr(-4)) + 1; //0002 => 2
        let tmp = "" + pl_new;
        let plcount = pad.substring(0, pad.length - tmp.length) + tmp;

        var dateObj = new Date();
        var month = dateObj.getMonth() + 1; //months from 1-12
        var day = dateObj.getDate();
        var year = dateObj.getFullYear().toString().substr(-2);
        if (month == 10) {
          month = "X";
        } else if (month == 11) {
          month = "Y";
        } else if (month == 12) {
          month = "Z";
        }
        let newdate = day + "" + month + "" + year; //28219
        let EvolvePickList_Number = "PL" + newdate + "" + plcount;
        let child_items = await Evolve.SqlPool.request()
          .input("EvolveItem_ID", Evolve.Sql.Int, EvolveProdOrders.recordset[0].EvolveItem_ID)
          .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders.recordset[0].EvolveProdOrders_ID)
          .query("SELECT EvolveProdOrderBom_CompItem_ID , EvolveProdOrderBom_QtyPer , EvolveProdOrderBom_QtyReq from EvolveProdOrderBom where EvolveProdOrderBom_ParentItem_ID = @EvolveItem_ID AND EvolveProdOrders_ID = @EvolveProdOrders_ID");



        console.log("child items >>  " , child_items.rowsAffected);
          // return child_items;
        // console.log(" child row effected > " , child_items.rowsAffected);
        // console.log("bom reqired> ", EvolveProdOrders.recordset[0])
        if (child_items instanceof Error) 
        {
          return new Error(child_items.message);
        } 
        else if (child_items.rowsAffected < 1 && EvolveProdOrders.recordset[0].EvolveProdOrders_IsBom == true) 
        {
          return new Error("Bom required");
        } 
        else if (child_items.rowsAffected < 1 && EvolveProdOrders.recordset[0].EvolveProdOrders_IsBom == false) 
        {
          // If Production Order Don't have Any Child Item
          return Evolve.SqlPool.request()
            .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
            .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
            .input("EvolveItem_ID", Evolve.Sql.Int, EvolveProdOrders.recordset[0].EvolveItem_ID)
            .input("EvolvePickList_QtyIss", Evolve.Sql.Int, 0)
            .input("EvolvePickList_QtyReq", Evolve.Sql.Int, EvolveProdOrders.recordset[0].EvolveProdOrders_Quantity)
            .input("EvolvePickList_Status", Evolve.Sql.Int, 1)
            .input("EvolvePickList_Number", Evolve.Sql.NVarChar, EvolvePickList_Number)
            .input("EvolvePickList_Type", Evolve.Sql.NVarChar, "PRODORD")
            .input("EvolvePickList_CreatedAt", Evolve.Sql.NVarChar, dataTime)
            .input("EvolvePickList_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
            .input("EvolvePickList_UpdateAt", Evolve.Sql.NVarChar, dataTime)
            .input("EvolvePickList_UpdateUser", Evolve.Sql.Int, data.EvolveUser_ID)
            .query("INSERT INTO EvolvePickList (EvolveProdOrders_ID,EvolveUser_ID,EvolveItem_ID,EvolvePickList_QtyIss,EvolvePickList_QtyReq,EvolvePickList_Status,EvolvePickList_Number,EvolvePickList_Type,EvolvePickList_CreatedAt,EvolvePickList_CreatedUser,EvolvePickList_UpdateAt,EvolvePickList_UpdateUser) VALUES (@EvolveProdOrders_ID,@EvolveUser_ID,@EvolveItem_ID,@EvolvePickList_QtyIss,@EvolvePickList_QtyReq,@EvolvePickList_Status,@EvolvePickList_Number,@EvolvePickList_Type,@EvolvePickList_CreatedAt,@EvolvePickList_CreatedUser,@EvolvePickList_UpdateAt,@EvolvePickList_UpdateUser);");
        } 
        else if (child_items.rowsAffected >= 1 && EvolveProdOrders.recordset[0].EvolveProdOrders_IsBom == true) 
        {
          console.log("I am here....");
          for (let i = 0; i < child_items.recordsets[0].length; i++) 
          {
            let issue_qty = 0;
            await Evolve.SqlPool.request()
              .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
              .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
              .input("EvolveItem_ID", Evolve.Sql.Int, child_items.recordset[i].EvolveProdOrderBom_CompItem_ID)
              .input("EvolvePickList_QtyIss", Evolve.Sql.Int, issue_qty)
              .input("EvolvePickList_QtyReq", Evolve.Sql.Int, child_items.recordset[i].EvolveProdOrderBom_QtyReq)
              .input("EvolvePickList_Status", Evolve.Sql.Int, 1)
              .input("EvolvePickList_Number", Evolve.Sql.NVarChar, EvolvePickList_Number)
              .input("EvolvePickList_CreatedAt", Evolve.Sql.NVarChar, dataTime)
              .input("EvolvePickList_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
              .input("EvolvePickList_UpdateAt", Evolve.Sql.NVarChar, dataTime)
              .input("EvolvePickList_UpdateUser", Evolve.Sql.Int, data.EvolveUser_ID)
              .query("INSERT INTO EvolvePickList (EvolveProdOrders_ID,EvolveUser_ID,EvolveItem_ID,EvolvePickList_QtyIss,EvolvePickList_QtyReq,EvolvePickList_Status,EvolvePickList_Number,EvolvePickList_CreatedAt,EvolvePickList_CreatedUser,EvolvePickList_UpdateAt,EvolvePickList_UpdateUser) VALUES (@EvolveProdOrders_ID,@EvolveUser_ID,@EvolveItem_ID,@EvolvePickList_QtyIss,@EvolvePickList_QtyReq,@EvolvePickList_Status,@EvolvePickList_Number,@EvolvePickList_CreatedAt,@EvolvePickList_CreatedUser,@EvolvePickList_UpdateAt,@EvolvePickList_UpdateUser);");
          }
          console.log("child items >>>> ", child_items)
          return child_items;
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR1755: Error while generating Pick List "+error.message);
      return new Error(" EERR1755: Error while generating Pick List "+error.message);
    }
  },







}
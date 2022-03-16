'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getSalesOrderList: async function () {
        try {
          return await Evolve.SqlPool.request().query(
            "SELECT * FROM EvolveSalesOrder WHERE EvolveSalesOrder_Status = 'open'"
          );
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    
      getPickListBySoNumberCountList: async function (data) {
        try {
          return await Evolve.SqlPool.request()
            .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
            .query(
              "SELECT epl.EvolvePickList_ID,ei.EvolveItem_Code, epl.EvolvePickList_QtyReq, epl.EvolvePickList_QtyIss,epl.EvolvePickList_Number  FROM EvolvePickList epl, EvolveItem ei WHERE epl.EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND ei.EvolveItem_ID = epl.EvolveItem_ID"
            );
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    
      generateSoPickList: async function (data) {
        try {
          let dateTime = new Date();
          let dataTime = dateTime.getFullYear() +"-" +(dateTime.getMonth() + 1) +"-" +dateTime.getDate() +" " +dateTime.getHours() +":" +      dateTime.getMinutes() +":" + dateTime.getSeconds();
          let EvolveProdOrders = await Evolve.SqlPool.request()
            .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
            .query("SELECT * From EvolveSalesOrder WHERE EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND EvolveSalesOrder_Status = 'open'");
          if (EvolveProdOrders.rowsAffected < 1) {
            return new Error("Error In Sales Orders");
          } else {
            let plln = await Evolve.SqlPool.request()
                .query("SELECT TOP 1 EvolvePickList_Number From EvolvePickList ORDER BY EvolvePickList_ID DESC");
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
            let getSoLines = await Evolve.SqlPool.request()
              .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
              .query("SELECT esol.EvolveSalesOrderLine_OrderQty , ei.EvolveItem_id FROM EvolveSalesOrderLine esol INNER JOIN EvolveItem ei ON ei.EvolveItem_Code LIKE esol.EvolveSalesOrderLine_Part WHERE esol.EvolveSalesOrder_ID = @EvolveSalesOrder_ID");
            if (getSoLines instanceof Error || getSoLines.rowsAffected < 1) {
              return new Error("No Sales Order Line Found");
            } else {
                let generateSoPickListError = false;
                for (let i = 0; i < getSoLines.recordset.length; i++) 
                {
                    let issue_qty = 0;
                    let generateSoPickList = await Evolve.SqlPool.request()
                    .input("EvolveSalesOrder_ID",Evolve.Sql.Int,data.EvolveSalesOrder_ID)
                    .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
                    .input("EvolveItem_ID", Evolve.Sql.Int, getSoLines.recordset[i].EvolveItem_id)
                    .input("EvolvePickList_QtyIss", Evolve.Sql.Int, issue_qty)
                    .input("EvolvePickList_QtyReq",Evolve.Sql.Int,getSoLines.recordset[i].EvolveSalesOrderLine_OrderQty)
                    .input("EvolvePickList_Status", Evolve.Sql.Int, 1)
                    .input("EvolvePickList_Number",Evolve.Sql.NVarChar,EvolvePickList_Number)
                    .input("EvolvePickList_Type", Evolve.Sql.NVarChar, "SALESORD")
                    .input("EvolvePickList_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                    .input("EvolvePickList_CreatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
                    .input("EvolvePickList_UpdateAt", Evolve.Sql.NVarChar, dataTime)
                    .input("EvolvePickList_UpdateUser",Evolve.Sql.Int,data.EvolveUser_ID)
                    .query("INSERT INTO EvolvePickList (EvolveSalesOrder_ID,EvolveUser_ID,EvolveItem_ID,EvolvePickList_QtyIss,EvolvePickList_QtyReq,EvolvePickList_Status,EvolvePickList_Number,EvolvePickList_Type,EvolvePickList_CreatedAt,EvolvePickList_CreatedUser,EvolvePickList_UpdateAt,EvolvePickList_UpdateUser) VALUES (@EvolveSalesOrder_ID,@EvolveUser_ID,@EvolveItem_ID,@EvolvePickList_QtyIss,@EvolvePickList_QtyReq,@EvolvePickList_Status,@EvolvePickList_Number,@EvolvePickList_Type,@EvolvePickList_CreatedAt,@EvolvePickList_CreatedUser,@EvolvePickList_UpdateAt,@EvolvePickList_UpdateUser);");
                    if(generateSoPickList instanceof Error || generateSoPickList.rowsAffected < 1)
                    {
                        generateSoPickListError = true;
                    }
                }
                if(generateSoPickListError != false)
                {
                    return new Error("Error While Generate PickList");
                }
            }
          }
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    
      getPickListBySalesOrderCount: async function (data) {
        try {
          return await Evolve.SqlPool.request()
            .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
            .query(
              "SELECT COUNT(epl.EvolvePickList_ID) AS count FROM EvolvePickList epl, EvolveItem ei WHERE   epl.EvolveSalesOrder_ID  = @EvolveSalesOrder_ID  AND ei.EvolveItem_ID = epl.EvolveItem_ID"
            );
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    
      getPickListBySalesOrderDatatableList: async function (start, length, data) {
        try {
          return await Evolve.SqlPool.request()
            .input("start", Evolve.Sql.Int, start)
            .input("length", Evolve.Sql.Int, length)
            .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
            .query(
              "SELECT epl.EvolvePickList_ID,ei.EvolveItem_Code, epl.EvolvePickList_QtyReq, epl.EvolvePickList_QtyIss,epl.EvolvePickList_Number  FROM EvolvePickList epl, EvolveItem ei WHERE epl.EvolveSalesOrder_ID  = @EvolveSalesOrder_ID  AND ei.EvolveItem_ID = epl.EvolveItem_ID order by epl.EvolvePickList_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"
            );
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      }
}
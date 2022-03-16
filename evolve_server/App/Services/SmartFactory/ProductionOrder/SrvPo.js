'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getProductionOrderCountList: async function (data) {
    try {
      let dt = data.startDate.split("/");
      let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
      let startDate =
        sdt.getFullYear() + "-" + (sdt.getMonth() + 1) + "-" + sdt.getDate();
      dt = data.endDate.split("/");
      let edt = new Date(dt[2], dt[1] - 1, dt[0]);
      let endDate =
        edt.getFullYear() + "-" + (edt.getMonth() + 1) + "-" + edt.getDate();
      // console.log("startDate:", startDate)
      // console.log("endDate:", endDate)
      if(data.EvolveProdOrders_OrderId == '')
      {
      return await Evolve.SqlPool.request()
        .input("startDate", Evolve.Sql.NVarChar, startDate)
        .input("endDate", Evolve.Sql.NVarChar, endDate)
        .query(
          "SELECT count(EvolveProdOrders_ID) AS count FROM EvolveProdOrders  WHERE CAST(EvolveProdOrders_CreatedAt as date) >= FORMAT(getdate(), @startDate) AND CAST(EvolveProdOrders_CreatedAt as date) <= FORMAT(getdate(), @endDate) " 
        );
      }
      else
      {
        return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, parseInt(data.EvolveProdOrders_OrderId))

        .query(
          "SELECT count(EvolveProdOrders_ID) AS count FROM EvolveProdOrders  WHERE  EvolveProdOrders_ID =@EvolveProdOrders_ID " 
        );

      }
    } catch (error) {
      Evolve.Log.error(" EERR1868: Error while getting Production Order Count List "+error.message);
      return new Error(" EERR1868: Error while getting Production Order Count List "+error.message);
    }
  },

  getProductionOrderDatatableList: async function (start, length, data) {
    try {

      let dt = data.startDate.split("/");
      let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
      let startDate =
        sdt.getFullYear() + "-" + (sdt.getMonth() + 1) + "-" + sdt.getDate();
      dt = data.endDate.split("/");
      let edt = new Date(dt[2], dt[1] - 1, dt[0]);
      let endDate =
        edt.getFullYear() + "-" + (edt.getMonth() + 1) + "-" + edt.getDate();
      // console.log("startDate:", startDate)
      // console.log("endDate:", endDate)
      if(data.EvolveProdOrders_OrderId == '')
      {
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .input("startDate", Evolve.Sql.NVarChar, startDate)
        .input("endDate", Evolve.Sql.NVarChar, endDate)
        .query(
          "SELECT epo.EvolveProdOrders_ID,epo.EvolveProdOrders_Order , epo.EvolveProdOrders_OrderId,epo.EvolveProdOrders_CreatedAt,ei.EvolveItem_Code , epo.EvolveProdOrders_Quantity , epo.EvolveProdOrders_Status , (SELECT epp.EvolveProdPlan_ProdDate FROM EvolveProdPlan epp WHERE epp.EvolveProdPlan_ID = epo.EvolveProdPlan_ID) as plan_date ,(SELECT epp.EvolveProdPlan_Code FROM EvolveProdPlan epp WHERE epp.EvolveProdPlan_ID = epo.EvolveProdPlan_ID) as plan_code ,(SELECT es.EvolveSection_Name FROM EvolveSection es WHERE  es.EvolveSection_ID = epo.EvolveSection_ID) as section FROM EvolveProdOrders epo , EvolveItem ei   WHERE CAST(epo.EvolveProdOrders_CreatedAt as date) >= FORMAT(getdate(), @startDate) AND CAST(epo.EvolveProdOrders_CreatedAt as date) <= FORMAT(getdate(), @endDate) AND ei.EvolveItem_ID = epo.EvolveItem_ID  ORDER BY epo.EvolveProdOrders_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"
        );
      }
      else
      {
        console.log("entered in else part ");
        console.log("id is >>> " , data.EvolveProdOrders_OrderId) 
        return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
      
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, parseInt(data.EvolveProdOrders_OrderId))

        .query(
          "SELECT epo.EvolveProdOrders_ID,epo.EvolveProdOrders_Order , epo.EvolveProdOrders_OrderId,epo.EvolveProdOrders_CreatedAt,ei.EvolveItem_Code , epo.EvolveProdOrders_Quantity , epo.EvolveProdOrders_Status , (SELECT epp.EvolveProdPlan_ProdDate FROM EvolveProdPlan epp WHERE epp.EvolveProdPlan_ID = epo.EvolveProdPlan_ID) as plan_date ,(SELECT epp.EvolveProdPlan_Code FROM EvolveProdPlan epp WHERE epp.EvolveProdPlan_ID = epo.EvolveProdPlan_ID) as plan_code ,(SELECT es.EvolveSection_Name FROM EvolveSection es WHERE  es.EvolveSection_ID = epo.EvolveSection_ID) as section FROM EvolveProdOrders epo , EvolveItem ei   WHERE  ei.EvolveItem_ID = epo.EvolveItem_ID  AND epo.EvolveProdOrders_ID=@EvolveProdOrders_ID ORDER BY epo.EvolveProdOrders_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"
        );

      }
    } catch (error) {
      Evolve.Log.error(" EERR1869: Error while getting Production Order Datatable List "+error.message);
      return new Error(" EERR1869: Error while getting Production Order Datatable List "+error.message);
    }
  },

  
  checkAllowCreatWo: async function (EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)

        .query(
          "  SELECT EvolveUser_CreatePoAllow  , EvolveUser_PrintAllow FROM EvolveUser WHERE EvolveUser_ID = @EvolveUser_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1870: Error while checking Allow Creat Wo "+error.message);
      return new Error(" EERR1870: Error while checking Allow Creat Wo "+error.message);
    }
  },

  getAllItem: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT EvolveItem_ID , EvolveItem_Code FROM EvolveItem"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1871: Error while getting All Item "+error.message);
      return new Error(" EERR1871: Error while getting All Item "+error.message);
    }
  },

  getItemDescCustPart: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .query(
          "SELECT EvolveItem_CustPart , EvolveItem_Desc FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1872: Error while getting Item Desc Cust Part "+error.message);
      return new Error(" EERR1872: Error while getting Item Desc Cust Part "+error.message);
    }
  },

  printProdOrder: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "SELECT EvolveProdOrdersDetail_Serial FROM EvolveProdOrdersDetail WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1873: Error while printing Prod Order "+error.message);
      return new Error(" EERR1873: Error while printing Prod Order "+error.message);
    }
  },

  printProdOrderSerial: async function (EvolveProdOrdersDetail_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          EvolveProdOrdersDetail_ID
        )
        .query(
          "SELECT epod.EvolveProdOrdersDetail_Serial,epo.EvolveItem_ID,ei.EvolveItem_Code FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_ID =@EvolveProdOrdersDetail_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1874: Error while printing Prod Order Serial "+error.message);
      return new Error(" EERR1874: Error while printing Prod Order Serial "+error.message);
    }
  },


  checkPickListGenerated: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "SELECT count(EvolvePickList_ID) as count FROM EvolvePickList WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1875: Error while checking Pick List Generated "+error.message);
      return new Error(" EERR1875: Error while checking Pick List Generated"+error.message);
    }
  },

  createWorkOrder: async function (data) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      var str = "" + 1;
      var pad = "000";
      var wocount = pad.substring(0, pad.length - str.length) + str; //0001
      var dateObj = new Date();
      var month = dateObj.getMonth() + 1; //months from 1-12
      var day = dateObj.getDate();
      var year = dateObj
        .getFullYear()
        .toString()
        .substr(-2);
      if (month == 10) {
        month = "X";
      } else if (month == 11) {
        month = "Y";
      } else if (month == 12) {
        month = "Z";
      }
      let newdate = ("0" + day).slice(-2) + "" + month + "" + year; //28219
      let wo_nbr = "WO" + newdate + "" + wocount; //WO292190001
      let wo_id = newdate + "" + wocount; //WO292190001
      // let check_wo = await Evolve.SqlPool.request()
      //     .query("SELECT TOP 1 EvolveProdOrders_Order From EvolveProdOrders ORDER BY EvolveProdOrders_ID DESC")
      let check_wo = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue(
        "woNumber"
      );
      if (check_wo.rowsAffected > 0) {
        var last_wo = check_wo.recordset[0].EvolveUnitConfig_Value;
        if (last_wo.indexOf(newdate) > -1) {
          let wo_new = parseInt(last_wo.substr(-4)) + 1; //0002 => 2
          let tmp = "" + wo_new;
          wocount = pad.substring(0, pad.length - tmp.length) + tmp;
          wo_nbr = "WO" + newdate + "" + wocount;
          wo_id = newdate + "" + wocount;
        } else {
          wo_nbr = "WO" + newdate + "" + wocount;
          wo_id = newdate + "" + wocount;
        }
      } else {
        wo_nbr = "WO" + newdate + "" + wocount;
        wo_id = newdate + "" + wocount;
      }

      // let wo_ins = await Evolve.SqlPool.request()
      //     .input('EvolveProdOrders_OrderId', Evolve.Sql.NVarChar, wo_id)
      //     .input('EvolveProdOrders_Order', Evolve.Sql.NVarChar, wo_nbr)
      //     .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
      //     .input('EvolveProdOrders_Status', Evolve.Sql.NVarChar, 'open')
      //     .input('EvolveProdOrders_Quantity', Evolve.Sql.Int, data.EvolveProdOrders_Quantity)
      //     .input('EvolveProdOrders_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
      //     .input('EvolveProdOrders_CreatedAt', Evolve.Sql.NVarChar, dataTime)
      //     .input('EvolveProdOrders_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
      //     .input('EvolveProdOrders_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
      //     .input('EvolveProdPlan_ID', Evolve.Sql.Int, null)
      //     .input('EvolveProdPlanDetail_ID', Evolve.Sql.Int, null)
      //     .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
      //     .query("INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID,EvolveSection_ID) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID,@EvolveSection_ID);select @@IDENTITY AS \'inserted_id\'")
      let wo_ins = await Evolve.SqlPool.request()
        .input("EvolveProdOrders_OrderId", Evolve.Sql.NVarChar, wo_id)
        .input("EvolveProdOrders_Order", Evolve.Sql.NVarChar, wo_nbr)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .input("EvolveProdOrders_Status", Evolve.Sql.NVarChar, "OPEN")
        .input(
          "EvolveProdOrders_Quantity",
          Evolve.Sql.Int,
          data.EvolveProdOrders_Quantity
        )
        .input(
          "EvolveProdOrders_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolveProdOrders_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolveProdOrders_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolveProdOrders_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveProdPlan_ID", Evolve.Sql.Int, null)
        .input("EvolveProdPlanDetail_ID", Evolve.Sql.Int, null)
        .input("EvolveProdOrders_IsBom", Evolve.Sql.Bit, 0)
        .query(
          "INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID,EvolveProdOrders_IsBom) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID,@EvolveProdOrders_IsBom);select @@IDENTITY AS 'inserted_id'"
        );

      let update_wo = await Evolve.App.Services.Unit.UnitServices.updateUnitConfigValue(
        "woNumber",
        wo_nbr
      );
      if (update_wo instanceof Error || update_wo.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: update_wo.message,
          result: null
        };
        res.send(obj);
      } else {
        return wo_ins;
      }
    } catch (error) {
      Evolve.Log.error(" EERR1876: Error while creating Work Order "+error.message);
      return new Error(" EERR1876: Error while creating Work Order "+error.message);
    }
  },

  startWorkOrder: async function (data) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      let wo_data = await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "SELECT epo.EvolveProdOrders_ID  ,  epo.EvolveProdOrders_Quantity , ei.EvolveItem_ID , ei.EvolveItem_Type , ei.EvolveSerial_ID , ei.EvolveProcessTemp_Id , epo.EvolveSection_ID , es.* FROM EvolveProdOrders epo , EvolveItem ei ,  EvolveSerial es WHERE epo.EvolveProdOrders_ID = @EvolveProdOrders_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID  AND es.EvolveSerial_ID = ei.EvolveSerial_ID"
        );
      if (wo_data instanceof Error || wo_data.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: wo_data.message,
          result: null
        };
        res.send(obj);
      } else {
        let get_processTemp = await Evolve.SqlPool.request()
          .input(
            "EvolveProcessTemp_Id",
            Evolve.Sql.Int,
            wo_data.recordset[0].EvolveProcessTemp_Id
          )
          .query(
            "SELECT TOP (1) EvolveProcessTemp_Seq FROM EvolveProcessTempSeq WHERE EvolveProcessTemp_ID = @EvolveProcessTemp_Id ORDER BY EvolveProcessTemp_Seq ASC"
          );
        if (
          get_processTemp instanceof Error ||
          get_processTemp.rowsAffected < 1
        ) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: get_processTemp.message,
            result: null
          };
          res.send(obj);
        } else {
          var seq = get_processTemp.recordset[0].EvolveProcessTemp_Seq;
          var str = "" + wo_data.recordset[0].EvolveSerial_Next;
          var pad = "00000";
          var sr_end = pad.substring(0, pad.length - str.length) + str; //0001
          var dateObj = new Date();
          var month = dateObj.getMonth() + 1; //months from 1-12
          if (month == 10) {
            month = "X";
          } else if (month == 11) {
            month = "Y";
          } else if (month == 12) {
            month = "Z";
          }
          var day = dateObj.getDate();
          var year = dateObj
            .getFullYear()
            .toString()
            .substr(-2);
          let nxt_sr = 0;

          // for get work order no

          let getWorkOrder = await Evolve.SqlPool.request()
            .input(
              "EvolveProdOrders_ID",
              Evolve.Sql.Int,
              data.EvolveProdOrders_ID
            )
            .query(
              "  SELECT EvolveProdOrders_Order  , EvolveItem_ID  FROM EvolveProdOrders WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID"
            );

          let workOrderNo = getWorkOrder.recordset[0].EvolveProdOrders_Order;
          let itemId = getWorkOrder.recordset[0].EvolveItem_ID;
          let getItemCode = await Evolve.SqlPool.request()
            .input("EvolveItem_ID", Evolve.Sql.Int, itemId)
            .query(
              "  SELECT EvolveItem_Code , EvolveProcessTemp_Id FROM EvolveItem WHERE  EvolveItem_ID = @EvolveItem_ID"
            );

          let itemCode = getItemCode.recordset[0].EvolveItem_Code;

          let tempId = wo_data.recordset[0].EvolveProcessTemp_Id;
          for (
            var qty = 1;
            qty <= wo_data.recordset[0].EvolveProdOrders_Quantity;
            qty++
          ) {
            // let newdate = year + "" + month + "" + day; //28219
            let newdate = month + "" + year; //28219
            let sr_nbr =
              wo_data.recordset[0].EvolveSerial_Prefix + newdate + "" + sr_end;
            let add_serialNo = await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrders_ID",
                Evolve.Sql.Int,
                data.EvolveProdOrders_ID
              )
              .input(
                "EvolveProdOrdersDetail_Serial",
                Evolve.Sql.NVarChar,
                sr_nbr
              )
              .input("EvolveProdOrdersDetail_Qty", Evolve.Sql.Int, "1")
              .input("EvolveProdOrdersDetail_PrvSeq", Evolve.Sql.Int, seq)
              .input("EvolveProdOrdersDetail_NxtSeq", Evolve.Sql.Int, seq)
              .input(
                "EvolveProdOrdersDetail_Status",
                Evolve.Sql.NVarChar,
                "In Process"
              )
              .input(
                "EvolveProdOrdersDetail_CreatedUser",
                Evolve.Sql.NVarChar,
                data.EvolveUser_ID
              )
              .input(
                "EvolveProdOrdersDetail_CreatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input(
                "EvolveProdOrdersDetail_UpdatedUser",
                Evolve.Sql.NVarChar,
                data.EvolveUser_ID
              )
              .input(
                "EvolveProdOrdersDetail_UpdatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .query(
                "INSERT INTO EvolveProdOrdersDetail (EvolveProdOrders_ID , EvolveProdOrdersDetail_Serial , EvolveProdOrdersDetail_Qty , EvolveProdOrdersDetail_PrvSeq , EvolveProdOrdersDetail_NxtSeq , EvolveProdOrdersDetail_Status,EvolveProdOrdersDetail_CreatedUser , EvolveProdOrdersDetail_CreatedAt , EvolveProdOrdersDetail_UpdatedUser , EvolveProdOrdersDetail_UpdatedAt) VALUES (@EvolveProdOrders_ID , @EvolveProdOrdersDetail_Serial , @EvolveProdOrdersDetail_Qty , @EvolveProdOrdersDetail_PrvSeq , @EvolveProdOrdersDetail_NxtSeq , @EvolveProdOrdersDetail_Status , @EvolveProdOrdersDetail_CreatedUser , @EvolveProdOrdersDetail_CreatedAt , @EvolveProdOrdersDetail_UpdatedUser , @EvolveProdOrdersDetail_UpdatedAt);select @@IDENTITY AS 'inserted_id'"
              );

            let serialNoId = add_serialNo.recordset[0].inserted_id;
            let historyCodeType = "BARGEN";
            let get_processTemp = await Evolve.SqlPool.request()
              .input(
                "EvolveProcessTemp_Id",
                Evolve.Sql.Int,
                wo_data.recordset[0].EvolveProcessTemp_Id
              )
              .query(
                "SELECT TOP (1) EvolveProcessTemp_Seq  , EvolveProcess_id  FROM EvolveProcessTempSeq WHERE EvolveProcessTemp_ID = @EvolveProcessTemp_Id ORDER BY EvolveProcessTemp_Seq ASC"
              );

            let getMachineid = await Evolve.SqlPool.request()
              .input(
                "EvolveProcess_id",
                Evolve.Sql.Int,
                get_processTemp.recordset[0].EvolveProcess_id
              )
              .query(
                " SELECT TOP (1) EvolveMachine_ID FROM EvolveMachineAssign WHERE EvolveProcess_ID =@EvolveProcess_id "
              );

            let poHistoryBARGEN = await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrders_ID",
                Evolve.Sql.Int,
                data.EvolveProdOrders_ID
              )
              .input(
                "EvolveProdOrdersDetail_Serial",
                Evolve.Sql.NVarChar,
                sr_nbr
              )
              .input("EvolveProdOrders_Order", Evolve.Sql.NVarChar, workOrderNo)
              .input("EvolveProdOrderDetails_ID", Evolve.Sql.Int, serialNoId)
              .input(
                "EvolveProdOrderHistoryType_Code",
                Evolve.Sql.NVarChar,
                historyCodeType
              )
              .input("EvolveItem_ID", Evolve.Sql.Int, itemId)
              .input("EvolveItem_Code", Evolve.Sql.NVarChar, itemCode)
              .input("EvolveProcessTemp_ID", Evolve.Sql.Int, tempId)
              .input(
                "EvolveProcess_ID",
                Evolve.Sql.Int,
                get_processTemp.recordset[0].EvolveProcess_id
              )
              .input(
                "EvolveMachine_id",
                Evolve.Sql.Int,
                getMachineid.recordset[0].EvolveMachine_id
              )

              .input("EvolveProdOrderHistory_NextSeq", Evolve.Sql.Int, seq)
              .input("EvolveProdOrderHistory_PrvSeq", Evolve.Sql.Int, seq)
              .input(
                "EvolveProdOrderHistory_CreatedUser",
                Evolve.Sql.NVarChar,
                data.EvolveUser_ID
              )
              .input(
                "EvolveProdOrderHistory_UpdatedUser",
                Evolve.Sql.NVarChar,
                data.EvolveUser_ID
              )
              .input(
                "EvolveProdOrderHistory_CreatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input(
                "EvolveProdOrderHistory_UpdatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input(
                "EvolveProdOrdersDetails_Status",
                Evolve.Sql.NVarChar,
                "In Process"
              )

              .query(
                "INSERT INTO EvolveProdOrdersHistory (EvolveProdOrders_ID , EvolveProdOrdersDetail_Serial , EvolveProdOrders_Order , EvolveProdOrderDetails_ID , EvolveProdOrderHistoryType_Code , EvolveItem_ID,EvolveItem_Code , EvolveProdOrderHistory_NextSeq , EvolveProdOrderHistory_PrvSeq,EvolveProdOrderHistory_CreatedUser,EvolveProdOrderHistory_UpdatedUser,EvolveProdOrderHistory_CreatedAt,EvolveProdOrderHistory_UpdatedAt,EvolveProdOrdersDetails_Status,EvolveProcessTemp_ID,EvolveProcess_ID,EvolveMachine_id) VALUES (@EvolveProdOrders_ID , @EvolveProdOrdersDetail_Serial , @EvolveProdOrders_Order , @EvolveProdOrderDetails_ID , @EvolveProdOrderHistoryType_Code , @EvolveItem_ID , @EvolveItem_Code  , @EvolveProdOrderHistory_NextSeq , @EvolveProdOrderHistory_PrvSeq,@EvolveProdOrderHistory_CreatedUser,@EvolveProdOrderHistory_UpdatedUser,@EvolveProdOrderHistory_CreatedAt,@EvolveProdOrderHistory_UpdatedAt ,@EvolveProdOrdersDetails_Status,@EvolveProcessTemp_ID,@EvolveProcess_ID,@EvolveMachine_id);select @@IDENTITY AS 'inserted_id'"
              );

            let poHistoryPRODORD = await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrders_ID",
                Evolve.Sql.Int,
                data.EvolveProdOrders_ID
              )
              .input(
                "EvolveProdOrdersDetail_Serial",
                Evolve.Sql.NVarChar,
                sr_nbr
              )
              .input("EvolveProdOrders_Order", Evolve.Sql.NVarChar, workOrderNo)
              .input("EvolveProdOrderDetails_ID", Evolve.Sql.Int, serialNoId)
              .input(
                "EvolveProdOrderHistoryType_Code",
                Evolve.Sql.NVarChar,
                "PRODORD"
              )
              .input("EvolveItem_ID", Evolve.Sql.Int, itemId)
              .input("EvolveItem_Code", Evolve.Sql.NVarChar, itemCode)
              .input("EvolveProcessTemp_ID", Evolve.Sql.Int, tempId)
              .input(
                "EvolveMachine_id",
                Evolve.Sql.Int,
                getMachineid.recordset[0].EvolveMachine_id
              )
              .input(
                "EvolveProcess_ID",
                Evolve.Sql.Int,
                get_processTemp.recordset[0].EvolveProcess_id
              )
              .input("EvolveProdOrderHistory_NextSeq", Evolve.Sql.Int, seq)
              .input("EvolveProdOrderHistory_PrvSeq", Evolve.Sql.Int, seq)
              .input(
                "EvolveProdOrderHistory_CreatedUser",
                Evolve.Sql.NVarChar,
                data.EvolveUser_ID
              )

              .input(
                "EvolveProdOrderHistory_UpdatedUser",
                Evolve.Sql.NVarChar,
                data.EvolveUser_ID
              )

              .input(
                "EvolveProdOrderHistory_CreatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input(
                "EvolveProdOrderHistory_UpdatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input(
                "EvolveProdOrdersDetails_Status",
                Evolve.Sql.NVarChar,
                "In Process"
              )

              .query(
                "INSERT INTO EvolveProdOrdersHistory (EvolveProdOrders_ID , EvolveProdOrdersDetail_Serial , EvolveProdOrders_Order , EvolveProdOrderDetails_ID , EvolveProdOrderHistoryType_Code , EvolveItem_ID,EvolveItem_Code , EvolveProdOrderHistory_NextSeq , EvolveProdOrderHistory_PrvSeq,EvolveProdOrderHistory_CreatedUser,EvolveProdOrderHistory_UpdatedUser,EvolveProdOrderHistory_CreatedAt,EvolveProdOrderHistory_UpdatedAt,EvolveProdOrdersDetails_Status,EvolveProcessTemp_ID,EvolveProcess_ID,EvolveMachine_id) VALUES (@EvolveProdOrders_ID , @EvolveProdOrdersDetail_Serial , @EvolveProdOrders_Order , @EvolveProdOrderDetails_ID , @EvolveProdOrderHistoryType_Code , @EvolveItem_ID , @EvolveItem_Code  , @EvolveProdOrderHistory_NextSeq , @EvolveProdOrderHistory_PrvSeq,@EvolveProdOrderHistory_CreatedUser,@EvolveProdOrderHistory_UpdatedUser,@EvolveProdOrderHistory_CreatedAt,@EvolveProdOrderHistory_UpdatedAt ,@EvolveProdOrdersDetails_Status,@EvolveProcessTemp_ID,@EvolveProcess_ID,@EvolveMachine_id);select @@IDENTITY AS 'inserted_id'"
              );

            nxt_sr = parseInt(sr_end) + 1;
            str = "" + nxt_sr;
            pad = "00000";
            sr_end = pad.substring(0, pad.length - str.length) + str;
          }

          let update_wp = await Evolve.SqlPool.request()
            .input(
              "EvolveProdOrders_ID",
              Evolve.Sql.Int,
              data.EvolveProdOrders_ID
            )
            .input("EvolveProdOrders_Status", Evolve.Sql.NVarChar, "started")
            .query(
              "UPDATE EvolveProdOrders SET EvolveProdOrders_Status = @EvolveProdOrders_Status WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID"
            );

          let update_serial = await Evolve.SqlPool.request()
            .input(
              "EvolveSerial_ID",
              Evolve.Sql.Int,
              wo_data.recordset[0].EvolveSerial_ID
            )
            .input("EvolveSerial_Next", Evolve.Sql.NVarChar, nxt_sr)
            .query(
              "UPDATE EvolveSerial SET EvolveSerial_Next = @EvolveSerial_Next WHERE EvolveSerial_ID = @EvolveSerial_ID"
            );

          return update_serial;
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR1877: Error while starting Work Order "+error.message);
      return new Error(" EERR1877: Error while starting Work Order "+error.message);
    }
  },
  getProdOrdersDetail: async function (EvolveProdOrdersDetail_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          EvolveProdOrdersDetail_ID
        )
        .query(
          "SELECT epod.*,epo.EvolveItem_ID FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_ID =@EvolveProdOrdersDetail_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1878: Error while getting Prod Orders Detail "+error.message);
      return new Error(" EERR1878: Error while getting Prod Orders Detail "+error.message);
    }
  },
  getItemDetails: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, id)
        .query("select * from EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1879: Error while getting Item Details "+error.message);
      return new Error(" EERR1879: Error while getting Item Details "+error.message);
    }
  },

  detailWorkOrder: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "SELECT epd.EvolveProdOrdersDetail_ID , epo.EvolveProdOrders_Order , epd.EvolveProdOrdersDetail_Serial , epd.EvolveProdOrdersDetail_Status , et.EvolveprocessTemp_Name , epd.EvolveProdOrdersDetail_Qty , (SELECT ep.Evolveprocess_name  FROM EvolveProcessTempSeq epts, EvolveProcess ep WHERE epts.Evolveprocesstemp_seq = epd.EvolveProdOrdersDetail_NxtSeq AND ep.Evolveprocess_id=epts.Evolveprocess_id AND           epts.Evolveprocesstemp_id=et.Evolveprocesstemp_id) as 'Current_Sequence_Name' FROM EvolveProdOrdersDetail epd , EvolveProdOrders epo , EvolveItem ei , EvolveProcessTemp et WHERE epd.EvolveProdOrders_ID = @EvolveProdOrders_ID  AND epd.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND ei.EvolveProcessTemp_Id = et.EvolveprocessTemp_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1880: Error in detail Work Order "+error.message);
      return new Error(" EERR1880: Error in detail Work Order "+error.message);
    }
  },

  getWorkOrderData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "SELECT * FROM EvolveProdOrders WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1881: Error while getting Work Order Data "+error.message);
      return new Error(" EERR1881: Error while getting Work Order Data "+error.message);
    }
  },

  getWorkOrderItemData: async function (EvolveItem_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, EvolveItem_ID)
        .query("SELECT * FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1882: Error while getting Work Order Item Data "+error.message);
      return new Error(" EERR1882: Error while getting Work Order Item Data "+error.message);
    }
  },

  countStartedWo: async function (EvolveItem_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, EvolveItem_ID)
        .query(
          "SELECT es.EvolveSerial_WoLimit , COUNT(epo.EvolveProdOrders_ID) as started_Wo  FROM EvolveItem ei                 INNER JOIN EvolveSerial es ON es.EvolveSerial_ID = ei.EvolveSerial_ID LEFT OUTER JOIN EvolveProdOrders epo ON epo.EvolveItem_ID = ei.EvolveItem_ID AND epo.EvolveProdOrders_Status = 'started' WHERE ei.EvolveItem_ID = @EvolveItem_ID GROUP BY es.EvolveSerial_WoLimit"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1883: Error while counting Started Wo "+error.message);
      return new Error(" EERR1883: Error while counting Started Wo "+error.message);
    }
  },

  closeWorkOrder: async function (req, res, id) {
    try {
     console.log("close work order services  called >>>> ")
      let updateProdOrdersDetails = await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, parseInt(id))
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = 'In Completed' where EvolveProdOrders_ID = @EvolveProdOrders_ID AND (EvolveProdOrdersDetail_Status = 'In Process' OR EvolveProdOrdersDetail_Status = 'In Queue')"
        );

      if (
        updateProdOrdersDetails instanceof Error ||
        updateProdOrdersDetails.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: updateProdOrdersDetails.message,
          result: null
        };
        res.send(obj);
      } else {
        return await Evolve.SqlPool.request()
          .input("EvolveProdOrders_ID", Evolve.Sql.Int, parseInt(id))
          .query(
            "update EvolveProdOrders set EvolveProdOrders_Status = 'close' where EvolveProdOrders_ID = @EvolveProdOrders_ID"
          );
      }
    } catch (error) {
      Evolve.Log.error(" EERR1884: Error while closing Work Order "+error.message);
      return new Error(" EERR1884: Error while closing Work Order "+error.message);
    }
  },

  getOpenWorkOrderList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT epo.EvolveProdOrders_ID , epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrders epo , EvolveItem ei WHERE epo.Evolveprodorders_status ='open' AND ei.EvolveItem_ID = epo.EvolveItem_ID"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1885: Error while getting Open Work Order List "+error.message);
      return new Error(" EERR1885: Error while getting Open Work Order List "+error.message);
    }
  },


  getWoPlanningList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
      .input("EvolveProdOrders_ID",Evolve.Sql.Int,data.EvolveProdOrders_ID)
      .query("SELECT epo.EvolveProdOrders_OrderId , epo.EvolveProdOrders_Order , epo.EvolveProdOrders_Quantity ,ei.EvolveItem_ID, ei.EvolveItem_Code , emti.EvolveMachine_ID , em.EvolveMachine_Name , emti.EvolveMachineToItem_Capacity ,( SELECT SUM(epo2.EvolveProdOrders_Quantity) FROM EvolveProdOrders epo2 WHERE epo2.EvolveMachine_ID = em.EvolveMachine_ID  AND (epo2.EvolveProdOrders_Status != 'COMPLETED' OR epo2.EvolveProdOrders_Status != 'CLOSE')) as plan_qty, (SELECT SUM(epod.EvolveProdOrdersDetail_Qty) FROM EvolveProdOrders epo2 , EvolveProdOrdersDetail epod WHERE epo2.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND epo2.EvolveMachine_ID = em.EvolveMachine_ID  AND epo2.EvolveProdOrders_Status = 'STARTED' AND epod.EvolveProdOrdersDetail_Status = 'COMPLETED') as cmp_qty FROM EvolveProdOrders epo INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = epo.EvolveItem_ID INNER JOIN EvolveMachineToItem emti ON emti.EvolveItem_ID = epo.EvolveItem_ID INNER JOIN EvolveMachine em ON em.EvolveMachine_ID = emti.EvolveMachine_ID WHERE epo.EvolveProdOrders_ID = @EvolveProdOrders_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1886: Error while getting Wo Planning List "+error.message);
      return new Error(" EERR1886: Error while getting Wo Planning List "+error.message);
    }
  },

  publishWoPlanning : async function (data) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_OrderId", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderId)
        .input("EvolveProdOrders_Order", Evolve.Sql.NVarChar, data.EvolveProdOrders_Order)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .input("EvolveProdOrders_Status", Evolve.Sql.NVarChar, "INQUEUE")
        .input("EvolveProdOrders_Quantity", Evolve.Sql.Int, data.EvolveProdOrders_Quantity)
        .input("EvolveMachine_ID", Evolve.Sql.Int, data.EvolveMachine_ID)
        .input("EvolveProdOrders_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveProdOrders_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveProdOrders_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveProdOrders_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveProdPlan_ID", Evolve.Sql.Int, null)
        .input("EvolveProdPlanDetail_ID", Evolve.Sql.Int, null)
        .input("EvolveProdOrders_IsBom", Evolve.Sql.Bit, 1 )
        .query("INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveMachine_ID,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID,EvolveProdOrders_IsBom) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveMachine_ID,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID,@EvolveProdOrders_IsBom);select @@IDENTITY AS 'inserted_id'");
    } catch (error) {
      Evolve.Log.error(" EERR1887: Error while publishing Wo Planning "+error.message);
      return new Error(" EERR1887: Error while publishing Wo Planning "+error.message);
    }
  },

  deleteWorkOrder : async function (EvolveProdOrders_ID) {
    try{
      return await Evolve.SqlPool.request()
      .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
      .query("DELETE FROM EvolveProdOrders WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID")
    } catch (error) {
      Evolve.Log.error(" EERR1888: Error while deleting Work Order "+error.message);
      return new Error(" EERR1888: Error while deleting Work Order "+error.message);
    }
  },
  getWorkCenterList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT EvolveSection_ID,EvolveSection_Name  FROM EvolveSection"
      );
    } catch (error) {
      Evolve.Log.error(" EERR0708: Error while getting Work Center List "+error.message);
      return new Error(" EERR0708: Error while getting Work Center List "+error.message);
    }
  },
}
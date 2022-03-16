"use strict";
const Evolve = require("../../../Boot/Evolve");
module.exports = {
  saveInTrans: async function (data, dataInTrans) {
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

      let inTranQue = await Evolve.SqlPool.request()
        .input("EvolveCompany_ID", Evolve.Sql.Int, data.EvolveCompany_ID)
        .input("EvolveUnit_ID", Evolve.Sql.Int, data.EvolveUnit_ID)
        .input("EvolveInTransQueue_TransType", Evolve.Sql.NVarChar, "ASSEMBLY")
        .input("EvolveInTransQueue_LoadStatus", Evolve.Sql.NVarChar, "P")
        .input(
          "EvolveInTransQueue_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolveInTransQueue_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolveInTransQueue_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolveInTransQueue_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .query(
          "INSERT INTO EvolveInTransQueue (EvolveCompany_ID,EvolveUnit_ID,EvolveInTransQueue_TransType,EvolveInTransQueue_LoadStatus,EvolveInTransQueue_CreatedUser,EvolveInTransQueue_CreatedAt,EvolveInTransQueue_UpdatedUser,EvolveInTransQueue_UpdatedAt) VALUES(@EvolveCompany_ID,@EvolveUnit_ID,@EvolveInTransQueue_TransType,@EvolveInTransQueue_LoadStatus,@EvolveInTransQueue_CreatedUser,@EvolveInTransQueue_CreatedAt,@EvolveInTransQueue_UpdatedUser,@EvolveInTransQueue_UpdatedAt);select @@IDENTITY AS 'inserted_id'"
        );

      // inTranQue.recordset[0].inserted_id

      if (inTranQue instanceof Error || inTranQue.rowsAffected < 1) {
        return new Error("Error In Create Wo");
      } else {
        // Insert into Details Table.
        let EvolveInTransQueue_ID = inTranQue.recordset[0].inserted_id;

        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input("EvolveInTransDetail_FieldName", Evolve.Sql.NVarChar, "ITEMNO")
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.ITEMNO
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );
        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input("EvolveInTransDetail_FieldName", Evolve.Sql.NVarChar, "CPART")
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.CPART
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );
        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input("EvolveInTransDetail_FieldName", Evolve.Sql.NVarChar, "WONO")
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.WONO
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );
        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input(
            "EvolveInTransDetail_FieldName",
            Evolve.Sql.NVarChar,
            "PSERIAL"
          )
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.PSERIAL
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );
        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input(
            "EvolveInTransDetail_FieldName",
            Evolve.Sql.NVarChar,
            "FZ1862276_TIME"
          )
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.FZ1862276_TIME
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );
        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input(
            "EvolveInTransDetail_FieldName",
            Evolve.Sql.NVarChar,
            "FZ1862276_PartOK"
          )
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.FZ1862276_PartOK
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );
        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input(
            "EvolveInTransDetail_FieldName",
            Evolve.Sql.NVarChar,
            "K3220_InputParameter09"
          )
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.K3220_InputParameter09
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );
        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input(
            "EvolveInTransDetail_FieldName",
            Evolve.Sql.NVarChar,
            "K3220_InputParameter10"
          )
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.K3220_InputParameter10
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );
        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input(
            "EvolveInTransDetail_FieldName",
            Evolve.Sql.NVarChar,
            "K3220_InputParameter11"
          )
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.K3220_InputParameter11
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );
        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input(
            "EvolveInTransDetail_FieldName",
            Evolve.Sql.NVarChar,
            "K3220_InputParameter12"
          )
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.K3220_InputParameter12
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );
        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input(
            "EvolveInTransDetail_FieldName",
            Evolve.Sql.NVarChar,
            "K3220_TIME"
          )
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.K3220_TIME
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );
        await Evolve.SqlPool.request()
          .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
          .input("EvolveInTransDetail_FieldName", Evolve.Sql.NVarChar, "PPART")
          .input(
            "EvolveInTransDetail_Value",
            Evolve.Sql.NVarChar,
            dataInTrans.PPART
          )
          .query(
            "INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)"
          );

        return EvolveInTransQueue_ID;
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateInTransStatus: async function (EvolveInTransQueue_ID, status) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveInTransQueue_ID", Evolve.Sql.Int, EvolveInTransQueue_ID)
        .input("EvolveInTransQueue_LoadStatus", Evolve.Sql.NVarChar, status)
        .query(
          "UPDATE EvolveInTransQueue SET EvolveInTransQueue_LoadStatus = @EvolveInTransQueue_LoadStatus WHERE EvolveInTransQueue_ID = @EvolveInTransQueue_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  smartFactorySidebarMenuList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_AppId", Evolve.Sql.Int, 4)
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          "SELECT em.EvolveMenu_Name,em.EvolveMenu_Id,em.EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenu em, EvolveRoleToMenu erm , EvolveUserRoleLink eurl, EvolveRole er WHERE eurl.EvolveUser_ID =@EvolveUser_ID AND eurl.EvolveRole_ID = er.EvolveRole_ID AND erm.EvolveRole_ID = eurl.EvolveRole_ID AND erm.EvolveMenu_ID = em.EvolveMenu_ID AND em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_AppId =@EvolveMenu_AppId AND erm.EvolveApp_ID =@EvolveMenu_AppId ANd em.EvolveMenu_Parent = 0 ORDER BY em.EvolveMenu_Index"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getsmartFactorySidebarMenuChildList: async function (EvolveMenu_Id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_Id", Evolve.Sql.Int, EvolveMenu_Id)
        .query(
          "SELECT EvolveMenu_Url,EvolveMenu_Index,EvolveMenu_Name,EvolveMenu_Icon FROM EvolveMenu WHERE EvolveMenu_Parent =@EvolveMenu_Id"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getItemDetails: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, id)
        .query("select * from EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // Production Order

  getProductionOrderList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT epo.EvolveProdOrders_ID , epp.EvolveProdPlan_ProdDate , epo.EvolveProdOrders_OrderId , epo.EvolveProdOrders_Order , epo.EvolveProdOrders_Quantity ,  ei.EvolveItem_Code , es.EvolveSection_Name , epo.EvolveProdOrders_Status FROM EvolveProdOrders epo , EvolveProdPlan epp , EvolveItem ei , EvolveSection es WHERE epo.EvolveProdPlan_ID = epp.EvolveProdPlan_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID AND epp.EvolveSection_ID = es.EvolveSection_ID"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  check_planCode: async function (plan_code) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdPlan_Code", Evolve.Sql.NVarChar, plan_code)
        .query(
          "SELECT COUNT(EvolveProdPlan_ID) as count FROM EvolveProdPlan WHERE EvolveProdPlan_Code LIKE @EvolveProdPlan_Code"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

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
      return await Evolve.SqlPool.request()
        .input("startDate", Evolve.Sql.NVarChar, startDate)
        .input("endDate", Evolve.Sql.NVarChar, endDate)
        .query(
          "SELECT count(EvolveProdOrders_ID) AS count FROM EvolveProdOrders  WHERE CAST(EvolveProdOrders_CreatedAt as date) >= FORMAT(getdate(), @startDate) AND CAST(EvolveProdOrders_CreatedAt as date) <= FORMAT(getdate(), @endDate)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .input("startDate", Evolve.Sql.NVarChar, startDate)
        .input("endDate", Evolve.Sql.NVarChar, endDate)
        .query(
          "SELECT epo.EvolveProdOrders_ID,epo.EvolveProdOrders_Order , epo.EvolveProdOrders_OrderId,epo.EvolveProdOrders_CreatedAt,ei.EvolveItem_Code , epo.EvolveProdOrders_Quantity , epo.EvolveProdOrders_Status , (SELECT epp.EvolveProdPlan_ProdDate FROM EvolveProdPlan epp WHERE epp.EvolveProdPlan_ID = epo.EvolveProdPlan_ID) as plan_date ,(SELECT epp.EvolveProdPlan_Code FROM EvolveProdPlan epp WHERE epp.EvolveProdPlan_ID = epo.EvolveProdPlan_ID) as plan_code ,(SELECT es.EvolveSection_Name FROM EvolveSection es WHERE  es.EvolveSection_ID = epo.EvolveSection_ID) as section FROM EvolveProdOrders epo , EvolveItem ei   WHERE CAST(epo.EvolveProdOrders_CreatedAt as date) >= FORMAT(getdate(), @startDate) AND CAST(epo.EvolveProdOrders_CreatedAt as date) <= FORMAT(getdate(), @endDate) AND ei.EvolveItem_ID = epo.EvolveItem_ID ORDER BY epo.EvolveProdOrders_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  //

  check_machine: async function (Machine_Code) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMachine_Name", Evolve.Sql.NVarChar, Machine_Code)
        .query(
          "SELECT COUNT(EvolveMachine_ID) as count FROM EvolveMachine WHERE EvolveMachine_Name LIKE @EvolveMachine_Name"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  check_shift: async function (shift_name) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveShift_Name", Evolve.Sql.NVarChar, shift_name)
        .query(
          "SELECT COUNT(EvolveShift_ID) as count FROM EvolveShift WHERE EvolveShift_Name LIKE @EvolveShift_Name"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  check_item: async function (item_code) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_Code", Evolve.Sql.NVarChar, item_code)
        .query(
          "SELECT COUNT(EvolveItem_ID) as count FROM EvolveItem WHERE EvolveItem_Code LIKE @EvolveItem_Code"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  check_section: async function (section_name) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSection_Name", Evolve.Sql.NVarChar, section_name)
        .query(
          "SELECT COUNT(EvolveSection_ID) as count FROM EvolveSection WHERE EvolveSection_Name LIKE @EvolveSection_Name"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  check_bom: async function (Item_Code) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_Code", Evolve.Sql.NVarChar, Item_Code)
        .query(
          "SELECT COUNT(epb.EvolvePartBom_ParentItem_ID) AS count FROM EvolvePartBom epb , EvolveItem ei WHERE epb.EvolvePartBom_ParentItem_ID = ei.EvolveItem_ID  AND epb.EvolvePartBom_CompItem_ID = (SELECT eim.EvolveItem_ID FROM EvolveItem eim WHERE eim.EvolveItem_ID = epb.EvolvePartBom_CompItem_ID) AND ei.EvolveItem_Code = @EvolveItem_Code"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  savePlan: async function (data, EvolveUser_ID, fileName) {
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
      // DD-MM-YY convert to YYYY-MM-DD
      let dateParts = data.Date.split(".");
      let date = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
      // console.log("data.Date :", date)
      // console.log("data.EvolveProdPlan_Shift :", data.Plan_Shift)
      // console.log("data.Plan_SectionID :", data.Plan_Section)
      // console.log("EvolveUser_ID :", EvolveUser_ID)
      // console.log("dataTime :", dataTime)
      // console.log("fileName :", fileName)
      let shift_data = await Evolve.SqlPool.request()
        .input("EvolveShift_Name", Evolve.Sql.NVarChar, data.Plan_Shift)
        .query(
          "SELECT EvolveShift_ID FROM EvolveShift WHERE EvolveShift_Name LIKE @EvolveShift_Name"
        );
      let shift_id;
      if (shift_data instanceof Error || shift_data.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: shift_data.message,
          result: null
        };
        res.send(obj);
      } else {
        shift_id = shift_data.recordset[0].EvolveShift_ID;
      }

      let section_data = await Evolve.SqlPool.request()
        .input("EvolveSection_Name", Evolve.Sql.NVarChar, data.Plan_Section)
        .query(
          "SELECT EvolveSection_ID FROM EvolveSection WHERE EvolveSection_Name LIKE @EvolveSection_Name"
        );

      let section_id;
      if (section_data instanceof Error || section_data.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: section_data.message,
          result: null
        };
        res.send(obj);
      } else {
        section_id = section_data.recordset[0].EvolveSection_ID;
      }
      // console.log("File name :",fileName);
      return await Evolve.SqlPool.request()
        .input("EvolveProdPlan_ProdDate", Evolve.Sql.NVarChar, date)
        .input("EvolveShift_ID", Evolve.Sql.Int, shift_id)
        .input("EvolveSection_ID", Evolve.Sql.Int, section_id)
        .input("EvolveProdPlan_Status", Evolve.Sql.NVarChar, "open")
        .input("EvolveProdPlan_Code", Evolve.Sql.NVarChar, data.Plan_Code)
        .input("EvolveProdPlan_FileName", Evolve.Sql.NVarChar, fileName + "")

        .input("EvolveProdPlan_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveProdPlan_CreatedUser", Evolve.Sql.Int, EvolveUser_ID)
        .input("EvolveProdPlan_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveProdPlan_UpdatedUser", Evolve.Sql.Int, EvolveUser_ID)
        .query(
          "INSERT INTO EvolveProdPlan(EvolveProdPlan_ProdDate,EvolveShift_ID,EvolveProdPlan_CreatedUser,EvolveProdPlan_CreatedAt,EvolveSection_ID,EvolveProdPlan_Status,EvolveProdPlan_Code,EvolveProdPlan_FileName) VALUES(@EvolveProdPlan_ProdDate,@EvolveShift_ID,@EvolveProdPlan_CreatedUser,@EvolveProdPlan_CreatedAt,@EvolveSection_ID,@EvolveProdPlan_Status,@EvolveProdPlan_Code,@EvolveProdPlan_FileName);select @@IDENTITY AS 'inserted_id'"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  savePlanDetails: async function (data, EvolveProdPlan_ID, EvolveUser_ID) {
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
      let Item = await Evolve.SqlPool.request()
        .input("EvolveItem_Code", Evolve.Sql.NVarChar, data.Item_Code)
        .query(
          "SELECT * FROM EvolveItem WHERE EvolveItem_Code =@EvolveItem_Code"
        );
      if (Item instanceof Error || Item.rowsAffected < 1) {
        return new Error("No Item Found!");
      } else {
        let tool_id;
        if (data.Mould_Change == "") {
          let tool = await Evolve.SqlPool.request()
            .input("EvolveItem_Code", Evolve.Sql.NVarChar, data.Item_Code)
            .query(
              "SELECT EvolveItem_DefaultTool FROM EvolveItem WHERE EvolveItem_Code =@EvolveItem_Code"
            );
          tool_id = tool.recordset[0].EvolveItem_DefaultTool;
        } else {
          let tool = await Evolve.SqlPool.request()
            .input("EvolveTool_Code", Evolve.Sql.NVarChar, data.Mould_Change)
            .query(
              "SELECT * FROM EvolveTool WHERE EvolveTool_Code =@EvolveTool_Code"
            );
          tool_id = tool.recordset[0].EvolveTool_ID;
        }

        let std_clavity;
        if (data.Standard_Cavity == "") {
          let tool = await Evolve.SqlPool.request()
            .input("EvolveTool_ID", Evolve.Sql.Int, tool_id)
            .query(
              "SELECT EvolveTool_Qty FROM EvolveTool WHERE EvolveTool_ID =@EvolveTool_ID"
            );
          std_clavity = tool.recordset[0].EvolveTool_Qty;
        } else {
          std_clavity = data.Standard_Cavity;
        }
        let working_clavity;
        if (data.Working_Cavity == "") {
          let tool = await Evolve.SqlPool.request()
            .input("EvolveTool_ID", Evolve.Sql.Int, tool_id)
            .query(
              "SELECT EvolveTool_YeildQty FROM EvolveTool WHERE EvolveTool_ID =@EvolveTool_ID"
            );
          working_clavity = tool.recordset[0].EvolveTool_YeildQty;
        } else {
          working_clavity = data.Working_Cavity;
        }

        let oprator = await Evolve.SqlPool.request()
          .input("EvolveOperator_Name", Evolve.Sql.NVarChar, data.Operator)
          .query(
            "SELECT EvolveOperator_ID FROM EvolveOperator WHERE EvolveOperator_Name = @EvolveOperator_Name"
          );

        if (oprator instanceof Error || oprator.recordset < 1) {
          return new Error("Operator Not Found!");
        } else {
          return await Evolve.SqlPool.request()
            .input("EvolveProdPlan_ID", Evolve.Sql.Int, EvolveProdPlan_ID)
            .input(
              "EvolveItem_ID",
              Evolve.Sql.Int,
              Item.recordset[0].EvolveItem_ID
            )
            .input(
              "EvolveProdPlanDetail_PlanQuantity",
              Evolve.Sql.Int,
              data.Qty_Planned
            )
            .input("EvolveProdPlanDetail_Status", Evolve.Sql.NVarChar, "open")
            .input(
              "EvolveProdPlanDetail_CreatedAt",
              Evolve.Sql.NVarChar,
              dataTime
            )
            .input(
              "EvolveProdPlanDetail_CreatedUser",
              Evolve.Sql.Int,
              EvolveUser_ID
            )
            .input(
              "EvolveProdPlanDetail_UpdatedAt",
              Evolve.Sql.NVarChar,
              dataTime
            )
            .input(
              "EvolveProdPlanDetail_UpdatedUser",
              Evolve.Sql.Int,
              EvolveUser_ID
            )
            .input("EvolveTool_ID", Evolve.Sql.Int, tool_id)
            .input(
              "EvolveProdPlanDetail_StandardCavity",
              Evolve.Sql.Int,
              std_clavity
            )
            .input(
              "EvolveProdPlanDetail_WorkingCavity",
              Evolve.Sql.Int,
              working_clavity
            )
            .input(
              "EvolveOperator_ID",
              Evolve.Sql.Int,
              oprator.recordset[0].EvolveOperator_ID
            )
            .input(
              "EvolveProdPlanDetail_Reqd_Heats",
              Evolve.Sql.NVarChar,
              data.Reqd_Heats
            )
            .query(
              "INSERT INTO EvolveProdPlanDetail(EvolveProdPlan_ID,EvolveItem_ID,EvolveProdPlanDetail_PlanQuantity,EvolveProdPlanDetail_Status,EvolveProdPlanDetail_CreatedAt,EvolveProdPlanDetail_CreatedUser,EvolveProdPlanDetail_UpdatedAt,EvolveProdPlanDetail_UpdatedUser,EvolveTool_ID,EvolveProdPlanDetail_StandardCavity,EvolveProdPlanDetail_WorkingCavity,EvolveOperator_ID,EvolveProdPlanDetail_Reqd_Heats) VALUES(@EvolveProdPlan_ID,@EvolveItem_ID,@EvolveProdPlanDetail_PlanQuantity,@EvolveProdPlanDetail_Status,@EvolveProdPlanDetail_CreatedAt,@EvolveProdPlanDetail_CreatedUser,@EvolveProdPlanDetail_UpdatedAt,@EvolveProdPlanDetail_UpdatedUser,@EvolveTool_ID,@EvolveProdPlanDetail_StandardCavity,@EvolveProdPlanDetail_WorkingCavity,@EvolveOperator_ID,@EvolveProdPlanDetail_Reqd_Heats)"
            );
        }
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getAllItem: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT EvolveItem_ID , EvolveItem_Code FROM EvolveItem"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
        .input("EvolveProdOrders_Status", Evolve.Sql.NVarChar, "open")
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
        .query(
          "INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID);select @@IDENTITY AS 'inserted_id'"
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getWorkOrderItemData: async function (EvolveItem_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, EvolveItem_ID)
        .query("SELECT * FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
                " SELECT TOP (1) EvolveMachine_id FROM EvolveProcessToMachine WHERE EvolveProcess_id =@EvolveProcess_id "
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // Production Booing

  getWorkCenterList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT EvolveSection_ID,EvolveSection_Name  FROM EvolveSection"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMachineId: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMachine_ID", Evolve.Sql.Int, id)

        .query(
          "SELECT EvolveMachine_ID FROM EvolveMachineToUser WHERE EvolveUser_ID = @EvolveMachine_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getWorkOrderList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT epo.EvolveProdOrders_ID , epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrders epo , EvolveItem ei WHERE epo.Evolveprodorders_status ='open' AND ei.EvolveItem_ID = epo.EvolveItem_ID"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMachineListBySectionId: async function (workCenterId, EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("workCenterId", Evolve.Sql.Int, workCenterId)
        // .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query("SELECT em.EvolveMachine_ID,em.EvolveMachine_Name from EvolveMachine em, EvolveMachineAssign ema WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND ema.EvolveSection_ID = @workCenterId");

      // .query("SELECT em.EvolveMachine_ID,em.EvolveMachine_Name from EvolveMachine em, EvolveMachineAssign ema, EvolveMachineToUser emtu WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND ema.EvolveSection_ID = @workCenterId AND emtu.EvolveUser_ID = @EvolveUser_ID AND em.EvolveMachine_ID = emtu.EvolveMachine_ID  ");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMachineAndSection: async function (EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query(
          "SELECT em.EvolveMachine_ID,em.EvolveMachine_Name, es.EvolveSection_ID, es.EvolveSection_Name from EvolveMachine em, EvolveMachineAssign ema, EvolveMachineToUser emtu, EvolveSection es WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND emtu.EvolveUser_ID = @EvolveUser_ID AND em.EvolveMachine_ID = emtu.EvolveMachine_ID AND es.EvolveSection_ID =  ema.EvolveSection_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getItemListByWorkOrder: async function (EvolveProdOrders_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
        .query(
          "SELECT ei.EvolveItem_ID,ei.EvolveItem_Code , ei.EvolveItem_CustPart , ei.EvolveItem_Desc  FROM EvolveProdOrders epo, EvolveItem ei WHERE epo.EvolveProdOrders_ID =@EvolveProdOrders_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getWorkOrderByItem: async function (EvolveItem_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, EvolveItem_ID)
        .query(
          "SELECT epo.EvolveProdOrders_ID , epo.EvolveProdOrders_Order FROM EvolveProdOrders epo , EvolveProdPlan epp WHERE epo.EvolveItem_ID = @EvolveItem_ID  AND epo.EvolveProdOrders_Status != 'completed' AND epo.EvolveProdPlan_ID = epp.EvolveProdPlan_ID AND epp.EvolveProdPlan_ProdDate = FORMAT(getdate(), 'yyyy-MM-dd') ORDER BY epo.EvolveProdOrders_ID  ASC"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getItemDetails: async function (EvolveItem_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, EvolveItem_ID)
        .query(
          "SELECT ei.* , eu.EvolveUom_Type  FROM EvolveItem ei , EvolveUom eu WHERE ei.EvolveUom_ID = eu.EvolveUom_ID AND EvolveItem_ID = @EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getLocationList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "select EvolveLocation_Name,EvolveLocation_ID FROM EvolveLocation"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getLocationByMachine: async function (EvolveMachine_ID) {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT el.EvolveLocation_ID FROM EvolveMachine em , EvolveLocation el WHERE em.EvolveMachine_Name = el.EvolveLocation_Code AND em.EvolveMachine_ID = " +
        EvolveMachine_ID
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getOperatorList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT EvolveOperator_Name,EvolveOperator_ID,EvolveUser_ID FROM EvolveOperator WHERE EvolveOperator_Status = 1"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  createOperator: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvoleCompany_ID", Evolve.Sql.Int, data.EvoleCompany_ID)
        .input(
          "EvolveOperator_Name",
          Evolve.Sql.NVarChar,
          data.EvolveOperator_Name
        )
        .query(
          "INSERT INTO EvolveOperator(EvoleCompany_ID,EvolveOperator_Name,EvolveOperator_Status) VALUES(@EvoleCompany_ID,@EvolveOperator_Name,1)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getToolList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "select EvolveTool_ID,EvolveTool_Code,EvolveTool_Name FROM EvolveTool WHERE EvolveTool_Status = 1"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  createProductionOrders: async function (data) {
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
      var str = "" + 1;
      var pad = "0000";
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
      let newdate = day + "" + month + "" + year; //28219
      let wo_nbr = "WO" + newdate + "" + wocount; //WO292190001

      let check_wo = await Evolve.SqlPool.request().query(
        "SELECT TOP 1 EvolveProdOrders_Order From EvolveProdOrders ORDER BY EvolveProdOrders_ID DESC"
      );
      if (check_wo.rowsAffected > 0) {
        let last_wo = check_wo.recordset[0].EvolveProdOrders_Order; //WO282190001
        if (last_wo.indexOf(newdate) > -1) {
          let wo_new = parseInt(last_wo.substr(-4)) + 1; //0002 => 2
          let tmp = "" + wo_new;
          wocount = pad.substring(0, pad.length - tmp.length) + tmp;
          wo_nbr = "WO" + newdate + "" + wocount;
        }
      }

      let wo_ins = await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrders_OrderId",
          Evolve.Sql.NVarChar,
          newdate + "" + wocount
        )
        .input("EvolveProdOrders_Order", Evolve.Sql.NVarChar, wo_nbr)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .input("EvolveProdOrders_Status", Evolve.Sql.NVarChar, "open")
        .input(
          "EvolveProdOrders_Quantity",
          Evolve.Sql.Int,
          data.EvolveInventory_Weight
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
        .query(
          "INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt);select @@IDENTITY AS 'inserted_id'"
        );

      // console.log("wo_ins.rowsAffected >>", wo_ins.rowsAffected)

      if (wo_ins instanceof Error || wo_ins.rowsAffected < 1) {
        Evolve.Log.Error("Error In insert EvolveProd Orders", wo_ins);
        return new Error("Error in insert EvolveProd Orders");
      } else {
        return wo_ins;
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  saveInventoryAndHistory: async function (data) {
    try {
      let EvolveItem = await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .query(
          "select EvolveUom_ID from EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID"
        );
      if (EvolveItem instanceof Error || EvolveItem.rowsAffected < 1) {
        return new Error("Error In Item Id");
      } else {
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

        let saveInventory_inv = await Evolve.SqlPool.request()
          .input("EvolveCompany_ID", Evolve.Sql.Int, data.EvolveCompany_ID)
          .input("EvolveUnit_ID", Evolve.Sql.Int, data.EvolveUnit_ID)
          .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
          .input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveLocation_ID)
          .input(
            "EvolveInventory_QtyOnHand",
            Evolve.Sql.Int,
            data.EvolveInventory_Weight
          )
          .input(
            "EvolveInventory_LotNumber",
            Evolve.Sql.NVarChar,
            data.EvolveInventory_LotNumber
          )
          .input("EvolveInventory_CreatedAt", Evolve.Sql.NVarChar, dataTime)
          .input(
            "EvolveInventory_CreatedUser",
            Evolve.Sql.Int,
            data.EvolveUser_ID
          )
          .input(
            "EvolveInventory_RefNumber",
            Evolve.Sql.NVarChar,
            data.EvolveInventory_RefNumber
          )
          .input(
            "EvolveInventoryStatus_ID",
            Evolve.Sql.Int,
            data.EvolveInventoryStatus_ID
          )
          .input(
            "EvolveInventory_LotNotes",
            Evolve.Sql.NVarChar,
            data.EvolveInventory_LotNotes
          )
          .query(
            "INSERT INTO EvolveInventory(EvolveCompany_ID,EvolveUnit_ID,EvolveItem_ID,EvolveLocation_ID,EvolveInventory_QtyOnHand,EvolveInventory_LotNumber,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventoryStatus_ID,EvolveInventory_LotNotes,EvolveInventory_RefNumber) VALUES(@EvolveCompany_ID,@EvolveUnit_ID,@EvolveItem_ID,@EvolveLocation_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_LotNumber,@EvolveInventory_CreatedAt,@EvolveInventory_CreatedUser,@EvolveInventoryStatus_ID,@EvolveInventory_LotNotes,@EvolveInventory_RefNumber)select @@IDENTITY AS 'inserted_id'"
          );

        if (
          saveInventory_inv instanceof Error ||
          saveInventory_inv.rowsAffected < 1
        ) {
          Evolve.Log.Error("Error saveInventory", saveInventory_inv);
          return new Error("Error saveInventory");
        } else {
          let inventory_id = saveInventory_inv.recordset[0].inserted_id;
          // let EvolveTranstionHistoryResult = await Evolve.SqlPool.request()
          //     .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
          //     .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
          //     .input('EvolveApplication_ID', Evolve.Sql.Int, 4)
          //     .input('EvolveTransitionHistory_TypeID', Evolve.Sql.Int, data.EvolveTransitionHistory_TypeID)
          //     .input('EvolveTransitionHistory_DocumentID', Evolve.Sql.Int, inventory_id)
          //     .input('EvolveTransitionHistory_DocumentDetailID', Evolve.Sql.Int, inventory_id)
          //     //.input('EvolveLocation_ID', Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
          //     .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
          //     //.input('EvolveUOM_ID', )
          //     //.input('EvolveTransitionHistory_AddressID' )
          //     .input('EvolveInventory_ID',Evolve.Sql.Int,  inventory_id)
          //     .input('EvolveTransitionHistory_Quantity',Evolve.Sql.Int, parseInt(data.EvolveInventory_Weight))
          //     //.input('EvolveTransitionHistory_Shiptype',Evolve.Sql.Int, data.EvolveUser_ID)
          //     .input('EvolveTransitionHistory_createdDatetime',Evolve.Sql.NVarChar, dataTime)
          //     .input('EvolveTransitionHistory_UserID',Evolve.Sql.Int, data.EvolveUser_ID)
          //     .query('INSERT INTO EvolveTranstionHistory (EvolveCompany_ID,EvolveUnit_ID,EvolveApplication_ID,EvolveTransitionHistory_TypeID,EvolveTransitionHistory_DocumentID,EvolveTransitionHistory_DocumentDetailID,EvolveItem_ID,EvolveInventory_ID,EvolveTransitionHistory_Quantity,EvolveTransitionHistory_UserID,EvolveTransitionHistory_createdDatetime) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveApplication_ID,@EvolveTransitionHistory_TypeID,@EvolveTransitionHistory_DocumentID,@EvolveTransitionHistory_DocumentDetailID,@EvolveItem_ID,@EvolveInventory_ID,@EvolveTransitionHistory_Quantity,@EvolveTransitionHistory_UserID,@EvolveTransitionHistory_createdDatetime);select @@IDENTITY AS \'inserted_id\'');

          let history_Data = {
            EvolveCompany_ID: data.EvolveUnit_ID,
            EvolveUnit_ID: data.EvolveUnit_ID,
            EvolveApplication_ID: 4,
            EvolveTranstype_code: "prodBooking",
            EvolveTransitionHistory_DocumentID: inventory_id,
            EvolveTransitionHistory_DocumentDetailID: inventory_id,
            EvolveLocation_ID: null,
            EvolveItem_ID: parseInt(data.EvolveItem_ID),
            EvolveUOM_ID: null,
            EvolveInventoryStatus_ID: null,
            EvolveTransitionHistory_AddressID: null,
            EvolveInventory_ID: inventory_id,
            EvolveTransitionHistory_Quantity: parseInt(
              data.EvolveInventory_Weight
            ),
            EvolveTransitionHistory_Shiptype: null,
            EvolveTransitionHistory_SequenceId: null,
            EvolveTransitionHistory_UserID: data.EvolveUser_ID,
            EvolveMachine_ID: null,
            EvolveReason_ID: null,
            EvolveTool_ID: null,
            EvolveActivity_ID: null,
            EvolveTransitionHistory_Description: null
          };
          let EvolveTranstionHistoryResult = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(
            history_Data
          );

          if (
            EvolveTranstionHistoryResult instanceof Error ||
            EvolveTranstionHistoryResult.rowsAffected < 1
          ) {
            Evolve.Log.Error(
              "Error EvolveTranstionHistoryResult",
              EvolveTranstionHistoryResult
            );
            return new Error("Error EvolveTranstionHistoryResult");
          } else {
            return await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrders_ID",
                Evolve.Sql.Int,
                data.EvolveProdOrders_ID
              )
              .input(
                "EvolveProdOrdersDetail_Qty",
                Evolve.Sql.Int,
                parseInt(data.EvolveInventory_Weight)
              )
              .input(
                "EvolveProdOrdersDetail_Status",
                Evolve.Sql.NVarChar,
                "completed"
              )
              .input(
                "EvolveProdOrdersDetail_CreatedUser",
                Evolve.Sql.Int,
                data.EvolveUser_ID
              )
              .input(
                "EvolveProdOrdersDetail_LotNotes",
                Evolve.Sql.NVarChar,
                data.EvolveInventory_LotNotes
              )
              .input(
                "EvolveProdOrdersDetail_LotNumber",
                Evolve.Sql.NVarChar,
                data.EvolveInventory_LotNumber
              )
              .input(
                "EvolveProdOrdersDetail_CreatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input(
                "EvolveProdOrdersDetail_UpdatedUser",
                Evolve.Sql.Int,
                data.EvolveUser_ID
              )
              .input(
                "EvolveProdOrdersDetail_UpdatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input(
                "EvolveUom_ID",
                Evolve.Sql.Int,
                EvolveItem.recordset[0].EvolveUom_ID
              )
              .input(
                "EvolveLocation_ID",
                Evolve.Sql.Int,
                data.EvolveLocation_ID
              )
              .input(
                "EvolveProdOrdersDetail_RefNumber",
                Evolve.Sql.NVarChar,
                data.EvolveInventory_RefNumber
              )
              .input("EvolveInventory_ID", Evolve.Sql.INT, inventory_id)
              .query(
                "INSERT INTO EvolveProdOrdersDetail (EvolveProdOrders_ID,EvolveProdOrdersDetail_Qty,EvolveProdOrdersDetail_Status,EvolveProdOrdersDetail_CreatedUser,EvolveProdOrdersDetail_LotNotes,EvolveProdOrdersDetail_LotNumber,EvolveProdOrdersDetail_CreatedAt,EvolveProdOrdersDetail_UpdatedUser,EvolveProdOrdersDetail_UpdatedAt,EvolveUom_ID,EvolveLocation_ID,EvolveProdOrdersDetail_RefNumber,EvolveInventory_ID) VALUES (@EvolveProdOrders_ID,@EvolveProdOrdersDetail_Qty,@EvolveProdOrdersDetail_Status,@EvolveProdOrdersDetail_CreatedUser,@EvolveProdOrdersDetail_LotNotes,@EvolveProdOrdersDetail_LotNumber,@EvolveProdOrdersDetail_CreatedAt,@EvolveProdOrdersDetail_UpdatedUser,@EvolveProdOrdersDetail_UpdatedAt,@EvolveUom_ID,@EvolveLocation_ID,@EvolveProdOrdersDetail_RefNumber,@EvolveInventory_ID);select @@IDENTITY AS 'inserted_id'"
              );
          }
        }
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  saveAndUpdteMillingData: async function (data) {
    try {
      //console.log("data::", data)
      let result = {};
      let oldrecord = await Evolve.SqlPool.request()
        .input(
          "Evolve_Milling_Barcode",
          Evolve.Sql.NVarChar,
          data.Evolve_Milling_Barcode
        )
        .query(
          "SELECT Evolve_Milling_Barcode FROM EvolveMilling WHERE Evolve_Milling_Barcode = @Evolve_Milling_Barcode"
        );
      if (oldrecord instanceof Error || oldrecord.rowsAffected < 1) {
        // insert New Records.

        result = await Evolve.SqlPool.request()
          .input(
            "Evolve_Milling_Barcode",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Barcode
          )
          .input(
            "Evolve_Milling_Cycle_Start",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_Start
          )
          .input(
            "Evolve_Milling_Cycle_Start_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_Start_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_Finished",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_Finished
          )
          .input(
            "Evolve_Milling_Cycle_Finished_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_Finished_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_Part_Not_OK",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_Part_Not_OK
          )
          .input(
            "Evolve_Milling_Cycle_Part_Not_OK_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_Part_Not_OK_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_Part_OK",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_Part_OK
          )
          .input(
            "Evolve_Milling_Cycle_Part_OK_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_Part_OK_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_Knife_Test",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_Knife_Test
          )
          .input(
            "Evolve_Milling_Cycle_Knife_Test_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_Knife_Test_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_NCK_Alarm",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_NCK_Alarm
          )
          .input(
            "Evolve_Milling_Cycle_NCK_Alarm_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_NCK_Alarm_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_PLC_Feed_stop",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_PLC_Feed_stop
          )
          .input(
            "Evolve_Milling_Cycle_PLC_Feed_stop_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_PLC_Feed_stop_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_PLC_NC",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_PLC_NC
          )
          .input(
            "Evolve_Milling_Cycle_PLC_NC_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_PLC_NC_TIMESTAMP
          )
          .query(
            "INSERT INTO EvolveMilling (Evolve_Milling_Barcode,Evolve_Milling_Cycle_Start,Evolve_Milling_Cycle_Start_TIMESTAMP,Evolve_Milling_Cycle_Finished,Evolve_Milling_Cycle_Finished_TIMESTAMP,Evolve_Milling_Cycle_Part_Not_OK,Evolve_Milling_Cycle_Part_Not_OK_TIMESTAMP,Evolve_Milling_Cycle_Part_OK,Evolve_Milling_Cycle_Part_OK_TIMESTAMP,Evolve_Milling_Cycle_Knife_Test,Evolve_Milling_Cycle_Knife_Test_TIMESTAMP,Evolve_Milling_Cycle_NCK_Alarm,Evolve_Milling_Cycle_NCK_Alarm_TIMESTAMP,Evolve_Milling_Cycle_PLC_Feed_stop,Evolve_Milling_Cycle_PLC_Feed_stop_TIMESTAMP,Evolve_Milling_Cycle_PLC_NC,Evolve_Milling_Cycle_PLC_NC_TIMESTAMP) VALUES (@Evolve_Milling_Barcode,@Evolve_Milling_Cycle_Start,@Evolve_Milling_Cycle_Start_TIMESTAMP,@Evolve_Milling_Cycle_Finished,@Evolve_Milling_Cycle_Finished_TIMESTAMP,@Evolve_Milling_Cycle_Part_Not_OK,@Evolve_Milling_Cycle_Part_Not_OK_TIMESTAMP,@Evolve_Milling_Cycle_Part_OK,@Evolve_Milling_Cycle_Part_OK_TIMESTAMP,@Evolve_Milling_Cycle_Knife_Test,@Evolve_Milling_Cycle_Knife_Test_TIMESTAMP,@Evolve_Milling_Cycle_NCK_Alarm,@Evolve_Milling_Cycle_NCK_Alarm_TIMESTAMP,@Evolve_Milling_Cycle_PLC_Feed_stop,@Evolve_Milling_Cycle_PLC_Feed_stop_TIMESTAMP,@Evolve_Milling_Cycle_PLC_NC,@Evolve_Milling_Cycle_PLC_NC_TIMESTAMP)",
            err => {
              if (err) {
                Evolve.Log.error(
                  "Error When Insert EvolveMilling : " + err.message
                ); // Print All Mesaage.
              }
            }
          );
      } else {
        // Record Found so Update record...

        result = await Evolve.SqlPool.request()
          .input(
            "Evolve_Milling_Barcode",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Barcode
          )
          .input(
            "Evolve_Milling_Cycle_Start",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_Start
          )
          .input(
            "Evolve_Milling_Cycle_Start_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_Start_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_Finished",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_Finished
          )
          .input(
            "Evolve_Milling_Cycle_Finished_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_Finished_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_Part_Not_OK",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_Part_Not_OK
          )
          .input(
            "Evolve_Milling_Cycle_Part_Not_OK_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_Part_Not_OK_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_Part_OK",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_Part_OK
          )
          .input(
            "Evolve_Milling_Cycle_Part_OK_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_Part_OK_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_Knife_Test",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_Knife_Test
          )
          .input(
            "Evolve_Milling_Cycle_Knife_Test_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_Knife_Test_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_NCK_Alarm",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_NCK_Alarm
          )
          .input(
            "Evolve_Milling_Cycle_NCK_Alarm_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_NCK_Alarm_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_PLC_Feed_stop",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_PLC_Feed_stop
          )
          .input(
            "Evolve_Milling_Cycle_PLC_Feed_stop_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_PLC_Feed_stop_TIMESTAMP
          )
          .input(
            "Evolve_Milling_Cycle_PLC_NC",
            Evolve.Sql.Bit,
            data.Evolve_Milling_Cycle_PLC_NC
          )
          .input(
            "Evolve_Milling_Cycle_PLC_NC_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.Evolve_Milling_Cycle_PLC_NC_TIMESTAMP
          )
          .query(
            "UPDATE EvolveMilling SET Evolve_Milling_Cycle_Start=@Evolve_Milling_Cycle_Start,Evolve_Milling_Cycle_Start_TIMESTAMP=@Evolve_Milling_Cycle_Start_TIMESTAMP,Evolve_Milling_Cycle_Finished=@Evolve_Milling_Cycle_Finished,Evolve_Milling_Cycle_Finished_TIMESTAMP=@Evolve_Milling_Cycle_Finished_TIMESTAMP,Evolve_Milling_Cycle_Part_Not_OK=@Evolve_Milling_Cycle_Part_Not_OK,Evolve_Milling_Cycle_Part_Not_OK_TIMESTAMP=@Evolve_Milling_Cycle_Part_Not_OK_TIMESTAMP,Evolve_Milling_Cycle_Part_OK=@Evolve_Milling_Cycle_Part_OK,Evolve_Milling_Cycle_Part_OK_TIMESTAMP=@Evolve_Milling_Cycle_Part_OK_TIMESTAMP,Evolve_Milling_Cycle_Knife_Test=@Evolve_Milling_Cycle_Knife_Test,Evolve_Milling_Cycle_Knife_Test_TIMESTAMP=@Evolve_Milling_Cycle_Knife_Test_TIMESTAMP,Evolve_Milling_Cycle_NCK_Alarm=@Evolve_Milling_Cycle_NCK_Alarm,Evolve_Milling_Cycle_NCK_Alarm_TIMESTAMP=@Evolve_Milling_Cycle_NCK_Alarm_TIMESTAMP,Evolve_Milling_Cycle_PLC_Feed_stop=@Evolve_Milling_Cycle_PLC_Feed_stop,Evolve_Milling_Cycle_PLC_Feed_stop_TIMESTAMP=@Evolve_Milling_Cycle_PLC_Feed_stop_TIMESTAMP,Evolve_Milling_Cycle_PLC_NC=@Evolve_Milling_Cycle_PLC_NC,Evolve_Milling_Cycle_PLC_NC_TIMESTAMP=@Evolve_Milling_Cycle_PLC_NC_TIMESTAMP WHERE Evolve_Milling_Barcode=@Evolve_Milling_Barcode"
          );
      }

      // Insert into Hostory Table

      // Update NextSeq

      if (result instanceof Error) {
        return new Error("Error in Insert Milling Data");
      } else {
        if (
          (data.Evolve_Milling_Cycle_Part_OK == 1 ||
            data.Evolve_Milling_Cycle_Part_Not_OK == 1) &&
          data.Evolve_Milling_Cycle_Finished == 1
        ) {
          // Update Sequance of Barcode...
          if (
            data.Evolve_Milling_Cycle_Part_OK == 1 &&
            data.Evolve_Milling_Cycle_Finished == 1
          ) {
            return await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrdersDetail_Serial",
                Evolve.Sql.NVarChar,
                data.Evolve_Milling_Barcode
              )
              .query(
                "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_NxtSeq = 2 WHERE EvolveProdOrdersDetail_Serial=@EvolveProdOrdersDetail_Serial"
              );
          } else {
            return await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrdersDetail_Serial",
                Evolve.Sql.NVarChar,
                data.Evolve_Milling_Barcode
              )
              .query(
                "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_NxtSeq = 9, EvolveProdOrdersDetail_Status = 'Rejected' WHERE EvolveProdOrdersDetail_Serial=@EvolveProdOrdersDetail_Serial"
              );
          }
        } else {
          return result;
        }
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  insertUpdateVibrationData: async function (data) {
    try {
      let result = {};
      let oldrecord = await Evolve.SqlPool.request()
        .input(
          "EvolveVibration_K3220_Barcode_VALUE",
          Evolve.Sql.NVarChar,
          data.K3220_077_K3220_077_K3220_Barcode_VALUE
        )
        .query(
          "SELECT * FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @EvolveVibration_K3220_Barcode_VALUE"
        );
      // console.log("oldrecord >>>>..........", oldrecord)
      if (oldrecord instanceof Error || oldrecord.rowsAffected < 1) {
        data.K3220_077_K3220_077_Input_Parameter_01_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_01_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_02_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_02_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_03_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_03_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_05_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_05_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_06_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_06_NUMERICID
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_06_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_06_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_06_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_06_TIMESTAMP
            : data.K3220_077_K3220_077_Input_Parameter_06_TIMESTAMP;
        data.K3220_077_K3220_077_Input_Parameter_06_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_06_QUALITY
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_07_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_07_NUMERICID
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_07_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_07_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_07_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_07_TIMESTAMP
            : data.K3220_077_K3220_077_Input_Parameter_07_TIMESTAMP;
        data.K3220_077_K3220_077_Input_Parameter_07_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_07_QUALITY
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_08_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_08_NUMERICID
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_08_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_08_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_08_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_08_TIMESTAMP
            : data.K3220_077_K3220_077_Input_Parameter_08_TIMESTAMP;
        data.K3220_077_K3220_077_Input_Parameter_08_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_08_QUALITY
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_09_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_09_NUMERICID
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_09_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_09_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_09_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_09_TIMESTAMP
            : data.K3220_077_K3220_077_Input_Parameter_09_TIMESTAMP;
        data.K3220_077_K3220_077_Input_Parameter_09_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_09_QUALITY
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_10_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_10_NUMERICID
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_10_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_10_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_10_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_10_TIMESTAMP
            : data.K3220_077_K3220_077_Input_Parameter_10_TIMESTAMP;
        data.K3220_077_K3220_077_Input_Parameter_10_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_10_QUALITY
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_11_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_11_NUMERICID
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_11_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_11_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_11_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_11_TIMESTAMP
            : data.K3220_077_K3220_077_Input_Parameter_11_TIMESTAMP;
        data.K3220_077_K3220_077_Input_Parameter_11_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_11_QUALITY
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_12_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_12_NUMERICID
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_12_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_12_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_12_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_12_TIMESTAMP
            : data.K3220_077_K3220_077_Input_Parameter_12_TIMESTAMP;
        data.K3220_077_K3220_077_Input_Parameter_12_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_12_QUALITY
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_13_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_13_NUMERICID
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_13_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_13_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_13_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_13_TIMESTAMP
            : data.K3220_077_K3220_077_Input_Parameter_13_TIMESTAMP;
        data.K3220_077_K3220_077_Input_Parameter_13_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_13_QUALITY
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_14_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_14_NUMERICID
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_14_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_14_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_14_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_14_TIMESTAMP
            : data.K3220_077_K3220_077_Input_Parameter_14_TIMESTAMP;
        data.K3220_077_K3220_077_Input_Parameter_14_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_14_QUALITY
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_15_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_15_NUMERICID
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_15_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_15_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_15_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_15_TIMESTAMP
            : data.K3220_077_K3220_077_Input_Parameter_15_TIMESTAMP;
        data.K3220_077_K3220_077_Input_Parameter_15_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_15_QUALITY
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_16_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_16_NUMERICID
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_16_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_16_VALUE
            : 0;
        data.K3220_077_K3220_077_Input_Parameter_16_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_16_TIMESTAMP
            : data.K3220_077_K3220_077_Input_Parameter_16_TIMESTAMP;
        data.K3220_077_K3220_077_Input_Parameter_16_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_16_QUALITY
            : 0;

        // Database Retun True/false When Bit datatypes
        data.K3220_077_K3220_077_Machine_Start_VALUE =
          data.K3220_077_K3220_077_Machine_Start_VALUE == true ? 1 : 0;
        data.K3220_077_K3220_077_Cycle_Start_VALUE =
          data.K3220_077_K3220_077_Cycle_Start_VALUE == true ? 1 : 0;
        data.K3220_077_K3220_077_Part_Ok_VALUE =
          data.K3220_077_K3220_077_Part_Ok_VALUE == true ? 1 : 0;
        data.K3220_077_K3220_077_Part_NOK_VALUE =
          data.K3220_077_K3220_077_Part_NOK_VALUE == true ? 1 : 0;
        data.K3220_077_K3220_077_Cycle_Stop_VALUE =
          data.K3220_077_K3220_077_Cycle_Stop_VALUE == true ? 1 : 0;

        result = await Evolve.SqlPool.request()
          .input(
            "EvolveVibration_K3220_Barcode_VALUE",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_K3220_Barcode_VALUE
          )
          .input(
            "EvolveVibration_Cycle_Start_VALUE",
            Evolve.Sql.Bit,
            data.K3220_077_K3220_077_Cycle_Start_VALUE
          )
          .input(
            "EvolveVibration_CycleStart_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_CycleStart_TIMESTAMP
          )
          .input(
            "EvolveVibration_Cycle_Stop_VALUE",
            Evolve.Sql.Bit,
            data.K3220_077_K3220_077_Cycle_Stop_VALUE
          )
          .input(
            "EvolveVibration_CycleStop_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_CycleStop_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_01_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_01_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_02_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_02_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_03_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_03_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_05_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_05_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_06_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_06_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_06_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_06_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_06_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_06_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_06_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_06_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_07_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_07_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_07_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_07_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_07_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_07_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_07_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_07_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_08_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_08_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_08_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_08_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_08_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_08_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_08_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_08_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_09_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_09_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_09_VALUE",
            Evolve.Sql.Float,
            data.K3220_077_K3220_077_Input_Parameter_09_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_09_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_09_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_09_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_09_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_10_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_10_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_10_VALUE",
            Evolve.Sql.Float,
            data.K3220_077_K3220_077_Input_Parameter_10_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_10_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_10_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_10_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_10_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_11_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_11_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_11_VALUE",
            Evolve.Sql.Float,
            data.K3220_077_K3220_077_Input_Parameter_11_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_11_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_11_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_11_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_11_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_12_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_12_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_12_VALUE",
            Evolve.Sql.Float,
            data.K3220_077_K3220_077_Input_Parameter_12_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_12_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_12_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_12_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_12_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_13_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_13_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_13_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_13_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_13_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_13_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_13_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_13_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_14_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_14_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_14_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_14_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_14_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_14_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_14_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_14_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_15_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_15_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_15_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_15_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_15_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_15_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_15_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_15_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_16_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_16_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_16_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_16_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_16_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_16_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_16_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_16_QUALITY
          )
          .input(
            "EvolveVibration_Machine_Start_VALUE",
            Evolve.Sql.Bit,
            data.K3220_077_K3220_077_Machine_Start_VALUE
          )
          .input(
            "EvolveVibration_Machine_Status_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Machine_Status_VALUE
          )
          .input(
            "EvolveVibration_Machine_at_Home_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Machine_at_Home_VALUE
          )
          .input(
            "EvolveVibration_Machine_at_Home_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Machine_at_Home_TIMESTAMP
          )
          .input(
            "EvolveVibration_Part_NOK_VALUE",
            Evolve.Sql.Bit,
            data.K3220_077_K3220_077_Part_NOK_VALUE
          )
          .input(
            "EvolveVibration_Part_Ok_VALUE",
            Evolve.Sql.Bit,
            data.K3220_077_K3220_077_Part_Ok_VALUE
          )

          .query(
            "INSERT INTO EvolveVibration (EvolveVibration_K3220_Barcode_VALUE,EvolveVibration_Cycle_Start_VALUE,EvolveVibration_CycleStart_TIMESTAMP,EvolveVibration_Cycle_Stop_VALUE,EvolveVibration_CycleStop_TIMESTAMP,EvolveVibration_Input_Parameter_01_VALUE,EvolveVibration_Input_Parameter_02_VALUE,EvolveVibration_Input_Parameter_03_VALUE,EvolveVibration_Input_Parameter_05_VALUE,EvolveVibration_Input_Parameter_06_NUMERICID,EvolveVibration_Input_Parameter_06_VALUE,EvolveVibration_Input_Parameter_06_TIMESTAMP,EvolveVibration_Input_Parameter_06_QUALITY,EvolveVibration_Input_Parameter_07_NUMERICID,EvolveVibration_Input_Parameter_07_VALUE,EvolveVibration_Input_Parameter_07_TIMESTAMP,EvolveVibration_Input_Parameter_07_QUALITY,EvolveVibration_Input_Parameter_08_NUMERICID,EvolveVibration_Input_Parameter_08_VALUE,EvolveVibration_Input_Parameter_08_TIMESTAMP,EvolveVibration_Input_Parameter_08_QUALITY,EvolveVibration_Input_Parameter_09_NUMERICID,EvolveVibration_Input_Parameter_09_VALUE,EvolveVibration_Input_Parameter_09_TIMESTAMP,EvolveVibration_Input_Parameter_09_QUALITY,EvolveVibration_Input_Parameter_10_NUMERICID,EvolveVibration_Input_Parameter_10_VALUE,EvolveVibration_Input_Parameter_10_TIMESTAMP,EvolveVibration_Input_Parameter_10_QUALITY,EvolveVibration_Input_Parameter_11_NUMERICID,EvolveVibration_Input_Parameter_11_VALUE,EvolveVibration_Input_Parameter_11_TIMESTAMP,EvolveVibration_Input_Parameter_11_QUALITY,EvolveVibration_Input_Parameter_12_NUMERICID,EvolveVibration_Input_Parameter_12_VALUE,EvolveVibration_Input_Parameter_12_TIMESTAMP,EvolveVibration_Input_Parameter_12_QUALITY,EvolveVibration_Input_Parameter_13_NUMERICID,EvolveVibration_Input_Parameter_13_VALUE,EvolveVibration_Input_Parameter_13_TIMESTAMP,EvolveVibration_Input_Parameter_13_QUALITY,EvolveVibration_Input_Parameter_14_NUMERICID,EvolveVibration_Input_Parameter_14_VALUE,EvolveVibration_Input_Parameter_14_TIMESTAMP,EvolveVibration_Input_Parameter_14_QUALITY,EvolveVibration_Input_Parameter_15_NUMERICID,EvolveVibration_Input_Parameter_15_VALUE,EvolveVibration_Input_Parameter_15_TIMESTAMP,EvolveVibration_Input_Parameter_15_QUALITY,EvolveVibration_Input_Parameter_16_NUMERICID,EvolveVibration_Input_Parameter_16_VALUE,EvolveVibration_Input_Parameter_16_TIMESTAMP,EvolveVibration_Input_Parameter_16_QUALITY,EvolveVibration_Machine_Start_VALUE,EvolveVibration_Machine_Status_VALUE,EvolveVibration_Machine_at_Home_VALUE,EvolveVibration_Machine_at_Home_TIMESTAMP,EvolveVibration_Part_NOK_VALUE,EvolveVibration_Part_Ok_VALUE) VALUES (@EvolveVibration_K3220_Barcode_VALUE,@EvolveVibration_Cycle_Start_VALUE,@EvolveVibration_CycleStart_TIMESTAMP,@EvolveVibration_Cycle_Stop_VALUE,@EvolveVibration_CycleStop_TIMESTAMP,@EvolveVibration_Input_Parameter_01_VALUE,@EvolveVibration_Input_Parameter_02_VALUE,@EvolveVibration_Input_Parameter_03_VALUE,@EvolveVibration_Input_Parameter_05_VALUE,@EvolveVibration_Input_Parameter_06_NUMERICID,@EvolveVibration_Input_Parameter_06_VALUE,@EvolveVibration_Input_Parameter_06_TIMESTAMP,@EvolveVibration_Input_Parameter_06_QUALITY,@EvolveVibration_Input_Parameter_07_NUMERICID,@EvolveVibration_Input_Parameter_07_VALUE,@EvolveVibration_Input_Parameter_07_TIMESTAMP,@EvolveVibration_Input_Parameter_07_QUALITY,@EvolveVibration_Input_Parameter_08_NUMERICID,@EvolveVibration_Input_Parameter_08_VALUE,@EvolveVibration_Input_Parameter_08_TIMESTAMP,@EvolveVibration_Input_Parameter_08_QUALITY,@EvolveVibration_Input_Parameter_09_NUMERICID,@EvolveVibration_Input_Parameter_09_VALUE,@EvolveVibration_Input_Parameter_09_TIMESTAMP,@EvolveVibration_Input_Parameter_09_QUALITY,@EvolveVibration_Input_Parameter_10_NUMERICID,@EvolveVibration_Input_Parameter_10_VALUE,@EvolveVibration_Input_Parameter_10_TIMESTAMP,@EvolveVibration_Input_Parameter_10_QUALITY,@EvolveVibration_Input_Parameter_11_NUMERICID,@EvolveVibration_Input_Parameter_11_VALUE,@EvolveVibration_Input_Parameter_11_TIMESTAMP,@EvolveVibration_Input_Parameter_11_QUALITY,@EvolveVibration_Input_Parameter_12_NUMERICID,@EvolveVibration_Input_Parameter_12_VALUE,@EvolveVibration_Input_Parameter_12_TIMESTAMP,@EvolveVibration_Input_Parameter_12_QUALITY,@EvolveVibration_Input_Parameter_13_NUMERICID,@EvolveVibration_Input_Parameter_13_VALUE,@EvolveVibration_Input_Parameter_13_TIMESTAMP,@EvolveVibration_Input_Parameter_13_QUALITY,@EvolveVibration_Input_Parameter_14_NUMERICID,@EvolveVibration_Input_Parameter_14_VALUE,@EvolveVibration_Input_Parameter_14_TIMESTAMP,@EvolveVibration_Input_Parameter_14_QUALITY,@EvolveVibration_Input_Parameter_15_NUMERICID,@EvolveVibration_Input_Parameter_15_VALUE,@EvolveVibration_Input_Parameter_15_TIMESTAMP,@EvolveVibration_Input_Parameter_15_QUALITY,@EvolveVibration_Input_Parameter_16_NUMERICID,@EvolveVibration_Input_Parameter_16_VALUE,@EvolveVibration_Input_Parameter_16_TIMESTAMP,@EvolveVibration_Input_Parameter_16_QUALITY,@EvolveVibration_Machine_Start_VALUE,@EvolveVibration_Machine_Status_VALUE,@EvolveVibration_Machine_at_Home_VALUE,@EvolveVibration_Machine_at_Home_TIMESTAMP,@EvolveVibration_Part_NOK_VALUE,@EvolveVibration_Part_Ok_VALUE)",
            err => {
              if (err) {
                Evolve.Log.error(
                  "Error When Insert EvolveVibration : " + err.message
                ); // Print All Mesaage.
              }
            }
          );

        if (result instanceof Error) {
          console.log("Error in Vibration Insert ::", result.parameters); // Print All Paramiter
        }
      } else {
        console.log(
          "update :: EvolveVibration_K3220_Barcode_VALUE",
          data.K3220_077_K3220_077_Machine_at_Home_VALUE
        );
        // K3220_077_K3220_077_Input_Parameter_01_VALUE
        // console.log("Before >>>>>>> Data : ", data)
        // console.log("Before >>>>>>> oldrecord.recordset[0] : ", oldrecord.recordset[0])

        data.K3220_077_K3220_077_Input_Parameter_01_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_01_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_01_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_02_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_02_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_02_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_03_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_03_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_03_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_05_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_05_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_05_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_06_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_06_NUMERICID
            : oldrecord.recordset[0]
              .EvolveVibration_Input_Parameter_06_NUMERICID;
        data.K3220_077_K3220_077_Input_Parameter_06_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_06_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_06_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_06_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_06_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_06_TIMESTAMP.toISOString();
        data.K3220_077_K3220_077_Input_Parameter_06_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_06_QUALITY
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_06_QUALITY;
        data.K3220_077_K3220_077_Input_Parameter_07_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_07_NUMERICID
            : oldrecord.recordset[0]
              .EvolveVibration_Input_Parameter_07_NUMERICID;
        data.K3220_077_K3220_077_Input_Parameter_07_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_07_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_07_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_07_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_07_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_07_TIMESTAMP.toISOString();
        data.K3220_077_K3220_077_Input_Parameter_07_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_07_QUALITY
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_07_QUALITY;
        data.K3220_077_K3220_077_Input_Parameter_08_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_08_NUMERICID
            : oldrecord.recordset[0]
              .EvolveVibration_Input_Parameter_08_NUMERICID;
        data.K3220_077_K3220_077_Input_Parameter_08_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_08_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_08_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_08_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_08_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_08_TIMESTAMP.toISOString();
        data.K3220_077_K3220_077_Input_Parameter_08_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_08_QUALITY
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_08_QUALITY;
        data.K3220_077_K3220_077_Input_Parameter_09_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_09_NUMERICID
            : oldrecord.recordset[0]
              .EvolveVibration_Input_Parameter_09_NUMERICID;
        data.K3220_077_K3220_077_Input_Parameter_09_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_09_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_09_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_09_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_09_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_09_TIMESTAMP.toISOString();
        data.K3220_077_K3220_077_Input_Parameter_09_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_09_QUALITY
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_09_QUALITY;
        data.K3220_077_K3220_077_Input_Parameter_10_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_10_NUMERICID
            : oldrecord.recordset[0]
              .EvolveVibration_Input_Parameter_10_NUMERICID;
        data.K3220_077_K3220_077_Input_Parameter_10_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_10_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_10_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_10_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_10_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_10_TIMESTAMP.toISOString();
        data.K3220_077_K3220_077_Input_Parameter_10_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_10_QUALITY
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_10_QUALITY;
        data.K3220_077_K3220_077_Input_Parameter_11_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_11_NUMERICID
            : oldrecord.recordset[0]
              .EvolveVibration_Input_Parameter_11_NUMERICID;
        data.K3220_077_K3220_077_Input_Parameter_11_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_11_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_11_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_11_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_11_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_11_TIMESTAMP.toISOString();
        data.K3220_077_K3220_077_Input_Parameter_11_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_11_QUALITY
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_11_QUALITY;
        data.K3220_077_K3220_077_Input_Parameter_12_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_12_NUMERICID
            : oldrecord.recordset[0]
              .EvolveVibration_Input_Parameter_12_NUMERICID;
        data.K3220_077_K3220_077_Input_Parameter_12_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_12_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_12_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_12_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_12_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_12_TIMESTAMP.toISOString();
        data.K3220_077_K3220_077_Input_Parameter_12_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_12_QUALITY
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_12_QUALITY;
        data.K3220_077_K3220_077_Input_Parameter_13_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_13_NUMERICID
            : oldrecord.recordset[0]
              .EvolveVibration_Input_Parameter_13_NUMERICID;
        data.K3220_077_K3220_077_Input_Parameter_13_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_13_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_13_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_13_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_13_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_13_TIMESTAMP.toISOString();
        data.K3220_077_K3220_077_Input_Parameter_13_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_13_QUALITY
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_13_QUALITY;
        data.K3220_077_K3220_077_Input_Parameter_14_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_14_NUMERICID
            : oldrecord.recordset[0]
              .EvolveVibration_Input_Parameter_14_NUMERICID;
        data.K3220_077_K3220_077_Input_Parameter_14_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_14_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_14_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_14_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_14_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_14_TIMESTAMP.toISOString();
        data.K3220_077_K3220_077_Input_Parameter_14_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_14_QUALITY
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_14_QUALITY;
        data.K3220_077_K3220_077_Input_Parameter_15_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_15_NUMERICID
            : oldrecord.recordset[0]
              .EvolveVibration_Input_Parameter_15_NUMERICID;
        data.K3220_077_K3220_077_Input_Parameter_15_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_15_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_15_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_15_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_15_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_15_TIMESTAMP.toISOString();
        data.K3220_077_K3220_077_Input_Parameter_15_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_15_QUALITY
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_15_QUALITY;
        data.K3220_077_K3220_077_Input_Parameter_16_NUMERICID =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_16_NUMERICID
            : oldrecord.recordset[0]
              .EvolveVibration_Input_Parameter_16_NUMERICID;
        data.K3220_077_K3220_077_Input_Parameter_16_VALUE =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_16_VALUE
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_16_VALUE;
        data.K3220_077_K3220_077_Input_Parameter_16_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_16_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_16_TIMESTAMP.toISOString();
        data.K3220_077_K3220_077_Input_Parameter_16_QUALITY =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Input_Parameter_16_QUALITY
            : oldrecord.recordset[0].EvolveVibration_Input_Parameter_16_QUALITY;

        console.log(
          "/*************************************************************************/"
        );
        console.log(
          "BEFORE : data.K3220_077_K3220_077_Part_Ok_VALUE :::",
          data.K3220_077_K3220_077_Part_Ok_VALUE
        );
        console.log(
          "BEFORE : oldrecord.recordset[0].EvolveVibration_Part_Ok_VALUE :::",
          oldrecord.recordset[0].EvolveVibration_Part_Ok_VALUE
        );
        console.log(
          "BEFORE : data.EvolveVibration_Cycle_Start_VALUE :::",
          data.EvolveVibration_Cycle_Start_VALUE
        );
        console.log(
          "BEFORE : oldrecord.recordset[0].EvolveVibration_Cycle_Start_VALUE :::",
          oldrecord.recordset[0].EvolveVibration_Cycle_Start_VALUE
        );
        console.log(
          "BEFORE : data.EvolveVibration_Cycle_Stop_VALUE :::",
          data.EvolveVibration_Cycle_Stop_VALUE
        );
        console.log(
          "BEFORE : oldrecord.recordset[0].EvolveVibration_Cycle_Stop_VALUE :::",
          oldrecord.recordset[0].EvolveVibration_Cycle_Stop_VALUE
        );
        console.log(
          "BEFORE : data.EvolveVibration_Machine_Start_VALUE :::",
          data.EvolveVibration_Machine_Start_VALUE
        );
        console.log(
          "BEFORE : oldrecord.recordset[0].EvolveVibration_Machine_Start_VALUE :::",
          oldrecord.recordset[0].EvolveVibration_Machine_Start_VALUE
        );
        console.log(
          "BEFORE : data.EvolveVibration_Part_NOK_VALUE :::",
          data.EvolveVibration_Part_NOK_VALUE
        );
        console.log(
          "BEFORE : oldrecord.recordset[0].EvolveVibration_Part_NOK_VALUE :::",
          oldrecord.recordset[0].EvolveVibration_Part_NOK_VALUE
        );

        if (
          data.K3220_077_K3220_077_Part_Ok_VALUE == 1 ||
          data.K3220_077_K3220_077_Part_Ok_VALUE == true
        ) {
          data.K3220_077_K3220_077_Part_Ok_VALUE = 1;
        } else {
          data.K3220_077_K3220_077_Part_Ok_VALUE =
            oldrecord.recordset[0].EvolveVibration_Part_Ok_VALUE == true ||
              oldrecord.recordset[0].EvolveVibration_Part_Ok_VALUE == 1
              ? 1
              : 0;
        }

        if (
          data.EvolveVibration_Cycle_Start_VALUE == 1 ||
          data.EvolveVibration_Cycle_Start_VALUE == true
        ) {
          data.EvolveVibration_Cycle_Start_VALUE = 1;
        } else {
          data.EvolveVibration_Cycle_Start_VALUE =
            oldrecord.recordset[0].EvolveVibration_Cycle_Start_VALUE == true ||
              oldrecord.recordset[0].EvolveVibration_Cycle_Start_VALUE == 1
              ? 1
              : 0;
        }

        if (
          data.EvolveVibration_Cycle_Stop_VALUE == 1 ||
          data.EvolveVibration_Cycle_Stop_VALUE == true
        ) {
          data.EvolveVibration_Cycle_Stop_VALUE = 1;
        } else {
          data.EvolveVibration_Cycle_Stop_VALUE =
            oldrecord.recordset[0].EvolveVibration_Cycle_Stop_VALUE == true ||
              oldrecord.recordset[0].EvolveVibration_Cycle_Stop_VALUE == 1
              ? 1
              : 0;
        }

        if (
          data.EvolveVibration_Machine_Start_VALUE == 1 ||
          data.EvolveVibration_Machine_Start_VALUE == true
        ) {
          data.EvolveVibration_Machine_Start_VALUE = 1;
        } else {
          data.EvolveVibration_Machine_Start_VALUE =
            oldrecord.recordset[0].EvolveVibration_Machine_Start_VALUE ==
              true ||
              oldrecord.recordset[0].EvolveVibration_Machine_Start_VALUE == 1
              ? 1
              : 0;
        }

        if (
          data.EvolveVibration_Part_NOK_VALUE == 1 ||
          data.EvolveVibration_Part_NOK_VALUE == true
        ) {
          data.EvolveVibration_Part_NOK_VALUE = 1;
        } else {
          data.EvolveVibration_Part_NOK_VALUE =
            oldrecord.recordset[0].EvolveVibration_Part_NOK_VALUE == true ||
              oldrecord.recordset[0].EvolveVibration_Part_NOK_VALUE == 1
              ? 1
              : 0;
        }

        console.log(
          "AFTER : data.K3220_077_K3220_077_Part_Ok_VALUE :::",
          data.K3220_077_K3220_077_Part_Ok_VALUE
        );
        console.log(
          "AFTER : oldrecord.recordset[0].EvolveVibration_Part_Ok_VALUE :::",
          oldrecord.recordset[0].EvolveVibration_Part_Ok_VALUE
        );
        console.log(
          "AFTER : data.EvolveVibration_Cycle_Start_VALUE :::",
          data.EvolveVibration_Cycle_Start_VALUE
        );
        console.log(
          "AFTER : oldrecord.recordset[0].EvolveVibration_Cycle_Start_VALUE :::",
          oldrecord.recordset[0].EvolveVibration_Cycle_Start_VALUE
        );
        console.log(
          "AFTER : data.EvolveVibration_Cycle_Stop_VALUE :::",
          data.EvolveVibration_Cycle_Stop_VALUE
        );
        console.log(
          "AFTER : oldrecord.recordset[0].EvolveVibration_Cycle_Stop_VALUE :::",
          oldrecord.recordset[0].EvolveVibration_Cycle_Stop_VALUE
        );
        console.log(
          "AFTER : data.EvolveVibration_Machine_Start_VALUE :::",
          data.EvolveVibration_Machine_Start_VALUE
        );
        console.log(
          "AFTER : oldrecord.recordset[0].EvolveVibration_Machine_Start_VALUE :::",
          oldrecord.recordset[0].EvolveVibration_Machine_Start_VALUE
        );
        console.log(
          "AFTER : data.EvolveVibration_Part_NOK_VALUE :::",
          data.EvolveVibration_Part_NOK_VALUE
        );
        console.log(
          "AFTER : oldrecord.recordset[0].EvolveVibration_Part_NOK_VALUE :::",
          oldrecord.recordset[0].EvolveVibration_Part_NOK_VALUE
        );
        console.log(
          "/*************************************************************************/"
        );

        // convert true/false to 1/0

        data.K3220_077_K3220_077_Machine_Start_VALUE =
          data.K3220_077_K3220_077_Machine_Start_VALUE == true ? 1 : 0;
        data.K3220_077_K3220_077_Cycle_Start_VALUE =
          data.K3220_077_K3220_077_Cycle_Start_VALUE == true ? 1 : 0;
        //data.K3220_077_K3220_077_Part_Ok_VALUE = (data.K3220_077_K3220_077_Part_Ok_VALUE == true) ? 1 : 0;
        data.K3220_077_K3220_077_Part_NOK_VALUE =
          data.K3220_077_K3220_077_Part_NOK_VALUE == true ? 1 : 0;
        data.K3220_077_K3220_077_Cycle_Stop_VALUE =
          data.K3220_077_K3220_077_Cycle_Stop_VALUE == true ? 1 : 0;

        // Machine At Home
        data.K3220_077_K3220_077_Machine_at_Home_VALUE =
          oldrecord.recordset[0].EvolveVibration_Machine_at_Home_VALUE == 2
            ? 2
            : data.K3220_077_K3220_077_Machine_at_Home_VALUE;

        // OLD Time Stemp form Table to new new Inserted Formate...
        data.K3220_077_K3220_077_Machine_at_Home_TIMESTAMP =
          data.K3220_077_K3220_077_Machine_at_Home_VALUE == 2
            ? data.K3220_077_K3220_077_Machine_at_Home_TIMESTAMP
            : oldrecord.recordset[0]
              .EvolveVibration_Machine_at_Home_TIMESTAMP == null
              ? data.K3220_077_K3220_077_Machine_at_Home_TIMESTAMP
              : oldrecord.recordset[0].EvolveVibration_Machine_at_Home_TIMESTAMP.toISOString();

        // Cycle Start TimeStamp
        data.K3220_077_K3220_077_CycleStart_TIMESTAMP =
          data.K3220_077_K3220_077_Cycle_Start_VALUE == true
            ? data.K3220_077_K3220_077_CycleStart_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_CycleStart_TIMESTAMP ==
              null
              ? data.K3220_077_K3220_077_CycleStart_TIMESTAMP
              : oldrecord.recordset[0].EvolveVibration_CycleStart_TIMESTAMP.toISOString();

        // Cycle Stop TimeStamp
        data.K3220_077_K3220_077_CycleStop_TIMESTAMP =
          data.K3220_077_K3220_077_Cycle_Stop_VALUE == true
            ? data.K3220_077_K3220_077_CycleStop_TIMESTAMP
            : oldrecord.recordset[0].EvolveVibration_CycleStop_TIMESTAMP == null
              ? data.K3220_077_K3220_077_CycleStop_TIMESTAMP
              : oldrecord.recordset[0].EvolveVibration_CycleStop_TIMESTAMP.toISOString();

        /*
                        let query = "UPDATE EvolveVibration SET EvolveVibration_Cycle_Start_VALUE="+data.K3220_077_K3220_077_Cycle_Start_VALUE+",EvolveVibration_Cycle_Stop_VALUE="+data.K3220_077_K3220_077_Cycle_Start_VALUE+",EvolveVibration_Input_Parameter_01_VALUE="+data.K3220_077_K3220_077_Input_Parameter_01_VALUE+",EvolveVibration_Input_Parameter_02_VALUE="+data.K3220_077_K3220_077_Input_Parameter_02_VALUE+",EvolveVibration_Input_Parameter_03_VALUE="+data.K3220_077_K3220_077_Input_Parameter_03_VALUE+",EvolveVibration_Input_Parameter_05_VALUE="+data.K3220_077_K3220_077_Input_Parameter_05_VALUE+",EvolveVibration_Input_Parameter_06_NUMERICID="+data.K3220_077_K3220_077_Input_Parameter_06_NUMERICID+",EvolveVibration_Input_Parameter_06_VALUE="+data.K3220_077_K3220_077_Input_Parameter_06_VALUE+",EvolveVibration_Input_Parameter_06_TIMESTAMP='"+data.K3220_077_K3220_077_Input_Parameter_06_TIMESTAMP+"',EvolveVibration_Input_Parameter_06_QUALITY="+data.K3220_077_K3220_077_Input_Parameter_06_QUALITY+",EvolveVibration_Input_Parameter_07_NUMERICID="+data.K3220_077_K3220_077_Input_Parameter_07_NUMERICID+",EvolveVibration_Input_Parameter_07_VALUE="+data.K3220_077_K3220_077_Input_Parameter_07_VALUE+",EvolveVibration_Input_Parameter_07_TIMESTAMP='"+data.K3220_077_K3220_077_Input_Parameter_07_TIMESTAMP+"',EvolveVibration_Input_Parameter_07_QUALITY="+data.K3220_077_K3220_077_Input_Parameter_07_QUALITY+",EvolveVibration_Input_Parameter_08_NUMERICID="+data.K3220_077_K3220_077_Input_Parameter_08_NUMERICID+",EvolveVibration_Input_Parameter_08_VALUE="+data.K3220_077_K3220_077_Input_Parameter_08_VALUE+",EvolveVibration_Input_Parameter_08_TIMESTAMP='"+data.K3220_077_K3220_077_Input_Parameter_08_TIMESTAMP+"',EvolveVibration_Input_Parameter_08_QUALITY="+data.K3220_077_K3220_077_Input_Parameter_08_QUALITY+",EvolveVibration_Input_Parameter_09_NUMERICID="+data.K3220_077_K3220_077_Input_Parameter_09_NUMERICID+",EvolveVibration_Input_Parameter_09_VALUE="+data.K3220_077_K3220_077_Input_Parameter_09_VALUE+",EvolveVibration_Input_Parameter_09_TIMESTAMP='"+data.K3220_077_K3220_077_Input_Parameter_09_TIMESTAMP+"',EvolveVibration_Input_Parameter_09_QUALITY="+data.K3220_077_K3220_077_Input_Parameter_09_QUALITY+",EvolveVibration_Input_Parameter_10_NUMERICID="+data.K3220_077_K3220_077_Input_Parameter_10_NUMERICID+",EvolveVibration_Input_Parameter_10_VALUE="+data.K3220_077_K3220_077_Input_Parameter_10_VALUE+",EvolveVibration_Input_Parameter_10_TIMESTAMP='"+data.K3220_077_K3220_077_Input_Parameter_10_TIMESTAMP+"',EvolveVibration_Input_Parameter_10_QUALITY="+data.K3220_077_K3220_077_Input_Parameter_10_QUALITY+",EvolveVibration_Input_Parameter_11_NUMERICID="+data.K3220_077_K3220_077_Input_Parameter_11_NUMERICID+",EvolveVibration_Input_Parameter_11_VALUE="+data.K3220_077_K3220_077_Input_Parameter_11_VALUE+",EvolveVibration_Input_Parameter_11_TIMESTAMP='"+data.K3220_077_K3220_077_Input_Parameter_11_TIMESTAMP+"',EvolveVibration_Input_Parameter_11_QUALITY="+data.K3220_077_K3220_077_Input_Parameter_11_QUALITY+",EvolveVibration_Input_Parameter_12_NUMERICID="+data.K3220_077_K3220_077_Input_Parameter_12_NUMERICID+",EvolveVibration_Input_Parameter_12_VALUE="+data.K3220_077_K3220_077_Input_Parameter_12_VALUE+",EvolveVibration_Input_Parameter_12_TIMESTAMP='"+data.K3220_077_K3220_077_Input_Parameter_12_TIMESTAMP+"',EvolveVibration_Input_Parameter_12_QUALITY="+data.K3220_077_K3220_077_Input_Parameter_12_QUALITY+",EvolveVibration_Input_Parameter_13_NUMERICID="+data.K3220_077_K3220_077_Input_Parameter_13_NUMERICID+",EvolveVibration_Input_Parameter_13_VALUE="+data.K3220_077_K3220_077_Input_Parameter_13_VALUE+",EvolveVibration_Input_Parameter_13_TIMESTAMP='"+data.K3220_077_K3220_077_Input_Parameter_13_TIMESTAMP+"',EvolveVibration_Input_Parameter_13_QUALITY="+data.K3220_077_K3220_077_Input_Parameter_13_QUALITY+",EvolveVibration_Input_Parameter_14_NUMERICID="+data.K3220_077_K3220_077_Input_Parameter_14_NUMERICID+",EvolveVibration_Input_Parameter_14_VALUE="+data.K3220_077_K3220_077_Input_Parameter_14_VALUE+",EvolveVibration_Input_Parameter_14_TIMESTAMP='"+data.K3220_077_K3220_077_Input_Parameter_14_TIMESTAMP+"',EvolveVibration_Input_Parameter_14_QUALITY="+data.K3220_077_K3220_077_Input_Parameter_14_QUALITY+",EvolveVibration_Input_Parameter_15_NUMERICID="+data.K3220_077_K3220_077_Input_Parameter_15_NUMERICID+",EvolveVibration_Input_Parameter_15_VALUE="+data.K3220_077_K3220_077_Input_Parameter_15_VALUE+",EvolveVibration_Input_Parameter_15_TIMESTAMP='"+data.K3220_077_K3220_077_Input_Parameter_15_TIMESTAMP+"',EvolveVibration_Input_Parameter_15_QUALITY="+data.K3220_077_K3220_077_Input_Parameter_15_QUALITY+",EvolveVibration_Input_Parameter_16_NUMERICID="+data.K3220_077_K3220_077_Input_Parameter_16_NUMERICID+",EvolveVibration_Input_Parameter_16_VALUE="+data.K3220_077_K3220_077_Input_Parameter_16_VALUE+",EvolveVibration_Input_Parameter_16_TIMESTAMP='"+data.K3220_077_K3220_077_Input_Parameter_16_TIMESTAMP+"',EvolveVibration_Input_Parameter_16_QUALITY="+data.K3220_077_K3220_077_Input_Parameter_16_QUALITY+",EvolveVibration_Machine_Start_VALUE="+data.K3220_077_K3220_077_Machine_Start_VALUE+",EvolveVibration_Machine_Status_VALUE="+data.K3220_077_K3220_077_Machine_Status_VALUE+",EvolveVibration_Machine_at_Home_VALUE="+data.K3220_077_K3220_077_Machine_at_Home_VALUE+",EvolveVibration_Machine_at_Home_TIMESTAMP='"+data.K3220_077_K3220_077_Machine_at_Home_TIMESTAMP+"',EvolveVibration_Part_NOK_VALUE="+data.K3220_077_K3220_077_Part_NOK_VALUE+",EvolveVibration_Part_Ok_VALUE="+data.K3220_077_K3220_077_Part_Ok_VALUE+" WHERE EvolveVibration_K3220_Barcode_VALUE="+data.K3220_077_K3220_077_K3220_Barcode_VALUE+""
        */

        //  console.log("query >>>>>>>>>>>>", query)

        // result = await Evolve.SqlPool.request()
        // .query(query)

        result = await Evolve.SqlPool.request()
          .input(
            "EvolveVibration_K3220_Barcode_VALUE",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_K3220_Barcode_VALUE
          )
          .input(
            "EvolveVibration_Machine_Start_VALUE",
            Evolve.Sql.Bit,
            data.K3220_077_K3220_077_Machine_Start_VALUE
          )
          .input(
            "EvolveVibration_Machine_Status_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Machine_Status_VALUE
          )
          .input(
            "EvolveVibration_Machine_at_Home_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Machine_at_Home_VALUE
          )
          .input(
            "EvolveVibration_Machine_at_Home_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Machine_at_Home_TIMESTAMP
          )
          .input(
            "EvolveVibration_Part_NOK_VALUE",
            Evolve.Sql.Bit,
            data.K3220_077_K3220_077_Part_NOK_VALUE
          )
          .input(
            "EvolveVibration_Part_Ok_VALUE",
            Evolve.Sql.Bit,
            data.K3220_077_K3220_077_Part_Ok_VALUE
          )
          .input(
            "EvolveVibration_Cycle_Start_VALUE",
            Evolve.Sql.Bit,
            data.K3220_077_K3220_077_Cycle_Start_VALUE
          )
          .input(
            "EvolveVibration_CycleStart_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_CycleStart_TIMESTAMP
          )
          .input(
            "EvolveVibration_Cycle_Stop_VALUE",
            Evolve.Sql.Bit,
            data.K3220_077_K3220_077_Cycle_Stop_VALUE
          )
          .input(
            "EvolveVibration_CycleStop_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_CycleStop_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_01_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_01_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_02_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_02_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_03_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_03_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_05_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_05_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_06_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_06_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_06_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_06_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_06_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_06_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_06_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_06_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_07_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_07_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_07_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_07_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_07_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_07_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_07_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_07_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_08_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_08_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_08_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_08_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_08_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_08_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_08_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_08_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_09_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_09_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_09_VALUE",
            Evolve.Sql.Float,
            data.K3220_077_K3220_077_Input_Parameter_09_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_09_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_09_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_09_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_09_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_10_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_10_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_10_VALUE",
            Evolve.Sql.Float,
            data.K3220_077_K3220_077_Input_Parameter_10_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_10_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_10_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_10_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_10_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_11_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_11_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_11_VALUE",
            Evolve.Sql.Float,
            data.K3220_077_K3220_077_Input_Parameter_11_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_11_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_11_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_11_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_11_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_12_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_12_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_12_VALUE",
            Evolve.Sql.Float,
            data.K3220_077_K3220_077_Input_Parameter_12_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_12_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_12_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_12_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_12_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_13_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_13_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_13_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_13_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_13_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_13_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_13_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_13_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_14_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_14_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_14_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_14_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_14_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_14_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_14_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_14_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_15_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_15_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_15_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_15_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_15_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_15_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_15_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_15_QUALITY
          )
          .input(
            "EvolveVibration_Input_Parameter_16_NUMERICID",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_16_NUMERICID
          )
          .input(
            "EvolveVibration_Input_Parameter_16_VALUE",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_16_VALUE
          )
          .input(
            "EvolveVibration_Input_Parameter_16_TIMESTAMP",
            Evolve.Sql.NVarChar,
            data.K3220_077_K3220_077_Input_Parameter_16_TIMESTAMP
          )
          .input(
            "EvolveVibration_Input_Parameter_16_QUALITY",
            Evolve.Sql.Int,
            data.K3220_077_K3220_077_Input_Parameter_16_QUALITY
          )
          .query(
            "UPDATE EvolveVibration SET EvolveVibration_Cycle_Start_VALUE=@EvolveVibration_Cycle_Start_VALUE,EvolveVibration_CycleStart_TIMESTAMP=@EvolveVibration_CycleStart_TIMESTAMP,EvolveVibration_Cycle_Stop_VALUE=@EvolveVibration_Cycle_Stop_VALUE,EvolveVibration_CycleStop_TIMESTAMP=@EvolveVibration_CycleStop_TIMESTAMP,EvolveVibration_Input_Parameter_01_VALUE=@EvolveVibration_Input_Parameter_01_VALUE,EvolveVibration_Input_Parameter_02_VALUE=@EvolveVibration_Input_Parameter_02_VALUE,EvolveVibration_Input_Parameter_03_VALUE=@EvolveVibration_Input_Parameter_03_VALUE,EvolveVibration_Input_Parameter_05_VALUE=@EvolveVibration_Input_Parameter_05_VALUE,EvolveVibration_Input_Parameter_06_NUMERICID=@EvolveVibration_Input_Parameter_06_NUMERICID,EvolveVibration_Input_Parameter_06_VALUE=@EvolveVibration_Input_Parameter_06_VALUE,EvolveVibration_Input_Parameter_06_TIMESTAMP=@EvolveVibration_Input_Parameter_06_TIMESTAMP,EvolveVibration_Input_Parameter_06_QUALITY=@EvolveVibration_Input_Parameter_06_QUALITY,EvolveVibration_Input_Parameter_07_NUMERICID=@EvolveVibration_Input_Parameter_07_NUMERICID,EvolveVibration_Input_Parameter_07_VALUE=@EvolveVibration_Input_Parameter_07_VALUE,EvolveVibration_Input_Parameter_07_TIMESTAMP=@EvolveVibration_Input_Parameter_07_TIMESTAMP,EvolveVibration_Input_Parameter_07_QUALITY=@EvolveVibration_Input_Parameter_07_QUALITY,EvolveVibration_Input_Parameter_08_NUMERICID=@EvolveVibration_Input_Parameter_08_NUMERICID,EvolveVibration_Input_Parameter_08_VALUE=@EvolveVibration_Input_Parameter_08_VALUE,EvolveVibration_Input_Parameter_08_TIMESTAMP=@EvolveVibration_Input_Parameter_08_TIMESTAMP,EvolveVibration_Input_Parameter_08_QUALITY=@EvolveVibration_Input_Parameter_08_QUALITY,EvolveVibration_Input_Parameter_09_NUMERICID=@EvolveVibration_Input_Parameter_09_NUMERICID,EvolveVibration_Input_Parameter_09_VALUE=@EvolveVibration_Input_Parameter_09_VALUE,EvolveVibration_Input_Parameter_09_TIMESTAMP=@EvolveVibration_Input_Parameter_09_TIMESTAMP,EvolveVibration_Input_Parameter_09_QUALITY=@EvolveVibration_Input_Parameter_09_QUALITY,EvolveVibration_Input_Parameter_10_NUMERICID=@EvolveVibration_Input_Parameter_10_NUMERICID,EvolveVibration_Input_Parameter_10_VALUE=@EvolveVibration_Input_Parameter_10_VALUE,EvolveVibration_Input_Parameter_10_TIMESTAMP=@EvolveVibration_Input_Parameter_10_TIMESTAMP,EvolveVibration_Input_Parameter_10_QUALITY=@EvolveVibration_Input_Parameter_10_QUALITY,EvolveVibration_Input_Parameter_11_NUMERICID=@EvolveVibration_Input_Parameter_11_NUMERICID,EvolveVibration_Input_Parameter_11_VALUE=@EvolveVibration_Input_Parameter_11_VALUE,EvolveVibration_Input_Parameter_11_TIMESTAMP=@EvolveVibration_Input_Parameter_11_TIMESTAMP,EvolveVibration_Input_Parameter_11_QUALITY=@EvolveVibration_Input_Parameter_11_QUALITY,EvolveVibration_Input_Parameter_12_NUMERICID=@EvolveVibration_Input_Parameter_12_NUMERICID,EvolveVibration_Input_Parameter_12_VALUE=@EvolveVibration_Input_Parameter_12_VALUE,EvolveVibration_Input_Parameter_12_TIMESTAMP=@EvolveVibration_Input_Parameter_12_TIMESTAMP,EvolveVibration_Input_Parameter_12_QUALITY=@EvolveVibration_Input_Parameter_12_QUALITY,EvolveVibration_Input_Parameter_13_NUMERICID=@EvolveVibration_Input_Parameter_13_NUMERICID,EvolveVibration_Input_Parameter_13_VALUE=@EvolveVibration_Input_Parameter_13_VALUE,EvolveVibration_Input_Parameter_13_TIMESTAMP=@EvolveVibration_Input_Parameter_13_TIMESTAMP,EvolveVibration_Input_Parameter_13_QUALITY=@EvolveVibration_Input_Parameter_13_QUALITY,EvolveVibration_Input_Parameter_14_NUMERICID=@EvolveVibration_Input_Parameter_14_NUMERICID,EvolveVibration_Input_Parameter_14_VALUE=@EvolveVibration_Input_Parameter_14_VALUE,EvolveVibration_Input_Parameter_14_TIMESTAMP=@EvolveVibration_Input_Parameter_14_TIMESTAMP,EvolveVibration_Input_Parameter_14_QUALITY=@EvolveVibration_Input_Parameter_14_QUALITY,EvolveVibration_Input_Parameter_15_NUMERICID=@EvolveVibration_Input_Parameter_15_NUMERICID,EvolveVibration_Input_Parameter_15_VALUE=@EvolveVibration_Input_Parameter_15_VALUE,EvolveVibration_Input_Parameter_15_TIMESTAMP=@EvolveVibration_Input_Parameter_15_TIMESTAMP,EvolveVibration_Input_Parameter_15_QUALITY=@EvolveVibration_Input_Parameter_15_QUALITY,EvolveVibration_Input_Parameter_16_NUMERICID=@EvolveVibration_Input_Parameter_16_NUMERICID,EvolveVibration_Input_Parameter_16_VALUE=@EvolveVibration_Input_Parameter_16_VALUE,EvolveVibration_Input_Parameter_16_TIMESTAMP=@EvolveVibration_Input_Parameter_16_TIMESTAMP,EvolveVibration_Input_Parameter_16_QUALITY=@EvolveVibration_Input_Parameter_16_QUALITY,EvolveVibration_Machine_Start_VALUE=@EvolveVibration_Machine_Start_VALUE,EvolveVibration_Machine_Status_VALUE=@EvolveVibration_Machine_Status_VALUE,EvolveVibration_Machine_at_Home_VALUE=@EvolveVibration_Machine_at_Home_VALUE,EvolveVibration_Machine_at_Home_TIMESTAMP=@EvolveVibration_Machine_at_Home_TIMESTAMP,EvolveVibration_Part_NOK_VALUE=@EvolveVibration_Part_NOK_VALUE,EvolveVibration_Part_Ok_VALUE=@EvolveVibration_Part_Ok_VALUE WHERE EvolveVibration_K3220_Barcode_VALUE=@EvolveVibration_K3220_Barcode_VALUE",
            err => {
              if (err) {
                //
                Evolve.Log.error(
                  "Error When Updates EvolveVibration : " + err.message
                ); // Print All Mesaage.
              }
            }
          );
        // console.log("Error in Vibration Updates ::", result.parameters) // Print All Paramiter
        if (result instanceof Error) {
          console.log("Error in Vibration Updates ::", result.parameters); // Print All Paramiter
        }
      }
      if (oldrecord.rowsAffected > 0) {
        // Update Sequance of Barcode...
        if (
          oldrecord.recordset[0].EvolveVibration_Machine_Start_VALUE == false &&
          oldrecord.recordset[0].EvolveVibration_Machine_at_Home_VALUE == 2
        ) {
          console.log(
            "Update Serial Data........",
            oldrecord.recordset[0].EvolveVibration_Machine_Start_VALUE
          );
          if (oldrecord.recordset[0].EvolveVibration_Part_Ok_VALUE == true) {
            return await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrdersDetail_Serial",
                Evolve.Sql.NVarChar,
                data.K3220_077_K3220_077_K3220_Barcode_VALUE
              )
              .query(
                "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = 2, EvolveProdOrdersDetail_NxtSeq = 3, EvolveProdOrdersDetail_Status = 'Completed' WHERE EvolveProdOrdersDetail_Serial=@EvolveProdOrdersDetail_Serial"
              );
          } else if (
            oldrecord.recordset[0].EvolveVibration_Part_NOK_VALUE == true
          ) {
            return await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrdersDetail_Serial",
                Evolve.Sql.NVarChar,
                data.K3220_077_K3220_077_K3220_Barcode_VALUE
              )
              .query(
                "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = 2, EvolveProdOrdersDetail_NxtSeq = 9, EvolveProdOrdersDetail_Status = 'Rejected' WHERE EvolveProdOrdersDetail_Serial=@EvolveProdOrdersDetail_Serial"
              );
          }
        } else {
          return result;
        }
      } else {
        return result;
      }
    } catch (error) {
      Evolve.Log.error("Vibataion Error " + error.message);
      return new Error("Vibataion Error " + error.message);
    }
  },

  saveVibrationData: async function (EvolveProdOrdersDetail_Serial) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          EvolveProdOrdersDetail_Serial
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = 2, EvolveProdOrdersDetail_NxtSeq = 3 WHERE EvolveProdOrdersDetail_Serial=@EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  checkMillingMachinBarcode: async function (barcode) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, barcode)
        .query(
          "SELECT epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_Code,ei.EvolveItem_Desc,ei.EvolveItem_CustPart FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Serial =@EvolveProdOrdersDetail_Serial AND epo.EvolveItem_ID = ei.EvolveItem_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 1 AND EvolveProdOrdersDetail_NxtSeq = 1"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getVibrationInProcess: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq =1 AND EvolveProdOrdersDetail_NxtSeq=2 AND epod.EvolveProdOrdersDetail_Status ='In Process' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getVibrationRejected: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 2 AND EvolveProdOrdersDetail_NxtSeq = 9 AND epod.EvolveProdOrdersDetail_Status ='Rejected' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getVibrationCount: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq =1 AND EvolveProdOrdersDetail_NxtSeq=2  AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // Initgration status

  getIntigrationStatusTotal: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(EvolveInTransQueue_ID) as count FROM EvolveInTransQueue"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getIntigrationStatusLoad: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(EvolveInTransQueue_ID) as count FROM EvolveInTransQueue WHERE  EvolveInTransQueue_LoadStatus = 'L'"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getIntigrationStatusQueue: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(EvolveInTransQueue_ID) as count FROM EvolveInTransQueue WHERE  EvolveInTransQueue_LoadStatus = 'P' "
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // Dashboard
  getDashboardTopStatusTotal: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Status !='Rejected'  AND epo.EvolveItem_ID = ei.EvolveItem_ID "
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getDashboardTopStatusComplited: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Status ='completed'  AND epo.EvolveItem_ID = ei.EvolveItem_ID "
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getDashboardTopStatusRejected: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Status ='Rejected'  AND epo.EvolveItem_ID = ei.EvolveItem_ID "
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMillingInProcess: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq =1 AND EvolveProdOrdersDetail_NxtSeq=1 AND epod.EvolveProdOrdersDetail_Status ='In Process' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMillingRejected: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq =1 AND EvolveProdOrdersDetail_NxtSeq=9 AND epod.EvolveProdOrdersDetail_Status ='Rejected' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMillingCount: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq =1 AND EvolveProdOrdersDetail_NxtSeq=1  AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  printData: async function (EvolveProdOrdersDetail_Serial) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          EvolveProdOrdersDetail_Serial
        )
        .query(
          "SELECT epod.EvolveProdOrdersDetail_Serial , ei.EvolveItem_Code , ei.EvolveItem_Type  , ei.EvolveItem_Desc , ei.EvolveItem_CustPart FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  printMfProcessDetails: async function (EvolveProdOrdersDetail_Serial) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          EvolveProdOrdersDetail_Serial
        )
        .query(
          "SELECT  EvolveItem_Code FROM EvolveProdOrdersHistory WHERE EvolveProdOrdersDetail_Serial =@EvolveProdOrdersDetail_Serial AND EvolveProdOrderHistoryType_Code= 'PRODORD'"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  printRejectionDetails: async function (EvolveProdOrdersDetail_Serial) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          EvolveProdOrdersDetail_Serial
        )
        .query(
          "SELECT ersn.EvolveReworkSrNo_Serial  ,eu.EvolveUser_Name  FROM EvolveReworkSrNo ersn , EvolveUser eu WHERE ersn.EvolveProdOrdersDetail_Serial=@EvolveProdOrdersDetail_Serial AND ersn.EvolveReworkSrNo_CreatedUser = eu.EvolveUser_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getProductionBookingList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)

        .query(
          "SELECT epd.*  FROM EvolveProdOrdersDetail epd WHERE epd.EvolveProdOrders_ID = @EvolveProdOrders_ID AND EvolveProdOrdersDetail_Status = 'Completed' ORDER BY epd.EvolveProdOrdersDetail_ID DESC"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  checkPickList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "SELECT  SUM(EvolvePickList_QtyReq) as req_qty , SUM(EvolvePickList_QtyIss) as iss_qty FROM EvolvePickList WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  checkWoInShift: async function (data) {
    try {
      let bufferTime = await Evolve.SqlPool.request().query(
        "SELECT EvolveUnitConfig_Value FROM EvolveUnitConfig WHERE EvolveUnitConfig_Key = 'prodbookingbuffertime'"
      );
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "SELECT COUNT(epo.EvolveProdOrders_ID) as count FROM EvolveProdOrders epo , EvolveProdPlan epp , EvolveShift es WHERE epo.EvolveProdOrders_Status != 'completed' AND epo.EvolveProdPlan_ID = epp.EvolveProdPlan_ID  AND epp.EvolveProdPlan_ProdDate = FORMAT(getdate(), 'yyyy-MM-dd') AND es.EvolveShift_ID = epp.EvolveShift_ID AND es.EvolveShift_Start <= (SELECT CONVERT (time(0), CURRENT_TIMESTAMP)) AND (select dateadd(HOUR, " +
          bufferTime.recordset[0].EvolveUnitConfig_Value +
          " , es.EvolveShift_End)) >= (SELECT CONVERT (time(0), CURRENT_TIMESTAMP)) AND epo.EvolveProdOrders_ID = @EvolveProdOrders_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getProductionPlanListCountList: async function (data) {
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
      return await Evolve.SqlPool.request()
        .input("startDate", Evolve.Sql.NVarChar, startDate)
        .input("endDate", Evolve.Sql.NVarChar, endDate)
        .query(
          "SELECT COUNT(epp.EvolveProdPlan_ID) AS count from EvolveProdPlan epp WHERE epp.EvolveProdPlan_ProdDate >= @startDate AND epp.EvolveProdPlan_ProdDate <= @endDate"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getProductionPlanListDatatableList: async function (start, length, data) {
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
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .input("startDate", Evolve.Sql.NVarChar, startDate)
        .input("endDate", Evolve.Sql.NVarChar, endDate)
        .query(
          "SELECT epp.EvolveProdPlan_ID,epp.EvolveProdPlan_code,epp.EvolveProdPlan_ProdDate,esh.EvolveShift_Name,es.EvolveSection_Name,epp.EvolveProdPlan_Status from EvolveProdPlan epp , EvolveSection es, EvolveShift esh WHERE epp.EvolveSection_ID = es.EvolveSection_ID AND epp.EvolveShift_ID = esh.EvolveShift_ID AND epp.EvolveProdPlan_ProdDate >= @startDate AND epp.EvolveProdPlan_ProdDate <= @endDate order by epp.EvolveProdPlan_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getProdPlanDetails: async function (planid) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdPlan_ID", Evolve.Sql.Int, planid)
        .query(
          "SELECT eppd.EvolveProdPlanDetail_ID ,ei.EvolveItem_Code , eppd.EvolveProdPlanDetail_PlanQuantity , eppd.EvolveProdPlanDetail_Status,eppd.EvolveProdPlanDetail_StandardCavity ,eo.EvolveOperator_Name ,eppd.EvolveProdPlanDetail_WorkingCavity , eppd.EvolveProdPlanDetail_Reqd_Heats , et.EvolveTool_Name , eo.EvolveOperator_ID,(SELECT epo.EvolveProdOrders_Order FROM EvolveProdOrders epo WHERE epo.EvolveProdPlanDetail_ID = eppd.EvolveProdPlanDetail_ID) as work_order , (SELECT epo.EvolveProdOrders_Status FROM EvolveProdOrders epo WHERE epo.EvolveProdPlanDetail_ID = eppd.EvolveProdPlanDetail_ID) as work_orderStatus FROM EvolveProdPlanDetail eppd , EvolveItem ei , EvolveTool et , EvolveOperator eo WHERE eppd.EvolveProdPlan_ID = @EvolveProdPlan_ID AND ei.EvolveItem_ID = eppd.EvolveItem_ID AND et.EvolveTool_ID = eppd.EvolveTool_ID AND eo.EvolveOperator_ID = eppd.EvolveOperator_ID "
        );
    } catch (error) {
      Evolve.Log.error("getProdPlanDetails >>" + error.message);
      return new Error(error.message);
    }
  },

  publishPlan: async function (data) {
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
      var str = "" + 1;
      var pad = "0000";
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
      let newdate = day + "" + month + "" + year; //28219
      let wo_nbr = "WO" + newdate + "" + wocount; //WO292190001
      let plan_data = await Evolve.SqlPool.request()
        .input("EvolveProdPlan_ID", Evolve.Sql.Int, data.EvolveProdPlan_ID)
        .query(
          "SELECT * FROM EvolveProdPlan WHERE EvolveProdPlan_ID = @EvolveProdPlan_ID"
        );
      let plan_details = plan_data.recordset[0];

      let planDetail_data = await Evolve.SqlPool.request()
        .input("EvolveProdPlan_ID", Evolve.Sql.Int, data.EvolveProdPlan_ID)
        .query(
          "SELECT * FROM EvolveProdPlanDetail WHERE EvolveProdPlan_ID = @EvolveProdPlan_ID"
        );
      let planDetail_details = planDetail_data.recordset;

      console.log("date.Operators[i] ::", data.Operators);

      for (let i = 0; i < planDetail_details.length; i++) {
        var crnt_datetime =
          dateObj.getFullYear() +
          "-" +
          (dateObj.getMonth() + 1) +
          "-" +
          dateObj.getDate() +
          " " +
          dateObj.getHours() +
          ":" +
          dateObj.getMinutes() +
          ":" +
          dateObj.getSeconds() +
          "." +
          dateObj.getMilliseconds();
        let planDetail_detail = planDetail_details[i];
        let check_wo = await Evolve.SqlPool.request().query(
          "SELECT TOP 1 EvolveProdOrders_Order From EvolveProdOrders ORDER BY EvolveProdOrders_ID DESC"
        );
        if (check_wo.rowsAffected > 0) {
          var last_wo = check_wo.recordset[0].EvolveProdOrders_Order; //WO282190001
          // console.log("last_wo >>>", check_wo)
          if (last_wo.indexOf(newdate) > -1) {
            let wo_new = parseInt(last_wo.substr(-4)) + 1; //0002 => 2
            let tmp = "" + wo_new;
            wocount = pad.substring(0, pad.length - tmp.length) + tmp;
            wo_nbr = "WO" + newdate + "" + wocount;
            let wo_ins = await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrders_OrderId",
                Evolve.Sql.NVarChar,
                newdate + "" + wocount
              )
              .input("EvolveProdOrders_Order", Evolve.Sql.NVarChar, wo_nbr)
              .input(
                "EvolveItem_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveItem_ID
              )
              .input("EvolveProdOrders_Status", Evolve.Sql.NVarChar, "open")
              .input(
                "EvolveProdOrders_Quantity",
                Evolve.Sql.Int,
                planDetail_detail.EvolveProdPlanDetail_PlanQuantity
              )
              .input(
                "EvolveProdOrders_CreatedUser",
                Evolve.Sql.Int,
                data.EvolveUser_ID
              )
              .input(
                "EvolveProdOrders_CreatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input(
                "EvolveProdOrders_UpdatedUser",
                Evolve.Sql.Int,
                data.EvolveUser_ID
              )
              .input(
                "EvolveProdOrders_UpdatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input(
                "EvolveProdPlan_ID",
                Evolve.Sql.Int,
                data.EvolveProdPlan_ID
              )
              .input(
                "EvolveProdPlanDetail_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveProdPlanDetail_ID
              )
              .query(
                "INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID);select @@IDENTITY AS 'inserted_id'"
              );

            let insert_child = await Evolve.SqlPool.request()
              .input(
                "EvolveProdPlanDetail_ID",
                Evolve.Sql.Int,
                wo_ins.recordset[0].inserted_id
              )
              .input(
                "qty",
                Evolve.Sql.Int,
                planDetail_detail.EvolveProdPlanDetail_PlanQuantity
              )
              .input(
                "EvolvePartBom_ParentItem_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveItem_ID
              )
              .query(
                "INSERT INTO EvolveProductionOrderBom (EvolveProductionOrderBom_ParentItem_ID,EvolveProductionOrderBom_CompItem_ID,EvolveProductionOrderBom_QtyPer,EvolveProductionOrderBom_DispSeq,EvolveProductionOrderBom_QtyReq,EvolveProdOrders_ID,EvolveUom_ID) SELECT epb.EvolvePartBom_ParentItem_ID , epb.EvolvePartBom_CompItem_ID , epb.EvolvePartBom_QtyPer , epb.EvolvePartBom_DispSeq ,  ( @qty  * epb.EvolvePartBom_QtyPer) , @EvolveProdPlanDetail_ID , epb.EvolveUom_ID FROM EvolvePartBom epb WHERE epb.EvolvePartBom_ParentItem_ID = @EvolvePartBom_ParentItem_ID"
              );

            let plan_update = await Evolve.SqlPool.request()
              .input(
                "EvolveProdPlanDetail_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveProdPlanDetail_ID
              )
              .input(
                "EvolveProdPlanDetail_Status",
                Evolve.Sql.NVarChar,
                "published"
              )
              .input("EvolveOperator_ID", Evolve.Sql.Int, data.Operators[i])
              .query(
                "UPDATE EvolveProdPlanDetail SET EvolveProdPlanDetail_Status = @EvolveProdPlanDetail_Status, EvolveOperator_ID = @EvolveOperator_ID WHERE EvolveProdPlanDetail_ID=@EvolveProdPlanDetail_ID"
              );

            if (wo_ins instanceof Error || wo_ins.rowsAffected < 1) {
              return new Error("Error In Create Wo");
            }
          } else {
            let wo_ins = await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrders_OrderId",
                Evolve.Sql.NVarChar,
                newdate + "" + wocount
              )
              .input("EvolveProdOrders_Order", Evolve.Sql.NVarChar, wo_nbr)
              .input(
                "EvolveItem_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveItem_ID
              )
              .input("EvolveProdOrders_Status", Evolve.Sql.NVarChar, "open")
              .input(
                "EvolveProdOrders_Quantity",
                Evolve.Sql.Int,
                planDetail_detail.EvolveProdPlanDetail_PlanQuantity
              )
              .input(
                "EvolveProdOrders_CreatedUser",
                Evolve.Sql.Int,
                data.EvolveUser_ID
              )
              .input(
                "EvolveProdOrders_CreatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input(
                "EvolveProdOrders_UpdatedUser",
                Evolve.Sql.Int,
                data.EvolveUser_ID
              )
              .input(
                "EvolveProdOrders_UpdatedAt",
                Evolve.Sql.NVarChar,
                dataTime
              )
              .input(
                "EvolveProdPlan_ID",
                Evolve.Sql.Int,
                data.EvolveProdPlan_ID
              )
              .input(
                "EvolveProdPlanDetail_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveProdPlanDetail_ID
              )
              .query(
                "INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID);select @@IDENTITY AS 'inserted_id'"
              );

            let insert_child = await Evolve.SqlPool.request()
              .input(
                "EvolveProdPlanDetail_ID",
                Evolve.Sql.Int,
                wo_ins.recordset[0].inserted_id
              )
              .input(
                "qty",
                Evolve.Sql.Int,
                planDetail_detail.EvolveProdPlanDetail_PlanQuantity
              )
              .input(
                "EvolvePartBom_ParentItem_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveItem_ID
              )
              .query(
                "INSERT INTO EvolveProductionOrderBom (EvolveProductionOrderBom_ParentItem_ID,EvolveProductionOrderBom_CompItem_ID,EvolveProductionOrderBom_QtyPer,EvolveProductionOrderBom_DispSeq,EvolveProductionOrderBom_QtyReq,EvolveProdOrders_ID,EvolveUom_ID) SELECT epb.EvolvePartBom_ParentItem_ID , epb.EvolvePartBom_CompItem_ID , epb.EvolvePartBom_QtyPer , epb.EvolvePartBom_DispSeq ,  ( @qty  * epb.EvolvePartBom_QtyPer) , @EvolveProdPlanDetail_ID , epb.EvolveUom_ID FROM EvolvePartBom epb WHERE epb.EvolvePartBom_ParentItem_ID = @EvolvePartBom_ParentItem_ID"
              );

            let plan_update = await Evolve.SqlPool.request()
              .input(
                "EvolveProdPlanDetail_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveProdPlanDetail_ID
              )
              .input(
                "EvolveProdPlanDetail_Status",
                Evolve.Sql.NVarChar,
                "published"
              )
              .input("EvolveOperator_ID", Evolve.Sql.Int, data.Operators[i])
              .query(
                "UPDATE EvolveProdPlanDetail SET EvolveProdPlanDetail_Status = @EvolveProdPlanDetail_Status , EvolveOperator_ID = @EvolveOperator_ID  WHERE EvolveProdPlanDetail_ID=@EvolveProdPlanDetail_ID"
              );

            if (wo_ins instanceof Error || wo_ins.rowsAffected < 1) {
              return new Error("Error In Create Wo");
            }
          }
        } else {
          let wo_ins = await Evolve.SqlPool.request()
            .input(
              "EvolveProdOrders_OrderId",
              Evolve.Sql.NVarChar,
              newdate + "" + wocount
            )
            .input("EvolveProdOrders_Order", Evolve.Sql.NVarChar, wo_nbr)
            .input(
              "EvolveItem_ID",
              Evolve.Sql.Int,
              planDetail_detail.EvolveItem_ID
            )
            .input("EvolveProdOrders_Status", Evolve.Sql.NVarChar, "open")
            .input(
              "EvolveProdOrders_Quantity",
              Evolve.Sql.Int,
              planDetail_detail.EvolveProdPlanDetail_PlanQuantity
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
            .input("EvolveProdPlan_ID", Evolve.Sql.Int, data.EvolveProdPlan_ID)
            .input(
              "EvolveProdPlanDetail_ID",
              Evolve.Sql.Int,
              planDetail_detail.EvolveProdPlanDetail_ID
            )
            .query(
              "INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID);select @@IDENTITY AS 'inserted_id'"
            );

          let insert_child = await Evolve.SqlPool.request()
            .input(
              "EvolveProdPlanDetail_ID",
              Evolve.Sql.Int,
              wo_ins.recordset[0].inserted_id
            )
            .input(
              "qty",
              Evolve.Sql.Int,
              planDetail_detail.EvolveProdPlanDetail_PlanQuantity
            )
            .input(
              "EvolvePartBom_ParentItem_ID",
              Evolve.Sql.Int,
              planDetail_detail.EvolveItem_ID
            )
            .query(
              "INSERT INTO EvolveProductionOrderBom (EvolveProductionOrderBom_ParentItem_ID,EvolveProductionOrderBom_CompItem_ID,EvolveProductionOrderBom_QtyPer,EvolveProductionOrderBom_DispSeq,EvolveProductionOrderBom_QtyReq,EvolveProdOrders_ID,EvolveUom_ID) SELECT epb.EvolvePartBom_ParentItem_ID , epb.EvolvePartBom_CompItem_ID , epb.EvolvePartBom_QtyPer , epb.EvolvePartBom_DispSeq ,  ( @qty  * epb.EvolvePartBom_QtyPer) , @EvolveProdPlanDetail_ID , epb.EvolveUom_ID FROM EvolvePartBom epb WHERE epb.EvolvePartBom_ParentItem_ID = @EvolvePartBom_ParentItem_ID"
            );

          let plan_update = await Evolve.SqlPool.request()
            .input(
              "EvolveProdPlanDetail_ID",
              Evolve.Sql.Int,
              planDetail_detail.EvolveProdPlanDetail_ID
            )
            .input(
              "EvolveProdPlanDetail_Status",
              Evolve.Sql.NVarChar,
              "published"
            )
            .input("EvolveOperator_ID", Evolve.Sql.Int, data.Operators[i])
            .query(
              "UPDATE EvolveProdPlanDetail SET EvolveProdPlanDetail_Status = @EvolveProdPlanDetail_Status , EvolveOperator_ID = @EvolveOperator_ID WHERE EvolveProdPlanDetail_ID=@EvolveProdPlanDetail_ID"
            );

          if (wo_ins instanceof Error || wo_ins.rowsAffected < 1) {
            return new Error("Error In Create Wo");
          }
        }
      }

      let plan_update = await Evolve.SqlPool.request()
        .input("EvolveProdPlan_ID", Evolve.Sql.Int, data.EvolveProdPlan_ID)
        .input("EvolveProdPlan_Status", Evolve.Sql.NVarChar, "published")
        .query(
          "UPDATE EvolveProdPlan SET EvolveProdPlan_Status = @EvolveProdPlan_Status WHERE EvolveProdPlan_ID=@EvolveProdPlan_ID"
        );

      if (plan_update instanceof Error || plan_update.rowsAffected < 1) {
        return new Error("Error In Create Wo");
      } else {
        return plan_update;
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  deletePlan: async function (planid) {
    // console.log("planid : ",planid);
    try {
      let deletePlan = await Evolve.SqlPool.request()
        .input("EvolveProdPlan_ID", Evolve.Sql.Int, planid)
        .query(
          "DELETE FROM EvolveProdPlan WHERE EvolveProdPlan_ID = @EvolveProdPlan_ID"
        );

      if (deletePlan instanceof Error || deletePlan.rowsAffected < 1) {
        return deletePlan;
      } else {
        let deletePlan_Details = await Evolve.SqlPool.request()
          .input("EvolveProdPlan_ID", Evolve.Sql.Int, planid)
          .query(
            "DELETE FROM EvolveProdPlanDetail WHERE EvolveProdPlan_ID = @EvolveProdPlan_ID"
          );

        if (
          deletePlan_Details instanceof Error ||
          deletePlan_Details.rowsAffected < 1
        ) {
          return new Error("Error In Delete Plan");
        } else {
          return deletePlan_Details;
        }
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  moveMachine: async function (data) {
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
      //console.log(data);
      let EvolveTransType = await Evolve.SqlPool.request().query(
        "SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_code = 'Move_Machine'"
      );
      // let EvolveTranstionHistoryResult = await Evolve.SqlPool.request()
      //     .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
      //     .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
      //     .input('EvolveApplication_ID', Evolve.Sql.Int, 4)
      //     .input('EvolveTransitionHistory_TypeID', Evolve.Sql.Int, EvolveTransType.recordset[0].EvolveTranstype_ID)
      //     .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
      //     .input('EvolveTransitionHistory_createdDatetime',Evolve.Sql.NVarChar, dataTime)
      //     .input('EvolveMachine_ID',Evolve.Sql.Int, parseInt(data.EvolveMachine_ID))
      //     .input('EvolveReason_ID',Evolve.Sql.Int, parseInt(data.EvolveReason_ID))
      //     .input('EvolveTransitionHistory_UserID',Evolve.Sql.Int, data.EvolveUser_ID)
      //     .query('INSERT INTO EvolveTranstionHistory (EvolveCompany_ID,EvolveUnit_ID,EvolveApplication_ID,EvolveTransitionHistory_TypeID,EvolveItem_ID,EvolveTransitionHistory_createdDatetime,EvolveMachine_ID,EvolveReason_ID,EvolveTransitionHistory_UserID) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveApplication_ID,@EvolveTransitionHistory_TypeID,@EvolveItem_ID,@EvolveTransitionHistory_createdDatetime,@EvolveMachine_ID,@EvolveReason_ID,@EvolveTransitionHistory_UserID);');
      let history_Data = {
        EvolveCompany_ID: data.EvolveUnit_ID,
        EvolveUnit_ID: data.EvolveUnit_ID,
        EvolveApplication_ID: 4,
        EvolveTranstype_code: "Move_Machine",
        EvolveTransitionHistory_DocumentID: null,
        EvolveTransitionHistory_DocumentDetailID: null,
        EvolveLocation_ID: null,
        EvolveItem_ID: data.EvolveItem_ID,
        EvolveUOM_ID: null,
        EvolveInventoryStatus_ID: null,
        EvolveTransitionHistory_AddressID: null,
        EvolveInventory_ID: null,
        EvolveTransitionHistory_Quantity: null,
        EvolveTransitionHistory_Shiptype: null,
        EvolveTransitionHistory_SequenceId: null,
        EvolveTransitionHistory_UserID: data.EvolveUser_ID,
        EvolveMachine_ID: data.EvolveMachine_ID,
        EvolveReason_ID: data.EvolveReason_ID,
        EvolveTool_ID: null,
        EvolveActivity_ID: null,
        EvolveTransitionHistory_Description: null
      };
      let EvolveTranstionHistoryResult = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(
        history_Data
      );

      if (
        EvolveTranstionHistoryResult instanceof Error ||
        EvolveTranstionHistoryResult.rowsAffected < 1
      ) {
        Evolve.Log.Error(
          "Error EvolveTranstionHistoryResult",
          EvolveTranstionHistoryResult
        );
        return new Error("Error EvolveTranstionHistoryResult");
      } else {
        return EvolveTranstionHistoryResult;
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  moveTool: async function (data) {
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
      // //console.log(data);
      // let EvolveTransType = await Evolve.SqlPool.request()
      //     .query("SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_code = 'Move_Tool'");
      // let EvolveTranstionHistoryResult = await Evolve.SqlPool.request()
      //     .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
      //     .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
      //     .input('EvolveApplication_ID', Evolve.Sql.Int, 4)
      //     .input('EvolveTransitionHistory_TypeID', Evolve.Sql.Int, EvolveTransType.recordset[0].EvolveTranstype_ID)
      //     .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
      //     .input('EvolveTransitionHistory_createdDatetime',Evolve.Sql.NVarChar, dataTime)
      //     .input('EvolveReason_ID',Evolve.Sql.Int, parseInt(data.EvolveReason_ID))
      //     .input('EvolveTool_ID',Evolve.Sql.Int, parseInt(data.EvolveTool_ID))
      //     .input('EvolveTransitionHistory_UserID',Evolve.Sql.Int, data.EvolveUser_ID)
      //     .query('INSERT INTO EvolveTranstionHistory (EvolveCompany_ID,EvolveUnit_ID,EvolveApplication_ID,EvolveTransitionHistory_TypeID,EvolveItem_ID,EvolveTransitionHistory_createdDatetime,EvolveReason_ID,EvolveTool_ID,EvolveTransitionHistory_UserID) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveApplication_ID,@EvolveTransitionHistory_TypeID,@EvolveItem_ID,@EvolveTransitionHistory_createdDatetime,@EvolveReason_ID,@EvolveTool_ID,@EvolveTransitionHistory_UserID);');

      let history_Data = {
        EvolveCompany_ID: data.EvolveUnit_ID,
        EvolveUnit_ID: data.EvolveUnit_ID,
        EvolveApplication_ID: 4,
        EvolveTranstype_code: "Move_Tool",
        EvolveTransitionHistory_DocumentID: null,
        EvolveTransitionHistory_DocumentDetailID: null,
        EvolveLocation_ID: null,
        EvolveItem_ID: data.EvolveItem_ID,
        EvolveUOM_ID: null,
        EvolveInventoryStatus_ID: null,
        EvolveTransitionHistory_AddressID: null,
        EvolveInventory_ID: null,
        EvolveTransitionHistory_Quantity: null,
        EvolveTransitionHistory_Shiptype: null,
        EvolveTransitionHistory_SequenceId: null,
        EvolveTransitionHistory_UserID: data.EvolveUser_ID,
        EvolveMachine_ID: null,
        EvolveReason_ID: data.EvolveReason_ID,
        EvolveTool_ID: data.EvolveUser_ID,
        EvolveActivity_ID: null,
        EvolveTransitionHistory_Description: null
      };
      let EvolveTranstionHistoryResult = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(
        history_Data
      );

      if (
        EvolveTranstionHistoryResult instanceof Error ||
        EvolveTranstionHistoryResult.rowsAffected < 1
      ) {
        Evolve.Log.Error(
          "Error EvolveTranstionHistoryResult",
          EvolveTranstionHistoryResult
        );
        return new Error("Error EvolveTranstionHistoryResult");
      } else {
        return EvolveTranstionHistoryResult;
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getTimeManagemetWorkOrderList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("workCenterId", Evolve.Sql.Int, data.workCenterId)
        .query(
          "SELECT epo.EvolveProdOrders_ID,epo.EvolveProdOrders_Order,epp.EvolveProdPlan_ProdDate , epo.EvolveProdOrders_Quantity from EvolveProdOrders epo, EvolveProdPlan epp WHERE epo.Evolveprodorders_status ='open' AND epp.EvolveProdPlan_ID = epo.EvolveProdPlan_ID AND epp.EvolveSection_ID = @workCenterId  AND CAST(epo.EvolveProdOrders_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  addTimeManagemet: async function (data) {
    try {
      let AddTime = await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrderActivity_StartTime",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrderActivity_StartTime
        )
        .input(
          "EvolveProdOrderActivity_EndTime",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrderActivity_EndTime
        )
        .input("EvolveActivity_ID", Evolve.Sql.Int, data.EvolveActivity_ID)
        // .input('EvolveProdOrderActivity_Scap', Evolve.Sql.NVarChar, data.EvolveProdOrderActivity_Scap)
        // .input('EvolveScap_ID', Evolve.Sql.Int, data.EvolveScap_ID)
        .input("EvolveReason_ID", Evolve.Sql.Int, data.EvolveReason_ID)
        .input(
          "EvolveProdOrderActivity_Comment",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrderActivity_Comment
        )
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "INSERT INTO EvolveProdOrderActivity (EvolveProdOrderActivity_StartTime,EvolveProdOrderActivity_EndTime,EvolveActivity_ID,EvolveReason_ID,EvolveProdOrderActivity_Comment,EvolveProdOrders_ID) VALUES (@EvolveProdOrderActivity_StartTime,@EvolveProdOrderActivity_EndTime,@EvolveActivity_ID,@EvolveReason_ID,@EvolveProdOrderActivity_Comment,@EvolveProdOrders_ID);"
        );

      if (AddTime instanceof Error || AddTime.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: AddTime.message,
          result: null
        };
        res.send(obj);
      } else {
        let UpdateWOStatus = await Evolve.SqlPool.request()
          .input(
            "EvolveProdOrders_ID",
            Evolve.Sql.Int,
            data.EvolveProdOrders_ID
          )
          .query(
            "UPDATE EvolveProdOrders SET EvolveProdOrders_Status = 'completed' WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID"
          );
        return UpdateWOStatus;
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  closeWorkOrder: async function (req, res, id) {
    try {
      console;
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // Pick List Generate

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
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

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
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  checkQuantityValid: async function (data) {
    try {
      return await Evolve.SqlPool.request()

        .input("EvolvePickList_ID", Evolve.Sql.Int, data.EvolvePickList_ID)
        .query(
          "SELECT epl.EvolvePickList_ID,ei.EvolveItem_Code, ei.EvolveItem_ID , epl.EvolvePickList_QtyReq, epl.EvolvePickList_QtyIss,epl.EvolvePickList_Number  FROM EvolvePickList epl, EvolveItem ei WHERE (epl.EvolveSection_ID =@EvolveSection_ID OR epl.EvolveMachine_ID =@EvolveMachine_ID OR epl.EvolveProdOrders_ID =@EvolveProdOrders_ID) AND ei.EvolveItem_ID = epl.EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getInventoryItemFormBarcode: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveInventory_RefNumber",
          Evolve.Sql.NVarChar,
          data.EvolveInventory_RefNumber
        )
        .input("EvolvePickList_ID", Evolve.Sql.Int, data.EvolvePickList_ID)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .query(
          "SELECT einv.EvolveInventory_ID,ei.EvolveItem_Code,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_RefNumber FROM EvolveInventory einv, EvolveItem ei,EvolvePickList pl WHERE einv.EvolveInventory_RefNumber = @EvolveInventory_RefNumber AND ei.EvolveItem_ID = einv.EvolveItem_ID and pl.EvolveItem_ID = einv.EvolveItem_ID AND ei.EvolveItem_ID = @EvolveItem_ID and pl.EvolvePickList_ID = @EvolvePickList_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getAlternateItem: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveInventory_RefNumber",
          Evolve.Sql.NVarChar,
          data.EvolveInventory_RefNumber
        )
        .query(
          "SELECT es.EvolveSubItem_SubItem_ID , (SELECT eim.EvolveItem_Code from EvolveItem eim WHERE eim.EvolveItem_ID = es.EvolveSubItem_SubItem_ID)as item_code FROM EvolveInventory einv , EvolveSubItem es , EvolveItem ei WHERE einv.EvolveInventory_RefNumber = @EvolveInventory_RefNumber AND es.EvolveSubItem_ActualItemID = einv.EvolveItem_ID AND ei.EvolveItem_ID = es.EvolveSubItem_ActualItemID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  // Get Scanning List

  getProdOrdersBom: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "Select ei.EvolveItem_Code, ei.EvolveItem_Desc, uom.EvolveUom_Type, pbom.EvolveProductionOrderBom_QtyReq , pbom.EvolveProductionOrderBom_QtyIss from EvolveItem ei,  EvolveUom uom , EvolveProductionOrderBom pbom,EvolveProdOrders pod where pbom.EvolveProductionOrderBom_CompItem_ID = ei.EvolveItem_ID and pbom.EvolveUom_ID = uom.EvolveUom_ID and pbom.EvolveProdOrders_ID = pod.EvolveProdOrders_ID and pbom.EvolveProdOrders_ID = @EvolveProdOrders_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // Scanned Qty Issued
  getbarcodeIssuedQty: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveInventoryRefnumber",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryRefnumber
        )
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.Workorder_ID)
        .query(
          "Select distinct einv.EvolveInventory_ID,einv.EvolveInventory_RefNumber,einv.EvolveInventory_QtyOnHand , pbom.EvolveProductionOrderBom_QtyReq , pbom.EvolveProductionOrderBom_ID , einv.EvolveItem_ID from EvolveInventory einv, EvolveProductionOrderBom pbom, EvolveItem ei where einv.EvolveInventory_RefNumber = @EvolveInventoryRefnumber and pbom.EvolveProductionOrderBom_CompItem_ID = einv.EvolveItem_ID and ei.EvolveItem_ID = pbom.EvolveProductionOrderBom_ParentItem_ID and pbom.EvolveProdOrders_ID = @EvolveProdOrders_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateInvBarcode: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveInventory_ID", Evolve.Sql.Int, data)
        .query(
          "UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = 0 WHERE EvolveInventory_ID = @EvolveInventory_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateProdBom: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProductionOrderBom_ID",
          Evolve.Sql.Int,
          data.EvolveProductionOrderBom_ID
        )
        .input(
          "EvolveProductionOrderBom_QtyIss",
          Evolve.Sql.Int,
          data.EvolveInventory_QtyOnHand
        )
        .query(
          "UPDATE EvolveProductionOrderBom SET EvolveProductionOrderBom_QtyIss = @EvolveProductionOrderBom_QtyIss WHERE EvolveProductionOrderBom_ID = @EvolveProductionOrderBom_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateScannigHistory: async function (ref_data, data) {
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
      //console.log(data);
      // let EvolveTransType = await Evolve.SqlPool.request()
      //     .query("SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_code = 'Scanning'");
      // return await Evolve.SqlPool.request()
      //     .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
      //     .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
      //     .input('EvolveApplication_ID', Evolve.Sql.Int, 4)
      //     .input('EvolveTransitionHistory_TypeID', Evolve.Sql.Int, EvolveTransType.recordset[0].EvolveTranstype_ID)
      //     .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(ref_data.EvolveItem_ID))
      //     .input('EvolveTransitionHistory_createdDatetime',Evolve.Sql.NVarChar, dataTime)
      //     .input('EvolveTransitionHistory_UserID',Evolve.Sql.Int, data.EvolveUser_ID)
      //     .input('EvolveTransitionHistory_DocumentID',Evolve.Sql.Int, data.Workorder_ID)
      //     .input('EvolveInventory_ID',Evolve.Sql.Int, ref_data.EvolveInventory_ID)
      //     .input('EvolveTransitionHistory_Quantity',Evolve.Sql.Int, ref_data.EvolveInventory_QtyOnHand)
      //     .query('INSERT INTO EvolveTranstionHistory (EvolveCompany_ID,EvolveUnit_ID,EvolveApplication_ID,EvolveTransitionHistory_TypeID,EvolveItem_ID,EvolveTransitionHistory_createdDatetime,EvolveTransitionHistory_UserID,EvolveTransitionHistory_DocumentID,EvolveInventory_ID,EvolveTransitionHistory_Quantity) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveApplication_ID,@EvolveTransitionHistory_TypeID,@EvolveItem_ID,@EvolveTransitionHistory_createdDatetime,@EvolveTransitionHistory_UserID,@EvolveTransitionHistory_DocumentID,@EvolveInventory_ID,@EvolveTransitionHistory_Quantity);');

      let history_Data = {
        EvolveCompany_ID: data.EvolveUnit_ID,
        EvolveUnit_ID: data.EvolveUnit_ID,
        EvolveApplication_ID: 4,
        EvolveTranstype_code: "Scanning",
        EvolveTransitionHistory_DocumentID: ref_data.EvolveInventory_ID,
        EvolveTransitionHistory_DocumentDetailID: null,
        EvolveLocation_ID: null,
        EvolveItem_ID: ref_data.EvolveItem_ID,
        EvolveUOM_ID: null,
        EvolveInventoryStatus_ID: null,
        EvolveTransitionHistory_AddressID: null,
        EvolveInventory_ID: ref_data.EvolveInventory_ID,
        EvolveTransitionHistory_Quantity: parseInt(remain_qty),
        EvolveTransitionHistory_Shiptype: null,
        EvolveTransitionHistory_SequenceId: null,
        EvolveTransitionHistory_UserID: ref_data.EvolveInventory_QtyOnHand,
        EvolveMachine_ID: null,
        EvolveReason_ID: null,
        EvolveTool_ID: null,
        EvolveActivity_ID: null,
        EvolveTransitionHistory_Description: null
      };
      let add_history = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(
        history_Data
      );
      return add_history;
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMaterialIssued: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveInventory_RefNumber",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryRefnumber
        )
        .query(
          "SELECT ets.EvolveTransitionHistory_ID, ets.EvolveTransitionHistory_createdDatetime , eiy.EvolveInventory_RefNumber , ets.EvolveTransitionHistory_Quantity ,                eu.EvolveUom_Type , ei.EvolveItem_Code , ei.EvolveItem_Desc , eo.EvolveOperator_Name , es.EvolveSection_Name , eiy.EvolveInventory_LotNumber FROM EvolveTranstionHistory ets , EvolveTranstype ett , EvolveItem ei , EvolveInventory eiy , EvolveUom eu , EvolveProdOrders epo , EvolveProdPlan epp , EvolveProdPlanDetail epd ,EvolveOperator eo , EvolveSection es WHERE ett.EvolveTranstype_code = 'Scanning' AND ets.EvolveTransitionHistory_TypeID = ett.EvolveTranstype_ID AND ei.EvolveItem_ID = ets.EvolveItem_ID AND eiy.EvolveInventory_ID = ets.EvolveInventory_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID AND eiy.EvolveInventory_RefNumber = @EvolveInventory_RefNumber AND epo.EvolveProdOrders_ID = ets.EvolveTransitionHistory_DocumentID AND epp.EvolveProdPlan_ID = epo.EvolveProdPlan_ID AND epd.EvolveProdPlanDetail_ID = epo.EvolveProdPlanDetail_ID AND eo.EvolveOperator_ID = epd.EvolveOperator_ID AND es.EvolveSection_ID = epp.EvolveSection_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
        .query(
          "SELECT * From EvolveProdOrders WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID"
        );
      if (EvolveProdOrders.rowsAffected < 1) {
        return new Error("Error In Production Orders");
      } else {
        let plln = await Evolve.SqlPool.request().query(
          "SELECT TOP 1 EvolvePickList_Number From EvolvePickList ORDER BY EvolvePickList_ID DESC"
        );

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
        let newdate = day + "" + month + "" + year; //28219
        let EvolvePickList_Number = "PL" + newdate + "" + plcount;
        let child_items = await Evolve.SqlPool.request()
          .input(
            "EvolveItem_ID",
            Evolve.Sql.Int,
            EvolveProdOrders.recordset[0].EvolveItem_ID
          )
          .input(
            "EvolveProdOrders_ID",
            Evolve.Sql.Int,
            EvolveProdOrders.recordset[0].EvolveProdOrders_ID
          )
          .query(
            "select EvolveProdOrderBom_CompItem_ID , EvolveProdOrderBom_QtyPer from EvolveProdOrderBom where EvolveProdOrderBom_ParentItem_ID = @EvolveItem_ID AND EvolveProdOrders_ID = @EvolveProdOrders_ID"
          );
        if (child_items instanceof Error) {
          return new Error(child_items.message);
        } else if (child_items.rowsAffected < 1) {
          // If Production Order Don't have Any Child Item
          return Evolve.SqlPool.request()
            .input(
              "EvolveProdOrders_ID",
              Evolve.Sql.Int,
              data.EvolveProdOrders_ID
            )
            .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
            .input(
              "EvolveItem_ID",
              Evolve.Sql.Int,
              EvolveProdOrders.recordset[0].EvolveItem_ID
            )
            .input("EvolvePickList_QtyIss", Evolve.Sql.Int, 0)
            .input(
              "EvolvePickList_QtyReq",
              Evolve.Sql.Int,
              EvolveProdOrders.recordset[0].EvolveProdOrders_Quantity
            )
            .input("EvolvePickList_Status", Evolve.Sql.Int, 1)
            .input(
              "EvolvePickList_Number",
              Evolve.Sql.NVarChar,
              EvolvePickList_Number
            )
            .input("EvolvePickList_Type", Evolve.Sql.NVarChar, "PRODORD")
            .input("EvolvePickList_CreatedAt", Evolve.Sql.NVarChar, dataTime)
            .input(
              "EvolvePickList_CreatedUser",
              Evolve.Sql.Int,
              data.EvolveUser_ID
            )
            .input("EvolvePickList_UpdateAt", Evolve.Sql.NVarChar, dataTime)
            .input(
              "EvolvePickList_UpdateUser",
              Evolve.Sql.Int,
              data.EvolveUser_ID
            )
            .query(
              "INSERT INTO EvolvePickList (EvolveProdOrders_ID,EvolveUser_ID,EvolveItem_ID,EvolvePickList_QtyIss,EvolvePickList_QtyReq,EvolvePickList_Status,EvolvePickList_Number,EvolvePickList_Type,EvolvePickList_CreatedAt,EvolvePickList_CreatedUser,EvolvePickList_UpdateAt,EvolvePickList_UpdateUser) VALUES (@EvolveProdOrders_ID,@EvolveUser_ID,@EvolveItem_ID,@EvolvePickList_QtyIss,@EvolvePickList_QtyReq,@EvolvePickList_Status,@EvolvePickList_Number,@EvolvePickList_Type,@EvolvePickList_CreatedAt,@EvolvePickList_CreatedUser,@EvolvePickList_UpdateAt,@EvolvePickList_UpdateUser);"
            );
        } else {
          for (let i = 0; i < child_items.recordsets[0].length; i++) {
            let issue_qty = 0;
            await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrders_ID",
                Evolve.Sql.Int,
                data.EvolveProdOrders_ID
              )
              .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
              .input(
                "EvolveItem_ID",
                Evolve.Sql.Int,
                child_items.recordset[i].EvolveProdOrderBom_CompItem_ID
              )
              .input("EvolvePickList_QtyIss", Evolve.Sql.Int, issue_qty)
              .input(
                "EvolvePickList_QtyReq",
                Evolve.Sql.Int,
                child_items.recordset[i].EvolveProdOrderBom_QtyPer
              )
              .input("EvolvePickList_Status", Evolve.Sql.Int, 1)
              .input(
                "EvolvePickList_Number",
                Evolve.Sql.NVarChar,
                EvolvePickList_Number
              )
              .input("EvolvePickList_CreatedAt", Evolve.Sql.NVarChar, dataTime)
              .input(
                "EvolvePickList_CreatedUser",
                Evolve.Sql.Int,
                data.EvolveUser_ID
              )
              .input("EvolvePickList_UpdateAt", Evolve.Sql.NVarChar, dataTime)
              .input(
                "EvolvePickList_UpdateUser",
                Evolve.Sql.Int,
                data.EvolveUser_ID
              )
              .query(
                "INSERT INTO EvolvePickList (EvolveProdOrders_ID,EvolveUser_ID,EvolveItem_ID,EvolvePickList_QtyIss,EvolvePickList_QtyReq,EvolvePickList_Status,EvolvePickList_Number,EvolvePickList_CreatedAt,EvolvePickList_CreatedUser,EvolvePickList_UpdateAt,EvolvePickList_UpdateUser) VALUES (@EvolveProdOrders_ID,@EvolveUser_ID,@EvolveItem_ID,@EvolvePickList_QtyIss,@EvolvePickList_QtyReq,@EvolvePickList_Status,@EvolvePickList_Number,@EvolvePickList_CreatedAt,@EvolvePickList_CreatedUser,@EvolvePickList_UpdateAt,@EvolvePickList_UpdateUser);"
              );
          }
          return child_items;
        }
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getInventoryById: async function (EvolveInventory_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveInventory_ID", Evolve.Sql.Int, EvolveInventory_ID)
        .query(
          "select * from EvolveInventory WHERE  EvolveInventory_ID =@EvolveInventory_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getPickListById: async function (EvolvePickList_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolvePickList_ID", Evolve.Sql.Int, EvolvePickList_ID)
        .query(
          "select * from EvolvePickList WHERE  EvolvePickList_ID =@EvolvePickList_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  pickListMovePalletUpdate: async function (
    EvolveInventory_ID,
    EvolveReason_ID,
    EvolveUser_ID,
    EvolveLocation_ID
  ) {
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
        .input("EvolveInventory_ID", Evolve.Sql.Int, EvolveInventory_ID)
        .input("EvolveReason_ID", Evolve.Sql.Int, EvolveReason_ID)
        .input("EvolveLocation_ID", Evolve.Sql.Int, EvolveLocation_ID)
        .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, EvolveUser_ID)
        .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, 0)
        .query(
          "UPDATE EvolveInventory SET EvolveLocation_ID = @EvolveLocation_ID , EvolveReason_ID = @EvolveReason_ID, EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt, EvolveInventory_UpdatedUser = @EvolveInventory_UpdatedUser , EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand WHERE EvolveInventory_ID = @EvolveInventory_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  pickListMovePalletHistory: async function (data, inventory, EvolveReason_ID) {
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
    // let add_history =  await Evolve.SqlPool.request()
    // .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
    // .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
    // .input('EvolveApplication_ID', Evolve.Sql.Int, 1)
    // .input('EvolveTransitionHistory_TypeID', Evolve.Sql.Int, 1)
    // .input('EvolveTransitionHistory_DocumentID', Evolve.Sql.Int, inventory.EvolveInventory_ID)
    // .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(inventory.EvolveItem_ID))
    // .input('EvolveInventory_ID',Evolve.Sql.Int,  inventory.EvolveInventory_ID)
    // .input('EvolveReason_ID', Evolve.Sql.Int, EvolveReason_ID)
    // .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
    // .input('EvolveTransitionHistory_Quantity',Evolve.Sql.Int, parseInt(inventory.EvolveInventory_QtyOnHand))
    // .input('EvolveTransitionHistory_createdDatetime',Evolve.Sql.NVarChar, dataTime)
    // .input('EvolveTransitionHistory_UserID',Evolve.Sql.Int, data.EvolveUser_ID)
    // .query('INSERT INTO EvolveTranstionHistory (EvolveCompany_ID,EvolveUnit_ID,EvolveApplication_ID,EvolveTransitionHistory_TypeID,EvolveTransitionHistory_DocumentID,EvolveItem_ID,EvolveInventory_ID,EvolveTransitionHistory_Quantity,EvolveTransitionHistory_UserID,EvolveTransitionHistory_createdDatetime,EvolveReason_ID,EvolveMachine_ID) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveApplication_ID,@EvolveTransitionHistory_TypeID,@EvolveTransitionHistory_DocumentID,@EvolveItem_ID,@EvolveInventory_ID,@EvolveTransitionHistory_Quantity,@EvolveTransitionHistory_UserID,@EvolveTransitionHistory_createdDatetime,@EvolveReason_ID,@EvolveMachine_ID);select @@IDENTITY AS \'inserted_id\'');

    let history_Data = {
      EvolveCompany_ID: data.EvolveUnit_ID,
      EvolveUnit_ID: data.EvolveUnit_ID,
      EvolveApplication_ID: 4,
      EvolveTranstype_code: "movePallet",
      EvolveTransitionHistory_DocumentID: inventory.EvolveInventory_ID,
      EvolveTransitionHistory_DocumentDetailID: null,
      EvolveLocation_ID: null,
      EvolveItem_ID: inventory.EvolveItem_ID,
      EvolveUOM_ID: null,
      EvolveInventoryStatus_ID: null,
      EvolveTransitionHistory_AddressID: null,
      EvolveInventory_ID: inventory.EvolveInventory_ID,
      EvolveTransitionHistory_Quantity: parseInt(
        inventory.EvolveInventory_QtyOnHand
      ),
      EvolveTransitionHistory_Shiptype: null,
      EvolveTransitionHistory_SequenceId: null,
      EvolveTransitionHistory_UserID: data.EvolveUser_ID,
      EvolveMachine_ID: data.EvolveMachine_ID,
      EvolveReason_ID: EvolveReason_ID,
      EvolveTool_ID: null,
      EvolveActivity_ID: null,
      EvolveTransitionHistory_Description: null
    };
    let add_history = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(
      history_Data
    );

    if (add_history instanceof Error || add_history.rowsAffected < 1) {
      return new Error("Error In Getting while Updating History");
    } else {
      return "No Error";
    }
  },

  pickListDetailsHistory: async function (data, inventory, EvolveReason_ID) {
    let history_Data = {
      EvolveCompany_ID: data.EvolveUnit_ID,
      EvolveUnit_ID: data.EvolveUnit_ID,
      EvolveApplication_ID: 4,
      EvolveTranstype_code: "pickIssue",
      EvolveTransitionHistory_DocumentID: inventory.EvolveInventory_ID,
      EvolveTransitionHistory_DocumentDetailID: null,
      EvolveLocation_ID: null,
      EvolveItem_ID: inventory.EvolveItem_ID,
      EvolveUOM_ID: null,
      EvolveInventoryStatus_ID: null,
      EvolveTransitionHistory_AddressID: null,
      EvolveInventory_ID: inventory.EvolveInventory_ID,
      EvolveTransitionHistory_Quantity: parseInt(
        inventory.EvolveInventory_QtyOnHand
      ),
      EvolveTransitionHistory_Shiptype: null,
      EvolveTransitionHistory_SequenceId: null,
      EvolveTransitionHistory_UserID: data.EvolveUser_ID,
      EvolveMachine_ID: data.EvolveMachine_ID,
      EvolveReason_ID: EvolveReason_ID,
      EvolveTool_ID: null,
      EvolveActivity_ID: null,
      EvolveTransitionHistory_Description: null
    };
    let add_history = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(
      history_Data
    );

    if (add_history instanceof Error || add_history.rowsAffected < 1) {
      return new Error("Error In Getting while Updating History");
    } else {
      return add_history;
    }
  },

  addPickListDetailsHistory: async function (data, inventory, history_id) {
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
        .input("EvolvePickList_ID", Evolve.Sql.Int, data.EvolvePickList_ID)
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveTransitionHistory_ID", Evolve.Sql.Int, history_id)
        .input(
          "EvolvePickListDetail_Barcode",
          Evolve.Sql.NVarChar,
          inventory.EvolveInventory_RefNumber
        )
        .input("EvolvePickListDetail_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolvePickListDetail_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolvePickListDetail_UpdateAt", Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolvePickListDetail_UpdateUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolvePickListDetail_IssQty",
          Evolve.Sql.Int,
          inventory.EvolveInventory_QtyOnHand
        )
        .input("EvolvePickListDetail_ReturnQty", Evolve.Sql.Int, 0)
        .query(
          "INSERT INTO EvolvePickListDetail (EvolvePickList_ID,EvolveUser_ID,EvolveTransitionHistory_ID,EvolvePickListDetail_Barcode,EvolvePickListDetail_CreatedAt,EvolvePickListDetail_CreatedUser,EvolvePickListDetail_UpdateAt,EvolvePickListDetail_UpdateUser,EvolvePickListDetail_IssQty,EvolvePickListDetail_ReturnQty) VALUES(@EvolvePickList_ID , @EvolveUser_ID,@EvolveTransitionHistory_ID,@EvolvePickListDetail_Barcode,@EvolvePickListDetail_CreatedAt,@EvolvePickListDetail_CreatedUser,@EvolvePickListDetail_UpdateAt,@EvolvePickListDetail_UpdateUser,@EvolvePickListDetail_IssQty,@EvolvePickListDetail_ReturnQty)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  pickListUpdate: async function (
    EvolvePickList_ID,
    EvolvePickList_QtyIss,
    EvolveUser_ID
  ) {
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
        .input("EvolvePickList_ID", Evolve.Sql.Int, EvolvePickList_ID)
        .input("EvolvePickList_QtyIss", Evolve.Sql.Int, EvolvePickList_QtyIss)
        .input("EvolvePickList_UpdateAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolvePickList_UpdateUser", Evolve.Sql.Int, EvolveUser_ID)
        .query(
          "UPDATE EvolvePickList SET EvolvePickList_QtyIss = @EvolvePickList_QtyIss, EvolvePickList_UpdateAt = @EvolvePickList_UpdateAt, EvolvePickList_UpdateUser = @EvolvePickList_UpdateUser  WHERE EvolvePickList_ID = @EvolvePickList_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  reverceInv: async function (data) {
    try {
      let update_prodDetails = await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_ID
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Qty = 0 WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID"
        );

      if (
        update_prodDetails instanceof Error ||
        update_prodDetails.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: update_prodDetails.message,
          result: null
        };
        res.send(obj);
      } else {
        return await Evolve.SqlPool.request()
          .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
          .query(
            "UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = 0 WHERE EvolveInventory_ID = @EvolveInventory_ID"
          );
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
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
        Evolve.Log.error(error.message);
        return new Error(error.message);
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  updatePickList: async function (id, data) {
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
        .input("EvolvePickList_UpdateUser", Evolve.Sql.Int, id)
        .input("issueQty", Evolve.Sql.Int, data.Value)
        .input("EvolvePickList_ID", Evolve.Sql.Int, data.ID)

        .query(
          "  UPDATE EvolvePickList SET EvolvePickList_QtyIss = EvolvePickList_QtyIss+ @issueQty WHERE EvolvePickList_ID = @EvolvePickList_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getReturnList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query(
          "select epo.EvolveProdOrders_Order,epo.EvolveProdOrders_ID,pl.EvolvePickList_ID, pl.EvolvePickList_Number,epo.EvolveProdOrders_Quantity,pl.EvolvePickList_QtyIss, pl.EvolvePickList_QtyReq , pl.EvolvePickList_QtyReturn ,epo.EvolveProdOrders_CreatedAt, im.EvolveItem_Code, im.EvolveItem_ID 	from EvolveProdOrders epo,EvolvePickList pl,EvolveItem im where epo.EvolveProdOrders_ID = pl.EvolveProdOrders_ID and im.EvolveItem_ID = pl.EvolveItem_ID and epo.EvolveProdOrders_ID = @EvolveProdOrders_ID and pl.EvolvePickList_QtyIss !=0"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  rtosUpdateInventory: async function (data) {
    try {
      let datetime = Evolve.App.Controllers.Unit.unitControllers.getDateTime;

      return await Evolve.SqlPool.request()
        .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, EvolveUser_ID)
        .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int.data.rtosQty)
        .input(
          "EvolveInventory_QtyAllocated",
          Evolve.Sql.Int,
          data.allowcatedQty
        )
        .input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveLocation_ID)
        .input("EvolveInventory_RefNumber", Evolve.Sql.Int, data.retoBarcode)
        .query(
          "UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand, EvolveInventory_QtyAllocated = @EvolveInventory_QtyAllocated,EvolveLocation_ID = @EvolveLocation_ID EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt, EvolveInventory_UpdatedUser = @EvolveInventory_UpdatedUser WHERE EvolveInventory_RefNumber = @EvolveInventory_RefNumber"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getStoreLocationID: async function (data) {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT loc.EvolveLocation_Code, loc.EvolveLocation_Name, loc.EvolveLocation_ID from  EvolveLocation loc where loc.EvolveLocation_Code = 'STORE'"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  check_invFromBarcode: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveInventory_RefNumber",
          Evolve.Sql.NVarChar,
          data.EvolveInventory_RefNumber
        )
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .query(
          "SELECT EvolveInventory_ID , EvolveInventory_QtyOnHand FROM EvolveInventory WHERE EvolveInventory_RefNumber = @EvolveInventory_RefNumber AND EvolveItem_ID = @EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  rtos_updateInv: async function (data, inv, new_qty) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveInventory_ID",
          Evolve.Sql.Int,
          inv.recordset[0].EvolveInventory_ID
        )
        .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, new_qty)
        .query(
          "UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand WHERE EvolveInventory_ID = @EvolveInventory_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  get_picklist_returnQty: async function (EvolvePickList_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolvePickList_ID", Evolve.Sql.Int, EvolvePickList_ID)
        .query(
          "Select EvolvePickList_QtyReturn FROM EvolvePickList WHERE EvolvePickList_ID = @EvolvePickList_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  update_picklistQty: async function (EvolvePickList_ID, qty) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolvePickList_ID", Evolve.Sql.Int, EvolvePickList_ID)
        .input("EvolvePickList_QtyReturn", Evolve.Sql.Int, qty)
        .query(
          "UPDATE EvolvePickList SET EvolvePickList_QtyReturn = @EvolvePickList_QtyReturn WHERE EvolvePickList_ID = @EvolvePickList_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  get_picklistDetail_returnQty: async function (EvolvePickList_ID, barcode) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolvePickList_ID", Evolve.Sql.Int, EvolvePickList_ID)
        .input("EvolvePickListDetail_Barcode", Evolve.Sql.NVarChar, barcode)
        .query(
          "SELECT EvolvePickListDetail_ID , EvolvePickListDetail_ReturnQty FROM EvolvePickListDetail WHERE EvolvePickList_ID = @EvolvePickList_ID AND EvolvePickListDetail_Barcode = @EvolvePickListDetail_Barcode"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  update_picklistDetailQty: async function (EvolvePickListDetail_ID, qty) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolvePickListDetail_ID",
          Evolve.Sql.Int,
          EvolvePickListDetail_ID
        )
        .input("EvolvePickListDetail_ReturnQty", Evolve.Sql.Int, qty)
        .query(
          "UPDATE EvolvePickListDetail SET EvolvePickListDetail_ReturnQty = @EvolvePickListDetail_ReturnQty WHERE EvolvePickListDetail_ID = @EvolvePickListDetail_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  add_historyForRTOS: async function (data, inv_Data) {
    let history_Data = {
      EvolveCompany_ID: data.EvolveUnit_ID,
      EvolveUnit_ID: data.EvolveUnit_ID,
      EvolveApplication_ID: 4,
      EvolveTranstype_code: "prodBooking",
      EvolveTransitionHistory_DocumentID: inv_Data.EvolveInventory_ID,
      EvolveTransitionHistory_DocumentDetailID: inv_Data.EvolveInventory_ID,
      EvolveLocation_ID: null,
      EvolveItem_ID: parseInt(data.EvolveItem_ID),
      EvolveUOM_ID: null,
      EvolveInventoryStatus_ID: null,
      EvolveTransitionHistory_AddressID: null,
      EvolveInventory_ID: inv_Data.EvolveInventory_ID,
      EvolveTransitionHistory_Quantity: parseInt(
        data.EvolvePickListDetail_ReturnQty
      ),
      EvolveTransitionHistory_Shiptype: null,
      EvolveTransitionHistory_SequenceId: null,
      EvolveTransitionHistory_UserID: data.EvolveUser_ID,
      EvolveMachine_ID: null,
      EvolveReason_ID: data.EvolveReason_ID,
      EvolveTool_ID: null,
      EvolveActivity_ID: data.EvolveActivity_ID,
      EvolveTransitionHistory_Description:
        data.EvolveTransitionHistory_Description
    };
    return Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(
      history_Data
    );
  },

  // Assembly screen
  getParentItems: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "select EvolveItem_Code,EvolveItem_Desc, EvolveItem_ID from EvolveItem where EvolveItem_Type = 'PARENT'"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getAssemblyBarcodeList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "select epd.EvolveProdOrdersDetail_ID, epd.EvolveProdOrdersDetail_Serial, ep.EvolveProdOrders_Order, ep.EvolveProdOrders_OrderId, eim.EvolveItem_Code from EvolveProdOrdersDetail epd, EvolveProdOrders ep, EvolveItem eim 	where ep.EvolveItem_ID = eim.EvolveItem_ID and ep.EvolveProdOrders_ID = epd.EvolveProdOrders_ID and epd.EvolveProdOrdersDetail_PrvSeq = 2 and epd.EvolveProdOrdersDetail_NxtSeq = 3 and epd.EvolveProdOrdersDetail_Status = 'Completed'"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getOnchangeParent: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .query(
          "select eim.EvolveItem_ID, eim.EvolveItem_Desc, eim.EvolveItem_Code from EvolveItem eim where eim.EvolveItem_ID = @EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getParentSerial: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, data.parent_item_id)
        .query(
          "SELECT TOP 1  epd.EvolveProdOrdersDetail_Serial,epd.EvolveProdOrdersDetail_ID, im.EvolveItem_Code from EvolveProdOrders ep, EvolveProdOrdersDetail epd, EvolveItem im where ep.EvolveItem_ID = @EvolveItem_ID and ep.EvolveProdOrders_ID= epd.EvolveProdOrders_ID and epd.EvolveProdOrdersDetail_Status = 'In Process' and im.EvolveItem_ID = ep.EvolveItem_ID  and epd.EvolveProdOrdersDetail_PrvSeq = 3 and epd.EvolveProdOrdersDetail_NxtSeq = 3"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  checkValidChildBarcode: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "Evolveprodordersdetail_serial",
          Evolve.Sql.NVarChar,
          data.child_barcode
        )
        .query(
          "SELECT TOP 1  epd.EvolveProdOrdersDetail_ID ,iif(epd.Evolveprodordersdetail_serial = @Evolveprodordersdetail_serial, 'true','false') is_valid_barcode from EvolveProdOrders ep, EvolveProdOrdersDetail epd where epd.Evolveprodordersdetail_serial =@Evolveprodordersdetail_serial  and ep.EvolveProdOrders_ID= epd.EvolveProdOrders_ID and epd.EvolveProdOrdersDetail_Status = 'Completed' and epd.EvolveProdOrdersDetail_PrvSeq = 2 and epd.EvolveProdOrdersDetail_NxtSeq = 3"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  updateChildParentSerial: async function (child_data, parent_data) {
    try {
      let child_update = await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          child_data.child_barcode
        )
        .input(
          "EvolveProdOrdersDetail_Status",
          Evolve.Sql.NVarChar,
          "Completed"
        )
        .input("EvolveProdOrdersDetail_NxtSeq", Evolve.Sql.Int, 3)
        .input("EvolveProdOrdersDetail_PrvSeq", Evolve.Sql.Int, 3)
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_NxtSeq = @EvolveProdOrdersDetail_NxtSeq, EvolveProdOrdersDetail_PrvSeq = @EvolveProdOrdersDetail_PrvSeq , EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status where EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial "
        );

      let parent_update = await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          parent_data.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveProdOrdersDetail_Status",
          Evolve.Sql.NVarChar,
          "Completed"
        )
        .input("EvolveProdOrdersDetail_NxtSeq", Evolve.Sql.Int, 3)
        .input("EvolveProdOrdersDetail_PrvSeq", Evolve.Sql.Int, 3)
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_NxtSeq = @EvolveProdOrdersDetail_NxtSeq, EvolveProdOrdersDetail_PrvSeq = @EvolveProdOrdersDetail_PrvSeq , EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status where EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial "
        );

      return parent_update;
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateChildWo: async function (child_data) {
    try {
      let getWo_Id = await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          child_data.child_barcode
        )
        .query(
          "SELECT EvolveProdOrders_ID FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );

      let checkCmp_Qty = await Evolve.SqlPool.request().query(
        "SELECT EvolveProdOrders_Quantity , EvolveProdOrders_Status ,(SELECT COUNT(EvolveProdOrdersDetail_ID) FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Status = 'Completed' AND EvolveProdOrdersDetail_PrvSeq = 3 AND EvolveProdOrdersDetail_NxtSeq = 3 AND EvolveProdOrders_ID = " +
        getWo_Id.recordset[0].EvolveProdOrders_ID +
        ") as cmp_qty FROM EvolveProdOrders WHERE EvolveProdOrders_ID = " +
        getWo_Id.recordset[0].EvolveProdOrders_ID
      );

      if (
        checkCmp_Qty.recordset[0].EvolveProdOrders_Quantity ==
        checkCmp_Qty.recordset[0].cmp_qty
      ) {
        let updateWo = await Evolve.SqlPool.request().query(
          "UPDATE EvolveProdOrders SET EvolveProdOrders_Status = 'Completed' WHERE EvolveProdOrders_ID = " +
          getWo_Id.recordset[0].EvolveProdOrders_ID
        );
      }
      //return parent_update;
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateParentWo: async function (parent_data) {
    try {
      // console.log(parent_data);
      let getWo_Id = await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.NVarChar,
          parent_data.EvolveProdOrdersDetail_ID
        )
        .query(
          "SELECT EvolveProdOrders_ID FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID"
        );

      let checkCmp_Qty = await Evolve.SqlPool.request().query(
        "SELECT EvolveProdOrders_Quantity , EvolveProdOrders_Status ,(SELECT COUNT(EvolveProdOrdersDetail_ID) FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Status = 'Completed' AND EvolveProdOrdersDetail_PrvSeq = 3 AND EvolveProdOrdersDetail_NxtSeq = 3 AND EvolveProdOrders_ID = " +
        getWo_Id.recordset[0].EvolveProdOrders_ID +
        ") as cmp_qty FROM EvolveProdOrders WHERE EvolveProdOrders_ID = " +
        getWo_Id.recordset[0].EvolveProdOrders_ID
      );

      if (
        checkCmp_Qty.recordset[0].EvolveProdOrders_Quantity ==
        checkCmp_Qty.recordset[0].cmp_qty
      ) {
        let updateWo = await Evolve.SqlPool.request().query(
          "UPDATE EvolveProdOrders SET EvolveProdOrders_Status = 'Completed' WHERE EvolveProdOrders_ID = " +
          getWo_Id.recordset[0].EvolveProdOrders_ID
        );
      }
      //return parent_update;
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  insertAssebmly: async function (data, child_serial_id) {
    try {
      // console.log("Child Data" ,child_data)
      // console.log("Parent data : ",parent_data.Evolveprodordersdetail_serial)
      let insert_assembly = await Evolve.SqlPool.request()
        .input(
          "Evolve_Assy_Barcode_VALUE",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .input("Evolve_Assy_Part_OK_VALUE", Evolve.Sql.Int, 1)
        .input(
          "Evolve_Assy_Parent_ordersdetail_id",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_ID
        )
        .input(
          "Evolve_Assy_Child_ordersdetail_id",
          Evolve.Sql.Int,
          child_serial_id
        )
        .query(
          "Insert into Evolve_Assy(Evolve_Assy_Barcode_VALUE,Evolve_Assy_Part_OK_VALUE,Evolve_Assy_Parent_ordersdetail_id,Evolve_Assy_Child_ordersdetail_id) values(@Evolve_Assy_Barcode_VALUE,@Evolve_Assy_Part_OK_VALUE,@Evolve_Assy_Parent_ordersdetail_id,@Evolve_Assy_Child_ordersdetail_id) "
        );
      return insert_assembly;
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  checkBarcodePrinted: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "Evolveprodordersdetail_serial",
          Evolve.Sql.NVarChar,
          data.child_barcode
        )
        .query(
          "SELECT ea.*, epd.EvolveProdOrdersDetail_Serial,eim.EvolveItem_Code, (SELECT im.EvolveItem_Code from EvolveItem im, EvolveProdOrders epo, EvolveProdOrdersDetail epod where epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID and epo.EvolveItem_ID = im.EvolveItem_ID and epod.EvolveProdOrdersDetail_ID = ea.Evolve_Assy_Parent_ordersdetail_id) as Parent_Item_Code FROM Evolve_Assy ea, EvolveProdOrdersDetail epd, EvolveProdOrders ep, EvolveItem eim WHERE epd.EvolveProdOrdersDetail_Serial = @Evolveprodordersdetail_serial and ea.Evolve_Assy_Child_ordersdetail_id = epd.EvolveProdOrdersDetail_ID  and ep.EvolveItem_ID = eim.EvolveItem_ID  and epd.EvolveProdOrders_ID = ep.EvolveProdOrders_ID "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  //Rejection Report
  getRejectionReportCountList: async function (data) {
    try {
      let dt = data.startDate.split("/");
      let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
      let startDate =
        sdt.getFullYear() + "-" + (sdt.getMonth() + 1) + "-" + sdt.getDate();
      dt = data.endDate.split("/");
      let edt = new Date(dt[2], dt[1] - 1, dt[0]);
      let endDate =
        edt.getFullYear() + "-" + (edt.getMonth() + 1) + "-" + edt.getDate();
      return await Evolve.SqlPool.request()
        .input("startDate", Evolve.Sql.NVarChar, startDate)
        .input("endDate", Evolve.Sql.NVarChar, endDate)
        .query(
          "SELECT  COUNT(epod.EvolveProdOrdersDetail_ID) as count FROM EvolveProdOrdersDetail epod WHERE epod.EvolveProdOrdersDetail_Status = 'Rejected' AND cast(epod.EvolveProdOrdersDetail_UpdatedAt as date) >= FORMAT(getDate(), @startDate) AND cast(epod.EvolveProdOrdersDetail_UpdatedAt as date) <= FORMAT(getDate(), @endDate)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getRejectionReportDatatableList: async function (start, length, data) {
    try {
      let dt = data.startDate.split("/");
      let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
      let startDate =
        sdt.getFullYear() + "-" + (sdt.getMonth() + 1) + "-" + sdt.getDate();
      dt = data.endDate.split("/");
      let edt = new Date(dt[2], dt[1] - 1, dt[0]);
      let endDate =
        edt.getFullYear() + "-" + (edt.getMonth() + 1) + "-" + edt.getDate();
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .input("startDate", Evolve.Sql.NVarChar, startDate)
        .input("endDate", Evolve.Sql.NVarChar, endDate)
        .query(
          "SELECT epo.EvolveProdOrders_Order , ei.EvolveItem_Code ,epod.EvolveProdOrdersDetail_Serial , epod.EvolveProdOrdersDetail_UpdatedAt,(SELECT ep.Evolveprocess_name FROM EvolveProcessTempSeq epts, EvolveProcess ep WHERE epts.Evolveprocesstemp_seq = epod.EvolveProdOrdersDetail_PrvSeq AND ep.Evolveprocess_id = epts.Evolveprocess_id AND epts.Evolveprocesstemp_id = et.Evolveprocesstemp_id) as 'rejected_seq' FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei, EvolveProcessTemp et WHERE epod.EvolveProdOrdersDetail_Status = 'Rejected' AND cast(epod.EvolveProdOrdersDetail_UpdatedAt as date) >= FORMAT(getDate(), @startDate) AND cast(epod.EvolveProdOrdersDetail_UpdatedAt as date) <= FORMAT(getDate(), @endDate) AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND ei.EvolveProcessTemp_Id = et.EvolveprocessTemp_ID ORDER BY epod.EvolveProdOrdersDetail_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // Report Dump
  getReportDumpCountList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
        .query(
          "SELECT COUNT(epod.EvolveProdOrdersDetail_Serial) AS count FROM EvolveProdOrdersDetail epod JOIN EvolveProdOrders epo ON epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID JOIN EvolveItem ei ON ei.EvolveItem_ID = epo.EvolveItem_ID JOIN EvolveSection es ON es.EvolveSection_ID = epo.EvolveSection_ID WHERE epod.EvolveProdOrdersDetail_Serial = @SerialNo"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getReportDumpDatatableList: async function (start, length, data) {
    try {
      let reportData = [];
      let serial_data = await Evolve.SqlPool.request()
        .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "SELECT epod.EvolveProdOrdersDetail_Serial,epo.EvolveProdOrders_Order, epo.EvolveProdOrders_OrderId, ei.EvolveItem_Code, epod.EvolveProdOrdersDetail_Status, es.EvolveSection_Name, epod.EvolveProdOrdersDetail_CreatedAt, epod.EvolveProdOrdersDetail_UpdatedAt FROM EvolveProdOrdersDetail epod JOIN EvolveProdOrders epo ON epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID JOIN EvolveItem ei ON ei.EvolveItem_ID = epo.EvolveItem_ID JOIN EvolveSection es ON es.EvolveSection_ID = epo.EvolveSection_ID WHERE epod.EvolveProdOrdersDetail_Serial = @SerialNo ORDER BY epod.EvolveProdOrdersDetail_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY "
        );

      if (serial_data.rowsAffected > 0) {
        let serial_main = serial_data.recordset[0];

        //Milling Cycle Start
        let milling_CycleStart = await Evolve.SqlPool.request()
          .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
          .query(
            "SELECT Evolve_Milling_Cycle_Start FROM EvolveMilling WHERE Evolve_Milling_Barcode = @SerialNo"
          );
        let tempMcycleStart = {};
        if (milling_CycleStart.rowsAffected > 0) {
          if (
            milling_CycleStart.recordset[0].Evolve_Milling_Cycle_Start == true
          ) {
            tempMcycleStart = {
              serial_data: serial_main,
              validation: "Cycle Start",
              process: "Milling",
              value: "Started"
            };
          } else {
            tempMcycleStart = {
              serial_data: serial_main,
              validation: "Cycle Start",
              process: "Milling",
              value: "Not Started"
            };
          }
        } else {
          tempMcycleStart = {
            serial_data: serial_main,
            validation: "Cycle Start",
            process: "Milling",
            value: "-"
          };
        }
        reportData.push(tempMcycleStart);

        //Milling Cycle Stop
        let milling_CycleStop = await Evolve.SqlPool.request()
          .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
          .query(
            "SELECT Evolve_Milling_Cycle_Finished FROM EvolveMilling WHERE Evolve_Milling_Barcode = @SerialNo"
          );
        let tempMcycleStop = {};
        if (milling_CycleStop.rowsAffected > 0) {
          if (
            milling_CycleStop.recordset[0].Evolve_Milling_Cycle_Finished == true
          ) {
            tempMcycleStop = {
              serial_data: serial_main,
              validation: "Cycle Stop",
              process: "Milling",
              value: "Stopped"
            };
          } else {
            tempMcycleStop = {
              serial_data: serial_main,
              validation: "Cycle Stop",
              process: "Milling",
              value: "Not Stopped"
            };
          }
        } else {
          tempMcycleStop = {
            serial_data: serial_main,
            validation: "Cycle Stop",
            process: "Milling",
            value: "-"
          };
        }
        reportData.push(tempMcycleStop);

        //Milling Part Ok

        let milling_Part_Ok = await Evolve.SqlPool.request()
          .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
          .query(
            "SELECT Evolve_Milling_Cycle_Part_OK FROM EvolveMilling WHERE Evolve_Milling_Barcode = @SerialNo"
          );
        let tempMPart_Ok = {};
        if (milling_Part_Ok.rowsAffected > 0) {
          if (
            milling_Part_Ok.recordset[0].Evolve_Milling_Cycle_Part_OK == true
          ) {
            tempMPart_Ok = {
              serial_data: serial_main,
              validation: "Part Ok",
              process: "Milling",
              value: "OK"
            };
          } else {
            tempMPart_Ok = {
              serial_data: serial_main,
              validation: "Part Ok",
              process: "Milling",
              value: "Not Ok"
            };
          }
        } else {
          tempMPart_Ok = {
            serial_data: serial_main,
            validation: "Part Ok",
            process: "Milling",
            value: "-"
          };
        }
        reportData.push(tempMPart_Ok);

        // vibration
        // Vibration machine  Started
        let vibrationMachineStart = await Evolve.SqlPool.request()
          .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
          .query(
            "SELECT EvolveVibration_Machine_Start_VALUE FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @SerialNo"
          );
        let tempvmachinestart = {};
        if (vibrationMachineStart.rowsAffected > 0) {
          if (
            vibrationMachineStart.recordset[0]
              .EvolveVibration_Machine_Start_VALUE == true
          ) {
            tempvmachinestart = {
              serial_data: serial_main,
              validation: "Machine Start",
              process: "Vibration",
              value: "Started"
            };
          } else {
            tempvmachinestart = {
              serial_data: serial_main,
              validation: "Machine Start",
              process: "Vibration",
              value: "Not Started"
            };
          }
        } else {
          tempvmachinestart = {
            serial_data: serial_main,
            validation: "Machine Start",
            process: "Vibration",
            value: "-"
          };
        }
        reportData.push(tempvmachinestart);

        // vibration Cycle start
        let vibrationCycleStart = await Evolve.SqlPool.request()
          .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
          .query(
            "SELECT EvolveVibration_Cycle_Start_VALUE FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @SerialNo"
          );
        let tempvCycleStart = {};
        if (vibrationCycleStart.rowsAffected > 0) {
          if (
            vibrationCycleStart.recordset[0]
              .EvolveVibration_Cycle_Start_VALUE == true
          ) {
            tempvCycleStart = {
              serial_data: serial_main,
              validation: "Cycle Start",
              process: "Vibration",
              value: "Started"
            };
          } else {
            tempvCycleStart = {
              serial_data: serial_main,
              validation: "Cycle Start",
              process: "Vibration",
              value: "Not Started"
            };
          }
        } else {
          tempvCycleStart = {
            serial_data: serial_main,
            validation: "Cycle Start",
            process: "Vibration",
            value: "-"
          };
        }
        reportData.push(tempvCycleStart);

        // vibration Cycle Stop
        let vibrationCycleStop = await Evolve.SqlPool.request()
          .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
          .query(
            "SELECT EvolveVibration_Cycle_Stop_VALUE FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @SerialNo"
          );
        let tempvCycleStop = {};
        if (vibrationCycleStop.rowsAffected > 0) {
          if (
            vibrationCycleStop.recordset[0].EvolveVibration_Cycle_Stop_VALUE ==
            true
          ) {
            tempvCycleStop = {
              serial_data: serial_main,
              validation: "Cycle Stop",
              process: "Vibration",
              value: "Stopped"
            };
          } else {
            tempvCycleStop = {
              serial_data: serial_main,
              validation: "Cycle Stop",
              process: "Vibration",
              value: "Not Stopped"
            };
          }
        } else {
          tempvCycleStop = {
            serial_data: serial_main,
            validation: "Cycle Stop",
            process: "Vibration",
            value: "-"
          };
        }
        reportData.push(tempvCycleStop);

        // Vibration Part Oky
        let vibrationPartOk = await Evolve.SqlPool.request()
          .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
          .query(
            "SELECT EvolveVibration_Part_Ok_VALUE FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @SerialNo"
          );
        let tempvPartOk = {};
        if (vibrationPartOk.rowsAffected > 0) {
          if (
            vibrationPartOk.recordset[0].EvolveVibration_Part_Ok_VALUE == true
          ) {
            tempvPartOk = {
              serial_data: serial_main,
              validation: "Part Ok",
              process: "Vibration",
              value: "OK"
            };
          } else {
            tempvPartOk = {
              serial_data: serial_main,
              validation: "Part Ok",
              process: "Vibration",
              value: "Not Ok"
            };
          }
        } else {
          tempvPartOk = {
            serial_data: serial_main,
            validation: "Part Ok",
            process: "Vibration",
            value: "-"
          };
        }
        reportData.push(tempvPartOk);

        // Vibration machine  Stop
        let vibrationMachineStop = await Evolve.SqlPool.request()
          .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
          .query(
            "SELECT EvolveVibration_Machine_at_Home_VALUE FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @SerialNo"
          );
        let tempvmachinestop = {};
        if (vibrationMachineStop.rowsAffected > 0) {
          if (
            vibrationMachineStop.recordset[0]
              .EvolveVibration_Machine_at_Home_VALUE == true
          ) {
            tempvmachinestop = {
              serial_data: serial_main,
              validation: "Machine Stop",
              process: "Vibration",
              value: "Stopped"
            };
          } else {
            tempvmachinestop = {
              serial_data: serial_main,
              validation: "Machine Stop",
              process: "Vibration",
              value: "Not Stopped"
            };
          }
        } else {
          tempvmachinestop = {
            serial_data: serial_main,
            validation: "Machine Stop",
            process: "Vibration",
            value: "-"
          };
        }
        reportData.push(tempvmachinestop);
      }
      return reportData;
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  //Ip Trace Report for Serial number wise
  getIpTraceReportCountListSerialWise: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
        .query(
          "SELECT  COUNT(EvolveProdOrdersDetail_ID) as count FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial = @SerialNo "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getIpTraceReportDatatableListSerialWise: async function (start, length, data) {
    try {
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .input("SerialNo", Evolve.Sql.NVarChar, data.SerialNo)
        .query(
          "EXEC ipTraceReportSerialWise @SerialNo = @SerialNo, @start = @start, @length = @length"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  //Ip Trace Report for Serial number wise
  getXmlReportCountList: async function (data) {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT  COUNT(EvolveInTransQueue_ID) as count FROM EvolveInTransQueue "
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getXmlReportDatatableList: async function (start, length) {
    try {
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "SELECT * FROM EvolveInTransQueue  ORDER BY EvolveInTransQueue_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  //IP Trace Report DateWise
  getIpTraceReportCountListDateWise: async function (data) {
    try {
      let dt = data.startDate.split("/");
      let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
      let startDate =
        sdt.getFullYear() + "-" + (sdt.getMonth() + 1) + "-" + sdt.getDate();
      dt = data.endDate.split("/");
      let edt = new Date(dt[2], dt[1] - 1, dt[0]);
      let endDate =
        edt.getFullYear() + "-" + (edt.getMonth() + 1) + "-" + edt.getDate();
      //console.log("Count ",startDate+" : "+endDate)
      return await Evolve.SqlPool.request()
        .input("startDate", Evolve.Sql.NVarChar, startDate)
        .input("endDate", Evolve.Sql.NVarChar, endDate)
        .query(
          "SELECT  COUNT(EvolveProdOrdersDetail_ID) as count FROM EvolveProdOrdersDetail WHERE cast(EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getDate(), @startDate) AND cast(EvolveProdOrdersDetail_UpdatedAt as date) <= FORMAT(getDate(), @endDate)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getIpTraceReportDatatableListDateWise: async function (start, length, data) {
    try {
      let dt = data.startDate.split("/");
      let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
      let startDate =
        sdt.getFullYear() + "-" + (sdt.getMonth() + 1) + "-" + sdt.getDate();
      dt = data.endDate.split("/");
      let edt = new Date(dt[2], dt[1] - 1, dt[0]);
      let endDate =
        edt.getFullYear() + "-" + (edt.getMonth() + 1) + "-" + edt.getDate();
      // console.log("Count ", startDate + " : " + endDate)
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .input("startDate", Evolve.Sql.NVarChar, startDate)
        .input("endDate", Evolve.Sql.NVarChar, endDate)
        .query(
          "EXEC ipTraceReportDateWise @StartDate = @startDate, @EndDate = @endDate, @start = @start, @length = @length"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMillingData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "Evolve_Milling_Barcode",
          Evolve.Sql.NVarChar,
          data.child_barcode
        )
        .query(
          "SELECT * FROM EvolveMilling WHERE Evolve_Milling_Barcode = @Evolve_Milling_Barcode"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getVibrationData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveVibration_K3220_Barcode_VALUE",
          Evolve.Sql.NVarChar,
          data.child_barcode
        )
        .query(
          "SELECT * FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @EvolveVibration_K3220_Barcode_VALUE"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getChildWoData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.child_barcode
        )
        .query(
          "SELECT epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID                   AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getParentWoData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "SELECT epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID                   AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMFSerialList: async function (data) {
    try {
      /*SELECT DISTINCT ema.EvolveMachine_ID, em.EvolveMachine_Name, eptm.EvolveProcess_id, epts.EvolveProcessTemp_ID, ei.EvolveItem_ID,ei.EvolveItem_Code, 
                  epo.EvolveProdOrders_ID,epo.EvolveProdOrders_CreatedAt , epod.EvolveProdOrdersDetail_Serial, epod.EvolveProdOrdersDetail_NxtSeq,epo.EvolveProdOrders_Order,ep.EvolveProcess_Name , epts.EvolveProcessTemp_Seq 
                  FROM EvolveMachineAssign ema LEFT JOIN EvolveUser eu ON ema.EvolveUser_ID = eu.EvolveUser_ID 
                  LEFT JOIN EvolveMachine em ON ema.EvolveMachine_ID = em.EvolveMachine_ID 
                  LEFT JOIN EvolveProcessToMachine eptm ON em.EvolveMachine_ID = eptm.EvolveMachine_id 
                  LEFT JOIN EvolveProcessTempSeq epts ON eptm.EvolveProcess_id = epts.EvolveProcess_id
                  LEFT JOIN EvolveItem ei ON epts.EvolveProcessTemp_Id  = ei.EvolveProcessTemp_Id 
                  LEFT JOIN EvolveProdOrders epo ON ei.EvolveItem_ID= epo.EvolveItem_ID
                  LEFT JOIN EvolveProdOrdersDetail epod ON epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID 
                  LEFT JOIN EvolveProcess ep ON eptm.EvolveProcess_id = ep.EvolveProcess_ID  
                  WHERE eu.EvolveUser_ID = 133
                  AND epts.EvolveProcessTempSeq_ID <> 0 
                  AND epo.EvolveProdOrders_ID IS NOT NULL 
                  AND epod.EvolveProdOrdersDetail_Serial IS NOT NULL 
                  AND epod.EvolveProdOrdersDetail_NxtSeq > 0 
                  AND epts.EvolveProcessTemp_Seq = epod.EvolveProdOrdersDetail_NxtSeq 
                  AND epod.EvolveProdOrdersDetail_Status = 'In Process' 
                  AND em.EvolveMachine_Status = 1 
                  order by epod.EvolveProdOrdersDetail_Serial ASC */
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          "SELECT DISTINCT ei.EvolveItem_Code , epod.EvolveProdOrdersDetail_Serial ,  ep.EvolveProcess_Name , epts.EvolveProcessTemp_Seq , epo.EvolveProdOrders_OrderId FROM EvolveMachineAssign ema LEFT JOIN EvolveUser eu ON ema.EvolveUser_ID = eu.EvolveUser_ID LEFT JOIN EvolveMachine em ON ema.EvolveMachine_ID = em.EvolveMachine_ID LEFT JOIN EvolveProcessToMachine eptm ON em.EvolveMachine_ID = eptm.EvolveMachine_id           LEFT JOIN EvolveProcessTempSeq epts ON eptm.EvolveProcess_id = epts.EvolveProcess_ID LEFT JOIN EvolveItem ei ON epts.EvolveProcessTemp_Id  = ei.EvolveProcessTemp_Id LEFT JOIN EvolveProdOrders epo ON ei.EvolveItem_ID= epo.EvolveItem_ID LEFT JOIN EvolveProdOrdersDetail epod ON epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID LEFT JOIN EvolveProcess ep ON eptm.EvolveProcess_id = ep.EvolveProcess_ID WHERE eu.EvolveUser_ID = @EvolveUser_ID AND epts.EvolveProcessTempSeq_ID <> 0 AND epo.EvolveProdOrders_ID IS NOT NULL AND epod.EvolveProdOrdersDetail_Serial IS NOT NULL AND epod.EvolveProdOrdersDetail_NxtSeq > 0 AND epts.EvolveProcessTemp_Seq = epod.EvolveProdOrdersDetail_NxtSeq AND epod.EvolveProdOrdersDetail_Status = 'In Process' AND em.EvolveMachine_Status = 1 ORDER BY epod.EvolveProdOrdersDetail_Serial ASC"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getCompletedTrigger: async function (data) {
    try {
      /*SELECT DISTINCT ema.EvolveMachine_ID, em.EvolveMachine_Name, eptm.EvolveProcess_id, epts.EvolveProcessTemp_ID, ei.EvolveItem_ID,ei.EvolveItem_Code, 
                  epo.EvolveProdOrders_ID,epo.EvolveProdOrders_CreatedAt , epod.EvolveProdOrdersDetail_Serial, epod.EvolveProdOrdersDetail_NxtSeq,epo.EvolveProdOrders_Order,ep.EvolveProcess_Name , epts.EvolveProcessTemp_Seq 
                  FROM EvolveMachineAssign ema LEFT JOIN EvolveUser eu ON ema.EvolveUser_ID = eu.EvolveUser_ID 
                  LEFT JOIN EvolveMachine em ON ema.EvolveMachine_ID = em.EvolveMachine_ID 
                  LEFT JOIN EvolveProcessToMachine eptm ON em.EvolveMachine_ID = eptm.EvolveMachine_id 
                  LEFT JOIN EvolveProcessTempSeq epts ON eptm.EvolveProcess_id = epts.EvolveProcess_id
                  LEFT JOIN EvolveItem ei ON epts.EvolveProcessTemp_Id  = ei.EvolveProcessTemp_Id 
                  LEFT JOIN EvolveProdOrders epo ON ei.EvolveItem_ID= epo.EvolveItem_ID
                  LEFT JOIN EvolveProdOrdersDetail epod ON epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID 
                  LEFT JOIN EvolveProcess ep ON eptm.EvolveProcess_id = ep.EvolveProcess_ID  
                  WHERE eu.EvolveUser_ID = 133
                  AND epts.EvolveProcessTempSeq_ID <> 0 
                  AND epo.EvolveProdOrders_ID IS NOT NULL 
                  AND epod.EvolveProdOrdersDetail_Serial IS NOT NULL 
                  AND epod.EvolveProdOrdersDetail_NxtSeq > 0 
                  AND epts.EvolveProcessTemp_Seq = epod.EvolveProdOrdersDetail_NxtSeq 
                  AND epod.EvolveProdOrdersDetail_Status = 'In Process' 
                  AND em.EvolveMachine_Status = 1 
                  order by epod.EvolveProdOrdersDetail_Serial ASC */
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          "SELECT COUNT(epod.EvolveProdOrdersDetail_Serial) AS cmpTrigger FROM EvolveMachineAssign ema LEFT JOIN EvolveUser eu ON ema.EvolveUser_ID = eu.EvolveUser_ID LEFT JOIN EvolveMachine em ON ema.EvolveMachine_ID = em.EvolveMachine_ID LEFT JOIN EvolveProcessToMachine eptm ON em.EvolveMachine_ID = eptm.EvolveMachine_id           LEFT JOIN EvolveProcessTempSeq epts ON eptm.EvolveProcess_id = epts.EvolveProcess_ID LEFT JOIN EvolveItem ei ON epts.EvolveProcessTemp_Id  = ei.EvolveProcessTemp_Id LEFT JOIN EvolveProdOrders epo ON ei.EvolveItem_ID= epo.EvolveItem_ID LEFT JOIN EvolveProdOrdersDetail epod ON epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID LEFT JOIN EvolveProcess ep ON eptm.EvolveProcess_id = ep.EvolveProcess_ID WHERE eu.EvolveUser_ID = @EvolveUser_ID AND epts.EvolveProcessTempSeq_ID <> 0 AND epo.EvolveProdOrders_ID IS NOT NULL AND epod.EvolveProdOrdersDetail_Serial IS NOT NULL AND epod.EvolveProdOrdersDetail_NxtSeq > 0 AND epts.EvolveProcessTemp_Seq < epod.EvolveProdOrdersDetail_NxtSeq AND epod.EvolveProdOrdersDetail_Status = 'In Process' AND em.EvolveMachine_Status = 1 "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMFProcessValidations: async function (data) {
    try {
      // console.log("data :;", data)
      /*SELECT epod.EvolveProdOrders_ID , epo.EvolveProdOrders_Order , epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_Serial ,epod.EvolveProdOrdersDetail_NxtSeq, epo.EvolveItem_ID , ei.EvolveItem_Code, ei.EvolveProcessTemp_Id,epts.EvolveProcessTemp_Seq,epts.EvolveProcess_ID,epv.* 
                  SELECT epoh.EvolveProcess_Value  FROM  EvolveProdOrdersHistory epoh WHERE epoh.EvolveProdOrderDetails_ID = epod.EvolveProdOrdersDetail_ID AND epoh.EvolveProcessVal_ID = epv.EvolveProcessVal_ID ) as old_value
                  FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei
                  ,EvolveProcessTempSeq epts, evolveprocessval epv, EvolveProcessToMachine ptom  , EvolveMachineAssign ama
                  WHERE epod.EvolveProdOrdersDetail_Serial = '6101381819121300001' 
                  AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID 
                  AND ei.EvolveItem_ID = epo.EvolveItem_ID
                  AND epts.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id
                  AND epts.EvolveProcessTemp_Seq = epod.EvolveProdOrdersDetail_NxtSeq 
                  AND epv.EvolveProcess_ID = epts.EvolveProcess_ID
                  AND epod.EvolveProdOrdersDetail_Status = 'In Process'  
                  AND ama.EvolveUser_ID = 133
                  AND ptom.EvolveProcess_id = epv.EvolveProcess_ID 
                  AND ptom.EvolveMachine_ID = ama.EvolveMachine_ID*/
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
        .query("SELECT epod.EvolveProdOrders_ID , epo.EvolveProdOrders_Order , epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_Serial ,epod.EvolveProdOrdersDetail_NxtSeq  , epo.EvolveItem_ID , ei.EvolveItem_Code, ei.EvolveProcessTemp_Id,epts.EvolveProcessTemp_Seq,epts.EvolveProcess_ID,epv.* , ( SELECT epoh.EvolveProcess_Value  FROM  EvolveProdOrdersHistory epoh WHERE epoh.EvolveProdOrderDetails_ID = epod.EvolveProdOrdersDetail_ID AND epoh.EvolveProcessVal_ID = epv.EvolveProcessVal_ID ) as old_value FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei, EvolveProcessTempSeq epts, evolveprocessval epv, EvolveProcessToMachine ptom  , EvolveMachineAssign ama WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND epts.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id AND epts.EvolveProcessTemp_Seq = epod.EvolveProdOrdersDetail_NxtSeq AND epv.EvolveProcess_ID = epts.EvolveProcess_ID AND epod.EvolveProdOrdersDetail_Status = 'In Process' AND ama.EvolveUser_ID = @EvolveUser_ID AND ptom.EvolveProcess_id = epv.EvolveProcess_ID AND ptom.EvolveMachine_ID = ama.EvolveMachine_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMFBarcodeDetails: async function (data) {
    try {
      /*SELECT epod.EvolveProdOrdersDetail_Status ,
                  (SELECT ep.Evolveprocess_name
                  FROM EvolveProcessTempSeq epts,Evolveprocess ep , EvolveProcessTemp et
                  WHERE epts.Evolveprocesstemp_seq = epod.EvolveProdOrdersDetail_NxtSeq
                  AND ep.Evolveprocess_id = epts.Evolveprocess_id AND epts.Evolveprocesstemp_id = et.EvolveProcessTemp_ID
                  AND ei.EvolveProcessTemp_Id = et.EvolveProcessTemp_ID) as 'Current_Sequence_Name'
                  FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei
                  WHERE epod.EvolveProdOrdersDetail_Serial = 'H12000007'
                  AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID 
                  AND ei.EvolveItem_ID = epo.EvolveItem_ID*/
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "SELECT epod.EvolveProdOrdersDetail_Status , (SELECT ep.Evolveprocess_name FROM EvolveProcessTempSeq epts,Evolveprocess ep , EvolveProcessTemp et       WHERE epts.Evolveprocesstemp_seq = epod.EvolveProdOrdersDetail_NxtSeq AND ep.Evolveprocess_id = epts.Evolveprocess_id AND epts.Evolveprocesstemp_id = et.EvolveProcessTemp_ID AND ei.EvolveProcessTemp_Id = et.EvolveProcessTemp_ID) as 'Current_Sequence_Name' FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  //Do List Made By Ravat
  getDoList: async function () {
    try {
      let status = "open";
      return await Evolve.SqlPool.request()
        .input("status", Evolve.Sql.NVarChar, status)
        .query("select * from  EvolveDo where EvolveDO_Status = @status ");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getSoNumberList: async function () {
    try {
      let status = "open";
      return await Evolve.SqlPool.request()
        .input("status", Evolve.Sql.NVarChar, status)
        .query(
          "select * from  EvolveSalesOrder where EvolveSalesOrder_Status = @status "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getallCustomer: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "select * from  EvolveSupplier where EvolveSupplier_Type = 'Customer' "
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getSinglePodProceess: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT ep.EvolveProcess_Name , ep.EvolveProcess_ID FROM evolveprodordersdetail epod, EvolveProdOrders epo , EvolveItem ei , EvolveProcessTemp ept , EvolveProcessTempSeq epts , EvolveProcess ep where epod.EvolveProdOrdersDetail_ID = 3 AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND ept.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id AND epts.EvolveProcessTemp_ID = ept.EvolveProcessTemp_ID AND epts.EvolveProcessTemp_Seq <=  epod.Evolveprodordersdetail_nxtseq AND ep.EvolveProcess_ID = epts.EvolveProcess_ID"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  // rework update status
  updateEpodReworkstatus: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_ID
        )
        .input(
          "EvolveProdOrdersDetail_NxtSeq",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_NxtSeq
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_NxtSeq = @EvolveProdOrdersDetail_NxtSeq, EvolveProdOrdersDetail_Status = 'In Process' WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  updateReworkRemarkStatus: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveReworkSrNo_ID", Evolve.Sql.Int, data.EvolveReworkSrNo_ID)
        .input(
          "EvolveReworkSrNo_Remarks",
          Evolve.Sql.NVarChar,
          data.EvolveReworkSrNo_Remarks
        )
        .query(
          "UPDATE EvolveReworkSrNo SET EvolveReworkSrNo_Remarks = @EvolveReworkSrNo_Remarks, EvolveReworkSrNo_Status = 'Reworked' WHERE EvolveReworkSrNo_ID = @EvolveReworkSrNo_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // Scrap update Status
  updateEpodScrapStatus: async function (data) {
    try {
      return await Evolve.SqlPool.request()

        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_ID
        )
        .input(
          "EvolveProdOrdersDetail_NxtSeq",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_NxtSeq
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = 'Scrapped' WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getSalesOrderDetails: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
        .query(
          "select * from EvolveSalesOrder where EvolveSalesOrder_ID = @EvolveSalesOrder_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getDoDetails: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)

        .query(
          "select EvolveSalesOrderLine_ID ,EvolveSalesOrderLine_Number,EvolveSalesOrderLine_Part, EvolveSalesOrderLine_Custpart,EvolveSalesOrderLine_OrderQty,EvolveSalesOrderLine_InvQty,EvolveSalesOrderLine_DOQty,EvolveSalesOrderLine_Status from EvolveSalesOrderLine where EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND EvolveSalesOrderLine_Status ='open' ORDER BY EvolveSalesOrderLine_ID ASC"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getSoNumberById: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
        .query(
          " select EvolveSalesOrder_Number from EvolveSalesOrder where EvolveSalesOrder_ID = @EvolveSalesOrder_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  addDoList: async function (data, soNumber) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, data.EvolveDo_Number)
        .input("soNumber", Evolve.Sql.NVarChar, soNumber)
        .input("EvolveDO_ShipDate", Evolve.Sql.NVarChar, data.EvolveDO_ShipDate)
        .input(
          "EvolveDO_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDO_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDO_CreatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDO_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDO_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveDO_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          "INSERT INTO EvolveDo  (  EvolveDO_Number ,EvolveDO_SONumber, EvolveDO_ShipDate,EvolveDO_VehicelNumber, EvolveDO_Transporter ,EvolveDO_Status ,EvolveDO_CreatedAt ,EvolveDO_UpdatedAt,EvolveDO_CreatedUser,EvolveDO_UpdatedUser) VALUES (@EvolveDO_Number ,@soNumber, @EvolveDO_ShipDate,@EvolveDO_VehicelNumber, @EvolveDO_Transporter ,'open',@EvolveDO_CreatedAt ,@EvolveDO_UpdatedAt ,@EvolveDO_CreatedUser,@EvolveDO_UpdatedUser);select @@IDENTITY AS 'inserted_id'"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  addDoHistory: async function (indexdata, data, soNumber) {
    try {
      indexdata.EvolveSoLine_Number;
      // console.log("index data is >>> " , indexdata);

      // console.log("data >>> " , data);
      // console.log("so  number   is >>> " , soNumber);

      // console.log("do line >> " , indexdata.EvolveDOLine_Number );
      // console.log("array data >>> " , data.doLineArrayData[0].EvolveSalesOrderLine_Part)
      // console.log("So line number data is <>>> " , )

      // console.log(data.EvolveDo_Number);
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, data.EvolveDo_Number)
        .input("EvolveSo_Number", Evolve.Sql.NVarChar, soNumber)
        .input(
          "EvolveDoLine_Number",
          Evolve.Sql.Int,
          indexdata.EvolveDOLine_Number
        )
        .input(
          "EvolveDoLine_Status",
          Evolve.Sql.NVarChar,
          data.doLineArrayData[0].EvolveSalesOrderLine_Status
        )
        .input(
          "EvolveDoLine_Part",
          Evolve.Sql.NVarChar,
          indexdata.EvolveDOLine_Part
        )
        .input(
          "EvolveDoLine_CustPart",
          Evolve.Sql.NVarChar,
          indexdata.EvolveDOLine_Custpart
        )
        .input(
          "EvolveDoLine_DoQty",
          Evolve.Sql.Int,
          indexdata.EvolveDOLine_QtyDO
        )
        .input(
          "EvolveDoLine_InvQty",
          Evolve.Sql.Int,
          data.doLineArrayData[0].EvolveSalesOrderLine_InvQty
        )
        .input(
          "EvolveSoLine_Number",
          Evolve.Sql.Int,
          indexdata.EvolveSoLine_Number
        )
        .input(
          "EvolveDo_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDo_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDo_ShipDate", Evolve.Sql.NVarChar, data.EvolveDO_ShipDate)
        .input("EvolveDoHistory_CreatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDoHistory_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input(
          "EvolveDoHistory_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveDoHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveDo_PDITemplate",
          Evolve.Sql.Int,
          indexdata.EvolvePDITemplate_ID
        )

        .query(
          "INSERT INTO EvolveDoHistory (EvolveDo_Number,EvolveSo_Number,EvolveDoLine_Number,EvolveDoLine_Status,EvolveDoLine_Part,EvolveDoLine_CustPart,EvolveDoLine_DoQty,EvolveDoLine_InvQty,EvolveSoLine_Number,EvolveDo_VehicelNumber,EvolveDo_Transporter,EvolveDo_ShipDate,EvolveDoHistory_CreatedAt,EvolveDoHistory_UpdatedAt,EvolveDoHistory_CreatedUser,EvolveDoHistory_UpdatedUser,EvolveDo_PDITemplate) VALUES (@EvolveDo_Number,@EvolveSo_Number,@EvolveDoLine_Number,@EvolveDoLine_Status,@EvolveDoLine_Part,@EvolveDoLine_CustPart,@EvolveDoLine_DoQty,@EvolveDoLine_InvQty,@EvolveSoLine_Number,@EvolveDo_VehicelNumber,@EvolveDo_Transporter,@EvolveDo_ShipDate,@EvolveDoHistory_CreatedAt,@EvolveDoHistory_UpdatedAt,@EvolveDoHistory_CreatedUser,@EvolveDoHistory_UpdatedUser,@EvolveDo_PDITemplate)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  addDoHistoryNullPDI: async function (indexdata, data, soNumber) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, data.EvolveDo_Number)
        .input("EvolveSo_Number", Evolve.Sql.NVarChar, soNumber)
        .input(
          "EvolveDoLine_Number",
          Evolve.Sql.Int,
          indexdata.EvolveDOLine_Number
        )
        .input(
          "EvolveDoLine_Status",
          Evolve.Sql.NVarChar,
          data.doLineArrayData[0].EvolveSalesOrderLine_Status
        )
        .input(
          "EvolveDoLine_Part",
          Evolve.Sql.NVarChar,
          indexdata.EvolveDOLine_Part
        )
        .input(
          "EvolveDoLine_CustPart",
          Evolve.Sql.NVarChar,
          indexdata.EvolveDOLine_Custpart
        )
        .input(
          "EvolveDoLine_DoQty",
          Evolve.Sql.Int,
          indexdata.EvolveDOLine_QtyDO
        )
        .input(
          "EvolveDoLine_InvQty",
          Evolve.Sql.Int,
          data.doLineArrayData[0].EvolveSalesOrderLine_InvQty
        )
        .input(
          "EvolveSoLine_Number",
          Evolve.Sql.Int,
          indexdata.EvolveSoLine_Number
        )
        .input(
          "EvolveDo_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDo_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDo_ShipDate", Evolve.Sql.NVarChar, data.EvolveDO_ShipDate)
        .input("EvolveDoHistory_CreatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDoHistory_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input(
          "EvolveDoHistory_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveDoHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        // .input('EvolveDo_PDITemplate', Evolve.Sql.Int, indexdata.EvolvePDITemplate_ID)

        .query(
          "INSERT INTO EvolveDoHistory (EvolveDo_Number,EvolveSo_Number,EvolveDoLine_Number,EvolveDoLine_Status,EvolveDoLine_Part,EvolveDoLine_CustPart,EvolveDoLine_DoQty,EvolveDoLine_InvQty,EvolveSoLine_Number,EvolveDo_VehicelNumber,EvolveDo_Transporter,EvolveDo_ShipDate,EvolveDoHistory_CreatedAt,EvolveDoHistory_UpdatedAt,EvolveDoHistory_CreatedUser,EvolveDoHistory_UpdatedUser,EvolveDoLine_PDIQty) VALUES (@EvolveDo_Number,@EvolveSo_Number,@EvolveDoLine_Number,@EvolveDoLine_Status,@EvolveDoLine_Part,@EvolveDoLine_CustPart,@EvolveDoLine_DoQty,@EvolveDoLine_InvQty,@EvolveSoLine_Number,@EvolveDo_VehicelNumber,@EvolveDo_Transporter,@EvolveDo_ShipDate,@EvolveDoHistory_CreatedAt,@EvolveDoHistory_UpdatedAt,@EvolveDoHistory_CreatedUser,@EvolveDoHistory_UpdatedUser,@EvolveDoLine_DoQty)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  addDoLineData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrderLine_ID",
          Evolve.Sql.Int,
          data.EvolveSalesOrderLine_ID
        )
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .input(
          "EvolveDOLine_Number",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_Number
        )
        .input(
          "EvolveDOLine_Custpart",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_Custpart
        )
        .input(
          "EvolveDOLine_QtyInv",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_QtyInv
        )
        .input(
          "EvolveDOLine_QtyDO",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_QtyDO
        )
        .input("EvolveDOLine_Part", Evolve.Sql.NVarChar, data.EvolveDOLine_Part)
        .input(
          "EvolvePDITemplate_ID",
          Evolve.Sql.Int,
          data.EvolvePDITemplate_ID
        )

        .query(
          "INSERT INTO EvolveDoLine  (EvolveDO_ID, EvolveDOLine_Number,EvolveDOLine_Part, EvolveDOLine_Custpart ,EvolveDOLine_QtyDO, EvolveDOLine_QtyInv,EvolveDOLine_Status,EvolveSalesOrderLine_ID,EvolvePDITemplate_ID ) VALUES (@EvolveDO_ID, @EvolveDOLine_Number,@EvolveDOLine_Part, @EvolveDOLine_Custpart ,@EvolveDOLine_QtyDO,@EvolveDOLine_QtyInv , 'open',@EvolveSalesOrderLine_ID,@EvolvePDITemplate_ID)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  addDolineNullPDI: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrderLine_ID",
          Evolve.Sql.Int,
          data.EvolveSalesOrderLine_ID
        )
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .input(
          "EvolveDOLine_Number",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_Number
        )
        .input(
          "EvolveDOLine_Custpart",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_Custpart
        )
        .input(
          "EvolveDOLine_QtyInv",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_QtyInv
        )
        .input(
          "EvolveDOLine_QtyDO",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_QtyDO
        )
        .input("EvolveDOLine_Part", Evolve.Sql.NVarChar, data.EvolveDOLine_Part)

        // .input('EvolvePDITemplate_ID', Evolve.Sql.Int, data.EvolvePDITemplate_ID)

        .query(
          "INSERT INTO EvolveDoLine  (EvolveDO_ID, EvolveDOLine_Number,EvolveDOLine_Part, EvolveDOLine_Custpart ,EvolveDOLine_QtyDO, EvolveDOLine_QtyInv,EvolveDOLine_Status,EvolveSalesOrderLine_ID ,EvolveDOLine_QtyPDI) VALUES (@EvolveDO_ID, @EvolveDOLine_Number,@EvolveDOLine_Part, @EvolveDOLine_Custpart ,@EvolveDOLine_QtyDO,@EvolveDOLine_QtyInv , 'open',@EvolveSalesOrderLine_ID,@EvolveDOLine_QtyDO)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  updateSaesOrder: async function (id, qty) {
    try {
      let getDoQty = await Evolve.SqlPool.request()
        .input("EvolveSalesOrderLine_ID", Evolve.Sql.Int, id)
        .query(
          "SELECT EvolveSalesOrderLine_DOQty FROM  EvolveSalesOrderLine WHERE EvolveSalesOrderLine_ID=@EvolveSalesOrderLine_ID"
        );
      if (getDoQty.recordset[0].EvolveSalesOrderLine_DOQty == null) {
        let srDefault = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("initialqty", Evolve.Sql.NVarChar, "0")
          .query(
            "UPDATE EvolveSalesOrderLine SET  EvolveSalesOrderLine_DOQty = @initialqty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );

        let updateSolineNullDoQTY = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("qty", Evolve.Sql.Int, qty)

          .query(
            "UPDATE EvolveSalesOrderLine SET  EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );

        return updateSolineNullDoQTY;
      } else {
        let updateSoline = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("qty", Evolve.Sql.Int, qty)
          .query(
            "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );
        return updateSoline;
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  // updateNonPdiSaesOrder: async function (id, qty) {
  //     try {
  //         return await Evolve.SqlPool.request()
  //             .input('EvolveSalesOrder_ID', Evolve.Sql.Int, id)
  //             .input('qty', Evolve.Sql.Int, qty)
  //             .query("UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty , EvolveSalesOrderLine_PDIQty=EvolveSalesOrderLine_DOQty +@qty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID");

  //     } catch (error) {
  //         Evolve.Log.error(error.message);
  //         return new Error(error.message);
  //     }
  // },

  updateSONullPDI: async function (id, qty) {
    try {
      let getDoQty = await Evolve.SqlPool.request()
        .input("EvolveSalesOrderLine_ID", Evolve.Sql.Int, id)
        .query(
          "SELECT EvolveSalesOrderLine_DOQty FROM  EvolveSalesOrderLine WHERE EvolveSalesOrderLine_ID=@EvolveSalesOrderLine_ID"
        );
      if (getDoQty.recordset[0].EvolveSalesOrderLine_DOQty == null) {
        let srDefault = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("initialqty", Evolve.Sql.NVarChar, "0")
          .query(
            "UPDATE EvolveSalesOrderLine SET  EvolveSalesOrderLine_DOQty = @initialqty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );

        let updateSolineNullDoQTY = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("qty", Evolve.Sql.Int, qty)

          .query(
            "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty ,EvolveSalesOrderLine_PDIQty =EvolveSalesOrderLine_DOQty +@qty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );

        return updateSolineNullDoQTY;
      } else {
        let solineUpdate = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("qty", Evolve.Sql.Int, qty)
          .query(
            "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty ,EvolveSalesOrderLine_PDIQty =EvolveSalesOrderLine_DOQty +@qty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );

        return solineUpdate;
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getSingleDoData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("id", Evolve.Sql.Int, data.id)
        .query(
          "SELECT do.* , so.*  , esb.EvolveSupplier_City as bill_to_city , esb.EvolveSupplier_City as ship_to_city FROM EvolveDo do , EvolveSalesOrder so INNER JOIN EvolveSupplier esb ON esb.EvolveSupplier_Code LIKE so.EvolveSalesOrder_Billto INNER JOIN EvolveSupplier ess ON ess.EvolveSupplier_Code LIKE so.EvolveSalesOrder_Shipto WHERE do.EvolveDO_ID = @id  AND do.EvolveDO_SONumber = so.EvolveSalesOrder_Number"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getdoidpdftabledata: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("id", Evolve.Sql.Int, data.id)
        .query(
          "SELECT edl.EvolveDOLine_Part as item_code, ei.EvolveItem_Desc, edl.EvolveDOLine_QtyDO as Qty FROM EvolveDoLine edl LEFT JOIN EvolveItem ei ON ei.EvolveItem_Code = edl.EvolveDOLine_Part WHERE edl.EvolveDO_ID = @id"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  updateScrapRemarkStatus: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveReworkSrNo_ID", Evolve.Sql.Int, data.EvolveReworkSrNo_ID)
        .input(
          "EvolveReworkSrNo_Remarks",
          Evolve.Sql.NVarChar,
          data.EvolveReworkSrNo_Remarks
        )
        .query(
          "UPDATE EvolveReworkSrNo SET EvolveReworkSrNo_Remarks = @EvolveReworkSrNo_Remarks, EvolveReworkSrNo_Status = 'Scrapped' WHERE EvolveReworkSrNo_ID = @EvolveReworkSrNo_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getSingleDoSoLine: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .query(
          "SELECT dol.EvolveDOLine_ID , dol.EvolveDOLine_QtyDO , sol.*   FROM EvolveDo do, EvolveDoLine dol , EvolveSalesOrderLine sol WHERE do.EvolveDO_ID = dol.EvolveDO_ID AND dol.EvolveSalesOrderLine_ID = sol.EvolveSalesOrderLine_ID AND do.EvolveDO_ID = @EvolveDO_ID  ORDER BY sol.EvolveSalesOrderLine_ID ASC"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  updateDoList: async function (data) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input(
          "EvolveDO_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDO_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDO_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .query(
          "UPDATE EvolveDo  SET EvolveDO_VehicelNumber =@EvolveDO_VehicelNumber, EvolveDO_Transporter =@EvolveDO_Transporter  ,EvolveDO_Status='open'  ,EvolveDO_UpdatedAt=@EvolveDO_UpdatedAt  WHERE EvolveDO_ID=@EvolveDO_ID "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getPDITemplateID: async function (EvolveDOLine_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, EvolveDOLine_ID)
        .query(
          "SELECT EvolvePDITemplate_ID FROM EvolveDoLine WHERE EvolveDOLine_ID=@EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getDoNumberById: async function (data) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .query(
          "SELECT EvolveDO_Number FROM EvolveDo WHERE EvolveDO_ID = @EvolveDO_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getCurrentQty: async function (EvolveDO_Number, EvolveDOLine_Number) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDoLine_Number", Evolve.Sql.Int, EvolveDOLine_Number)
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, EvolveDO_Number)

        .query(
          " SELECT EvolveDoLine_DoQty FROM EvolveDoHistory WHERE EvolveDo_Number= @EvolveDo_Number AND  EvolveDoLine_Number=EvolveDoLine_Number"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  addDoLineDataAtUpdate: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrderLine_ID",
          Evolve.Sql.Int,
          data.EvolveSalesOrderLine_ID
        )
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .input(
          "EvolveDOLine_Number",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_Number
        )
        .input(
          "EvolveDOLine_Custpart",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_Custpart
        )
        .input(
          "EvolveDOLine_QtyInv",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_QtyInv
        )
        .input(
          "EvolveDOLine_QtyDO",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_QtyDO
        )
        .input("EvolveDOLine_Part", Evolve.Sql.NVarChar, data.EvolveDOLine_Part)
        .query(
          "INSERT INTO EvolveDoLine  (EvolveDO_ID, EvolveDOLine_Number,EvolveDOLine_Part, EvolveDOLine_Custpart ,EvolveDOLine_QtyDO, EvolveDOLine_QtyInv,EvolveDOLine_Status,EvolveSalesOrderLine_ID ) VALUES (@EvolveDO_ID, @EvolveDOLine_Number,@EvolveDOLine_Part, @EvolveDOLine_Custpart ,@EvolveDOLine_QtyDO,@EvolveDOLine_QtyInv , 'open',@EvolveSalesOrderLine_ID)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  updateSalesOrderAtUpdate: async function (id, qty, oldQty) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
        .input("qty", Evolve.Sql.Int, qty)
        .input("oldQty", Evolve.Sql.Int, oldQty)
        .query(
          "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty - @oldQty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateNonPdiSaesOrder: async function (id, qty, oldQty) {
    try {
      let updateSoLine = await Evolve.SqlPool.request()
        .input("EvolveSalesOrderLine_ID", Evolve.Sql.Int, id)
        .input("qty", Evolve.Sql.Int, qty)
        .input("oldQty", Evolve.Sql.Int, oldQty)
        .query(
          "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty - @oldQty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrderLine_ID"
        );

      let updateSoLinePDIQty = await Evolve.SqlPool.request()
        .input("EvolveSalesOrderLine_ID", Evolve.Sql.Int, id)

        .query(
          "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_PDIQty=EvolveSalesOrderLine_DOQty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrderLine_ID"
        );
      return updateSoLinePDIQty;
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  updateDoLineAtUpdate: async function (data, newQty, EvolveDO_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrder_ID",
          Evolve.Sql.Int,
          data.EvolveSalesOrderLine_ID
        )
        .input("EvolveDOLine_QtyDO", Evolve.Sql.Int, newQty)
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .input("EvolveDO_ID", Evolve.Sql.Int, EvolveDO_ID)
        .query(
          "UPDATE EvolveDoLine SET EvolveDOLine_QtyDO = @EvolveDOLine_QtyDO where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID AND   EvolveDOLine_ID = @EvolveDOLine_ID  AND EvolveDO_ID=@EvolveDO_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  updateNonPDIDoLineAtUpdate: async function (data, newQty, EvolveDO_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrder_ID",
          Evolve.Sql.Int,
          data.EvolveSalesOrderLine_ID
        )
        .input("updatedQty", Evolve.Sql.Int, newQty)
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .input("EvolveDO_ID", Evolve.Sql.Int, EvolveDO_ID)
        .query(
          "UPDATE EvolveDoLine SET EvolveDOLine_QtyDO = @updatedQty , EvolveDOLine_QtyPDI = @updatedQty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID AND   EvolveDOLine_ID = @EvolveDOLine_ID  AND EvolveDO_ID=@EvolveDO_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateDoHistory: async function (indexData, newQty, data, doNumber) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrderLine_ID",
          Evolve.Sql.Int,
          indexData.EvolveSalesOrderLine_ID
        )
        .input("EvolveDoLine_DoQty", Evolve.Sql.Int, newQty)
        .input(
          "EvolveDO_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDo_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDoHistory_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, doNumber)
        .input(
          "EvolveDoLine_Number",
          Evolve.Sql.Int,
          indexData.EvolveDOLine_Number
        )
        .input(
          "EvolveDoHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )

        // .query("UPDATE EvolveDoLine SET EvolveDoLine_DoQty = @EvolveDoLine_DoQty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID");
        .query(
          "  UPDATE EvolveDoHistory  SET EvolveDoLine_DoQty = @EvolveDoLine_DoQty , EvolveDo_VehicelNumber = @EvolveDO_VehicelNumber , EvolveDo_Transporter = @EvolveDo_Transporter ,  EvolveDoHistory_UpdatedAt = @EvolveDoHistory_UpdatedAt , EvolveDoHistory_UpdatedUser = @EvolveDoHistory_UpdatedUser WHERE EvolveDoLine_Number = @EvolveDoLine_Number AND EvolveDo_Number = @EvolveDo_Number"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateNonPDIDoHistory: async function (indexData, newQty, data, doNumber) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrderLine_ID",
          Evolve.Sql.Int,
          indexData.EvolveSalesOrderLine_ID
        )
        .input("EvolveDoLine_DoQty", Evolve.Sql.Int, newQty)
        .input(
          "EvolveDO_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDo_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDoHistory_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, doNumber)
        .input(
          "EvolveDoLine_Number",
          Evolve.Sql.Int,
          indexData.EvolveDOLine_Number
        )
        .input(
          "EvolveDoHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )

        // .query("UPDATE EvolveDoLine SET EvolveDoLine_DoQty = @EvolveDoLine_DoQty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID");
        .query(
          "  UPDATE EvolveDoHistory  SET EvolveDoLine_DoQty = @EvolveDoLine_DoQty , EvolveDo_VehicelNumber = @EvolveDO_VehicelNumber , EvolveDo_Transporter = @EvolveDo_Transporter ,  EvolveDoHistory_UpdatedAt = @EvolveDoHistory_UpdatedAt , EvolveDoHistory_UpdatedUser = @EvolveDoHistory_UpdatedUser , EvolveDoLine_PDIQty=@EvolveDoLine_DoQty WHERE EvolveDoLine_Number = @EvolveDoLine_Number AND EvolveDo_Number = @EvolveDo_Number"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateDoHistoryPdiQty: async function (
    doNumber,
    doLineNumber,
    qty,
    EvolvePDITemplate_ID,
    data
  ) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()

        .input("EvolveDoHistory_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input(
          "EvolveDoHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolveDoLine_PDIQty", Evolve.Sql.Int, qty)
        .input(
          "EvolveDo_PDITemplate",
          Evolve.Sql.NVarChar,
          EvolvePDITemplate_ID
        )
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, doNumber)
        .input("EvolveDoLine_Number", Evolve.Sql.Int, doLineNumber)

        .query(
          "  UPDATE EvolveDoHistory SET  EvolveDoLine_PDIQty = @EvolveDoLine_PDIQty , EvolveDo_PDITemplate =@EvolveDo_PDITemplate , EvolveDoHistory_UpdatedAt = @EvolveDoHistory_UpdatedAt , EvolveDoHistory_UpdatedUser = @EvolveDoHistory_UpdatedUser  WHERE EvolveDoLine_Number=@EvolveDoLine_Number AND EvolveDo_Number =@EvolveDo_Number   "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getAllDoSup: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT DISTINCT edo.EvolveDO_ID, edo.EvolveDO_SONumber , edo.EvolveDO_Number, es.EvolveSupplier_Name, es.EvolveSupplier_Code, es.EvolveSupplier_ID FROM EvolveDo edo, EvolveSalesOrder eso, EvolveSupplier es WHERE  edo.EvolveDO_SONumber = eso.EvolveSalesOrder_Number AND eso.EvolveSalesOrder_Cust = es.EvolveSupplier_Code"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  updateSoLineData: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, id)
        .query(
          "UPDATE esol SET  esol.EvolveSalesOrderLine_DOQty =  CONVERT(INT , esol.EvolveSalesOrderLine_DOQty ) -  CONVERT(INT , edol.EvolveDOLine_QtyDO )   FROM  EvolveSalesOrderLine esol , EvolveDoLine  edol WHERE edol.EvolveDO_ID = @EvolveDO_ID And edol.EvolveSalesOrderLine_ID = esol.EvolveSalesOrderLine_ID  "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getSingleDOSOData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .query(
          "SELECT edo.EvolveDO_SONumber, edo.EvolveDO_CreatedAt,(SELECT DISTINCT es.EvolveSupplier_City FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'billTo_City',(SELECT DISTINCT es.EvolveSupplier_Name FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'Customer_Name',(SELECT DISTINCT es.EvolveSupplier_City FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'shipTo_City',edo.EvolveDO_VehicelNumber, edo.EvolveDO_Transporter, eso.EvolveSalesOrder_Shipto, eso.EvolveSalesOrder_Billto FROM EvolveDo edo, EvolveSalesOrder eso WHERE edo.EvolveDO_SONumber = eso.EvolveSalesOrder_Number AND edo.EvolveDO_ID = @EvolveDO_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  deleteDoLineData: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, id)
        .query(
          " Delete EvolveDoLine WHERE EvolveDoLine.EvolveDO_ID = @EvolveDO_ID "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getDoLine: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .query("SELECT * FROM EvolveDoLine WHERE EvolveDO_ID = @EvolveDO_ID");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  //pdi edit

  getPDISingleData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "SELECT edo.EvolveDO_Number, edo.EvolveDO_CreatedAt, edo.EvolveDO_SONumber,EvolveDOLine_QtyDO,(SELECT DISTINCT es.EvolveSupplier_Name FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'Customer_Name',eso.EvolveSalesOrder_Shipto, eso.EvolveSalesOrder_Billto,edol.EvolveDOLine_Part,(select GETDATE() ) as 'date', edo.EvolveDO_LRDate , edo.EvolveDO_VehicelNumber, edo.EvolveDO_Transporter , ei.EvolveItem_ID ,(SELECT eit.EvolveItem_Code FROM EvolveSubItem esi , EvolveItem eit WHERE esi.EvolveSubItem_ActualItemID = ei.EvolveItem_ID AND eit.EvolveItem_ID = esi.EvolveSubItem_SubItem_ID) as 'sub_item' FROM EvolveDoLine edol, EvolveDo edo, EvolveSalesOrder eso , EvolveItem ei WHERE edol.EvolveDOLine_ID = @EvolveDOLine_ID AND edol.EvolveDO_ID = edo.EvolveDO_ID AND eso.EvolveSalesOrder_Number = edo.EvolveDO_SONumber AND ei.EvolveItem_Code = edol.EvolveDOLine_Part"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getPDIData: async function (EvolveDOLine_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, EvolveDOLine_ID)
        .query(
          "SELECT * FROM EvolvePDIHistory WHERE EvolveDOLine_ID = @EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getAllPdiTempDetail: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "SELECT eptd.* FROM EvolveDoLine edol, EvolveItem ei, EvolvePDITemplateDetail eptd WHERE edol.EvolveDOLine_ID = @EvolveDOLine_ID AND edol.EvolveDOLine_Part = ei.EvolveItem_Code AND ei.EvolvePDITemplate_ID = eptd.EvolvePDITemplate_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getProdOrderSerialId: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "SELECT epo.EvolveProdOrders_ID , epod.EvolveProdOrdersDetail_ID , ei.EvolveProcessTemp_Id , epod.EvolveProdOrdersDetail_Serial FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND epod.EvolveProdOrdersDetail_Status = 'Completed'"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  addRejectSerialNo: async function (data, srData) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrders_ID",
          Evolve.Sql.Int,
          srData.EvolveProdOrders_ID
        )
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          srData.EvolveProdOrdersDetail_ID
        )
        .input(
          "EvolveReworkSrNo_Serial",
          Evolve.Sql.NVarChar,
          "R" + srData.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveProcessTemp_ID",
          Evolve.Sql.Int,
          srData.EvolveProcessTemp_Id
        )
        .input(
          "EvolveReworkSrNo_Remarks",
          Evolve.Sql.NVarChar,
          data.EvolveReworkSrNo_Remarks
        )
        .input("EvolveReworkSrNo_Status", Evolve.Sql.NVarChar, "Rejected")
        .input("EvolveReworkSrNo_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolveReworkSrNo_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolveReworkSrNo_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolveReworkSrNo_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .query(
          "INSERT INTO EvolveReworkSrNo (EvolveProdOrders_ID, EvolveProdOrdersDetail_ID, EvolveReworkSrNo_Serial, EvolveProcessTemp_ID, EvolveReworkSrNo_Status, EvolveReworkSrNo_Remarks, EvolveReworkSrNo_CreatedAt, EvolveReworkSrNo_CreatedUser, EvolveReworkSrNo_UpdatedAt, EvolveReworkSrNo_UpdatedUser) VALUES (@EvolveProdOrders_ID, @EvolveProdOrdersDetail_ID, @EvolveReworkSrNo_Serial, @EvolveProcessTemp_Id, @EvolveReworkSrNo_Status, @EvolveReworkSrNo_Remarks, @EvolveReworkSrNo_CreatedAt, @EvolveReworkSrNo_CreatedUser,  @EvolveReworkSrNo_UpdatedAt, @EvolveReworkSrNo_UpdatedUser)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  pdiPODUpdateStatus: async function (data) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()

        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveProdOrdersDetail_Status",
          Evolve.Sql.NVarChar,
          "PDI Rejected"
        )
        .input(
          "EvolveProdOrdersDetail_UpdatedAt",
          Evolve.Sql.NVarChar,
          dataTime
        )
        .input(
          "EvolveProdOrdersDetail_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status, EvolveProdOrdersDetail_UpdatedAt = @EvolveProdOrdersDetail_UpdatedAt, EvolveProdOrdersDetail_UpdatedUser = @EvolveProdOrdersDetail_UpdatedUser WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  deleteDoData: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, id)
        .query("DELETE EvolveDo WHERE  EvolveDo.EvolveDO_ID = @EvolveDO_ID");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getNxtProcessSeq: async function (data) {
    try {
      /*SELECT TOP(1) epts.Evolveprocesstemp_seq
                  FROM EvolveProdOrders epo , EvolveProdOrdersDetail epd , EvolveItem ei , EvolveProcessTempSeq epts 
                  WHERE ei.EvolveItem_ID = epo.EvolveItem_ID  
                  AND epd.EvolveProdOrders_ID = epo.EvolveProdOrders_ID
                  AND epts.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id
                  AND epts.EvolveProcessTemp_Seq > epd.EvolveProdOrdersDetail_NxtSeq
                  AND epd.EvolveProdOrdersDetail_Serial = '6101381819121600001'
                  ORDER BY epts.EvolveProcessTemp_Seq ASC*/
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "SELECT TOP(1) epts.Evolveprocesstemp_seq ,epts.* , epd.* FROM EvolveProdOrders epo , EvolveProdOrdersDetail epd , EvolveItem ei , EvolveProcessTempSeq epts  WHERE ei.EvolveItem_ID = epo.EvolveItem_ID AND epd.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epts.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id        AND epts.EvolveProcessTemp_Seq > epd.EvolveProdOrdersDetail_NxtSeq AND epd.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial ORDER BY epts.EvolveProcessTemp_Seq ASC"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  insertPoHistory: async function (data, serialData, procees, id) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      /*SELECT TOP(1) epts.Evolveprocesstemp_seq
                  FROM EvolveProdOrders epo , EvolveProdOrdersDetail epd , EvolveItem ei , EvolveProcessTempSeq epts 
                  WHERE ei.EvolveItem_ID = epo.EvolveItem_ID  
                  AND epd.EvolveProdOrders_ID = epo.EvolveProdOrders_ID
                  AND epts.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id
                  AND epts.EvolveProcessTemp_Seq > epd.EvolveProdOrdersDetail_NxtSeq
                  AND epd.EvolveProdOrdersDetail_Serial = '6101381819121600001'
                  ORDER BY epts.EvolveProcessTemp_Seq ASC*/
      return await Evolve.SqlPool.request()

        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveProdOrders_Order",
          Evolve.Sql.NVarChar,
          serialData.EvolveProdOrders_Order
        )

        .input(
          "EvolveProdOrderHistoryType_Code",
          Evolve.Sql.NVarChar,
          "PRODORD"
        )
        // .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolveProdOrderDetails_ID",
          Evolve.Sql.Int,
          serialData.EvolveProdOrderDetails_ID
        )
        .input(
          "EvolveProdOrders_ID",
          Evolve.Sql.Int,
          serialData.EvolveProdOrders_ID
        )
        .input("EvolveItem_ID", Evolve.Sql.Int, serialData.EvolveItem_ID)
        .input(
          "EvolveItem_Code",
          Evolve.Sql.NVarChar,
          serialData.EvolveItem_Code
        )
        .input(
          "EvolveProcessTemp_ID",
          Evolve.Sql.Int,
          procees.EvolveProcessTemp_ID
        )
        .input("EvolveProcess_ID", Evolve.Sql.Int, procees.EvolveProcess_ID)
        .input(
          "EvolveProdOrderHistory_NextSeq",
          Evolve.Sql.Int,
          procees.Evolveprocesstemp_seq
        )
        .input(
          "EvolveProdOrderHistory_PrvSeq",
          Evolve.Sql.Int,
          serialData.EvolveProdOrderHistory_PrvSeq
        )
        .input(
          "EvolveProdOrderHistory_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveProdOrderHistory_UpdatedUser",
          Evolve.Sql.Int,
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
        .input("EvolvePDI_Status", Evolve.Sql.Bit, 0)
        .input("EvolveMachine_ID", Evolve.Sql.Int, id)
        .query(
          "INSERT INTO EvolveProdOrdersHistory (EvolveProdOrdersDetail_Serial,EvolveProdOrders_Order,EvolveProdOrderHistoryType_Code,EvolveProdOrderDetails_ID,EvolveProdOrders_ID,EvolveItem_ID,EvolveItem_Code,EvolveProcessTemp_ID,EvolveProcess_ID,EvolveProdOrderHistory_NextSeq,EvolveProdOrderHistory_PrvSeq,EvolveProdOrderHistory_CreatedUser,EvolveProdOrderHistory_UpdatedUser,EvolveProdOrderHistory_CreatedAt,EvolveProdOrderHistory_UpdatedAt,EvolveProdOrdersDetails_Status,EvolvePDI_Status,EvolveMachine_ID) VALUES (@EvolveProdOrdersDetail_Serial,@EvolveProdOrders_Order,@EvolveProdOrderHistoryType_Code,@EvolveProdOrderDetails_ID,@EvolveProdOrders_ID,@EvolveItem_ID,@EvolveItem_Code,@EvolveProcessTemp_ID,@EvolveProcess_ID,@EvolveProdOrderHistory_NextSeq,@EvolveProdOrderHistory_PrvSeq,@EvolveProdOrderHistory_CreatedUser,@EvolveProdOrderHistory_UpdatedUser,@EvolveProdOrderHistory_CreatedAt,@EvolveProdOrderHistory_UpdatedAt,@EvolveProdOrdersDetails_Status,@EvolvePDI_Status,@EvolveMachine_ID)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getDoDataTableList: async function (data) {
    try {
      if (data.Do_Id != "" && data.So_Id == "" && data.Customer_Code == "") {
        return await Evolve.SqlPool.request()
          .input("EvolveDO_ID", Evolve.Sql.Int, data.Do_Id)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND do.EvolveDO_ID = @EvolveDO_ID ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id == "" &&
        data.So_Id != "" &&
        data.Customer_Code == ""
      ) {
        return await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.So_Id)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_ID = @EvolveSalesOrder_ID ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id == "" &&
        data.So_Id == "" &&
        data.Customer_Code != ""
      ) {
        return await Evolve.SqlPool.request()
          .input("Customer_Code", Evolve.Sql.NVarChar, data.Customer_Code)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_Cust = @Customer_Code ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id != "" &&
        data.So_Id != "" &&
        data.Customer_Code == ""
      ) {
        return await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.So_Id)
          .input("EvolveDO_ID", Evolve.Sql.Int, data.Do_Id)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND do.EvolveDO_ID = @EvolveDO_ID ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id != "" &&
        data.So_Id == "" &&
        data.Customer_Code != ""
      ) {
        return await Evolve.SqlPool.request()
          .input("Customer_Code", Evolve.Sql.NVarChar, data.Customer_Code)
          .input("EvolveDO_ID", Evolve.Sql.Int, data.Do_Id)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_Cust = @Customer_Code AND do.EvolveDO_ID = @EvolveDO_ID ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id == "" &&
        data.So_Id != "" &&
        data.Customer_Code != ""
      ) {
        return await Evolve.SqlPool.request()
          .input("Customer_Code", Evolve.Sql.NVarChar, data.Customer_Code)
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.So_Id)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_Cust = @Customer_Code AND so.EvolveSalesOrder_ID = @EvolveSalesOrder_ID ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id != "" &&
        data.So_Id != "" &&
        data.Customer_Code != ""
      ) {
        return await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.So_Id)
          .input("EvolveDO_ID", Evolve.Sql.Int, data.Do_Id)
          .input("Customer_Code", Evolve.Sql.NVarChar, data.Customer_Code)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND do.EvolveDO_ID = @EvolveDO_ID AND so.EvolveSalesOrder_Cust = @Customer_Code ORDER BY do.EvolveDO_ID"
          );
      } else {
        return await Evolve.SqlPool.request().query(
          "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber ORDER BY do.EvolveDO_ID"
        );
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateSerialNxtProcess: async function (
    data,
    EvolveProdOrdersDetail_NxtSeq,
    EvolveProdOrdersDetail_PrvSeq
  ) {
    // updateSerialNxtProcess Start
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveProdOrdersDetail_NxtSeq",
          Evolve.Sql.Int,
          EvolveProdOrdersDetail_NxtSeq
        )
        .input(
          "EvolveProdOrdersDetail_PrvSeq",
          Evolve.Sql.Int,
          EvolveProdOrdersDetail_PrvSeq
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = @EvolveProdOrdersDetail_PrvSeq  , EvolveProdOrdersDetail_NxtSeq =  @EvolveProdOrdersDetail_NxtSeq WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // updateSerialNxtProcess End

  completeSerialNxtProcess: async function (data, machineId) {
    // completeSerialNxtProcess Start
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      let updatePoDetail = await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = EvolveProdOrdersDetail_NxtSeq  , EvolveProdOrdersDetail_Status =  'Completed' WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );

      let updatePoHistory = await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .input("EvolveMachine_ID", Evolve.Sql.Int, machineId)

        .input(
          "EvolveProdOrderHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveProdOrderHistory_UpdatedAt",
          Evolve.Sql.NVarChar,
          dataTime
        )
        .query(
          "UPDATE EvolveProdOrdersHistory SET EvolveProdOrderHistory_PrvSeq = EvolveProdOrderHistory_NextSeq ,EvolveProdOrdersDetails_Status='Completed',EvolveMachine_ID=@EvolveMachine_ID,EvolveProdOrderHistory_UpdatedUser=@EvolveProdOrderHistory_UpdatedUser,EvolveProdOrderHistory_UpdatedAt=@EvolveProdOrderHistory_UpdatedAt WHERE EvolveProdOrdersDetail_Serial=@EvolveProdOrdersDetail_Serial AND EvolveProdOrderHistoryType_Code = 'PRODORD' "
        );

      return updatePoHistory;
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //completeSerialNxtProcess End

  addPoHistory: async function (data) {
    // completeSerialNxtProcess Start
    try {
      // return await Evolve.SqlPool.request()
      //     .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
      //     .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = EvolveProdOrdersDetail_NxtSeq  , EvolveProdOrdersDetail_Status =  'Completed' WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //completeSerialNxtProcess End

  updatePoHistory: async function (
    data,
    machineId,
    process,
    EvolveProdOrderHistory_PrvSeq
  ) {
    // completeSerialNxtProcess Start
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveProdOrderHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveProdOrderHistory_UpdatedAt",
          Evolve.Sql.NVarChar,
          dataTime
        )
        .input("EvolveMachine_ID", Evolve.Sql.Int, machineId)
        .input(
          "EvolveProdOrderHistory_NextSeq",
          Evolve.Sql.Int,
          process.Evolveprocesstemp_seq
        )
        .input(
          "EvolveProdOrderHistory_PrvSeq",
          Evolve.Sql.Int,
          EvolveProdOrderHistory_PrvSeq
        )
        .input("EvolveProcess_ID", Evolve.Sql.Int, process.EvolveProcess_ID)
        .input(
          "EvolveProcessTemp_ID",
          Evolve.Sql.Int,
          process.EvolveProcessTemp_ID
        )

        .query(
          "UPDATE EvolveProdOrdersHistory SET  EvolveProdOrderHistory_PrvSeq = @EvolveProdOrderHistory_PrvSeq ,EvolveProdOrderHistory_NextSeq = @EvolveProdOrderHistory_NextSeq ,EvolveProdOrderHistory_UpdatedUser=@EvolveProdOrderHistory_UpdatedUser,EvolveProdOrderHistory_UpdatedAt=@EvolveProdOrderHistory_UpdatedAt,EvolveMachine_ID=@EvolveMachine_ID , EvolveProcess_ID=@EvolveProcess_ID ,EvolveProcessTemp_ID=@EvolveProcessTemp_ID  WHERE EvolveProdOrdersDetail_Serial=@EvolveProdOrdersDetail_Serial AND EvolveProdOrderHistoryType_Code = 'PRODORD' "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //updatePoHistory

  getSerialNoData: async function (data) {
    // completeSerialNxtProcess Start
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "  SELECT * FROM EvolveProdOrdersHistory WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND EvolveProdOrderHistoryType_Code='BARGEN'"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //completeSerialNxtProcess End

  getReworkedSrData: async function (data) {
    // getReworkedSrData Start
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "SELECT epo.EvolveProdOrders_Order , epod.EvolveProdOrdersDetail_ID , ei.EvolveProcessTemp_Id , epod.EvolveProdOrdersDetail_Serial , ei.EvolveItem_ID , epod.EvolveProdOrdersDetail_NxtSeq FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //getReworkedSrData End

  addReworkSrData: async function (data, srData) {
    // getReworkedSrData Start
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrders_Order",
          Evolve.Sql.NVarChar,
          srData.EvolveProdOrders_Order
        )
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          srData.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveReworkSrNo_Serial",
          Evolve.Sql.NVarChar,
          "R" + srData.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveReworkSrNo_Seq",
          Evolve.Sql.Int,
          srData.EvolveProdOrdersDetail_NxtSeq
        )
        .input(
          "EvolveProcessTemp_ID",
          Evolve.Sql.Int,
          srData.EvolveProcessTemp_Id
        )
        .input("EvolveItem_ID", Evolve.Sql.Int, srData.EvolveItem_ID)
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          srData.EvolveProdOrdersDetail_ID
        )
        .input("EvolveReworkSrNo_Status", Evolve.Sql.NVarChar, "Rejected")
        .input("EvolveReworkSrNo_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolveReworkSrNo_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolveReworkSrNo_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolveReworkSrNo_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .query(
          "INSERT INTO EvolveReworkSrNo (EvolveProdOrders_Order,EvolveProdOrdersDetail_Serial,EvolveReworkSrNo_Seq,EvolveItem_ID,EvolveProdOrdersDetail_ID,EvolveReworkSrNo_Serial,EvolveProcessTemp_ID,EvolveReworkSrNo_Status,EvolveReworkSrNo_CreatedAt,EvolveReworkSrNo_CreatedUser,EvolveReworkSrNo_UpdatedAt,EvolveReworkSrNo_UpdatedUser) VALUES (@EvolveProdOrders_Order,@EvolveProdOrdersDetail_Serial,@EvolveReworkSrNo_Seq,@EvolveItem_ID,@EvolveProdOrdersDetail_ID,@EvolveReworkSrNo_Serial,@EvolveProcessTemp_ID,@EvolveReworkSrNo_Status,@EvolveReworkSrNo_CreatedAt,@EvolveReworkSrNo_CreatedUser,@EvolveReworkSrNo_UpdatedAt,@EvolveReworkSrNo_UpdatedUser)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //getReworkedSrData End

  updateRejectSrNo: async function (data) {
    // updateRejectSrNo Start
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = EvolveProdOrdersDetail_NxtSeq  , EvolveProdOrdersDetail_Status =  'Rejected' WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, // updateRejectSrNo End

  // getSequenceData: async function (data) {
  //   try {
  //     return await Evolve.SqlPool.request()
  //       .input(
  //         "EvolveProdOrdersDetail_Serial",
  //         Evolve.Sql.NVarChar,
  //         data.EvolveProdOrdersDetail_Serial
  //       )
  //       .query(
  //         "  SELECT EvolveProdOrdersDetail_PrvSeq , EvolveProdOrdersDetail_NxtSeq   FROM [EvolveProdOrdersDetail] WHERE  EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
  //       );
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     return new Error(error.message);
  //   }
  // },

  insertItemRejectHistory: async function (
    data,
    serialData,
    machineId,
    sequenceData,
    process
  ) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      // console.log("serial data in services " , serialData)

      // console.log("eneter in servoces >> " );

      /*SELECT TOP(1) epts.Evolveprocesstemp_seq
                  FROM EvolveProdOrders epo , EvolveProdOrdersDetail epd , EvolveItem ei , EvolveProcessTempSeq epts 
                  WHERE ei.EvolveItem_ID = epo.EvolveItem_ID  
                  AND epd.EvolveProdOrders_ID = epo.EvolveProdOrders_ID
                  AND epts.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id
                  AND epts.EvolveProcessTemp_Seq > epd.EvolveProdOrdersDetail_NxtSeq
                  AND epd.EvolveProdOrdersDetail_Serial = '6101381819121600001'
                  ORDER BY epts.EvolveProcessTemp_Seq ASC*/
      let InsertPoHistory = await Evolve.SqlPool.request();

      return updatePoHistory;
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //completeSerialNxtProcess End

  addIOData: async function (data) {
    try {

      console.log("data in io data >>> ", data)
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

      let createIORecord = await Evolve.SqlPool.request()
        .input(
          "EvolveIO_Data",
          Evolve.Sql.NVarChar,
          JSON.stringify(data.EvolveIO_Data)
        )
        .input(
          "EvolveIO_File_Data",
          Evolve.Sql.NVarChar,
          JSON.stringify(data.EvolveIO_File_Data)
        )
        .input("EvolveIO_File_InTime", Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolveIO_Data_Formate",
          Evolve.Sql.NVarChar,
          data.EvolveIO_Data_Formate
        )
        .input("EvolveIO_Code", Evolve.Sql.NVarChar, data.EvolveIO_Code)
        .input("EvolveIO_Direction", Evolve.Sql.Bit, data.EvolveIO_Direction)
        .input("EvolveIO_Status", Evolve.Sql.Bit, data.EvolveIO_Status)
        .input("EvolveIO_ERP_Type", Evolve.Sql.NVarChar, data.EvolveIO_ERP_Type)
        .query(
          "INSERT INTO EvolveIO(EvolveIO_Data,EvolveIO_File_Data,EvolveIO_File_InTime,EvolveIO_Data_Formate,EvolveIO_Code,EvolveIO_Direction,EvolveIO_Status,EvolveIO_ERP_Type) VALUES (@EvolveIO_Data,@EvolveIO_File_Data,@EvolveIO_File_InTime,@EvolveIO_Data_Formate,@EvolveIO_Code,@EvolveIO_Direction,@EvolveIO_Status,@EvolveIO_ERP_Type)"
        );
      if (createIORecord instanceof Error || createIORecord.rowsAffected < 1) {
        Evolve.Log.error("Error on add IO Data");
        return new Error("Error on add IO Data");
      } else {
        return createIORecord;
      }
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  addPoHistory: async function (data) {
    // completeSerialNxtProcess Start
    try {
      // return await Evolve.SqlPool.request()
      //     .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
      //     .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = EvolveProdOrdersDetail_NxtSeq  , EvolveProdOrdersDetail_Status =  'Completed' WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //completeSerialNxtProcess End

  updatePoHistory: async function (
    data,
    machineId,
    process,
    EvolveProdOrderHistory_PrvSeq
  ) {
    // completeSerialNxtProcess Start
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveProdOrderHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveProdOrderHistory_UpdatedAt",
          Evolve.Sql.NVarChar,
          dataTime
        )
        .input("EvolveMachine_ID", Evolve.Sql.Int, machineId)
        .input(
          "EvolveProdOrderHistory_NextSeq",
          Evolve.Sql.Int,
          process.Evolveprocesstemp_seq
        )
        .input(
          "EvolveProdOrderHistory_PrvSeq",
          Evolve.Sql.Int,
          EvolveProdOrderHistory_PrvSeq
        )
        .input("EvolveProcess_ID", Evolve.Sql.Int, process.EvolveProcess_ID)
        .input(
          "EvolveProcessTemp_ID",
          Evolve.Sql.Int,
          process.EvolveProcessTemp_ID
        )

        .query(
          "UPDATE EvolveProdOrdersHistory SET  EvolveProdOrderHistory_PrvSeq = @EvolveProdOrderHistory_PrvSeq ,EvolveProdOrderHistory_NextSeq = @EvolveProdOrderHistory_NextSeq ,EvolveProdOrderHistory_UpdatedUser=@EvolveProdOrderHistory_UpdatedUser,EvolveProdOrderHistory_UpdatedAt=@EvolveProdOrderHistory_UpdatedAt,EvolveMachine_ID=@EvolveMachine_ID , EvolveProcess_ID=@EvolveProcess_ID ,EvolveProcessTemp_ID=@EvolveProcessTemp_ID  WHERE EvolveProdOrdersDetail_Serial=@EvolveProdOrdersDetail_Serial AND EvolveProdOrderHistoryType_Code = 'PRODORD' "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //updatePoHistory

  getSerialNoData: async function (data) {
    // completeSerialNxtProcess Start
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "  SELECT * FROM EvolveProdOrdersHistory WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND EvolveProdOrderHistoryType_Code='BARGEN'"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //completeSerialNxtProcess End

  getReworkedSrData: async function (data) {
    // getReworkedSrData Start
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "SELECT epo.EvolveProdOrders_Order , epod.EvolveProdOrdersDetail_ID , ei.EvolveProcessTemp_Id , epod.EvolveProdOrdersDetail_Serial , ei.EvolveItem_ID , epod.EvolveProdOrdersDetail_NxtSeq FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //getReworkedSrData End

  addReworkSrData: async function (data, srData) {
    // getReworkedSrData Start
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrders_Order",
          Evolve.Sql.NVarChar,
          srData.EvolveProdOrders_Order
        )
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          srData.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveReworkSrNo_Serial",
          Evolve.Sql.NVarChar,
          "R" + srData.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveReworkSrNo_Seq",
          Evolve.Sql.Int,
          srData.EvolveProdOrdersDetail_NxtSeq
        )
        .input(
          "EvolveProcessTemp_ID",
          Evolve.Sql.Int,
          srData.EvolveProcessTemp_Id
        )
        .input("EvolveItem_ID", Evolve.Sql.Int, srData.EvolveItem_ID)
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          srData.EvolveProdOrdersDetail_ID
        )
        .input("EvolveReworkSrNo_Status", Evolve.Sql.NVarChar, "Rejected")
        .input("EvolveReworkSrNo_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolveReworkSrNo_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolveReworkSrNo_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolveReworkSrNo_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .query(
          "INSERT INTO EvolveReworkSrNo (EvolveProdOrders_Order,EvolveProdOrdersDetail_Serial,EvolveReworkSrNo_Seq,EvolveItem_ID,EvolveProdOrdersDetail_ID,EvolveReworkSrNo_Serial,EvolveProcessTemp_ID,EvolveReworkSrNo_Status,EvolveReworkSrNo_CreatedAt,EvolveReworkSrNo_CreatedUser,EvolveReworkSrNo_UpdatedAt,EvolveReworkSrNo_UpdatedUser) VALUES (@EvolveProdOrders_Order,@EvolveProdOrdersDetail_Serial,@EvolveReworkSrNo_Seq,@EvolveItem_ID,@EvolveProdOrdersDetail_ID,@EvolveReworkSrNo_Serial,@EvolveProcessTemp_ID,@EvolveReworkSrNo_Status,@EvolveReworkSrNo_CreatedAt,@EvolveReworkSrNo_CreatedUser,@EvolveReworkSrNo_UpdatedAt,@EvolveReworkSrNo_UpdatedUser)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, //getReworkedSrData End

  updateRejectSrNo: async function (data) {
    // updateRejectSrNo Start
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = EvolveProdOrdersDetail_NxtSeq  , EvolveProdOrdersDetail_Status =  'Rejected' WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, // updateRejectSrNo End

  getSequenceData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "  SELECT EvolveProdOrdersDetail_PrvSeq , EvolveProdOrdersDetail_NxtSeq   FROM [EvolveProdOrdersDetail] WHERE  EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  insertItemRejectHistory: async function (
    data,
    serialData,
    machineId,
    sequenceData,
    process
  ) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      // console.log("serial data in services " , serialData)

      // console.log("eneter in servoces >> " );

      /*SELECT TOP(1) epts.Evolveprocesstemp_seq
            FROM EvolveProdOrders epo , EvolveProdOrdersDetail epd , EvolveItem ei , EvolveProcessTempSeq epts 
            WHERE ei.EvolveItem_ID = epo.EvolveItem_ID  
            AND epd.EvolveProdOrders_ID = epo.EvolveProdOrders_ID
            AND epts.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id
            AND epts.EvolveProcessTemp_Seq > epd.EvolveProdOrdersDetail_NxtSeq
            AND epd.EvolveProdOrdersDetail_Serial = '6101381819121600001'
            ORDER BY epts.EvolveProcessTemp_Seq ASC*/
      return await Evolve.SqlPool.request()

        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveProdOrders_Order",
          Evolve.Sql.NVarChar,
          serialData.EvolveProdOrders_Order
        )

        .input(
          "EvolveProdOrderHistoryType_Code",
          Evolve.Sql.NVarChar,
          "SRREJECT"
        )
        // .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
        .input(
          "EvolveProdOrderDetails_ID",
          Evolve.Sql.Int,
          serialData.EvolveProdOrderDetails_ID
        )
        .input(
          "EvolveProdOrders_ID",
          Evolve.Sql.Int,
          serialData.EvolveProdOrders_ID
        )
        .input("EvolveItem_ID", Evolve.Sql.Int, serialData.EvolveItem_ID)
        .input(
          "EvolveItem_Code",
          Evolve.Sql.NVarChar,
          serialData.EvolveItem_Code
        )
        .input(
          "EvolveProcessTemp_ID",
          Evolve.Sql.Int,
          process.EvolveProcessTemp_ID
        )
        .input("EvolveProcess_ID", Evolve.Sql.Int, process.EvolveProcess_ID)
        .input(
          "EvolveProdOrderHistory_NextSeq",
          Evolve.Sql.Int,
          sequenceData.EvolveProdOrdersDetail_NxtSeq
        )
        .input(
          "EvolveProdOrderHistory_PrvSeq",
          Evolve.Sql.Int,
          sequenceData.EvolveProdOrdersDetail_PrvSeq
        )
        .input(
          "EvolveProdOrderHistory_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveProdOrderHistory_UpdatedUser",
          Evolve.Sql.Int,
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
          "Rejected"
        )
        .input("EvolvePDI_Status", Evolve.Sql.Bit, 0)
        .input("EvolveMachine_ID", Evolve.Sql.Int, machineId)

        .query(
          "INSERT INTO EvolveProdOrdersHistory (EvolveProdOrdersDetail_Serial,EvolveProdOrders_Order,EvolveProdOrderHistoryType_Code,EvolveProdOrderDetails_ID,EvolveProdOrders_ID,EvolveItem_ID,EvolveItem_Code,EvolveProcessTemp_ID,EvolveProcess_ID,EvolveProdOrderHistory_NextSeq,EvolveProdOrderHistory_PrvSeq,EvolveProdOrderHistory_CreatedUser,EvolveProdOrderHistory_UpdatedUser,EvolveProdOrderHistory_CreatedAt,EvolveProdOrderHistory_UpdatedAt,EvolveProdOrdersDetails_Status,EvolvePDI_Status,EvolveMachine_ID) VALUES (@EvolveProdOrdersDetail_Serial,@EvolveProdOrders_Order,@EvolveProdOrderHistoryType_Code,@EvolveProdOrderDetails_ID,@EvolveProdOrders_ID,@EvolveItem_ID,@EvolveItem_Code,@EvolveProcessTemp_ID,@EvolveProcess_ID,@EvolveProdOrderHistory_NextSeq,@EvolveProdOrderHistory_PrvSeq,@EvolveProdOrderHistory_CreatedUser,@EvolveProdOrderHistory_UpdatedUser,@EvolveProdOrderHistory_CreatedAt,@EvolveProdOrderHistory_UpdatedAt,@EvolveProdOrdersDetails_Status,@EvolvePDI_Status,@EvolveMachine_ID)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getRejectionWorkOrderDatatableList: async function (start, length) {
    // getRejectionWorkOrderDatatableList
    try {
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "SELECT ers.* , eu.EvolveUser_Name, ep.EvolveProcess_Name ,ei.EvolveItem_Code ,ept.EvolveProcessTemp_Name FROM EvolveReworkSrNo ers INNER JOIN EvolveUser eu ON eu.EvolveUser_ID = ers.EvolveReworkSrNo_CreatedUser INNER JOIN EvolveProcessTempSeq epts ON  epts.Evolveprocesstemp_seq = ers.EvolveReworkSrNo_Seq INNER JOIN EvolveProcess ep on epts.Evolveprocesstemp_seq = ep.EvolveProcess_ID AND epts.Evolveprocesstemp_id = ers.EvolveProcessTemp_ID INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = ers.EvolveItem_ID INNER JOIN EvolveProcessTemp ept ON ept.EvolveProcessTemp_ID = ers.EvolveProcessTemp_ID WHERE ers.EvolveReworkSrNo_Status = 'Rejected' ORDER BY ers.EvolveReworkSrNo_ID DESC"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  }, // getRejectionWorkOrderDatatableList
  getScrapCount: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "select count(EvolveScrap_ID) AS count from EvolveScrap"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getScrapList: async function (start, length) {
    try {
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          " SELECT es.* , ep.EvolveProcess_Name  FROM EvolveScrap es , EvolveProcess ep  WHERE es.EvolveProcess_ID = ep.EvolveProcess_ID ORDER BY es.EvolveScrap_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  changeScrapStatus: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveScrap_ID", Evolve.Sql.Int, id)
        .query(
          "UPDATE EvolveScrap SET EvolveScrap_In = 1 , EvolveScrap_Status = 'Scrapped' WHERE  EvolveScrap_ID  = @EvolveScrap_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  // add scrap data
  getScrapDetails: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_ID
        )
        .query(
          "  SELECT EvolveProdOrdersDetail_Serial  ,EvolveProdOrdersDetail_NxtSeq FROM EvolveProdOrdersDetail  WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  addScrapDetails: async function (data, record) {
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
      return await Evolve.SqlPool.request()
        .input(
          "EvolveReworkSrNo_Remarks",
          Evolve.Sql.NVarChar,
          data.EvolveReworkSrNo_Remarks
        )
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          record.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveProdOrdersDetail_NxtSeq",
          Evolve.Sql.Int,
          record.EvolveProdOrdersDetail_NxtSeq
        )
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_ID
        )
        .input("EvolveScrap_From", Evolve.Sql.NVarChar, data.EvolveScrap_From)
        .input(
          "EvolveScrap_SupplierCode",
          Evolve.Sql.NVarChar,
          data.EvolveScrap_SupplierCode
        )
        .input("EvolveScrap_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveScrap_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveScrap_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveScrap_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          " INSERT INTO EvolveScrap (EvolveProdOrderDetails_ID,EvolveScrap_Serial,EvolveProcess_ID,EvolveScrap_Remark,EvolveScrap_Status,EvolveScrap_In,EvolveScrap_From,EvolveScrap_SupplierCode,EvolveScrap_CreatedUser,EvolveScrap_UpdatedUser,EvolveScrap_CreatedAt , EvolveScrap_UpdatedAt)  VALUES (@EvolveProdOrdersDetail_ID, @EvolveProdOrdersDetail_Serial, @EvolveProdOrdersDetail_NxtSeq,@EvolveReworkSrNo_Remarks,'In Queue','true',@EvolveScrap_From,@EvolveScrap_SupplierCode,@EvolveScrap_CreatedUser,@EvolveScrap_UpdatedUser,@EvolveScrap_CreatedAt ,@EvolveScrap_UpdatedAt)"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getPdiHistorySerialNo: async function (EvolveDOLine_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, EvolveDOLine_ID)
        .query(
          "SELECT distinct(EvolveProdOrdersDetail_Serial) FROM EvolvePDIHistory  WHERE EvolveDOLine_ID = @EvolveDOLine_ID AND EvolveProdOrdersDetail_Serial != ''"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  deletePdiHistory: async function (EvolveDOLine_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, EvolveDOLine_ID)
        .query(
          "Delete From EvolvePDIHistory WHERE EvolveDOLine_ID = @EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  addPdiHistoryData: async function (data, loginId, serialNo) {
    try {
      // Check if record already presen to

      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .input(
          "EvolvePDITemplate_ID",
          Evolve.Sql.Int,
          data.EvolvePDITemplate_ID
        )
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, serialNo)
        .input(
          "EvolvePDIHistory_Key",
          Evolve.Sql.NVarChar,
          data.EvolvePDIHistory_Key
        )
        .input("ParaLabel", Evolve.Sql.NVarChar, data.ParaLabel)
        .input("ParaType", Evolve.Sql.NVarChar, data.ParaType)
        .input("ParaValue", Evolve.Sql.NVarChar, data.ParaValue)
        .input("EvolvePDILine_ID", Evolve.Sql.Int, data.EvolvePDILine_ID)
        .input(
          "EvolvePDIHistory_Status",
          Evolve.Sql.NVarChar,
          data.EvolvePDIHistory_Status
        )
        // .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
        .input("EvolvePDIHistory_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolvePDIHistory_CreatedUser", Evolve.Sql.Int, loginId)
        .input("EvolvePDIHistory_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolvePDIHistory_UpdatedUser", Evolve.Sql.Int, loginId)
        .query(
          "INSERT INTO EvolvePDIHistory (EvolveDO_ID ,EvolveDOLine_ID,EvolvePDITemplate_ID ,EvolveProdOrdersDetail_Serial ,EvolvePDIHistory_ParaLabel,EvolvePDIHistory_ParaType ,EvolvePDIHistory_ParaValue ,EvolvePDIHistory_Status ,EvolvePDIHistory_CreatedUser,EvolvePDIHistory_CreatedAt  ,EvolvePDIHistory_UpdatedUser, EvolvePDIHistory_UpdatedAt, EvolvePDILine_ID,EvolvePDIHistory_Key)     VALUES   (@EvolveDO_ID, @EvolveDOLine_ID,@EvolvePDITemplate_ID,@EvolveProdOrdersDetail_Serial,@ParaLabel,@ParaType,@ParaValue,@EvolvePDIHistory_Status,@EvolvePDIHistory_CreatedUser,@EvolvePDIHistory_CreatedAt,@EvolvePDIHistory_UpdatedUser,@EvolvePDIHistory_UpdatedAt, @EvolvePDILine_ID,@EvolvePDIHistory_Key)   "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // getDoId: async function (id) {
  //     try {
  //         return await Evolve.SqlPool.request()
  //             .input('EvolveDOLine_ID', Evolve.Sql.Int, id)
  //             .query("  SELECT EvolveDO_ID , EvolvePDITemplate_ID FROM EvolveDoLine WHERE EvolveDOLine_ID = @EvolveDOLine_ID");
  //     } catch (error) {
  //         Evolve.Log.error(error.message);
  //         return new Error(error.message);
  //     }
  // },
  getDoId: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, id)
        .query(
          "  SELECT EvolveDO_ID , EvolvePDITemplate_ID , EvolveDOLine_Number  FROM EvolveDoLine WHERE EvolveDOLine_ID = @EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // Modification in do
  getTempId: async function (part) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_Code", Evolve.Sql.NVarChar, part)
        .query(
          "  SELECT EvolvePDITemplate_ID FROM EvolveItem WHERE EvolveItem_Code = @EvolveItem_Code"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  checkItemAvailable: async function (part) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_Code", Evolve.Sql.NVarChar, part)
        .query(
          "  SELECT EvolvePDITemplate_ID FROM EvolveItem WHERE EvolveItem_Code = @EvolveItem_Code"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  checkSerialNo: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.NVarChar, data.EvolveItem_ID)
        .query(
          "SELECT EvolveProdOrdersDetail_Serial  FROM EvolveProdOrdersDetail  WHERE EvolveProdOrders_ID IN (SELECT EvolveProdOrders_ID  FROM EvolveProdOrders WHERE EvolveItem_ID = @EvolveItem_ID )AND  EvolveProdOrdersDetail_Status = 'Completed'"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  changePdiStatus: async function (serialNo, EvolvePDI_Status) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, serialNo)
        .input("EvolvePDI_Status", Evolve.Sql.Int, EvolvePDI_Status)
        .query(
          "UPDATE EvolveProdOrdersHistory  SET EvolvePDI_Status = @EvolvePDI_Status WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  checkSerialNoInPdiHistory: async function (EvolveProdOrdersDetail_Serial) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          EvolveProdOrdersDetail_Serial
        )
        .query(
          " SELECT EvolveProdOrdersDetail_Serial FROM EvolvePDIHistory WHERE EvolveProdOrdersDetail_Serial= @EvolveProdOrdersDetail_Serial "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getDoSoLineDetails: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "SELECT edl.* , esl.*  FROM EvolveDoLine edl , EvolveSalesOrderLine esl  WHERE edl.EvolveDOLine_ID = @EvolveDOLine_ID AND edl.EvolveSalesOrderLine_ID = esl.EvolveSalesOrderLine_ID "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  deletePDIHistoryDoLine: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "DELETE FROM EvolvePDIHistory WHERE EvolveDOLine_ID = @EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateSoLineDetails: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrderLine_ID",
          Evolve.Sql.Int,
          data.EvolveSalesOrderLine_ID
        )
        .input(
          "EvolveSalesOrderLine_DOQty",
          Evolve.Sql.Int,
          parseInt(data.EvolveSalesOrderLine_DOQty) -
          parseInt(data.EvolveDOLine_QtyDO)
        )
        .input(
          "EvolveSalesOrderLine_PDIQty",
          Evolve.Sql.Int,
          parseInt(data.EvolveSalesOrderLine_PDIQty) -
          parseInt(data.EvolveDOLine_QtyPDI)
        )
        .query(
          "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty = @EvolveSalesOrderLine_DOQty , EvolveSalesOrderLine_PDIQty = @EvolveSalesOrderLine_PDIQty WHERE EvolveSalesOrderLine_ID = @EvolveSalesOrderLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  deleteDoLine: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "DELETE FROM EvolveDoLine WHERE EvolveDOLine_ID = @EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getDoLineDetails: async function (data) {
    try {
      // SELECT  ed.EvolveDO_Number , es.EvolveSupplier_Name , ed.EvolveDO_VehicelNumber , ei.EvolveItem_Code , ei.EvolveItem_Desc
      // FROM  EvolveDoLine edl , EvolveDo ed , EvolveItem ei , EvolveSalesOrder eso , EvolveSupplier es
      // WHERE edl.EvolveDOLine_ID = 1
      // AND ed.EvolveDO_ID = edl.EvolveDO_ID
      // AND ei.EvolveItem_Code = edl.EvolveDOLine_Part
      // AND eso.EvolveSalesOrder_Number = ed.EvolveDO_SONumber
      // AND es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust

      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "SELECT  ed.EvolveDO_Number , es.EvolveSupplier_Name , ed.EvolveDO_VehicelNumber , ei.EvolveItem_Code , ei.EvolveItem_Desc , edl.EvolveDOLine_QtyDO  FROM  EvolveDoLine edl , EvolveDo ed , EvolveItem ei , EvolveSalesOrder eso , EvolveSupplier es  WHERE edl.EvolveDOLine_ID = @EvolveDOLine_ID AND ed.EvolveDO_ID = edl.EvolveDO_ID       AND ei.EvolveItem_Code = edl.EvolveDOLine_Part  AND eso.EvolveSalesOrder_Number = ed.EvolveDO_SONumber AND es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust   "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  //Production Booking

  getWorkOrders: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "select * from  EvolveProdOrders where EvolveProdOrders_Status = 'started'"
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getProductionOrdersItemNumber: async function () {
    try {
      return await Evolve.SqlPool.request().query("select *  from EvolveItem");
      // .query('select DISTINCT eitm.EvolveItem_Code, eitm.EvolveItem_ID  from EvolveProdOrders epo, EvolveItem eitm WHERE epo.EvolveItem_ID = eitm.EvolveItem_ID')
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  workOrderByItem: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, id)
        .query("SELECT * FROM EvolveProdOrders WHERE EvolveItem_ID = @EvolveItem_ID AND EvolveProdOrders_Status = 'OPEN'");
      // .query('select DISTINCT eitm.EvolveItem_Code, eitm.EvolveItem_ID  from EvolveProdOrders epo, EvolveItem eitm WHERE epo.EvolveItem_ID = eitm.EvolveItem_ID')
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  ItemByWorkOrder: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, id)
        .query(
          "SELECT ei.EvolveItem_ID,ei.EvolveItem_Code , ei.EvolveItem_CustPart , ei.EvolveItem_Desc  FROM EvolveProdOrders epo, EvolveItem ei WHERE epo.EvolveProdOrders_ID =@EvolveProdOrders_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID"
        );

      // SELECT ei.EvolveItem_ID,ei.EvolveItem_Code , ei.EvolveItem_CustPart , ei.EvolveItem_Desc  FROM EvolveProdOrders epo, EvolveItem ei WHERE epo.EvolveProdOrders_ID =@EvolveProdOrders_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getItemDetailsById: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, id)
        .query(
          " SELECT * FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID"
        );
      // .query('select DISTINCT eitm.EvolveItem_Code, eitm.EvolveItem_ID  from EvolveProdOrders epo, EvolveItem eitm WHERE epo.EvolveItem_ID = eitm.EvolveItem_ID')
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  checkTotalSerialNo: async function (id) {
    try {
      return await Evolve.SqlPool.request()

        .input("EvolveProdOrders_ID", Evolve.Sql.Int, id)
        .query(
          "  SELECT count(EvolveProdOrdersDetail_Serial)  AS COUNT  FROM EvolveProdOrdersDetail WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID"
        );
      // .query('select DISTINCT eitm.EvolveItem_Code, eitm.EvolveItem_ID  from EvolveProdOrders epo, EvolveItem eitm WHERE epo.EvolveItem_ID = eitm.EvolveItem_ID')
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  changeWorkOrderStatus: async function (id, userId) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      // console.log("id is ..... " , id)
      return await Evolve.SqlPool.request()

        .input("EvolveProdOrders_ID", Evolve.Sql.Int, id)
        // .input('EvolveUser_ID', Evolve.Sql.Int, userId)
        .input("EvolveProdOrders_UpdatedUser", Evolve.Sql.Int, userId)
        .input("EvolveProdOrders_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .query(
          "UPDATE EvolveProdOrders SET EvolveProdOrders_Status = 'completed' ,EvolveProdOrders_UpdatedUser=@EvolveProdOrders_UpdatedUser , EvolveProdOrders_UpdatedAt=@EvolveProdOrders_UpdatedAt  Where EvolveProdOrders_ID = @EvolveProdOrders_ID"
        );
      // .query('select DISTINCT eitm.EvolveItem_Code, eitm.EvolveItem_ID  from EvolveProdOrders epo, EvolveItem eitm WHERE epo.EvolveItem_ID = eitm.EvolveItem_ID')
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getItem: async function (search) {
    try {
      let query =
        "SELECT TOP(20) EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE  '%" +
        search +
        "%'";
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getCustCode: async function (search) {
    try {
      let query =
        "SELECT TOP(20) EvolveSupplier_Code as title , EvolveSupplier_ID as id FROM EvolveSupplier WHERE EvolveSupplier_Code LIKE  '%" +
        search +
        "%'";
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getMachine: async function (search) {
    try {
      let query =
        "SELECT TOP(20) EvolveMachine_Name as title , EvolveMachine_ID as id FROM EvolveMachine WHERE EvolveMachine_Name LIKE  '%" +
        search +
        "%'";
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  /** Report Start Here */

  // Production Report
  getProductionReportsCount: async function (data, condition) {
    try {
      let query =
        "select count(epodh.EvolveProdOrdersDetail_Serial) as count from EvolveProdOrdersHistory epodh  inner join EvolveItem ei on epodh.EvolveItem_ID = ei.EvolveItem_ID inner join EvolveProcess ep on epodh.EvolveProdOrderHistory_NextSeq  = ep.EvolveProcess_ID  inner join EvolveMachine em on epodh.EvolveMachine_ID = em.EvolveMachine_ID where EvolveProdOrderHistoryType_Code = 'PRODORD' " +
        condition;
      return await Evolve.SqlPool.request()
        // .input('startDate', Evolve.Sql.NVarChar, startDate)
        // .input('endDate', Evolve.Sql.NVarChar, endDate)
        // .query("select count(epodh.EvolveProdOrdersDetail_Serial) as count from EvolveProdOrdersHistory epodh  inner join EvolveItem ei on epodh.EvolveItem_ID = ei.EvolveItem_ID inner join EvolveProcess ep on epodh.EvolveProdOrderHistory_NextSeq  = ep.EvolveProcess_ID  inner join EvolveMachine em on epodh.EvolveMachine_ID = em.EvolveMachine_ID where EvolveProdOrderHistoryType_Code = 'PRODORD' ");
        .query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getDoStatusReportCount: async function (condition) {
    try {
      let query =
        "SELECT  COUNT(edoh.EvolveDoHistory_ID) as count  FROM EvolveDoHistory edoh inner join EvolveSalesOrder eso on eso.EvolveSalesOrder_Number =  edoh.EvolveSo_Number inner join EvolveSalesOrderLine esol on esol.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID , EvolveItem ei where  edoh.EvolveDoLine_Part = ei.EvolveItem_Code" +
        condition;
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getDoStatusReportDatatableList: async function (start, length, condition) {
    try {
      let query =
        "SELECT edoh.EvolveSo_Number , edoh.EvolveDo_Number , edoh.EvolveDoLine_CustPart ,edoh.EvolveDoLine_DoQty ,edoh.EvolveSoLine_Number ,edoh.EvolveDoLine_Part,eso.EvolveSalesOrder_Billto,(SELECT EvolveSupplier_ID FROM EvolveSupplier es WHERE es.EvolveSupplier_Code =  eso.EvolveSalesOrder_Billto) ,CONVERT (varchar, edoh.EvolveDoHistory_CreatedAt , 3) as EvolveDoHistory_CreatedAt,(SELECT ei.EvolveItem_Desc FROM EvolveItem ei WHERE edoh.EvolveDoLine_Part = ei.EvolveItem_Code) as EvolveItem_Desc,esol.EvolveSalesOrderLine_OrderQty  ,(esol.EvolveSalesOrderLine_OrderQty-edoh.EvolveDoLine_DoQty)as balanceqty ,edoh.EvolveDoLine_Status,edoh.EvolveDoLine_PDIQty ,eso.EvolveSalesOrder_Date FROM EvolveDoHistory edoh inner join EvolveSalesOrder eso on eso.EvolveSalesOrder_Number =  edoh.EvolveSo_Number inner join EvolveSalesOrderLine esol on esol.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID AND edoh.EvolveDoLine_Part = esol.EvolveSalesOrderLine_Part" +
        condition +
        " ORDER BY edoh.EvolveDo_Number desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getProductionReportsDatatableList: async function (start, length, condition) {
    try {
      let query =
        "select epodh.EvolveProdOrdersDetail_Serial, epodh.EvolveItem_Code, epodh.EvolveProdOrdersDetails_Status, ei.EvolveItem_Desc, epodh.EvolveProdOrders_Order, epodh.EvolveProdOrderHistory_UpdatedAt, ep.EvolveProcess_Name  as 'Current Sequence', (select epp.EvolveProcess_Name from EvolveProcess epp , EvolveProcessTempSeq eptss where epodh.EvolveProdOrderHistory_PrvSeq = eptss.EvolveProcessTemp_Seq and eptss.EvolveProcessTemp_ID = epodh.EvolveProcessTemp_ID AND epp.EvolveProcess_ID = eptss.EvolveProcess_ID) as 'Previous Sequence', em.EvolveMachine_Name ,(SELECT CASE WHEN EXISTS  ( SELECT edp.EvolveDOLinePDI_Serial  FROM EvolveDOLinePDI edp WHERE edp.EvolveDOLinePDI_Serial = epodh.EvolveProdOrdersDetail_Serial) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END ) as 'PDI_Status'   from EvolveProdOrdersHistory epodh  inner join EvolveItem ei on epodh.EvolveItem_ID = ei.EvolveItem_ID  INNER JOIN EvolveProcessTempSeq epts on epodh.EvolveProdOrderHistory_NextSeq = epts.EvolveProcessTemp_Seq and epts.EvolveProcessTemp_ID = epodh.EvolveProcessTemp_ID  inner join EvolveProcess ep on ep.EvolveProcess_ID = epts.EvolveProcess_ID  inner join EvolveMachine em on epodh.EvolveMachine_ID = em.EvolveMachine_ID    where EvolveProdOrderHistoryType_Code = 'PRODORD' " +
        condition +
        " ORDER BY epodh.EvolveProdOrdersDetail_Serial desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";

      //  console.log("query is >> " , query)

      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getProductionReportsDatatableListBARGEN: async function (
    start,
    length,
    condition
  ) {
    try {
      let query =
        "select epodh.EvolveProdOrdersDetail_Serial,epodh.EvolveProdOrderHistoryType_Code, epodh.EvolveItem_Code, epodh.EvolveProdOrdersDetails_Status,  ei.EvolveItem_Desc, epodh.EvolveProdOrders_Order, epodh.EvolveProdOrderHistory_UpdatedAt, ep.EvolveProcess_Name   as 'Current Sequence', (select epp.EvolveProcess_Name from EvolveProcess epp where epp.EvolveProcess_ID = epodh.EvolveProdOrderHistory_PrvSeq) as 'Previous Sequence',    em.EvolveMachine_Name ,(SELECT CASE WHEN EXISTS  ( SELECT edp.EvolveDOLinePDI_Serial  FROM EvolveDOLinePDI edp WHERE edp.EvolveDOLinePDI_Serial = epodh.EvolveProdOrdersDetail_Serial) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END ) as 'PDI_Status'  from  EvolveProcess ep , EvolveMachine em  , EvolveProdOrdersHistory epodh  inner join EvolveItem ei on epodh.EvolveItem_ID = ei.EvolveItem_ID  where EvolveProdOrderHistoryType_Code = 'BARGEN'  ";
      // console.log("query report >> ", query);
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getRejectedSrNoCount: async function (data, condition) {
    try {
      let query =
        "SELECT COUNT(ers.EvolveReworkSrNo_ID) as count FROM EvolveReworkSrNo ers " +
        condition;
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getRejectedSrNoDatatableList: async function (start, length, condition) {
    try {
      let query =
        "SELECT ers.* , eu.EvolveUser_Name, ep.EvolveProcess_Name ,ei.EvolveItem_Code ,ept.EvolveProcessTemp_Name FROM EvolveReworkSrNo ers INNER JOIN EvolveUser eu ON eu.EvolveUser_ID = ers.EvolveReworkSrNo_CreatedUser INNER JOIN EvolveProcessTempSeq epts ON  epts.Evolveprocesstemp_seq = ers.EvolveReworkSrNo_Seq INNER JOIN EvolveProcess ep on epts.Evolveprocesstemp_seq = ep.EvolveProcess_ID AND epts.Evolveprocesstemp_id = ers.EvolveProcessTemp_ID INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = ers.EvolveItem_ID INNER JOIN EvolveProcessTemp ept ON ept.EvolveProcessTemp_ID = ers.EvolveProcessTemp_ID " +
        condition +
        " ORDER BY ers.EvolveReworkSrNo_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getCustomerWiseReportCount: async function (condition) {
    try {
      let query =
        "SELECT COUNT(epoh.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersHistory epoh INNER JOIN EvolveItem ei ON ei.EvolveItem_Code LIKE epoh.EvolveItem_Code INNER JOIN EvolvePDIHistory eph ON eph.EvolvePDIHistory_ParaValue LIKE epoh.EvolveProdOrdersDetail_Serial INNER JOIN EvolveDo ed ON ed.EvolveDO_ID = eph.EvolveDO_ID INNER JOIN EvolveSalesOrder eso ON eso.EvolveSalesOrder_Number LIKE ed.EvolveDO_SONumber INNER JOIN EvolveSupplier es ON es.EvolveSupplier_Code LIKE eso.EvolveSalesOrder_Cust INNER JOIN EvolveInvoice eic ON eic.EvolveInvoice_SONumber LIKE eso.EvolveSalesOrder_Number WHERE epoh.EvolveProdOrderHistoryType_Code = 'PRODORD' AND epoh.EvolveProdOrdersDetails_Status = 'Completed'" +
        condition;
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getCustomerWiseReportDatatableList: async function (start, length, condition) {
    try {
      let query =
        "SELECT epoh.EvolveProdOrdersDetail_Serial , epoh.EvolveItem_Code , ei.EvolveItem_Desc , ed.EvolveDO_Number , ed.EvolveDO_SONumber , es.EvolveSupplier_Code , es.EvolveSupplier_Name , es.EvolveSupplier_City , eph.EvolvePDIHistory_CreatedAt , eic.EvolveInvoice_Number , eic.EvolveInvoice_Date FROM EvolveProdOrdersHistory epoh INNER JOIN EvolveItem ei ON ei.EvolveItem_Code LIKE epoh.EvolveItem_Code INNER JOIN EvolvePDIHistory eph ON eph.EvolvePDIHistory_ParaValue LIKE epoh.EvolveProdOrdersDetail_Serial        INNER JOIN EvolveDo ed ON ed.EvolveDO_ID = eph.EvolveDO_ID INNER JOIN EvolveSalesOrder eso ON eso.EvolveSalesOrder_Number LIKE ed.EvolveDO_SONumber INNER JOIN EvolveSupplier es ON es.EvolveSupplier_Code LIKE eso.EvolveSalesOrder_Cust INNER JOIN EvolveInvoice eic ON eic.EvolveInvoice_SONumber LIKE eso.EvolveSalesOrder_Number WHERE epoh.EvolveProdOrderHistoryType_Code = 'PRODORD' AND epoh.EvolveProdOrdersDetails_Status = 'Completed' " +
        condition +
        " ORDER BY epoh.EvolveProdOrdersDetail_Serial DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getProductionHistoryReportsCount: async function (data, condition) {
    try {
      return await Evolve.SqlPool.request().query(
        "select Count(epodh.EvolveProdOrdersDetail_Serial) as count from EvolveProdOrdersHistory epodh  inner join EvolveItem ei on epodh.EvolveItem_ID = ei.EvolveItem_ID inner join EvolveProcess ep on epodh.EvolveProdOrderHistory_NextSeq  = ep.EvolveProcess_ID inner join EvolveMachine em on epodh.EvolveMachine_ID = em.EvolveMachine_ID inner join EvolveProdOrdersHistory  epodhi on epodhi.EvolveProdOrdersDetail_Serial = epodh.EvolveProdOrdersDetail_Serial where epodh.EvolveProdOrderHistoryType_Code = 'PRODORD' AND (epodhi.EvolveProcess_Value = 'Finished' OR  epodhi.EvolveProcess_Value = 'Semi Finished') AND epodh.EvolveProdOrdersDetails_Status = 'Completed' " +
        condition
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getProductionHistoryReportsDatatableList: async function (
    start,
    length,
    condition
  ) {
    try {
      let query =
        "select epodh.EvolveProdOrdersDetail_Serial, epodh.EvolveItem_Code, ei.EvolveItem_Desc, epodh.EvolveProdOrders_Order, epodh.EvolveProdOrderHistory_UpdatedAt, ep.EvolveProcess_Name as 'Current Sequence', (select epp.EvolveProcess_Name from EvolveProcess epp where epp.EvolveProcess_ID = epodh.EvolveProdOrderHistory_PrvSeq) as 'Previous Sequence', epodh.EvolveProdOrdersDetails_Status , em.EvolveMachine_Name , epodhi.EvolveProcess_Value , (SELECT CASE WHEN EXISTS ( SELECT edp.EvolveDOLinePDI_Serial FROM EvolveDOLinePDI edp WHERE edp.EvolveDOLinePDI_Serial = epodh.EvolveProdOrdersDetail_Serial) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END ) as 'PDI_Status'  from EvolveProdOrdersHistory epodh  inner join EvolveItem ei on epodh.EvolveItem_ID = ei.EvolveItem_ID    inner join EvolveProcess ep on epodh.EvolveProdOrderHistory_NextSeq  = ep.EvolveProcess_ID inner join EvolveMachine em on epodh.EvolveMachine_ID = em.EvolveMachine_ID inner join EvolveProdOrdersHistory  epodhi on epodhi.EvolveProdOrdersDetail_Serial = epodh.EvolveProdOrdersDetail_Serial where epodh.EvolveProdOrderHistoryType_Code = 'PRODORD' AND (epodhi.EvolveProcess_Value = 'Finished' OR  epodhi.EvolveProcess_Value = 'Semi Finished') AND epodh.EvolveProdOrdersDetails_Status = 'Completed' " +
        condition +
        " ORDER BY epodh.EvolveProdOrdersDetail_Serial desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getMachineWiseProdReportsCount: async function (data, condition) {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT DISTINCT epoh.EvolveProdOrdersDetail_Serial , ei.EvolveItem_Code, epoh.EvolveProdOrders_Order ,                CONVERT(VARCHAR,ei.EvolveItem_Desc) AS EvolveItem_Desc , em.EvolveMachine_Name , epoh.EvolveProdOrderHistoryType_Code, epoh.EvolveProdOrderHistory_CreatedAt  , epoh.EvolveProdOrdersDetails_Remark , epoh.EvolveProdOrdersDetails_Operator , ep.EvolveProcess_Name , epoh.EvolvePDI_Status FROM EvolveProdOrdersHistory epoh INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = epoh.EvolveItem_ID     INNER JOIN EvolveMachine em ON em.EvolveMachine_ID = epoh.EvolveMachine_ID INNER JOIN EvolveProcess ep ON ep.EvolveProcess_ID = epoh.EvolveProcess_ID WHERE (epoh.EvolveProdOrderHistoryType_Code = 'MFPROCESS' OR epoh.EvolveProdOrderHistoryType_Code = 'SRREJECT')" +
        condition
      );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMachineWiseProdReportsDatatableList: async function (
    start,
    length,
    condition
  ) {
    try {
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "SELECT DISTINCT epoh.EvolveProdOrdersDetail_Serial , ei.EvolveItem_Code, epoh.EvolveProdOrders_Order , CONVERT(VARCHAR,ei.EvolveItem_Desc) AS EvolveItem_Desc , em.EvolveMachine_Name , epoh.EvolveProdOrderHistoryType_Code, epoh.EvolveProdOrderHistory_CreatedAt  , epoh.EvolveProdOrdersDetails_Remark , epoh.EvolveProdOrdersDetails_Operator , ep.EvolveProcess_Name , epoh.EvolvePDI_Status  FROM EvolveProdOrdersHistory epoh INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = epoh.EvolveItem_ID     INNER JOIN EvolveMachine em ON em.EvolveMachine_ID = epoh.EvolveMachine_ID INNER JOIN EvolveProcess ep ON ep.EvolveProcess_ID = epoh.EvolveProcess_ID WHERE (epoh.EvolveProdOrderHistoryType_Code = 'MFPROCESS' OR epoh.EvolveProdOrderHistoryType_Code = 'SRREJECT')" +
          condition +
          "order by epoh.EvolveProdOrdersDetail_Serial desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY "
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getAllItemList: async function (search) {
    try {
      let query =
        "SELECT TOP(20) EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE  '%" +
        search +
        "%'";
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  //reports

  getshiftList: async function (id, start, length) {
    try {
      return await Evolve.SqlPool.request()
        //   .input('EvolveShift_CreatedUser', Evolve.Sql.Int, id)
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "SELECT EvolveShift_ID , EvolveShift_Name from EvolveShift ORDER BY EvolveShift_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getMachineList: async function (id, start, length) {
    try {
      return await Evolve.SqlPool.request()
        //   .input('EvolveShift_CreatedUser', Evolve.Sql.Int, id)
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "  SELECT EvolveMachine_ID , EvolveMachine_Name from EvolveMachine ORDER BY EvolveMachine_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getProcessList: async function (id, start, length) {
    try {
      return await Evolve.SqlPool.request()
        //   .input('EvolveShift_CreatedUser', Evolve.Sql.Int, id)
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "SELECT EvolveProcess_ID , EvolveProcess_Name from EvolveProcess ORDER BY EvolveProcess_ID"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  // getCustCode: async function (id, start, length) {
  //     try {
  //         return await Evolve.SqlPool.request()
  //             //   .input('EvolveShift_CreatedUser', Evolve.Sql.Int, id)
  //             .input('start', Evolve.Sql.Int, start)
  //             .input('length', Evolve.Sql.Int, length)
  //             .query('SELECT EvolveSupplier_ID , EvolveSupplier_Name FROM  EvolveSupplier');
  //     } catch (error) {
  //         Evolve.Log.error(error.message);
  //         return new Error(error.message);
  //     }
  // },

  getCompletedWoCount: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "SELECT (SELECT epo.EvolveProdOrders_Quantity FROM EvolveProdOrders epo WHERE epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID) as order_qty , (SELECT COUNT(epod1.EvolveProdOrdersDetail_Serial)  FROM EvolveProdOrdersDetail epod1 WHERE epod1.EvolveProdOrders_ID = epod.EvolveProdOrders_ID) AS cmp_serial FROM EvolveProdOrdersDetail epod                WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getWoDetails: async function (EvolveProdOrdersDetail_Serial) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
        .query("SELECT epo.EvolveProdOrders_Order,epo.EvolveProdOrders_OrderId,epod.EvolveProdOrdersDetail_Serial,epod.EvolveProdOrdersDetail_Qty,ei.EvolveItem_Code, epo.EvolveProdOrders_Quantity,epob.EvolveProdOrderBom_QtyReq FROM EvolveProdOrders AS epo, EvolveProdOrdersDetail AS epod, EvolveItem AS ei, EvolveProdOrderBom epob WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID");
      // .query("SELECT epo.EvolveProdOrders_Order,epo.EvolveProdOrders_OrderId,epod.EvolveProdOrdersDetail_Serial,epod.EvolveProdOrdersDetail_Qty,ei.EvolveItem_Code FROM EvolveProdOrders AS epo, EvolveProdOrdersDetail AS epod, EvolveItem AS ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  CompleteWO: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "UPDATE EvolveProdOrders SET EvolveProdOrders.EvolveProdOrders_Status = 'Completed' FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail.EvolveProdOrders_ID = EvolveProdOrders.EvolveProdOrders_ID AND EvolveProdOrdersDetail.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getHistoryTrackReport: async function (condition) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      let query =
        "SELECT epoh.EvolveProdOrdersDetail_Serial , epoh.EvolveProdOrders_Order , epoh.EvolveItem_Code , ept.EvolveProcessTemp_Name , em.EvolveMachine_Name , es.EvolveSection_Name , epoh.EvolveProdOrderHistoryType_Code , ep.EvolveProcess_Name , epv.EvolveProcessVal_Desc , epoh.EvolveProcess_Value , epoh.EvolveProdOrderHistory_CreatedAt as start_time, epoh.EvolveProdOrderHistory_UpdatedAt as end_time , epoh.EvolveProdOrdersDetails_Status as prod_status FROM EvolveProdOrdersHistory epoh INNER JOIN EvolveProcessTemp ept ON ept.EvolveProcessTemp_ID = epoh.EvolveProcessTemp_ID INNER JOIN EvolveMachine em ON em.EvolveMachine_ID = epoh.EvolveMachine_ID INNER JOIN EvolveSection es ON es.EvolveSection_ID = em.EvolveSection_ID INNER JOIN EvolveProcess ep ON ep.EvolveProcess_ID = epoh.EvolveProcess_ID INNER JOIN EvolveProcessVal epv ON epv.EvolveProcessVal_ID = epoh.EvolveProcessVal_ID  " +
        condition +
        " ORDER BY epoh.EvolveMachine_ID ASC";
      // console.log('query---', query);
      return await Evolve.SqlPool.request()
        // .input('TodayDate', Evolve.Sql.NVarChar, dataTime)
        .query(query);
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getComponantItemList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
        .query("SELECT epl.EvolvePickList_ID , ei.EvolveItem_Code , ei.EvolveItem_ID FROM EvolveProdOrdersDetail epod , EvolvePickList epl INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = epl.EvolveItem_ID WHERE epod.EvolveProdOrdersDetail_Serial LIKE @EvolveProdOrdersDetail_Serial AND epl.EvolveProdOrders_ID = epod.EvolveProdOrders_ID");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getComponantItem: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .query("SELECT epl.EvolvePickList_ID , epl.EvolvePickList_QtyIss , epl.EvolvePickList_QtyReturn , epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrdersDetail epod , EvolvePickList epl , EvolveItem ei , EvolveProdOrders epo WHERE epod.EvolveProdOrdersDetail_Serial LIKE @EvolveProdOrdersDetail_Serial AND epl.EvolveItem_ID = @EvolveItem_ID AND epl.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epl.EvolveItem_ID AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  addComponentHistory: async function (rejectedItem, data) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_Order", Evolve.Sql.NVarChar, rejectedItem.EvolveProdOrders_Order)
        .input("EvolveItem_Code", Evolve.Sql.NVarChar, rejectedItem.EvolveItem_Code)
        .input("EvolveCompScrap_RejectQty", Evolve.Sql.Int, data.EvolvePickList_QtyReturn)
        .input("EvolveCompScrap_Status", Evolve.Sql.NVarChar, 'Rejected')
        .input("EvolveCompScrap_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveCompScrap_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveCompScrap_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveCompScrap_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .query("INSERT INTO EvolveCompScrap (EvolveProdOrders_Order,EvolveItem_Code,EvolveCompScrap_RejectQty,EvolveCompScrap_Status,EvolveCompScrap_CreatedUser,EvolveCompScrap_UpdatedUser,EvolveCompScrap_UpdatedAt,EvolveCompScrap_CreatedAt) VALUES(@EvolveProdOrders_Order,@EvolveItem_Code,@EvolveCompScrap_RejectQty,@EvolveCompScrap_Status,@EvolveCompScrap_CreatedUser,@EvolveCompScrap_UpdatedUser,@EvolveCompScrap_UpdatedAt,@EvolveCompScrap_CreatedAt) ");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  updateRejectedComponantQty: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolvePickList_ID", Evolve.Sql.Int, data.EvolvePickList_ID)
        .input("EvolvePickList_QtyReturn", Evolve.Sql.Int, data.EvolvePickList_QtyReturn)
        .query("UPDATE EvolvePickList SET EvolvePickList_QtyReturn = EvolvePickList_QtyReturn + @EvolvePickList_QtyReturn WHERE EvolvePickList_ID = @EvolvePickList_ID");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
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
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

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
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
        .query(
          "SELECT * From EvolveSalesOrder WHERE EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND EvolveSalesOrder_Status = 'open'"
        );
      if (EvolveProdOrders.rowsAffected < 1) {
        return new Error("Error In Sales Orders");
      } else {
        let plln = await Evolve.SqlPool.request().query(
          "SELECT TOP 1 EvolvePickList_Number From EvolvePickList ORDER BY EvolvePickList_ID DESC"
        );
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
        let newdate = day + "" + month + "" + year; //28219
        let EvolvePickList_Number = "PL" + newdate + "" + plcount;
        let getSoLines = await Evolve.SqlPool.request()
          .input(
            "EvolveSalesOrder_ID",
            Evolve.Sql.Int,
            data.EvolveSalesOrder_ID
          )
          .query(
            "SELECT esol.EvolveSalesOrderLine_OrderQty , ei.EvolveItem_id FROM EvolveSalesOrderLine esol INNER JOIN EvolveItem ei ON ei.EvolveItem_Code LIKE esol.EvolveSalesOrderLine_Part WHERE esol.EvolveSalesOrder_ID = @EvolveSalesOrder_ID"
          );
        if (getSoLines instanceof Error || getSoLines.rowsAffected < 1) {
          return new Error(getSoLines.message);
        } else {
          for (let i = 0; i < getSoLines.recordset.length; i++) {
            let issue_qty = 0;
            await Evolve.SqlPool.request()
              .input(
                "EvolveSalesOrder_ID",
                Evolve.Sql.Int,
                data.EvolveSalesOrder_ID
              )
              .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
              .input(
                "EvolveItem_ID",
                Evolve.Sql.Int,
                getSoLines.recordset[i].EvolveItem_id
              )
              .input("EvolvePickList_QtyIss", Evolve.Sql.Int, issue_qty)
              .input(
                "EvolvePickList_QtyReq",
                Evolve.Sql.Int,
                getSoLines.recordset[i].EvolveSalesOrderLine_OrderQty
              )
              .input("EvolvePickList_Status", Evolve.Sql.Int, 1)
              .input(
                "EvolvePickList_Number",
                Evolve.Sql.NVarChar,
                EvolvePickList_Number
              )
              .input("EvolvePickList_Type", Evolve.Sql.NVarChar, "SALESORD")
              .input("EvolvePickList_CreatedAt", Evolve.Sql.NVarChar, dataTime)
              .input(
                "EvolvePickList_CreatedUser",
                Evolve.Sql.Int,
                data.EvolveUser_ID
              )
              .input("EvolvePickList_UpdateAt", Evolve.Sql.NVarChar, dataTime)
              .input(
                "EvolvePickList_UpdateUser",
                Evolve.Sql.Int,
                data.EvolveUser_ID
              )
              .query(
                "INSERT INTO EvolvePickList (EvolveSalesOrder_ID,EvolveUser_ID,EvolveItem_ID,EvolvePickList_QtyIss,EvolvePickList_QtyReq,EvolvePickList_Status,EvolvePickList_Number,EvolvePickList_Type,EvolvePickList_CreatedAt,EvolvePickList_CreatedUser,EvolvePickList_UpdateAt,EvolvePickList_UpdateUser) VALUES (@EvolveSalesOrder_ID,@EvolveUser_ID,@EvolveItem_ID,@EvolvePickList_QtyIss,@EvolvePickList_QtyReq,@EvolvePickList_Status,@EvolvePickList_Number,@EvolvePickList_Type,@EvolvePickList_CreatedAt,@EvolvePickList_CreatedUser,@EvolvePickList_UpdateAt,@EvolvePickList_UpdateUser);"
              );
          }
          return getSoLines;
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
  },
  getMillingCompletedTriggers: async function () {
    try {
      return await Evolve.SqlPool.request()
        .query("SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq =1 AND EvolveProdOrdersDetail_NxtSeq=2 AND epod.EvolveProdOrdersDetail_Status ='In Process' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')")
    } catch (error) {
        Evolve.Log.error(error.message);
        return new Error(error.message);
    }
},
getVibrationCompletedTriggers: async function () {
  try {
    return await Evolve.SqlPool.request()
      .query("SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq =2 AND EvolveProdOrdersDetail_NxtSeq=3 AND EvolveProdOrdersDetail_Status ='Completed' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')")
  } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
  }
},

};


// No 
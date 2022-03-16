"use strict";
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
  getProductionPlanListCountList: async function (data) {
    try {
      let dt = data.startDate.split("/");
      let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
      let startDate = sdt.getFullYear() + "-" + (sdt.getMonth() + 1) + "-" + sdt.getDate();
      console.log(startDate);
      dt = data.endDate.split("/");
      let edt = new Date(dt[2], dt[1] - 1, dt[0]);
      let endDate = edt.getFullYear() + "-" + (edt.getMonth() + 1) + "-" + edt.getDate();
      return await Evolve.SqlPool.request()
        .input("startDate", Evolve.Sql.NVarChar, startDate)
        .input("endDate", Evolve.Sql.NVarChar, endDate)
        .query(
          "SELECT COUNT(epp.EvolveProdPlan_ID) AS count from EvolveProdPlan epp WHERE epp.EvolveProdPlan_ProdDate >= @startDate AND epp.EvolveProdPlan_ProdDate <= @endDate"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1800: Error while getting Production Plan List Count List "+error.message);
      return new Error(" EERR1800: Error while getting Production Plan List Count List "+error.message);
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
      if (Evolve.Config.project == "Cooper") {
        return await Evolve.SqlPool.request()
          .input("start", Evolve.Sql.Int, start)
          .input("length", Evolve.Sql.Int, length)
          .input("startDate", Evolve.Sql.NVarChar, startDate)
          .input("endDate", Evolve.Sql.NVarChar, endDate)
          .query(
            "   SELECT epp.EvolveProdPlan_ID,epp.EvolveProdPlan_code,epp.EvolveProdPlan_ProdDate,epp.EvolveProdPlan_Status from EvolveProdPlan epp  WHERE  epp.EvolveProdPlan_ProdDate >= @startDate AND epp.EvolveProdPlan_ProdDate <= @endDate order by epp.EvolveProdPlan_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"
          );
      } else {
        return await Evolve.SqlPool.request()
          .input("start", Evolve.Sql.Int, start)
          .input("length", Evolve.Sql.Int, length)
          .input("startDate", Evolve.Sql.NVarChar, startDate)
          .input("endDate", Evolve.Sql.NVarChar, endDate)
          .query(
            "SELECT epp.EvolveProdPlan_ID,epp.EvolveProdPlan_code,epp.EvolveProdPlan_ProdDate,esh.EvolveShift_Name,es.EvolveSection_Name,epp.EvolveProdPlan_Status from EvolveProdPlan epp , EvolveSection es, EvolveShift esh WHERE epp.EvolveSection_ID = es.EvolveSection_ID AND epp.EvolveShift_ID = esh.EvolveShift_ID AND epp.EvolveProdPlan_ProdDate >= @startDate AND epp.EvolveProdPlan_ProdDate <= @endDate order by epp.EvolveProdPlan_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"
          );
      }
    } catch (error) {
      Evolve.Log.error(" EERR1801: Error while getting Production Plan List Datatable List "+error.message);
      return new Error(" EERR1801: Error while getting Production Plan List Datatable List "+error.message);
    }
  },

  getOperatorList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT EvolveOperator_Name,EvolveOperator_ID,EvolveUser_ID FROM EvolveOperator WHERE EvolveOperator_Status = 1"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1802: Error while getting Operator List "+error.message);
      return new Error(" EERR1802: Error while getting Operator List "+error.message);
    }
  },

  getProdPlanDetails: async function (planid) {
    try {
      if (Evolve.Config.project == "Cooper") {
        return await Evolve.SqlPool.request()
          .input("EvolveProdPlan_ID", Evolve.Sql.Int, planid)
          .query("SELECT eppd.EvolveProdPlanDetail_ID ,ei.EvolveItem_Code , eppd.EvolveProdPlanDetail_PlanQuantity , eppd.EvolveItem_ID,eppd.EvolveProdPlanDetail_ShiftQuantity , eppd.EvolveProdPlanDetail_Status ,  es.EvolveShift_Name ,em.EvolveMachine_Name ,em.EvolveMachine_ID , es.EvolveShift_ID ,eb.EvolveBranch_Code , eppd.EvolveProdPlanDetail_Site , (SELECT epo.EvolveProdOrders_Order   FROM EvolveProdOrders epo   WHERE epo.EvolveProdPlanDetail_ID = eppd.EvolveProdPlanDetail_ID) as work_order ,  (SELECT epo.EvolveProdOrders_Status FROM EvolveProdOrders epo WHERE epo.EvolveProdPlanDetail_ID = eppd.EvolveProdPlanDetail_ID) as work_orderStatus,(SELECT epo.EvolveProdOrders_OrderId FROM EvolveProdOrders epo WHERE epo.EvolveProdPlanDetail_ID = eppd.EvolveProdPlanDetail_ID) as EvolveProdOrders_OrderId FROM EvolveProdPlanDetail eppd , EvolveItem ei , EvolveShift es  , EvolveMachine em   , EvolveBranch eb  WHERE eppd.EvolveProdPlan_ID =@EvolveProdPlan_ID AND ei.EvolveItem_ID = eppd.EvolveItem_ID AND es.EvolveShift_ID = eppd.EvolveShift_ID AND  em.EvolveMachine_ID = eppd.EvolveMachine_ID  AND eb.EvolveBranch_ID=eppd.EvolveProdPlanDetail_Site");
          // .query("SELECT eppd.EvolveProdPlanDetail_ID ,ei.EvolveItem_Code , eppd.EvolveProdPlanDetail_PlanQuantity , eppd.EvolveProdPlanDetail_Status, eppd.EvolveProdPlanDetail_StandardCavity ,eppd.EvolveProdPlanDetail_WorkingCavity , eppd.EvolveProdPlanDetail_Reqd_Heats ,eppd.EvolveProdPlanDetail_ShiftQuantity  , (SELECT epo.EvolveProdOrders_Order FROM EvolveProdOrders epo WHERE epo.EvolveProdPlanDetail_ID = eppd.EvolveProdPlanDetail_ID) as work_order , (SELECT epo.EvolveProdOrders_Status FROM EvolveProdOrders epo WHERE epo.EvolveProdPlanDetail_ID = eppd.EvolveProdPlanDetail_ID) as work_orderStatus FROM EvolveProdPlanDetail eppd , EvolveItem ei WHERE eppd.EvolveProdPlan_ID = @EvolveProdPlan_ID AND ei.EvolveItem_ID = eppd.EvolveItem_ID");
      } else {
        return await Evolve.SqlPool.request()
          .input("EvolveProdPlan_ID", Evolve.Sql.Int, planid)
          // .query("SELECT eppd.EvolveProdPlanDetail_ID ,ei.EvolveItem_Code , eppd.EvolveProdPlanDetail_PlanQuantity , eppd.EvolveProdPlanDetail_Status,eppd.EvolveProdPlanDetail_StandardCavity ,eo.EvolveOperator_Name ,eppd.EvolveProdPlanDetail_WorkingCavity , eppd.EvolveProdPlanDetail_Reqd_Heats , et.EvolveTool_Name , eo.EvolveOperator_ID,(SELECT epo.EvolveProdOrders_Order FROM EvolveProdOrders epo WHERE epo.EvolveProdPlanDetail_ID = eppd.EvolveProdPlanDetail_ID) as work_order , (SELECT epo.EvolveProdOrders_Status FROM EvolveProdOrders epo WHERE epo.EvolveProdPlanDetail_ID = eppd.EvolveProdPlanDetail_ID) as work_orderStatus FROM EvolveProdPlanDetail eppd , EvolveItem ei , EvolveTool et , EvolveOperator eo WHERE eppd.EvolveProdPlan_ID = @EvolveProdPlan_ID AND ei.EvolveItem_ID = eppd.EvolveItem_ID AND et.EvolveTool_ID = eppd.EvolveTool_ID AND eo.EvolveOperator_ID = eppd.EvolveOperator_ID ");
          .query("SELECT eppd.EvolveProdPlanDetail_ID ,ei.EvolveItem_Code , eppd.EvolveProdPlanDetail_PlanQuantity , eppd.EvolveProdPlanDetail_Status, eppd.EvolveProdPlanDetail_StandardCavity ,eppd.EvolveProdPlanDetail_WorkingCavity , eppd.EvolveProdPlanDetail_Reqd_Heats , (SELECT epo.EvolveProdOrders_Order FROM EvolveProdOrders epo WHERE epo.EvolveProdPlanDetail_ID = eppd.EvolveProdPlanDetail_ID) as work_order , (SELECT epo.EvolveProdOrders_Status FROM EvolveProdOrders epo WHERE epo.EvolveProdPlanDetail_ID = eppd.EvolveProdPlanDetail_ID) as work_orderStatus FROM EvolveProdPlanDetail eppd , EvolveItem ei WHERE eppd.EvolveProdPlan_ID = @EvolveProdPlan_ID AND ei.EvolveItem_ID = eppd.EvolveItem_ID");
      }
    } catch (error) {
      Evolve.Log.error("getProdPlanDetails >>" + " EERR1803: Error while getting Prod Plan Details "+error.message);
      return new Error(" EERR1803: Error while getting Prod Plan Details "+error.message);
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
      Evolve.Log.error(" EERR1804: Error while checking plan Code "+error.message);
      return new Error(" EERR1804: Error while checking plan Code "+error.message);
    }
  },

  check_machine: async function (Machine_Code) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMachine_Name", Evolve.Sql.NVarChar, Machine_Code)
        .query(
          "SELECT COUNT(EvolveMachine_ID) as count FROM EvolveMachine WHERE EvolveMachine_Name LIKE @EvolveMachine_Name"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1805: Error while checking machine "+error.message);
      return new Error(" EERR1805: Error while checking machine "+error.message);
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
      Evolve.Log.error(" EERR1806: Error while checking shift "+error.message);
      return new Error(" EERR1806: Error while checking shift "+error.message);
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
      Evolve.Log.error(" EERR1807: Error while checking item "+error.message);
      return new Error(" EERR1807: Error while checking item "+error.message);
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
      Evolve.Log.error(" EERR1808: Error while checking bom "+error.message);
      return new Error(" EERR1808: Error while checking bom "+error.message);
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
      Evolve.Log.error(" EERR1809: Error while checking section "+error.message);
      return new Error(" EERR1809: Error while checking section "+error.message);
    }
  },

  // save plan details
  savePlanDetails: async function (data, EvolveProdPlan_ID, EvolveUser_ID) {
    try {
      let d = new Date();
      let n = d.getFullYear();
      n = n + "";
      data.close_date = data.close_date + "";
      data.close_date = [data.close_date.slice(0, 6), n].join("");
      let dateParts = data.close_date.split("-");
      data.close_date = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

      data.plan_date = data.plan_date + "";
      data.plan_date = [data.plan_date.slice(0, 6), n].join("");
      dateParts = data.plan_date.split("-");
      data.plan_date = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

      let date = new Date();
      var dataTime = date.getFullYear()+"-"+('0' + (date.getMonth() + 1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2)+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
      // console.log("dataTime :",dataTime);      
      if (Evolve.Config.project == "Cooper") {
        let Item = await Evolve.SqlPool.request()
          .input("EvolveItem_Code", Evolve.Sql.NVarChar, data.Item_Code)
          .query("SELECT * FROM EvolveItem WHERE EvolveItem_Code =@EvolveItem_Code");
        if (Item instanceof Error || Item.rowsAffected < 1) {
          return new Error("No Item Found!");
        } else {
          let getShiftID = await Evolve.SqlPool.request()
            .input("EvolveShift_Name", Evolve.Sql.NVarChar, data.Plan_Shift)
            .query("SELECT * FROM EvolveShift WHERE EvolveShift_Name =@EvolveShift_Name");
          if (getShiftID instanceof Error || getShiftID.rowsAffected < 1) {
            return new Error("No Shit Found!");
          } else {
            let machineId = await Evolve.SqlPool.request()
              .input("EvolveMachine_Name",Evolve.Sql.NVarChar,data.Machine_Code)
              .query("SELECT * FROM EvolveMachine WHERE EvolveMachine_Name LIKE @EvolveMachine_Name");
            if (machineId instanceof Error || machineId.rowsAffected < 1) {
              return new Error("No Machine Found!");
            } else {
              let getSiteId = await Evolve.SqlPool.request()
                .input("EvolveBranch_Code", Evolve.Sql.NVarChar, data.Site)
                .query("SELECT * FROM EvolveBranch WHERE EvolveBranch_Code LIKE @EvolveBranch_Code");
              if (getSiteId instanceof Error || getSiteId.rowsAffected < 1) {
                return new Error("No Site Found!");
              }
              else {
                let getSectionId = await Evolve.SqlPool.request()
                  .input("EvolveSection_Name", Evolve.Sql.NVarChar, data.Plan_Section)
                  .query("SELECT * FROM EvolveSection WHERE EvolveSection_Name LIKE @EvolveSection_Name");
                if (getSectionId instanceof Error || getSectionId.rowsAffected < 1) {
                  return new Error("No Site Found!");
                }
                else {
                  return await Evolve.SqlPool.request()
                    .input("EvolveProdPlan_ID", Evolve.Sql.Int, EvolveProdPlan_ID)
                    .input("EvolveItem_ID",Evolve.Sql.Int,Item.recordset[0].EvolveItem_ID)
                    .input("EvolveMachine_ID",Evolve.Sql.Int,machineId.recordset[0].EvolveMachine_ID                    )
                    .input(
                      "EvolveProdPlanDetail_Site",
                      Evolve.Sql.Int,
                      getSiteId.recordset[0].EvolveBranch_ID
                    )
                    .input(
                      "EvolveSection_ID",
                      Evolve.Sql.Int,
                      getSectionId.recordset[0].EvolveSection_ID
                    )

                    .input(
                      "EvolveShift_ID",
                      Evolve.Sql.Int,
                      getShiftID.recordset[0].EvolveShift_ID
                    )
                    .input(
                      "EvolveProdPlanDetail_OrderDate",
                      Evolve.Sql.NVarChar,
                      data.plan_date
                    )
                    .input(
                      "EvolveProdPlanDetail_CloseDate",
                      Evolve.Sql.NVarChar,
                      data.close_date
                    )
                    .input(
                      "EvolveProdPlanDetail_PlanQuantity",
                      Evolve.Sql.Int,
                      data.Qty_Planned
                    )
                    .input(
                      "EvolveProdPlanDetail_Status",
                      Evolve.Sql.NVarChar,
                      "OPEN"
                    )
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
                    .input(
                      "EvolveProdPlanDetail_ShiftQuantity",
                      Evolve.Sql.Int,
                      data.Qty_Shift
                    )
                    .query(
                      "INSERT INTO EvolveProdPlanDetail(EvolveShift_ID,EvolveMachine_ID ,EvolveProdPlanDetail_Site,EvolveProdPlan_ID,EvolveItem_ID,EvolveProdPlanDetail_PlanQuantity,EvolveProdPlanDetail_Status,EvolveProdPlanDetail_CreatedAt,EvolveProdPlanDetail_CreatedUser,EvolveProdPlanDetail_UpdatedAt,EvolveProdPlanDetail_UpdatedUser,EvolveProdPlanDetail_ShiftQuantity,EvolveProdPlanDetail_OrderDate,EvolveProdPlanDetail_CloseDate,EvolveSection_ID) VALUES(@EvolveShift_ID,@EvolveMachine_ID,@EvolveProdPlanDetail_Site,@EvolveProdPlan_ID,@EvolveItem_ID,@EvolveProdPlanDetail_PlanQuantity,@EvolveProdPlanDetail_Status,@EvolveProdPlanDetail_CreatedAt,@EvolveProdPlanDetail_CreatedUser,@EvolveProdPlanDetail_UpdatedAt,@EvolveProdPlanDetail_UpdatedUser,@EvolveProdPlanDetail_ShiftQuantity,@EvolveProdPlanDetail_OrderDate,@EvolveProdPlanDetail_CloseDate,@EvolveSection_ID)"
                    );
                }
              }
            }
          }
        }
      } else {
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
      }
    } catch (error) {
      Evolve.Log.error(" EERR1810: Error while saving Plan Details "+error.message);
      return new Error(" EERR1810: Error while saving Plan Details "+error.message);
    }
  },

  //publish plan

  publishPlan: async function (data) {
    try {
      if (Evolve.Config.project == "Cooper") {
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
            "SELECT TOP 1 * From EvolveProdOrders WHERE  CONVERT(VARCHAR(10), EvolveProdOrders_CreatedAt , 111) = CONVERT(VARCHAR(10), getdate(), 111)  ORDER BY EvolveProdOrders_ID DESC"
          );

          if (check_wo.rowsAffected > 0) {
            var last_wo = check_wo.recordset[0].EvolveProdOrders_Order; //WO282190001

            if (last_wo.indexOf(newdate) > -1) {
              let WorkOrderNO;
              let WorkOrderId;
              if (
                check_wo.recordset[0].EvolveItem_ID !=
                planDetail_detail.EvolveItem_ID
              ) {
                WorkOrderNO = parseInt(last_wo.substr(-4)) + 1; //0002 => 2

                let tmp = "" + WorkOrderNO;

                wocount = pad.substring(0, pad.length - tmp.length) + tmp;
                WorkOrderNO = "WO" + newdate + "" + wocount;

                WorkOrderId = newdate + "" + wocount + "_1";
              } else {
                WorkOrderNO = check_wo.recordset[0].EvolveProdOrders_Order;
                let lastId = check_wo.recordset[0].EvolveProdOrders_OrderId;
                lastId = lastId.charAt(lastId.length - 1);
                let res = check_wo.recordset[0].EvolveProdOrders_OrderId.substring(
                  0,
                  9
                );
                WorkOrderId = res + "_" + (parseInt(lastId) + 1);
              }

              let wo_ins = await Evolve.SqlPool.request()
                .input(
                  "EvolveProdOrders_OrderId",
                  Evolve.Sql.NVarChar,
                  WorkOrderId
                )
                .input(
                  "EvolveProdOrders_Order",
                  Evolve.Sql.NVarChar,
                  WorkOrderNO
                )
                .input(
                  "EvolveItem_ID",
                  Evolve.Sql.Int,
                  planDetail_detail.EvolveItem_ID
                )
                .input(
                  "EvolveMachine_ID",
                  Evolve.Sql.Int,
                  planDetail_detail.EvolveMachine_ID
                )
                .input(
                  "EvolveSection_ID",
                  Evolve.Sql.Int,
                  planDetail_detail.EvolveSection_ID
                )
                .input(
                  "EvolveShift_ID",
                  Evolve.Sql.Int,
                  planDetail_detail.EvolveShift_ID
                )

                .input(
                  "EvolveProdOrders_IsBom",
                  Evolve.Sql.NVarChar,
                  'true'
                )
                .input("EvolveProdOrders_Status", Evolve.Sql.NVarChar, "OPEN")
                .input(
                  "EvolveProdOrders_Quantity",
                  Evolve.Sql.Int,
                  planDetail_detail.EvolveProdPlanDetail_ShiftQuantity
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
                  "INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveMachine_ID ,EvolveShift_ID ,EvolveProdOrders_IsBom , EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID,EvolveSection_ID) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveMachine_ID,@EvolveShift_ID ,@EvolveProdOrders_IsBom ,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID,@EvolveSection_ID);select @@IDENTITY AS 'inserted_id'"
                );

              if (wo_ins instanceof Error || wo_ins.rowsAffected < 1) {
                return new Error("Error In Create Wo");
              }

              let planDetails_update = await Evolve.SqlPool.request()
                .input(
                  "EvolveProdPlanDetail_ID",
                  Evolve.Sql.Int,
                  planDetail_detail.EvolveProdPlanDetail_ID
                )
                .input(
                  "EvolveProdPlanDetail_Status",
                  Evolve.Sql.NVarChar,
                  "PUBLISHED"
                )

                .query(
                  "UPDATE EvolveProdPlanDetail SET EvolveProdPlanDetail_Status = @EvolveProdPlanDetail_Status WHERE EvolveProdPlanDetail_ID=@EvolveProdPlanDetail_ID"
                );

              if (
                planDetails_update instanceof Error ||
                planDetails_update.rowsAffected < 1
              ) {
                return new Error("Error In Plan details Update");
              }
            }
          } else {
            let wo_ins = await Evolve.SqlPool.request()
              .input(
                "EvolveProdOrders_OrderId",
                Evolve.Sql.NVarChar,
                newdate + "" + wocount + "_1"
              )
              .input("EvolveProdOrders_Order", Evolve.Sql.NVarChar, wo_nbr)
              .input(
                "EvolveItem_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveItem_ID
              )

              .input(
                "EvolveMachine_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveMachine_ID
              )
              .input(
                "EvolveShift_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveShift_ID
              )
              .input(
                "EvolveSection_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveSection_ID
              )

              .input(
                "EvolveProdOrders_IsBom",
                Evolve.Sql.NVarChar,
                'true'
              )
              .input("EvolveProdOrders_Status", Evolve.Sql.NVarChar, "OPEN")
              .input(
                "EvolveProdOrders_Quantity",
                Evolve.Sql.Int,
                planDetail_detail.EvolveProdPlanDetail_ShiftQuantity
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
                "INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveMachine_ID,EvolveShift_ID ,EvolveProdOrders_IsBom,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID,EvolveSection_ID) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveMachine_ID,@EvolveShift_ID,@EvolveProdOrders_IsBom,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID,@EvolveSection_ID);select @@IDENTITY AS 'inserted_id'"
              );
            if (wo_ins instanceof Error || wo_ins.rowsAffected < 1) {
              return new Error("Error In Create Wo");
            }

            let planDetials_update = await Evolve.SqlPool.request()
              .input(
                "EvolveProdPlanDetail_ID",
                Evolve.Sql.Int,
                planDetail_detail.EvolveProdPlanDetail_ID
              )
              .input(
                "EvolveProdPlanDetail_Status",
                Evolve.Sql.NVarChar,
                "PUBLISHED"
              )

              .query(
                "UPDATE EvolveProdPlanDetail SET EvolveProdPlanDetail_Status = @EvolveProdPlanDetail_Status  WHERE EvolveProdPlanDetail_ID=@EvolveProdPlanDetail_ID"
              );

            if (planDetials_update instanceof Error || planDetials_update.rowsAffected < 1) {
              return new Error("Error in plan details update");
            }
          }
        }

        let plan_update = await Evolve.SqlPool.request()
          .input(
            "EvolveProdPlan_ID",
            Evolve.Sql.Int,
            data.EvolveProdPlan_ID
          )
          .input(
            "EvolveProdPlan_Status",
            Evolve.Sql.NVarChar,
            "PUBLISHED"
          )

          .query(
            "UPDATE EvolveProdPlan SET EvolveProdPlan_Status = @EvolveProdPlan_Status WHERE EvolveProdPlan_ID=@EvolveProdPlan_ID"
          );

        if (
          plan_update instanceof Error ||
          plan_update.rowsAffected < 1
        ) {
          return new Error("Error In Plan Update");
        }


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
                  "PUBLISHED"
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
                  "PUBLISHED"
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
                "PUBLISHED"
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
      }
    } catch (error) {
      Evolve.Log.error(" EERR1811: Error while publish Plan "+error.message);
      return new Error(" EERR1811: Error while publish Plan "+error.message);
    }
  },

  savePlan: async function (data, EvolveUser_ID, fileName) {
    try {
      console.log('save plan called');
      let dataTime = new Date();
      dataTime = dataTime.getFullYear()+"-"+('0' + (dataTime.getMonth() + 1)).slice(-2)+"-"+('0' + dataTime.getDate()).slice(-2)+' '+('0' + dataTime.getHours()).slice(-2)+':'+('0' + dataTime.getMinutes()).slice(-2)+':'+('0' + dataTime.getSeconds()).slice(-2);
      
      if (Evolve.Config.project == "Cooper") {
        let d = new Date();
        let n = d.getFullYear();
        n = n + "";
        data.plan_date = data.plan_date + "";

        data.plan_date = [data.plan_date.slice(0, 6), n].join("");
        let dateParts = data.plan_date.split("-");
        let date = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
        console.log("dataTime :",dataTime);
        return await Evolve.SqlPool.request()
          .input("EvolveProdPlan_ProdDate", Evolve.Sql.NVarChar, date)
          .input("EvolveProdPlan_Status", Evolve.Sql.NVarChar, "OPEN")
          .input("EvolveProdPlan_Code", Evolve.Sql.NVarChar, 'P' + data.plancode)
          .input("EvolveProdPlan_FileName", Evolve.Sql.NVarChar, fileName + "")
          .input("EvolveProdPlan_CreatedAt", Evolve.Sql.NVarChar, null)
          .input("EvolveProdPlan_CreatedUser", Evolve.Sql.Int, EvolveUser_ID)
          .input("EvolveProdPlan_UpdatedAt", Evolve.Sql.NVarChar, null)
          .input("EvolveProdPlan_UpdatedUser", Evolve.Sql.Int, EvolveUser_ID)
          .query("INSERT INTO EvolveProdPlan(EvolveProdPlan_ProdDate,EvolveProdPlan_CreatedUser,EvolveProdPlan_CreatedAt,EvolveProdPlan_Status,EvolveProdPlan_Code,EvolveProdPlan_FileName) VALUES(@EvolveProdPlan_ProdDate,@EvolveProdPlan_CreatedUser,@EvolveProdPlan_CreatedAt,@EvolveProdPlan_Status,@EvolveProdPlan_Code,@EvolveProdPlan_FileName);select @@IDENTITY AS 'inserted_id'");
      } else {
        // DD-MM-YY convert to YYYY-MM-DD
        let dateParts = data.Date.split(".");
        let date = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

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
      }
    } catch (error) {
      Evolve.Log.error(" EERR1812: Error while saving Plan "+error.message);
      return new Error(" EERR1812: Error while saving Plan "+error.message);
    }
  },

  getMachineList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT * FROM EvolveMachine"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1813: Error while getting Machine List "+error.message);
      return new Error(" EERR1813: Error while getting Machine List "+error.message);
    }
  },

  getShiftList: async function () {
    try {
      return await Evolve.SqlPool.request().query("SELECT * FROM EvolveShift");
    } catch (error) {
      Evolve.Log.error(" EERR1814: Error while getting Shift List "+error.message);
      return new Error(" EERR1814: Error while getting Shift List "+error.message);
    }
  },

  getItemList: async function () {
    try {
      return await Evolve.SqlPool.request().query("SELECT * FROM EvolveItem");
    } catch (error) {
      Evolve.Log.error(" EERR1815: Error while getting Item List "+error.message);
      return new Error(" EERR1815: Error while getting Item List "+error.message);
    }
  },

  getLastProdPlanCode: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT TOP(1) EvolveProdPlan_Code FROM  EvolveProdPlan ORDER BY EvolveProdPlan_ID desc"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1816: Error while getting Last Prod Plan Code "+error.message);
      return new Error(" EERR1816: Error while getting Last Prod Plan Code "+error.message);
    }
  },

  addProdPlan: async function (data) {
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
          "EvolveProdPlan_ProdDate",
          Evolve.Sql.NVarChar,
          data.EvolveProdPlan_ProdDate
        )
        .input(
          "EvolveProdPlan_Code",
          Evolve.Sql.NVarChar,
          data.EvolveProdPlan_Code
        )
        .input("EvolveProdPlan_Status", Evolve.Sql.NVarChar, "OPEN")
        .input("EvolveProdPlan_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveProdPlan_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .query(
          "INSERT INTO EvolveProdPlan (EvolveProdPlan_ProdDate , EvolveProdPlan_Code , EvolveProdPlan_Status ,EvolveProdPlan_CreatedUser , EvolveProdPlan_CreatedAt) VALUES (@EvolveProdPlan_ProdDate , @EvolveProdPlan_Code , @EvolveProdPlan_Status , @EvolveProdPlan_CreatedUser , @EvolveProdPlan_CreatedAt);select @@IDENTITY AS 'inserted_id'"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1817: Error while adding Prod Plan "+error.message);
      return new Error(" EERR1817: Error while adding Prod Plan "+error.message);
    }
  },

  addProdPlanDetail: async function (data) {
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
        .input("EvolveProdPlan_ID", Evolve.Sql.Int, data.EvolveProdPlan_ID)
        .input("EvolveMachine_ID", Evolve.Sql.Int, data.EvolveMachine_ID)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .input("EvolveShift_ID", Evolve.Sql.Int, data.EvolveShift_ID)
        .input("EvolveProdPlanDetail_Site",Evolve.Sql.Int,data.EvolveProdPlanDetail_Site)
        .input("EvolveProdPlanDetail_PlanQuantity",Evolve.Sql.NVarChar,data.EvolveProdPlanDetail_PlanQuantity)
        .input("EvolveProdPlanDetail_ShiftQuantity", Evolve.Sql.NVarChar, data.EvolveProdPlanDetail_ShiftQuantity)
        .input("EvolveProdPlanDetail_OrderDate",Evolve.Sql.NVarChar,data.EvolveProdPlanDetail_OrderDate)
        .input("EvolveProdPlanDetail_CloseDate",Evolve.Sql.NVarChar,data.EvolveProdPlanDetail_CloseDate)
        .input("EvolveProdPlanDetail_Status", Evolve.Sql.NVarChar, "OPEN")
        .input("EvolveProdPlanDetail_CreatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
        .input("EvolveProdPlanDetail_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveProdPlanDetail_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
        .input("EvolveProdPlanDetail_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .query("INSERT INTO EvolveProdPlanDetail (EvolveProdPlan_ID , EvolveMachine_ID,EvolveItem_ID,EvolveShift_ID,EvolveProdPlanDetail_Site,EvolveProdPlanDetail_PlanQuantity,EvolveProdPlanDetail_ShiftQuantity,EvolveProdPlanDetail_OrderDate,EvolveProdPlanDetail_CloseDate,EvolveProdPlanDetail_Status,EvolveProdPlanDetail_CreatedUser,EvolveProdPlanDetail_CreatedAt,EvolveProdPlanDetail_UpdatedUser,EvolveProdPlanDetail_UpdatedAt) VALUES (@EvolveProdPlan_ID,@EvolveMachine_ID,@EvolveItem_ID,@EvolveShift_ID,@EvolveProdPlanDetail_Site,@EvolveProdPlanDetail_PlanQuantity,@EvolveProdPlanDetail_ShiftQuantity,@EvolveProdPlanDetail_OrderDate,@EvolveProdPlanDetail_CloseDate,@EvolveProdPlanDetail_Status,@EvolveProdPlanDetail_CreatedUser,@EvolveProdPlanDetail_CreatedAt,@EvolveProdPlanDetail_UpdatedUser,@EvolveProdPlanDetail_UpdatedAt);");
    } catch (error) {
      Evolve.Log.error(" EERR1818: Error while adding Prod Plan Detail "+error.message);
      return new Error(" EERR1818: Error while adding Prod Plan Detail "+error.message);
    }
  },

  checkSiteCode: async function (site_code) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveBranch_Code", Evolve.Sql.NVarChar, site_code)
        .query("SELECT COUNT(EvolveBranch_ID) as count FROM EvolveBranch WHERE EvolveBranch_Code LIKE @EvolveBranch_Code");
    } catch (error) {
      Evolve.Log.error(" EERR1819: Error while checking Site Code "+error.message);
      return new Error(" EERR1819: Error while checking Site Code "+error.message);
    }
  },


  updatePlanDetails: async function (data) {
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

        .input(
          "EvolveProdPlanDetail_ID",
          Evolve.Sql.Int,
          data.EvolveProdPlanDetail_ID
        )
        .input(
          "EvolveSection_ID",
          Evolve.Sql.Int,
          data.EvolveSection_ID
        )
        .input(
          "EvolveItem_ID",
          Evolve.Sql.Int,
          data.EvolveItem_ID
        )
        .input(
          "EvolveMachine_ID",
          Evolve.Sql.Int,
          data.EvolveMachine_ID
        )


        .input(
          "EvolveShift_ID",
          Evolve.Sql.Int,
          data.EvolveShift_ID
        )

        .input(
          "EvolveProdPlanDetail_PlanQuantity",
          Evolve.Sql.Int,
          data.EvolveProdPlanDetail_PlanQuantity
        )
        .input(
          "EvolveProdPlanDetail_ShiftQuantity",
          Evolve.Sql.Int,
          data.EvolveProdPlanDetail_ShiftQuantity
        )


        .input(
          "EvolveProdPlanDetail_UpdatedAt",
          Evolve.Sql.NVarChar,
          dataTime
        )

        .input(
          "EvolveProdPlanDetail_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )

        .query("UPDATE EvolveProdPlanDetail SET EvolveSection_ID=@EvolveSection_ID ,EvolveItem_ID=@EvolveItem_ID , EvolveMachine_ID=@EvolveMachine_ID , EvolveShift_ID=@EvolveShift_ID , EvolveProdPlanDetail_PlanQuantity=@EvolveProdPlanDetail_PlanQuantity ,EvolveProdPlanDetail_ShiftQuantity = @EvolveProdPlanDetail_ShiftQuantity  , EvolveProdPlanDetail_UpdatedAt=@EvolveProdPlanDetail_UpdatedAt ,EvolveProdPlanDetail_UpdatedUser =@EvolveProdPlanDetail_UpdatedUser WHERE EvolveProdPlanDetail_ID=@EvolveProdPlanDetail_ID   ");

    } catch (error) {
      Evolve.Log.error(" EERR1820: Error while updating Plan Details "+error.message);
      return new Error(" EERR1820: Error while updating Plan Details "+error.message);
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
      Evolve.Log.error(" EERR1821: Error while deleting Plan "+error.message);
      return new Error(" EERR1821: Error while deleting Plan "+error.message);
    }
  },

  checkSectionCode: async function (site_code) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSection_Name", Evolve.Sql.NVarChar, site_code)
        .query(
          "SELECT COUNT(EvolveSection_ID) as count FROM EvolveSection WHERE EvolveSection_Name LIKE @EvolveSection_Name"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1822: Error while checking Section Code "+error.message);
      return new Error(" EERR1822: Error while checking Section Code "+error.message);
    }
  },
  getSectionList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT * FROM EvolveSection"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1823: Error while getting Section List "+error.message);
      return new Error(" EERR1823: Error while getting Section List "+error.message);
    }
  },




};

'use strict';
// const { func } = require('edge-js');
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  checkAllowCreatWo: async function (EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query("SELECT eu.EvolveUser_CreatePoAllow  , eu.EvolveUser_PrintAllow , em.EvolveMachine_IotEnabled FROM EvolveUser eu , EvolveMachineAssign emu , EvolveMachine em WHERE eu.EvolveUser_ID = @EvolveUser_ID AND eu.EvolveUser_ID = emu.EvolveUser_ID AND em.EvolveMachine_ID = emu.EvolveMachine_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1699: Error while checking Allow Create Wo "+error.message);
      return new Error(" EERR1699: Error while checking Allow Create Wo "+error.message);
    }
  },

  getMFProcessValidations: async function (data) {
    try {
      // console.log("data :;", data)
      /*SELECT epod.EvolveProdOrders_ID , epo.EvolveProdOrders_Order , epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_Serial ,epod.EvolveProdOrdersDetail_NxtSeq, epo.EvolveItem_ID , ei.EvolveItem_Code, ei.EvolveProcessTemp_Id,epts.EvolveProcessTemp_Seq,epts.EvolveProcess_ID,epv.* 
                  SELECT epoh.EvolveProcess_Value  FROM  EvolveProdOrdersHistory epoh WHERE epoh.EvolveProdOrderDetails_ID = epod.EvolveProdOrdersDetail_ID AND epoh.EvolveProcessVal_ID = epv.EvolveProcessVal_ID ) as old_value
                  FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei
                  ,EvolveProcessTempSeq epts, evolveprocessval epv, EvolveMachineAssign ptom  , EvolveMachineAssign ama
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
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .query(
          "SELECT epod.EvolveProdOrders_ID , epo.EvolveProdOrders_Order , epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_Serial ,epod.EvolveProdOrdersDetail_NxtSeq  , epo.EvolveItem_ID , ei.EvolveItem_Code, ei.EvolveProcessTemp_Id,epts.EvolveProcessTemp_Seq,epts.EvolveProcess_ID, epv.EvolveProcessVal_ID , epv.EvolveProcessVal_Seq , epv.EvolveProcessVal_Desc , epv.EvolveProcessVal_Type , epv.EvolveProcessVal_Value , epv.EvolveProcessVal_Required , epv.EvolveProcessVal_Compare_Type , epv.EvolveProcessVal_Compare_Value , epv.EvolveProcessVal_Auto , ama.EvolveMachine_ID , ( SELECT epoh.EvolveProcess_Value  FROM  EvolveProdOrdersHistory epoh WHERE epoh.EvolveProdOrderDetails_ID = epod.EvolveProdOrdersDetail_ID AND epoh.EvolveProcessVal_ID = epv.EvolveProcessVal_ID ) as old_value FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei, EvolveProcessTempSeq epts, evolveprocessval epv, EvolveMachineAssign ptom  , EvolveMachineAssign ama WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND epts.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id AND epts.EvolveProcessTemp_Seq = epod.EvolveProdOrdersDetail_NxtSeq AND epv.EvolveProcess_ID = epts.EvolveProcess_ID AND epod.EvolveProdOrdersDetail_Status = 'In Process' AND ama.EvolveUser_ID = @EvolveUser_ID AND ptom.EvolveProcess_id = epv.EvolveProcess_ID AND ptom.EvolveMachine_ID = ama.EvolveMachine_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1700: Error while getting MF Process Validations "+error.message);
      return new Error(" EERR1700: Error while getting MF Process Validations "+error.message);
    }
  },

  getMFSerialList: async function (data) {
    try {
      /*SELECT DISTINCT ema.EvolveMachine_ID, em.EvolveMachine_Name, eptm.EvolveProcess_id, epts.EvolveProcessTemp_ID, ei.EvolveItem_ID,ei.EvolveItem_Code, 
                  epo.EvolveProdOrders_ID,epo.EvolveProdOrders_CreatedAt , epod.EvolveProdOrdersDetail_Serial, epod.EvolveProdOrdersDetail_NxtSeq,epo.EvolveProdOrders_Order,ep.EvolveProcess_Name , epts.EvolveProcessTemp_Seq 
                  FROM EvolveMachineAssign ema LEFT JOIN EvolveUser eu ON ema.EvolveUser_ID = eu.EvolveUser_ID 
                  LEFT JOIN EvolveMachine em ON ema.EvolveMachine_ID = em.EvolveMachine_ID 
                  LEFT JOIN EvolveMachineAssign eptm ON em.EvolveMachine_ID = eptm.EvolveMachine_id 
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
          "SELECT DISTINCT ei.EvolveItem_Code , epod.EvolveProdOrdersDetail_Serial ,  ep.EvolveProcess_Name , epts.EvolveProcessTemp_Seq , epo.EvolveProdOrders_OrderId FROM EvolveMachineAssign ema LEFT JOIN EvolveUser eu ON ema.EvolveUser_ID = eu.EvolveUser_ID LEFT JOIN EvolveMachine em ON ema.EvolveMachine_ID = em.EvolveMachine_ID LEFT JOIN EvolveMachineAssign eptm ON em.EvolveMachine_ID = eptm.EvolveMachine_id           LEFT JOIN EvolveProcessTempSeq epts ON eptm.EvolveProcess_id = epts.EvolveProcess_ID LEFT JOIN EvolveItem ei ON epts.EvolveProcessTemp_Id  = ei.EvolveProcessTemp_Id LEFT JOIN EvolveProdOrders epo ON ei.EvolveItem_ID= epo.EvolveItem_ID LEFT JOIN EvolveProdOrdersDetail epod ON epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID LEFT JOIN EvolveProcess ep ON eptm.EvolveProcess_id = ep.EvolveProcess_ID WHERE eu.EvolveUser_ID = @EvolveUser_ID AND epts.EvolveProcessTempSeq_ID <> 0 AND epo.EvolveProdOrders_ID IS NOT NULL AND epod.EvolveProdOrdersDetail_Serial IS NOT NULL AND epod.EvolveProdOrdersDetail_NxtSeq > 0 AND epts.EvolveProcessTemp_Seq = epod.EvolveProdOrdersDetail_NxtSeq AND epod.EvolveProdOrdersDetail_Status = 'In Process' AND em.EvolveMachine_Status = 1 ORDER BY epod.EvolveProdOrdersDetail_Serial ASC"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1701: Error while getting MF Serial List "+error.message);
      return new Error(" EERR1701: Error while getting MF Serial List "+error.message);
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
      Evolve.Log.error(" EERR1702: Error while getting MF Barcode Details "+error.message);
      return new Error(" EERR1702: Error while getting MF Barcode Details "+error.message);
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
      Evolve.Log.error(" EERR1703: Error while printing Mf Process Details "+error.message);
      return new Error(" EERR1703: Error while printing Mf Process Details "+error.message);
    }
  },

  printRejectionDetails: async function (EvolveProdOrdersDetail_Serial) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial",Evolve.Sql.NVarChar,EvolveProdOrdersDetail_Serial)
        .query("SELECT ersn.EvolveReworkSrNo_Serial  ,eu.EvolveUser_Name  FROM EvolveReworkSrNo ersn , EvolveUser eu WHERE ersn.EvolveProdOrdersDetail_Serial=@EvolveProdOrdersDetail_Serial AND ersn.EvolveReworkSrNo_CreatedUser = eu.EvolveUser_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1704: Error while printing Rejection Details "+error.message);
      return new Error(" EERR1704: Error while printing Rejection Details "+error.message);
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
      Evolve.Log.error(" EERR1705: Error while getting Nxt Process Seq "+error.message);
      return new Error(" EERR1705: Error while getting Nxt Process Seq "+error.message);
    }
  },

  getMachineId: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMachine_ID", Evolve.Sql.Int, id)
        .query("SELECT EvolveMachine_ID FROM EvolveMachineAssign WHERE EvolveUser_ID = @EvolveMachine_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1706: Error while getting Machine Id "+error.message);
      return new Error(" EERR1706: Error while getting Machine Id "+error.message);
    }
  },

  updateSerialNxtProcess: async function (data,EvolveProdOrdersDetail_NxtSeq,EvolveProdOrdersDetail_PrvSeq) {
    // updateSerialNxtProcess Start
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial",Evolve.Sql.NVarChar,data.EvolveProdOrdersDetail_Serial)
        .input("EvolveProdOrdersDetail_NxtSeq",Evolve.Sql.Int,EvolveProdOrdersDetail_NxtSeq)
        .input("EvolveProdOrdersDetail_PrvSeq",Evolve.Sql.Int,EvolveProdOrdersDetail_PrvSeq)
        .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = @EvolveProdOrdersDetail_PrvSeq  , EvolveProdOrdersDetail_NxtSeq =  @EvolveProdOrdersDetail_NxtSeq WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial");
    } catch (error) {
      Evolve.Log.error(" EERR1707: Error while updating Serial Nxt Process "+error.message);
      return new Error(" EERR1707: Error while updating Serial Nxt Process "+error.message);
    }
  },
  // updateSerialNxtProcess End

  getSerialNoData: async function (data) {
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
      Evolve.Log.error(" EERR1708: Error while getting Serial No Data "+error.message);
      return new Error(" EERR1708: Error while getting Serial No Data "+error.message);
    }
  },

  updatePoHistory: async function (data,machineId,process,EvolveProdOrderHistory_PrvSeq) 
  {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
        .input("EvolveProdOrderHistory_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
        .input("EvolveProdOrderHistory_UpdatedAt",Evolve.Sql.NVarChar,dataTime)
        .input("EvolveMachine_ID", Evolve.Sql.Int, machineId)
        .input("EvolveProdOrderHistory_NextSeq",Evolve.Sql.Int,process.Evolveprocesstemp_seq)
        .input("EvolveProdOrderHistory_PrvSeq",Evolve.Sql.Int,EvolveProdOrderHistory_PrvSeq)
        .input("EvolveProcess_ID", Evolve.Sql.Int, process.EvolveProcess_ID)
        .input("EvolveProcessTemp_ID",Evolve.Sql.Int,process.EvolveProcessTemp_ID)
        .query("UPDATE EvolveProdOrdersHistory SET  EvolveProdOrderHistory_PrvSeq = @EvolveProdOrderHistory_PrvSeq ,EvolveProdOrderHistory_NextSeq = @EvolveProdOrderHistory_NextSeq ,EvolveProdOrderHistory_UpdatedUser=@EvolveProdOrderHistory_UpdatedUser,EvolveProdOrderHistory_UpdatedAt=@EvolveProdOrderHistory_UpdatedAt,EvolveMachine_ID=@EvolveMachine_ID , EvolveProcess_ID=@EvolveProcess_ID ,EvolveProcessTemp_ID=@EvolveProcessTemp_ID  WHERE EvolveProdOrdersDetail_Serial=@EvolveProdOrdersDetail_Serial AND EvolveProdOrderHistoryType_Code = 'PRODORD'");
    } catch (error) {
      Evolve.Log.error(" EERR1709: Error while updating Po History "+error.message);
      return new Error(" EERR1709: Error while updating Po History "+error.message);
    }
  }, //updatePoHistory

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
        .input("EvolveProdOrdersDetail_Serial", 
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
      Evolve.Log.error(" EERR1710: Error while completing Serial Nxt Process "+error.message);
      return new Error(" EERR1710: Error while completing Serial Nxt Process "+error.message);
    }
  }, //completeSerialNxtProcess End

  getWoDetails: async function (EvolveProdOrdersDetail_Serial) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
        .query("SELECT epo.EvolveProdOrders_ID ,epo.EvolveProdOrders_Order,epo.EvolveProdOrders_OrderId,epo.EvolveProdOrders_Lot,epod.EvolveProdOrdersDetail_Serial,epod.EvolveProdOrdersDetail_Qty,ei.EvolveItem_Code, epo.EvolveProdOrders_Quantity,epob.EvolveProdOrderBom_QtyReq , (SELECT eic.EvolveItem_Code FROM EvolveItem eic WHERE eic.EvolveItem_ID = epob.EvolveProdOrderBom_CompItem_ID) as child_item FROM EvolveProdOrders AS epo, EvolveProdOrdersDetail AS epod, EvolveItem AS ei, EvolveProdOrderBom epob WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID");
      // .query("SELECT epo.EvolveProdOrders_Order,epo.EvolveProdOrders_OrderId,epod.EvolveProdOrdersDetail_Serial,epod.EvolveProdOrdersDetail_Qty,ei.EvolveItem_Code FROM EvolveProdOrders AS epo, EvolveProdOrdersDetail AS epod, EvolveItem AS ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1711: Error while getting Wo Details "+error.message);
      return new Error(" EERR1711: Error while getting Wo Details "+error.message);
    }
  },

  addIOData: async function (data) {
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

      let createIORecord = await Evolve.SqlPool.request()
        .input("EvolveIO_Data",
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
        .query("INSERT INTO EvolveIO(EvolveIO_Data,EvolveIO_File_Data,EvolveIO_File_InTime,EvolveIO_Data_Formate,EvolveIO_Code,EvolveIO_Direction,EvolveIO_Status,EvolveIO_ERP_Type) VALUES (@EvolveIO_Data,@EvolveIO_File_Data,@EvolveIO_File_InTime,@EvolveIO_Data_Formate,@EvolveIO_Code,@EvolveIO_Direction,@EvolveIO_Status,@EvolveIO_ERP_Type)");
      if (createIORecord instanceof Error || createIORecord.rowsAffected < 1) {
        Evolve.Log.error("Error on add IO Data");
        return new Error("Error on add IO Data");
      } else {
        return createIORecord;
      }
    } catch (error) {
      Evolve.Log.error(" EERR1712: Error while adding IO Data "+error.message);
      return new Error(" EERR1712: Error while adding IO Data "+error.message);
    }
  },

  getCompletedWoCount: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
        .query("SELECT (SELECT epo.EvolveProdOrders_Quantity FROM EvolveProdOrders epo WHERE epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID) as order_qty , (SELECT COUNT(epod1.EvolveProdOrdersDetail_Serial)  FROM EvolveProdOrdersDetail epod1 WHERE epod1.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND epod1.EvolveProdOrdersDetail_Status = 'Completed') AS cmp_serial FROM EvolveProdOrdersDetail epod WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial");
    } catch (error) {
      Evolve.Log.error(" EERR1713: Error while getting Completed Wo Count "+error.message);
      return new Error(" EERR1713: Error while getting Completed Wo Count "+error.message);
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
      Evolve.Log.error(" EERR1714: Error while Completing WO "+error.message);
      return new Error(" EERR1714: Error while Completing WO "+error.message);
    }
  },
  
  getReworkedSrData: async function (data) {
    // getReworkedSrData Start
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar,data.EvolveProdOrdersDetail_Serial)
        .query("SELECT epo.EvolveProdOrders_Order , epod.EvolveProdOrdersDetail_ID , ei.EvolveProcessTemp_Id , epod.EvolveProdOrdersDetail_Serial , ei.EvolveItem_ID , epod.EvolveProdOrdersDetail_NxtSeq FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1715: Error while getting Reworked Sr Data "+error.message);
      return new Error(" EERR1715: Error while getting Reworked Sr Data "+error.message);
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
      Evolve.Log.error(" EERR1716: Error while adding Rework Sr Data "+error.message);
      return new Error(" EERR1716: Error while adding Rework Sr Data "+error.message);
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
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = EvolveProdOrdersDetail_NxtSeq  , EvolveProdOrdersDetail_Status =  'Rejected' , EvolveProdOrdersDetail_IsRejected = 1 WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1717: Error while updating Reject Sr No "+error.message);
      return new Error(" EERR1717: Error while updating Reject Sr No "+error.message);
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
      Evolve.Log.error(" EERR1718: Error while getting Sequence Data "+error.message);
      return new Error(" EERR1718: Error while getting Sequence Data "+error.message);
    }
  },

  insertItemRejectHistory: async function (    data,
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
      Evolve.Log.error(" EERR1719: Error while insert Item Reject Hi story "+error.message);
      return new Error(" EERR1719: Error while insert Item Reject Hi story "+error.message);
    }
  }, //completeSerialNxtProcess End

  getComponantItemList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
        .query("SELECT epl.EvolvePickList_ID , ei.EvolveItem_Code , ei.EvolveItem_Desc , ei.EvolveItem_ID FROM EvolveProdOrdersDetail epod , EvolvePickList epl INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = epl.EvolveItem_ID WHERE epod.EvolveProdOrdersDetail_Serial LIKE @EvolveProdOrdersDetail_Serial AND epl.EvolveProdOrders_ID = epod.EvolveProdOrders_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1720: Error while getting Componant Item List "+error.message);
      return new Error(" EERR1720: Error while getting Componant Item List "+error.message);
    }
  },

  getComponantItem: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .query("SELECT epl.EvolvePickList_ID , epl.EvolvePickList_QtyIss , epl.EvolvePickList_QtyReturn , epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrdersDetail epod , EvolvePickList epl , EvolveItem ei , EvolveProdOrders epo WHERE epod.EvolveProdOrdersDetail_Serial LIKE @EvolveProdOrdersDetail_Serial AND epl.EvolveItem_ID = @EvolveItem_ID AND epl.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epl.EvolveItem_ID AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1721: Error while getting Componant Item "+error.message);
      return new Error(" EERR1721: Error while getting Componant Item "+error.message);
    }
  },

  updateRejectedComponantQty: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolvePickList_ID", Evolve.Sql.Int, data.EvolvePickList_ID)
        .input("EvolvePickList_QtyReturn", Evolve.Sql.Int, data.EvolvePickList_QtyReturn)
        .query("UPDATE EvolvePickList SET EvolvePickList_QtyReturn = EvolvePickList_QtyReturn + @EvolvePickList_QtyReturn WHERE EvolvePickList_ID = @EvolvePickList_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1722: Error while updating Rejected Componant Qty "+error.message);
      return new Error(" EERR1722: Error while updating Rejected Componant Qty "+error.message);
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
        .input("EvolveReason_ID", Evolve.Sql.Int,data.EvolveReason_ID)
        .input("EvolveCompScrap_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveCompScrap_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveCompScrap_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveCompScrap_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .query("INSERT INTO EvolveCompScrap (EvolveProdOrders_Order,EvolveItem_Code,EvolveCompScrap_RejectQty,EvolveCompScrap_Status,EvolveReason_ID,EvolveCompScrap_CreatedUser,EvolveCompScrap_UpdatedUser,EvolveCompScrap_UpdatedAt,EvolveCompScrap_CreatedAt) VALUES(@EvolveProdOrders_Order,@EvolveItem_Code,@EvolveCompScrap_RejectQty,@EvolveCompScrap_Status,@EvolveReason_ID,@EvolveCompScrap_CreatedUser,@EvolveCompScrap_UpdatedUser,@EvolveCompScrap_UpdatedAt,@EvolveCompScrap_CreatedAt) ");
    } catch (error) {
      Evolve.Log.error(" EERR1723: Error while adding Component History "+error.message);
      return new Error(" EERR1723: Error while adding Component History "+error.message);
    }
  },

  getMfReasonCode: async function () {
    try {
      return await Evolve.SqlPool.request()
        .query("SELECT * FROM EvolveReason WHERE EvolveReason_Type = 'MF PROCESS'");
    } catch (error) {
      Evolve.Log.error("Error while getting MFPROCESS type reason "+error.message);
      return new Error("Error while getting MFPROCESS type reason"+error.message);
    }
  },

  addMachineIOTValidation : async function (data) {
    return await Evolve.SqlPool.request()
    .input("EvolveMachineIOTValidation_String", Evolve.Sql.NVarChar, data.EvolveMachineIOTValidation_String)
    .input("EvolveMachineIOTValidation_Json", Evolve.Sql.NVarChar, data.EvolveMachineIOTValidation_Json)
    .query("INSERT INTO EvolveMachineIOTValidation (EvolveMachineIOTValidation_String,EvolveMachineIOTValidation_Json) VALUES(@EvolveMachineIOTValidation_String,@EvolveMachineIOTValidation_Json)");
  },

  getMachineIOTValidation : async function () {
    return await Evolve.SqlPool.request()
    .query("SELECT TOP (1) * FROM  EvolveMachineIOTValidation ORDER BY EvolveMachineIOTValidation_ID DESC");
  },

  truncateIOTValidationTbl : async function () {
    return await Evolve.SqlPool.request()
    .query("TRUNCATE TABLE EvolveMachineIOTValidation");
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


}
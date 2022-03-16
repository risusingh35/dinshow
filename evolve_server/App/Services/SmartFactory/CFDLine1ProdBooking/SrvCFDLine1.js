'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getWoListAndSectionCodeByMachinCode: async function(EvolveMachine_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveMachine_Code", Evolve.Sql.NVarChar, EvolveMachine_Code)
                .query("SELECT em.EvolveMachine_ID , es.EvolveSection_Code , em.EvolveSection_ID from EvolveMachine em , EvolveSection es Where em.EvolveMachine_Code = @EvolveMachine_Code AND em.EvolveSection_ID = es.EvolveSection_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get  Section Code By Machine Code " + error.message);
            return new Error(" EERR####: Error while get  Section Code By Machine Code " + error.message);
        }
    },

    getSectionList : async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("  SELECT  EvolveSection_ID , EvolveSection_Name  FROM  EvolveSection ")
        } catch (error) {
          	Evolve.Log.error(" EERR2746: Error while get section list "+error.message);
			      return new Error(" EERR2746: Error while get section list "+error.message);
        }
      },
    getMachineList : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSection_ID',Evolve.Sql.Int,data.EvolveSection_ID)
        .query("SELECT  EvolveLocation_ID , EvolveMachine_ID , EvolveMachine_Code  FROM  EvolveMachine WHERE EvolveSection_ID=@EvolveSection_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2747: Error while get machine list "+error.message);
          return new Error(" EERR2747: Error while get machine list "+error.message);
      }
    },
    getWoList : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveMachine_ID',Evolve.Sql.Int,data.EvolveMachine_ID)
        .query("SELECT  * FROM  EvolveProdOrders WHERE EvolveMachine_ID=@EvolveMachine_ID AND EvolveProdOrders_Status = 'PUBLISHED' ")
      } catch (error) {
          Evolve.Log.error(" EERR2748: Error while get wo list "+error.message);
          return new Error(" EERR2748: Error while get wo list "+error.message);
      }
    },
    checkInventory : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveInventory_SerialNo',Evolve.Sql.NVarChar,data.EvolveInventory_SerialNo)
        .query("SELECT ei.EvolveItem_Part ,   eloc.EvolveLocation_Code ,  einv.EvolveInventory_Status , einv.EvolveInventory_ID , einv.EvolveUnit_ID , einv.EvolveItem_ID , einv.EvolveLocation_ID ,  einv.EvolveInventory_BatchNo ,einv.EvolveInventory_Pallet ,einv.EvolveInventory_SerialNo ,  einv.EvolveInventory_LotSerialNo , einv.EvolveInventory_QtyAvailable FROM  EvolveInventory einv LEFT JOIN EvolveLocation eloc ON einv.EvolveLocation_ID = eloc.EvolveLocation_ID LEFT JOIN EvolveItem ei ON einv.EvolveItem_ID = ei.EvolveItem_ID  WHERE einv.EvolveInventory_SerialNo=@EvolveInventory_SerialNo")
      } catch (error) {
          Evolve.Log.error(" EERR####: Error while check inventory "+error.message);
          return new Error(" EERR####: Error while check inventory "+error.message);
      }
    },

    changeInventoryStatus: async function ( data) {
      try {
        console.log("data????" ,  data)
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
          .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
          .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
          .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
          // .input("EvolveLocation_ID", Evolve.Sql.Int, data.pickToLoc)
          .input("EvolveInventory_Status", Evolve.Sql.NVarChar, data.EvolveInventory_Status)
   
  
          .query("UPDATE EvolveInventory SET EvolveInventory_Status=@EvolveInventory_Status ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt  WHERE EvolveInventory_ID=@EvolveInventory_ID")
  
      } catch (error) {
        Evolve.Log.error(" EERR1781: Error while changing Pallet Status " + error.message);
        return new Error(" EERR1781: Error while changing Pallet Status " + error.message);
      }
    },

    updateProdOrderDetails: async function (data) {
      try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
          .input("EvolveProdOrdersDetail_ID", Evolve.Sql.Int,data.EvolveProdOrdersDetail_ID)
          .input("EvolveInventory_QtyAvailable", Evolve.Sql.NVarChar, data.EvolveInventory_QtyAvailable)
          // .input("EvolveProdOrders_IsPicklistGenerated", Evolve.Sql.Int, 1)
          .input("EvolveProdOrdersDetail_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
          .input("EvolveProdOrdersDetail_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
          .input('EvolveProdOrdersDetail_CreatedAt', Evolve.Sql.NVarChar, dateTime)
          .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveProdOrdersDetail SET  EvolveProdOrdersDetails_QtyIssued=EvolveProdOrdersDetails_QtyIssued+@EvolveInventory_QtyAvailable   , EvolveProdOrdersDetail_CreatedUser = @EvolveProdOrdersDetail_CreatedUser  , EvolveProdOrdersDetail_UpdatedUser =@EvolveProdOrdersDetail_UpdatedUser ,  EvolveProdOrdersDetail_CreatedAt =@EvolveProdOrdersDetail_CreatedAt ,  EvolveProdOrdersDetail_UpdatedAt =@EvolveProdOrdersDetail_UpdatedAt WHERE EvolveProdOrdersDetail_ID=@EvolveProdOrdersDetail_ID ")
      } catch (error) {
        Evolve.Log.error(" EERR1799: Erorr while update work orde details " + error.message);
        return new Error(" EERR1799: Erorr while update work orde details " + error.message);
      }
    },

    
    updateProdOrderCompletedQty: async function (data) {
      try {

        console.log("data????" ,  data)
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
          .input("EvolveProdOrders_ID", Evolve.Sql.Int,data.EvolveProdOrders_ID)
          .input("EvolveInventory_QtyAvailable", Evolve.Sql.NVarChar, data.EvolveInventory_QtyAvailable)
          // .input("EvolveProdOrders_IsPicklistGenerated", Evolve.Sql.Int, 1)
          .input("EvolveProdOrders_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
          .input("EvolveProdOrders_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
          .input('EvolveProdOrders_CreatedAt', Evolve.Sql.NVarChar, dateTime)
          .input('EvolveProdOrders_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveProdOrders SET  EvolveProdOrders_QtyComplete=EvolveProdOrders_QtyComplete+@EvolveInventory_QtyAvailable   , EvolveProdOrders_CreatedUser = @EvolveProdOrders_CreatedUser  , EvolveProdOrders_UpdatedUser =@EvolveProdOrders_UpdatedUser ,  EvolveProdOrders_CreatedAt =@EvolveProdOrders_CreatedAt ,  EvolveProdOrders_UpdatedAt =@EvolveProdOrders_UpdatedAt WHERE EvolveProdOrders_ID=@EvolveProdOrders_ID ")
      } catch (error) {
        Evolve.Log.error(" EERR1799: Erorr while update work order qty " + error.message);
        return new Error(" EERR1799: Erorr while update work order qty " + error.message);
      }
    },



    getWoDetails: async function (EvolveProdOrders_ID) {
      try {
        return await Evolve.SqlPool.request()
          .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
          .query(" SELECT  eunit.EvolveUnit_Code ,  eloc.EvolveLocation_Code , euom.EvolveUom_ID ,  euom.EvolveUom_Uom ,   ei.EvolveItem_Desc1 ,  ei.EvolveItem_Part , ei.EvolveQCTemp_ID ,  epo.*   , esec.EvolveSection_Code ,  em.EvolveMachine_Code   FROM EvolveUom euom ,  EvolveItem ei ,    EvolveProdOrders epo  LEFT JOIN  EvolveSection esec ON  epo.EvolveSection_ID  = esec.EvolveSection_ID LEFT JOIN   EvolveMachine em   ON epo.EvolveMachine_ID = em.EvolveMachine_ID LEFT JOIN EvolveLocation eloc ON em.EvolveLocation_ID = eloc.EvolveLocation_ID LEFT JOIN EvolveUnit eunit ON epo.EvolveUnit_ID = eunit.EvolveUnit_ID WHERE  EvolveProdOrders_ID  = @EvolveProdOrders_ID AND euom.EvolveUom_ID = ei.EvolveUom_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID")
      } catch (error) {
        Evolve.Log.error(" EERR1799: Erorr while getting Wo  Details " + error.message);
        return new Error(" EERR1799: Erorr while getting Wo  Details " + error.message);
      }
    },
  
    getWoBomDetails: async function (EvolveProdOrders_ID) {
      try {
        return await Evolve.SqlPool.request()
          .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
          .query("SELECt  eip.EvolveItem_Part as parentPart ,   eunit.EvolveUnit_Code ,  epo.EvolveUnit_ID ,  epo.EvolveProdOrders_OrderNo , epo.EvolveProdOrders_OrderID  ,     CAST(0 AS int) as disabled , euom.EvolveUom_Uom , 0 as qty , 0 as background_color , epod.*        , ei.EvolveItem_Part   ,  ei.EvolveItem_Desc1 , ei.EvolveItem_Desc2   FROM  EvolveProdOrdersDetail epod   ,  EvolveItem ei  LEFT JOIN  EvolveUom euom ON  ei.EvolveUom_ID = euom.EvolveUom_ID , EvolveProdOrders epo  LEFT JOIN EvolveUnit eunit ON epo.EvolveUnit_ID = eunit.EvolveUnit_ID  LEFT JOIN  EvolveItem eip ON epo.EvolveItem_ID = eip.EvolveItem_ID WHERE epod.EvolveProdOrders_ID = @EvolveProdOrders_ID AND epod.EvolveItem_ID = ei.EvolveItem_ID AND Epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID")
      } catch (error) {
        Evolve.Log.error(" EERR1799: Erorr while getting Wo  Details " + error.message);
        return new Error(" EERR1799: Erorr while getting Wo  Details " + error.message);
      }
    },

    findMachineLocation: async function (EvolveMachine_Code) {
      try {
        return await Evolve.SqlPool.request()
          .input("EvolveMachine_Code", Evolve.Sql.NVarChar, EvolveMachine_Code)
          .query("SELECt EvolveLocation_Code ,  EvolveLocation_ID  FROM EvolveLocation WHERE EvolveLocation_Code=@EvolveMachine_Code ")
      } catch (error) {
        Evolve.Log.error(" EERR1799: Erorr while get machine location " + error.message);
        return new Error(" EERR1799: Erorr while get machine location " + error.message);
      }
    },
    
    getItemDefaultLocation: async function (EvolveItem_ID) {
      try {

        console.log('EvolveItem_ID???' ,  EvolveItem_ID)
        return await Evolve.SqlPool.request()
          .input("EvolveItem_ID", Evolve.Sql.Int, EvolveItem_ID)
          .query("SELECT  eloc.EvolveLocation_ID ,  eloc.EvolveLocation_Code  FROM  EvolveItem ei ,  EvolveLocation eloc  WHERE eloc.EvolveLocation_Code = ei.EvolveItem_Defaultloc AND ei.EvolveItem_ID = @EvolveItem_ID  ")
      } catch (error) {
        Evolve.Log.error(" EERR1799: Erorr while get Item Default Location " + error.message);
        return new Error(" EERR1799: Erorr while get Item Default Location " + error.message);
      }
    },


    // getWoDetails : async function (data) {
    //   try {
    //     let  condtion = '';
    //     if(data.shiftAvailable == true){

    //       condtion+= ',(SELECT SUM(EvolveProdOrdersDetail_Qty)  FROM EvolveProdOrdersDetail WHERE EvolveWoSchedule_ID ='+data.EvolveWoSchedule_ID+' AND EvolveProdOrdersDetail_CreatedAt>='+"'"+data.currentShiftDateTime.dateTime.startDateTime+"'"+' and EvolveProdOrdersDetail_CreatedAt<='+"'"+data.currentShiftDateTime.dateTime.endDateTime+"'"+') as shiftQty'

    //     }
    //     console.log("condtion",condtion);
    //     return await Evolve.SqlPool.request()
    //     .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
    //     .input('EvolveUser_ID',Evolve.Sql.Int,data.EvolveUser_ID)

    //     .query("   SELECT   ews.*,ema.EvolveLocation_ID   , ei.EvolveQc_IsRequired  , ei.EvolveItem_Code ,ei.EvolveLocation_ID as itemLocation, ei.EvolveItem_Desc , epo.EvolveProdOrders_WOComments ,euom.EvolveUom_Uom "+condtion+" FROM EvolveWoSchedule ews ,EvolveMachineAssign ema , EvolveItem ei ,EvolveUom euom ,EvolveProdOrders epo    WHERE EvolveWoSchedule_ID=@EvolveWoSchedule_ID AND ema.EvolveMachine_ID = ews.EvolveMachine_ID AND  ema.EvolveMachineAssign_Code ='LOCATION' AND ews.EvolveItem_ID = ei.EvolveItem_ID AND ews.EvolveUOM_ID=euom.EvolveUom_ID AND ews.EvolveProdOrders_ID = epo.EvolveProdOrders_ID ")
    //   } catch (error) {
    //       Evolve.Log.error(" EERR2749: Error while wo details "+error.message);
    //       return new Error(" EERR2749: Error while wo details "+error.message);
    //   }
    // },
    // view plan details
    getMachinePlanDetails : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveMachine_ID',Evolve.Sql.Int,data.EvolveMachine_ID)
        .query(" SELECT 'false' AS planSelected  , ewos.EvolveWoSchedule_RejectedQty ,ewos.EvolveItem_ID ,  ewos.EvolveWoSchedule_ID, ewos.EvolveWoSchedule_SEQ, convert(varchar, ewos.EvolveWoSchedule_Date, 103) as wosDate, convert(varchar, ewos.EvolveWoSchedule_StartDateTime, 103) as StartDate, convert(varchar, ewos.EvolveWoSchedule_EndDateTime, 103) as EndDate, ewos.EvolveWoSchedule_OrderID, ewos.EvolveProdOrders_ID, epro.EvolveProdOrders_Order, eshift.EvolveShift_Name, eitem.EvolveItem_Code, eitem.EvolveItem_Desc, ewos.EvolveWoSchedule_Status, euom.EvolveUom_Uom, ewos.EvolveMachine_ID, emachine.EvolveMachine_Name, ewos.EvolveWoSchedule_SetupTime, CONVERT(VARCHAR(5), ewos.EvolveWoSchedule_StartDateTime , 108) AS StartTime, CONVERT(VARCHAR(5), ewos.EvolveWoSchedule_EndDateTime , 108) AS EndTime, ewos.EvolveWoSchedule_OrderQty, ewos.EvolveWoSchedule_CompletedQty, ewos.EvolveWoSchedule_CycleTime, ewos.EvolveLocation_ID, ewos.EvolveWOSchedule_ISLock, epro.EvolveProdOrders_WOStatus, ewos.EvolveWoSchedule_IsSplit, ewos.EvolveWoSchedule_IsDownTime, ewos.EvolveReason_ID FROM EvolveWoSchedule ewos LEFT JOIN EvolveProdOrders epro ON ewos.EvolveProdOrders_ID = epro.EvolveProdOrders_ID LEFT JOIN EvolveShift eshift ON ewos.EvolveShift_ID = eshift.EvolveShift_ID LEFT JOIN EvolveItem eitem ON ewos.EvolveItem_ID = eitem.EvolveItem_ID LEFT JOIN  EvolveMachine emachine ON ewos.EvolveMachine_ID = emachine.EvolveMachine_ID LEFT JOIN EvolveUom euom ON  ewos.EvolveUom_ID = euom.EvolveUom_ID WHERE  ewos.EvolveMachine_ID=@EvolveMachine_ID    AND cast (EvolveWoSchedule_StartDateTime  as DATE) >= cast (GETDATE() as DATE) ORDER BY EvolveWoSchedule_SEQ")
      } catch (error) {
          Evolve.Log.error(" EERR2750: Error while get machine plan details "+error.message);
          return new Error(" EERR2750: Error while get machine plan details "+error.message);
      }
    },
    getInComingPLans : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveItem_ID',Evolve.Sql.Int,data.EvolveItem_ID)
        .query("SELECT  EvolveWoSchedule_ID , EvolveWoSchedule_OrderQty ,convert(varchar, EvolveWoSchedule_StartDateTime, 103)  as sheduleDate , EvolveWoSchedule_OrderID  FROM  EvolveWoSchedule WHERE cast (EvolveWoSchedule_StartDateTime  as DATE) > cast (GETDATE() as DATE) AND EvolveItem_ID=@EvolveItem_ID  ORDER BY EvolveWoSchedule_StartDateTime")
      } catch (error) {
          Evolve.Log.error(" EERR2751: Error while get incoming  plans "+error.message);
          return new Error(" EERR2751: Error while get incoming  plans "+error.message);
      }
    },
    addProdComments : async function (data) {
      try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        return await Evolve.SqlPool.request()
        .input('EvolveWoSchedule_ProdComments',Evolve.Sql.NVarChar,data.EvolveWoSchedule_ProdComments)
        .input('EvolveWoSchedule_ID',Evolve.Sql.NVarChar,data.EvolveWoSchedule_ID)
        .input("EvolveWoSchedule_UpdatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
        .input('EvolveWoSchedule_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
        .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_ProdComments=@EvolveWoSchedule_ProdComments ,EvolveWoSchedule_UpdatedUser=@EvolveWoSchedule_UpdatedUser ,EvolveWoSchedule_UpdatedAt=@EvolveWoSchedule_UpdatedAt  WHERE EvolveWoSchedule_ID=@EvolveWoSchedule_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2752: Error while add prod comments "+error.message);
          return new Error(" EERR2752: Error while add prod comments "+error.message);
      }
    },
    checkPalletNumber : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveInventory_RefNumber',Evolve.Sql.NVarChar,data.EvolveInventory_RefNumber)
        .query("SELECT EvolveInventory_ID FROM  EvolveInventory WHERE EvolveInventory_RefNumber=@EvolveInventory_RefNumber")
      } catch (error) {
          Evolve.Log.error(" EERR2753: Error while check pallet number "+error.message);
          return new Error(" EERR2753: Error while check pallet number "+error.message);
      }
    },
    addIssuedPallet : async function (data) {
      try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
            .input("EvolveItem_ID", Evolve.Sql.Int,data.EvolveItem_ID)
            .input("EvolveSubItem_SubItem_ID", Evolve.Sql.Int,data.EvolveSubItem_SubItem_ID)
            .input("EvolveInventory_ID", Evolve.Sql.Int,data.EvolveInventory_ID)
            .input("EvolvePickListDetail_Status", Evolve.Sql.NVarChar,'ISSUED')
            .input("EvolvePickListDetail_IssQty", Evolve.Sql.NVarChar,data.EvolvePickListDetail_IssQty)
            .input("EvolveLocation_ID", Evolve.Sql.Int,data.EvolveLocation_ID)
            .input("EvolveWoSchedule_ID", Evolve.Sql.Int,data.EvolveWoSchedule_ID)
            .input("EvolvePickListDetail_CreatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
            .input("EvolvePickListDetail_UpdateUser", Evolve.Sql.Int,data.EvolveUser_ID)
            .input('EvolvePickListDetail_CreatedAt', Evolve.Sql.NVarChar, dateTime)
            .input('EvolvePickListDetail_UpdateAt', Evolve.Sql.NVarChar, dateTime)
            .query("INSERT INTO  EvolvePickListDetail (EvolveItem_ID  ,EvolveSubItem_SubItem_ID,EvolveInventory_ID ,EvolvePickListDetail_IssQty,EvolveLocation_ID,EvolvePickListDetail_CreatedUser,EvolvePickListDetail_UpdateUser,EvolvePickListDetail_CreatedAt,EvolvePickListDetail_UpdateAt,EvolvePickListDetail_Status,EvolveWoSchedule_ID) VALUES ( @EvolveItem_ID,@EvolveSubItem_SubItem_ID,@EvolveInventory_ID  ,@EvolvePickListDetail_IssQty,@EvolveLocation_ID ,@EvolvePickListDetail_CreatedUser,@EvolvePickListDetail_UpdateUser,@EvolvePickListDetail_CreatedAt,@EvolvePickListDetail_UpdateAt,@EvolvePickListDetail_Status,@EvolveWoSchedule_ID)")
      } catch (error) {
          Evolve.Log.error(" EERR2754: Error while  issue pallet "+error.message);
          return new Error(" EERR2754: Error while  issue pallet "+error.message);
      }
    },
    updateProdOrderBom : async function (data) {
      try {
          let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
          .input('EvolveSchedulingBom_CompItem_ID',Evolve.Sql.Int,data.EvolveItem_ID)
          .input("EvolveSchedulingBom_UpdatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
          .input('EvolveSchedulingBom_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
          
          .input('EvolveSchedulingBom_QtyIss',Evolve.Sql.NVarChar,data.EvolvePickListDetail_IssQty)
          .query(" UPDATE EvolveSchedulingBom SET  EvolveSchedulingBom_QtyIss=EvolveSchedulingBom_QtyIss+@EvolveSchedulingBom_QtyIss ,EvolveSchedulingBom_UpdatedUser=@EvolveSchedulingBom_UpdatedUser ,EvolveSchedulingBom_UpdatedAt=@EvolveSchedulingBom_UpdatedAt  WHERE EvolveWoSchedule_ID=@EvolveWoSchedule_ID AND EvolveSchedulingBom_CompItem_ID=@EvolveSchedulingBom_CompItem_ID ")
      } catch (error) {
          Evolve.Log.error(" EERR2755: Error while update sheduling  bom "+error.message);
          return new Error(" EERR2755: Error while update sheduling  bom "+error.message);
      }
    },
    getissuedPallets : async function (data) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
          .query("SELECT  einv.EvolveInventory_LotNumber ,  epick.EvolvePickListDetail_Rts ,  epick.EvolvePickListDetail_ID,euom.EvolveUom_ID , euom.EvolveUom_Uom ,  epick.EvolveSubItem_SubItem_ID,  ei.EvolveItem_Code , ei.EvolveItem_Desc , einv.EvolveInventory_RefNumber ,einv.EvolveInventory_CustLotRef, epick.EvolveInventory_ID  ,einv.EvolveInventory_LotNotes,  epick.EvolveItem_ID , epick.EvolveLocation_ID , epick.EvolvePickListDetail_IssQty ,  convert(varchar, epick.EvolvePickListDetail_CreatedAt, 103)  as EvolvePickListDetail_CreatedAt , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, epick.EvolvePickListDetail_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),   CONVERT(DATETIME, epick.EvolvePickListDetail_CreatedAt), 22), 3)) as time, epick.EvolvePickListDetail_CreatedUser , eu.EvolveUser_Name  FROM EvolvePickListDetail epick , EvolveInventory einv , EvolveUser eu , EvolveItem ei  ,EvolveUom euom WHERE epick.EvolveInventory_ID = einv.EvolveInventory_ID AND epick.EvolvePickListDetail_CreatedUser = eu.EvolveUser_ID AND epick.EvolveWoSchedule_ID =@EvolveWoSchedule_ID  AND epick.EvolveSubItem_SubItem_ID=ei.EvolveItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID AND epick.EvolvePickListDetail_Status='ISSUED'  ORDER BY  EvolvePickListDetail_ID DESC")
      } catch (error) {
          Evolve.Log.error(" EERR2756: Error while get issued pallets "+error.message);
          return new Error(" EERR2756: Error while get issued pallets "+error.message);
      }
    },
    getRtsLocationList: async function () {
      try {
        return await Evolve.SqlPool.request()
              .query("SELECT el.EvolveLocation_ID ,el.EvolveLocation_Name , scm.EvolveStatusCodeMstr_Code as EvolveLocation_Status  FROM  EvolveLocation el  , EvolveStatusCodeMstr scm WHERE el.EvolveStatusCodeMstr_Id = scm.EvolveStatusCodeMstr_Id AND scm.EvolveStatusCodeMstr_Code = 'GOOD'")
      } catch (error) {
          Evolve.Log.error(" EERR2757: Error while get rts locations "+error.message);
          return new Error(" EERR2757: Error while get rts locations "+error.message);
      }
    },
    // updateIssuedQty : async function (data) {
    //   try {
    //   let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //       return await Evolve.SqlPool.request()
    //         .input("EvolveItem_ID", Evolve.Sql.Int,data.rtsOrignalItemId)
    //         .input("EvolveSubItem_SubItem_ID", Evolve.Sql.Int,data.rtsItemId)
    //         .input("EvolveInventory_ID", Evolve.Sql.Int,data.EvolveInventory_ID)
    //         .input("EvolvePickListDetail_Status", Evolve.Sql.NVarChar,'ISSUED')
    //         .input("EvolvePickListDetail_IssQty", Evolve.Sql.NVarChar,data.qty)
    //         .input("EvolveLocation_ID", Evolve.Sql.Int,data.EvolveLocation_ID)
    //         .input("EvolveWoSchedule_ID", Evolve.Sql.Int,data.EvolveWoSchedule_ID)
    //         .input("EvolvePickListDetail_CreatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
    //         .input("EvolvePickListDetail_UpdateUser", Evolve.Sql.Int,data.EvolveUser_ID)
    //         .input('EvolvePickListDetail_CreatedAt', Evolve.Sql.NVarChar, dateTime)
    //         .input('EvolvePickListDetail_UpdateAt', Evolve.Sql.NVarChar, dateTime)
    //         .query("INSERT INTO  EvolvePickListDetail (EvolveItem_ID  ,EvolveSubItem_SubItem_ID,EvolveInventory_ID ,EvolvePickListDetail_IssQty,EvolveLocation_ID,EvolvePickListDetail_CreatedUser,EvolvePickListDetail_UpdateUser,EvolvePickListDetail_CreatedAt,EvolvePickListDetail_UpdateAt,EvolvePickListDetail_Status,EvolveWoSchedule_ID) VALUES ( @EvolveItem_ID,@EvolveSubItem_SubItem_ID,@EvolveInventory_ID  ,@EvolvePickListDetail_IssQty,@EvolveLocation_ID ,@EvolvePickListDetail_CreatedUser,@EvolvePickListDetail_UpdateUser,@EvolvePickListDetail_CreatedAt,@EvolvePickListDetail_UpdateAt,@EvolvePickListDetail_Status,@EvolveWoSchedule_ID)");
    //   } catch (error) {
    //       Evolve.Log.error(" EERR2758: Error while update issue qty "+error.message);
    //       return new Error(" EERR2758: Error while update issue qty "+error.message);
    //   }
    // },
    updateIssuedQty : async function (data){
      try {
          return await Evolve.SqlPool.request()
            .input("EvolveProdOrdersDetail_ID", Evolve.Sql.Int, data.EvolveProdOrdersDetail_ID)
            .input("EvolveProdOrdersDetails_QtyIssued", Evolve.Sql.NVarChar, data.qty)
            .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetails_QtyIssued = EvolveProdOrdersDetails_QtyIssued + @EvolveProdOrdersDetails_QtyIssued WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
        } catch (error) {
          Evolve.Log.error(" EERR1799: Erorr while UpDate IssuedQty " + error.message);
          return new Error(" EERR1799: Erorr while UpDate IssuedQty " + error.message);
        }
    },
    updateInventoryPallet : async function (data) {
      try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

          return await Evolve.SqlPool.request()
          .input('EvolveCompany_ID',Evolve.Sql.NVarChar,data.EvolveCompany_ID)
          .input('EvolveUnit_ID',Evolve.Sql.NVarChar,data.EvolveUnit_ID)
          .input('EvolveInventory_ID',Evolve.Sql.Int,data.EvolveInventory_ID)
          .input('qty',Evolve.Sql.NVarChar,data.qty)
          .input("EvolveLocation_ID", Evolve.Sql.Int,data.EvolveLocation_ID)
          .input('EvolveInventory_Status',Evolve.Sql.NVarChar,data.EvolveInventory_Status)
          .input('EvolveWoSchedule_OrderID',Evolve.Sql.Int,null)
          .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
          .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
          .query(" UPDATE EvolveInventory SET  EvolveLocation_ID=@EvolveLocation_ID , EvolveInventory_Status=@EvolveInventory_Status , EvolveWoSchedule_OrderID=@EvolveWoSchedule_OrderID , EvolveCompany_ID=@EvolveCompany_ID ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt ,   EvolveUnit_ID=@EvolveUnit_ID , EvolveInventory_QtyOnHand = EvolveInventory_QtyOnHand-@qty    WHERE EvolveInventory_ID=@EvolveInventory_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2759: Error while update inventory "+error.message);
          return new Error(" EERR2759: Error while update inventory "+error.message);
      }
    },
    updateProdOrderIssueQty : async function (data) {
      try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
          .input('EvolveSchedulingBom_CompItem_ID',Evolve.Sql.Int,data.rtsOrignalItemId)
          .input('qty',Evolve.Sql.NVarChar,data.qty)
          .input("EvolveSchedulingBom_UpdatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
          .input('EvolveSchedulingBom_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
          .query(" UPDATE EvolveSchedulingBom SET  EvolveSchedulingBom_QtyIss =EvolveSchedulingBom_QtyIss+@qty , EvolveSchedulingBom_UpdatedUser=@EvolveSchedulingBom_UpdatedUser , EvolveSchedulingBom_UpdatedAt=@EvolveSchedulingBom_UpdatedAt  WHERE EvolveSchedulingBom_CompItem_ID=@EvolveSchedulingBom_CompItem_ID AND EvolveWoSchedule_ID=@EvolveWoSchedule_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2760: Error while update issue qty "+error.message);
          return new Error(" EERR2760: Error while update issue qty "+error.message);
      }
    },
    getMaterialToIssue : async function (data) {
      try {

        console.log("data.EvolveWoSchedule_ID",data.EvolveWoSchedule_ID);
          return await Evolve.SqlPool.request()
              .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
              .query("SELECT (SELECT SUM(einv.EvolveInventory_QtyOnHand) FROM EvolveInventory einv WHERE  einv.EvolveItem_ID = epob.EvolveSchedulingBom_CompItem_ID AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED'  AND einv.EvolveInventory_Status = 'GOOD') as qtyHand , epob.EvolveSchedulingBom_ParentItem_ID , epob.EvolveSchedulingBom_CompItem_ID , epob.EvolveSchedulingBom_CompItem_ID as EvolveItem_ID,   epob.EvolveSchedulingBom_ID , epob.EvolveSchedulingBom_QtyReq , epob.EvolveSchedulingBom_QtyIss , epob.EvolveSchedulingBom_QtyPick , ei.EvolveItem_Code , ei.EvolveItem_Desc  , euom.EvolveUom_Uom    FROM EvolveSchedulingBom epob  , EvolveItem ei , EvolveUom euom   WHERE epob.EvolveWoSchedule_ID=@EvolveWoSchedule_ID AND epob.EvolveSchedulingBom_CompItem_ID = ei.EvolveItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID ORDER BY EvolveSchedulingBom_DispSeq")
      } catch (error) {
          Evolve.Log.error(" EERR2761: Error while get material to issue "+error.message);
          return new Error(" EERR2761: Error while get material to issue "+error.message);
      }
    },
    getSubItems : async function (EvolveSubItem_ActualItemID) {
      try {
          return await Evolve.SqlPool.request()
              .input('EvolveSubItem_ActualItemID',Evolve.Sql.Int,EvolveSubItem_ActualItemID)
              .query(" SELECT esbi.EvolveSubItem_SubItem_ID ,  ei.EvolveItem_Code ,  ei.EvolveItem_Desc    , euom.EvolveUom_Uom  FROM EvolveSubItem esbi  , EvolveItem ei   , EvolveUom euom  WHERE  EvolveSubItem_ActualItemID = @EvolveSubItem_ActualItemID AND  ei.EvolveItem_ID = esbi.EvolveSubItem_SubItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2762: Error while get sub items "+error.message);
          return new Error(" EERR2762: Error while get sub items "+error.message);
      }
    },
    getQtyOnHAnd : async function (EvolveItem_ID ,EvolveWoSchedule_ID) {
      try {

        let qtyHand =  await Evolve.SqlPool.request()
          .input('EvolveItem_ID',Evolve.Sql.Int,EvolveItem_ID)
            .query("SELECT SUM(einv.EvolveInventory_QtyOnHand) as qtyHand FROM EvolveInventory einv   WHERE  einv.EvolveItem_ID = @EvolveItem_ID AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED'  AND einv.EvolveItem_ID =@EvolveItem_ID  AND einv.EvolveInventory_Status = 'GOOD'");

        let qtyPick =  await Evolve.SqlPool.request()
            .input('EvolveItem_ID',Evolve.Sql.Int,EvolveItem_ID)
            .input('EvolveWoSchedule_ID',Evolve.Sql.Int,EvolveWoSchedule_ID)
            .query("SELECT SUM(EvolvePickListDetail_QtyPick) FROM EvolvePickListDetail as qtyPick  WHERE  EvolvePickListDetail_Status='PICKED' AND EvolveItem_ID != EvolveSubItem_SubItem_ID AND EvolveSubItem_SubItem_ID= @EvolveItem_ID AND EvolveWoSchedule_ID=@EvolveWoSchedule_ID"); 

        let qtyIssue =  await Evolve.SqlPool.request()
            .input('EvolveItem_ID',Evolve.Sql.Int,EvolveItem_ID)
            .input('EvolveWoSchedule_ID',Evolve.Sql.Int,EvolveWoSchedule_ID)
            .query("SELECT SUM(EvolvePickListDetail_IssQty) as qtyIssue FROM EvolvePickListDetail as qtyIssue  WHERE  EvolvePickListDetail_Status='ISSUED' AND EvolveItem_ID != EvolveSubItem_SubItem_ID AND EvolveSubItem_SubItem_ID= @EvolveItem_ID AND EvolveWoSchedule_ID=@EvolveWoSchedule_ID");

            let qtyDetails={
              qtyHand : qtyHand.recordset[0].qtyHand,
              qtyPick :qtyPick.recordset[0].qtyPick,
              qtyIssue :qtyIssue.recordset[0].qtyIssue,
            }

            return qtyDetails
      } catch (error) {
          Evolve.Log.error(" EERR2763: Error while qty details "+error.message);
          return new Error(" EERR2763: Error while qty details "+error.message);
      }
    },

    getWoItemSecUomList : async function (data) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveItem_ID',Evolve.Sql.Int,data.EvolveItem_ID)
          .input('EvolveUom_ID',Evolve.Sql.Int,data.EvolveUom_ID)

          
          .query(" SELECT uomconv.EvolveItem_ID, uomconv.EvolveUom_ID,  uomconv.EvolveUomConv_AlternateUom_ID  , uomconv.EvolveUomConv_Conversion , uom.EvolveUom_Uom FROM  EvolveUomConv uomconv , EvolveUom uom  WHERE uomconv.EvolveUom_ID=@EvolveUom_ID AND EvolveItem_ID=@EvolveItem_ID AND uomconv.EvolveUomConv_AlternateUom_ID = uom.EvolveUom_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2764: Error while get item's seconday uom list "+error.message);
          return new Error(" EERR2764: Error while get item's seconday uom list "+error.message);
      }
    },
    addInventory: async function (data) {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      try {
          
        let inventory = await Evolve.SqlPool.request()
            // .input('EvolvePurchaseOrderRcpt_ID', Evolve.Sql.Int, data.EvolvePurchaseOrderRcpt_ID)
            .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
            .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
            .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
            .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
            // .input('EvolveInventory_MemoItem', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderDetails_Type == 'M' ? data.EvolvePurchaseOrderDetails_MemoItem : '' )
            .input('EvolveInventory_BatchNo', Evolve.Sql.NVarChar, data.EvolveInventory_BatchNo)
            .input('EvolveInventory_LotSerialNo', Evolve.Sql.NVarChar,data.EvolveInventory_LotSerialNo)
            .input('EvolveInventory_SerialNo', Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
            .input('EvolveInventory_SupplierBatchNo', Evolve.Sql.NVarChar, '')
            .input('EvolveInventory_QtyRecieved', Evolve.Sql.NVarChar,0)
            .input('EvolveInventory_QtyIssued', Evolve.Sql.NVarChar, 0)
            .input('EvolveInventory_QtyAvailable', Evolve.Sql.NVarChar, data.EvolveInventory_QtyAvailable)
            .input('EvolveInventory_Status', Evolve.Sql.NVarChar, data.EvolveInventory_Status)
            .input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveInventory_CreatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
            .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveInventory_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
            .query("INSERT INTO EvolveInventory (EvolveInventory_Status , EvolveUnit_ID, EvolveItem_ID, EvolveLocation_ID, EvolveUom_ID  ,EvolveInventory_BatchNo, EvolveInventory_LotSerialNo ,EvolveInventory_SerialNo, EvolveInventory_SupplierBatchNo ,EvolveInventory_QtyRecieved , EvolveInventory_QtyIssued ,  EvolveInventory_QtyAvailable  , EvolveInventory_CreatedAt , EvolveInventory_CreatedUser  ,EvolveInventory_UpdatedAt , EvolveInventory_UpdatedUser  ) VALUES ( @EvolveInventory_Status  , @EvolveUnit_ID, @EvolveItem_ID, @EvolveLocation_ID,@EvolveUom_ID  ,  @EvolveInventory_BatchNo,@EvolveInventory_LotSerialNo , @EvolveInventory_SerialNo, @EvolveInventory_SupplierBatchNo , @EvolveInventory_QtyRecieved , @EvolveInventory_QtyIssued , @EvolveInventory_QtyAvailable  , @EvolveInventory_CreatedAt , @EvolveInventory_CreatedUser  , @EvolveInventory_UpdatedAt , @EvolveInventory_UpdatedUser  );select @@IDENTITY AS 'inserted_id'");
        if (inventory instanceof Error || inventory.rowsAffected < 1) {
            return inventory
        } else { 
            return await Evolve.SqlPool.request()
            
            .input('EvolveInventory_ID', Evolve.Sql.Int, inventory.recordset[0].inserted_id)
            .input('EvolveInventoryDetails_MachineSpeed', Evolve.Sql.NVarChar, data.EvolveInventoryDetails_MachineSpeed)
            .input('EvolveInventoryDetails_ALTUOMQTY', Evolve.Sql.NVarChar, data.EvolveInventoryDetails_ALTUOMQTY)
            .input('EvolveInventoryDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveInventoryDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveInventoryDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveInventoryDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query(' INSERT INTO EvolveInventoryDetails (EvolveInventory_ID , EvolveInventoryDetails_MachineSpeed, EvolveInventoryDetails_ALTUOMQTY, EvolveInventoryDetails_CreatedAt , EvolveInventoryDetails_CreatedUser  ,EvolveInventoryDetails_UpdatedAt , EvolveInventoryDetails_UpdatedUser  ) VALUES ( @EvolveInventory_ID, @EvolveInventoryDetails_MachineSpeed, @EvolveInventoryDetails_ALTUOMQTY, @EvolveInventoryDetails_CreatedAt , @EvolveInventoryDetails_CreatedUser  , @EvolveInventoryDetails_UpdatedAt , @EvolveInventoryDetails_UpdatedUser  ) ');
        }       

      } catch (error) {
          Evolve.Log.error(" EERR####: Erorr while add inventory " + error.message);
          return new Error(" EERR####: Erorr while add inventory " + error.message);
      }
  },
  
    // addInventory : async function (data) {
    //   try {
    //     let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     if(data.EvolveInventory_SecondaryUom == ''){
    //         data.EvolveInventory_SecondaryUom = null;
    //     }
    //     // if(data.EvolveQc_IsRequired == true){
    //     //   data.EvolveInventory_Status = 'QCHOLD'
    //     // }else{
    //     //   data.EvolveInventory_Status = 'ACCEPTED'
    //     // }

    //       return await Evolve.SqlPool.request()
    //       .input('EvolveCompany_ID',Evolve.Sql.Int,data.EvolveCompany_ID)
    //       .input('EvolveUnit_ID',Evolve.Sql.Int,data.EvolveUnit_ID)
    //       .input('EvolveItem_ID',Evolve.Sql.Int,data.EvolveItem_ID)
    //       .input('EvolveUom_ID',Evolve.Sql.Int,data.EvolveUom_ID)
    //       .input('EvolveLocation_ID',Evolve.Sql.Int,data.EvolveLocation_ID)
    //       .input('EvolveInventory_SecondaryUom',Evolve.Sql.Int,data.EvolveInventory_SecondaryUom)
    //       .input('EvolveInventory_SecondaryUomQty',Evolve.Sql.NVarChar,data.EvolveInventory_SecondaryUomQty)
    //       .input('EvolveInventory_PalletNotes',Evolve.Sql.NVarChar,data.EvolveInventory_PalletNotes)
    //       .input('EvolveInventory_LotNumber',Evolve.Sql.NVarChar,data.EvolveInventory_LotNumber)
    //       .input('EvolveInventory_LotNotes',Evolve.Sql.NVarChar,data.EvolveInventory_LotNotes)
    //       .input('EvolveInventory_QtyOnHand',Evolve.Sql.NVarChar,data.EvolveInventory_QtyOnHand)
    //       .input('EvolveInventory_RefNumber',Evolve.Sql.NVarChar,data.palletNumber)
    //       .input("EvolveTranstype_ID",Evolve.Sql.Int,data.EvolveTranstype_ID)
    //       .input('EvolveInventory_PostingStatus',Evolve.Sql.NVarChar,'PENDING')
    //       .input('EvolveInventory_Status',Evolve.Sql.NVarChar,data.EvolveInventory_Status)
    //       .input("EvolveInventory_CreatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
    //       .input("EvolveInventory_CreatedAt", Evolve.Sql.NVarChar, dateTime)
    //       .input("EvolveInventory_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
    //       .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
    //         .query("INSERT INTO EvolveInventory (EvolveTranstype_ID,EvolveInventory_Status ,EvolveCompany_ID,EvolveUnit_ID,EvolveItem_ID , EvolveUom_ID ,EvolveLocation_ID ,EvolveInventory_SecondaryUom ,EvolveInventory_SecondaryUomQty ,EvolveInventory_PalletNotes ,EvolveInventory_LotNumber ,EvolveInventory_LotNotes,EvolveInventory_QtyOnHand,EvolveInventory_PostingStatus,EvolveInventory_RefNumber,EvolveInventory_CreatedUser,EvolveInventory_CreatedAt,EvolveInventory_UpdatedUser,EvolveInventory_UpdatedAt) VALUES (@EvolveTranstype_ID,@EvolveInventory_Status,@EvolveCompany_ID,@EvolveUnit_ID,@EvolveItem_ID , @EvolveUom_ID ,@EvolveLocation_ID ,@EvolveInventory_SecondaryUom ,@EvolveInventory_SecondaryUomQty ,@EvolveInventory_PalletNotes ,@EvolveInventory_LotNumber ,@EvolveInventory_LotNotes,@EvolveInventory_QtyOnHand,@EvolveInventory_PostingStatus,@EvolveInventory_RefNumber,@EvolveInventory_CreatedUser,@EvolveInventory_CreatedAt,@EvolveInventory_UpdatedUser,@EvolveInventory_UpdatedAt);select @@IDENTITY AS 'inserted_id'")
    //   } catch (error) {
    //       Evolve.Log.error(" EERR2765: Error while add inventory "+error.message);
    //       return new Error(" EERR2765: Error while add inventory "+error.message);
    //   }
    // },

    addProdOrderDetails : async function (data) {
      try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
          .input('EvolveProdOrders_ID',Evolve.Sql.Int,data.EvolveProdOrders_ID)
          .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,data.palletNumber)
          .input('EvolveProdOrdersDetail_Qty',Evolve.Sql.NVarChar,data.EvolveInventory_QtyOnHand)
          .input('EvolveProdOrdersDetail_PrvSeq',Evolve.Sql.Int,data.EvolveMachine_ID)
          .input('EvolveProdOrdersDetail_NxtSeq',Evolve.Sql.Int,data.EvolveMachine_ID)
          .input('EvolveUom_ID',Evolve.Sql.NVarChar,data.EvolveUom_ID)
          .input('EvolveProdOrdersDetail_LotNumber',Evolve.Sql.NVarChar,data.EvolveInventory_LotNumber)
          .input('EvolveLocation_ID',Evolve.Sql.Int,data.EvolveLocation_ID)
          .input('EvolveProdOrdersDetail_RefNumber',Evolve.Sql.NVarChar,data.palletNumber)
          .input('EvolveInventory_ID',Evolve.Sql.Int,data.EvolveInventory_ID)
          .input("EvolveProdOrdersDetail_CreatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
          .input("EvolveProdOrdersDetail_CreatedAt", Evolve.Sql.NVarChar, dateTime)
          .input("EvolveProdOrdersDetail_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
          .input("EvolveProdOrdersDetail_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
            .query("INSERT INTO EvolveProdOrdersDetail (EvolveWoSchedule_ID,EvolveProdOrders_ID,EvolveProdOrdersDetail_Serial,EvolveProdOrdersDetail_Qty , EvolveProdOrdersDetail_PrvSeq ,EvolveProdOrdersDetail_NxtSeq ,EvolveUom_ID ,EvolveProdOrdersDetail_LotNumber ,EvolveLocation_ID ,EvolveProdOrdersDetail_RefNumber,EvolveInventory_ID,EvolveProdOrdersDetail_CreatedUser,EvolveProdOrdersDetail_CreatedAt,EvolveProdOrdersDetail_UpdatedUser,EvolveProdOrdersDetail_UpdatedAt) VALUES (@EvolveWoSchedule_ID,@EvolveProdOrders_ID,@EvolveProdOrdersDetail_Serial,@EvolveProdOrdersDetail_Qty , @EvolveProdOrdersDetail_PrvSeq ,@EvolveProdOrdersDetail_NxtSeq,@EvolveUom_ID ,@EvolveProdOrdersDetail_LotNumber ,@EvolveLocation_ID ,@EvolveProdOrdersDetail_RefNumber,@EvolveInventory_ID,@EvolveProdOrdersDetail_CreatedUser,@EvolveProdOrdersDetail_CreatedAt,@EvolveProdOrdersDetail_UpdatedUser,@EvolveProdOrdersDetail_UpdatedAt)")
      } catch (error) {
          Evolve.Log.error(" EERR2766: Error while add prod order details "+error.message);
          return new Error(" EERR2766: Error while add prod order details "+error.message);
      }
    },
    updateWoCompletedQty : async function (data) {
      try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
          return await Evolve.SqlPool.request()
          .input('qty',Evolve.Sql.NVarChar,data.EvolveInventory_QtyOnHand)
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
          .input("EvolveWoSchedule_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
          .input("EvolveWoSchedule_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_CompletedQty=EvolveWoSchedule_CompletedQty+@qty ,EvolveWoSchedule_UpdatedUser=@EvolveWoSchedule_UpdatedUser ,EvolveWoSchedule_UpdatedAt=@EvolveWoSchedule_UpdatedAt  WHERE EvolveWoSchedule_ID=@EvolveWoSchedule_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2767: Error while update wo  completed qty "+error.message);
          return new Error(" EERR2767: Error while update wo  completed qty "+error.message);
      }
    },
    getWoBookedList : async function (EvolveWoSchedule_ID) {
      try {
        
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,EvolveWoSchedule_ID)
            .query("SELECT  einv.EvolveUom_ID ,einv.EvolveInventory_SecondaryUom,   einv.EvolveInventory_PostingStatus , epod.EvolveProdOrdersDetail_ID , epod.EvolveInventory_ID ,epod.EvolveProdOrdersDetail_RefNumber , epod.EvolveProdOrdersDetail_Qty , einv.EvolveInventory_SecondaryUomQty , eu.EvolveUser_Name , einv.EvolveInventory_PalletNotes , (SELECT uom.EvolveUom_Uom  FROM  EvolveUom uom  WHERE einv.EvolveUom_ID = uom.EvolveUom_ID ) as primaryUom , (SELECT uom.EvolveUom_Uom  FROM  EvolveUom uom  WHERE einv.EvolveInventory_SecondaryUom = uom.EvolveUom_ID ) as secondaryUom FROM EvolveProdOrdersDetail epod , EvolveInventory einv , EvolveUser eu  WHERE epod.EvolveProdOrdersDetail_UpdatedUser=eu.EvolveUser_ID AND  epod.EvolveInventory_ID = einv.EvolveInventory_ID AND epod.EvolveWoSchedule_ID=@EvolveWoSchedule_ID ORDER BY epod.EvolveProdOrdersDetail_ID DESC ")
      } catch (error) {
          Evolve.Log.error(" EERR2768: Error while get booked pallets "+error.message);
          return new Error(" EERR2768: Error while get booked pallets "+error.message);
      }
    },
    updateWoOrderQty : async function (data , type) {
      try {
          let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        if(type == 'DELETEPALLET' ){
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.NVarChar,data.EvolveWoSchedule_ID)
          .input('qty',Evolve.Sql.NVarChar,data.qty)
          .input("EvolveWoSchedule_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
          .input("EvolveWoSchedule_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_CompletedQty=EvolveWoSchedule_CompletedQty-@qty WHERE EvolveWoSchedule_ID=@EvolveWoSchedule_ID")
        }
        if(type == 'UPDATEPALLET'){
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.NVarChar,data.EvolveWoSchedule_ID)
          .input('qty',Evolve.Sql.NVarChar,data.palletDetails.qtyDifferent)
          .input("EvolveWoSchedule_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
          .input("EvolveWoSchedule_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_CompletedQty=EvolveWoSchedule_CompletedQty+@qty WHERE EvolveWoSchedule_ID=@EvolveWoSchedule_ID")

        }
      } catch (error) {
          Evolve.Log.error(" EERR2769: Error while upadte wo completed qty "+error.message);
          return new Error(" EERR2769: Error while upadte wo completed qty "+error.message);
      }
    },
    deleteProdOrderPallet : async function (EvolveProdOrdersDetail_ID) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveProdOrdersDetail_ID',Evolve.Sql.Int,EvolveProdOrdersDetail_ID)
          
          .query("DELETE  FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_ID=@EvolveProdOrdersDetail_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2770: Error while delete prod order pallet "+error.message);
          return new Error(" EERR2770: Error while delete prod order pallet "+error.message);
      }
    },
    deleteInventory : async function (EvolveInventory_ID) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveInventory_ID',Evolve.Sql.Int,EvolveInventory_ID)
    
          .query("DELETE FROM EvolveInventory WHERE EvolveInventory_ID=@EvolveInventory_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2771: Error while delete inventory "+error.message);
          return new Error(" EERR2771: Error while delete inventory "+error.message);
      }
    },
    confirmBookedPallet : async function (data,EvolveUser_ID) {
      try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

          return await Evolve.SqlPool.request()
          .input('EvolveInventory_ID',Evolve.Sql.Int,data.EvolveInventory_ID)
          .input("EvolveInventory_UpdatedUser",Evolve.Sql.Int,EvolveUser_ID)
          .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveInventory SET EvolveInventory_PostingStatus = 'ERPPOSTED' , EvolveInventory_UpdatedUser =@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt  WHERE EvolveInventory_ID=@EvolveInventory_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2772: Error while confirm  booked pallet "+error.message);
          return new Error(" EERR2772: Error while confirm  booked pallet "+error.message);
      }
    },
    updatePbPalletDetails :async function(data){
      try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
          return await Evolve.SqlPool.request()
          .input('EvolveProdOrdersDetail_ID',Evolve.Sql.Int,data.palletDetails.EvolveProdOrdersDetail_ID)
          .input('EvolveProdOrdersDetail_Qty',Evolve.Sql.NVarChar,data.palletDetails.EvolveProdOrdersDetail_Qty)
          .input("EvolveProdOrdersDetail_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
          .input("EvolveProdOrdersDetail_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Qty=@EvolveProdOrdersDetail_Qty ,EvolveProdOrdersDetail_UpdatedUser=@EvolveProdOrdersDetail_UpdatedUser ,EvolveProdOrdersDetail_UpdatedAt=@EvolveProdOrdersDetail_UpdatedAt  WHERE EvolveProdOrdersDetail_ID=@EvolveProdOrdersDetail_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2773: Error while update pallet details "+error.message);
          return new Error(" EERR2773: Error while update pallet details "+error.message);
      }

    },
    updateInvPbPallet :async function(data){
      try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
          return await Evolve.SqlPool.request()
          .input('EvolveCompany_ID',Evolve.Sql.NVarChar,data.EvolveCompany_ID)
          .input('EvolveUnit_ID',Evolve.Sql.NVarChar,data.EvolveUnit_ID)
          .input('EvolveInventory_ID',Evolve.Sql.NVarChar,data.palletDetails.EvolveInventory_ID)
          .input('EvolveInventory_QtyOnHand',Evolve.Sql.NVarChar,data.palletDetails.EvolveProdOrdersDetail_Qty)
          .input('EvolveInventory_SecondaryUomQty',Evolve.Sql.NVarChar,data.palletDetails.EvolveInventory_SecondaryUomQty)
          .input("EvolveInventory_PalletNotes", Evolve.Sql.NVarChar, data.palletDetails.EvolveInventory_PalletNotes)
          .input("EvolveInventory_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
          .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveInventory SET EvolveCompany_ID=@EvolveCompany_ID ,  EvolveUnit_ID=@EvolveUnit_ID ,EvolveInventory_QtyOnHand=@EvolveInventory_QtyOnHand ,EvolveInventory_SecondaryUomQty=@EvolveInventory_SecondaryUomQty ,EvolveInventory_PalletNotes=@EvolveInventory_PalletNotes ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt  WHERE EvolveInventory_ID=@EvolveInventory_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2774: Error while update inventory "+error.message);
          return new Error(" EERR2774: Error while update inventory "+error.message);
      }

    },
    getTransTypeID :  async function (EvolveTranstype_Code) {
      try {
        return await Evolve.SqlPool.request()
        .input("EvolveTranstype_Code", Evolve.Sql.NVarChar, EvolveTranstype_Code)
        .query("SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_Code = @EvolveTranstype_Code ORDER BY EvolveTransHistory_ID DESC");
      } catch (error) {
        Evolve.Log.error(" EERR2775: Error while getting Trans Type ID "+error.message);
        return new Error(" EERR2775: Error while getting Trans Type ID "+error.message);
      }
      },
    // checkPallet : async function (data) {
    //   try {
    //     return await Evolve.SqlPool.request()
    //     .input('EvolveInventory_RefNumber',Evolve.Sql.NVarChar,data.EvolveInventory_RefNumber)
    //     .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
    //     .input('EvolveLocation_ID',Evolve.Sql.Int,data.EvolveLocation_ID)
    //     .query("SELECT einv.*  , esb.EvolveSubItem_SubItem_ID ,esb.EvolveSubItem_ActualItemID  FROM  EvolveSchedulingBom epob LEFT JOIN EvolveSubItem esb ON epob.EvolveSchedulingBom_CompItem_ID = esb.EvolveSubItem_ActualItemID  INNER JOIN EvolveInventory einv ON (einv.EvolveItem_ID = epob.EvolveSchedulingBom_CompItem_ID OR einv.EvolveItem_ID = esb.EvolveSubItem_SubItem_ID)  WHERE epob.EvolveWoSchedule_ID = @EvolveWoSchedule_ID AND einv.EvolveInventory_PostingStatus ='ERPPOSTED'   AND einv.EvolveInventory_Status = 'GOOD' AND einv.EvolveLocation_ID=@EvolveLocation_ID AND  einv.EvolveInventory_RefNumber=@EvolveInventory_RefNumber")
    //   } catch (error) {
    //       Evolve.Log.error(" EERR2776: Error while check pallet "+error.message);
    //       return new Error(" EERR2776: Error while check pallet "+error.message);
    //   }
    // },
    changeInvPalletStatus :  async function (data) {
      try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
          return await Evolve.SqlPool.request()
          .input('EvolveCompany_ID',Evolve.Sql.NVarChar,data.EvolveCompany_ID)
          .input('EvolveInventory_QtyOnHand',Evolve.Sql.NVarChar,0)
          .input('EvolveUnit_ID',Evolve.Sql.NVarChar,data.EvolveUnit_ID)
          .input('EvolveInventory_ID',Evolve.Sql.NVarChar,data.EvolveInventory_ID)
          .input('EvolveWoSchedule_OrderID',Evolve.Sql.Int,data.EvolveWoSchedule_OrderID)
          .input('EvolveLocation_ID',Evolve.Sql.Int,data.EvolveLocation_ID)
          .input('EvolveInventory_Status',Evolve.Sql.NVarChar,'WOISSUED')
          .input("EvolveInventory_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
          .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveInventory SET EvolveCompany_ID=@EvolveCompany_ID ,  EvolveInventory_QtyOnHand=@EvolveInventory_QtyOnHand , EvolveUnit_ID=@EvolveUnit_ID  ,EvolveInventory_Status=@EvolveInventory_Status ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt,EvolveWoSchedule_OrderID=@EvolveWoSchedule_OrderID ,EvolveLocation_ID=@EvolveLocation_ID  WHERE EvolveInventory_ID=@EvolveInventory_ID")
      } catch (error) {
        Evolve.Log.error(" EERR2777: Error while update pallet status "+error.message);
          return new Error(" EERR2777: Error while update pallet status "+error.message);
      }
    },
    getTsShiftList : async function (data) {
      try {

          return await Evolve.SqlPool.request()
          .input('EvolveMachine_ID',Evolve.Sql.Int,data.EvolveMachine_ID)
          .query("  SELECT  EvolveMachineCalendar_ID , EvolveMachine_ID , convert(varchar, EvolveMachineCalendar_Date, 23) as EvolveMachineCalendar_Date ,convert(varchar, EvolveMachineCalendar_Date, 103) as calendarDate ,  EvolveMachineCalendar_Shift1 ,convert(varchar, EvolveMachineCalendar_Shift1StartTime, 24) as  EvolveMachineCalendar_Shift1StartTime , EvolveMachineCalendar_Shift2 ,convert(varchar, EvolveMachineCalendar_Shift2StartTime, 24) as EvolveMachineCalendar_Shift2StartTime , EvolveMachineCalendar_Shift3 , convert(varchar, EvolveMachineCalendar_Shift3StartTime, 24) as EvolveMachineCalendar_Shift3StartTime FROM  EvolveMachineCalendar WHERE  EvolveMachine_ID=@EvolveMachine_ID  AND EvolveMachineCalendar_IsPlanned=1 AND EvolveMachineCalendar_Date <= GETDATE() ORDER BY EvolveMachineCalendar_Date DESC ")
      } catch (error) {
          Evolve.Log.error(" EERR2778: Error while get shift list "+error.message);
          return new Error(" EERR2778: Error while get shift list "+error.message);
      }
    },
    changePalletRtsStatus : async function (data) {
      try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
          .input('EvolvePickListDetail_ID',Evolve.Sql.Int,data.EvolvePickListDetail_ID)
          .input('EvolvePickListDetail_Rts',Evolve.Sql.Bit,true)
          .input("EvolvePickListDetail_UpdateUser", Evolve.Sql.Int,data.EvolveUser_ID)
          .input('EvolvePickListDetail_UpdateAt', Evolve.Sql.NVarChar, dateTime)
          .query(" UPDATE EvolvePickListDetail SET  EvolvePickListDetail_Rts = @EvolvePickListDetail_Rts ,EvolvePickListDetail_UpdateUser=@EvolvePickListDetail_UpdateUser ,EvolvePickListDetail_UpdateAt=@EvolvePickListDetail_UpdateAt  WHERE EvolvePickListDetail_ID=@EvolvePickListDetail_ID")
        
      } catch (error) {
          Evolve.Log.error(" EERR2779: Error while update pallet rts status "+error.message);
          return new Error(" EERR2779: Error while update pallet rts status "+error.message);
      }
    },


    getRtsReasonCodeList : async function () {
      try {
        return await Evolve.SqlPool.request()
          .query("SELECT	er.EvolveReason_ID , er.EvolveReason_Name , er.EvolveReason_Type ,err.EvolveReasonRules_IsScarpReq , err.EvolveReasonRules_IsCommentsReq , err.EvolveReasonRules_IsQtyReq FROM EvolveReason er  , EvolveReasonRules err  WHERE er.EvolveReason_ID=err.EvolveReason_ID AND er.EvolveReason_IsParent = 1")
        
      } catch (error) {
          Evolve.Log.error(" EERR2780: Error while get reason code list "+error.message);
          return new Error(" EERR2780: Error while get reason code list "+error.message);
      }
    },
    getShifTName : async function (data) {
      try {
        return await Evolve.SqlPool.request()
          .query("SELECT EvolveShift_Name ,EvolveShift_ID ,  EvolveShift_Type  FROM  EvolveShift WHERE EvolveShift_Start='"+data+"'")
        
      } catch (error) {
          Evolve.Log.error(" EERR2781: Error while get shift name  "+error.message);
          return new Error(" EERR2781: Error while get shift name  "+error.message);
      }
    },
    
    getSubReasonCodeList : async function (data) {
      try {
        return await Evolve.SqlPool.request()
          .input('EvolveSubReason_ActualReason_ID',Evolve.Sql.Int,data.EvolveSubReason_ActualReason_ID)

          .query(" SELECT er.EvolveReason_ID , er.EvolveReason_Code ,er.EvolveReason_Name , er.EvolveReason_Type FROM EvolveSubReason esr ,EvolveReason er   WHERE esr.EvolveSubReason_ActualReason_ID=@EvolveSubReason_ActualReason_ID AND er.EvolveReason_ID=esr.EvolveSubReason_SubReason_ID")
        
      } catch (error) {
          Evolve.Log.error(" EERR2782: Error while get sub reason code list "+error.message);
          return new Error(" EERR2782: Error while get sub reason code list "+error.message);
      }
    },
    getOperatorData : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveUser_ID',Evolve.Sql.Int,data.EvolveUser_ID)

          .query("SELECT EvolveUser_Name , EvolveUser_EmailID FROM EvolveUser WHERE EvolveUser_ID=@EvolveUser_ID  ")
        
      } catch (error) {
          Evolve.Log.error(" EERR2783: Error while get operator data "+error.message);
          return new Error(" EERR2783: Error while get operator data "+error.message);
      }
    },

    addTimeSheet : async function (data) {
      try {
      return await Evolve.SqlPool.request()
            .input("EvolveProdOrders_ID", Evolve.Sql.Int,data.EvolveProdOrders_ID)
            .input("EvolveWoSchedule_ID", Evolve.Sql.Int,data.EvolveWoSchedule_ID)
            .input("EvolveActivityCode_ID", Evolve.Sql.Int,data.EvolveActivityCode_ID)
            .input("EvolveActivitySubCode_ID", Evolve.Sql.Int,data.EvolveActivitySubCode_ID)
            .input("EvolveTimesheet_Qty", Evolve.Sql.NVarChar,data.EvolveTimesheet_Qty)
            .input("EvolveTimesheet_StartDateTime", Evolve.Sql.NVarChar,data.EvolveTimesheet_StartDateTime)
            .input("EvolveTimesheet_StopDateTime", Evolve.Sql.NVarChar,data.EvolveTimesheet_StopDateTime)
            .input("EvolveTimesheet_TotalMin", Evolve.Sql.NVarChar,data.EvolveTimesheet_TotalMin)
            .input("EvolveShift_ID", Evolve.Sql.Int,data.EvolveShift_ID)
            .input("EvolveUser_ID", Evolve.Sql.Int,data.EvolveUser_ID)
            .input("EvolveScrapCode_ID", Evolve.Sql.Int,data.EvolveScrapCode_ID)
            .input("EvolveScrapSubCode_ID", Evolve.Sql.Int,data.EvolveScrapSubCode_ID)
            .input("EvolveScrapUOM", Evolve.Sql.Int,data.EvolveScrapUOM)
            .input("EvolveMachine_ID", Evolve.Sql.Int,data.EvolveMachine_ID)
            .input("EvolveTimesheet_ScrapQty", Evolve.Sql.NVarChar,data.EvolveTimesheet_ScrapQty)
            .input("EvolveTimesheet_Comments", Evolve.Sql.NVarChar,data.EvolveTimesheet_Comments)
            .input("EvolveTimesheet_WOStatus", Evolve.Sql.NVarChar,data.EvolveTimesheet_WOStatus)
            .input("EvolveTimesheet_ERPStatus", Evolve.Sql.NVarChar,data.EvolveTimesheet_ERPStatus)
            .input("EvolveTimesheet_Status", Evolve.Sql.NVarChar,'NOT APPROVED')



            .query("INSERT INTO  EvolveTimesheet (EvolveProdOrders_ID  ,EvolveWoSchedule_ID,EvolveActivityCode_ID ,EvolveActivitySubCode_ID,EvolveTimesheet_Qty,EvolveTimesheet_StartDateTime,EvolveTimesheet_StopDateTime,EvolveTimesheet_TotalMin,EvolveShift_ID,EvolveUser_ID,EvolveScrapCode_ID,EvolveScrapSubCode_ID,EvolveScrapUOM,EvolveTimesheet_ScrapQty,EvolveTimesheet_Comments ,EvolveTimesheet_WOStatus ,EvolveTimesheet_ERPStatus ,EvolveMachine_ID,EvolveTimesheet_Status) VALUES ( @EvolveProdOrders_ID,@EvolveWoSchedule_ID,@EvolveActivityCode_ID  ,@EvolveActivitySubCode_ID,@EvolveTimesheet_Qty ,@EvolveTimesheet_StartDateTime,@EvolveTimesheet_StopDateTime,@EvolveTimesheet_TotalMin,@EvolveShift_ID,@EvolveUser_ID,@EvolveScrapCode_ID,@EvolveScrapSubCode_ID,@EvolveScrapUOM,@EvolveTimesheet_ScrapQty,@EvolveTimesheet_Comments ,@EvolveTimesheet_WOStatus ,@EvolveTimesheet_ERPStatus,@EvolveMachine_ID,@EvolveTimesheet_Status)")
      } catch (error) {
          Evolve.Log.error(" EERR2784: Error while add timesheet "+error.message);
          return new Error(" EERR2784: Error while add timesheet "+error.message);
      }
    },
    getTimesheetList : async function (data) {
      try {

        return await Evolve.SqlPool.request()
        .input('startDateTime',Evolve.Sql.NVarChar,data.currentShiftData.dateTime.startDateTime)
        .input('endDateTime',Evolve.Sql.NVarChar,data.currentShiftData.dateTime.endDateTime)
        .input('EvolveMachine_ID',Evolve.Sql.Int,data.EvolveMachine_ID)
        .query("SELECT  euom.EvolveUom_Uom,    ews.EvolveWoSchedule_OrderID , ews.EvolveUOM_ID , ews.EvolveItem_ID,     ets.* , es.EvolveShift_Name ,eu.EvolveUser_Name  FROM  EvolveTimesheet ets LEFT JOIN EvolveWoSchedule ews ON  ets.EvolveWoSchedule_ID  = ews.EvolveWoSchedule_ID  LEFT JOIN EvolveShift es  ON  ets.EvolveShift_ID=es.EvolveShift_ID LEFT JOIN  EvolveUom euom ON ews.EvolveUOM_ID = euom.EvolveUom_ID LEFT JOIN EvolveUser eu ON ets.EvolveUser_ID=eu.EvolveUser_ID   WHERE  EvolveTimesheet_StartDateTime>=@startDateTime AND EvolveTimesheet_StopDateTime<=@endDateTime  AND ets.EvolveMachine_ID=@EvolveMachine_ID  ORDER BY EvolveTimesheet_StartDateTime")
        
      } catch (error) {
          Evolve.Log.error(" EERR2785: Error while get timesheet list "+error.message);
          return new Error(" EERR2785: Error while get timesheet list "+error.message);
      }
    },
    deleteTimeSheet : async function (deleteSheetId) {
      try {  
          return await Evolve.SqlPool.request()
          .input('EvolveTimesheet_ID',Evolve.Sql.Int,deleteSheetId)
          .query("DELETE FROM  EvolveTimesheet WHERE EvolveTimesheet_ID=@EvolveTimesheet_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2786: Error while delete timesheet "+error.message);
          return new Error(" EERR2786: Error while delete timesheet "+error.message);
      }
    },
    updateSheetOnDelete : async function (data ,EvolveUser_ID) {
      try {  

          return await Evolve.SqlPool.request()
          .input('EvolveTimesheet_ID',Evolve.Sql.Int,data.EvolveTimesheet_ID)
          .input('EvolveUser_ID',Evolve.Sql.Int,EvolveUser_ID)
          .input('EvolveTimesheet_StopDateTime',Evolve.Sql.NVarChar,data.EvolveTimesheet_StopDateTime)
          .input("EvolveTimesheet_StartDateTime", Evolve.Sql.NVarChar,data.EvolveTimesheet_StartDateTime)
          .query("UPDATE EvolveTimesheet SET EvolveTimesheet_StartDateTime=@EvolveTimesheet_StartDateTime ,EvolveTimesheet_StopDateTime=@EvolveTimesheet_StopDateTime , EvolveUser_ID=@EvolveUser_ID WHERE  EvolveTimesheet_ID=@EvolveTimesheet_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2787: Error while update sheet on delete "+error.message);
          return new Error(" EERR2787: Error while update sheet on delete "+error.message);
      }
    },
    completeJob : async function (data) {
    try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
          .input('EvolveWoSchedule_Status',Evolve.Sql.NVarChar,'completed')
          .input('EvolveWoSchedule_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
          .input('EvolveWoSchedule_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)

          .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_Status=@EvolveWoSchedule_Status   , EvolveWoSchedule_UpdatedAt=@EvolveWoSchedule_UpdatedAt  ,EvolveWoSchedule_UpdatedUser =@EvolveWoSchedule_UpdatedUser  WHERE EvolveWoSchedule_ID=@EvolveWoSchedule_ID")
    } catch (error) {
        Evolve.Log.error(" EERR2788: Error while complete job "+error.message);
        return new Error(" EERR2788: Error while complete job "+error.message);
    }
    },
    addEditedTimeSheet : async function (data) {
      try {
      return await Evolve.SqlPool.request()
            .input("EvolveTimesheet_ID", Evolve.Sql.Int,data.EvolveTimesheet_ID)
            .input("EvolveActivityCode_ID", Evolve.Sql.Int,data.EvolveActivityCode_ID)
            .input("EvolveActivitySubCode_ID", Evolve.Sql.Int,data.EvolveActivitySubCode_ID)
            .input("EvolveTimesheet_Qty", Evolve.Sql.NVarChar,data.EvolveTimesheet_Qty)
            .input("EvolveTimesheet_StartDateTime", Evolve.Sql.NVarChar,data.EvolveTimesheet_StartDateTime)
            .input("EvolveTimesheet_StopDateTime", Evolve.Sql.NVarChar,data.EvolveTimesheet_StopDateTime)
            .input("EvolveTimesheet_TotalMin", Evolve.Sql.NVarChar,data.EvolveTimesheet_TotalMin)
            .input("EvolveUser_ID", Evolve.Sql.Int,data.EvolveUser_ID)
            .input("EvolveScrapCode_ID", Evolve.Sql.Int,data.EvolveScrapCode_ID)
            .input("EvolveScrapSubCode_ID", Evolve.Sql.Int,data.EvolveScrapSubCode_ID)
            .input("EvolveScrapUOM", Evolve.Sql.Int,data.EvolveScrapUOM)
            .input("EvolveTimesheet_ScrapQty", Evolve.Sql.NVarChar,data.EvolveTimesheet_ScrapQty)
            .input("EvolveTimesheet_Comments", Evolve.Sql.NVarChar,data.EvolveTimesheet_Comments)
            .input("EvolveTimesheet_ERPStatus", Evolve.Sql.NVarChar,data.EvolveTimesheet_ERPStatus)


            .query("UPDATE  EvolveTimesheet SET EvolveActivityCode_ID=@EvolveActivityCode_ID , EvolveActivitySubCode_ID=@EvolveActivitySubCode_ID ,EvolveTimesheet_Qty=@EvolveTimesheet_Qty ,EvolveTimesheet_StartDateTime=@EvolveTimesheet_StartDateTime , EvolveTimesheet_StopDateTime=@EvolveTimesheet_StopDateTime ,EvolveTimesheet_TotalMin=@EvolveTimesheet_TotalMin , EvolveUser_ID=@EvolveUser_ID ,  EvolveScrapCode_ID=@EvolveScrapCode_ID , EvolveScrapSubCode_ID=@EvolveScrapSubCode_ID , EvolveScrapUOM=@EvolveScrapUOM , EvolveTimesheet_ScrapQty=@EvolveTimesheet_ScrapQty ,EvolveTimesheet_Comments=@EvolveTimesheet_Comments ,  EvolveTimesheet_ERPStatus=@EvolveTimesheet_ERPStatus  WHERE  EvolveTimesheet_ID=@EvolveTimesheet_ID")
      } catch (error) {
          Evolve.Log.error(" EERR2789: Error while update timesheet "+error.message);
          return new Error(" EERR2789: Error while update timesheet "+error.message);
      }
    },
    getMachineSheduleComments : async function (data) {
      try {

        return await Evolve.SqlPool.request()
        .input('startDateTime',Evolve.Sql.NVarChar,data.currentShiftData.dateTime.startDateTime)
        .input('endDateTime',Evolve.Sql.NVarChar,data.currentShiftData.dateTime.endDateTime)
        .input('EvolveMachine_ID',Evolve.Sql.Int,data.EvolveMachine_ID)

        .query(" SELECT  convert(varchar,EvolveSchedulePubComnt_Time , 108)   as EvolveSchedulePubComnt_Time   ,  EvolveSchedulePubComnt_Msg    FROM  EvolveSchedulePubComnt  WHERE EvolveMachine_ID=@EvolveMachine_ID  AND EvolveSchedulePubComnt_Time >=@startDateTime AND EvolveSchedulePubComnt_Time<=@endDateTime ORDER BY EvolveSchedulePubComnt_Time  ")
        
      } catch (error) {
          Evolve.Log.error(" EERR2790: Error while get published comments "+error.message);
          return new Error(" EERR2790: Error while get published comments "+error.message);
      }
    },
    getLocationStatus: async function (EvolveLocation_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input("EvolveLocation_ID", Evolve.Sql.Int, EvolveLocation_ID)
        .query("SELECT  scm.EvolveStatusCodeMstr_Code  FROM  EvolveLocation el  , EvolveStatusCodeMstr scm WHERE el.EvolveStatusCodeMstr_Id = scm.EvolveStatusCodeMstr_Id AND el.EvolveLocation_ID = @EvolveLocation_ID" )
      } catch (error) {
        Evolve.Log.error(" EERR3089: Error while check get location status "+error.message);
        return new Error(" EERR3089: Error while check get location status "+error.message);
      }
    },
    getWoNumber: async function (EvolveWoSchedule_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input("EvolveWoSchedule_ID", Evolve.Sql.Int, EvolveWoSchedule_ID)
        .query("SELECT EvolveWoSchedule_OrderID  FROM  EvolveWoSchedule WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID" )
      } catch (error) {
        Evolve.Log.error(" EERR3090: Error while get wo number "+error.message);
        return new Error(" EERR3090: Error while get wo number "+error.message);
      }
    },

    getPlcDevice : async function (machineId) {
      try {
        return await Evolve.SqlPool.request()
        .input("EvolveDevice_Subscriber", Evolve.Sql.NVarChar, machineId)
        .query("select ed.* from EvolveDevice ed , EvolveDeviceType edt where ed.EvolveDeviceType_ID = edt.EvolveDeviceType_ID AND edt.EvolveDevice_Code = 'PLC' AND ed.EvolveDevice_Subscriber = @EvolveDevice_Subscriber" )
      } catch (error) {
        Evolve.Log.error(" EERR3090: Error while get wo number "+error.message);
        return new Error(" EERR3090: Error while get wo number "+error.message);
      }
    },

    getWorkorderDetailsForQextend : async function (id) {
      try {
        return await Evolve.SqlPool.request()
          .input("EvolveInventory_ID", Evolve.Sql.Int, id)
          .query(" SELECT epo.* , epod.* , convert(varchar, epod.EvolveProdOrdersDetail_CreatedAt, 23) as dateCreated , eu.EvolveUom_Uom , el.EvolveLocation_Code FROM  EvolveProdOrders epo , EvolveProdOrdersDetail epod , EvolveUom eu , EvolveLocation el WHERE epod.EvolveInventory_ID = @EvolveInventory_ID AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND eu.EvolveUom_ID = epod.EvolveUom_ID AND el.EvolveLocation_ID = epod.EvolveLocation_ID ")
      } catch (error) {
        Evolve.Log.error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
        return new Error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
      }
    },

    // getTransHistory : async function (data) {
    //   try {
    //     return await Evolve.SqlPool.request()
    //       .input("EvolveProdOrders_OrderNo", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderNo)
    //       .input("EvolveProdOrders_OrderID", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderID)
    //       .input("EvolveTransHistory_Type", Evolve.Sql.NVarChar, data.EvolveTransHistory_Type)
    //       .query(" SELECT * FROM EvolveTransHistory WHERE EvolveProdOrders_OrderNo=@EvolveProdOrders_OrderNo AND EvolveProdOrders_OrderID=@EvolveProdOrders_OrderID AND EvolveTransHistory_Type=@EvolveTransHistory_Type ORDER BY EvolveTransHistory_ID DESC")
    //   } catch (error) {
    //     Evolve.Log.error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
    //     return new Error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
    //   }
    // },


    getTransHistory : async function (data) {
      try {
        return await Evolve.SqlPool.request()
          .input("EvolveProdOrders_OrderNo", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderNo)
          .input("EvolveProdOrders_OrderID", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderID)
          .input("EvolveTransHistory_Type", Evolve.Sql.NVarChar, data.EvolveTransHistory_Type)
          .input("EvolveItem_Part", Evolve.Sql.NVarChar, data.EvolveItem_Part)
  
          .query(" SELECT eth.*, einvd.EvolveInventoryDetails_MachineSpeed, einvd.EvolveInventoryDetails_ALTUOMQTY FROM EvolveTransHistory eth, EvolveInventory einv LEFT JOIN EvolveInventoryDetails einvd ON einv.EvolveInventory_ID = einvd.EvolveInventory_ID WHERE eth.EvolveProdOrders_OrderNo=@EvolveProdOrders_OrderNo AND eth.EvolveProdOrders_OrderID=@EvolveProdOrders_OrderID AND eth.EvolveTransHistory_Type=@EvolveTransHistory_Type AND eth.EvolveItem_Part=@EvolveItem_Part AND einv.EvolveInventory_SerialNo = eth.EvolveInventory_SerialNo ORDER BY eth.EvolveTransHistory_ID DESC")
      } catch (error) {
        Evolve.Log.error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
        return new Error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
      }
    },
    getSignleTransHistory : async function (data) {
      try {
        return await Evolve.SqlPool.request()
          .input("EvolveTransHistory_ID", Evolve.Sql.Int, data.EvolveTransHistory_ID)
          .query(" SELECT eth.* FROM EvolveTransHistory eth,  WHERE eth.EvolveTransHistory_ID = @EvolveTransHistory_ID")
      } catch (error) {
        Evolve.Log.error(" EERR#### : Error While Get Single Trans History  " + error.message);
        return new Error(" EERR#### : Error While Get Single Trans History  " + error.message);
      }
    },




    // Quality Order Services - Start

    checkSameBatchQCExits : async function (data) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveInventory_BatchNo', Evolve.Sql.NVarChar, data.EvolveInventory_BatchNo)

          .query(' SELECT * FROM EvolveQCOrder WHERE EvolveInventory_BatchNo = @EvolveInventory_BatchNo ');
        } catch (error) {
          Evolve.Log.error(" EERR####: Error While Get Location  " + error.message);
          return new Error(" EERR####: Error While Get Location  " + error.message);
        }
    },

    addNewQcOrder: async function (data) {
      try {
          let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
          return await Evolve.SqlPool.request()
              .input('EvolveInventory_BatchNo', Evolve.Sql.NVarChar, data.EvolveInventory_BatchNo)
              .input('EvolveQCOrder_Num', Evolve.Sql.NVarChar, data.EvolveQCOrder_Num)
              .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
              .input('EvolveQCOrder_Status', Evolve.Sql.NVarChar, 'PENDING')
              .input('EvolveQCOrder_Type', Evolve.Sql.NVarChar, 'WO')
              .input('EvolveQCOrder_CreatedAt', Evolve.Sql.NVarChar, datetime)
              .input('EvolveQCOrder_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
              .input('EvolveQCOrder_UpdatedAt', Evolve.Sql.NVarChar, datetime)
              .input('EvolveQCOrder_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

              .query('INSERT INTO EvolveQCOrder (EvolveInventory_BatchNo , EvolveQCOrder_Num , EvolveUnit_ID , EvolveQCOrder_Status , EvolveQCOrder_Type , EvolveQCOrder_CreatedAt , EvolveQCOrder_CreatedUser , EvolveQCOrder_UpdatedAt , EvolveQCOrder_UpdatedUser) VALUES (@EvolveInventory_BatchNo , @EvolveQCOrder_Num , @EvolveUnit_ID , @EvolveQCOrder_Status , @EvolveQCOrder_Type , @EvolveQCOrder_CreatedAt , @EvolveQCOrder_CreatedUser , @EvolveQCOrder_UpdatedAt , @EvolveQCOrder_UpdatedUser) ; select @@IDENTITY AS \'inserted_id\'');

      } catch (error) {

          Evolve.Log.error(" EERR####: Error While Get Location  " + error.message);
          return new Error(" EERR####: Error While Get Location  " + error.message);
      }
  },

  addNewQcOrderDetails: async function (data) {
      try {
          let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
          return await Evolve.SqlPool.request()
              .input('EvolveQCOrder_ID', Evolve.Sql.Int, data.EvolveQCOrder_ID)
              .input('EvolveInventory_SerialNo', Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
              .input('EvolveQCOrderDetails_OriginalQty', Evolve.Sql.NVarChar, data.EvolveInventory_QtyAvailable)
              .input('EvolveQCOrderDetails_AcceptedQty', Evolve.Sql.NVarChar, data.EvolveInventory_QtyAvailable)
              .input('EvolveQCOrderDetails_RejectedQty', Evolve.Sql.NVarChar, '0.00')
              .input('EvolveQCOrderDetails_SampleQty', Evolve.Sql.NVarChar, '0.00')
              .input('EvolveQCOrderDetails_DestroyedQty', Evolve.Sql.NVarChar, '0.00')
              .input('EvolveQCOrderDetails_IsQcPerformed', Evolve.Sql.Bit, 0)
              .input('EvolveUnit_ID', Evolve.Sql.NVarChar, data.EvolveUnit_ID)
              .input('EvolveQCOrderDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
              .input('EvolveQCOrderDetails_CreatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
              .input('EvolveQCOrderDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
              .input('EvolveQCOrderDetails_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
              

              .query('INSERT INTO EvolveQCOrderDetails (EvolveQCOrder_ID , EvolveInventory_SerialNo , EvolveUnit_ID , EvolveQCOrderDetails_OriginalQty , EvolveQCOrderDetails_AcceptedQty , EvolveQCOrderDetails_RejectedQty , EvolveQCOrderDetails_SampleQty , EvolveQCOrderDetails_DestroyedQty , EvolveQCOrderDetails_IsQcPerformed , EvolveQCOrderDetails_CreatedAt , EvolveQCOrderDetails_CreatedUser , EvolveQCOrderDetails_UpdatedAt , EvolveQCOrderDetails_UpdatedUser) VALUES (@EvolveQCOrder_ID , @EvolveInventory_SerialNo , @EvolveUnit_ID , @EvolveQCOrderDetails_OriginalQty , @EvolveQCOrderDetails_AcceptedQty , @EvolveQCOrderDetails_RejectedQty , @EvolveQCOrderDetails_SampleQty , @EvolveQCOrderDetails_DestroyedQty , @EvolveQCOrderDetails_IsQcPerformed , @EvolveQCOrderDetails_CreatedAt , @EvolveQCOrderDetails_CreatedUser , @EvolveQCOrderDetails_UpdatedAt , @EvolveQCOrderDetails_UpdatedUser)');

      } catch (error) {

          Evolve.Log.error(" EERR####: Error While Get Location  " + error.message);
          return new Error(" EERR####: Error While Get Location  " + error.message);
      }
  },

  updateQcOrderStatus : async function (data) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
          .input('EvolveQCOrder_ID', Evolve.Sql.Int, data.EvolveQCOrder_ID)
          .input('EvolveQCOrder_Status', Evolve.Sql.NVarChar, 'PENDING')
          .input('EvolveQCOrder_UpdatedAt', Evolve.Sql.NVarChar, datetime)
          .input('EvolveQCOrder_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

          .query('UPDATE EvolveQCOrder SET EvolveQCOrder_Status = @EvolveQCOrder_Status , EvolveQCOrder_UpdatedAt = @EvolveQCOrder_UpdatedAt , EvolveQCOrder_UpdatedUser = @EvolveQCOrder_UpdatedUser WHERE EvolveQCOrder_ID = @EvolveQCOrder_ID');

  } catch (error) {

      Evolve.Log.error(" EERR####: Error While Get Location  " + error.message);
      return new Error(" EERR####: Error While Get Location  " + error.message);
  }
  },
  getUnitCode : async function (EvolveUnit_ID) {
    try {
      return await Evolve.SqlPool.request()
          .input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)
          .query("SELECT * FROM EvolveUnit WHERE EvolveUnit_ID = @EvolveUnit_ID");
    } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Unit  " + error.message);
        return new Error(" EERR####: Error While Get Unit  " + error.message);
    }
  },
  getLocationCode : async function (EvolveLocation_ID) {
    try {
      return await Evolve.SqlPool.request()
          .input('EvolveLocation_ID', Evolve.Sql.Int, EvolveLocation_ID)
          .query("SELECT * FROM EvolveLocation WHERE EvolveLocation_ID = @EvolveLocation_ID");
    } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get EvolveLocation  " + error.message);
        return new Error(" EERR####: Error While Get EvolveLocation  " + error.message);
    }
  },
  checkInventoryPallet : async function (data){
    try {

      console.log("data.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_ID" , data.EvolveItem_ID)
        return await Evolve.SqlPool.request()
          .input("EvolveInventory_SerialNo", Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
          .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)

          .query("SELECT eloc.EvolveLocation_Code ,  ei.EvolveItem_Part  ,  einv.EvolveInventory_Status , einv.EvolveInventory_ID , einv.EvolveUnit_ID , einv.EvolveItem_ID , einv.EvolveLocation_ID ,  einv.EvolveInventory_BatchNo ,einv.EvolveInventory_Pallet ,einv.EvolveInventory_SerialNo ,  einv.EvolveInventory_LotSerialNo , einv.EvolveInventory_QtyAvailable FROM  EvolveInventory einv  LEFT JOIN EvolveItem ei ON einv.EvolveItem_ID = ei.EvolveItem_ID LEFT JOIN EvolveLocation eloc ON einv.EvolveLocation_ID = eloc.EvolveLocation_ID  WHERE einv.EvolveInventory_SerialNo=@EvolveInventory_SerialNo AND ei.EvolveItem_ID = @EvolveItem_ID")
      } catch (error) {
        Evolve.Log.error(" EERR####: Erorr while Check Inventory " + error.message);
        return new Error(" EERR####: Erorr while Check Inventory " + error.message);
      }
  },
  updateInventory: async function ( data) {
    try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveInventory_SerialNo", Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
        .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
        .input("EvolveInventory_QtyAvailable", Evolve.Sql.NVarChar, data.qty)
        .input("EvolveInventory_QtyIssued", Evolve.Sql.NVarChar, data.qty)

 

        .query("UPDATE EvolveInventory SET EvolveInventory_QtyAvailable=EvolveInventory_QtyAvailable - @EvolveInventory_QtyAvailable  ,  EvolveInventory_QtyIssued=EvolveInventory_QtyIssued + @EvolveInventory_QtyIssued ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt  WHERE EvolveInventory_SerialNo=@EvolveInventory_SerialNo")

    } catch (error) {
      Evolve.Log.error(" EERR1781: Error while update inventory " + error.message);
      return new Error(" EERR1781: Error while update inventory " + error.message);
    }
  },

  
  getInvList : async function (data){
    try {
        return await Evolve.SqlPool.request()
          .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
          .query("SELECT ei.EvolveItem_Part  ,  einv.EvolveInventory_Status , einv.EvolveInventory_ID , einv.EvolveUnit_ID , einv.EvolveItem_ID , einv.EvolveLocation_ID ,  einv.EvolveInventory_BatchNo ,einv.EvolveInventory_Pallet ,einv.EvolveInventory_SerialNo ,  einv.EvolveInventory_LotSerialNo , einv.EvolveInventory_QtyAvailable FROM  EvolveInventory einv  LEFT JOIN EvolveItem ei ON einv.EvolveItem_ID = ei.EvolveItem_ID  WHERE einv.EvolveInventory_QtyAvailable>0 AND ei.EvolveItem_ID = @EvolveItem_ID ORDER BY  EvolveInventory_CreatedAt ASC")
      } catch (error) {
        Evolve.Log.error(" EERR####: Erorr while Check Inventory " + error.message);
        return new Error(" EERR####: Erorr while Check Inventory " + error.message);
      }
  },

  getProductQuality : async function (){
    try {
        return await Evolve.SqlPool.request()
          // .input("EvolveItem_Part", Evolve.Sql.NVarChar, '%'+data.EvolveItem_Part+"-"+'%')
          .query("SELECT  EvolveProductQuality_Name , EvolveProductQuality_Code , EvolveProductQuality_Sequence FROM  EvolveProductQuality")
      } catch (error) {
        Evolve.Log.error(" EERR####: Erorr while get product Quality " + error.message);
        return new Error(" EERR####: Erorr while get product Quality " + error.message);
      }
  },
  getUOMDetails : async function (EvolveUom_Uom){
    try {
        return await Evolve.SqlPool.request()
          .input("EvolveUom_Uom", Evolve.Sql.NVarChar, EvolveUom_Uom)
          .query("SELECT  * FROM  EvolveUom WHERE EvolveUom_Uom = @EvolveUom_Uom")
      } catch (error) {
        Evolve.Log.error(" EERR####: Erorr while get Uom " + error.message);
        return new Error(" EERR####: Erorr while get Uom " + error.message);
      }
  },
  GetPrinterByMachine : async function (EvolveMachine_ID){
    try {
        return await Evolve.SqlPool.request()
          .input("EvolveMachine_ID", Evolve.Sql.Int, EvolveMachine_ID)
          .query("SELECT ep.EvolvePrinter_Code FROM EvolvePrinter ep, EvolveMachine em WHERE em.EvolveMachine_ID = @EvolveMachine_ID AND em.EvolvePrinter_ID = ep.EvolvePrinter_ID")
      } catch (error) {
        Evolve.Log.error(" EERR####: Erorr while get Print Code " + error.message);
        return new Error(" EERR####: Erorr while get Print Code " + error.message);
      }
  },
    
    
    // Quality Order Services - End




      





}
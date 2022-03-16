        'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    
    getMachineList : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT *  FROM EvolveMachine WHERE EvolveSection_ID='+data.EvolveSection_ID);
        } catch (error) {
            Evolve.Log.error("EERR2947 : Error while get machine list "+error.message);
            return new Error("EERR2947 : Error while get machine list "+error.message);
        }
    },

    getSectionList : async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT *  FROM EvolveSection');
        } catch (error) {
            Evolve.Log.error("EERR2948 : Error while get section list "+error.message);
            return new Error("EERR2948 : Error while get section list "+error.message);
        }
    },
    getSubReasonCodeList : async function (data) {
      try {
       return await Evolve.SqlPool.request()
         .input('EvolveSubReason_ActualReason_ID',Evolve.Sql.Int,data.EvolveSubReason_ActualReason_ID)

          .query(" SELECT er.EvolveReason_ID , er.EvolveReason_Code ,er.EvolveReason_Name , er.EvolveReason_Type FROM EvolveSubReason esr ,EvolveReason er   WHERE esr.EvolveSubReason_ActualReason_ID=@EvolveSubReason_ActualReason_ID AND er.EvolveReason_ID=esr.EvolveSubReason_SubReason_ID")
        
      } catch (error) {
            Evolve.Log.error("EERR2949 : Error while get sub reason code list "+error.message);
            return new Error("EERR2949 : Error while get sub reason code list "+error.message);
      }
    },
    getRtsReasonCodeList : async function () {
      try {
       return await Evolve.SqlPool.request()
          .query("SELECT	er.EvolveReason_ID , er.EvolveReason_Name , er.EvolveReason_Type ,err.EvolveReasonRules_IsScarpReq , err.EvolveReasonRules_IsCommentsReq , err.EvolveReasonRules_IsQtyReq FROM EvolveReason er  , EvolveReasonRules err  WHERE er.EvolveReason_ID=err.EvolveReason_ID AND er.EvolveReason_IsParent = 1")
        
      } catch (error) {
        Evolve.Log.error("EERR2950 : Error while get reason code list "+error.message);
        return new Error("EERR2950 : Error while get reason code list "+error.message);
      }
    },
    getTimesheetList : async function (data) {
        try {
          let condition  ='';
          if(data.dateRang[0] != "" && data.dateRang[1] != ""){
            let dt = data.dateRang[0].split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                dt = data.dateRang[1].split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];
            condition = condition + " AND  cast(EvolveTimesheet_StartDateTime as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveTimesheet_StopDateTime as date) <= FORMAT(getDate(), '" + endDate + "')"

          }
        return await Evolve.SqlPool.request()
         .input('EvolveMachine_ID',Evolve.Sql.Int,data.EvolveMachine_ID)
         .query("SELECT   euom.EvolveUom_Uom,    ews.EvolveWoSchedule_OrderID , ews.EvolveUOM_ID , ews.EvolveItem_ID,     ets.* , es.EvolveShift_Name  , eu.EvolveUser_Name  FROM  EvolveTimesheet ets LEFT JOIN EvolveWoSchedule ews ON  ets.EvolveWoSchedule_ID  = ews.EvolveWoSchedule_ID  LEFT JOIN EvolveShift es  ON  ets.EvolveShift_ID=es.EvolveShift_ID LEFT JOIN  EvolveUom euom ON ews.EvolveUOM_ID = euom.EvolveUom_ID LEFT JOIN EvolveUser eu ON ets.EvolveUser_ID=eu.EvolveUser_ID  WHERE  ets.EvolveMachine_ID=@EvolveMachine_ID   AND cast (EvolveTimesheet_StopDateTime  as DATE) <= cast (GETDATE() as DATE) "+condition+"   ORDER BY EvolveTimesheet_StartDateTime")
          
        } catch (error) {
         Evolve.Log.error("EERR2951 : Error while get time sheet list "+error.message);
         return new Error("EERR2951 : Error while get time sheet list "+error.message);
        }
    },
    onTimeSheetApprove : async function (data) {
        try {
        return await Evolve.SqlPool.request()
         .input('EvolveTimesheet_ID',Evolve.Sql.Int,data.EvolveTimesheet_ID)
         .query("UPDATE EvolveTimesheet set  EvolveTimesheet_Status='APPROVED' WHERE EvolveTimesheet_ID=@EvolveTimesheet_ID")
          
        } catch (error) {
         Evolve.Log.error("EERR2952 : Error while approve sheet "+error.message);
            return new Error("EERR2952 : Error while approve sheet "+error.message);
        }
    },
    onTsPostToErp : async function (EvolveTimesheet_ID) {
        try {
              return await Evolve.SqlPool.request()
            .input('EvolveTimesheet_ID',Evolve.Sql.Int,EvolveTimesheet_ID)
            .query("UPDATE EvolveTimesheet set  EvolveTimesheet_ERPStatus='ERPPOSTED' WHERE EvolveTimesheet_ID=@EvolveTimesheet_ID")
          
        } catch (error) {
         Evolve.Log.error("EERR2953 : Error while post to erp "+error.message);
            return new Error("EERR2953 : Error while post to erp "+error.message);
        }
    },
    deleteTimeSheet : async function (deleteSheetId) {
        try {  
            return await Evolve.SqlPool.request()
            .input('EvolveTimesheet_ID',Evolve.Sql.Int,deleteSheetId)
            .query("DELETE FROM  EvolveTimesheet WHERE EvolveTimesheet_ID=@EvolveTimesheet_ID")
        } catch (error) {
         Evolve.Log.error("EERR2954 : Error while delete timesheet "+error.message);
            return new Error("EERR2954 : Error while delete timesheet "+error.message);
        }
    },
    updateSheetOnDelete : async function (data ,EvolveUser_ID) {
      try { 
          return await Evolve.SqlPool.request()
          .input('EvolveTimesheet_ID',Evolve.Sql.Int,data.EvolveTimesheet_ID)
          .input('EvolveUser_ID',Evolve.Sql.Int,EvolveUser_ID)
          .input('EvolveTimesheet_StopDateTime',Evolve.Sql.NVarChar,data.EvolveTimesheet_StopDateTime)
          .input("EvolveTimesheet_StartDateTime", Evolve.Sql.NVarChar,data.EvolveTimesheet_StartDateTime)
          .input("EvolveTimesheet_Status", Evolve.Sql.NVarChar,'NOT APPROVED')


          .query("UPDATE EvolveTimesheet SET EvolveTimesheet_StartDateTime=@EvolveTimesheet_StartDateTime ,EvolveTimesheet_StopDateTime=@EvolveTimesheet_StopDateTime , EvolveUser_ID=@EvolveUser_ID , EvolveTimesheet_Status=@EvolveTimesheet_Status WHERE  EvolveTimesheet_ID=@EvolveTimesheet_ID")
      } catch (error) {
        Evolve.Log.error("EERR2955 : Error while update timesheet "+error.message);
          return new Error("EERR2955 : Error while update timesheet "+error.message);
      }
    },
    getOperatorData : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveUser_ID',Evolve.Sql.Int,data.EvolveUser_ID)

          .query("SELECT EvolveUser_Name , EvolveUser_EmailID FROM EvolveUser WHERE EvolveUser_ID=@EvolveUser_ID  ")
        
      } catch (error) {
        Evolve.Log.error("EERR2956 : Error while get operator data "+error.message);
          return new Error("EERR2956 : Error while get operator data "+error.message);
      }
    },
    getWoList : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveMachine_ID',Evolve.Sql.Int,data.EvolveMachine_ID)
        .query(" SELECT EvolveWoSchedule_ID ,EvolveWoSchedule_OrderID  FROM EvolveWoSchedule WHERE EvolveMachine_ID=@EvolveMachine_ID  AND EvolveWoSchedule_Status= 'published' AND EvolveWoSchedule_IsDownTime = 0  ")
        
      } catch (error) {
        Evolve.Log.error("EERR2957 : Error while get wo list "+error.message);
          return new Error("EERR2957 : Error while get wo list "+error.message);
      }
    },
    getWoDetails : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
        .query("  SELECT ews.EvolveProdOrders_ID ,ews.EvolveWoSchedule_Status , ews.EvolveItem_ID  , ews.EvolveUOM_ID , euom.EvolveUom_Uom  FROM  EvolveWoSchedule ews , EvolveUom euom WHERE ews.EvolveWoSchedule_ID=@EvolveWoSchedule_ID AND ews.EvolveUOM_ID=euom.EvolveUom_ID    ")
        
      } catch (error) {
          Evolve.Log.error("EERR2958 : Error while get wo details "+error.message);
          return new Error("EERR2958 : Error while get wo details "+error.message);
      }
    }, 
    getTsShiftList : async function (data) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveMachine_ID',Evolve.Sql.Int,data.EvolveMachine_ID)
          .query("  SELECT  EvolveMachineCalendar_ID , EvolveMachine_ID , convert(varchar, EvolveMachineCalendar_Date, 23) as EvolveMachineCalendar_Date ,convert(varchar, EvolveMachineCalendar_Date, 103) as calendarDate ,  EvolveMachineCalendar_Shift1 ,convert(varchar, EvolveMachineCalendar_Shift1StartTime, 24) as  EvolveMachineCalendar_Shift1StartTime , EvolveMachineCalendar_Shift2 ,convert(varchar, EvolveMachineCalendar_Shift2StartTime, 24) as EvolveMachineCalendar_Shift2StartTime , EvolveMachineCalendar_Shift3 , convert(varchar, EvolveMachineCalendar_Shift3StartTime, 24) as EvolveMachineCalendar_Shift3StartTime FROM  EvolveMachineCalendar WHERE  EvolveMachine_ID=@EvolveMachine_ID  AND EvolveMachineCalendar_IsPlanned=1 AND EvolveMachineCalendar_Date <= GETDATE() ORDER BY EvolveMachineCalendar_Date DESC ")
      } catch (error) {
          Evolve.Log.error("EERR2959 : Error while get shift list "+error.message);
          return new Error("EERR2959 : Error while get shift list "+error.message);
      }
    },
    getShifTName : async function (data) {
      try {
        return await Evolve.SqlPool.request()
          .query("SELECT EvolveShift_Name ,EvolveShift_ID ,  EvolveShift_Type  FROM  EvolveShift WHERE EvolveShift_Start='"+data+"'")
        
      } catch (error) {
          Evolve.Log.error("EERR2960 : Error while get shift name "+error.message);
          return new Error("EERR2960 : Error while get shift name "+error.message);
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
          Evolve.Log.error("EERR2961 : Error while add timesheet "+error.message);
          return new Error("EERR2961 : Error while add timesheet "+error.message);
      }
    },
    getWoItemSecUomList : async function (data) {
      
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveItem_ID',Evolve.Sql.Int,data.EvolveItem_ID)
          .input('EvolveUom_ID',Evolve.Sql.Int,data.EvolveUom_ID)
          .query(" SELECT uomconv.EvolveItem_ID, uomconv.EvolveUom_ID,  uomconv.EvolveUomConv_AlternateUom_ID  , uomconv.EvolveUomConv_Conversion , uom.EvolveUom_Uom FROM  EvolveUomConv uomconv , EvolveUom uom  WHERE uomconv.EvolveUom_ID=@EvolveUom_ID AND EvolveItem_ID=@EvolveItem_ID AND uomconv.EvolveUomConv_AlternateUom_ID = uom.EvolveUom_ID")
      } catch (error) {
          Evolve.Log.error("EERR2962 : Error while get item's secondary uom list "+error.message);
          return new Error("EERR2962 : Error while get item's secondary uom list "+error.message);
      }
    },
    addEditedTimeSheet : async function (data) {
      try {
      return await Evolve.SqlPool.request()
            .input("EvolveWoSchedule_ID", Evolve.Sql.Int,data.EvolveWoSchedule_ID)
            .input("EvolveProdOrders_ID", Evolve.Sql.Int,data.EvolveProdOrders_ID)
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
            .input("EvolveTimesheet_WOStatus", Evolve.Sql.NVarChar,data.EvolveTimesheet_WOStatus)
            .input("EvolveTimesheet_ERPStatus", Evolve.Sql.NVarChar,data.EvolveTimesheet_ERPStatus)
            .input("EvolveTimesheet_Status", Evolve.Sql.NVarChar,'NOT APPROVED')
            .query("UPDATE  EvolveTimesheet SET EvolveWoSchedule_ID=@EvolveWoSchedule_ID ,EvolveProdOrders_ID=@EvolveProdOrders_ID ,EvolveTimesheet_WOStatus=@EvolveTimesheet_WOStatus, EvolveActivityCode_ID=@EvolveActivityCode_ID ,EvolveTimesheet_Status=@EvolveTimesheet_Status, EvolveActivitySubCode_ID=@EvolveActivitySubCode_ID ,EvolveTimesheet_Qty=@EvolveTimesheet_Qty ,EvolveTimesheet_StartDateTime=@EvolveTimesheet_StartDateTime , EvolveTimesheet_StopDateTime=@EvolveTimesheet_StopDateTime ,EvolveTimesheet_TotalMin=@EvolveTimesheet_TotalMin , EvolveUser_ID=@EvolveUser_ID ,  EvolveScrapCode_ID=@EvolveScrapCode_ID , EvolveScrapSubCode_ID=@EvolveScrapSubCode_ID , EvolveScrapUOM=@EvolveScrapUOM , EvolveTimesheet_ScrapQty=@EvolveTimesheet_ScrapQty ,EvolveTimesheet_Comments=@EvolveTimesheet_Comments ,  EvolveTimesheet_ERPStatus=@EvolveTimesheet_ERPStatus  WHERE  EvolveTimesheet_ID=@EvolveTimesheet_ID")
      } catch (error) {
          Evolve.Log.error("EERR2963 : Error while update timesheet "+error.message);
          return new Error("EERR2963 : Error while update timesheet "+error.message);
      }
    },
    getTsDetails : async function (data) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
          .query("   SELECT (SELECT SUM (ets.EvolveTimesheet_Qty) FROM EvolveTimesheet ets WHERE ets.EvolveWoSchedule_ID=@EvolveWoSchedule_ID) as tsQty , ews.EvolveItem_ID  , ews.EvolveWoSchedule_OrderQty ,ews.EvolveWoSchedule_CompletedQty,ei.EvolveItem_Code ,ei.EvolveItem_Desc ,euom.EvolveUom_Uom FROM  EvolveWoSchedule ews , EvolveItem ei ,EvolveUom euom WHERE EvolveWoSchedule_ID=@EvolveWoSchedule_ID AND ews.EvolveItem_ID=ei.EvolveItem_ID AND ews.EvolveUOM_ID=euom.EvolveUom_ID")
      } catch (error) {
          Evolve.Log.error("EERR2964 : Error while get time sheet details "+error.message);
          return new Error("EERR2964 : Error while get time sheet details "+error.message);
      }
    },
    getWcWOList : async function (data) {
      try {  
          return await Evolve.SqlPool.request()
          .input('EvolveMachine_ID',Evolve.Sql.Int,data.EvolveMachine_ID)
          .query(" SELECT EvolveWoSchedule_ID ,EvolveWoSchedule_OrderID  FROM EvolveWoSchedule WHERE EvolveMachine_ID=@EvolveMachine_ID  AND (EvolveWoSchedule_Status= 'published'  OR EvolveWoSchedule_Status= 'completed' ) AND EvolveWoSchedule_IsDownTime = 0  ")
      } catch (error) {
          Evolve.Log.error("EERR2965 : Error while wo list "+error.message);
          return new Error("EERR2965 : Error while wo list "+error.message);
      }
    },
    getWcDetails : async function (data) {
      try { 
            let condition ='';
            if(data.EvolveSection_ID != '' &&  data.EvolveMachine_ID == ''){
            return await Evolve.SqlPool.request()
              .input('EvolveSection_ID',Evolve.Sql.Int,data.EvolveSection_ID)
              .query("   SELECT  'false' as woSelected,'false' as newPallet ,'false' as woClose , ews.EvolveWoSchedule_CompletedQty ,ews.EvolveUOM_ID  ,ews.EvolveProdOrders_ID ,ei.EvolveQc_IsRequired, eloc.EvolveLocation_Name as itemLocationName  ,eloc.EvolveLocation_ID as itemLocation ,ews.EvolveWoSchedule_ID  ,ews.EvolveWoSchedule_SetupTime ,ews.EvolveWoSchedule_CycleTime , ews.EvolveWoSchedule_OrderQty , ews.EvolveWoSchedule_OrderID  ,ei.EvolveItem_ID , ei.EvolveItem_Code , ei.EvolveItem_Desc , em.EvolveMachine_Name , em.EvolveMachine_ID ,ews.EvolveWoSchedule_Status , convert(numeric(10,2) ,ABS((((ews.EvolveWoSchedule_CompletedQty-ews.EvolveWoSchedule_OrderQty)/ews.EvolveWoSchedule_OrderQty)*100))) as bookingVariace , ema.EvolveLocation_ID FROM EvolveWoSchedule   ews  ,  EvolveItem ei , EvolveMachine em ,EvolveMachineAssign ema  ,EvolveLocation eloc  WHERE ews.EvolveItem_ID =ei.EvolveItem_ID AND ews.EvolveMachine_ID=em.EvolveMachine_ID AND EvolveWoSchedule_IsDownTime =0 AND  (ews.EvolveWoSchedule_Status != 'planned' AND ews.EvolveWoSchedule_Status !='closed')  AND ews.EvolveMachine_ID = em.EvolveMachine_ID AND em.EvolveSection_ID = @EvolveSection_ID AND em.EvolveMachine_ID = ema.EvolveMachine_ID AND ema.EvolveMachineAssign_Code='LOCATION' AND ei.EvolveLocation_ID = eloc.EvolveLocation_ID")

              }else{
                if(data.EvolveWoSchedule_ID != ''){

                condition += ' AND ews.EvolveWoSchedule_ID='+data.EvolveWoSchedule_ID

              }
              return await Evolve.SqlPool.request()
              .input('EvolveMachine_ID',Evolve.Sql.Int,data.EvolveMachine_ID)
              .query("SELECT  'false' as woSelected,ews.EvolveUOM_ID, ews.EvolveWoSchedule_ID  ,ews.EvolveWoSchedule_SetupTime ,ei.EvolveQc_IsRequired,ews.EvolveProdOrders_ID, ews.EvolveWoSchedule_CycleTime ,ews.EvolveWoSchedule_OrderQty , eloc.EvolveLocation_Name as itemLocationName  ,eloc.EvolveLocation_ID as itemLocation ,ews.EvolveWoSchedule_OrderID  ,ei.EvolveItem_ID , ei.EvolveItem_Code , ei.EvolveItem_Desc , em.EvolveMachine_Name , em.EvolveMachine_ID ,ews.EvolveWoSchedule_Status , convert(numeric(10,2) ,ABS((((ews.EvolveWoSchedule_CompletedQty-ews.EvolveWoSchedule_OrderQty)/ews.EvolveWoSchedule_OrderQty)*100))) as bookingVariace  , ema.EvolveLocation_ID  FROM EvolveWoSchedule   ews  ,  EvolveItem ei , EvolveMachine em , EvolveMachineAssign ema  ,EvolveLocation eloc  WHERE ews.EvolveItem_ID =ei.EvolveItem_ID AND ews.EvolveMachine_ID=em.EvolveMachine_ID AND EvolveWoSchedule_IsDownTime =0 AND ews.EvolveMachine_ID =@EvolveMachine_ID AND (ews.EvolveWoSchedule_Status != 'planned' AND ews.EvolveWoSchedule_Status !='closed') AND ema.EvolveMachineAssign_Code = 'LOCATION' AND ews.EvolveMachine_ID = ema.EvolveMachine_ID AND ei.EvolveLocation_ID = eloc.EvolveLocation_ID "+condition)
          }
      } catch (error) {
          Evolve.Log.error("EERR2966 : Error while get wo details "+error.message);
          return new Error("EERR2966 : Error while get wo details "+error.message);
      }
    },
    getWoIssueVariance : async function (EvolveWoSchedule_ID) {
      try { 
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,EvolveWoSchedule_ID)
          .query("select  convert(numeric(10,2) ,ABS((sum(EvolveSchedulingBom_QtyIss-EvolveSchedulingBom_QtyReq)/sum(EvolveSchedulingBom_QtyReq))*100)) as issueVar FROM  EvolveSchedulingBom WHERE EvolveWoSchedule_ID=@EvolveWoSchedule_ID")
      } catch (error) {
          Evolve.Log.error("EERR2967 : Error while get issue variance "+error.message);
          return new Error("EERR2967 : Error while get issue variance "+error.message);
      }
    },
    getWoTsVariance : async function (EvolveWoSchedule_ID) {
      try { 
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,EvolveWoSchedule_ID)
          .query(" SELECT SUM(ets.EvolveTimesheet_TotalMin) as tsVar FROM EvolveTimesheet ets  WHERE  ets.EvolveWoSchedule_ID=@EvolveWoSchedule_ID  ")
      } catch (error) {
          Evolve.Log.error("EERR2968 : Error while get timesheet vaiance  "+error.message);
          return new Error("EERR2968 : Error while get timesheet vaiance  "+error.message);
      }
    },
    closeWorkOrder : async function (data) {
      try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
          .input('EvolveWoSchedule_ClosingComments',Evolve.Sql.NVarChar,data.EvolveWoSchedule_ClosingComments)
          .input('EvolveWoSchedule_UpdatedAt',Evolve.Sql.NVarChar,dateTime)
          .input('EvolveWoSchedule_UpdatedUser',Evolve.Sql.Int,data.EvolveUser_ID)
          .query("UPDATE EvolveWoSchedule SET  EvolveWoSchedule_ClosingComments=@EvolveWoSchedule_ClosingComments , EvolveWoSchedule_UpdatedAt = @EvolveWoSchedule_UpdatedAt  ,EvolveWoSchedule_UpdatedUser=@EvolveWoSchedule_UpdatedUser, EvolveWoSchedule_Status='closed' WHERE EvolveWoSchedule_ID=@EvolveWoSchedule_ID ")
      } catch (error) {
          Evolve.Log.error("EERR2969 : Error while closing work order "+error.message);
          return new Error("EERR2969 : Error while closing work order "+error.message);
      }
    },
    getIssuedSummary : async function (data) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
  
          .query("SELECT  esb.EvolveSchedulingBom_ID , esb.EvolveSchedulingBom_CompItem_ID , ei.EvolveItem_Code ,ei.EvolveItem_Desc  , euom.EvolveUom_ID , euom.EvolveUom_Uom , esb.EvolveSchedulingBom_QtyReq , esb.EvolveSchedulingBom_QtyIss ,  convert(numeric(10,2) ,ABS((((esb.EvolveSchedulingBom_QtyIss-esb.EvolveSchedulingBom_QtyReq)/esb.EvolveSchedulingBom_QtyReq)*100))) as issueVar     FROM   EvolveSchedulingBom esb  ,EvolveItem ei , EvolveUom euom WHERE esb.EvolveSchedulingBom_CompItem_ID = ei.EvolveItem_ID  AND ei.EvolveUom_ID = euom.EvolveUom_ID AND esb.EvolveWoSchedule_ID=@EvolveWoSchedule_ID")
      } catch (error) {
          Evolve.Log.error("EERR2970 : Error while get issue summary "+error.message);
          return new Error("EERR2970 : Error while get issue summary "+error.message);
      }
    },
    getBookedPalletCount : async function (data) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
            .query(" SELECT count(EvolveProdOrdersDetail_ID) as bookedPallet FROM  EvolveProdOrdersDetail epod , EvolveInventory einv WHERE epod.EvolveInventory_ID = einv.EvolveInventory_ID AND einv.EvolveInventory_PostingStatus='ERPPOSTED' AND epod.EvolveWoSchedule_ID =@EvolveWoSchedule_ID")
      } catch (error) {
          Evolve.Log.error("EERR2971 : Error while get booked pallet count "+error.message);
          return new Error("EERR2971 : Error while get booked pallet count "+error.message);
      }
    },
    getunBookedPalletCount : async function (data) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
            .query(" SELECT count(EvolveProdOrdersDetail_ID) as unBookedPallet FROM  EvolveProdOrdersDetail epod , EvolveInventory einv WHERE epod.EvolveInventory_ID = einv.EvolveInventory_ID AND einv.EvolveInventory_PostingStatus='PENDING' AND epod.EvolveWoSchedule_ID =@EvolveWoSchedule_ID")
      } catch (error) {
          Evolve.Log.error("EERR2972 : Error while get unbooked pallet count "+error.message);
          return new Error("EERR2972 : Error while get unbooked pallet count "+error.message);
      }
    },
    getBookingSummary : async function (data) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
            .query("SELECT ews.EvolveWoSchedule_OrderQty  ,  ews.EvolveWoSchedule_CompletedQty  ,convert(numeric(10,2) ,ABS((((ews.EvolveWoSchedule_CompletedQty-ews.EvolveWoSchedule_OrderQty)/ews.EvolveWoSchedule_OrderQty)*100))) as bookingVariance , euom.EvolveUom_Uom  FROM  EvolveWoSchedule ews  , EvolveUom euom WHERE ews.EvolveWoSchedule_ID=@EvolveWoSchedule_ID  AND ews.EvolveUOM_ID =euom.EvolveUom_ID")
      } catch (error) {
          Evolve.Log.error("EERR2973 : Error while get booking summary "+error.message);
          return new Error("EERR2973 : Error while get booking summary "+error.message);
      }
    },
    getissuedPallets : async function (data) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
          .query("SELECT 'false' as issuedRowSelected , einv.EvolveInventory_LotNumber ,  epick.EvolvePickListDetail_Rts ,  epick.EvolvePickListDetail_ID,euom.EvolveUom_ID , euom.EvolveUom_Uom ,  epick.EvolveSubItem_SubItem_ID,  ei.EvolveItem_Code , ei.EvolveItem_Desc , einv.EvolveInventory_RefNumber ,einv.EvolveInventory_CustLotRef, epick.EvolveInventory_ID  ,einv.EvolveInventory_LotNotes,  epick.EvolveItem_ID , epick.EvolveLocation_ID , epick.EvolvePickListDetail_IssQty ,  convert(varchar, epick.EvolvePickListDetail_CreatedAt, 103)  as EvolvePickListDetail_CreatedAt , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, epick.EvolvePickListDetail_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),   CONVERT(DATETIME, epick.EvolvePickListDetail_CreatedAt), 22), 3)) as time, epick.EvolvePickListDetail_CreatedUser , eu.EvolveUser_Name  FROM EvolvePickListDetail epick , EvolveInventory einv , EvolveUser eu , EvolveItem ei  ,EvolveUom euom WHERE epick.EvolveInventory_ID = einv.EvolveInventory_ID AND epick.EvolvePickListDetail_CreatedUser = eu.EvolveUser_ID AND epick.EvolveWoSchedule_ID =@EvolveWoSchedule_ID  AND epick.EvolveSubItem_SubItem_ID=ei.EvolveItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID AND epick.EvolvePickListDetail_Status='ISSUED'  ORDER BY  EvolvePickListDetail_ID DESC")
      } catch (error) {
          Evolve.Log.error("EERR2974 : Error while get issued pallets "+error.message);
          return new Error("EERR2974 : Error while get issued pallets "+error.message);
      }
    },
    getRtsLocationList: async function () {
      try {
        return await Evolve.SqlPool.request()
              .query("SELECT el.EvolveLocation_ID ,el.EvolveLocation_Name , scm.EvolveStatusCodeMstr_Code as EvolveLocation_Status  FROM  EvolveLocation el  , EvolveStatusCodeMstr scm WHERE el.EvolveStatusCodeMstr_Id = scm.EvolveStatusCodeMstr_Id AND scm.EvolveStatusCodeMstr_Code = 'GOOD' ")
      } catch (error) {
          Evolve.Log.error("EERR2975 : Error while get location list "+error.message);
          return new Error("EERR2975 : Error while get location list "+error.message);
      }
    },
    updateIssuedQty : async function (data) {
      try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
          return await Evolve.SqlPool.request()
            .input("EvolveItem_ID", Evolve.Sql.Int,data.rtsOrignalItemId)
            .input("EvolveSubItem_SubItem_ID", Evolve.Sql.Int,data.rtsItemId)
            .input("EvolveInventory_ID", Evolve.Sql.Int,data.EvolveInventory_ID)
            .input("EvolvePickListDetail_Status", Evolve.Sql.NVarChar,'ISSUED')
            .input("EvolvePickListDetail_IssQty", Evolve.Sql.NVarChar,data.qty)
            .input("EvolveLocation_ID", Evolve.Sql.Int,data.EvolveLocation_ID)
            .input("EvolveWoSchedule_ID", Evolve.Sql.Int,data.EvolveWoSchedule_ID)
            .input("EvolvePickListDetail_CreatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
            .input("EvolvePickListDetail_UpdateUser", Evolve.Sql.Int,data.EvolveUser_ID)
            .input('EvolvePickListDetail_CreatedAt', Evolve.Sql.NVarChar, dateTime)
            .input('EvolvePickListDetail_UpdateAt', Evolve.Sql.NVarChar, dateTime)
            .query("INSERT INTO  EvolvePickListDetail (EvolveItem_ID  ,EvolveSubItem_SubItem_ID,EvolveInventory_ID ,EvolvePickListDetail_IssQty,EvolveLocation_ID,EvolvePickListDetail_CreatedUser,EvolvePickListDetail_UpdateUser,EvolvePickListDetail_CreatedAt,EvolvePickListDetail_UpdateAt,EvolvePickListDetail_Status,EvolveWoSchedule_ID) VALUES ( @EvolveItem_ID,@EvolveSubItem_SubItem_ID,@EvolveInventory_ID  ,@EvolvePickListDetail_IssQty,@EvolveLocation_ID ,@EvolvePickListDetail_CreatedUser,@EvolvePickListDetail_UpdateUser,@EvolvePickListDetail_CreatedAt,@EvolvePickListDetail_UpdateAt,@EvolvePickListDetail_Status,@EvolveWoSchedule_ID)")
      } catch (error) {
          Evolve.Log.error("EERR2976 : Error while update issue qty "+error.message);
          return new Error("EERR2976 : Error while update issue qty "+error.message);
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
          Evolve.Log.error("EERR2977 : Error while update bom qty "+error.message);
          return new Error("EERR2977 : Error while update bom qty "+error.message);
      }
    },
    updateInventoryPallet : async function (data) {
      try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

          return await Evolve.SqlPool.request()
          .input('EvolveCompany_ID',Evolve.Sql.NVarChar,data.EvolveCompany_ID)
          .input('EvolveUnit_ID',Evolve.Sql.NVarChar,data.EvolveUnit_ID)
          .input('EvolveInventory_ID',Evolve.Sql.Int,data.EvolveInventory_ID)
          .input("EvolveLocation_ID", Evolve.Sql.Int,data.EvolveLocation_ID)
          .input('qty',Evolve.Sql.NVarChar,data.qty)
          .input('EvolveInventory_Status',Evolve.Sql.NVarChar,data.EvolveInventory_Status)
          .input('EvolveWoSchedule_OrderID',Evolve.Sql.Int,null)
          .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
          .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
          .query(" UPDATE EvolveInventory SET   EvolveLocation_ID=@EvolveLocation_ID ,EvolveInventory_Status=@EvolveInventory_Status ,EvolveWoSchedule_OrderID=@EvolveWoSchedule_OrderID, EvolveCompany_ID=@EvolveCompany_ID ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt ,   EvolveUnit_ID=@EvolveUnit_ID , EvolveInventory_QtyOnHand = EvolveInventory_QtyOnHand-@qty    WHERE EvolveInventory_ID=@EvolveInventory_ID")
      } catch (error) {
          Evolve.Log.error("EERR2978 : Error while update inventory "+error.message);
          return new Error("EERR2978 : Error while update inventory "+error.message);
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
          Evolve.Log.error("EERR2979 : Error while change pallet's rts status "+error.message);
          return new Error("EERR2979 : Error while change pallet's rts status "+error.message);
      }
    },
    getWcBookingSummary : async function (data) {
      try {
        
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
            .query("SELECT  'false' as isEditable ,'false' as isNewPallet ,einv.EvolveInventory_LotNotes , einv.EvolveInventory_LotNumber ,  einv.EvolveUom_ID ,einv.EvolveInventory_SecondaryUom,   einv.EvolveInventory_PostingStatus , epod.EvolveProdOrdersDetail_ID , epod.EvolveInventory_ID ,epod.EvolveProdOrdersDetail_RefNumber , epod.EvolveProdOrdersDetail_Qty , einv.EvolveInventory_SecondaryUomQty , eu.EvolveUser_Name , einv.EvolveInventory_PalletNotes , (SELECT uom.EvolveUom_Uom  FROM  EvolveUom uom  WHERE einv.EvolveUom_ID = uom.EvolveUom_ID ) as primaryUom , (SELECT uom.EvolveUom_Uom  FROM  EvolveUom uom  WHERE einv.EvolveInventory_SecondaryUom = uom.EvolveUom_ID ) as secondaryUom , emachine.EvolveMachine_Name , eloc.EvolveLocation_Name , eloc.EvolveLocation_ID , emachine.EvolveMachine_ID , convert(varchar, epod.EvolveProdOrdersDetail_CreatedAt, 103)  as palletCreatedDate , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, epod.EvolveProdOrdersDetail_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),   CONVERT(DATETIME, epod.EvolveProdOrdersDetail_CreatedAt), 22), 3)) as palletCreatedTime  FROM EvolveProdOrdersDetail epod , EvolveInventory einv , EvolveUser eu  , EvolveWoSchedule ews , EvolveMachine emachine , EvolveItem ei , EvolveLocation eloc    WHERE epod.EvolveProdOrdersDetail_CreatedUser=eu.EvolveUser_ID AND  epod.EvolveInventory_ID = einv.EvolveInventory_ID  AND epod.EvolveWoSchedule_ID = ews.EvolveWoSchedule_ID AND ews.EvolveMachine_ID = emachine.EvolveMachine_ID  AND einv.EvolveItem_ID =ei.EvolveItem_ID AND ei.EvolveLocation_ID = eloc.EvolveLocation_ID AND epod.EvolveWoSchedule_ID=@EvolveWoSchedule_ID   ORDER BY epod.EvolveProdOrdersDetail_ID ")
      } catch (error) {
          Evolve.Log.error("EERR2980 : Error while get wo booking summary "+error.message);
          return new Error("EERR2980 : Error while get wo booking summary "+error.message);
      }
    },
    getWcWoDetails : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)

        .query("  SELECT   ews.*,ema.EvolveLocation_ID   , ei.EvolveQc_IsRequired  , ei.EvolveItem_Code ,ei.EvolveLocation_ID as itemLocation, ei.EvolveItem_Desc , epo.EvolveProdOrders_WOComments ,euom.EvolveUom_Uom , eloc.EvolveLocation_Name as itemLocationName , emachine.EvolveMachine_Name  FROM EvolveWoSchedule ews ,EvolveMachineAssign ema , EvolveItem ei ,EvolveUom euom ,EvolveProdOrders epo  , EvolveLocation eloc  ,EvolveMachine emachine   WHERE  ema.EvolveMachine_ID = ews.EvolveMachine_ID AND  ema.EvolveMachineAssign_Code ='LOCATION' AND ews.EvolveItem_ID = ei.EvolveItem_ID AND ews.EvolveUOM_ID=euom.EvolveUom_ID AND ews.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveLocation_ID = eloc.EvolveLocation_ID AND ews.EvolveMachine_ID = emachine.EvolveMachine_ID AND ews.EvolveWoSchedule_ID=@EvolveWoSchedule_ID")
      } catch (error) {
          Evolve.Log.error("EERR2981 : Error while get wo details "+error.message);
          return new Error("EERR2981 : Error while get wo details "+error.message);
      }
    },
    getTimesheetSummary :async function(data){
      try {
          let error = false;
          let tsSummary = {};

          let runTime = await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
            .query("SELECT SUM(ets.EvolveTimesheet_TotalMin) as runtime from  EvolveTimesheet ets , EvolveReason er WHERE ets.EvolveWoSchedule_ID = @EvolveWoSchedule_ID  AND ets.EvolveActivityCode_ID=er.EvolveReason_ID AND er.EvolveReason_Type ='ACTIVITY'")

            if(runTime instanceof Error){
              error = true;
            }else{
                tsSummary.runTime = runTime.recordset[0].runtime;
                let downTime = await Evolve.SqlPool.request()
                .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
                .query("SELECT SUM(ets.EvolveTimesheet_TotalMin) as downtime from  EvolveTimesheet ets , EvolveReason er WHERE ets.EvolveWoSchedule_ID = @EvolveWoSchedule_ID AND ets.EvolveActivityCode_ID=er.EvolveReason_ID AND er.EvolveReason_Type ='UNPLANNED DOWNTIIME'")
                if(downTime instanceof Error){
                  error = true;
                }else{
                tsSummary.downTime = downTime.recordset[0].downtime;
                let setupTime = await Evolve.SqlPool.request()
                .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
                .query("SELECT SUM(ets.EvolveTimesheet_TotalMin) as setupTime from  EvolveTimesheet ets , EvolveReason er WHERE ets.EvolveWoSchedule_ID = @EvolveWoSchedule_ID AND ets.EvolveActivityCode_ID=er.EvolveReason_ID AND er.EvolveReason_Type ='SETUP'")
                if(downTime instanceof Error){
                  error = true;}
                  else{
                        tsSummary.setupTime = setupTime.recordset[0].setupTime;
                        let tsQty = await Evolve.SqlPool.request()
                        .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
                        .query("SELECT SUM(EvolveTimesheet_Qty) as tsQty from  EvolveTimesheet  WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID ")
                          if(runTime instanceof Error){
                              error = true;
                          }else{
                              tsSummary.tsQty = tsQty.recordset[0].tsQty;
                          }

                }

                if(error == false){
                  return tsSummary
                }else{
                  return 0
                }
                
              }
            }
      } catch (error) {
          Evolve.Log.error("EERR2982 : Error while get timesheet summary "+error.message);
          return new Error("EERR2982 : Error while get timesheet summary "+error.message);
      }

    },
    checkVarianceGroup : async function (data ,type) {
      try {
        if(type == 'ADD'){
          return await Evolve.SqlPool.request()
          .input("EvolveVarianceGroup_Name", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_Name)

          .query("SELECT EvolveVarianceGroup_Name FROM  EvolveVarianceGroup WHERE EvolveVarianceGroup_Name=@EvolveVarianceGroup_Name ")
        }else{
          return await Evolve.SqlPool.request()
          .input("EvolveVarianceGroup_Name", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_Name)
          .input("EvolveVarianceGroup_ID", Evolve.Sql.Int,data.EvolveVarianceGroup_ID)
          .query("SELECT EvolveVarianceGroup_Name FROM  EvolveVarianceGroup WHERE EvolveVarianceGroup_Name=@EvolveVarianceGroup_Name AND EvolveVarianceGroup_ID !=@EvolveVarianceGroup_ID ")

        }
      } catch (error) {
          Evolve.Log.error("EERR2983 : Error while check variance group "+error.message);
          return new Error("EERR2983 : Error while check variance group "+error.message);
      }
    },
    addVarianceGroup : async function (data) {
      try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        return await Evolve.SqlPool.request()
      
        .input("EvolveVarianceGroup_Name", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_Name)
        .input("EvolveVarianceGroup_TimeSheetVarParam", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_TimeSheetVarParam)
        .input("EvolveVarianceGroup_TimeSheetVarValue", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_TimeSheetVarValue)
        .input("EvolveVarianceGroup_BookingVarParam", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_BookingVarParam)
        .input("EvolveVarianceGroup_BookingVarValue", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_BookingVarValue)
        .input("EvolveVarianceGroup_IssueVarParam", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_IssueVarParam)
        .input("EvolveVarianceGroup_IssueVarValue", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_IssueVarValue)
        .input("EvolveVarianceGroup_CreatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
        .input('EvolveVarianceGroup_CreatedAt', Evolve.Sql.NVarChar, dateTime)
        .input("EvolveVarianceGroup_UpdatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
        .input('EvolveVarianceGroup_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
        .query("INSERT INTO  EvolveVarianceGroup (EvolveVarianceGroup_Name  ,EvolveVarianceGroup_TimeSheetVarParam,EvolveVarianceGroup_TimeSheetVarValue ,EvolveVarianceGroup_BookingVarParam,EvolveVarianceGroup_BookingVarValue,EvolveVarianceGroup_IssueVarParam,EvolveVarianceGroup_IssueVarValue,EvolveVarianceGroup_CreatedUser,EvolveVarianceGroup_CreatedAt,EvolveVarianceGroup_UpdatedUser,EvolveVarianceGroup_UpdatedAt) VALUES ( @EvolveVarianceGroup_Name,@EvolveVarianceGroup_TimeSheetVarParam,@EvolveVarianceGroup_TimeSheetVarValue  ,@EvolveVarianceGroup_BookingVarParam,@EvolveVarianceGroup_BookingVarValue ,@EvolveVarianceGroup_IssueVarParam,@EvolveVarianceGroup_IssueVarValue,@EvolveVarianceGroup_CreatedUser,@EvolveVarianceGroup_CreatedAt,@EvolveVarianceGroup_UpdatedUser,@EvolveVarianceGroup_UpdatedAt)")
      } catch (error) {
          Evolve.Log.error("EERR2984 : Error while add variance group "+error.message);
          return new Error("EERR2984 : Error while add variance group "+error.message);
      }
    },
    getVarianceGroupList : async function () {
      try {
        return await Evolve.SqlPool.request()

        .query("SELECT EvolveVarianceGroup_ID,EvolveVarianceGroup_Name ,EvolveVarianceGroup_TimeSheetVarParam ,EvolveVarianceGroup_TimeSheetVarValue ,EvolveVarianceGroup_BookingVarParam ,EvolveVarianceGroup_BookingVarValue,EvolveVarianceGroup_IssueVarParam ,EvolveVarianceGroup_IssueVarValue FROM  EvolveVarianceGroup ORDER BY EvolveVarianceGroup_ID DESC  ")
      } catch (error) {
          Evolve.Log.error("EERR2985 : Error while get variance group list "+error.message);
          return new Error("EERR2985 : Error while get variance group list "+error.message);
      }
    },
    deleteVarianceGroup : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input("EvolveVarianceGroup_ID", Evolve.Sql.Int,data.EvolveVarianceGroup_ID)

        .query("DELETE FROM  EvolveVarianceGroup  WHERE EvolveVarianceGroup_ID=@EvolveVarianceGroup_ID")
      } catch (error) {
          Evolve.Log.error("EERR2986 : Error while delete variance group "+error.message);
          return new Error("EERR2986 : Error while delete variance group "+error.message);
      }
    },
    getVarGroupDetails : async function(EvolveVarianceGroup_ID){
      try {
        return await Evolve.SqlPool.request()
        .input("EvolveVarianceGroup_ID", Evolve.Sql.Int,EvolveVarianceGroup_ID)

        .query("SELECT * FROM  EvolveVarianceGroup  WHERE EvolveVarianceGroup_ID=@EvolveVarianceGroup_ID")
      } catch (error) {
          Evolve.Log.error("EERR2987 : Error while get variance group details "+error.message);
          return new Error("EERR2987 : Error while get variance group details "+error.message);
      }

    },
    updateVarianceGroup : async function (data) {
      try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        return await Evolve.SqlPool.request()
        .input("EvolveVarianceGroup_ID", Evolve.Sql.Int,data.EvolveVarianceGroup_ID)
        .input("EvolveVarianceGroup_Name", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_Name)
        .input("EvolveVarianceGroup_TimeSheetVarParam", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_TimeSheetVarParam)
        .input("EvolveVarianceGroup_TimeSheetVarValue", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_TimeSheetVarValue)
        .input("EvolveVarianceGroup_BookingVarParam", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_BookingVarParam)
        .input("EvolveVarianceGroup_BookingVarValue", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_BookingVarValue)
        .input("EvolveVarianceGroup_IssueVarParam", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_IssueVarParam)
        .input("EvolveVarianceGroup_IssueVarValue", Evolve.Sql.NVarChar,data.EvolveVarianceGroup_IssueVarValue)
        .input("EvolveVarianceGroup_UpdatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
        .input('EvolveVarianceGroup_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
        .query("UPDATE EvolveVarianceGroup SET EvolveVarianceGroup_Name=@EvolveVarianceGroup_Name ,   EvolveVarianceGroup_TimeSheetVarParam=@EvolveVarianceGroup_TimeSheetVarParam ,EvolveVarianceGroup_TimeSheetVarValue=@EvolveVarianceGroup_TimeSheetVarValue ,EvolveVarianceGroup_BookingVarParam=@EvolveVarianceGroup_BookingVarParam,EvolveVarianceGroup_BookingVarValue=@EvolveVarianceGroup_BookingVarValue ,EvolveVarianceGroup_IssueVarParam=@EvolveVarianceGroup_IssueVarParam , EvolveVarianceGroup_IssueVarValue=@EvolveVarianceGroup_IssueVarValue ,  EvolveVarianceGroup_UpdatedUser=@EvolveVarianceGroup_UpdatedUser , EvolveVarianceGroup_UpdatedAt=@EvolveVarianceGroup_UpdatedAt WHERE EvolveVarianceGroup_ID=@EvolveVarianceGroup_ID ")
      } catch (error) {
          Evolve.Log.error("EERR2988 : Error while update variance group "+error.message);
          return new Error("EERR2988 : Error while update variance group "+error.message);
      }
    },
    checkPallet : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveInventory_RefNumber',Evolve.Sql.NVarChar,data.EvolveInventory_RefNumber)
        .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
        .input('EvolveLocation_ID',Evolve.Sql.Int,data.EvolveLocation_ID)
        .query("SELECT einv.*  , esb.EvolveSubItem_SubItem_ID ,esb.EvolveSubItem_ActualItemID  FROM  EvolveSchedulingBom epob LEFT JOIN EvolveSubItem esb ON epob.EvolveSchedulingBom_CompItem_ID = esb.EvolveSubItem_ActualItemID  INNER JOIN EvolveInventory einv ON (einv.EvolveItem_ID = epob.EvolveSchedulingBom_CompItem_ID OR einv.EvolveItem_ID = esb.EvolveSubItem_SubItem_ID)  WHERE epob.EvolveWoSchedule_ID = @EvolveWoSchedule_ID AND einv.EvolveInventory_PostingStatus ='ERPPOSTED'   AND einv.EvolveInventory_Status = 'GOOD' AND einv.EvolveLocation_ID=@EvolveLocation_ID AND  einv.EvolveInventory_RefNumber=@EvolveInventory_RefNumber")
      } catch (error) {
          Evolve.Log.error("EERR2989 : Error while check pallet "+error.message);
          return new Error("EERR2989 : Error while check pallet "+error.message);
      }
    },
    chekErpPostingStatus :async function(EvolveWoSchedule_ID){
      try {
          let error = false;
          let erpPostedStatus = {};

          let upIssuePallet = await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,EvolveWoSchedule_ID)
            .query("SELECT COUNT(epd.EvolvePickListDetail_ID) as unpIssuePallets  FROM  EvolvePickListDetail epd , EvolveInventory einv WHERE epd.EvolveWoSchedule_ID=@EvolveWoSchedule_ID  AND epd.EvolveInventory_ID = einv.EvolveInventory_ID AND einv.EvolveInventory_PostingStatus = 'PENDING' AND epd.EvolvePickListDetail_Status = 'ISSUED'")

            if(upIssuePallet instanceof Error){
              error = true;
            }else{
                erpPostedStatus.unpIssuePallets = upIssuePallet.recordset[0].unpIssuePallets;
                let upBookedPallets = await Evolve.SqlPool.request()
                .input('EvolveWoSchedule_ID',Evolve.Sql.Int,EvolveWoSchedule_ID)
                .query("SELECT COUNT(epod.EvolveProdOrdersDetail_ID) as unpBookedPallets FROM  EvolveProdOrdersDetail epod  , EvolveInventory einv  WHERE epod.EvolveInventory_ID = einv.EvolveInventory_ID AND epod.EvolveWoSchedule_ID = @EvolveWoSchedule_ID AND einv.EvolveInventory_PostingStatus = 'PENDING'")
                if(upBookedPallets instanceof Error){
                  error = true;
                }else{
                  erpPostedStatus.upBookedPallets = upBookedPallets.recordset[0].unpBookedPallets;
                  let upTimeSheets = await Evolve.SqlPool.request()
                  .input('EvolveWoSchedule_ID',Evolve.Sql.Int,EvolveWoSchedule_ID)
                  .query("SELECT COUNT(ets.EvolveTimesheet_ID) upTimeSheets FROM EvolveTimesheet ets WHERE ets.EvolveWoSchedule_ID = @EvolveWoSchedule_ID AND ets.EvolveTimesheet_ERPStatus = 'PENDING' ")
                  if(upTimeSheets instanceof Error){
                    error = true;}
                    else{
                        erpPostedStatus.upTimeSheets = upTimeSheets.recordset[0].upTimeSheets;
                }

                if(error == false){
                  return erpPostedStatus
                }else{
                  return 0
                }
                
              }
            }
      } catch (error) {
          Evolve.Log.error("EERR2990 : Error while check erp posting status "+error.message);
          return new Error("EERR2990 : Error while check erp posting status "+error.message);
      }

    },
    getWoClosingValidations : async function () {
      try { 
          return await Evolve.SqlPool.request()
          .query("SELECT * FROM  EvolveConfig WHERE EvolveConfig_Key = 'WCISSUEVAR' OR EvolveConfig_Key = 'WCBOOKINGVAR' OR EvolveConfig_Key = 'WCTIMESHEETVAR'")
      } catch (error) {
          Evolve.Log.error("EERR2991 : Error while wo closing validations "+error.message);
          return new Error("EERR2991 : Error while wo closing validations "+error.message);
      }
    },
    confirmPallet : async function (EvolveInventory_ID) {
      try {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

          return await Evolve.SqlPool.request()
          .input('EvolveInventory_ID',Evolve.Sql.Int,EvolveInventory_ID)
          .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveInventory SET EvolveInventory_PostingStatus = 'ERPPOSTED' ,       EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt WHERE EvolveInventory_ID=@EvolveInventory_ID")
      } catch (error) {
          Evolve.Log.error("EERR2992 : Error while confirm pallet "+error.message);
          return new Error("EERR2992 : Error while confirm pallet "+error.message);
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
          console.log("data.palletDetails.qtyDifferent>>>" , data.palletDetails.qtyDifferent)
          return await Evolve.SqlPool.request()
          .input('EvolveWoSchedule_ID',Evolve.Sql.NVarChar,data.EvolveWoSchedule_ID)
          .input('qty',Evolve.Sql.NVarChar,data.palletDetails.qtyDifferent)
          .input("EvolveWoSchedule_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
          .input("EvolveWoSchedule_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_CompletedQty=EvolveWoSchedule_CompletedQty+@qty WHERE EvolveWoSchedule_ID=@EvolveWoSchedule_ID")

        }
      } catch (error) {
          Evolve.Log.error("EERR2993 : Error while update wo order qty "+error.message);
          return new Error("EERR2993 : Error while update wo order qty "+error.message);
      }
    },
    deleteProdOrderPallet : async function (EvolveProdOrdersDetail_ID) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveProdOrdersDetail_ID',Evolve.Sql.Int,EvolveProdOrdersDetail_ID)
          
          .query("DELETE  FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_ID=@EvolveProdOrdersDetail_ID")
      } catch (error) {
          Evolve.Log.error("EERR2994 : Error while delete pallet "+error.message);
          return new Error("EERR2994 : Error while delete pallet "+error.message);
      }
    },
    deleteInventory : async function (EvolveInventory_ID) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveInventory_ID',Evolve.Sql.Int,EvolveInventory_ID)
    
          .query("DELETE FROM EvolveInventory WHERE EvolveInventory_ID=@EvolveInventory_ID")
      } catch (error) {
          Evolve.Log.error("EERR2995 : Error while delete pallet "+error.message);
          return new Error("EERR2995 : Error while delete pallet "+error.message);
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
          Evolve.Log.error("EERR2996 : Error while update pallet details "+error.message);
          return new Error("EERR2996 : Error while update pallet details "+error.message);
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
          .input("EvolveInventory_LotNotes", Evolve.Sql.NVarChar, data.EvolveInventory_LotNotes)
          .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
          .query("UPDATE EvolveInventory SET EvolveCompany_ID=@EvolveCompany_ID ,  EvolveUnit_ID=@EvolveUnit_ID ,EvolveInventory_QtyOnHand=@EvolveInventory_QtyOnHand ,EvolveInventory_SecondaryUomQty=@EvolveInventory_SecondaryUomQty ,EvolveInventory_PalletNotes=@EvolveInventory_PalletNotes ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt ,EvolveInventory_LotNotes=@EvolveInventory_LotNotes  WHERE EvolveInventory_ID=@EvolveInventory_ID")
      } catch (error) {
          Evolve.Log.error("EERR2997 : Error while update pallet "+error.message);
          return new Error("EERR2997 : Error while update pallet "+error.message);
      }

    },
    getTransTypeID :  async function (EvolveTranstype_Code) {
        try {
          return await Evolve.SqlPool.request()
          .input("EvolveTranstype_Code", Evolve.Sql.NVarChar, EvolveTranstype_Code)
          .query("SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_Code = @EvolveTranstype_Code");
        } catch (error) {
          Evolve.Log.error(" EERR2998 : EERR2998 : Error while get Trans Type ID "+error.message);
          return new Error(" EERR2998 : EERR2998 : Error while get Trans Type ID "+error.message);
        }
    },
    addInventory : async function (data) {
        try {
          let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
              // if(data.EvolveQc_IsRequired == true){
              //   data.EvolveInventory_Status = 'QCHOLD'
              // }else{
              //   data.EvolveInventory_Status = 'ACCEPTED'
              // }

            return await Evolve.SqlPool.request()
            .input('EvolveCompany_ID',Evolve.Sql.Int,data.EvolveCompany_ID)
            .input('EvolveUnit_ID',Evolve.Sql.Int,data.EvolveUnit_ID)
            .input('EvolveItem_ID',Evolve.Sql.Int,data.EvolveItem_ID)
            .input('EvolveUom_ID',Evolve.Sql.Int,data.EvolveUom_ID)
            .input('EvolveLocation_ID',Evolve.Sql.Int,data.EvolveLocation_ID)
            .input('EvolveInventory_SecondaryUom',Evolve.Sql.Int,data.EvolveInventory_SecondaryUom)
            .input('EvolveInventory_SecondaryUomQty',Evolve.Sql.NVarChar,data.EvolveInventory_SecondaryUomQty)
            .input('EvolveInventory_PalletNotes',Evolve.Sql.NVarChar,data.EvolveInventory_PalletNotes)
            .input('EvolveInventory_LotNumber',Evolve.Sql.NVarChar,data.EvolveInventory_LotNumber)
            .input('EvolveInventory_LotNotes',Evolve.Sql.NVarChar,data.EvolveInventory_LotNotes)
            .input('EvolveInventory_QtyOnHand',Evolve.Sql.NVarChar,data.EvolveInventory_QtyOnHand)
            .input('EvolveInventory_RefNumber',Evolve.Sql.NVarChar,data.palletNumber)
            .input("EvolveTranstype_ID",Evolve.Sql.Int,data.EvolveTranstype_ID)
            .input('EvolveInventory_PostingStatus',Evolve.Sql.NVarChar,'ERPPOSTED')
            .input('EvolveInventory_Status',Evolve.Sql.NVarChar,data.EvolveInventory_Status)
            .input("EvolveInventory_CreatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
            .input("EvolveInventory_CreatedAt", Evolve.Sql.NVarChar, dateTime)
            .input("EvolveInventory_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
            .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
              .query("INSERT INTO EvolveInventory (EvolveTranstype_ID,EvolveInventory_Status ,EvolveCompany_ID,EvolveUnit_ID,EvolveItem_ID , EvolveUom_ID ,EvolveLocation_ID ,EvolveInventory_SecondaryUom ,EvolveInventory_SecondaryUomQty ,EvolveInventory_PalletNotes ,EvolveInventory_LotNumber ,EvolveInventory_LotNotes,EvolveInventory_QtyOnHand,EvolveInventory_PostingStatus,EvolveInventory_RefNumber,EvolveInventory_CreatedUser,EvolveInventory_CreatedAt,EvolveInventory_UpdatedUser,EvolveInventory_UpdatedAt) VALUES (@EvolveTranstype_ID,@EvolveInventory_Status,@EvolveCompany_ID,@EvolveUnit_ID,@EvolveItem_ID , @EvolveUom_ID ,@EvolveLocation_ID ,@EvolveInventory_SecondaryUom ,@EvolveInventory_SecondaryUomQty ,@EvolveInventory_PalletNotes ,@EvolveInventory_LotNumber ,@EvolveInventory_LotNotes,@EvolveInventory_QtyOnHand,@EvolveInventory_PostingStatus,@EvolveInventory_RefNumber,@EvolveInventory_CreatedUser,@EvolveInventory_CreatedAt,@EvolveInventory_UpdatedUser,@EvolveInventory_UpdatedAt);select @@IDENTITY AS 'inserted_id'")
        } catch (error) {
          Evolve.Log.error(" EERR2999 : Error while add pallet "+error.message);
        return new Error(" EERR2999 : Error while add pallet "+error.message);
        }
    },
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
        Evolve.Log.error(" EERR3000 : Error while add prod order details "+error.message);
      return new Error(" EERR3000 : Error while add prod order details "+error.message);
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
        Evolve.Log.error("EERR3001 : Error while wo completed qty  "+error.message);
      return new Error("EERR3001 : Error while wo completed qty  "+error.message);
      }
    },
    getWcTimesheetSumary : async function(data){
      try {
          return await Evolve.SqlPool.request()           
          .input('EvolveWoSchedule_ID',Evolve.Sql.Int,data.EvolveWoSchedule_ID)
          .query(" SELECT 'false' as editEnable , 'false' as wcTsSubRow ,(SELECT  EvolveReason_Name  FROM EvolveReason  WHERE ets.EvolveScrapCode_ID = EvolveReason_ID   ) as scrapcode ,    ews.EvolveWoSchedule_OrderID , ews.EvolveUOM_ID , ews.EvolveItem_ID,     ets.* , es.EvolveShift_Name  , eu.EvolveUser_Name ,  er.EvolveReason_Name ,convert(varchar, ets.EvolveTimesheet_StartDateTime, 103) as startDate ,convert(varchar(5), ets.EvolveTimesheet_StartDateTime, 8) as startTime ,  convert(varchar, ets.EvolveTimesheet_StopDateTime, 103) as endDate ,convert(varchar(5), ets.EvolveTimesheet_StopDateTime, 8) as endTime  , euom.EvolveUom_Uom FROM  EvolveTimesheet ets LEFT JOIN EvolveWoSchedule ews ON  ets.EvolveWoSchedule_ID  = ews.EvolveWoSchedule_ID  LEFT JOIN EvolveShift es  ON  ets.EvolveShift_ID=es.EvolveShift_ID LEFT JOIN  EvolveUom euom ON ets.EvolveScrapUOM = euom.EvolveUom_ID LEFT JOIN EvolveUser eu ON ets.EvolveUser_ID=eu.EvolveUser_ID LEFT JOIN EvolveReason er ON   ets.EvolveActivityCode_ID = er.EvolveReason_ID   WHERE ets.EvolveWoSchedule_ID =@EvolveWoSchedule_ID  ORDER BY EvolveTimesheet_StartDateTime")
      } catch (error) {
        Evolve.Log.error("EERR3002 : Error while get timesheet summary "+error.message);
      return new Error("EERR3002 : Error while get timesheet summary "+error.message);
      }
    },
    addTimeSheetOnSplit : async function (data) {
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
          .input("EvolveTimesheet_ERPStatus", Evolve.Sql.NVarChar,'ERPPOSTED')
          .input("EvolveTimesheet_Status", Evolve.Sql.NVarChar,'APPROVED')

          .query("INSERT INTO  EvolveTimesheet (EvolveProdOrders_ID  ,EvolveWoSchedule_ID,EvolveActivityCode_ID ,EvolveActivitySubCode_ID,EvolveTimesheet_Qty,EvolveTimesheet_StartDateTime,EvolveTimesheet_StopDateTime,EvolveTimesheet_TotalMin,EvolveShift_ID,EvolveUser_ID,EvolveScrapCode_ID,EvolveScrapSubCode_ID,EvolveScrapUOM,EvolveTimesheet_ScrapQty,EvolveTimesheet_Comments ,EvolveTimesheet_WOStatus ,EvolveTimesheet_ERPStatus ,EvolveMachine_ID,EvolveTimesheet_Status) VALUES ( @EvolveProdOrders_ID,@EvolveWoSchedule_ID,@EvolveActivityCode_ID  ,@EvolveActivitySubCode_ID,@EvolveTimesheet_Qty ,@EvolveTimesheet_StartDateTime,@EvolveTimesheet_StopDateTime,@EvolveTimesheet_TotalMin,@EvolveShift_ID,@EvolveUser_ID,@EvolveScrapCode_ID,@EvolveScrapSubCode_ID,@EvolveScrapUOM,@EvolveTimesheet_ScrapQty,@EvolveTimesheet_Comments ,@EvolveTimesheet_WOStatus ,@EvolveTimesheet_ERPStatus,@EvolveMachine_ID,@EvolveTimesheet_Status)")
    } catch (error) {
        Evolve.Log.error("EERR3003 : Error while add timesheet on split "+error.message);
        return new Error("EERR3003 : Error while add timesheet on split "+error.message);
    }
    },
    updateSheetOnSplit : async function (data ,EvolveUser_ID) {
      try { 
          return await Evolve.SqlPool.request()
          .input('EvolveTimesheet_ID',Evolve.Sql.Int,data.EvolveTimesheet_ID)
          .input('EvolveUser_ID',Evolve.Sql.Int,EvolveUser_ID)
          .input('EvolveTimesheet_StopDateTime',Evolve.Sql.NVarChar,data.EvolveTimesheet_StopDateTime)
          .input("EvolveTimesheet_Qty", Evolve.Sql.NVarChar,data.EvolveTimesheet_Qty)

          .input("EvolveTimesheet_ERPStatus", Evolve.Sql.NVarChar,'ERPPOSTED')
          .input("EvolveTimesheet_Status", Evolve.Sql.NVarChar,'APPROVED')
          .input("EvolveTimesheet_TotalMin", Evolve.Sql.NVarChar,data.EvolveTimesheet_TotalMin)
          .query("UPDATE EvolveTimesheet SET  EvolveTimesheet_Qty=@EvolveTimesheet_Qty ,EvolveTimesheet_TotalMin=@EvolveTimesheet_TotalMin,EvolveTimesheet_ERPStatus=@EvolveTimesheet_ERPStatus,EvolveTimesheet_StopDateTime=@EvolveTimesheet_StopDateTime , EvolveUser_ID=@EvolveUser_ID , EvolveTimesheet_Status=@EvolveTimesheet_Status WHERE  EvolveTimesheet_ID=@EvolveTimesheet_ID")
      } catch (error) {
          Evolve.Log.error("EERR3004 : Error while update time sheet "+error.message);
          return new Error("EERR3004 : Error while update time sheet "+error.message);
      }
    },
    updateWcTsSummary : async function (data ,EvolveUser_ID) {
      try { 
          return await Evolve.SqlPool.request()
          .input('EvolveTimesheet_ID',Evolve.Sql.Int,data.EvolveTimesheet_ID)
          .input('EvolveUser_ID',Evolve.Sql.Int,EvolveUser_ID)
          .input("EvolveTimesheet_Qty", Evolve.Sql.NVarChar,data.EvolveTimesheet_Qty)
          .input("EvolveTimesheet_ERPStatus", Evolve.Sql.NVarChar,'ERPPOSTED')
          .input("EvolveTimesheet_Status", Evolve.Sql.NVarChar,'APPROVED')
          .query("UPDATE EvolveTimesheet SET  EvolveTimesheet_Qty=@EvolveTimesheet_Qty ,EvolveTimesheet_ERPStatus=@EvolveTimesheet_ERPStatus,EvolveUser_ID=@EvolveUser_ID , EvolveTimesheet_Status=@EvolveTimesheet_Status WHERE  EvolveTimesheet_ID=@EvolveTimesheet_ID")
      } catch (error) {
          Evolve.Log.error("EERR3005 : Error while update timesheet summary "+error.message);
          return new Error("EERR3005 : Error while update timesheet summary "+error.message);
      }
    },
    getWoNumber: async function (EvolveWoSchedule_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input("EvolveWoSchedule_ID", Evolve.Sql.Int, EvolveWoSchedule_ID)
        .query("SELECT EvolveWoSchedule_OrderID  FROM  EvolveWoSchedule WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID" )
      } catch (error) {
        Evolve.Log.error(" EERR3094 : Error while get wo number "+error.message);
        return new Error(" EERR3094 : Error while get wo number "+error.message);
      }
    },
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
        Evolve.Log.error(" EERR3098: Error while update pallet status "+error.message);
          return new Error(" EERR3098: Error while update pallet status "+error.message);
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
          Evolve.Log.error(" EERR3099 : Error while  issue pallet "+error.message);
          return new Error(" EERR3099 : Error while  issue pallet "+error.message);
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
          Evolve.Log.error(" EERR3100: Error while update sheduling  bom "+error.message);
          return new Error(" EERR3100: Error while update sheduling  bom "+error.message);
      }
    },
    getLocationStatus: async function (EvolveLocation_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input("EvolveLocation_ID", Evolve.Sql.Int, EvolveLocation_ID)
        .query("SELECT  scm.EvolveStatusCodeMstr_Code  FROM  EvolveLocation el  , EvolveStatusCodeMstr scm WHERE el.EvolveStatusCodeMstr_Id = scm.EvolveStatusCodeMstr_Id AND el.EvolveLocation_ID = @EvolveLocation_ID" )
      } catch (error) {
        Evolve.Log.error(" EERR3101 : Error while get location status "+error.message);
        return new Error(" EERR3101 : Error while get location status "+error.message);
      }
    },

}
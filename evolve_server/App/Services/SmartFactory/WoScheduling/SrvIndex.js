'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemSearch: async function (search) {
        try {
            if (search == '') {
                let query = "SELECT TOP(5) EvolveItem_Code as title, EvolveItem_ID as id FROM EvolveItem WHERE ORDER BY EvolveItem_ID DESC"
                return await Evolve.SqlPool.request().query(query);
            } else {
                let query = "SELECT EvolveItem_Code as title, EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE '%" + search + "%'"
                return await Evolve.SqlPool.request().query(query);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getWorkOrderList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveProdOrders_ID, EvolveProdOrders_Order, EvolveProdOrders_OrderId FROM EvolveProdOrders")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getMachineShiftList: async function (data) {
        try {
            let dt = data.EvolveMachineCalendar_Date.split("/")
            let EvolveMachineCalendar_Date = dt[2] + "-" + dt[1] + "-" + dt[0];
            let checkdate = await Evolve.SqlPool.request()
                .input("EvolveMachine_ID", Evolve.Sql.Int, data.EvolveMachine_ID)
                .input("EvolveMachineCalendar_Date", Evolve.Sql.NVarChar, EvolveMachineCalendar_Date)
                .query("SELECT * FROM EvolveMachineCalendar WHERE EvolveMachine_ID = @EvolveMachine_ID AND cast(EvolveMachineCalendar_Date as date) = FORMAT(getDate(), '" + EvolveMachineCalendar_Date + "') AND EvolveMachineCalendar_ShiftType > 0 AND EvolveMachineCalendar_StdHours > 0")
            console.log("checkdate", checkdate)
            if (checkdate.recordset.length < 1) {
                return checkdate;
            } else {
                return await Evolve.SqlPool.request()
                    .input("EvolveMachine_ID", Evolve.Sql.Int, data.EvolveMachine_ID)
                    .input("EvolveMachineCalendar_Date", Evolve.Sql.NVarChar, EvolveMachineCalendar_Date)
                    .query("SELECT * FROM EvolveMachineCalendar WHERE EvolveMachine_ID = @EvolveMachine_ID AND cast(EvolveMachineCalendar_Date as date) >= FORMAT(getDate(), '" + EvolveMachineCalendar_Date + "') AND EvolveMachineCalendar_ShiftType > 0 AND EvolveMachineCalendar_StdHours > 0 order by EvolveMachineCalendar_Date asc")
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getShiftMinMaxTime: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT min(EvolveShift_Start) AS  minTime, max(EvolveShift_End) AS  maxTime FROM EvolveShift")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getDepartmentList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveSection_ID, EvolveSection_Name FROM EvolveSection")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getItemList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT ei.EvolveItem_ID, ei.EvolveItem_Code, euom.EvolveUom_ID, euom.EvolveUom_Uom, EvolveItem_CycleTime FROM EvolveItem ei, EvolveUom euom WHERE ei.EvolveUom_ID = euom.EvolveUom_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getMachineList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveMachine_ID, EvolveMachine_Name FROM EvolveMachine ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getWoSchedulingList: async function (data) {
        try {
            let query = "";
            if (data.EvolveItem_ID != '') {
                query = "AND ewos.EvolveItem_ID = '" + data.EvolveItem_ID + "' ";
            }
            if (data.EvolveProdOrders_ID != '') {
                query = query + "AND ewos.EvolveProdOrders_ID = '" + data.EvolveProdOrders_ID + "' ";
            }
            if (data.searchStartDate != '' && data.searchStartDate != '') {

                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND cast(ewos.EvolveWoSchedule_Date as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(ewos.EvolveWoSchedule_Date as date) <= FORMAT(getDate(), '" + endDate + "')";
            }

            // return await Evolve.SqlPool.request()
            //     .input("EvolveSection_ID", Evolve.Sql.Int, data.EvolveSection_ID)
            //     .input("EvolveMachine_ID", Evolve.Sql.Int, data.EvolveMachine_ID)
            //     .query("SELECT ewos.EvolveWoSchedule_ID, ewos.EvolveWoSchedule_SEQ, convert(varchar, ewos.EvolveWoSchedule_Date, 103) as wosDate, convert(varchar, ewos.EvolveWoSchedule_StartDateTime, 103) as StartDate, ewos.EvolveWoSchedule_OrderID, ewos.EvolveProdOrders_ID, epro.EvolveProdOrders_Order, eshift.EvolveShift_Name, eitem.EvolveItem_Code, eitem.EvolveItem_Desc, ewos.EvolveWoSchedule_Status, euom.EvolveUom_Uom, ewos.EvolveMachine_ID, emachine.EvolveMachine_Name, ewos.EvolveWoSchedule_SetupTime, CONVERT(VARCHAR(5), ewos.EvolveWoSchedule_StartDateTime , 108) AS StartTime,CONVERT(VARCHAR(5), ewos.EvolveWoSchedule_EndDateTime , 108) AS EndTime, ewos.EvolveWoSchedule_OrderQty, ewos.EvolveWoSchedule_CycleTime, ewos.EvolveLocation_ID, esection.EvolveSection_Name, ewos.EvolveWOSchedule_ISLock, epro.EvolveProdOrders_Status, ewos.EvolveWoSchedule_IsSplit FROM EvolveWoSchedule ewos, EvolveProdOrders epro, EvolveShift eshift, EvolveItem eitem, EvolveMachine emachine, EvolveSection esection, EvolveUom euom WHERE ewos.EvolveProdOrders_ID = epro.EvolveProdOrders_ID AND ewos.EvolveShift_ID = eshift.EvolveShift_ID AND ewos.EvolveItem_ID = eitem.EvolveItem_ID AND ewos.EvolveMachine_ID = emachine.EvolveMachine_ID AND ewos.EvolveSection_ID = esection.EvolveSection_ID AND ewos.EvolveUom_ID = euom.EvolveUom_ID AND ewos.EvolveSection_ID = @EvolveSection_ID AND ewos.EvolveMachine_ID = @EvolveMachine_ID '" + query + "' ORDER BY EvolveWoSchedule_SEQ ASC")

            let SqlQuery = "SELECT ewos.EvolveWoSchedule_ID, ewos.EvolveWoSchedule_SEQ, convert(varchar, ewos.EvolveWoSchedule_Date, 103) as wosDate, convert(varchar, ewos.EvolveWoSchedule_StartDateTime, 103) as StartDate, convert(varchar, ewos.EvolveWoSchedule_EndDateTime, 103) as EndDate, ewos.EvolveWoSchedule_OrderID, ewos.EvolveProdOrders_ID, epro.EvolveProdOrders_Order, eitem.EvolveItem_Code, eitem.EvolveItem_Desc, ewos.EvolveWoSchedule_Status, euom.EvolveUom_Uom, ewos.EvolveMachine_ID, emachine.EvolveMachine_Name, ewos.EvolveWoSchedule_SetupTime, CONVERT(VARCHAR(5), ewos.EvolveWoSchedule_StartDateTime , 108) AS StartTime, CONVERT(VARCHAR(5), ewos.EvolveWoSchedule_EndDateTime , 108) AS EndTime, ewos.EvolveWoSchedule_OrderQty, ewos.EvolveWoSchedule_CompletedQty, ewos.EvolveWoSchedule_CycleTime, ewos.EvolveLocation_ID, ewos.EvolveWOSchedule_ISLock, epro.EvolveProdOrders_WOStatus, ewos.EvolveWoSchedule_IsSplit, ewos.EvolveWoSchedule_IsDownTime, ewos.EvolveReason_ID FROM EvolveWoSchedule ewos LEFT JOIN EvolveProdOrders epro ON ewos.EvolveProdOrders_ID = epro.EvolveProdOrders_ID  LEFT JOIN EvolveItem eitem ON ewos.EvolveItem_ID = eitem.EvolveItem_ID LEFT JOIN  EvolveMachine emachine ON ewos.EvolveMachine_ID = emachine.EvolveMachine_ID LEFT JOIN EvolveUom euom ON  ewos.EvolveUom_ID = euom.EvolveUom_ID WHERE ewos.EvolveMachine_ID = '" + data.EvolveMachine_ID + "' " + query + " ORDER BY EvolveWoSchedule_SEQ ASC"

            return await Evolve.SqlPool.request().query(SqlQuery);

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    deleteWos: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .query("DELETE FROM EvolveWoSchedule WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getWOSSqcNo: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT TOP(1)EvolveWoSchedule_ID FROM EvolveWoSchedule ORDER BY EvolveWoSchedule_ID DESC")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getWOSOrderID: async function (tableData) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_ID", Evolve.Sql.Int, tableData.EvolveProdOrders_ID)
                .query("SELECT max(EvolveWoSchedule_OrderID) AS POCountNo FROM EvolveWoSchedule WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    addWOScheduling: async function (data, tableData) {
        try {
            // let EvolveWoSchedule_OrderID = tableData.EvolveWoSchedule_OrderID + '' + data.wosOrderID;
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            let dt = tableData.EvolveWoSchedule_Date.split("/")
            let EvolveWoSchedule_Date = dt[2] + "-" + dt[1] + "-" + dt[0];
            console.log("EvolveWoSchedule_Date",EvolveWoSchedule_Date)

            let StartDateTimefull = tableData.EvolveWoSchedule_StartDateTime.split(' ')
            dt = StartDateTimefull[0].split("/")
            let StartTime = StartDateTimefull[1]
            let EvolveWoSchedule_StartDateTime = dt[2] + "-" + dt[1] + "-" + dt[0] + " " + StartTime;

            console.log("EvolveWoSchedule_StartDateTime",EvolveWoSchedule_StartDateTime)

            let EndDateTimefull = tableData.EvolveWoSchedule_EndDateTime.split(' ')
            dt = EndDateTimefull[0].split("/")
            let EndTime = EndDateTimefull[1]
            let EvolveWoSchedule_EndDateTime = dt[2] + "-" + dt[1] + "-" + dt[0] + " " + EndTime;

            
            console.log("EvolveWoSchedule_EndDateTime",EvolveWoSchedule_EndDateTime)

            dt = tableData.EvolveWoSchedule_OrderDate.split("/")
            let EvolveWoSchedule_OrderDate = dt[2] + "-" + dt[1] + "-" + dt[0];

            console.log("EvolveWoSchedule_OrderDate",EvolveWoSchedule_OrderDate)

            dt = tableData.EvolveWoSchedule_OrderDueDate.split("/")
            let EvolveWoSchedule_OrderDueDate = dt[2] + "-" + dt[1] + "-" + dt[0];

            console.log("EvolveWoSchedule_OrderDueDate",EvolveWoSchedule_OrderDueDate)

            dt = tableData.EvolveWoSchedule_ReleaseDate.split("/")
            let EvolveWoSchedule_ReleaseDate = dt[2] + "-" + dt[1] + "-" + dt[0];

            console.log("EvolveWoSchedule_ReleaseDate",EvolveWoSchedule_ReleaseDate)

            let updateCalender = await Evolve.SqlPool.request()
                .input("EvolveMachine_ID", Evolve.Sql.Int, tableData.EvolveMachine_ID)
                .query("UPDATE EvolveMachineCalendar SET  EvolveMachineCalendar_IsPlanned = 'true' WHERE cast(EvolveMachineCalendar_Date as date) >= FORMAT(getDate(), '" + EvolveWoSchedule_StartDateTime + "') AND cast(EvolveMachineCalendar_Date as date) <= FORMAT(getDate(), '" + EvolveWoSchedule_EndDateTime + "') AND EvolveMachine_ID = @EvolveMachine_ID")

                console.log("updateCalender",updateCalender)

            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_ID", Evolve.Sql.Int, tableData.EvolveProdOrders_ID)
                .input("EvolveWoSchedule_OrderID", Evolve.Sql.Int, data.wosOrderID)
                .input("EvolveWoSchedule_OrderDate", Evolve.Sql.NVarChar, EvolveWoSchedule_OrderDate)
                .input("EvolveWoSchedule_OrderDueDate", Evolve.Sql.NVarChar, EvolveWoSchedule_OrderDueDate)
                .input("EvolveWoSchedule_ReleaseDate", Evolve.Sql.NVarChar, EvolveWoSchedule_ReleaseDate)
                .input("EvolveItem_ID", Evolve.Sql.Int, tableData.EvolveItem_ID)
                .input("EvolveWoSchedule_OrderQty", Evolve.Sql.Int, tableData.EvolveWoSchedule_OrderQty)
                .input("EvolveWoSchedule_CompletedQty", Evolve.Sql.Int, 0)
                .input("EvolveShift_ID", Evolve.Sql.Int, tableData.EvolveShift_ID)
                .input("EvolveMachine_ID", Evolve.Sql.Int, tableData.EvolveMachine_ID)
                .input("EvolveUOM_ID", Evolve.Sql.Int, tableData.EvolveUOM_ID)
                .input("EvolveWoSchedule_SetupTime", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_SetupTime)
                .input("EvolveWoSchedule_CycleTime", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_CycleTime)
                .input("EvolveWoSchedule_StartDateTime", Evolve.Sql.NVarChar, EvolveWoSchedule_StartDateTime)
                .input("EvolveWoSchedule_EndDateTime", Evolve.Sql.NVarChar, EvolveWoSchedule_EndDateTime)
                .input("EvolveWOSchedule_ISLock", Evolve.Sql.NVarChar, false)
                .input("EvolveWoSchedule_IsSplit", Evolve.Sql.NVarChar, false)
                .input("EvolveWoSchedule_Date", Evolve.Sql.NVarChar, EvolveWoSchedule_Date)
                .input("EvolveWoSchedule_Status", Evolve.Sql.NVarChar, 'planned')
                .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, data.EvolveWoSchedule_SEQ)
                .input("EvolveWoSchedule_IsDownTime", Evolve.Sql.NVarChar, false)

                .input("EvolveWoSchedule_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveWoSchedule_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveWoSchedule_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveWoSchedule_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveWoSchedule (EvolveProdOrders_ID, EvolveWoSchedule_OrderID, EvolveWoSchedule_OrderDate,EvolveWoSchedule_OrderDueDate, EvolveItem_ID, EvolveWoSchedule_OrderQty, EvolveWoSchedule_CompletedQty, EvolveShift_ID, EvolveMachine_ID, EvolveWoSchedule_SetupTime, EvolveWoSchedule_CycleTime, EvolveWoSchedule_StartDateTime, EvolveWoSchedule_EndDateTime, EvolveWOSchedule_ISLock, EvolveWoSchedule_CreatedAt, EvolveWoSchedule_CreatedUser, EvolveWoSchedule_UpdatedAt, EvolveWoSchedule_UpdatedUser, EvolveUOM_ID, EvolveWoSchedule_Date, EvolveWoSchedule_Status, EvolveWoSchedule_SEQ, EvolveWoSchedule_ReleaseDate, EvolveWoSchedule_IsSplit, EvolveWoSchedule_IsDownTime) VALUES (@EvolveProdOrders_ID, @EvolveWoSchedule_OrderID, @EvolveWoSchedule_OrderDate, @EvolveWoSchedule_OrderDueDate, @EvolveItem_ID, @EvolveWoSchedule_OrderQty, @EvolveWoSchedule_CompletedQty, @EvolveShift_ID,  @EvolveMachine_ID, @EvolveWoSchedule_SetupTime, @EvolveWoSchedule_CycleTime, @EvolveWoSchedule_StartDateTime, @EvolveWoSchedule_EndDateTime, @EvolveWOSchedule_ISLock, @EvolveWoSchedule_CreatedAt, @EvolveWoSchedule_CreatedUser, @EvolveWoSchedule_UpdatedAt, @EvolveWoSchedule_UpdatedUser, @EvolveUOM_ID, @EvolveWoSchedule_Date, @EvolveWoSchedule_Status, @EvolveWoSchedule_SEQ, @EvolveWoSchedule_ReleaseDate, @EvolveWoSchedule_IsSplit, @EvolveWoSchedule_IsDownTime);select @@IDENTITY AS 'inserted_id'")


        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    addWOSchedulingDowntime: async function (data, tableData) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            let dt = tableData.EvolveWoSchedule_Date.split("/")
            let EvolveWoSchedule_Date = dt[2] + "-" + dt[1] + "-" + dt[0];
            // console.log("EvolveWoSchedule_Date", EvolveWoSchedule_Date);

            let StartDateTimefull = tableData.EvolveWoSchedule_StartDateTime.split(' ')
            dt = StartDateTimefull[0].split("/")
            let StartTime = StartDateTimefull[1]
            let EvolveWoSchedule_StartDateTime = dt[2] + "-" + dt[1] + "-" + dt[0] + " " + StartTime;
            // console.log("EvolveWoSchedule_StartDateTime", EvolveWoSchedule_StartDateTime);

            let EndDateTimefull = tableData.EvolveWoSchedule_EndDateTime.split(' ')
            dt = EndDateTimefull[0].split("/")
            let EndTime = EndDateTimefull[1]
            let EvolveWoSchedule_EndDateTime = dt[2] + "-" + dt[1] + "-" + dt[0] + " " + EndTime;
            // console.log("EvolveWoSchedule_EndDateTime", EvolveWoSchedule_EndDateTime);

            dt = tableData.EvolveWoSchedule_OrderDate.split("/")
            let EvolveWoSchedule_OrderDate = dt[2] + "-" + dt[1] + "-" + dt[0];
            // console.log("EvolveWoSchedule_OrderDate", EvolveWoSchedule_OrderDate);

            return await Evolve.SqlPool.request()

                .input("EvolveMachine_ID", Evolve.Sql.Int, tableData.EvolveMachine_ID)
                .input("EvolveWoSchedule_StartDateTime", Evolve.Sql.NVarChar, EvolveWoSchedule_StartDateTime)
                .input("EvolveWoSchedule_EndDateTime", Evolve.Sql.NVarChar, EvolveWoSchedule_EndDateTime)
                .input("EvolveWoSchedule_Date", Evolve.Sql.NVarChar, EvolveWoSchedule_Date)
                .input("EvolveWoSchedule_OrderDate", Evolve.Sql.NVarChar, EvolveWoSchedule_OrderDate)
                .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, data.EvolveWoSchedule_SEQ)
                .input("EvolveWoSchedule_IsDownTime", Evolve.Sql.NVarChar, true)

                .input("EvolveWoSchedule_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveWoSchedule_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveWoSchedule_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveWoSchedule_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveWoSchedule (EvolveMachine_ID, EvolveWoSchedule_StartDateTime, EvolveWoSchedule_EndDateTime,  EvolveWoSchedule_CreatedAt, EvolveWoSchedule_CreatedUser, EvolveWoSchedule_UpdatedAt, EvolveWoSchedule_UpdatedUser, EvolveWoSchedule_Date, EvolveWoSchedule_OrderDate, EvolveWoSchedule_SEQ, EvolveWoSchedule_IsDownTime) VALUES (@EvolveMachine_ID, @EvolveWoSchedule_StartDateTime, @EvolveWoSchedule_EndDateTime, @EvolveWoSchedule_CreatedAt, @EvolveWoSchedule_CreatedUser, @EvolveWoSchedule_UpdatedAt, @EvolveWoSchedule_UpdatedUser, @EvolveWoSchedule_Date,  @EvolveWoSchedule_OrderDate, @EvolveWoSchedule_SEQ, @EvolveWoSchedule_IsDownTime)")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getBomData: async function (tableData) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_ID", Evolve.Sql.Int, tableData.EvolveProdOrders_ID)
                .query("SELECT * FROM EvolveProdOrderBom WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    addSchedulingBom: async function (data, tableData) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_ID", Evolve.Sql.Int, tableData.EvolveProdOrders_ID)
                .input("EvolveSchedulingBom_ParentItem_ID", Evolve.Sql.Int, tableData.EvolveSchedulingBom_ParentItem_ID)
                .input("EvolveSchedulingBom_CompItem_ID", Evolve.Sql.Int, tableData.EvolveSchedulingBom_CompItem_ID)
                .input("EvolveSchedulingBom_DispSeq", Evolve.Sql.Int, tableData.EvolveSchedulingBom_DispSeq)
                .input("EvolveSchedulingBom_QtyPer", Evolve.Sql.NVarChar, tableData.EvolveSchedulingBom_QtyPer)
                .input("EvolveSchedulingBom_QtyReq", Evolve.Sql.NVarChar, tableData.EvolveSchedulingBom_QtyReq)
                .input("EvolveSchedulingBom_QtyIss", Evolve.Sql.Int, tableData.EvolveSchedulingBom_QtyIss)
                .input("EvolveSchedulingBom_CycleTime", Evolve.Sql.Int, tableData.EvolveSchedulingBom_CycleTime)
                .input("EvolveSchedulingBom_SetupTime", Evolve.Sql.NVarChar, tableData.EvolveSchedulingBom_SetupTime)
                .input("EvolveSchedulingBom_QtyPick", Evolve.Sql.Int, tableData.EvolveSchedulingBom_QtyPick)
                .input("EvolveSchedulingBom_QtyBom", Evolve.Sql.Int, tableData.EvolveSchedulingBom_QtyBom)
                .input("EvolveSchedulingBom_QtyAll", Evolve.Sql.Int, tableData.EvolveSchedulingBom_QtyAll)
                .input("EvolveSchedulingBom_WorkCenter", Evolve.Sql.NVarChar, tableData.EvolveSchedulingBom_WorkCenter)
                .input("EvolveSchedulingBom_ScanType", Evolve.Sql.NVarChar, tableData.EvolveSchedulingBom_ScanType)
                .input("EvolveSchedulingBom_Process_ID", Evolve.Sql.Int, tableData.EvolveSchedulingBom_Process_ID)
                .input("EvolveSchedulingBom_Type", Evolve.Sql.NVarChar, tableData.EvolveSchedulingBom_Type)
                .input("EvolveSchedulingBom_Scrp_Pct", Evolve.Sql.NVarChar, tableData.EvolveSchedulingBom_Scrp_Pct)
                .input("EvolveSchedulingBom_Start", Evolve.Sql.NVarChar, tableData.EvolveSchedulingBom_Start)
                .input("EvolveSchedulingBom_End", Evolve.Sql.NVarChar, tableData.EvolveSchedulingBom_End)
                .input("EvolveUom_ID", Evolve.Sql.Int, tableData.EvolveUom_ID)
                .input("EvolveProdOrders_IsBom", Evolve.Sql.Bit, tableData.EvolveProdOrders_IsBom)
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, tableData.EvolveWoSchedule_ID)

                .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveSchedulingBom_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveSchedulingBom_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveSchedulingBom_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveSchedulingBom_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveSchedulingBom (EvolveProdOrders_ID, EvolveSchedulingBom_ParentItem_ID, EvolveSchedulingBom_CompItem_ID, EvolveSchedulingBom_DispSeq, EvolveSchedulingBom_QtyPer, EvolveSchedulingBom_QtyReq, EvolveSchedulingBom_QtyIss, EvolveSchedulingBom_CycleTime, EvolveSchedulingBom_SetupTime, EvolveSchedulingBom_QtyPick, EvolveSchedulingBom_QtyBom, EvolveSchedulingBom_QtyAll, EvolveSchedulingBom_WorkCenter, EvolveSchedulingBom_ScanType, EvolveSchedulingBom_Process_ID, EvolveSchedulingBom_Type, EvolveSchedulingBom_Scrp_Pct, EvolveSchedulingBom_Start, EvolveSchedulingBom_End, EvolveUom_ID, EvolveUser_ID, EvolveSchedulingBom_CreatedAt, EvolveSchedulingBom_CreatedUser, EvolveSchedulingBom_UpdatedAt, EvolveSchedulingBom_UpdatedUser, EvolveWoSchedule_ID) VALUES (@EvolveProdOrders_ID, @EvolveSchedulingBom_ParentItem_ID, @EvolveSchedulingBom_CompItem_ID, @EvolveSchedulingBom_DispSeq, @EvolveSchedulingBom_QtyPer, @EvolveSchedulingBom_QtyReq, @EvolveSchedulingBom_QtyIss, @EvolveSchedulingBom_CycleTime, @EvolveSchedulingBom_SetupTime, @EvolveSchedulingBom_QtyPick, @EvolveSchedulingBom_QtyBom, @EvolveSchedulingBom_QtyAll, @EvolveSchedulingBom_WorkCenter, @EvolveSchedulingBom_ScanType, @EvolveSchedulingBom_Process_ID, @EvolveSchedulingBom_Type, @EvolveSchedulingBom_Scrp_Pct, @EvolveSchedulingBom_Start, @EvolveSchedulingBom_End, @EvolveUom_ID, @EvolveUser_ID, @EvolveSchedulingBom_CreatedAt, @EvolveSchedulingBom_CreatedUser, @EvolveSchedulingBom_UpdatedAt, @EvolveSchedulingBom_UpdatedUser, @EvolveWoSchedule_ID)")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    updateWOSSqc: async function (tableData, newSqc) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, newSqc)
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, tableData.EvolveWoSchedule_ID)
                .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_SEQ = @EvolveWoSchedule_SEQ WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getPreviousShiftAvailableTime: async function (data) {

        let dt = data.EvolveWoSchedule_Date.split("/")
        let EvolveWoSchedule_Date = dt[2] + "-" + dt[1] + "-" + dt[0];
        try {
            return await Evolve.SqlPool.request()
                // .input("EvolveShift_ID", Evolve.Sql.Int, data.EvolveShift_ID)
                .input("EvolveMachine_ID", Evolve.Sql.Int, data.EvolveMachine_ID)
                // .input("EvolveWoSchedule_Date", Evolve.Sql.NVarChar, EvolveWoSchedule_Date)
                .query("SELECT TOP(1) EvolveWoSchedule_ID, EvolveShift_ID, EvolveMachine_ID, convert(varchar, EvolveWoSchedule_EndDateTime, 103) as wosEndDate, CONVERT(VARCHAR(5), EvolveWoSchedule_EndDateTime , 108) AS wosEndTime FROM EvolveWoSchedule WHERE  EvolveMachine_ID = @EvolveMachine_ID AND EvolveWoSchedule_IsDownTime = 'false' ORDER BY EvolveWoSchedule_SEQ DESC")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    getItemWorkOrderList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
                .query("SELECT EvolveProdOrders_Order, EvolveProdOrders_ID FROM EvolveProdOrders WHERE EvolveItem_ID = @EvolveItem_ID AND EvolveProdOrders_Type = 'C' AND EvolveProdOrders_WOStatus != 'C'")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getListByWorkOrderID: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
                .query("SELECT epo.*, CONVERT(VARCHAR, epo.EvolveProdOrders_DueDate , 103) AS DueDate, CONVERT(VARCHAR, epo.EvolveProdOrders_ReleaseDate , 103) AS ReleaseDate, epob.EvolveProdOrderBom_CycleTime, epob.EvolveProdOrderBom_SetupTime FROM EvolveProdOrders epo, EvolveProdOrderBom epob WHERE epo.EvolveProdOrders_ID = @EvolveProdOrders_ID AND epob.EvolveProdOrders_ID = @EvolveProdOrders_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getMachineToItemList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveMachine_ID", Evolve.Sql.Int, data.EvolveMachine_ID)
                .query("SELECT ei.EvolveItem_ID, ei.EvolveItem_Code FROM EvolveMachineAssign emtoi, EvolveItem ei WHERE emtoi.EvolveMachine_ID = @EvolveMachine_ID AND emtoi.EvolveItem_ID = ei.EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    workOrderSchedulingLock: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .query("UPDATE EvolveWoSchedule SET EvolveWOSchedule_ISLock = 'true' WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getWOSDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .query("SELECT wos.EvolveWoSchedule_ID, wos.EvolveWoSchedule_Comments, wos.EvolveWoSchedule_ProdComments, convert(varchar, wos.EvolveWoSchedule_OrderDate, 103) as wosOrderDate, convert(varchar, wos.EvolveWoSchedule_ReleaseDate, 103) as wosRELDate, epro.EvolveProdOrders_WOComments, convert(varchar, epro.EvolveProdOrders_DueDate, 103) as wosDueDate, em.EvolveMachine_Name, wos.EvolveWoSchedule_CompletedQty, wos.EvolveWoSchedule_RejectedQty, wos.EvolveWoSchedule_CycleTime, wos.EvolveWoSchedule_SetupTime, wos.EvolveWoSchedule_OrderQty FROM EvolveWoSchedule wos LEFT JOIN EvolveProdOrders epro ON epro.EvolveProdOrders_ID = wos.EvolveProdOrders_ID LEFT JOIN EvolveMachine em ON em.EvolveMachine_ID = wos.EvolveMachine_ID WHERE wos.EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    incommingWOID: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
                .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, data.EvolveWoSchedule_SEQ)
                .query("SELECT EvolveWoSchedule_ID, EvolveWoSchedule_OrderID, EvolveWoSchedule_OrderQty, convert(varchar, EvolveWoSchedule_Date, 103) as scheduleDate FROM EvolveWoSchedule WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID AND EvolveWoSchedule_SEQ > @EvolveWoSchedule_SEQ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getscheduleBomDataList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .query("SELECT esb.EvolveSchedulingBom_ID, ei.EvolveItem_Code, ei.EvolveItem_Desc, esb.EvolveSchedulingBom_QtyReq, euom.EvolveUom_Uom, esb.EvolveSchedulingBom_QtyAll, esb.EvolveSchedulingBom_QtyPick, esb.EvolveSchedulingBom_QtyIss FROM EvolveSchedulingBom esb, EvolveWoSchedule ewos, EvolveItem ei, EvolveUom euom WHERE esb.EvolveWoSchedule_ID = @EvolveWoSchedule_ID AND ewos.EvolveWoSchedule_ID = esb.EvolveWoSchedule_ID AND ewos.EvolveItem_ID = ei.EvolveItem_ID AND euom.EvolveUom_ID = ewos.EvolveUom_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getTimeSheetList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .query("SELECT ets.EvolveTimesheet_ID, wos.EvolveWoSchedule_OrderID, ets.EvolveTimesheet_Qty, (SELECT EvolveUom_Uom FROM EvolveUom WHERE EvolveUom_ID = wos.EvolveUOM_ID) AS uom,  CONVERT(VARCHAR(5), ets.EvolveTimesheet_StartDateTime, 108) AS StartTime, CONVERT(VARCHAR(5), ets.EvolveTimesheet_StopDateTime, 108) AS StopTime, ets.EvolveTimesheet_TotalMin, ets.EvolveShift_ID, eu.EvolveUser_Name, (SELECT EvolveReason_Code FROM EvolveReason WHERE EvolveReason_ID = ets.EvolveActivityCode_ID) as ActiveCode, (SELECT EvolveReason_Code FROM EvolveReason WHERE EvolveReason_ID = ets.EvolveScrapCode_ID) as ScrapCode, ets.EvolveTimesheet_ScrapQty, (SELECT EvolveUom_Uom FROM EvolveUom WHERE EvolveUom_ID = ets.EvolveScrapUOM) AS ScrapUom, ets.EvolveTimesheet_Comments, ets.EvolveTimesheet_ERPStatus FROM EvolveTimesheet ets LEFT JOIN EvolveWoSchedule wos ON ets.EvolveWoSchedule_ID = wos.EvolveWoSchedule_ID LEFT JOIN EvolveUser eu ON eu.EvolveUser_ID = ets.EvolveUser_ID WHERE ets.EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getMaterialToIssue: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveWoSchedule_ID', Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .query("SELECT (SELECT SUM(einv.EvolveInventory_QtyOnHand)  FROM EvolveInventory einv, EvolveLocation el WHERE einv.EvolveInventory_PostingStatus = 'ERPPOSTED' AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND el.EvolveLocation_Status = 'GOOD' AND einv.EvolveItem_ID = esb.EvolveSchedulingBom_CompItem_ID) as qtyHand, esb.EvolveSchedulingBom_ParentItem_ID, esb.EvolveSchedulingBom_CompItem_ID , esb.EvolveSchedulingBom_CompItem_ID as EvolveItem_ID, esb.EvolveSchedulingBom_ID , esb.EvolveSchedulingBom_QtyReq , esb.EvolveSchedulingBom_QtyIss , esb.EvolveSchedulingBom_QtyPick, ei.EvolveItem_Code , ei.EvolveItem_Desc  , euom.EvolveUom_Uom   FROM EvolveSchedulingBom esb  , EvolveItem ei , EvolveUom euom WHERE esb.EvolveWoSchedule_ID = @EvolveWoSchedule_ID AND esb.EvolveSchedulingBom_CompItem_ID = ei.EvolveItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID ORDER BY esb.EvolveSchedulingBom_DispSeq DESC")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getSubItems: async function (EvolveSubItem_ActualItemID) {
        try {
            console.log("EvolveSubItem_ActualItemID>> ", EvolveSubItem_ActualItemID)
            return await Evolve.SqlPool.request()
                .input('EvolveSubItem_ActualItemID', Evolve.Sql.Int, EvolveSubItem_ActualItemID)
                .query(" SELECT esbi.EvolveSubItem_SubItem_ID ,  ei.EvolveItem_Code ,  ei.EvolveItem_Desc    , euom.EvolveUom_Uom  FROM EvolveSubItem esbi, EvolveItem ei, EvolveUom euom  WHERE  EvolveSubItem_ActualItemID = @EvolveSubItem_ActualItemID AND  ei.EvolveItem_ID = esbi.EvolveSubItem_SubItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getQtyOnHAnd: async function (EvolveItem_ID, EvolveWoSchedule_ID) {
        try {

            let qtyHand = await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
                .query("SELECT SUM(einv.EvolveInventory_QtyOnHand) as qtyHand FROM EvolveInventory einv  ,EvolveLocation eloc WHERE  einv.EvolveItem_ID = @EvolveItem_ID AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED'  AND einv.EvolveItem_ID = @EvolveItem_ID AND einv.EvolveLocation_ID=eloc.EvolveLocation_ID AND eloc.EvolveLocation_Status='GOOD'");

            let qtyPick = await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
                .input('EvolveWoSchedule_ID', Evolve.Sql.Int, EvolveWoSchedule_ID)
                .query("SELECT SUM(EvolvePickListDetail_QtyPick) FROM EvolvePickListDetail as qtyPick  WHERE  EvolvePickListDetail_Status='PICKED' AND EvolveItem_ID != EvolveSubItem_SubItem_ID AND EvolveSubItem_SubItem_ID= @EvolveItem_ID AND EvolveWoSchedule_ID=@EvolveWoSchedule_ID");

            let qtyIssue = await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
                .input('EvolveWoSchedule_ID', Evolve.Sql.Int, EvolveWoSchedule_ID)
                .query("SELECT SUM(EvolvePickListDetail_IssQty) as qtyIssue FROM EvolvePickListDetail as qtyIssue  WHERE  EvolvePickListDetail_Status='ISSUED' AND EvolveItem_ID != EvolveSubItem_SubItem_ID AND EvolveSubItem_SubItem_ID= @EvolveItem_ID AND EvolveWoSchedule_ID=@EvolveWoSchedule_ID");

            let qtyDetails = {
                qtyHand: qtyHand.recordset[0].qtyHand,
                qtyPick: qtyPick.recordset[0].qtyPick,
                qtyIssue: qtyIssue.recordset[0].qtyIssue,
            }

            return qtyDetails
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    AddWosPlannerComment: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .input("EvolveWoSchedule_Comments", Evolve.Sql.NVarChar, data.EvolveWoSchedule_Comments)
                .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_Comments = @EvolveWoSchedule_Comments WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getWOSSingleData: async function (data) {
        try {
            let getMachine = await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .query("SELECT EvolveMachine_ID FROM EvolveWoSchedule WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
            let EvolveMachine_ID = getMachine.recordset[0].EvolveMachine_ID;
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, data.EvolveWoSchedule_SEQ)
                .input("EvolveMachine_ID", Evolve.Sql.Int, EvolveMachine_ID)
                .query("SELECT wos.*, CONVERT(VARCHAR, wos.EvolveWoSchedule_Date , 103) AS wosDate, CONVERT(VARCHAR, wos.EvolveWoSchedule_OrderDueDate , 103) AS wosDueDate,CONVERT(VARCHAR, wos.EvolveWoSchedule_ReleaseDate , 103) AS wosReleaseDate, epo.EvolveProdOrders_Type, epo.EvolveProdOrders_Quantity, epo.EvolveProdOrders_Order FROM EvolveWoSchedule wos LEFT JOIN EvolveProdOrders epo ON epo.EvolveProdOrders_ID = wos.EvolveProdOrders_ID WHERE wos.EvolveWoSchedule_SEQ >= @EvolveWoSchedule_SEQ AND wos.EvolveMachine_ID = @EvolveMachine_ID AND wos.EvolveWoSchedule_IsDownTime = 'false' ORDER BY wos.EvolveWoSchedule_SEQ ASC")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    updateWOScheduling: async function (data) {
        try {

            let StartDateTimefull = data.EvolveWoSchedule_StartDateTime.split(' ')
            let dt = StartDateTimefull[0].split("/")
            let StartTime = StartDateTimefull[1]
            let EvolveWoSchedule_StartDateTime = dt[2] + "-" + dt[1] + "-" + dt[0] + " " + StartTime;

            let EndDateTimefull = data.EvolveWoSchedule_EndDateTime.split(' ')
            dt = EndDateTimefull[0].split("/")
            let EndTime = EndDateTimefull[1]
            let EvolveWoSchedule_EndDateTime = dt[2] + "-" + dt[1] + "-" + dt[0] + " " + EndTime;

            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .input("EvolveWoSchedule_StartDateTime", Evolve.Sql.NVarChar, EvolveWoSchedule_StartDateTime)
                .input("EvolveWoSchedule_EndDateTime", Evolve.Sql.NVarChar, EvolveWoSchedule_EndDateTime)
                .input("EvolveWoSchedule_OrderQty", Evolve.Sql.Int, data.EvolveWoSchedule_OrderQty)
                .input("EvolveShift_ID", Evolve.Sql.Int, data.EvolveShift_ID)
                .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_StartDateTime = @EvolveWoSchedule_StartDateTime, EvolveWoSchedule_EndDateTime = @EvolveWoSchedule_EndDateTime, EvolveWoSchedule_OrderQty = @EvolveWoSchedule_OrderQty, EvolveShift_ID = @EvolveShift_ID WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    wosPlanPause: async function (data) {
        try {

            let updatedata = await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .input("EvolveWoSchedule_OrderQty", Evolve.Sql.NVarChar, data.CompleteQty)
                .input("EvolveWoSchedule_EndDateTime", Evolve.Sql.NVarChar, data.CompleteDate)
                .input("EvolveWoSchedule_Status", Evolve.Sql.NVarChar, 'completed')
                .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_EndDateTime = @EvolveWoSchedule_EndDateTime, EvolveWoSchedule_OrderQty = @EvolveWoSchedule_OrderQty, EvolveWoSchedule_Status = @EvolveWoSchedule_Status WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .query("SELECT wos.EvolveProdOrders_ID, epo.EvolveProdOrders_OrderId, convert(varchar, wos.EvolveWoSchedule_OrderDate, 20) AS EvolveWoSchedule_OrderDate, convert(varchar, wos.EvolveWoSchedule_OrderDueDate, 20) AS EvolveWoSchedule_OrderDueDate, wos.EvolveItem_ID, wos.EvolveShift_ID, wos.EvolveMachine_ID, wos.EvolveUOM_ID, convert(varchar, wos.EvolveWoSchedule_Date, 20) AS EvolveWoSchedule_Date, wos.EvolveWoSchedule_SetupTime, wos.EvolveWoSchedule_CycleTime, convert(varchar, wos.EvolveWoSchedule_ReleaseDate, 20) AS EvolveWoSchedule_ReleaseDate FROM EvolveWoSchedule wos, EvolveProdOrders epo WHERE epo.EvolveProdOrders_ID = wos.EvolveProdOrders_ID AND wos.EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    // addWosRemaingPlan: async function (data, tableData) {
    //     try {

    //         let EvolveWoSchedule_OrderID = tableData.EvolveWoSchedule_OrderID + '' + data.wosOrderID;
    //         let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

    //         return await Evolve.SqlPool.request()
    //             .input("EvolveProdOrders_ID", Evolve.Sql.Int, tableData.EvolveProdOrders_ID)
    //             .input("EvolveWoSchedule_OrderID", Evolve.Sql.Int, EvolveWoSchedule_OrderID)
    //             .input("EvolveWoSchedule_OrderDate", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_OrderDate)
    //             .input("EvolveWoSchedule_OrderDueDate", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_OrderDueDate)
    //             .input("EvolveWoSchedule_ReleaseDate", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_ReleaseDate)
    //             .input("EvolveItem_ID", Evolve.Sql.Int, tableData.EvolveItem_ID)
    //             .input("EvolveWoSchedule_OrderQty", Evolve.Sql.Int, tableData.EvolveWoSchedule_OrderQty)

    //             .input("EvolveShift_ID", Evolve.Sql.Int, tableData.EvolveShift_ID)

    //             .input("EvolveMachine_ID", Evolve.Sql.Int, tableData.EvolveMachine_ID)
    //             .input("EvolveUOM_ID", Evolve.Sql.Int, tableData.EvolveUOM_ID)

    //             .input("EvolveWoSchedule_SetupTime", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_SetupTime)
    //             .input("EvolveWoSchedule_CycleTime", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_CycleTime)

    //             .input("EvolveWoSchedule_StartDateTime", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_StartDateTime)
    //             .input("EvolveWoSchedule_EndDateTime", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_EndDateTime)
    //             .input("EvolveWOSchedule_ISLock", Evolve.Sql.NVarChar, false)
    //             .input("EvolveWoSchedule_IsSplit", Evolve.Sql.NVarChar, data.EvolveWoSchedule_IsSplit)
    //             .input("EvolveWoSchedule_Date", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_Date)
    //             .input("EvolveWoSchedule_Status", Evolve.Sql.NVarChar, 'planned')
    //             .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, data.EvolveWoSchedule_SEQ)

    //             .input("EvolveWoSchedule_CreatedAt", Evolve.Sql.NVarChar, dateTime)
    //             .input("EvolveWoSchedule_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input("EvolveWoSchedule_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
    //             .input("EvolveWoSchedule_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

    //             .query("INSERT INTO EvolveWoSchedule (EvolveProdOrders_ID, EvolveWoSchedule_OrderID, EvolveWoSchedule_OrderDate,EvolveWoSchedule_OrderDueDate, EvolveItem_ID, EvolveWoSchedule_OrderQty, EvolveShift_ID, EvolveMachine_ID, EvolveWoSchedule_SetupTime, EvolveWoSchedule_CycleTime, EvolveWoSchedule_StartDateTime, EvolveWoSchedule_EndDateTime, EvolveWOSchedule_ISLock, EvolveWoSchedule_CreatedAt, EvolveWoSchedule_CreatedUser, EvolveWoSchedule_UpdatedAt, EvolveWoSchedule_UpdatedUser, EvolveUOM_ID, EvolveWoSchedule_Date, EvolveWoSchedule_Status, EvolveWoSchedule_SEQ, EvolveWoSchedule_ReleaseDate, EvolveWoSchedule_IsSplit) VALUES (@EvolveProdOrders_ID, @EvolveWoSchedule_OrderID, @EvolveWoSchedule_OrderDate, @EvolveWoSchedule_OrderDueDate, @EvolveItem_ID, @EvolveWoSchedule_OrderQty, @EvolveShift_ID,  @EvolveMachine_ID, @EvolveWoSchedule_SetupTime, @EvolveWoSchedule_CycleTime, @EvolveWoSchedule_StartDateTime, @EvolveWoSchedule_EndDateTime, @EvolveWOSchedule_ISLock, @EvolveWoSchedule_CreatedAt, @EvolveWoSchedule_CreatedUser, @EvolveWoSchedule_UpdatedAt, @EvolveWoSchedule_UpdatedUser, @EvolveUOM_ID, @EvolveWoSchedule_Date, @EvolveWoSchedule_Status, @EvolveWoSchedule_SEQ, @EvolveWoSchedule_ReleaseDate, @EvolveWoSchedule_IsSplit)")
    //     } catch (error) {
    //         Evolve.Log.error(error.message);
    //         return new Error(error.message);
    //     }
    // },
    getWosSplitData: async function (data) {
        try {

            let getMachine = await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .query("SELECT EvolveMachine_ID FROM EvolveWoSchedule WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")

            let EvolveMachine_ID = getMachine.recordset[0].EvolveMachine_ID;
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, data.EvolveWoSchedule_SEQ)
                .input("EvolveMachine_ID", Evolve.Sql.Int, EvolveMachine_ID)
                .query("SELECT wos.EvolveWoSchedule_ID, wos.EvolveShift_ID, wos.EvolveMachine_ID, wos.EvolveWoSchedule_SetupTime, wos.EvolveWoSchedule_CycleTime, wos.EvolveItem_ID, wos.EvolveProdOrders_ID, wos.EvolveWoSchedule_StartDateTime, wos.EvolveWoSchedule_OrderQty, wos.EvolveWoSchedule_EndDateTime, wos.EvolveWoSchedule_SEQ, wos.EvolveWOSchedule_ISLock FROM EvolveWoSchedule wos WHERE wos.EvolveWoSchedule_SEQ >= @EvolveWoSchedule_SEQ AND wos.EvolveMachine_ID = @EvolveMachine_ID ORDER BY wos.EvolveWoSchedule_SEQ ASC")

            // console.log('data=', data)
            // let getlastID = await Evolve.SqlPool.request()
            //     .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
            //     .query("SELECT TOP(1)EvolveWoSchedule_ID FROM EvolveWoSchedule WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID ORDER BY EvolveWoSchedule_SEQ DESC")
            // if (getlastID.recordset[0].EvolveWoSchedule_ID == data.EvolveWoSchedule_ID) {

            //     let getMachine = await Evolve.SqlPool.request()
            //         .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
            //         .query("SELECT EvolveMachine_ID FROM EvolveWoSchedule WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")

            //     let EvolveMachine_ID = getMachine.recordset[0].EvolveMachine_ID;
            //     return await Evolve.SqlPool.request()
            //         .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
            //         .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, data.EvolveWoSchedule_SEQ)
            //         .input("EvolveMachine_ID", Evolve.Sql.Int, EvolveMachine_ID)
            //         .query("SELECT wos.EvolveWoSchedule_ID, wos.EvolveShift_ID, wos.EvolveMachine_ID, wos.EvolveWoSchedule_SetupTime, wos.EvolveWoSchedule_CycleTime, wos.EvolveItem_ID, wos.EvolveProdOrders_ID, wos.EvolveWoSchedule_StartDateTime, wos.EvolveWoSchedule_OrderQty, wos.EvolveWoSchedule_EndDateTime, wos.EvolveWoSchedule_SEQ, wos.EvolveWOSchedule_ISLock FROM EvolveWoSchedule wos WHERE wos.EvolveWoSchedule_SEQ >= @EvolveWoSchedule_SEQ AND wos.EvolveMachine_ID = @EvolveMachine_ID ORDER BY wos.EvolveWoSchedule_SEQ ASC")
            // } else {
            //     return false;
            // }
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    // getSingleWOSData: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
    //             .query("SELECT wos.EvolveProdOrders_ID, epo.EvolveProdOrders_OrderId, convert(varchar, wos.EvolveWoSchedule_OrderDate, 20) AS EvolveWoSchedule_OrderDate, wos.EvolveWoSchedule_OrderQty, convert(varchar, wos.EvolveWoSchedule_OrderDueDate, 20) AS EvolveWoSchedule_OrderDueDate, wos.EvolveItem_ID, wos.EvolveShift_ID, wos.EvolveMachine_ID, wos.EvolveUOM_ID, convert(varchar, wos.EvolveWoSchedule_Date, 20) AS EvolveWoSchedule_Date, wos.EvolveWoSchedule_SetupTime, wos.EvolveWoSchedule_CycleTime, convert(varchar, wos.EvolveWoSchedule_ReleaseDate, 20) AS EvolveWoSchedule_ReleaseDate FROM EvolveWoSchedule wos, EvolveProdOrders epo WHERE epo.EvolveProdOrders_ID = wos.EvolveProdOrders_ID AND wos.EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
    //     } catch (error) {
    //         Evolve.Log.error(error.message);
    //         return new Error(error.message);
    //     }
    // },
    getLastWosMachineTime: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveMachine_ID", Evolve.Sql.Int, data.EvolveMachine_ID)
                .query("SELECT TOP(1) EvolveWoSchedule_EndDateTime FROM EvolveWoSchedule WHERE EvolveMachine_ID = @EvolveMachine_ID ORDER BY EvolveWoSchedule_SEQ DESC")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getDepartmentToMachineList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveSection_ID", Evolve.Sql.Int, data.EvolveSection_ID)
                .query("SELECT EvolveMachine_ID, EvolveMachine_Name FROM EvolveMachine WHERE EvolveSection_ID = @EvolveSection_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getMachineID: async function (machineName) {

        try {
            return await Evolve.SqlPool.request()
                .input("EvolveMachine_Name", Evolve.Sql.NVarChar, machineName)
                .query("SELECT EvolveMachine_ID FROM EvolveMachine WHERE EvolveMachine_Name = @EvolveMachine_Name")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getReaonCodeList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveReason_ID,EvolveReason_Name,EvolveReason_Code FROM EvolveReason")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    AddWosDownTimeReasonCode: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .input("EvolveReason_ID", Evolve.Sql.Int, data.EvolveReason_ID)
                .query("UPDATE EvolveWoSchedule SET EvolveReason_ID = @EvolveReason_ID WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    publishPlan: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .input("EvolveWoSchedule_Status", Evolve.Sql.NVarChar, 'published')
                .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_Status = @EvolveWoSchedule_Status WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    addSchedulingPubComment: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveSchedulePubComnt_Msg", Evolve.Sql.NVarChar, data.EvolveWoSchedule_Comments)
                .input("EvolveSchedulePubComnt_Time", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveMachine_ID", Evolve.Sql.Int, data.EvolveMachine_ID)
                .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
                .query("INSERT INTO EvolveSchedulePubComnt (EvolveMachine_ID, EvolveSchedulePubComnt_Msg, EvolveSchedulePubComnt_Time, EvolveUser_ID) VALUES (@EvolveMachine_ID, @EvolveSchedulePubComnt_Msg, @EvolveSchedulePubComnt_Time, @EvolveUser_ID)")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    deleteOldPlanData: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            let deleteBom = await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, data.EvolveWoSchedule_SEQ)
                .input("EvolveMachine_ID", Evolve.Sql.Int, data.EvolveMachine_ID)
                .query("DELETE EvolveSchedulingBom FROM EvolveSchedulingBom LEFT JOIN EvolveWoSchedule ON EvolveSchedulingBom.EvolveWoSchedule_ID = EvolveWoSchedule.EvolveWoSchedule_ID WHERE EvolveWoSchedule.EvolveWoSchedule_SEQ >= @EvolveWoSchedule_SEQ AND EvolveWoSchedule.EvolveMachine_ID = @EvolveMachine_ID")

            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, data.EvolveWoSchedule_SEQ)
                .input("EvolveMachine_ID", Evolve.Sql.Int, data.EvolveMachine_ID)
                .query("DELETE FROM EvolveWoSchedule WHERE EvolveWoSchedule_SEQ >= @EvolveWoSchedule_SEQ AND EvolveMachine_ID = @EvolveMachine_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
}
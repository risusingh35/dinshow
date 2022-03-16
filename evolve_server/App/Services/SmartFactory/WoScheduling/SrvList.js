'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemSearch: async function (search) {
        console.log(search)
        try {
            if (search == '') {
                let query = "SELECT TOP(5) EvolveItem_Code as title, EvolveItem_ID as id FROM EvolveItem WHERE ORDER BY EvolveItem_ID DESC"
                return await Evolve.SqlPool.request().query(query);
            } else {
                let query = "SELECT EvolveItem_Code as title, EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE '%" + search + "%'"
                return await Evolve.SqlPool.request().query(query);
            }
        } catch (error) {
            Evolve.Log.error(" EERR1994: Error while getting Item Search "+error.message);
            return new Error(" EERR1994: Error while getting Item Search "+error.message);
        }
    },

    getWorkOrderList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveProdOrders_ID, EvolveProdOrders_Order, EvolveProdOrders_OrderId FROM EvolveProdOrders WHERE EvolveProdOrders_Status = 'OPEN' ")
        } catch (error) {
            Evolve.Log.error(" EERR1995: Error while getting Work Order List "+error.message);
            return new Error(" EERR1995: Error while getting Work Order List "+error.message);
        }
    },

    getShiftList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveShift_ID, EvolveShift_Name, EvolveShift_Start, EvolveShift_End FROM EvolveShift ")
        } catch (error) {
            Evolve.Log.error(" EERR1996: Error while getting Shift List "+error.message);
            return new Error(" EERR1996: Error while getting Shift List "+error.message);
        }
    },
    getShiftMinMaxTime: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT min(EvolveShift_Start) AS  minTime, max(EvolveShift_End) AS  maxTime FROM EvolveShift")
        } catch (error) {
            Evolve.Log.error(" EERR1997: Error while getting Shift Min Max Time "+error.message);
            return new Error(" EERR1997: Error while getting Shift Min Max Time "+error.message);
        }
    },
    getDepartmentList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveSection_ID, EvolveSection_Name FROM EvolveSection")
        } catch (error) {
            Evolve.Log.error(" EERR1998: Error while getting Department List "+error.message);
            return new Error(" EERR1998: Error while getting Department List "+error.message);
        }
    },
    getItemList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT ei.EvolveItem_ID, ei.EvolveItem_Code, euom.EvolveUom_ID, euom.EvolveUom_Uom, EvolveItem_CycleTime FROM EvolveItem ei, EvolveUom euom WHERE ei.EvolveUom_ID = euom.EvolveUom_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1999: Error while gettting Item List "+error.message);
            return new Error(" EERR1999: Error while gettting Item List "+error.message);
        }
    },

    getMachineList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveMachine_ID, EvolveMachine_Name FROM EvolveMachine ")
        } catch (error) {
            Evolve.Log.error(" EERR2000: Error while getting Machine List "+error.message);
            return new Error(" EERR2000: Error while getting Machine List "+error.message);
        }
    },
    getWoSchedulingList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT ewos.EvolveWoSchedule_ID, ewos.EvolveWoSchedule_SEQ, convert(varchar, ewos.EvolveWoSchedule_Date, 103) as wosDate,  ewos.EvolveWoSchedule_OrderID, epro.EvolveProdOrders_Order, eshift.EvolveShift_Name, eitem.EvolveItem_Code, eitem.EvolveItem_Desc, ewos.EvolveWoSchedule_Status, euom.EvolveUom_Uom,  emachine.EvolveMachine_Name, ewos.EvolveWoSchedule_SetupTime, CONVERT(VARCHAR(5), ewos.EvolveWoSchedule_StartDateTime , 108) AS StartTime,CONVERT(VARCHAR(5), ewos.EvolveWoSchedule_EndDateTime , 108) AS EndTime, ewos.EvolveWoSchedule_OrderQty, ewos.EvolveWoSchedule_CycleTime, ewos.EvolveLocation_ID, esection.EvolveSection_Name FROM EvolveWoSchedule ewos, EvolveProdOrders epro, EvolveShift eshift, EvolveItem eitem, EvolveMachine emachine, EvolveSection esection, EvolveUom euom WHERE ewos.EvolveProdOrders_ID = epro.EvolveProdOrders_ID AND ewos.EvolveShift_ID = eshift.EvolveShift_ID AND ewos.EvolveItem_ID = eitem.EvolveItem_ID AND ewos.EvolveMachine_ID = emachine.EvolveMachine_ID AND ewos.EvolveSection_ID = esection.EvolveSection_ID AND ewos.EvolveUom_ID = euom.EvolveUom_ID ORDER BY EvolveWoSchedule_SEQ ASC")
        } catch (error) {
            Evolve.Log.error(" EERR2001: Error while getting Wo Scheduling List "+error.message);
            return new Error(" EERR2001: Error while getting Wo Scheduling List "+error.message);
        }
    },
    deleteWos: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, data.EvolveWoSchedule_ID)
                .query("DELETE FROM EvolveWoSchedule WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(" EERR2002: Error while deleting Wos "+error.message);
            return new Error(" EERR2002: Error while deleting Wos "+error.message);
        }
    },
    getWOSSqcNo: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT TOP(1)EvolveWoSchedule_ID FROM EvolveWoSchedule ORDER BY EvolveWoSchedule_ID DESC")
        } catch (error) {
            Evolve.Log.error(" EERR2003: Error while getting WO SS qc No "+error.message);
            return new Error(" EERR2003: Error while getting WO SS qc No "+error.message);
        }
    },

    addWOScheduling: async function (data, tableData) {
        try {
            console.log("tableData", tableData)
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            console.log("dateTime", dateTime);

            let dt = tableData.EvolveWoSchedule_Date.split("/")
            let EvolveWoSchedule_Date = dt[2] + "-" + dt[1] + "-" + dt[0];

            let StartDateTimefull = tableData.EvolveWoSchedule_StartDateTime.split(' ')
            dt = StartDateTimefull[0].split("/")
            let StartTime = StartDateTimefull[1]
            let EvolveWoSchedule_StartDateTime = dt[2] + "-" + dt[1] + "-" + dt[0] + " " + StartTime;

            let EndDateTimefull = tableData.EvolveWoSchedule_EndDateTime.split(' ')
            dt = EndDateTimefull[0].split("/")
            let EndTime = EndDateTimefull[1]
            let EvolveWoSchedule_EndDateTime = dt[2] + "-" + dt[1] + "-" + dt[0] + " " + EndTime;

            dt = tableData.EvolveWoSchedule_OrderDate.split("/")
            let EvolveWoSchedule_OrderDate = dt[2] + "-" + dt[1] + "-" + dt[0];

            dt = tableData.EvolveWoSchedule_OrderDueDate.split("/")
            let EvolveWoSchedule_OrderDueDate = dt[2] + "-" + dt[1] + "-" + dt[0];

            console.log("EvolveWoSchedule_Date", EvolveWoSchedule_Date);
            console.log("EvolveWoSchedule_StartDateTime", EvolveWoSchedule_StartDateTime);
            console.log("EvolveWoSchedule_EndDateTime", EvolveWoSchedule_EndDateTime);
            console.log("EvolveWoSchedule_OrderDate", EvolveWoSchedule_OrderDate);
            console.log("EvolveWoSchedule_OrderDueDate", EvolveWoSchedule_OrderDueDate);
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_ID", Evolve.Sql.Int, tableData.EvolveProdOrders_ID)
                .input("EvolveWoSchedule_OrderID", Evolve.Sql.NVarChar, data.EvolveWoSchedule_OrderID)
                .input("EvolveWoSchedule_OrderDate", Evolve.Sql.NVarChar, EvolveWoSchedule_OrderDate)
                .input("EvolveWoSchedule_OrderDueDate", Evolve.Sql.NVarChar, EvolveWoSchedule_OrderDueDate)
                .input("EvolveItem_ID", Evolve.Sql.Int, tableData.EvolveItem_ID)
                .input("EvolveWoSchedule_OrderQty", Evolve.Sql.Int, tableData.EvolveWoSchedule_OrderQty)

                .input("EvolveShift_ID", Evolve.Sql.Int, tableData.EvolveShift_ID)
                .input("EvolveSection_ID", Evolve.Sql.Int, tableData.EvolveSection_ID)
                .input("EvolveMachine_ID", Evolve.Sql.Int, tableData.EvolveMachine_ID)
                .input("EvolveUOM_ID", Evolve.Sql.Int, tableData.EvolveUOM_ID)

                .input("EvolveWoSchedule_SetupTime", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_SetupTime)
                .input("EvolveWoSchedule_CycleTime", Evolve.Sql.NVarChar, tableData.EvolveWoSchedule_CycleTime)

                .input("EvolveWoSchedule_StartDateTime", Evolve.Sql.NVarChar, EvolveWoSchedule_StartDateTime)
                .input("EvolveWoSchedule_EndDateTime", Evolve.Sql.NVarChar, EvolveWoSchedule_EndDateTime)
                .input("EvolveWoSchedule_Date", Evolve.Sql.NVarChar, EvolveWoSchedule_Date)
                .input("EvolveWoSchedule_Status", Evolve.Sql.NVarChar, 'OPEN')
                .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, data.EvolveWoSchedule_SEQ)

                .input("EvolveWoSchedule_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveWoSchedule_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveWoSchedule_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveWoSchedule_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveWoSchedule (EvolveProdOrders_ID, EvolveWoSchedule_OrderID, EvolveWoSchedule_OrderDate,EvolveWoSchedule_OrderDueDate, EvolveItem_ID, EvolveWoSchedule_OrderQty, EvolveShift_ID, EvolveSection_ID, EvolveMachine_ID, EvolveWoSchedule_SetupTime, EvolveWoSchedule_CycleTime, EvolveWoSchedule_StartDateTime, EvolveWoSchedule_EndDateTime, EvolveWoSchedule_CreatedAt, EvolveWoSchedule_CreatedUser, EvolveWoSchedule_UpdatedAt, EvolveWoSchedule_UpdatedUser, EvolveUOM_ID, EvolveWoSchedule_Date, EvolveWoSchedule_Status, EvolveWoSchedule_SEQ) VALUES (@EvolveProdOrders_ID, @EvolveWoSchedule_OrderID, @EvolveWoSchedule_OrderDate, @EvolveWoSchedule_OrderDueDate, @EvolveItem_ID, @EvolveWoSchedule_OrderQty, @EvolveShift_ID, @EvolveSection_ID, @EvolveMachine_ID, @EvolveWoSchedule_SetupTime, @EvolveWoSchedule_CycleTime, @EvolveWoSchedule_StartDateTime, @EvolveWoSchedule_EndDateTime, @EvolveWoSchedule_CreatedAt, @EvolveWoSchedule_CreatedUser, @EvolveWoSchedule_UpdatedAt, @EvolveWoSchedule_UpdatedUser, @EvolveUOM_ID, @EvolveWoSchedule_Date, @EvolveWoSchedule_Status, @EvolveWoSchedule_SEQ)")
        } catch (error) {
            Evolve.Log.error(" EERR2004: Error while adding WO Scheduling "+error.message);
            return new Error(" EERR2004: Error while adding WO Scheduling "+error.message);
        }
    },
    updateWOSSqc: async function (tableData, newSqc) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveWoSchedule_SEQ", Evolve.Sql.Int, newSqc)
                .input("EvolveWoSchedule_ID", Evolve.Sql.Int, tableData.EvolveWoSchedule_ID)
                .query("UPDATE EvolveWoSchedule SET EvolveWoSchedule_SEQ = @EvolveWoSchedule_SEQ WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
        } catch (error) {
            Evolve.Log.error(" EERR2005: Error while updating WO SS qc "+error.message);
            return new Error(" EERR2005: Error while updating WO SS qc "+error.message);
        }
    },
    getPreviousShiftAvailableTime: async function (data) {
        console.log("data", data)
        let dt = data.EvolveWoSchedule_Date.split("/")
        let EvolveWoSchedule_Date = dt[2] + "-" + dt[1] + "-" + dt[0];
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveShift_ID", Evolve.Sql.Int, data.EvolveShift_ID)
                .input("EvolveWoSchedule_Date", Evolve.Sql.Int, EvolveWoSchedule_Date)
                .query("SELECT  EvolveWoSchedule_ID, EvolveShift_ID, EvolveMachine_ID, convert(varchar, EvolveWoSchedule_EndDateTime, 103) as wosEndDate, CONVERT(VARCHAR(5), EvolveWoSchedule_EndDateTime , 108) AS wosEndTime FROM EvolveWoSchedule WHERE cast(EvolveWoSchedule_EndDateTime as date) >= FORMAT(getDate(), '" + EvolveWoSchedule_Date + "') ")
        } catch (error) {
            Evolve.Log.error(" EERR2006: Error while getting Previous Shift Available Time "+error.message);
            return new Error(" EERR2006: Error while getting Previous Shift Available Time "+error.message);
        }
    },
    getItemWorkOrderList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
                .query("SELECT EvolveProdOrders_Order, EvolveProdOrders_ID FROM EvolveProdOrders WHERE EvolveItem_ID = @EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR2007: Error while getting Item Work Order List "+error.message);
            return new Error(" EERR2007: Error while getting Item Work Order List "+error.message);
        }
    },
    getListByWorkOrderID: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
                .query("SELECT epo.*, CONVERT(VARCHAR, epo.EvolveProdOrder_DueDate , 103) AS DueDate, CONVERT(VARCHAR, epo.EvolveProdOrder_ReleaseDate , 103) AS ReleaseDate, epob.EvolveProdOrderBom_CycleTime, epob.EvolveProdOrderBom_SetupTime FROM EvolveProdOrders epo, EvolveProdOrderBom epob WHERE epo.EvolveProdOrders_ID = @EvolveProdOrders_ID AND epob.EvolveProdOrders_ID = @EvolveProdOrders_ID")
        } catch (error) {
            Evolve.Log.error(" EERR2008: Error while getting List By Work Order ID "+error.message);
            return new Error(" EERR2008: Error while getting List By Work Order ID "+error.message);
        }
    },
}
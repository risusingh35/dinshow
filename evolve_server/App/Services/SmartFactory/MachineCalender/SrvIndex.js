'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getMachineList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveMachine");
        } catch (error) {
            Evolve.Log.error(" EERR2486: Error while getting machine list "+error.message);
            return new Error(" EERR2486: Error while getting machine list "+error.message);
        }
    },

    saveMachineCalendar : async function (data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear() +"-" + (date.getMonth() + 1) +"-" +date.getDate() +" " +date.getHours() +":" +date.getMinutes() +":" + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input("EvolveMachine_ID",Evolve.Sql.Int,data.EvolveMachine_ID)
                .input("EvolveMachineCalendar_Date",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Date)
                .input("EvolveMachineCalendar_ShiftType",Evolve.Sql.Int,data.EvolveMachineCalendar_ShiftType)
                .input("EvolveMachineCalendar_StdHours",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_StdHours)
                .input("EvolveMachineCalendar_Shift1",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift1)
                .input("EvolveMachineCalendar_Shift1StartTime",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift1StartTime)
                .input("EvolveMachineCalendar_Shift2",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift2)
                .input("EvolveMachineCalendar_Shift2StartTime",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift2StartTime)
                .input("EvolveMachineCalendar_Shift3",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift3)
                .input("EvolveMachineCalendar_Shift3StartTime",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift3StartTime)
                .input("EvolveMachineCalendar_CreatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
                .input("EvolveMachineCalendar_CreatedAt",Evolve.Sql.NVarChar,dataTime)
                .input("EvolveMachineCalendar_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
                .input("EvolveMachineCalendar_UpdatedAt",Evolve.Sql.NVarChar,dataTime)
                .query("INSERT INTO EvolveMachineCalendar (EvolveMachine_ID,EvolveMachineCalendar_Date,EvolveMachineCalendar_ShiftType,EvolveMachineCalendar_StdHours,EvolveMachineCalendar_Shift1,EvolveMachineCalendar_Shift1StartTime,EvolveMachineCalendar_Shift2,EvolveMachineCalendar_Shift2StartTime,EvolveMachineCalendar_Shift3,EvolveMachineCalendar_Shift3StartTime,EvolveMachineCalendar_CreatedUser,EvolveMachineCalendar_CreatedAt,EvolveMachineCalendar_UpdatedUser,EvolveMachineCalendar_UpdatedAt) VALUES (@EvolveMachine_ID,@EvolveMachineCalendar_Date,@EvolveMachineCalendar_ShiftType,@EvolveMachineCalendar_StdHours,@EvolveMachineCalendar_Shift1,@EvolveMachineCalendar_Shift1StartTime,@EvolveMachineCalendar_Shift2,@EvolveMachineCalendar_Shift2StartTime,@EvolveMachineCalendar_Shift3,@EvolveMachineCalendar_Shift3StartTime,@EvolveMachineCalendar_CreatedUser,@EvolveMachineCalendar_CreatedAt,@EvolveMachineCalendar_UpdatedUser,@EvolveMachineCalendar_UpdatedAt)");
        } catch (error) {
            Evolve.Log.error(" EERR2489: Error while save machine calendar "+error.message);
            return new Error(" EERR2489: Error while save machine calendar "+error.message);
        }
    },

    updateMachineCalendar : async function (data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear() +"-" + (date.getMonth() + 1) +"-" +date.getDate() +" " +date.getHours() +":" +date.getMinutes() +":" + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input("EvolveMachineCalendar_ID",Evolve.Sql.Int,data.EvolveMachineCalendar_ID)
                .input("EvolveMachineCalendar_ShiftType",Evolve.Sql.Int,data.EvolveMachineCalendar_ShiftType)
                .input("EvolveMachineCalendar_StdHours",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_StdHours)
                .input("EvolveMachineCalendar_Shift1",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift1)
                .input("EvolveMachineCalendar_Shift1StartTime",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift1StartTime)
                .input("EvolveMachineCalendar_Shift2",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift2)
                .input("EvolveMachineCalendar_Shift2StartTime",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift2StartTime)
                .input("EvolveMachineCalendar_Shift3",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift3)
                .input("EvolveMachineCalendar_Shift3StartTime",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Shift3StartTime)
                .input("EvolveMachineCalendar_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
                .input("EvolveMachineCalendar_UpdatedAt",Evolve.Sql.NVarChar,dataTime)
                .query("UPDATE EvolveMachineCalendar SET EvolveMachineCalendar_ShiftType = @EvolveMachineCalendar_ShiftType ,EvolveMachineCalendar_StdHours = @EvolveMachineCalendar_StdHours ,EvolveMachineCalendar_Shift1 = @EvolveMachineCalendar_Shift1,EvolveMachineCalendar_Shift1StartTime = @EvolveMachineCalendar_Shift1StartTime ,EvolveMachineCalendar_Shift2 = @EvolveMachineCalendar_Shift2,EvolveMachineCalendar_Shift2StartTime = @EvolveMachineCalendar_Shift2StartTime,EvolveMachineCalendar_Shift3 = @EvolveMachineCalendar_Shift3 ,EvolveMachineCalendar_Shift3StartTime = @EvolveMachineCalendar_Shift3StartTime,EvolveMachineCalendar_UpdatedUser = @EvolveMachineCalendar_UpdatedUser ,EvolveMachineCalendar_UpdatedAt = @EvolveMachineCalendar_UpdatedAt WHERE EvolveMachineCalendar_ID = @EvolveMachineCalendar_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2536: Error while update machine calendar "+error.message);
            return new Error(" EERR2536: Error while update machine calendar "+error.message);
        }
    },

    checkMachineCalAlreadyExit: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveMachineCalendar_Date",Evolve.Sql.NVarChar,data.EvolveMachineCalendar_Date)
                .input("EvolveMachine_ID",Evolve.Sql.Int,data.EvolveMachine_ID)
                .query("SELECT EvolveMachineCalendar_ID FROM EvolveMachineCalendar WHERE EvolveMachineCalendar_Date = @EvolveMachineCalendar_Date  AND EvolveMachine_ID = @EvolveMachine_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2533: Error while getting exit single machine calendar data "+error.message);
            return new Error(" EERR2533: Error while getting exit single machine calendar data");
        }
    },

    checkAlreadyExistCal: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("month",Evolve.Sql.Int,data.calMonth)
                .input("year",Evolve.Sql.Int,data.calYear)
                .query("SELECT * FROM EvolveMachineCalendar WHERE MONTH(EvolveMachineCalendar_Date) = @month  AND YEAR(EvolveMachineCalendar_Date) = @year");
        } catch (error) {
            Evolve.Log.error(" EERR2532: Error while getting exit machine calendar data "+error.message);
            return new Error(" EERR2532: Error while getting exit machine calendar data");
        }
    },
 
    getShiftStartTimes : async function (EvolveShift_Type) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveShift_Type",Evolve.Sql.Int,EvolveShift_Type)
                .query("SELECT * FROM EvolveShift WHERE EvolveShift_Type = @EvolveShift_Type ORDER BY EvolveShift_Start asc");
        } catch (error) {
            Evolve.Log.error(" EERR2538: Error while getting shifts startTimes "+error.message);
            return new Error(" EERR2538: Error while getting shifts startTimes");
        }
    },
}
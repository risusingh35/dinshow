'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

     // Dashboard : start

     getBotListForDashabord : async function(){
        try {
            return await Evolve.SqlPool.request()
                .query("Select * from EvolveBot ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting BOT List " + error.message);
            return new Error(" EERR####: Error while getting BOT List " + error.message);
        }
    },

    getDateWiseCountForCompletedForBarChart : async function(data){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveBot_UrlID', Evolve.Sql.Int, data.EvolveBot_UrlID)
                .query("SELECT  COUNT(*) AS 'Completed', convert(varchar, EvolveBotHistory_CreatedAt, 23) as 'date' from EvolveBotHistory WHERE cast(EvolveBotHistory_CreatedAt as date) >= FORMAT(getDate(), '" + data.StartDate + "') AND cast(EvolveBotHistory_CreatedAt as date) <= FORMAT(getDate(),  '" + data.EndDate + "') AND EvolveBotHistory_Status = 'Completed' AND EvolveBot_UrlID = '" + data.EvolveBot_UrlID + "' GROUP BY  convert(varchar, EvolveBotHistory_CreatedAt, 23)");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting DateWiseCountForCompleted for barchart " + error.message);
            return new Error(" EERR####: Error while getting DateWiseCountForCompleted for barchart " + error.message);
        }
    },

    getDateWiseCountForFailedForBarChart: async function(data){
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT  COUNT(*) AS 'Failed', convert(varchar, EvolveBotHistory_CreatedAt, 23) as 'date' from EvolveBotHistory WHERE cast(EvolveBotHistory_CreatedAt as date) >= FORMAT(getDate(), '" + data.StartDate + "') AND cast(EvolveBotHistory_CreatedAt as date) <= FORMAT(getDate(),  '" + data.EndDate + "') AND EvolveBotHistory_Status = 'Failed' AND EvolveBot_UrlID = '" + data.EvolveBot_UrlID + "' GROUP BY  convert(varchar, EvolveBotHistory_CreatedAt, 23)");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting DateWiseCountForFailed for barchart " + error.message);
            return new Error(" EERR1240: Error while getting DateWiseCountForFailed for barchart " + error.message);
        }
    },

    getDateWiseCountForCompletedForAreaChart : async function (data){
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT  COUNT(*) AS 'Completed', convert(varchar, EvolveBotHistory_CreatedAt, 23) as 'date' from EvolveBotHistory WHERE cast(EvolveBotHistory_CreatedAt as date) >= FORMAT(getDate(), '" + data.StartDate + "') AND cast(EvolveBotHistory_CreatedAt as date) <= FORMAT(getDate(), '" + data.EndDate + "') AND EvolveBotHistory_Status = 'Completed' GROUP BY  convert(varchar, EvolveBotHistory_CreatedAt, 23)");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting DateWiseCountForCompleted for areachart " + error.message);
            return new Error(" EERR1240: Error while getting DateWiseCountForCompleted for areachart " + error.message);
        }
    },

    getDateWiseCountForFailedAreaChart : async function (data){
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT  COUNT(*) AS 'Failed', convert(varchar, EvolveBotHistory_CreatedAt, 23) as 'date' from EvolveBotHistory WHERE cast(EvolveBotHistory_CreatedAt as date) >= FORMAT(getDate(), '" + data.StartDate + "') AND cast(EvolveBotHistory_CreatedAt as date) <= FORMAT(getDate(), '" + data.EndDate + "') AND EvolveBotHistory_Status = 'Failed' GROUP BY  convert(varchar, EvolveBotHistory_CreatedAt, 23)");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting DateWiseCountForFailed for areachart " + error.message);
            return new Error(" EERR1240: Error while getting DateWiseCountForFailed for areachart " + error.message);
        }
    },

    // Dashboard : end



    // Bot List : start

    getBotListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query('SELECT COUNT(EvolveBot_ID) as count  FROM EvolveBot  WHERE EvolveBot_Name LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR32528: Error while getting BOT List Count " + error.message);
            return new Error(" EERR32528: Error while getting BOT List Count " + error.message);
        }
    },
    getBotList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')

                .query("Select * from EvolveBot WHERE EvolveBot_Name LIKE @search ORDER BY EvolveBot_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting BOT List " + error.message);
            return new Error(" EERR1240: Error while getting BOT List " + error.message);
        }
    },

    insartStartTime : async function (BotId, datetime){
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBot_UrlID', Evolve.Sql.Int, BotId)
                .input('EvolveBotHistory_StartTime', Evolve.Sql.NVarChar, datetime)
                .input('EvolveBotHistory_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveBotHistory_EndTime', Evolve.Sql.NVarChar, datetime)
                .query('INSERT INTO EvolveBotHistory (EvolveBot_UrlID, EvolveBotHistory_StartTime, EvolveBotHistory_CreatedAt, EvolveBotHistory_EndTime) VALUES (@EvolveBot_UrlID, @EvolveBotHistory_StartTime, @EvolveBotHistory_CreatedAt, @EvolveBotHistory_EndTime); select @@IDENTITY AS \'inserted_id\'');
        } catch (error) {
            Evolve.Log.error(" EERR32531: Error while insartStartTime " + error.message);
            return new Error(" EERR32531: Error while insartStartTime " + error.message);
        }
    },

    statusUpdate : async function (data, datetime, botStatus, botMsg, insertedid){
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBotHistory_ID', Evolve.Sql.Int, insertedid)
                .input('EvolveBotHistory_EndTime', Evolve.Sql.NVarChar, datetime)
                .input('EvolveBotHistory_Status', Evolve.Sql.NVarChar, botStatus )
                .input('EvolveBotHistory_Msg', Evolve.Sql.NVarChar, botMsg )
                .input('EvolveBotHistory_Date', Evolve.Sql.NVarChar, datetime)
                .query('UPDATE EvolveBotHistory SET EvolveBotHistory_EndTime = @EvolveBotHistory_EndTime, EvolveBotHistory_Status = @EvolveBotHistory_Status, EvolveBotHistory_Msg = @EvolveBotHistory_Msg, EvolveBotHistory_Date = @EvolveBotHistory_Date  WHERE EvolveBotHistory_ID = @EvolveBotHistory_ID  ');
        } catch (error) {
            Evolve.Log.error(" EERR32531: Error while statusUpdate  " + error.message);
            return new Error(" EERR32531: Error while statusUpdate " + error.message);
        }
    },

    getLastrunTime : async function (){
        try {
            return await Evolve.SqlPool.request()
            .query('select EvolveBot_UrlID, convert(varchar, EvolveBotHistory_EndTime, 25) as LastRunTime from EvolveBotHistory intersect select EvolveBot_UrlID, max(convert(varchar, EvolveBotHistory_EndTime, 25)) from EvolveBotHistory group by EvolveBot_UrlID')
        } catch (error) {
            Evolve.Log.error(" EERR32529: Error while getting LastrunTime " + error.message);
            return new Error(" EERR32529: Error while getting LastrunTime  " + error.message);
        }
    },

    getStatus : async function(data){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveBotHistory_EndTime', Evolve.Sql.NVarChar, data.LastRunTime)
            .input('EvolveBot_UrlID', Evolve.Sql.Int, data.EvolveBot_UrlID)
            .query('SELECT EvolveBotHistory_Status , EvolveBot_UrlID from  EvolveBotHistory WHERE EvolveBotHistory_EndTime = convert(varchar, @EvolveBotHistory_EndTime, 21) AND EvolveBot_UrlID = @EvolveBot_UrlID')
        } catch (error) {
            Evolve.Log.error(" EERR32529: Error while getting Status " + error.message);
            return new Error(" EERR32529: Error while getting Status " + error.message);
        }
    },

    // Bot List : end



    // Add Bot : start

    selectUser: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveUser_Name', Evolve.Sql.NVarChar, data)
                .query('SELECT EvolveUser_ID FROM EvolveUser WHERE EvolveUser_Name = @EvolveUser_Name');
        } catch (error) {
            Evolve.Log.error(" EERR32529: Error while getting select User" + error.message);
            return new Error(" EERR32529: Error while getting select user " + error.message);
        }
    },

    updateRoleToUser: async function (data, userId) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveBot_ID', Evolve.Sql.Int, data.EvolveBot_ID)
                .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                .input('EvolveUser_ID', Evolve.Sql.Int, userId)
                .input('EvolveBotLink_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveBotLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveBotLink_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveBotLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveBotLink (EvolveBot_ID, EvolveRole_ID, EvolveUser_ID,EvolveBotLink_CreatedAt, EvolveBotLink_CreatedUser, EvolveBotLink_UpdatedAt, EvolveBotLink_UpdatedUser ) VALUES (@EvolveBot_ID, @EvolveRole_ID, @EvolveUser_ID, @EvolveBotLink_CreatedAt, @EvolveBotLink_CreatedUser, @EvolveBotLink_UpdatedAt, @EvolveBotLink_UpdatedUser)')
        } catch (error) {
            Evolve.Log.error(" EERR1408: Error while updating Role To User " + error.message);
            return new Error(" EERR1408: Error while updating Role To User " + error.message);
        }

    },

    deletedbotID: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveBot_ID', Evolve.Sql.Int, data.EvolveBot_ID)
                .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                .query('DELETE FROM EvolveBotLink WHERE EvolveRole_ID = @EvolveRole_ID AND EvolveBot_ID = @EvolveBot_ID')
        } catch (error) {
            Evolve.Log.error(" EERR32529: Error while DELETE BotId " + error.message);
            return new Error(" EERR32529: Error while DELETE BotId " + error.message);
        }
    },

    getRoleWiseUserId : async function  (data){
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                .input('EvolveBot_ID', Evolve.Sql.Int, data.EvolveBot_ID)
                .query('select EvolveUser_ID from EvolveBotLink where EvolveRole_ID = @EvolveRole_ID AND EvolveBot_ID = @EvolveBot_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32529: Error while getting Role Wis eUserId " + error.message);
            return new Error(" EERR32529: Error while getting Role Wise UserId " + error.message);
        }
    },

    getUserByRoleId: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                .query('SELECT  eu.EvolveUser_Name, eurl.EvolveRole_ID, eurl.EvolveUser_ID   FROM EvolveUserRoleLink eurl , EvolveUser eu WHERE eurl.EvolveRole_ID = 1 AND eurl.EvolveUser_ID = eu.EvolveUser_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32529: Error while getting User By RoleId " + error.message);
            return new Error(" EERR32529: Error while getting User By RoleId " + error.message);
        }
    },

    getRoleList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("Select EvolveRole_Name, EvolveRole_ID from EvolveRole ");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting Role List " + error.message);
            return new Error(" EERR1240: Error while getting Role List " + error.message);
        }
    },

    selectSingleBot: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBot_ID', Evolve.Sql.Int, data.EvolveBot_ID)
                .query('SELECT * FROM EvolveBot WHERE EvolveBot_ID = @EvolveBot_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32529: Error while getting Single App " + error.message);
            return new Error(" EERR32529: Error while getting Single App " + error.message);
        }
    },

    createBot: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBot_Name', Evolve.Sql.NVarChar, data.EvolveBot_Name)
                .input('EvolveBot_Code', Evolve.Sql.NVarChar, data.EvolveBot_Code)
                .input('EvolveBot_Desc', Evolve.Sql.NVarChar, data.EvolveBot_Desc)
                .input('EvolveBot_UrlID', Evolve.Sql.Int, data.EvolveBot_UrlID)
                .input('EvolveBot_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveBot_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveBot_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveBot_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveBot (EvolveBot_Name, EvolveBot_Code, EvolveBot_Desc, EvolveBot_UrlID, EvolveBot_CreatedAt, EvolveBot_CreatedUser, EvolveBot_UpdatedAt, EvolveBot_UpdatedUser ) VALUES (@EvolveBot_Name, @EvolveBot_Code, @EvolveBot_Desc, @EvolveBot_UrlID, @EvolveBot_CreatedAt, @EvolveBot_CreatedUser, @EvolveBot_UpdatedAt, @EvolveBot_UpdatedUser )');
        } catch (error) {
            Evolve.Log.error(" EERR32531: Error while Adding BOT " + error.message);
            return new Error(" EERR32531: Error while Adding BOT " + error.message);
        }
    },

    updateBot: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBot_ID', Evolve.Sql.Int, data.EvolveBot_ID)
                .input('EvolveBot_Name', Evolve.Sql.NVarChar, data.EvolveBot_Name)
                .input('EvolveBot_Code', Evolve.Sql.NVarChar, data.EvolveBot_Code)
                .input('EvolveBot_Desc', Evolve.Sql.NVarChar, data.EvolveBot_Desc)
                .input('EvolveBot_UrlID', Evolve.Sql.Int, data.EvolveBot_UrlID)
                .input('EvolveBot_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveBot_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveBot SET EvolveBot_Name = @EvolveBot_Name, EvolveBot_Code = @EvolveBot_Code, EvolveBot_Desc = @EvolveBot_Desc, EvolveBot_UrlID = @EvolveBot_UrlID, EvolveBot_UpdatedAt = @EvolveBot_UpdatedAt, EvolveBot_UpdatedUser = @EvolveBot_UpdatedUser WHERE EvolveBot_ID = @EvolveBot_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32531: Error while update BOT " + error.message);
            return new Error(" EERR32531: Error while update BOT " + error.message);
        }
    },

    // Add Bot : end



    // services not used 

    getMonthWiseCountForCompletedForBarChart : async function(data){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveBot_UrlID', Evolve.Sql.Int, data.EvolveBot_UrlID)
                .query(" SELECT  COUNT(*) AS 'Completed', convert(varchar, EvolveBotHistory_CreatedAt, 23) as 'date' from EvolveBotHistory WHERE  EvolveBotHistory_Status = 'Completed' AND EvolveBot_UrlID = '"+ data.EvolveBot_UrlID +"' AND month(EvolveBotHistory_CreatedAt)= '"+ data.SelectedMonth +"' AND year(EvolveBotHistory_CreatedAt)= '"+ data.SelectedYear +"' GROUP BY  convert(varchar, EvolveBotHistory_CreatedAt, 23)");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting getMonthWiseCountForCompleted for barchart " + error.message);
            return new Error(" EERR1240: Error while getting getMonthWiseCountForCompleted for barchart " + error.message);
        }
    },

    getMonthWiseCountForFailedForBarChart : async function(data){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveBot_UrlID', Evolve.Sql.Int, data.EvolveBot_UrlID)
                .query("  SELECT  COUNT(*) AS 'Failed', convert(varchar, EvolveBotHistory_CreatedAt, 23) as 'date' from EvolveBotHistory WHERE  EvolveBotHistory_Status = 'Failed' AND EvolveBot_UrlID = '" + data.EvolveBot_UrlID + "' AND month(EvolveBotHistory_CreatedAt)= '"+ data.SelectedMonth+"' AND year(EvolveBotHistory_CreatedAt)= '"+ data.SelectedYear +"'  GROUP BY  convert(varchar, EvolveBotHistory_CreatedAt, 23)");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting getMonthWiseCountForFailed for barchart " + error.message);
            return new Error(" EERR1240: Error while getting getMonthWiseCountForFailed for barchart " + error.message);
        }
    },

    getMonthWiseCountForCompletedForAreaChart : async function(data){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveBot_UrlID', Evolve.Sql.Int, data.EvolveBot_UrlID)
                .query("SELECT  COUNT(*) AS 'Completed', convert(varchar, EvolveBotHistory_CreatedAt, 23) as 'date' from EvolveBotHistory WHERE  EvolveBotHistory_Status = 'Completed' AND month(EvolveBotHistory_CreatedAt)= '"+ data.SelectedMonth+"' AND year(EvolveBotHistory_CreatedAt)= '"+ data.SelectedYear +"' GROUP BY  convert(varchar, EvolveBotHistory_CreatedAt, 23)");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting getMonthWiseCountForCompleted for AreaChart " + error.message);
            return new Error(" EERR1240: Error while getting getMonthWiseCountForCompleted for AreaChart " + error.message);
        }
    },

    getMonthWiseCountForFailedForAreaChart : async function(data){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveBot_UrlID', Evolve.Sql.Int, data.EvolveBot_UrlID)
                .query("  SELECT  COUNT(*) AS 'Failed', convert(varchar, EvolveBotHistory_CreatedAt, 23) as 'date' from EvolveBotHistory WHERE  EvolveBotHistory_Status = 'Failed' AND month(EvolveBotHistory_CreatedAt)= '"+ data.SelectedMonth+"' AND year(EvolveBotHistory_CreatedAt)= '"+ data.SelectedYear +"' GROUP BY  convert(varchar, EvolveBotHistory_CreatedAt, 23)");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting getMonthWiseCountForFailed for AreaChart " + error.message);
            return new Error(" EERR1240: Error while getting getMonthWiseCountForFailed for AreaChart " + error.message);
        }
    },
}

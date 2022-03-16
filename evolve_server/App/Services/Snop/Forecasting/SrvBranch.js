'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
	getForecastList: async function (User_ID, branchId) {
		try {
			//console.log("branchId>>>", branchId)
			return await Evolve.SqlPool.request()
				.input('EvolveUser_ID', Evolve.Sql.Int, User_ID)
				.input('EvolveBranch_ID', Evolve.Sql.Int, branchId)
				.query("SELECT ebf.* ,ebl.EvolveBusinessLine_Code , ebbl.EvolveBudgetBranchLink_MonthBudget , ebbl.EvolveBudgetBranchLink_Carry , ebbl.EvolveBudgetBranchLink_Month , ebbl.EvolveBudgetBranchLink_Year  ,(SELECT EvolveBranchForecast_Value FROM EvolveBranchForecast WHERE EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID AND EvolveBranchForecast_Slot = (select max(EvolveBranchForecast_Slot) from EvolveBranchForecast where EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID))as letest_Forecast ,  (SELECT EvolveBranchForecast_Value FROM EvolveBranchForecast WHERE EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID AND EvolveBranchForecast_Slot = 1) as slot1_forecast , (SELECT EvolveBranchForecast_Value FROM EvolveBranchForecast WHERE EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID AND EvolveBranchForecast_Slot = 2) as slot2_forecast , (SELECT EvolveBranchForecast_Value FROM EvolveBranchForecast WHERE EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID AND EvolveBranchForecast_Slot = 3) as slot3_forecast FROM EvolveBranchForecast ebf INNER JOIN EvolveBudgetBranchLink ebbl ON ebbl.EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID INNER JOIN EvolveBusinessLine ebl ON ebl.EvolveBusinessLine_ID = ebbl.EvolveBusinessLine_ID INNER JOIN EvolveUserToBranch eub ON eub.EvolveBranch_ID = ebbl.EvolveBranch_ID and eub.EvolveUser_ID = @EvolveUser_ID and eub.EvolveBranch_ID = @EvolveBranch_ID WHERE ebbl.EvolveBudgetBranchLink_Month = Convert(char(3), GetDate(), 0) AND ebbl.EvolveBudgetBranchLink_Year = YEAR(GETDATE()) AND ebf.EvolveBranchForecast_Slot = (SELECT MAX(ebbf.EvolveBranchForecast_Slot) FROM EvolveBranchForecast ebbf , EvolveBudgetBranchLink ebbll WHERE ebbll.EvolveBudgetBranchLink_ID = ebbf.EvolveBudgetBranchLink_ID AND ebbll.EvolveBudgetBranchLink_Month = Convert(char(3), GetDate(), 0) AND ebbll.EvolveBudgetBranchLink_Year = YEAR(GETDATE()))");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getForecastListFilter: async function (data, slotCondition) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
				.input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, data.EvolveBudgetBranchLink_Year)
				.query("SELECT ebf.* ,ebl.EvolveBusinessLine_Code , ebbl.EvolveBudgetBranchLink_MonthBudget , ebbl.EvolveBudgetBranchLink_Carry , ebbl.EvolveBudgetBranchLink_Month FROM EvolveBranchForecast ebf INNER JOIN EvolveBudgetBranchLink ebbl ON ebbl.EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID INNER JOIN EvolveBusinessLine ebl ON ebl.EvolveBusinessLine_ID = ebbl.EvolveBusinessLine_ID WHERE ebbl.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month AND ebbl.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year AND ebf.EvolveBranchForecast_Slot = " + slotCondition);
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	saveForecastList: async function (data) {
		try {
			let date = new Date();
			let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.
				getSeconds();

			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_ID', Evolve.Sql.Int, data.EvolveBudgetBranchLink_ID)
				.input('EvolveBranchForecast_Value', Evolve.Sql.NVarChar, data.EvolveBranchForecast_Value)
				.input('EvolveBranchForecast_ActualValue', Evolve.Sql.NVarChar, data.EvolveBranchForecast_ActualValue)
				.input('EvolveBranchForecast_Slot', Evolve.Sql.Int, parseInt(data.EvolveBranchForecast_Slot) + 1)
				.input('EvolveBranchForecast_Status', Evolve.Sql.NVarChar, 'open')
				.input('EvolveBranchForecast_CreatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveBranchForecast_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveBranchForecast_UpdatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveBranchForecast_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query("INSERT INTO EvolveBranchForecast (EvolveBudgetBranchLink_ID,EvolveBranchForecast_Value,EvolveBranchForecast_ActualValue,EvolveBranchForecast_Slot,EvolveBranchForecast_Status,EvolveBranchForecast_CreatedAt,EvolveBranchForecast_CreatedUser,EvolveBranchForecast_UpdatedAt,EvolveBranchForecast_UpdatedUser) VALUES (@EvolveBudgetBranchLink_ID,@EvolveBranchForecast_Value,@EvolveBranchForecast_ActualValue,@EvolveBranchForecast_Slot,@EvolveBranchForecast_Status,@EvolveBranchForecast_CreatedAt,@EvolveBranchForecast_CreatedUser,@EvolveBranchForecast_UpdatedAt,@EvolveBranchForecast_UpdatedUser)");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	updateForecastList: async function (data) {
		try {
			let date = new Date();
			let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.
				getSeconds();
			return await Evolve.SqlPool.request()
				.input('EvolveBranchForecast_ID', Evolve.Sql.Int, data.EvolveBranchForecast_ID)
				.input('EvolveBranchForecast_Value', Evolve.Sql.NVarChar, data.EvolveBranchForecast_Value)
				.input('EvolveBranchForecast_UpdatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveBranchForecast_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query("UPDATE EvolveBranchForecast SET EvolveBranchForecast_Value = @EvolveBranchForecast_Value , EvolveBranchForecast_UpdatedAt = @EvolveBranchForecast_UpdatedAt , EvolveBranchForecast_UpdatedUser = @EvolveBranchForecast_UpdatedUser WHERE EvolveBranchForecast_ID = @EvolveBranchForecast_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	updateForecastHistoryList: async function (data) {
		try {
			let date = new Date();
			let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.
				getSeconds();

			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_ID', Evolve.Sql.Int, data.EvolveBudgetBranchLink_ID)
				.input('EvolveBranchForecastHistory_Forecast', Evolve.Sql.NVarChar, data.EvolveBranchForecastHistory_Forecast)
				.input('EvolveBranchForecastHistory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveBranchForecastHistory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query("UPDATE EvolveBranchForecastHistory SET EvolveBranchForecastHistory_Forecast = @EvolveBranchForecastHistory_Forecast , EvolveBranchForecastHistory_UpdatedAt = @EvolveBranchForecastHistory_UpdatedAt , EvolveBranchForecastHistory_UpdatedUser = @EvolveBranchForecastHistory_UpdatedUser WHERE EvolveBudgetBranchLink_ID = @EvolveBudgetBranchLink_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	closeBudgetBranch: async function (data) {
		try {
			let date = new Date();
			let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.
				getSeconds();

			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_ID', Evolve.Sql.Int, data.EvolveBudgetBranchLink_ID)
				.input('EvolveBudgetBranchLink_Status', Evolve.Sql.NVarChar, 'freezed')
				.input('EvolveBudgetBranchLink_UpdatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveBudgetBranchLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query("UPDATE EvolveBudgetBranchLink SET EvolveBudgetBranchLink_Status = @EvolveBudgetBranchLink_Status , EvolveBudgetBranchLink_UpdatedAt = @EvolveBudgetBranchLink_UpdatedAt , EvolveBudgetBranchLink_UpdatedUser = @EvolveBudgetBranchLink_UpdatedUser WHERE EvolveBudgetBranchLink_ID = @EvolveBudgetBranchLink_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	closeForecastList: async function (data) {
		try {
			let date = new Date();
			let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.
				getSeconds();

			return await Evolve.SqlPool.request()
				.input('EvolveBranchForecast_ID', Evolve.Sql.Int, data.EvolveBranchForecast_ID)
				.input('EvolveBranchForecast_Status', Evolve.Sql.NVarChar, 'freezed')
				.input('EvolveBranchForecast_UpdatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveBranchForecast_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query("UPDATE EvolveBranchForecast SET EvolveBranchForecast_Status = @EvolveBranchForecast_Status , EvolveBranchForecast_UpdatedAt = @EvolveBranchForecast_UpdatedAt , EvolveBranchForecast_UpdatedUser = @EvolveBranchForecast_UpdatedUser WHERE EvolveBranchForecast_ID = @EvolveBranchForecast_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},


	checkForecastStatus: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBranchForecast_ID', Evolve.Sql.Int, data.EvolveBranchForecast_ID)
				.query("SELECT EvolveBranchForecast_Status, EvolveBudgetBranchLink_ID FROM  EvolveBranchForecast WHERE EvolveBranchForecast_ID = @EvolveBranchForecast_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getUserBranchData: async function (userId, branchId) {
		try {
			if (branchId == 0) {
				return await Evolve.SqlPool.request()
					.query("SELECT eb.EvolveBranch_ID , eb.EvolveBranch_Name FROM EvolveUserToBranch eub , EvolveBranch eb WHERE eub.EvolveUser_ID = " + userId + " AND eb.EvolveBranch_ID = eub.EvolveBranch_ID");
			} else {
				return await Evolve.SqlPool.request()
					.query("SELECT eb.EvolveBranch_ID , eb.EvolveBranch_Name FROM EvolveBranch eb WHERE eb.EvolveBranch_ID =" + branchId);
			}

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getOldForecastList: async function (User_ID, branchId, selectedMonth, selectedYear) {
		// console.log("data>>>>>", User_ID, branchId, selectedMonth, selectedYear);
		try {
			//console.log("branchId>>>", branchId)
			return await Evolve.SqlPool.request()
				.input('EvolveUser_ID', Evolve.Sql.Int, User_ID)
				.input('EvolveBranch_ID', Evolve.Sql.Int, branchId)
				.input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, selectedMonth)
				.input('EvolveBudgetBranchLink_Year', Evolve.Sql.NVarChar, selectedYear)
				.query("SELECT ebf.* ,ebl.EvolveBusinessLine_Code , ebbl.EvolveBudgetBranchLink_MonthBudget , ebbl.EvolveBudgetBranchLink_Carry , ebbl.EvolveBudgetBranchLink_Month , ebbl.EvolveBudgetBranchLink_Year  ,(SELECT EvolveBranchForecast_Value FROM EvolveBranchForecast WHERE EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID AND EvolveBranchForecast_Slot = (select max(EvolveBranchForecast_Slot) from EvolveBranchForecast ))as letest_Forecast ,  (SELECT EvolveBranchForecast_Value FROM EvolveBranchForecast WHERE EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID AND EvolveBranchForecast_Slot = 1) as slot1_forecast , (SELECT EvolveBranchForecast_Value FROM EvolveBranchForecast WHERE EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID AND EvolveBranchForecast_Slot = 2) as slot2_forecast , (SELECT EvolveBranchForecast_Value FROM EvolveBranchForecast WHERE EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID AND EvolveBranchForecast_Slot = 3) as slot3_forecast FROM EvolveBranchForecast ebf INNER JOIN EvolveBudgetBranchLink ebbl ON ebbl.EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID INNER JOIN EvolveBusinessLine ebl ON ebl.EvolveBusinessLine_ID = ebbl.EvolveBusinessLine_ID INNER JOIN EvolveUserToBranch eub ON eub.EvolveBranch_ID = ebbl.EvolveBranch_ID and eub.EvolveUser_ID = @EvolveUser_ID and eub.EvolveBranch_ID = @EvolveBranch_ID WHERE ebbl.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month AND ebbl.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year AND ebf.EvolveBranchForecast_Slot = (SELECT MAX(ebbf.EvolveBranchForecast_Slot) FROM EvolveBranchForecast ebbf , EvolveBudgetBranchLink ebbll WHERE ebbll.EvolveBudgetBranchLink_ID = ebbf.EvolveBudgetBranchLink_ID AND ebbll.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month AND ebbll.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year)");
		} catch (error) {
			Evolve.Log.error(" EERR2043: Error while getting Forecast List "+error.message);
			return new Error(" EERR2043: Error while getting Forecast List "+error.message);
		}
	},


	/** End  : Old Forecasting */



} 

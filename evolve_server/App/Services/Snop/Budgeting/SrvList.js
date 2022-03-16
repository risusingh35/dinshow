'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

	getBranchId: async function (branch_code) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBranch_Code", Evolve.Sql.NVarChar, branch_code)
				.query("SELECT EvolveBranch_ID FROM EvolveBranch WHERE EvolveBranch_Code LIKE @EvolveBranch_Code");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getBusinessLineID: async function (businessLine_code) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBusinessLine_Code", Evolve.Sql.NVarChar, businessLine_code)
				.query("SELECT EvolveBusinessLine_ID FROM EvolveBusinessLine WHERE EvolveBusinessLine_Code LIKE @EvolveBusinessLine_Code");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	checkBudgetExist: async function (data) 
	{
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBusinessLine_ID", Evolve.Sql.Int, data.EvolveBusinessLine_ID)
				.input("EvolveBranch_ID", Evolve.Sql.Int, data.EvolveBranch_ID)
				.input("EvolveBudget_Year", Evolve.Sql.NVarChar, data.EvolveBudget_Year)
				.input("EvolveBudget_Month", Evolve.Sql.NVarChar, data.EvolveBudget_Month)
				.query("SELECT EvolveBudget_ID , EvolveBudget_Status FROM EvolveBudget WHERE EvolveBusinessLine_ID = @EvolveBusinessLine_ID AND EvolveBranch_ID = @EvolveBranch_ID AND EvolveBudget_Year = @EvolveBudget_Year AND EvolveBudget_Month = @EvolveBudget_Month");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	addBudget: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBusinessLine_ID", Evolve.Sql.Int, data.EvolveBusinessLine_ID)
				.input("EvolveBranch_ID", Evolve.Sql.Int, data.EvolveBranch_ID)
				.input("EvolveBudget_Value", Evolve.Sql.NVarChar, data.EvolveBudget_Value)
				.input("EvolveBudget_Year", Evolve.Sql.NVarChar, data.EvolveBudget_Year)
				.input("EvolveBudget_Month", Evolve.Sql.NVarChar, data.EvolveBudget_Month)
				.input("EvolveBudget_SOValue", Evolve.Sql.NVarChar, data.EvolveBudget_SOValue)
				.input("EvolveBudget_ComMargin", Evolve.Sql.NVarChar, data.EvolveBudget_ComMargin)
				.input("EvolveBudget_Status", Evolve.Sql.NVarChar, data.EvolveBudget_Status)
				.input("EvolveBudget_CreatedAt", Evolve.Sql.NVarChar, data.EvolveBudget_CreatedAt)
				.input("EvolveBudget_CreatedUser", Evolve.Sql.Int, data.EvolveBudget_CreatedUser)
				.input("EvolveBudget_UpdatedAt", Evolve.Sql.NVarChar, data.EvolveBudget_UpdatedAt)
				.input("EvolveBudget_UpdatedUser", Evolve.Sql.Int, data.EvolveBudget_UpdatedUser)
				.query("INSERT INTO EvolveBudget (EvolveBusinessLine_ID,EvolveBranch_ID,EvolveBudget_Value,EvolveBudget_Year,EvolveBudget_Month,EvolveBudget_SOValue,EvolveBudget_ComMargin,EvolveBudget_Status,EvolveBudget_CreatedAt,EvolveBudget_CreatedUser,EvolveBudget_UpdatedAt,EvolveBudget_UpdatedUser) VALUES (@EvolveBusinessLine_ID,@EvolveBranch_ID,@EvolveBudget_Value,@EvolveBudget_Year,@EvolveBudget_Month,@EvolveBudget_SOValue,@EvolveBudget_ComMargin,@EvolveBudget_Status,@EvolveBudget_CreatedAt,@EvolveBudget_CreatedUser,@EvolveBudget_UpdatedAt,@EvolveBudget_UpdatedUser);select @@IDENTITY AS 'inserted_id'");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	updateBudget: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBudget_ID", Evolve.Sql.Int, data.EvolveBudget_ID)
				.input("EvolveBudget_Value", Evolve.Sql.NVarChar, data.EvolveBudget_Value)
				.input("EvolveBudget_SOValue", Evolve.Sql.NVarChar, data.EvolveBudget_SOValue)
				.input("EvolveBudget_ComMargin", Evolve.Sql.NVarChar, data.EvolveBudget_ComMargin)
				.input("EvolveBudget_UpdatedAt", Evolve.Sql.NVarChar, data.EvolveBudget_UpdatedAt)
				.input("EvolveBudget_UpdatedUser", Evolve.Sql.Int, data.EvolveBudget_UpdatedUser)
				.query("UPDATE EvolveBudget SET EvolveBudget_Value = @EvolveBudget_Value , EvolveBudget_SOValue = @EvolveBudget_SOValue ,EvolveBudget_ComMargin = @EvolveBudget_ComMargin ,  EvolveBudget_UpdatedAt = @EvolveBudget_UpdatedAt , EvolveBudget_UpdatedUser = @EvolveBudget_UpdatedUser WHERE EvolveBudget_ID = @EvolveBudget_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getBudgetBrachLink_ID : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBusinessLine_ID", Evolve.Sql.Int, data.EvolveBusinessLine_ID)
				.input("EvolveBranch_ID", Evolve.Sql.Int, data.EvolveBranch_ID)
				.input("EvolveBudgetBranchLink_Year", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Year)
				.input("EvolveBudgetBranchLink_Month", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
				.query("SELECT EvolveBudgetBranchLink_ID FROM EvolveBudgetBranchLink WHERE EvolveBusinessLine_ID = @EvolveBusinessLine_ID AND EvolveBranch_ID = @EvolveBranch_ID AND EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year AND EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	updateBudgetBranchLink : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBudgetBranchLink_ID", Evolve.Sql.Int, data.EvolveBudgetBranchLink_ID)
				.input("EvolveBudgetBranchLink_MonthBudget", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_MonthBudget)
				.input("EvolveBudgetBranchLink_SOValue", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_SOValue)
				.input("EvolveBudgetBranchLink_ComMargin", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_ComMargin)
				.input("EvolveBudgetBranchLink_UpdatedAt", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_UpdatedAt)
				.input("EvolveBudgetBranchLink_UpdatedUser", Evolve.Sql.Int, data.EvolveBudgetBranchLink_UpdatedUser)
				.query("UPDATE EvolveBudgetBranchLink SET EvolveBudgetBranchLink_MonthBudget = @EvolveBudgetBranchLink_MonthBudget , EvolveBudgetBranchLink_SOValue = @EvolveBudgetBranchLink_SOValue , EvolveBudgetBranchLink_ComMargin = @EvolveBudgetBranchLink_ComMargin , EvolveBudgetBranchLink_UpdatedAt = @EvolveBudgetBranchLink_UpdatedAt , EvolveBudgetBranchLink_UpdatedUser = @EvolveBudgetBranchLink_UpdatedUser WHERE EvolveBudgetBranchLink_ID = @EvolveBudgetBranchLink_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	
	updateBranchForecast : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBudgetBranchLink_ID", Evolve.Sql.Int, data.EvolveBudgetBranchLink_ID)
				.input("EvolveBranchForecast_Value", Evolve.Sql.NVarChar, data.EvolveBranchForecast_Value)
				.input("EvolveBranchForecast_UpdatedAt", Evolve.Sql.NVarChar, data.EvolveBranchForecast_UpdatedAt)
				.input("EvolveBranchForecast_UpdatedUser", Evolve.Sql.Int, data.EvolveBranchForecast_UpdatedUser)
				.query("UPDATE EvolveBranchForecast SET EvolveBranchForecast_Value = @EvolveBranchForecast_Value , EvolveBranchForecast_UpdatedAt = @EvolveBranchForecast_UpdatedAt , EvolveBranchForecast_UpdatedUser = @EvolveBranchForecast_UpdatedUser WHERE EvolveBudgetBranchLink_ID = @EvolveBudgetBranchLink_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},


	addBudgetBranchLink: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBusinessLine_ID", Evolve.Sql.Int, data.EvolveBusinessLine_ID)
				.input("EvolveBranch_ID", Evolve.Sql.Int, data.EvolveBranch_ID)
				.input("EvolveBudgetBranchLink_MonthBudget", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_MonthBudget)
				.input("EvolveBudgetBranchLink_Month", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
				.input("EvolveBudgetBranchLink_Carry", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Carry)
				.input("EvolveBudgetBranchLink_Year", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Year)
				.input("EvolveBudgetBranchLink_SOValue", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_SOValue)
				.input("EvolveBudgetBranchLink_ComMargin", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_ComMargin)
				.input("EvolveBudgetBranchLink_Status", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Status)
				.input("EvolveBudgetBranchLink_CreatedAt", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_CreatedAt)
				.input("EvolveBudgetBranchLink_CreatedUser", Evolve.Sql.Int, data.EvolveBudgetBranchLink_CreatedUser)
				.input("EvolveBudgetBranchLink_UpdatedAt", Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_UpdatedAt)
				.input("EvolveBudgetBranchLink_UpdatedUser", Evolve.Sql.Int, data.EvolveBudgetBranchLink_UpdatedUser)
				.query("INSERT INTO EvolveBudgetBranchLink (EvolveBusinessLine_ID,EvolveBranch_ID,EvolveBudgetBranchLink_MonthBudget,EvolveBudgetBranchLink_Month,EvolveBudgetBranchLink_Carry,EvolveBudgetBranchLink_Year,EvolveBudgetBranchLink_SOValue,EvolveBudgetBranchLink_ComMargin,EvolveBudgetBranchLink_Status,EvolveBudgetBranchLink_CreatedAt,EvolveBudgetBranchLink_CreatedUser,EvolveBudgetBranchLink_UpdatedAt,EvolveBudgetBranchLink_UpdatedUser) VALUES (@EvolveBusinessLine_ID,@EvolveBranch_ID,@EvolveBudgetBranchLink_MonthBudget,@EvolveBudgetBranchLink_Month,@EvolveBudgetBranchLink_Carry,@EvolveBudgetBranchLink_Year,@EvolveBudgetBranchLink_SOValue,@EvolveBudgetBranchLink_ComMargin,@EvolveBudgetBranchLink_Status,@EvolveBudgetBranchLink_CreatedAt,@EvolveBudgetBranchLink_CreatedUser,@EvolveBudgetBranchLink_UpdatedAt,@EvolveBudgetBranchLink_UpdatedUser);select @@IDENTITY AS 'inserted_id'");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	addBranchForecast: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBudgetBranchLink_ID", Evolve.Sql.Int, data.EvolveBudgetBranchLink_ID)
				.input("EvolveBranchForecast_Value", Evolve.Sql.NVarChar, data.EvolveBranchForecast_Value)
				.input("EvolveBranchForecast_ActualValue", Evolve.Sql.NVarChar, data.EvolveBranchForecast_ActualValue)
				.input("EvolveBranchForecast_Slot", Evolve.Sql.Int, data.EvolveBranchForecast_Slot)
				.input("EvolveBranchForecast_Status", Evolve.Sql.NVarChar, data.EvolveBranchForecast_Status)
				.input("EvolveBranchForecast_CreatedAt", Evolve.Sql.NVarChar, data.EvolveBranchForecast_CreatedAt)
				.input("EvolveBranchForecast_CreatedUser", Evolve.Sql.Int, data.EvolveBranchForecast_CreatedUser)
				.input("EvolveBranchForecast_UpdatedAt", Evolve.Sql.NVarChar, data.EvolveBranchForecast_UpdatedAt)
				.input("EvolveBranchForecast_UpdatedUser", Evolve.Sql.Int, data.EvolveBranchForecast_UpdatedUser)
				.query("INSERT INTO EvolveBranchForecast (EvolveBudgetBranchLink_ID,EvolveBranchForecast_Value,EvolveBranchForecast_ActualValue,EvolveBranchForecast_Slot,EvolveBranchForecast_Status,EvolveBranchForecast_CreatedAt,EvolveBranchForecast_CreatedUser,EvolveBranchForecast_UpdatedAt,EvolveBranchForecast_UpdatedUser) VALUES (@EvolveBudgetBranchLink_ID,@EvolveBranchForecast_Value,@EvolveBranchForecast_ActualValue,@EvolveBranchForecast_Slot,@EvolveBranchForecast_Status,@EvolveBranchForecast_CreatedAt,@EvolveBranchForecast_CreatedUser,@EvolveBranchForecast_UpdatedAt,@EvolveBranchForecast_UpdatedUser);select @@IDENTITY AS 'inserted_id'");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	addBranchForecastHistory : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBudgetBranchLink_ID", Evolve.Sql.Int, data.EvolveBudgetBranchLink_ID)
				.input("EvolveBranchForecastHistory_Forecast", Evolve.Sql.NVarChar, data.EvolveBranchForecastHistory_Forecast)
				.input("EvolveBranchForecastHistory_Actual", Evolve.Sql.Int, data.EvolveBranchForecastHistory_Actual)
				.input("EvolveBranchForecastHistory_Margin", Evolve.Sql.Int, data.EvolveBranchForecastHistory_Margin)
				.input("EvolveBranchForecastHistory_Month", Evolve.Sql.NVarChar, data.EvolveBranchForecastHistory_Month)
				.input("EvolveBranchForecastHistory_Year", Evolve.Sql.NVarChar, data.EvolveBranchForecastHistory_Year)
				.input("EvolveBranchForecastHistory_Actual_Non_Million", Evolve.Sql.Int, data.EvolveBranchForecastHistory_Actual_Non_Million)
				.input("EvolveBranchForecastHistory_Margin_Non_Million", Evolve.Sql.Int, data.EvolveBranchForecastHistory_Actual_Non_Million)
				.input("EvolveBranchForecastHistory_CreatedAt", Evolve.Sql.NVarChar, data.EvolveBranchForecastHistory_CreatedAt)
				.input("EvolveBranchForecastHistory_CreatedUser", Evolve.Sql.Int, data.EvolveBranchForecastHistory_CreatedUser)
				.input("EvolveBranchForecastHistory_UpdatedAt", Evolve.Sql.NVarChar, data.EvolveBranchForecastHistory_UpdatedAt)
				.input("EvolveBranchForecastHistory_UpdatedUser", Evolve.Sql.Int, data.EvolveBranchForecastHistory_UpdatedUser)
				.query("INSERT INTO EvolveBranchForecastHistory (EvolveBudgetBranchLink_ID,EvolveBranchForecastHistory_Forecast,EvolveBranchForecastHistory_Actual,EvolveBranchForecastHistory_Margin,EvolveBranchForecastHistory_Month,EvolveBranchForecastHistory_Year,EvolveBranchForecastHistory_Actual_Non_Million,EvolveBranchForecastHistory_Margin_Non_Million,EvolveBranchForecastHistory_CreatedAt,EvolveBranchForecastHistory_CreatedUser,EvolveBranchForecastHistory_UpdatedAt,EvolveBranchForecastHistory_UpdatedUser) VALUES (@EvolveBudgetBranchLink_ID,@EvolveBranchForecastHistory_Forecast,@EvolveBranchForecastHistory_Actual,@EvolveBranchForecastHistory_Margin,@EvolveBranchForecastHistory_Month,@EvolveBranchForecastHistory_Year,@EvolveBranchForecastHistory_Actual_Non_Million,@EvolveBranchForecastHistory_Margin_Non_Million,@EvolveBranchForecastHistory_CreatedAt,@EvolveBranchForecastHistory_CreatedUser,@EvolveBranchForecastHistory_UpdatedAt,@EvolveBranchForecastHistory_UpdatedUser);select @@IDENTITY AS 'inserted_id'");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getAllBudget: async function (year) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, year)
				.query("SELECT DISTINCT ebud.EvolveBudget_Status , ebud.EvolveBranch_ID ,ebud.EvolveBusinessLine_ID , ebra.EvolveBranch_Code,ebra.EvolveBranch_Region,ebl.EvolveBusinessLine_Code FROM EvolveBudget AS ebud, EvolveBranch AS ebra, EvolveBusinessLine AS ebl WHERE ebud.EvolveBranch_ID = ebra.EvolveBranch_ID AND ebud.EvolveBusinessLine_ID = ebl.EvolveBusinessLine_ID  AND ebud.EvolveBudget_Year = @EvolveBudgetBranchLink_Year ORDER BY ebra.EvolveBranch_Region");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getmonthBudgetData: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBudget_Year', Evolve.Sql.Int, data.EvolveBudget_Year)
				.input('EvolveBusinessLine_ID', Evolve.Sql.Int, data.EvolveBusinessLine_ID)
				.input('EvolveBudget_Month', Evolve.Sql.NVarChar, data.EvolveBudget_Month)
				.input('EvolveBranch_ID', Evolve.Sql.Int, data.EvolveBranch_ID)
				.query("SELECT EvolveBudget_Value FROM EvolveBudget WHERE EvolveBranch_ID = @EvolveBranch_ID AND EvolveBusinessLine_ID = @EvolveBusinessLine_ID AND EvolveBudget_Month LIKE @EvolveBudget_Month  AND EvolveBudget_Year = @EvolveBudget_Year");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	freezeBudget: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveBudget_Year", Evolve.Sql.Int, data.EvolveBudget_Year)
				.query("UPDATE EvolveBudget SET EvolveBudget_Status = 'freezed' WHERE EvolveBudget_Year = @EvolveBudget_Year");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getUploadedBudget: async function (year) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBudget_Year', Evolve.Sql.Int, year)
				.query("SELECT * FROM EvolveBudget WHERE EvolveBudget_Year = @EvolveBudget_Year AND EvolveBudget_Status = 'uploaded'");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	checkbudgetStatus : async function (year) {
		console.log("year ::", year);
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBudget_Year', Evolve.Sql.Int, year)
				.query("SELECT COUNT (EvolveBudget_ID) as count FROM EvolveBudget WHERE EvolveBudget_Year = @EvolveBudget_Year AND EvolveBudget_Status = 'freezed'");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		} 
	}
}
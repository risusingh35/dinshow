'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
	checkSlotStatus : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
                .input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, data.EvolveBudgetBranchLink_Year)
                .input('EvolveBranchForecast_Slot', Evolve.Sql.Int, data.EvolveBranchForecast_Slot)
				.query("SELECT DISTINCT ebf.EvolveBranchForecast_Slot , ebf.EvolveBranchForecast_Status FROM EvolveBranchForecast ebf , EvolveBudgetBranchLink ebbl WHERE ebbl.EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID AND ebbl.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month AND ebbl.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year AND ebf.EvolveBranchForecast_Slot = @EvolveBranchForecast_Slot");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
    },
    

    openSlotStatus : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
                .input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, data.EvolveBudgetBranchLink_Year)
                .input('EvolveBranchForecast_Slot', Evolve.Sql.Int, data.EvolveBranchForecast_Slot)
				.query("UPDATE ebf SET ebf.EvolveBranchForecast_Status = 'open' , ebf.EvolveBranchForecast_IsSlotActive = 1 FROM EvolveBudgetBranchLink AS ebbl INNER JOIN EvolveBranchForecast AS ebf ON ebbl.EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID WHERE ebf.EvolveBranchForecast_Slot = @EvolveBranchForecast_Slot AND ebbl.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month AND ebbl.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
    },
    
    prvSlotData : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
                .input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, data.EvolveBudgetBranchLink_Year)
                .input('EvolveBranchForecast_Slot', Evolve.Sql.Int, (parseInt(data.EvolveBranchForecast_Slot) - 1))
				.query("SELECT ebf.* FROM EvolveBranchForecast ebf , EvolveBudgetBranchLink ebbl WHERE ebbl.EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID AND ebbl.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month  AND ebbl.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year AND ebf.EvolveBranchForecast_Slot = @EvolveBranchForecast_Slot");
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
				.input("EvolveBranchForecast_IsSlotActive", Evolve.Sql.Bit, true)
				.input("EvolveBranchForecast_CreatedAt", Evolve.Sql.NVarChar, data.EvolveBranchForecast_CreatedAt)
				.input("EvolveBranchForecast_CreatedUser", Evolve.Sql.Int, data.EvolveBranchForecast_CreatedUser)
				.input("EvolveBranchForecast_UpdatedAt", Evolve.Sql.NVarChar, data.EvolveBranchForecast_UpdatedAt)
				.input("EvolveBranchForecast_UpdatedUser", Evolve.Sql.Int, data.EvolveBranchForecast_UpdatedUser)
				.query("INSERT INTO EvolveBranchForecast (EvolveBudgetBranchLink_ID,EvolveBranchForecast_Value,EvolveBranchForecast_ActualValue,EvolveBranchForecast_Slot,EvolveBranchForecast_Status,EvolveBranchForecast_IsSlotActive,EvolveBranchForecast_CreatedAt,EvolveBranchForecast_CreatedUser,EvolveBranchForecast_UpdatedAt,EvolveBranchForecast_UpdatedUser) VALUES (@EvolveBudgetBranchLink_ID,@EvolveBranchForecast_Value,@EvolveBranchForecast_ActualValue,@EvolveBranchForecast_Slot,@EvolveBranchForecast_Status,@EvolveBranchForecast_IsSlotActive,@EvolveBranchForecast_CreatedAt,@EvolveBranchForecast_CreatedUser,@EvolveBranchForecast_UpdatedAt,@EvolveBranchForecast_UpdatedUser);select @@IDENTITY AS 'inserted_id'");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
    },
    
    closeForecast : async function (data) {
		try {
            let date = new Date();
			let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.
				getSeconds();
			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
                .input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, data.EvolveBudgetBranchLink_Year)
                .input('EvolveBranchForecast_ClosedDate', Evolve.Sql.NVarChar, datetime)
				.query("UPDATE ebf SET ebf.EvolveBranchForecast_Status = 'close' , ebf.EvolveBranchForecast_ClosedDate = @EvolveBranchForecast_ClosedDate FROM EvolveBudgetBranchLink AS ebbl INNER JOIN EvolveBranchForecast AS ebf ON ebbl.EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID WHERE ebbl.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month AND ebbl.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	
	getForeCastCarry : async function (data) {
		try {
			// console.log("data ::",data);
			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
                .input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, data.EvolveBudgetBranchLink_Year)
				.query("SELECT ebbl.EvolveBusinessLine_ID , ebbl.EvolveBranch_ID , ebf.EvolveBranchForecast_Value , ebf.EvolveBranchForecast_ActualValue FROM EvolveBudgetBranchLink ebbl , EvolveBranchForecast ebf WHERE ebbl.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month AND ebbl.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year AND ebf.EvolveBudgetBranchLink_ID = ebbl.EvolveBudgetBranchLink_ID AND ebf.EvolveBranchForecast_Slot = 3 AND ebf.EvolveBranchForecast_Status = 'close'");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
    },

	updateCarryBudget : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBusinessLine_ID', Evolve.Sql.Int, data.EvolveBusinessLine_ID)
				.input('EvolveBranch_ID', Evolve.Sql.Int, data.EvolveBranch_ID)
				.input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
				.input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, data.EvolveBudgetBranchLink_Year)
				.input('EvolveBudgetBranchLink_Carry', Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Carry)
				.query("UPDATE EvolveBudgetBranchLink SET EvolveBudgetBranchLink_Carry = @EvolveBudgetBranchLink_Carry WHERE EvolveBudgetBranchLink_Month LIKE @EvolveBudgetBranchLink_Month AND EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year AND EvolveBusinessLine_ID = @EvolveBusinessLine_ID AND EvolveBranch_ID = @EvolveBranch_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
    },

	
    freezeSlotStatus : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
                .input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, data.EvolveBudgetBranchLink_Year)
                .input('EvolveBranchForecast_Slot', Evolve.Sql.Int, data.EvolveBranchForecast_Slot)
				.query("UPDATE ebf SET ebf.EvolveBranchForecast_Status = 'freeze' , ebf.EvolveBranchForecast_IsSlotActive = 0 FROM EvolveBudgetBranchLink AS ebbl INNER JOIN EvolveBranchForecast AS ebf ON ebbl.EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID WHERE ebbl.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month AND ebbl.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year AND EvolveBranchForecast_Slot = @EvolveBranchForecast_Slot");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
    },

	updateSlotForecast : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
                .input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, data.EvolveBudgetBranchLink_Year)
                .input('EvolveBranchForecast_Slot', Evolve.Sql.Int, data.EvolveBranchForecast_Slot)
				.query("UPDATE ebf SET ebf.EvolveBranchForecast_Value = ebbl.EvolveBudgetBranchLink_MonthBudget + ebbl.EvolveBudgetBranchLink_Carry FROM EvolveBudgetBranchLink AS ebbl INNER JOIN EvolveBranchForecast AS ebf ON ebbl.EvolveBudgetBranchLink_ID = ebf.EvolveBudgetBranchLink_ID WHERE ebbl.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month AND ebbl.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year AND ebf.EvolveBranchForecast_Slot = @EvolveBranchForecast_Slot AND	ebf.EvolveBranchForecast_Value = 0");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
    },

	addBranchForecastHistory : async function(data)
	{
		return await Evolve.SqlPool.request()
			.input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, data.EvolveBudgetBranchLink_Month)
			.input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, data.EvolveBudgetBranchLink_Year)
			.query("INSERT INTO EvolveBranchForecastHistory (EvolveBudgetBranchLink_ID,EvolveBranchForecastHistory_Forecast,EvolveBranchForecastHistory_Actual,EvolveBranchForecastHistory_Margin,EvolveBranchForecastHistory_Month,EvolveBranchForecastHistory_Year,EvolveBranchForecastHistory_CreatedAt,EvolveBranchForecastHistory_CreatedUser,EvolveBranchForecastHistory_UpdatedAt,EvolveBranchForecastHistory_UpdatedUser) SELECT ebf.EvolveBudgetBranchLink_ID , ebf.EvolveBranchForecast_Value,ebf.EvolveBranchForecast_ActualValue,0,ebbl.EvolveBudgetBranchLink_Month,ebbl.EvolveBudgetBranchLink_Year,ebf.EvolveBranchForecast_CreatedAt,ebf.EvolveBranchForecast_CreatedUser,ebf.EvolveBranchForecast_UpdatedAt,ebf.EvolveBranchForecast_UpdatedUser FROM EvolveBudgetBranchLink ebbl , EvolveBranchForecast ebf WHERE ebbl.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month AND ebbl.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year AND ebf.EvolveBudgetBranchLink_ID = ebbl.EvolveBudgetBranchLink_ID AND ebf.EvolveBranchForecast_Slot = 1");
	}
} 
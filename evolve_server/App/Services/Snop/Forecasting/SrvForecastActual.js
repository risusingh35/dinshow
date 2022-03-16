'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    
    getAllBusinessLine: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveBusinessLine_Code FROM EvolveBusinessLine");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    getAllForecastvsActual: async function (month,year) {
        try {
            return await Evolve.SqlPool.request()
               // .query("SELECT eb.EvolveBranch_Code,ebl.EvolveBusinessLine_Code,eb.EvolveBranch_Region FROM EvolveBusinessBranchLink AS ebbl, EvolveBranch AS eb, EvolveBusinessLine AS ebl WHERE ebbl.EvolveBranch_ID = eb.EvolveBranch_ID AND ebbl.EvolveBusinessLine_ID = ebl.EvolveBusinessLine_ID");
               .input('EvolveBudgetBranchLink_Month', Evolve.Sql.NVarChar, month)
               .input('EvolveBudgetBranchLink_Year', Evolve.Sql.Int, year)
                .query("SELECT ebf.EvolveBranchForecast_Value,ebf.EvolveBranchForecast_ActualValue,ebf.EvolveBranchForecast_Slot,ebf.EvolveBranchForecast_Status, ebbl.EvolveBudgetBranchLink_MonthBudget , ebbl.EvolveBudgetBranchLink_Carry,(SELECT eb.EvolveBranch_Name FROM EvolveBranch eb WHERE eb.EvolveBranch_ID = ebbl.EvolveBranch_ID) AS EvolveBranch_Code,(SELECT eb.EvolveBranch_Region FROM EvolveBranch eb WHERE eb.EvolveBranch_ID = ebbl.EvolveBranch_ID) AS EvolveBranch_Region,(SELECT ebl.EvolveBusinessLine_Code FROM EvolveBusinessLine ebl WHERE ebl.EvolveBusinessLine_ID = ebbl.EvolveBusinessLine_ID) AS EvolveBusinessLine_Code FROM EvolveBranchForecast AS ebf ,EvolveBudgetBranchLink AS ebbl, EvolveBranch AS eb WHERE ebf.EvolveBudgetBranchLink_ID =  ebbl.EvolveBudgetBranchLink_ID  AND ebbl.EvolveBudgetBranchLink_Month = @EvolveBudgetBranchLink_Month AND ebbl.EvolveBudgetBranchLink_Year = @EvolveBudgetBranchLink_Year AND eb.EvolveBranch_ID = ebbl.EvolveBranch_ID ORDER BY  eb.EvolveBranch_Region asc , ebf.EvolveBranchForecast_ID asc , EvolveBranch_Code asc");



                // JOIN QUERY
               // .query("SELECT ebf.EvolveBranchForecast_Value,ebf.EvolveBranchForecast_ActualValue,ebf.EvolveBranchForecast_Slot, ebbl.EvolveBudgetBranchLink_Carry,(SELECT eb.EvolveBranch_CODE FROM EvolveBranch eb WHERE eb.EvolveBranch_ID = ebbl.EvolveBranch_ID) AS EvolveBranch_Code,(SELECT eb.EvolveBranch_Region FROM EvolveBranch eb WHERE eb.EvolveBranch_ID = ebbl.EvolveBranch_ID) AS EvolveBranch_Region,(SELECT ebl.EvolveBusinessLine_Code FROM EvolveBusinessLine ebl WHERE ebl.EvolveBusinessLine_ID = ebbl.EvolveBusinessLine_ID) AS EvolveBusinessLine_Code FROM EvolveBranchForecast AS ebf LEFT JOIN EvolveBudgetBranchLink AS ebbl ON ebf.EvolveBudgetBranchLink_ID =  ebbl.EvolveBudgetBranchLink_ID");


        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

     

}
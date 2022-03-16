'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

	


	getMixingReportCount: async function (search,condition) {
		try {
			let query = ""
			query =
			 	"SELECT COUNT(emp.EvolveMixingParameter_ID) AS count  FROM EvolveMixingParameter emp , EvolveMachine em WHERE EvolveProdOrders_OrderNo  LIKE  '%"  + search + "%'" + condition;	
				// console.log("query============",query);
			return await Evolve.SqlPool.request()
			// .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
			.query(query);
					} catch (error) {
			Evolve.Log.error("  " + error.message);
			return new Error("  " + error.message);
		}
	},


	getMixingReportDatatableList: async function (start, length,search, condition) {
		try {
			let query =""
			query="SELECT emp.EvolveProdOrders_OrderNo ,emp.EvolveItem_Part,em.EvolveMachine_ID,em.EvolveMachine_Code,convert(varchar, emp.EvolveMixingParameter_StartTime, 120) as EvolveMixingParameter_StartTime,convert(varchar, emp.EvolveMixingParameter_ProdOrderStartTime, 120) as EvolveMixingParameter_ProdOrderStartTime,convert(varchar, emp.EvolveMixingParameter_HighSpeedStopTime, 120) as EvolveMixingParameter_HighSpeedStopTime,convert(varchar, emp.EvolveMixingParameter_ProdOrderStopTime, 120) as EvolveMixingParameter_ProdOrderStopTime,convert(varchar, emp.EvolveMixingParameter_StopTime, 120) as EvolveMixingParameter_StopTime,convert(varchar, emp.EvolveMixingParameter_HighSpeedStartTime, 120) as EvolveMixingParameter_HighSpeedStartTime FROM EvolveMixingParameter as emp LEFT JOIN EvolveMachine em ON emp.EvolveMachine_ID = em.EvolveMachine_ID WHERE (emp.EvolveProdOrders_OrderNo LIKE '%" + search + "%' " + condition + ")ORDER BY emp.EvolveProdOrders_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
			return await Evolve.SqlPool.request()
				.input("start", Evolve.Sql.Int, start)
				.input("length", Evolve.Sql.Int, length)
				// .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
				.query(query);
		} catch (error) {
			Evolve.Log.error("  " + error.message);
			return new Error("  " + error.message);
		}
	},




	getMachineList: async function () {
        try {
            return await Evolve.SqlPool.request()
			.query("SELECT EvolveMachine_ID , EvolveMachine_Code FROM EvolveMachine");
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get  Machine list"+error.message);
            return new Error(" EERR####: Error while get  Machine list"+error.message);
        }
    },

}
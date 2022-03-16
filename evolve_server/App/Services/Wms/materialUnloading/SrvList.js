'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getAllMaterialUnloadList: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(" SELECT TOP(10) eg.EvolveGate_RefNumber, eg.EvolveGate_PassNumber, eg.EvolveGate_DriverName, eg.EvolveGate_ID, eg.EvolveGate_VehicleNumber, eg.EvolveGate_CreatedAt, convert(varchar, eg.EvolveGate_CreatedAt, 100) as gateEntryTime FROM EvolveGate eg  WHERE  eg.EvolveGate_IsMaterialUnload = 0 AND eg.EvolveGate_Status = 'APPROVED' AND (eg.EvolveGate_RefNumber LIKE @search OR  eg.EvolveGate_VehicleNumber LIKE @search )  ORDER BY eg.EvolveGate_ID DESC ");
          
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get material unloading "+error.message);
            return new Error(" EERR####: Error in get material unloading "+error.message);
        }
    },

    getSingleMaterialDetais : async function (EvolveGate_ID) {
        try {

            // console.log("ENETRED IN SINGLE APo  ??")
            return await Evolve.SqlPool.request()
            .input('EvolveGate_ID', Evolve.Sql.Int, EvolveGate_ID)
            .query("SELECT  eg.*, egd.*, ei.EvolveItem_Part, eu.EvolveUom_Uom FROM EvolveGate eg, EvolveGateDetails egd LEFT JOIN  EvolveItem ei ON  egd.EvolveItem_ID = ei.EvolveItem_ID , EvolveUom eu WHERE   EvolveGateDetails_IsMaterialUnloaded = 0 AND egd.EvolveUom_ID = eu.EvolveUom_ID AND eg.EvolveGate_ID = egd.EvolveGate_ID AND egd.EvolveGate_ID = @EvolveGate_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get singel material list "+error.message);
            return new Error(" EERR####: Error in get singel material list "+error.message);
        }
    },

    unloadMaterial : async function (data) {
        try {
			let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            
            return await Evolve.SqlPool.request()
            .input('EvolveGate_ID', Evolve.Sql.Int, data.EvolveGate_ID)
            .input("EvolveGate_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
            .input("EvolveGate_UpdatedAt", Evolve.Sql.NVarChar, datetime)
            .query(" UPDATE EvolveGate SET EvolveGate_IsMaterialUnload = 1 , EvolveGate_UpdatedUser=@EvolveGate_UpdatedUser  ,  EvolveGate_UpdatedAt=@EvolveGate_UpdatedAt   WHERE EvolveGate_ID = @EvolveGate_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Gate Head  "+error.message);
            return new Error(" EERR####: Error While Gate Head  "+error.message);
        }
    },
    
    updateGateDetails : async function (data) {
        try {
			let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            
            return await Evolve.SqlPool.request()
            .input('EvolveGate_ID', Evolve.Sql.Int, data.EvolveGate_ID)
            .input("EvolveGateDetails_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
            .input("EvolveGateDetails_UpdatedAt", Evolve.Sql.NVarChar, datetime)
            .query(" UPDATE EvolveGateDetails SET EvolveGateDetails_IsMaterialUnloaded = 1 , EvolveGateDetails_UpdatedUser=@EvolveGateDetails_UpdatedUser  ,  EvolveGateDetails_UpdatedAt=@EvolveGateDetails_UpdatedAt   WHERE EvolveGate_ID = @EvolveGate_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Upate Gate Details "+error.message);
            return new Error(" EERR####: Error While Upate Gate Details "+error.message);
        }
    },
}
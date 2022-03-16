'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addParcelData: async function (data , refNumber) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
              return await Evolve.SqlPool.request()
                
                 .input('EvolveGate_ParcelTrackingNum', Evolve.Sql.NVarChar, data.EvolveGate_ParcelTrackingNum)

                 .input('EvolveGate_Direction', Evolve.Sql.NVarChar, "1")
                 .input('EvolveGate_Weight', Evolve.Sql.NVarChar, data.EvolveGate_Weight)
                 
                 .input('EvolveGate_Image', Evolve.Sql.NVarChar, data.EvolveGate_Image)
                  .input('EvolveGate_ModuleType', Evolve.Sql.NVarChar, "PARCEL")
                .input('EvolveGate_RefNumber', Evolve.Sql.NVarChar, "GN"+refNumber)

                .input('EvolveGate_ParcelFrom', Evolve.Sql.NVarChar, data.EvolveGate_ParcelFrom)
                .input('EvolveGate_DeliverTo', Evolve.Sql.NVarChar, data.EvolveGate_DeliverTo)
                .input('EvolveGate_Notes', Evolve.Sql.NVarChar, data.EvolveGate_Notes)
                 .input('EvolveGate_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGate_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGate_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGate_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                
                .query("INSERT INTO EvolveGate (EvolveGate_Weight ,EvolveGate_Direction ,EvolveGate_RefNumber,EvolveGate_ParcelTrackingNum,EvolveGate_ModuleType,EvolveGate_ParcelFrom,EvolveGate_DeliverTo,EvolveGate_Notes,EvolveGate_CreatedUser,EvolveGate_CreatedAt,EvolveGate_UpdatedAt,EvolveGate_UpdatedUser,EvolveGate_Image) VALUES (@EvolveGate_Weight ,@EvolveGate_Direction,@EvolveGate_RefNumber,@EvolveGate_ParcelTrackingNum,@EvolveGate_ModuleType,@EvolveGate_ParcelFrom,@EvolveGate_DeliverTo,@EvolveGate_Notes,@EvolveGate_CreatedUser,@EvolveGate_CreatedAt,@EvolveGate_UpdatedAt,@EvolveGate_UpdatedUser,@EvolveGate_Image)  ")

        } catch (error) {
            Evolve.Log.error(" EERR1147: Error while adding Parcel Data "+error.message);
            return new Error(" EERR1147: Error while adding Parcel Data "+error.message);
        }
    },


    getLastReference: async function () {
        try {
          
            console.log("get table called ")

            return await Evolve.SqlPool.request()
                .query("SELECT TOP(1) EvolveGate_RefNumber FROM EvolveGate ORDER BY EvolveGate_ID DESC ");
                

             

        } catch (error) {
            Evolve.Log.error(" EERR1148: Error while getting Last Reference "+error.message);
            return new Error(" EERR1148: Error while getting Last Reference "+error.message);
        }
    },

    getIdCount: async function () {
        try {
          
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveGate_ID) as count FROM EvolveGate ");
             } catch (error) {
            Evolve.Log.error(" EERR1149: Error while getting Id Count "+error.message);
            return new Error(" EERR1149: Error while getting Id Count "+error.message);
        }
    },
}
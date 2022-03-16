'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

   getinvStatusListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveInvStatus_ID) as count FROM EvolveInvStatus WHERE EvolveInvStatus_Type LIKE @search OR EvolveInvStatus_Code LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Country List "+error.message);
            return new Error(" EERR####: Error while get Country List "+error.message);
        }
    },

   getinvStatusList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                // .query("SELECT * FROM EvolveInvStatus")
                .query("SELECT einv.*  ,  ebg.EvolveBusinessGroup_Domain ,  ec.EvolveCompany_Code , eunit.EvolveUnit_Code  FROM EvolveInvStatus einv LEFT JOIN    EvolveBusinessGroup ebg  ON  einv.EvolveBusinessGroup_ID = ebg.EvolveBusinessGroup_ID LEFT  JOIN EvolveCompany ec  ON einv.EvolveCompany_ID = ec.EvolveCompany_ID LEFT JOIN  EvolveUnit eunit ON einv.EvolveUnit_ID =  eunit.EvolveUnit_ID WHERE EvolveInvStatus_Type LIKE @search OR EvolveInvStatus_Code LIKE @search ORDER BY EvolveInvStatus_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get InvStatus list"+error.message);
            return new Error(" EERR####: Error while get InvStatus list"+error.message);
        }
    },
    getinvStatusDetailsList: async function (EvolveInvStatus_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvStatus_ID', Evolve.Sql.Int, EvolveInvStatus_ID)
                .query("select EvolveInvStatusD_TrType  FROM EvolveInvStatusD where EvolveInvStatus_ID = @EvolveInvStatus_ID")

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get InvStatus Details"+error.message);
            return new Error(" EERR####: Error while get InvStatus Details"+error.message);
        }
    },
   
}
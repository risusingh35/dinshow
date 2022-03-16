'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getStatusDListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(einvd.EvolveInvStatusD_ID) as count   FROM  EvolveInvStatusD einvd LEFT JOIN   EvolveInvStatus einv ON  einvd.EvolveInvStatus_ID = einv.EvolveInvStatus_ID WHERE einv.EvolveInvStatus_Code LIKE @search OR einvd.EvolveInvStatusD_TrType LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get StausD Count "+error.message);
            return new Error(" EERR####: Error while get StausD Count "+error.message);
        }
    },

    getStatusDList: async function (start, length ,search) {
        try {

            console.log("start>>>>>" ,  start)
            console.log("length>>>>>" ,  length)
            console.log("search>>>>>" ,  search)

            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

                .query(" SELECT einv.EvolveInvStatus_Code , einvd.EvolveInvStatusD_TrType   FROM  EvolveInvStatusD einvd LEFT JOIN   EvolveInvStatus einv ON  einvd.EvolveInvStatus_ID = einv.EvolveInvStatus_ID WHERE einv.EvolveInvStatus_Code LIKE @search OR einvd.EvolveInvStatusD_TrType LIKE @search ORDER BY EvolveInvStatusD_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        
            } catch (error) {                

            Evolve.Log.error(" EERR####: Error while get StausD list"+error.message);
            return new Error(" EERR####: Error while get StausD list"+error.message);
        }
    },
   
}
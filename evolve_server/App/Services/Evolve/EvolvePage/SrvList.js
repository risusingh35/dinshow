'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getEvolvePageListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT  COUNT(EvolvePage_ID) as count  FROM Evolvepage WHERE   EvolvePage_Name LIKE @search ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get evolve page Count "+error.message);
            return new Error(" EERR####: Error while get evolve page Count "+error.message);
        }
    },

    getEvolvePageList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('  SELECT  *   FROM Evolvepage WHERE    EvolvePage_Name LIKE @search  ORDER BY EvolvePage_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get evolve page list"+error.message);
            return new Error(" EERR####: Error while get evolve page list"+error.message);
        }
    },


    
 

    deleteEvolvePageList: async function (EvolvePage_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePage_ID', Evolve.Sql.Int,EvolvePage_ID)
                .query('DELETE FROM EvolvePage WHERE EvolvePage_ID =@EvolvePage_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1337: Error while deleting Evolve Page " + error.message);
            return new Error(" EERR1337: Error while deleting Evolve Page " + error.message);
        }
    },

    deleteEvolvePageFieldetails: async function (EvolvePage_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePage_ID', Evolve.Sql.Int,EvolvePage_ID)
                .query('DELETE FROM EvolvePageFields WHERE EvolvePage_ID =@EvolvePage_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1337: Error while deleting Evolve Page Fields " + error.message);
            return new Error(" EERR1337: Error while deleting Evolve Page Fields" + error.message);
        }
    },
  
}
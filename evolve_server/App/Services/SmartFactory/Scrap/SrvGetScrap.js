'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getScrapCount: async function () {
        try {
          return await Evolve.SqlPool.request().query(
            "select count(EvolveScrap_ID) AS count from EvolveScrap"
          );
        } catch (error) {
          Evolve.Log.error(" EERR1991: Error while getting Scrap Count "+error.message);
          return new Error(" EERR1991: Error while getting Scrap Count "+error.message);
        }
      },


      getScrapList: async function (start, length) {
        try {
          return await Evolve.SqlPool.request()
            .input("start", Evolve.Sql.Int, start)
            .input("length", Evolve.Sql.Int, length)
            .query(
              " SELECT es.* , ep.EvolveProcess_Name  FROM EvolveScrap es , EvolveProcess ep  WHERE es.EvolveProcess_ID = ep.EvolveProcess_ID ORDER BY es.EvolveScrap_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"
            );
        } catch (error) {
          Evolve.Log.error(" EERR1992: Error while getting Scrap List "+error.message);
          return new Error(" EERR1992: Error while getting Scrap List "+error.message);
        }
      },

      changeScrapStatus: async function (id) {
        try {
          return await Evolve.SqlPool.request()
            .input("EvolveScrap_ID", Evolve.Sql.Int, id)
            .query(
              "UPDATE EvolveScrap SET EvolveScrap_In = 1 , EvolveScrap_Status = 'Scrapped' WHERE  EvolveScrap_ID  = @EvolveScrap_ID"
            );
        } catch (error) {
          Evolve.Log.error(" EERR1993: Error while changing Scrap Status "+error.message);
          return new Error(" EERR1993: Error while changing Scrap Status "+error.message);
        }
      },



}
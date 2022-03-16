'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getComponentScrapReportCount: async function (condition) {
        try {
          let query =
            "SELECT COUNT(ecs.EvolveCompScrap_ID) as count FROM EvolveCompScrap ecs " +
            condition;
          return await Evolve.SqlPool.request().query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1953: Error while getting Component Scrap Report Count "+error.message);
          return new Error(" EERR1953: Error while getting Component Scrap Report Count "+error.message);
        }
      },

      getComponentScrapReportDatatableList: async function (start, length, condition) {
        try {
          let query =
            "SELECT * FROM EvolveCompScrap ecs " +
            condition +
            " ORDER BY ecs.EvolveCompScrap_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
          return await Evolve.SqlPool.request()
            .input("start", Evolve.Sql.Int, start)
            .input("length", Evolve.Sql.Int, length)
            .query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1954: Error while getting Component Scrap Report Datatable List "+error.message);
          return new Error(" EERR1954: Error while getting Component Scrap Report Datatable List "+error.message);
        }
      },



}
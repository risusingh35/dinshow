'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getRejectedSrNoCount: async function (data, condition) {
        try {
          let query =
            "SELECT COUNT(ers.EvolveReworkSrNo_ID) as count FROM EvolveReworkSrNo ers " +
            condition;
          return await Evolve.SqlPool.request().query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1981: Error while getting rejected Sr No Count "+error.message);
          return new Error(" EERR1981: Error while getting rejected Sr No Count "+error.message);
        }
      },

      getRejectedSrNoDatatableList: async function (start, length, condition) {
        try {
          let query =
            "SELECT ers.* , eu.EvolveUser_Name, ep.EvolveProcess_Name ,ei.EvolveItem_Code ,ept.EvolveProcessTemp_Name FROM EvolveReworkSrNo ers INNER JOIN EvolveUser eu ON eu.EvolveUser_ID = ers.EvolveReworkSrNo_CreatedUser INNER JOIN EvolveProcessTempSeq epts ON  epts.Evolveprocesstemp_seq = ers.EvolveReworkSrNo_Seq INNER JOIN EvolveProcess ep on epts.Evolveprocesstemp_seq = ep.EvolveProcess_ID AND epts.Evolveprocesstemp_id = ers.EvolveProcessTemp_ID INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = ers.EvolveItem_ID INNER JOIN EvolveProcessTemp ept ON ept.EvolveProcessTemp_ID = ers.EvolveProcessTemp_ID " +
            condition +
            " ORDER BY ers.EvolveReworkSrNo_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
          return await Evolve.SqlPool.request()
            .input("start", Evolve.Sql.Int, start)
            .input("length", Evolve.Sql.Int, length)
            .query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1982; Error while getting Rejected Sr No Datatable List "+error.message);
          return new Error(" EERR1982; Error while getting Rejected Sr No Datatable List "+error.message);
        }
      },



}
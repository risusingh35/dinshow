'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
   getList: async function() {
        try {
            let data= await Evolve.SqlPool.request()
                // .input("EvolveMachine_Code", Evolve.Sql.NVarChar, EvolveMachine_Code)
                .query("SELECT edta.*,edtu.*  from EvolveDynamicTable_Admin edta, EvolveDynamicTable_User edtu");
                console.log("dtaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",data);
                return data

                // .query("SELECT * FROM EvolveDynamicTable_Admin")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get  EvolveDynamicTable_Admin " + error.message);
            return new Error(" EERR####: Error while get  SEvolveDynamicTable_Admin " + error.message);
        }
    },
  
}

'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
   getList: async function() {
        try {
            
           let  data1 = await Evolve.SqlPool.request()
                // .input("EvolveMachine_Code", Evolve.Sql.NVarChar, EvolveMachine_Code)
                // .query("SELECT edta.*,edtu.*  from EvolveDynamicTable_Admin edta, EvolveDynamicTable_User edtu");
                // console.log("dtaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",data);          

                .query("SELECT * FROM EvolveDynamicTable_Admin")

                let data2= await Evolve.SqlPool.request()
                // .input("EvolveMachine_Code", Evolve.Sql.NVarChar, EvolveMachine_Code)
                // .query("SELECT edta.*,edtu.*  from EvolveDynamicTable_Admin edta, EvolveDynamicTable_User edtu");
                // console.log("dtaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",data);          

                .query("SELECT * FROM EvolveDynamicTable_User")
                // console.log("data1.concat(data2)",data1.concat(data2))
let data = data1.recordset.concat(data2.recordset)
// data.push( data1 , data2 )
 console.log("dtaaaaaaaaaaaaaaaaaaaaaaaaaadata1+data2aaaaaa",data1);  
 console.log("dtaaaaaaaaaaaaaaaaaaaaaaaaaadata1+data2aaaaaa",data2);  
 console.log("dtaaaaaaaaaaaaaaaaaaaaaaaaaadata1+data2aaaaaa",data);  
                return data
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get  EvolveDynamicTable_Admin " + error.message);
            return new Error(" EERR####: Error while get  SEvolveDynamicTable_Admin " + error.message);
        }
    },
  
}

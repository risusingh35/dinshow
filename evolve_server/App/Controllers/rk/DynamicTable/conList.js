'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.rk.DynamicTable.srvList.getList();
               console.log("listtttttttttttttttttttttttttttttttttttttttttt",list.recordset[0].EvolveDynamicTable_Age[0]);

            let finalData = []
            for(var i=0; i<list.recordset.length; i++){  
            for(var j=0; j<list.recordset[i].EvolveDynamicTable_ID.length; j++) {
                
                if(finalData.length==0){
                finalData.push({
                    EvolveDynamicTable_ID: list.recordset[i].EvolveDynamicTable_ID[j],
                    EvolveDynamicTable_UserName: list.recordset[i].EvolveDynamicTable_UserName[j],
                    EvolveDynamicTable_Age: list.recordset[i].EvolveDynamicTable_Age[j]
                })
            }
                else if( finalData[i].EvolveDynamicTable_ID != list.recordset[i].EvolveDynamicTable_ID[j] && finalData[i].EvolveDynamicTable_UserName != list.recordset[i].EvolveDynamicTable_UserName[j] && finalData[i].EvolveDynamicTable_Age != list.recordset[i].EvolveDynamicTable_Age[j] ) {

                    finalData.push({
                        EvolveDynamicTable_ID: list.recordset[i].EvolveDynamicTable_ID[j],
                        EvolveDynamicTable_UserName: list.recordset[i].EvolveDynamicTable_UserName[j],
                        EvolveDynamicTable_Age: list.recordset[i].EvolveDynamicTable_Age[j]
                    })

                }
                else {
                    console.log("in else");
                }
            
        }
        } 
        console.log("finalData arr---------", finalData)
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR####: Error while get EvolveDynamicTable_Admins ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "EvolveDynamicTable_Admins ",
                    // result: list.recordset
                    result: finalData
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get EvolveDynamicTable_Admins " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR####: Error while get EvolveDynamicTable_Admins ",
                result: null
            };
            res.send(obj);
        }
    },
    
}
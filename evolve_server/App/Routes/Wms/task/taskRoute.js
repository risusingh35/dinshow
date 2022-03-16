'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Split Pallet Api List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/wms/task/getAllTaskList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.task.ConList.getAllTaskList);




    /** End  :  Split Pallet  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error In WMS Task :", error)
}


module.exports = Evolve.Router
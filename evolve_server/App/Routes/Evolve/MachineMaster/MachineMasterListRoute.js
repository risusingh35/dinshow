'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Machine Master  API List
     *  Desc  :    
     */
    
    Evolve.Router.post('/api/v1/evolve/MachineMaster/addMachineMaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineMaster.ConMachineMasterList.addMachineMaster);

    Evolve.Router.post('/api/v1/evolve/MachineMaster/getmachineMasterList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineMaster.ConMachineMasterList.getmachineMasterList);
    
    Evolve.Router.post('/api/v1/evolve/MachineMaster/selectSingleMachine', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineMaster.ConMachineMasterList.selectSingleMachine);

    Evolve.Router.post('/api/v1/evolve/MachineMaster/updateMachineMaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineMaster.ConMachineMasterList.updateMachineMaster);
    
    Evolve.Router.post('/api/v1/evolve/MachineMaster/getAllLocation', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineMaster.ConMachineMasterList.getAllLocation);

    Evolve.Router.post('/api/v1/evolve/MachineMaster/getAllSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineMaster.ConMachineMasterList.getAllSection);

    Evolve.Router.post('/api/v1/evolve/MachineMaster/getAllUom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineMaster.ConMachineMasterList.getAllUom);

     /** End  : Machine Master   */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Machine Master  Router :", error)
}


module.exports = Evolve.Router
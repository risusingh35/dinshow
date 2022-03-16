'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  IO History API List
     *  Desc  :    
     */



    Evolve.Router.post('/api/v1/evolve/gsp/addGsp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GSPMaster.MidGsp.addGsp, Evolve.App.Controllers.Evolve.GSPMaster.ConList.addGsp);

    Evolve.Router.post('/api/v1/evolve/gsp/getGspList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GSPMaster.MidGsp.getGspList ,Evolve.App.Controllers.Evolve.GSPMaster.ConList.getGspList);

    Evolve.Router.post('/api/v1/evolve/gsp/getSingleGsp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.GSPMaster.ConList.getSingleGsp);

    Evolve.Router.post('/api/v1/evolve/gsp/updateGsp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GSPMaster.MidGsp.updateGsp, Evolve.App.Controllers.Evolve.GSPMaster.ConList.updateGsp);









    /** End  : IO History  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve IO History Router :", error)
}


module.exports = Evolve.Router
'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  State Master API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/State/getStateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.State.MidState.getStateListAuth, Evolve.App.Controllers.Evolve.State.ConList.getStateList);

    Evolve.Router.post('/api/v1/evolve/State/addState', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.State.MidState.addStateAuth, Evolve.App.Controllers.Evolve.State.ConList.addState);

    Evolve.Router.post('/api/v1/evolve/State/updateState', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.State.MidState.updateStateAuth, Evolve.App.Controllers.Evolve.State.ConList.updateState);

    Evolve.Router.post('/api/v1/evolve/State/getSingleState', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.State.MidState.getSingleStateAuth, Evolve.App.Controllers.Evolve.State.ConList.getSingleState);

    Evolve.Router.post('/api/v1/evolve/State/StateCSVUpload', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.State.ConList.StateCSVUpload);

   



    /** End  :State Master  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Status Code Master Router :", error)
}
module.exports = Evolve.Router
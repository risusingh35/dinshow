'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.get('/api/v1/evolve/Container/getContainerTypeList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization ,Evolve.App.Controllers.Evolve.Container.ConList.getContainerTypeList);

    Evolve.Router.post('/api/v1/evolve/Container/getContainerMasterList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.Container.ConList.getContainerMasterList);

    Evolve.Router.post('/api/v1/evolve/Container/createContainer', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Container.ConList.createContainer);

    Evolve.Router.post('/api/v1/evolve/Container/getSingleContainer',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Container.ConList.getSingleContainer);

    Evolve.Router.post('/api/v1/evolve/Container/updateContainer', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization ,  Evolve.App.Controllers.Evolve.Container.ConList.updateContainer);


    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Machine To User Router :", error)
}
module.exports = Evolve.Router
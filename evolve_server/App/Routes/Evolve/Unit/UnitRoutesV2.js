'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

     Evolve.Router.post('/api/v1/evolve/Unit/getunitListV2', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Unit.ConListV2.getunitList);

     Evolve.Router.post('/api/v1/evolve/Unit/getTaxZoneList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Unit.ConListV2.getTaxZoneList);

     Evolve.Router.post('/api/v1/evolve/Unit/getCompanyList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Unit.ConListV2.getCompanyList);
 
     Evolve.Router.post('/api/v1/evolve/Unit/getTaxClassList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Unit.ConListV2.getTaxClassList);
 
     Evolve.Router.post('/api/v1/evolve/Unit/getSingleUnitDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Unit.ConListV2.getSingleUnitDetails);
 
     Evolve.Router.post('/api/v1/evolve/Unit/createUnitV2', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Unit.ConListV2.createUnit);
 
     Evolve.Router.post('/api/v1/evolve/Unit/upateUnitV2', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Unit.ConListV2.upateUnit);


    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Machine To User Router :", error)
}
module.exports = Evolve.Router
'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

     Evolve.Router.post('/api/v1/evolve/Company/getCompanyListV2', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Company.ConListV2.getCompanyList);

     Evolve.Router.post('/api/v1/evolve/Company/getTaxZoneList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Company.ConListV2.getTaxZoneList);

     Evolve.Router.post('/api/v1/evolve/Company/getBusinessGroupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Company.ConListV2.getBusinessGroupList);
 
     Evolve.Router.post('/api/v1/evolve/Company/getTaxClassList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Company.ConListV2.getTaxClassList);
 
     Evolve.Router.post('/api/v1/evolve/Company/getSingleCompanyDetailsV2', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Company.ConListV2.getSingleCompanyDetails);
 
     Evolve.Router.post('/api/v1/evolve/Company/createCompanyV2', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Company.ConListV2.createCompany);
 
     Evolve.Router.post('/api/v1/evolve/Company/upateCompanyV2', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Company.ConListV2.upateCompany);


    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Machine To User Router :", error)
}
module.exports = Evolve.Router
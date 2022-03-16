'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Section  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/company/getCompanyList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Company.CompanyMid.getCompanyList, Evolve.App.Controllers.Evolve.Company.ConList.getCompanyList);

    Evolve.Router.post('/api/v1/evolve/company/createCompany', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Company.CompanyMid.createCompanyAuth, Evolve.App.Controllers.Evolve.Company.ConList.createCompany);

    Evolve.Router.post('/api/v1/evolve/company/updateCompany', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Company.CompanyMid.updateCompanyAuth, Evolve.App.Controllers.Evolve.Company.ConList.updateCompany);
    
    Evolve.Router.post('/api/v1/evolve/Company/selectSingleCompany', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Company.ConList.selectSingleCompany);
    
    // Evolve.Router.post('/api/v1/evolve/company/getSingleSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Company.CompanyMid.getSingleSection, Evolve.App.Controllers.Evolve.Company.ConList.getSingleSection);

    // Evolve.Router.post('/api/v1/evolve/company/deleteSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Company.CompanyMid.deleteSection, Evolve.App.Controllers.Evolve.Company.ConList.deleteSection);

    // Evolve.Router.post('/api/v1/evolve/company/updateSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Company.CompanyMid.updateSection, Evolve.App.Controllers.Evolve.Company.ConList.updateSection);

    /** End  : Section  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Section Router :", error)
}
module.exports = Evolve.Router
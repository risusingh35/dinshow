'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Section  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/Unit/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Unit.ConList.getUnitList);
    
    Evolve.Router.get('/api/v1/evolve/Unit/getCompanyList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Unit.ConList.getCompanyList);

    Evolve.Router.post('/api/v1/evolve/Unit/updateUnit', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Unit.UnitMid.updateUnitAuth, Evolve.App.Controllers.Evolve.Unit.ConList.updateUnit);

    Evolve.Router.post('/api/v1/evolve/Unit/createUnit', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Unit.UnitMid.createUnitAuth, Evolve.App.Controllers.Evolve.Unit.ConList.createUnit);

    Evolve.Router.post('/api/v1/evolve/Unit/selectSingleUnit', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Unit.UnitMid.selectSingleUnitAuth, Evolve.App.Controllers.Evolve.Unit.ConList.selectSingleUnit);

    // Evolve.Router.post('/api/v1/evolve/Unit/getSingleSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Company.CompanyMid.getSingleSection, Evolve.App.Controllers.Evolve.Company.ConList.getSingleSection);

    // Evolve.Router.post('/api/v1/evolve/Unit/deleteSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Company.CompanyMid.deleteSection, Evolve.App.Controllers.Evolve.Company.ConList.deleteSection);

    // Evolve.Router.post('/api/v1/evolve/Unit/updateSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Company.CompanyMid.updateSection, Evolve.App.Controllers.Evolve.Company.ConList.updateSection);

    // DOA CSV uplaod -- start

    Evolve.Router.post('/api/v1/evolve/Unit/uploadUnitMasterCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Unit.ConList.uploadUnitMasterCsv);

    //DOA CSV uplaod -- end

    /** End  : Section  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Section Router :", error)
}
module.exports = Evolve.Router
'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Address API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/Address/getAddressList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.Address.ConList.getAddressList);
    
    Evolve.Router.get('/api/v1/eMdm/Address/getBusinessGroupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.Address.ConList.getBusinessGroupList);
    
    Evolve.Router.post('/api/v1/eMdm/Address/getCompanyList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.Address.ConList.getCompanyList);

    Evolve.Router.post('/api/v1/eMdm/Address/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.Address.ConList.getUnitList);
    
    
    /** End  :Address  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router
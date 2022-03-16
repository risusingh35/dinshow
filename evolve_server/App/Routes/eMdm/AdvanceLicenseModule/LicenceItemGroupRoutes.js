'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/getGroupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.LicenceItemGropuList.getGroupList);

    Evolve.Router.get('/api/v1/eMdm/AdvanceLicenseModule/getGroupItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.LicenceItemGropuList.getGroupItemList);

    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/createGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.LicenceItemGropuList.createGroup);

    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/updateLicenceItemGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.LicenceItemGropuList.updateLicenceItemGroup);


    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/selectSingleLicenceItemGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.LicenceItemGropuList.selectSingleLicenceItemGroup);


    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router
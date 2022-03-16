'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Country API List
     *  Desc  :    
     */

    Evolve.Router.get('/api/v1/eMdm/AdvanceLicenseModule/addLicence/getLicenceItemGroupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.AddLicence.getLicenceItemGroupList);

    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/addLicence/creactLicence', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.AddLicence.creactLicence);

    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/addLicence/selectSingleLicenceAndLicenceDetaliData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.AddLicence.selectSingleLicenceAndLicenceDetaliData);


    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/addLicence/updateLicence', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.AddLicence.updateLicence);





    /** End  :Country  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router
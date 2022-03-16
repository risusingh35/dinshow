'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Country API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/licenceDetailList/getlicenceDetailList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.LicenceDetailList.getlicenceDetailList);

    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/licenceDetailList/getlicencelNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.LicenceDetailList.getlicencelNumber);




    /** End  :Country  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router
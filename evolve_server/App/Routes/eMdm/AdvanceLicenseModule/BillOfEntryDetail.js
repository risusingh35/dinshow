'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Country API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/BillOfEntryDetail/getBilOfEntrryDetailList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.BillOfEntryDetail.getBilOfEntrryDetailList);

    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/BillOfEntryDetail/selectSingleBillOfentry', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.BillOfEntryDetail.selectSingleBillOfentry);



    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/BillOfEntryDetail/getlicencelNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.BillOfEntryDetail.getlicencelNumber);

    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/BillOfEntryDetail/getLicenceItemDetailCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.BillOfEntryDetail.getLicenceItemDetailCode);


    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/BillOfEntryDetail/getLicenceItemDetailCodeByLicenceNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.BillOfEntryDetail.getLicenceItemDetailCodeByLicenceNumber);

    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/BillOfEntryDetail/creactBillOfEntry', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.BillOfEntryDetail.creactBillOfEntry);


    Evolve.Router.post('/api/v1/eMdm/AdvanceLicenseModule/BillOfEntryDetail/updateBillOfEntry', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AdvanceLicenseModule.BillOfEntryDetail.updateBillOfEntry);








    /** End  :Country  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router
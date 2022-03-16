'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Serial No  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/serial/getSerialNumberList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.SerialNo.SerialNoMid.getSerialNumberListAuth,  Evolve.App.Controllers.Evolve.SerialNo.ConList.getSerialNumberList);

    Evolve.Router.post('/api/v1/evolve/serial/addSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.SerialNo.SerialNoMid.addSerialNumber, Evolve.App.Controllers.Evolve.SerialNo.ConList.addSerialNumber);

    Evolve.Router.post('/api/v1/evolve/serial/updateSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.SerialNo.SerialNoMid.updateSerialNumber, Evolve.App.Controllers.Evolve.SerialNo.ConList.updateSerialNumber);

    Evolve.Router.post('/api/v1/evolve/serial/getSingleSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.SerialNo.SerialNoMid.getSingleSerialNumber, Evolve.App.Controllers.Evolve.SerialNo.ConList.getSingleSerialNumber);

    Evolve.Router.post('/api/v1/evolve/serial/deleteSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.SerialNo.SerialNoMid.deleteSerialNumber, Evolve.App.Controllers.Evolve.SerialNo.ConList.deleteSerialNumber);

    /** End  : Serial No  */

    //start - Serial Master for Adient Barcode

    Evolve.Router.post('/api/v1/evolve/serialv1/getSerialNumberList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV1.getSerialNumberList);

    Evolve.Router.post('/api/v1/evolve/serialv1/addSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV1.addSerialNumber);

    Evolve.Router.post('/api/v1/evolve/serialv1/editSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV1.editSerialNumber);

    Evolve.Router.post('/api/v1/evolve/serialv1/getSingleSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV1.getSingleSerialNumber);

    Evolve.Router.post('/api/v1/evolve/serialv1/deleteSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV1.deleteSerialNumber);

    Evolve.Router.post('/api/v1/evolve/serialv1/getModelList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV1.getModelList);

    Evolve.Router.post('/api/v1/evolve/serialv1/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV1.getUnitList);

    //end - Serial Master for Adient Barcode

    Evolve.Router.post('/api/v1/evolve/serialv2/getSerialNumberList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV2.getSerialNumberList);

    Evolve.Router.post('/api/v1/evolve/serialv2/addSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV2.addSerialNumber);

    Evolve.Router.post('/api/v1/evolve/serialv2/editSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV2.editSerialNumber);

    Evolve.Router.post('/api/v1/evolve/serialv2/getSingleSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV2.getSingleSerialNumber);

    Evolve.Router.post('/api/v1/evolve/serialv2/deleteSerialNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV2.deleteSerialNumber);

    Evolve.Router.post('/api/v1/evolve/serialv2/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV2.getItemList);

    Evolve.Router.post('/api/v1/evolve/serialv2/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SerialNo.ConListV2.getUnitList);


} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Serial No Router :", error)
}
module.exports = Evolve.Router
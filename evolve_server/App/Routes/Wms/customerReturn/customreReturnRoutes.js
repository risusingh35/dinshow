'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/wms/customerReturn/invoiceLineNoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.customerReturn.ConCustomerReturn.invoiceLineNoList);

    Evolve.Router.post('/api/v1/wms/customerReturn/invoiceLineDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.customerReturn.ConCustomerReturn.invoiceLineDetails);

    Evolve.Router.get('/api/v1/wms/customerReturn/holdLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.customerReturn.ConCustomerReturn.holdLocationList);

    Evolve.Router.post('/api/v1/wms/customerReturn/shippedPallets', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.customerReturn.ConCustomerReturn.shippedPallets);

    Evolve.Router.post('/api/v1/wms/customerReturn/returnNewNcrNo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.customerReturn.ConCustomerReturn.returnNewNcrNo);
    
    Evolve.Router.post('/api/v1/wms/customerReturn/returnPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.customerReturn.ConCustomerReturn.returnPallet);

    Evolve.Router.post('/api/v1/wms/customerReturn/returnedPalletsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.customerReturn.ConCustomerReturn.returnedPalletsList);



    /** End  : User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve User Router :", error)
}


module.exports = Evolve.Router
'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // List  Apis
    Evolve.Router.post('/api/v1/eDoa/salesOrder/getSoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConList.getSoList);

    
    
    Evolve.Router.post('/api/v1/eDoa/salesOrder/submitToApprovelProcess', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConList.submitToApprovelProcess);


    
    Evolve.Router.post('/api/v1/eDoa/salesOrder/uploadSOByCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConList.uploadSOByCsv);

    // // Url  For PDF Data


    // Evolve.Router.post('/api/v1/eDoa/salesOrder/getSingleSODetailsForPdf', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConList.getSingleSODetailsForPdf);



    // // Options 


    // // Quote Heaer Api

    Evolve.Router.post('/api/v1/eDoa/salesOrder/getCustomerList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getCustomerList);

    Evolve.Router.post('/api/v1/eDoa/salesOrder/getCustomerDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getCustomerDetails);

    Evolve.Router.post('/api/v1/eDoa/salesOrder/getAdressList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getAdressList);

    
    Evolve.Router.post('/api/v1/eDoa/salesOrder/getProjectList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getProjectList);

    Evolve.Router.post('/api/v1/eDoa/salesOrder/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getItemList);

    
    Evolve.Router.post('/api/v1/eDoa/salesOrder/getCustList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getCustList);

    Evolve.Router.post('/api/v1/eDoa/salesOrder/getItemDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getItemDetails);


    Evolve.Router.post('/api/v1/eDoa/salesOrder/getTaxClassesList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getTaxClassesList);


    Evolve.Router.post('/api/v1/eDoa/salesOrder/getCreditTermsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getCreditTermsList);


    
    Evolve.Router.post('/api/v1/eDoa/salesOrder/getApprovalMatrixList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getApprovalMatrixList);

        
    Evolve.Router.post('/api/v1/eDoa/salesOrder/geGenericCodeMasterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.geGenericCodeMasterList);

    Evolve.Router.post('/api/v1/eDoa/salesOrder/saveQuoteDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.saveQuoteDetails);


    // Evolve.Router.post('/api/v1/eDoa/salesOrder/getQuoteDtails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getQuoteDtails);

    
    Evolve.Router.post('/api/v1/eDoa/salesOrder/getSinglesoDetaislById', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getSinglesalesOrderDetaislById);

    Evolve.Router.post('/api/v1/eDoa/salesOrder/updatesalesOrderById', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.updatesalesOrderById);

    Evolve.Router.post('/api/v1/eDoa/salesOrder/getUserDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getUserDetails);

    Evolve.Router.post('/api/v1/eDoa/salesOrder/getsalesOrderNo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getsalesOrderNo);

    
    Evolve.Router.post('/api/v1/eDoa/salesOrder/getSalesPersonList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getSalesPersonList);

    Evolve.Router.post('/api/v1/eDoa/salesOrder/onUploadFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.onUploadFile);

    
    Evolve.Router.post('/api/v1/eDoa/salesOrder/deleteResource', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.deleteResource);

    Evolve.Router.post('/api/v1/eDoa/salesOrder/getItemAgreementDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesOrder.ConOption.getItemAgreementDetails);





    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Status Code Master Router :", error)
}
module.exports = Evolve.Router
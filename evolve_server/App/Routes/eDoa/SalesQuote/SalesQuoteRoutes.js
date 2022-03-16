'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // List  Apis
    Evolve.Router.post('/api/v1/eDoa/salesQuote/getSalesQuoteList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConList.getSalesQuoteList);

    
    
    Evolve.Router.post('/api/v1/eDoa/salesQuote/submitToApprovelProcess', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConList.submitToApprovelProcess);


    
    Evolve.Router.post('/api/v1/eDoa/salesQuote/uploadSqByCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConList.uploadSqByCsv);

    // Url  For PDF Data


    Evolve.Router.post('/api/v1/eDoa/salesQuote/getSingleSqDetailsForPdf', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConList.getSingleSqDetailsForPdf);



    // Options 


    // Quote Heaer Api

    Evolve.Router.post('/api/v1/eDoa/salesQuote/getCustomerList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getCustomerList);

    Evolve.Router.post('/api/v1/eDoa/salesQuote/getCustomerDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getCustomerDetails);

    Evolve.Router.post('/api/v1/eDoa/salesQuote/getAdressList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getAdressList);

    
    Evolve.Router.post('/api/v1/eDoa/salesQuote/getProjectList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getProjectList);

    Evolve.Router.post('/api/v1/eDoa/salesQuote/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getItemList);

    
    Evolve.Router.post('/api/v1/eDoa/salesQuote/getCustList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getCustList);

    Evolve.Router.post('/api/v1/eDoa/salesQuote/getItemDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getItemDetails);


    Evolve.Router.post('/api/v1/eDoa/salesQuote/getTaxClassesList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getTaxClassesList);


    Evolve.Router.post('/api/v1/eDoa/salesQuote/getCreditTermsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getCreditTermsList);


    
    Evolve.Router.post('/api/v1/eDoa/salesQuote/getApprovalMatrixList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getApprovalMatrixList);

        
    Evolve.Router.post('/api/v1/eDoa/salesQuote/geGenericCodeMasterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.geGenericCodeMasterList);

    Evolve.Router.post('/api/v1/eDoa/salesQuote/saveQuoteDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.saveQuoteDetails);

    Evolve.Router.post('/api/v1/eDoa/salesQuote/uploadSqByCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConList.uploadSqByCsv);

    
    Evolve.Router.post('/api/v1/eDoa/salesQuote/uploadSqInitialCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConList.uploadSqInitialCsv);



    // Evolve.Router.post('/api/v1/eDoa/salesQuote/getQuoteDtails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getQuoteDtails);

    
    Evolve.Router.post('/api/v1/eDoa/salesQuote/getSingleSalesQuoteDetaislById', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getSingleSalesQuoteDetaislById);

    Evolve.Router.post('/api/v1/eDoa/salesQuote/updateSalesQuoteById', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.updateSalesQuoteById);

    Evolve.Router.post('/api/v1/eDoa/salesQuote/getUserDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getUserDetails);

    Evolve.Router.post('/api/v1/eDoa/salesQuote/getSalesQuoteNo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getSalesQuoteNo);

    
    Evolve.Router.post('/api/v1/eDoa/salesQuote/getSalesPersonList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getSalesPersonList);

        
    Evolve.Router.post('/api/v1/eDoa/salesQuote/changeSqStatusOnAmend', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.changeSqStatusOnAmend);

    Evolve.Router.post('/api/v1/eDoa/salesQuote/onUploadFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.onUploadFile);

    
    Evolve.Router.post('/api/v1/eDoa/salesQuote/deleteResource', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.deleteResource);

    Evolve.Router.post('/api/v1/eDoa/salesQuote/getItemAgreementDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConOption.getItemAgreementDetails);





    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Status Code Master Router :", error)
}
module.exports = Evolve.Router
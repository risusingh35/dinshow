'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // List  Apis
    Evolve.Router.post('/api/v1/eDoa/Requisition/getRequisitionList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConList.getRequisitionList);

    
    
    Evolve.Router.post('/api/v1/eDoa/Requisition/submitToApprovelProcess', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConList.submitToApprovelProcess);


    
    Evolve.Router.post('/api/v1/eDoa/Requisition/uploadSqByCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConList.uploadSqByCsv);

    // Url  For PDF Data


    // Evolve.Router.post('/api/v1/eDoa/Requisition/getSingleSqDetailsForPdf', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConList.getSingleSqDetailsForPdf);



    // Options 


    // Quote Heaer Api

    Evolve.Router.post('/api/v1/eDoa/Requisition/getSupplierList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getSupplierList);

    Evolve.Router.post('/api/v1/eDoa/Requisition/getSupplierDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getSupplierDetails);

    Evolve.Router.post('/api/v1/eDoa/Requisition/getAdressList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getAdressList);

    
    Evolve.Router.post('/api/v1/eDoa/Requisition/getProjectList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getProjectList);

    Evolve.Router.post('/api/v1/eDoa/Requisition/getCategoryList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getCategoryList);

       
    Evolve.Router.post('/api/v1/eDoa/Requisition/getBuyerList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getBuyerList);

    Evolve.Router.post('/api/v1/eDoa/Requisition/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getItemList);

    
    Evolve.Router.post('/api/v1/eDoa/Requisition/getSupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getSupList);

    // Evolve.Router.post('/api/v1/eDoa/Requisition/getShipList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getShipList);



    Evolve.Router.post('/api/v1/eDoa/Requisition/getItemDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getItemDetails);


    Evolve.Router.post('/api/v1/eDoa/Requisition/getTaxClassesList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getTaxClassesList);


    Evolve.Router.post('/api/v1/eDoa/Requisition/getCreditTermsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getCreditTermsList);


    
    Evolve.Router.post('/api/v1/eDoa/Requisition/getApprovalMatrixList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getApprovalMatrixList);

        
    Evolve.Router.post('/api/v1/eDoa/Requisition/geGenericCodeMasterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.geGenericCodeMasterList);

    Evolve.Router.post('/api/v1/eDoa/Requisition/saveRequisitionDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.saveRequisitionDetails);


    // Evolve.Router.post('/api/v1/eDoa/Requisition/getQuoteDtails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getQuoteDtails);

    
    Evolve.Router.post('/api/v1/eDoa/Requisition/getSinglePrData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getSinglePrData);

    Evolve.Router.post('/api/v1/eDoa/Requisition/updateRequisitionById', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.updateRequisitionById);

    Evolve.Router.post('/api/v1/eDoa/Requisition/getUserDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getUserDetails);
// getReqSerialNo
    Evolve.Router.post('/api/v1/eDoa/Requisition/getReqSerialNo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getReqSerialNo);

    
    Evolve.Router.post('/api/v1/eDoa/Requisition/getSalesPersonList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getSalesPersonList);

        
    Evolve.Router.post('/api/v1/eDoa/Requisition/changeSqStatusOnAmend', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.changeSqStatusOnAmend);

    Evolve.Router.post('/api/v1/eDoa/Requisition/onUploadFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.onUploadFile);

    
    Evolve.Router.post('/api/v1/eDoa/Requisition/deleteResource', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.deleteResource);

    Evolve.Router.post('/api/v1/eDoa/Requisition/getItemAgreementDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getItemAgreementDetails);


    Evolve.Router.post('/api/v1/eDoa/Requisition/getShipToDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Requisition.ConOption.getShipToDetails);






    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Status Code Master Router :", error)
}
module.exports = Evolve.Router
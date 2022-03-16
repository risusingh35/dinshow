'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Purchase Order Receive API List
     *  Desc  :    
     */

     Evolve.Router.post('/api/v1/wms/salesOrder/getAllSalesOrderList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConListV2.getAllSalesOrderList);

     // options

     Evolve.Router.post('/api/v1/wms/salesOrder/getSoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getSoDetails);

    // Evolve.Router.post('/api/v1/wms/salesOrder/getSalesOrderList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConList.getSalesOrderList);

    // Evolve.Router.post('/api/v1/wms/salesOrder/addSalesOrder', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConList.addSalesOrder);

    // Evolve.Router.get('/api/v1/wms/salesOrder/getAllUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConList.getAllUnitList);

    // Evolve.Router.get('/api/v1/wms/salesOrder/getAllCustomerList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConList.getAllCustomerList);

    // Evolve.Router.post('/api/v1/wms/salesOrder/editSalesOrder', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConList.editSalesOrder);

    // Evolve.Router.get('/api/v1/wms/salesOrder/getAllItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConList.getAllItemList);

    // Evolve.Router.get('/api/v1/wms/salesOrder/getAllUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConList.getAllUomList);

    // Evolve.Router.post('/api/v1/wms/salesOrder/addSalesOrderDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConList.addSalesOrderDetails);

    // Evolve.Router.post('/api/v1/wms/salesOrder/editSalesOrderDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConList.editSalesOrderDetails);

    // Evolve.Router.post('/api/v1/wms/salesOrder/getSalesOrderDetailsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConList.getSalesOrderDetailsList);

    /** End  :  PurchaseOrder  */

    // SAles Ordwer V2

      // List  Apis
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getSalesOrderList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConListV2.getsalesOrderAmendmentList);

    
    
      Evolve.Router.post('/api/v1/wms/salesOrderV2/submitToApprovelProcess', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConListV2.submitToApprovelProcess);
  
  
      
      // Evolve.Router.post('/api/v1/wms/salesOrderV2/uploadSqByCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConList.uploadSqByCsv);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getFullSoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.salesOrder.ConListV2.getFullSoList);
  
  
      // Url  For PDF Data
  
  
      // Evolve.Router.post('/api/v1/wms/salesOrderV2/getSingleSqDetailsForPdf', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SalesQuote.ConList.getSingleSqDetailsForPdf);
  
  
  
  
  
  
      // Options 
  
  
      // Quote Heaer Api
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getCustomerList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getCustomerList);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getCustomerDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getCustomerDetails);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getAdressList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getAdressList);
  
      
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getProjectList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getProjectList);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getItemList);
  
      
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getCustList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getCustList);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getItemDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getItemDetails);
  
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getTaxClassesList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getTaxClassesList);
  
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getCreditTermsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getCreditTermsList);
  
  
      
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getApprovalMatrixList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getApprovalMatrixList);
  
          
      Evolve.Router.post('/api/v1/wms/salesOrderV2/geGenericCodeMasterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.geGenericCodeMasterList);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/saveQuoteDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.saveQuoteDetails);
  
  
      // Evolve.Router.post('/api/v1/wms/salesOrderV2/getQuoteDtails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getQuoteDtails);
  
      
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getSingleSalesOrderDetaislById', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getSingleSalesOrderDetaislById);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/updateSalesQuoteById', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.updateSalesQuoteById);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getUserDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getUserDetails);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getSalesOrderNo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getSalesOrderNo);
  
      
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getSalesPersonList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getSalesPersonList);
  
          
      Evolve.Router.post('/api/v1/wms/salesOrderV2/changeSqStatusOnAmend', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.changeSqStatusOnAmend);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/onUploadFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.onUploadFile);
  
      
      Evolve.Router.post('/api/v1/wms/salesOrderV2/deleteResource', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.deleteResource);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getItemAgreementDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getItemAgreementDetails);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getSalesOrderLineAmendmentHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getSalesOrderLineAmendmentHistory);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/getSalesOrderHeaderAmendmentHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.getSalesOrderHeaderAmendmentHistory);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/saveSalesOrderAmendment', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.saveSalesOrderAmendment);
  
      Evolve.Router.post('/api/v1/wms/salesOrderV2/addOrDeleteLineDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.salesOrder.ConOptionV2.addOrDeleteLineDetails);
  
  
  
  



} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error Recive Router :", error)
}


module.exports = Evolve.Router
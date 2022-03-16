'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  EInvoice API List
    *  Desc  :     
    */


  Evolve.Router.get('/api/v1/compliance/eInvoice/getEInvoiceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getEInvoiceList);

  Evolve.Router.get('/api/v1/compliance/eInvoice/getGlobleVariableEInv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getGlobleVariableEInv);

  Evolve.Router.post('/api/v1/compliance/eInvoice/updateEInvoice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.updateEInvoice);

  Evolve.Router.post('/api/v1/compliance/eInvoice/getInvoiceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Compliance.eInvoice.MidList.getInvoiceList, Evolve.App.Controllers.Compliance.eInvoice.ConList.getInvoiceList);

  Evolve.Router.post('/api/v1/compliance/eInvoice/reSendEmail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Compliance.eInvoice.MidList.reSendEmail, Evolve.App.Controllers.Compliance.eInvoice.ConList.reSendEmail);

  Evolve.Router.post('/api/v1/compliance/eInvoice/reProcessSendErp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Compliance.eInvoice.MidList.reProcessSendErp, Evolve.App.Controllers.Compliance.eInvoice.ConList.reProcessSendErp);

  Evolve.Router.post('/api/v1/compliance/eInvoice/reProcessUploadErp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Compliance.eInvoice.MidList.reProcessUploadErp, Evolve.App.Controllers.Compliance.eInvoice.ConList.reProcessUploadErp);

  Evolve.Router.get('/api/v1/compliance/eInvoice/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getUnitList);

  Evolve.Router.get('/api/v1/compliance/eInvoice/getSupplierList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getSupplierList);

  Evolve.Router.post('/api/v1/compliance/eInvoice/onClearInvoice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.onClearInvoice);

  Evolve.Router.post('/api/v1/compliance/eInvoice/getEwayBillDetailByID', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getEwayBillDetailByID);

  Evolve.Router.post('/api/v1/compliance/eInvoice/updateEwayBillDetail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.updateEwayBillDetail);

  Evolve.Router.post('/api/v1/compliance/eInvoice/cancelEwayBill', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.cancelEwayBill);


    //POD file upload 

    Evolve.Router.post('/api/v1/compliance/eInvoice/getInvoiceListPod', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getInvoiceListPod);

    Evolve.Router.post('/api/v1/compliance/eInvoice/getPodDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getPodDetails);
  
    Evolve.Router.post('/api/v1/compliance/eInvoice/podFileUpload', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.podFileUpload);
  
    Evolve.Router.post('/api/v1/compliance/eInvoice/onClickClnIrnPod', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.onClickClnIrnPod);
  
    Evolve.Router.get('/api/v1/compliance/eInvoice/getUnitListPod', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getUnitListPod);

    Evolve.Router.post('/api/v1/compliance/eInvoice/getInvoiceListPodDownloadCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getInvoiceListPodDownloadCsv);




  Evolve.Router.post('/getGSTData', function (req, res) {
    let result = '';
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = 32; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

    let gstNo = '';
    let cha = '0123456789'
    for (var i = 10; i > 0; --i) gstNo += cha[Math.floor(Math.random() * cha.length)];

    let obj = {
      statusCode: 200, status: "success", message: "GST done", result: {
        inrNo: result,
        gstNo: gstNo
      }
    };



    // let obj = {
    //   statusCode: 200, status: "success", message: "GST done", result: {
    //     inrNo: 'd056a57cc7cfcc6c9230aa0014e439259d0dc57cfa4eea2326253011fd53ea7e',
    //     gstNo: 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2Iiwia2lkIjoiRTc4MDhFNkZGMDNFMTMyODUzMzBCMDQxQ jNFMEEzQUVDNDc4MTMyMCIsInR5cCI6IkpXVCIsIng1dCI6IjU0Q09iX0EtRXloVE1MQkJzLUNqcnNSNEV5QSJ9.eyJkYXRhIjoie1wiQWNrTm9cIjoxNzEwMDAwMDA1NCxcIkFja0R0XCI6XCIyMD E5LTEyLTI1IDEyOjAzOjAwXCIsXCJUYXhTY2hcIjpudWxsLFwiVmVyc2lvblwiOlwiMS4wXCIsXCJJcm5cIjpcImQwNTZhNTdjYzdjZmNjNmM5MjMwYWEwMDE0ZTQzOTI1OWQwZGM1N2NmYTRlZWEy MzI2MjUzMDExZmQ1M2VhN2VcIixcIlRyYW5'
    //   }
    // };
    console.log("/*****************************************/")
    console.log(obj)
    console.log("/*****************************************/")
    res.send(obj);
  });


  Evolve.Router.post('/api/v1/compliance/eInvoice/getInvoiceHistoryList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getInvoiceHistoryList);

  Evolve.Router.post('/api/v1/compliance/eInvoice/getItemHistoryList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getItemHistoryList);

  Evolve.Router.post('/api/v1/compliance/eInvoice/getEwayBillDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getEwayBillDetails);

  Evolve.Router.post('/api/v1/compliance/eInvoice/extendEwayBill', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.extendEwayBill);

  Evolve.Router.post('/api/v1/compliance/eInvoice/changeVehicle', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.changeVehicle);

  Evolve.Router.post('/api/v1/compliance/eInvoice/getDistance', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getDistance);

  Evolve.Router.post('/api/v1/compliance/eInvoice/cancelEInvoice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.cancelEInvoice);

  Evolve.Router.get('/api/v1/compliance/eInvoice/getStateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.getStateList);

  Evolve.Router.post('/api/v1/compliance/eInvoice/updateEwayBill', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConList.updateEwayBill);


  /** End  : EInvoice  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve EInvoice Router :", error)
}


module.exports = Evolve.Router
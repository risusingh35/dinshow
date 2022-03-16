'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Purchase Order Receive API List
     *  Desc  :    
     */

     Evolve.Router.post('/api/v1/Wms/PurchaseOrder/getPoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConList.getPoList);

    Evolve.Router.post('/api/v1/Wms/PurchaseOrder/onUploadInventryCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConList.onUploadInventryCsv);

    Evolve.Router.post('/api/v1/Wms/PurchaseOrder/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConList.getItemList);

    Evolve.Router.post('/api/v1/Wms/PurchaseOrder/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConList.getUnitList);

    // PO RECIEVE V1

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/Receive/checkUomConv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.checkUomConvAuth, Evolve.App.Controllers.Wms.PurchaseOrder.ConReceive.checkUomConv);

    Evolve.Router.get('/api/v1/wms/PurchaseOrder/Receive/getLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConReceive.getLocationList);

    Evolve.Router.get('/api/v1/wms/PurchaseOrder/Receive/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getUomList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/Receive/getPoDetailsByPoId', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.getPoDetailsByPoIdAuth, Evolve.App.Controllers.Wms.PurchaseOrder.ConReceive.getPoDetailsByPoId);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/Receive/getPoDetailsByLineNumberAndPoId', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.getPoDetailsByLineNumberAndPoIdAuth, Evolve.App.Controllers.Wms.PurchaseOrder.ConReceive.getPoDetailsByLineNumberAndPoId);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/Receive/receivePurchaseOrder', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.receivePurchaseOrderAuth, Evolve.App.Controllers.Wms.PurchaseOrder.ConReceive.revicePurchaseOrder);

    Evolve.Router.get('/api/v1/wms/PurchaseOrder/Receive/updateBarcodePrint', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.updateBarcodePrint);


    // Purchase Order Recive Cooper

    // Evolve.Router.get('/api/v1/wms/PurchaseOrder/gateEntryNoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConPOReceive.gateEntryNoList);

    Evolve.Router.get('/api/v1/wms/PurchaseOrder/ReceiveCopper/getSuppliersList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getSuppliersList);


    Evolve.Router.get('/api/v1/wms/PurchaseOrder/ReceiveCopper/getUnpostedPoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getUnpostedPoList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getPoLineList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.getPoLineListAuth, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getPoLineList);

    Evolve.Router.get('/api/v1/wms/PurchaseOrder/ReceiveCopper/getLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getLocationList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getPoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getPoList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getSinglePoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getSinglePoDetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getAllPoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getAllPoDetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getPodetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getPodetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getPalletDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getPalletDetails);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getUomList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/gateEntryNoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.gateEntryNoList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/receivePurchaseOrder', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.receivePurchaseOrder, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.receivePurchaseOrder);


    // Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/updateBarcodePrint', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.updateBarcodePrint);
    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/checkUomConv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.checkUomConv);



    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/printPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.printPallet);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getPalletCount', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getPalletCount);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/updateSinglePalletData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.updateSinglePalletDataAuth, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.updateSinglePalletData);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/deletePallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.deletePalletAuth, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.deletePallet);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getPoByGateNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getPoByGateNumber);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getPodetailsbyGate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getPodetailsbyGate);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getUnpostedTransaction', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getUnpostedTransaction);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/postToErp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.postToErp);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getPreviosdatTranCount', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getPreviosdatTranCount);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/closePO', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.closePOAuth, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.closePO);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/getSummary', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.getSummary, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.getSummary);

    
    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/printAllPallets', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.printAllPalletsAuth, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.printAllPallets);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/ReceiveCopper/checkPoStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Wms.PurchaseOrder.MidReceive.checkPoStatusAuth, Evolve.App.Controllers.Wms.PurchaseOrder.ConV1.checkPoStatus);

    // PO RECEIVE V2
    Evolve.Router.get('/api/v1/wms/PurchaseOrder/v2/getSuppliersList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getSuppliersList);
    
    Evolve.Router.get('/api/v1/wms/PurchaseOrder/v2/getUnpostedPoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getUnpostedPoList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getPoLineList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getPoLineList);

    Evolve.Router.get('/api/v1/wms/PurchaseOrder/v2/getLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getLocationList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getPoListBySupplier', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getPoListBySupplier);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getSinglePoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getSinglePoDetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getAllPoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getAllPoDetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getPodetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getPodetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getPalletDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getPalletDetails);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getUomList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/gateEntryNoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.gateEntryNoList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/receivePurchaseOrderV2', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.receivePurchaseOrderV2);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/printPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.printPallet);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getPalletCount', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getPalletCount);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/updateSinglePalletData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.updateSinglePalletData);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/deletePallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.deletePallet);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getPoByGateNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getPoByGateNumber);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getPodetailsbyGate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getPodetailsbyGate);




    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getPreviosdatTranCount', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getPreviosdatTranCount);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/closePO', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.closePO);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/getSummary', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.getSummary);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/printAllPallets', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.printAllPallets);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v2/checkPoStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV2.checkPoStatus);


    // Purchase Order V3 - start


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getDetailsByGateNo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getDetailsByGateNo);

    Evolve.Router.get('/api/v1/wms/PurchaseOrder/v3/getSuppliersList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getSuppliersList);
    
    Evolve.Router.get('/api/v1/wms/PurchaseOrder/v3/getUnpostedPoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getUnpostedPoList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getPoLineList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getPoLineList);

    Evolve.Router.get('/api/v1/wms/PurchaseOrder/v3/getLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getLocationList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getPoListBySupplier', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getPoListBySupplier);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getSinglePoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getSinglePoDetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getAllPoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getAllPoDetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getPodetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getPodetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getPalletDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getPalletDetails);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getUomList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/gateEntryNoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.gateEntryNoList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/receivePurchaseOrderV2', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.receivePurchaseOrderV2);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/printPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.printPallet);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getPalletCount', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getPalletCount);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/updateSinglePalletData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.updateSinglePalletData);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/deletePallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.deletePallet);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getPoByGateNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getPoByGateNumber);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getPodetailsbyGate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getPodetailsbyGate);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getPreviosdatTranCount', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getPreviosdatTranCount);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/closePO', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.closePO);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/getSummary', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.getSummary);


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/printAllPallets', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.printAllPallets);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/v3/checkPoStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.checkPoStatus);

    Evolve.Router.get('/api/v1/wms/PurchaseOrder/v3/onWeightCapture', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.onWeightCapture);

    // Purchase Order V3 - end


    Evolve.Router.post('/api/v1/wms/PurchaseOrder/RecieveV3/getPodetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConRecieveV3.getPodetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/RecieveV3/getAsnDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConRecieveV3.getAsnDetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/RecieveV3/getGateDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConRecieveV3.getGateDetails);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/RecieveV3/poNumberData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConRecieveV3.poNumberData);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/RecieveV3/recieveAsn', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConRecieveV3.recieveAsn);


    Evolve.Router.get('/api/v1/wms/PurchaseOrder/RecieveV3/getLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConRecieveV3.getLocationList);

    Evolve.Router.get('/api/v1/wms/PurchaseOrder/RecieveV3/getpoNumberList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConRecieveV3.getpoNumberList);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/RecieveV3/recievePurchaseOrder', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConRecieveV3.recievePurchaseOrder);

    Evolve.Router.post('/api/v1/wms/PurchaseOrder/RecieveV3/purchaseOrderRecieve1', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConRecieveV3.purchaseOrderRecieve1);





    /** End  :  PurchaseOrder  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error Recive Router :", error)
}


module.exports = Evolve.Router
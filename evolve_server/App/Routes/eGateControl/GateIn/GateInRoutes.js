'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Gate in routes
     *  Desc  :    
     */

    //parcel in

    Evolve.Router.post('/api/v1/eGateControl/GateIn/addParcelData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eGateControl.GateIn.MidGateIn.addParcelDataAuth, Evolve.App.Controllers.eGateControl.GateIn.ConParcelIn.addParcelData);

    // Evolve.Router.post('/api/v1/eGateControl/GateIn/List/getParcelList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eGateControl.GateIn.ConInList.getParcelList);

    //parcel out


    // Evolve.Router.post('/api/v1/eGateControl/ParcelOut/addParcelData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eGateControl.GateIn.MidGateIn.addParcelDataAuth, Evolve.App.Controllers.eGateControl.GateIn.ConParcelOut.addParcelData);

    // Evolve.Router.post('/api/v1/eGateControl/ParcelOut/List/outParcelList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eGateControl.GateIn.ConOutList.outParcelList);

    // Evolve.Router.post('/api/v1/eGateControl/GateIn/List/getImageUrl', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.eGateControl.GateIn.MidGateIn.getImageUrlAuth , Evolve.App.Controllers.eGateControl.GateIn.ConInList.getImageUrl);

    // Evolve.Router.post('/api/v1/eGateControl/ParcelOut/List/getImageUrl', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eGateControl.GateIn.MidGateIn.getImageUrlAuth,Evolve.App.Controllers.eGateControl.GateIn.ConOutList.getImageUrl);


    // visitor in 

    Evolve.Router.get('/api/v1/eGateControl/GateIn/getAllSectionList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConVisitorIn.getAllSectionList);

    Evolve.Router.get('/api/v1/eGateControl/GateIn/getAllPassTypeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConVisitorIn.getAllPassTypeList);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/addVisitorIN', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConVisitorIn.addVisitorIN);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/searchVisitorData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConVisitorIn.searchVisitorData);

    Evolve.Router.get('/api/v1/eGateControl/GateIn/generateOtp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConVisitorIn.generateOtp);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/checkVisitorMobileNo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConVisitorIn.checkVisitorMobileNo);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/checkVisitorEmailId', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConVisitorIn.checkVisitorEmailId);











    //   Evolve.Router.post('/api/v1/eGateControl/visitor/sendotp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.Visitor.ConList.sendotp);






    // material in


    // Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialIn/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialIn.getItemList);

    Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialIn/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialIn.getUomList);

    Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialIn/getDocument', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialIn.getDocument);


    Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialIn/getSupplierList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialIn.getSupplierList);

    Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialIn/getEntryGateNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialIn.getEntryGateNumber);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialIn/checkEwayBillNo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialIn.checkEwayBillNo);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialIn/getSupplierPo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialIn.getSupplierPo);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialIn/getPoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialIn.getPoDetails);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialIn/addGateDataMaterialIn', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialIn.addGateDataMaterialIn);




    // Material In V2

    Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialInv2/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.getItemList);

    Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialInv2/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.getUomList);

    Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialInv2/getDocument', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.getDocument);

    Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialInv2/getSupplierList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.getSupplierList);

    // Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialInv2/getPrinterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.getPrinterList);

    Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialInv2/getEntryGateNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.getEntryGateNumber);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialInv2/checkEwayBillNo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.checkEwayBillNo);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialInv2/getSupplierPo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.getSupplierPo);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialInv2/getPoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.getPoDetails);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialInv2/addMaterialIn', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.addMaterialIn);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialInv2/getPruchaseOrderList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.getPruchaseOrderList);



    // Material In V3


    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialInv3/checkDeliveryChallan', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.checkDeliveryChallan);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialInv3/createOrUpateGateIn', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.createOrUpateGateIn);

    Evolve.Router.post('/api/v1/eGateControl/GateIn/MaterialInv3/onPdfData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.onPdfData);


    Evolve.Router.get('/api/v1/eGateControl/GateIn/MaterialInv3/getMaterialIn', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.getMaterialIn);

    /** End  : Gate In*/

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Gate Control gate in router :", error)
}


module.exports = Evolve.Router
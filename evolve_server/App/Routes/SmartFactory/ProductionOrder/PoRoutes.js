'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Production order generate API List
     *  Desc  :    
     */

  

    Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/getProductionOrderList",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionOrder.MidPo.getProductionOrderList,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.getProductionOrderList );

    Evolve.Router.get( "/api/v1/smartFactory/ProductionOrder/checkAllowCreatWo",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.checkAllowCreatWo
    );

    Evolve.Router.get("/api/v1/smartFactory/ProductionOrder/getAllItem",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.getAllItem);

    Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/getItemDescCustPart",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.getItemDescCustPart);

    Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/printProdOrder",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.printProdOrder
    );

    Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/printProdOrderSerial",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.printProdOrderSerial
    );


    Evolve.Router.post(
      "/api/v1/smartFactory/ProductionOrder/createWorkOrder",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
      Evolve.App.Middlewares.SmartFactory.ProductionOrder.MidPo.createWorkOrder,
      Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.createWorkOrder
    );
    

    Evolve.Router.post(
      "/api/v1/smartFactory/ProductionOrder/startWorkOrder",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.startWorkOrder
    );

    Evolve.Router.post(
      "/api/v1/smartFactory/ProductionOrder/closeWorkOrder",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.closeWorkOrder
    );

    Evolve.Router.get(
      "/api/v1/smartFactory/ProductionOrder/getWorkCenterList",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.getWorkCenterList
    );

    Evolve.Router.post(
      "/api/v1/smartFactory/ProductionOrder/detailWorkOrder",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.detailWorkOrder
    );

    Evolve.Router.post(
      "/api/v1/smartFactory/ProductionOrder/getOpenWorkOrderList",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.getOpenWorkOrderList
    );

    Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/downloadPO_xls",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.downloadPO_xls);

    Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/getWoPlanningList",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.getWoPlanningList);

    Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/publishWoPlanning",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.publishWoPlanning);


    Evolve.Router.get("/api/v1/smartFactory/ProductionOrder/checkWoSplitEnable",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPo.checkWoSplitEnable);

    // Production order V1

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV1/getProductionOrderList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV1.getProductionOrderList);

    Evolve.Router.get('/api/v1/smartFactory/ProductionOrderV1/getWorkCenterList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV1.getWorkCenterList);

    Evolve.Router.get('/api/v1/smartFactory/ProductionOrderV1/getAllItem',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV1.getAllItem);

    
    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV1/getItemDescCustPart',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV1.getItemDescCustPart);


    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV1/printProdOrderSerial',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV1.printProdOrderSerial);

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV1/printProdOrder',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV1.printProdOrder);

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV1/createWorkOrder',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV1.createWorkOrder);

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV1/startWorkOrder',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV1.startWorkOrder);

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV1/detailWorkOrder',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV1.detailWorkOrder);

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV1/closeWorkOrder',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV1.closeWorkOrder);

    //PRODUCTION ORDER V2

    Evolve.Router.get('/api/v1/smartFactory/ProductionOrderV2/getAllItem',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV2.getAllItem);

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV2/getItemDescCustPart',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV2.getItemDescCustPart);

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV2/createWorkOrder',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV2.createWorkOrder);

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV2/startWorkOrder',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV2.startWorkOrder);

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV2/detailWorkOrder',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV2.detailWorkOrder);


    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV2/getWorkOrderDetail',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV2.getWorkOrderDetail);


    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV2/getProductionOrderList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV2.getProductionOrderList);



    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV2/closeWorkOrder',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV2.closeWorkOrder);

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV2/printProdOrderSerial',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV2.printProdOrderSerial);

    Evolve.Router.post('/api/v1/smartFactory/ProductionOrderV2/printProdOrder',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV2.printProdOrder);

    Evolve.Router.get('/api/v1/smartFactory/ProductionOrderV2/getWorkCenterList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionOrder.ConPoV2.getWorkCenterList);


        

  
  
  

  
    
  /** End  : Production order generate  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Plan Upload Router :", error)
}


module.exports = Evolve.Router
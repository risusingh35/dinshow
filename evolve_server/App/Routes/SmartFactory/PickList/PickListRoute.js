'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
   *  Title :  Pick List  API List
   *  Desc  :    
   */


  // picklist issue Serial number wise 


  // Evolve.Router.post("/api/v1/smartFactory/PickList/isuueSnb/addPickListDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidList.addPickListDetails, Evolve.App.Controllers.SmartFactory.PickList.ConIssueSnb.addPickListDetails);


  // Evolve.Router.post("/api/v1/smartFactory/PickList/isuueSnb/getWorkOrderListIssue", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConIssueSnb.getWorkOrderListIssue);

  // Evolve.Router.post("/api/v1/smartFactory/PickList/isuueSnb/getSalesOrderListIssue", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConIssueSnb.getSalesOrderListIssue);


  // Evolve.Router.post("/api/v1/smartFactory/PickList/isuueSnb/getPickListForIssue", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidList.getPickListForIssueAuth, Evolve.App.Controllers.SmartFactory.PickList.ConIssueSnb.getPickListForIssue
  // );

  // Evolve.Router.post("/api/v1/smartFactory/PickList/generatePickList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidList.generatePickListAuth, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateList.generatePickList);



  // // picklist issue lot  wise 

  // Evolve.Router.post("/api/v1/smartFactory/PickList/issue/getWorkOrderListIssue", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConIssueList.getWorkOrderListIssue);

  // Evolve.Router.post("/api/v1/smartFactory/PickList/issue/getPickListForIssue", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidList.getPickListForIssueAuth, Evolve.App.Controllers.SmartFactory.PickList.ConIssueList.getPickListForIssue);

  // Evolve.Router.post("/api/v1/smartFactory/PickList/issue/getSalesOrderListIssue", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConIssueList.getSalesOrderListIssue);


  // // Pick List
  // Evolve.Router.post("/api/v1/smartFactory/PickList/getPickListByWorkOrder", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidList.getPickListByWorkOrderAuth, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateList.getPickListByWorkOrder);

  // Evolve.Router.get("/api/v1/smartFactory/PickList/getWorkCenterList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateList.getWorkCenterList);

  // Evolve.Router.post("/api/v1/smartFactory/PickList/getWorkOrderList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateList.getWorkOrderList);

  // Evolve.Router.post("/api/v1/smartFactory/PickList/getPickListByWorkOrderCount", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateList.getPickListByWorkOrderCount);

  // Evolve.Router.post("/api/v1/smartFactory/PickList/getItemLocation", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidList.getItemLocationAuth, Evolve.App.Controllers.SmartFactory.PickList.ConIssueList.getItemLocation);

  // Evolve.Router.post("/api/v1/smartFactory/PickList/updateInventory", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidList.updateInventoryAuth, Evolve.App.Controllers.SmartFactory.PickList.ConIssueList.updateInventory);

  // Evolve.Router.post("/api/v1/smartFactory/PickList/checkQuntity", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidList.checkQuntityAuth, Evolve.App.Controllers.SmartFactory.PickList.ConIssueList.checkQuntity);


  // // Pick List General

  // Evolve.Router.get("/api/v1/smartFactory/PickList/generateGn/getWorkOrderList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateGn.getWorkOrderList);

  // Evolve.Router.get("/api/v1/smartFactory/PickList/generateGn/getSectionList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateGn.getSectionList);

  // Evolve.Router.get("/api/v1/smartFactory/PickList/generateGn/getShiftList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateGn.getShiftList);

  // Evolve.Router.get("/api/v1/smartFactory/PickList/generateGn/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateGn.getMachineList);

  // Evolve.Router.post("/api/v1/smartFactory/PickList/generateGn/generatePickList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidList.generatePickListAuth, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateGn.generatePickList);

  // Evolve.Router.post("/api/v1/smartFactory/PickList/generateGn/getPickListData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateGn.getPickListData);

  // Evolve.Router.post("/api/v1/smartFactory/PickList/generateGn/getPickListDetail", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConGenerateGn.getPickListDetail);
  /** End  : Pick List    */


  //pick list generate cooper



  // Evolve.Router.post('/api/v1/smartFactory/pickList/cooper/getPickListByWorkOrderCount', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getPickListByWorkOrderCount);

  // Evolve.Router.post('/api/v1/smartFactory/pickList/cooper/generatePickList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.generatePickList);


  // Evolve.Router.post('/api/v1/smartFactory/pickList/cooper/getWorkOrderList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getWorkOrderList);


  // Evolve.Router.post('/api/v1/smartFactory/pickList/cooper/getMachineList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getMachineList);

  // Evolve.Router.get('/api/v1/smartFactory/pickList/cooper/getWorkCenterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getWorkCenterList);

  // Evolve.Router.get('/api/v1/smartFactory/pickList/cooper/getPickListByWorkOrder', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getPickListByWorkOrder);

  // Evolve.Router.post('/api/v1/smartFactory/pickList/cooper/getPickListByWorkOrderCount', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getPickListByWorkOrderCount);

  // Evolve.Router.get("/api/v1/smartFactory/pickList/cooper/getShiftList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getShiftList);

  // Evolve.Router.post('/api/v1/smartFactory/pickList/cooper/getMachineListBySectionId', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getMachineListBySectionId);

  // Evolve.Router.post('/api/v1/smartFactory/pickList/cooper/getWorkOrdersByMachineId', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getWorkOrdersByMachineId);

  // Evolve.Router.post('/api/v1/smartFactory/pickList/cooper/getWoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getWoDetails);

  // Evolve.Router.post('/api/v1/smartFactory/pickList/cooper/getChildItems',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getChildItems);

  // Evolve.Router.post('/api/v1/smartFactory/pickList/cooper/getPickListDetails',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.conGenerateCooper.getPickListDetails);

  // work  oreder picklist  08/06/2020

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/getWoList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getWoList);

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/WOAjaxUrl", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.WOAjaxUrl);

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/sheduledWO", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.sheduledWO);


  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/getWoProduceDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.getWoProduceDetailsAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getWoProduceDetails);
  

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/getWoissueDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getWoissueDetails);

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/getPalletDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.getPalletDetailsAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getPalletDetails);

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/getLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getLocationList);

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/pickPallets", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.pickPalletsAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.pickPallets);


  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/unpickPallets", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.unpickPalletsAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.unpickPallets);

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/getSubItemList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.getSubItemListAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getSubItemList);

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/getSubItemAvailPallets", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.getSubItemAvailPalletsAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getSubItemAvailPallets);


  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickList/getWobomIssueDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.getWobomIssueDetailsAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getWobomIssueDetails);


  // PICK LIST GENERATE 


  Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/getWoList",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.getWoList);

  Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/getWoDetails",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.getWoDetails);

  Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/getSoList",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.getSoList);

  Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/getSoDetails",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.getSoDetails);


  Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/generatePickList",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.generatePickList);

  // Pick List

  
  Evolve.Router.post("/api/v1/SmartFactory/PickList/ConWoPickList/getPickListNumber",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getPickListNumber);

  Evolve.Router.post("/api/v1/SmartFactory/PickList/ConWoPickList/getPickListDetails",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getPickListDetails);


  Evolve.Router.post("/api/v1/SmartFactory/PickList/ConWoPickList/getInventoryDetails",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getInventoryDetails);

  
  Evolve.Router.post("/api/v1/SmartFactory/PickList/ConWoPickList/onPickInvnetory",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.onPickInvnetory);
    
  Evolve.Router.post("/api/v1/SmartFactory/PickList/ConWoPickList/getLocationList",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.getLocationList);

  Evolve.Router.post("/api/v1/SmartFactory/PickList/ConWoPickList/onUnPickInventory",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.PickList.ConWoPickList.onUnPickInventory);
    









  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/getPalletDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.getPalletDetailsAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.getPalletDetails);

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/getLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.getLocationList);

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/pickPallets", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.pickPalletsAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.pickPallets);


  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/unpickPallets", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.unpickPalletsAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.unpickPallets);

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/getSubItemList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.getSubItemListAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.getSubItemList);

  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/getSubItemAvailPallets", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.getSubItemAvailPalletsAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.getSubItemAvailPallets);


  // Evolve.Router.post("/api/v1/SmartFactory/PickList/woPickListgenerate/getWobomIssueDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PickList.MidList.getWobomIssueDetailsAuth, Evolve.App.Controllers.SmartFactory.PickList.ConWoPickGenerate.getWobomIssueDetails);























} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Smart Factory pick list Router :", error)
}


module.exports = Evolve.Router
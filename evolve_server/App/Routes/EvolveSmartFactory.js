const Evolve = require("../../Boot/Evolve");

try {
  // Menu Link

  Evolve.Router.get("/api/v1/smartFactory/smartFactorySidebarMenuList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .smartFactorySidebarMenuList
  );

  // PRODUCTION ORDER

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/checkAllowCreatWo",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .checkAllowCreatWo
  // );

  Evolve.Router.get(
    "/api/v1/smartFactory/getAllItem",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getAllItem
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getItemDescCustPart",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getItemDescCustPart
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/createWorkOrder",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.createWorkOrder,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.createWorkOrder
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/startWorkOrder",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.startWorkOrder
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/detailWorkOrder",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.detailWorkOrder
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getWorkOrderDetail",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getWorkOrderDetail
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getProductionOrderList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getProductionOrderList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/closeWorkOrder",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.closeWorkOrder
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/printProdOrderSerial",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .printProdOrderSerial
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/printProdOrder",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.printProdOrder
  );

  //Plan Upload

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/csvPlanUpload",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.csvPlanUpload
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getProdPlanDetails",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.getProdPlanDetails,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getProdPlanDetails
  // );

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getProductionPlanList",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getProductionPlanList
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/publishPlan",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.publishPlan
  // );

  Evolve.Router.post(
    "/api/v1/smartFactory/deletePlan",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.deletePlan,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.deletePlan
  );

  // MF Process

  Evolve.Router.get(
    "/api/v1/smartFactory/getMillingChart",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getMillingChart
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getVibrationChart",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getVibrationChart
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getIntigrationStatus",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getIntigrationStatus
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getDashboardTopStatus",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getDashboardTopStatus
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getCompletedTrigger",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getCompletedTrigger
  );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getMFBarcodeDetails",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getMFBarcodeDetails
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getMFProcessValidations",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getMFProcessValidations
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/printMfProcessDetails",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .printMfProcessDetails
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/printRejectionDetails",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .printRejectionDetails
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/moveMfProcess",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.moveMfProcess
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/saveMfProcess",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.saveMfProcess
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/rejectMfProcess",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.rejectMfProcess
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getComponantItemList",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getComponantItemList
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/rejectComponantItem",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.rejectComponantItem,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .rejectComponantItem
  // );

  // Production Booking
  Evolve.Router.post(
    "/api/v1/smartFactory/printAssyBarcode",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.printAssyBarcode
  );

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getMFSerialList",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getMFSerialList
  // );

  // Production Booking

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getItem",
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getItem
  // );

  Evolve.Router.post(
    "/api/v1/smartFactory/getItem",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getItem
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getWorkCenterList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getWorkCenterList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getWorkOrderList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getWorkOrderList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getWorkOrderListIssue",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getWorkOrderListIssue
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getSalesOrderListIssue",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getSalesOrderListIssue
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getMachineListBySectionId",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator
      .getMachineListBySectionIdAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getMachineListBySectionId
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getMachineAndSection",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getMachineAndSection
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getItemListByWorkOrder",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.getItemListByWorkOrderAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getItemListByWorkOrder
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getWorkOrderByItem",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.getWorkOrderByItemAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getWorkOrderByItem
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getLocationByMachine",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getLocationByMachine
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getItemDetails",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.getItemDetailsAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getItemDetails
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getOperatorList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getOperatorList
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getToolList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getToolList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/createOperator",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.createOperatorAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.createOperator
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/moveMachine",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.moveMachine
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/moveTool",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.moveTool
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getLocationList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getLocationList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/saveInventory",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.saveInventoryAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.saveInventory
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getProductionBookingList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator
      .getProductionBookingListAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getProductionBookingList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/checkPickList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.checkPickList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/checkWoInShift",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.checkWoInShift
  );

  /** Time Management */

  Evolve.Router.post(
    "/api/v1/smartFactory/getTimeManagemetWorkOrderList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator
      .getTimeManagemetWorkOrderListAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getTimeManagemetWorkOrderList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/addTimeManagemet",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.addTimeManagemet
  );

  /** Production Booking Scanning  **/

  /** Scanning -- Production Booking   **/

  Evolve.Router.post(
    "/api/v1/smartFactory/getProdOrdersBom",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.getProdOrdersBomAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getProdOrdersBom
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getbarcodeIssuedQty",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.getbarcodeIssuedQtyAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getbarcodeIssuedQty
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getMaterialIssued",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getMaterialIssued
  );

  // Return to Store List
  Evolve.Router.post(
    "/api/v1/smartFactory/getReturnList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getReturnList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/returnToStoreUpdate",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .returnToStoreUpdate
  );

  // Pick List Generate

  Evolve.Router.get(
    "/api/v1/smartFactory/getPickListByWorkOrder",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.getPickListByWorkOrderAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getPickListByWorkOrder
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getPickListByWorkOrderCount",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getPickListByWorkOrderCount
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/generatePickList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.generatePickList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getPickListForIssue",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.getPickListForIssueAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getPickListForIssue
  );

  // Pick List Issue

  Evolve.Router.post(
    "/api/v1/smartFactory/itemTransfer",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.itemTransferAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.itemTransfer
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getInventoryItemFormBarcode",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator
      .getInventoryItemFormBarcodeAuth,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getInventoryItemFormBarcode
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getAlternateItem",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getAlternateItem
  );
  // Evolve.Router.post('/api/v1/smartFactory/checkQuantityValid', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.smartFactoryControllers.checkQuantityValid);
  Evolve.Router.post(
    "/api/v1/smartFactory/addPickListDetails",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .addPickListDetails
  );

  // Print

  Evolve.Router.post(
    "/api/v1/smartFactory/printProdOrder",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.printProdOrder
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/printProdOrderSerial",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .printProdOrderSerial
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/printBarcode",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.printBarcode
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/reverceInv",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.reverceInv
  );

  // Report Dump

  Evolve.Router.get(
    "/api/v1/smartFactory/getReportDump",
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getReportDump
  );

  // IP Trace Report

  Evolve.Router.get(
    "/api/v1/smartFactory/getIpTraceReport",
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getIpTraceReport
  );

  // XML Reports
  Evolve.Router.get(
    "/api/v1/smartFactory/getXmlReport",
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getXmlReport
  );

  // Milling Vibration Report

  Evolve.Router.get(
    "/api/v1/smartFactory/getMillingVibrationReport",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getMillingVibrationReport
  );

  // Vibration  Report

  Evolve.Router.get(
    "/api/v1/smartFactory/getVibrationMachineReport",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getVibrationMachineReport
  );

  //Rejection Report

  Evolve.Router.get(
    "/api/v1/smartFactory/getRejectionReport",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getRejectionReport
  );

  //Rejection Work Order

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getRejectionWorkOrder",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getRejectionWorkOrder
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getSinglePodProceess",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getSinglePodProceess
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/updateEpodErework",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.updateEpodErework,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .updateEpodErework
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/updateEpodEreworkScrap",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.updateEpodEreworkScrap,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .updateEpodEreworkScrap
  // );

  // PDI process
  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getAllDoSup",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getAllDoSup
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getSingleDOSOData",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.getSingleDOSOData,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getSingleDOSOData
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getDoLine",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.getDoLine,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getDoLine
  // );
  // pdi

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getPDISingleData",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.getPDISingleData,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getPDISingleData
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getPDIData",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.getPDIData,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getPDIData
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getAllPdiTempDetail",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.getAllPdiTempDetail,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getAllPdiTempDetail
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/addRejectSerialNo",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.addRejectSerialNo,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .addRejectSerialNo
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/addPdiHistory",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.addPdiHistory,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.addPdiHistory
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/checkSerialNo",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.checkSerialNo,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.checkSerialNo
  // );

  Evolve.Router.post(
    "/api/v1/smartFactory/pdiReportdataPrint",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .pdiReportdataPrint
  );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/pdiImageUpload",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.pdiImageUpload
  // );

  // History Tracking Report

  Evolve.Router.post(
    "/api/v1/smartFactory/getHistoryTrackReport",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.getHistoryTrackReport,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getHistoryTrackReport
  );

  Evolve.Router.get("/testPrint/:barcode", function (req, res) {
    let k = 0;

    // for(let i=0; i <= 3; i++){
    //     Evolve.PrintJob.push({
    //         type:'EVOLVE01',
    //         barcode : k++
    //     });
    // }

    // setTimeout(function (){
    //     for(let i=0; i <= 3; i++){
    //         Evolve.PrintJob.push({
    //             type:'EVOLVE01',
    //             barcode : k++
    //         });
    //     }
    // }, 100) // Print JOB

    // setTimeout(function (){
    //     for(let i=0; i <= 3; i++){
    //         Evolve.PrintJob.push({
    //             type:'EVOLVE01',
    //             barcode : k++
    //         });
    //     }
    // }, 200) // Print JOB

    // setTimeout(function (){
    //     for(let i=0; i <= 3; i++){
    //         Evolve.PrintJob.push({
    //             type:'EVOLVE01',
    //             barcode : k++
    //         });
    //     }
    // }, 300) // Print JOB
    // setTimeout(function (){
    //     for(let i=0; i <= 3; i++){
    //         Evolve.PrintJob.push({
    //             type:'EVOLVE01',
    //             barcode : k++
    //         });
    //     }
    // }, 400) // Print JOB
    // setTimeout(function (){
    //     for(let i=0; i <= 3; i++){
    //         Evolve.PrintJob.push({
    //             type:'EVOLVE01',
    //             barcode : k++
    //         });
    //     }
    // }, 500) // Print JOB

    // Evolve.PrintJob.push({
    //     type:'EVOLVE01',
    //     barcode : "002"
    // });
    // Evolve.PrintJob.push({
    //     type:'EVOLVE01',
    //     barcode : "003"
    // });
    // Evolve.PrintJob.push({
    //     type:'EVOLVE01',
    //     barcode : "004"
    // });
    // Evolve.PrintJob.push({
    //     type:'EVOLVE01',
    //     barcode : "005"
    // });
    // Evolve.PrintJob.push({
    //     type:'EVOLVE01',
    //     barcode : "006"
    // });
    // Evolve.PrintJob.push({
    //     type:'EVOLVE01',
    //     barcode : "007"
    // });

    console.log(">>>>>>>>>>>>>>>>>>>>Start>>>>>>>>>>>>>>>>>>>>>");
    //Evolve.App.Controllers.Evolve.evolveControllers.printJob(); // Call For Print JOB
    console.log(">>>>>>>>>>>>>>>>>>>>End>>>>>>>>>>>>>>>>>>>>>");

    // var address = {};

    // var font_variable = { x: '50', y: '50', fonttype: '2', rotation: '0', xmul: '1', ymul: '1', text: 'Font Test' }
    // var barcode_variable = { x: '50', y: '170', type: '128', height: '40', readable: '2', rotation: '0', narrow: '2', wide: '2', code: 'EVOLVE' }
    // var label_variable = { quantity: '1', copy: '1' };
    // Evolve.Print.OpenPort(address, true);
    // Evolve.Print.ClearBuffer('', true);
    // Evolve.Print.PrinterFont(font_variable, true);
    // Evolve.Print.BarCode(barcode_variable,true);
    // Evolve.Print.SendCommand('QRCODE 10,10,H,4,A,0,"ABCabc123"',true);
    // Evolve.Print.PrintLabel(label_variable, true);
    // Evolve.Print.ClosePort(2000, true);

    //Evolve.Print.BarCode(qr_var,true);
    // Evolve.Print.PrinterFont('SIZE 60mm,30mm');
    // Evolve.Print.SendCommand('GAP 3mm,0');
    // Evolve.Print.SendCommand('DIRECTION 1');
    // Evolve.Print.SendCommand('SPEED 5');
    // Evolve.Print.SendCommand('DENSITY 15');
    // Evolve.Print.SendCommand('CLS');
    // Evolve.Print.SendCommand('TEXT 25,10,\"0\",0,12,12,\"EVOLVE SERVER PRINT TEST\"',true);
    // Evolve.Print.SendCommand('BLOCK 20,45,450,100,\"0\",0,7,7,3,\"EVOLVE PART NAME:ASSY CO-DRIVER WITH 01 AR HIGH BACK (Without Grab Handle)\"');
    // Evolve.Print.SendCommand('TEXT 20,95,\"0\",0,7,7,\"EVOLVE PART NO: \"',true);
    // Evolve.Print.SendCommand('TEXT 20,120,\"0\",0,7,7,\"CUSTOMER PART NO: \"',true);
    // Evolve.Print.SendCommand('TEXT 20,145,\"0\",0,7,7,\"DATE: \"',true);
    // Evolve.Print.SendCommand('TEXT 250,145,\"0\",0,7,7,\"TIME: \"',true);
    //Evolve.Print.SendCommand('BARCODE 50,170,\"128\",40,2,0,2,2,\"ABCASDASDSADS\"',true);

    let obj = {
      statusCode: 200,
      status: "success",
      message: "done",
      result: Evolve.Weight
    };
    console.log("/*****************************************/");
    console.log(obj);
    console.log("/*****************************************/");
    res.json(obj);
  });

  //Assembly
  Evolve.Router.get(
    "/api/v1/smartFactory/getParentItems",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getParentItems
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getAssemblyBarcodeList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getAssemblyBarcodeList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getOnchangeParent",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getOnchangeParent
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getParentSerial",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getParentSerial
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/checkBarcodePrinted",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .checkBarcodePrinted
  );

  // Report API Start Here

  Evolve.Router.get(
    "/api/v1/smartFactory/getProductionReports",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getProductionReports
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getRejectedSrNo",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getRejectedSrNo
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getCustomerWiseReport",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getCustomerWiseReport
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getDoStatusReport",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getDoStatusReport
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getAllItemList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getAllItemList
  );

  // Do List made By Ravat

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getSoNumberList",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getSoNumberList
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getSalesOrderDetails",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.getSalesOrderDetails,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getSalesOrderDetails
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getDoDetails",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.getDoDetails,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getDoDetails
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/addDoList",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.addDoList,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.addDoList
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getSingleDoSoLine",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.getSingleDoSoLine,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getSingleDoSoLine
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/updateDoList",
  //   Evolve.App.Middlewares.SmartFactordyApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.updateDoList,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.updateDoList
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getDoDataTable",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getDoDataTable
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getSingleDoData",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.getSingleDoData,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getSingleDoData
  // );

  Evolve.Router.post(
    "/api/v1/smartFactory/deleteDoData",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.deleteDoData
  );

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getDoList",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getDoList
  // );

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getallCustomer",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getallCustomer
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/deleteDoLine",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Middlewares.SmartFactoryApiValidator.deleteDoLine,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.deleteDoLine
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getdoidpdftabledata",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getdoidpdftabledata
  // );

  // print DO Lable

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/printDoLable",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.printDoLable
  // );

  // getScrap

  Evolve.Router.get(
    "/api/v1/smartFactory/getScrap",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getScrap
  );
  Evolve.Router.post(
    "/api/v1/smartFactory/changeScrapStatus",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.changeScrapStatus,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .changeScrapStatus
  );

  //Production Booking
  Evolve.Router.get(
    "/api/v1/smartFactory/getWorkOrders",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getWorkOrders
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/getProductionOrdersItemNumber",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getProductionOrdersItemNumber
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/workOrderByItem",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.workOrderByItem
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/ItemByWorkOrder",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.ItemByWorkOrder
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/getItemDetailsById",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .getItemDetailsById
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/checkTotalSerialNo",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .checkTotalSerialNo
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/changeWorkOrderStatus",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers
      .changeWorkOrderStatus
  );

  //reports

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getshiftList",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getshiftList
  // );

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getMachineList",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getMachineList
  // );

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getProcessList",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getProcessList
  // );

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getCustCode",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getCustCode
  // );

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getMachine",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getMachine
  // );

  // // Production History Report

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getProductionHistoryReport",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getProductionHistoryReport
  // );

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getMachineWiseProdReports",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getMachineWiseProdReports
  // );

  // //Sales Order Pick List

  // Evolve.Router.get(
  //   "/api/v1/smartFactory/getSalesOrderList",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getSalesOrderList
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/getPickListBySoNumberCount",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .getPickListBySoNumberCount
  // );

  // Evolve.Router.post(
  //   "/api/v1/smartFactory/generateSoPickList",
  //   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  //   Evolve.App.Controllers.SmartFactory.smartFactoryControllers
  //     .generateSoPickList
  // );

  Evolve.Router.post(
    "/api/v1/smartFactory/getPickListBySalesOrder",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactoryApiValidator.getPickListBySalesOrder,
    Evolve.App.Controllers.SmartFactory.smartFactoryControllers.getPickListBySalesOrder
  );
} catch (error) {
  console.log("Error in Evolve Smart Factory Router :", error);
}

module.exports = Evolve.Router;

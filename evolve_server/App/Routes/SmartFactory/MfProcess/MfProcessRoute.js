'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
   *  Title :  Manufactioring Process API List
   *  Desc  :    
   */

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/checkAllowCreatWo", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.checkAllowCreatWo);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/getMFProcessValidations", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.getMFProcessValidations);

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getMFSerialList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.getMFSerialList);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/getMFBarcodeDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.getMFBarcodeDetails);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/saveMfProcess", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.saveMfProcess);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/printMfProcessDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.printMfProcessDetails);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/printRejectionDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.printRejectionDetails);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/moveMfProcess", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.moveMfProcess);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/rejectMfProcess", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.rejectMfProcess);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/getComponantItemList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.getComponantItemList);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/rejectComponantItem", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.MfProcess.MidMfProcess.rejectComponantItem, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.rejectComponantItem);

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getMfReasonCode", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.getMfReasonCode);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/addMFValidations", Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.addMFValidations);

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getMachineIOTValidation", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMfProcess.getMachineIOTValidation);

  // Assembly MF Process API List

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getParentItems", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConAssembly.getParentItems);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/getAssemblyBarcodeList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConAssembly.getAssemblyBarcodeList);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/getOnchangeParent", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConAssembly.getOnchangeParent);

  // Evolve.Router.post("/api/v1/smartFactory/MfProcess/getBarcodeDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConAssembly.getBarcodeDetails);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/getParentSerial", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConAssembly.getParentSerial);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/printAssyBarcode", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConAssembly.printAssyBarcode);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/checkBarcodePrinted", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConAssembly.checkBarcodePrinted);

  // Console Mf Process APi List

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/checkConsoleAssyBarcode", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConConsole.checkConsoleAssyBarcode);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/consoleChildBarcode", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConConsole.consoleChildBarcode);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/startScrewOprationConsole", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConConsole.startScrewOprationConsole);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/getConsoleAssyChildList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConConsole.getConsoleAssyChildList);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/startConsoleAssy", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConConsole.startConsoleAssy);

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getConsoleAssyWoList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConConsole.getConsoleAssyWoList);

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getConsoleAssyCompletedTriggers", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConConsole.getConsoleAssyCompletedTriggers);


  // Door Assembly MF Process API


  Evolve.Router.post("/api/v1/smartFactory/MfProcess/checkDoorAssyBarcode", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConDoorAssy.checkDoorAssyBarcode);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/startScrewOprationDoor", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConDoorAssy.startScrewOprationDoor);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/doorAssyChildBarcode", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConDoorAssy.doorAssyChildBarcode);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/getDoorAssyChildList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConDoorAssy.getDoorAssyChildList);

  Evolve.Router.post("/api/v1/smartFactory/MfProcess/startDoorAssy", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConDoorAssy.startDoorAssy);

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getDoorAssyWoList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConDoorAssy.getDoorAssyWoList);

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getDoorAssyCompletedTriggers", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConDoorAssy.getDoorAssyCompletedTriggers);


  // Millng MF Process API

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getMillingWoList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMilling.getMillingWoList);

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getMillingCompletedTriggers", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConMilling.getMillingCompletedTriggers);


  // Vibration MF Process API


  Evolve.Router.post("/api/v1/smartFactory/MfProcess/checkVibrationMachinBarcode", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.MfProcess.MidVibration.checkVibrationMachinBarcodeAuth, Evolve.App.Controllers.SmartFactory.MfProcess.ConVibration.checkVibrationMachinBarcode);

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getVibrationWoList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConVibration.getVibrationWoList);

  Evolve.Router.get("/api/v1/smartFactory/MfProcess/getVibrationCompletedTriggers", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MfProcess.ConVibration.getVibrationCompletedTriggers);

  //Knee Bloster apis

  
  Evolve.Router.post('/api/v1/smartFactory/MfProcess/checkKneeBolsterBarcode',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConKneeBolster.checkKneeBolsterBarcode);

  Evolve.Router.post('/api/v1/smartFactory/MfProcess/startScrewOprationKnee',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConKneeBolster.startScrewOprationKnee);

  Evolve.Router.post('/api/v1/smartFactory/MfProcess/kneeBolsterChildBarcode',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConKneeBolster.kneeBolsterChildBarcode);

  Evolve.Router.post('/api/v1/smartFactory/MfProcess/getKneeBolsterChildList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  Evolve.App.Controllers.SmartFactory.MfProcess.ConKneeBolster.getKneeBolsterChildList);

  Evolve.Router.post('/api/v1/smartFactory/MfProcess/startKneeBolster',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConKneeBolster.startKneeBolster);

  Evolve.Router.get('/api/v1/smartFactory/MfProcess/getKneeBolsterWoList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  Evolve.App.Controllers.SmartFactory.MfProcess.ConKneeBolster.getKneeBolsterWoList);

  Evolve.Router.get('/api/v1/smartFactory/MfProcess/getKneeBolsterCompletedTriggers',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConKneeBolster.getKneeBolsterCompletedTriggers);

  // PLC SETUP

  Evolve.Router.post('/api/v1/smartFactory/MfProcess/checkPlcSetupBarcode',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConPlcSignalSetup.checkPlcSetupBarcode)


  Evolve.Router.post('/api/v1/smartFactory/MfProcess/moveMillingBarcodePlcSetup',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConPlcSignalSetup.moveMillingBarcodePlcSetup)

  Evolve.Router.post('/api/v1/smartFactory/MfProcess/moveVibrationBarcodePlcSetup',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConPlcSignalSetup.moveVibrationBarcodePlcSetup)

  // IP Flaming  Routes

  Evolve.Router.get('/api/v1/smartFactory/getIpFlamingWoList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFlaming.getIpFlamingWoList);

  Evolve.Router.post('/api/v1/smartFactory/getIpFlamingChildList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFlaming.getIpFlamingChildList);

  Evolve.Router.post('/api/v1/smartFactory/startIpFlaming',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFlaming.startIpFlaming);

  Evolve.Router.get('/api/v1/smartFactory/getIpFlamingCompletedTriggers',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFlaming.getIpFlamingCompletedTriggers);

  Evolve.Router.post('/api/v1/smartFactory/checkIpFlamingBarcode',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFlaming.checkIpFlamingBarcode);

  Evolve.Router.post('/api/v1/smartFactory/ipFlamingChildBarcode',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFlaming.ipFlamingChildBarcode);


  Evolve.Router.post('/api/v1/smartFactory/startFlamingProcess',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFlaming.startFlamingProcess);

  // HP Lamination Routes

  // Ip Foaming  routes 
  Evolve.Router.get('/api/v1/smartFactory/getIpFoamingWoList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFoaming.getIpFoamingWoList);

  Evolve.Router.post('/api/v1/smartFactory/getIpFoamingChildList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFoaming.getIpFoamingChildList);

  Evolve.Router.post('/api/v1/smartFactory/startIpFoaming',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFoaming.startIpFoaming);

  Evolve.Router.get('/api/v1/smartFactory/getIpFoamingCompletedTriggers',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFoaming.getIpFoamingCompletedTriggers);

  Evolve.Router.post('/api/v1/smartFactory/checkIpFoamingBarcodeOnLoad',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFoaming.checkIpFoamingBarcodeOnLoad);

  Evolve.Router.post('/api/v1/smartFactory/checkIpFoamingBarcode',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFoaming.checkIpFoamingBarcode);

  Evolve.Router.post('/api/v1/smartFactory/ipFoamingChildBarcode',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFoaming.ipFoamingChildBarcode);


  Evolve.Router.post('/api/v1/smartFactory/startIpFoamingProcess',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFoaming.startIpFoamingProcess);


  Evolve.Router.post('/api/v1/smartFactory/ipFoamingChemberCheck',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFoaming.ipFoamingChemberCheck);

  //HP Lamination
  Evolve.Router.get('/api/v1/smartFactory/getHPLaminationWoList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  Evolve.App.Controllers.SmartFactory.MfProcess.ConHPLamination.getHPLaminationWoList);

  Evolve.Router.post('/api/v1/smartFactory/getHPLaminationChildList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
  Evolve.App.Controllers.SmartFactory.MfProcess.ConHPLamination.getHPLaminationChildList);

  Evolve.Router.post('/api/v1/smartFactory/startHPLamination',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConHPLamination.startHPLamination);

  Evolve.Router.get('/api/v1/smartFactory/getHPLaminationCompletedTriggers',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConHPLamination.getHPLaminationCompletedTriggers);

  Evolve.Router.post('/api/v1/smartFactory/checkHPLaminationBarcode',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConHPLamination.checkHPLaminationBarcode);

  Evolve.Router.post('/api/v1/smartFactory/HPLaminationChildBarcode',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConHPLamination.HPLaminationChildBarcode);


  Evolve.Router.post('/api/v1/smartFactory/startHPLaminationProcess',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConHPLamination.startHPLaminationProcess);

  // IP Assembly 

  Evolve.Router.get('/api/v1/smartFactory/getIPAddemblyParentItems',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPAssembly.getIPAddemblyParentItems)

  Evolve.Router.post('/api/v1/smartFactory/getIPAssemblyBarcodeList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPAssembly.getIPAssemblyBarcodeList)

  Evolve.Router.post('/api/v1/smartFactory/getOnchangeIPAssemblyParent',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPAssembly.getOnchangeIPAssemblyParent)

  Evolve.Router.post('/api/v1/smartFactory/checkIPAssemblyBarcodePrinted',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPAssembly.checkIPAssemblyBarcodePrinted)

  Evolve.Router.post('/api/v1/smartFactory/printIPAssyBarcode',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPAssembly.printIPAssyBarcode);

  Evolve.Router.post('/api/v1/smartFactory/getAssemblyBracodeDetails',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPAssembly.getAssemblyBracodeDetails);

  Evolve.Router.post('/api/v1/smartFactory/startIpAssemblyScrewOp',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MfProcess.ConIPAssembly.startIpAssemblyScrewOp);








  /** End  : Manufactioring Process  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Smart Factory Manufactioring Process Router :", error)
}


module.exports = Evolve.Router
'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
   *  Title : Gate Control Reports API List
   *  Desc  :    
   */
  // Material Report Start
  // Evolve.Router.post("/api/v1/eGateControl/Reports/Material/getMaterialList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eGateControl.Reports.MidReports.getMaterialList ,Evolve.App.Controllers.eGateControl.Reports.ConMaterial.getMaterialList);

  // Evolve.Router.post("/api/v1/eGateControl/Reports/Material/getMaterialDetail", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.Reports.ConMaterial.getMaterialDetail);

  
  // Evolve.Router.post("/api/v1/eGateControl/Reports/Material/materialSendMail", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.Reports.ConMaterial.materialSendMail);

   // Material Report End
   // parcel report 
    
   

   Evolve.Router.post('/api/v1/eGateControl/Reports/Parcel/getParcelList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eGateControl.Reports.MidReports.getParcelList , Evolve.App.Controllers.eGateControl.Reports.ConParcel.getParcelList);

   Evolve.Router.post('/api/v1/eGateControl/Reports/List/getImageUrl', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.eGateControl.Reports.MidReports.getImageUrlAuth , Evolve.App.Controllers.eGateControl.Reports.ConParcel.getImageUrl);

   // parcel report end 

   //voisitor report start

   Evolve.Router.post('/api/v1/eGateControl/Reports/visitor/getVisitorList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.eGateControl.Reports.MidReports.getVisitorList ,  Evolve.App.Controllers.eGateControl.Reports.ConVisitor.getVisitorList);

   //voisitor report end


   // Material In List - V3 - Start


   Evolve.Router.post('/api/v1/eGateControl/Reports/Material/getGateList',
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
   Evolve.App.Controllers.eGateControl.Reports.ConMaterial.getGateList);

   Evolve.Router.post('/api/v1/eGateControl/Reports/Material/showGateDetailsData',
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
   Evolve.App.Controllers.eGateControl.Reports.ConMaterial.showGateDetailsData);

   Evolve.Router.post('/api/v1/eGateControl/Reports/Material/printGateDocument',
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
   Evolve.App.Controllers.eGateControl.Reports.ConMaterial.printGateDocument);

   

   // Material In List - V3 - End









 
  /** End  :  Reports  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Gate Control Reports Router :", error)
}


module.exports = Evolve.Router
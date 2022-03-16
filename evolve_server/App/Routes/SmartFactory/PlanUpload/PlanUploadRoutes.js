'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Plan Upload API List
     *  Desc  :    
     */

     
    Evolve.Router.post( "/api/v1/smartFactory/planUpload/getProductionPlanList",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PlanUpload.MidPlanUpload.getProductionPlanList , Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.getProductionPlanList);
    
    Evolve.Router.get( "/api/v1/smartFactory/planUpload/getOperatorList",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.getOperatorList);
    
    Evolve.Router.post( "/api/v1/smartFactory/planUpload/getProdPlanDetails",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PlanUpload.MidPlanUpload.getProdPlanDetails, Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.getProdPlanDetails);

    Evolve.Router.post( "/api/v1/smartFactory/planUpload/csvPlanUpload",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.csvPlanUpload);

    Evolve.Router.post( "/api/v1/smartFactory/planUpload/publishPlan",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.publishPlan);

    Evolve.Router.get( "/api/v1/smartFactory/planUpload/getMachineList",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.getMachineList);


    Evolve.Router.get( "/api/v1/smartFactory/planUpload/getShiftList",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.getShiftList);

    Evolve.Router.get( "/api/v1/smartFactory/planUpload/getItemList",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.getItemList);

     Evolve.Router.post( "/api/v1/smartFactory/planUpload/createProdPlan",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PlanUpload.MidPlanUpload.createProdPlanAuth, Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.createProdPlan);

     Evolve.Router.post( "/api/v1/smartFactory/planUpload/updatePlanDetails",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PlanUpload.MidPlanUpload.updatePlanDetailsAuth, Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.updatePlanDetails);

     Evolve.Router.post("/api/v1/smartFactory/planUpload/deletePlan", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PlanUpload.MidPlanUpload.deletePlan, Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.deletePlan);

    Evolve.Router.get( "/api/v1/smartFactory/planUpload/getSectionList",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PlanUpload.ConPlanUpload.getSectionList);
     
    
   
     /** End  : Plan Upload  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Plan Upload Router :", error)
}


module.exports = Evolve.Router
'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  PRODUCTION BOOKING API List
     *  Desc  :    
     */

    Evolve.Router.post("/api/v1/smartFactory/Mixing/getJobOrderList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionBooking.Mixing.getJobOrderList);

    Evolve.Router.post("/api/v1/smartFactory/Mixing/getBomDatailsList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionBooking.Mixing.getBomDatailsList);

    Evolve.Router.post("/api/v1/smartFactory/Mixing/updateIssuedQty", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionBooking.Mixing.updateIssuedQty);


    Evolve.Router.post("/api/v1/smartFactory/Mixing/checkInventory", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionBooking.Mixing.checkInventory);

    
    Evolve.Router.post("/api/v1/smartFactory/Mixing/getTransHistory", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionBooking.Mixing.getTransHistory);


    Evolve.Router.get("/api/v1/smartFactory/Mixing/getMixingMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionBooking.Mixing.getMixingMachineList);







    








    //  PRODUCTION BOOKING V1 API List end



    /** End  : PRODUCTION BOOKING API List */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Production Booking   Router :", error)
}


module.exports = Evolve.Router

'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/getSectionANdPrinterDetailByMachinCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.getSectionANdPrinterDetailByMachinCode);

    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/getWoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.getWoList);

    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/getWoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.getWoDetails);

    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/getDeviceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.getDeviceList);

    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/getProductDesignList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.getProductDesignList);

    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/completeProductionBooking', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.completeProductionBooking);

    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/reprintData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.reprintData);

    // Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/getTransHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.getTransHistory);

    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/checkInventory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.checkInventory);


    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/updateIssuedQty', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.updateIssuedQty);



    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/getProductColourList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.getProductColourList);


    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/getConsumedPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.getConsumedPallet);



    Evolve.Router.post('/api/v1/smartFactory/MixingProductionBookingCon/getWeight', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MixingProductionBooking.MixingProductionBookingCon.getWeight);






    Evolve.Router.post('/api/v1/SmartFactory/MixingReport/getMachineList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.mixingReport.ConList.getMachineList);




    /** End  : Gate In*/

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Mixin Report  router :", error)
}


module.exports = Evolve.Router
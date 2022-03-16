'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : So Pick List API List
     *  Desc  :    
     */


    Evolve.Router.post("/api/v1/smartFactory/soPickList/getSoTableData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidSoPickList.getSoTableData, Evolve.App.Controllers.SmartFactory.PickList.ConSoPickList.getSoTableData);

    Evolve.Router.get("/api/v1/smartFactory/soPickList/getShipToList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConSoPickList.getShipToList);

    Evolve.Router.get("/api/v1/smartFactory/soPickList/getUnPickLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PickList.ConSoPickList.getUnPickLocationList);

    Evolve.Router.post("/api/v1/smartFactory/soPickList/getSoNoList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidSoPickList.getSoNoList, Evolve.App.Controllers.SmartFactory.PickList.ConSoPickList.getSoNoList);

    Evolve.Router.post("/api/v1/smartFactory/soPickList/getSoLineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidSoPickList.getSoLineList, Evolve.App.Controllers.SmartFactory.PickList.ConSoPickList.getSoLineList);

    Evolve.Router.post("/api/v1/smartFactory/soPickList/getAvailablePalletsList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidSoPickList.getAvailablePalletsList, Evolve.App.Controllers.SmartFactory.PickList.ConSoPickList.getAvailablePalletsList);

    Evolve.Router.post("/api/v1/smartFactory/soPickList/getPickedPalletsList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidSoPickList.getPickedPalletsList, Evolve.App.Controllers.SmartFactory.PickList.ConSoPickList.getPickedPalletsList);

    Evolve.Router.post("/api/v1/smartFactory/soPickList/soQtyPick", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidSoPickList.soQtyPick, Evolve.App.Controllers.SmartFactory.PickList.ConSoPickList.soQtyPick);

    Evolve.Router.post("/api/v1/smartFactory/soPickList/soQtyUnPick", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidSoPickList.soQtyUnPick, Evolve.App.Controllers.SmartFactory.PickList.ConSoPickList.soQtyUnPick);

    Evolve.Router.get("/api/v1/smartFactory/soPickList/getGoodLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.PickList.ConSoPickList.getGoodLocationList);

    Evolve.Router.post("/api/v1/smartFactory/soPickList/soQtyPickSplitPallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.PickList.MidSoPickList.soQtyPickSplitPallet, Evolve.App.Controllers.SmartFactory.PickList.ConSoPickList.soQtyPickSplitPallet);


        /** End  : SO Pick List  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in SmartFactory SO Pick List Router :", error)
}


module.exports = Evolve.Router
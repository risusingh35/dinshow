'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Item Upload API List
     *  Desc  :    
     */

    // Item Upload List Api

    Evolve.Router.get('/api/v1/smartFactory/PDIUserScreen/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PDIUserScreen.ConList.getItemList);

    Evolve.Router.post('/api/v1/smartFactory/PDIUserScreen/PrintBarcode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PDIUserScreen.ConList.PrintBarcode);

    Evolve.Router.post('/api/v1/smartFactory/PDIUserScreen/getItemQty', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PDIUserScreen.ConList.getItemQty);


    /** End  : Item Upload */

 
} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Item Router :", error)
}

module.exports = Evolve.Router
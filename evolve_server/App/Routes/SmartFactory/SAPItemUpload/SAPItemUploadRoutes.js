'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Item Upload API List
     *  Desc  :    
     */

    // Item Upload List Api

    Evolve.Router.post('/api/v1/smartFactory/SAPItemUpload/getItemsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,   Evolve.App.Controllers.SmartFactory.SAPItemUpload.ConList.getItemsList);

    Evolve.Router.post('/api/v1/smartFactory/SAPItemUpload/csvItemsUpload', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.SAPItemUpload.ConList.csvItemsUpload);


    /** End  : Item Upload */

 
} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Item Router :", error)
}

module.exports = Evolve.Router
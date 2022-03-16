'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Query Builder List
     *  Desc  :    
     */

   
    Evolve.Router.post('/api/v1/evolve/QueryBuilder/getEvolveTableList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.QueryBuilder.ConList.getEvolveTableList);

   
    Evolve.Router.post('/api/v1/evolve/QueryBuilder/getTableFields', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.QueryBuilder.QueryBuilderMid.getTableFieldsAuth, Evolve.App.Controllers.Evolve.QueryBuilder.ConList.getTableFields);

   
    Evolve.Router.post('/api/v1/evolve/QueryBuilder/getQueryData',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.QueryBuilder.QueryBuilderMid.getQueryData, Evolve.App.Controllers.Evolve.QueryBuilder.ConList.getQueryData);

    
   
    /** End  : Query Builder  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Query Builder Router :", error)
}
module.exports = Evolve.Router
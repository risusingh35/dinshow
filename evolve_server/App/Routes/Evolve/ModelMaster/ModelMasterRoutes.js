'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Role API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/ModelMaster/getAllModels', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ModelMaster.ConList.getAllModels);

    Evolve.Router.get('/api/v1/evolve/ModelMaster/getAllUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ModelMaster.ConList.getAllUnitList);

    Evolve.Router.get('/api/v1/evolve/ModelMaster/getAllItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ModelMaster.ConList.getAllItemList);

    Evolve.Router.post('/api/v1/evolve/ModelMaster/deleteModel', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ModelMaster.ConList.deleteModel);

    Evolve.Router.post('/api/v1/evolve/ModelMaster/addNewModel', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ModelMaster.ConList.addNewModel);

    Evolve.Router.post('/api/v1/evolve/ModelMaster/updateModel', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ModelMaster.ConList.updateModel);
    /** End  : Role  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Role Router :", error)
}

module.exports = Evolve.Router
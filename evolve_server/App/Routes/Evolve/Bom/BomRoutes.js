'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/bom/getBomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Bom.BomMid.getBomList, Evolve.App.Controllers.Evolve.Bom.ConList.getBomList);

    Evolve.Router.post('/api/v1/evolve/bom/addBom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Bom.BomMid.addBom, Evolve.App.Controllers.Evolve.Bom.ConList.addBom);

    Evolve.Router.post('/api/v1/evolve/bom/getSingleBom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Bom.BomMid.getSingleBom, Evolve.App.Controllers.Evolve.Bom.ConList.getSingleBom);

    Evolve.Router.post('/api/v1/evolve/bom/updateBom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Bom.BomMid.updateBom, Evolve.App.Controllers.Evolve.Bom.ConList.updateBom);

    Evolve.Router.post('/api/v1/evolve/bom/deleteBom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Bom.ConList.deleteBom);

    Evolve.Router.post('/api/v1/evolve/bom/getBomDisplaySeq', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Bom.BomMid.getBomDisplaySeq, Evolve.App.Controllers.Evolve.Bom.ConList.getBomDisplaySeq);

    Evolve.Router.post('/api/v1/evolve/bom/getItemSearch', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Bom.ConList.getItemSearch);


    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Machine To User Router :", error)
}
module.exports = Evolve.Router
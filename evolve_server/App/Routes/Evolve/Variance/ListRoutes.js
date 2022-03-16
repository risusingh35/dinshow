'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Variance API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/variance/createVarianceGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Variance.ListMid.createVarianceGroup, Evolve.App.Controllers.Evolve.Variance.ConList.createVarianceGroup);

    Evolve.Router.get('/api/v1/evolve/variance/getVarianceGroupAll', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.Variance.ConList.getVarianceGroupAll);

    Evolve.Router.post('/api/v1/evolve/variance/getSingleVarianceGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Variance.ListMid.getSingleVarianceGroup, Evolve.App.Controllers.Evolve.Variance.ConList.getSingleVarianceGroup);

    Evolve.Router.post('/api/v1/evolve/variance/updateVarianceGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Variance.ListMid.updateVarianceGroup, Evolve.App.Controllers.Evolve.Variance.ConList.updateVarianceGroup);

    Evolve.Router.post('/api/v1/evolve/variance/createVariance', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Variance.ListMid.createVariance, Evolve.App.Controllers.Evolve.Variance.ConList.createVariance);

    Evolve.Router.post('/api/v1/evolve/variance/getVarianceAll', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Variance.ListMid.getVarianceAll,Evolve.App.Controllers.Evolve.Variance.ConList.getVarianceAll);
    
    Evolve.Router.post('/api/v1/evolve/variance/getSingleVariance', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Variance.ListMid.getSingleVariance, Evolve.App.Controllers.Evolve.Variance.ConList.getSingleVariance);

    Evolve.Router.post('/api/v1/evolve/variance/updateVariance', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Variance.ListMid.updateVariance, Evolve.App.Controllers.Evolve.Variance.ConList.updateVariance);
    // Evolve.Router.post('/api/v1/evolve/bom/addBom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Bom.BomMid.addBom, Evolve.App.Controllers.Evolve.Bom.ConList.addBom);

    // Evolve.Router.post('/api/v1/evolve/bom/getSingleBom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Bom.BomMid.getSingleBom, Evolve.App.Controllers.Evolve.Bom.ConList.getSingleBom);

    // Evolve.Router.post('/api/v1/evolve/bom/updateBom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Bom.BomMid.updateBom, Evolve.App.Controllers.Evolve.Bom.ConList.updateBom);

    // Evolve.Router.post('/api/v1/evolve/bom/deleteBom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Bom.ConList.deleteBom);

    // Evolve.Router.post('/api/v1/evolve/bom/getBomDisplaySeq', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Bom.BomMid.getBomDisplaySeq, Evolve.App.Controllers.Evolve.Bom.ConList.getBomDisplaySeq);

    // Evolve.Router.post('/api/v1/evolve/bom/getItemSearch', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Bom.ConList.getItemSearch);


    /** End  : Variance  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Variance Router :", error)
}
module.exports = Evolve.Router
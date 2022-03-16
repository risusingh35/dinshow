'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Item to Supplier Assign List
     *  Desc  :    
     */

    

    // Evolve.Router.post('/api/v1/evolve/reason/createReason', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ItemToSupplier.MidItemToSupplier.createReasonAuth, Evolve.App.Controllers.Evolve.MidItemToSupplier.ConList.getAllReasonList);

    Evolve.Router.post('/api/v1/evolve/ItemToSupplier/getItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ItemToSupplier.ConList.getItem);

    Evolve.Router.get('/api/v1/evolve/ItemToSupplier/getSupplierList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ItemToSupplier.ConList.getSupplierList);

    Evolve.Router.get('/api/v1/evolve/ItemToSupplier/getTemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ItemToSupplier.ConList.getTemplateList);

       Evolve.Router.post('/api/v1/evolve/ItemToSupplier/assignItemToSuppliers', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.ItemToSupplier.MidItemToSupplier.assignItemToSuppliersAuth, Evolve.App.Controllers.Evolve.ItemToSupplier.ConList.assignItemToSuppliers);

       Evolve.Router.post('/api/v1/evolve/ItemToSupplier/getAssignedList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.ItemToSupplier.MidItemToSupplier.getAssignedListAuth, Evolve.App.Controllers.Evolve.ItemToSupplier.ConList.getAssignedList);
       Evolve.Router.post('/api/v1/evolve/ItemToSupplier/getSingleAssignData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.ItemToSupplier.MidItemToSupplier.getSingleAssignDataAuth, Evolve.App.Controllers.Evolve.ItemToSupplier.ConList.getSingleAssignData);

       Evolve.Router.post('/api/v1/evolve/ItemToSupplier/updateItemToSuppliers', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.ItemToSupplier.MidItemToSupplier.assignItemToSuppliersAuth, Evolve.App.Controllers.Evolve.ItemToSupplier.ConList.updateItemToSuppliers);

       Evolve.Router.get('/api/v1/evolve/ItemToSupplier/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ItemToSupplier.ConList.getItemList);

       Evolve.Router.post('/api/v1/evolve/ItemToSupplier/deleteAssignment', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ItemToSupplier.ConList.deleteAssignment);

       Evolve.Router.get('/api/v1/evolve/ItemToSupplier/getLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ItemToSupplier.ConList.getLocationList);

       Evolve.Router.get('/api/v1/evolve/ItemToSupplier/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ItemToSupplier.ConList.getUomList);





    /** End  :  Item to Supplier Assign List  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve  Item to Supplier Assign  Router :", error)
}

module.exports = Evolve.Router
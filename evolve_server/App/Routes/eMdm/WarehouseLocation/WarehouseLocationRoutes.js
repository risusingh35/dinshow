'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.get('/api/v1/eMdm/WarehouseLocation/getWarehouseList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.WarehouseLocation.ConList.getWarehouseList);
    
    Evolve.Router.get('/api/v1/eMdm/WarehouseLocation/getErpLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.WarehouseLocation.ConList.getErpLocationList);
    
    Evolve.Router.post('/api/v1/eMdm/WarehouseLocation/addWarehouseLocation', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.WarehouseLocation.ConList.addWarehouseLocation);
    
    Evolve.Router.post('/api/v1/eMdm/WarehouseLocation/getParentLocationDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.WarehouseLocation.ConList.getParentLocationDetails);
    
    Evolve.Router.post('/api/v1/eMdm/WarehouseLocation/getWarehouseLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.WarehouseLocation.ConList.getWarehouseLocationList);
    
    Evolve.Router.post('/api/v1/eMdm/WarehouseLocation/getSingleWarehouseLocationDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.WarehouseLocation.ConList.getSingleWarehouseLocationDetails);
    
    Evolve.Router.post('/api/v1/eMdm/WarehouseLocation/updateWarehouseLocation', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.WarehouseLocation.ConList.updateWarehouseLocation);

    Evolve.Router.post('/api/v1/eMdm/WarehouseLocation/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.WarehouseLocation.ConList.getUomList);



    
    Evolve.Router.post('/api/v1/eMdm/WarehouseLocation/uploadErpLocation', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.WarehouseLocation.ConList.uploadErpLocation);


    
    Evolve.Router.get('/api/v1/eMdm/WarehouseLocation/getLocGroupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.WarehouseLocation.ConList.getLocGroupList);








    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router
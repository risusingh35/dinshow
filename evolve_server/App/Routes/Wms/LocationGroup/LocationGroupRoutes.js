
'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
      *  Title :  Location Group API List
      *  Desc  :    
      */


    Evolve.Router.post('/api/v1/eWms/locationGroup/addLocationGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.LocationGroup.MidLocationGroup.addLocationGroup, Evolve.App.Controllers.Wms.LocationGroup.ConList.addLocationGroup);

    Evolve.Router.post('/api/v1/eWms/locationGroup/getLocationGroupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.LocationGroup.MidLocationGroup.getLocationGroupList,Evolve.App.Controllers.Wms.LocationGroup.ConList.getLocationGroupList);

    Evolve.Router.post('/api/v1/eWms/locationGroup/getSingleLocationGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.LocationGroup.ConList.getSingleLocationGroup);

    Evolve.Router.post('/api/v1/eWms/locationGroup/updateLocationGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.LocationGroup.MidLocationGroup.updateLocationGroup, Evolve.App.Controllers.Wms.LocationGroup.ConList.updateLocationGroup);




    /** End  : Location Group  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Location Group Router :", error)
}


module.exports = Evolve.Router
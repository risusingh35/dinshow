
'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
      *  Title :  Location Group API List
      *  Desc  :    
      */


    Evolve.Router.post('/api/v1/evolve/locationGroup/addLocationGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.LocationGroup.MidLocationGroup.addLocationGroup, Evolve.App.Controllers.Evolve.LocationGroup.ConList.addLocationGroup);

    Evolve.Router.post('/api/v1/evolve/locationGroup/getLocationGroupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.LocationGroup.MidLocationGroup.getLocationGroupList,Evolve.App.Controllers.Evolve.LocationGroup.ConList.getLocationGroupList);

    Evolve.Router.post('/api/v1/evolve/locationGroup/getSingleLocationGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.LocationGroup.ConList.getSingleLocationGroup);

    Evolve.Router.post('/api/v1/evolve/locationGroup/updateLocationGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.LocationGroup.MidLocationGroup.updateLocationGroup, Evolve.App.Controllers.Evolve.LocationGroup.ConList.updateLocationGroup);




    /** End  : Location Group  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Location Group Router :", error)
}


module.exports = Evolve.Router
"use strict";
const Evolve = require("../../../../Boot/Evolve");
try {
  /**
   *  Title :   Location Master API List
   *  Desc  :
   */

  Evolve.Router.get(
    "/api/v1/evolve/location/getAllLocationGroup",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.Location.ConList.getAllLocationGroup
  );

  Evolve.Router.post(
    "/api/v1/evolve/location/addLocation",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.Evolve.Location.MidLocation.addLocation,
    Evolve.App.Controllers.Evolve.Location.ConList.addLocation
  );

  Evolve.Router.post(
    "/api/v1/evolve/location/getLocationList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.Evolve.Location.MidLocation.getLocationList,
    Evolve.App.Controllers.Evolve.Location.ConList.getLocationList
  );

  Evolve.Router.post(
    "/api/v1/evolve/location/getSingleLocation",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.Location.ConList.getSingleLocation
  );

  Evolve.Router.post(
    "/api/v1/evolve/location/updateLocation",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.Evolve.Location.MidLocation.updateLocation,
    Evolve.App.Controllers.Evolve.Location.ConList.updateLocation
  );

  Evolve.Router.post(
    "/api/v1/evolve/location/getStatusCodeTypeList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.Location.ConList.getStatusCodeTypeList
  );

  Evolve.Router.post(
    "/api/v1/evolve/location/getStatusCodeList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.Evolve.Location.MidLocation.getStatusCodeListAuth,
    Evolve.App.Controllers.Evolve.Location.ConList.getStatusCodeList
  );

  Evolve.Router.post(
    "/api/v1/evolve/item/csvLocationsUpload",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.Location.ConList.csvLocationsUpload
  );
  /** End  : Location Master  */
} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Location Master Router :", error);
}
module.exports = Evolve.Router;

"use strict";
const Evolve = require("../../../../Boot/Evolve");
try {
  /**
   *  Title :  Location Item Link API List
   *  Desc  :
   */

  Evolve.Router.post(
    "/api/v1/eMdm/LocationItemLink/getItemSearch",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.eMdm.LocationItemLink.ConList.getItemSearch
  );

  Evolve.Router.post(
    "/api/v1/eMdm/LocationItemLink/getLocationList",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.eMdm.LocationItemLink.ConList.getLocationList
  );

  Evolve.Router.post(
    "/api/v1/eMdm/LocationItemLink/getSingleItemDetails",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.eMdm.LocationItemLink.ConList.getSingleItemDetails
  );

  Evolve.Router.post(
    "/api/v1/eMdm/LocationItemLink/getSingleLocationDetails",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.eMdm.LocationItemLink.ConList
      .getSingleLocationDetails
  );

  Evolve.Router.post(
    "/api/v1/eMdm/LocationItemLink/AddLocationItemLink",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.eMdm.LocationItemLink.ConList.AddLocationItemLink
  );

  /** End  :Location Item Link  */
} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in App Master Router :", error);
}
module.exports = Evolve.Router;

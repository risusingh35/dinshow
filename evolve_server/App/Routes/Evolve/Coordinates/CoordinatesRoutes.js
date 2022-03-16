'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
      *  Title :  Document API List
      *  Desc  :    
      */


    Evolve.Router.post('/api/v1/evolve/coordinates/addCoordinate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Coordinates.MidCoordinates.addCoordinate, Evolve.App.Controllers.Evolve.Coordinates.ConList.addCoordinate);

    Evolve.Router.post('/api/v1/evolve/coordinates/getCoordinateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Coordinates.MidCoordinates.getCoordinateList, Evolve.App.Controllers.Evolve.Coordinates.ConList.getCoordinateList);

    Evolve.Router.get('/api/v1/evolve/coordinates/getCoordinateTempList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Coordinates.ConList.getCoordinateTempList);

    Evolve.Router.post('/api/v1/evolve/coordinates/getSingleCoordinate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Coordinates.ConList.getSingleCoordinate);

    Evolve.Router.post('/api/v1/evolve/coordinates/updateCoordinate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Coordinates.MidCoordinates.updateCoordinate, Evolve.App.Controllers.Evolve.Coordinates.ConList.updateCoordinate);

    Evolve.Router.get('/api/v1/evolve/coordinates/getInvoiceFilds', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Coordinates.ConList.getInvoiceFilds);

    Evolve.Router.get('/api/v1/evolve/coordinates/getInvoiceItemFilds', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Coordinates.ConList.getInvoiceItemFilds);

    Evolve.Router.post('/api/v1/evolve/coordinates/deleteCoordinates', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Coordinates.MidCoordinates.deleteCoordinates, Evolve.App.Controllers.Evolve.Coordinates.ConList.deleteCoordinates);





    /** End  : Document  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Document Router :", error)
}


module.exports = Evolve.Router
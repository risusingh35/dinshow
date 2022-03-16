'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    Evolve.Router.post('/api/v1/evolve/Scanning/getScanningItemData',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.Scanning.ConScanning.getScanningItemData);

    Evolve.Router.post('/api/v1/evolve/Scanning/moveScannedItems',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.Scanning.ConScanning.moveScannedItems);

    Evolve.Router.post('/api/v1/evolve/Scanning/updateScanFlag',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.Scanning.ConScanning.updateScanFlag);

    Evolve.Router.get('/api/v1/evolve/Scanning/getAutoMoveConfigVariable',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.Scanning.ConScanning.getAutoMoveConfigVariable);

    Evolve.Router.get('/api/v1/evolve/Scanning/getScanAltConfigVariable',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.Scanning.ConScanning.getScanAltConfigVariable);

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Template Master Router :", error)
}


module.exports = Evolve.Router
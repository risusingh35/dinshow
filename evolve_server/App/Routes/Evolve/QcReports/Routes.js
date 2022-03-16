'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {


 
   
    Evolve.Router.get('/api/v1/evolve/QcReports/getAllData',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.QcReports.QcCon.getAllData);

    Evolve.Router.post('/api/v1/evolve/QcReports/getDatabyLotAndSerial',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.QcReports.QcCon.getDatabyLotAndSerial);

    Evolve.Router.get('/api/v1/evolve/QcReports/getPalletAndLotNo',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.QcReports.QcCon.getPalletAndLotNo);
    

    
} catch (error) {
    Evolve.Log.error(error.message);
    console.log(" Error in Evolve  Sub Reason Master Router :", error)
}


module.exports = Evolve.Router

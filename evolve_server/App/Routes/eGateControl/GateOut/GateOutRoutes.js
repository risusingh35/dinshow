'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Gate Out API List
     *  Desc  :    
     */



     // parcel out         
    Evolve.Router.post('/api/v1/eGateControl/GateOut/addParcelData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eGateControl.GateOut.MidParcelOut.addParcelDataAuth, Evolve.App.Controllers.eGateControl.GateOut.ConParcelOut.addParcelData);

    //visitor out

    Evolve.Router.post('/api/v1/eGateControl/GateOut/getVisitorList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eGateControl.GateOut.MidVisitorOut.getVisitorList,Evolve.App.Controllers.eGateControl.GateOut.ConVisitorOut.getVisitorList);

    Evolve.Router.post('/api/v1/eGateControl/GateOut/getSingleVisitorData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConVisitorOut.getSingleVisitorData);

    Evolve.Router.post('/api/v1/eGateControl/GateOut/updateOutVisitor', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConVisitorOut.updateOutVisitor);

    Evolve.Router.post('/api/v1/eGateControl/GateOut/sendMessege', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConVisitorOut.sendMessege);


    Evolve.Router.post('/api/v1/eGateControl/GateOut/sendMail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConVisitorOut.sendMail);

    Evolve.Router.post('/api/v1/eGateControl/GateOut/getImageUrl', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConVisitorOut.getImageUrl);

    // material out 

    
    Evolve.Router.get('/api/v1/eGateControl/GateOut/MaterialOut/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.getItemList);

    Evolve.Router.get('/api/v1/eGateControl/GateOut/MaterialOut/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.getUomList);

    Evolve.Router.get('/api/v1/eGateControl/GateOut/MaterialOut/getGateEntryNumbers', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.getGateEntryNumbers);

    Evolve.Router.get('/api/v1/eGateControl/GateOut/MaterialOut/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.getUomList);

    Evolve.Router.get('/api/v1/eGateControl/GateOut/MaterialOut/getDocument', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.getDocument);

    Evolve.Router.get('/api/v1/eGateControl/GateOut/MaterialOut/getSupplierList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.getSupplierList);

    Evolve.Router.post('/api/v1/eGateControl/GateOut/MaterialOut/checkGateEntryNo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.checkGateEntryNo);

    Evolve.Router.post('/api/v1/eGateControl/GateOut/MaterialOut/getSupplierInvoice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.getSupplierInvoice);

    Evolve.Router.post('/api/v1/eGateControl/GateOut/MaterialOut/getInvoiceLines', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.getInvoiceLines);
    
    Evolve.Router.post('/api/v1/eGateControl/GateOut/MaterialOut/addGateDataMaterialOut', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.addGateDataMaterialOut);


    Evolve.Router.post('/api/v1/eGateControl/GateOut/MaterialOut/addGateData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.addGateData);   
    
    Evolve.Router.post('/api/v1/eGateControl/GateOut/MaterialOut/checkInvoiceNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eGateControl.GateOut.ConMaterialOut.checkInvoiceNumber); 
    
    /** End  : Assets Dashboard  */



    
    








     
   

   
     /** End  : Gate Out  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Gate Out Router :", error)
}


module.exports = Evolve.Router
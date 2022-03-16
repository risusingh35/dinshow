'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  User API List
     *  Desc  :    
     */
    // Evolve.Router.get('/api/v1/evolve/user/getUsersList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConList.getUsersList);

    // Evolve.Router.post('/api/v1/evolve/user/deleteUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConList.deleteUser);

    // Evolve.Router.post('/api/v1/evolve/user/getCompanyListById', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.SoShipment.ConList.getCompanyListById);

    // Evolve.Router.get('/api/v1/evolve/user/companyList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConList.companyList);

    // Evolve.Router.get('/api/v1/evolve/user/getRoleList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConList.getRoleList);

    // Evolve.Router.post('/api/v1/evolve/user/selectSingleUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.SoShipment.ConList.selectSingleUser);

    // Evolve.Router.post('/api/v1/evolve/user/updateUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConList.updateUser);

    // Evolve.Router.post('/api/v1/evolve/user/createUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.SoShipment.ConList.createUser);


    // Evolve.Router.get('/api/v1/evolve/user/getBranchList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConList.getBranchList);

    // Evolve.Router.post('/api/v1/evolve/user/assignBranch', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.SoShipment.ConList.assignBranch);

    // Evolve.Router.post('/api/v1/evolve/user/updateBranch', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConList.updateBranch);

    // Evolve.Router.post('/api/v1/evolve/user/getDefaultMenuList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConList.getDefaultMenuList);

    // Evolve.Router.get('/api/v1/evolve/user/getAppList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConList.getAppList);

    // Evolve.Router.post('/api/v1/evolve/demo/demoInsert',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Wms.SoShipment.ConList.demoInsert);
    
    // Evolve.Router.post('/api/v1/evolve/demoankit/demoAnkitFormData',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConList.demoAnkitFormData)

    // SO Shipment -- start

    // Evolve.Router.post('/api/v1/evolve/user/getShipDetails',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Wms.SoShipment.ConList.getShipDetails);

    // Evolve.Router.post('/api/v1/evolve/user/confirmShipment',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Wms.SoShipment.ConList.confirmShipment);

    // Evolve.Router.post('/api/v1/evolve/user/getShipmentReport',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Wms.SoShipment.ConList.getShipmentReport);

    // Evolve.Router.post('/api/v1/evolve/user/getshipmentReportDetail',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Wms.SoShipment.ConList.getshipmentReportDetail);

    // Evolve.Router.post('/api/v1/evolve/user/getstaticshipmentPrintReportDetails',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Wms.SoShipment.ConList.getstaticshipmentPrintReportDetails);

    // Evolve.Router.post('/api/v1/evolve/user/getshipmentPrintReportDetails',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Wms.SoShipment.ConList.getshipmentPrintReportDetails);


    // SO Shipment -- end

    //SO SHIPMENT END 

    
    Evolve.Router.post('/api/v1/Wms/SoShipmentV2/getSoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConOption.getSoDetails);


    Evolve.Router.post('/api/v1/Wms/SoShipmentV2/getInventoryList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConOption.getInventoryList);

    Evolve.Router.post('/api/v1/Wms/SoShipmentV2/onPerformShipment', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConOption.onPerformShipment);
    
    Evolve.Router.post('/api/v1/Wms/SoShipmentV2/getSOList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConOption.getSOList);

    Evolve.Router.post('/api/v1/Wms/SoShipmentV2/getTransHistoryData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConOption.getTransHistoryData);

    Evolve.Router.post('/api/v1/Wms/SoShipmentV2/checkInventory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.SoShipment.ConOption.checkInventory);


    /** End  : User  */



    

    // Evolve.Router.post('/api/v1/eWebshop/SoShipment/getSoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eWebshop.SOShipment.ConOption.getSoDetails);


    // Evolve.Router.post('/api/v1/eWebshop/SoShipment/getInventoryList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eWebshop.SOShipment.ConOption.getInventoryList);

    // Evolve.Router.post('/api/v1/eWebshop/SoShipment/onPerformShipment', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eWebshop.SOShipment.ConOption.onPerformShipment);
    
    // Evolve.Router.post('/api/v1/eWebshop/SoShipment/getSOList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eWebshop.SOShipment.ConOption.getSOList);





} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve User Router :", error)
}


module.exports = Evolve.Router
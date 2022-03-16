'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Item  API List
     *  Desc  :    
     */

    // Item V3 For DOA - start 

    Evolve.Router.post('/api/v1/evolve/item/getItemsListV3', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConListv3.getItemsList3);


    Evolve.Router.post('/api/v1/evolve/item/uploadItemMasterCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConListv3.uploadItemMasterCsv);

    // Item V3 For DOA - stop



    // Item List Api

    Evolve.Router.post('/api/v1/evolve/item/getItemsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Evolve.Item.ItemMid.getItemsListAuth,Evolve.App.Controllers.Evolve.Item.ConList.getItemsList);

    Evolve.Router.post('/api/v1/evolve/item/deleteItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Item.ItemMid.deleteItem, Evolve.App.Controllers.Evolve.Item.ConList.deleteItem);

    Evolve.Router.post('/api/v1/evolve/item/csvItemsUpload', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConList.csvItemsUpload);

    Evolve.Router.post('/api/v1/evolve/item/uploadFileUpdateTolerance', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConList.uploadFileUpdateTolerance);

    // Item Option Api

    Evolve.Router.post('/api/v1/evolve/item/getSingleItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Item.ItemMid.getSingleItem, Evolve.App.Controllers.Evolve.Item.ConOption.getSingleItem);

    Evolve.Router.get('/api/v1/evolve/item/getProcessTemp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConOption.getProcessTemp);

    Evolve.Router.get('/api/v1/evolve/item/getSerialMaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConOption.getSerialMaster);

    Evolve.Router.get('/api/v1/evolve/item/getItemGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConOption.getItemGroup);

    Evolve.Router.get('/api/v1/evolve/item/getPdiTemplates', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConOption.getPdiTemplates);

    Evolve.Router.post('/api/v1/evolve/item/createItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Item.ItemMid.createItem, Evolve.App.Controllers.Evolve.Item.ConOption.createItem);

    Evolve.Router.post('/api/v1/evolve/item/updateItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Item.ItemMid.updateItem, Evolve.App.Controllers.Evolve.Item.ConOption.updateItem);

    Evolve.Router.get('/api/v1/evolve/item/getAllQCTemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConOption.getAllQCTemplateList);

    Evolve.Router.post('/api/v1/evolve/item/getItemQcTemp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConOption.getItemQcTemp);

    Evolve.Router.get('/api/v1/evolve/item/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConOption.getUomList);


    Evolve.Router.post('/api/v1/evolve/item/getItemsDTList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConList.getItemsDTList);



    /** End  : Item  */

    // Item Master for Adient Barcode -- itemv1

    Evolve.Router.post('/api/v1/evolve/itemv1/getItemsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConListV1.getItemsList);

    Evolve.Router.post('/api/v1/evolve/itemv1/getModelList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConListV1.getModelList);

    Evolve.Router.post('/api/v1/evolve/itemv1/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConListV1.getUnitList);

    Evolve.Router.post('/api/v1/evolve/itemv1/getLabelFormateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConListV1.getLabelFormateList);

    Evolve.Router.post('/api/v1/evolve/itemv1/addtItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConListV1.addtItem);

    Evolve.Router.post('/api/v1/evolve/itemv1/editItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConListV1.editItem);

    Evolve.Router.post('/api/v1/evolve/itemv1/deleteItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConListV1.deleteItem);

    Evolve.Router.post('/api/v1/evolve/itemv1/csvItemsUpload', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConListV1.csvItemsUpload);

    Evolve.Router.post('/api/v1/evolve/itemv2/csvItemsUpload', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Item.ConListV1.csvItemsV2Upload);

        

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Item Router :", error)
}

module.exports = Evolve.Router
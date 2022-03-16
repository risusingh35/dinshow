'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Einvoice API List
    *  Desc  :    
    */


  Evolve.Router.post('/api/v1/evolve/eInvoice/parseDocument', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EInvoice.ConDocParser.parseDocument);

  Evolve.Router.get('/api/v1/evolve/eInvoice/getCoordinateTempList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EInvoice.ConDocParser.getCoordinateTempList);

  Evolve.Router.post('/api/v1/evolve/eInvoice/getCoordinateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EInvoice.ConDocParser.getCoordinateList);

  Evolve.Router.post('/api/v1/evolve/eInvoice/getSingleCoordinateData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EInvoice.ConDocParser.getSingleCoordinateData);

  Evolve.Router.post('/api/v1/evolve/eInvoice/updateCoordinates', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EInvoice.ConDocParser.updateCoordinates);

  // File System  

  Evolve.Router.post('/api/v1/evolve/fileSystem/getDirectoryTree', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.getDirectoryTree);

  Evolve.Router.post('/api/v1/evolve/fileSystem/getDirectoryTreeByPath', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.EInvoice.MidFileSystem.getDirectoryTreeByPathAuth, Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.getDirectoryTreeByPath);

  Evolve.Router.post('/api/v1/evolve/fileSystem/deleteResource', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.EInvoice.MidFileSystem.deleteResourceAuth, Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.deleteResource);

  Evolve.Router.post('/api/v1/evolve/fileSystem/renameSource', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.EInvoice.MidFileSystem.renameSourceAuth, Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.renameSource);

  Evolve.Router.post('/api/v1/evolve/fileSystem/moveSource', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.EInvoice.MidFileSystem.moveSourceAuth, Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.moveSource);

  // Evolve.Router.post('/api/v1/evolve/fileSystem/realFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.realFile);

    Evolve.Router.post('/api/v1/evolve/fileSystem/createResourse', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.EInvoice.MidFileSystem.createResourseAuth, Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.createResourse);

    Evolve.Router.post('/api/v1/evolve/fileSystem/onUploadFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.onUploadFile);

    // Evolve.Router.post('/api/v1/evolve/fileSystem/getDiroctoryByName', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.getDiroctoryByName);







  /** End  : Einvoice  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Document Router :", error)
}


module.exports = Evolve.Router
'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Reason API List
     *  Desc  :    
     */

Evolve.Router.post('/api/v1/evolve/reader/getReaderList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Reader.MidReader.getReaderListMid, Evolve.App.Controllers.Evolve.Reader.ConList.getReaderList);

Evolve.Router.post('/api/v1/evolve/reader/addReader', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Reader.MidReader.addReaderMid, Evolve.App.Controllers.Evolve.Reader.ConList.addReader);

Evolve.Router.post('/api/v1/evolve/reader/editReader', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Reader.MidReader.editReaderMid, Evolve.App.Controllers.Evolve.Reader.ConList.editReader);

Evolve.Router.post('/api/v1/evolve/reader/addReader/getReaderPreviewData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Reader.ConList.getReaderPreviewData);

    /** End  : Reason  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Role Router :", error)
}

module.exports = Evolve.Router
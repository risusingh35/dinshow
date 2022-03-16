'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Document to Token List Api
     *  Desc  :    
     */
    Evolve.Router.get('/api/v1/evolve/DocumentToToken/getDocumentList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.DocumentToToken.ConList.getDocumentList);

    Evolve.Router.get('/api/v1/evolve/DocumentToToken/getDSTokenList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.DocumentToToken.ConList.getDSTokenList);

    Evolve.Router.post('/api/v1/evolve/DocumentToToken/getDocumentToTokenList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.DocumentToToken.DocumentToTokenMid.getDocumentToTokenList, Evolve.App.Controllers.Evolve.DocumentToToken.ConList.getDocumentToTokenList);

    Evolve.Router.post('/api/v1/evolve/DocumentToToken/addDocumentToToken', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.DocumentToToken.DocumentToTokenMid.addDocumentToToken, Evolve.App.Controllers.Evolve.DocumentToToken.ConList.addDocumentToToken);

    Evolve.Router.post('/api/v1/evolve/DocumentToToken/getSingleDocToTokenData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentToToken.DocumentToTokenMid.getSingleDocToTokenData, Evolve.App.Controllers.Evolve.DocumentToToken.ConList.getSingleDocToTokenData);

    Evolve.Router.post('/api/v1/evolve/DocumentToToken/updateDocumentToToken', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentToToken.DocumentToTokenMid.updateDocumentToToken, Evolve.App.Controllers.Evolve.DocumentToToken.ConList.updateDocumentToToken);


    /** End  : Document to Token List  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Document to Token List Router :", error)
}
module.exports = Evolve.Router
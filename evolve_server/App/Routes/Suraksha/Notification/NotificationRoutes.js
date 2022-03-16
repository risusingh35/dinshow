'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Suraksha Notification API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/suraksha/notification/getNotifList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Suraksha.Notification.ConList.getNotifList);

    Evolve.Router.post('/api/v1/suraksha/notification/createNotif', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Suraksha.Notification.ConList.createNotif);

    Evolve.Router.post('/api/v1/suraksha/notification/selectSinglNotif', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.Notification.ConList.selectSinglNotif);

    Evolve.Router.post('/api/v1/suraksha/notification/updateNotif', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.Notification.ConList.updateNotif);
    
    /** End  : Reason  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Suraksha  Notification Router :", error)
}

module.exports = Evolve.Router
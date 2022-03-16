'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/addTravelStatusTrans',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization , Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.addTravelStatusTrans);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/startTrip',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.startTrip);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/cancelTrip',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.cancelTrip);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/getReasonListByType',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.getReasonListByType);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/completeTrip',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.completeTrip);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/getCompletedTrips',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.getCompletedTrips);

    
    Evolve.Router.get('/api/v1/suraksha/travelStatusTrans/getDashboardDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.getDashboardDetails);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/getStatusListByType',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.getStatusListByType);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/updateTravelReqByMedic',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.updateTravelReqByMedic);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/locStatus',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.locStatus);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/updateUserDeviceId',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.updateUserDeviceId);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/isCovidTestReq',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.isCovidTestReq);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/addCovidTestImage',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.addCovidTestImage);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/getInTrasitTravelReq',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.getInTrasitTravelReq);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/getUserNotificationList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.getUserNotificationList);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/upadateNotificationStatus',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.upadateNotificationStatus);



    
    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/getBDetails', Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.getBDetails);

    
    
  
    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/sendrequestToAs', Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.sendrequestToAs);


    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/getUserArogyaSetuStatus', Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.getUserArogyaSetuStatus);

    
    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/generateOtpOfCowin', Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.generateOtpOfCowin);

    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/generateUserTokenCowin', Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.generateUserTokenCowin);


    Evolve.Router.post('/api/v1/suraksha/travelStatusTrans/getVaccinationDocument', Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.getVaccinationDocument);



} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Suraksha TravelStatusTrans Routes :", error)
}


module.exports = Evolve.Router
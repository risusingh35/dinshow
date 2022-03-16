'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
      *  Title :  Assets Room API List
      *  Desc  :     
      */


    Evolve.Router.post('/api/v1/eAssets/room/addRooms', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eAssets.Room.MidRoom.addRooms, Evolve.App.Controllers.eAssets.Room.ConList.addRooms);

    Evolve.Router.post('/api/v1/eAssets/room/getRooms', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eAssets.Room.MidRoom.getRooms, Evolve.App.Controllers.eAssets.Room.ConList.getRooms);

    Evolve.Router.post('/api/v1/eAssets/room/getSingleRoom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Room.ConList.getSingleRoom);

    Evolve.Router.post('/api/v1/eAssets/room/editRoom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eAssets.Room.MidRoom.editRoom, Evolve.App.Controllers.eAssets.Room.ConList.editRoom);


    /** End  : Assets Room  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Assets Room Router :", error)
}


module.exports = Evolve.Router
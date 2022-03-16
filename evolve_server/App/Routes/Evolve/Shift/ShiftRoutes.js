'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Shift API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/shift/getShiftList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Evolve.Shift.ShiftMid.getShiftListAuth ,Evolve.App.Controllers.Evolve.Shift.ConList.getShiftList);

    Evolve.Router.post('/api/v1/evolve/shift/addShift', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Shift.ShiftMid.addShift, Evolve.App.Controllers.Evolve.Shift.ConList.addShift);

    Evolve.Router.post('/api/v1/evolve/shift/getSingleShift', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Shift.ShiftMid.getSingleShift, Evolve.App.Controllers.Evolve.Shift.ConList.getSingleShift);

    Evolve.Router.post('/api/v1/evolve/shift/updateShift', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Shift.ShiftMid.updateShift, Evolve.App.Controllers.Evolve.Shift.ConList.updateShift);

    Evolve.Router.post('/api/v1/evolve/shift/deleteShift', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Shift.ConList.deleteShift);


    /** End  : Shift  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Shift Router :", error)
}
module.exports = Evolve.Router
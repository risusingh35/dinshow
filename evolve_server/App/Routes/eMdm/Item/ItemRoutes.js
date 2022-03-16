'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  ItemyList API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/Item/getItemList', Evolve.App.Controllers.eMdm.Item.ConList.getItemList);
    
    
    
    /** End  :ItemyList  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router
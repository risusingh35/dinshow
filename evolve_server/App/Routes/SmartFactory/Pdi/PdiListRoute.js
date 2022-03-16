'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  PDI  API List
     *  Desc  :    
     */

     

     
   

   
     /** End  : PDI   */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory PDI  Router :", error)
}


module.exports = Evolve.Router
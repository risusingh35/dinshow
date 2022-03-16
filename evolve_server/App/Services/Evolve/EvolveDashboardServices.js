'use strict';
const Evolve = require('../../../Boot/Evolve'); 
module.exports = {
    getSerialChartData: async function (data) {
        try {
            console.log("jhsdchfsjff");
            console.log(" data is >>>> " , data);
            if(data.period == 'day')
            {
                console.log("entered in day >>>>>>>>> ")
            return await Evolve.SqlPool.request()
            //.input('EvolveCountry_ID', Evolve.Sql.Int, EvolveCountry_ID)
            .query("SELECT COUNT(EvolveProdOrderHistory_ID) AS Completed ,(select COUNT(EvolveProdOrderHistory_ID) FROM EvolveProdOrdersHistory WHERE  EvolveProdOrderHistoryType_Code = 'PRODORD' and EvolveProdOrdersDetails_Status = 'Rejected' ) as 'Rework' FROM EvolveProdOrdersHistory WHERE  EvolveProdOrderHistoryType_Code = 'PRODORD' AND  EvolveProdOrdersDetails_Status = 'Completed'")
            }

            else if(data.period == 'week')
            {
                console.log("entered in weeek ")
                let curr = new Date; // get current date
                let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                let last = first + 6; // last day is the first day + 6
                
                let firstday = new Date(curr.setDate(first))
                let  lastday= new Date(curr.setDate(last))

                console.log("first day is >>>>" ,firstday );
                console.log("last day is >>>>" ,lastday );

                var moment = require('moment');
                firstday  = moment(firstday).format("YYYY-MM-DD") +"";
                lastday  = moment(lastday).format("YYYY-MM-DD")+"";
                

                // var date = new Date(firstday).toDateString("yyyy-MM-dd");
                console.log("date is >>>. " , firstday)
                console.log("date is >>>. " , lastday)


            

                console.log("SELECT COUNT(EvolveProdOrderHistory_ID) AS Completed ,(select COUNT(EvolveProdOrderHistory_ID) FROM EvolveProdOrdersHistory WHERE  EvolveProdOrderHistoryType_Code = 'PRODORD' and EvolveProdOrdersDetails_Status = 'Rejected' ) as 'Rework' FROM EvolveProdOrdersHistory WHERE  EvolveProdOrderHistoryType_Code = 'PRODORD' AND  EvolveProdOrdersDetails_Status = 'Completed'  AND cast(EvolveProdOrderHistory_UpdatedAt as date) >='"+firstday+"'  and cast(EvolveProdOrderHistory_UpdatedAt as date) <= '"+lastday+"'" );


                // cast(epodh.EvolveProdOrderHistory_CreatedAt as date) >=

                // and cast(epodh.EvolveProdOrderHistory_UpdatedAt as date) <=

            return await Evolve.SqlPool.request()
            .input('firstday', Evolve.Sql.NVarChar, firstday)
            .input('lastday', Evolve.Sql.NVarChar, lastday)

            .query("SELECT COUNT(EvolveProdOrderHistory_ID) AS Completed ,(select COUNT(EvolveProdOrderHistory_ID) FROM EvolveProdOrdersHistory WHERE  EvolveProdOrderHistoryType_Code = 'PRODORD' and EvolveProdOrdersDetails_Status = 'Rejected' ) as 'Rework' FROM EvolveProdOrdersHistory WHERE  EvolveProdOrderHistoryType_Code = 'PRODORD' AND  EvolveProdOrdersDetails_Status = 'Completed'  AND cast(EvolveProdOrderHistory_UpdatedAt as date) >='"+firstday+"'  and cast(EvolveProdOrderHistory_UpdatedAt as date) <= '"+lastday+"'" )
            }
        } catch (error) {
            Evolve.Log.error(" EERR1497: Error while getting serial data "+error.message);
            return new Error(" EERR1497: Error while getting serial data "+error.message);
        }
    },
}
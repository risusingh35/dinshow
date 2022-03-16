'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    
    getParcelCount: async function (search, data) {
        try {
            let condition = "";
          
            if(data.startDate !=''  && data.endDate !='')
            {
                condition += "  AND  cast(EvolveGate_CreatedAt as date) >=" +
                "'" +data.startDate + "'" +" and cast(EvolveGate_CreatedAt as date) <=" +"'" +data.endDate+"'"
            }
            if(data.direction !="")
            {
                condition += "AND EvolveGate_Direction='"+data.direction+"'"
            }
          
            if (search != "") {

                condition += "AND (  EvolveGate_RefNumber LIKE '%" + search + "%'  OR EvolveGate_ParcelTrackingNum LIKE '%" + search + "%' OR EvolveGate_ParcelFrom LIKE '%" + search + "%'   OR EvolveGate_DeliverTo LIKE '%" + search + "%' )"
               
            }

            return await Evolve.SqlPool.request()
                
            .query("SELECT COUNT(EvolveGate_ID) As count  FROM EvolveGate  WHERE EvolveGate_ModuleType = 'PARCEL'  "+condition)


      

        } catch (error) {
            Evolve.Log.error(" EERR1165: Error while getting getting Parcel Count "+error.message);
            return new Error(" EERR1165: Error while getting getting Parcel Count "+error.message);
        }
    },

    getParcelList: async function (start, length, search, data) {

        // "cast(epodh.EvolveProdOrderHistory_CreatedAt as date) >=" +
        // "'" +
        // req.query.startDate +
        // "'" +
        // " and cast(epodh.EvolveProdOrderHistory_UpdatedAt as date) <=" +
        // "'" +
        // req.query.endDate
        try {

            let  condition = '';
           
            if(data.startDate !=''  && data.endDate !='')
            {
                condition += "  AND  cast(EvolveGate_CreatedAt as date) >=" +
                "'" +data.startDate + "'" +" and cast(EvolveGate_CreatedAt as date) <=" +"'" +data.endDate+"'"
            }
            if(data.direction !="")
            {
                condition += "AND EvolveGate_Direction='"+data.direction+"'"
            }

            if (search != "") {

                condition += "AND (  EvolveGate_RefNumber LIKE '%" + search + "%'  OR EvolveGate_ParcelTrackingNum LIKE '%" + search + "%' OR EvolveGate_ParcelFrom LIKE '%" + search + "%'   OR EvolveGate_DeliverTo LIKE '%" + search + "%' )"
               
            }

        
             return await Evolve.SqlPool.request()

             .input('start', Evolve.Sql.Int, start)
             .input('length', Evolve.Sql.Int, length)
                
                .query("SELECT  EvolveGate_ParcelFrom ,EvolveGate_Direction , EvolveGate_Image ,EvolveGate_DeliverTo, EvolveGate_RefNumber ,EvolveGate_ParcelTrackingNum , EvolveGate_ID  , convert(varchar, EvolveGate_CreatedAt, 103)  as EvolveGate_CreatedAt , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, [EvolveGate_CreatedAt]), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),   CONVERT(DATETIME, [EvolveGate_CreatedAt]), 22), 3)) as time    FROM EvolveGate  WHERE EvolveGate_ModuleType = 'PARCEL'  "+condition+" ORDER BY EvolveGate_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ")

            
        } catch (error) {
            Evolve.Log.error(" EERR1166: Error while getting Parcel List "+error.message);
            return new Error(" EERR1166: Error while getting Parcel List "+error.message);
        }
    },

    getImageUrl: async function (EvolveGate_ID) {
        try {
          
              return await Evolve.SqlPool.request()
                
                .query("  SELECT  EvolveGate_Image  FROM EvolveGate WHERE EvolveGate_ID ="+EvolveGate_ID)

        } catch (error) {
            Evolve.Log.error(" EERR1167: Error while getting Image Url "+error.message);
            return new Error(" EERR1167: Error while getting Image Url "+error.message);
        }
    },

 





}
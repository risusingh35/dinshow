'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {




    getImageUrl: async function (EvolveGate_ID) {
        try {
          
              return await Evolve.SqlPool.request()
                
                .query("  SELECT  EvolveGate_Image  FROM EvolveGate WHERE EvolveGate_ID ="+EvolveGate_ID)

        } catch (error) {
            Evolve.Log.error(" EERR1168: Error while getting Image Url "+error.message);
            return new Error(" EERR1168: Error while getting Image Url "+error.message);
        }
    },

    getVisitorCount: async function (search, data) {
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

                condition += "AND (  EvolveGate_RefNumber LIKE '%" + search + "%' OR   ICard_Number LIKE '%" + search + "%' OR  EvolveGate_VisitorName LIKE '%" + search + "%' OR  EvolveGate_Email LIKE '%" + search + "%' OR EvolveGate_VisitorContact LIKE '%" + search + "%' OR  EvolveGate_WhomToMeet LIKE '%" + search + "%' )"
               
            }

            return await Evolve.SqlPool.request()
                
            .query("SELECT COUNT(EvolveGate_ID) AS count FROM EvolveGate WHERE EvolveGate_ModuleType = 'VISTR' " + condition)


      

        } catch (error) {
            Evolve.Log.error(" EERR1169: Error while getting Visitor Count "+error.message);
            return new Error(" EERR1169: Error while getting Visitor Count "+error.message);
        }
    },

    getVisitorList: async function (start, length, search, data) {
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

                condition += "AND (  EvolveGate_RefNumber LIKE '%" + search + "%' OR   ICard_Number LIKE '%" + search + "%' OR  EvolveGate_VisitorName LIKE '%" + search + "%' OR  EvolveGate_Email LIKE '%" + search + "%' OR EvolveGate_VisitorContact LIKE '%" + search + "%' OR  EvolveGate_WhomToMeet LIKE '%" + search + "%' )"
               
            }

        
             return await Evolve.SqlPool.request()

             .input('start', Evolve.Sql.Int, start)
             .input('length', Evolve.Sql.Int, length)
                
                .query("SELECT    convert(varchar, eg.EvolveGate_CreatedAt, 103)  as EvolveGate_CreatedAt , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, eg.EvolveGate_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),   CONVERT(DATETIME, eg.EvolveGate_CreatedAt), 22), 3)) as time  ,convert(varchar, eg.EvolveGate_VisitorOutTime, 103)  as EvolveGate_VisitorOutTime , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, eg.EvolveGate_VisitorOutTime), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),   CONVERT(DATETIME, eg.EvolveGate_VisitorOutTime), 22), 3)) as outTime , eg.EvolveGate_Image , eg.EvolveGate_ModuleType , eg.EvolveGate_Email , eg.ICard_Number  ,eg.EvolveGate_RefNumber , eg.EvolveGate_Direction    ,eg.EvolveGate_WhomToMeet  ,eg.EvolveGate_VisitorName ,  es.EvolveSection_Name , eg.EvolveGate_VisitorContact  FROM EvolveGate eg LEFT JOIN EvolveSection es ON es.EvolveSection_ID = eg.EvolveSection_ID WHERE EvolveGate_ModuleType = 'VISTR' " + condition + "  ORDER BY eg.EvolveGate_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ")

            
        } catch (error) {
            Evolve.Log.error(" EERR1170: Error while getting Visitors Count "+error.message);
            return new Error(" EERR1170: Error while getting Visitors Count "+error.message);
        }
    },





}
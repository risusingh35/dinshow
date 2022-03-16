'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getEvolveTableList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT name,crdate FROM SYSOBJECTS WHERE xtype = 'U'");
        } catch (error) {
            Evolve.Log.error(" EERR2604: Error while get table list " + error.message);
            return new Error(" EERR2604: Error while get table list " + error.message);
        }
    },
    getTableFields: async function (data) {
        // console.log(data)
        try {

            let query  = "SELECT Table_Name, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE "
            for(let i=0 ; i<data.table.length; i++){
                if(i == 0){
                    query +=  " TABLE_NAME = '"+data.table[i]+"'" ;
                }else{
                    query +=  " OR TABLE_NAME = '"+data.table[i]+"'";
                }
            }
            // console.log(query)
            return await Evolve.SqlPool.request()
                // .input('Table', Evolve.Sql.NVarChar, data.table)
                .query(query);
        } catch (error) {
            Evolve.Log.error(" EERR2605: Error while get get tahble fields " + error.message);
            return new Error(" EERR2605: Error while get get tahble fields " + error.message);
        }
    },

    getQueryDataCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT(cqr.EvolveCustQR_ID) as count FROM EvolveCustQR cqr, EvolveCustQRTemplate cqrt WHERE cqr.EvolveCustQRTemplate_ID = cqrt.EvolveCustQRTemplate_ID AND (cqrt.EvolveCustQRTemplate_Name LIKE @search OR cqr.EvolveCustQR_Name LIKE @search OR cqr.EvolveCustQR_Code LIKE @search)");
        } catch (error) {
            Evolve.Log.error(" EERR2600: Error while Cust QR list count " + error.message);
            return new Error(" EERR2600: Error while Cust QR list count " + error.message);
        }
    },

    getQueryDataList: async function (data) {
        try {
            console.log(data.Query)
            return await Evolve.SqlPool.request()
                .query(data.Query);
        } catch (error) {
            Evolve.Log.error(" EERR2601: Error while Get Query Data " + error.message);
            return new Error(" EERR2601: Error while Get Query Data " + error.message);
        }
    },

   

}
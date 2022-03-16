'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllPageDetails : async function (EvolvePage_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePage_Code', Evolve.Sql.NVarChar, EvolvePage_Code)
                .query('SELECT * FROM EvolvePage WHERE EvolvePage_Code = @EvolvePage_Code');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting All Page Details "+error.message);
            return new Error(" EERR####: Error while getting All Page Details "+error.message);
        }
    },

    getPageFieldDetails : async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePage_ID', Evolve.Sql.Int, id)
                .query('SELECT * FROM EvolvePageFields WHERE EvolvePage_ID = @EvolvePage_ID  ORDER BY EvolvePageFields_ListIndex ASC');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Page Field List "+error.message);
            return new Error(" EERR####: Error while getting Page Field List "+error.message);
        }
    },

    getPageDataListCount: async function (query , tableName) {
        try {
            if(query == "") {
                return await Evolve.SqlPool.request()
                .query(`  SELECT COUNT(${tableName}_ID) as count  FROM ${tableName}`);
            }else {
                return await Evolve.SqlPool.request()
                .query(`  SELECT COUNT(${tableName}_ID) as count  FROM ${tableName} WHERE ${query}`);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Page Data List Count "+error.message);
            return new Error(" EERR####: Error while getting Page Data List Count "+error.message);
        }
    },

    getPageDataList: async function (start, length ,query , tableName) {
        try {
            
                if(query == ""){
                    return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                    .query(`SELECT * FROM ${tableName} ORDER BY ${tableName}_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY`);
                }else{
                    return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                    .query(`SELECT * FROM ${tableName} WHERE ${query} ORDER BY ${tableName}_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY`);
                }
                
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Page Data List "+error.message);
            return new Error(" EERR####: Error while getting Page Data List "+error.message);
        }
    },

    deletePageRow : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query(`DELETE FROM ${data.EvolvePage_Table} WHERE ${data.EvolvePage_PrimaryKeyColumn} = ${data[data.EvolvePage_PrimaryKeyColumn]}`);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Delete Page Row "+error.message);
            return new Error(" EERR####: Error while Delete Page Row "+error.message);
        }
    },

    generalService : async function (query) {
        try {
            return await Evolve.SqlPool.request()
                .query(query);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Send General Query "+error.message);
            return new Error(" EERR####: Error while Send General Query "+error.message);
        }
    },
    selectQuery : async function (query) {
        try {
            return await Evolve.SqlPool.request()
               
                .query(query);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting query"+error.message);
            return new Error(" EERR####: Error while getting query"+error.message);
        }
    },
}
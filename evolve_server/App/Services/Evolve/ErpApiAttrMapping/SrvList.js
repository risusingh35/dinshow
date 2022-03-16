'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAttrmappingListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT(erpAttMap.EvolveERPApiAttrMapping_ID) as count FROM EvolveERPApiAttrMapping erpAttMap, EvolveERPApi erpApi WHERE (erpAttMap.EvolveERPApiAttrMapping_Table LIKE @search OR erpAttMap.EvolveERPApiAttrMapping_Feild LIKE @search OR erpApi.EvolveERPApi_Code LIKE @search)");
        } catch (error) {
            Evolve.Log.error(" EERR2600: Error while ERP api attribute maping list count " + error.message);
            return new Error(" EERR2600: Error while ERP api attribute maping list count " + error.message);
        }
    },

    getAttrmappingListDatatable: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT erpAttMap.EvolveERPApiAttrMapping_ID, erpAttMap.EvolveERPApiAttributes_ID,erpAttMap.EvolveERPApiAttrMapping_Table ,erpAttMap.EvolveERPApiAttrMapping_Feild , erpAttMap.EvolveERPApiAttrMapping_MatchFeild , erpAttMap.EvolveERPApiAttrMapping_Status, erpApi.EvolveERPApi_Code, erpApiAtt.EvolveERPApiAttributes_Code, (select ea1.EvolveERPApiAttributes_Code from EvolveERPApiAttributes ea1 where erpApiAtt.EvolveERPApiAttributes_Parent = ea1.EvolveERPApiAttributes_ID) as parentAttribute FROM EvolveERPApiAttrMapping erpAttMap , EvolveERPApi erpApi, EvolveERPApiAttributes erpApiAtt  WHERE erpAttMap.EvolveERPApi_ID = erpApi.EvolveERPApi_ID AND erpAttMap.EvolveERPApiAttributes_ID = erpApiAtt.EvolveERPApiAttributes_ID AND (erpAttMap.EvolveERPApiAttrMapping_Table LIKE @search OR erpAttMap.EvolveERPApiAttrMapping_Feild LIKE @search OR erpApi.EvolveERPApi_Code LIKE @search) order by EvolveERPApiAttrMapping_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR2601: Error while gsp api attribute maping list " + error.message);
            return new Error(" EERR2601: Error while gsp api attribute maping list " + error.message);
        }
    },

    getErpApiList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveERPApi_ID ,EvolveERPApi_Code FROM EvolveERPApi ');
        } catch (error) {
            Evolve.Log.error(" EERR2602: Error while get Erp api list " + error.message);
            return new Error(" EERR2602: Error while get Erp api list " + error.message);
        }
    },
    getApiAttributes: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveERPApi_ID', Evolve.Sql.Int, data.EvolveERPApi_ID)
                .query('SELECT ea.EvolveERPApiAttributes_ID ,(select ea1.EvolveERPApiAttributes_Code from EvolveERPApiAttributes ea1 where ea.EvolveERPApiAttributes_Parent = ea1.EvolveERPApiAttributes_ID) as parentAttribute, EvolveERPApiAttributes_Code FROM EvolveERPApiAttributes ea WHERE ea.EvolveERPApi_ID =@EvolveERPApi_ID');

        } catch (error) {
            Evolve.Log.error(" EERR2603: Error while  api attributes " + error.message);
            return new Error(" EERR2603: Error while  api attributes " + error.message);
        }
    },

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
        try {
            return await Evolve.SqlPool.request()
                .input('Table', Evolve.Sql.NVarChar, data.mappingTable)
                .query("SELECT COLUMN_NAME as columnName FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @Table");

        } catch (error) {
            Evolve.Log.error(" EERR2605: Error while get get table fields " + error.message);
            return new Error(" EERR2605: Error while get get table fields " + error.message);
        }
    },
    addErpAttrMapping: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveERPApiAttributes_ID', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_ID)
                .input('EvolveERPApiAttrMapping_Table', Evolve.Sql.NVarChar, data.EvolveERPApiAttrMapping_Table)
                .input('EvolveERPApiAttrMapping_Feild', Evolve.Sql.NVarChar, data.EvolveERPApiAttrMapping_Feild)
                .input('EvolveERPApiAttrMapping_MatchFeild', Evolve.Sql.NVarChar, data.EvolveERPApiAttrMapping_MatchFeild)
                .input('EvolveERPApiAttrMapping_Status', Evolve.Sql.Bit, data.EvolveERPApiAttrMapping_Status)
                .input('EvolveERPApi_ID', Evolve.Sql.Int, data.EvolveERPApi_ID)
                .input('EvolveERPApiAttrMapping_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveERPApiAttrMapping_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveERPApiAttrMapping_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveERPApiAttrMapping_CreatedAt', Evolve.Sql.NVarChar, dataTime)

                .query('INSERT INTO EvolveERPApiAttrMapping (EvolveERPApiAttributes_ID,EvolveERPApiAttrMapping_Table,EvolveERPApiAttrMapping_Feild,EvolveERPApiAttrMapping_MatchFeild,EvolveERPApi_ID,EvolveERPApiAttrMapping_UpdatedUser,EvolveERPApiAttrMapping_CreatedUser,EvolveERPApiAttrMapping_UpdatedAt,EvolveERPApiAttrMapping_CreatedAt,EvolveERPApiAttrMapping_Status) VALUES(@EvolveERPApiAttributes_ID,@EvolveERPApiAttrMapping_Table,@EvolveERPApiAttrMapping_Feild,@EvolveERPApiAttrMapping_MatchFeild,@EvolveERPApi_ID,@EvolveERPApiAttrMapping_UpdatedUser,@EvolveERPApiAttrMapping_CreatedUser,@EvolveERPApiAttrMapping_UpdatedAt,@EvolveERPApiAttrMapping_CreatedAt,@EvolveERPApiAttrMapping_Status)');
        } catch (error) {
            Evolve.Log.error(" EERR2606: Error while add mapping details " + error.message);
            return new Error(" EERR2606: Error while add mapping details " + error.message);
        }
    },
    updateMappingDetails: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveERPApiAttrMapping_ID', Evolve.Sql.NVarChar, data.EvolveERPApiAttrMapping_ID)
                .input('EvolveERPApiAttributes_ID', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_ID)
                .input('EvolveERPApiAttrMapping_Table', Evolve.Sql.NVarChar, data.EvolveERPApiAttrMapping_Table)
                .input('EvolveERPApiAttrMapping_Feild', Evolve.Sql.NVarChar, data.EvolveERPApiAttrMapping_Feild)
                .input('EvolveERPApiAttrMapping_MatchFeild', Evolve.Sql.NVarChar, data.EvolveERPApiAttrMapping_MatchFeild)
                .input('EvolveERPApiAttrMapping_Status', Evolve.Sql.Bit, data.EvolveERPApiAttrMapping_Status)
                .input('EvolveERPApi_ID', Evolve.Sql.Int, data.EvolveERPApi_ID)
                .input('EvolveERPApiAttrMapping_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveERPApiAttrMapping_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query("UPDATE EvolveERPApiAttrMapping SET EvolveERPApiAttributes_ID=@EvolveERPApiAttributes_ID ,EvolveERPApiAttrMapping_Table=@EvolveERPApiAttrMapping_Table ,  EvolveERPApiAttrMapping_Feild=@EvolveERPApiAttrMapping_Feild , EvolveERPApiAttrMapping_MatchFeild=@EvolveERPApiAttrMapping_MatchFeild ,EvolveERPApi_ID=@EvolveERPApi_ID ,EvolveERPApiAttrMapping_UpdatedUser=@EvolveERPApiAttrMapping_UpdatedUser ,EvolveERPApiAttrMapping_Status=@EvolveERPApiAttrMapping_Status  WHERE  EvolveERPApiAttrMapping_ID=@EvolveERPApiAttrMapping_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR2607: Error while update mapping details " + error.message);
            return new Error(" EERR2607: Error while update mapping details " + error.message);
        }
    },
    getSingleMappingDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveERPApiAttrMapping_ID', Evolve.Sql.Int, data.EvolveERPApiAttrMapping_ID)
                .query('SELECT EvolveERPApiAttrMapping_ID, EvolveERPApiAttributes_ID,EvolveERPApiAttrMapping_Table ,EvolveERPApiAttrMapping_Feild , EvolveERPApiAttrMapping_MatchFeild , EvolveERPApiAttrMapping_Status ,EvolveERPApi_ID FROM  EvolveERPApiAttrMapping WHERE EvolveERPApiAttrMapping_ID=@EvolveERPApiAttrMapping_ID');
        } catch (error) {
            Evolve.Log.error(" EERR2608: Error while get mapping details " + error.message);
            return new Error(" EERR2608: Error while get mapping details " + error.message);
        }
    },
    // EERR1355: Error while getting process list



}
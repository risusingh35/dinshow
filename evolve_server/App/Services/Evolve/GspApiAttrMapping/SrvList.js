'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAttrmappingListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT(gspAttMap.EvolveGSPApiAttrMapping_ID) as count FROM EvolveGSPApiAttrMapping gspAttMap, EvolveGSPApi gspApi , EvolveGSPApiAttributes gspApiAtt WHERE gspAttMap.EvolveGSPApi_ID = gspApi.EvolveGSPApi_ID AND gspAttMap.EvolveGSPApiAttributes_ID = gspApiAtt.EvolveGSPApiAttributes_ID AND (gspApi.EvolveGSPApi_Code LIKE @search OR gspAttMap.EvolveGSPApiAttrMapping_Table LIKE @search OR  gspAttMap.EvolveGSPApiAttrMapping_Feild LIKE @search)");
        } catch (error) {
            Evolve.Log.error(" EERR2600: Error while gsp api attribute maping list count " + error.message);
            return new Error(" EERR2600: Error while gsp api attribute maping list count " + error.message);
        }
    },

    getAttrmappingListDatatable: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT gspAttMap.EvolveGSPApiAttrMapping_ID, gspAttMap.EvolveGSPApiAttributes_ID,gspAttMap.EvolveGSPApiAttrMapping_Table ,gspAttMap.EvolveGSPApiAttrMapping_Feild , gspAttMap.EvolveGSPApiAttrMapping_MatchFeild , gspAttMap.EvolveGSPApiAttrMapping_Status   ,gspApi.EvolveGSPApi_Code , gspApiAtt.EvolveGSPApiAttributes_Code, (select ea1.EvolveGSPApiAttributes_Code from EvolveGSPApiAttributes ea1 where gspApiAtt.EvolveGSPApiAttributes_Parent = ea1.EvolveGSPApiAttributes_ID) as parentAttribute FROM EvolveGSPApiAttrMapping gspAttMap , EvolveGSPApi gspApi , EvolveGSPApiAttributes gspApiAtt  WHERE gspAttMap.EvolveGSPApi_ID = gspApi.EvolveGSPApi_ID AND gspAttMap.EvolveGSPApiAttributes_ID = gspApiAtt.EvolveGSPApiAttributes_ID AND (gspApi.EvolveGSPApi_Code LIKE @search OR gspAttMap.EvolveGSPApiAttrMapping_Table LIKE @search OR  gspAttMap.EvolveGSPApiAttrMapping_Feild LIKE @search) order by EvolveGSPApiAttrMapping_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR2601: Error while gsp api attribute maping list " + error.message);
            return new Error(" EERR2601: Error while gsp api attribute maping list " + error.message);
        }
    },

    getGspApiList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('  SELECT  EvolveGSPApi_ID ,EvolveGSPApi_Code  FROM EvolveGSPApi ');

        } catch (error) {
            Evolve.Log.error(" EERR2602: Error while get gsp api list " + error.message);
            return new Error(" EERR2602: Error while get gsp api list " + error.message);
        }
    },
    getApiAttributes: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                .query('SELECT ea.EvolveGSPApiAttributes_ID ,(select ea1.EvolveGSPApiAttributes_Code from EvolveGSPApiAttributes ea1 where ea.EvolveGSPApiAttributes_Parent = ea1.EvolveGSPApiAttributes_ID) as parentAttribute, EvolveGSPApiAttributes_Code FROM EvolveGSPApiAttributes ea WHERE ea.EvolveGSPApi_ID =@EvolveGSPApi_ID');

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
            Evolve.Log.error(" EERR2605: Error while get get tahble fields " + error.message);
            return new Error(" EERR2605: Error while get get tahble fields " + error.message);
        }
    },
    addGspApiAttrMapping: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApiAttributes_ID', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_ID)
                .input('EvolveGSPApiAttrMapping_Table', Evolve.Sql.NVarChar, data.EvolveGSPApiAttrMapping_Table)
                .input('EvolveGSPApiAttrMapping_Feild', Evolve.Sql.NVarChar, data.EvolveGSPApiAttrMapping_Feild)
                .input('EvolveGSPApiAttrMapping_MatchFeild', Evolve.Sql.NVarChar, data.EvolveGSPApiAttrMapping_MatchFeild)
                .input('EvolveGSPApiAttrMapping_Status', Evolve.Sql.Bit, data.EvolveGSPApiAttrMapping_Status)
                .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                .input('EvolveGSPApiAttrMapping_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGSPApiAttrMapping_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGSPApiAttrMapping_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGSPApiAttrMapping_CreatedAt', Evolve.Sql.NVarChar, dataTime)

                .query('INSERT INTO EvolveGSPApiAttrMapping (EvolveGSPApiAttributes_ID,EvolveGSPApiAttrMapping_Table,EvolveGSPApiAttrMapping_Feild,EvolveGSPApiAttrMapping_MatchFeild,EvolveGSPApi_ID,EvolveGSPApiAttrMapping_UpdatedUser,EvolveGSPApiAttrMapping_CreatedUser,EvolveGSPApiAttrMapping_UpdatedAt,EvolveGSPApiAttrMapping_CreatedAt,EvolveGSPApiAttrMapping_Status) VALUES(@EvolveGSPApiAttributes_ID,@EvolveGSPApiAttrMapping_Table,@EvolveGSPApiAttrMapping_Feild,@EvolveGSPApiAttrMapping_MatchFeild,@EvolveGSPApi_ID,@EvolveGSPApiAttrMapping_UpdatedUser,@EvolveGSPApiAttrMapping_CreatedUser,@EvolveGSPApiAttrMapping_UpdatedAt,@EvolveGSPApiAttrMapping_CreatedAt,@EvolveGSPApiAttrMapping_Status)');
        } catch (error) {
            Evolve.Log.error(" EERR2606: Error while add mapping details " + error.message);
            return new Error(" EERR2606: Error while add mapping details " + error.message);
        }
    },
    updateMappingDetails: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApiAttrMapping_ID', Evolve.Sql.NVarChar, data.EvolveGSPApiAttrMapping_ID)
                .input('EvolveGSPApiAttributes_ID', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_ID)
                .input('EvolveGSPApiAttrMapping_Table', Evolve.Sql.NVarChar, data.EvolveGSPApiAttrMapping_Table)
                .input('EvolveGSPApiAttrMapping_Feild', Evolve.Sql.NVarChar, data.EvolveGSPApiAttrMapping_Feild)
                .input('EvolveGSPApiAttrMapping_MatchFeild', Evolve.Sql.NVarChar, data.EvolveGSPApiAttrMapping_MatchFeild)
                .input('EvolveGSPApiAttrMapping_Status', Evolve.Sql.Bit, data.EvolveGSPApiAttrMapping_Status)
                .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                .input('EvolveGSPApiAttrMapping_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGSPApiAttrMapping_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query("UPDATE EvolveGSPApiAttrMapping SET EvolveGSPApiAttributes_ID=@EvolveGSPApiAttributes_ID ,EvolveGSPApiAttrMapping_Table=@EvolveGSPApiAttrMapping_Table ,  EvolveGSPApiAttrMapping_Feild=@EvolveGSPApiAttrMapping_Feild , EvolveGSPApiAttrMapping_MatchFeild=@EvolveGSPApiAttrMapping_MatchFeild ,EvolveGSPApi_ID=@EvolveGSPApi_ID ,EvolveGSPApiAttrMapping_UpdatedUser=@EvolveGSPApiAttrMapping_UpdatedUser ,EvolveGSPApiAttrMapping_Status=@EvolveGSPApiAttrMapping_Status  WHERE  EvolveGSPApiAttrMapping_ID=@EvolveGSPApiAttrMapping_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR2607: Error while update mapping details " + error.message);
            return new Error(" EERR2607: Error while update mapping details " + error.message);
        }
    },
    getSingleMappingDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApiAttrMapping_ID', Evolve.Sql.Int, data.EvolveGSPApiAttrMapping_ID)
                .query('  SELECT EvolveGSPApiAttrMapping_ID, EvolveGSPApiAttributes_ID,EvolveGSPApiAttrMapping_Table ,EvolveGSPApiAttrMapping_Feild , EvolveGSPApiAttrMapping_MatchFeild , EvolveGSPApiAttrMapping_Status ,EvolveGSPApi_ID FROM  EvolveGSPApiAttrMapping WHERE EvolveGSPApiAttrMapping_ID=@EvolveGSPApiAttrMapping_ID');
        } catch (error) {
            Evolve.Log.error(" EERR2608: Error while get mapping details " + error.message);
            return new Error(" EERR2608: Error while get mapping details " + error.message);
        }
    },
    deleteGspApiAttributesMapping: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApiAttrMapping_ID', Evolve.Sql.Int, data.EvolveGSPApiAttrMapping_ID)
                .query("DELETE FROM EvolveGSPApiAttrMapping WHERE EvolveGSPApiAttrMapping_ID = @EvolveGSPApiAttrMapping_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2608: Error while DELETE mapping details " + error.message);
            return new Error(" EERR2608: Error while DELETE mapping details " + error.message);
        }
    },
    CheckApiAttribute: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApiAttributes_ID', Evolve.Sql.Int, data.EvolveGSPApiAttributes_ID)
                .query("SELECT * FROM EvolveGSPApiAttrMapping WHERE EvolveGSPApiAttributes_ID = @EvolveGSPApiAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2608: Error while Check Api Attribut " + error.message);
            return new Error(" EERR2608: Error while Check Api Attribut " + error.message);
        }
    },


}
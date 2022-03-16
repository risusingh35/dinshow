'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAttrmappingListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT  COUNT(etam.EvolveEDITemplateAttrMapping_ID) as count   FROM EvolveEDITemplateAttrMapping etam ,  EvolveEDITemplate et , EvolveEDITemplateAttributes eta   WHERE etam.EvolveEDITemplateAttrMapping_INTemplateID = et.EvolveEDITemplate_ID AND  etam.EvolveEDITemplateAttrMapping_INTemplateAttrID = eta.EvolveEDITemplateAttributes_ID AND (et.EvolveEDITemplate_Code LIKE @search )");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while edi template attr maping list count " + error.message);
            return new Error(" EERR####: Error while edi template attr maping list count " + error.message);
        }
    },

    getAttrmappingListDatatable: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT  etam.*  , et.EvolveEDITemplate_Code as tempIn , eta.EvolveEDITemplateAttributes_Code as tempInAttr , (SELECT   eto.EvolveEDITemplate_Code   FROM   EvolveEDITemplate eto WHERE etam.EvolveEDITemplateAttrMapping_OUTTemplateID = eto.EvolveEDITemplate_ID  ) as tempOut  , (SELECT   etao.EvolveEDITemplateAttributes_Code FROM EvolveEDITemplateAttributes etao   WHERE etam.EvolveEDITemplateAttrMapping_OUTTemplateAttrID = etao.EvolveEDITemplateAttributes_ID  ) as tempOutAttr FROM EvolveEDITemplateAttrMapping etam ,  EvolveEDITemplate et , EvolveEDITemplateAttributes eta   WHERE etam.EvolveEDITemplateAttrMapping_INTemplateID = et.EvolveEDITemplate_ID AND  etam.EvolveEDITemplateAttrMapping_INTemplateAttrID = eta.EvolveEDITemplateAttributes_ID AND (et.EvolveEDITemplate_Code LIKE @search) order by etam.EvolveEDITemplateAttrMapping_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while edi template attr maping list " + error.message);
            return new Error(" EERR####: Error while edi template attr maping list " + error.message);
        }
    },

    getEDITemplateList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('  SELECT  EvolveEDITemplate_ID ,EvolveEDITemplate_Code  , EvolveEDITemplate_Type  FROM EvolveEDITemplate ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get gsp api list " + error.message);
            return new Error(" EERR####: Error while get gsp api list " + error.message);
        }
    },
    getTemplateAttributes: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplate_ID', Evolve.Sql.Int, data.EvolveEDITemplate_ID)
                .query('SELECT ea.EvolveEDITemplateAttributes_ID ,(select ea1.EvolveEDITemplateAttributes_Code from EvolveEDITemplateAttributes ea1 where ea.EvolveEDITemplateAttributes_Parent = ea1.EvolveEDITemplateAttributes_ID) as parentAttribute, EvolveEDITemplateAttributes_Code FROM EvolveEDITemplateAttributes ea WHERE ea.EvolveEDITemplate_ID =@EvolveEDITemplate_ID');

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  api attributes " + error.message);
            return new Error(" EERR####: Error while  api attributes " + error.message);
        }
    },

    getEvolveTableList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT name,crdate FROM SYSOBJECTS WHERE xtype = 'U'");

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get table list " + error.message);
            return new Error(" EERR####: Error while get table list " + error.message);
        }
    },
    getTableFields: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('Table', Evolve.Sql.NVarChar, data.mappingTable)

                .query("SELECT COLUMN_NAME as columnName FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @Table");

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get get tahble fields " + error.message);
            return new Error(" EERR####: Error while get get tahble fields " + error.message);
        }
    },
    addEDITemplateAttrMapping: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplateAttrMapping_INTemplateID', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttrMapping_INTemplateID)
                .input('EvolveEDITemplateAttrMapping_INTemplateAttrID', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttrMapping_INTemplateAttrID)
                .input('EvolveEDITemplateAttrMapping_OUTTemplateID', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttrMapping_OUTTemplateID)
                .input('EvolveEDITemplateAttrMapping_OUTTemplateAttrID', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttrMapping_OUTTemplateAttrID)
                .input('EvolveEDITemplateAttrMapping_Status', Evolve.Sql.Bit, data.EvolveEDITemplateAttrMapping_Status)
                // .input('EvolveEDITemplate_ID', Evolve.Sql.Int, data.EvolveEDITemplate_ID)
                .input('EvolveEDITemplateAttrMapping_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEDITemplateAttrMapping_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEDITemplateAttrMapping_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveEDITemplateAttrMapping_CreatedAt', Evolve.Sql.NVarChar, dataTime)

                .query('INSERT INTO EvolveEDITemplateAttrMapping (EvolveEDITemplateAttrMapping_INTemplateID,EvolveEDITemplateAttrMapping_INTemplateAttrID,EvolveEDITemplateAttrMapping_OUTTemplateID,EvolveEDITemplateAttrMapping_OUTTemplateAttrID,EvolveEDITemplateAttrMapping_UpdatedUser,EvolveEDITemplateAttrMapping_CreatedUser,EvolveEDITemplateAttrMapping_UpdatedAt,EvolveEDITemplateAttrMapping_CreatedAt,EvolveEDITemplateAttrMapping_Status) VALUES(@EvolveEDITemplateAttrMapping_INTemplateID,@EvolveEDITemplateAttrMapping_INTemplateAttrID,@EvolveEDITemplateAttrMapping_OUTTemplateID,@EvolveEDITemplateAttrMapping_OUTTemplateAttrID,@EvolveEDITemplateAttrMapping_UpdatedUser,@EvolveEDITemplateAttrMapping_CreatedUser,@EvolveEDITemplateAttrMapping_UpdatedAt,@EvolveEDITemplateAttrMapping_CreatedAt,@EvolveEDITemplateAttrMapping_Status)');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add mapping details " + error.message);
            return new Error(" EERR####: Error while add mapping details " + error.message);
        }
    },
    updateMappingDetails: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplateAttrMapping_ID', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttrMapping_ID)
                .input('EvolveEDITemplateAttrMapping_INTemplateID', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttrMapping_INTemplateID)
                .input('EvolveEDITemplateAttrMapping_INTemplateAttrID', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttrMapping_INTemplateAttrID)
                .input('EvolveEDITemplateAttrMapping_OUTTemplateID', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttrMapping_OUTTemplateID)
                .input('EvolveEDITemplateAttrMapping_OUTTemplateAttrID', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttrMapping_OUTTemplateAttrID)
                .input('EvolveEDITemplateAttrMapping_Status', Evolve.Sql.Bit, data.EvolveEDITemplateAttrMapping_Status)
                .input('EvolveEDITemplateAttrMapping_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEDITemplateAttrMapping_UpdatedAt', Evolve.Sql.NVarChar, dataTime)


                .query("UPDATE EvolveEDITemplateAttrMapping SET EvolveEDITemplateAttrMapping_INTemplateID=@EvolveEDITemplateAttrMapping_INTemplateID ,EvolveEDITemplateAttrMapping_INTemplateAttrID=@EvolveEDITemplateAttrMapping_INTemplateAttrID ,  EvolveEDITemplateAttrMapping_OUTTemplateID=@EvolveEDITemplateAttrMapping_OUTTemplateID , EvolveEDITemplateAttrMapping_OUTTemplateAttrID=@EvolveEDITemplateAttrMapping_OUTTemplateAttrID , EvolveEDITemplateAttrMapping_UpdatedUser=@EvolveEDITemplateAttrMapping_UpdatedUser ,EvolveEDITemplateAttrMapping_UpdatedAt=@EvolveEDITemplateAttrMapping_UpdatedAt, EvolveEDITemplateAttrMapping_Status=@EvolveEDITemplateAttrMapping_Status WHERE  EvolveEDITemplateAttrMapping_ID=@EvolveEDITemplateAttrMapping_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update mapping details " + error.message);
            return new Error(" EERR####: Error while update mapping details " + error.message);
        }
    },
    getSingleMappingDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplateAttrMapping_ID', Evolve.Sql.Int, data.EvolveEDITemplateAttrMapping_ID)
                .query('  SELECT * FROM   EvolveEDITemplateAttrMapping');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get mapping details " + error.message);
            return new Error(" EERR####: Error while get mapping details " + error.message);
        }
    },
    deleteEDITemplateAttributesMapping: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplateAttrMapping_ID', Evolve.Sql.Int, data.EvolveEDITemplateAttrMapping_ID)
                .query("DELETE FROM EvolveEDITemplateAttrMapping WHERE EvolveEDITemplateAttrMapping_ID = @EvolveEDITemplateAttrMapping_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while DELETE mapping details " + error.message);
            return new Error(" EERR####: Error while DELETE mapping details " + error.message);
        }
    },
    CheckApiAttribute: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplateAttributes_ID', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_ID)
                .query("SELECT * FROM EvolveEDITemplateAttrMapping WHERE EvolveEDITemplateAttributes_ID = @EvolveEDITemplateAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Check Api Attribut " + error.message);
            return new Error(" EERR####: Error while Check Api Attribut " + error.message);
        }
    },


}
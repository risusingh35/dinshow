'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getGroupListListCount: async function(search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query('SELECT COUNT(EvolveLicenceItemGroup_ID) as count  FROM EvolveLicenceItemGroup WHERE EvolveLicenceItemGroup_Name LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR32527: Error while getting Grop List Count " + error.message);
            return new Error(" EERR32527: Error while getting Grop List Count " + error.message);
        }
    },

    getGroupList: async function(start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query('select DISTINCT * from EvolveLicenceItemGroup order by EvolveLicenceItemGroup_ID DESC OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR32528: Error while getting Grop List " + error.message);
            return new Error(" EERR32528: Error while getting Grop List " + error.message);
        }
    },

    getGroupItemList: async function(data) {

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, data.EvolveLicenceItemGroup_ID)
                .query('select * from EvolveItem where EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32528: Error while getting Grop Item List " + error.message);
            return new Error(" EERR32528: Error while getting Grop Item List " + error.message);
        }
    },

    itemList: async function() {
        try {
            return await Evolve.SqlPool.request()
                .query('select EvolveItem_ID , EvolveItem_Part from EvolveItem');
        } catch (error) {
            Evolve.Log.error(" EERR32528: Error while getting  Item List " + error.message);
            return new Error(" EERR32528: Error while getting  Item List " + error.message);
        }
    },

    createGroup: async function(data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveLicenceItemGroup_Name', Evolve.Sql.NVarChar, data.EvolveLicenceItemGroup_Name)
                .input('EvolveLicenceItemGroup_Code', Evolve.Sql.NVarChar, data.EvolveLicenceItemGroup_Code)
                .input('EvolveLicenceItemGroup_Desc', Evolve.Sql.NVarChar, data.EvolveLicenceItemGroup_Desc)
                .input('EvolveLicenceItemGroup_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveLicenceItemGroup_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .query('INSERT INTO EvolveLicenceItemGroup (EvolveLicenceItemGroup_Name ,EvolveLicenceItemGroup_Code ,EvolveLicenceItemGroup_Desc ,EvolveLicenceItemGroup_CreatedUser ,EvolveLicenceItemGroup_CreatedAt) VALUES (@EvolveLicenceItemGroup_Name ,@EvolveLicenceItemGroup_Code ,@EvolveLicenceItemGroup_Desc ,@EvolveLicenceItemGroup_CreatedUser ,@EvolveLicenceItemGroup_CreatedAt);select @@IDENTITY AS \'inserted_id\'');
        } catch (error) {
            Evolve.Log.error(" EERR32528: Error while Adding Grop " + error.message);
            return new Error(" EERR32528: Error while Adding Grop " + error.message);
        }
    },

    updateItem: async function(EvolveItem_ID, EvolveLicenceItemGroup_ID) {

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, EvolveLicenceItemGroup_ID)
                .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
                .query('update EvolveItem set EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID where EvolveItem_ID = @EvolveItem_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32528: Error while Update  Licence Item Group Id " + error.message);
            return new Error(" EERR32528: Error while Update  Licence Item Group Id " + error.message);
        }
    },

    selectSingleLicenceItemGroup: async function(data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, data.EvolveLicenceItemGroup_ID)
                .query('select elig.* , ei.EvolveItem_ID from EvolveLicenceItemGroup elig LEFT JOIN  EvolveItem ei on elig.EvolveLicenceItemGroup_ID = ei.EvolveLicenceItemGroup_ID where elig.EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32528: Error while getting Grop Item List " + error.message);
            return new Error(" EERR32528: Error while getting Grop Item List " + error.message);
        }
    },

    removeOldItemGroupIdInItem: async function(EvolveLicenceItemGroup_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, EvolveLicenceItemGroup_ID)
                .query('update EvolveItem set EvolveLicenceItemGroup_ID = NULL where EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32529: Error while Update Licence Item Group Id " + error.message);
            return new Error(" EERR32529: Error while Update Licence Item Group Id " + error.message);
        }
    },

    updateLicenceItemGroup: async function(data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, data.EvolveLicenceItemGroup_ID)
                .input('EvolveLicenceItemGroup_Name', Evolve.Sql.NVarChar, data.EvolveLicenceItemGroup_Name)
                .input('EvolveLicenceItemGroup_Code', Evolve.Sql.NVarChar, data.EvolveLicenceItemGroup_Code)
                .input('EvolveLicenceItemGroup_Desc', Evolve.Sql.NVarChar, data.EvolveLicenceItemGroup_Desc)
                .input('EvolveLicenceItemGroup_Updateduser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveLicenceItemGroup_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query('UPDATE EvolveLicenceItemGroup SET EvolveLicenceItemGroup_Name = @EvolveLicenceItemGroup_Name ,EvolveLicenceItemGroup_Code = @EvolveLicenceItemGroup_Code ,EvolveLicenceItemGroup_Desc = @EvolveLicenceItemGroup_Desc ,EvolveLicenceItemGroup_Updateduser = @EvolveLicenceItemGroup_Updateduser ,EvolveLicenceItemGroup_UpdatedAt = @EvolveLicenceItemGroup_UpdatedAt WHERE EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32528: Error while Update Licence Item Group " + error.message);
            return new Error(" EERR32528: Error while Update Licence Item Group " + error.message);
        }
    }
}
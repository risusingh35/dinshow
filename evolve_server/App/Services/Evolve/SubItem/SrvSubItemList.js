'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    deleteSubItem: async function (id) {
        try {
         
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveSubItem WHERE EvolveSubItem_ID = @id')
        } catch (error) {
            Evolve.Log.error(" EERR1429: Error while deleting Sub Item "+error.message);
            return new Error(" EERR1429: Error while deleting Sub Item "+error.message);
        }
    },

    getItemSearch: async function (search) {
        try {
            let query = "SELECT EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE '%" + search + "%' "
            return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error(" EERR1430: Error while getting Item Search  "+error.message);
            return new Error(" EERR1430: Error while getting Item Search  "+error.message);
        }
    },
    getSubItemListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request(search)
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
          .query("SELECT COUNT(si.EvolveSubItem_ID) as count FROM EvolveSubItem si , EvolveItem ei  WHERE si.EvolveSubItem_ActualItemID = ei.EvolveItem_ID AND ei.EvolveItem_Code LIKE @search")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getSubItemList: async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
                .query(" select es.* ,(select ei.EvolveItem_Code from [EvolveItem] ei where es.EvolveSubItem_ActualItemID = ei.EvolveItem_ID) as item, (select ei.EvolveItem_Code from EvolveItem ei where es.EvolveSubItem_SubItem_ID = ei.EvolveItem_ID) as subitem from EvolveSubItem es ,EvolveItem ei  WHERE es.EvolveSubItem_ActualItemID = ei.EvolveItem_ID   AND ei.EvolveItem_Code LIKE @search ORDER BY es.EvolveSubItem_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR1431: Error while getting Sub Item List Dt List "+error.message);
            return new Error(" EERR1431: Error while getting Sub Item List Dt List "+error.message);
        }
    },

    checkSubItem: async function (data) {
        try {
           return await Evolve.SqlPool.request()
                .input('EvolveSubItem_ActualItemID', Evolve.Sql.Int, data.EvolveSubItem_ActualItemID)
                .input('EvolveSubItem_SubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_SubItem_ID)
                .query('select COUNT (EvolveSubItem_ID) as count from EvolveSubItem where  EvolveSubItem_ActualItemID = @EvolveSubItem_ActualItemID AND  EvolveSubItem_SubItem_ID=@EvolveSubItem_SubItem_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1432: Error while checking Sub Item "+error.message);
            return new Error(" EERR1432: Error while checking Sub Item "+error.message);
        }
    },

    
    getItemNumber: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('select  EvolveItem_ID ,EvolveItem_Code from EvolveItem ')
        } catch (error) {
            Evolve.Log.error(" EERR1433: Error while getting Item Number "+error.message);
            return new Error(" EERR1433: Error while getting Item Number "+error.message);
        }
    },

    addSubItemList: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSubItem_ActualItemID', Evolve.Sql.Int, data.EvolveSubItem_ActualItemID)
                .input('EvolveSubItem_SubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_SubItem_ID)
                .input('EvolveSubItem_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSubItem_CreateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveSubItem (EvolveSubItem_ActualItemID, EvolveSubItem_SubItem_ID,  EvolveSubItem_CreatedAt, EvolveSubItem_CreateUser) VALUES (@EvolveSubItem_ActualItemID, @EvolveSubItem_SubItem_ID, @EvolveSubItem_CreatedAt, @EvolveSubItem_CreateUser)');
        } catch (error) {
            Evolve.Log.error(" EERR1434: Error while adding Sub Item List "+error.message);
            return new Error(" EERR1434: Error while adding Sub Item List "+error.message);
        }
    },

    selectSingleSubItem: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, data.id)
                // .query('select es.* ,(select ei.[EvolveItem_Code] from [EvolveItem] ei where es.[EvolveSubItem_ActualItemID] = ei.[EvolveItem_ID]) as item, (select ei.[EvolveItem_Code] from [EvolveItem] ei where es.[EvolveSubItem_SubItem_ID] = ei.[EvolveItem_ID]) as subitem from EvolveSubItem es  WHERE [EvolveSubItem_ID] = @id');
                .query('select * from EvolveSubItem where EvolveSubItem_ID = @id ')
        } catch (error) {
            Evolve.Log.error(" EERR1435: Error while selecting Single Sub Item "+error.message);
            return new Error(" EERR1435: Error while selecting Single Sub Item "+error.message);
        }
    },

    checkSubItemEdit: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_ID)
                .input('EvolveSubItem_ActualItemID', Evolve.Sql.Int, data.EvolveSubItem_ActualItemID)
                .input('EvolveSubItem_SubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_SubItem_ID)
                .query('select COUNT (EvolveSubItem_ID) as count from EvolveSubItem where  EvolveSubItem_ActualItemID = @EvolveSubItem_ActualItemID AND  EvolveSubItem_SubItem_ID=@EvolveSubItem_SubItem_ID AND EvolveSubItem_ID!=@EvolveSubItem_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1436: Error while checking Sub Item Edit "+error.message);
            return new Error(" EERR1436: Error while checking Sub Item Edit "+error.message);
        }
    },
    updateSubItem: async function (data) {

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_ID)
                .input('EvolveSubItem_ActualItemID', Evolve.Sql.Int, data.EvolveSubItem_ActualItemID)
                .input('EvolveSubItem_SubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_SubItem_ID)

                .input('EvolveSubItem_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSubItem_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveSubItem SET EvolveSubItem_ActualItemID = @EvolveSubItem_ActualItemID, EvolveSubItem_SubItem_ID = @EvolveSubItem_SubItem_ID, EvolveSubItem_UpdatedAt = @EvolveSubItem_UpdatedAt, EvolveSubItem_UpdateUser = @EvolveSubItem_UpdateUser WHERE EvolveSubItem_ID = @EvolveSubItem_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1437: Error while updating Sub Item "+error.message);
            return new Error(" EERR1437: Error while updating Sub Item "+error.message);
        }
    },



}


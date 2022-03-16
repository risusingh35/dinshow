'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemGroupListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

            .query("SELECT COUNT(ei.EvolveItem_ID) as count  FROM EvolveItem ei LEFT OUTER JOIN EvolveProcessTemp ept ON ept.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id LEFT OUTER JOIN EvolveSerial es ON es.EvolveSerial_ID = ei.EvolveSerial_ID LEFT OUTER JOIN EvolveItemGroup eig ON eig.EvolveItemGroup_ID = ei.EvolveItemGroup_ID LEFT OUTER JOIN EvolveUom uom ON uom.EvolveUom_ID  = ei.EvolveUom_ID WHERE ei.EvolveItem_Code LIKE @search ")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getItemsList: async function (start ,length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start',Evolve.Sql.Int,start)
                .input('length',Evolve.Sql.Int,length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

                .query("SELECT ei.* , ept.EvolveProcessTemp_Name , es.EvolveSerial_SeqID , eig.EvolveItemGroup_Name, uom.EvolveUom_Uom, eloc.EvolveLocation_Name, eu.EvolveUnit_Name FROM EvolveItem ei LEFT OUTER JOIN EvolveProcessTemp ept ON ept.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id LEFT OUTER JOIN EvolveSerial es ON es.EvolveSerial_ID = ei.EvolveSerial_ID LEFT OUTER JOIN EvolveItemGroup eig ON eig.EvolveItemGroup_ID = ei.EvolveItemGroup_ID LEFT OUTER JOIN EvolveUom uom ON uom.EvolveUom_ID  = ei.EvolveUom_ID LEFT OUTER JOIN EvolveLocation eloc ON eloc.EvolveLocation_ID = ei.EvolveLocation_ID LEFT OUTER JOIN EvolveUnit eu ON eu.EvolveUnit_ID = ei.EvolveItem_UnitID WHERE ei.EvolveItem_Code LIKE @search ORDER BY ei.EvolveItem_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting Item List "+error.message);
            return new Error(" EERR1240: Error while getting Item List "+error.message);
        }
    },

    deleteItem: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.id)
                .query('DELETE FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1241: Error while deleting Item "+error.message);
            return new Error(" EERR1241: Error while deleting Item "+error.message);
        }
    },

    checkItemExist: async function (EvolveItem_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveItem_Code", Evolve.Sql.NVarChar, EvolveItem_Code)
                .query("SELECT EvolveItem_ID FROM EvolveItem WHERE EvolveItem_Code LIKE @EvolveItem_Code");
        } catch (error) {
            Evolve.Log.error(" EERR1242: Error while checking Item Exist "+error.message);
            return new Error(" EERR1242: Error while checking Item Exist "+error.message);
        }
    },

    addItem: async function (data) {
        try {

            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveItem_Code', Evolve.Sql.NVarChar, data['Item Code'])
                .input('EvolveItem_Desc', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveItem_Type', Evolve.Sql.NVarChar, data['Item Type'])
                .input('EvolveItem_load_capacity', Evolve.Sql.NVarChar, data['Load Capacity'])
                .input('EvolveUom_ID', Evolve.Sql.NVarChar, data['Unit of Measure'])

                .input('EvolveItem_CustPart', Evolve.Sql.NVarChar, data['Cust Part'])
                .input('EvolveItem_InventoryTrackable', Evolve.Sql.NVarChar, data['Inventory Trackable'])
                .input('EvolveItem_IsScan', Evolve.Sql.Bit, data['Is Scan'])

                .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveItem_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveItem_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveItem_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('INSERT INTO EvolveItem (EvolveItem_Code , EvolveItem_Desc ,EvolveItem_InventoryTrackable , EvolveItem_IsScan,EvolveItem_Type, EvolveItem_CustPart,EvolveItem_load_capacity,EvolveItem_CreatedAt,EvolveItem_CreatedUser,EvolveItem_UpdateAt , EvolveItem_UpdateUser,EvolveUom_ID ) VALUES(@EvolveItem_Code , @EvolveItem_Desc, @EvolveItem_InventoryTrackable ,@EvolveItem_IsScan,@EvolveItem_Type, @EvolveItem_CustPart,@EvolveItem_load_capacity,@EvolveItem_CreatedAt,@EvolveItem_CreatedUser,@EvolveItem_UpdateAt , @EvolveItem_UpdateUser , @EvolveUom_ID)')
        } catch (error) {
            Evolve.Log.error(" EERR1243: Error while adding Item "+error.message);
            return new Error(" EERR1243: Error while adding Item "+error.message);
        }
    },

    updateItem: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.NVarChar, data['EvolveItem_ID'])
                .input('EvolveItem_Code', Evolve.Sql.NVarChar, data['Item Code'])
                .input('EvolveItem_Desc', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveItem_Type', Evolve.Sql.NVarChar, data['Item Type'])
                .input('EvolveItem_load_capacity', Evolve.Sql.NVarChar, data['Load Capacity'])
                .input('EvolveUom_ID', Evolve.Sql.NVarChar, data['Unit of Measure'])

                .input('EvolveItem_CustPart', Evolve.Sql.NVarChar, data['Cust Part'])
                .input('EvolveItem_InventoryTrackable', Evolve.Sql.NVarChar, data['Inventory Trackable'])
                .input('EvolveItem_IsScan', Evolve.Sql.NVarChar, data['Is Scan'])

                .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveItem_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveItem SET EvolveItem_Code = @EvolveItem_Code , EvolveItem_Desc = @EvolveItem_Desc, EvolveItem_Type = @EvolveItem_Type, EvolveItem_load_capacity = @EvolveItem_load_capacity, EvolveItem_CustPart = @EvolveItem_CustPart, EvolveItem_InventoryTrackable = @EvolveItem_InventoryTrackable, EvolveItem_IsScan = @EvolveItem_IsScan,  EvolveItem_UpdateAt = @EvolveItem_UpdateAt , EvolveItem_UpdateUser = @EvolveItem_UpdateUser WHERE EvolveItem_ID = @EvolveItem_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1244: Error while updating Item "+error.message);
            return new Error(" EERR1244: Error while updating Item "+error.message);
        }
    },

    updateItemTolerance : async function (EvolveItem_ID, tolerence) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
            .input('EvolveItem_Tolerence', Evolve.Sql.Int, tolerence)
            .query(" UPDATE EvolveItem SET EvolveItem_Tolerence = @EvolveItem_Tolerence WHERE EvolveItem_ID = @EvolveItem_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error In Updating Item "+error.message);
            return new Error(" EERR####: Error In Updating Item "+error.message);
        }
    },

    getItemsDTCount: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveItem_ID) AS count FROM EvolveItem");
        } catch (error) {
            Evolve.Log.error(" EERR1245: Error getting Items DT Count "+error.message);
            return new Error(" EERR1245: Error getting Items DT Count "+error.message);
        }
    },
    getItemsDTList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('startFrom', Evolve.Sql.Int, data.startFrom)
                .input('displayRecord', Evolve.Sql.Int, data.displayRecord)
                .query("SELECT * FROM EvolveItem ORDER BY EvolveItem_ID desc OFFSET @startFrom ROWS FETCH NEXT @displayRecord ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1246: Error while getting Items DT List "+error.message);
            return new Error(" EERR1246: Error while getting Items DT List "+error.message);
        }
    },

}
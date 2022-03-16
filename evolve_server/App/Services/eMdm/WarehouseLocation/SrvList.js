'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getWarehouseList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveWarehouse_ID, EvolveWarehouse_Code FROM EvolveWarehouse')
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while get Warehouse List " + error.message);
            return new Error(" EERR#### Error while get Warehouse List " + error.message);
        }
    },

    getLocGroupList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveLocationGroup_Code, EvolveLocationGroup_ID FROM EvolveLocationGroup')
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while get Loc Group List " + error.message);
            return new Error(" EERR#### Error while get Loc Group List " + error.message);
        }
    },

    getUomList : async function(){
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveUom_ID, EvolveUom_Uom FROM EvolveUom')
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while get Uom List " + error.message);
            return new Error(" EERR#### Error while get Uom List " + error.message);
        }
    },


    getErpLocationList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveLocation_ID, EvolveLocation_Code FROM EvolveLocation WHERE EvolveLocation_Type = 'ERP'")
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while get Location List " + error.message);
            return new Error(" EERR#### Error while get Location List " + error.message);
        }
    },
    getParentLocationDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .query("SELECT el.EvolveLocation_ID, el.EvolveLocation_Capacity, el.EvolveInvStatus_ID, eis.EvolveInvStatus_Code, euom.EvolveUom_ID, euom.EvolveUom_Uom, elg.EvolveLocationGroup_ID, elg.EvolveLocationGroup_Code, el.EvolveLocation_Height, el.EvolveLocation_Length, el.EvolveLocation_Width, eduom.EvolveUom_Uom as 'DimensionUom', eduom.EvolveUom_ID as 'EvolveLocation_DimensionUom_ID', el.EvolveLocation_PercentFull FROM EvolveLocation el LEFT JOIN EvolveInvStatus eis ON eis.EvolveInvStatus_ID = el.EvolveInvStatus_ID LEFT JOIN EvolveUom euom ON euom.EvolveUom_ID = el.EvolveUom_ID LEFT JOIN EvolveLocationGroup elg ON elg.EvolveLocationGroup_ID = el.EvolveLocationGroup_ID LEFT JOIN EvolveUom eduom ON eduom.EvolveUom_ID = el.EvolveLocation_DimensionUom_ID WHERE EvolveLocation_ID = @EvolveLocation_ID")
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while get Parent Location Details " + error.message);
            return new Error(" EERR#### Error while get Parent Location Details " + error.message);
        }
    },

    addWarehouseLocation: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveLocation_Type', Evolve.Sql.NVarChar, 'EVOLVE')

                .input('EvolveLocation_Code', Evolve.Sql.NVarChar, data.EvolveLocation_Code)
                .input('EvolveLocation_Desc', Evolve.Sql.NVarChar, data.EvolveLocation_Desc)
                .input('EvolveWarehouse_ID', Evolve.Sql.Int, data.EvolveWarehouse_ID)
                .input('EvolveLocation_ParentID', Evolve.Sql.Int, data.EvolveLocation_ParentID)
                .input('EvolveLocation_Capacity', Evolve.Sql.NVarChar, data.EvolveLocation_Capacity)
                .input('EvolveInvStatus_ID', Evolve.Sql.Int, data.EvolveInventoryStatus_ID)
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveLocationGroup_ID', Evolve.Sql.Int, data.EvolveLocationGroup_ID)
                .input('EvolveLocation_Height', Evolve.Sql.NVarChar, data.EvolveLocation_Height)
                .input('EvolveLocation_Length', Evolve.Sql.NVarChar, data.EvolveLocation_Length)
                .input('EvolveLocation_Width', Evolve.Sql.NVarChar, data.EvolveLocation_Width)
                .input('EvolveLocation_DimensionUom_ID', Evolve.Sql.Int, data.EvolveLocation_DimensionUom_ID)
                .input('EvolveLocation_PercentFull', Evolve.Sql.NVarChar, data.EvolveLocation_PercentFull)

                .input('EvolveLocation_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLocation_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveLocation_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLocation_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveLocation (EvolveLocation_Type , EvolveLocation_Code, EvolveLocation_Desc, EvolveWarehouse_ID, EvolveLocation_ParentID, EvolveLocation_Capacity, EvolveInvStatus_ID, EvolveUom_ID, EvolveLocationGroup_ID, EvolveLocation_Height, EvolveLocation_Length, EvolveLocation_Width, EvolveLocation_DimensionUom_ID, EvolveLocation_PercentFull, EvolveLocation_CreatedAt, EvolveLocation_CreatedUser, EvolveLocation_UpdatedAt, EvolveLocation_UpdatedUser) VALUES (@EvolveLocation_Type , @EvolveLocation_Code, @EvolveLocation_Desc, @EvolveWarehouse_ID, @EvolveLocation_ParentID, @EvolveLocation_Capacity, @EvolveInvStatus_ID, @EvolveUom_ID, @EvolveLocationGroup_ID, @EvolveLocation_Height, @EvolveLocation_Length, @EvolveLocation_Width, @EvolveLocation_DimensionUom_ID, @EvolveLocation_PercentFull, @EvolveLocation_CreatedAt, @EvolveLocation_CreatedUser, @EvolveLocation_UpdatedAt, @EvolveLocation_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Create Location "+error.message);
            return new Error(" EERR####: Error while Create Location "+error.message);
        }
    },

    getWarehouseLocationListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(el.EvolveLocation_ID) as count FROM EvolveLocation el LEFT JOIN EvolveInvStatus eis ON eis.EvolveInvStatus_ID = el.EvolveInvStatus_ID LEFT JOIN EvolveUom euom ON euom.EvolveUom_ID = el.EvolveUom_ID LEFT JOIN EvolveLocationGroup elg ON elg.EvolveLocationGroup_ID = el.EvolveLocationGroup_ID LEFT JOIN EvolveWarehouse ewh ON ewh.EvolveWarehouse_ID = el.EvolveWarehouse_ID WHERE el.EvolveLocation_Code LIKE @search OR  eis.EvolveInvStatus_Code LIKE @search OR ewh.EvolveWarehouse_Code LIKE @search  ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Location List "+error.message);
            return new Error(" EERR####: Error while get Location List "+error.message);
        }
    },

    getWarehouseLocationList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT el.EvolveLocation_Type , el.EvolveLocation_ID, el.EvolveLocation_Code, el.EvolveLocation_Desc, el.EvolveLocation_Capacity, el.EvolveInvStatus_ID, eis.EvolveInvStatus_Code, euom.EvolveUom_ID, euom.EvolveUom_Uom, elg.EvolveLocationGroup_ID, elg.EvolveLocationGroup_Code, el.EvolveLocation_Height, el.EvolveLocation_Length, el.EvolveLocation_Width, el.EvolveLocation_PercentFull, ewh.EvolveWarehouse_Code, (SELECT EvolveLocation_Code FROM EvolveLocation WHERE el.EvolveLocation_ParentID = EvolveLocation_ID) as 'System_Loc' FROM EvolveLocation el LEFT JOIN EvolveInvStatus eis ON eis.EvolveInvStatus_ID = el.EvolveInvStatus_ID LEFT JOIN EvolveUom euom ON euom.EvolveUom_ID = el.EvolveUom_ID LEFT JOIN EvolveLocationGroup elg ON elg.EvolveLocationGroup_ID = el.EvolveLocationGroup_ID LEFT JOIN EvolveWarehouse ewh ON ewh.EvolveWarehouse_ID = el.EvolveWarehouse_ID WHERE el.EvolveLocation_Code LIKE @search OR  eis.EvolveInvStatus_Code LIKE @search OR ewh.EvolveWarehouse_Code LIKE @search ORDER BY el.EvolveLocation_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Location list"+error.message);
            return new Error(" EERR####: Error while get Location list"+error.message);
        }
    },

    getSingleWarehouseLocationDetails: async function (data) {
        try {
            console.log("data==",data)
            return await Evolve.SqlPool.request()
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .query("SELECT el.EvolveLocation_ID, el.EvolveLocation_Code ,  el.EvolveLocation_Desc ,  el.EvolveLocation_ParentID, el.EvolveWarehouse_ID ,   el.EvolveLocation_Capacity, el.EvolveInvStatus_ID, eis.EvolveInvStatus_Code, euom.EvolveUom_ID, euom.EvolveUom_Uom, elg.EvolveLocationGroup_ID, elg.EvolveLocationGroup_Code, el.EvolveLocation_Height, el.EvolveLocation_Length, el.EvolveLocation_Width, eduom.EvolveUom_Uom as 'DimensionUom', eduom.EvolveUom_ID as 'EvolveLocation_DimensionUom_ID', el.EvolveLocation_PercentFull FROM EvolveLocation el LEFT JOIN EvolveInvStatus eis ON eis.EvolveInvStatus_ID = el.EvolveInvStatus_ID LEFT JOIN EvolveUom euom ON euom.EvolveUom_ID = el.EvolveUom_ID LEFT JOIN EvolveLocationGroup elg ON elg.EvolveLocationGroup_ID = el.EvolveLocationGroup_ID LEFT JOIN EvolveUom eduom ON eduom.EvolveUom_ID = el.EvolveLocation_DimensionUom_ID WHERE EvolveLocation_ID = @EvolveLocation_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single Location details "+error.message);
            return new Error(" EERR####: Error while get single Location details "+error.message);
        }
    },
    
    updateWarehouseLocation: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveLocation_Type', Evolve.Sql.NVarChar, 'EVOLVE')

                .input('EvolveLocation_ID', Evolve.Sql.NVarChar, data.EvolveLocation_ID)
                .input('EvolveLocation_Code', Evolve.Sql.NVarChar, data.EvolveLocation_Code)
                .input('EvolveLocation_Desc', Evolve.Sql.NVarChar, data.EvolveLocation_Desc)
                .input('EvolveWarehouse_ID', Evolve.Sql.Int, data.EvolveWarehouse_ID)
                .input('EvolveLocation_ParentID', Evolve.Sql.Int, data.EvolveLocation_ParentID)
                .input('EvolveLocation_Capacity', Evolve.Sql.NVarChar, data.EvolveLocation_Capacity)
                .input('EvolveInvStatus_ID', Evolve.Sql.Int, data.EvolveInventoryStatus_ID)
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveLocationGroup_ID', Evolve.Sql.Int, data.EvolveLocationGroup_ID)
                .input('EvolveLocation_Height', Evolve.Sql.NVarChar, data.EvolveLocation_Height)
                .input('EvolveLocation_Length', Evolve.Sql.NVarChar, data.EvolveLocation_Length)
                .input('EvolveLocation_Width', Evolve.Sql.NVarChar, data.EvolveLocation_Width)
                .input('EvolveLocation_DimensionUom_ID', Evolve.Sql.Int, data.EvolveLocation_DimensionUom_ID)
                .input('EvolveLocation_PercentFull', Evolve.Sql.NVarChar, data.EvolveLocation_PercentFull)

                .input('EvolveLocation_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLocation_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolveLocation SET EvolveLocation_Type = @EvolveLocation_Type , EvolveLocation_Code = @EvolveLocation_Code, EvolveLocation_Desc = @EvolveLocation_Desc, EvolveWarehouse_ID = @EvolveWarehouse_ID, EvolveLocation_ParentID = @EvolveLocation_ParentID, EvolveLocation_Capacity = @EvolveLocation_Capacity, EvolveInvStatus_ID = @EvolveInvStatus_ID, EvolveUom_ID = @EvolveUom_ID, EvolveLocationGroup_ID = @EvolveLocationGroup_ID, EvolveLocation_Height = @EvolveLocation_Height, EvolveLocation_Length = @EvolveLocation_Length, EvolveLocation_Width = @EvolveLocation_Width, EvolveLocation_DimensionUom_ID = @EvolveLocation_DimensionUom_ID, EvolveLocation_PercentFull = @EvolveLocation_PercentFull, EvolveLocation_UpdatedAt = @EvolveLocation_UpdatedAt, EvolveLocation_UpdatedUser = @EvolveLocation_UpdatedUser  WHERE EvolveLocation_ID=@EvolveLocation_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update Location "+error.message);
            return new Error(" EERR####: Error while Update Location "+error.message);
        }
    },

    genericService: async function (data) {
        try {

            let query ="SELECT "+data.fieldName+" FROM  "+data.tableName+" WHERE "+data.matchField+" = '"+data.value+"'" ; 
            console.log("query/???" , query)
    
            return await Evolve.SqlPool.request()
                .query(query);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get data from  general  service"+error.message);
            return new Error(" EERR####: Error while get data from  general  service"+error.message);
        }
    },

    addErpLocation: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLocation_Code', Evolve.Sql.NVarChar, data.EvolveLocation_Code)
                .input('EvolveLocation_Desc', Evolve.Sql.NVarChar, data.EvolveLocation_Desc)
                .input('EvolveLocation_Type', Evolve.Sql.NVarChar, data.EvolveLocation_Type)

                .input('EvolveWarehouse_ID', Evolve.Sql.Int, data.EvolveWarehouse_ID)
                .input('EvolveLocation_ParentID', Evolve.Sql.Int, null)
                .input('EvolveLocation_Capacity', Evolve.Sql.NVarChar, data.EvolveLocation_Capacity)
                .input('EvolveInvStatus_ID', Evolve.Sql.Int, data.EvolveInvStatus_ID)
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveLocationGroup_ID', Evolve.Sql.Int, null)
                .input('EvolveLocation_Height', Evolve.Sql.NVarChar, data.EvolveLocation_Height)
                .input('EvolveLocation_Length', Evolve.Sql.NVarChar, data.EvolveLocation_Length)
                .input('EvolveLocation_Width', Evolve.Sql.NVarChar, data.EvolveLocation_Width)
                .input('EvolveLocation_DimensionUom_ID', Evolve.Sql.Int, data.EvolveLocation_DimensionUom_ID)
                .input('EvolveLocation_PercentFull', Evolve.Sql.NVarChar, data.EvolveLocation_PercentFull)

                .input('EvolveLocation_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLocation_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveLocation_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLocation_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveLocation (EvolveLocation_Code, EvolveLocation_Desc,EvolveLocation_Type , EvolveWarehouse_ID, EvolveLocation_ParentID, EvolveLocation_Capacity, EvolveInvStatus_ID, EvolveUom_ID, EvolveLocationGroup_ID, EvolveLocation_Height, EvolveLocation_Length, EvolveLocation_Width, EvolveLocation_DimensionUom_ID, EvolveLocation_PercentFull, EvolveLocation_CreatedAt, EvolveLocation_CreatedUser, EvolveLocation_UpdatedAt, EvolveLocation_UpdatedUser) VALUES (@EvolveLocation_Code, @EvolveLocation_Desc,@EvolveLocation_Type , @EvolveWarehouse_ID, @EvolveLocation_ParentID, @EvolveLocation_Capacity, @EvolveInvStatus_ID, @EvolveUom_ID, @EvolveLocationGroup_ID, @EvolveLocation_Height, @EvolveLocation_Length, @EvolveLocation_Width, @EvolveLocation_DimensionUom_ID, @EvolveLocation_PercentFull, @EvolveLocation_CreatedAt, @EvolveLocation_CreatedUser, @EvolveLocation_UpdatedAt, @EvolveLocation_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Create Location "+error.message);
            return new Error(" EERR####: Error while Create Location "+error.message);
        }
    },


}
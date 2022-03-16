'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    // list
    getWarehouseListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(' SELECT COUNT(EvolveWareHouse_ID) as count  FROM EvolveWareHouse ew LEFT JOIN EvolveUom euom ON ew.EvolveUom_ID = euom.EvolveUom_ID LEFT JOIN EvolveUnit eu ON ew.EvolveUnit_ID = eu.EvolveUnit_ID WHERE ew.EvolveWareHouse_Code LIKE @search ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Warehouse List Count "+error.message);
            return new Error(" EERR####: Error while getting Warehouse List Count "+error.message);
        }
    },

    getWarehouseList : async function (start, length ,search) {
        try {
            
            return await Evolve.SqlPool.request()
            .input('start', Evolve.Sql.Int, start)
            .input('length', Evolve.Sql.Int, length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(" SELECT ew.*, euom.EvolveUom_Uom, eu.EvolveUnit_Code FROM EvolveWareHouse ew LEFT JOIN EvolveUom euom ON ew.EvolveUom_ID = euom.EvolveUom_ID LEFT JOIN EvolveUnit eu ON ew.EvolveUnit_ID = eu.EvolveUnit_ID WHERE EvolveWareHouse_Code LIKE @search ORDER BY ew.EvolveWareHouse_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get Warehouse list "+error.message);
            return new Error(" EERR####: Error in get Warehouse list "+error.message);
        }
    },

    // Add / Edit

    evolveUnitList : async function () {
        try {
            
            return await Evolve.SqlPool.request()
            .query(" SELECT * FROM EvolveUnit ORDER BY EvolveUnit_ID DESC ");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get unit list "+error.message);
            return new Error(" EERR####: Error in get unit list "+error.message);
        }
    },

    evolveUomList : async function () {
        try {
            
            return await Evolve.SqlPool.request()
            .query(" SELECT * FROM EvolveUom ORDER BY EvolveUom_ID DESC ");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get uom list "+error.message);
            return new Error(" EERR####: Error in get uom list "+error.message);
        }
    },

    getSingelWarehouseDataEdit : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveWarehouse_ID', Evolve.Sql.Int, data.EvolveWarehouse_ID)
            .query(" SELECT * FROM EvolveWareHouse WHERE EvolveWareHouse_ID = @EvolveWarehouse_ID ");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get singel warehouse data "+error.message);
            return new Error(" EERR####: Error in get singel warehouse data "+error.message);
        }
    },

    addWarehouse: async function (data) {
        let date = new Date();
        let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveWarehouse_Code', Evolve.Sql.NVarChar, data.EvolveWarehouse_Code)
            .input('EvolveWarehouse_Description', Evolve.Sql.NVarChar, data.EvolveWarehouse_Description)
            .input('EvolveWarehouse_Address', Evolve.Sql.NVarChar, data.EvolveWarehouse_Address)
            .input('EvolveWarehouse_Capacity', Evolve.Sql.Int, data.EvolveWarehouse_Capacity)
            .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
            .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
            .input('EvolveWarehouse_IsActive', Evolve.Sql.Bit, data.EvolveWarehouse_IsActive)
            .input('EvolveWarehouse_CreatedUser', Evolve.Sql.Int, data.EvolveWarehouse_CreatedUser)
            .input('EvolveWarehouse_CreatedAt', Evolve.Sql.NVarChar,dateTime)
            .input('EvolveWarehouse_UpdatedUser', Evolve.Sql.Int, data.EvolveWarehouse_UpdatedUser)
            .input('EvolveWarehouse_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
            .query(" INSERT INTO EvolveWarehouse (EvolveWarehouse_Code, EvolveWarehouse_Description, EvolveWarehouse_Address, EvolveWarehouse_Capacity, EvolveUnit_ID, EvolveUom_ID, EvolveWarehouse_IsActive, EvolveWarehouse_CreatedUser, EvolveWarehouse_CreatedAt, EvolveWarehouse_UpdatedUser, EvolveWarehouse_UpdatedAt) VALUES (@EvolveWarehouse_Code, @EvolveWarehouse_Description, @EvolveWarehouse_Address, @EvolveWarehouse_Capacity, @EvolveUnit_ID, @EvolveUom_ID, @EvolveWarehouse_IsActive, @EvolveWarehouse_CreatedUser, @EvolveWarehouse_CreatedAt, @EvolveWarehouse_UpdatedUser, @EvolveWarehouse_UpdatedAt) ");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in add warehouse data "+error.message);
            return new Error(" EERR####: Error in add warehouse data "+error.message);
        }
    },

    editWarehouse : async function (data) {
        let date = new Date();
        let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        try {
            return await Evolve.SqlPool.request()
          .input('EvolveWarehouse_ID', Evolve.Sql.Int, data.EvolveWarehouse_ID)
          .input('EvolveWarehouse_Code', Evolve.Sql.NVarChar, data.EvolveWarehouse_Code)
          .input('EvolveWarehouse_Description', Evolve.Sql.NVarChar, data.EvolveWarehouse_Description)
          .input('EvolveWarehouse_Address', Evolve.Sql.NVarChar, data.EvolveWarehouse_Address)
          .input('EvolveWarehouse_Capacity', Evolve.Sql.Int, data.EvolveWarehouse_Capacity)
          .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
          .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
          .input('EvolveWarehouse_IsActive', Evolve.Sql.Bit, data.EvolveWarehouse_IsActive)
          .input('EvolveWarehouse_CreatedUser', Evolve.Sql.Int, data.EvolveWarehouse_CreatedUser)
          .input('EvolveWarehouse_CreatedAt', Evolve.Sql.NVarChar, dateTime)
          .input('EvolveWarehouse_UpdatedUser', Evolve.Sql.Int, data.EvolveWarehouse_UpdatedUser)
          .input('EvolveWarehouse_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
          .query(" UPDATE EvolveWarehouse SET EvolveWarehouse_Code = @EvolveWarehouse_Code, EvolveWarehouse_Description = @EvolveWarehouse_Description, EvolveWarehouse_Address = @EvolveWarehouse_Address, EvolveWarehouse_Capacity = @EvolveWarehouse_Capacity, EvolveUnit_ID = @EvolveUnit_ID, EvolveUom_ID = @EvolveUom_ID, EvolveWarehouse_IsActive = @EvolveWarehouse_IsActive, EvolveWarehouse_CreatedUser = @EvolveWarehouse_CreatedUser, EvolveWarehouse_CreatedAt = @EvolveWarehouse_CreatedAt, EvolveWarehouse_UpdatedUser = @EvolveWarehouse_UpdatedUser, EvolveWarehouse_UpdatedAt = @EvolveWarehouse_UpdatedAt WHERE EvolveWarehouse_ID=@EvolveWarehouse_ID ");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in edit warehouse data "+error.message);
            return new Error(" EERR####: Error in edit warehouse data "+error.message);
        }
    },






}
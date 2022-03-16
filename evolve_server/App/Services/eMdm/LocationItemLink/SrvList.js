'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemSearch: async function (search) {
        try {
            let query = "SELECT EvolveItem_Code as title, EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE '%" + search + "%'"
            return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getLocationList: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT el.*, elg.EvolveLocationGroup_Name , smt.EvolveStatusCodeMstr_Code FROM EvolveLocation el LEFT JOIN EvolveLocationGroup elg ON el.EvolveLocationGroup_ID = elg.EvolveLocationGroup_ID LEFT JOIN EvolveStatusCodeMstr smt ON el.EvolveStatusCodeMstr_Id = smt.EvolveStatusCodeMstr_Id  WHERE el.EvolveLocation_Name LIKE @search OR el.EvolveLocation_Code LIKE @search ORDER BY el.EvolveLocation_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getSingleItemDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
            .query("SELECT ei.EvolveItem_Desc, ei.EvolveLocation_ID, el.EvolveLocation_Code FROM EvolveItem ei LEFT JOIN EvolveLocation el ON ei.EvolveLocation_ID = el.EvolveLocation_ID WHERE EvolveItem_ID = @EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getSingleLocationDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
            .query("SELECT el.* ,(SELECT EvolveUom_Uom FROM EvolveUom WHERE EvolveUom_ID = el.EvolveUom_ID) as 'EvolveUom_Uom', (SELECT EvolveUom_Uom FROM EvolveUom WHERE EvolveUom_ID = el.EvolveLocation_DimensionUom_ID) as 'DimensionUom' FROM EvolveLocation el WHERE el.EvolveLocation_ID = @EvolveLocation_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    AddLocationItemLink: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
            .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
            .query("UPDATE EvolveItem SET EvolveLocation_ID = @EvolveLocation_ID WHERE EvolveItem_ID = @EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    
}
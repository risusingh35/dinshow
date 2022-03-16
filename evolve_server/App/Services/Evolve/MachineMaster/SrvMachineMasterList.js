'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMachineMasterCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
          .query("select count(em.EvolveMachine_ID) as count from EvolveMachine em LEFT JOIN EvolveSection_Code es on es.EvolveSection_ID = em.EvolveSection_ID  LEFT JOIN EvolveLocation el on el.EvolveLocation_ID = em.EvolveLocation_ID LEFT JOIN EvolveUom eu on eu.EvolveUom_ID = em.EvolveMachine_CapacityUomID where (em.EvolveMachine_Code LIKE @search or em.EvolveMachine_Desc LIKE @search or el.EvolveLocation_Code LIKE @search or es.EvolveSection_Code LIKE @search)")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },

    getmachineMasterList: async function (start, length,search) {
        try {

            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
                .query("select em.* , es.EvolveSection_Code , el.EvolveLocation_Code , eu.EvolveUom_Uom from EvolveMachine em LEFT JOIN EvolveSection_Code es on es.EvolveSection_ID = em.EvolveSection_ID  LEFT JOIN EvolveLocation el on el.EvolveLocation_ID = em.EvolveLocation_ID LEFT JOIN EvolveUom eu on eu.EvolveUom_ID = em.EvolveMachine_CapacityUomID where (em.EvolveMachine_Code LIKE @search or em.EvolveMachine_Desc LIKE @search or el.EvolveLocation_Code LIKE @search or es.EvolveSection_Code LIKE @search) order by em.EvolveMachine_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1301: Error while getting machine Master List "+error.message);
            return new Error(" EERR1301: Error while getting machine Master List "+error.message);
        }
    },

    addMachineMaster: async function (data) {
        try {
            let date = new Date();
            let datetime =  date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

            return await Evolve.SqlPool.request()
                .input('EvolveMachine_Code', Evolve.Sql.NVarChar, data.EvolveMachine_Code)
                .input('EvolveMachine_Desc', Evolve.Sql.NVarChar, data.EvolveMachine_Desc)
                .input('EvolveMachine_Capacity', Evolve.Sql.NVarChar, data.EvolveMachine_Capacity)
                .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveMachine_CapacityUomID', Evolve.Sql.Int, data.EvolveMachine_CapacityUomID)
                .input('EvolveMachine_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvovleMachine_CreatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvolveMachine_UpdatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvovleMachine_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query('INSERT INTO EvolveMachine (EvolveMachine_Code ,EvolveMachine_Desc ,EvolveMachine_Capacity ,EvolveSection_ID,EvolveLocation_ID,EvolveMachine_CapacityUomID,EvolveMachine_CreatedAt,EvovleMachine_CreatedUser,EvolveMachine_UpdatedUser,EvovleMachine_UpdatedAt)VALUES (@EvolveMachine_Code,@EvolveMachine_Desc,@EvolveMachine_Capacity,@EvolveSection_ID,@EvolveLocation_ID,@EvolveMachine_CapacityUomID,@EvolveMachine_CreatedAt,@EvovleMachine_CreatedUser,@EvolveMachine_UpdatedUser,@EvovleMachine_UpdatedAt);select @@IDENTITY AS \'inserted_id\' ');

        } catch (error) {
            Evolve.Log.error(" EERR1300: Error while adding Machine Master "+error.message);
            return new Error(" EERR1300: Error while adding Machine Master "+error.message);
        }
    },

    selectSingleMachine: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .query("select *  from EvolveMachine  where EvolveMachine_ID = @EvolveMachine_ID"); 
        } catch (error) {
            Evolve.Log.error(" EERR1303: Error while selecting Single Master "+error.message);
            return new Error(" EERR1303: Error while selecting Single Master "+error.message);
        }
    },

    updateMachineMaster: async function (data) {
        try {
            let date = new Date();
            let datetime =  date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

            return await Evolve.SqlPool.request()
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveMachine_Code', Evolve.Sql.NVarChar, data.EvolveMachine_Code)
                .input('EvolveMachine_Desc', Evolve.Sql.NVarChar, data.EvolveMachine_Desc)
                .input('EvolveMachine_Capacity', Evolve.Sql.NVarChar, data.EvolveMachine_Capacity)
                .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveMachine_CapacityUomID', Evolve.Sql.Int, data.EvolveMachine_CapacityUomID)
                .input('EvolveMachine_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvovleMachine_CreatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvolveMachine_UpdatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvovleMachine_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query('UPDATE EvolveMachine SET EvolveMachine_Code=@EvolveMachine_Code ,EvolveMachine_Desc =@EvolveMachine_Desc ,EvolveMachine_Capacity=@EvolveMachine_Capacity,EvolveSection_ID=@EvolveSection_ID,EvolveLocation_ID=@EvolveLocation_ID,EvolveMachine_CapacityUomID=@EvolveMachine_CapacityUomID,EvolveMachine_UpdatedUser=@EvolveMachine_UpdatedUser,EvovleMachine_UpdatedAt=@EvovleMachine_UpdatedAt  WHERE EvolveMachine_ID=@EvolveMachine_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1300: Error while Update Machine Master "+error.message);
            return new Error(" EERR1300: Error while Update Machine Master "+error.message);
        }
    },


    getAllLocation: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveLocation");
        } catch (error) {
            Evolve.Log.error(" EERR2480 :Error while getting Location  "+error.message);
            return new Error(" EERR2480 :Error while getting Location  "+error.message);
        }
    },

    getAllSection: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveSection");
        } catch (error) {
            Evolve.Log.error(" EERR2480 :Error while getting Section  "+error.message);
            return new Error(" EERR2480 :Error while getting Section  "+error.message);
        }
    },

    getAllUom: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveUom");
        } catch (error) {
            Evolve.Log.error(" EERR2480 :Error while getting Uom "+error.message);
            return new Error(" EERR2480 :Error while getting Uom "+error.message);
        }
    },

}
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    
    getPrinterListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
          .query("SELECT COUNT(EvolvePrinter_ID) as count FROM EvolvePrinter ep, EvolveUnit eu WHERE ep.EvolveUnit_ID = eu.EvolveUnit_ID AND ep.EvolvePrinter_Name LIKE @search")
        } catch (error) {
            Evolve.Log.error(" EERR32667: Error while getting Printer List Count "+error.message);
            return new Error(" EERR32667: Error while getting Printer List Count "+error.message);
        }
    },

    getPrinterList: async function (start, length,search) {
        try {
            console.log(search , 'search string');
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT ep.*, eu.EvolveUnit_Code, eu.evolveUnit_ID FROM EvolvePrinter ep, EvolveUnit eu WHERE ep.EvolveUnit_ID = eu.EvolveUnit_ID AND ep.EvolvePrinter_Name LIKE @search ORDER BY ep.EvolvePrinter_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR32668: Error while getting Printer List "+error.message);
            return new Error(" EERR32668: Error while getting Printer List "+error.message);
        }
    },

    getUnitId : async function (EvolveUnit_Code) {
        try{
             return await Evolve.SqlPool.request()
            .input('EvolveUnit_Code', Evolve.Sql.NVarChar, EvolveUnit_Code)
            .query('SELECT EvolveUnit_ID FROM EvolveUnit WHERE EvolveUnit_Code = @EvolveUnit_Code')
        }catch (error) {
        Evolve.Log.error(" EERR32669: Error while get unit id "+error.message);
        return new Error(" EERR32669: Error while get unit id "+error.message);
    }
    },

    addPrinter: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrinter_Name', Evolve.Sql.NVarChar, data.EvolvePrinter_Name)
                .input('EvolvePrinter_Code', Evolve.Sql.NVarChar, data.EvolvePrinter_Code)
                .input('EvolvePrinter_Desc', Evolve.Sql.NVarChar, data.EvolvePrinter_Desc)
                .input('EvolvePrinter_Type', Evolve.Sql.NVarChar, data.EvolvePrinter_Type)
                .input('EvolvePrinter_Copy', Evolve.Sql.Int, (data.EvolvePrinter_Copy == '' || data.EvolvePrinter_Copy == null ? 0 : data.EvolvePrinter_Copy))
                .input('EvolvePrinter_SubType', Evolve.Sql.NVarChar, data.EvolvePrinter_SubType)
                .input('EvolvePrinter_IP', Evolve.Sql.NVarChar, data.EvolvePrinter_IP)
                .input('EvolvePrinter_Port', Evolve.Sql.Int, data.EvolvePrinter_Port)
                .input('EvolvePrinter_pcName', Evolve.Sql.NVarChar, data.EvolvePrinter_pcName)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolvePrinter_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrinter_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolvePrinter_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrinter_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolvePrinter (EvolvePrinter_Name, EvolvePrinter_Code, EvolvePrinter_Desc, EvolvePrinter_Type, EvolvePrinter_IP, EvolvePrinter_Port, EvolvePrinter_pcName, EvolveUnit_ID, EvolvePrinter_CreatedAt, EvolvePrinter_CreatedUser, EvolvePrinter_UpdatedAt, EvolvePrinter_UpdatedUser, EvolvePrinter_Copy, EvolvePrinter_SubType) VALUES (@EvolvePrinter_Name, @EvolvePrinter_Code, @EvolvePrinter_Desc, @EvolvePrinter_Type, @EvolvePrinter_IP,  @EvolvePrinter_Port, @EvolvePrinter_pcName, @EvolveUnit_ID, @EvolvePrinter_CreatedAt, @EvolvePrinter_CreatedUser, @EvolvePrinter_UpdatedAt, @EvolvePrinter_UpdatedUser, @EvolvePrinter_Copy, @EvolvePrinter_SubType)');
        } catch (error) {
            Evolve.Log.error(" EERR32670: Error while adding Printer " + error.message);
            return new Error(" EERR32670: Error while adding Printer " + error.message);
        }
    },

    editPrinter: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrinter_ID', Evolve.Sql.NVarChar, data.EvolvePrinter_ID)
                .input('EvolvePrinter_Name', Evolve.Sql.NVarChar, data.EvolvePrinter_Name)
                .input('EvolvePrinter_Code', Evolve.Sql.NVarChar, data.EvolvePrinter_Code)
                .input('EvolvePrinter_Desc', Evolve.Sql.NVarChar, data.EvolvePrinter_Desc)
                .input('EvolvePrinter_Type', Evolve.Sql.NVarChar, data.EvolvePrinter_Type)
                .input('EvolvePrinter_Copy', Evolve.Sql.Int, (data.EvolvePrinter_Copy == '' || data.EvolvePrinter_Copy == null ? 0 : data.EvolvePrinter_Copy))
                .input('EvolvePrinter_SubType', Evolve.Sql.NVarChar, data.EvolvePrinter_SubType)
                .input('EvolvePrinter_IP', Evolve.Sql.NVarChar, data.EvolvePrinter_IP)
                .input('EvolvePrinter_Port', Evolve.Sql.Int, data.EvolvePrinter_Port)
                .input('EvolvePrinter_pcName', Evolve.Sql.NVarChar, data.EvolvePrinter_pcName)
                .input('EvolveUnit_ID', Evolve.Sql.NVarChar, data.EvolveUnit_ID)
                .input('EvolvePrinter_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrinter_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolvePrinter SET EvolvePrinter_Name = @EvolvePrinter_Name, EvolvePrinter_Code = @EvolvePrinter_Code, EvolvePrinter_Desc = @EvolvePrinter_Desc, EvolvePrinter_Type = @EvolvePrinter_Type, EvolvePrinter_IP = @EvolvePrinter_IP, EvolvePrinter_Port = @EvolvePrinter_Port, EvolvePrinter_pcName = @EvolvePrinter_pcName, EvolveUnit_ID = @EvolveUnit_ID, EvolvePrinter_UpdatedAt = @EvolvePrinter_UpdatedAt, EvolvePrinter_UpdatedUser = @EvolvePrinter_UpdatedUser, EvolvePrinter_Copy = @EvolvePrinter_Copy, EvolvePrinter_SubType = @EvolvePrinter_SubType WHERE EvolvePrinter_ID = @EvolvePrinter_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32671: Error while updating Printer " + error.message);
            return new Error(" EERR32671: Error while updating Printer " + error.message);
        }
    },

    getSingelPrinterData: async function (EvolvePrinter_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePrinter_ID', Evolve.Sql.Int, EvolvePrinter_ID)
                .query('SELECT ep.*, eu.EvolveUnit_Code FROM EvolvePrinter ep, EvolveUnit eu WHERE ep.EvolveUnit_ID = eu.EvolveUnit_ID AND EvolvePrinter_ID = @EvolvePrinter_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32672: Error while getting Single Printer Data "+error.message);
            return new Error(" EERR32672: Error while getting Single Printer Data "+error.message);
        }
    },

    deletePrinter: async function (EvolvePrinter_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePrinter_ID', Evolve.Sql.Int, EvolvePrinter_ID)
                .query('DELETE FROM EvolvePrinter WHERE EvolvePrinter_ID =@EvolvePrinter_ID')
        } catch (error) {
            Evolve.Log.error(" EERR32673: Error while deleting Printer "+error.message);
            return new Error(" EERR32673: Error while deleting Printer "+error.message);
        }
    },

    getUnitList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query(" SELECT EvolveUnit_ID, EvolveUnit_Name FROM EvolveUnit ");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting Unit List "+error.message);
            return new Error(" EERR1240: Error while getting Unit List "+error.message);
        }
    },

}
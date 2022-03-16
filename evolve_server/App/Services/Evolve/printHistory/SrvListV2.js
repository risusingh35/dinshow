'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    
    getAllPrinter : async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT * FROM EvolvePrinter")
        } catch (error) {
            Evolve.Log.error(" EERR32679: Error while  Reprint Online Label "+error.message);
            return new Error(" EERR32679: Error while  Reprint Online Label "+error.message);
        }
    },

    getPrintProcessHistoryCount : async function (condition, search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(eph.EvolvePrintHistory_ID) as count FROM EvolvePrintHistoryDetails ephd, EvolvePrintHistory eph LEFT JOIN EvolveUser eu ON eu.EvolveUser_ID = eph.EvolvePrintHistory_CreatedUser WHERE ephd.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND (ephd.EvolvePrintHistoryDetails_Key = 'PDI' OR ephd.EvolvePrintHistoryDetails_Key = 'FGMF') AND ephd.EvolvePrintHistoryDetails_Value LIKE @search "+ condition); 
        } catch (error) {
            Evolve.Log.error(" EERR32677: Error while  getting Print History Count "+error.message);
            return new Error(" EERR32677: Error while  getting Print History Count "+error.message);
        }
    },

    getPrintProcessHistory : async function (start, length, condition , search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT eph.*, convert(varchar, eph.EvolvePrintHistory_CreatedAt, 120) as 'CreateDate', eu.EvolveUser_Name, ephd.EvolvePrintHistoryDetails_Key, ephd.EvolvePrintHistoryDetails_Value FROM EvolvePrintHistoryDetails ephd, EvolvePrintHistory eph LEFT JOIN EvolveUser eu ON eu.EvolveUser_ID = eph.EvolvePrintHistory_CreatedUser WHERE ephd.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND (ephd.EvolvePrintHistoryDetails_Key = 'PDI' OR ephd.EvolvePrintHistoryDetails_Key = 'FGMF') AND ephd.EvolvePrintHistoryDetails_Value LIKE @search "+ condition +" ORDER BY eph.EvolvePrintHistory_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY" )
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  get print history "+error.message);
            return new Error(" EERR####: Error while  get print history "+error.message);
        }
    },

    getSinglePrintHistory : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintHistory_ID', Evolve.Sql.Int, data.EvolvePrintHistory_ID)
        .query("SELECT * FROM EvolvePrintHistory WHERE EvolvePrintHistory_ID = @EvolvePrintHistory_ID") 
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  getting print History Data"+error.message);
            return new Error(" EERR####: Error while  getting print History Data"+error.message);
        }
    },
    rePrintProcess : async function (data, table) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolvePrinter_ID', Evolve.Sql.Int, data.EvolvePrinter_ID)
            .input('EvolvePrintProcess_Data', Evolve.Sql.NVarChar, table.EvolvePrintHistory_Data)
            .input('EvolvePrintProcess_Status', Evolve.Sql.NVarChar, 'PROCESS')
            .input('EvolvePrintHistory_ID', Evolve.Sql.NVarChar, table.EvolvePrintHistory_ID)
            .input('EvolvePrintProcess_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcess_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
       .query(" INSERT INTO EvolvePrintProcess (EvolvePrinter_ID, EvolvePrintProcess_Data, EvolvePrintProcess_Status, EvolvePrintHistory_ID, EvolvePrintProcess_CreatedUser, EvolvePrintProcess_CreatedAt, EvolvePrintProcess_UpdatedUser, EvolvePrintProcess_UpdatedAt) VALUES (@EvolvePrinter_ID, @EvolvePrintProcess_Data, @EvolvePrintProcess_Status, @EvolvePrintHistory_ID, @EvolvePrintProcess_CreatedUser, @EvolvePrintProcess_CreatedAt, @EvolvePrintProcess_UpdatedUser, @EvolvePrintProcess_UpdatedAt);select @@IDENTITY AS \'inserted_id\' ") 
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  insert dat in to print process while reprint "+error.message);
            return new Error(" EERR####: Error while  insert dat in to print process while reprint "+error.message);
        }
    },

    getSinglePrintHistoryDetails : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintHistory_ID', Evolve.Sql.Int, data.EvolvePrintHistory_ID)
            .query("SELECT * FROM EvolvePrintHistoryDetails WHERE EvolvePrintHistory_ID = @EvolvePrintHistory_ID") 
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  getting print History Details Data"+error.message);
            return new Error(" EERR####: Error while  getting print History Detail Data"+error.message);
        }
    },

    rePrintProcessDetail : async function (data, table) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolvePrintProcess_ID', Evolve.Sql.Int, data.EvolvePrintProcess_ID)
            .input('EvolvePrintProcessDetails_Key', Evolve.Sql.NVarChar, table.EvolvePrintHistoryDetails_Key)
            .input('EvolvePrintProcessDetails_Value', Evolve.Sql.NVarChar, table.EvolvePrintHistoryDetails_Value)
            .input('EvolvePrintProcessDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcessDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolvePrintProcessDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcessDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
       .query(" INSERT INTO EvolvePrintProcessDetails (EvolvePrintProcess_ID, EvolvePrintProcessDetails_Key, EvolvePrintProcessDetails_Value, EvolvePrintProcessDetails_CreatedUser, EvolvePrintProcessDetails_CreatedAt, EvolvePrintProcessDetails_UpdatedUser, EvolvePrintProcessDetails_UpdatedAt) VALUES (@EvolvePrintProcess_ID, @EvolvePrintProcessDetails_Key, @EvolvePrintProcessDetails_Value, @EvolvePrintProcessDetails_CreatedUser, @EvolvePrintProcessDetails_CreatedAt, @EvolvePrintProcessDetails_UpdatedUser, @EvolvePrintProcessDetails_UpdatedAt) ") 
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  insert reprint label process details "+error.message);
            return new Error(" EERR####: Error while  insert reprint label process details "+error.message);
        }
    },
}


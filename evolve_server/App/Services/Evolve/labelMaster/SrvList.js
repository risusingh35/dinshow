'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllLabelListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("  SELECT count(EvolveSticker_ID) as count FROM  EvolveSticker WHERE EvolveSticker_Name LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR32636: Error while  getting Label Master List Count "+error.message);
            return new Error(" EERR32636: Error while  getting Label Master List Count "+error.message);
        }
    },

    getAllLabelList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(" SELECT es.* ,ess.EvolveStickerSize_Wdt, ess.EvolveStickerSize_Ht FROM EvolveSticker es LEFT JOIN EvolveStickerSize ess ON es.EvolveStickerSize_ID = ess.EvolveStickerSize_ID WHERE EvolveSticker_Name LIKE @search ORDER BY EvolveSticker_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");

        } catch (error) {
            Evolve.Log.error(" EERR32637: Error while  getting Label Master List "+error.message);
            return new Error(" EERR32637: Error while  getting Label Master List "+error.message);
        }
    },

    addNewLabel: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveSticker_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveSticker_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveSticker_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveSticker_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveSticker_Name', Evolve.Sql.NVarChar, data.EvolveSticker_Name)
                .input('EvolveSticker_Desc', Evolve.Sql.NVarChar, data.EvolveSticker_Desc)
                .query(" INSERT INTO EvolveSticker (EvolveSticker_Name, EvolveSticker_Desc, EvolveSticker_CreatedAt, EvolveSticker_CreatedUser, EvolveSticker_UpdatedAt, EvolveSticker_UpdatedUser) VALUES (@EvolveSticker_Name, @EvolveSticker_Desc, @EvolveSticker_CreatedAt, @EvolveSticker_CreatedUser, @EvolveSticker_UpdatedAt, @EvolveSticker_UpdatedUser) ");

        } catch (error) {
            Evolve.Log.error(" EERR32638: Error while  Adding Label "+error.message);
            return new Error(" EERR32638: Error while  Adding Label "+error.message);
        }
    },

    deleteLabel: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSticker_ID', Evolve.Sql.Int, data.EvolveSticker_ID)
                .query(" DELETE FROM EvolveSticker WHERE EvolveSticker_ID = @EvolveSticker_ID ");

        } catch (error) {
            Evolve.Log.error(" EERR32639: Error while  Deleting Label "+error.message);
            return new Error(" EERR32639: Error while  Deleting Label "+error.message);
        }
    },

    getAllVariables: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSticker_ID', Evolve.Sql.Int, data.EvolveSticker_ID)
                .query(" SELECT * FROM EvolveStickerVar WHERE EvolveSticker_ID = @EvolveSticker_ID ");

        } catch (error) {
            Evolve.Log.error(" EERR32640: Error while  Getting Variables "+error.message);
            return new Error(" EERR32640: Error while Getting Variables"+error.message);
        }
    },

    deleteVariable: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveStickerVar_ID', Evolve.Sql.Int, data.EvolveStickerVar_ID)
                .query(" DELETE FROM EvolveStickerVar WHERE EvolveStickerVar_ID = @EvolveStickerVar_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32641: Error while  Delete Variable "+error.message);
            return new Error(" EERR32641: Error while Delete Variable"+error.message);
        }
    },

    addNewVariable: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveStickerVar_Key', Evolve.Sql.NVarChar, data.EvolveStickerVar_Key)
            .input('EvolveStickerVar_Value', Evolve.Sql.NVarChar, data.EvolveStickerVar_Value)
            .input('EvolveStickerVar_DummyValue', Evolve.Sql.NVarChar, data.EvolveStickerVar_DummyValue)
            .input('EvolveSticker_ID', Evolve.Sql.Int, data.EvolveSticker_ID)
            .input('EvolveStickerVar_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
            .input('EvolveStickerVar_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveStickerVar_CreatedAt', Evolve.Sql.NVarChar, dataTime)
            .input('EvolveStickerVar_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
       .query(" INSERT INTO EvolveStickerVar (EvolveStickerVar_Key, EvolveStickerVar_Value, EvolveStickerVar_DummyValue,  EvolveSticker_ID, EvolveStickerVar_CreatedAt, EvolveStickerVar_CreatedUser, EvolveStickerVar_UpdatedAt, EvolveStickerVar_UpdatedUser) VALUES (@EvolveStickerVar_Key, @EvolveStickerVar_Value, @EvolveStickerVar_DummyValue, @EvolveSticker_ID, @EvolveStickerVar_CreatedAt, @EvolveStickerVar_CreatedUser, @EvolveStickerVar_UpdatedAt, @EvolveStickerVar_UpdatedUser)");
        } catch (error) {
            Evolve.Log.error(" EERR32642: Error while  Add New Variable "+error.message);
            return new Error(" EERR32642: Error while Add New Variable"+error.message);
        }
    },

    getPrinterList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolvePrinter_ID , EvolvePrinter_Name , EvolvePrinter_Type FROM EvolvePrinter")
        } catch (error) {
            Evolve.Log.error(" EERR32643: Error while  Getting Printer List "+error.message);
            return new Error(" EERR32643: Error while Getting Printer List"+error.message);
            
        }
    },

    getLabelSizeList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveStickerSize_ID, EvolveStickerSize_Name, EvolveStickerSize_Wdt, EvolveStickerSize_Ht, EvolveStickerSize_UOM FROM EvolveStickerSize")
        } catch (error) {
            Evolve.Log.error(" EERR32644: Error while  Getting Label Size List "+error.message);
            return new Error(" EERR32644: Error while Getting Label Size List"+error.message);
            
        }
    },

    removeLabelSize: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveStickerSize_ID', Evolve.Sql.Int, data.EvolveStickerSize_ID)
                .query(" DELETE FROM EvolveStickerSize WHERE EvolveStickerSize_ID = @EvolveStickerSize_ID ")
        } catch (error) {
            Evolve.Log.error(" EERR32645: Error while  Removing Label Size"+error.message);
            return new Error(" EERR32645: Error while Removing Label Size"+error.message);
            
        }
    },

    addLabelSize: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveStickerSize_Name', Evolve.Sql.NVarChar, data.EvolveStickerSize_Name)
                .input('EvolveStickerSize_Wdt', Evolve.Sql.Float, data.EvolveStickerSize_Wdt)
                .input('EvolveStickerSize_Ht', Evolve.Sql.Float, data.EvolveStickerSize_Ht)
                .input('EvolveStickerSize_UOM', Evolve.Sql.NVarChar, data.EvolveStickerSize_UOM)
                .input('EvolveStickerSize_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveStickerSize_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveStickerSize_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveStickerSize_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query(" INSERT INTO EvolveStickerSize (EvolveStickerSize_Name, EvolveStickerSize_Wdt, EvolveStickerSize_Ht, EvolveStickerSize_UOM, EvolveStickerSize_CreatedAt, EvolveStickerSize_CreatedUser, EvolveStickerSize_UpdatedAt, EvolveStickerSize_UpdatedUser) VALUES (@EvolveStickerSize_Name, @EvolveStickerSize_Wdt, @EvolveStickerSize_Ht, @EvolveStickerSize_UOM, @EvolveStickerSize_CreatedAt, @EvolveStickerSize_CreatedUser, @EvolveStickerSize_UpdatedAt, @EvolveStickerSize_UpdatedUser) ")
        } catch (error) {
            Evolve.Log.error(" EERR32646: Error while  Adding Label Size "+error.message);
            return new Error(" EERR32646: Error while Adding Label Size "+error.message);
            
        }
    },

    getItemsToLabel: async function (EvolveSticker_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSticker_ID', Evolve.Sql.Int, EvolveSticker_ID)
                .query(" SELECT * FROM EvolveStickerToItem WHERE EvolveSticker_ID = @EvolveSticker_ID ")
        } catch (error) {
            Evolve.Log.error(" EERR32647: Error while  Getting Items To Label "+error.message);
            return new Error(" EERR32647: Error while Getting Items To Label "+error.message);
            
        }
    },

    getFinalVariableValue: async function (itemToLabelList, itemColumnName) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, itemToLabelList)
                .query(` SELECT ${itemColumnName} FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID `)
        } catch (error) {
            Evolve.Log.error(" EERR32648: Error while  Getting Final Variable Value "+error.message);
            return new Error(" EERR32648: Error while Getting Final Variable Value "+error.message);
            
        }
    },

    getLabelSizeById: async function (EvolveStickerSize_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveStickerSize_ID', Evolve.Sql.Int, EvolveStickerSize_ID)
                .query(` SELECT EvolveStickerSize_Wdt, EvolveStickerSize_Ht, EvolveStickerSize_UOM FROM EvolveStickerSize WHERE EvolveStickerSize_ID = @EvolveStickerSize_ID `)
        } catch (error) {
            Evolve.Log.error(" EERR32649: Error while  Getting Label Size By ID "+error.message);
            return new Error(" EERR32649: Error while Getting Label Size By ID "+error.message);
            
        }
    },

    saveLabelDesign: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveSticker_ID', Evolve.Sql.Int, data.EvolveSticker_ID)
                .input('EvolveSticker_Dpmm', Evolve.Sql.NVarChar, data.EvolveSticker_Dpmm)
                .input('EvolveSticker_Code', Evolve.Sql.NVarChar, data.EvolveSticker_Code)
                .input('EvolveStickerSize_ID', Evolve.Sql.Int, data.EvolveStickerSize_ID)
                .input('EvolveSticker_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveSticker_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolveSticker SET EvolveSticker_Dpmm = @EvolveSticker_Dpmm , EvolveSticker_Code = @EvolveSticker_Code , EvolveStickerSize_ID = @EvolveStickerSize_ID , EvolveSticker_UpdatedAt = @EvolveSticker_UpdatedAt , EvolveSticker_UpdatedUser = @EvolveSticker_UpdatedUser WHERE EvolveSticker_ID = @EvolveSticker_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32650: Error while  Saving Label Design "+error.message);
            return new Error(" EERR32650: Error while Saving Label Design "+error.message);
            
        }
    },

    getAllZplCmdList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveStickerCmd")
        } catch (error) {
            Evolve.Log.error(" EERR32651: Error while  Get Zpl Command List "+error.message);
            return new Error(" EERR32651: Error while Get Zpl Command List "+error.message);
            
        }
    },

    getAllZplCmdParamList: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveStickerCmd_ID', Evolve.Sql.Int, id)
                .query("SELECT * FROM EvolveStickerCmdParams WHERE EvolveStickerCmd_ID = @EvolveStickerCmd_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32652: Error while  Get Zpl Command Param List "+error.message);
            return new Error(" EERR32652: Error while Get Zpl Command Param List "+error.message);
            
        }
    },

    printLabel : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ZplCode', Evolve.Sql.NVarChar, data.EvolvePrintProcess_ZplCode)
                .input('EvolvePrintProcess_Status', Evolve.Sql.Int, 0)
                .input('EvolvePrinter_ID', Evolve.Sql.Int, data.EvolvePrinter_ID)
                .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolvePrintProcess_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintProcess_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("INSERT INTO EvolvePrintProcess (EvolvePrintProcess_ZplCode , EvolvePrintProcess_Status , EvolvePrinter_ID , EvolvePrintProcess_UpdatedAt , EvolvePrintProcess_UpdatedUser , EvolvePrintProcess_CreatedAt , EvolvePrintProcess_CreatedUser) VALUES (@EvolvePrintProcess_ZplCode , @EvolvePrintProcess_Status , @EvolvePrinter_ID , @EvolvePrintProcess_UpdatedAt , @EvolvePrintProcess_UpdatedUser , @EvolvePrintProcess_CreatedAt , @EvolvePrintProcess_CreatedUser)")
        } catch (error) {
            Evolve.Log.error(" EERR32652: Error while  Print Label "+error.message);
            return new Error(" EERR32652: Error while Print Label "+error.message);
            
        }
    }


}
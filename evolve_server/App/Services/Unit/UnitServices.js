'use strict';
const Evolve = require('../../../Boot/Evolve');
module.exports = {


    getLotNumber: async function (data) {
        try {
            let lotCounter = await Evolve.SqlPool.request().query("SELECT EvolveSFLotNbrCounter FROM EvolveSFSetting");

            if (lotCounter instanceof Error || lotCounter.rowsAffected < 1) {
                return new Error('Error In Get Lot Number');
            }

            let lotNumber = lotCounter.recordset[0].EvolveSFLotNbrCounter;
            lotNumber = lotNumber + 1;
            let lotNumberUpdates = await Evolve.SqlPool.request()
                .input('EvolveSFLotNbrCounter', Evolve.Sql.Int, lotNumber)
                .query("UPDATE EvolveSFSetting SET EvolveSFLotNbrCounter = @EvolveSFLotNbrCounter")
            if (lotNumberUpdates instanceof Error || lotNumberUpdates.rowsAffected < 1) {
                return new Error('Error In Update LotNumber');
            }

            let dateObj = new Date();
            let month = dateObj.getUTCMonth() + 1; //months from 1-12
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear().toString().substr(-2)
            if (month == 10) {
                month = 'X';
            } else if (month == 11) {
                month = 'Y';
            } else if (month == 12) {
                month = 'Z';
            }
            let newdate = day + "" + month + "" + year; //28219 
            lotNumber = "LOT" + newdate + "" + lotNumber //WO292190001

            return lotNumber;

        } catch (error) {
            Evolve.Log.error(" EERR2063: Error while getting Lot Number "+error.message);
            return new Error(" EERR2063: Error while getting Lot Number "+error.message);
        }
    },

    getUnitConfigValue: async function (EvolveUnitConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnitConfig_Key', Evolve.Sql.NVarChar, EvolveUnitConfig_Key)
                .query("SELECT EvolveUnitConfig_Value FROM EvolveUnitConfig WHERE EvolveUnitConfig_Key =@EvolveUnitConfig_Key");
        } catch (error) {
            Evolve.Log.error(" EERR2064: Error while getting Unit Config Value "+error.message);
            return new Error(" EERR2064: Error while getting Unit Config Value "+error.message);
        }
    },

    updateUnitConfigValue: async function (EvolveUnitConfig_Key, EvolveUnitConfig_Value) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnitConfig_Key', Evolve.Sql.NVarChar, EvolveUnitConfig_Key)
                .input('EvolveUnitConfig_Value', Evolve.Sql.NVarChar, EvolveUnitConfig_Value)
                .query("UPDATE EvolveUnitConfig SET EvolveUnitConfig_Value = @EvolveUnitConfig_Value WHERE EvolveUnitConfig_Key =@EvolveUnitConfig_Key");
        } catch (error) {
            Evolve.Log.error(" EERR2065: Error while updating Unit Config Value "+error.message);
            return new Error(" EERR2065: Error while updating Unit Config Value "+error.message);
        }
    },


    getWeightScaleId: async function (EvolveDevice_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_ID', Evolve.Sql.NVarChar, EvolveDevice_ID)
                .query("SELECT EvolveDevice_Code,EvolveDevice_API FROM EvolveDevice WHERE EvolveDevice_ID =@EvolveDevice_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2066: Error while getting Weight Scale Id "+error.message);
            return new Error(" EERR2066: Error while getting Weight Scale Id "+error.message);
        }
    },

    getPrinterList: async function (data) {
        try {

            return await Evolve.SqlPool.request().query("SELECT ed.EvolveDevice_ID,ed.EvolveDevice_Name FROM EvolveDevice ed,EvolveDeviceType edt WHERE ed.EvolveDeviceType_ID = edt.EvolveDeviceType_ID AND edt.EvolveDevice_Code = 'PRINTER'");

        } catch (error) {
            Evolve.Log.error(" EERR2067: Error while getting Printer List "+error.message);
            return new Error(" EERR2067: Error while getting Printer List "+error.message);
        }
    },

    getScaleList: async function (data) {
        try {
            return await Evolve.SqlPool.request().query("SELECT ed.EvolveDevice_ID,ed.EvolveDevice_Name FROM EvolveDevice ed,EvolveDeviceType edt WHERE ed.EvolveDeviceType_ID = edt.EvolveDeviceType_ID AND edt.EvolveDevice_Code = 'SCALE'");
        } catch (error) {
            Evolve.Log.error(" EERR2068: Error while getting Scale List "+error.message);
            return new Error(" EERR2068: Error while getting Scale List "+error.message);
        }
    },

    addTranstionHistory: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            // let date = new Date();
            // let datetime =  date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            let EvolveTransType = await Evolve.SqlPool.request()
                .query("SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_Code = '" + data.EvolveTranstype_code + "'");

            return await Evolve.SqlPool.request()
                .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveApplication_ID', Evolve.Sql.Int, data.EvolveApplication_ID)
                .input('EvolveTransitionHistory_TypeID', Evolve.Sql.Int, EvolveTransType.recordset[0].EvolveTranstype_ID)
                .input('EvolveTransitionHistory_DocumentID', Evolve.Sql.Int, data.EvolveTransitionHistory_DocumentID)
                .input('EvolveTransitionHistory_DocumentDetailID', Evolve.Sql.Int, data.EvolveTransitionHistory_DocumentDetailID)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveUOM_ID', Evolve.Sql.Int, data.EvolveUOM_ID)
                .input('EvolveInventoryStatus_ID', Evolve.Sql.Int, data.EvolveInventoryStatus_ID)
                .input('EvolveTransitionHistory_AddressID', Evolve.Sql.Int, data.EvolveTransitionHistory_AddressID)
                .input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
                .input('EvolveTransitionHistory_Quantity', Evolve.Sql.Int, data.EvolveTransitionHistory_Quantity)
                .input('EvolveTransitionHistory_createdDatetime', Evolve.Sql.NVarChar, datetime)
                .input('EvolveTransitionHistory_Shiptype', Evolve.Sql.NVarChar, data.EvolveTransitionHistory_Shiptype)
                .input('EvolveTransitionHistory_SequenceId', Evolve.Sql.Int, data.EvolveTransitionHistory_SequenceId)
                .input('EvolveTransitionHistory_UserID', Evolve.Sql.Int, data.EvolveTransitionHistory_UserID)
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveReason_ID', Evolve.Sql.Int, data.EvolveReason_ID)
                .input('EvolveTool_ID', Evolve.Sql.Int, data.EvolveTool_ID)
                .input('EvolveActivity_ID', Evolve.Sql.Int, data.EvolveActivity_ID)
                .input('EvolveTransitionHistory_Description', Evolve.Sql.NVarChar, data.EvolveTransitionHistory_Description)
                .query('INSERT INTO EvolveTranstionHistory (EvolveCompany_ID ,EvolveUnit_ID ,EvolveApplication_ID ,EvolveTransitionHistory_TypeID,EvolveTransitionHistory_DocumentID,EvolveTransitionHistory_DocumentDetailID , EvolveLocation_ID , EvolveItem_ID , EvolveUOM_ID , EvolveInventoryStatus_ID , EvolveTransitionHistory_AddressID , EvolveInventory_ID ,  EvolveTransitionHistory_Quantity , EvolveTransitionHistory_createdDatetime , EvolveTransitionHistory_Shiptype , EvolveTransitionHistory_SequenceId , EvolveTransitionHistory_UserID,EvolveMachine_ID , EvolveReason_ID,EvolveTool_ID,EvolveActivity_ID,EvolveTransitionHistory_Description) VALUES (@EvolveCompany_ID , @EvolveUnit_ID , @EvolveApplication_ID, @EvolveTransitionHistory_TypeID, @EvolveTransitionHistory_DocumentID , @EvolveTransitionHistory_DocumentDetailID , @EvolveLocation_ID , @EvolveItem_ID , @EvolveUOM_ID , @EvolveInventoryStatus_ID  ,  @EvolveTransitionHistory_AddressID , @EvolveInventory_ID , @EvolveTransitionHistory_Quantity , @EvolveTransitionHistory_createdDatetime ,@EvolveTransitionHistory_Shiptype , @EvolveTransitionHistory_SequenceId , @EvolveTransitionHistory_UserID , @EvolveMachine_ID , @EvolveReason_ID ,@EvolveTool_ID,@EvolveActivity_ID,@EvolveTransitionHistory_Description);select @@IDENTITY AS \'inserted_id\'');
        } catch (error) {
            Evolve.Log.error(" EERR2069: Error while adding Transtion History "+error.message);
            return new Error(" EERR2069: Error while adding Transtion History "+error.message);
        }
    },

    addProdOrdersHistory: async function (data, userId) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
                .input('EvolveProdOrders_Order', Evolve.Sql.NVarChar, data.EvolveProdOrders_Order)
                .input('EvolveProdOrderDetails_ID', Evolve.Sql.Int, data.EvolveProdOrdersDetail_ID)
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
                .input('EvolveProdOrderHistoryType_Code', Evolve.Sql.NVarChar, data.EvolveProdOrderHistoryType_Code)
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveItem_Code', Evolve.Sql.NVarChar, data.EvolveItem_Code)
                .input('EvolveProcessTemp_ID', Evolve.Sql.Int, data.EvolveProcessTemp_Id)
                .input('EvolveProcess_ID', Evolve.Sql.Int, data.EvolveProcess_ID)
                .input('EvolveProcess_Value', Evolve.Sql.NVarChar, data.selected_value)
                .input('EvolveProdOrderHistory_NextSeq', Evolve.Sql.Int, data.EvolveProdOrdersDetail_NxtSeq)
                .input('EvolveProdOrderHistory_PrvSeq', Evolve.Sql.Int, data.EvolveProdOrdersDetail_NxtSeq)
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolvePDI_Status', Evolve.Sql.Bit, false)
                .input('EvolveProcessVal_ID', Evolve.Sql.Int, data.EvolveProcessVal_ID)
                .input('EvolveProdOrderHistory_CreatedUser', Evolve.Sql.Int, userId)
                .input('EvolveProdOrderHistory_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveProdOrderHistory_UpdatedUser', Evolve.Sql.Int, userId)
                .input('EvolveProdOrderHistory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveProdOrdersDetails_Status', Evolve.Sql.NVarChar, data.history_status)
                .input('EvolveProdOrdersDetails_Remark', Evolve.Sql.NVarChar, data.remark)
                .input('EvolveProdOrdersDetails_Operator', Evolve.Sql.NVarChar, data.operator)
                .query('INSERT INTO EvolveProdOrdersHistory (EvolveProdOrders_ID , EvolveProdOrders_Order , EvolveProdOrderDetails_ID , EvolveProdOrdersDetail_Serial,EvolveProdOrderHistoryType_Code,EvolveItem_ID,EvolveItem_Code,EvolveProcessTemp_ID,EvolveProcess_ID,EvolveProcess_Value,EvolveProdOrderHistory_NextSeq,EvolveProdOrderHistory_PrvSeq,EvolveMachine_ID,EvolvePDI_Status,EvolveProdOrderHistory_CreatedUser,EvolveProdOrderHistory_CreatedAt,EvolveProdOrderHistory_UpdatedUser,EvolveProdOrderHistory_UpdatedAt,EvolveProcessVal_ID,EvolveProdOrdersDetails_Status,EvolveProdOrdersDetails_Remark,EvolveProdOrdersDetails_Operator) VALUES (@EvolveProdOrders_ID , @EvolveProdOrders_Order,@EvolveProdOrderDetails_ID,@EvolveProdOrdersDetail_Serial,@EvolveProdOrderHistoryType_Code,@EvolveItem_ID,@EvolveItem_Code,@EvolveProcessTemp_ID,@EvolveProcess_ID,@EvolveProcess_Value,@EvolveProdOrderHistory_NextSeq,@EvolveProdOrderHistory_PrvSeq,@EvolveMachine_ID,@EvolvePDI_Status,@EvolveProdOrderHistory_CreatedUser,@EvolveProdOrderHistory_CreatedAt,@EvolveProdOrderHistory_UpdatedUser,@EvolveProdOrderHistory_UpdatedAt,@EvolveProcessVal_ID,@EvolveProdOrdersDetails_Status,@EvolveProdOrdersDetails_Remark,@EvolveProdOrdersDetails_Operator) ;select @@IDENTITY AS \'inserted_id\'');
        } catch (error) {
            Evolve.Log.error(" EERR2070: Error while adding Prod Orders History "+error.message);
            return new Error(" EERR2070: Error while adding Prod Orders History "+error.message);
        }
    },

    updateProdOrdersHistory: async function (data, userId) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrderDetails_ID', Evolve.Sql.Int, data.EvolveProdOrdersDetail_ID)
                .input('EvolveProcess_Value', Evolve.Sql.NVarChar, data.selected_value)
                .input('EvolveProcessVal_ID', Evolve.Sql.Int, data.EvolveProcessVal_ID)
                .input('EvolveProdOrdersDetails_Remark', Evolve.Sql.NVarChar, data.remark)
                .input('EvolveProdOrdersDetails_Operator', Evolve.Sql.NVarChar, data.operator)
                .input('EvolveProdOrdersDetails_Status', Evolve.Sql.NVarChar, data.history_status)
                .input('EvolveProdOrderHistory_UpdatedUser', Evolve.Sql.Int, userId)
                .input('EvolveProdOrderHistory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query('UPDATE EvolveProdOrdersHistory SET EvolveProcess_Value = @EvolveProcess_Value , EvolveProdOrderHistory_UpdatedUser = @EvolveProdOrderHistory_UpdatedUser , EvolveProdOrderHistory_UpdatedAt = @EvolveProdOrderHistory_UpdatedAt , EvolveProdOrdersDetails_Remark = @EvolveProdOrdersDetails_Remark , EvolveProdOrdersDetails_Operator = @EvolveProdOrdersDetails_Operator, EvolveProdOrdersDetails_Status = @EvolveProdOrdersDetails_Status WHERE EvolveProdOrderDetails_ID = @EvolveProdOrderDetails_ID AND  EvolveProcessVal_ID = @EvolveProcessVal_ID ;select @@IDENTITY AS \'inserted_id\'');
        } catch (error) {
            Evolve.Log.error(" EERR2071: Error while updating Prod Orders History "+error.message);
            return new Error(" EERR2071: Error while updating Prod Orders History "+error.message);
        }
    },

    addProdOrdersDetailHistory: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersHistory_id', Evolve.Sql.Int, data.EvolveProdOrdersHistory_id)
                .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
                .input('EvolveProdOrdersVal_id', Evolve.Sql.Int, data.EvolveProdOrdersVal_id)
                .input('EvolveProdOrdersDetailHistory_trtype', Evolve.Sql.NVarChar, data.EvolveProdOrdersDetailHistory_trtype)
                .input('EvolveProdOrdersDetailHistory_prvseq', Evolve.Sql.Int, data.EvolveProdOrdersDetailHistory_prvseq)
                .input('EvolveProdOrdersDetailHistory_crtseq', Evolve.Sql.Int, data.EvolveProdOrdersDetailHistory_crtseq)
                .input('EvolveProdOrdersDetailHistory_result', Evolve.Sql.Int, data.EvolveProdOrdersDetailHistory_result)
                .input('EvolveProdOrdersDetailHistory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveProdOrdersDetailHistory_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .query('INSERT INTO EvolveProdOrdersDetailHistory (EvolveProdOrdersHistory_id,EvolveProdOrders_ID,EvolveProdOrdersVal_id,EvolveProdOrdersDetailHistory_trtype,EvolveProdOrdersDetailHistory_prvseq,EvolveProdOrdersDetailHistory_crtseq,EvolveProdOrdersDetailHistory_result,EvolveProdOrdersDetailHistory_CreatedUser,EvolveProdOrdersDetailHistory_CreatedAt) VALUES (@EvolveProdOrdersHistory_id,@EvolveProdOrders_ID,@EvolveProdOrdersVal_id,@EvolveProdOrdersDetailHistory_trtype,@EvolveProdOrdersDetailHistory_prvseq,@EvolveProdOrdersDetailHistory_crtseq,@EvolveProdOrdersDetailHistory_result,@EvolveProdOrdersDetailHistory_CreatedUser,@EvolveProdOrdersDetailHistory_CreatedAt);select @@IDENTITY AS \'inserted_id\'');
        } catch (error) {
            Evolve.Log.error(" EERR2072: Error while adding Prod Orders Detail History "+error.message);
            return new Error(" EERR2072: Error while adding Prod Orders Detail History "+error.message);
        }
    }

}
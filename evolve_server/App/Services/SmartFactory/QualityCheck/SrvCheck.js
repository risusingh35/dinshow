'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllLocation: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveLocation");
        } catch (error) {
            Evolve.Log.error(" EERR1893: Error while getting All Location "+error.message);
            return new Error(" EERR1893: Error while getting All Location "+error.message);
        }
    },
    getQCLotSerialList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT DISTINCT EvolveInventory_LotNumber FROM EvolveInventory WHERE EvolveInventory_Status = 'QCHOLD' AND EvolveInventory_PostingStatus = 'ERPPOSTED'");
        } catch (error) {
            Evolve.Log.error(" EERR1894: Error while getting QC Lot Serial List "+error.message);
            return new Error(" EERR1894: Error while getting QC Lot Serial List "+error.message);
        }
    },
    getLotTabelData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .query("SELECT einv.EvolveInventory_ID, einv.EvolveInventory_QtyOnHand, einv.EvolveInventory_LotNumber, einv.EvolveInventory_RefNumber, einv.EvolveInventory_CustLotRef, convert(varchar, einv.EvolveInventory_ExpireDateTime, 103) as ExpireDate, eitem.EvolveItem_Code, eitem.EvolveQCTemp_ID, eitem.EvolveQc_IsRequired, euom.EvolveUom_Uom FROM EvolveInventory einv, EvolveItem eitem , EvolveUom euom WHERE einv.EvolveInventory_Status = 'QCHOLD' AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED' AND einv.EvolveInventory_LotNumber = @EvolveInventory_LotNumber AND einv.EvolveItem_ID = eitem.EvolveItem_ID AND eitem.EvolveUom_ID = euom.EvolveUom_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1895: Error while getting Lot Tabel Data "+error.message);
            return new Error(" EERR1895: Error while getting Lot Tabel Data "+error.message);
        }
    },
    getqcTempData: async function (EvolveQCTemp_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveQCTemp_ID", Evolve.Sql.Int, EvolveQCTemp_ID)
                .query("SELECT EvolveQCVal_ID, EvolveQCVal_Desc, EvolveQCVal_Type, EvolveQCVal_Value  FROM EvolveQCVal WHERE EvolveQCTemp_ID = @EvolveQCTemp_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1896: Error while getting qc Temp Data "+error.message);
            return new Error(" EERR1896: Error while getting qc Temp Data "+error.message);
        }
    },
    QCResultData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .query("SELECT einv.EvolveInventory_ID, einv.EvolveInventory_QtyOnHand, einv.EvolveInventory_LotNumber, einv.EvolveInventory_RefNumber, einv.EvolveInventory_CustLotRef, convert(varchar, einv.EvolveInventory_ExpireDateTime, 103) as ExpireDate, eitem.EvolveItem_Code, eitem.EvolveItem_Desc, euom.EvolveUom_Uom, el.EvolveLocation_Name, einv.EvolveLocation_ID, einv.EvolveInventory_Status FROM EvolveInventory einv, EvolveItem eitem , EvolveUom euom, EvolveLocation el WHERE (einv.EvolveInventory_Status = 'REJECT' OR einv.EvolveInventory_Status = 'SAMPLE' OR einv.EvolveInventory_Status = 'DESTROYED' OR einv.EvolveInventory_Status = 'ACCEPTED') AND einv.EvolveInventory_LotNumber = @EvolveInventory_LotNumber AND einv.EvolveItem_ID = eitem.EvolveItem_ID AND eitem.EvolveUom_ID = euom.EvolveUom_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1897: Error while QC Result Data "+error.message);
            return new Error(" EERR1897: Error while QC Result Data "+error.message);
        }
    },

    // Order Number
    getQCOrderNo: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .query("SELECT EvolveQCOrder_Num FROM EvolveQCOrder WHERE EvolveInventory_LotNumber = @EvolveInventory_LotNumber");
        } catch (error) {
            Evolve.Log.error(" EERR1898: Error while getting QC Order No "+error.message);
            return new Error(" EERR1898: Error while getting QC Order No "+error.message);
        }
    },

    // QCO Setting Pallet No
    getQCOSettingPalletNo: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveWMSSetting WHERE EvolveWMS_SettingsPallatePrefix = 'QCO'");
        } catch (error) {
            Evolve.Log.error(" EERR1899: Error while getting QCO Setting Pallet No "+error.message);
            return new Error(" EERR1899: Error while getting QCO Setting Pallet No "+error.message);
        }
    },
    updateNextQCOPalletNum: async function (last_num, id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveWMS_SettingID', Evolve.Sql.Int, id)
                .input('EvolveWMS_SettingsPallateBarEnd', Evolve.Sql.Int, last_num)
                .query('UPDATE EvolveWMSSetting SET EvolveWMS_SettingsPallateBarEnd = @EvolveWMS_SettingsPallateBarEnd WHERE EvolveWMS_SettingID = @EvolveWMS_SettingID');
        } catch (error) {
            Evolve.Log.error(" EERR1900: Error while updating Next QCO Pallet Num "+error.message);
            return new Error(" EERR1900: Error while updating Next QCO Pallet Num "+error.message);
        }
    },
    //end

    // Get NCR Number
    getNCR_Num: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveNCR_Lot_No", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .query("SELECT TOP(1) EvolveNCR_No FROM EvolveNCR WHERE EvolveNCR_Lot_No = @EvolveNCR_Lot_No");
        } catch (error) {
            Evolve.Log.error(" EERR1901: Error while getting NCR Num "+error.message);
            return new Error(" EERR1901: Error while getting NCR Num "+error.message);
        }
    },
    // end
    // Get NCR Number
    CheckNCR_Num: async function (tableData) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveNCR_Lot_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .query("SELECT TOP(1) EvolveNCR_No FROM EvolveNCR WHERE EvolveNCR_Lot_No = @EvolveNCR_Lot_No");
        } catch (error) {
            Evolve.Log.error(" EERR1902: Error while Checking NCR Num "+error.message);
            return new Error(" EERR1902: Error while Checking NCR Num "+error.message);
        }
    },
    // end

    // Start NCR Setting Pallet No
    getNCRSettingPalletNo: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveWMSSetting WHERE EvolveWMS_SettingsPallatePrefix = 'NCR'");
        } catch (error) {
            Evolve.Log.error(" EERR1903: Error while getting NCR Setting Pallet No "+error.message);
            return new Error(" EERR1903: Error while getting NCR Setting Pallet No "+error.message);
        }
    },
    updateNextNCRPalletNum: async function (last_num, id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveWMS_SettingID', Evolve.Sql.Int, id)
                .input('EvolveWMS_SettingsPallateBarEnd', Evolve.Sql.Int, last_num)
                .query('UPDATE EvolveWMSSetting SET EvolveWMS_SettingsPallateBarEnd = @EvolveWMS_SettingsPallateBarEnd WHERE EvolveWMS_SettingID = @EvolveWMS_SettingID');
        } catch (error) {
            Evolve.Log.error(" EERR1904: Error while updating Next NCR Pallet Num "+error.message);
            return new Error(" EERR1904: Error while updating Next NCR Pallet Num "+error.message);
        }
    },
    // end

    // checkQCOLotExists
    checkQCOLotExists: async function (tableData) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .query("SELECT * FROM EvolveQCOrder WHERE EvolveInventory_LotNumber = @EvolveInventory_LotNumber");
        } catch (error) {
            Evolve.Log.error(" EERR1905: Error while checking QCO Lot Exists "+error.message);
            return new Error(" EERR1905: Error while checking QCO Lot Exists "+error.message);
        }
    },
    addQCOrder: async function (data, tableData) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolveQCOrder_Num", Evolve.Sql.NVarChar, data.QCOrderNo)

                .input("EvolveQCOrder_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvolveQCOrder_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveQCOrder_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvolveQCOrder_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveQCOrder (EvolveInventory_LotNumber, EvolveQCOrder_Num, EvolveQCOrder_CreatedAt, EvolveQCOrder_CreatedUser, EvolveQCOrder_UpdatedAt, EvolveQCOrder_UpdatedUser)VALUES (@EvolveInventory_LotNumber, @EvolveQCOrder_Num, @EvolveQCOrder_CreatedAt, @EvolveQCOrder_CreatedUser, @EvolveQCOrder_UpdatedAt, @EvolveQCOrder_UpdatedUser);select @@IDENTITY AS 'inserted_id'");
        } catch (error) {
            Evolve.Log.error(" EERR1906: Error while adding QC Order "+error.message);
            return new Error(" EERR1906: Error while adding QC Order "+error.message);
        }
    },

    addQCOrderDetails: async function (data, tableData) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvovleQCOrder_ID", Evolve.Sql.Int, data.EvovleQCOrder_ID)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolveQC_AcceptedQty", Evolve.Sql.Int, tableData.accepted_Qty)
                .input("EvolveQC_RejectedQty", Evolve.Sql.Int, tableData.reject_Qty)
                .input("EvolveQC_SampleQty", Evolve.Sql.Int, tableData.sample_Qty)
                .input("EvolveQC_DestroyedQty", Evolve.Sql.Int, tableData.destroyed_Qty)
                .input("EvolveQC_Pallet_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_RefNumber)
                .input("EvolveQCOrderDetails_AcceptedLocation_ID", Evolve.Sql.Int, data.Accept_Location_ID)
                .input("EvolveQCOrderDetails_RejectedLocation_ID", Evolve.Sql.Int, data.Reject_Location_ID)
                .input("EvolveQCOrderDetails_HoldLocation_ID", Evolve.Sql.Int, data.holdLocation)
                .input("EvolveQCOrderDetails_Sample_Location_ID", Evolve.Sql.Int, data.Sample_location_ID)
                .input("EvolveQCOrderDetails_Destroyed_Location_ID", Evolve.Sql.Int, data.Destroyed_location_ID)

                .input("EvovleQCOrderDetails_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvovleQCOrderDetails_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvovleQCOrderDetails_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvovleQCOrderDetails_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveQCOrderDetails (EvovleQCOrder_ID, EvolveInventory_LotNumber, EvolveQC_AcceptedQty, EvolveQC_RejectedQty, EvolveQC_SampleQty, EvolveQC_Pallet_No, EvovleQCOrderDetails_CreatedAt, EvovleQCOrderDetails_CreatedUser, EvovleQCOrderDetails_UpdatedAt, EvovleQCOrderDetails_UpdatedUser, EvolveQCOrderDetails_AcceptedLocation_ID, EvolveQCOrderDetails_RejectedLocation_ID, EvolveQCOrderDetails_Sample_Location_ID, EvolveQCOrderDetails_HoldLocation_ID, EvolveQC_DestroyedQty, EvolveQCOrderDetails_Destroyed_Location_ID)VALUES (@EvovleQCOrder_ID, @EvolveInventory_LotNumber, @EvolveQC_AcceptedQty, @EvolveQC_RejectedQty, @EvolveQC_SampleQty, @EvolveQC_Pallet_No, @EvovleQCOrderDetails_CreatedAt, @EvovleQCOrderDetails_CreatedUser, @EvovleQCOrderDetails_UpdatedAt, @EvovleQCOrderDetails_UpdatedUser, @EvolveQCOrderDetails_AcceptedLocation_ID, @EvolveQCOrderDetails_RejectedLocation_ID, @EvolveQCOrderDetails_Sample_Location_ID, @EvolveQCOrderDetails_HoldLocation_ID, @EvolveQC_DestroyedQty, @EvolveQCOrderDetails_Destroyed_Location_ID)");
        } catch (error) {
            Evolve.Log.error(" EERR1907: Error while adding QC Order Details "+error.message);
            return new Error(" EERR1907: Error while adding QC Order Details "+error.message);
        }
    },

    InvPalletCleared: async function (tableData) {
        try {
            let InvPalletCleared = await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.Int, tableData.EvolveInventory_ID)
                .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, 0)
                .query("UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand, EvolveInventory_Status = 'QCCLEARED' WHERE EvolveInventory_ID = @EvolveInventory_ID");

            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.NVarChar, tableData.EvolveInventory_ID)
                .query("SELECT einv.*, eitem.EvolveUom_ID, convert(varchar, einv.EvolveInventory_ExpireDateTime, 120) as ExpireDate FROM EvolveInventory einv, EvolveItem eitem WHERE einv.EvolveInventory_ID = @EvolveInventory_ID AND einv.EvolveItem_ID = eitem.EvolveItem_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1908: Error while Inv Pallet Cleared "+error.message);
            return new Error(" EERR1908: Error while Inv Pallet Cleared "+error.message);
        }
    },

    getTransType_ID: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveTranstype_code", Evolve.Sql.NVarChar, data.EvolveTranstype_Code)
                .query("SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_code = @EvolveTranstype_code");
        } catch (error) {
            Evolve.Log.error(" EERR1909: Error while getting TransType_ID "+error.message);
            return new Error(" EERR1909: Error while getting TransType_ID "+error.message);
        }
    },

    QCInvCreateNewPallet: async function (data, inventoryData) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveCompany_ID", Evolve.Sql.Int, inventoryData.EvolveCompany_ID)
                .input("EvolveUnit_ID", Evolve.Sql.Int, inventoryData.EvolveUnit_ID)
                .input("EvolveItem_ID", Evolve.Sql.Int, inventoryData.EvolveItem_ID)
                .input("EvolveLocation_ID", Evolve.Sql.Int, data.QcLocation)
                .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, data.newPalletQty)
                .input("EvolveInventory_QtyAllocated", Evolve.Sql.Int, inventoryData.EvolveInventory_QtyAllocated)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, inventoryData.EvolveInventory_LotNumber)
                .input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.NewRefNumber)
                .input("EvolveInventory_ExpireDateTime", Evolve.Sql.NVarChar, inventoryData.ExpireDate)
                .input("EvolveInventory_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveInventory_CreatedUser", Evolve.Sql.Int, inventoryData.EvolveInventory_CreatedUser)
                .input("EvolveInventory_Status", Evolve.Sql.NVarChar, data.newPalletStatus)
                .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, inventoryData.EvolveInventory_UpdatedUser)
                .input("EvolveInventory_LotNotes", Evolve.Sql.NVarChar, inventoryData.EvolveInventory_LotNotes)
                .input("EvolveReason_ID", Evolve.Sql.Int, inventoryData.EvolveReason_ID)
                .input("EvolveInventory_CustLotRef", Evolve.Sql.NVarChar, inventoryData.EvolveInventory_CustLotRef)
                .input("EvolveInventory_ReceiptDate", Evolve.Sql.NVarChar, inventoryData.EvolveInventory_ReceiptDate)
                .input("EvolveTranstype_ID", Evolve.Sql.Int, data.EvolveTranstype_ID)
                .input("EvolveInventory_PostingStatus", Evolve.Sql.NVarChar, inventoryData.EvolveInventory_PostingStatus)
                .input("EvolveInventory_LableIsPrint", Evolve.Sql.Bit, inventoryData.EvolveInventory_LableIsPrint)

                .query("INSERT INTO EvolveInventory (EvolveCompany_ID,EvolveUnit_ID,EvolveItem_ID,EvolveLocation_ID,EvolveInventory_QtyOnHand,EvolveInventory_QtyAllocated,EvolveInventory_LotNumber,EvolveInventory_RefNumber,EvolveInventory_ExpireDateTime,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventory_Status,EvolveInventory_UpdatedAt,EvolveInventory_UpdatedUser,EvolveInventory_LotNotes,EvolveReason_ID,EvolveInventory_CustLotRef, EvolveInventory_ReceiptDate, EvolveTranstype_ID, EvolveInventory_PostingStatus, EvolveInventory_LableIsPrint) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveItem_ID,@EvolveLocation_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_QtyAllocated,@EvolveInventory_LotNumber,@EvolveInventory_RefNumber,@EvolveInventory_ExpireDateTime,@EvolveInventory_CreatedAt,@EvolveInventory_CreatedUser,@EvolveInventory_Status,@EvolveInventory_UpdatedAt,@EvolveInventory_UpdatedUser,@EvolveInventory_LotNotes,@EvolveReason_ID, @EvolveInventory_CustLotRef,@EvolveInventory_ReceiptDate, @EvolveTranstype_ID, @EvolveInventory_PostingStatus, @EvolveInventory_LableIsPrint);select @@IDENTITY AS 'inserted_id'");
        } catch (error) {
            Evolve.Log.error(" EERR1910: Error while QC Inv Create New Pallet "+error.message);
            return new Error(" EERR1910: Error while QC Inv Create New Pallet "+error.message);
        }
    },

    addQCClear: async function (data, tableData) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveInventoryFrom_ID", Evolve.Sql.Int, tableData.EvolveInventory_ID)
                .input("EvolveInventoryTo_ID", Evolve.Sql.Int, data.EvolveInventoryTo_ID)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolveQC_Pallet_No", Evolve.Sql.NVarChar, data.NewRefNumber)
                .input("EvolveQCClear_Qty", Evolve.Sql.Int, data.newPalletQty)
                .input("EvolveQCClear_Location_ID", Evolve.Sql.Int, data.QcLocation)
                .input("EvolveQCClear_Status", Evolve.Sql.NVarChar, data.newPalletStatus)

                .input("EvolveQCClear_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveQCClear_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveQCClear_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveQCClear_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveQCClear (EvolveInventoryFrom_ID, EvolveInventoryTo_ID, EvolveInventory_LotNumber, EvolveQC_Pallet_No, EvolveQCClear_Qty, EvolveQCClear_Location_ID, EvolveQCClear_Status, EvolveQCClear_CreatedAt, EvolveQCClear_CreatedUser, EvolveQCClear_UpdatedAt, EvolveQCClear_UpdatedUser )VALUES (@EvolveInventoryFrom_ID, @EvolveInventoryTo_ID, @EvolveInventory_LotNumber, @EvolveQC_Pallet_No, @EvolveQCClear_Qty, @EvolveQCClear_Location_ID, @EvolveQCClear_Status, @EvolveQCClear_CreatedAt, @EvolveQCClear_CreatedUser, @EvolveQCClear_UpdatedAt, @EvolveQCClear_UpdatedUser)");
        } catch (error) {
            Evolve.Log.error(" EERR1911: Error while adding QC Clear "+error.message);
            return new Error(" EERR1911: Error while adding QC Clear "+error.message);
        }
    },

    addQCHistory: async function (data, tableData, param) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveQCVal_ID", Evolve.Sql.Int, param.EvolveQCVal_ID)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolvePallet_ID", Evolve.Sql.Int, data.EvolveInventoryTo_ID)
                .input("EvolveParam_Name", Evolve.Sql.NVarChar, param.param_name)
                .input("EvolveParam_Value", Evolve.Sql.NVarChar, param.param_value)
                .input("EvolveQCHistory_Status", Evolve.Sql.NVarChar, data.newPalletStatus)
                .input("EvolveQC_Pallet_No", Evolve.Sql.NVarChar, data.NewRefNumber)

                .input("EvolveQCHistory_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveQCHistory_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveQCHistory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveQCHistory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveQCHistory (EvolveQCVal_ID, EvolveInventory_LotNumber, EvolvePallet_ID, EvolveParam_Name, EvolveParam_Value, EvolveQCHistory_CreatedAt, EvolveQCHistory_CreatedUser, EvolveQCHistory_UpdatedAt, EvolveQCHistory_UpdatedUser, EvolveQCHistory_Status, EvolveQC_Pallet_No)VALUES (@EvolveQCVal_ID, @EvolveInventory_LotNumber, @EvolvePallet_ID, @EvolveParam_Name, @EvolveParam_Value, @EvolveQCHistory_CreatedAt, @EvolveQCHistory_CreatedUser, @EvolveQCHistory_UpdatedAt, @EvolveQCHistory_UpdatedUser, @EvolveQCHistory_Status, @EvolveQC_Pallet_No)");
        } catch (error) {
            Evolve.Log.error(" EERR1912: Error while adding QC History "+error.message);
            return new Error(" EERR1912: Error while adding QC History "+error.message);
        }
    },

    addNCRNo: async function (data, tableData) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveNCR_No", Evolve.Sql.NVarChar, data.EvolveNCR_No)
                .input("EvolveNCR_Lot_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolveNCR_Qty", Evolve.Sql.NVarChar, tableData.EvolveInventory_QtyOnHand)
                .input("EvolveNCR_Pallet_No", Evolve.Sql.NVarChar, data.NewRefNumber)

                .input("EvolveNCR_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveNCR_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveNCR_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveNCR_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveNCR (EvolveNCR_No, EvolveNCR_Lot_No, EvolveNCR_Qty, EvolveNCR_Pallet_No, EvolveNCR_CreatedAt, EvolveNCR_CreatedUser, EvolveNCR_UpdatedAt, EvolveNCR_UpdatedUser) VALUES (@EvolveNCR_No, @EvolveNCR_Lot_No, @EvolveNCR_Qty, @EvolveNCR_Pallet_No, @EvolveNCR_CreatedAt, @EvolveNCR_CreatedUser, @EvolveNCR_UpdatedAt, @EvolveNCR_UpdatedUser)");
        } catch (error) {
            Evolve.Log.error(" EERR1913: Error while adding NCR No "+error.message);
            return new Error(" EERR1913: Error while adding NCR No "+error.message);
        }
    },

    remainingQtyUpdate: async function (tableData, remainingQty) {
        try {
            let reminUpdate = await Evolve.SqlPool.request()
                .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, remainingQty)
                .input("EvolveInventory_ID", Evolve.Sql.NVarChar, tableData.EvolveInventory_ID)
                .query("UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand WHERE EvolveInventory_ID = @EvolveInventory_ID");

            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.NVarChar, tableData.EvolveInventory_ID)
                .query("SELECT einv.*, eitem.EvolveUom_ID, convert(varchar, einv.EvolveInventory_ExpireDateTime, 120) as ExpireDate FROM EvolveInventory einv, EvolveItem eitem WHERE einv.EvolveInventory_ID = @EvolveInventory_ID AND einv.EvolveItem_ID = eitem.EvolveItem_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1914: Error while remaining Qty Update "+error.message);
            return new Error(" EERR1914: Error while remaining Qty Update "+error.message);
        }
    },

    getQCPalletParamData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveQC_Pallet_No", Evolve.Sql.NVarChar, data.EvolveQC_Pallet_No)
                .query("SELECT * FROM EvolveQCHistory WHERE EvolveQC_Pallet_No = @EvolveQC_Pallet_No");
        } catch (error) {
            Evolve.Log.error(" EERR1915: Error while getting QC Pallet Param Data "+error.message);
            return new Error(" EERR1915: Error while getting QC Pallet Param Data "+error.message);
        }
    },

}

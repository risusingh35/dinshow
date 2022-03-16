'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getSingleItem: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .query("SELECT * FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1247: Error while getting Single Item "+error.message);
            return new Error(" EERR1247: Error while getting Single Item "+error.message);
        }
    },
    getSingleAssignData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .query("SELECT espl.*, esp.EvolveSupplier_Name FROM EvolveItemSupLink espl, EvolveSupplier esp WHERE esp.EvolveSupplier_ID = espl.EvolveSupplier_ID AND espl.EvolveItem_ID = @EvolveItem_ID ");

        } catch (error) {
            Evolve.Log.error(" EERR1248: Error while getting Single Assign Data "+error.message);
            return new Error(" EERR1248: Error while getting Single Assign Data "+error.message);
        }
    },

    getAllQCTemplateList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("select * from EvolveQCTemp");

        } catch (error) {
            Evolve.Log.error(" EERR1249: Error while getting All QC Template List "+error.message);
            return new Error(" EERR1249: Error while getting All QC Template List "+error.message);
        }
    },

    getProcessTemp: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveprocessTemp_ID , EvolveprocessTemp_Name FROM EvolveProcessTemp')
        } catch (error) {
            Evolve.Log.error(" EERR1250: Error while getting Process Temp "+error.message);
            return new Error(" EERR1250: Error while getting Process Temp "+error.message);
        }
    },

    getSerialMaster: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveSerial_ID , EvolveSerial_SeqID FROM EvolveSerial')
        } catch (error) {
            Evolve.Log.error(" EERR1251: Error while getting Serial Master "+error.message);
            return new Error(" EERR1251: Error while getting Serial Master "+error.message);
        }
    },

    getItemGroup: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolveItemGroup')
        } catch (error) {
            Evolve.Log.error(" EERR1252: Error while getting Item Group "+error.message);
            return new Error(" EERR1252: Error while getting Item Group "+error.message);
        }
    },
    getPdiTemplates: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolvePDITemplate')
        } catch (error) {
            Evolve.Log.error(" EERR1253: Error while getting Pdi Templates "+error.message);
            return new Error(" EERR1253: Error while getting Pdi Templates "+error.message);
        }
    },
    createItem: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveItem_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveItem_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveItem_Code', Evolve.Sql.NVarChar, data.EvolveItem_Code)
                .input('EvolveItem_Desc', Evolve.Sql.NVarChar, data.EvolveItem_Desc)
                .input('EvolveProcessTemp_Id', Evolve.Sql.Int, data.EvolveProcessTemp_Id)
                .input('EvolveItem_BrakeNum', Evolve.Sql.NVarChar, data.EvolveItem_BrakeNum)
                .input('EvolveItem_BrakeApprovalNum', Evolve.Sql.NVarChar, data.EvolveItem_BrakeApprovalNum)
                .input('EvolveItem_Type', Evolve.Sql.NVarChar, data.EvolveItem_Type)
                .input('EvolveItem_CustomizeNum', Evolve.Sql.NVarChar, data.EvolveItem_CustomizeNum)
                .input('EvolveItem_CustPart', Evolve.Sql.NVarChar, data.EvolveItem_CustPart)
                .input('EvolveItem_load_capacity', Evolve.Sql.NVarChar, data.EvolveItem_load_capacity)
                .input('EvolveItem_CycleTime', Evolve.Sql.NVarChar, data.EvolveItem_CycleTime)
                .input('EvolveSerial_ID', Evolve.Sql.Int, data.EvolveSerial_ID)
                .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveItem_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveItemGroup_ID', Evolve.Sql.Int, data.EvolveItemGroup_ID)
                .input('EvolvePDITemplate_ID', Evolve.Sql.NVarChar, data.EvolvePDITemplate_ID)
                .input('EvolveQCTemp_ID', Evolve.Sql.Int, data.EvolveQCTemp_ID)
                .input('EvolveQc_IsRequired', Evolve.Sql.Bit, data.EvolveQc_IsRequired)
                .input('EvolveQc_TempStatus', Evolve.Sql.NVarChar, data.EvolveQc_TempStatus)
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)

                .query("INSERT INTO EvolveItem (EvolveItem_Code , EvolveItem_Desc , EvolveProcessTemp_Id ,EvolveItem_BrakeNum , EvolveItem_BrakeApprovalNum,EvolveItem_Type , EvolveItem_CustomizeNum, EvolveItem_CustPart,EvolveItem_load_capacity,EvolveItem_CycleTime,EvolveSerial_ID,EvolveItem_CreatedAt,EvolveItem_CreatedUser,EvolveItem_UpdateAt , EvolveItem_UpdateUser,EvolveItemGroup_ID,EvolvePDITemplate_ID, EvolveQCTemp_ID, EvolveQc_IsRequired, EvolveQc_TempStatus, EvolveUom_ID,EvolveLocation_ID) VALUES(@EvolveItem_Code , @EvolveItem_Desc , @EvolveProcessTemp_Id , @EvolveItem_BrakeNum ,@EvolveItem_BrakeApprovalNum,@EvolveItem_Type , @EvolveItem_CustomizeNum ,@EvolveItem_CustPart,@EvolveItem_load_capacity,@EvolveItem_CycleTime,@EvolveSerial_ID,@EvolveItem_CreatedAt,@EvolveItem_CreatedUser,@EvolveItem_UpdateAt , @EvolveItem_UpdateUser , @EvolveItemGroup_ID,@EvolvePDITemplate_ID, @EvolveQCTemp_ID, @EvolveQc_IsRequired, @EvolveQc_TempStatus, @EvolveUom_ID,@EvolveLocation_ID);select @@IDENTITY AS 'inserted_id'");



        } catch (error) {
            Evolve.Log.error(" EERR1254: Error while creating Item "+error.message);
            return new Error(" EERR1254: Error while creating Item "+error.message);
        }
    },
    assignItemToSuppliers: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveQCTemp_ID', Evolve.Sql.Int, data.EvolveQCTemp_ID)
                .input('EvolveItemSupLink_recInvetory_Location', Evolve.Sql.Int, data.EvolveItemSupLink_recInvetory_Location)
                .input('EvolveItemSupLink_Approved', Evolve.Sql.Bit, data.EvolveItemSupLink_Approved)
                .input('EvolveItemSupLink_recInvetory_Status', Evolve.Sql.Bit, data.EvolveItemSupLink_recInvetory_Status)

                .input('EvolveSupplier_ID', Evolve.Sql.Int, data.EvolveSupplier_ID)
                .input('EvolveItemSupLink_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveItemSupLink_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveItemSupLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveItemSupLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("INSERT INTO EvolveItemSupLink (EvolveItem_ID,EvolveQCTemp_ID,EvolveItemSupLink_recInvetory_Location,EvolveItemSupLink_Approved,EvolveItemSupLink_recInvetory_Status,EvolveSupplier_ID,EvolveItemSupLink_CreatedAt,EvolveItemSupLink_UpdatedAt,EvolveItemSupLink_UpdatedUser,EvolveItemSupLink_CreatedUser) VALUES (@EvolveItem_ID,@EvolveQCTemp_ID,@EvolveItemSupLink_recInvetory_Location,@EvolveItemSupLink_Approved,@EvolveItemSupLink_recInvetory_Status , @EvolveSupplier_ID,@EvolveItemSupLink_CreatedAt,@EvolveItemSupLink_UpdatedAt,@EvolveItemSupLink_UpdatedUser,@EvolveItemSupLink_CreatedUser)");

        } catch (error) {
            Evolve.Log.error(" EERR1255: Error while assigning Item To Suppliers "+error.message);
            return new Error(" EERR1255: Error while assigning Item To Suppliers "+error.message);
        }
    },

    updateItem: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveItem_Code', Evolve.Sql.NVarChar, data.EvolveItem_Code)
                .input('EvolveItem_Desc', Evolve.Sql.NVarChar, data.EvolveItem_Desc)
                .input('EvolveProcessTemp_Id', Evolve.Sql.Int, data.EvolveProcessTemp_Id)
                .input('EvolveItem_BrakeNum', Evolve.Sql.NVarChar, data.EvolveItem_BrakeNum)
                .input('EvolveItem_BrakeApprovalNum', Evolve.Sql.NVarChar, data.EvolveItem_BrakeApprovalNum)
                .input('EvolveItem_Type', Evolve.Sql.NVarChar, data.EvolveItem_Type)
                .input('EvolveItem_CustomizeNum', Evolve.Sql.NVarChar, data.EvolveItem_CustomizeNum)
                .input('EvolveItem_CustPart', Evolve.Sql.NVarChar, data.EvolveItem_CustPart)
                .input('EvolveItem_load_capacity', Evolve.Sql.NVarChar, data.EvolveItem_load_capacity)
                .input('EvolveItem_CycleTime', Evolve.Sql.NVarChar, data.EvolveItem_CycleTime)
                .input('EvolveSerial_ID', Evolve.Sql.Int, data.EvolveSerial_ID)
                .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveItem_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveItemGroup_ID', Evolve.Sql.Int, data.EvolveItemGroup_ID)
                .input('EvolvePDITemplate_ID', Evolve.Sql.NVarChar, data.EvolvePDITemplate_ID)
                .input('EvolveQCTemp_ID', Evolve.Sql.Int, data.EvolveQCTemp_ID)
                .input('EvolveQc_IsRequired', Evolve.Sql.Bit, data.EvolveQc_IsRequired)
                .input('EvolveQc_TempStatus', Evolve.Sql.NVarChar, data.EvolveQc_TempStatus)
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)

                .query('UPDATE EvolveItem SET EvolveItem_Code = @EvolveItem_Code , EvolveItem_Desc = @EvolveItem_Desc , EvolveProcessTemp_Id = @EvolveProcessTemp_Id , EvolveItem_BrakeNum = @EvolveItem_BrakeNum , EvolveItem_BrakeApprovalNum = @EvolveItem_BrakeApprovalNum , EvolveItem_Type = @EvolveItem_Type , EvolveItem_CustomizeNum = @EvolveItem_CustomizeNum , EvolveItem_CustPart = @EvolveItem_CustPart , EvolveItem_load_capacity = @EvolveItem_load_capacity ,EvolveItem_CycleTime = @EvolveItem_CycleTime , EvolveSerial_ID = @EvolveSerial_ID ,  EvolveItem_UpdateAt = @EvolveItem_UpdateAt , EvolveItem_UpdateUser = @EvolveItem_UpdateUser  ,EvolveItemGroup_ID = @EvolveItemGroup_ID  , EvolvePDITemplate_ID = @EvolvePDITemplate_ID, EvolveQCTemp_ID = @EvolveQCTemp_ID, EvolveQc_IsRequired = @EvolveQc_IsRequired, EvolveQc_TempStatus = @EvolveQc_TempStatus, EvolveUom_ID = @EvolveUom_ID ,EvolveLocation_ID =@EvolveLocation_ID WHERE EvolveItem_ID = @EvolveItem_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1256: Error while updating Item "+error.message);
            return new Error(" EERR1256: Error while updating Item "+error.message);
        }
    },
    deleteOldItemSupp: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .query("DELETE FROM EvolveItemSupLink WHERE EvolveItem_ID = @EvolveItem_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1257: Error while deleting Old Item Supp "+error.message);
            return new Error(" EERR1257: Error while deleting Old Item Supp "+error.message);
        }
    },
    getItemQcTemp: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .query("SELECT eqct.EvolveQCTemp_Name, eqct.EvolveQCTemp_ID FROM EvolveQCTemp eqct, EvolveItemSupLink eisl WHERE eisl.EvolveItem_ID = @EvolveItem_ID AND eisl.EvolveQCTemp_ID = eqct.EvolveQCTemp_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1258: Error while getting Item Qc Temp "+error.message);
            return new Error(" EERR1258: Error while getting Item Qc Temp "+error.message);
        }
    },
    getUomList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveUom_ID, EvolveUom_Uom FROM EvolveUom");
        } catch (error) {
            Evolve.Log.error(" EERR1259: Error while getting Uom List "+error.message);
            return new Error(" EERR1259: Error while getting Uom List "+error.message);
        }
    },

}
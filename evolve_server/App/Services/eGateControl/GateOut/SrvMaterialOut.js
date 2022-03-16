'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getItemList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT EvolveItem_ID , EvolveItem_Code , EvolveItem_Desc FROM EvolveItem');
		} catch (error) {
			Evolve.Log.error(" EERR1136: Error while getting Item List "+error.message);
			return new Error(" EERR1136: Error while getting Item List "+error.message);
		}
	},

	getUomList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT EvolveUom_ID , EvolveUom_Type , EvolveUom_Uom FROM EvolveUom');
		} catch (error) {
			Evolve.Log.error(" EERR1137: Error while getting Uom List "+error.message);
			return new Error(" EERR1137: Error while getting Uom List "+error.message);
		}
	},


    getGateEntryNumbers: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT EvolveGate_ID , EvolveGate_PassNumber, EvolveGate_RefNumber  FROM EvolveGate WHERE  EvolveGate_Direction = 0 AND EvolveGate_ModuleType ='MATRL'");
        } catch (error) {
            Evolve.Log.error(" EERR1138: Error while getting Gate Entry Numbers "+error.message);
            return new Error(" EERR1138: Error while getting Gate Entry Numbers "+error.message);
        }
    },

    
    getSupplierList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT EvolveSupplier_ID , EvolveSupplier_Name , EvolveSupplier_Code FROM EvolveSupplier');
		} catch (error) {
			Evolve.Log.error(" EERR1139: Error while getting Supplier List "+error.message);
			return new Error(" EERR1139: Error while getting Supplier List "+error.message);
		}
	},

	getDocument: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT EvolveDocumentType_ID , EvolveDocumentType_Name , EvolveDocumentType_Code FROM EvolveDocumentType WHERE EvolveDocument_Group = 'GATEOUT'");
		} catch (error) {
			Evolve.Log.error(" EERR1140: Error while getting document "+error.message);
			return new Error(" EERR1140: Error while getting document "+error.message);
		}
	},

    checkGateEntryNo: async function (refNo) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveGate_PassNumber",Evolve.Sql.NVarChar,refNo)
                .query("SELECT * FROM EvolveGate WHERE EvolveGate_PassNumber LIKE @EvolveGate_PassNumber AND EvolveGate_Direction = 0");
        } catch (error) {
            Evolve.Log.error(" EERR1141: Error while checking Gate Entry No "+error.message);
            return new Error(" EERR1141: Error while checking Gate Entry No "+error.message);
        }
    },

    updateGateDataMaterialOut : async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveGate_ID",Evolve.Sql.Int,data.EvolveGate_ID)
                .input("EvolveGate_Weight",Evolve.Sql.NVarChar,data.EvolveGate_Weight)
                .input("EvolveGate_Orgenization",Evolve.Sql.NVarChar,data.EvolveGate_Orgenization)
                .input("EvolveGate_Image",Evolve.Sql.NVarChar,data.EvolveGate_Image)
                .input("EvolveGate_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
                .input("EvolveGate_UpdatedAt",Evolve.Sql.NVarChar,datetime)
                .query("UPDATE EvolveGate SET EvolveGate_Direction = 1 , EvolveGate_Weight = @EvolveGate_Weight , EvolveGate_Orgenization = @EvolveGate_Orgenization , EvolveGate_Image = @EvolveGate_Image , EvolveGate_UpdatedUser = @EvolveGate_UpdatedUser , EvolveGate_UpdatedAt = @EvolveGate_UpdatedAt WHERE EvolveGate_ID = @EvolveGate_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1142: Error while updating Gate Data Material Out "+error.message);
            return new Error(" EERR1142: Error while updating Gate Data Material Out "+error.message);
        }
    },


    addGateDataDetailMaterialOut : async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveGate_ID",Evolve.Sql.Int,data.EvolveGate_ID)
                .input("EvolveItem_ID",Evolve.Sql.Int,data.EvolveItem_ID)
                .input("EvolveUom_ID",Evolve.Sql.Int,data.EvolveUom_ID)
                .input("EvolveDocument_ID",Evolve.Sql.NVarChar,data.EvolveDocument_ID)
                .input("EvolveGateDetails_DocRefNum",Evolve.Sql.NVarChar,data.EvolveGateDetails_DocRefNum)
                .input("EvolveGateDetails_Qty",Evolve.Sql.NVarChar,data.EvolveGateDetails_Qty)
                .input("EvolveGateDetails_Status",Evolve.Sql.NVarChar,data.EvolveGateDetails_Status)
                .input("EvolveGateDetails_CreatedAt",Evolve.Sql.NVarChar, datetime)
                .input("EvolveGateDetails_CreatedUser",Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input("EvolveGateDetails_UpdatedAt",Evolve.Sql.NVarChar, datetime)
                .input("EvolveGateDetails_UpdatedUser",Evolve.Sql.NVarChar,data.EvolveUser_ID)
                .query("INSERT INTO EvolveGateDetails (EvolveGate_ID,EvolveItem_ID,EvolveUom_ID,EvolveDocument_ID,EvolveGateDetails_DocRefNum,EvolveGateDetails_Qty,EvolveGateDetails_Status,EvolveGateDetails_CreatedAt,EvolveGateDetails_CreatedUser,EvolveGateDetails_UpdatedAt,EvolveGateDetails_UpdatedUser) VALUES (@EvolveGate_ID,@EvolveItem_ID,@EvolveUom_ID,@EvolveDocument_ID,@EvolveGateDetails_DocRefNum,@EvolveGateDetails_Qty,@EvolveGateDetails_Status,@EvolveGateDetails_CreatedAt,@EvolveGateDetails_CreatedUser,@EvolveGateDetails_UpdatedAt,@EvolveGateDetails_UpdatedUser)");
        } catch (error) {
            Evolve.Log.error(" EERR1143: Error while adding Gate Data Detail Material Out "+error.message);
            return new Error(" EERR1143: Error while adding Gate Data Detail Material Out "+error.message);
        }
    },

    getSupplierInvoice: async function (EvolveSupplier_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveSupplier_Code",Evolve.Sql.NVarChar,EvolveSupplier_Code)
                .query("SELECT es.EvolveSupplier_ID , ei.EvolveInvoice_ID , ei.EvolveInvoice_Number FROM EvolveSupplier es , EvolveInvoice ei WHERE es.EvolveSupplier_Code LIKE @EvolveSupplier_Code AND ei.EvolveInvoice_CustCode = es.EvolveSupplier_Code ");
        } catch (error) {
            Evolve.Log.error(" EERR1144: Error while getting Supplier Invoice "+error.message);
            return new Error(" EERR1144: Error while getting Supplier Invoice "+error.message);
        }
    },

    getInvoiceLines: async function (EvolveInvoice_Number) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInvoice_Number",Evolve.Sql.NVarChar,EvolveInvoice_Number)
                .query("SELECT ei.EvolveInvoice_Number , eim.EvolveItem_ID ,eil.EvolveInvoiceItemList_PrdCode , eu.EvolveUom_ID , eu.EvolveUom_Uom , eil.EvolveInvoiceItemList_Qty , (SELECT SUM(egd.EvolveGateDetails_Qty) FROM EvolveGateDetails egd WHERE egd.EvolveGateDetails_DocRefNum LIKE ei.EvolveInvoice_Number AND egd.EvolveItem_ID = eim.EvolveItem_ID ) as already_received FROM EvolveInvoice ei , EvolveInvoiceItemList eil INNER JOIN EvolveItem eim ON eim.EvolveItem_Code LIKE eil.EvolveInvoiceItemList_PrdCode INNER JOIN EvolveUom eu ON eu.EvolveUom_ID = eim.EvolveUom_ID WHERE ei.EvolveInvoice_Number LIKE @EvolveInvoice_Number AND eil.EvolveInvoice_ID = ei.EvolveInvoice_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1145: Error while getting Invoice lines "+error.message);
            return new Error(" EERR1145: Error while getting Invoice lines "+error.message);
        }
    },

    addGateData: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveGate_RefNumber",Evolve.Sql.NVarChar,data.EvolveGate_RefNumber)
                .input("EvolveGate_ModuleType",Evolve.Sql.NVarChar,data.EvolveGate_ModuleType)
                .input("EvolveGate_Direction",Evolve.Sql.Bit,data.EvolveGate_Direction)
                .input("EvolveGate_VehicleNumber",Evolve.Sql.NVarChar,data.EvolveGate_VehicleNumber)
                .input("EvolveGate_Transpoter",Evolve.Sql.NVarChar,data.EvolveGate_Transpoter)
                .input("EvolveGate_DriverName",Evolve.Sql.NVarChar,data.EvolveGate_DriverName)
                .input("EvolveGate_DriverContact",Evolve.Sql.NVarChar,data.EvolveGate_DriverContact)
                .input("EvolveGate_Weight",Evolve.Sql.NVarChar,data.EvolveGate_Weight)
                .input("EvolveGate_Orgenization",Evolve.Sql.NVarChar,data.EvolveGate_Orgenization)
                .input("EvolveGate_CreatedUser",Evolve.Sql.NVarChar,data.EvolveUser_ID)
                .input("EvolveGate_CreatedAt",Evolve.Sql.NVarChar,datetime)
                .input("EvolveGate_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
                .input("EvolveGate_UpdatedAt",Evolve.Sql.NVarChar,datetime)
                .query("INSERT INTO EvolveGate (EvolveGate_RefNumber,EvolveGate_ModuleType,EvolveGate_Direction,EvolveGate_VehicleNumber,EvolveGate_Transpoter,EvolveGate_DriverName,EvolveGate_DriverContact,EvolveGate_Weight,EvolveGate_Orgenization,EvolveGate_CreatedAt,EvolveGate_CreatedUser,EvolveGate_UpdatedAt,EvolveGate_UpdatedUser) VALUES (@EvolveGate_RefNumber,@EvolveGate_ModuleType,@EvolveGate_Direction,@EvolveGate_VehicleNumber,@EvolveGate_Transpoter,@EvolveGate_DriverName,@EvolveGate_DriverContact,@EvolveGate_Weight,@EvolveGate_Orgenization,@EvolveGate_CreatedAt,@EvolveGate_CreatedUser,@EvolveGate_UpdatedAt,@EvolveGate_UpdatedUser)");
        } catch (error) {
            Evolve.Log.error(" EERR1146: Error while adding gate data "+error.message);
            return new Error(" EERR1146: Error while adding gate data "+error.message);
        }
    },

    checkInvoiceNumber: async function (invNo) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInvoice_Number",Evolve.Sql.NVarChar,invNo)
                .query("SELECT EvolveInvoice_CustName,EvolveInvoiceValDtls_TotInvVal, EvolveInvoice_Number FROM EvolveInvoice WHERE EvolveInvoice_Number = @EvolveInvoice_Number");
        } catch (error) {
            Evolve.Log.error(" EERR1141: Error while checking Invoice Number "+error.message);
            return new Error(" EERR1141: Error while checking Invoice Number "+error.message);
        }
    },

}
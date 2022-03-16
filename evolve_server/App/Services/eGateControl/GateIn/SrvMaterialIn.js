'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
	getItemList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT EvolveItem_ID , EvolveItem_Code , EvolveItem_Desc FROM EvolveItem');
		} catch (error) {
			Evolve.Log.error(" EERR1112: Error while getting Item List "+error.message);
			return new Error(" EERR1112: Error while getting Item List "+error.message);
		}
	},

	getUomList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT EvolveUom_ID , EvolveUom_Type , EvolveUom_Uom FROM EvolveUom');
		} catch (error) {
			Evolve.Log.error(" EERR1113: Error while getting Uom List "+error.message);
			return new Error(" EERR1113: Error while getting Uom List "+error.message);
		}
	},


	getSupplierList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT EvolveSupplier_ID , EvolveSupplier_Name , EvolveSupplier_Code FROM EvolveSupplier');
		} catch (error) {
			Evolve.Log.error(" EERR1114: Error while getting Supplier List "+error.message);
			return new Error(" EERR1114: Error while getting Supplier List "+error.message);
		}
	},

	getDocument: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT EvolveDocumentType_ID , EvolveDocumentType_Name , EvolveDocumentType_Code FROM EvolveDocumentType WHERE EvolveDocument_Group = 'GATEIN'");
		} catch (error) {
			Evolve.Log.error(" EERR1115: Error while getting Document "+error.message);
			return new Error(" EERR1115: Error while getting Document "+error.message);
		}
	},

	addGateDataMaterialIn: async function (data) {
		let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveGate_EWBNumber", Evolve.Sql.NVarChar, data.EvolveGate_EWBNumber)
				.input("EvolveGate_RefNumber", Evolve.Sql.NVarChar, data.EvolveGate_RefNumber)
				.input("EvolveGate_ModuleType", Evolve.Sql.NVarChar, data.EvolveGate_ModuleType)
				.input("EvolveGate_Direction", Evolve.Sql.Bit, 0)
				.input("EvolveGate_VehicleNumber", Evolve.Sql.NVarChar, data.EvolveGate_VehicleNumber)
				.input("EvolveGate_Transpoter", Evolve.Sql.NVarChar, data.EvolveGate_Transpoter)
				.input("EvolveGate_DriverName", Evolve.Sql.NVarChar, data.EvolveGate_DriverName)
				.input("EvolveGate_DriverContact", Evolve.Sql.NVarChar, data.EvolveGate_DriverContact)
				.input("EvolveGate_Orgenization", Evolve.Sql.NVarChar, data.EvolveGate_Orgenization)
				.input("EvolveGate_Weight", Evolve.Sql.NVarChar, data.EvolveGate_Weight)
				.input("EvolveGate_Image", Evolve.Sql.NVarChar, data.EvolveGate_Image)
				.input("EvolveGate_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
				.input("EvolveGate_CreatedAt", Evolve.Sql.NVarChar, datetime)
				.input("EvolveGate_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
				.input("EvolveGate_UpdatedAt", Evolve.Sql.NVarChar, datetime)
				.query("INSERT INTO EvolveGate (EvolveGate_EWBNumber,EvolveGate_RefNumber,EvolveGate_ModuleType,EvolveGate_Direction,EvolveGate_VehicleNumber,EvolveGate_Transpoter,EvolveGate_DriverName,EvolveGate_DriverContact,EvolveGate_Orgenization,EvolveGate_Weight,EvolveGate_UpdatedUser,EvolveGate_CreatedUser,EvolveGate_CreatedAt,EvolveGate_UpdatedAt) VALUES (@EvolveGate_EWBNumber , @EvolveGate_RefNumber,@EvolveGate_ModuleType,@EvolveGate_Direction,@EvolveGate_VehicleNumber,@EvolveGate_Transpoter,@EvolveGate_DriverName,@EvolveGate_DriverContact,@EvolveGate_Orgenization,@EvolveGate_Weight,@EvolveGate_UpdatedUser,@EvolveGate_CreatedUser,@EvolveGate_CreatedAt,@EvolveGate_UpdatedAt);select @@IDENTITY AS 'inserted_id'");
		} catch (error) {
			Evolve.Log.error(" EERR1116: Error while adding Gate Data Material In "+error.message);
			return new Error(" EERR1116: Error while adding Gate Data Material In "+error.message);
		}
	},

	addGateDataDetailMaterialIn: async function (data) {
		let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveGate_ID", Evolve.Sql.Int, data.EvolveGate_ID)
				.input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
				.input("EvolveUom_ID", Evolve.Sql.Int, data.EvolveUom_ID)
				.input("EvolveDocument_ID", Evolve.Sql.NVarChar, data.EvolveDocument_ID)
				.input("EvolveGateDetails_DocRefNum", Evolve.Sql.NVarChar, data.EvolveGateDetails_DocRefNum)
				.input("EvolveGateDetails_Qty", Evolve.Sql.NVarChar, data.EvolveGateDetails_Qty)
				.input("EvolveGateDetails_Status", Evolve.Sql.NVarChar, data.EvolveGateDetails_Status)
				.input("EvolveGateDetails_CreatedAt", Evolve.Sql.NVarChar, datetime)
				.input("EvolveGateDetails_CreatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
				.input("EvolveGateDetails_UpdatedAt", Evolve.Sql.NVarChar, datetime)
				.input("EvolveGateDetails_UpdatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
				.query("INSERT INTO EvolveGateDetails (EvolveGate_ID,EvolveItem_ID,EvolveUom_ID,EvolveDocument_ID,EvolveGateDetails_DocRefNum,EvolveGateDetails_Qty,EvolveGateDetails_Status,EvolveGateDetails_CreatedAt,EvolveGateDetails_CreatedUser,EvolveGateDetails_UpdatedAt,EvolveGateDetails_UpdatedUser) VALUES (@EvolveGate_ID,@EvolveItem_ID,@EvolveUom_ID,@EvolveDocument_ID,@EvolveGateDetails_DocRefNum,@EvolveGateDetails_Qty,@EvolveGateDetails_Status,@EvolveGateDetails_CreatedAt,@EvolveGateDetails_CreatedUser,@EvolveGateDetails_UpdatedAt,@EvolveGateDetails_UpdatedUser)");
		} catch (error) {
			Evolve.Log.error(" EERR1117: Error while adding Gate Data Detail Material In "+error.message);
			return new Error(" EERR1117: Error while adding Gate Data Detail Material In "+error.message);
		}
	},

	getSupplierPo: async function (EvolveSupplier_Code) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveSupplier_Code", Evolve.Sql.NVarChar, EvolveSupplier_Code)
				.query("SELECT epo.EvolvePurchaseOrder_ID , epo.EvolvePurchaseOrder_Number FROM EvolveSupplier es , EvolvePurchaseOrder epo   WHERE es.EvolveSupplier_Code LIKE @EvolveSupplier_Code AND epo.EvolveSupplier_ID = es.EvolveSupplier_ID");
		} catch (error) {
			Evolve.Log.error(" EERR1118: Error while getting Supplier Po "+error.message);
			return new Error(" EERR1118: Error while getting Supplier Po "+error.message);
		}
	},

	getPoDetails: async function (EvolvePurchaseOrder_Number) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolvePurchaseOrder_Number", Evolve.Sql.NVarChar, EvolvePurchaseOrder_Number)
				.query("SELECT epo.EvolvePurchaseOrder_Number , epod.EvolveItem_ID , ei.EvolveItem_Code , ei.EvolveItem_Desc, epod.EvolveUOM_ID , eu.EvolveUom_Uom , epod.EvolvePurchaseOrderDetail_QuantityOrdered ,epod.EvolvePurchaseOrderDetail_Line, (SELECT SUM(egd.EvolveGateDetails_Qty) FROM EvolveGateDetails egd WHERE egd.EvolveGateDetails_DocRefNum LIKE epo.EvolvePurchaseOrder_Number AND egd.EvolveItem_ID = ei.EvolveItem_ID ) as already_received FROM EvolvePurchaseOrder epo , EvolvePurchaseOrderDetail epod INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = epod.EvolveItem_ID INNER JOIN EvolveUom eu ON eu.EvolveUom_ID = epod.EvolveUOM_ID WHERE epo.EvolvePurchaseOrder_Number LIKE @EvolvePurchaseOrder_Number AND epod.EvolvePurchaseOrder_ID = epo.EvolvePurchaseOrder_ID");
		} catch (error) {
			Evolve.Log.error(" EERR1119: Error while getting Po Details "+error.message);
			return new Error(" EERR1119: Error while getting Po Details "+error.message);
		}
	},
}
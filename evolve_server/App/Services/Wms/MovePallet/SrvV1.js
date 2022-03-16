'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
	getReasonList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('select EvolveReason_ID,EvolveReason_Name FROM EvolveReason')
		} catch (error) {
			Evolve.Log.error(" EERR3142 : Error while getting Reason List " + error.message);
			return new Error(" EERR3142 : Error while getting Reason List " + error.message);
		}
	},
	updateInventory: async function (data) {
		try {
			let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
			return await Evolve.SqlPool.request()
				.input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
				.input('EvolveLocation_ID', Evolve.Sql.Int, data.locId)
				.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
				.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query('UPDATE EvolveInventory SET EvolveLocation_ID =@EvolveLocation_ID ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser   WHERE EvolveInventory_ID =@EvolveInventory_ID ')
		} catch (error) {
			Evolve.Log.error(" EERR3143: Error while update inventory " + error.message);
			return new Error(" EERR3143: Error while update inventory " + error.message);
		}

	},
	// getLocationList: async function () {
	// 	try {
	// 		return await Evolve.SqlPool.request()
	// 			.query("SELECT el.EvolveLocation_ID ,el.EvolveLocation_Name ,EvolveLocation_Code, scm.EvolveStatusCodeMstr_Code as EvolveLocation_Status  FROM  EvolveLocation el  , EvolveStatusCodeMstr scm WHERE el.EvolveStatusCodeMstr_Id = scm.EvolveStatusCodeMstr_Id")
	// 	} catch (error) {
	// 		Evolve.Log.error(" EERR3144: Error while getting Location List " + error.message);
	// 		return new Error(" EERR3144: Error while getting Location List " + error.message);
	// 	}
	// },
	getLocationList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("select EvolveLocation_Code,EvolveLocation_ID FROM EvolveLocation WHERE EvolveLocation_Type = 'EVOLVE'")
		} catch (error) {
			Evolve.Log.error(" EERR3144: Error while getting Location List " + error.message);
			return new Error(" EERR3144: Error while getting Location List " + error.message);
		}
	},
	getPalletDetails: async function (EvolveInventory_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInventory_ID', Evolve.Sql.Int, EvolveInventory_ID)
				.query(" SELECT einv.*  , eloc.EvolveLocation_Name   , uom.EvolveUom_Uom  , ei.EvolveItem_Code , ei.EvolveItem_Desc FROM  EvolveInventory einv , EvolveLocation eloc  , EvolveUom uom ,EvolveItem ei  WHERE   einv.EvolveLocation_ID = eloc.EvolveLocation_ID AND ei.EvolveUom_ID = uom.EvolveUom_ID ANd einv.EvolveItem_ID = ei.EvolveItem_ID  AND einv.EvolveInventory_ID =@EvolveInventory_ID")
		} catch (error) {
			Evolve.Log.error(" EERR3145: Error while getting Pallet Details " + error.message);
			return new Error(" EERR3145	: Error while getting Pallet Details " + error.message);
		}
	},

	getTransTypeID: async function (EvolveTranstype_Code) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveTranstype_Code", Evolve.Sql.NVarChar, EvolveTranstype_Code)
				.query("SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_Code = @EvolveTranstype_Code");
		} catch (error) {
			Evolve.Log.error(" EERR3146: Error while getting Trans TypeID " + error.message);
			return new Error(" EERR3146: Error while getting Trans TypeID " + error.message);
		}
	},
	addIOData: async function (data) {
		try {
			let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
			return await Evolve.SqlPool.request()
				.input(
					"EvolveIO_Data",
					Evolve.Sql.NVarChar,
					JSON.stringify(data.EvolveIO_Data)
				)
				.input(
					"EvolveIO_File_Data",
					Evolve.Sql.NVarChar,
					JSON.stringify(data.EvolveIO_File_Data)
				)
				.input("EvolveIO_File_InTime", Evolve.Sql.NVarChar, dateTime)
				.input(
					"EvolveIO_Data_Formate",
					Evolve.Sql.NVarChar,
					data.EvolveIO_Data_Formate
				)
				.input("EvolveIO_Code", Evolve.Sql.NVarChar, data.EvolveIO_Code)
				.input("EvolveIO_Direction", Evolve.Sql.Bit, data.EvolveIO_Direction)
				.input("EvolveIO_Status", Evolve.Sql.Bit, data.EvolveIO_Status)
				.input("EvolveIO_ERP_Type", Evolve.Sql.NVarChar, data.EvolveIO_ERP_Type)
				.query(
					"INSERT INTO EvolveIO(EvolveIO_Data,EvolveIO_File_Data,EvolveIO_File_InTime,EvolveIO_Data_Formate,EvolveIO_Code,EvolveIO_Direction,EvolveIO_Status,EvolveIO_ERP_Type) VALUES (@EvolveIO_Data,@EvolveIO_File_Data,@EvolveIO_File_InTime,@EvolveIO_Data_Formate,@EvolveIO_Code,@EvolveIO_Direction,@EvolveIO_Status,@EvolveIO_ERP_Type)"
				);
		} catch (error) {
			Evolve.Log.error(" EERR3147: Error while adding IO Data " + error.message);
			return new Error(" EERR3147: Error while adding IO Data " + error.message);
		}
	},
	getscannedPallet: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_SerialNo", Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
				.query("SELECT '' as locId ,  einv.* , eloc.EvolveLocation_Code ,  eloc.EvolveLocation_Name , ei.EvolveItem_Part ,  ei.EvolveItem_Desc1  FROM  EvolveLocation eloc  ,    EvolveInventory einv  LEFT JOIN  EvolveItem ei ON einv.EvolveItem_ID = ei.EvolveItem_ID  WHERE einv.EvolveLocation_ID = eloc.EvolveLocation_ID AND einv.EvolveInventory_SerialNo = @EvolveInventory_SerialNo ")
		} catch (error) {
			Evolve.Log.error("EERR3148 : Error while get pallet details " + error.message);
			return new Error("EERR3148 : Error while get pallet details " + error.message);
		}
	},
	getLocationStatus: async function (EvolveLocation_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveLocation_ID", Evolve.Sql.Int, EvolveLocation_ID)
				.query("SELECT  scm.EvolveStatusCodeMstr_Code  FROM  EvolveLocation el  , EvolveStatusCodeMstr scm WHERE el.EvolveStatusCodeMstr_Id = scm.EvolveStatusCodeMstr_Id AND el.EvolveLocation_ID = @EvolveLocation_ID")
		} catch (error) {
			Evolve.Log.error(" EERR3149 : Error while get location status " + error.message);
			return new Error(" EERR3149 : Error while get location status " + error.message);
		}
	},
	updatePickPalletLoc: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
				.input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveToLocation_ID)
				.query("  UPDATE EvolvePickListDetail SET EvolveLocation_ID = @EvolveLocation_ID  WHERE EvolveInventory_ID = @EvolveInventory_ID AND EvolvePickListDetail_Status = 'PICKED'")
		} catch (error) {
			Evolve.Log.error(" EERR3150 : Error while update picked pallet location " + error.message);
			return new Error(" EERR3150 : Error while update picked pallet location " + error.message);
		}
	},
	printPallet: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
				.query("UPDATE EvolveInventory SET EvolveInventory_IsPrinted = 1 WHERE EvolveInventory_ID=@EvolveInventory_ID ")
		} catch (error) {
			Evolve.Log.error(" EERR3229 : Error while print pallet " + error.message);
			return new Error(" EERR3229 : Error while print pallet " + error.message);
		}
	},







}
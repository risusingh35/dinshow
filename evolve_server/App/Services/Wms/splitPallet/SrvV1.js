'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

	// getScannedPallet: async function (data) {
	// 	try {
	// 		return await Evolve.SqlPool.request()
	// 		.input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
	// 		.query("SELECT einv.*  , eloc.EvolveLocation_Name   , uom.EvolveUom_Uom  , ei.EvolveItem_Code , ei.EvolveItem_Desc FROM  EvolveInventory einv , EvolveLocation eloc  , EvolveUom uom ,EvolveItem ei  WHERE einv.EvolveInventory_PostingStatus != 'PENDING' AND einv.EvolveLocation_ID = eloc.EvolveLocation_ID AND ei.EvolveUom_ID= uom.EvolveUom_ID ANd einv.EvolveItem_ID = ei.EvolveItem_ID AND einv.EvolveInventory_RefNumber = @EvolveInventory_RefNumber" )
	// 	} catch (error) {
	// 		Evolve.Log.error("EERR3210 : Error while get pallet details "+error.message);
	// 		return new Error("EERR3210 : Error while get pallet details "+error.message);
	// 	}
	// },

	getscannedPallet: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_SerialNo", Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
				.query("SELECT '' as qtyToSplit ,  einv.* , eloc.EvolveLocation_Code ,  eloc.EvolveLocation_Name , ei.EvolveItem_Part ,  ei.EvolveItem_Desc1  FROM  EvolveLocation eloc  ,    EvolveInventory einv  LEFT JOIN  EvolveItem ei ON einv.EvolveItem_ID = ei.EvolveItem_ID  WHERE einv.EvolveLocation_ID = eloc.EvolveLocation_ID AND einv.EvolveInventory_SerialNo = @EvolveInventory_SerialNo ")
		} catch (error) {
			Evolve.Log.error("EERR3148 : Error while get pallet details " + error.message);
			return new Error("EERR3148 : Error while get pallet details " + error.message);
		}
	},

	getInventoryData: async function (data) {
		try {
			console.log("data>>>" , data)
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_ID", Evolve.Sql.NVarChar, data.EvolveInventory_ID)
				.query("  SELECT ei.*  , eim.EvolveItem_Code , el.EvolveLocation_Code  FROM EvolveInventory ei , EvolveItem eim , EvolveLocation el WHERE ei.EvolveInventory_ID = @EvolveInventory_ID AND eim.EvolveItem_ID = ei.EvolveItem_ID  AND  el.EvolveLocation_ID = ei.EvolveLocation_ID");
		} catch (error) {
			Evolve.Log.error(" EERR3211 : Error while getting Inventory Data "+error.message);
			return new Error(" EERR3211 : Error while getting Inventory Data "+error.message);
		}
	},

	// updateInventoryQty: async function (data, newQty) {
	// 	let dateObj = new Date();
	// 	var crnt_datetime = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate() + " " + dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds() + "." + dateObj.getMilliseconds();
	// 	try {
	// 		return await Evolve.SqlPool.request()
	// 			.input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
	// 			.input("EvolveInventory_QtyOnHand", Evolve.Sql.NVarChar, newQty)
	// 			.input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, crnt_datetime)
	// 			.input("EvolveInventory_UpdatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
	// 			.query("UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand , EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt , EvolveInventory_UpdatedUser = @EvolveInventory_UpdatedUser WHERE EvolveInventory_ID = @EvolveInventory_ID");
	// 	} catch (error) {
	// 		Evolve.Log.error(" EERR3212: Error while updating Inventory Qty "+error.message);
	// 		return new Error(" EERR3212: Error while updating Inventory Qty "+error.message);
	// 	}
	// },


	updateInventory: async function (data) {
		try {
			let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
			return await Evolve.SqlPool.request()
				.input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
				.input('qtyToSplit', Evolve.Sql.NVarChar, data.qtyToSplit)
				.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
				.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query('UPDATE EvolveInventory SET EvolveInventory_QtyAvailable =EvolveInventory_QtyAvailable-@qtyToSplit ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser   WHERE EvolveInventory_ID =@EvolveInventory_ID ')
		} catch (error) {
			Evolve.Log.error(" EERR3143: Error while update inventory " + error.message);
			return new Error(" EERR3143: Error while update inventory " + error.message);
		}

	},



	// addInventory: async function (data) {
	// 	try {
	// 		let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
	// 		return await Evolve.SqlPool.request()
	// 			.input("EvolveCompany_ID", Evolve.Sql.NVarChar, data.EvolveCompany_ID)
	// 			.input("EvolveUnit_ID", Evolve.Sql.NVarChar, data.EvolveUnit_ID)
	// 			.input("EvolveItem_ID", Evolve.Sql.NVarChar, data.EvolveItem_ID)
	// 			.input("EvolveLocation_ID", Evolve.Sql.NVarChar, data.EvolveLocation_ID)
	// 			.input("EvolveInventory_QtyOnHand", Evolve.Sql.NVarChar, data.EvolveInventory_QtyOnHand)
	// 			.input("EvolveInventory_QtyAllocated", Evolve.Sql.NVarChar, data.EvolveInventory_QtyAllocated)
	// 			.input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
	// 			.input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
	// 			.input("EvolveInventory_ExpireDateTime", Evolve.Sql.NVarChar, data.EvolveInventory_ExpireDateTime)
	// 			.input("EvolveInventory_LotNotes", Evolve.Sql.NVarChar, data.EvolveInventory_LotNotes)
	// 			.input("EvolveReason_ID", Evolve.Sql.NVarChar, data.EvolveResaon_ID)
	// 			.input("EvolveInventory_CustLotRef", Evolve.Sql.NVarChar, data.EvolveInventory_CustLotRef)
	// 			.input("EvolveTranstype_ID", Evolve.Sql.NVarChar, data.EvolveTranstype_ID)
	// 			.input("EvolveInventory_Status", Evolve.Sql.NVarChar, data.EvolveInventory_Status)
	// 			.input("EvolveInventory_PostingStatus", Evolve.Sql.NVarChar, "ERPPOSTED")
	// 			.input("EvolveInventory_CreatedAt", Evolve.Sql.NVarChar, dateTime)
    //             .input("EvolveInventory_CreatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
    //             .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
	// 			.input("EvolveInventory_UpdatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
	// 			.input("EvolveInventory_IsPrinted", Evolve.Sql.Int,0)

			

	// 			.query("INSERT INTO EvolveInventory (EvolveInventory_IsPrinted,EvolveCompany_ID,EvolveUnit_ID,EvolveItem_ID,EvolveLocation_ID,EvolveInventory_QtyOnHand,EvolveInventory_QtyAllocated,EvolveInventory_LotNumber,EvolveInventory_RefNumber,EvolveInventory_ExpireDateTime,EvolveInventory_LotNotes,EvolveReason_ID,EvolveInventory_CustLotRef,EvolveTranstype_ID,EvolveInventory_Status,EvolveInventory_PostingStatus,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventory_UpdatedAt,EvolveInventory_UpdatedUser) VALUES (@EvolveInventory_IsPrinted,@EvolveCompany_ID,@EvolveUnit_ID,@EvolveItem_ID,@EvolveLocation_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_QtyAllocated,@EvolveInventory_LotNumber,@EvolveInventory_RefNumber,@EvolveInventory_ExpireDateTime,@EvolveInventory_LotNotes,@EvolveReason_ID,@EvolveInventory_CustLotRef,@EvolveTranstype_ID,@EvolveInventory_Status,@EvolveInventory_PostingStatus,@EvolveInventory_CreatedAt,@EvolveInventory_CreatedUser,@EvolveInventory_UpdatedAt,@EvolveInventory_UpdatedUser);select @@IDENTITY AS \'inserted_id\'");
	// 	} catch (error) {
	// 		Evolve.Log.error(" EERR3213: Error while adding Inventory "+error.message);
	// 		console.log('addInventory error')
	// 		return new Error(" EERR3213: Error while adding Inventory "+error.message);
	// 	}
	// },


	getInvPalletNumber: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_ID", Evolve.Sql.NVarChar, data.EvolveInventory_ID)
				.query("SELECT EvolveInventory_RefNumber FROM EvolveInventory WHERE EvolveInventory_ID = @EvolveInventory_ID");
		} catch (error) {
			Evolve.Log.error(" EERR3214: Error while getting Inv Pallet Number "+error.message);
			return new Error(" EERR3214: Error while getting Inv Pallet Number "+error.message);
		}
	},

	updateInventoryPrint: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_ID", Evolve.Sql.NVarChar, data.EvolveInventory_ID)
				.query("UPDATE EvolveInventory SET EvolveInventory_LableIsPrint = 1 WHERE EvolveInventory_ID = @EvolveInventory_ID");
		} catch (error) {
			Evolve.Log.error(" EERR3215: Error while updating Inventory Print "+error.message);
			return new Error(" EERR3215: Error while updating Inventory Print "+error.message);
		}
	},

	addIOData: async function (data) 
	{
		try {

			let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


			let createIORecord = await Evolve.SqlPool.request()
				.input('EvolveIO_Data', Evolve.Sql.NVarChar, JSON.stringify(data.EvolveIO_Data))
				.input('EvolveIO_File_Data', Evolve.Sql.NVarChar, JSON.stringify(data.EvolveIO_File_Data))
				.input('EvolveIO_File_InTime', Evolve.Sql.NVarChar, dataTime)
				.input('EvolveIO_Data_Formate', Evolve.Sql.NVarChar, data.EvolveIO_Data_Formate)
				.input('EvolveIO_Code', Evolve.Sql.NVarChar, data.EvolveIO_Code)
				.input('EvolveIO_Direction', Evolve.Sql.Bit, data.EvolveIO_Direction)
				.input('EvolveIO_Status', Evolve.Sql.Bit, data.EvolveIO_Status)
				.input('EvolveIO_ERP_Type', Evolve.Sql.NVarChar, data.EvolveIO_ERP_Type)
				.query('INSERT INTO EvolveIO(EvolveIO_Data,EvolveIO_File_Data,EvolveIO_File_InTime,EvolveIO_Data_Formate,EvolveIO_Code,EvolveIO_Direction,EvolveIO_Status,EvolveIO_ERP_Type) VALUES (@EvolveIO_Data,@EvolveIO_File_Data,@EvolveIO_File_InTime,@EvolveIO_Data_Formate,@EvolveIO_Code,@EvolveIO_Direction,@EvolveIO_Status,@EvolveIO_ERP_Type)')
			if (createIORecord instanceof Error || createIORecord.rowsAffected < 1) {
				Evolve.Log.error(" EERR2173: Error on add IO Data ");
				return new Error(" EERR2173: Error on add IO Data ")
			} else {
				return createIORecord;
			}
		} catch (error) {
			Evolve.Log.error(" EERR3216 : Error while adding IO Data "+error.message);
			return new Error(" EERR3216 : Error while adding IO Data "+error.message);
		}
	},
	getUpdatedPalletDetails: async function (EvolveInventory_ID , inserted_id) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_ID", Evolve.Sql.Int, EvolveInventory_ID)
				.input("inserted_id", Evolve.Sql.Int, inserted_id)

				.query("SELECT einv.*  , eloc.EvolveLocation_Name   , uom.EvolveUom_Uom  , ei.EvolveItem_Code , ei.EvolveItem_Desc FROM  EvolveInventory einv , EvolveLocation eloc  , EvolveUom uom ,EvolveItem ei  WHERE einv.EvolveInventory_PostingStatus != 'PENDING' AND einv.EvolveLocation_ID = eloc.EvolveLocation_ID AND ei.EvolveUom_ID= uom.EvolveUom_ID ANd einv.EvolveItem_ID = ei.EvolveItem_ID AND ( einv.EvolveInventory_ID=@EvolveInventory_ID OR  einv.EvolveInventory_ID=@inserted_id) ");
		} catch (error) {
			Evolve.Log.error(" EERR3217: Error while updating Inventory Print "+error.message);
			return new Error(" EERR3217: Error while updating Inventory Print "+error.message);
		}
	},
	printPallet: async function (data) {
		try {
		return await Evolve.SqlPool.request()
		.input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
		.query("UPDATE EvolveInventory SET EvolveInventory_IsPrinted = 1 WHERE EvolveInventory_ID=@EvolveInventory_ID " )
		} catch (error) {
		Evolve.Log.error("EERR3228 : Error while print pallet"+error.message);
		return new Error("EERR3228 : Error while print pallet "+error.message);
		}
	},

	// Add Inventory


	addInventory: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)

                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveInventory_BatchNo', Evolve.Sql.NVarChar, data.EvolveInventory_BatchNo)
                .input('EvolveInventory_LotSerialNo', Evolve.Sql.NVarChar, data.EvolveInventory_LotSerialNo)
                .input('EvolveInventory_SerialNo', Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
                .input('EvolveInventory_SupplierBatchNo', Evolve.Sql.NVarChar, data.EvolveInventory_SupplierBatchNo)
                .input('EvolveInventory_QtyRecieved', Evolve.Sql.NVarChar, data.EvolveInventory_QtyRecieved)
                .input('EvolveInventory_QtyIssued', Evolve.Sql.NVarChar, 0)
                .input('EvolveInventory_QtyAvailable', Evolve.Sql.NVarChar, data.EvolveInventory_QtyAvailable)
                .input('EvolveInventory_MemoItem', Evolve.Sql.NVarChar, data.EvolveInventory_MemoItem)
                .input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveInventory_CreatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveInventory_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input('EvolveInventory_MachineIp', Evolve.Sql.NVarChar, '')
                .query("INSERT INTO EvolveInventory (EvolveUnit_ID, EvolveItem_ID,EvolveUom_ID , EvolveLocation_ID, EvolveInventory_BatchNo, EvolveInventory_LotSerialNo ,EvolveInventory_SerialNo, EvolveInventory_SupplierBatchNo ,EvolveInventory_QtyRecieved , EvolveInventory_QtyIssued ,  EvolveInventory_QtyAvailable ,EvolveInventory_MemoItem  , EvolveInventory_CreatedAt , EvolveInventory_CreatedUser  ,EvolveInventory_UpdatedAt , EvolveInventory_UpdatedUser  ) VALUES (@EvolveUnit_ID, @EvolveItem_ID,@EvolveUom_ID , @EvolveLocation_ID, @EvolveInventory_BatchNo,@EvolveInventory_LotSerialNo , @EvolveInventory_SerialNo, @EvolveInventory_SupplierBatchNo , @EvolveInventory_QtyRecieved , @EvolveInventory_QtyIssued , @EvolveInventory_QtyAvailable ,@EvolveInventory_MemoItem  , @EvolveInventory_CreatedAt , @EvolveInventory_CreatedUser  , @EvolveInventory_UpdatedAt , @EvolveInventory_UpdatedUser  ) ; SELECT '' as qtyToSplit ,  einv.* , eloc.EvolveLocation_Code ,  eloc.EvolveLocation_Name , ei.EvolveItem_Part ,  ei.EvolveItem_Desc1  FROM  EvolveLocation eloc  ,    EvolveInventory einv  LEFT JOIN  EvolveItem ei ON einv.EvolveItem_ID = ei.EvolveItem_ID  WHERE einv.EvolveLocation_ID = eloc.EvolveLocation_ID AND einv.EvolveInventory_ID =@@IDENTITY");

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add Inventory " + error.message);
            return new Error(" EERR####: Erorr while add Inventory " + error.message);
        }
    },

}
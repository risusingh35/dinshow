'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

	// getItem: async function (search) {
    //     try {
    //       let query =
    //         "SELECT TOP(20) EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE  '%" +
    //         search +
    //         "%'";
    //       return await Evolve.SqlPool.request().query(query);
    //     } catch (error) {
    //       Evolve.Log.error("  "+error.message);
    //       return new Error("  "+error.message);
    //     }
	//   },

	//   getInventoryItemNumber: async function () {
	// 	try {
	// 		return await Evolve.SqlPool.request()
	// 			.query('select DISTINCT eitm.EvolveItem_Code, eitm.EvolveItem_ID  from EvolveInventory einv, EvolveItem eitm WHERE einv.EvolveItem_ID = eitm.EvolveItem_ID')
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },
	
	getReasonList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('select EvolveReason_ID,EvolveReason_Name FROM EvolveReason')
		} catch (error) {
			Evolve.Log.error(" EERR2107: Error while getting Reason List "+error.message);
			return new Error(" EERR2107: Error while getting Reason List "+error.message);
		}
	},
	// before inventory logic change 
	getPalletList: async function () {
		try {
			let query = "   SELECT  einv.EvolveInventory_Status , ei.EvolveItem_ID , einv.EvolveInventory_ID ,einv.EvolveLocation_ID , einv.EvolveInventory_RefNumber , einv.EvolveInventory_QtyOnHand ,ei.EvolveItem_Code , ei.EvolveItem_Desc , eu.EvolveUom_Uom , el.EvolveLocation_Name , el.EvolveLocation_Status FROM  EvolveInventory einv  ,EvolveItem ei ,  EvolveUom eu , EvolveLocation el  WHERE ei.EvolveItem_ID = einv.EvolveItem_ID  AND eu.EvolveUom_ID = ei.EvolveUom_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED' AND einv.EvolveInventory_Status !='QCHOLD'   AND el.EvolveLocation_Status != 'OUTWORK'	ORDER BY einv.EvolveInventory_ID DESC";
			return await Evolve.SqlPool.request().query(query);

		} catch (error) {
			Evolve.Log.error(" EERR2108: Error while getting Pallet List "+error.message);
			return new Error(" EERR2108: Error while getting Pallet List "+error.message);
		}
	},
	//// after  inventory logic change 
	// getPalletList: async function () {
	// 	try {
	// 		let query = "SELECT  einv.EvolveInventory_Status , ei.EvolveItem_ID , einv.EvolveInventory_ID ,einv.EvolveLocation_ID , einv.EvolveInventory_RefNumber , einv.EvolveInventory_QtyOnHand ,ei.EvolveItem_Code , ei.EvolveItem_Desc , eu.EvolveUom_Uom , el.EvolveLocation_Name , el.EvolveLocation_Status FROM  EvolveInventory einv  ,EvolveItem ei ,  EvolveUom eu , EvolveLocation el  WHERE ei.EvolveItem_ID = einv.EvolveItem_ID  AND eu.EvolveUom_ID = ei.EvolveUom_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED' AND einv.EvolveInventory_Status !='QCHOLD'   AND el.EvolveLocation_Status != 'OUTWORK'	ORDER BY einv.EvolveInventory_ID DESC";
	// 		return await Evolve.SqlPool.request().query(query);

	// 	} catch (error) {
	// 		Evolve.Log.error(" EERR2108: Error while getting Pallet List "+error.message);
	// 		return new Error(" EERR2108: Error while getting Pallet List "+error.message);
	// 	}
	// },

	getPalletListByRefnumber: async function (EvolveInventory_RefNumber) {
		try {
			let query = " SELECT  einv.EvolveInventory_Status , ei.EvolveItem_ID , einv.EvolveInventory_ID ,einv.EvolveLocation_ID , einv.EvolveInventory_RefNumber , einv.EvolveInventory_QtyOnHand ,ei.EvolveItem_Code , ei.EvolveItem_Desc , eu.EvolveUom_Uom , el.EvolveLocation_Name , el.EvolveLocation_Status FROM  EvolveInventory einv  ,EvolveItem ei ,  EvolveUom eu , EvolveLocation el  WHERE ei.EvolveItem_ID = einv.EvolveItem_ID  AND eu.EvolveUom_ID = ei.EvolveUom_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED' AND einv.EvolveInventory_Status !='QCHOLD'   AND el.EvolveLocation_Status != 'OUTWORK'  AND einv.EvolveInventory_RefNumber ='" + EvolveInventory_RefNumber +"' ORDER BY einv.EvolveInventory_ID DESC"
			return await Evolve.SqlPool.request().query(query);

		} catch (error) {
			Evolve.Log.error(" EERR2109: Error while getting Pallet List By Ref number "+error.message);
			return new Error(" EERR2109: Error while getting Pallet List By Ref number "+error.message);
		}
	},

	// getPalletListByItemId: async function (EvolveItem_ID) {
	// 	try {

	// 		let EvolveItemIDs = EvolveItem_ID.toString();
	// 		let query = "SELECT einv.EvolveInventory_Status ,eloc.EvolveLocation_Name,einv.EvolveInventory_ID,einv.EvolveLocation_ID,einv.EvolveInventory_RefNumber,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_LotNumber , eu.EvolveUom_Type , ei.EvolveItem_Code  from EvolveInventory einv, EvolveLocation eloc ,EvolveItem ei, EvolveUom eu  WHERE einv.EvolveItem_ID IN (" + EvolveItemIDs + ") AND eloc.EvolveLocation_ID = einv.EvolveLocation_ID AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED'   ORDER BY einv.EvolveInventory_ID DESC";

	// 		return await Evolve.SqlPool.request().query(query);

	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },

	// getPalletListByItemIdAndRefnumber: async function (EvolveItem_ID, EvolveInventory_RefNumber) {
	// 	try {
	// 		let EvolveItemIDs = EvolveItem_ID.toString();

	// 		let query = "SELECT einv.EvolveInventory_Status ,eloc.EvolveLocation_Name,einv.EvolveInventory_ID,einv.EvolveLocation_ID,einv.EvolveInventory_RefNumber,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_LotNumber , eu.EvolveUom_Type , ei.EvolveItem_Code from EvolveInventory einv, EvolveLocation eloc ,EvolveItem ei, EvolveUom eu WHERE einv.EvolveItem_ID IN (" + EvolveItemIDs + ") AND eloc.EvolveLocation_ID = einv.EvolveLocation_ID AND EvolveInventory_RefNumber ='" + EvolveInventory_RefNumber + "' AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID  AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED'   ORDER BY einv.EvolveInventory_ID DESC";

	// 		return await Evolve.SqlPool.request().query(query);

	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },

	// getToLocationList: async function (EvolveLocation_ID) {
	// 	try {
	// 		return await Evolve.SqlPool.request(EvolveLocation_ID)
	// 			.input('EvolveLocation_ID', Evolve.Sql.Int, EvolveLocation_ID)
	// 			.query("select EvolveLocation_Name,EvolveLocation_ID FROM EvolveLocation WHERE EvolveLocation_ID !=@EvolveLocation_ID AND EvolveLocation_Type = 'I'")
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },

	// getInventoryById: async function (EvolveInventory_ID) {
	// 	try {
	// 		// console.log("inventory id <>>> " ,   EvolveInventory_ID)
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveInventory_ID', Evolve.Sql.Int, EvolveInventory_ID)
	// 			.query('select EvolveInventory_QtyOnHand , EvolveItem_ID , EvolveInventory_LotNumber , EvolveInventory_RefNumber ,EvolveInventory_ExpireDateTime from EvolveInventory WHERE  EvolveInventory_ID =@EvolveInventory_ID')
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },


	// movePalletCheckInv: async function (data) {
	// 	try {
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
	// 			.input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveToLocation_ID)
	// 			.input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
	// 			.query('select EvolveInventory_ID,EvolveInventory_QtyOnHand from EvolveInventory WHERE EvolveItem_ID = @EvolveItem_ID AND EvolveLocation_ID = @EvolveLocation_ID AND EvolveInventory_RefNumber = @EvolveInventory_RefNumber')
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },

	// movePalletInsert: async function (data, inv_data) {
	// 	// console.log(data);
	// 	try {
	// 		let date = new Date();
	// 		let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
	// 			.input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveToLocation_ID)
	// 			.input('EvolveInventory_QtyOnHand', Evolve.Sql.Int, data.EvolveInventory_QtyAllocated)
	// 			.input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, inv_data.EvolveInventory_LotNumber)
	// 			.input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, inv_data.EvolveInventory_RefNumber)
	// 			.input('EvolveReason_ID', Evolve.Sql.Int, inv_data.EvolveReason_ID)

	// 			.input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, dataTime)
	// 			.input('EvolveInventory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
	// 			.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
	// 			.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

	// 			.query('INSERT INTO EvolveInventory (EvolveItem_ID,EvolveLocation_ID,EvolveInventory_QtyOnHand,EvolveInventory_LotNumber,EvolveInventory_RefNumber,EvolveReason_ID,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventory_UpdatedAt,EvolveInventory_UpdatedUser) VALUES(@EvolveItem_ID,@EvolveLocation_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_LotNumber,@EvolveInventory_RefNumber,@EvolveReason_ID,@EvolveInventory_CreatedAt,@EvolveInventory_CreatedUser,@EvolveInventory_UpdatedAt,@EvolveInventory_UpdatedUser)')
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },

	movePalletHistory: async function (data) {
		let date = new Date();
		let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		let history_Data = {
			'EvolveCompany_ID': data.EvolveUnit_ID,
			'EvolveUnit_ID': data.EvolveUnit_ID,
			'EvolveApplication_ID': 3,
			'EvolveTranstype_code': 'movePallet',
			'EvolveTransitionHistory_DocumentID': data.EvolveInventory_ID,
			'EvolveTransitionHistory_DocumentDetailID': null,
			'EvolveLocation_ID': data.EvolveToLocation_ID,
			'EvolveItem_ID': parseInt(data.EvolveItem_ID),
			'EvolveUOM_ID': null,
			'EvolveInventoryStatus_ID': null,
			'EvolveTransitionHistory_AddressID': null,
			'EvolveInventory_ID': data.EvolveInventory_ID,
			'EvolveTransitionHistory_Quantity':null,
			'EvolveTransitionHistory_Shiptype': null,
			'EvolveTransitionHistory_SequenceId': null,
			'EvolveTransitionHistory_UserID': data.EvolveUser_ID,
			'EvolveMachine_ID': null,
			'EvolveReason_ID': parseInt(data.EvolveReason_ID),
			'EvolveTool_ID': null,
			'EvolveActivity_ID': null,
			'EvolveTransitionHistory_Description': 'MOVEPLLET',
		};
		let add_history = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(history_Data)

		if (add_history instanceof Error || add_history.rowsAffected < 1) {
			return new Error('EERR2110: Error In Getting while Updating History');
		} else {
			return "No Error";
		}
	},

	// movePalletUpdate: async function (EvolveInventory_ID, qty, EvolveReason_ID, EvolveUser_ID) {
	// 	try {
	// 		let date = new Date();
	// 		let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveInventory_ID', Evolve.Sql.Int, EvolveInventory_ID)
	// 			.input('EvolveInventory_QtyOnHand', Evolve.Sql.Int, qty)
	// 			.input('EvolveReason_ID', Evolve.Sql.Int, EvolveReason_ID)
	// 			.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
	// 			.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
	// 			.query('UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand , EvolveReason_ID = @EvolveReason_ID, EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt, EvolveInventory_UpdatedUser = @EvolveInventory_UpdatedUser  WHERE EvolveInventory_ID = @EvolveInventory_ID')
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },

	// movePalletAndDeleteRow: async function (data) {
	// 	try {
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
	// 			.query('DELETE EvolveInventory WHERE EvolveInventory_ID =@EvolveInventory_ID')
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },

	// getLocationDetails: async function (EvolveLocation_ID) {
	// 	try {
	// 		return await Evolve.SqlPool.request()
	// 		.input('EvolveLocation_ID', Evolve.Sql.Int, EvolveLocation_ID)
	// 			.query('SELECT EvolveLocation_Name FROM EvolveLocation WHERE EvolveLocation_ID = @EvolveLocation_ID')
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },

	// getItemDetails: async function (id) {
	// 	try {
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveItem_ID', Evolve.Sql.Int, id)
	// 			.query('select * from EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID')
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },
	// movePallet: async function (data) {
	// 	try {
	// 		let date = new Date();
	// 		let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
	// 			.input('EvolveInventory_QtyOnHand', Evolve.Sql.Int, data.EvolveInventory_QtyOnHand)
	// 			.input('EvolveReason_ID', Evolve.Sql.Int, data.EvolveReason_ID)
	// 			.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
	// 			.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
	// 			.query('UPDATE EvolveInventory SET EvolveInventory_QtyOnHand =@EvolveInventory_QtyOnHand , EvolveReason_ID = @EvolveReason_ID WHERE EvolveInventory_ID =@EvolveInventory_ID')
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },
	// getLocationRule: async function (data) {
	// 	try {
		
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveToLocation_ID', Evolve.Sql.Int, data.EvolveToLocation_ID)
			
	// 			.query("SELECT * FROM EvolveLocation WHERE EvolveLocation_ID=@EvolveToLocation_ID ")
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },
	// checkItemAvaibility: async function ( EvolveItem_ID , EvolveToLocation_ID) {
	// 	try {
	// 			return await Evolve.SqlPool.request()
	// 			.input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
	// 			.input('EvolveToLocation_ID', Evolve.Sql.Int, EvolveToLocation_ID)

			
	// 			.query("SELECT * FROM EvolveInventory WHERE EvolveItem_ID=@EvolveItem_ID AND EvolveLocation_ID=@EvolveToLocation_ID ")
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },

	// checkLotAvaibility: async function ( EvolveInventory_LotNumber , EvolveToLocation_ID) {
	// 	try {
		
		
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, EvolveInventory_LotNumber)
	// 			.input('EvolveToLocation_ID', Evolve.Sql.Int, EvolveToLocation_ID)

			
	// 			.query("SELECT * FROM EvolveInventory WHERE EvolveInventory_LotNumber=@EvolveInventory_LotNumber AND EvolveLocation_ID=@EvolveToLocation_ID ")
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },

	// checkExpiryAvaibility: async function ( EvolveInventory_ExpireDateTime , EvolveToLocation_ID) {
	// 	try {
		

		
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveInventory_ExpireDateTime', Evolve.Sql.NVarChar, EvolveInventory_ExpireDateTime)
	// 			.input('EvolveToLocation_ID', Evolve.Sql.Int, EvolveToLocation_ID)

			
	// 			.query("SELECT * FROM EvolveInventory WHERE 	CONVERT(VARCHAR(10), EvolveInventory_ExpireDateTime, 111) = CONVERT(VARCHAR(10),@EvolveInventory_ExpireDateTime, 111) AND EvolveLocation_ID=@EvolveToLocation_ID ")


	// 			// CONVERT(VARCHAR(10), EvolveInventory_ExpireDateTime, 111) != CONVERT(VARCHAR(10),@EvolveInventory_ExpireDateTime, 111)
	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },

	updateLocation : async function(data)
	{
	
		let date = new Date();
		let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		return await Evolve.SqlPool.request()
			.input('EvolveTranstype_ID', Evolve.Sql.Int, data.EvolveTranstype_ID)
			.input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
			.input('EvolveToLocation_ID', Evolve.Sql.Int, data.EvolveToLocation_ID)
			.input('EvolveReason_ID', Evolve.Sql.Int, data.EvolveReason_ID)
			.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			.query('UPDATE EvolveInventory SET EvolveLocation_ID =@EvolveToLocation_ID , EvolveReason_ID = @EvolveReason_ID ,  EvolveTranstype_ID=@EvolveTranstype_ID  WHERE EvolveInventory_ID =@EvolveInventory_ID ')

	},

	getLocationList: async function () {
		try {
			return await Evolve.SqlPool.request()
				
				.query("select EvolveLocation_Name,EvolveLocation_ID , EvolveLocation_Status  FROM EvolveLocation WHERE   EvolveLocation_Type = 'I'  AND EvolveLocation_Status!='OUTWORK'")
		} catch (error) {
			Evolve.Log.error(" EERR2111: Error while getting Location List "+error.message);
			return new Error(" EERR2111: Error while getting Location List "+error.message);
		}
	},

	

	getPalletDetails: async function (EvolveInventory_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInventory_ID',Evolve.Sql.Int,EvolveInventory_ID)
				.query("SELECT einv.* , ei.EvolveItem_Code , el.EvolveLocation_Name FROM  EvolveInventory  einv , EvolveItem ei ,EvolveLocation el	WHERE  	einv.EvolveItem_ID  = ei.EvolveItem_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND EvolveInventory_ID ="+EvolveInventory_ID)
		} catch (error) {
			Evolve.Log.error(" EERR2112: Error while getting Pallet Details "+error.message);
			return new Error(" EERR2112	: Error while getting Pallet Details "+error.message);
		}
	},
	
	getTransTypeID :  async function (EvolveTranstype_Code) {
		try {
		  return await Evolve.SqlPool.request()
			.input("EvolveTranstype_Code", Evolve.Sql.NVarChar, EvolveTranstype_Code)
			.query("SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_Code = @EvolveTranstype_Code");
		} catch (error) {
		  Evolve.Log.error(" EERR2113: Error while getting Trans TypeID "+error.message);
		  return new Error(" EERR2113: Error while getting Trans TypeID "+error.message);
		}
	  },
	  addIOData: async function (data) {
		try {
		  let date = new Date();
		  let dataTime =
			date.getFullYear() +
			"-" +
			(date.getMonth() + 1) +
			"-" +
			date.getDate() +
			" " +
			date.getHours() +
			":" +
			date.getMinutes() +
			":" +
			date.getSeconds();
	
		  let createIORecord = await Evolve.SqlPool.request()
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
			.input("EvolveIO_File_InTime", Evolve.Sql.NVarChar, dataTime)
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
		  if (createIORecord instanceof Error || createIORecord.rowsAffected < 1) {
			Evolve.Log.error(" EERR2114: Error on add IO Data ");
			return new Error(" EERR2114: Error on add IO Data ");
		  } else {
			return createIORecord;
		  }
		} catch (error) {
		  Evolve.Log.error(" EERR2115: Error while adding IO Data "+error.message);
		  return new Error(" EERR2115: Error while adding IO Data "+error.message);
		}
	  },

	  getUnitCode :  async function (EvolveUnit_ID) {
		try {

		  return await Evolve.SqlPool.request()
			
			.query("SELECT EvolveUnit_Code FROM EvolveUnit WHERE EvolveUnit_ID ="+EvolveUnit_ID);
		} catch (error) {
		  Evolve.Log.error(" EERR2116: Error while getting Unit Code "+error.message);
		  return new Error(" EERR2116: Error while getting Unit Code "+error.message);
		}
	  },
	




}
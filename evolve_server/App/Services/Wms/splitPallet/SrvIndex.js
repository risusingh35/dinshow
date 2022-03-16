'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

	getInventoryList: async function (data) {
		try {
			let condition = "";
			if (Evolve.Config.splitPalletInvStatus) {
				let invStatus = Evolve.Config.splitPalletInvStatus.split(',');
				invStatus = invStatus.map(x => "'" + x + "'").toString();
				condition = "AND einv.EvolveInventory_Status NOT IN (" + invStatus + ")";
				console.log(condition);
			}
			else {
				condition = "";
			}
			// 
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
				.query("SELECT einv.*, eitem.EvolveItem_Code , eitem.EvolveItem_Desc, eitem.EvolveQCTemp_ID, euom.EvolveUom_Uom, el.EvolveLocation_Code FROM EvolveInventory einv, EvolveItem eitem , EvolveUom euom , EvolveLocation el WHERE einv.EvolveInventory_RefNumber = @EvolveInventory_LotNumber AND einv.EvolveItem_ID = eitem.EvolveItem_ID AND eitem.EvolveUom_ID = euom.EvolveUom_ID AND el.EvolveLocation_ID = einv.EvolveLocation_ID AND el.EvolveLocation_Status != 'OUTWORK' " + condition);
		} catch (error) {
			Evolve.Log.error(" EERR2166: Error while getting Inventory List "+error.message);
			return new Error(" EERR2166: Error while getting Inventory List "+error.message);
		}
	},

	getInventoryData: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_ID", Evolve.Sql.NVarChar, data.EvolveInventory_ID)
				.query("SELECT ei.* , eu.EvolveUom_ID , eim.EvolveItem_Code , el.EvolveLocation_Code  FROM EvolveInventory ei , EvolveItem eim , EvolveUom eu , EvolveLocation el WHERE ei.EvolveInventory_ID = @EvolveInventory_ID AND eim.EvolveItem_ID = ei.EvolveItem_ID  AND eu.EvolveUom_ID = eim.EvolveUom_ID AND el.EvolveLocation_ID = ei.EvolveLocation_ID");
		} catch (error) {
			Evolve.Log.error(" EERR2167: Error while getting Inventory Data "+error.message);
			return new Error(" EERR2167: Error while getting Inventory Data "+error.message);
		}
	},

	updateInventoryQty: async function (data, newQty) {
		let dateObj = new Date();
		var crnt_datetime = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate() + " " + dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds() + "." + dateObj.getMilliseconds();
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
				.input("EvolveInventory_QtyOnHand", Evolve.Sql.NVarChar, newQty)
				.input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, crnt_datetime)
				.input("EvolveInventory_UpdatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
				.query("UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand , EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt , EvolveInventory_UpdatedUser = @EvolveInventory_UpdatedUser WHERE EvolveInventory_ID = @EvolveInventory_ID");
		} catch (error) {
			Evolve.Log.error(" EERR2168: Error while updating Inventory Qty "+error.message);
			return new Error(" EERR2168: Error while updating Inventory Qty "+error.message);
		}
	},

	addInventory: async function (data) {
		let date = new Date();
		var crnt_datetime = date.getFullYear()+"-"+('0' + (date.getMonth() + 1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2)+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
		let date2  = new Date(data.EvolveInventory_ExpireDateTime);
		data.EvolveInventory_ExpireDateTime = date2.getFullYear()+"-"+('0' + (date2.getMonth() + 1)).slice(-2)+"-"+('0' + date2.getDate()).slice(-2)+' '+date2.getHours()+':'+date2.getMinutes()+':'+date2.getSeconds();
		try {
			// console.log("crnt_datetime : >>>", crnt_datetime);
			// console.log("data.EvolveInventory_ExpireDateTime :",data.EvolveInventory_ExpireDateTime )
			return await Evolve.SqlPool.request()
				.input("EvolveCompany_ID", Evolve.Sql.NVarChar, data.EvolveCompany_ID)
				.input("EvolveUnit_ID", Evolve.Sql.NVarChar, data.EvolveUnit_ID)
				.input("EvolveItem_ID", Evolve.Sql.NVarChar, data.EvolveItem_ID)
				.input("EvolveLocation_ID", Evolve.Sql.NVarChar, data.EvolveLocation_ID)
				.input("EvolveInventory_QtyOnHand", Evolve.Sql.NVarChar, data.EvolveInventory_QtyOnHand)
				.input("EvolveInventory_QtyAllocated", Evolve.Sql.NVarChar, data.EvolveInventory_QtyAllocated)
				.input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
				.input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
				.input("EvolveInventory_ExpireDateTime", Evolve.Sql.NVarChar, data.EvolveInventory_ExpireDateTime)
				.input("EvolveInventory_LotNotes", Evolve.Sql.NVarChar, data.EvolveInventory_LotNotes)
				.input("EvolveReason_ID", Evolve.Sql.NVarChar, data.EvolveReason_ID)
				.input("EvolveInventory_CustLotRef", Evolve.Sql.NVarChar, data.EvolveInventory_CustLotRef)
				.input("EvolveTranstype_ID", Evolve.Sql.NVarChar, data.EvolveTranstype_ID)
				.input("EvolveInventory_Status", Evolve.Sql.NVarChar, data.EvolveInventory_Status)
				.input("EvolveInventory_PostingStatus", Evolve.Sql.NVarChar, "ERPPOSTED")
				.input("EvolveInventory_CreatedAt", Evolve.Sql.NVarChar, crnt_datetime)
                .input("EvolveInventory_CreatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, crnt_datetime)
				.input("EvolveInventory_UpdatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
				.query("INSERT INTO EvolveInventory (EvolveCompany_ID,EvolveUnit_ID,EvolveItem_ID,EvolveLocation_ID,EvolveInventory_QtyOnHand,EvolveInventory_QtyAllocated,EvolveInventory_LotNumber,EvolveInventory_RefNumber,EvolveInventory_ExpireDateTime,EvolveInventory_LotNotes,EvolveReason_ID,EvolveInventory_CustLotRef,EvolveTranstype_ID,EvolveInventory_Status,EvolveInventory_PostingStatus,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventory_UpdatedAt,EvolveInventory_UpdatedUser) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveItem_ID,@EvolveLocation_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_QtyAllocated,@EvolveInventory_LotNumber,@EvolveInventory_RefNumber,@EvolveInventory_ExpireDateTime,@EvolveInventory_LotNotes,@EvolveReason_ID,@EvolveInventory_CustLotRef,@EvolveTranstype_ID,@EvolveInventory_Status,@EvolveInventory_PostingStatus,@EvolveInventory_CreatedAt,@EvolveInventory_CreatedUser,@EvolveInventory_UpdatedAt,@EvolveInventory_UpdatedUser);select @@IDENTITY AS \'inserted_id\'");
		} catch (error) {
			Evolve.Log.error(" EERR2169: Error while adding Inventory "+error.message);
			console.log('addInventory error')
			return new Error(" EERR2169: Error while adding Inventory "+error.message);
		}
	},

	getLastInvRefNumber: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT TOP(1) EvolveInventory_RefNumber FROM EvolveInventory WHERE EvolveInventory_RefNumber LIKE 'SP%' ORDER BY EvolveInventory_ID DESC");
		} catch (error) {
			Evolve.Log.error(" EERR2170: Error while getting Last Inv Ref Number "+error.message);
			return new Error(" EERR2170: Error while getting Last Inv Ref Number "+error.message);
		}
	},

	getInvPalletNumber: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_ID", Evolve.Sql.NVarChar, data.EvolveInventory_ID)
				.query("SELECT EvolveInventory_RefNumber FROM EvolveInventory WHERE EvolveInventory_ID = @EvolveInventory_ID");
		} catch (error) {
			Evolve.Log.error(" EERR2171: Error while getting Inv Pallet Number "+error.message);
			return new Error(" EERR2171: Error while getting Inv Pallet Number "+error.message);
		}
	},

	updateInventoryPrint: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveInventory_ID", Evolve.Sql.NVarChar, data.EvolveInventory_ID)
				.query("UPDATE EvolveInventory SET EvolveInventory_LableIsPrint = 1 WHERE EvolveInventory_ID = @EvolveInventory_ID");
		} catch (error) {
			Evolve.Log.error(" EERR2172: Error while updating Inventory Print "+error.message);
			return new Error(" EERR2172: Error while updating Inventory Print "+error.message);
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
			Evolve.Log.error(" EERR2174: Error while adding IO Data "+error.message);
			return new Error(" EERR2174: Error while adding IO Data "+error.message);
		}
	},

}
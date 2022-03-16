'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getLocationList: async function () 
    {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveLocation");
        } catch (error) {
            Evolve.Log.error(" EERR2073: Error while getting Location List "+error.messageage);
            return new Error(" EERR2073: Error while getting Location List "+error.messageage);
        }
    },	

    getLocationCode: async function (EvolveLocation_ID) 
    {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLocation_ID',Evolve.Sql.Int,EvolveLocation_ID)
                .query("SELECT EvolveLocation_Code FROM EvolveLocation WHERE EvolveLocation_ID = @EvolveLocation_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2074: Error while getting Location Code "+error.messageage);
            return new Error(" EERR2074: Error while getting Location Code "+error.messageage);
        }
    },	

    getInventoryList: async function (data) 
    {
        try {
            let condition = "";
            if(Evolve.Config.combinePalletInvStatus)
            {
                let invStatus = Evolve.Config.combinePalletInvStatus.split(',');
                invStatus = invStatus.map(x => "'" + x + "'").toString();
                condition = "AND einv.EvolveInventory_Status NOT IN ("+invStatus+")";
                console.log(condition);
            }
            else
            {
                condition = "";
            }
            // 
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .query("SELECT einv.*, eitem.EvolveItem_Code , eitem.EvolveItem_Desc, eitem.EvolveQCTemp_ID, euom.EvolveUom_Uom, euom.EvolveUom_ID , el.EvolveLocation_Code  FROM EvolveInventory einv, EvolveItem eitem , EvolveUom euom , EvolveLocation el WHERE einv.EvolveInventory_RefNumber = @EvolveInventory_LotNumber  AND einv.EvolveItem_ID = eitem.EvolveItem_ID AND eitem.EvolveUom_ID = euom.EvolveUom_ID AND el.EvolveLocation_ID = einv.EvolveLocation_ID AND el.EvolveLocation_Status != 'OUTWORK' "+condition);
        } catch (error) {
            Evolve.Log.error(" EERR2075: Error while getting Inventory List "+error.messageage);
            return new Error(" EERR2075: Error while getting Inventory List "+error.messageage);
        }
    },	
    
    getInventoryData: async function (data) 
    {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.NVarChar, data.EvolveInventory_ID)
                .query("SELECT * FROM EvolveInventory WHERE EvolveInventory_ID = @EvolveInventory_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2076: Error while getting Inventory Data "+error.messageage);
            return new Error(" EERR2076: Error while getting Inventory Data "+error.messageage);
        }
    },	

    updateInventoryQty: async function (data,newQty) 
    {
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
            Evolve.Log.error(" EERR2077: Error while updating Inventory Qty "+error.messageage);
            return new Error(" EERR2077: Error while updating Inventory Qty "+error.messageage);
        }
    },	

    addInventory: async function (data) 
    {
        let date = new Date();
		var crnt_datetime = date.getFullYear()+"-"+('0' + (date.getMonth() + 1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2)+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        try {
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
                .input("EvolveInventory_PostingStatus", Evolve.Sql.NVarChar, 'ERPPOSTED')
                .input("EvolveInventory_CreatedAt", Evolve.Sql.NVarChar, crnt_datetime)
                .input("EvolveInventory_CreatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, crnt_datetime)
                .input("EvolveInventory_UpdatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .query("INSERT INTO EvolveInventory (EvolveCompany_ID,EvolveUnit_ID,EvolveItem_ID,EvolveLocation_ID,EvolveInventory_QtyOnHand,EvolveInventory_QtyAllocated,EvolveInventory_LotNumber,EvolveInventory_RefNumber,EvolveInventory_ExpireDateTime,EvolveInventory_LotNotes,EvolveReason_ID,EvolveInventory_CustLotRef,EvolveTranstype_ID,EvolveInventory_Status,EvolveInventory_PostingStatus,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventory_UpdatedAt,EvolveInventory_UpdatedUser) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveItem_ID,@EvolveLocation_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_QtyAllocated,@EvolveInventory_LotNumber,@EvolveInventory_RefNumber,@EvolveInventory_ExpireDateTime,@EvolveInventory_LotNotes,@EvolveReason_ID,@EvolveInventory_CustLotRef,@EvolveTranstype_ID,@EvolveInventory_Status,@EvolveInventory_PostingStatus,@EvolveInventory_CreatedAt,@EvolveInventory_CreatedUser,@EvolveInventory_UpdatedAt,@EvolveInventory_UpdatedUser);select @@IDENTITY AS \'inserted_id\'");
        } catch (error) {
            Evolve.Log.error(" EERR2078: Error while adding Inventory "+error.messageage);
            return new Error(" EERR2078: Error while adding Inventory "+error.messageage);
        }
    },	

    getLastCombineLot: async function () 
    {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT TOP(1) EvolveInventory_LotNumber FROM EvolveInventory WHERE EvolveInventory_RefNumber LIKE 'LOTCOMBINE%' ORDER BY EvolveInventory_ID DESC");
        } catch (error) {
            Evolve.Log.error(" EERR2079: Error while getting Last Combine Lot "+error.messageage);
            return new Error(" EERR2079: Error while getting Last Combine Lot "+error.messageage);
        }
    },
    getLastInvRefNumber: async function () 
    {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT TOP(1) EvolveInventory_RefNumber FROM EvolveInventory WHERE EvolveInventory_RefNumber LIKE 'CP%' ORDER BY EvolveInventory_ID DESC");
        } catch (error) {
            Evolve.Log.error(" EERR2080: Error while getting Last Inv Ref Number "+error.messageage);
            return new Error(" EERR2080: Error while getting Last Inv Ref Number "+error.messageage);
        }
    },
    
    removeInventory: async function (EvolveInventory_ID) 
    {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID",Evolve.Sql.Int,EvolveInventory_ID)
                .query("DELETE FROM EvolveInventory WHERE EvolveInventory_ID = @EvolveInventory_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2081: Error while removing Inventory "+error.messageage);
            return new Error(" EERR2081: Error while removing Inventory "+error.messageage);
        }
    },

    getInvPalletNumber: async function (data) 
    {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.NVarChar, data.EvolveInventory_ID)
                .query("SELECT EvolveInventory_RefNumber FROM EvolveInventory WHERE EvolveInventory_ID = @EvolveInventory_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2082: Error while getting Inv Pallet Number "+error.messageage);
            return new Error(" EERR2082: Error while getting Inv Pallet Number "+error.messageage);
        }
    },

    updateInventoryPrint: async function (data) 
    {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.NVarChar, data.EvolveInventory_ID)
                .query("UPDATE EvolveInventory SET EvolveInventory_LableIsPrint = 1 WHERE EvolveInventory_ID = @EvolveInventory_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2083: Error while updating Inventory Print "+error.messageage);
            return new Error(" EERR2083: Error while updating Inventory Print "+error.messageage);
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
				Evolve.Log.error("Error on add IO Data");
				return new Error("Error on add IO Data")
			} else {
				return createIORecord;
			}
		} catch (error) {
			Evolve.Log.error(" EERR2084: Error while adding IO Data "+error.messageage);
			return new Error(" EERR2084: Error while adding IO Data "+error.messageage);
		}
	},
}
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(esu.EvolveSapUpload_ID) as count FROM EvolveSapUpload esu WHERE (esu.EvolveSapUpload_ItemCode LIKE @search OR esu.EvolveSapUpload_InvoiceNo LIKE @search OR esu.EvolveSapUpload_VendorCode LIKE @search) AND cast(esu.EvolveSapUpload_CreatedAt as Date) = cast(getdate() as Date)")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getItemsList: async function (start,length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start',Evolve.Sql.Int,start)
                .input('length',Evolve.Sql.Int,length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT esu.* FROM EvolveSapUpload esu WHERE (esu.EvolveSapUpload_ItemCode LIKE @search OR EvolveSapUpload_InvoiceNo LIKE @search OR EvolveSapUpload_VendorCode LIKE @search) AND cast(esu.EvolveSapUpload_CreatedAt as Date) = cast(getdate() as Date) ORDER BY esu.EvolveSapUpload_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting Item List "+error.message);
            return new Error(" EERR1240: Error while getting Item List "+error.message);
        }
    },

    deleteItem: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.id)
                .query('DELETE FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1241: Error while deleting Item "+error.message);
            return new Error(" EERR1241: Error while deleting Item "+error.message);
        }
    },

    checkItemExist: async function (EvolveItem_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveItem_Code", Evolve.Sql.NVarChar, EvolveItem_Code)
                .query("SELECT EvolveItem_ID FROM EvolveItem WHERE EvolveItem_Code LIKE @EvolveItem_Code");
        } catch (error) {
            Evolve.Log.error(" EERR1242: Error while checking Item Exist "+error.message);
            return new Error(" EERR1242: Error while checking Item Exist "+error.message);
        }
    },

    addItem: async function (tableData, data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            
            let date = tableData['Date'];
            date = new Date(date);
            let newDate = new Date();

            let SapUpload_Date = date.getDate() +"/" +(date.getMonth() + 1)  +"/" +newDate.getFullYear();           
            
            return await Evolve.SqlPool.request()
                .input('EvolveSapUpload_ItemCode', Evolve.Sql.NVarChar, tableData['Item Code'])
                .input('EvolveSapUpload_Location', Evolve.Sql.NVarChar, tableData['Location'])
                .input('EvolveSapUpload_ItemDesc', Evolve.Sql.NVarChar, tableData['Description'])
                .input('EvolveSapUpload_BinNo', Evolve.Sql.NVarChar, tableData['BIN NO'])
                .input('EvolveSapUpload_InvoiceNo', Evolve.Sql.NVarChar, tableData['Invoice NO'])
                .input('EvolveSapUpload_DiNo', Evolve.Sql.NVarChar, tableData['DI NO'])
                .input('EvolveSapUpload_InvoiceQty', Evolve.Sql.NVarChar, tableData['Invoice Qty'])
                .input('EvolveSapUpload_PackingStandardQty', Evolve.Sql.NVarChar, tableData['Packing Standard Qty'])
                .input('EvolveSapUpload_VendorCode', Evolve.Sql.NVarChar, tableData['Vendor Code'])
                .input('EvolveSapUpload_Date', Evolve.Sql.NVarChar, SapUpload_Date)
                .input('EvolveSapUpload_VendorName', Evolve.Sql.NVarChar, tableData['Vendor Name'])
                // .input('EvolveSapUpload_CreatedAt', Evolve.Sql.NVarChar, tableData['Created Date'])

                .input('EvolveSapUpload_CreatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveSapUpload_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('INSERT INTO EvolveSapUpload (EvolveSapUpload_ItemCode , EvolveSapUpload_ItemDesc ,EvolveSapUpload_DiNo , EvolveSapUpload_InvoiceQty,EvolveSapUpload_Location, EvolveSapUpload_InvoiceNo,EvolveSapUpload_BinNo,EvolveSapUpload_CreatedAt,EvolveSapUpload_CreatedUser,EvolveSapUpload_PackingStandardQty , EvolveSapUpload_VendorCode,EvolveSapUpload_Date, EvolveSapUpload_VendorName) VALUES(@EvolveSapUpload_ItemCode , @EvolveSapUpload_ItemDesc, @EvolveSapUpload_DiNo ,@EvolveSapUpload_InvoiceQty,@EvolveSapUpload_Location, @EvolveSapUpload_InvoiceNo,@EvolveSapUpload_BinNo,@EvolveSapUpload_CreatedAt,@EvolveSapUpload_CreatedUser,@EvolveSapUpload_PackingStandardQty , @EvolveSapUpload_VendorCode , @EvolveSapUpload_Date, @EvolveSapUpload_VendorName)')
        } catch (error) {
            Evolve.Log.error(" EERR1243: Error while adding Item "+error.message);
            return new Error(" EERR1243: Error while adding Item "+error.message);
        }
    },

    updateItem: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.NVarChar, data['EvolveItem_ID'])
                .input('EvolveItem_Code', Evolve.Sql.NVarChar, data['Item Code'])
                .input('EvolveItem_Desc', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveItem_Type', Evolve.Sql.NVarChar, data['Item Type'])
                .input('EvolveItem_load_capacity', Evolve.Sql.NVarChar, data['Load Capacity'])
                .input('EvolveUom_ID', Evolve.Sql.NVarChar, data['Unit of Measure'])

                .input('EvolveItem_CustPart', Evolve.Sql.NVarChar, data['Cust Part'])
                .input('EvolveItem_InventoryTrackable', Evolve.Sql.NVarChar, data['Inventory Trackable'])
                .input('EvolveItem_IsScan', Evolve.Sql.NVarChar, data['Is Scan'])

                .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveItem_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveItem SET EvolveItem_Code = @EvolveItem_Code , EvolveItem_Desc = @EvolveItem_Desc, EvolveItem_Type = @EvolveItem_Type, EvolveItem_load_capacity = @EvolveItem_load_capacity, EvolveItem_CustPart = @EvolveItem_CustPart, EvolveItem_InventoryTrackable = @EvolveItem_InventoryTrackable, EvolveItem_IsScan = @EvolveItem_IsScan,  EvolveItem_UpdateAt = @EvolveItem_UpdateAt , EvolveItem_UpdateUser = @EvolveItem_UpdateUser WHERE EvolveItem_ID = @EvolveItem_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1244: Error while updating Item "+error.message);
            return new Error(" EERR1244: Error while updating Item "+error.message);
        }
    },

}    
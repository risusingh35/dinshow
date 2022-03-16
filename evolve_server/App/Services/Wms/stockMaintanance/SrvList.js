'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getStockCount : async function (search,maxDate) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
          .input('EvolveCustomStockTake_UploadedAt',Evolve.Sql.Date,maxDate)

    



            .query("SELECT COUNT(einv.EvolveCustomStockTake_ID) as count  FROM EvolveCustomStockTake einv  WHERE ( einv.EvolveCustomStockTake_ItemCode LIKE @search OR  einv.EvolveCustomStockTake_BatchNo LIKE @search ) AND EvolveCustomStockTake_UploadedAt=@EvolveCustomStockTake_UploadedAt ")
        } catch (error) {
          Evolve.Log.error(" EERR32468: Error while get stock count "+error.message);
          return new Error(" EERR32468: Error while get stock count "+error.message);
        }
      },


    getStockList: async function (start ,length,search,maxDate) {
        try {
            return await Evolve.SqlPool.request()
                .input('start',Evolve.Sql.Int,start)
                .input('length',Evolve.Sql.Int,length)
                .input('EvolveCustomStockTake_UploadedAt',Evolve.Sql.Date,maxDate)


                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

                .query(" SELECT convert(varchar, EvolveCustomStockTake_UploadedAt, 103) as EvolveCustomStockTake_UploadedAt ,convert(varchar, EvolveCustomStockTake_CurrentQtyUpdatedAt, 103) as EvolveCustomStockTake_CurrentQtyUpdatedAt ,  einv.EvolveCustomStockTake_WarehouseName ,einv.EvolveCustomStockTake_CurrentQty, Convert(char(3), einv.EvolveCustomStockTake_UploadedAt, 0) as month ,YEAR(einv.EvolveCustomStockTake_UploadedAt) as year,  einv.EvolveCustomStockTake_ID ,  einv.EvolveCustomStockTake_ItemCode , einv.EvolveCustomStockTake_BatchNo ,einv.EvolveCustomStockTake_TotalQty   FROM EvolveCustomStockTake einv  WHERE  (einv.EvolveCustomStockTake_ItemCode LIKE @search OR  einv.EvolveCustomStockTake_BatchNo LIKE @search ) AND EvolveCustomStockTake_UploadedAt=@EvolveCustomStockTake_UploadedAt  ORDER BY einv.EvolveCustomStockTake_ID  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR32469: Error while get stock list "+error.message);
            return new Error(" EERR32469: Error while get stock list "+error.message);
        }
    },



    checkInvExist: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCustomStockTake_BatchNo',Evolve.Sql.NVarChar,data['Batch Number'].trim())
                .input('EvolveCustomStockTake_WarehouseName',Evolve.Sql.NVarChar,data['Ware House Name'].trim())
                .input('EvolveCustomStockTake_UploadedAt',Evolve.Sql.NVarChar,data['Stock Date'].trim())
                .query("  SELECT  einv.EvolveCustomStockTake_ID FROM  EvolveCustomStockTake einv WHERE  einv.EvolveCustomStockTake_BatchNo=@EvolveCustomStockTake_BatchNo  AND einv.EvolveCustomStockTake_WarehouseName = @EvolveCustomStockTake_WarehouseName AND EvolveCustomStockTake_UploadedAt=@EvolveCustomStockTake_UploadedAt");
        } catch (error) {
            Evolve.Log.error(" EERR32471: Error while check inventory "+error.message);
            return new Error(" EERR32471: Error while check inventory "+error.message);
        }
    },
    updateInv: async function (userDetails ,EvolveCustomStockTake_ID ,data) {
        try {

            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
                .input('EvolveCustomStockTake_ID',Evolve.Sql.NVarChar,EvolveCustomStockTake_ID)
                .input('EvolveCustomStockTake_TotalQty',Evolve.Sql.NVarChar,data['Quantity'])
                .input('EvolveCompany_ID', Evolve.Sql.Int, userDetails.EvolveCompany_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, userDetails.EvolveUnit_ID)
                .input('EvolveCustomStockTake_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCustomStockTake_UpdatedUser', Evolve.Sql.Int, userDetails.EvolveUser_ID)
                .input('EvolveCustomStockTake_ItemDesc',Evolve.Sql.NVarChar,data['Item Description'].trim())
                .input('EvolveCustomStockTake_VendItemCode',Evolve.Sql.NVarChar,data['Vendor Item Code'].trim())
                .input('EvolveCustomStockTake_InternalCode',Evolve.Sql.NVarChar,data['Internal Code'].trim())
                .input('EvolveCustomStockTake_Uom',Evolve.Sql.NVarChar,data['UoM'].trim())

             
                .query("UPDATE EvolveCustomStockTake SET EvolveCustomStockTake_TotalQty= @EvolveCustomStockTake_TotalQty , EvolveCompany_ID=@EvolveCompany_ID , EvolveUnit_ID=@EvolveUnit_ID , EvolveCustomStockTake_UpdatedAt=@EvolveCustomStockTake_UpdatedAt , EvolveCustomStockTake_UpdatedUser=@EvolveCustomStockTake_UpdatedUser ,EvolveCustomStockTake_ItemDesc=@EvolveCustomStockTake_ItemDesc ,EvolveCustomStockTake_VendItemCode=@EvolveCustomStockTake_VendItemCode ,EvolveCustomStockTake_InternalCode=@EvolveCustomStockTake_InternalCode ,  EvolveCustomStockTake_Uom=@EvolveCustomStockTake_Uom  WHERE EvolveCustomStockTake_ID=@EvolveCustomStockTake_ID  ");
        } catch (error) {
            Evolve.Log.error(" EERR32472: Error while update inventory "+error.message);
            return new Error(" EERR32472: Error while update inventory "+error.message);
        }
    },
    addInv: async function (userDetails, data) {
        try {
            console.log("data>>>" ,  data)
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                
                .input('EvolveCustomStockTake_ItemCode',Evolve.Sql.NVarChar,data['Item Code'].trim())
                .input('EvolveCustomStockTake_BatchNo',Evolve.Sql.NVarChar,data['Batch Number'].trim())
                .input('EvolveCustomStockTake_WarehouseName',Evolve.Sql.NVarChar,data['Ware House Name'].trim
                ())
                .input('EvolveCustomStockTake_ItemDesc',Evolve.Sql.NVarChar,data['Item Description'].trim())
                .input('EvolveCustomStockTake_VendItemCode',Evolve.Sql.NVarChar,data['Vendor Item Code'].trim())
                .input('EvolveCustomStockTake_InternalCode',Evolve.Sql.NVarChar,data['Internal Code'].trim())
                .input('EvolveCustomStockTake_Uom',Evolve.Sql.NVarChar,data['UoM'].trim())

                .input('EvolveCustomStockTake_TotalQty',Evolve.Sql.NVarChar,data['Quantity'])
                .input('EvolveCustomStockTake_CurrentQty',Evolve.Sql.NVarChar,0)
                .input('EvolveCustomStockTake_UploadedAt',Evolve.Sql.NVarChar,data['Stock Date'].trim())
                .input('EvolveCustomStockTake_CurrentQtyUpdatedAt', Evolve.Sql.NVarChar, null)

                .input('EvolveCustomStockTake_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCustomStockTake_UpdatedUser', Evolve.Sql.Int, userDetails.EvolveUser_ID)
                .input('EvolveCustomStockTake_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCustomStockTake_CreatedUser', Evolve.Sql.Int, userDetails.EvolveUser_ID)
                .input('EvolveCompany_ID', Evolve.Sql.Int, userDetails.EvolveCompany_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, userDetails.EvolveUnit_ID)
             
                .query('INSERT INTO EvolveCustomStockTake (EvolveCustomStockTake_ItemCode ,EvolveCustomStockTake_BatchNo ,EvolveCustomStockTake_TotalQty ,EvolveCustomStockTake_WarehouseName, EvolveCustomStockTake_CreatedAt,EvolveCustomStockTake_CreatedUser,EvolveCustomStockTake_UpdatedAt , EvolveCustomStockTake_UpdatedUser,EvolveCompany_ID,EvolveUnit_ID,EvolveCustomStockTake_UploadedAt , EvolveCustomStockTake_ItemDesc , EvolveCustomStockTake_VendItemCode , EvolveCustomStockTake_InternalCode , EvolveCustomStockTake_Uom ) VALUES(@EvolveCustomStockTake_ItemCode, @EvolveCustomStockTake_BatchNo, @EvolveCustomStockTake_TotalQty ,@EvolveCustomStockTake_WarehouseName,@EvolveCustomStockTake_CreatedAt,@EvolveCustomStockTake_CreatedUser,@EvolveCustomStockTake_UpdatedAt , @EvolveCustomStockTake_UpdatedUser,@EvolveCompany_ID ,@EvolveUnit_ID,@EvolveCustomStockTake_UploadedAt, @EvolveCustomStockTake_ItemDesc , @EvolveCustomStockTake_VendItemCode , @EvolveCustomStockTake_InternalCode , @EvolveCustomStockTake_Uom)')
        } catch (error) {
            Evolve.Log.error(" EERR32473: Error while add inventory "+error.message);
            return new Error(" EERR32473: Error while add inventory "+error.message);
        }
    },
    
    getinvDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveCustomStockTake_BatchNo", Evolve.Sql.NVarChar, data.batchNo)
                .input("EvolveCustomStockTake_WarehouseName", Evolve.Sql.NVarChar, data.wereHouseName)
                .input("EvolveCustomStockTake_UploadedAt", Evolve.Sql.NVarChar, data.uploadedDate)



                .query("SELECT TOP(1)  einv.EvolveCustomStockTake_ItemDesc , einv.EvolveCustomStockTake_VendItemCode , einv.EvolveCustomStockTake_InternalCode , einv.EvolveCustomStockTake_Uom, convert(varchar, EvolveCustomStockTake_UploadedAt, 103) as EvolveCustomStockTake_UploadedAt ,convert(varchar, EvolveCustomStockTake_CurrentQtyUpdatedAt, 103) as EvolveCustomStockTake_CurrentQtyUpdatedAt ,  einv.EvolveCustomStockTake_WarehouseName ,einv.EvolveCustomStockTake_CurrentQty, Convert(char(3), einv.EvolveCustomStockTake_UploadedAt, 0) as month ,YEAR(einv.EvolveCustomStockTake_UploadedAt) as year,  einv.EvolveCustomStockTake_ID ,  einv.EvolveCustomStockTake_ItemCode , einv.EvolveCustomStockTake_BatchNo ,einv.EvolveCustomStockTake_TotalQty   FROM EvolveCustomStockTake einv  WHERE  einv.EvolveCustomStockTake_BatchNo = @EvolveCustomStockTake_BatchNo AND EvolveCustomStockTake_WarehouseName = @EvolveCustomStockTake_WarehouseName AND EvolveCustomStockTake_UploadedAt=@EvolveCustomStockTake_UploadedAt  ORDER BY EvolveCustomStockTake_UploadedAt  DESC ");
        } catch (error) {
            Evolve.Log.error(" EERR32480: Error while get stock details "+error.message);
            return new Error(" EERR32480: Error while get stock details "+error.message);
        }
    },

        
    updateInvQty: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
              
                .input("EvolveCustomStockTake_CurrentQty", Evolve.Sql.NVarChar, data.qty)
                .input("EvolveCustomStockTake_ID", Evolve.Sql.Int, data.stockId)
                .input('EvolveCustomStockTake_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCustomStockTake_CurrentQtyUpdatedAt', Evolve.Sql.NVarChar, dataTime)

                .input('EvolveCustomStockTake_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                
                .query("UPDATE EvolveCustomStockTake SET  EvolveCustomStockTake_CurrentQty = EvolveCustomStockTake_CurrentQty +@EvolveCustomStockTake_CurrentQty , EvolveCustomStockTake_UpdatedAt=@EvolveCustomStockTake_UpdatedAt ,EvolveCustomStockTake_CurrentQtyUpdatedAt   =@EvolveCustomStockTake_CurrentQtyUpdatedAt , EvolveCustomStockTake_UpdatedUser=@EvolveCustomStockTake_UpdatedUser WHERE EvolveCustomStockTake_ID = @EvolveCustomStockTake_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32481: Error while update stock qty "+error.message);
            return new Error(" EERR32481: Error while update stock qty "+error.message);
        }
    },
    getMaxDateOfStock: async function () {
        try {
            return await Evolve.SqlPool.request()
            
                .query("SELECT  MAX(EvolveCustomStockTake_UploadedAt) as maxDate FROM EvolveCustomStockTake");
        } catch (error) {
            Evolve.Log.error(" EERR32486: Error while get max date "+error.message);
            return new Error(" EERR32486: Error while get max date "+error.message);
        }
    },
    addStockDetails: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                
                .input('EvolveCustomStockTake_ItemCode',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_ItemCode)
                .input('EvolveCustomStockTake_BatchNo',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_BatchNo)
                .input('EvolveCustomStockTake_WarehouseName',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_WarehouseName)
                .input('EvolveCustomStockTake_ItemDesc',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_ItemDesc)
                .input('EvolveCustomStockTake_VendItemCode',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_VendItemCode)
                .input('EvolveCustomStockTake_InternalCode',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_InternalCode)
                .input('EvolveCustomStockTake_Uom',data.EvolveCustomStockTake_Uom)

                .input('EvolveCustomStockTake_TotalQty',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_TotalQty)
                .input('EvolveCustomStockTake_CurrentQty',Evolve.Sql.NVarChar,0)
                .input('EvolveCustomStockTake_UploadedAt',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_UploadedAt)
                .input('EvolveCustomStockTake_CurrentQtyUpdatedAt', Evolve.Sql.NVarChar, null)

                .input('EvolveCustomStockTake_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCustomStockTake_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCustomStockTake_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCustomStockTake_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
             
                .query('INSERT INTO EvolveCustomStockTake (EvolveCustomStockTake_ItemCode ,EvolveCustomStockTake_BatchNo ,EvolveCustomStockTake_TotalQty ,EvolveCustomStockTake_WarehouseName, EvolveCustomStockTake_CreatedAt,EvolveCustomStockTake_CreatedUser,EvolveCustomStockTake_UpdatedAt , EvolveCustomStockTake_UpdatedUser,EvolveCompany_ID,EvolveUnit_ID,EvolveCustomStockTake_UploadedAt , EvolveCustomStockTake_ItemDesc , EvolveCustomStockTake_VendItemCode , EvolveCustomStockTake_InternalCode , EvolveCustomStockTake_Uom ) VALUES(@EvolveCustomStockTake_ItemCode, @EvolveCustomStockTake_BatchNo, @EvolveCustomStockTake_TotalQty ,@EvolveCustomStockTake_WarehouseName,@EvolveCustomStockTake_CreatedAt,@EvolveCustomStockTake_CreatedUser,@EvolveCustomStockTake_UpdatedAt , @EvolveCustomStockTake_UpdatedUser,@EvolveCompany_ID ,@EvolveUnit_ID,@EvolveCustomStockTake_UploadedAt, @EvolveCustomStockTake_ItemDesc , @EvolveCustomStockTake_VendItemCode , @EvolveCustomStockTake_InternalCode , @EvolveCustomStockTake_Uom)')
        } catch (error) {
            Evolve.Log.error(" EERR32487: Error while add stock details "+error.message);
            return new Error(" EERR32487: Error while add stock details "+error.message);
        }
    },
    updateStockDetails: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveCustomStockTake_ID',Evolve.Sql.Int,data.EvolveCustomStockTake_ID)
                .input('EvolveCustomStockTake_ItemCode',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_ItemCode)
                .input('EvolveCustomStockTake_BatchNo',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_BatchNo)
                .input('EvolveCustomStockTake_WarehouseName',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_WarehouseName)
                .input('EvolveCustomStockTake_ItemDesc',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_ItemDesc)
                .input('EvolveCustomStockTake_VendItemCode',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_VendItemCode)
                .input('EvolveCustomStockTake_InternalCode',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_InternalCode)
                .input('EvolveCustomStockTake_Uom',data.EvolveCustomStockTake_Uom)

                .input('EvolveCustomStockTake_TotalQty',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_TotalQty)
                .input('EvolveCustomStockTake_CurrentQty',Evolve.Sql.NVarChar,0)
                .input('EvolveCustomStockTake_UploadedAt',Evolve.Sql.NVarChar,data.EvolveCustomStockTake_UploadedAt)
                .input('EvolveCustomStockTake_CurrentQtyUpdatedAt', Evolve.Sql.NVarChar, null)

                .input('EvolveCustomStockTake_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCustomStockTake_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
             
                .query('UPDATE EvolveCustomStockTake SET EvolveCustomStockTake_ItemCode = @EvolveCustomStockTake_ItemCode , EvolveCustomStockTake_BatchNo =@EvolveCustomStockTake_BatchNo ,EvolveCustomStockTake_WarehouseName=@EvolveCustomStockTake_WarehouseName , EvolveCustomStockTake_ItemDesc =@EvolveCustomStockTake_ItemDesc , EvolveCustomStockTake_VendItemCode=@EvolveCustomStockTake_VendItemCode , EvolveCustomStockTake_InternalCode=@EvolveCustomStockTake_InternalCode ,  EvolveCustomStockTake_Uom=@EvolveCustomStockTake_Uom , EvolveCustomStockTake_TotalQty=@EvolveCustomStockTake_TotalQty , EvolveCustomStockTake_CurrentQty=@EvolveCustomStockTake_CurrentQty ,EvolveCustomStockTake_UploadedAt=@EvolveCustomStockTake_UploadedAt ,EvolveCustomStockTake_UpdatedAt=@EvolveCustomStockTake_UpdatedAt ,EvolveCustomStockTake_UpdatedUser=@EvolveCustomStockTake_UpdatedUser , EvolveCompany_ID=@EvolveCompany_ID ,  EvolveUnit_ID=@EvolveUnit_ID  WHERE EvolveCustomStockTake_ID=@EvolveCustomStockTake_ID   ')
        } catch (error) {
            Evolve.Log.error(" EERR32488: Error while update stock details "+error.message);
            return new Error(" EERR32488: Error while update stock details "+error.message);
        }
    },
}
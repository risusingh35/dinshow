'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getStockCount : async function (data) {
        try {
            // let conndition = '';
            // if(data.unitId != null){

            //     conndition += ' AND eu.EvolveUnit_ID='+data.unitId


            // }
            // if(data.itemId != null){
            //     conndition += ' AND ei.EvolveItem_ID='+data.itemId

                
            // }
            // if(data.batcNo !=''){
            //     conndition += ' AND einv.EvolveInventory_CustLotRef='+"'"+data.batcNo.trim()+"'"
                
            // }
            // console.log("Condition  in  history  >> " , conndition)
            
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+data.search+'%')
          .input('EvolveCustomStockTake_UploadedAt',Evolve.Sql.Date,data.maxDate)


            .query("SELECT COUNT(einv.EvolveCustomStockTake_ID) as count  FROM EvolveCustomStockTake einv  WHERE ( einv.EvolveCustomStockTake_ItemCode LIKE @search OR  einv.EvolveCustomStockTake_BatchNo LIKE @search ) AND convert(varchar, EvolveCustomStockTake_UploadedAt, 103)=convert(varchar, @EvolveCustomStockTake_UploadedAt, 103)")
        } catch (error) {
          Evolve.Log.error(" EERR32508: Error while get stock count "+error.message);
          return new Error(" EERR32508: Error while get stock count "+error.message);
        }
    },
    getStockList: async function (data) {
        try {

            return await Evolve.SqlPool.request()
                .input('start',Evolve.Sql.Int,data.start)
                .input('length',Evolve.Sql.Int,data.length)
                .input('search', Evolve.Sql.NVarChar, '%'+data.search+'%')
                .input('EvolveCustomStockTake_UploadedAt',Evolve.Sql.Date,data.maxDate)


                .query(" SELECT einv.EvolveCustomStockTake_ItemDesc , einv.EvolveCustomStockTake_VendItemCode , einv.EvolveCustomStockTake_InternalCode , einv.EvolveCustomStockTake_Uom, convert(varchar, EvolveCustomStockTake_UploadedAt, 103) as EvolveCustomStockTake_UploadedAt ,convert(varchar, EvolveCustomStockTake_CurrentQtyUpdatedAt, 103) as EvolveCustomStockTake_CurrentQtyUpdatedAt ,  einv.EvolveCustomStockTake_WarehouseName ,einv.EvolveCustomStockTake_CurrentQty, Convert(char(3), einv.EvolveCustomStockTake_UploadedAt, 0) as month ,YEAR(einv.EvolveCustomStockTake_UploadedAt) as year,  einv.EvolveCustomStockTake_ID ,  einv.EvolveCustomStockTake_ItemCode , einv.EvolveCustomStockTake_BatchNo ,einv.EvolveCustomStockTake_TotalQty   FROM EvolveCustomStockTake einv  WHERE  (einv.EvolveCustomStockTake_ItemCode LIKE @search OR  einv.EvolveCustomStockTake_BatchNo LIKE @search ) AND convert(varchar, EvolveCustomStockTake_UploadedAt, 103)=convert(varchar, @EvolveCustomStockTake_UploadedAt, 103)  ORDER BY einv.EvolveCustomStockTake_ID  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR32509: Error while get stock list "+error.message);
            return new Error(" EERR32509: Error while get stock list "+error.message);
        }
    },
    // getUnitList: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()


    //             .query(" SELECT EvolveUnit_ID ,  EvolveUnit_Name  FROM  EvolveUnit");
    //     } catch (error) {
    //         Evolve.Log.error(" EERR32469: Error while get unit list "+error.message);
    //         return new Error(" EERR32469: Error while get unit list "+error.message);
    //     }
    // },
    // getItemSearch: async function (search) {
    //     try {
    //         let query = "SELECT EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE '%" + search + "%' "
    //         return await Evolve.SqlPool.request().query(query);
    //     } catch (error) {
    //         Evolve.Log.error(" EERR1180: Error while getting Item Search "+error.message);
    //         return new Error(" EERR1180: Error while getting Item Search "+error.message);
    //     }
    // },
    getWareHouseNameList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT  DISTINCT EvolveCustomStockTake_WarehouseName  FROM  EvolveCustomStockTake ");
        } catch (error) {
            Evolve.Log.error(" EERR32510: Error while get warehouse name list "+error.message);
            return new Error(" EERR32510: Error while get warehouse name list "+error.message);
        }
    },
    getWareHouseNameList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT  DISTINCT EvolveCustomStockTake_WarehouseName  FROM  EvolveCustomStockTake ");
        } catch (error) {
            Evolve.Log.error(" EERR32511: Error while get warehouse name list "+error.message);
            return new Error(" EERR32511: Error while get warehouse name list "+error.message);
        }
    },
    getUploadedDateList: async function () {    
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT  DISTINCT     convert(varchar, EvolveCustomStockTake_UploadedAt, 103) as EvolveCustomStockTake_UploadedAt ,  EvolveCustomStockTake_UploadedAt as dbFormatEvolveCustomStockTake_UploadedAt FROM   EvolveCustomStockTake ORDER BY EvolveCustomStockTake_UploadedAt DESC  ");
        } catch (error) {
            Evolve.Log.error(" EERR32512: Error while get uploaded date list "+error.message);
            return new Error(" EERR32512: Error while get uploaded date list "+error.message);
        }
    },
    getStockDetailList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("   SELECT  DISTINCT EvolveCustomStockTake_BatchNo  ,  EvolveCustomStockTake_ItemCode , convert(varchar, EvolveCustomStockTake_UploadedAt, 103)  as EvolveCustomStockTake_UploadedAt FROM  EvolveCustomStockTake ");
        } catch (error) {
            Evolve.Log.error(" EERR32513: Error while get stock detail list "+error.message);
            return new Error(" EERR32513: Error while get stock detail list "+error.message);
        }
    },
    getStockDetaisByDate: async function (data) {
        try {
            
            return await Evolve.SqlPool.request()
            .input('EvolveCustomStockTake_UploadedAt', Evolve.Sql.NVarChar, data.uploadedDate)

                .query("SELECT * FROM EvolveCustomStockTake    WHERE EvolveCustomStockTake_UploadedAt =@EvolveCustomStockTake_UploadedAt ");
        } catch (error) {
            Evolve.Log.error(" EERR32514: Error while get stock detail list "+error.message);
            return new Error(" EERR32514: Error while get stock detail list "+error.message);
        }
    },
    getMaxDateOfStock: async function () {
        try {
            return await Evolve.SqlPool.request()
            
                .query("SELECT  MAX(EvolveCustomStockTake_UploadedAt) as maxDate FROM EvolveCustomStockTake");
        } catch (error) {
            Evolve.Log.error(" EERR32515: Error while get max date "+error.message);
            return new Error(" EERR32515: Error while get max date "+error.message);
        }
    },
    getLastDatearomWHName: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveCustomStockTake_WarehouseName', Evolve.Sql.NVarChar, data.wareHouseName)
                .query("SELECT  TOP(1) convert(varchar, EvolveCustomStockTake_UploadedAt, 103)  as EvolveCustomStockTake_UploadedAt FROM  EvolveCustomStockTake WHERE EvolveCustomStockTake_WarehouseName=@EvolveCustomStockTake_WarehouseName  ORDER BY  EvolveCustomStockTake_UploadedAt DESC");
        } catch (error) {
            Evolve.Log.error(" EERR32516: Error while get date "+error.message);
            return new Error(" EERR32516: Error while get date "+error.message);
        }
    },


}
'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {

    
	getQcOrderList :async function (search){
        try {
            let query = "SELECT TOP(20) EvolveQCOrder_Num as title , EvovleQCOrder_ID as id FROM EvolveQCOrder WHERE EvolveQCOrder_Num LIKE '%" + search + "%'"
           return await Evolve.SqlPool.request().query(query);
         } catch (error) {
     
           Evolve.Log.error(" Error in get QCOrder List Url "+error.message);
           return new Error(" Error in get QCOrder List Url "+error.message);
         }
    },

    getRejectPalletList : async function(EvovleQCOrder_ID){
        try {
            return await Evolve.SqlPool.request()
            .input("EvovleQCOrder_ID", Evolve.Sql.Int, EvovleQCOrder_ID)
            .query("SELECT 1 as IsSelected ,eqcod.EvovleQCOrderDetails_ID , einv.EvolveInventory_ID, ei.EvolveItem_Code , ei.EvolveItem_Desc , eqcod.EvolveQC_Pallet_No , eqcod.EvolveQC_RejectedQty , el.EvolveLocation_Name , eqcod.EvolveInventory_LotNumber , euom.EvolveUom_Uom , encr.EvolveNCR_No from EvolveQCOrder eqco , EvolveQCOrderDetails eqcod , EvolveInventory einv , EvolveItem ei , EvolveLocation el , EvolveUom euom , EvolveNCR encr WHERE eqco.EvovleQCOrder_ID= @EvovleQCOrder_ID and eqco.EvovleQCOrder_ID = eqcod.EvovleQCOrder_ID and eqcod.EvolveQC_Pallet_No = einv.EvolveInventory_RefNumber and einv.EvolveItem_ID = ei.EvolveItem_ID and el.EvolveLocation_ID = eqcod.EvolveQCOrderDetails_RejectedLocation_ID and einv.EvolveUom_ID = euom.EvolveUom_ID and eqcod.EvolveInventory_LotNumber = EvolveNCR_Lot_No and einv.EvolveInventory_Status = 'REJECT'");
            
        } catch (error) {
            Evolve.Log.error(" Error in get Rejected pallet List Url "+error.message);
            return new Error(" Error in get rejected pallet List Url "+error.message);
        }
    },

    conformSupplierReturn : async function (data){
        try {
            let error = false;
            let error_msg = '';
            for(let i in data){
                if(error == false){
                   console.log(data[i].EvolveSupplierRtn_Ncr_No,'>>>>>>>>>>>>>>>>>');
                    let insertdata = await Evolve.SqlPool.request()
                    .input("EvolveInventory_ID", Evolve.Sql.Int, data[i].EvolveInventory_ID)
                    .input("EvolveQCOrder_ID", Evolve.Sql.Int, data[i].EvolveQCOrder_ID)
                    .input("EvovleQCOrderDetails_ID", Evolve.Sql.Int, data[i].EvovleQCOrderDetails_ID)
                    .input("EvolveSupplierRtn_Ncr_No", Evolve.Sql.NVarChar, data[i].EvolveSupplierRtn_Ncr_No)
                    .query('INSERT INTO EvolveSupplierRtn (EvolveInventory_ID , EvolveQCOrder_ID , EvolveQCOrderDetails_ID , EvolveSupplierRtn_Ncr_No) VALUES (@EvolveInventory_ID , @EvolveQCOrder_ID , @EvovleQCOrderDetails_ID, @EvolveSupplierRtn_Ncr_No) ')
                    
                    let updatestatus = await Evolve.SqlPool.request()
                    .input("EvolveInventory_ID", Evolve.Sql.Int, data[i].EvolveInventory_ID)
                    .query("UPDATE EvolveInventory SET EvolveInventory_Status='DESTROY' WHERE EvolveInventory_ID = @EvolveInventory_ID")
                    if (insertdata.rowsAffected < 1 || updatestatus.rowsAffected<1){
                        error = true;
                        error_msg = insertdata.message
                    }
                } 
            }
           if(error == true){
               return {
                    statusCode : 400,
                    message : error_msg
               }
           } 
           else{
            return {
                statusCode : 200,
                message : 'Data Inserted Successfully'
           }
           }

        } catch (error) {
            Evolve.Log.error(" Error in conform Supplier Return Url "+error.message);
            return new Error(" Error in conform Supplier Return Url "+error.message);
        }
        
    }
}
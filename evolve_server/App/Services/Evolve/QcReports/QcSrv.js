'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


getAllData:async function(data){
    try {
        return await Evolve.SqlPool.request()
        .query(" select eqcd.EvolveQC_Pallet_No as pallet_id, eqcd.EvolveQC_SampleQty as qty, ei.EvolveItem_Code as item_no ,einv.EvolveInventory_Status as status, ei.EvolveItem_Desc as item_desc,eqcd.EvovleQCOrderDetails_CreatedAt as date,eu.EvolveUser_Name as operator from EvolveQCOrderDetails eqcd, EvolveInventory einv, EvolveItem ei, EvolveUser eu where einv.EvolveInventory_RefNumber = eqcd.EvolveQC_Pallet_No AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eqcd.EvovleQCOrderDetails_CreatedUser=eu.EvolveUser_ID" )    
        
    } catch (error) {
        console.log(error)
    }
},

getPalletAndLotNo:async function(data){
    try {
        return await Evolve.SqlPool.request()
        .query("SELECT ei.EvolveItem_Id,ei.EvolveItem_Code as item_no,eqcd.EvolveQC_Pallet_No as pallet_id from EvolveItem ei, EvolveQCOrderDetails eqcd" )    
        
    } catch (error) {
        console.log(error)
    }
},

getDatabyLotAndSerial: async function(data){
    if(data.EvolveQC_Pallet_No){
        return await Evolve.SqlPool.request()
        .input('EvolveQC_Pallet_No',Evolve.Sql.NVarChar,data.EvolveQC_Pallet_No)
        .query(" select eqcd.EvolveQC_Pallet_No as pallet_id, eqcd.EvolveQC_SampleQty as qty, ei.EvolveItem_Code as item_no ,einv.EvolveInventory_Status as status, ei.EvolveItem_Desc as item_desc,eqcd.EvovleQCOrderDetails_CreatedAt as date,eu.EvolveUser_Name as operator from EvolveQCOrderDetails eqcd, EvolveInventory einv, EvolveItem ei, EvolveUser eu where einv.EvolveInventory_RefNumber = eqcd.EvolveQC_Pallet_No AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eqcd.EvovleQCOrderDetails_CreatedUser=eu.EvolveUser_ID AND eqcd.EvolveQC_Pallet_No = @EvolveQC_Pallet_No" )

        
    }
    else if(data.EvolveItem_Code){
        return await Evolve.SqlPool.request()
        .input('EvolveItem_Code',Evolve.Sql.NVarChar,data.EvolveItem_Code)
        .query(" select eqcd.EvolveQC_Pallet_No as pallet_id, eqcd.EvolveQC_SampleQty as qty, ei.EvolveItem_Code as item_no ,einv.EvolveInventory_Status as status, ei.EvolveItem_Desc as item_desc,eqcd.EvovleQCOrderDetails_CreatedAt as date,eu.EvolveUser_Name as operator from EvolveQCOrderDetails eqcd, EvolveInventory einv, EvolveItem ei, EvolveUser eu where einv.EvolveInventory_RefNumber = eqcd.EvolveQC_Pallet_No AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eqcd.EvovleQCOrderDetails_CreatedUser=eu.EvolveUser_ID AND ei.EvolveItem_Code = @EvolveItem_Code" )
    }
    else{
        return await Evolve.SqlPool.request()
        .query(" select eqcd.EvolveQC_Pallet_No as pallet_id, eqcd.EvolveQC_SampleQty as qty, ei.EvolveItem_Code as item_no ,einv.EvolveInventory_Status as status, ei.EvolveItem_Desc as item_desc,eqcd.EvovleQCOrderDetails_CreatedAt as date,eu.EvolveUser_Name as operator from EvolveQCOrderDetails eqcd, EvolveInventory einv, EvolveItem ei, EvolveUser eu where einv.EvolveInventory_RefNumber = eqcd.EvolveQC_Pallet_No AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eqcd.EvovleQCOrderDetails_CreatedUser=eu.EvolveUser_ID" )    
    }

    
    

}












}
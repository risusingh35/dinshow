'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    
 getItem: async function (search) {
        try {
          let query =
            "SELECT TOP(20) EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE  '%" +
            search +
            "%'";
          return await Evolve.SqlPool.request().query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1265: Error while getting Item "+error.message);
          return new Error(" EERR1265: Error while getting Item "+error.message);
        }
      },

            
 getSupplierList: async function () {
    try {
      return await Evolve.SqlPool.request()
       .query("  SELECT EvolveSupplier_ID , EvolveSupplier_Name FROM  EvolveSupplier");
    } catch (error) {
      Evolve.Log.error(" EERR1266: Error while getting Supplier List "+error.message);
      return new Error(" EERR1266: Error while getting Supplier List "+error.message);
    }
  },

  getTemplateList: async function () {
    try {
      return await Evolve.SqlPool.request()
       .query("  SELECT EvolveQCTemp_ID , EvolveQCTemp_Name  FROM  EvolveQCTemp");
    } catch (error) {
      Evolve.Log.error(" EERR1267: Error while getting Template List "+error.message);
      return new Error(" EERR1267: Error while getting Template List "+error.message);
    }
  },

  assignItemToSuppliers: async function (data , EvolveSupplier_ID) {
    try {

        let date = new Date();
        let dataTime = date.getFullYear() +"-"+(date.getMonth() + 1)+"-"+date.getDate()+" "+date.getHours()+ ":" +date.getMinutes()+":"+date.getSeconds();
        return await Evolve.SqlPool.request()
        .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
        .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
        .input('EvolveItemSupLink_CustomerItem', Evolve.Sql.NVarChar, data.EvolveItemSupLink_CustomerItem)
        .input('EvolveItemSupLink_Comments', Evolve.Sql.NVarChar, data.EvolveItemSupLink_Comments)

        .input('EvolveSupplier_ID', Evolve.Sql.Int, EvolveSupplier_ID)
        .input('EvolveItemSupLink_CreatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveItemSupLink_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveItemSupLink_UpdatedUser', Evolve.Sql.Int,data.EvolveUser_ID)
        .input('EvolveItemSupLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
         .query("INSERT INTO EvolveItemSupLink (EvolveItem_ID,EvolveUom_ID,EvolveItemSupLink_CustomerItem,EvolveItemSupLink_Comments,EvolveSupplier_ID,EvolveItemSupLink_CreatedAt,EvolveItemSupLink_UpdatedAt,EvolveItemSupLink_UpdatedUser,EvolveItemSupLink_CreatedUser) VALUES (@EvolveItem_ID,@EvolveUom_ID,@EvolveItemSupLink_CustomerItem,@EvolveItemSupLink_Comments,@EvolveSupplier_ID,@EvolveItemSupLink_CreatedAt,@EvolveItemSupLink_UpdatedAt,@EvolveItemSupLink_UpdatedUser,@EvolveItemSupLink_CreatedUser)");
            
    } catch (error) {
        Evolve.Log.error(" EERR1268: Error while assigning Item To Suppliers "+error.message);
        return new Error(" EERR1268: Error while assigning Item To Suppliers "+error.message);
    }
},
getAssignedListCount: async function (search){
  try {
    return await Evolve.SqlPool.request()
    .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
    .query("SELECT COUNT(espl.EvolveItemSupLink_id) as count from EvolveItemSupLink espl,EvolveItem ei WHERE ei.EvolveItem_Code LIKE @search AND ei.EvolveItem_ID=espl.EvolveItem_ID")
  } catch (error) {
    Evolve.Log.error(error.message);
    return new Error(error.message);
  }
},

getAssignedList: async function (start ,length,search) {
    try {
      return await Evolve.SqlPool.request()
      .input('start',Evolve.Sql.Int,start)
      .input('length',Evolve.Sql.Int,length)
      .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
      .query(" SELECt espl.EvolveItemSupLink_id , esp.EvolveSupplier_Name , ei.EvolveItem_Code , espl.EvolveItemSupLink_CustomerItem , espl.EvolveItemSupLink_Comments , eu.EvolveUom_Uom FROM  EvolveItemSupLink espl  ,  EvolveSupplier esp  ,  EvolveItem ei  , EvolveUom eu  WHERE ei.EvolveItem_Code LIKE @search AND esp.EvolveSupplier_ID = espl.EvolveSupplier_ID AND ei.EvolveItem_ID = espl.EvolveItem_ID  AND espl.EvolveUom_ID = eu.EvolveUom_ID ORDER BY [EvolveItemSupLink_id] DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
    } catch (error) {
      Evolve.Log.error(" EERR1269: Error while getting Assigned List "+error.message);
      return new Error(" EERR1269: Error while getting Assigned List "+error.message);
    }
  },

  getSingleAssignData : async function (EvolveItemSupLink_id) {
    try {
      return await Evolve.SqlPool.request()
      .query("SELECT espl.* ,esp.EvolveSupplier_Name   ,ei.EvolveItem_Code FROM  [EvolveItemSupLink] espl , [EvolveSupplier] esp , EvolveItem ei WHERE  esp.EvolveSupplier_ID = espl.[EvolveSupplier_ID] AND ei.EvolveItem_ID=espl.EvolveItem_ID AND espl.EvolveItemSupLink_id = "+EvolveItemSupLink_id);
    } catch (error) {
      Evolve.Log.error(" EERR1270: Error while getting Single Assign Data "+error.message);
      return new Error(" EERR1270: Error while getting Single Assign Data "+error.message);
    }
  },


  
  getItemList: async function () {
    try {
      return await Evolve.SqlPool.request()
        //   .input('EvolveShift_CreatedUser', Evolve.Sql.Int, id)
    
        .query(" SELECT  EvolveItem_ID , EvolveItem_Code FROM  EvolveItem ");
    } catch (error) {
      Evolve.Log.error(" EERR1271: Error while getting Item List "+error.message);
      return new Error(" EERR1271: Error while getting Item List"+error.message);
    }
  },

    
  deleteCurrentAssignment: async function (EvolveItem_ID) {
    try {
          return await Evolve.SqlPool.request()
          .query(" DELETE  FROM  EvolveItemSupLink WHERE EvolveItem_ID="+EvolveItem_ID);
    } catch (error) {
      Evolve.Log.error(" EERR1272: Error while deleting Current Assignment "+error.message);
   
    }
  },
    deleteAssignment: async function (EvolveItemSupLink_id) {
    try {

      return await Evolve.SqlPool.request()
       .query(" DELETE  FROM  EvolveItemSupLink WHERE EvolveItemSupLink_id="+EvolveItemSupLink_id);
    } catch (error) {
      Evolve.Log.error(" EERR1273: Error while deleting Assignment "+error.message);
   
    }
  },
  getLocationList: async function () {
    try {

      return await Evolve.SqlPool.request()
       .query("SELECT EvolveLocation_ID , EvolveLocation_Name FROM  EvolveLocation ");
    } catch (error) {
      Evolve.Log.error(" EERR1274: Error while getting Location List "+error.message);
   
    }
  },

  getUomList : async function (){
    try {

      return await Evolve.SqlPool.request()
       .query("SELECT EvolveUom_ID , EvolveUom_Uom FROM  EvolveUom ");
    } catch (error) {
      Evolve.Log.error(" EERR1274: Error while getting Uom List "+error.message);
   
    }
  }

}
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    //Quote Header  
    getSupplierList: async function (data) {
        try {      
            return await Evolve.SqlPool.request()
            
            .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
            .query("SELECT TOP(20) EvolveSupplier_ID ,  EvolveSupplier_Name ,  EvolveSupplier_Code FROM  EvolveSupplier ");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Supplier List "+error.message);
          return new Error(" EERR####: Error While Get Supplier List "+error.message);
        }
    },

    getSupplierDetails: async function (data) {
        try {      
            return await Evolve.SqlPool.request()
            .input('EvolveSupplier_ID', Evolve.Sql.Int, data.EvolveSupplier_ID)
            .query("SELECT  EvolveSupplier_Name ,  EvolveSupplier_Code FROM  EvolveSupplier WHERE  EvolveSupplier_ID=@EvolveSupplier_ID");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Customer Details "+error.message);
            return new Error(" EERR####: Error While Get Customer Details "+error.message);
        }
    },
    getAdressList: async function (data) {
        try {      
            // console.log("dta--------------------------------------------------------a",data);
                      let query = " SELECT TOP(20) EvolveAddress_Code + ' - '+EvolveAddress_SearchName  as title, EvolveAddress_ID as id FROM    EvolveAddress WHERE    (EvolveAddress_Code  LIKE '%" + data.term + "%'  OR EvolveAddress_SearchName  LIKE '%" + data.term + "%' )"
                      // console.log(query);
            return await Evolve.SqlPool.request()
            // .input('EvolveAddress_Code', Evolve.Sql.Int, data.EvolveAddress_Code)
            
            .query(query);
            
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Address List "+error.message);
            return new Error(" EERR####: Error While Get Address List "+error.message);
        }
    },

    getSerialCodeByCategory: async function (data) {
      try {      
          return await Evolve.SqlPool.request()
          .input('EvolveCategory_ID', Evolve.Sql.Int, data.EvolveCategory_ID)
          .query("SELECT esr.EvolveSerial_Code FROM  EvolveCategory ect , EvolveSerial esr WHERE ect.EvolveSerial_ID = esr.EvolveSerial_ID AND ect.EvolveCategory_ID = @EvolveCategory_ID");
      } catch (error) {

          Evolve.Log.error(" EERR####: Error While Get Requisition Serial Code By Category  "+error.message);
          return new Error(" EERR####: Error While Get Requisition Serial Code By Category  "+error.message);
      }
  },


    getProjectList: async function () {
        try {      
            return await Evolve.SqlPool.request().query("SELECT EvolveProject_ID , EvolveProject_Code FROM  EvolveProject");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Project List "+error.message);
          return new Error(" EERR####: Error While Get Project List "+error.message);
        }
    },

    getCategoryList: async function () {
      try {    
        return await Evolve.SqlPool.request().query("SELECT * FROM  EvolveCategory");
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get Category List "+error.message);
        return new Error(" EERR####: Error While Get Category List "+error.message);
      }
  },
    getBuyerList : async function () {
      // console.log("Ok getBuyerList>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>result srv");
      try {      
          return await Evolve.SqlPool.request().query("SELECT eu.EvolveUser_ID , eu.EvolveUser_Name FROM  EvolveUser eu ");
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get Buyer List "+error.message);
        return new Error(" EERR####: Error While Get Buyer List "+error.message);
      }
  },


  // sqlcmd -S localhost -U sa -P root -d EvolveDBBeta  -i D:\itemUnit.sql
    
    // Quote Line
    getItemList: async function (data) {
      // console.log("Data>>>>>>>>>>>>>>>>>>",data);
        try {
           let query = "SELECT TOP(20) ei.EvolveItem_Code as title, ei.EvolveItem_ID as id FROM    EvolveItem ei , EvolveItemUnitLink eiu WHERE ei.EvolveItem_Code LIKE '%" + data.search + "%' AND ei.EvolveItem_ID = eiu.EvolveItem_ID AND  eiu.EvolveUnit_ID= @EvolveUnit_ID"
          return await Evolve.SqlPool.request()
          .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
          .query(query);
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Item List "+error.message);
          return new Error(" EERR####: Error While Get Item List "+error.message);
        }
    },
    getSupList: async function (data) {
      // console.log("req.body>>>>>>>>>>>>>>>data>>>>>>>>>>>getSupList",data);
      try {
         let query = " SELECT TOP(20) EvolveSupplier_Code + ' - '+EvolveSupplier_Name  as title, EvolveSupplier_ID as id FROM    EvolveSupplier WHERE    (EvolveSupplier_Code  LIKE '%" + data.search + "%'  OR EvolveSupplier_Name  LIKE '%" + data.search + "%' )"
        return await Evolve.SqlPool.request()
        // .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
        .query(query);
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get Supplier List "+error.message);
        return new Error(" EERR####: Error While Get Supplier List "+error.message);
      }
    },
    getItemDetails: async function (data) {
      // console.log("getItemDetails>>>>>>>>>>>>>>>>>>>>>>data",data);
      try {

      if (data.EvolvePRDetails_IsMemoItem==true) {
        return await Evolve.SqlPool.request()
        .input('EvolveItem_Code', Evolve.Sql.NVarChar, data.EvolveItem_Code)        
        .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
        // .query("SELECT ei.EvolveTaxClass_ID,   ei.EvolveItem_Code  , ei.EvolveItem_Desc , euom.EvolveUom_Uom   FROM   EvolveItem  ei , EvolveUom euom WHERE  ei.EvolveItem_ID = @EvolveItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID ");
            .query("SELECT *   FROM   EvolvePRDetails where  EvolveItem_Code = @EvolveItem_Code");
    
      }
else{
  return await Evolve.SqlPool.request()
  // .input('EvolveItem_Code', Evolve.Sql.NVarChar, selectData)
  .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
  .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)

  .query("SELECT ei.EvolveTaxClass_ID,   ei.EvolveItem_Code  , ei.EvolveItem_Desc , euom.EvolveUom_Uom   FROM   EvolveItem  ei , EvolveUom euom WHERE  ei.EvolveItem_ID = @EvolveItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID ");
      // .query("SELECT *   FROM   EvolvePRDetails where EvolveItem_ID = @EvolveItem_ID ");
}
      
  
    
     
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get Desc "+error.message);
        return new Error(" EERR####: Error While Get Desc "+error.message);
      }
    },

    getTaxClassesList: async function () {
      try {
          
        return await Evolve.SqlPool.request()
        .query('SELECT  EvolveTaxClass_ID , EvolveTaxClass_code   FROM   EvolveTaxClass');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get Tax Class List "+error.message);
        return new Error(" EERR####: Error While Get Tax Class List "+error.message);
      }
    },
    getSalesPersonList: async function () {
      try {
          
        return await Evolve.SqlPool.request()
        .query('SELECT  EvolveSalesPerson_ID , EvolveSalesPerson_Code ,  EvolveSalesPerson_Email  , EvolveSalesPerson_Name  ,  EvolveSalesPerson_Commission   FROM   EvolveSalesPerson');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get Sales Person List "+error.message);
        return new Error(" EERR####: Error While Get Sales Person List "+error.message);
      }
    },

      
    getCreditTermsList: async function () {
      try {
        return await Evolve.SqlPool.request()
        .query('SELECT  EvolveCreditTerms_ID , EvolveCreditTerms_Code   FROM   EvolveCreditTerms');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get Credit Term  list "+error.message);
        return new Error(" EERR####: Error While Get Credit Term  list "+error.message);
      }
    },
    getApprovalMatrixList: async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveApprovalMatrix_Type', Evolve.Sql.NVarChar, data.EvolveApprovalMatrix_Type)

        .query('SELECT  EvolveApprovalMatrix_ID , EvolveApprovalMatrix_Name   FROM   EvolveApprovalMatrix WHERE EvolveApprovalMatrix_Type =@EvolveApprovalMatrix_Type');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get Approval Matrix List "+error.message);
        return new Error(" EERR####: Error While Get Approval Matrix List "+error.message);
      }
    },
    geGenericCodeMasterList: async function () {
      try {
        return await Evolve.SqlPool.request()
        .query("SELECT * FROM EvolveGenericCodeMaster WHERE EvolveGenericCodeMaster_Key ='Channel' OR EvolveGenericCodeMaster_Key ='MOD' OR  EvolveGenericCodeMaster_Key ='Category' OR  EvolveGenericCodeMaster_Key ='Taxenv' OR EvolveGenericCodeMaster_Key ='Currency'  ");
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get Generic Code Master List "+error.message);
        return new Error(" EERR####: Error While Get Generic Code Master List "+error.message);
      }
    },
    getUserDetails: async function (EvolveUser_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveUser_ID', Evolve.Sql.NVarChar, EvolveUser_ID)

        .query("SELECT  eunit.* FROM   EvolveUnit eunit  ,  EvolveUserUnitLink eul   WHERE eunit.EvolveUnit_ID = eul.EvolveUnit_ID     AND eul.EvolveUser_ID = @EvolveUser_ID");
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get User Details "+error.message);
        return new Error(" EERR####: Error While Get User Details "+error.message);
      }
    },


    saveReqHeadDetails : async function (data) {
      try {
        let EvolvePR_Date = data.EvolvePR_Date ; 
        EvolvePR_Date = EvolvePR_Date == '' || EvolvePR_Date == null  ? null : EvolvePR_Date.split("-").reverse().join("-").replace("-", "-");
        console.log(' EvolvePR_Date = EvolvePR_Date>>>> ' ,   EvolvePR_Date = EvolvePR_Date)

        let EvolvePR_NeedDate = data.EvolvePR_NeedDate ; 
        EvolvePR_NeedDate = EvolvePR_NeedDate == '' || EvolvePR_NeedDate == null  ? null : EvolvePR_NeedDate.split("-").reverse().join("-").replace("-", "-");
        console.log(' EvolvePR_NeedDate = EvolvePR_NeedDate>>>> ' ,   EvolvePR_NeedDate = EvolvePR_NeedDate)

        let EvolvePR_DueDate = data.EvolvePR_DueDate ; 
        EvolvePR_DueDate = EvolvePR_DueDate == '' || EvolvePR_DueDate == null  ? null : EvolvePR_DueDate.split("-").reverse().join("-").replace("-", "-");
        console.log(' EvolvePR_DueDate = EvolvePR_DueDate>>>> ' ,   EvolvePR_DueDate = EvolvePR_DueDate)
        
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
        
        .input('EvolvePR_NO', Evolve.Sql.NVarChar, data.EvolvePR_NO)
        .input('EvolveCategory_ID', Evolve.Sql.Int, data.EvolveCategory_ID)
        .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, null)
        .input('EvolveAddress_ID', Evolve.Sql.Int, data.EvolveAddress_ID)
        .input('EvolvePR_CurrencyID', Evolve.Sql.Int, data.EvolvePR_CurrencyID)
        .input('EvolvePR_Date', Evolve.Sql.NVarChar, EvolvePR_Date)
        .input('EvolvePR_NeedDate', Evolve.Sql.NVarChar, EvolvePR_NeedDate)
        .input('EvolvePR_DueDate', Evolve.Sql.NVarChar, EvolvePR_DueDate)
        .input('EvolvePR_Rmrks', Evolve.Sql.NVarChar, data.EvolvePR_Rmrks)
        .input('EvolveProject_ID', Evolve.Sql.Int, data.EvolveProject_ID)
        .input('EvolvePR_BuyerID', Evolve.Sql.Int, data.EvolvePR_BuyerID)
        .input('EvolvePR_EndUserID', Evolve.Sql.Int, data.EvolvePR_EndUserID)
        .input('EvolvePR_SubAccount', Evolve.Sql.NVarChar, data.EvolvePR_SubAccount)
        .input('EvolvePR_CostCenter', Evolve.Sql.NVarChar, data.EvolvePR_CostCenter)
        .input('EvolvePR_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolvePR_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolvePR_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolvePR_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolvePR_Status', Evolve.Sql.NVarChar, data.EvolvePR_Status)
        .input('EvolveSupplier_ID', Evolve.Sql.Int, data.EvolveSupplier_ID)
        .input('EvolvePR_TotalCost', Evolve.Sql.NVarChar, data.EvolvePR_TotalCost)
        .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)

        .query('INSERT INTO EvolvePR (EvolvePR_NO, EvolveCategory_ID, EvolveApprovalMatrix_ID, EvolveAddress_ID, EvolvePR_CurrencyID, EvolvePR_Date, EvolvePR_NeedDate, EvolvePR_DueDate, EvolvePR_Rmrks, EvolveProject_ID,EvolvePR_BuyerID, EvolvePR_EndUserID, EvolvePR_SubAccount, EvolvePR_CostCenter, EvolvePR_CreatedAt, EvolvePR_CreatedUser, EvolvePR_UpdatedAt, EvolvePR_UpdatedUser,EvolvePR_Status,EvolveSupplier_ID,EvolvePR_TotalCost,EvolveUnit_ID) VALUES (@EvolvePR_NO, @EvolveCategory_ID, @EvolveApprovalMatrix_ID, @EvolveAddress_ID, @EvolvePR_CurrencyID, @EvolvePR_Date, @EvolvePR_NeedDate, @EvolvePR_DueDate, @EvolvePR_Rmrks, @EvolveProject_ID, @EvolvePR_BuyerID, @EvolvePR_EndUserID, @EvolvePR_SubAccount, @EvolvePR_CostCenter, @EvolvePR_CreatedAt, @EvolvePR_CreatedUser, @EvolvePR_UpdatedAt, @EvolvePR_UpdatedUser,@EvolvePR_Status,@EvolveSupplier_ID,@EvolvePR_TotalCost,@EvolveUnit_ID) ;select @@IDENTITY AS \'inserted_id\'');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Save Purachase Requisition "+error.message);
        return new Error(" EERR####: Error While Save Purachase Requisition "+error.message);
      }
    },
    // saveReqHeadDetails : async function (data) {
    //   try {
    //     // console.log("saveReqHeadDetails Data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",data);
    //     let EvolvePR_Date = data.EvolvePR_Date ; 
        
    //     EvolvePR_Date  = EvolvePR_Date == '' || EvolvePR_Date == null ||  EvolvePR_Date == 'null' ? null : EvolvePR_Date.split("-").reverse().join("-").replace("-", "-");
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     return await Evolve.SqlPool.request()
        
    //     .input('EvolvePR_NO', Evolve.Sql.NVarChar, data.EvolvePR_NO)
    //     .input('EvolveCategory_ID', Evolve.Sql.Int, data.EvolveCategory_ID)
    //     .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, null)
    //     .input('EvolveAddress_ID', Evolve.Sql.Int, data.EvolveAddress_ID)
    //     .input('EvolvePR_CurrencyID', Evolve.Sql.Int, data.EvolvePR_CurrencyID)
    //     .input('EvolvePR_Date', Evolve.Sql.NVarChar, EvolvePR_Date)
    //     .input('EvolvePR_Rmrks', Evolve.Sql.NVarChar, data.EvolvePR_Rmrks)
    //     .input('EvolveProject_ID', Evolve.Sql.Int, data.EvolveProject_ID)
    //     .input('EvolvePR_BuyerID', Evolve.Sql.Int, data.EvolvePR_BuyerID)
    //     .input('EvolvePR_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //     .input('EvolvePR_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //     .input('EvolvePR_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //     .input('EvolvePR_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //     .input('EvolvePR_Status', Evolve.Sql.NVarChar, data.EvolvePR_Status)
    //     .input('EvolveSupplier_ID', Evolve.Sql.Int, data.EvolveSupplier_ID)
    //     .input('EvolvePR_TotalCost', Evolve.Sql.NVarChar, data.EvolvePR_TotalCost)
    //     .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)

    //     .query(' INSERT INTO EvolvePR (EvolvePR_NO, EvolveCategory_ID, EvolveApprovalMatrix_ID, EvolveAddress_ID, EvolvePR_CurrencyID, EvolvePR_Date, EvolvePR_Rmrks, EvolveProject_ID,EvolvePR_BuyerID ,EvolvePR_CreatedAt, EvolvePR_CreatedUser, EvolvePR_UpdatedAt, EvolvePR_UpdatedUser,EvolvePR_Status,EvolveSupplier_ID,EvolvePR_TotalCost,EvolveUnit_ID) VALUES (@EvolvePR_NO, @EvolveCategory_ID, @EvolveApprovalMatrix_ID, @EvolveAddress_ID, @EvolvePR_CurrencyID, @EvolvePR_Date, @EvolvePR_Rmrks, @EvolveProject_ID, @EvolvePR_BuyerID ,@EvolvePR_CreatedAt, @EvolvePR_CreatedUser, @EvolvePR_UpdatedAt, @EvolvePR_UpdatedUser,@EvolvePR_Status,@EvolveSupplier_ID,@EvolvePR_TotalCost,@EvolveUnit_ID) ;select @@IDENTITY AS \'inserted_id\'');
    //   } catch (error) {
  
    //     Evolve.Log.error(" EERR####: Error While Save Purachase Requisition "+error.message);
    //     return new Error(" EERR####: Error While Save Purachase Requisition "+error.message);
    //   }
    // },


    savePRLineDetails : async function (data) {
      // console.log("savePRLineDetails>>>>>>>>>>>>>>>>>11",data);
      try { 
        let EvolvePRDetails_NeedDate = data.EvolvePRDetails_NeedDate ; 
        let EvolvePRDetails_DueDate = data.EvolvePRDetails_DueDate ; 

       EvolvePRDetails_NeedDate = EvolvePRDetails_NeedDate == '' || EvolvePRDetails_NeedDate == null  ? null : EvolvePRDetails_NeedDate.split("-").reverse().join("-").replace("-", "-");

       EvolvePRDetails_DueDate = EvolvePRDetails_DueDate == '' || EvolvePRDetails_DueDate == null  ? null : EvolvePRDetails_DueDate.split("-").reverse().join("-").replace("-", "-");

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();   
        // console.log("the data>>>>>>>>>>>>>>",EvolvePRDetails_NeedDate);     
        return await Evolve.SqlPool.request()
          
        .input('EvolvePR_ID', Evolve.Sql.Int, data.EvolvePR_ID)
        .input('EvolvePRDetails_LineNo', Evolve.Sql.Int, parseInt(data.EvolvePRDetails_LineNo))
        .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
        .input('EvolveItem_Code', Evolve.Sql.NVarChar, data.EvolveItem_Code)
        .input('EvolveItem_Desc', Evolve.Sql.NVarChar, data.EvolveItem_Desc)
        .input('EvolveUom_Uom', Evolve.Sql.NVarChar, data.EvolveUom_Uom)
        .input('EvolvePRDetails_Qty', Evolve.Sql.NVarChar, data.EvolvePRDetails_Qty)
        .input('EvolvePRDetails_NeedDate', Evolve.Sql.NVarChar, EvolvePRDetails_NeedDate)
        .input('EvolvePRDetails_DueDate', Evolve.Sql.NVarChar, EvolvePRDetails_DueDate)
        .input('EvolvePRDetails_ItemUnitPrice', Evolve.Sql.NVarChar, data.EvolvePRDetails_ItemUnitPrice)
        .input('EvolvePRDetails_ItemTotalPrice', Evolve.Sql.NVarChar, data.EvolvePRDetails_ItemTotalPrice)
        .input('EvolvePRDetails_Rmrks', Evolve.Sql.NVarChar, data.EvolvePRDetails_Rmrks)
        .input('EvolvePRDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolvePRDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolvePRDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolvePRDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolvePRDetails_IsMemoItem', Evolve.Sql.Bit, data.EvolvePRDetails_IsMemoItem)

        .query(' INSERT INTO EvolvePRDetails (EvolvePRDetails_IsMemoItem, EvolvePRDetails_NeedDate , EvolvePRDetails_DueDate , EvolvePR_ID ,EvolvePRDetails_LineNo, EvolveItem_ID, EvolveItem_Code, EvolveItem_Desc, EvolveUom_Uom, EvolvePRDetails_Qty, EvolvePRDetails_ItemUnitPrice, EvolvePRDetails_ItemTotalPrice,EvolvePRDetails_Rmrks, EvolvePRDetails_CreatedAt, EvolvePRDetails_CreatedUser, EvolvePRDetails_UpdatedAt, EvolvePRDetails_UpdatedUser) VALUES (@EvolvePRDetails_IsMemoItem, @EvolvePRDetails_NeedDate , @EvolvePRDetails_DueDate  ,@EvolvePR_ID ,@EvolvePRDetails_LineNo, @EvolveItem_ID, @EvolveItem_Code, @EvolveItem_Desc, @EvolveUom_Uom,  @EvolvePRDetails_Qty, @EvolvePRDetails_ItemUnitPrice, @EvolvePRDetails_ItemTotalPrice, @EvolvePRDetails_Rmrks , @EvolvePRDetails_CreatedAt, @EvolvePRDetails_CreatedUser, @EvolvePRDetails_UpdatedAt, @EvolvePRDetails_UpdatedUser) ');
      } catch (error) {
  
        Evolve.Log.error("line errororoor: Error While Save PR Line Details "+error.message);
        return new Error("line errororoor: Error While Save PR Line Details "+error.message);
      }
    },
    getPrHeadDetails : async function (EvolvePR_ID) {
      try {
        
        return await Evolve.SqlPool.request()
        .input('EvolvePR_ID', Evolve.Sql.Int, EvolvePR_ID)
        .query("SELECT  epr.* , convert(varchar, epr.EvolvePR_Date, 105)  as reqDate , convert(varchar, epr.EvolvePR_NeedDate, 105)  as headerNeedDate , convert(varchar, epr.EvolvePR_DueDate, 105)  as headerDueDate,  esup.EvolveSupplier_Code ,  esup.EvolveSupplier_Name , ead.EvolveAddress_Code ,  ead.EvolveAddress_SearchName  FROM   EvolvePR  epr LEFT JOIN EvolveSupplier esup ON  epr.EvolveSupplier_ID = esup.EvolveSupplier_ID LEFT  JOIN  EvolveAddress  ead ON epr.EvolveAddress_ID = ead.EvolveAddress_ID WHERE epr.EvolvePR_ID=@EvolvePR_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single Sales Quote  "+error.message);
        return new Error(" EERR####: Error While Get Single Sales Quote  "+error.message);
      }
    },
    getPrLineDetails : async function (EvolvePR_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolvePR_ID', Evolve.Sql.Int, EvolvePR_ID)
        // .query("  SELECT  esup.EvolveSupplier_ID ,  (esup.EvolveSupplier_Code +' - '+ esup.EvolveSupplier_Name ) as EvolveSupplier_Code ,  epr.EvolvePRDetails_ItemTotalPrice ,  epr.EvolvePRDetails_ItemUnitPrice, epr.EvolvePRDetails_ID , epr.EvolvePR_ID ,epr.EvolvePRDetails_LineNo  , epr.EvolveItem_ID ,epr.EvolvePRDetails_Qty,epr.EvolvePRDetails_Rmrks , convert(varchar, epr.EvolvePRDetails_NeedDate, 105)  as EvolvePRDetails_NeedDate ,   convert(varchar, epr.EvolvePRDetails_DueDate, 105)  as EvolvePRDetails_DueDate, ei.EvolveItem_Code ,  ei.EvolveItem_Desc FROM   EvolveItem ei  ,  EvolvePRDetails  epr LEFT JOIN EvolveSupplier esup ON epr.EvolveSupplier_ID = esup.EvolveSupplier_ID  WHERE epr.EvolveItem_ID = ei.EvolveItem_ID AND  epr.EvolvePR_ID=@EvolvePR_ID");
        // .query("SELECT * FROM EvolvePRDetails WHERE EvolveItem_Code=@EvolveItem_Code AND EvolveItem_Desc=@EvolveItem_Desc AND EvolveUom_Uom=@EvolveUom_Uom")
        .query("SELECT * FROM EvolvePRDetails   WHERE EvolvePR_ID=@EvolvePR_ID")

      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single Pr Details  "+error.message);
        return new Error(" EERR####: Error While Get Single Pr Details  "+error.message);
      }
    },

    deleteRequisitionLineDetails : async function (EvolvePR_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolvePR_ID', Evolve.Sql.Int, EvolvePR_ID)
        .query(' DELETE FROM EvolvePRDetails WHERE EvolvePR_ID = @EvolvePR_ID ');
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While delete Requisition Line Detail  "+error.message);
        return new Error(" EERR####: Error While delete Requisition Line Detail  "+error.message);
      }
    },
    updateReqHeadDetails : async function (data) {
      try {
        console.log("Data>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
        let EvolvePR_Date = data.EvolvePR_Date ; 

        console.log("EvolvePR_Date.???" ,  EvolvePR_Date)
        EvolvePR_Date = EvolvePR_Date == '' || EvolvePR_Date == null  ? null : EvolvePR_Date.split("-").reverse().join("-").replace("-", "-");

        console.log(' EvolvePR_Date = EvolvePR_Date>>>> ' ,   EvolvePR_Date = EvolvePR_Date)

        let EvolvePR_NeedDate = data.EvolvePR_NeedDate ; 
        EvolvePR_NeedDate = EvolvePR_NeedDate == '' || EvolvePR_NeedDate == null  ? null : EvolvePR_NeedDate.split("-").reverse().join("-").replace("-", "-");
        console.log(' EvolvePR_NeedDate = EvolvePR_NeedDate>>>> ' ,   EvolvePR_NeedDate = EvolvePR_NeedDate)

        let EvolvePR_DueDate = data.EvolvePR_DueDate ; 
        EvolvePR_DueDate = EvolvePR_DueDate == '' || EvolvePR_DueDate == null  ? null : EvolvePR_DueDate.split("-").reverse().join("-").replace("-", "-");
        console.log(' EvolvePR_DueDate = EvolvePR_DueDate>>>> ' ,   EvolvePR_DueDate = EvolvePR_DueDate)

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
        .input('EvolvePR_ID', Evolve.Sql.Int, data.EvolvePR_ID)
        
        .input('EvolvePR_NO', Evolve.Sql.NVarChar, data.EvolvePR_NO)
        .input('EvolveCategory_ID', Evolve.Sql.Int, data.EvolveCategory_ID)
        .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, null)
        .input('EvolveAddress_ID', Evolve.Sql.Int, data.EvolveAddress_ID)
        .input('EvolvePR_CurrencyID', Evolve.Sql.Int, data.EvolvePR_CurrencyID)
        .input('EvolvePR_Date', Evolve.Sql.NVarChar, EvolvePR_Date)
        .input('EvolvePR_NeedDate', Evolve.Sql.NVarChar, EvolvePR_NeedDate)
        .input('EvolvePR_DueDate', Evolve.Sql.NVarChar, EvolvePR_DueDate)
        .input('EvolvePR_NeedDate', Evolve.Sql.NVarChar, EvolvePR_Date)
        .input('EvolvePR_DueDate', Evolve.Sql.NVarChar, EvolvePR_Date)
        .input('EvolvePR_Rmrks', Evolve.Sql.NVarChar, data.EvolvePR_Rmrks)
        .input('EvolveProject_ID', Evolve.Sql.Int, data.EvolveProject_ID)
        .input('EvolvePR_BuyerID', Evolve.Sql.Int, data.EvolvePR_BuyerID)
        .input('EvolvePR_EndUserID', Evolve.Sql.Int, data.EvolvePR_EndUserID)
        .input('EvolvePR_SubAccount', Evolve.Sql.NVarChar, data.EvolvePR_SubAccount)
        .input('EvolvePR_CostCenter', Evolve.Sql.NVarChar, data.EvolvePR_CostCenter)
        .input('EvolvePR_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolvePR_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolvePR_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolvePR_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolvePR_Status', Evolve.Sql.NVarChar, data.EvolvePR_Status)
        .input('EvolveSupplier_ID', Evolve.Sql.Int, data.EvolveSupplier_ID)
        .input('EvolvePR_TotalCost', Evolve.Sql.NVarChar, data.EvolvePR_TotalCost)
        .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)

        .query("UPDATE EvolvePR SET EvolvePR_NO=@EvolvePR_NO ,EvolveCategory_ID=@EvolveCategory_ID , EvolveApprovalMatrix_ID=@EvolveApprovalMatrix_ID , EvolveAddress_ID=@EvolveAddress_ID ,  EvolvePR_CurrencyID=@EvolvePR_CurrencyID , EvolvePR_Date=@EvolvePR_Date , EvolvePR_NeedDate=@EvolvePR_NeedDate, EvolvePR_DueDate=@EvolvePR_DueDate, EvolvePR_Rmrks=@EvolvePR_Rmrks , EvolveProject_ID=@EvolveProject_ID ,  EvolvePR_BuyerID=@EvolvePR_BuyerID , EvolvePR_EndUserID=@EvolvePR_EndUserID, EvolvePR_SubAccount=@EvolvePR_SubAccount, EvolvePR_CostCenter=@EvolvePR_CostCenter, EvolvePR_CreatedAt=@EvolvePR_CreatedAt ,EvolvePR_CreatedUser=@EvolvePR_CreatedUser , EvolvePR_UpdatedAt=@EvolvePR_UpdatedAt ,EvolvePR_UpdatedUser=@EvolvePR_UpdatedUser ,EvolvePR_Status=@EvolvePR_Status ,EvolveSupplier_ID=@EvolveSupplier_ID , EvolvePR_TotalCost=@EvolvePR_TotalCost ,  EvolveUnit_ID=@EvolveUnit_ID WHERE EvolvePR_ID=@EvolvePR_ID");
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Update Purachase Requisition "+error.message);
        return new Error(" EERR####: Error While Update Purachase Requisition "+error.message);
      }
    },
    // updateReqHeadDetails : async function (data) {
    //   try {
    //     let EvolvePR_Date = data.EvolvePR_Date ; 
    //     EvolvePR_Date = EvolvePR_Date == '' || EvolvePR_Date == null ||  EvolvePR_Date == 'null'  ? null : EvolvePR_Date.split("-").reverse().join("-").replace("-", "-");

    //     console.log("EvolvePR_Date????" , EvolvePR_Date)




    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     return await Evolve.SqlPool.request()
    //     .input('EvolvePR_ID', Evolve.Sql.Int, data.EvolvePR_ID)
        
    //     .input('EvolvePR_NO', Evolve.Sql.NVarChar, data.EvolvePR_NO)
    //     .input('EvolveCategory_ID', Evolve.Sql.Int, data.EvolveCategory_ID)
    //     .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, null)
    //     .input('EvolveAddress_ID', Evolve.Sql.Int, data.EvolveAddress_ID)
    //     .input('EvolvePR_CurrencyID', Evolve.Sql.Int, data.EvolvePR_CurrencyID)
    //     .input('EvolvePR_Date', Evolve.Sql.NVarChar, EvolvePR_Date)
    //     .input('EvolvePR_Rmrks', Evolve.Sql.NVarChar, data.EvolvePR_Rmrks)
    //     .input('EvolveProject_ID', Evolve.Sql.Int, data.EvolveProject_ID)
    //     .input('EvolvePR_BuyerID', Evolve.Sql.Int, data.EvolvePR_BuyerID)
    //     .input('EvolvePR_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //     .input('EvolvePR_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //     .input('EvolvePR_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //     .input('EvolvePR_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //     .input('EvolvePR_Status', Evolve.Sql.NVarChar, data.EvolvePR_Status)
    //     .input('EvolveSupplier_ID', Evolve.Sql.Int, data.EvolveSupplier_ID)
    //     .input('EvolvePR_TotalCost', Evolve.Sql.NVarChar, data.EvolvePR_TotalCost)
    //     .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)

    //     .query("UPDATE EvolvePR SET EvolvePR_NO=@EvolvePR_NO ,EvolveCategory_ID=@EvolveCategory_ID , EvolveApprovalMatrix_ID=@EvolveApprovalMatrix_ID , EvolveAddress_ID=@EvolveAddress_ID ,  EvolvePR_CurrencyID=@EvolvePR_CurrencyID , EvolvePR_Date=@EvolvePR_Date , EvolvePR_Rmrks=@EvolvePR_Rmrks , EvolveProject_ID=@EvolveProject_ID ,  EvolvePR_BuyerID=@EvolvePR_BuyerID , EvolvePR_CreatedAt=@EvolvePR_CreatedAt ,EvolvePR_CreatedUser=@EvolvePR_CreatedUser , EvolvePR_UpdatedAt=@EvolvePR_UpdatedAt ,EvolvePR_UpdatedUser=@EvolvePR_UpdatedUser ,EvolvePR_Status=@EvolvePR_Status ,EvolveSupplier_ID=@EvolveSupplier_ID , EvolvePR_TotalCost=@EvolvePR_TotalCost ,  EvolveUnit_ID=@EvolveUnit_ID WHERE EvolvePR_ID=@EvolvePR_ID");
    //   } catch (error) {
  
    //     Evolve.Log.error(" EERR####: Error While Update Purachase Requisition "+error.message);
    //     return new Error(" EERR####: Error While Update Purachase Requisition "+error.message);
    //   }
    // },
    changeSqStatusOnAmend : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSalesQuote_ID', Evolve.Sql.Int, data.EvolveSalesQuote_ID)
        .input('EvolveSalesQuote_Status', Evolve.Sql.NVarChar, 'SAVED')

        .query(" UPDATE EvolveSalesQuote SET  EvolveSalesQuote_Status =@EvolveSalesQuote_Status WHERE EvolveSalesQuote_ID=@EvolveSalesQuote_ID ");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Amend Sales Quote  "+error.message);
        return new Error(" EERR####: Error While Amend Sales Quote  "+error.message);
      }
    },
    getItemAgreementDetailsByDesignGroup: async function (data) {
      try {

        // console.log("data>>>>" ,  data)
          
        return await Evolve.SqlPool.request()
        .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
        .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
        .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
        .query("SELECT  * FROM    (SELECT epl.EvolvePriceList_Code , epld.EvolvePriceList_ID  ,epld.EvolvePriceListDetails_Percentage ,epld.EvolvePriceListDetails_ID ,ROW_NUMBER() OVER (PARTITION BY epl.EvolvePriceList_Code ORDER BY epl.EvolvePriceList_CreatedAt DESC) AS RowNumber FROM   EvolvePriceList epl ,  EvolveItem ei , EvolvePriceListCustUnitDetails epcud , EvolvePriceListDetails epld  WHERE  epl.EvolvePriceList_Code =  epl.EvolvePriceList_Code AND ei.EvolveItem_ID = @EvolveItem_ID  AND epcud.EvolveCustomer_ID = @EvolveCustomer_ID  AND epcud.EvolveUnit_ID = @EvolveUnit_ID AND epcud.EvolvePriceList_ID = epl.EvolvePriceList_ID AND epld.EvolvePriceList_ID = epl.EvolvePriceList_ID AND  epld.EvolvePriceListDetails_DesignGroup = ei.EvolveItem_DesignGroup AND epld.EvolvePriceListDetails_IsActive = 1 AND epld.EvolvePriceListDetails_Type = 'PGC' AND cast(epld.EvolvePriceListDetails_StartDate as date) <= cast(GETDATE() as date) AND cast(epld.EvolvePriceListDetails_EndDate as date) >= cast(GETDATE() as date)) AS a WHERE   a.RowNumber = 1");


      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While get agreement details "+error.message);
        return new Error(" EERR####: Error While get agreement details "+error.message);
      }
    },
    getItemAgreementDetailsByItem: async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
        .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
        .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
        .query("SELECT  * FROM    (SELECT epl.EvolvePriceList_Code , epld.EvolvePriceList_ID  ,epld.EvolvePriceListDetails_Percentage ,epld.EvolvePriceListDetails_ID ,ROW_NUMBER() OVER (PARTITION BY epl.EvolvePriceList_Code ORDER BY epl.EvolvePriceList_CreatedAt DESC) AS RowNumber FROM   EvolvePriceList epl ,  EvolveItem ei , EvolvePriceListCustUnitDetails epcud , EvolvePriceListDetails epld  WHERE  epl.EvolvePriceList_Code =  epl.EvolvePriceList_Code AND ei.EvolveItem_ID = @EvolveItem_ID  AND epcud.EvolveCustomer_ID = @EvolveCustomer_ID  AND epcud.EvolveUnit_ID = @EvolveUnit_ID AND epcud.EvolvePriceList_ID = epl.EvolvePriceList_ID AND epld.EvolvePriceList_ID = epl.EvolvePriceList_ID AND  epld.EvolveItem_ID = ei.EvolveItem_ID AND epld.EvolvePriceListDetails_IsActive = 1 AND epld.EvolvePriceListDetails_Type = 'Catloge' AND cast(epld.EvolvePriceListDetails_StartDate as date) <= cast(GETDATE() as date) AND cast(epld.EvolvePriceListDetails_EndDate as date) >= cast(GETDATE() as date)) AS a WHERE   a.RowNumber = 1");
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While get agreement details "+error.message);
        return new Error(" EERR####: Error While get agreement details "+error.message);
      }
    },

    
    getShipToDetails: async function (data) {
      try {      
          return await Evolve.SqlPool.request()
          .input('EvolveAddress_ID', Evolve.Sql.Int, data.EvolveAddress_ID)
          .query("SELECT  * FROM  EvolveAddress WHERE  EvolveAddress_ID=@EvolveAddress_ID");
      } catch (error) {

          Evolve.Log.error(" EERR####: Error While Get Ship to details "+error.message);
          return new Error(" EERR####: Error While Get Ship to details "+error.message);
      }
  },

}
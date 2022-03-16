'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    //Quote Header  
    getCustomerList: async function (data) {
        try {      
            return await Evolve.SqlPool.request()
            
            .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
            .query("SELECT TOP(20) EvolveCustomer_ID ,  EvolveCustomer_name ,  EvolveCustomer_code FROM  EvolveCustomer ");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Customer List "+error.message);
          return new Error(" EERR####: Error While Get Customer List "+error.message);
        }
    },

    getCustomerDetails: async function (data) {
        try {      
            return await Evolve.SqlPool.request()
            .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
            .query("SELECT esalesp.EvolveSalesPerson_Code , esalesp.EvolveSalesPerson_Email ,esp.* , ecust.EvolveTaxClass_ID ,ecust.EvolveCustomer_ShipTo  ,  ecust.EvolveCustomer_BillTo  , ecust.EvolveSalesPerson_ID ,ecust.EvolveCustomer_name , ecust.EvolveCustomer_code ,  ecust.EvolveCreditTerms_ID FROM    EvolveShipTo esp , EvolveCustomer ecust   LEFT  JOIN    EvolveSalesPerson esalesp ON  ecust.EvolveSalesPerson_ID = esalesp.EvolveSalesPerson_ID WHERE ecust.EvolveCustomer_ID =@EvolveCustomer_ID AND ecust.EvolveCustomer_BillTo = esp.EvolveShipTo_ID ");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Customer Details "+error.message);
            return new Error(" EERR####: Error While Get Customer Details "+error.message);
        }
    },
    getAdressList: async function (data) {
        try {      
            return await Evolve.SqlPool.request()
            .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
            .query("SELECT   *  FROM  EvolveShipTo WHERE EvolveCustomer_ID =@EvolveCustomer_ID ");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Address List "+error.message);
            return new Error(" EERR####: Error While Get Address List "+error.message);
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


    
    // Quote Line
    getItemList: async function (data) {
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
    getCustList: async function (data) {
      try {
         let query = " SELECT TOP(20) EvolveCustomer_Code + ' - '+EvolveCustomer_Name  as title, EvolveCustomer_ID as id FROM    EvolveCustomer WHERE    (EvolveCustomer_Code  LIKE '%" + data.search + "%'  OR EvolveCustomer_Name  LIKE '%" + data.search + "%' )"
        return await Evolve.SqlPool.request()
        // .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
        .query(query);
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get Item List "+error.message);
        return new Error(" EERR####: Error While Get Item List "+error.message);
      }
  },
    getItemDetails: async function (data) {
      try {
          
        return await Evolve.SqlPool.request()
        .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
        .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)

        .query("SELECT ei.EvolveTaxClass_ID,   ei.EvolveItem_Code  , ei.EvolveItem_Desc , euom.EvolveUom_Uom   FROM   EvolveItem  ei , EvolveUom euom WHERE  ei.EvolveItem_ID = @EvolveItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID ");
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
        .query("SELECT * FROM EvolveGenericCodeMaster WHERE EvolveGenericCodeMaster_Key ='Channel' OR EvolveGenericCodeMaster_Key ='MOD' OR  EvolveGenericCodeMaster_Key ='Category' OR  EvolveGenericCodeMaster_Key ='Taxenv' ");
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



    saveQuoteHeadDetails : async function (data) {
      try { 

        console.log("EASD DETAILS UPATE >>>>>" , data)
        

        let EvolveSalesQuote_PoDate = data.EvolveSalesQuote_PoDate ; 
        EvolveSalesQuote_PoDate = EvolveSalesQuote_PoDate == '' || EvolveSalesQuote_PoDate == null  ? null : EvolveSalesQuote_PoDate.split("-").reverse().join("-").replace("-", "-");


        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
        
        .input('EvolveSalesQuote_Serial', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Serial)
        .input('EvolveSalesQuote_Customer_ID', Evolve.Sql.Int, data.EvolveSalesQuote_Customer_ID)
        .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
        .input('EvolveSalesQuote_BillTo', Evolve.Sql.Int, data.EvolveSalesQuote_BillTo)
        .input('EvolveSalesQuote_ShipTo', Evolve.Sql.Int, data.EvolveSalesQuote_ShipTo)
        .input('EvolveSalesQuote_ReleaseDate', Evolve.Sql.NVarChar, data.EvolveSalesQuote_ReleaseDate)
        .input('EvolveSalesQuote_PurchaseOrder', Evolve.Sql.NVarChar, data.EvolveSalesQuote_PurchaseOrder)
        .input('EvolveSalesQuote_Channel_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Channel_ID)
        .input('EvolveSalesQuote_TaxEnv_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_TaxEnv_ID)

        .input('EvolveSalesQuote_Project_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Project_ID)
        .input('EvolveSalesQuote_TaxClass_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_TaxClass_ID)
        .input('EvolveSalesQuote_DeliveryMode_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_DeliveryMode_ID)
        .input('EvolveSalesQuote_Pnf', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Pnf)
        .input('EvolveCreditTerms_ID', Evolve.Sql.NVarChar, data.EvolveCreditTerms_ID)
        .input('EvolveSalesQuote_Comments', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Comments)
        .input('EvolveSalesQuote_MultiSalesPerson', Evolve.Sql.NVarChar, data.EvolveSalesQuote_MultiSalesPerson)
        .input('EvolveSalesQuote_SalesPerson', Evolve.Sql.NVarChar, data.EvolveSalesQuote_SalesPerson)
        .input('EvolveSalesQuote_AttachedDocument', Evolve.Sql.NVarChar, data.EvolveSalesQuote_AttachedDocument)

        .input('EvolveSalesQuote_MultiSalesPersons', Evolve.Sql.NVarChar, data.EvolveSalesQuote_MultiSalesPersons)
        .input('EvolveSalesQuote_SubmitDate', Evolve.Sql.NVarChar, data.EvolveSalesQuote_SubmitDate)
        .input('EvolveSalesQuote_Status', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Status)
        .input('EvolveSalesQuote_CurrentOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_CurrentOutstanding)
        .input('EvolveSalesQuote_ThirtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_ThirtyOutstanding)
        .input('EvolveSalesQuote_SixtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_SixtyOutstanding)
        .input('EvolveSalesQuote_NinetyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_NinetyOutstanding)
        .input('EvolveSalesQuote_OneEightyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_OneEightyOutstanding)

        .input('EvolveSalesQuote_LandedCost', Evolve.Sql.Float, data.EvolveSalesQuote_LandedCost)
        .input('EvolveSalesQuote_ProfitMargin', Evolve.Sql.Float, data.EvolveSalesQuote_ProfitMargin)
        .input('EvolveSalesQuote_Freight', Evolve.Sql.Float, data.EvolveSalesQuote_Freight)
        .input('EvolveSalesQuote_OutWardFreight', Evolve.Sql.Float, data.EvolveSalesQuote_OutWardFreight)

        .input('EvolveUnit_ID', Evolve.Sql.Float, data.EvolveUnit_ID)
        .input('EvolveSalesQuote_PoDate', Evolve.Sql.NVarChar, EvolveSalesQuote_PoDate)

        .input('EvolveSalesQuote_TotalCustomerPrice', Evolve.Sql.Float, data.EvolveSalesQuote_TotalCustomerPrice)
        .input('EvolveSalesQuote_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesQuote_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveSalesQuote_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesQuote_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query(' INSERT INTO EvolveSalesQuote (EvolveSalesQuote_Serial, EvolveSalesQuote_Customer_ID, EvolveApprovalMatrix_ID, EvolveSalesQuote_BillTo, EvolveSalesQuote_ShipTo, EvolveSalesQuote_ReleaseDate, EvolveSalesQuote_PurchaseOrder, EvolveSalesQuote_Channel_ID,EvolveSalesQuote_TaxEnv_ID , EvolveSalesQuote_Project_ID, EvolveSalesQuote_TaxClass_ID, EvolveSalesQuote_DeliveryMode_ID, EvolveSalesQuote_Pnf, EvolveCreditTerms_ID, EvolveSalesQuote_Comments, EvolveSalesQuote_MultiSalesPerson, EvolveSalesQuote_SalesPerson,EvolveSalesQuote_AttachedDocument, EvolveSalesQuote_MultiSalesPersons, EvolveSalesQuote_SubmitDate, EvolveSalesQuote_Status, EvolveSalesQuote_CurrentOutstanding, EvolveSalesQuote_ThirtyOutstanding, EvolveSalesQuote_SixtyOutstanding, EvolveSalesQuote_NinetyOutstanding,EvolveSalesQuote_OneEightyOutstanding , EvolveSalesQuote_LandedCost, EvolveSalesQuote_ProfitMargin, EvolveSalesQuote_Freight,EvolveSalesQuote_OutWardFreight, EvolveUnit_ID,EvolveSalesQuote_PoDate ,EvolveSalesQuote_TotalCustomerPrice,EvolveSalesQuote_CreatedAt, EvolveSalesQuote_CreatedUser, EvolveSalesQuote_UpdatedAt, EvolveSalesQuote_UpdatedUser) VALUES (@EvolveSalesQuote_Serial, @EvolveSalesQuote_Customer_ID, @EvolveApprovalMatrix_ID, @EvolveSalesQuote_BillTo, @EvolveSalesQuote_ShipTo, @EvolveSalesQuote_ReleaseDate, @EvolveSalesQuote_PurchaseOrder, @EvolveSalesQuote_Channel_ID, @EvolveSalesQuote_TaxEnv_ID ,@EvolveSalesQuote_Project_ID, @EvolveSalesQuote_TaxClass_ID, @EvolveSalesQuote_DeliveryMode_ID, @EvolveSalesQuote_Pnf, @EvolveCreditTerms_ID, @EvolveSalesQuote_Comments, @EvolveSalesQuote_MultiSalesPerson, @EvolveSalesQuote_SalesPerson, @EvolveSalesQuote_AttachedDocument ,@EvolveSalesQuote_MultiSalesPersons, @EvolveSalesQuote_SubmitDate, @EvolveSalesQuote_Status, @EvolveSalesQuote_CurrentOutstanding, @EvolveSalesQuote_ThirtyOutstanding, @EvolveSalesQuote_SixtyOutstanding, @EvolveSalesQuote_NinetyOutstanding,@EvolveSalesQuote_OneEightyOutstanding, @EvolveSalesQuote_LandedCost, @EvolveSalesQuote_ProfitMargin, @EvolveSalesQuote_Freight,@EvolveSalesQuote_OutWardFreight , @EvolveUnit_ID ,@EvolveSalesQuote_PoDate ,@EvolveSalesQuote_TotalCustomerPrice,@EvolveSalesQuote_CreatedAt, @EvolveSalesQuote_CreatedUser, @EvolveSalesQuote_UpdatedAt, @EvolveSalesQuote_UpdatedUser) ;select @@IDENTITY AS \'inserted_id\'');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Save Salse Quote "+error.message);
        return new Error(" EERR####: Error While Save Salse Quote "+error.message);
      }
    },


    saveQuoteLineDetails : async function (data, EvolveSalesQuote_ID) {
      
      try { 

        let EvolveSalesQuoteDetails_ReqdDate = data.EvolveSalesQuoteDetails_ReqdDate ; 
        let EvolveSalesQuoteDetails_PromiseDate = data.EvolveSalesQuoteDetails_PromiseDate ; 
        let EvolveSalesQuoteDetails_DueDate = data.EvolveSalesQuoteDetails_DueDate ; 



       EvolveSalesQuoteDetails_ReqdDate = EvolveSalesQuoteDetails_ReqdDate == '' || EvolveSalesQuoteDetails_ReqdDate == null  ? null : EvolveSalesQuoteDetails_ReqdDate.split("-").reverse().join("-").replace("-", "-");


       EvolveSalesQuoteDetails_PromiseDate = EvolveSalesQuoteDetails_PromiseDate == '' || EvolveSalesQuoteDetails_PromiseDate == null  ? null : EvolveSalesQuoteDetails_PromiseDate.split("-").reverse().join("-").replace("-", "-");


       EvolveSalesQuoteDetails_DueDate = EvolveSalesQuoteDetails_DueDate == '' || EvolveSalesQuoteDetails_DueDate == null  ? null : EvolveSalesQuoteDetails_DueDate.split("-").reverse().join("-").replace("-", "-");

       if(data.EvolvePriceListDetails_ID == '' || data.EvolvePriceListDetails_ID == undefined  ){

        data.EvolvePriceListDetails_ID = null ;

       }

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        
        return await Evolve.SqlPool.request()
          
        .input('EvolveSalesQuote_ID', Evolve.Sql.Int, EvolveSalesQuote_ID)
        .input('EvolvePriceListDetails_ID', Evolve.Sql.Int, (data.EvolvePriceListDetails_ID))

        .input('EvolveSalesQuoteDetails_LineNo', Evolve.Sql.Int, parseInt(data.EvolveSalesQuoteDetails_LineNo))
        .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
        .input('EvolveSalesQuoteDetails_Qty', Evolve.Sql.Float, data.EvolveSalesQuoteDetails_Qty)
        .input('EvolveSalesQuoteDetails_CustomerUnitPrice', Evolve.Sql.Float, data.EvolveSalesQuoteDetails_CustomerUnitPrice)
        .input('EvolveSalesQuoteDetails_ItemUnitPrice', Evolve.Sql.Float, data.EvolveItem_ItemUnitPrice)

        .input('EvolveSalesQuoteDetails_CustomerDiscount', Evolve.Sql.Float, data.EvolveSalesQuoteDetails_CustomerDiscount)
        .input('EvolveTaxClass_ID', Evolve.Sql.Int, parseInt(data.EvolveTaxClass_ID))
        .input('EvolveSalesQuoteDetails_TaxEnv_ID', Evolve.Sql.Int, parseInt(data.EvolveSalesQuoteDetails_TaxEnv_ID))

        .input('EvolveSalesQuoteDetails_ReqdDate', Evolve.Sql.NVarChar, EvolveSalesQuoteDetails_ReqdDate)
        .input('EvolveSalesQuoteDetails_PromiseDate', Evolve.Sql.NVarChar, EvolveSalesQuoteDetails_PromiseDate)
        .input('EvolveSalesQuoteDetails_DueDate', Evolve.Sql.NVarChar, EvolveSalesQuoteDetails_DueDate)
        .input('EvolveSalesQuoteDetails_Comments', Evolve.Sql.NVarChar, data.EvolveSalesQuoteDetails_Comments)
        .input('EvolveSalesQuoteDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesQuoteDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveSalesQuoteDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesQuoteDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query(' INSERT INTO EvolveSalesQuoteDetails (EvolveSalesQuote_ID, EvolvePriceListDetails_ID ,EvolveSalesQuoteDetails_LineNo, EvolveItem_ID, EvolveSalesQuoteDetails_Qty, EvolveSalesQuoteDetails_CustomerUnitPrice,EvolveSalesQuoteDetails_ItemUnitPrice, EvolveSalesQuoteDetails_CustomerDiscount, EvolveTaxClass_ID,EvolveSalesQuoteDetails_TaxEnv_ID, EvolveSalesQuoteDetails_ReqdDate, EvolveSalesQuoteDetails_PromiseDate, EvolveSalesQuoteDetails_DueDate, EvolveSalesQuoteDetails_Comments, EvolveSalesQuoteDetails_CreatedAt, EvolveSalesQuoteDetails_CreatedUser, EvolveSalesQuoteDetails_UpdatedAt, EvolveSalesQuoteDetails_UpdatedUser) VALUES (@EvolveSalesQuote_ID, @EvolvePriceListDetails_ID ,@EvolveSalesQuoteDetails_LineNo, @EvolveItem_ID, @EvolveSalesQuoteDetails_Qty, @EvolveSalesQuoteDetails_CustomerUnitPrice,@EvolveSalesQuoteDetails_ItemUnitPrice, @EvolveSalesQuoteDetails_CustomerDiscount, @EvolveTaxClass_ID, @EvolveSalesQuoteDetails_TaxEnv_ID ,@EvolveSalesQuoteDetails_ReqdDate, @EvolveSalesQuoteDetails_PromiseDate, @EvolveSalesQuoteDetails_DueDate, @EvolveSalesQuoteDetails_Comments, @EvolveSalesQuoteDetails_CreatedAt, @EvolveSalesQuoteDetails_CreatedUser, @EvolveSalesQuoteDetails_UpdatedAt, @EvolveSalesQuoteDetails_UpdatedUser) ');
      } catch (error) {
  
        Evolve.Log.error("line errororoor: Error While Save Salse Quote Details "+error.message);
        return new Error("line errororoor: Error While Save Salse Quote Details "+error.message);
      }
    },

    updateQuoteLineDetails : async function (data, EvolveSalesQuote_ID) {
      try { 

        console.log("data >>>>" ,  data)

      let EvolveSalesQuoteDetails_ReqdDate = data.EvolveSalesQuoteDetails_ReqdDate ; 
      let EvolveSalesQuoteDetails_PromiseDate = data.EvolveSalesQuoteDetails_PromiseDate ; 
      let EvolveSalesQuoteDetails_DueDate = data.EvolveSalesQuoteDetails_DueDate ; 



      EvolveSalesQuoteDetails_ReqdDate = EvolveSalesQuoteDetails_ReqdDate == '' || EvolveSalesQuoteDetails_ReqdDate == null  ? null : EvolveSalesQuoteDetails_ReqdDate.split("-").reverse().join("-").replace("-", "-");


      EvolveSalesQuoteDetails_PromiseDate = EvolveSalesQuoteDetails_PromiseDate == '' || EvolveSalesQuoteDetails_PromiseDate == null  ? null : EvolveSalesQuoteDetails_PromiseDate.split("-").reverse().join("-").replace("-", "-");


      EvolveSalesQuoteDetails_DueDate = EvolveSalesQuoteDetails_DueDate == '' || EvolveSalesQuoteDetails_DueDate == null  ? null : EvolveSalesQuoteDetails_DueDate.split("-").reverse().join("-").replace("-", "-");

      if(data.EvolvePriceListDetails_ID == '' || data.EvolvePriceListDetails_ID == undefined  ){

        data.EvolvePriceListDetails_ID = null ;

       }

      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      
      return await Evolve.SqlPool.request()
        
      .input('EvolveSalesQuote_ID', Evolve.Sql.Int, EvolveSalesQuote_ID)
      .input('EvolvePriceListDetails_ID', Evolve.Sql.Int, data.EvolvePriceListDetails_ID)

      .input('EvolveSalesQuoteDetails_LineNo', Evolve.Sql.Int, parseInt(data.EvolveSalesQuoteDetails_LineNo))
      .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
      .input('EvolveSalesQuoteDetails_Qty', Evolve.Sql.Float, data.EvolveSalesQuoteDetails_Qty)
      .input('EvolveSalesQuoteDetails_CustomerUnitPrice', Evolve.Sql.Float, data.EvolveSalesQuoteDetails_CustomerUnitPrice)
      .input('EvolveSalesQuoteDetails_ItemUnitPrice', Evolve.Sql.Float, data.EvolveItem_ItemUnitPrice)

      .input('EvolveSalesQuoteDetails_CustomerDiscount', Evolve.Sql.Float, data.EvolveSalesQuoteDetails_CustomerDiscount)
      .input('EvolveTaxClass_ID', Evolve.Sql.Int, parseInt(data.EvolveTaxClass_ID))
      .input('EvolveSalesQuoteDetails_TaxEnv_ID', Evolve.Sql.Int, parseInt(data.EvolveSalesQuoteDetails_TaxEnv_ID))

      .input('EvolveSalesQuoteDetails_ReqdDate', Evolve.Sql.NVarChar, EvolveSalesQuoteDetails_ReqdDate)
      .input('EvolveSalesQuoteDetails_PromiseDate', Evolve.Sql.NVarChar, EvolveSalesQuoteDetails_PromiseDate)
      .input('EvolveSalesQuoteDetails_DueDate', Evolve.Sql.NVarChar, EvolveSalesQuoteDetails_DueDate)
      .input('EvolveSalesQuoteDetails_Comments', Evolve.Sql.NVarChar, data.EvolveSalesQuoteDetails_Comments)
      .input('EvolveSalesQuoteDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
      .input('EvolveSalesQuoteDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
      .input('EvolveSalesQuoteDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
      .input('EvolveSalesQuoteDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

      .query(' INSERT INTO EvolveSalesQuoteDetails (EvolveSalesQuote_ID,EvolvePriceListDetails_ID, EvolveSalesQuoteDetails_LineNo, EvolveItem_ID, EvolveSalesQuoteDetails_Qty, EvolveSalesQuoteDetails_CustomerUnitPrice,EvolveSalesQuoteDetails_ItemUnitPrice, EvolveSalesQuoteDetails_CustomerDiscount, EvolveTaxClass_ID,EvolveSalesQuoteDetails_TaxEnv_ID, EvolveSalesQuoteDetails_ReqdDate, EvolveSalesQuoteDetails_PromiseDate, EvolveSalesQuoteDetails_DueDate, EvolveSalesQuoteDetails_Comments, EvolveSalesQuoteDetails_CreatedAt, EvolveSalesQuoteDetails_CreatedUser, EvolveSalesQuoteDetails_UpdatedAt, EvolveSalesQuoteDetails_UpdatedUser) VALUES (@EvolveSalesQuote_ID,@EvolvePriceListDetails_ID, @EvolveSalesQuoteDetails_LineNo, @EvolveItem_ID, @EvolveSalesQuoteDetails_Qty, @EvolveSalesQuoteDetails_CustomerUnitPrice,@EvolveSalesQuoteDetails_ItemUnitPrice , @EvolveSalesQuoteDetails_CustomerDiscount, @EvolveTaxClass_ID,@EvolveSalesQuoteDetails_TaxEnv_ID, @EvolveSalesQuoteDetails_ReqdDate, @EvolveSalesQuoteDetails_PromiseDate, @EvolveSalesQuoteDetails_DueDate, @EvolveSalesQuoteDetails_Comments, @EvolveSalesQuoteDetails_CreatedAt, @EvolveSalesQuoteDetails_CreatedUser, @EvolveSalesQuoteDetails_UpdatedAt, @EvolveSalesQuoteDetails_UpdatedUser) ');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Save Salse Quote Details "+error.message);
        return new Error(" EERR####: Error While Save Salse Quote Details "+error.message);
      }
    },

    getSingelSalesQuoteHead : async function (EvolveSalesQuote_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSalesQuote_ID', Evolve.Sql.Int, EvolveSalesQuote_ID)
        .query("  SELECT ecust.EvolveCustomer_code , ecust.EvolveCustomer_name ,  esq.*  ,convert(varchar,esq.EvolveSalesQuote_CreatedAt, 105)  as dateRaised , convert(varchar,esq.EvolveSalesQuote_SubmitDate, 105)  as dateSubmited ,  convert(varchar,esq.EvolveSalesQuote_PoDate, 105)  as poDate,  eu.EvolveUnit_Code , eu.EvolveUnit_State FROM EvolveSalesQuote esq  ,   EvolveUnit eu , EvolveCustomer ecust  WHERE EvolveSalesQuote_ID = @EvolveSalesQuote_ID AND eu.EvolveUnit_ID = esq.EvolveUnit_ID   AND esq.EvolveSalesQuote_Customer_ID = ecust.EvolveCustomer_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single Sales Quote  "+error.message);
        return new Error(" EERR####: Error While Get Single Sales Quote  "+error.message);
      }
    },

    getSingelSalesQuoteDetails : async function (EvolveSalesQuote_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSalesQuote_ID', Evolve.Sql.Int, EvolveSalesQuote_ID)

        .query("  SELECT esqd.EvolvePriceListDetails_ID , esqd.EvolveSalesQuoteDetails_ItemUnitPrice as EvolveItem_ItemUnitPrice , esqd.EvolveSalesQuoteDetails_ID , esqd.EvolveSalesQuote_ID ,esqd.EvolveSalesQuoteDetails_LineNo ,esqd.EvolveSalesQuoteDetails_TaxEnv_ID , esqd.EvolveItem_ID ,esqd.EvolveSalesQuoteDetails_Qty,esqd.EvolveSalesQuoteDetails_CustomerUnitPrice ,esqd.EvolveSalesQuoteDetails_CustomerDiscount,esqd.EvolveTaxClass_ID ,esqd.EvolveSalesQuoteDetails_Comments , convert(varchar, esqd.EvolveSalesQuoteDetails_ReqdDate, 105)  as EvolveSalesQuoteDetails_ReqdDate ,   convert(varchar, esqd.EvolveSalesQuoteDetails_PromiseDate, 105)  as EvolveSalesQuoteDetails_PromiseDate,   convert(varchar, esqd.EvolveSalesQuoteDetails_DueDate, 105)  as EvolveSalesQuoteDetails_DueDate  , ei.EvolveItem_Code FROM EvolveSalesQuoteDetails  esqd , EvolveItem ei  WHERE esqd.EvolveSalesQuote_ID = @EvolveSalesQuote_ID   AND esqd.EvolveItem_ID = ei.EvolveItem_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
        return new Error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
      }
    },

    deleteSalseQuoteDetails : async function (EvolveSalesQuote_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSalesQuote_ID', Evolve.Sql.Int, EvolveSalesQuote_ID)
        .query(' DELETE FROM EvolveSalesQuoteDetails WHERE EvolveSalesQuote_ID = @EvolveSalesQuote_ID ');
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
        return new Error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
      }
    },

    updateSalesQuoteHead : async function (data) {
      try {
 
        console.log("EUPDATE>>>>>>>>>>>... DETAILS UPATE >>>>>" , data)
        
        
        let EvolveSalesQuote_PoDate = data.EvolveSalesQuote_PoDate ; 
        EvolveSalesQuote_PoDate = EvolveSalesQuote_PoDate == '' || EvolveSalesQuote_PoDate == null  ? null : EvolveSalesQuote_PoDate.split("-").reverse().join("-").replace("-", "-");

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
          
        .input('EvolveSalesQuote_ID', Evolve.Sql.Int, data.EvolveSalesQuote_ID)
        .input('EvolveSalesQuote_Serial', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Serial)
        .input('EvolveSalesQuote_Customer_ID', Evolve.Sql.Int, data.EvolveSalesQuote_Customer_ID)
        .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
        .input('EvolveSalesQuote_BillTo', Evolve.Sql.Int, data.EvolveSalesQuote_BillTo)
        .input('EvolveSalesQuote_ShipTo', Evolve.Sql.Int, data.EvolveSalesQuote_ShipTo)
        .input('EvolveSalesQuote_ReleaseDate', Evolve.Sql.NVarChar, data.EvolveSalesQuote_ReleaseDate)
        .input('EvolveSalesQuote_PurchaseOrder', Evolve.Sql.NVarChar, data.EvolveSalesQuote_PurchaseOrder)
        .input('EvolveSalesQuote_Channel_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Channel_ID)
        .input('EvolveSalesQuote_Project_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Project_ID)
        .input('EvolveSalesQuote_TaxClass_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_TaxClass_ID)
        .input('EvolveSalesQuote_DeliveryMode_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_DeliveryMode_ID)
        .input('EvolveSalesQuote_Pnf', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Pnf)
        .input('EvolveCreditTerms_ID', Evolve.Sql.NVarChar, data.EvolveCreditTerms_ID)
        .input('EvolveSalesQuote_Comments', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Comments)
        .input('EvolveSalesQuote_MultiSalesPerson', Evolve.Sql.NVarChar, data.EvolveSalesQuote_MultiSalesPerson)
        .input('EvolveSalesQuote_SalesPerson', Evolve.Sql.NVarChar, data.EvolveSalesQuote_SalesPerson)
        .input('EvolveSalesQuote_AttachedDocument', Evolve.Sql.NVarChar, data.EvolveSalesQuote_AttachedDocument)

        .input('EvolveSalesQuote_MultiSalesPersons', Evolve.Sql.NVarChar, data.EvolveSalesQuote_MultiSalesPersons)
        .input('EvolveSalesQuote_SubmitDate', Evolve.Sql.NVarChar, data.EvolveSalesQuote_SubmitDate)
        .input('EvolveSalesQuote_Status', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Status)
        .input('EvolveSalesQuote_CurrentOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_CurrentOutstanding)
        .input('EvolveSalesQuote_ThirtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_ThirtyOutstanding)
        .input('EvolveSalesQuote_SixtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_SixtyOutstanding)
        .input('EvolveSalesQuote_NinetyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_NinetyOutstanding)
        .input('EvolveSalesQuote_OneEightyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_OneEightyOutstanding)

        .input('EvolveSalesQuote_LandedCost', Evolve.Sql.Float, data.EvolveSalesQuote_LandedCost)
        .input('EvolveSalesQuote_ProfitMargin', Evolve.Sql.Float, data.EvolveSalesQuote_ProfitMargin)
        .input('EvolveSalesQuote_Freight', Evolve.Sql.Float, data.EvolveSalesQuote_Freight)
        .input('EvolveSalesQuote_OutWardFreight', Evolve.Sql.Float, data.EvolveSalesQuote_OutWardFreight)

        .input('EvolveSalesQuote_TotalCustomerPrice', Evolve.Sql.Float, data.EvolveSalesQuote_TotalCustomerPrice)
        .input('EvolveSalesQuote_PoDate', Evolve.Sql.NVarChar, EvolveSalesQuote_PoDate)


        .input('EvolveSalesQuote_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesQuote_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query(' UPDATE EvolveSalesQuote SET EvolveSalesQuote_Serial = @EvolveSalesQuote_Serial, EvolveSalesQuote_Customer_ID = @EvolveSalesQuote_Customer_ID, EvolveApprovalMatrix_ID = @EvolveApprovalMatrix_ID, EvolveSalesQuote_BillTo = @EvolveSalesQuote_BillTo, EvolveSalesQuote_ShipTo = @EvolveSalesQuote_ShipTo, EvolveSalesQuote_ReleaseDate = @EvolveSalesQuote_ReleaseDate, EvolveSalesQuote_PurchaseOrder = @EvolveSalesQuote_PurchaseOrder, EvolveSalesQuote_Channel_ID = @EvolveSalesQuote_Channel_ID, EvolveSalesQuote_Project_ID = @EvolveSalesQuote_Project_ID, EvolveSalesQuote_TaxClass_ID = @EvolveSalesQuote_TaxClass_ID, EvolveSalesQuote_DeliveryMode_ID = @EvolveSalesQuote_DeliveryMode_ID, EvolveSalesQuote_Pnf = @EvolveSalesQuote_Pnf, EvolveCreditTerms_ID = @EvolveCreditTerms_ID, EvolveSalesQuote_Comments = @EvolveSalesQuote_Comments, EvolveSalesQuote_MultiSalesPerson = @EvolveSalesQuote_MultiSalesPerson, EvolveSalesQuote_SalesPerson = @EvolveSalesQuote_SalesPerson, EvolveSalesQuote_AttachedDocument =@EvolveSalesQuote_AttachedDocument ,EvolveSalesQuote_MultiSalesPersons = @EvolveSalesQuote_MultiSalesPersons, EvolveSalesQuote_SubmitDate = @EvolveSalesQuote_SubmitDate, EvolveSalesQuote_Status = @EvolveSalesQuote_Status, EvolveSalesQuote_CurrentOutstanding = @EvolveSalesQuote_CurrentOutstanding, EvolveSalesQuote_ThirtyOutstanding = @EvolveSalesQuote_ThirtyOutstanding, EvolveSalesQuote_SixtyOutstanding = @EvolveSalesQuote_SixtyOutstanding, EvolveSalesQuote_NinetyOutstanding = @EvolveSalesQuote_NinetyOutstanding,EvolveSalesQuote_OneEightyOutstanding=@EvolveSalesQuote_OneEightyOutstanding, EvolveSalesQuote_LandedCost = @EvolveSalesQuote_LandedCost, EvolveSalesQuote_ProfitMargin = @EvolveSalesQuote_ProfitMargin, EvolveSalesQuote_Freight = @EvolveSalesQuote_Freight,EvolveSalesQuote_OutWardFreight=@EvolveSalesQuote_OutWardFreight ,EvolveSalesQuote_TotalCustomerPrice=@EvolveSalesQuote_TotalCustomerPrice, EvolveSalesQuote_UpdatedAt = @EvolveSalesQuote_UpdatedAt, EvolveSalesQuote_UpdatedUser = @EvolveSalesQuote_UpdatedUser ,EvolveSalesQuote_PoDate=@EvolveSalesQuote_PoDate WHERE EvolveSalesQuote_ID = @EvolveSalesQuote_ID ');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Update Salse Quote "+error.message);
        return new Error(" EERR####: Error While Update Salse Quote "+error.message);
      }
    },
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
        console.log("data>>>>" ,  data)

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


    saveInitialQuoteHeadDetails : async function (data) {
      try { 
        

        let EvolveSalesQuote_PoDate = data.EvolveSalesQuote_PoDate ; 
        EvolveSalesQuote_PoDate = EvolveSalesQuote_PoDate == '' || EvolveSalesQuote_PoDate == null  ? null : EvolveSalesQuote_PoDate.split("-").reverse().join("-").replace("-", "-");


        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
        
        .input('EvolveSalesQuote_Serial', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Serial)
        .input('EvolveSalesQuote_Customer_ID', Evolve.Sql.Int, data.EvolveSalesQuote_Customer_ID)
        .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
        .input('EvolveSalesQuote_BillTo', Evolve.Sql.Int, data.EvolveSalesQuote_BillTo)
        .input('EvolveSalesQuote_ShipTo', Evolve.Sql.Int, data.EvolveSalesQuote_ShipTo)
        .input('EvolveSalesQuote_ReleaseDate', Evolve.Sql.NVarChar, data.EvolveSalesQuote_ReleaseDate)
        .input('EvolveSalesQuote_PurchaseOrder', Evolve.Sql.NVarChar, data.EvolveSalesQuote_PurchaseOrder)
        .input('EvolveSalesQuote_Channel_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Channel_ID)
        .input('EvolveSalesQuote_TaxEnv_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_TaxEnv_ID)

        .input('EvolveSalesQuote_Project_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Project_ID)
        .input('EvolveSalesQuote_TaxClass_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_TaxClass_ID)
        .input('EvolveSalesQuote_DeliveryMode_ID', Evolve.Sql.NVarChar, data.EvolveSalesQuote_DeliveryMode_ID)
        .input('EvolveSalesQuote_Pnf', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Pnf)
        .input('EvolveCreditTerms_ID', Evolve.Sql.NVarChar, data.EvolveCreditTerms_ID)
        .input('EvolveSalesQuote_Comments', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Comments)
        .input('EvolveSalesQuote_MultiSalesPerson', Evolve.Sql.NVarChar, data.EvolveSalesQuote_MultiSalesPerson)
        .input('EvolveSalesQuote_SalesPerson', Evolve.Sql.NVarChar, data.EvolveSalesQuote_SalesPerson)
        .input('EvolveSalesQuote_AttachedDocument', Evolve.Sql.NVarChar, data.EvolveSalesQuote_AttachedDocument)

        .input('EvolveSalesQuote_MultiSalesPersons', Evolve.Sql.NVarChar, data.EvolveSalesQuote_MultiSalesPersons)
        .input('EvolveSalesQuote_SubmitDate', Evolve.Sql.NVarChar, data.EvolveSalesQuote_SubmitDate)
        .input('EvolveSalesQuote_Status', Evolve.Sql.NVarChar, data.EvolveSalesQuote_Status)
        .input('EvolveSalesQuote_CurrentOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_CurrentOutstanding)
        .input('EvolveSalesQuote_ThirtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_ThirtyOutstanding)
        .input('EvolveSalesQuote_SixtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_SixtyOutstanding)
        .input('EvolveSalesQuote_NinetyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_NinetyOutstanding)
        .input('EvolveSalesQuote_OneEightyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesQuote_OneEightyOutstanding)

        .input('EvolveSalesQuote_LandedCost', Evolve.Sql.Float, data.EvolveSalesQuote_LandedCost)
        .input('EvolveSalesQuote_ProfitMargin', Evolve.Sql.Float, data.EvolveSalesQuote_ProfitMargin)
        .input('EvolveSalesQuote_Freight', Evolve.Sql.Float, data.EvolveSalesQuote_Freight)
        .input('EvolveSalesQuote_OutWardFreight', Evolve.Sql.Float, data.EvolveSalesQuote_OutWardFreight)

        .input('EvolveUnit_ID', Evolve.Sql.Float, data.EvolveUnit_ID)
        .input('EvolveSalesQuote_PoDate', Evolve.Sql.NVarChar, EvolveSalesQuote_PoDate)

        .input('EvolveSalesQuote_TotalCustomerPrice', Evolve.Sql.Float, data.EvolveSalesQuote_TotalCustomerPrice)
        .input('EvolveSalesQuote_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesQuote_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveSalesQuote_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesQuote_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveSalesQuote_SalesOrder', Evolve.Sql.NVarChar, data.EvolveSalesQuote_SalesOrder)


        .query(' INSERT INTO EvolveSalesQuote (EvolveSalesQuote_Serial, EvolveSalesQuote_Customer_ID, EvolveApprovalMatrix_ID, EvolveSalesQuote_BillTo, EvolveSalesQuote_ShipTo, EvolveSalesQuote_ReleaseDate, EvolveSalesQuote_PurchaseOrder, EvolveSalesQuote_Channel_ID,EvolveSalesQuote_TaxEnv_ID , EvolveSalesQuote_Project_ID, EvolveSalesQuote_TaxClass_ID, EvolveSalesQuote_DeliveryMode_ID, EvolveSalesQuote_Pnf, EvolveCreditTerms_ID, EvolveSalesQuote_Comments, EvolveSalesQuote_MultiSalesPerson, EvolveSalesQuote_SalesPerson,EvolveSalesQuote_AttachedDocument, EvolveSalesQuote_MultiSalesPersons, EvolveSalesQuote_SubmitDate, EvolveSalesQuote_Status, EvolveSalesQuote_CurrentOutstanding, EvolveSalesQuote_ThirtyOutstanding, EvolveSalesQuote_SixtyOutstanding, EvolveSalesQuote_NinetyOutstanding,EvolveSalesQuote_OneEightyOutstanding , EvolveSalesQuote_LandedCost, EvolveSalesQuote_ProfitMargin, EvolveSalesQuote_Freight,EvolveSalesQuote_OutWardFreight, EvolveUnit_ID,EvolveSalesQuote_PoDate ,EvolveSalesQuote_TotalCustomerPrice,EvolveSalesQuote_CreatedAt, EvolveSalesQuote_CreatedUser, EvolveSalesQuote_UpdatedAt, EvolveSalesQuote_UpdatedUser,EvolveSalesQuote_SalesOrder) VALUES (@EvolveSalesQuote_Serial, @EvolveSalesQuote_Customer_ID, @EvolveApprovalMatrix_ID, @EvolveSalesQuote_BillTo, @EvolveSalesQuote_ShipTo, @EvolveSalesQuote_ReleaseDate, @EvolveSalesQuote_PurchaseOrder, @EvolveSalesQuote_Channel_ID, @EvolveSalesQuote_TaxEnv_ID ,@EvolveSalesQuote_Project_ID, @EvolveSalesQuote_TaxClass_ID, @EvolveSalesQuote_DeliveryMode_ID, @EvolveSalesQuote_Pnf, @EvolveCreditTerms_ID, @EvolveSalesQuote_Comments, @EvolveSalesQuote_MultiSalesPerson, @EvolveSalesQuote_SalesPerson, @EvolveSalesQuote_AttachedDocument ,@EvolveSalesQuote_MultiSalesPersons, @EvolveSalesQuote_SubmitDate, @EvolveSalesQuote_Status, @EvolveSalesQuote_CurrentOutstanding, @EvolveSalesQuote_ThirtyOutstanding, @EvolveSalesQuote_SixtyOutstanding, @EvolveSalesQuote_NinetyOutstanding,@EvolveSalesQuote_OneEightyOutstanding, @EvolveSalesQuote_LandedCost, @EvolveSalesQuote_ProfitMargin, @EvolveSalesQuote_Freight,@EvolveSalesQuote_OutWardFreight , @EvolveUnit_ID ,@EvolveSalesQuote_PoDate ,@EvolveSalesQuote_TotalCustomerPrice,@EvolveSalesQuote_CreatedAt, @EvolveSalesQuote_CreatedUser, @EvolveSalesQuote_UpdatedAt, @EvolveSalesQuote_UpdatedUser ,@EvolveSalesQuote_SalesOrder) ;select @@IDENTITY AS \'inserted_id\'');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Save Salse Quote "+error.message);
        return new Error(" EERR####: Error While Save Salse Quote "+error.message);
      }
    },

    saveInitialQuoteLineDetails : async function (data, EvolveSalesQuote_ID) {
      
      try { 

        let EvolveSalesQuoteDetails_ReqdDate = data.EvolveSalesQuoteDetails_ReqdDate ; 
        let EvolveSalesQuoteDetails_PromiseDate = data.EvolveSalesQuoteDetails_PromiseDate ; 
        let EvolveSalesQuoteDetails_DueDate = data.EvolveSalesQuoteDetails_DueDate ; 



       EvolveSalesQuoteDetails_ReqdDate = EvolveSalesQuoteDetails_ReqdDate == '' || EvolveSalesQuoteDetails_ReqdDate == null  ? null : EvolveSalesQuoteDetails_ReqdDate.split("-").reverse().join("-").replace("-", "-");


       EvolveSalesQuoteDetails_PromiseDate = EvolveSalesQuoteDetails_PromiseDate == '' || EvolveSalesQuoteDetails_PromiseDate == null  ? null : EvolveSalesQuoteDetails_PromiseDate.split("-").reverse().join("-").replace("-", "-");


       EvolveSalesQuoteDetails_DueDate = EvolveSalesQuoteDetails_DueDate == '' || EvolveSalesQuoteDetails_DueDate == null  ? null : EvolveSalesQuoteDetails_DueDate.split("-").reverse().join("-").replace("-", "-");



        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        
        return await Evolve.SqlPool.request()
          
        .input('EvolveSalesQuote_ID', Evolve.Sql.Int, EvolveSalesQuote_ID)
        .input('EvolvePriceListDetails_ID', Evolve.Sql.Int, (data.EvolvePriceListDetails_ID))

        .input('EvolveSalesQuoteDetails_LineNo', Evolve.Sql.Int, parseInt(data.EvolveSalesQuoteDetails_LineNo))
        .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
        .input('EvolveSalesQuoteDetails_Qty', Evolve.Sql.Float, data.EvolveSalesQuoteDetails_Qty)
        .input('EvolveSalesQuoteDetails_CustomerUnitPrice', Evolve.Sql.Float, data.EvolveSalesQuoteDetails_CustomerUnitPrice)
        .input('EvolveSalesQuoteDetails_ItemUnitPrice', Evolve.Sql.Float, data.EvolveItem_ItemUnitPrice)

        .input('EvolveSalesQuoteDetails_CustomerDiscount', Evolve.Sql.Float, data.EvolveSalesQuoteDetails_CustomerDiscount)
        .input('EvolveTaxClass_ID', Evolve.Sql.Int, parseInt(data.EvolveTaxClass_ID))
        .input('EvolveSalesQuoteDetails_TaxEnv_ID', Evolve.Sql.Int, parseInt(data.EvolveSalesQuoteDetails_TaxEnv_ID))

        .input('EvolveSalesQuoteDetails_ReqdDate', Evolve.Sql.NVarChar, EvolveSalesQuoteDetails_ReqdDate)

        .input('EvolveSalesQuoteDetails_PromiseDate', Evolve.Sql.NVarChar, EvolveSalesQuoteDetails_PromiseDate)
        .input('EvolveSalesQuoteDetails_DueDate', Evolve.Sql.NVarChar, EvolveSalesQuoteDetails_DueDate)
        .input('EvolveSalesQuoteDetails_Comments', Evolve.Sql.NVarChar, data.EvolveSalesQuoteDetails_Comments)
        .input('EvolveSalesQuoteDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesQuoteDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveSalesQuoteDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesQuoteDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query(' INSERT INTO EvolveSalesQuoteDetails (EvolveSalesQuote_ID, EvolvePriceListDetails_ID ,EvolveSalesQuoteDetails_LineNo, EvolveItem_ID, EvolveSalesQuoteDetails_Qty, EvolveSalesQuoteDetails_CustomerUnitPrice,EvolveSalesQuoteDetails_ItemUnitPrice, EvolveSalesQuoteDetails_CustomerDiscount, EvolveTaxClass_ID,EvolveSalesQuoteDetails_TaxEnv_ID, EvolveSalesQuoteDetails_ReqdDate, EvolveSalesQuoteDetails_PromiseDate, EvolveSalesQuoteDetails_DueDate, EvolveSalesQuoteDetails_Comments, EvolveSalesQuoteDetails_CreatedAt, EvolveSalesQuoteDetails_CreatedUser, EvolveSalesQuoteDetails_UpdatedAt, EvolveSalesQuoteDetails_UpdatedUser) VALUES (@EvolveSalesQuote_ID, @EvolvePriceListDetails_ID ,@EvolveSalesQuoteDetails_LineNo, @EvolveItem_ID, @EvolveSalesQuoteDetails_Qty, @EvolveSalesQuoteDetails_CustomerUnitPrice,@EvolveSalesQuoteDetails_ItemUnitPrice, @EvolveSalesQuoteDetails_CustomerDiscount, @EvolveTaxClass_ID, @EvolveSalesQuoteDetails_TaxEnv_ID ,@EvolveSalesQuoteDetails_ReqdDate, @EvolveSalesQuoteDetails_PromiseDate, @EvolveSalesQuoteDetails_DueDate, @EvolveSalesQuoteDetails_Comments, @EvolveSalesQuoteDetails_CreatedAt, @EvolveSalesQuoteDetails_CreatedUser, @EvolveSalesQuoteDetails_UpdatedAt, @EvolveSalesQuoteDetails_UpdatedUser) ');
      } catch (error) {
  
        Evolve.Log.error("line errororoor: Error While Save Salse Quote Details "+error.message);
        return new Error("line errororoor: Error While Save Salse Quote Details "+error.message);
      }
    },

    getItemAgreementDetailsByDesignGroupForInitialLoad: async function (data) {
      try {
          
        return await Evolve.SqlPool.request()
        .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
        .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
        .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
        .input('EvolvePriceList_Code', Evolve.Sql.NVarChar, data.EvolvePriceList_Code)

        .query("SELECT  * FROM    (SELECT epl.EvolvePriceList_Code , epld.EvolvePriceList_ID  ,epld.EvolvePriceListDetails_Percentage ,epld.EvolvePriceListDetails_ID ,ROW_NUMBER() OVER (PARTITION BY epl.EvolvePriceList_Code ORDER BY epl.EvolvePriceList_CreatedAt DESC) AS RowNumber FROM   EvolvePriceList epl ,  EvolveItem ei , EvolvePriceListCustUnitDetails epcud , EvolvePriceListDetails epld  WHERE  epl.EvolvePriceList_Code = @EvolvePriceList_Code AND epl.EvolvePriceList_Code =  epl.EvolvePriceList_Code AND ei.EvolveItem_ID = @EvolveItem_ID  AND epcud.EvolveCustomer_ID = @EvolveCustomer_ID  AND epcud.EvolveUnit_ID = @EvolveUnit_ID AND epcud.EvolvePriceList_ID = epl.EvolvePriceList_ID AND epld.EvolvePriceList_ID = epl.EvolvePriceList_ID AND  epld.EvolvePriceListDetails_DesignGroup = ei.EvolveItem_DesignGroup AND epld.EvolvePriceListDetails_IsActive = 1 AND epld.EvolvePriceListDetails_Type = 'PGC' AND cast(epld.EvolvePriceListDetails_StartDate as date) <= cast(GETDATE() as date) AND cast(epld.EvolvePriceListDetails_EndDate as date) >= cast(GETDATE() as date)) AS a WHERE   a.RowNumber = 1");


      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While get agreement details "+error.message);
        return new Error(" EERR####: Error While get agreement details "+error.message);
      }
    },
    getItemAgreementDetailsByItemForInitialLoad : async function (data) {
      try {

        return await Evolve.SqlPool.request()
        .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
        .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
        .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
        .input('EvolvePriceList_Code', Evolve.Sql.NVarChar, data.EvolvePriceList_Code)

        .query("SELECT  * FROM    (SELECT epl.EvolvePriceList_Code , epld.EvolvePriceList_ID  ,epld.EvolvePriceListDetails_Percentage ,epld.EvolvePriceListDetails_ID ,ROW_NUMBER() OVER (PARTITION BY epl.EvolvePriceList_Code ORDER BY epl.EvolvePriceList_CreatedAt DESC) AS RowNumber FROM   EvolvePriceList epl ,  EvolveItem ei , EvolvePriceListCustUnitDetails epcud , EvolvePriceListDetails epld  WHERE  epl.EvolvePriceList_Code = @EvolvePriceList_Code  AND  epl.EvolvePriceList_Code =  epl.EvolvePriceList_Code AND ei.EvolveItem_ID = @EvolveItem_ID  AND epcud.EvolveCustomer_ID = @EvolveCustomer_ID  AND epcud.EvolveUnit_ID = @EvolveUnit_ID AND epcud.EvolvePriceList_ID = epl.EvolvePriceList_ID AND epld.EvolvePriceList_ID = epl.EvolvePriceList_ID AND  epld.EvolveItem_ID = ei.EvolveItem_ID AND epld.EvolvePriceListDetails_IsActive = 1 AND epld.EvolvePriceListDetails_Type = 'Catloge' AND cast(epld.EvolvePriceListDetails_StartDate as date) <= cast(GETDATE() as date) AND cast(epld.EvolvePriceListDetails_EndDate as date) >= cast(GETDATE() as date)) AS a WHERE   a.RowNumber = 1");
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While get agreement details "+error.message);
        return new Error(" EERR####: Error While get agreement details "+error.message);
      }
    },

    getUnitCode : async function (EvolveUnit_Code) {
      try {
        console.log("EvolveUnit_Code??" ,  EvolveUnit_Code)
        return await Evolve.SqlPool.request()
        .input('EvolveUnit_Code', Evolve.Sql.NVarChar, EvolveUnit_Code)
        .query(' SELECT EvolveUnit_ID  FROM EvolveUnit WHERE EvolveUnit_Code = @EvolveUnit_Code ');
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Unit Code Id"+error.message);
        return new Error(" EERR####: Error While Get Unit Code Id"+error.message);
      }
    },











}
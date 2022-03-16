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
        

        let EvolveSO_PoDate = data.EvolveSO_PoDate ; 
        EvolveSO_PoDate = EvolveSO_PoDate == '' || EvolveSO_PoDate == null  ? null : EvolveSO_PoDate.split("-").reverse().join("-").replace("-", "-");


        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
        
        .input('EvolveSO_Serial', Evolve.Sql.NVarChar, data.EvolveSO_Serial)
        .input('EvolveSO_Customer_ID', Evolve.Sql.Int, data.EvolveSO_Customer_ID)
        .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
        .input('EvolveSO_BillTo', Evolve.Sql.Int, data.EvolveSO_BillTo)
        .input('EvolveSO_ShipTo', Evolve.Sql.Int, data.EvolveSO_ShipTo)
        .input('EvolveSO_ReleaseDate', Evolve.Sql.NVarChar, data.EvolveSO_ReleaseDate)
        .input('EvolveSO_PurchaseOrder', Evolve.Sql.NVarChar, data.EvolveSO_PurchaseOrder)
        .input('EvolveSO_Channel_ID', Evolve.Sql.NVarChar, data.EvolveSO_Channel_ID)
        .input('EvolveSO_TaxEnv_ID', Evolve.Sql.NVarChar, data.EvolveSO_TaxEnv_ID)

        .input('EvolveSO_Project_ID', Evolve.Sql.NVarChar, data.EvolveSO_Project_ID)
        .input('EvolveSO_TaxClass_ID', Evolve.Sql.NVarChar, data.EvolveSO_TaxClass_ID)
        .input('EvolveSO_DeliveryMode_ID', Evolve.Sql.NVarChar, data.EvolveSO_DeliveryMode_ID)
        .input('EvolveSO_Pnf', Evolve.Sql.NVarChar, data.EvolveSO_Pnf)
        .input('EvolveCreditTerms_ID', Evolve.Sql.NVarChar, data.EvolveCreditTerms_ID)
        .input('EvolveSO_Comments', Evolve.Sql.NVarChar, data.EvolveSO_Comments)
        .input('EvolveSO_MultiSalesPerson', Evolve.Sql.NVarChar, data.EvolveSO_MultiSalesPerson)
        .input('EvolveSO_SalesPerson', Evolve.Sql.NVarChar, data.EvolveSO_SalesPerson)
        .input('EvolveSO_AttachedDocument', Evolve.Sql.NVarChar, data.EvolveSO_AttachedDocument)

        .input('EvolveSO_MultiSalesPersons', Evolve.Sql.NVarChar, data.EvolveSO_MultiSalesPersons)
        .input('EvolveSO_SubmitDate', Evolve.Sql.NVarChar, data.EvolveSO_SubmitDate)
        .input('EvolveSO_Status', Evolve.Sql.NVarChar, data.EvolveSO_Status)
        .input('EvolveSO_CurrentOutstanding', Evolve.Sql.NVarChar, data.EvolveSO_CurrentOutstanding)
        .input('EvolveSO_ThirtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSO_ThirtyOutstanding)
        .input('EvolveSO_SixtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSO_SixtyOutstanding)
        .input('EvolveSO_NinetyOutstanding', Evolve.Sql.NVarChar, data.EvolveSO_NinetyOutstanding)
        .input('EvolveSO_OneEightyOutstanding', Evolve.Sql.NVarChar, data.EvolveSO_OneEightyOutstanding)

        .input('EvolveSO_LandedCost', Evolve.Sql.Float, data.EvolveSO_LandedCost)
        .input('EvolveSO_ProfitMargin', Evolve.Sql.Float, data.EvolveSO_ProfitMargin)
        .input('EvolveSO_Freight', Evolve.Sql.Float, data.EvolveSO_Freight)
        .input('EvolveSO_OutWardFreight', Evolve.Sql.Float, data.EvolveSO_OutWardFreight)

        .input('EvolveUnit_ID', Evolve.Sql.Float, data.EvolveUnit_ID)
        .input('EvolveSO_PoDate', Evolve.Sql.NVarChar, EvolveSO_PoDate)

        .input('EvolveSO_TotalCustomerPrice', Evolve.Sql.Float, data.EvolveSO_TotalCustomerPrice)
        .input('EvolveSO_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSO_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveSO_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSO_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query(' INSERT INTO EvolveSO (EvolveSO_Serial, EvolveSO_Customer_ID, EvolveApprovalMatrix_ID, EvolveSO_BillTo, EvolveSO_ShipTo, EvolveSO_ReleaseDate, EvolveSO_PurchaseOrder, EvolveSO_Channel_ID,EvolveSO_TaxEnv_ID , EvolveSO_Project_ID, EvolveSO_TaxClass_ID, EvolveSO_DeliveryMode_ID, EvolveSO_Pnf, EvolveCreditTerms_ID, EvolveSO_Comments, EvolveSO_MultiSalesPerson, EvolveSO_SalesPerson,EvolveSO_AttachedDocument, EvolveSO_MultiSalesPersons, EvolveSO_SubmitDate, EvolveSO_Status, EvolveSO_CurrentOutstanding, EvolveSO_ThirtyOutstanding, EvolveSO_SixtyOutstanding, EvolveSO_NinetyOutstanding,EvolveSO_OneEightyOutstanding , EvolveSO_LandedCost, EvolveSO_ProfitMargin, EvolveSO_Freight,EvolveSO_OutWardFreight, EvolveUnit_ID,EvolveSO_PoDate ,EvolveSO_TotalCustomerPrice,EvolveSO_CreatedAt, EvolveSO_CreatedUser, EvolveSO_UpdatedAt, EvolveSO_UpdatedUser) VALUES (@EvolveSO_Serial, @EvolveSO_Customer_ID, @EvolveApprovalMatrix_ID, @EvolveSO_BillTo, @EvolveSO_ShipTo, @EvolveSO_ReleaseDate, @EvolveSO_PurchaseOrder, @EvolveSO_Channel_ID, @EvolveSO_TaxEnv_ID ,@EvolveSO_Project_ID, @EvolveSO_TaxClass_ID, @EvolveSO_DeliveryMode_ID, @EvolveSO_Pnf, @EvolveCreditTerms_ID, @EvolveSO_Comments, @EvolveSO_MultiSalesPerson, @EvolveSO_SalesPerson, @EvolveSO_AttachedDocument ,@EvolveSO_MultiSalesPersons, @EvolveSO_SubmitDate, @EvolveSO_Status, @EvolveSO_CurrentOutstanding, @EvolveSO_ThirtyOutstanding, @EvolveSO_SixtyOutstanding, @EvolveSO_NinetyOutstanding,@EvolveSO_OneEightyOutstanding, @EvolveSO_LandedCost, @EvolveSO_ProfitMargin, @EvolveSO_Freight,@EvolveSO_OutWardFreight , @EvolveUnit_ID ,@EvolveSO_PoDate ,@EvolveSO_TotalCustomerPrice,@EvolveSO_CreatedAt, @EvolveSO_CreatedUser, @EvolveSO_UpdatedAt, @EvolveSO_UpdatedUser) ;select @@IDENTITY AS \'inserted_id\'');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Save Salse Quote "+error.message);
        return new Error(" EERR####: Error While Save Salse Quote "+error.message);
      }
    },


    saveQuoteLineDetails : async function (data, EvolveSO_ID) {
      
      try { 

        let EvolveSODetails_ReqdDate = data.EvolveSODetails_ReqdDate ; 
        let EvolveSODetails_PromiseDate = data.EvolveSODetails_PromiseDate ; 
        let EvolveSODetails_DueDate = data.EvolveSODetails_DueDate ; 



       EvolveSODetails_ReqdDate = EvolveSODetails_ReqdDate == '' || EvolveSODetails_ReqdDate == null  ? null : EvolveSODetails_ReqdDate.split("-").reverse().join("-").replace("-", "-");


       EvolveSODetails_PromiseDate = EvolveSODetails_PromiseDate == '' || EvolveSODetails_PromiseDate == null  ? null : EvolveSODetails_PromiseDate.split("-").reverse().join("-").replace("-", "-");


       EvolveSODetails_DueDate = EvolveSODetails_DueDate == '' || EvolveSODetails_DueDate == null  ? null : EvolveSODetails_DueDate.split("-").reverse().join("-").replace("-", "-");

       if(data.EvolvePriceListDetails_ID == '' || data.EvolvePriceListDetails_ID == undefined  ){

        data.EvolvePriceListDetails_ID = null ;

       }

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        
        return await Evolve.SqlPool.request()
          
        .input('EvolveSO_ID', Evolve.Sql.Int, EvolveSO_ID)
        .input('EvolvePriceListDetails_ID', Evolve.Sql.Int, (data.EvolvePriceListDetails_ID))

        .input('EvolveSODetails_LineNo', Evolve.Sql.Int, parseInt(data.EvolveSODetails_LineNo))
        .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
        .input('EvolveSODetails_Qty', Evolve.Sql.Float, data.EvolveSODetails_Qty)
        .input('EvolveSODetails_CustomerUnitPrice', Evolve.Sql.Float, data.EvolveSODetails_CustomerUnitPrice)
        .input('EvolveSODetails_ItemUnitPrice', Evolve.Sql.Float, data.EvolveItem_ItemUnitPrice)

        .input('EvolveSODetails_CustomerDiscount', Evolve.Sql.Float, data.EvolveSODetails_CustomerDiscount)
        .input('EvolveTaxClass_ID', Evolve.Sql.Int, parseInt(data.EvolveTaxClass_ID))
        .input('EvolveSODetails_TaxEnv_ID', Evolve.Sql.Int, parseInt(data.EvolveSODetails_TaxEnv_ID))

        .input('EvolveSODetails_ReqdDate', Evolve.Sql.NVarChar, EvolveSODetails_ReqdDate)
        .input('EvolveSODetails_PromiseDate', Evolve.Sql.NVarChar, EvolveSODetails_PromiseDate)
        .input('EvolveSODetails_DueDate', Evolve.Sql.NVarChar, EvolveSODetails_DueDate)
        .input('EvolveSODetails_Comments', Evolve.Sql.NVarChar, data.EvolveSODetails_Comments)
        .input('EvolveSODetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSODetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveSODetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSODetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query(' INSERT INTO EvolveSODetails (EvolveSO_ID, EvolvePriceListDetails_ID ,EvolveSODetails_LineNo, EvolveItem_ID, EvolveSODetails_Qty, EvolveSODetails_CustomerUnitPrice,EvolveSODetails_ItemUnitPrice, EvolveSODetails_CustomerDiscount, EvolveTaxClass_ID,EvolveSODetails_TaxEnv_ID, EvolveSODetails_ReqdDate, EvolveSODetails_PromiseDate, EvolveSODetails_DueDate, EvolveSODetails_Comments, EvolveSODetails_CreatedAt, EvolveSODetails_CreatedUser, EvolveSODetails_UpdatedAt, EvolveSODetails_UpdatedUser) VALUES (@EvolveSO_ID, @EvolvePriceListDetails_ID ,@EvolveSODetails_LineNo, @EvolveItem_ID, @EvolveSODetails_Qty, @EvolveSODetails_CustomerUnitPrice,@EvolveSODetails_ItemUnitPrice, @EvolveSODetails_CustomerDiscount, @EvolveTaxClass_ID, @EvolveSODetails_TaxEnv_ID ,@EvolveSODetails_ReqdDate, @EvolveSODetails_PromiseDate, @EvolveSODetails_DueDate, @EvolveSODetails_Comments, @EvolveSODetails_CreatedAt, @EvolveSODetails_CreatedUser, @EvolveSODetails_UpdatedAt, @EvolveSODetails_UpdatedUser) ');
      } catch (error) {
  
        Evolve.Log.error("line errororoor: Error While Save Salse Quote Details "+error.message);
        return new Error("line errororoor: Error While Save Salse Quote Details "+error.message);
      }
    },

    updateQuoteLineDetails : async function (data, EvolveSO_ID) {
      try { 

        console.log("data >>>>" ,  data)

      let EvolveSODetails_ReqdDate = data.EvolveSODetails_ReqdDate ; 
      let EvolveSODetails_PromiseDate = data.EvolveSODetails_PromiseDate ; 
      let EvolveSODetails_DueDate = data.EvolveSODetails_DueDate ; 



      EvolveSODetails_ReqdDate = EvolveSODetails_ReqdDate == '' || EvolveSODetails_ReqdDate == null  ? null : EvolveSODetails_ReqdDate.split("-").reverse().join("-").replace("-", "-");


      EvolveSODetails_PromiseDate = EvolveSODetails_PromiseDate == '' || EvolveSODetails_PromiseDate == null  ? null : EvolveSODetails_PromiseDate.split("-").reverse().join("-").replace("-", "-");


      EvolveSODetails_DueDate = EvolveSODetails_DueDate == '' || EvolveSODetails_DueDate == null  ? null : EvolveSODetails_DueDate.split("-").reverse().join("-").replace("-", "-");

      if(data.EvolvePriceListDetails_ID == '' || data.EvolvePriceListDetails_ID == undefined  ){

        data.EvolvePriceListDetails_ID = null ;

       }

      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      
      return await Evolve.SqlPool.request()
        
      .input('EvolveSO_ID', Evolve.Sql.Int, EvolveSO_ID)
      .input('EvolvePriceListDetails_ID', Evolve.Sql.Int, data.EvolvePriceListDetails_ID)

      .input('EvolveSODetails_LineNo', Evolve.Sql.Int, parseInt(data.EvolveSODetails_LineNo))
      .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
      .input('EvolveSODetails_Qty', Evolve.Sql.Float, data.EvolveSODetails_Qty)
      .input('EvolveSODetails_CustomerUnitPrice', Evolve.Sql.Float, data.EvolveSODetails_CustomerUnitPrice)
      .input('EvolveSODetails_ItemUnitPrice', Evolve.Sql.Float, data.EvolveItem_ItemUnitPrice)

      .input('EvolveSODetails_CustomerDiscount', Evolve.Sql.Float, data.EvolveSODetails_CustomerDiscount)
      .input('EvolveTaxClass_ID', Evolve.Sql.Int, parseInt(data.EvolveTaxClass_ID))
      .input('EvolveSODetails_TaxEnv_ID', Evolve.Sql.Int, parseInt(data.EvolveSODetails_TaxEnv_ID))

      .input('EvolveSODetails_ReqdDate', Evolve.Sql.NVarChar, EvolveSODetails_ReqdDate)
      .input('EvolveSODetails_PromiseDate', Evolve.Sql.NVarChar, EvolveSODetails_PromiseDate)
      .input('EvolveSODetails_DueDate', Evolve.Sql.NVarChar, EvolveSODetails_DueDate)
      .input('EvolveSODetails_Comments', Evolve.Sql.NVarChar, data.EvolveSODetails_Comments)
      .input('EvolveSODetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
      .input('EvolveSODetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
      .input('EvolveSODetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
      .input('EvolveSODetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

      .query(' INSERT INTO EvolveSODetails (EvolveSO_ID,EvolvePriceListDetails_ID, EvolveSODetails_LineNo, EvolveItem_ID, EvolveSODetails_Qty, EvolveSODetails_CustomerUnitPrice,EvolveSODetails_ItemUnitPrice, EvolveSODetails_CustomerDiscount, EvolveTaxClass_ID,EvolveSODetails_TaxEnv_ID, EvolveSODetails_ReqdDate, EvolveSODetails_PromiseDate, EvolveSODetails_DueDate, EvolveSODetails_Comments, EvolveSODetails_CreatedAt, EvolveSODetails_CreatedUser, EvolveSODetails_UpdatedAt, EvolveSODetails_UpdatedUser) VALUES (@EvolveSO_ID,@EvolvePriceListDetails_ID, @EvolveSODetails_LineNo, @EvolveItem_ID, @EvolveSODetails_Qty, @EvolveSODetails_CustomerUnitPrice,@EvolveSODetails_ItemUnitPrice , @EvolveSODetails_CustomerDiscount, @EvolveTaxClass_ID,@EvolveSODetails_TaxEnv_ID, @EvolveSODetails_ReqdDate, @EvolveSODetails_PromiseDate, @EvolveSODetails_DueDate, @EvolveSODetails_Comments, @EvolveSODetails_CreatedAt, @EvolveSODetails_CreatedUser, @EvolveSODetails_UpdatedAt, @EvolveSODetails_UpdatedUser) ');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Save Salse Quote Details "+error.message);
        return new Error(" EERR####: Error While Save Salse Quote Details "+error.message);
      }
    },

    getSingelSO : async function (EvolveSO_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSO_ID', Evolve.Sql.Int, EvolveSO_ID)
        .query("  SELECT ecust.EvolveCustomer_code , ecust.EvolveCustomer_name ,  esq.*  ,convert(varchar,esq.EvolveSO_CreatedAt, 105)  as dateRaised , convert(varchar,esq.EvolveSO_SubmitDate, 105)  as dateSubmited ,  convert(varchar,esq.EvolveSO_PoDate, 105)  as poDate,  eu.EvolveUnit_Code , eu.EvolveUnit_State FROM EvolveSO esq  ,   EvolveUnit eu , EvolveCustomer ecust  WHERE EvolveSO_ID = @EvolveSO_ID AND eu.EvolveUnit_ID = esq.EvolveUnit_ID   AND esq.EvolveSO_Customer_ID = ecust.EvolveCustomer_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single Sales Quote  "+error.message);
        return new Error(" EERR####: Error While Get Single Sales Quote  "+error.message);
      }
    },

    getSingelSalesQuoteDetails : async function (EvolveSO_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSO_ID', Evolve.Sql.Int, EvolveSO_ID)

        .query("  SELECT esqd.EvolvePriceListDetails_ID , esqd.EvolveSODetails_ItemUnitPrice as EvolveItem_ItemUnitPrice , esqd.EvolveSODetails_ID , esqd.EvolveSO_ID ,esqd.EvolveSODetails_LineNo ,esqd.EvolveSODetails_TaxEnv_ID , esqd.EvolveItem_ID ,esqd.EvolveSODetails_Qty,esqd.EvolveSODetails_CustomerUnitPrice ,esqd.EvolveSODetails_CustomerDiscount,esqd.EvolveTaxClass_ID ,esqd.EvolveSODetails_Comments , convert(varchar, esqd.EvolveSODetails_ReqdDate, 105)  as EvolveSODetails_ReqdDate ,   convert(varchar, esqd.EvolveSODetails_PromiseDate, 105)  as EvolveSODetails_PromiseDate,   convert(varchar, esqd.EvolveSODetails_DueDate, 105)  as EvolveSODetails_DueDate  , ei.EvolveItem_Code FROM EvolveSODetails  esqd , EvolveItem ei  WHERE esqd.EvolveSO_ID = @EvolveSO_ID   AND esqd.EvolveItem_ID = ei.EvolveItem_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
        return new Error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
      }
    },

    deleteSalseQuoteDetails : async function (EvolveSO_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSO_ID', Evolve.Sql.Int, EvolveSO_ID)
        .query(' DELETE FROM EvolveSODetails WHERE EvolveSO_ID = @EvolveSO_ID ');
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
        return new Error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
      }
    },

    updateSalesQuoteHead : async function (data) {
      try {
 
        console.log("EUPDATE>>>>>>>>>>>... DETAILS UPATE >>>>>" , data)
        
        
        let EvolveSO_PoDate = data.EvolveSO_PoDate ; 
        EvolveSO_PoDate = EvolveSO_PoDate == '' || EvolveSO_PoDate == null  ? null : EvolveSO_PoDate.split("-").reverse().join("-").replace("-", "-");

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
          
        .input('EvolveSO_ID', Evolve.Sql.Int, data.EvolveSO_ID)
        .input('EvolveSO_Serial', Evolve.Sql.NVarChar, data.EvolveSO_Serial)
        .input('EvolveSO_Customer_ID', Evolve.Sql.Int, data.EvolveSO_Customer_ID)
        .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
        .input('EvolveSO_BillTo', Evolve.Sql.Int, data.EvolveSO_BillTo)
        .input('EvolveSO_ShipTo', Evolve.Sql.Int, data.EvolveSO_ShipTo)
        .input('EvolveSO_ReleaseDate', Evolve.Sql.NVarChar, data.EvolveSO_ReleaseDate)
        .input('EvolveSO_PurchaseOrder', Evolve.Sql.NVarChar, data.EvolveSO_PurchaseOrder)
        .input('EvolveSO_Channel_ID', Evolve.Sql.NVarChar, data.EvolveSO_Channel_ID)
        .input('EvolveSO_Project_ID', Evolve.Sql.NVarChar, data.EvolveSO_Project_ID)
        .input('EvolveSO_TaxClass_ID', Evolve.Sql.NVarChar, data.EvolveSO_TaxClass_ID)
        .input('EvolveSO_DeliveryMode_ID', Evolve.Sql.NVarChar, data.EvolveSO_DeliveryMode_ID)
        .input('EvolveSO_Pnf', Evolve.Sql.NVarChar, data.EvolveSO_Pnf)
        .input('EvolveCreditTerms_ID', Evolve.Sql.NVarChar, data.EvolveCreditTerms_ID)
        .input('EvolveSO_Comments', Evolve.Sql.NVarChar, data.EvolveSO_Comments)
        .input('EvolveSO_MultiSalesPerson', Evolve.Sql.NVarChar, data.EvolveSO_MultiSalesPerson)
        .input('EvolveSO_SalesPerson', Evolve.Sql.NVarChar, data.EvolveSO_SalesPerson)
        .input('EvolveSO_AttachedDocument', Evolve.Sql.NVarChar, data.EvolveSO_AttachedDocument)

        .input('EvolveSO_MultiSalesPersons', Evolve.Sql.NVarChar, data.EvolveSO_MultiSalesPersons)
        .input('EvolveSO_SubmitDate', Evolve.Sql.NVarChar, data.EvolveSO_SubmitDate)
        .input('EvolveSO_Status', Evolve.Sql.NVarChar, data.EvolveSO_Status)
        .input('EvolveSO_CurrentOutstanding', Evolve.Sql.NVarChar, data.EvolveSO_CurrentOutstanding)
        .input('EvolveSO_ThirtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSO_ThirtyOutstanding)
        .input('EvolveSO_SixtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSO_SixtyOutstanding)
        .input('EvolveSO_NinetyOutstanding', Evolve.Sql.NVarChar, data.EvolveSO_NinetyOutstanding)
        .input('EvolveSO_OneEightyOutstanding', Evolve.Sql.NVarChar, data.EvolveSO_OneEightyOutstanding)

        .input('EvolveSO_LandedCost', Evolve.Sql.Float, data.EvolveSO_LandedCost)
        .input('EvolveSO_ProfitMargin', Evolve.Sql.Float, data.EvolveSO_ProfitMargin)
        .input('EvolveSO_Freight', Evolve.Sql.Float, data.EvolveSO_Freight)
        .input('EvolveSO_OutWardFreight', Evolve.Sql.Float, data.EvolveSO_OutWardFreight)

        .input('EvolveSO_TotalCustomerPrice', Evolve.Sql.Float, data.EvolveSO_TotalCustomerPrice)
        .input('EvolveSO_PoDate', Evolve.Sql.NVarChar, EvolveSO_PoDate)


        .input('EvolveSO_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSO_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query(' UPDATE EvolveSO SET EvolveSO_Serial = @EvolveSO_Serial, EvolveSO_Customer_ID = @EvolveSO_Customer_ID, EvolveApprovalMatrix_ID = @EvolveApprovalMatrix_ID, EvolveSO_BillTo = @EvolveSO_BillTo, EvolveSO_ShipTo = @EvolveSO_ShipTo, EvolveSO_ReleaseDate = @EvolveSO_ReleaseDate, EvolveSO_PurchaseOrder = @EvolveSO_PurchaseOrder, EvolveSO_Channel_ID = @EvolveSO_Channel_ID, EvolveSO_Project_ID = @EvolveSO_Project_ID, EvolveSO_TaxClass_ID = @EvolveSO_TaxClass_ID, EvolveSO_DeliveryMode_ID = @EvolveSO_DeliveryMode_ID, EvolveSO_Pnf = @EvolveSO_Pnf, EvolveCreditTerms_ID = @EvolveCreditTerms_ID, EvolveSO_Comments = @EvolveSO_Comments, EvolveSO_MultiSalesPerson = @EvolveSO_MultiSalesPerson, EvolveSO_SalesPerson = @EvolveSO_SalesPerson, EvolveSO_AttachedDocument =@EvolveSO_AttachedDocument ,EvolveSO_MultiSalesPersons = @EvolveSO_MultiSalesPersons, EvolveSO_SubmitDate = @EvolveSO_SubmitDate, EvolveSO_Status = @EvolveSO_Status, EvolveSO_CurrentOutstanding = @EvolveSO_CurrentOutstanding, EvolveSO_ThirtyOutstanding = @EvolveSO_ThirtyOutstanding, EvolveSO_SixtyOutstanding = @EvolveSO_SixtyOutstanding, EvolveSO_NinetyOutstanding = @EvolveSO_NinetyOutstanding,EvolveSO_OneEightyOutstanding=@EvolveSO_OneEightyOutstanding, EvolveSO_LandedCost = @EvolveSO_LandedCost, EvolveSO_ProfitMargin = @EvolveSO_ProfitMargin, EvolveSO_Freight = @EvolveSO_Freight,EvolveSO_OutWardFreight=@EvolveSO_OutWardFreight ,EvolveSO_TotalCustomerPrice=@EvolveSO_TotalCustomerPrice, EvolveSO_UpdatedAt = @EvolveSO_UpdatedAt, EvolveSO_UpdatedUser = @EvolveSO_UpdatedUser ,EvolveSO_PoDate=@EvolveSO_PoDate WHERE EvolveSO_ID = @EvolveSO_ID ');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Update Salse Quote "+error.message);
        return new Error(" EERR####: Error While Update Salse Quote "+error.message);
      }
    },
    changeSqStatusOnAmend : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSO_ID', Evolve.Sql.Int, data.EvolveSO_ID)
        .input('EvolveSO_Status', Evolve.Sql.NVarChar, 'SAVED')

        .query(" UPDATE EvolveSO SET  EvolveSO_Status =@EvolveSO_Status WHERE EvolveSO_ID=@EvolveSO_ID ");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Amend Sales Quote  "+error.message);
        return new Error(" EERR####: Error While Amend Sales Quote  "+error.message);
      }
    },
    getItemAgreementDetailsByDesignGroup: async function (data) {
      try {

        console.log("data>>>>" ,  data)
          
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









}
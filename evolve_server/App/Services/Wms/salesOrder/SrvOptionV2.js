'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getSoDetails: async function (EvolveSalesOrder_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, EvolveSalesOrder_ID)
        .query("select es.*  , es.EvolveSalesOrder_IsPicklistGenerated as 'IsPicklistGenerated', ec.EvolveCustomer_Name ,  epl.EvolvePickList_Number , (select ea.EvolveAddress_Code   from EvolveAddress ea   where ea.EvolveAddress_ID = es.EvolveBillTo_ID  ) as 'BillTo' ,(select ea.EvolveAddress_Code   from EvolveAddress ea  where ea.EvolveAddress_ID = es.EvolveShipTo_ID  ) as 'ShipTo' from EvolveSalesOrder es LEFT JOIN  EvolvePickList epl ON es.EvolvePickList_ID = epl.EvolvePickList_ID , EvolveCustomer ec  where es.EvolveSalesOrder_ID  = @EvolveSalesOrder_ID AND  ec.EvolveCustomer_ID = es.EvolveCustomer_ID")
        // .query("SELECT  epl.EvolvePickList_Number ,  euom.EvolveUom_Uom ,   ei.EvolveItem_Desc1 ,  ei.EvolveItem_Part ,  epo.*   , esec.EvolveSection_Code ,  em.EvolveMachine_Code   FROM EvolveUom euom ,  EvolveItem ei ,    EvolveProdOrders epo  LEFT JOIN  EvolveSection esec ON  epo.EvolveSection_ID  = esec.EvolveSection_ID LEFT JOIN   EvolveMachine em   ON epo.EvolveMachine_ID = em.EvolveMachine_ID LEFT JOIN  EvolvePickList epl ON epo.EvolvePickList_ID = epl.EvolvePickList_ID WHERE  epo.EvolveProdOrders_ID  = @EvolveProdOrders_ID AND euom.EvolveUom_ID = ei.EvolveUom_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID")
    } catch (error) {
      Evolve.Log.error(" EERR1799: Erorr while getting Wo  Details " + error.message);
      return new Error(" EERR1799: Erorr while getting Wo  Details " + error.message);
    }
  },

  getSoLineDetails: async function (EvolveSalesOrder_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, EvolveSalesOrder_ID)
        .query("select esl.* , ei.EvolveItem_Part from EvolveSalesOrderLine esl , EvolveSalesOrder es , EvolveItem ei where es.EvolveSalesOrder_ID  = @EvolveSalesOrder_ID and es.EvolveSalesOrder_ID = esl.EvolveSalesOrder_ID AND ei.EvolveItem_ID = esl.EvolveItem_ID")
        // .query("SELECt epod.*  ,ei.EvolveItem_Part   ,  ei.EvolveItem_Desc1 , ei.EvolveItem_Desc2   FROM  EvolveProdOrdersDetail epod   ,  EvolveItem ei  WHERE epod.EvolveProdOrders_ID = @EvolveProdOrders_ID AND epod.EvolveItem_ID = ei.EvolveItem_ID")
    } catch (error) {
      Evolve.Log.error(" EERR1799: Erorr while getting Wo  Details " + error.message);
      return new Error(" EERR1799: Erorr while getting Wo  Details " + error.message);
    }
  },

  getTransHistory : async function (data) {
    try {

      // console
      console.log("data.EvolveProdOrders_OrderNo" , data.EvolveSalesOrder_Number)
      // console.log("data.EvolveProdOrders_OrderID" , data.EvolveProdOrders_OrderID)
      console.log("data.EvolveTransHistory_Type" , data.EvolveTransHistory_Type)



      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_OrderNo", Evolve.Sql.NVarChar, data.EvolveSalesOrder_Number)
        // .input("EvolveProdOrders_OrderID", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderID)
        .input("EvolveTransHistory_Type", Evolve.Sql.NVarChar, data.EvolveTransHistory_Type)
        .query(" SELECT * FROM EvolveTransHistory WHERE EvolveProdOrders_OrderNo=@EvolveProdOrders_OrderNo AND EvolveTransHistory_Type=@EvolveTransHistory_Type ORDER BY EvolveTransHistory_ID DESC")
    } catch (error) {
      Evolve.Log.error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
      return new Error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
    }
  },


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
          console.log("data>>>" ,  data)
            return await Evolve.SqlPool.request()
            .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
            .query("SELECT esalesp.EvolveSalesPerson_Code , esalesp.EvolveSalesPerson_Email ,esp.* , ecust.EvolveTaxClass_ID ,ecust.EvolveCustomer_ShipTo  ,  ecust.EvolveCustomer_BillTo  , ecust.EvolveSalesPerson_ID ,ecust.EvolveCustomer_name , ecust.EvolveCustomer_code ,  ecust.EvolveCreditTerms_ID FROM    EvolveShipTo esp , EvolveCustomer ecust   LEFT  JOIN    EvolveSalesPerson esalesp ON  ecust.EvolveSalesPerson_ID = esalesp.EvolveSalesPerson_ID WHERE ecust.EvolveCustomerID =@EvolveCustomer_ID AND ecust.EvolveCustomer_BillTo = esp.EvolveShipTo_ID ");
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
        

        let EvolveSalesOrder_PoDate = data.EvolveSalesOrder_PoDate ; 
        EvolveSalesOrder_PoDate = EvolveSalesOrder_PoDate == '' || EvolveSalesOrder_PoDate == null  ? null : EvolveSalesOrder_PoDate.split("-").reverse().join("-").replace("-", "-");


        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
        
        .input('EvolveSalesOrder_Serial', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Serial)
        .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
        .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
        .input('EvolveSalesOrder_BillToID', Evolve.Sql.Int, data.EvolveSalesOrder_BillToID)
        .input('EvolveSalesOrder_ShipToID', Evolve.Sql.Int, data.EvolveSalesOrder_ShipToID)
        .input('EvolveSalesOrder_ReleaseDate', Evolve.Sql.NVarChar, data.EvolveSalesOrder_ReleaseDate)
        .input('EvolveSalesOrder_PurchaseOrder', Evolve.Sql.NVarChar, data.EvolveSalesOrder_PurchaseOrder)
        .input('EvolveSalesOrder_Channel_ID', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Channel_ID)
        .input('EvolveTaxEnv_ID', Evolve.Sql.NVarChar, data.EvolveTaxEnv_ID)

        .input('EvolveSalesOrder_Project_ID', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Project_ID)
        .input('EvolveTaxClass_ID', Evolve.Sql.NVarChar, data.EvolveTaxClass_ID)
        .input('EvolveSalesOrder_DeliveryMode_ID', Evolve.Sql.NVarChar, data.EvolveSalesOrder_DeliveryMode_ID)
        .input('EvolveSalesOrder_Pnf', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Pnf)
        .input('EvolveCreditTerms_ID', Evolve.Sql.NVarChar, data.EvolveCreditTerms_ID)
        .input('EvolveSalesOrder_Remark', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Remark)
        .input('EvolveSalesOrder_MultiSalesPerson', Evolve.Sql.NVarChar, data.EvolveSalesOrder_MultiSalesPerson)
        .input('EvolveSalesOrder_SalesPerson', Evolve.Sql.NVarChar, data.EvolveSalesOrder_SalesPerson)
        .input('EvolveSalesOrder_AttachedDocument', Evolve.Sql.NVarChar, data.EvolveSalesOrder_AttachedDocument)

        .input('EvolveSalesOrder_MultiSalesPersons', Evolve.Sql.NVarChar, data.EvolveSalesOrder_MultiSalesPersons)
        .input('EvolveSalesOrder_SubmitDate', Evolve.Sql.NVarChar, data.EvolveSalesOrder_SubmitDate)
        .input('EvolveSalesOrder_Status', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Status)
        .input('EvolveSalesOrder_CurrentOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesOrder_CurrentOutstanding)
        .input('EvolveSalesOrder_ThirtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesOrder_ThirtyOutstanding)
        .input('EvolveSalesOrder_SixtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesOrder_SixtyOutstanding)
        .input('EvolveSalesOrder_NinetyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesOrder_NinetyOutstanding)
        .input('EvolveSalesOrder_OneEightyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesOrder_OneEightyOutstanding)

        .input('EvolveSalesOrder_LandedCost', Evolve.Sql.Float, data.EvolveSalesOrder_LandedCost)
        .input('EvolveSalesOrder_ProfitMargin', Evolve.Sql.Float, data.EvolveSalesOrder_ProfitMargin)
        .input('EvolveSalesOrder_Freight', Evolve.Sql.Float, data.EvolveSalesOrder_Freight)
        .input('EvolveSalesOrder_OutWardFreight', Evolve.Sql.Float, data.EvolveSalesOrder_OutWardFreight)

        .input('EvolveUnit_ID', Evolve.Sql.Float, data.EvolveUnit_ID)
        .input('EvolveSalesOrder_PoDate', Evolve.Sql.NVarChar, EvolveSalesOrder_PoDate)

        .input('EvolveSalesOrder_TotalCustomerPrice', Evolve.Sql.Float, data.EvolveSalesOrder_TotalCustomerPrice)
        .input('EvolveSalesOrder_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesOrder_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveSalesOrder_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesOrder_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query(' INSERT INTO EvolveSalesOrder (EvolveSalesOrder_Serial, EvolveCustomer_ID, EvolveApprovalMatrix_ID, EvolveSalesOrder_BillToID, EvolveSalesOrder_ShipToID, EvolveSalesOrder_ReleaseDate, EvolveSalesOrder_PurchaseOrder, EvolveSalesOrder_Channel_ID,EvolveTaxEnv_ID , EvolveSalesOrder_Project_ID, EvolveTaxClass_ID, EvolveSalesOrder_DeliveryMode_ID, EvolveSalesOrder_Pnf, EvolveCreditTerms_ID, EvolveSalesOrder_Remark, EvolveSalesOrder_MultiSalesPerson, EvolveSalesOrder_SalesPerson,EvolveSalesOrder_AttachedDocument, EvolveSalesOrder_MultiSalesPersons, EvolveSalesOrder_SubmitDate, EvolveSalesOrder_Status, EvolveSalesOrder_CurrentOutstanding, EvolveSalesOrder_ThirtyOutstanding, EvolveSalesOrder_SixtyOutstanding, EvolveSalesOrder_NinetyOutstanding,EvolveSalesOrder_OneEightyOutstanding , EvolveSalesOrder_LandedCost, EvolveSalesOrder_ProfitMargin, EvolveSalesOrder_Freight,EvolveSalesOrder_OutWardFreight, EvolveUnit_ID,EvolveSalesOrder_PoDate ,EvolveSalesOrder_TotalCustomerPrice,EvolveSalesOrder_CreatedAt, EvolveSalesOrder_CreatedUser, EvolveSalesOrder_UpdatedAt, EvolveSalesOrder_UpdatedUser) VALUES (@EvolveSalesOrder_Serial, @EvolveCustomer_ID, @EvolveApprovalMatrix_ID, @EvolveSalesOrder_BillToID, @EvolveSalesOrder_ShipToID, @EvolveSalesOrder_ReleaseDate, @EvolveSalesOrder_PurchaseOrder, @EvolveSalesOrder_Channel_ID, @EvolveTaxEnv_ID ,@EvolveSalesOrder_Project_ID, @EvolveTaxClass_ID, @EvolveSalesOrder_DeliveryMode_ID, @EvolveSalesOrder_Pnf, @EvolveCreditTerms_ID, @EvolveSalesOrder_Remark, @EvolveSalesOrder_MultiSalesPerson, @EvolveSalesOrder_SalesPerson, @EvolveSalesOrder_AttachedDocument ,@EvolveSalesOrder_MultiSalesPersons, @EvolveSalesOrder_SubmitDate, @EvolveSalesOrder_Status, @EvolveSalesOrder_CurrentOutstanding, @EvolveSalesOrder_ThirtyOutstanding, @EvolveSalesOrder_SixtyOutstanding, @EvolveSalesOrder_NinetyOutstanding,@EvolveSalesOrder_OneEightyOutstanding, @EvolveSalesOrder_LandedCost, @EvolveSalesOrder_ProfitMargin, @EvolveSalesOrder_Freight,@EvolveSalesOrder_OutWardFreight , @EvolveUnit_ID ,@EvolveSalesOrder_PoDate ,@EvolveSalesOrder_TotalCustomerPrice,@EvolveSalesOrder_CreatedAt, @EvolveSalesOrder_CreatedUser, @EvolveSalesOrder_UpdatedAt, @EvolveSalesOrder_UpdatedUser) ;select @@IDENTITY AS \'inserted_id\'');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Save Salse Quote "+error.message);
        return new Error(" EERR####: Error While Save Salse Quote "+error.message);
      }
    },


    saveQuoteLineDetails : async function (data, EvolveSalesOrder_ID) {
      
      try { 

        let EvolveSalesOrderLine_ReqdDate = data.EvolveSalesOrderLine_ReqdDate ; 
        let EvolveSalesOrderLine_PromiseDate = data.EvolveSalesOrderLine_PromiseDate ; 
        let EvolveSalesOrderLine_DueDate = data.EvolveSalesOrderLine_DueDate ; 



       EvolveSalesOrderLine_ReqdDate = EvolveSalesOrderLine_ReqdDate == '' || EvolveSalesOrderLine_ReqdDate == null  ? null : EvolveSalesOrderLine_ReqdDate.split("-").reverse().join("-").replace("-", "-");


       EvolveSalesOrderLine_PromiseDate = EvolveSalesOrderLine_PromiseDate == '' || EvolveSalesOrderLine_PromiseDate == null  ? null : EvolveSalesOrderLine_PromiseDate.split("-").reverse().join("-").replace("-", "-");


       EvolveSalesOrderLine_DueDate = EvolveSalesOrderLine_DueDate == '' || EvolveSalesOrderLine_DueDate == null  ? null : EvolveSalesOrderLine_DueDate.split("-").reverse().join("-").replace("-", "-");

       if(data.EvolvePriceListDetails_ID == '' || data.EvolvePriceListDetails_ID == undefined  ){

        data.EvolvePriceListDetails_ID = null ;

       }

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        
        return await Evolve.SqlPool.request()
          
        .input('EvolveSalesOrder_ID', Evolve.Sql.Int, EvolveSalesOrder_ID)
        .input('EvolvePriceListDetails_ID', Evolve.Sql.Int, (data.EvolvePriceListDetails_ID))

        .input('EvolveSalesOrderLine_Number', Evolve.Sql.Int, parseInt(data.EvolveSalesOrderLine_Number))
        .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
        .input('EvolveSalesOrderLine_OrderQty', Evolve.Sql.Float, data.EvolveSalesOrderLine_OrderQty)
        .input('EvolveSalesOrderLine_CustomerUnitPrice', Evolve.Sql.Float, data.EvolveSalesOrderLine_CustomerUnitPrice)
        .input('EvolveSalesOrderLine_ItemUnitPrice', Evolve.Sql.Float, data.EvolveItem_ItemUnitPrice)

        .input('EvolveSalesOrderLine_CustomerDiscount', Evolve.Sql.Float, data.EvolveSalesOrderLine_CustomerDiscount)
        .input('EvolveTaxClass_ID', Evolve.Sql.Int, parseInt(data.EvolveTaxClass_ID))
        .input('EvolveSalesOrderLine_TaxEnv_ID', Evolve.Sql.Int, parseInt(data.EvolveSalesOrderLine_TaxEnv_ID))

        .input('EvolveSalesOrderLine_ReqdDate', Evolve.Sql.NVarChar, EvolveSalesOrderLine_ReqdDate)
        .input('EvolveSalesOrderLine_PromiseDate', Evolve.Sql.NVarChar, EvolveSalesOrderLine_PromiseDate)
        .input('EvolveSalesOrderLine_DueDate', Evolve.Sql.NVarChar, EvolveSalesOrderLine_DueDate)
        .input('EvolveSalesOrderLine_Comments', Evolve.Sql.NVarChar, data.EvolveSalesOrderLine_Comments)
        .input('EvolveSalesOrderLine_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesOrderLine_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveSalesOrderLine_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesOrderLine_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query(' INSERT INTO EvolveSalesOrderLine (EvolveSalesOrder_ID, EvolvePriceListDetails_ID ,EvolveSalesOrderLine_Number, EvolveItem_ID, EvolveSalesOrderLine_OrderQty, EvolveSalesOrderLine_CustomerUnitPrice,EvolveSalesOrderLine_ItemUnitPrice, EvolveSalesOrderLine_CustomerDiscount, EvolveTaxClass_ID,EvolveSalesOrderLine_TaxEnv_ID, EvolveSalesOrderLine_ReqdDate, EvolveSalesOrderLine_PromiseDate, EvolveSalesOrderLine_DueDate, EvolveSalesOrderLine_Comments, EvolveSalesOrderLine_CreatedAt, EvolveSalesOrderLine_CreatedUser, EvolveSalesOrderLine_UpdatedAt, EvolveSalesOrderLine_UpdatedUser) VALUES (@EvolveSalesOrder_ID, @EvolvePriceListDetails_ID ,@EvolveSalesOrderLine_Number, @EvolveItem_ID, @EvolveSalesOrderLine_OrderQty, @EvolveSalesOrderLine_CustomerUnitPrice,@EvolveSalesOrderLine_ItemUnitPrice, @EvolveSalesOrderLine_CustomerDiscount, @EvolveTaxClass_ID, @EvolveSalesOrderLine_TaxEnv_ID ,@EvolveSalesOrderLine_ReqdDate, @EvolveSalesOrderLine_PromiseDate, @EvolveSalesOrderLine_DueDate, @EvolveSalesOrderLine_Comments, @EvolveSalesOrderLine_CreatedAt, @EvolveSalesOrderLine_CreatedUser, @EvolveSalesOrderLine_UpdatedAt, @EvolveSalesOrderLine_UpdatedUser) ');
      } catch (error) {
  
        Evolve.Log.error("line errororoor: Error While Save Salse Quote Details "+error.message);
        return new Error("line errororoor: Error While Save Salse Quote Details "+error.message);
      }
    },

    updateQuoteLineDetails : async function (data, EvolveSalesOrder_ID) {
      try { 

        console.log("data >>>>" ,  data)

      let EvolveSalesOrderLine_ReqdDate = data.EvolveSalesOrderLine_ReqdDate ; 
      let EvolveSalesOrderLine_PromiseDate = data.EvolveSalesOrderLine_PromiseDate ; 
      let EvolveSalesOrderLine_DueDate = data.EvolveSalesOrderLine_DueDate ; 



      EvolveSalesOrderLine_ReqdDate = EvolveSalesOrderLine_ReqdDate == '' || EvolveSalesOrderLine_ReqdDate == null  ? null : EvolveSalesOrderLine_ReqdDate.split("-").reverse().join("-").replace("-", "-");


      EvolveSalesOrderLine_PromiseDate = EvolveSalesOrderLine_PromiseDate == '' || EvolveSalesOrderLine_PromiseDate == null  ? null : EvolveSalesOrderLine_PromiseDate.split("-").reverse().join("-").replace("-", "-");


      EvolveSalesOrderLine_DueDate = EvolveSalesOrderLine_DueDate == '' || EvolveSalesOrderLine_DueDate == null  ? null : EvolveSalesOrderLine_DueDate.split("-").reverse().join("-").replace("-", "-");

      if(data.EvolvePriceListDetails_ID == '' || data.EvolvePriceListDetails_ID == undefined  ){

        data.EvolvePriceListDetails_ID = null ;

       }

      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      
      return await Evolve.SqlPool.request()
        
      .input('EvolveSalesOrder_ID', Evolve.Sql.Int, EvolveSalesOrder_ID)
      .input('EvolvePriceListDetails_ID', Evolve.Sql.Int, data.EvolvePriceListDetails_ID)

      .input('EvolveSalesOrderLine_Number', Evolve.Sql.Int, parseInt(data.EvolveSalesOrderLine_Number))
      .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
      .input('EvolveSalesOrderLine_OrderQty', Evolve.Sql.Float, data.EvolveSalesOrderLine_OrderQty)
      .input('EvolveSalesOrderLine_CustomerUnitPrice', Evolve.Sql.Float, data.EvolveSalesOrderLine_CustomerUnitPrice)
      .input('EvolveSalesOrderLine_ItemUnitPrice', Evolve.Sql.Float, data.EvolveItem_ItemUnitPrice)

      .input('EvolveSalesOrderLine_CustomerDiscount', Evolve.Sql.Float, data.EvolveSalesOrderLine_CustomerDiscount)
      .input('EvolveTaxClass_ID', Evolve.Sql.Int, parseInt(data.EvolveTaxClass_ID))
      .input('EvolveSalesOrderLine_TaxEnv_ID', Evolve.Sql.Int, parseInt(data.EvolveSalesOrderLine_TaxEnv_ID))

      .input('EvolveSalesOrderLine_ReqdDate', Evolve.Sql.NVarChar, EvolveSalesOrderLine_ReqdDate)
      .input('EvolveSalesOrderLine_PromiseDate', Evolve.Sql.NVarChar, EvolveSalesOrderLine_PromiseDate)
      .input('EvolveSalesOrderLine_DueDate', Evolve.Sql.NVarChar, EvolveSalesOrderLine_DueDate)
      .input('EvolveSalesOrderLine_Comments', Evolve.Sql.NVarChar, data.EvolveSalesOrderLine_Comments)
      .input('EvolveSalesOrderLine_CreatedAt', Evolve.Sql.NVarChar, datetime)
      .input('EvolveSalesOrderLine_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
      .input('EvolveSalesOrderLine_UpdatedAt', Evolve.Sql.NVarChar, datetime)
      .input('EvolveSalesOrderLine_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

      .query(' INSERT INTO EvolveSalesOrderLine (EvolveSalesOrder_ID,EvolvePriceListDetails_ID, EvolveSalesOrderLine_Number, EvolveItem_ID, EvolveSalesOrderLine_OrderQty, EvolveSalesOrderLine_CustomerUnitPrice,EvolveSalesOrderLine_ItemUnitPrice, EvolveSalesOrderLine_CustomerDiscount, EvolveTaxClass_ID,EvolveSalesOrderLine_TaxEnv_ID, EvolveSalesOrderLine_ReqdDate, EvolveSalesOrderLine_PromiseDate, EvolveSalesOrderLine_DueDate, EvolveSalesOrderLine_Comments, EvolveSalesOrderLine_CreatedAt, EvolveSalesOrderLine_CreatedUser, EvolveSalesOrderLine_UpdatedAt, EvolveSalesOrderLine_UpdatedUser) VALUES (@EvolveSalesOrder_ID,@EvolvePriceListDetails_ID, @EvolveSalesOrderLine_Number, @EvolveItem_ID, @EvolveSalesOrderLine_OrderQty, @EvolveSalesOrderLine_CustomerUnitPrice,@EvolveSalesOrderLine_ItemUnitPrice , @EvolveSalesOrderLine_CustomerDiscount, @EvolveTaxClass_ID,@EvolveSalesOrderLine_TaxEnv_ID, @EvolveSalesOrderLine_ReqdDate, @EvolveSalesOrderLine_PromiseDate, @EvolveSalesOrderLine_DueDate, @EvolveSalesOrderLine_Comments, @EvolveSalesOrderLine_CreatedAt, @EvolveSalesOrderLine_CreatedUser, @EvolveSalesOrderLine_UpdatedAt, @EvolveSalesOrderLine_UpdatedUser) ');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Save Salse Quote Details "+error.message);
        return new Error(" EERR####: Error While Save Salse Quote Details "+error.message);
      }
    },

    getSingelSalesQuoteHead : async function (EvolveSalesOrder_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSalesOrder_ID', Evolve.Sql.Int, EvolveSalesOrder_ID)
        .query("  SELECT ecust.EvolveCustomer_code , ecust.EvolveCustomer_name ,  esq.*  ,convert(varchar,esq.EvolveSalesOrder_CreatedAt, 105)  as dateRaised ,  convert(varchar,esq.EvolveSalesOrder_PoDate, 105)  as poDate,  eu.EvolveUnit_Code , eu.EvolveUnit_State FROM EvolveSalesOrder esq  ,   EvolveUnit eu , EvolveCustomer ecust  WHERE EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND eu.EvolveUnit_ID = esq.EvolveUnit_ID   AND esq.EvolveCustomer_ID = ecust.EvolveCustomer_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single Sales Quote  "+error.message);
        return new Error(" EERR####: Error While Get Single Sales Quote  "+error.message);
      }
    },

    getSingelSalesQuoteDetails : async function (EvolveSalesOrder_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSalesOrder_ID', Evolve.Sql.Int, EvolveSalesOrder_ID)

        .query("  SELECT  esqd.EvolveSalesOrderLine_ShippedQty , esqd.EvolvePriceListDetails_ID , esqd.EvolveSalesOrderLine_ItemUnitPrice as EvolveItem_ItemUnitPrice , esqd.EvolveSalesOrderLine_ID , esqd.EvolveSalesOrder_ID ,esqd.EvolveSalesOrderLine_Number ,esqd.EvolveSalesOrderLine_TaxEnv_ID , esqd.EvolveItem_ID ,esqd.EvolveSalesOrderLine_OrderQty,esqd.EvolveSalesOrderLine_CustomerUnitPrice ,esqd.EvolveSalesOrderLine_CustomerDiscount,esqd.EvolveTaxClass_ID ,esqd.EvolveSalesOrderLine_Comments , convert(varchar, esqd.EvolveSalesOrderLine_ReqdDate, 105)  as EvolveSalesOrderLine_ReqdDate ,   convert(varchar, esqd.EvolveSalesOrderLine_PromiseDate, 105)  as EvolveSalesOrderLine_PromiseDate,   convert(varchar, esqd.EvolveSalesOrderLine_DueDate, 105)  as EvolveSalesOrderLine_DueDate  , ei.EvolveItem_Code FROM EvolveSalesOrderLine  esqd , EvolveItem ei  WHERE esqd.EvolveSalesOrder_ID = @EvolveSalesOrder_ID   AND esqd.EvolveItem_ID = ei.EvolveItem_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
        return new Error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
      }
    },

    deleteSalseQuoteDetails : async function (EvolveSalesOrder_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSalesOrder_ID', Evolve.Sql.Int, EvolveSalesOrder_ID)
        .query(' DELETE FROM EvolveSalesOrderLine WHERE EvolveSalesOrder_ID = @EvolveSalesOrder_ID ');
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
        return new Error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
      }
    },

    updateSalesQuoteHead : async function (data) {
      try {
 
        console.log("EUPDATE>>>>>>>>>>>... DETAILS UPATE >>>>>" , data)
        
        
        let EvolveSalesOrder_PoDate = data.EvolveSalesOrder_PoDate ; 
        EvolveSalesOrder_PoDate = EvolveSalesOrder_PoDate == '' || EvolveSalesOrder_PoDate == null  ? null : EvolveSalesOrder_PoDate.split("-").reverse().join("-").replace("-", "-");

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
          
        .input('EvolveSalesOrder_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
        .input('EvolveSalesOrder_Serial', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Serial)
        .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
        .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
        .input('EvolveSalesOrder_BillToID', Evolve.Sql.Int, data.EvolveSalesOrder_BillToID)
        .input('EvolveSalesOrder_ShipToID', Evolve.Sql.Int, data.EvolveSalesOrder_ShipToID)
        .input('EvolveSalesOrder_ReleaseDate', Evolve.Sql.NVarChar, data.EvolveSalesOrder_ReleaseDate)
        .input('EvolveSalesOrder_PurchaseOrder', Evolve.Sql.NVarChar, data.EvolveSalesOrder_PurchaseOrder)
        .input('EvolveSalesOrder_Channel_ID', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Channel_ID)
        .input('EvolveSalesOrder_Project_ID', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Project_ID)
        .input('EvolveTaxClass_ID', Evolve.Sql.NVarChar, data.EvolveTaxClass_ID)
        .input('EvolveSalesOrder_DeliveryMode_ID', Evolve.Sql.NVarChar, data.EvolveSalesOrder_DeliveryMode_ID)
        .input('EvolveSalesOrder_Pnf', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Pnf)
        .input('EvolveCreditTerms_ID', Evolve.Sql.NVarChar, data.EvolveCreditTerms_ID)
        .input('EvolveSalesOrder_Remark', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Remark)
        .input('EvolveSalesOrder_MultiSalesPerson', Evolve.Sql.NVarChar, data.EvolveSalesOrder_MultiSalesPerson)
        .input('EvolveSalesOrder_SalesPerson', Evolve.Sql.NVarChar, data.EvolveSalesOrder_SalesPerson)
        .input('EvolveSalesOrder_AttachedDocument', Evolve.Sql.NVarChar, data.EvolveSalesOrder_AttachedDocument)

        .input('EvolveSalesOrder_MultiSalesPersons', Evolve.Sql.NVarChar, data.EvolveSalesOrder_MultiSalesPersons)
        .input('EvolveSalesOrder_SubmitDate', Evolve.Sql.NVarChar, data.EvolveSalesOrder_SubmitDate)
        .input('EvolveSalesOrder_Status', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Status)
        .input('EvolveSalesOrder_CurrentOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesOrder_CurrentOutstanding)
        .input('EvolveSalesOrder_ThirtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesOrder_ThirtyOutstanding)
        .input('EvolveSalesOrder_SixtyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesOrder_SixtyOutstanding)
        .input('EvolveSalesOrder_NinetyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesOrder_NinetyOutstanding)
        .input('EvolveSalesOrder_OneEightyOutstanding', Evolve.Sql.NVarChar, data.EvolveSalesOrder_OneEightyOutstanding)

        .input('EvolveSalesOrder_LandedCost', Evolve.Sql.Float, data.EvolveSalesOrder_LandedCost)
        .input('EvolveSalesOrder_ProfitMargin', Evolve.Sql.Float, data.EvolveSalesOrder_ProfitMargin)
        .input('EvolveSalesOrder_Freight', Evolve.Sql.Float, data.EvolveSalesOrder_Freight)
        .input('EvolveSalesOrder_OutWardFreight', Evolve.Sql.Float, data.EvolveSalesOrder_OutWardFreight)

        .input('EvolveSalesOrder_TotalCustomerPrice', Evolve.Sql.Float, data.EvolveSalesOrder_TotalCustomerPrice)
        .input('EvolveSalesOrder_PoDate', Evolve.Sql.NVarChar, EvolveSalesOrder_PoDate)


        .input('EvolveSalesOrder_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesOrder_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query(' UPDATE EvolveSalesOrder SET EvolveSalesOrder_Serial = @EvolveSalesOrder_Serial, EvolveCustomer_ID = @EvolveCustomer_ID, EvolveApprovalMatrix_ID = @EvolveApprovalMatrix_ID, EvolveSalesOrder_BillToID = @EvolveSalesOrder_BillToID, EvolveSalesOrder_ShipToID = @EvolveSalesOrder_ShipToID, EvolveSalesOrder_ReleaseDate = @EvolveSalesOrder_ReleaseDate, EvolveSalesOrder_PurchaseOrder = @EvolveSalesOrder_PurchaseOrder, EvolveSalesOrder_Channel_ID = @EvolveSalesOrder_Channel_ID, EvolveSalesOrder_Project_ID = @EvolveSalesOrder_Project_ID, EvolveTaxClass_ID = @EvolveTaxClass_ID, EvolveSalesOrder_DeliveryMode_ID = @EvolveSalesOrder_DeliveryMode_ID, EvolveSalesOrder_Pnf = @EvolveSalesOrder_Pnf, EvolveCreditTerms_ID = @EvolveCreditTerms_ID, EvolveSalesOrder_Remark = @EvolveSalesOrder_Remark, EvolveSalesOrder_MultiSalesPerson = @EvolveSalesOrder_MultiSalesPerson, EvolveSalesOrder_SalesPerson = @EvolveSalesOrder_SalesPerson, EvolveSalesOrder_AttachedDocument =@EvolveSalesOrder_AttachedDocument ,EvolveSalesOrder_MultiSalesPersons = @EvolveSalesOrder_MultiSalesPersons, EvolveSalesOrder_SubmitDate = @EvolveSalesOrder_SubmitDate, EvolveSalesOrder_Status = @EvolveSalesOrder_Status, EvolveSalesOrder_CurrentOutstanding = @EvolveSalesOrder_CurrentOutstanding, EvolveSalesOrder_ThirtyOutstanding = @EvolveSalesOrder_ThirtyOutstanding, EvolveSalesOrder_SixtyOutstanding = @EvolveSalesOrder_SixtyOutstanding, EvolveSalesOrder_NinetyOutstanding = @EvolveSalesOrder_NinetyOutstanding,EvolveSalesOrder_OneEightyOutstanding=@EvolveSalesOrder_OneEightyOutstanding, EvolveSalesOrder_LandedCost = @EvolveSalesOrder_LandedCost, EvolveSalesOrder_ProfitMargin = @EvolveSalesOrder_ProfitMargin, EvolveSalesOrder_Freight = @EvolveSalesOrder_Freight,EvolveSalesOrder_OutWardFreight=@EvolveSalesOrder_OutWardFreight ,EvolveSalesOrder_TotalCustomerPrice=@EvolveSalesOrder_TotalCustomerPrice, EvolveSalesOrder_UpdatedAt = @EvolveSalesOrder_UpdatedAt, EvolveSalesOrder_UpdatedUser = @EvolveSalesOrder_UpdatedUser ,EvolveSalesOrder_PoDate=@EvolveSalesOrder_PoDate WHERE EvolveSalesOrder_ID = @EvolveSalesOrder_ID ');
      } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Update Salse Quote "+error.message);
        return new Error(" EERR####: Error While Update Salse Quote "+error.message);
      }
    },
    changeSqStatusOnAmend : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSalesOrder_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
        .input('EvolveSalesOrder_Status', Evolve.Sql.NVarChar, 'SAVED')

        .query(" UPDATE EvolveSalesOrder SET  EvolveSalesOrder_Status =@EvolveSalesOrder_Status WHERE EvolveSalesOrder_ID=@EvolveSalesOrder_ID ");
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

    getSalesOrderLineAmendmentHistory : async function (data) {
        try {
            console.log("data",data.EvolveSalesOrder_ID);
            console.log("data",data.EvolveSalesOrderLine_ID);
            return await Evolve.SqlPool.request()
            .input('EvolveSalesOrderModifiedData_So_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
            .input('EvolveSalesOrderModifiedData_SoL_ID', Evolve.Sql.Int, data.EvolveSalesOrderLine_ID)
            .query("SELECT * , convert(varchar, EvolveSalesOrderModifiedData_CreatedAt, 120) as createdAt FROM EvolveSalesOrderModifiedData WHERE EvolveSalesOrderModifiedData_So_ID = @EvolveSalesOrderModifiedData_So_ID AND  EvolveSalesOrderModifiedData_SoL_ID = @EvolveSalesOrderModifiedData_SoL_ID  ")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error While get sales order line amendment history "+error.message);
            return new Error(" EERR####: Error While get sales order line amendment history "+error.message);
        }
    },

    getSalesOrderLineAmendmentHistoryMaxIndex : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveSalesOrderModifiedData_So_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
            .input('EvolveSalesOrderModifiedData_SoL_ID', Evolve.Sql.Int, data.EvolveSalesOrderLine_ID)
            .query("  SELECT MAX(EvolveSalesOrderModifiedData_Index) as max_index FROM EvolveSalesOrderModifiedData WHERE EvolveSalesOrderModifiedData_So_ID = @EvolveSalesOrderModifiedData_So_ID AND EvolveSalesOrderModifiedData_SoL_ID = @EvolveSalesOrderModifiedData_SoL_ID  ")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error While get sales order line amendment history Index "+error.message);
            return new Error(" EERR####: Error While get sales order line amendment history Index "+error.message);
        }
    },

    getSalesOrderHeaderAmendmentHistory : async function (data) {
      try {
        console.log("data",data);
          return await Evolve.SqlPool.request()
          .input('EvolveSalesOrderModifiedData_So_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
          .input('EvolveSalesOrderModifiedData_SoL_ID', Evolve.Sql.Int, null)
          .input('EvolveSalesOrderModifiedData_Key', Evolve.Sql.NVarChar, data.columnName)
          .query(" SELECT * , convert(varchar, EvolveSalesOrderModifiedData_CreatedAt, 120) as createdAt FROM EvolveSalesOrderModifiedData WHERE EvolveSalesOrderModifiedData_So_ID = @EvolveSalesOrderModifiedData_So_ID AND EvolveSalesOrderModifiedData_Key = @EvolveSalesOrderModifiedData_Key   ")
      } catch (error) {
          Evolve.Log.error(" EERR####: Error While get sales order line amendment history Index "+error.message);
          return new Error(" EERR####: Error While get sales order line amendment history Index "+error.message);
      }
  },

  deleteSalesQuoteDetails : async function (data) {
    try {
      console.log("data",data);
        return await Evolve.SqlPool.request()
        .input('EvolveSalesOrderModifiedData_So_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
        .input('EvolveSalesOrderModifiedData_SoL_ID', Evolve.Sql.Int, null)
        .query(" DELETE FROM EvolveSalesOrderLine WHERE EvolveSalesOrderModifiedData_So_ID = @EvolveSalesOrderModifiedData_So_ID AND EvolveSalesOrderModifiedData_SoL_ID = @EvolveSalesOrderModifiedData_SoL_ID   ")
    } catch (error) {
        Evolve.Log.error(" EERR####: Error While get sales order line amendment history Index "+error.message);
        return new Error(" EERR####: Error While get sales order line amendment history Index "+error.message);
    }
},

addRecordInSaledOrderModifiedData: async function (data) {
  try {
    console.log("data addRecordInSaledOrderModifiedData",data);
    let date = new Date();
    let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return await Evolve.SqlPool.request()

      .input('EvolveSalesOrderModifiedData_So_ID', Evolve.Sql.Int, data.salesOrderId)
      .input('EvolveSalesOrderModifiedData_SoL_ID', Evolve.Sql.Int, data.salesOrderLineId)
      .input('EvolveSalesOrderModifiedData_Key', Evolve.Sql.NVarChar, data.key)
      .input('EvolveSalesOrderModifiedData_OldValue', Evolve.Sql.NVarChar, data.oldValue)
      .input('EvolveSalesOrderModifiedData_NewValue', Evolve.Sql.NVarChar, data.newValue)
      .input('EvolveSalesOrderModifiedData_Index', Evolve.Sql.NVarChar, data.EvolveSalesOrderModifiedData_Index)
      .input('EvolveSalesOrderModifiedData_Action', Evolve.Sql.NVarChar, data.action)
      .input('EvolveSalesOrderModifiedData_CreatedAt', Evolve.Sql.NVarChar, datetime)
      .input('EvolveSalesOrderModifiedData_CreatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
      .query(' INSERT INTO EvolveSalesOrderModifiedData (EvolveSalesOrderModifiedData_So_ID , EvolveSalesOrderModifiedData_SoL_ID , EvolveSalesOrderModifiedData_Key , EvolveSalesOrderModifiedData_OldValue , EvolveSalesOrderModifiedData_NewValue , EvolveSalesOrderModifiedData_Index , EvolveSalesOrderModifiedData_Action , EvolveSalesOrderModifiedData_CreatedAt , EvolveSalesOrderModifiedData_CreatedUser) VALUES (@EvolveSalesOrderModifiedData_So_ID , @EvolveSalesOrderModifiedData_SoL_ID , @EvolveSalesOrderModifiedData_Key , @EvolveSalesOrderModifiedData_OldValue , @EvolveSalesOrderModifiedData_NewValue , @EvolveSalesOrderModifiedData_Index , @EvolveSalesOrderModifiedData_Action , @EvolveSalesOrderModifiedData_CreatedAt , @EvolveSalesOrderModifiedData_CreatedUser)');
  } catch (error) {
    Evolve.Log.error("EERR### : Error While Add Record In Sales Order History " + error.message);
    return new Error("EERR#### :  Error While Add Record In Sales Order History " + error.message);
  }
},

updateDataInTable : async function (tableName , columnName , value , userId , whereCon) {
  try {
      let date = new Date();
let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      console.log(`UPDATE ${tableName} SET ${columnName} = @${columnName} , ${tableName + '_UpdatedAt'} = @${tableName + '_UpdatedAt'} , ${tableName + '_UpdatedUser'} = 2${tableName + '_UpdatedUser'} WHERE ${tableName + '_ID'} = @${tableName + '_ID'}`);
      return await Evolve.SqlPool.request()
      .input(columnName, Evolve.Sql.NVarChar, value)
      .input(tableName + '_ID', Evolve.Sql.NVarChar, whereCon)
      .input(tableName + '_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
      .input(tableName + '_UpdatedUser', Evolve.Sql.Int, userId)
.query(`UPDATE ${tableName} SET ${columnName} = @${columnName} , ${tableName + '_UpdatedAt'} = @${tableName + '_UpdatedAt'} , ${tableName + '_UpdatedUser'} = @${tableName + '_UpdatedUser'} WHERE ${tableName + '_ID'} = @${tableName + '_ID'}`);
  } catch (error) {
      Evolve.Log.error(" EERR####: Error while Update Sales Order Data "+error.message);
      return new Error(" EERR####: Error while Update Sales Order Data "+error.message);
  }
},

getLastUpdatedIndex : async function (id) {
  try {
      return await Evolve.SqlPool.request()
      .input('EvolveSalesOrderModifiedData_So_ID', Evolve.Sql.Int, id)
      .query("  SELECT MAX(EvolveSalesOrderModifiedData_Index) as max_index FROM EvolveSalesOrderModifiedData WHERE EvolveSalesOrderModifiedData_So_ID = @EvolveSalesOrderModifiedData_So_ID")
  } catch (error) {
      Evolve.Log.error(" EERR####: Error While get sales order line amendment history Index "+error.message);
      return new Error(" EERR####: Error While get sales order line amendment history Index "+error.message);
  }
},

updateSalesOrderStatus : async function ( id , status) {
  try {
    return await Evolve.SqlPool.request()
    .input('EvolveSalesOrder_ID', Evolve.Sql.Int, id)
    .input('EvolveSalesOrder_Status', Evolve.Sql.NVarChar, status)
    .query(" UPDATE EvolveSalesOrder SET EvolveSalesOrder_Status = @EvolveSalesOrder_Status WHERE EvolveSalesOrder_ID = @EvolveSalesOrder_ID")
} catch (error) {
    Evolve.Log.error(" EERR####: Error While Update Sales Order Status "+error.message);
    return new Error(" EERR####: Error While Update Sales Order Status "+error.message);
}
},

getAddedLineId : async function ( id , lineNo) {
  try {
    return await Evolve.SqlPool.request()
    .input('EvolveSalesOrder_ID', Evolve.Sql.Int, id)
    .input('EvolveSalesOrderLine_Number', Evolve.Sql.Int, lineNo)
    .query(" SELECT * FROM EvolveSalesOrderLine WHERE EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND EvolveSalesOrderLine_Number = @EvolveSalesOrderLine_Number")
} catch (error) {
    Evolve.Log.error(" EERR####: Error While Update Sales Order Status "+error.message);
    return new Error(" EERR####: Error While Update Sales Order Status "+error.message);
}
} 








}
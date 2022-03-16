'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getPoListCount: async function (search , condition, EvolveUnit_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)

                .query("SELECT  COUNT(epod.EvolvePurchaseOrderDetails_ID) as count  FROM  EvolveSupplier esup , EvolvePurchaseOrderDetails epod  LEFT JOIN  EvolveItem ei ON epod.EvolveItem_ID = ei.EvolveItem_ID ,  EvolvePurchaseOrder epo LEFT JOIN EvolveUnit eunit  ON  epo.EvolveUnit_ID = eunit.EvolveUnit_ID , EvolveUom euom   WHERE   epo.EvolveSupplier_ID = esup.EvolveSupplier_ID AND epo.EvolvePurchaseOrder_ID = epod.EvolvePurchaseOrder_ID  AND epod.EvolveUom_ID = euom.EvolveUom_ID AND epo.EvolveUnit_ID = @EvolveUnit_ID    AND (epo.EvolvePurchaseOrder_Number LIKE @search OR   esup.EvolveSupplier_Code  LIKE @search OR esup.EvolveSupplier_Name   LIKE @search)"+condition);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get total po count " + error.message);
            return new Error(" EERR####: Error while get total po count " + error.message);
        }
    },

    getPoList: async function (start, length, search ,condition ,EvolveUnit_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)

                .query("SELECT   euom.EvolveUom_Uom ,   ei.EvolveItem_Part , ei.EvolveItem_Desc1 ,  eunit.EvolveUnit_Code ,  eunit.EvolveUnit_Name   , epo.EvolvePurchaseOrder_Number ,   convert(varchar, epo.EvolvePurchaseOrder_StartDate, 105) as EvolvePurchaseOrder_StartDate ,  convert(varchar, epo.EvolvePurchaseOrder_EndDate, 105) as EvolvePurchaseOrder_EndDate , esup.EvolveSupplier_Code , esup.EvolveSupplier_Name , epod.* , convert(varchar, epod.EvolvePurchaseOrderDetails_DueDate, 105) as dueDate   FROM  EvolveSupplier esup , EvolvePurchaseOrderDetails epod  LEFT JOIN  EvolveItem ei ON epod.EvolveItem_ID = ei.EvolveItem_ID ,  EvolvePurchaseOrder epo LEFT JOIN EvolveUnit eunit  ON  epo.EvolveUnit_ID = eunit.EvolveUnit_ID , EvolveUom euom   WHERE   epo.EvolveSupplier_ID = esup.EvolveSupplier_ID AND epo.EvolvePurchaseOrder_ID = epod.EvolvePurchaseOrder_ID  AND epod.EvolveUom_ID = euom.EvolveUom_ID   AND epo.EvolveUnit_ID = @EvolveUnit_ID   AND (epo.EvolvePurchaseOrder_Number LIKE @search OR   esup.EvolveSupplier_Code  LIKE @search OR esup.EvolveSupplier_Name LIKE @search) "+condition+"  ORDER BY epo.EvolvePurchaseOrder_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while po ist " + error.message);
            return new Error(" EERR####: Error while po ist " + error.message);
        }
    },

    checkCreditTermsCodeExist: async function (EvolveCreditTerms_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCreditTerms_Code', Evolve.Sql.NVarChar, EvolveCreditTerms_Code)
                .query(" SELECT * FROM EvolveCreditTerms WHERE EvolveCreditTerms_Code = @EvolveCreditTerms_Code");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check credit terms code exist or not " + error.message);
            return new Error(" EERR####: Error while check credit terms code exist or not " + error.message);
        }
    },

    addCreditTerms: async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        // data.EvolveCreditTerms_BaseDate = data.EvolveCreditTerms_BaseDate.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_BaseDays = data.EvolveCreditTerms_BaseDays.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_DiscountDate = data.EvolveCreditTerms_DiscountDate.split("/").reverse().join("/").replace("/", "/");
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCreditTerms_Code', Evolve.Sql.NVarChar, data['Credit Terms Code'])
                .input('EvolveCreditTerms_Description', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveCreditTerms_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveCreditTerms_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveCreditTerms_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveCreditTerms_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .query(' INSERT INTO EvolveCreditTerms (EvolveCreditTerms_Code, EvolveCreditTerms_Description, EvolveCreditTerms_CreatedAt, EvolveCreditTerms_CreatedUser, EvolveCreditTerms_UpdatedAt, EvolveCreditTerms_UpdatedUser) VALUES (@EvolveCreditTerms_Code, @EvolveCreditTerms_Description, @EvolveCreditTerms_CreatedAt, @EvolveCreditTerms_CreatedUser, @EvolveCreditTerms_UpdatedAt, @EvolveCreditTerms_UpdatedUser) ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add credit terms " + error.message);
            return new Error(" EERR####: Erorr while add credit terms " + error.message);
        }
    },

    updateCreditTerms: async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCreditTerms_ID', Evolve.Sql.Int, data.EvolveCreditTerms_ID)
                .input('EvolveCreditTerms_Code', Evolve.Sql.NVarChar, data['Credit Terms Code'])
                .input('EvolveCreditTerms_Description', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveCreditTerms_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveCreditTerms_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .query(' UPDATE EvolveCreditTerms SET EvolveCreditTerms_Code = @EvolveCreditTerms_Code, EvolveCreditTerms_Description = @EvolveCreditTerms_Description,EvolveCreditTerms_UpdatedAt = @EvolveCreditTerms_UpdatedAt, EvolveCreditTerms_UpdatedUser = @EvolveCreditTerms_UpdatedUser WHERE EvolveCreditTerms_ID = @EvolveCreditTerms_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while update credit terms " + error.message);
            return new Error(" EERR####:  Erorr while update credit terms " + error.message);
        }
    },
    checkUnitCode: async function (EvolveUnit_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_Code', Evolve.Sql.NVarChar, EvolveUnit_Code)
                .query('SELECT  EvolveUnit_ID FROM  EvolveUnit WHERE EvolveUnit_Code=@EvolveUnit_Code');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while check unit code " + error.message);
            return new Error(" EERR####:  Erorr while check unit code " + error.message);
        }
    },
    checkItemCode: async function (EvolveItem_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_Code', Evolve.Sql.NVarChar, EvolveItem_Code)
                .query('SELECT  EvolveItem_ID FROM  EvolveItem WHERE EvolveItem_Code=@EvolveItem_Code');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while check item code " + error.message);
            return new Error(" EERR####:  Erorr while check item code " + error.message);
        }
    },
    checkInventory: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)

                .query('SELECT  EvolveInventory_ID FROM  EvolveInventory WHERE EvolveItem_ID=@EvolveItem_ID AND EvolveUnit_ID=@EvolveUnit_ID AND EvolveInventory_LotNumber=@EvolveInventory_LotNumber AND EvolveInventory_RefNumber=@EvolveInventory_RefNumber AND EvolveLocation_ID = @EvolveLocation_ID');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while check inventory " + error.message);
            return new Error(" EERR####:  Erorr while check inventory " + error.message);
        }
    },

    addInventory: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveInventory_QtyOnHand', Evolve.Sql.NVarChar, data.EvolveInventory_QtyOnHand)
                .input('EvolveInventory_Status', Evolve.Sql.NVarChar, 'GOOD')
                .input('EvolveInventory_PostingStatus', Evolve.Sql.NVarChar, 'ERPPOSTED')


                .input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, data.EvolveInventory_CreatedAt)
                .input('EvolveInventory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)

                .query('INSERT  INTO  EvolveInventory (EvolveInventory_PostingStatus , EvolveUnit_ID ,  EvolveItem_ID ,  EvolveInventory_QtyOnHand , EvolveInventory_CreatedAt , EvolveInventory_CreatedUser ,EvolveInventory_UpdatedAt , EvolveInventory_UpdatedUser  ,EvolveInventory_LotNumber ,EvolveInventory_RefNumber ,EvolveLocation_ID ,EvolveInventory_Status ) VALUES (@EvolveInventory_PostingStatus , @EvolveUnit_ID ,  @EvolveItem_ID ,  @EvolveInventory_QtyOnHand  ,@EvolveInventory_CreatedAt ,@EvolveInventory_CreatedUser , @EvolveInventory_UpdatedAt , @EvolveInventory_UpdatedUser ,@EvolveInventory_LotNumber ,@EvolveInventory_RefNumber ,@EvolveLocation_ID ,@EvolveInventory_Status)');


                // .query('INSERT  INTO  EvolveInventory (EvolveUnit_ID ,  EvolveItem_ID ,  EvolveInventory_QtyOnHand , EvolveInventory_CreatedAt , EvolveInventory_CreatedUser ,EvolveInventory_UpdatedAt , EvolveInventory_UpdatedUser  ) VALUES (@EvolveUnit_ID ,  @EvolveItem_ID ,  @EvolveInventory_QtyOnHand  ,@EvolveInventory_CreatedAt ,@EvolveInventory_CreatedUser , @EvolveInventory_UpdatedAt , @EvolveInventory_UpdatedUser)');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while add inventory " + error.message);
            return new Error(" EERR####:  Erorr while add inventory " + error.message);
        }
    },
    updateInventory: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInventory_QtyOnHand', Evolve.Sql.NVarChar, data.EvolveInventory_QtyOnHand)
                .input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
                .input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, data.EvolveInventory_CreatedAt)
                .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query(' UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand,EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt, EvolveInventory_UpdatedUser = @EvolveInventory_UpdatedUser WHERE EvolveInventory_ID = @EvolveInventory_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while update inventory " + error.message);
            return new Error(" EERR####:  Erorr while update inventory " + error.message);
        }
    },
    getItemList: async function (data) {
        try {
            let query = "SELECT TOP(20) ei.EvolveItem_Code as title, ei.EvolveItem_ID as id FROM    EvolveItem ei  WHERE ei.EvolveItem_Code LIKE '%" + data.search + "%'"
            return await Evolve.SqlPool.request()
                .query(query);
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Item List " + error.message);
            return new Error(" EERR####: Error While Get Item List " + error.message);
        }
    },
    getUnitList: async function (data) {
        try {
            let query = " SELECT TOP(20) EvolveUnit_Code  as title, EvolveUnit_ID as id FROM    EvolveUnit WHERE EvolveUnit_Code  LIKE '%" + data.search + "%'"
            return await Evolve.SqlPool.request()
                // .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .query(query);
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Unit List " + error.message);
            return new Error(" EERR####: Error While Get Unit List " + error.message);
        }
    },

    
    // addInventory: async function (data) {
    //     try {
    //         console.log("Entered in service a<>> " ,  data)

    //         let query = "INSERT INTO EvolveInventory (EvolveUnit_ID,EvolveItem_ID,EvolveInventory_QtyOnHand,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventory_UpdatedAt,EvolveInventory_UpdatedUser) VALUES "+data;
    //         console.log("query>>>" , query)
    //         return await Evolve.SqlPool.request()
    //         .query(query);

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####:  Erorr while add inventory " + error.message);
    //         return new Error(" EERR####:  Erorr while add inventory " + error.message);
    //     }
    // },

    
    getFullInventoryList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT  einv.EvolveInventory_QtyOnHand , eunit.EvolveUnit_Code , ei.EvolveItem_Code FROM  EvolveInventory einv  , EvolveItem ei , EvolveUnit eunit WHERE einv.EvolveItem_ID = ei.EvolveItem_ID AND einv.EvolveUnit_ID = eunit.EvolveUnit_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get full inventory ist " + error.message);
            return new Error(" EERR####: Error while get full inventory ist " + error.message);
        }
    },

    checkInventoryLocation: async function (EvolveLocation_Code) {
        try {
            console.log("EvolveLocation_Code???" ,  EvolveLocation_Code)
            return await Evolve.SqlPool.request()
            .input('EvolveLocation_Code', Evolve.Sql.NVarChar,EvolveLocation_Code.trim())
          
            .query('SELECT EvolveLocation_ID FROM  EvolveLocation WHERE EvolveLocation_Code =@EvolveLocation_Code');

        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Location  " + error.message);
            return new Error(" EERR####: Error While Get Location  " + error.message);
        }
    },


}
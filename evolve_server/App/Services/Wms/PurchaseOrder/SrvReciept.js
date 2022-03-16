'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getPoRcptListCount: async function (search, condition ,EvolveUnit_ID ) {
        try {
            // let q = "SELECT COUNT(epor.EvolvePurchaseOrderRcpt_ID) as count   FROM EvolvePurchaseOrderRcpt epor LEFT JOIN EvolveItem ei ON epor.EvolveItem_ID = ei.EvolveItem_ID LEFT JOIN EvolveUom euom ON epor.EvolveUom_ID = euom.EvolveUom_ID   LEFT  JOIN EvolveUnit eu ON epor.EvolveUnit_ID = eu.EvolveUnit_ID , EvolveSupplier esup ,  EvolvePurchaseOrder epo ,   EvolvePurchaseOrderDetails epod WHERE epod.EvolvePurchaseOrder_ID = epo.EvolvePurchaseOrder_ID AND epo.EvolveSupplier_ID  = esup.EvolveSupplier_ID AND epor.EvolvePurchaseOrderDetails_ID = epod.EvolvePurchaseOrderDetails_ID   AND (epo.EvolvePurchaseOrder_Number LIKE @search OR   esup.EvolveSupplier_Code  LIKE @search OR epor.EvolvePurchaseOrderRcpt_BatchNo   LIKE @search)" + condition
            // console.log("q?????????????", q);
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)

                .query("SELECT COUNT(epor.EvolvePurchaseOrderRcpt_ID) as count    FROM EvolvePurchaseOrderRcpt epor LEFT JOIN EvolveItem ei ON epor.EvolveItem_ID = ei.EvolveItem_ID LEFT JOIN EvolveUom euom ON epor.EvolveUom_ID = euom.EvolveUom_ID   LEFT  JOIN EvolveUnit eu ON epor.EvolveUnit_ID = eu.EvolveUnit_ID , EvolveSupplier esup ,  EvolvePurchaseOrder epo ,   EvolvePurchaseOrderDetails epod WHERE epod.EvolvePurchaseOrder_ID = epo.EvolvePurchaseOrder_ID AND epo.EvolveSupplier_ID  = esup.EvolveSupplier_ID AND epor.EvolvePurchaseOrderDetails_ID = epod.EvolvePurchaseOrderDetails_ID AND  epor.EvolveUnit_ID =@EvolveUnit_ID  AND (epo.EvolvePurchaseOrder_Number LIKE @search OR   esup.EvolveSupplier_Code  LIKE @search OR epor.EvolvePurchaseOrderRcpt_BatchNo   LIKE @search)" + condition);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get total po count " + error.message);
            return new Error(" EERR####: Error while get total po count " + error.message);
        }
    },

    getPoRcptList: async function (start, length, search, condition ,  EvolveUnit_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT  ei.EvolveQCTemp_ID , CAST(1 AS int) as isSelected , epod.EvolvePurchaseOrderDetails_Type , epod.EvolvePurchaseOrderDetails_MemoItem ,   epo.EvolvePurchaseOrder_Number , eu.EvolveUnit_Code ,  esup.EvolveSupplier_Code ,  epod.EvolvePurchaseOrderDetails_LineNo , epod.EvolvePurchaseOrderDetails_DueDate ,  ei.EvolveItem_Part ,  euom.EvolveUom_Uom , ete.EvolveTaxEnvironment_Code , el.EvolveLocation_Code ,  epor.*   FROM EvolvePurchaseOrderRcpt epor LEFT JOIN EvolveItem ei ON epor.EvolveItem_ID = ei.EvolveItem_ID LEFT JOIN EvolveUom euom ON epor.EvolveUom_ID = euom.EvolveUom_ID   LEFT  JOIN EvolveUnit eu ON epor.EvolveUnit_ID = eu.EvolveUnit_ID  LEFT JOIN EvolveLocation el ON epor.EvolveLocation_ID = el.EvolveLocation_ID, EvolveSupplier esup ,  EvolvePurchaseOrder epo ,   EvolvePurchaseOrderDetails epod LEFT JOIN EvolveTaxEnvironment ete ON epod.EvolveTaxEnvironment_ID = ete.EvolveTaxEnvironment_ID WHERE epod.EvolvePurchaseOrder_ID = epo.EvolvePurchaseOrder_ID AND epo.EvolveSupplier_ID  = esup.EvolveSupplier_ID AND epor.EvolvePurchaseOrderDetails_ID = epod.EvolvePurchaseOrderDetails_ID  AND  epor.EvolveUnit_ID =@EvolveUnit_ID  AND (epo.EvolvePurchaseOrder_Number LIKE @search OR   esup.EvolveSupplier_Code  LIKE @search OR epor.EvolvePurchaseOrderRcpt_BatchNo   LIKE @search) " + condition + " ORDER BY epor.EvolvePurchaseOrderRcpt_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while po ist " + error.message);
            return new Error(" EERR####: Error while po ist " + error.message);
        }
    },

    changePorcptStatus: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
                .input('EvolvePurchaseOrderRcpt_ID', Evolve.Sql.Int, data.EvolvePurchaseOrderRcpt_ID)
                .input('EvolvePurchaseOrderRcpt_ErpPostedStatus', Evolve.Sql.NVarChar, "POSTED")
                .input('EvolvePurchaseOrderRcpt_ShipperId', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_ShipperId)
                .input('EvolvePurchaseOrderRcpt_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePurchaseOrderRcpt_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input('EvolvePurchaseOrderRcpt_MachineIp', Evolve.Sql.NVarChar, '')
                .query("UPDATE EvolvePurchaseOrderRcpt SET  EvolvePurchaseOrderRcpt_ErpPostedStatus=@EvolvePurchaseOrderRcpt_ErpPostedStatus , EvolvePurchaseOrderRcpt_ShipperId = @EvolvePurchaseOrderRcpt_ShipperId  WHERE  EvolvePurchaseOrderRcpt_ID =@EvolvePurchaseOrderRcpt_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while po  Rcpt Status " + error.message);
            return new Error(" EERR####: Error while po  Rcpt Status " + error.message);
        }
    },



    updateUnpostedQty: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
                .input('EvolvePurchaseOrderDetails_ID', Evolve.Sql.Int, data.EvolvePurchaseOrderDetails_ID)
                .input('EvolvePurchaseOrderDetails_ErpUnPostedQty', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_Qty)
                .input('EvolvePurchaseOrderDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePurchaseOrderDetails_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input('EvolvePurchaseOrderDetails_MachineIP', Evolve.Sql.NVarChar, '')
                .query("UPDATE EvolvePurchaseOrderDetails SET  EvolvePurchaseOrderDetails_ErpUnPostedQty= EvolvePurchaseOrderDetails_ErpUnPostedQty - @EvolvePurchaseOrderDetails_ErpUnPostedQty , EvolvePurchaseOrderDetails_UpdatedAt =@EvolvePurchaseOrderDetails_UpdatedAt , EvolvePurchaseOrderDetails_UpdatedUser=@EvolvePurchaseOrderDetails_UpdatedUser , EvolvePurchaseOrderDetails_MachineIP=@EvolvePurchaseOrderDetails_MachineIP    WHERE  EvolvePurchaseOrderDetails_ID =@EvolvePurchaseOrderDetails_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Change unposted Qty  To line " + error.message);
            return new Error(" EERR####: Error while Change unposted Qty  To line " + error.message);
        }
    },


    addInventory: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePurchaseOrderRcpt_ID', Evolve.Sql.Int, data.EvolvePurchaseOrderRcpt_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveInventory_MemoItem', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderDetails_Type == 'M' ? data.EvolvePurchaseOrderDetails_MemoItem : '' )
                .input('EvolveInventory_BatchNo', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_LotSerialNo)
                .input('EvolveInventory_LotSerialNo', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_LotSerialNo)
                .input('EvolveInventory_SerialNo', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_SerialNo)
                .input('EvolveInventory_SupplierBatchNo', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_SupplierBatchNo)
                .input('EvolveInventory_Status', Evolve.Sql.NVarChar , data.EvolveInventory_Status)
                .input('EvolveInventory_QtyRecieved', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_Qty)
                .input('EvolveInventory_QtyIssued', Evolve.Sql.NVarChar, 0)
                .input('EvolveInventory_QtyAvailable', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_Qty)
                .input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveInventory_CreatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveInventory_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input('EvolveInventory_MachineIp', Evolve.Sql.NVarChar, '')
                .query(' INSERT INTO EvolveInventory (EvolveInventory_Status , EvolvePurchaseOrderRcpt_ID , EvolveUnit_ID, EvolveItem_ID, EvolveLocation_ID, EvolveUom_ID ,EvolveInventory_MemoItem  ,EvolveInventory_BatchNo, EvolveInventory_LotSerialNo ,EvolveInventory_SerialNo, EvolveInventory_SupplierBatchNo ,EvolveInventory_QtyRecieved , EvolveInventory_QtyIssued ,  EvolveInventory_QtyAvailable  , EvolveInventory_CreatedAt , EvolveInventory_CreatedUser  ,EvolveInventory_UpdatedAt , EvolveInventory_UpdatedUser  ) VALUES (@EvolveInventory_Status , @EvolvePurchaseOrderRcpt_ID , @EvolveUnit_ID, @EvolveItem_ID, @EvolveLocation_ID,@EvolveUom_ID ,@EvolveInventory_MemoItem ,  @EvolveInventory_BatchNo,@EvolveInventory_LotSerialNo , @EvolveInventory_SerialNo, @EvolveInventory_SupplierBatchNo , @EvolveInventory_QtyRecieved , @EvolveInventory_QtyIssued , @EvolveInventory_QtyAvailable  , @EvolveInventory_CreatedAt , @EvolveInventory_CreatedUser  , @EvolveInventory_UpdatedAt , @EvolveInventory_UpdatedUser  ) ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add inventory " + error.message);
            return new Error(" EERR####: Erorr while add inventory " + error.message);
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

    // addInventory: async function (data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
    //             .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
    //             .input('EvolveInventory_QtyOnHand', Evolve.Sql.NVarChar, data.EvolveInventory_QtyOnHand)
    //             .input('EvolveInventory_Status', Evolve.Sql.NVarChar, 'GOOD')
    //             .input('EvolveInventory_PostingStatus', Evolve.Sql.NVarChar, 'ERPPOSTED')


    //             .input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, data.EvolveInventory_CreatedAt)
    //             .input('EvolveInventory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
    //             .input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
    //             .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)

    //             .query('INSERT  INTO  EvolveInventory (EvolveInventory_PostingStatus , EvolveUnit_ID ,  EvolveItem_ID ,  EvolveInventory_QtyOnHand , EvolveInventory_CreatedAt , EvolveInventory_CreatedUser ,EvolveInventory_UpdatedAt , EvolveInventory_UpdatedUser  ,EvolveInventory_LotNumber ,EvolveInventory_RefNumber ,EvolveLocation_ID ,EvolveInventory_Status ) VALUES (@EvolveInventory_PostingStatus , @EvolveUnit_ID ,  @EvolveItem_ID ,  @EvolveInventory_QtyOnHand  ,@EvolveInventory_CreatedAt ,@EvolveInventory_CreatedUser , @EvolveInventory_UpdatedAt , @EvolveInventory_UpdatedUser ,@EvolveInventory_LotNumber ,@EvolveInventory_RefNumber ,@EvolveLocation_ID ,@EvolveInventory_Status)');


    //             // .query('INSERT  INTO  EvolveInventory (EvolveUnit_ID ,  EvolveItem_ID ,  EvolveInventory_QtyOnHand , EvolveInventory_CreatedAt , EvolveInventory_CreatedUser ,EvolveInventory_UpdatedAt , EvolveInventory_UpdatedUser  ) VALUES (@EvolveUnit_ID ,  @EvolveItem_ID ,  @EvolveInventory_QtyOnHand  ,@EvolveInventory_CreatedAt ,@EvolveInventory_CreatedUser , @EvolveInventory_UpdatedAt , @EvolveInventory_UpdatedUser)');

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####:  Erorr while add inventory " + error.message);
    //         return new Error(" EERR####:  Erorr while add inventory " + error.message);
    //     }
    // },
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
            console.log("EvolveLocation_Code???", EvolveLocation_Code)
            return await Evolve.SqlPool.request()
                .input('EvolveLocation_Code', Evolve.Sql.NVarChar, EvolveLocation_Code.trim())

                .query('SELECT EvolveLocation_ID FROM  EvolveLocation WHERE EvolveLocation_Code =@EvolveLocation_Code');

        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Location  " + error.message);
            return new Error(" EERR####: Error While Get Location  " + error.message);
        }
    },

    addNewQcOrder: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveInventory_BatchNo', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_LotSerialNo)
                .input('EvolveQCOrder_Num', Evolve.Sql.NVarChar, data.EvolveQCOrder_Num)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveQCOrder_Status', Evolve.Sql.NVarChar, 'PENDING')
                .input('EvolveQCOrder_Type', Evolve.Sql.NVarChar, 'PO')
                .input('EvolveQCOrder_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveQCOrder_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveQCOrder_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveQCOrder_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('INSERT INTO EvolveQCOrder (EvolveInventory_BatchNo , EvolveQCOrder_Num , EvolveUnit_ID , EvolveQCOrder_Status , EvolveQCOrder_Type , EvolveQCOrder_CreatedAt , EvolveQCOrder_CreatedUser , EvolveQCOrder_UpdatedAt , EvolveQCOrder_UpdatedUser) VALUES (@EvolveInventory_BatchNo , @EvolveQCOrder_Num , @EvolveUnit_ID , @EvolveQCOrder_Status , @EvolveQCOrder_Type , @EvolveQCOrder_CreatedAt , @EvolveQCOrder_CreatedUser , @EvolveQCOrder_UpdatedAt , @EvolveQCOrder_UpdatedUser) ; select @@IDENTITY AS \'inserted_id\'');

        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Location  " + error.message);
            return new Error(" EERR####: Error While Get Location  " + error.message);
        }
    },

    addNewQcOrderDetails: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveQCOrder_ID', Evolve.Sql.Int, data.EvolveQCOrder_ID)
                .input('EvolveInventory_SerialNo', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_SerialNo)
                .input('EvolveQCOrderDetails_OriginalQty', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_Qty)
                .input('EvolveQCOrderDetails_AcceptedQty', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderRcpt_Qty)
                .input('EvolveQCOrderDetails_RejectedQty', Evolve.Sql.NVarChar, '0.00')
                .input('EvolveQCOrderDetails_SampleQty', Evolve.Sql.NVarChar, '0.00')
                .input('EvolveQCOrderDetails_DestroyedQty', Evolve.Sql.NVarChar, '0.00')
                .input('EvolveQCOrderDetails_IsQcPerformed', Evolve.Sql.Bit, 0)
                .input('EvolveUnit_ID', Evolve.Sql.NVarChar, data.EvolveUnit_ID)
                .input('EvolveQCOrderDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveQCOrderDetails_CreatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input('EvolveQCOrderDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveQCOrderDetails_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                
  
                .query('INSERT INTO EvolveQCOrderDetails (EvolveQCOrder_ID , EvolveInventory_SerialNo , EvolveUnit_ID , EvolveQCOrderDetails_OriginalQty , EvolveQCOrderDetails_AcceptedQty , EvolveQCOrderDetails_RejectedQty , EvolveQCOrderDetails_SampleQty , EvolveQCOrderDetails_DestroyedQty , EvolveQCOrderDetails_IsQcPerformed , EvolveQCOrderDetails_CreatedAt , EvolveQCOrderDetails_CreatedUser , EvolveQCOrderDetails_UpdatedAt , EvolveQCOrderDetails_UpdatedUser) VALUES (@EvolveQCOrder_ID , @EvolveInventory_SerialNo , @EvolveUnit_ID , @EvolveQCOrderDetails_OriginalQty , @EvolveQCOrderDetails_AcceptedQty , @EvolveQCOrderDetails_RejectedQty , @EvolveQCOrderDetails_SampleQty , @EvolveQCOrderDetails_DestroyedQty , @EvolveQCOrderDetails_IsQcPerformed , @EvolveQCOrderDetails_CreatedAt , @EvolveQCOrderDetails_CreatedUser , @EvolveQCOrderDetails_UpdatedAt , @EvolveQCOrderDetails_UpdatedUser)');
  
        } catch (error) {
  
            Evolve.Log.error(" EERR####: Error While Get Location  " + error.message);
            return new Error(" EERR####: Error While Get Location  " + error.message);
        }
    },


}
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    addApprovalProcessDetails: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()

                .input('EvolveApprovalProcess_ID', Evolve.Sql.Int, data.EvolveApprovalProcess_ID)
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveApprovalProcessDetails_Status', Evolve.Sql.NVarChar, data.EvolveApprovalProcessDetails_Status)
                .input('EvolveApprovalProcessDetails_Remarks', Evolve.Sql.NVarChar, data.EvolveApprovalProcessDetails_Remarks)
                .input('EvolveApprovalMatrixIndex_ID', Evolve.Sql.Int, data.EvolveApprovalMatrixIndex_ID)
                .input('EvolveApprovalProcessDetails_TargetedUserID', Evolve.Sql.Int, data.EvolveApprovalProcessDetails_TargetedUserID)
                .input('EvolveApprovalProcessDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcessDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveApprovalProcessDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcessDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveApprovalProcessDetails (EvolveApprovalProcess_ID, EvolveUser_ID, EvolveApprovalProcessDetails_Status,EvolveApprovalProcessDetails_Remarks, EvolveApprovalMatrixIndex_ID ,EvolveApprovalProcessDetails_TargetedUserID  ,EvolveApprovalProcessDetails_CreatedAt, EvolveApprovalProcessDetails_CreatedUser, EvolveApprovalProcessDetails_UpdatedAt, EvolveApprovalProcessDetails_UpdatedUser) VALUES (@EvolveApprovalProcess_ID, @EvolveUser_ID, @EvolveApprovalProcessDetails_Status, @EvolveApprovalProcessDetails_Remarks ,@EvolveApprovalMatrixIndex_ID ,@EvolveApprovalProcessDetails_TargetedUserID  ,@EvolveApprovalProcessDetails_CreatedAt, @EvolveApprovalProcessDetails_CreatedUser, @EvolveApprovalProcessDetails_UpdatedAt, @EvolveApprovalProcessDetails_UpdatedUser)');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add approval process details " + error.message);
            return new Error(" EERR####: Erorr while add approval process details " + error.message);
        }
    },
    updateProcessStatus: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()

                .input('EvolveApprovalProcess_ID', Evolve.Sql.NVarChar, data.EvolveApprovalProcess_ID)
                .input('EvolveApprovalProcess_Status', Evolve.Sql.NVarChar, data.EvolveApprovalProcess_Status)
                .input('EvolveApprovalProcess_CurrentIndex', Evolve.Sql.Int, data.EvolveApprovalProcess_CurrentIndex)
                .input('EvolveApprovalProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolveApprovalProcess SET  EvolveApprovalProcess_Status=@EvolveApprovalProcess_Status ,EvolveApprovalProcess_CurrentIndex=@EvolveApprovalProcess_CurrentIndex , EvolveApprovalProcess_UpdatedAt=@EvolveApprovalProcess_UpdatedAt , EvolveApprovalProcess_UpdatedUser=@EvolveApprovalProcess_UpdatedUser  WHERE EvolveApprovalProcess_ID=@EvolveApprovalProcess_ID");

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add approval process details " + error.message);
            return new Error(" EERR####: Erorr while add approval process details " + error.message);
        }
    },
    updateProcesStatusToError: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()

                .input('EvolveApprovalProcess_ID', Evolve.Sql.NVarChar, data.EvolveApprovalProcess_ID)
                .input('EvolveApprovalProcess_ErrorCode', Evolve.Sql.NVarChar, data.EvolveApprovalProcess_ErrorCode)
                .input('EvolveApprovalProcess_ErrorDetails', Evolve.Sql.NVarChar, data.EvolveApprovalProcess_ErrorDetails)
                .input('EvolveApprovalProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolveApprovalProcess SET  EvolveApprovalProcess_ErrorCode=@EvolveApprovalProcess_ErrorCode ,EvolveApprovalProcess_ErrorDetails=@EvolveApprovalProcess_ErrorDetails , EvolveApprovalProcess_UpdatedAt=@EvolveApprovalProcess_UpdatedAt , EvolveApprovalProcess_UpdatedUser=@EvolveApprovalProcess_UpdatedUser  WHERE EvolveApprovalProcess_ID=@EvolveApprovalProcess_ID");

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add approval process details " + error.message);
            return new Error(" EERR####: Erorr while add approval process details " + error.message);
        }
    },
    getUserNameById: async function (EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
                .query('SELECT EvolveUser_Name  FROM  EvolveUser WHERE EvolveUser_ID=@EvolveUser_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get user name by id " + error.message);
            return new Error(" EERR####: Error while get user name by id " + error.message);
        }
    },
    getItemDetails: async function (EvolveItem_ID) {
        try {
            return await Evolve.SqlPool.request()

                .input('EvolveItem_ID', Evolve.Sql.NVarChar, EvolveItem_ID)
                .query('SELECT  EvolveItem_Code , EvolveItem_Desc FROM  EvolveItem WHERE EvolveItem_ID =@EvolveItem_ID ')


        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get item details " + error.message);
            return new Error(" EERR#### : Error while get item details " + error.message);
        }
    },
    getMatrixIndexList: async function (EvolveApprovalMatrix_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, EvolveApprovalMatrix_ID)
                .query('SELECT * FROM  EvolveApprovalMatrixIndex WHERE EvolveApprovalMatrix_ID =@EvolveApprovalMatrix_ID AND EvolveApprovalMatrixIndex_Seq != 1')


        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get matrix index list " + error.message);
            return new Error(" EERR#### : Error while get matrix index list " + error.message);
        }
    },
    getUserListOfMatrixIndex: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApprovalMatrixIndex_Seq', Evolve.Sql.Int, data.EvolveApprovalMatrixIndex_Seq)
                .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)

                .query("   SELECT eapmd.EvolveApprovalMatrixDetails_Value as EvolveUser_ID  , eu.EvolveUser_Name FROM   EvolveApprovalMatrixDetails eapmd , EvolveApprovalMatrixIndex eapi ,EvolveUser eu  WHERE eapmd.EvolveApprovalMatrixIndex_ID = eapi.EvolveApprovalMatrixIndex_ID   AND eapi.EvolveApprovalMatrixIndex_Seq =@EvolveApprovalMatrixIndex_Seq AND eapi.EvolveApprovalMatrix_ID = @EvolveApprovalMatrix_ID AND eapmd.EvolveApprovalMatrixDetails_Key ='USERID' AND eapmd.EvolveApprovalMatrixDetails_Value = eu.EvolveUser_ID")


        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get index user list " + error.message);
            return new Error(" EERR#### : Error while get index user list " + error.message);
        }
    },
    getLastProcesDetail: async function (EvolveApprovalProcess_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApprovalProcess_ID', Evolve.Sql.Int, EvolveApprovalProcess_ID)

                .query(" SELECT  TOP(1) * FROM EvolveApprovalProcessDetails WHERE EvolveApprovalProcess_ID =  @EvolveApprovalProcess_ID ORDER BY  EvolveApprovalProcessDetails_UpdatedAt DESC")


        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get last process detail " + error.message);
            return new Error(" EERR#### : Error while get last process detail " + error.message);
        }
    },
    getApprovalProcessHistory: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApprovalProcess_ID', Evolve.Sql.Int, data.EvolveApprovalProcess_ID)

                .query("SELECT  epd.*  , eu.EvolveUser_Name , convert(varchar, epd.EvolveApprovalProcessDetails_CreatedAt, 103)  as date , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),      CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 3)) as time FROM   EvolveApprovalProcessDetails epd  , EvolveUser eu      WHERE epd.EvolveUser_ID = eu.EvolveUser_ID  AND epd.EvolveApprovalProcess_ID = @EvolveApprovalProcess_ID   ORDER BY  epd.EvolveApprovalProcessDetails_ID   DESC")


        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get approval process history " + error.message);
            return new Error(" EERR#### : Error while get approval process history " + error.message);
        }
    },
    getApprovalMatrixDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApprovalProcess_ID', Evolve.Sql.Int, data.EvolveApprovalProcess_ID)

                .query("SELECT eapm.* , eap.*  FROM  EvolveApprovalMatrix eapm , EvolveApprovalProcess eap WHERE eapm.EvolveApprovalMatrix_ID = eap.EvolveApprovalMatrix_ID  AND eap.EvolveApprovalProcess_ID = @EvolveApprovalProcess_ID")


        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get approval matrix details " + error.message);
            return new Error(" EERR#### : Error while get approval matrix details " + error.message);
        }
    },
    getquoteDetails: async function (EvolveSalesQuote_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSalesQuote_ID', Evolve.Sql.Int, EvolveSalesQuote_ID)

                .query("SELECT esq.EvolveSalesQuote_Serial  , ec.EvolveCustomer_name , eship.EvolveShipTo_Code  as billtoAdress FROM  EvolveSalesQuote esq , EvolveCustomer ec , EvolveShipTo eship  WHERE esq.EvolveSalesQuote_ID   = @EvolveSalesQuote_ID   AND esq.EvolveSalesQuote_Customer_ID = ec.EvolveCustomer_ID  AND esq.EvolveSalesQuote_BillTo = eship.EvolveShipTo_ID")


        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get quote details " + error.message);
            return new Error(" EERR#### : Error while get quote details " + error.message);
        }
    },
    getApprovalProcessDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApprovalProcess_ID', Evolve.Sql.Int, data.EvolveApprovalProcess_ID)

                .query("  SELECT * FROM  EvolveApprovalProcess eap , EvolveApprovalMatrix eapm  WHERE  eap.EvolveApprovalProcess_ID =@EvolveApprovalProcess_ID AND eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID")


        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get Approval Process Details " + error.message);
            return new Error(" EERR#### : Error while get Approval Process Details " + error.message);
        }
    },

    getPriceListHeadDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePriceList_ID', Evolve.Sql.Int, data.EvolvePriceList_ID)
                .query("SELECT EvolvePriceList_Code , convert(varchar, EvolvePriceList_Date, 103) as EvolvePriceList_Date ,convert(varchar, EvolvePriceList_FixedValueDate, 103) as EvolvePriceList_FixedValueDate  , convert(varchar, EvolvePriceList_StartDate, 103) as EvolvePriceList_StartDate ,convert(varchar, EvolvePriceList_EndDate, 103) as EvolvePriceList_EndDate FROM EvolvePriceList WHERE EvolvePriceList_ID = @EvolvePriceList_ID")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get price list data " + error.message);
            return new Error(" EERR#### : Error while get price list data " + error.message);
        }
    },
    getPriceListLineDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePriceList_ID', Evolve.Sql.Int, data.EvolvePriceList_ID)
                .input('itemDesignSearch', Evolve.Sql.NVarChar, '%' + data.itemDesignSearch + '%')

                .query("  SELECT eapd.* ,convert(varchar, eapd.EvolvePriceListDetails_StartDate, 103) as startDate , convert(varchar, eapd.EvolvePriceListDetails_EndDate, 103) as endDate ,   ei.EvolveItem_Code , ei.EvolveItem_Desc   FROM EvolvePriceListDetails eapd LEFT  JOIN  EvolveItem ei ON  eapd.EvolveItem_ID = ei.EvolveItem_ID  WHERE eapd.EvolvePriceList_ID =@EvolvePriceList_ID AND (ei.EvolveItem_Code LIKE @itemDesignSearch OR eapd.EvolvePriceListDetails_DesignGroup LIKE @itemDesignSearch)")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get price list Details " + error.message);
            return new Error(" EERR#### : Error while get price list Details " + error.message);
        }
    },
    getPriceListCustUnitDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePriceList_ID', Evolve.Sql.Int, data.EvolvePriceList_ID)
                .input('unitCustSearch', Evolve.Sql.NVarChar, '%' + data.unitCustSearch + '%')

                // .query("  SELECT  epcd.* , ecust.EvolveCustomer_Name , eunit.EvolveUnit_Description ,  ecust.EvolveCustomer_Code , eunit.EvolveUnit_Code , ebr.EvolveCustBussinessRelation_RabpId  FROM  EvolvePriceListCustUnitDetails epcd ,  EvolveCustomer ecust , EvolveUnit eunit ,EvolveCustBussinessRelation ebr WHERE epcd.EvolvePriceList_ID =@EvolvePriceList_ID  AND eunit.EvolveUnit_ID = epcd.EvolveUnit_ID AND ecust.EvolveCustomer_ID = epcd.EvolveCustomer_ID AND ebr.EvolveCustBussinessRelation_Code = ecust.EvolveCustomer_Code AND (ecust.EvolveCustomer_Code LIKE @unitCustSearch OR eunit.EvolveUnit_Code LIKE @unitCustSearch  OR ebr.EvolveCustBussinessRelation_RabpId LIKE @unitCustSearch OR ecust.EvolveCustomer_Name LIKE @unitCustSearch) ")

                .query(" SELECT  epcd.* , ecust.EvolveCustomer_Name , eunit.EvolveUnit_Description ,  ecust.EvolveCustomer_Code , eunit.EvolveUnit_Code , ebr.EvolveBR_RabpID as EvolveCustBussinessRelation_RabpId  FROM  EvolvePriceListCustUnitDetails epcd ,  EvolveCustomer ecust , EvolveUnit eunit ,EvolveBR ebr WHERE epcd.EvolvePriceList_ID =@EvolvePriceList_ID  AND eunit.EvolveUnit_ID = epcd.EvolveUnit_ID AND ecust.EvolveCustomer_ID = epcd.EvolveCustomer_ID AND ebr.EvolveBR_Code = ecust.EvolveCustomer_Code AND (ecust.EvolveCustomer_Code LIKE @unitCustSearch OR eunit.EvolveUnit_Code LIKE @unitCustSearch  OR ebr.EvolveBR_RabpID LIKE @unitCustSearch OR ecust.EvolveCustomer_Name LIKE @unitCustSearch)")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get price list Details " + error.message);
            return new Error(" EERR#### : Error while get price list Details " + error.message);
        }
    },

    getItemListByDesignGroup: async function (data) {
        console.log("data>>>>", data)
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_DesignGroup', Evolve.Sql.NVarChar, data.EvolveItem_DesignGroup)

                .query("SELECT * FROM  EvolveItem WHERE EvolveItem_DesignGroup=@EvolveItem_DesignGroup")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get item  list  by  design  group " + error.message);
            return new Error(" EERR#### : Error while get item  list  by  design  group " + error.message);
        }
    },









}
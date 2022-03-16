'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    
    // getOfflinePrintHistoryCount : async function (condition, search) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //         .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
    //    .query(" SELECT COUNT(epq.EvolvePrintQueue_ID) as count FROM EvolvePrintQueue epq , EvolvePrintHistory eph , EvolvePrintLabelSerial epls , EvolveItem ei WHERE epq.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND ei.EvolveItem_ID = eph.EvolveItem_ID AND (epls.EvolvePrintLabelSerial_Number LIKE @search OR eph.EvolvePrintHistory_DSN LIKE @search OR ei.EvolveItem_Code LIKE @search)"+ condition);
    //     } catch (error) {
    //         Evolve.Log.error(" EERR32677: Error while  getting Offline Print History Count "+error.message);
    //         return new Error(" EERR32677: Error while  getting Offline Print History Count "+error.message);
    //     }
    // }, 

    // getOfflinePrintHistory: async function (start , length, condition, search) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //   .input('start',Evolve.Sql.Int,start)
    //   .input('length',Evolve.Sql.Int,length)
    //   .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
    //    .query(" SELECT  0 as IsSelected , epq.* , convert(varchar, epq.EvolvePrintQueue_CreatedAt, 120) as EvolvePrintHistory_DateConverted , ei.EvolveItem_Code , ei.EvolveItem_Desc , epls.EvolvePrintLabelSerial_Number FROM EvolvePrintQueue epq , EvolvePrintHistory eph , EvolveItem ei , EvolvePrintLabelSerial epls WHERE epq.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND (epls.EvolvePrintLabelSerial_Number LIKE @search OR eph.EvolvePrintHistory_DSN LIKE @search OR ei.EvolveItem_Code LIKE @search)" + condition +" ORDER BY epq.EvolvePrintQueue_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
       
    //     } catch (error) {
    //         Evolve.Log.error(" EERR32678: Error while  getting Offline Print History List "+error.message);
    //         return new Error(" EERR32678: Error while  getting Offline Print History List "+error.message);
    //     }
    // },

    // rePrintLabel : async function (data , reprint){
    //     try {
    //         let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //         return await Evolve.SqlPool.request()
    //         .input('EvolvePrintQueue_ID',Evolve.Sql.Int,data.EvolvePrintQueue_ID)
    //         .input('EvolvePrintProcess_Status',Evolve.Sql.Bit,0)
    //         .input('EvolvePrintQueue_RePrint',Evolve.Sql.Int,reprint)
    //         .input('EvolvePrinter_ID',Evolve.Sql.Int,data.EvolvePrinter_ID)
    //         .input('EvolvePrintHistory_ID',Evolve.Sql.Int,data.EvolvePrintHistory_ID)
    //         .input('EvolvePrintProcess_ZplCode',Evolve.Sql.NVarChar,data.EvolvePrintProcess_ZplCode)
    //         .input('EvolvePrintProcess_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //         .input('EvolvePrintProcess_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //         .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //         .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //         .query("  ")
    //     } catch (error) {
    //         Evolve.Log.error(" EERR32679: Error while  Reprint Online Label "+error.message);
    //         return new Error(" EERR32679: Error while  Reprint Online Label "+error.message);
    //     }
    // },

    getAllPrinter : async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT * , 'false' as showStatus FROM EvolvePrinter")
        } catch (error) {
            Evolve.Log.error(" EERR32679: Error while  Reprint Online Label "+error.message);
            return new Error(" EERR32679: Error while  Reprint Online Label "+error.message);
        }
    },

    //New Logic Start

    getOfflinePrintHistoryCount : async function (condition, search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
       .query(" SELECT COUNT(eph.EvolvePrintHistory_ID) as count FROM EvolvePrintHistory eph where (SELECT ei.EvolveItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50) , ephd.EvolvePrintHistoryDetails_Value) AS INT) FROM EvolvePrintHistoryDetails ephd WHERE ephd.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND ephd.EvolvePrintHistoryDetails_Key = 'ITEMID')) LIKE @search " + condition + "") 
        } catch (error) {
            Evolve.Log.error(" EERR32677: Error while  getting Offline Print History Count "+error.message);
            return new Error(" EERR32677: Error while  getting Offline Print History Count "+error.message);
        }
    },

    getOfflinePrintHistory : async function (start, length, condition , search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(" select 0 as IsSelected , eph.*, convert(varchar, eph.EvolvePrintHistory_CreatedAt, 120) as EvolvePrintHistory_DateConverted, (SELECT ephd.EvolvePrintHistoryDetails_Value FROM EvolvePrintHistoryDetails ephd WHERE ephd.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND EvolvePrintHistoryDetails_Key = 'REPRINTCOUNT') as ReprintCount, (SELECT ephd.EvolvePrintHistoryDetails_Value FROM EvolvePrintHistoryDetails ephd WHERE ephd.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND ephd.EvolvePrintHistoryDetails_Key = 'ITEMID') as EvolveItem_ID , (SELECT ei.EvolveItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50) , ephd.EvolvePrintHistoryDetails_Value) AS INT) FROM EvolvePrintHistoryDetails ephd WHERE ephd.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND ephd.EvolvePrintHistoryDetails_Key = 'ITEMID')) AS EvolveItem_Code ,(SELECT ei.EvolveItem_Desc FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50) , ephd.EvolvePrintHistoryDetails_Value) AS INT) FROM EvolvePrintHistoryDetails ephd WHERE ephd.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND ephd.EvolvePrintHistoryDetails_Key = 'ITEMID')) AS EvolveItem_Desc , (SELECT ephd.EvolvePrintHistoryDetails_Value FROM EvolvePrintHistoryDetails ephd WHERE ephd.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND ephd.EvolvePrintHistoryDetails_Key = 'LABELSEIALID') as EvolvePrintLabelSerial_ID , (SELECT epls.EvolvePrintLabelSerial_Number from EvolvePrintLabelSerial epls WHERE epls.EvolvePrintLabelSerial_ID = (SELECT CONVERT(INT , CONVERT(nvarchar(50) , ephd.EvolvePrintHistoryDetails_Value)) FROM EvolvePrintHistoryDetails ephd WHERE ephd.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND ephd.EvolvePrintHistoryDetails_Key = 'LABELSEIALID')) as EvolvePrintLabelSerial_Number from EvolvePrintHistory eph where (SELECT ei.EvolveItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50) , ephd.EvolvePrintHistoryDetails_Value) AS INT) FROM EvolvePrintHistoryDetails ephd WHERE ephd.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND ephd.EvolvePrintHistoryDetails_Key = 'ITEMID')) LIKE @search " + condition +" order by  eph.EvolvePrintHistory_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY " )
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  get print history details "+error.message);
            return new Error(" EERR####: Error while  get print history details "+error.message);
        }
    },

    rePrintCount : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintHistoryDetails_Value', Evolve.Sql.NVarChar, data.ReprintCount)
            .input('EvolvePrintHistory_ID', Evolve.Sql.NVarChar, data.EvolvePrintHistory_ID)
       .query(" UPDATE EvolvePrintHistoryDetails SET EvolvePrintHistoryDetails_Value = @EvolvePrintHistoryDetails_Value WHERE EvolvePrintHistory_ID = @EvolvePrintHistory_ID AND EvolvePrintHistoryDetails_Key = 'REPRINTCOUNT' ") 
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  getting reprint count "+error.message);
            return new Error(" EERR####: Error while  getting reprint count "+error.message);
        }
    },

    rePrintLabelProcess : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolvePrinter_ID', Evolve.Sql.Int, data.EvolvePrinter_ID)
            .input('EvolvePrintProcess_Data', Evolve.Sql.NVarChar, data.EvolvePrintHistory_Data)
            .input('EvolvePrintProcess_Status', Evolve.Sql.NVarChar, 'PROCESS')
            .input('EvolvePrintHistory_ID', Evolve.Sql.NVarChar, data.EvolvePrintHistory_ID)
            .input('EvolvePrintProcess_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcess_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
       .query(" INSERT INTO EvolvePrintProcess (EvolvePrinter_ID, EvolvePrintProcess_Data, EvolvePrintProcess_Status, EvolvePrintHistory_ID, EvolvePrintProcess_CreatedUser, EvolvePrintProcess_CreatedAt, EvolvePrintProcess_UpdatedUser, EvolvePrintProcess_UpdatedAt) VALUES (@EvolvePrinter_ID, @EvolvePrintProcess_Data, @EvolvePrintProcess_Status, @EvolvePrintHistory_ID, @EvolvePrintProcess_CreatedUser, @EvolvePrintProcess_CreatedAt, @EvolvePrintProcess_UpdatedUser, @EvolvePrintProcess_UpdatedAt);select @@IDENTITY AS \'inserted_id\' ") 
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  insert dat in to print process while reprint "+error.message);
            return new Error(" EERR####: Error while  insert dat in to print process while reprint "+error.message);
        }
    },

    getPrintHistoryId : async function (EvolvePrintProcess_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintProcess_ID', Evolve.Sql.Int, EvolvePrintProcess_ID)
       .query(" SELECT * FROM EvolvePrintProcess WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID ") 
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  get printer history id "+error.message);
            return new Error(" EERR####: Error while  get printer history id "+error.message);
        }
    },

    getPrintHistoryDetailsData : async function (EvolvePrintHistory_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintHistory_ID', Evolve.Sql.Int, EvolvePrintHistory_ID)
       .query(" SELECT * FROM EvolvePrintHistoryDetails WHERE EvolvePrintHistory_ID = @EvolvePrintHistory_ID ") 
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  get printer history details data "+error.message);
            return new Error(" EERR####: Error while  get printer history details data "+error.message);
        }
    },

    rePrintLabelProcessDetails : async function (EvolvePrintProcess_ID, data) {
        console.log("EvolvePrintProcess_ID>>>>>>>>>>>>", EvolvePrintProcess_ID);
        console.log("data>>>>>>>>>>>>", data);
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolvePrintProcess_ID', Evolve.Sql.Int, EvolvePrintProcess_ID)
            .input('EvolvePrintProcessDetails_Key', Evolve.Sql.NVarChar, data.EvolvePrintHistoryDetails_Key)
            .input('EvolvePrintProcessDetails_Value', Evolve.Sql.NVarChar, data.EvolvePrintHistoryDetails_Value)
            .input('EvolvePrintProcessDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcessDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolvePrintProcessDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcessDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
       .query(" INSERT INTO EvolvePrintProcessDetails (EvolvePrintProcess_ID, EvolvePrintProcessDetails_Key, EvolvePrintProcessDetails_Value, EvolvePrintProcessDetails_CreatedUser, EvolvePrintProcessDetails_CreatedAt, EvolvePrintProcessDetails_UpdatedUser, EvolvePrintProcessDetails_UpdatedAt) VALUES (@EvolvePrintProcess_ID, @EvolvePrintProcessDetails_Key, @EvolvePrintProcessDetails_Value, @EvolvePrintProcessDetails_CreatedUser, @EvolvePrintProcessDetails_CreatedAt, @EvolvePrintProcessDetails_UpdatedUser, @EvolvePrintProcessDetails_UpdatedAt) ") 
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  insert reprint label process details "+error.message);
            return new Error(" EERR####: Error while  insert reprint label process details "+error.message);
        }
    },
}


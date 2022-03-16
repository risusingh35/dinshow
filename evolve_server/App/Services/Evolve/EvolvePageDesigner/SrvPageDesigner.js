'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getTableList: async function() {
        try {
            //    let query = "SELECT  0 as isSelected , EvolveRole_ID , EvolveRole_Name ,EvolveRole_Description FROM EvolveRole "
            return await Evolve.SqlPool.request()
                // .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .query("SELECT * FROM " + process.env.EVOLVE_SQL_DB + ".INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Role List " + error.message);
            return new Error(" EERR####: Error While Get Role List " + error.message);
        }
    },

    getTableDetails: async function(data) {
        try {
            //    let query = "SELECT  0 as isSelected , EvolveRole_ID , EvolveRole_Name ,EvolveRole_Description FROM EvolveRole "
            return await Evolve.SqlPool.request()
                .input('tableName', Evolve.Sql.NVarChar, data.tableName)
                .query("select 1 as isSelected  , '' as searchType , 0 as isReadOnly , 0 as listIndex , '' as inputType , 0  as isMandatory , 0 as formSeq ,  ''  as formLabel  ,  ''  as defaultValue ,  ''  as defaultValueCode ,  ''  as validationCode ,  ''  as customFunction ,  ''  as fieldDesc ,  ''  as successMsg  ,    ''  as failureMsg ,     * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME=@tableName");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Table Details " + error.message);
            return new Error(" EERR####: Error While Get Table Details " + error.message);
        }
    },

    getSinglePageDetail: async function(data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePage_ID', Evolve.Sql.Int, data.EvolvePage_ID)
                .query(" SELECT  ep.* , EvolvePageFields_ID ,   1 as isSelected ,  epf.EvolvePageFields_SearchType as searchType ,  epf.EvolvePageFields_DataType as DATA_TYPE ,epf.EvolvePageFields_Code as COLUMN_NAME,epf.EvolvePageFields_FailureMsg as failureMsg,epf.EvolvePageFields_SuccessMsg as successMsg,epf.EvolvePageFields_Desc as fieldDesc,epf.EvolvePageFields_ListIndex as listIndex ,epf.EvolvePageFields_Label as formLabel,epf.EvolvePageFields_Index as formSeq,epf.EvolvePageFields_DefaultValue as defaultValue,epf.EvolvePageFields_CustomFunction as customFunction,epf.EvolvePageFields_InputType as inputType,epf.EvolvePageFields_IsRequired as isMandatory,epf.EvolvePageFields_SelectQuery as SelectQuery,epf.EvolvePageFields_isReadonly as isReadOnly  ,  epf.EvolvePageFields_DefaultValueCode as defaultValueCode , epf.EvolvePageFields_ValidationCode as validationCode FROM EvolvePageFields as epf left join EvolvePage as ep on ep.EvolvePage_ID = epf.EvolvePage_ID  WHERE epf.EvolvePage_ID =@EvolvePage_ID;");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Role List " + error.message);
            return new Error(" EERR####: Error While Get Role List " + error.message);
        }
    },

    addPageDetails: async function(data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            //    let query = "SELECT  0 as isSelected , EvolveRole_ID , EvolveRole_Name ,EvolveRole_Description FROM EvolveRole "
            return await Evolve.SqlPool.request()
                .input('Evolvepage_Name', Evolve.Sql.NVarChar, data.EvolvePage_Name)
                .input('Evolvepage_Code', Evolve.Sql.NVarChar, data.EvolvePage_Code)
                .input('Evolvepage_Table', Evolve.Sql.NVarChar, data.EvolvePage_Table)
                .input('EvolvePage_PrimaryKeyColumn', Evolve.Sql.NVarChar, data.EvolvePage_PrimaryKeyColumn)
                .input('Evolvepage_Url', Evolve.Sql.NVarChar, data.Evolvepage_Url)
                .input('Evolvepage_IsPrintPage', Evolve.Sql.Bit, data.Evolvepage_IsPrintPage)
                .input('EvolvePage_isExcelExport', Evolve.Sql.Bit, data.EvolvePage_isExcelExport)
                .input('EvolvePage_isPdfExport', Evolve.Sql.Bit, data.EvolvePage_isPdfExport)
                .input('EvolvePage_isAddEnable', Evolve.Sql.Bit, data.EvolvePage_isAddEnable)
                .input('EvolvePage_isViewEnable', Evolve.Sql.Bit, data.EvolvePage_isViewEnable)

            .input('EvolvePage_NoOfRecords', Evolve.Sql.Int, data.EvolvePage_NoOfRecords)
                .input('EvolvePage_isEditEnable', Evolve.Sql.Bit, data.EvolvePage_isEditEnable)
                .input('EvolvePage_isDeleteEnable', Evolve.Sql.Bit, data.EvolvePage_isDeleteEnable)
                .input('Evolvepage_CreatedUser', Evolve.Sql.Int, data.Evolvepage_CreatedUser)
                .input('Evolvepage_CreatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('Evolvepage_UpdatedUser', Evolve.Sql.Int, data.Evolvepage_UpdatedUser)
                .input('Evolvepage_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('Evolvepage_MachineIP', Evolve.Sql.NVarChar, data.Evolvepage_MachineIP)
                .query("INSERT INTO Evolvepage (Evolvepage_Name ,Evolvepage_Code ,Evolvepage_Table ,EvolvePage_PrimaryKeyColumn ,Evolvepage_Url ,Evolvepage_IsPrintPage ,EvolvePage_isExcelExport ,EvolvePage_isPdfExport ,EvolvePage_isAddEnable ,EvolvePage_isViewEnable,EvolvePage_NoOfRecords ,EvolvePage_isEditEnable ,EvolvePage_isDeleteEnable  ,Evolvepage_CreatedUser ,Evolvepage_CreatedAt ,Evolvepage_UpdatedUser ,Evolvepage_UpdatedAt ,Evolvepage_MachineIP)VALUES (@Evolvepage_Name ,@Evolvepage_Code ,@Evolvepage_Table ,@EvolvePage_PrimaryKeyColumn ,@Evolvepage_Url ,@Evolvepage_IsPrintPage ,@EvolvePage_isExcelExport ,@EvolvePage_isPdfExport ,@EvolvePage_isAddEnable ,@EvolvePage_isViewEnable ,@EvolvePage_NoOfRecords ,@EvolvePage_isEditEnable ,@EvolvePage_isDeleteEnable  ,@Evolvepage_CreatedUser ,@Evolvepage_CreatedAt ,@Evolvepage_UpdatedUser ,@Evolvepage_UpdatedAt ,@Evolvepage_MachineIP);SELECT SCOPE_IDENTITY() as inserted_id");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Add Page Details " + error.message);
            return new Error(" EERR####: Error While Add Page Details " + error.message);
        }
    },

    addPageFieldsDetails: async function(data, inserted_id) {
        try {
            console.log("EvolvePageFields_SelectQuery==========================", data.SelectQuery);
            console.log("data.formSeq >>>", data.formSeq)
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
                .input('EvolvePage_ID', Evolve.Sql.Int, inserted_id)
                .input('EvolvePageFields_Code', Evolve.Sql.NVarChar, data.COLUMN_NAME)
                .input('EvolvePageFields_DataType', Evolve.Sql.NVarChar, data.DATA_TYPE)
                .input('EvolvePageFields_InputType', Evolve.Sql.NVarChar, data.inputType)
                .input('EvolvePageFields_SearchType', Evolve.Sql.NVarChar, data.searchType)

            .input('EvolvePageFields_IsRequired', Evolve.Sql.Bit, data.isMandatory)
                .input('EvolvePageFields_DefaultValueCode', Evolve.Sql.NVarChar, data.defaultValueCode)
                .input('EvolvePageFields_isReadOnly', Evolve.Sql.Bit, data.isReadOnly)
                .input('EvolvePageFields_ValidationCode', Evolve.Sql.NVarChar, data.EvolvePageFields_ValidationCode)
                .input('EvolvePageFields_CustomFunction', Evolve.Sql.NVarChar, data.customFunction)
                .input('EvolvePageFields_DefaultValue', Evolve.Sql.NVarChar, data.defaultValue)
                .input('EvolvePageFields_Index', Evolve.Sql.Int, data.formSeq)
                .input('EvolvePageFields_Label', Evolve.Sql.NVarChar, data.formLabel)
                .input('EvolvePageFields_ListIndex', Evolve.Sql.Int, data.listIndex)
                .input('EvolvePageFields_ListLabel', Evolve.Sql.NVarChar, data.formLabel)
                .input('EvolvePageFields_Desc', Evolve.Sql.NVarChar, data.fieldDesc)
                .input('EvolvePageFields_SuccessMsg', Evolve.Sql.NVarChar, data.successMsg)
                .input('EvolvePageFields_FailureMsg', Evolve.Sql.NVarChar, data.failureMsg)
                .input('EvolvePageFields_CreatedUser', Evolve.Sql.Int, data.EvolvePageFields_CreatedUser)
                .input('EvolvePageFields_CreatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolvePageFields_UpdatedUser', Evolve.Sql.Int, data.EvolvePageFields_UpdatedUser)
                .input('EvolvePageFields_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolvePageFields_MachineIP', Evolve.Sql.NVarChar, '')
                .input('EvolvePageFields_SelectQuery', Evolve.Sql.NVarChar, data.SelectQuery)
                .query("INSERT INTO EvolvePageFields (EvolvePage_ID , EvolvePageFields_Code ,EvolvePageFields_DataType ,EvolvePageFields_InputType ,EvolvePageFields_SearchType ,     EvolvePageFields_IsRequired ,EvolvePageFields_DefaultValueCode ,EvolvePageFields_isReadOnly ,EvolvePageFields_ValidationCode ,EvolvePageFields_CustomFunction ,EvolvePageFields_DefaultValue ,EvolvePageFields_Index  ,EvolvePageFields_Label ,EvolvePageFields_ListIndex ,EvolvePageFields_ListLabel ,EvolvePageFields_Desc ,EvolvePageFields_SuccessMsg  ,EvolvePageFields_FailureMsg,EvolvePageFields_CreatedUser,EvolvePageFields_CreatedAt,EvolvePageFields_UpdatedUser,EvolvePageFields_UpdatedAt,EvolvePageFields_MachineIP,EvolvePageFields_SelectQuery)VALUES (@EvolvePage_ID , @EvolvePageFields_Code ,@EvolvePageFields_DataType ,@EvolvePageFields_InputType ,@EvolvePageFields_SearchType , @EvolvePageFields_IsRequired ,@EvolvePageFields_DefaultValueCode ,@EvolvePageFields_isReadOnly ,@EvolvePageFields_ValidationCode ,@EvolvePageFields_CustomFunction ,@EvolvePageFields_DefaultValue ,@EvolvePageFields_Index  ,@EvolvePageFields_Label ,@EvolvePageFields_ListIndex ,@EvolvePageFields_ListLabel ,@EvolvePageFields_Desc ,@EvolvePageFields_SuccessMsg,@EvolvePageFields_FailureMsg,@EvolvePageFields_CreatedUser,@EvolvePageFields_CreatedAt,@EvolvePageFields_UpdatedUser,@EvolvePageFields_UpdatedAt,@EvolvePageFields_MachineIP ,@EvolvePageFields_SelectQuery)");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Add Page Field Details " + error.message);
            return new Error(" EERR####: Error While Add Page Field Details " + error.message);
        }
    },



    updatePageDetails: async function(data) {
        try {


            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            //    let query = "SELECT  0 as isSelected , EvolveRole_ID , EvolveRole_Name ,EvolveRole_Description FROM EvolveRole "
            return await Evolve.SqlPool.request()
                .input('EvolvePage_ID', Evolve.Sql.Int, data.EvolvePage_ID)
                .input('Evolvepage_Name', Evolve.Sql.NVarChar, data.EvolvePage_Name)
                .input('Evolvepage_Table', Evolve.Sql.NVarChar, data.EvolvePage_Table)
                .input('EvolvePage_PrimaryKeyColumn', Evolve.Sql.NVarChar, data.EvolvePage_PrimaryKeyColumn)
                .input('Evolvepage_IsPrintPage', Evolve.Sql.Bit, data.Evolvepage_IsPrintPage)
                .input('EvolvePage_isViewEnable', Evolve.Sql.Bit, data.EvolvePage_isViewEnable)
                .input('EvolvePage_isAddEnable', Evolve.Sql.Bit, data.EvolvePage_isAddEnable)
                .input('EvolvePage_isExcelExport', Evolve.Sql.Bit, data.EvolvePage_isExcelExport)
                .input('EvolvePage_isPdfExport', Evolve.Sql.Bit, data.EvolvePage_isPdfExport)
                .input('EvolvePage_NoOfRecords', Evolve.Sql.Int, data.EvolvePage_NoOfRecords)
                .input('EvolvePage_isEditEnable', Evolve.Sql.Bit, data.EvolvePage_isEditEnable)
                .input('EvolvePage_isDeleteEnable', Evolve.Sql.Bit, data.EvolvePage_isDeleteEnable)
                .input('Evolvepage_UpdatedUser', Evolve.Sql.Int, data.Evolvepage_UpdatedUser)
                .input('Evolvepage_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('Evolvepage_MachineIP', Evolve.Sql.NVarChar, data.Evolvepage_MachineIP)

            .query("UPDATE Evolvepage SET Evolvepage_Name = @Evolvepage_Name,Evolvepage_Table = @Evolvepage_Table,EvolvePage_PrimaryKeyColumn=@EvolvePage_PrimaryKeyColumn ,Evolvepage_IsPrintPage = @Evolvepage_IsPrintPage, EvolvePage_isViewEnable = @EvolvePage_isViewEnable ,EvolvePage_isAddEnable = @EvolvePage_isAddEnable ,  EvolvePage_isExcelExport = @EvolvePage_isExcelExport,EvolvePage_isPdfExport = @EvolvePage_isPdfExport,EvolvePage_NoOfRecords = @EvolvePage_NoOfRecords,EvolvePage_isEditEnable = @EvolvePage_isEditEnable,EvolvePage_isDeleteEnable = @EvolvePage_isDeleteEnable,Evolvepage_UpdatedUser = @Evolvepage_UpdatedUser,Evolvepage_UpdatedAt = @Evolvepage_UpdatedAt,Evolvepage_MachineIP = @Evolvepage_MachineIP WHERE EvolvePage_ID = @EvolvePage_ID");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Update Page Details " + error.message);
            return new Error(" EERR####: Error While Update Page Details " + error.message);
        }
    },

    updatePageFieldsDetails: async function(data, EvolvePage_ID, EvolveUser_ID) {
        try {

            console.log("data.formSeq/??", data)


            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
                .input('EvolvePage_ID', Evolve.Sql.Int, EvolvePage_ID)
                .input('EvolvePageFields_ID', Evolve.Sql.Int, data.EvolvePageFields_ID)
                .input('EvolvePageFields_Code', Evolve.Sql.NVarChar, data.COLUMN_NAME)
                .input('EvolvePageFields_DataType', Evolve.Sql.NVarChar, data.DATA_TYPE)
                .input('EvolvePageFields_InputType', Evolve.Sql.NVarChar, data.inputType)
                .input('EvolvePageFields_SearchType', Evolve.Sql.NVarChar, data.searchType)
                .input('EvolvePageFields_SelectQuery', Evolve.Sql.NVarChar, data.SelectQuery)
                .input('EvolvePageFields_IsRequired', Evolve.Sql.NVarChar, data.isMandatory)
                .input('EvolvePageFields_DefaultValueCode', Evolve.Sql.NVarChar, data.defaultValueCode)
                .input('EvolvePageFields_isReadOnly', Evolve.Sql.Bit, data.isReadOnly)
                .input('EvolvePageFields_ValidationCode', Evolve.Sql.NVarChar, data.EvolvePageFields_ValidationCode)
                .input('EvolvePageFields_CustomFunction', Evolve.Sql.NVarChar, data.customFunction)
                .input('EvolvePageFields_DefaultValue', Evolve.Sql.NVarChar, data.defaultValue)
                .input('EvolvePageFields_Index', Evolve.Sql.Int, data.formSeq)
                .input('EvolvePageFields_Label', Evolve.Sql.NVarChar, data.formLabel)
                .input('EvolvePageFields_ListIndex', Evolve.Sql.Int, data.listIndex)
                .input('EvolvePageFields_ListLabel', Evolve.Sql.NVarChar, data.formLabel)
                .input('EvolvePageFields_Desc', Evolve.Sql.NVarChar, data.fieldDesc)
                .input('EvolvePageFields_SuccessMsg', Evolve.Sql.NVarChar, data.successMsg)
                .input('EvolvePageFields_FailureMsg', Evolve.Sql.NVarChar, data.failureMsg)
                .input('EvolvePageFields_UpdatedUser', Evolve.Sql.NVarChar, data.EvolvePageFields_UpdatedUser)
                .input('EvolvePageFields_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolvePageFields_MachineIP', Evolve.Sql.NVarChar, '')



            // .input('EvolvePage_ID', Evolve.Sql.Int, EvolvePage_ID)
            // .input('EvolvePageFields_ID', Evolve.Sql.Int, data.EvolvePageFields_ID)
            // .input('EvolvePageFields_Code', Evolve.Sql.NVarChar, data.COLUMN_NAME)
            // .input('EvolvePageFields_DataType', Evolve.Sql.NVarChar, data.DATA_TYPE)
            // .input('EvolvePageFields_InputType', Evolve.Sql.NVarChar, data.inputType)
            // .input('EvolvePageFields_IsRequired', Evolve.Sql.Bit, data.isMandatory)
            // .input('EvolvePageFields_DefaultValueCode', Evolve.Sql.NVarChar, data.defaultValueCode)
            // .input('EvolvePageFields_isReadOnly', Evolve.Sql.Bit, data.isReadOnly)
            // .input('EvolvePageFields_ValidationCode', Evolve.Sql.NVarChar, data.EvolvePageFields_ValidationCode)
            // .input('EvolvePageFields_CustomFunction', Evolve.Sql.NVarChar, data.customFunction)
            // .input('EvolvePageFields_DefaultValue', Evolve.Sql.NVarChar, data.defaultValue)
            // .input('EvolvePageFields_Index', Evolve.Sql.Int, data.formSeq)
            // .input('EvolvePageFields_Label', Evolve.Sql.NVarChar, data.formLabel)
            // .input('EvolvePageFields_ListIndex', Evolve.Sql.Int, data.EvolvePageFields_ListIndex)
            // .input('EvolvePageFields_ListLabel', Evolve.Sql.NVarChar, data.formLabel)
            // .input('EvolvePageFields_Desc', Evolve.Sql.NVarChar, data.fieldDesc)
            // .input('EvolvePageFields_SuccessMsg', Evolve.Sql.NVarChar, data.successMsg)
            // .input('EvolvePageFields_FailureMsg', Evolve.Sql.NVarChar, data.failureMsg)
            // .input('EvolvePageFields_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
            // .input('EvolvePageFields_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
            // .input('EvolvePageFields_MachineIP', Evolve.Sql.NVarChar, '')
            .query("UPDATE EvolvePageFields SET  EvolvePageFields_Code = @EvolvePageFields_Code ,EvolvePageFields_DataType = @EvolvePageFields_DataType ,EvolvePageFields_InputType = @EvolvePageFields_InputType , EvolvePageFields_SearchType=@EvolvePageFields_SearchType ,EvolvePageFields_IsRequired = @EvolvePageFields_IsRequired ,EvolvePageFields_DefaultValueCode = @EvolvePageFields_DefaultValueCode ,EvolvePageFields_isReadOnly = @EvolvePageFields_isReadOnly ,EvolvePageFields_ValidationCode = @EvolvePageFields_ValidationCode ,EvolvePageFields_CustomFunction = @EvolvePageFields_CustomFunction ,EvolvePageFields_DefaultValue = @EvolvePageFields_DefaultValue ,EvolvePageFields_Index = @EvolvePageFields_Index ,EvolvePageFields_Label = @EvolvePageFields_Label ,EvolvePageFields_ListIndex = @EvolvePageFields_ListIndex ,EvolvePageFields_ListLabel = @EvolvePageFields_ListLabel ,EvolvePageFields_Desc = @EvolvePageFields_Desc ,EvolvePageFields_SuccessMsg = @EvolvePageFields_SuccessMsg ,EvolvePageFields_FailureMsg = @EvolvePageFields_FailureMsg , EvolvePageFields_UpdatedUser = @EvolvePageFields_UpdatedUser ,EvolvePageFields_UpdatedAt = @EvolvePageFields_UpdatedAt ,EvolvePageFields_MachineIP = @EvolvePageFields_MachineIP,EvolvePageFields_SelectQuery=@EvolvePageFields_SelectQuery WHERE  EvolvePageFields_ID=@EvolvePageFields_ID");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Update Page Field Details " + error.message);
            return new Error(" EERR####: Error While Update Page Field Details " + error.message);
        }
    },

    getPageDetails: async function(EvolvePage_ID) {
        try {
            //    let query = "SELECT  0 as isSelected , EvolveRole_ID , EvolveRole_Name ,EvolveRole_Description FROM EvolveRole "
            return await Evolve.SqlPool.request()
                .input('EvolvePage_ID', Evolve.Sql.Int, EvolvePage_ID)
                .query("SELECT * FROM Evolvepage  WHERE EvolvePage_ID = @EvolvePage_ID;");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Page Details " + error.message);
            return new Error(" EERR####: Error While Get Page Details " + error.message);
        }
    },


    getPageFieldsDetails: async function(EvolvePage_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePage_ID', Evolve.Sql.Int, EvolvePage_ID)
                .query("SELECT  EvolvePageFields_Code , EvolvePageFields_DataType ,  EvolvePageFields_InputType , EvolvePageFields_IsRequired ,  EvolvePageFields_DefaultValueCode , EvolvePageFields_isReadOnly ,  EvolvePageFields_ValidationCode , EvolvePageFields_CustomFunction , EvolvePageFields_DefaultValue , EvolvePageFields_Index , EvolvePageFields_Label , EvolvePageFields_ListIndex , EvolvePageFields_ListLabel , EvolvePageFields_Desc , EvolvePageFields_SuccessMsg , EvolvePageFields_FailureMsg ,EvolvePageFields_SelectQuery FROM EvolvePageFields  WHERE EvolvePage_ID = @EvolvePage_ID;");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Page Field Details " + error.message);
            return new Error(" EERR####: Error While Get Page Field Details " + error.message);
        }
    },




}
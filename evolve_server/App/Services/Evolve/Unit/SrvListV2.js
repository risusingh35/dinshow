'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getunitListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('  SELECT COUNT(EvolveUnit_ID) as count  FROM EvolveUnit WHERE EvolveUnit_Code LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR1171: Error while getting unitList Count "+error.message);
            return new Error(" EERR1171: Error while getting unitList Count "+error.message);
        }
    },

    getunitList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT  ec.EvolveUnit_IsActive ,  ebg.EvolveCompany_Code , ec.EvolveUnit_Code , ea.EvolveAddress_Code ,  ec.EvolveUnit_ID , ec.EvolveUnit_Name  FROM EvolveUnit ec LEFT JOIN    EvolveCompany ebg   ON  ec.EvolveCompany_ID = ebg.EvolveCompany_ID  LEFT JOIN EvolveAddress ea on ec.EvolveAddress_ID = ea.EvolveAddress_ID AND  ec.EvolveUnit_Code LIKE @search ORDER BY EvolveUnit_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1172: Error while getting unitList "+error.message);
            return new Error(" EERR1172: Error while getting unitList "+error.message);
        }
    },

    getTaxZoneList : async function (){
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveGenericCodeMaster_Key, EvolveGenericCodeMaster_Value , EvolveGenericCodeMaster_ID FROM EvolveGenericCodeMaster WHERE EvolveGenericCodeMaster_Key = 'tax_zone'");
        } catch (error) {
            Evolve.Log.error(" EERR1173: Error while get Tax Zone List "+error.message);
            return new Error(" EERR1173: Error while get Tax Zone List "+error.message);
        }
    },

    getTaxClassList : async function (){
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveTaxClass_Code, EvolveTaxClass_ID  FROM EvolveTaxClass ");
        } catch (error) {
            Evolve.Log.error(" EERR1174: Error while get Tax Class List "+error.message);
            return new Error(" EERR1174: Error while get Tax Class List "+error.message);
        }
    },

    getCompanyList : async function(){
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT *  FROM EvolveCompany ");
        } catch (error) {
            Evolve.Log.error(" EERR1175: Error while get Company List "+error.message);
            return new Error(" EERR1175: Error while get Company List "+error.message);
        }
    },

    getSingleUnitDetails : async function (data){
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .query('select eu.* , ea.EvolveAddress_Address1 , ea.EvolveAddress_Address2 , ea.EvolveAddress_Address3, ea.EvolveAddress_State, ea.EvolveAddress_City , ea.EvolveAddress_ZipCode , ea.EvolveAddress_Country , ea.EvolveAddress_County , ea.EvolveAddress_TaxClass , ea.EvolveAddress_TaxUsage , ea.EvolveAddress_TaxZone , ea.EvolveAddress_IsTaxable , ea.EvolveAddress_PanNumber , ea.EvolveAddress_GstIn , ec.EvolveContact_Name ,ec.EvolveContact_Designation , ec.EvolveContact_Department ,ec.EvolveContact_Email , ec.EvolveContact_Contactumber , ec.EvolveContact_ID  from EvolveUnit eu ,  EvolveAddress ea , EvolveContact ec where  eu.EvolveUnit_ID = @EvolveUnit_ID AND eu.EvolveAddress_ID = ea.EvolveAddress_ID AND eu.EvolveAddress_ID = ec.EvolveAddress_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1176: Error while getSingleUnitDetails "+error.message);
            return new Error(" EERR1176: Error while getSingleUnitDetails "+error.message);
        }
    } ,

    createAddress : async function (data){
        try {
            let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            console.log("data:::::::::::::", data.Address.EvolveAddress_Address1);
            return await Evolve.SqlPool.request()
                .input('EvolveAddress_Address1', Evolve.Sql.NVarChar, data.Address.EvolveAddress_Address1)
                .input('EvolveAddress_Address2', Evolve.Sql.NVarChar, data.Address.EvolveAddress_Address2)
                .input('EvolveAddress_Address3', Evolve.Sql.NVarChar, data.Address.EvolveAddress_Address3)
                .input('EvolveAddress_State', Evolve.Sql.NVarChar, data.Address.EvolveAddress_State)
                .input('EvolveAddress_City', Evolve.Sql.NVarChar, data.Address.EvolveAddress_City)
                .input('EvolveAddress_ZipCode', Evolve.Sql.NVarChar, data.Address.EvolveAddress_ZipCode)
                .input('EvolveAddress_Country', Evolve.Sql.NVarChar, data.Address.EvolveAddress_Country)
                .input('EvolveAddress_County', Evolve.Sql.NVarChar, data.Address.EvolveAddress_County)
                .input('EvolveAddress_TaxClass', Evolve.Sql.NVarChar, data.tax.EvolveAddress_TaxClass)
                .input('EvolveAddress_TaxUsage', Evolve.Sql.NVarChar, data.tax.EvolveAddress_TaxUsage)
                .input('EvolveAddress_TaxZone', Evolve.Sql.NVarChar, data.tax.EvolveAddress_TaxZone)
                .input('EvolveAddress_IsTaxable', Evolve.Sql.BIT, data.tax.EvolveAddress_IsTaxable)
                .input('EvolveAddress_PanNumber', Evolve.Sql.NVarChar, data.tax.EvolveAddress_PanNumber)
                .input('EvolveAddress_GstIn', Evolve.Sql.NVarChar, data.tax.EvolveAddress_GstIn)
                .input('EvolveAddress_Type', Evolve.Sql.NVarChar, 'Unit')
                .input('EvolveAddress_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveAddress_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveAddress_UpdatedUser', Evolve.Sql.Int,data.EvolveUser_ID)
                .input('EvolveAddress_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query('INSERT INTO EvolveAddress (EvolveAddress_Address1 ,EvolveAddress_Address2, EvolveAddress_Address3 , EvolveAddress_State , EvolveAddress_City , EvolveAddress_ZipCode  ,EvolveAddress_Country , EvolveAddress_County , EvolveAddress_TaxClass , EvolveAddress_TaxUsage , EvolveAddress_TaxZone , EvolveAddress_IsTaxable , EvolveAddress_PanNumber , EvolveAddress_GstIn , EvolveAddress_CreatedUser , EvolveAddress_CreatedAt , EvolveAddress_UpdatedUser , EvolveAddress_UpdatedAt , EvolveAddress_Type) VALUES (@EvolveAddress_Address1 , @EvolveAddress_Address2 , @EvolveAddress_Address3 , @EvolveAddress_State , @EvolveAddress_City , @EvolveAddress_ZipCode , @EvolveAddress_Country , @EvolveAddress_County , @EvolveAddress_TaxClass , @EvolveAddress_TaxUsage , @EvolveAddress_TaxZone , @EvolveAddress_IsTaxable , @EvolveAddress_PanNumber , @EvolveAddress_GstIn , @EvolveAddress_CreatedUser , @EvolveAddress_CreatedAt , @EvolveAddress_UpdatedUser , @EvolveAddress_UpdatedAt , @EvolveAddress_Type); select @@IDENTITY AS \'inserted_id\'');
        } catch (error) {
            Evolve.Log.error(" EERR1177: Error while create Address "+error.message);
            return new Error(" EERR1177: Error while create Address "+error.message);
        }
    },

    createContact : async function (data, id){
        try {
            let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveAddress_ID', Evolve.Sql.Int, id)
                .input('EvolveContact_Name', Evolve.Sql.NVarChar, data.Contact.EvolveContact_Name)
                .input('EvolveContact_Designation', Evolve.Sql.NVarChar, data.Contact.EvolveContact_Designation)
                .input('EvolveContact_Department', Evolve.Sql.NVarChar, data.Contact.EvolveContact_Department)
                .input('EvolveContact_Email', Evolve.Sql.NVarChar, data.Contact.EvolveContact_Email)
                .input('EvolveContact_Contactumber', Evolve.Sql.NVarChar, data.Contact.EvolveContact_Contactumber)
                .input('EvolveContact_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveContact_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveContact_UpdatedUser', Evolve.Sql.Int,data.EvolveUser_ID)
                .input('EvolveContact_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query('INSERT INTO EvolveContact (EvolveAddress_ID ,EvolveContact_Name, EvolveContact_Designation , EvolveContact_Department , EvolveContact_Email , EvolveContact_Contactumber   , EvolveContact_CreatedUser , EvolveContact_CreatedAt , EvolveContact_UpdatedUser , EvolveContact_UpdatedAt) VALUES (@EvolveAddress_ID , @EvolveContact_Name , @EvolveContact_Designation , @EvolveContact_Department , @EvolveContact_Email , @EvolveContact_Contactumber ,  @EvolveContact_CreatedUser , @EvolveContact_CreatedAt , @EvolveContact_UpdatedUser , @EvolveContact_UpdatedAt)');

        } catch (error) {
            Evolve.Log.error(" EERR1178: Error while create Contact "+error.message);
            return new Error(" EERR1178: Error while create Contact "+error.message);
        }
    }, 

    createUnit : async function(data , id){
        try {
            let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveAddress_ID', Evolve.Sql.Int, id)
                .input('EvolveUnit_Code', Evolve.Sql.NVarChar, data.EvolveUnit_Code)
                .input('EvolveUnit_Name', Evolve.Sql.NVarChar, data.EvolveUnit_Name)
                .input('EvolveCompany_ID', Evolve.Sql.NVarChar, data.EvolveCompany_ID)
                .input('EvolveUnit_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUnit_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveUnit_UpdatedUser', Evolve.Sql.Int,data.EvolveUser_ID)
                .input('EvolveUnit_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query('insert into EvolveUnit (EvolveUnit_Code ,EvolveUnit_Name , EvolveCompany_ID, EvolveAddress_ID, EvolveUnit_CreatedUser , EvolveUnit_CreatedAt , EvolveUnit_UpdatedUser , EvolveUnit_UpdatedAt ) VALUES (@EvolveUnit_Code , @EvolveUnit_Name , @EvolveCompany_ID, @EvolveAddress_ID , @EvolveUnit_CreatedUser , @EvolveUnit_CreatedAt , @EvolveUnit_UpdatedUser, @EvolveUnit_UpdatedAt)');
        } catch (error) {
            Evolve.Log.error(" EERR1179: Error while create Unit "+error.message);
            return new Error(" EERR1179: Error while create Unit "+error.message);
        }
    },

    updateAddress : async function (data){
        try {
            let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            console.log("data:::::::::::::", data.Address.EvolveAddress_Address1);
            return await Evolve.SqlPool.request()
                .input('EvolveAddress_ID', Evolve.Sql.NVarChar, data.Address.EvolveAddress_ID)
                .input('EvolveAddress_Address1', Evolve.Sql.NVarChar, data.Address.EvolveAddress_Address1)
                .input('EvolveAddress_Address2', Evolve.Sql.NVarChar, data.Address.EvolveAddress_Address2)
                .input('EvolveAddress_Address3', Evolve.Sql.NVarChar, data.Address.EvolveAddress_Address3)
                .input('EvolveAddress_State', Evolve.Sql.NVarChar, data.Address.EvolveAddress_State)
                .input('EvolveAddress_City', Evolve.Sql.NVarChar, data.Address.EvolveAddress_City)
                .input('EvolveAddress_ZipCode', Evolve.Sql.NVarChar, data.Address.EvolveAddress_ZipCode)
                .input('EvolveAddress_Country', Evolve.Sql.NVarChar, data.Address.EvolveAddress_Country)
                .input('EvolveAddress_County', Evolve.Sql.NVarChar, data.Address.EvolveAddress_County)
                .input('EvolveAddress_TaxClass', Evolve.Sql.NVarChar, data.tax.EvolveAddress_TaxClass)
                .input('EvolveAddress_TaxUsage', Evolve.Sql.NVarChar, data.tax.EvolveAddress_TaxUsage)
                .input('EvolveAddress_TaxZone', Evolve.Sql.NVarChar, data.tax.EvolveAddress_TaxZone)
                .input('EvolveAddress_IsTaxable', Evolve.Sql.BIT, data.tax.EvolveAddress_IsTaxable)
                .input('EvolveAddress_PanNumber', Evolve.Sql.NVarChar, data.tax.EvolveAddress_PanNumber)
                .input('EvolveAddress_GstIn', Evolve.Sql.NVarChar, data.tax.EvolveAddress_GstIn)
                .input('EvolveAddress_Type', Evolve.Sql.NVarChar, 'Unit')
                // .input('EvolveAddress_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                // .input('EvolveAddress_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveAddress_UpdatedUser', Evolve.Sql.Int,data.EvolveUser_ID)
                .input('EvolveAddress_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query('UPDATE EvolveAddress SET EvolveAddress_Address1 =@EvolveAddress_Address1  , EvolveAddress_Address2 = @EvolveAddress_Address2, EvolveAddress_Address3 = @EvolveAddress_Address3 , EvolveAddress_State =@EvolveAddress_State , EvolveAddress_City = @EvolveAddress_City ,  EvolveAddress_ZipCode = @EvolveAddress_ZipCode ,EvolveAddress_Country =@EvolveAddress_Country  , EvolveAddress_County = @EvolveAddress_County , EvolveAddress_TaxClass = @EvolveAddress_TaxClass , EvolveAddress_TaxUsage = @EvolveAddress_TaxUsage , EvolveAddress_TaxZone = @EvolveAddress_TaxZone , EvolveAddress_IsTaxable = @EvolveAddress_IsTaxable , EvolveAddress_PanNumber = @EvolveAddress_PanNumber , EvolveAddress_GstIn = @EvolveAddress_GstIn ,  EvolveAddress_UpdatedUser = @EvolveAddress_UpdatedUser , EvolveAddress_UpdatedAt = @EvolveAddress_UpdatedAt , EvolveAddress_Type = @EvolveAddress_Type  Where EvolveAddress_ID = @EvolveAddress_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1174: Error while updateAddress "+error.message);
            return new Error(" EERR1174: Error while updateAddress "+error.message);
        }
    }, 

    updateContact : async function (data){
        try {
            let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveContact_ID', Evolve.Sql.NVarChar, data.Contact.EvolveContact_ID)
                .input('EvolveAddress_ID', Evolve.Sql.NVarChar, data.Address.EvolveAddress_ID)
                .input('EvolveContact_Name', Evolve.Sql.NVarChar, data.Contact.EvolveContact_Name)
                .input('EvolveContact_Designation', Evolve.Sql.NVarChar, data.Contact.EvolveContact_Designation)
                .input('EvolveContact_Department', Evolve.Sql.NVarChar, data.Contact.EvolveContact_Department)
                .input('EvolveContact_Email', Evolve.Sql.NVarChar, data.Contact.EvolveContact_Email)
                .input('EvolveContact_Contactumber', Evolve.Sql.NVarChar, data.Contact.EvolveContact_Contactumber)
                // .input('EvolveContact_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                // .input('EvolveContact_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveContact_UpdatedUser', Evolve.Sql.Int,data.EvolveUser_ID)
                .input('EvolveContact_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query('UPDATE EvolveContact SET EvolveAddress_ID = @EvolveAddress_ID , EvolveContact_Name = @EvolveContact_Name, EvolveContact_Designation = @EvolveContact_Designation , EvolveContact_Department = @EvolveContact_Department , EvolveContact_Email = @EvolveContact_Email , EvolveContact_Contactumber = @EvolveContact_Contactumber , EvolveContact_UpdatedUser = @EvolveContact_UpdatedUser , EvolveContact_UpdatedAt = @EvolveContact_UpdatedAt WHERE EvolveContact_ID = @EvolveContact_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1177: Error while updateContact "+error.message);
            return new Error(" EERR1177: Error while updateContact "+error.message);
        }
    }, 

    upateUnit : async function (data){
        try {
            let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_ID', Evolve.Sql.NVarChar, data.EvolveUnit_ID)
                .input('EvolveAddress_ID', Evolve.Sql.NVarChar, data.Address.EvolveAddress_ID)
                // .input('EvolveUnit_Code', Evolve.Sql.NVarChar, data.EvolveUnit_Code)
                .input('EvolveUnit_Name', Evolve.Sql.NVarChar, data.EvolveUnit_Name)
                .input('EvolveCompany_ID', Evolve.Sql.NVarChar, data.EvolveCompany_ID)
                .input('EvolveUnit_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUnit_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveUnit_UpdatedUser', Evolve.Sql.Int,data.EvolveUser_ID)
                .input('EvolveUnit_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query('UPDATE EvolveUnit SET EvolveUnit_Name = @EvolveUnit_Name , EvolveCompany_ID = EvolveCompany_ID, EvolveAddress_ID = @EvolveAddress_ID, EvolveUnit_CreatedUser = @EvolveUnit_CreatedUser , EvolveUnit_CreatedAt = @EvolveUnit_CreatedAt , EvolveUnit_UpdatedUser = @EvolveUnit_UpdatedUser , EvolveUnit_UpdatedAt = @EvolveUnit_UpdatedAt  WHERE EvolveUnit_ID=@EvolveUnit_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1176: Error while upateUnit "+error.message);
            return new Error(" EERR1176: Error while upateUnit "+error.message);
        }
    },
}

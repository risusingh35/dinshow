'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getGenericConfigMasterListCount: async function (search ,EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
            .query(" SELECT COUNT(EvolveGenericCodeMaster_ID) AS count FROM EvolveGenericCodeMaster WHERE EvolveGenericCodeMaster_Key LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get generic config master count "+error.message);
            return new Error(" EERR####: Error while get generic config master count "+error.message);
        }
    },

    getGenericConfigMasterList: async function (start, length ,search , EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
                .query(" SELECT * FROM EvolveGenericCodeMaster WHERE EvolveGenericCodeMaster_Key LIKE @search ORDER BY EvolveGenericCodeMaster_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get generic config master list "+error.message);
            return new Error(" EERR####: Error while get generic config master list "+error.message);
        }
    },

    checkgenericConfigExist : async function (data , keyValue) {
        try {
            if (keyValue == 'Channel') {
                data['Field Name'] = 'Channel'
            }
            if(keyValue == 'MOD'){
                data['Field Name'] = 'MOD'
            }
            if(keyValue == 'Taxenv'){
                data['Field Name'] = 'Taxenv'
            }
            if(keyValue == 'Currency'){
                data['Field Name'] = 'Currency'
            }
            if(keyValue == 'customer_type'){
                data['Field Name'] = 'customer_type'
            }
            if(keyValue == 'invoice_status'){
                data['Field Name'] = 'invoice_status'
            }
            if(keyValue == 'tax_zone'){
                data['Field Name'] = 'tax_zone'
            }
            if(keyValue == 'industry_type'){
                data['Field Name'] = 'industry_type'
            }
            if(keyValue == 'address_type'){
                data['Field Name'] = 'address_type'
            }
            if(keyValue == 'country_code'){
                data['Field Name'] = 'country_code'
            }
            if(keyValue == 'state_code'){
                data['Field Name'] = 'state_code'
            }
            return await Evolve.SqlPool.request()
                .input('EvolveGenericCodeMaster_Value', Evolve.Sql.NVarChar, data['Value'])
                .input('EvolveGenericCodeMaster_Key', Evolve.Sql.NVarChar, data['Field Name'])

                
                .query(' SELECT * FROM EvolveGenericCodeMaster WHERE  CONVERT(varchar(100), EvolveGenericCodeMaster_Value) = @EvolveGenericCodeMaster_Value AND EvolveGenericCodeMaster_Key=@EvolveGenericCodeMaster_Key ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while check generic config master "+error.message);
            return new Error(" EERR####: Erorr while check generic config master "+error.message);
        }
    },

    updateGenericConfig : async function (EvolveUser_ID, data, keyValue) {

       
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            if (keyValue == 'Channel') {
                data['Field Name'] = 'Channel'
            }
            if(keyValue == 'MOD'){
                data['Field Name'] = 'MOD'
            }
            if(keyValue == 'Taxenv'){
                data['Field Name'] = 'Taxenv'
            }
            if(keyValue == 'Currency'){
                data['Field Name'] = 'Currency'
            }
            if(keyValue == 'customer_type'){
                data['Field Name'] = 'customer_type'
            }
            if(keyValue == 'invoice_status'){
                data['Field Name'] = 'invoice_status'
            }
            if(keyValue == 'tax_zone'){
                data['Field Name'] = 'tax_zone'
            }
            if(keyValue == 'industry_type'){
                data['Field Name'] = 'industry_type'
            }
            if(keyValue == 'address_type'){
                data['Field Name'] = 'address_type'
            }
            if(keyValue == 'country_code'){
                data['Field Name'] = 'country_code'
            }
            if(keyValue == 'state_code'){
                data['Field Name'] = 'state_code'
            }
            return await Evolve.SqlPool.request()
                .input('EvolveGenericCodeMaster_ID', Evolve.Sql.Int, data['EvolveGenericCodeMaster_ID'])
                .input('EvolveGenericCodeMaster_Key', Evolve.Sql.NVarChar, data['Field Name'])
                .input('EvolveGenericCodeMaster_Value', Evolve.Sql.NVarChar, data['Value'].trim())
                .input('EvolveGenericCodeMaster_Desc', Evolve.Sql.NVarChar, data['Comments'])
                .input('EvolveGenericCodeMaster_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveGenericCodeMaster_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                
                .query(' UPDATE EvolveGenericCodeMaster SET EvolveGenericCodeMaster_Key = @EvolveGenericCodeMaster_Key, EvolveGenericCodeMaster_Value = @EvolveGenericCodeMaster_Value, EvolveGenericCodeMaster_Desc = @EvolveGenericCodeMaster_Desc, EvolveGenericCodeMaster_UpdatedUser = @EvolveGenericCodeMaster_UpdatedUser, EvolveGenericCodeMaster_UpdatedAt = @EvolveGenericCodeMaster_UpdatedAt WHERE EvolveGenericCodeMaster_ID = @EvolveGenericCodeMaster_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while update generic config master "+error.message);
            return new Error(" EERR####: Erorr while update generic config master "+error.message);
        }
    },

    addGenericConfig : async function (EvolveUser_ID, data, keyValue) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            if (keyValue == 'Channel') {
                data['Field Name'] = 'Channel'
            }
            if(keyValue == 'MOD'){
                data['Field Name'] = 'MOD'
            }
            if(keyValue == 'Taxenv'){
                data['Field Name'] = 'Taxenv'
            }
            return await Evolve.SqlPool.request()
                .input('EvolveGenericCodeMaster_Key', Evolve.Sql.NVarChar, data['Field Name'])
                .input('EvolveGenericCodeMaster_Value', Evolve.Sql.NVarChar, data['Value'].trim())
                .input('EvolveGenericCodeMaster_Desc', Evolve.Sql.NVarChar, data['Comments'])
                .input('EvolveGenericCodeMaster_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveGenericCodeMaster_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveGenericCodeMaster_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveGenericCodeMaster_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                
                .query(' INSERT INTO EvolveGenericCodeMaster (EvolveGenericCodeMaster_Key, EvolveGenericCodeMaster_Value, EvolveGenericCodeMaster_Desc, EvolveGenericCodeMaster_CreatedUser, EvolveGenericCodeMaster_CreatedAt, EvolveGenericCodeMaster_UpdatedUser, EvolveGenericCodeMaster_UpdatedAt) VALUES (@EvolveGenericCodeMaster_Key, @EvolveGenericCodeMaster_Value, @EvolveGenericCodeMaster_Desc, @EvolveGenericCodeMaster_CreatedUser, @EvolveGenericCodeMaster_CreatedAt, @EvolveGenericCodeMaster_UpdatedUser, @EvolveGenericCodeMaster_UpdatedAt) ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add generic config master "+error.message);
            return new Error(" EERR####: Erorr while add generic config master "+error.message);
        }
    },

    
    addGenConfigMaster : async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {

            return await Evolve.SqlPool.request()
                .input('EvolveGenericCodeMaster_Key', Evolve.Sql.NVarChar, data.EvolveGenericCodeMaster_Key)
                .input('EvolveGenericCodeMaster_Value', Evolve.Sql.NVarChar, data.EvolveGenericCodeMaster_Value)
                .input('EvolveGenericCodeMaster_Desc', Evolve.Sql.NVarChar, data.EvolveGenericCodeMaster_Desc)
                .input('EvolveGenericCodeMaster_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGenericCodeMaster_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveGenericCodeMaster_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGenericCodeMaster_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                
                .query(' INSERT INTO EvolveGenericCodeMaster (EvolveGenericCodeMaster_Key, EvolveGenericCodeMaster_Value, EvolveGenericCodeMaster_Desc, EvolveGenericCodeMaster_CreatedUser, EvolveGenericCodeMaster_CreatedAt, EvolveGenericCodeMaster_UpdatedUser, EvolveGenericCodeMaster_UpdatedAt) VALUES (@EvolveGenericCodeMaster_Key, @EvolveGenericCodeMaster_Value, @EvolveGenericCodeMaster_Desc, @EvolveGenericCodeMaster_CreatedUser, @EvolveGenericCodeMaster_CreatedAt, @EvolveGenericCodeMaster_UpdatedUser, @EvolveGenericCodeMaster_UpdatedAt) ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add generic config master "+error.message);
            return new Error(" EERR####: Erorr while add generic config master "+error.message);
        }
    },

    updateConfigMaster : async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {

            return await Evolve.SqlPool.request()
                .input('EvolveGenericCodeMaster_ID', Evolve.Sql.Int, data.EvolveGenericCodeMaster_ID)
                .input('EvolveGenericCodeMaster_Key', Evolve.Sql.NVarChar, data.EvolveGenericCodeMaster_Key)
                .input('EvolveGenericCodeMaster_Value', Evolve.Sql.NVarChar, data.EvolveGenericCodeMaster_Value)
                .input('EvolveGenericCodeMaster_Desc', Evolve.Sql.NVarChar, data.EvolveGenericCodeMaster_Desc)
                .input('EvolveGenericCodeMaster_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGenericCodeMaster_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                
                .query(" UPDATE EvolveGenericCodeMaster SET EvolveGenericCodeMaster_Key = @EvolveGenericCodeMaster_Key, EvolveGenericCodeMaster_Value = @EvolveGenericCodeMaster_Value, EvolveGenericCodeMaster_Desc = @EvolveGenericCodeMaster_Desc, EvolveGenericCodeMaster_UpdatedUser = @EvolveGenericCodeMaster_UpdatedUser, EvolveGenericCodeMaster_UpdatedAt = @EvolveGenericCodeMaster_UpdatedAt WHERE EvolveGenericCodeMaster_ID = @EvolveGenericCodeMaster_ID ");

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while Upate Generic Config Master "+error.message);
            return new Error(" EERR####: Erorr while Upate Generic Config Master "+error.message);
        }
    }
 
 

}
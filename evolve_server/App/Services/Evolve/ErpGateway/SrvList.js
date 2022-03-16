'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllErp: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolveERP')
        } catch (error) {
            Evolve.Log.error("EERR3079 : Error while getting all ERP list "+error.message);
            return new Error("EERR3079 : Error while getting all ERP list "+error.message);
        }
    },

    getErpGatewayListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
            .query("SELECT COUNT(erpg.EvolveERPGateway_ID) as count FROM  EvolveERPGateway erpg , EvolveERP erp WHERE erpg.EvolveERP_ID = erp.EvolveERP_ID AND (erp.EvolveERP_Name LIKE @search OR erpg.EvolveERPGateway_Method LIKE @search)");
        } catch (error) {
            Evolve.Log.error("EERR3080 : Error while getting ERP gateway list count "+error.message);
            return new Error("EERR3080 : Error while getting ERP gateway list count "+error.message);
        }
    },

    getErpGatewayListDatatable : async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
                .query("SELECT erp.EvolveERP_Name , erpg.* FROM  EvolveERPGateway erpg , EvolveERP erp WHERE erpg.EvolveERP_ID = erp.EvolveERP_ID AND (erp.EvolveERP_Name LIKE @search OR erpg.EvolveERPGateway_Method LIKE @search) order by erpg.EvolveERPGateway_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error("EERR3081 : Error while getting ERP gateway list "+error.message);
            return new Error("EERR3081 : Error while getting ERP gateway list "+error.message);
        }
    },

    addErpGateWay : async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveERP_ID', Evolve.Sql.Int, data.EvolveERP_ID)
                .input('EvolveERPGateway_Method', Evolve.Sql.NVarChar, data.EvolveERPGateway_Method)
                .input('EvolveERPGateway_Host', Evolve.Sql.NVarChar, data.EvolveERPGateway_Host)
                .input('EvolveERPGateway_User', Evolve.Sql.NVarChar, data.EvolveERPGateway_User)
                .input('EvolveERPGateway_Password', Evolve.Sql.NVarChar, data.EvolveERPGateway_Password)
                .input('EvolveERPGateway_Port', Evolve.Sql.NVarChar, data.EvolveERPGateway_Port)
                .input('EvolveERPGateway_InPath', Evolve.Sql.NVarChar, data.EvolveERPGateway_InPath)
                .input('EvolveERPGateway_OutPath', Evolve.Sql.NVarChar, data.EvolveERPGateway_OutPath)
                .input('EvolveERPGateway_FileType', Evolve.Sql.NVarChar, data.EvolveERPGateway_FileType)
                .input('EvolveERPGateway_URL', Evolve.Sql.NVarChar, data.EvolveERPGateway_URL)            
                .input('EvolveERPGateway_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveERPGateway_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveERPGateway_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveERPGateway_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveERPGateway (EvolveERP_ID,EvolveERPGateway_Method,EvolveERPGateway_Host,EvolveERPGateway_User,EvolveERPGateway_Password,EvolveERPGateway_Port,EvolveERPGateway_InPath,EvolveERPGateway_OutPath,EvolveERPGateway_FileType,EvolveERPGateway_URL,EvolveERPGateway_CreatedAt,EvolveERPGateway_CreatedUser,EvolveERPGateway_UpdatedAt,EvolveERPGateway_UpdatedUser) VALUES (@EvolveERP_ID,@EvolveERPGateway_Method,@EvolveERPGateway_Host,@EvolveERPGateway_User,@EvolveERPGateway_Password,@EvolveERPGateway_Port,@EvolveERPGateway_InPath,@EvolveERPGateway_OutPath,@EvolveERPGateway_FileType,@EvolveERPGateway_URL,@EvolveERPGateway_CreatedAt,@EvolveERPGateway_CreatedUser,@EvolveERPGateway_UpdatedAt,@EvolveERPGateway_UpdatedUser) ');

        } catch (error) {
            Evolve.Log.error("EERR3082 : Error while adding ERP Gateway "+error.message);
            return new Error("EERR3082 : Error while adding ERP Gateway "+error.message);
        }
    },

    getSingleErpGateWay: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveERPGateway_ID', Evolve.Sql.Int, id)
                .query('SELECT * FROM EvolveERPGateway WHERE EvolveERPGateway_ID = @EvolveERPGateway_ID')
        } catch (error) {
            Evolve.Log.error("EERR3083 : Error while getting Single Erp Gateway "+error.message);
            return new Error("EERR3083 : Error while getting Single Erp Gateway "+error.message);
        }
    },

    updateErpGateWay : async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveERPGateway_ID', Evolve.Sql.Int, data.EvolveERPGateway_ID)
                .input('EvolveERP_ID', Evolve.Sql.Int, data.EvolveERP_ID)
                .input('EvolveERPGateway_Method', Evolve.Sql.NVarChar, data.EvolveERPGateway_Method)
                .input('EvolveERPGateway_Host', Evolve.Sql.NVarChar, data.EvolveERPGateway_Host)
                .input('EvolveERPGateway_User', Evolve.Sql.NVarChar, data.EvolveERPGateway_User)
                .input('EvolveERPGateway_Password', Evolve.Sql.NVarChar, data.EvolveERPGateway_Password)
                .input('EvolveERPGateway_Port', Evolve.Sql.NVarChar, data.EvolveERPGateway_Port)
                .input('EvolveERPGateway_InPath', Evolve.Sql.NVarChar, data.EvolveERPGateway_InPath)
                .input('EvolveERPGateway_OutPath', Evolve.Sql.NVarChar, data.EvolveERPGateway_OutPath)
                .input('EvolveERPGateway_FileType', Evolve.Sql.NVarChar, data.EvolveERPGateway_FileType)
                .input('EvolveERPGateway_URL', Evolve.Sql.NVarChar, data.EvolveERPGateway_URL)            
                .input('EvolveERPGateway_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveERPGateway_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveERPGateway SET EvolveERP_ID = @EvolveERP_ID ,EvolveERPGateway_Method = @EvolveERPGateway_Method,EvolveERPGateway_Host = @EvolveERPGateway_Host,EvolveERPGateway_User = @EvolveERPGateway_User,EvolveERPGateway_Password = @EvolveERPGateway_Password,EvolveERPGateway_Port = @EvolveERPGateway_Port,EvolveERPGateway_InPath = @EvolveERPGateway_InPath,EvolveERPGateway_OutPath = @EvolveERPGateway_OutPath,EvolveERPGateway_FileType = @EvolveERPGateway_FileType,EvolveERPGateway_URL = @EvolveERPGateway_URL,EvolveERPGateway_UpdatedAt = @EvolveERPGateway_UpdatedAt,EvolveERPGateway_UpdatedUser = @EvolveERPGateway_UpdatedUser WHERE  EvolveERPGateway_ID = @EvolveERPGateway_ID');

        } catch (error) {
            Evolve.Log.error("EERR3084 : Error while updating ERP Gateway "+error.message);
            return new Error("EERR3084 : Error while updating ERP Gateway "+error.message);
        }
    },
  

}
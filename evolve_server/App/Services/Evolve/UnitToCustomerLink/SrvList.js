'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

     getDocumentList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveDocument_ID, EvolveDocument_Name FROM EvolveDocument');
        } catch (error) {
            Evolve.Log.error(" EERR1453: Error while getting Document List "+error.message);
            return new Error(" EERR1453: Error while getting Document List "+error.message);
        }
    },     
    getUnitList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolveUnit');
        } catch (error) {
            Evolve.Log.error("EERR1453: Error while getting Unit List "+error.message);
            return new Error("EERR1453: Error while getting Unit List "+error.message);
        }
    },    
    getCustomerList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolveSupplier');
        } catch (error) {
            Evolve.Log.error("EERR1453: Error while getting Customer List "+error.message);
            return new Error("EERR1453: Error while getting Customer List "+error.message);
        }
    },    
    addUnitToCustomerLink: async function (data) {
        try {
            
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveDocument_ID',Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveUnit_ID',Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveSupplier_ID',Evolve.Sql.Int, data.EvolveSupplier_ID)
                .input('EvolveUnitToCustomerLink_FromEmail_ID',Evolve.Sql.NVarChar, data.EvolveUnitToCustomerLink_FromEmail_ID)
                .input('EvolveUnitToCustomerLink_ToEmail_ID',Evolve.Sql.NVarChar, data.EvolveUnitToCustomerLink_ToEmail_ID)
                .input('EvolveUnitToCustomerLink_CCEmail_IDS',Evolve.Sql.NVarChar, data.EvolveUnitToCustomerLink_CCEmail_IDS)
                .input('EvolveUnitToCustomerLink_EmailSubject',Evolve.Sql.NVarChar, data.EvolveUnitToCustomerLink_EmailSubject)
                .input('EvolveUnitToCustomerLink_EmailBody',Evolve.Sql.NVarChar, data.EvolveUnitToCustomerLink_EmailBody)
                .input('EvolveUnitToCustomerLink_Status',Evolve.Sql.Bit, data.EvolveUnitToCustomerLink_Status)
                
                .input('EvolveUnitToCustomerLink_CreatedAt',Evolve.Sql.NVarChar, datetime)
                .input('EvolveUnitToCustomerLink_CreatedUser',Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUnitToCustomerLink_UpdatedAt',Evolve.Sql.NVarChar, datetime)
                .input('EvolveUnitToCustomerLink_UpdatedUser',Evolve.Sql.Int, data.EvolveUser_ID)
           
                .query('INSERT INTO EvolveUnitToCustomerLink (EvolveDocument_ID, EvolveUnit_ID, EvolveSupplier_ID, EvolveUnitToCustomerLink_FromEmail_ID, EvolveUnitToCustomerLink_ToEmail_ID, EvolveUnitToCustomerLink_CCEmail_IDS, EvolveUnitToCustomerLink_EmailSubject, EvolveUnitToCustomerLink_EmailBody, EvolveUnitToCustomerLink_Status, EvolveUnitToCustomerLink_CreatedAt, EvolveUnitToCustomerLink_CreatedUser, EvolveUnitToCustomerLink_UpdatedAt, EvolveUnitToCustomerLink_UpdatedUser) VALUES (@EvolveDocument_ID, @EvolveUnit_ID, @EvolveSupplier_ID, @EvolveUnitToCustomerLink_FromEmail_ID, @EvolveUnitToCustomerLink_ToEmail_ID, @EvolveUnitToCustomerLink_CCEmail_IDS, @EvolveUnitToCustomerLink_EmailSubject, @EvolveUnitToCustomerLink_EmailBody, @EvolveUnitToCustomerLink_Status, @EvolveUnitToCustomerLink_CreatedAt, @EvolveUnitToCustomerLink_CreatedUser, @EvolveUnitToCustomerLink_UpdatedAt, @EvolveUnitToCustomerLink_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error("EERR1453: Error while add Unit To Customer Link "+error.message);
            return new Error("EERR1453: Error while add Unit To Customer Link "+error.message);
        }
    },

    getUnitToCustomerLinkListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT count(eucl.EvolveUnitToCustomerLink_ID) AS count FROM EvolveUnitToCustomerLink eucl, EvolveDocument ed WHERE ed.EvolveDocument_ID = eucl.EvolveDocument_ID AND ed.EvolveDocument_Name LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1229: Error while getting Unit To Customer Link List Count " + error.message);
            return new Error(" EERR1229: Error while getting Unit To Customer Link List Count " + error.message);
        }
    },
    getUnitToCustomerLinkList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT eucl.*, ed.EvolveDocument_Name, eu.EvolveUnit_Name, es.EvolveSupplier_Name FROM EvolveUnitToCustomerLink eucl, EvolveDocument ed, EvolveUnit eu, EvolveSupplier es WHERE ed.EvolveDocument_ID = eucl.EvolveDocument_ID AND eu.EvolveUnit_ID = eucl.EvolveUnit_ID AND es.EvolveSupplier_ID = eucl.EvolveSupplier_ID AND ed.EvolveDocument_Name LIKE @search ORDER BY EvolveUnitToCustomerLink_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1230: Error while getting Unit To Customer Link List " + error.message);
            return new Error(" EERR1230: Error while getting Unit To Customer Link List " + error.message);
        }
    },
    getSingleUnitToCustomerLink : async function (data) {
        try {
          return await Evolve.SqlPool.request()
             .input('EvolveUnitToCustomerLink_ID',Evolve.Sql.Int, data.EvolveUnitToCustomerLink_ID)
            .query("SELECT * FROM EvolveUnitToCustomerLink WHERE EvolveUnitToCustomerLink_ID = @EvolveUnitToCustomerLink_ID ")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      }, 
    updateUnitToCustomerLink: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveUnitToCustomerLink_ID',Evolve.Sql.Int, data.EvolveUnitToCustomerLink_ID)
                .input('EvolveDocument_ID',Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveUnit_ID',Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveSupplier_ID',Evolve.Sql.Int, data.EvolveSupplier_ID)
                .input('EvolveUnitToCustomerLink_FromEmail_ID',Evolve.Sql.NVarChar, data.EvolveUnitToCustomerLink_FromEmail_ID)
                .input('EvolveUnitToCustomerLink_ToEmail_ID',Evolve.Sql.NVarChar, data.EvolveUnitToCustomerLink_ToEmail_ID)
                .input('EvolveUnitToCustomerLink_CCEmail_IDS',Evolve.Sql.NVarChar, data.EvolveUnitToCustomerLink_CCEmail_IDS)
                .input('EvolveUnitToCustomerLink_EmailSubject',Evolve.Sql.NVarChar, data.EvolveUnitToCustomerLink_EmailSubject)
                .input('EvolveUnitToCustomerLink_EmailBody',Evolve.Sql.NVarChar, data.EvolveUnitToCustomerLink_EmailBody)
                .input('EvolveUnitToCustomerLink_Status',Evolve.Sql.Bit, data.EvolveUnitToCustomerLink_Status)
                
                .input('EvolveUnitToCustomerLink_UpdatedAt',Evolve.Sql.NVarChar, datetime)
                .input('EvolveUnitToCustomerLink_UpdatedUser',Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveUnitToCustomerLink SET EvolveDocument_ID = @EvolveDocument_ID, EvolveUnit_ID = @EvolveUnit_ID, EvolveSupplier_ID = @EvolveSupplier_ID, EvolveUnitToCustomerLink_FromEmail_ID = @EvolveUnitToCustomerLink_FromEmail_ID, EvolveUnitToCustomerLink_ToEmail_ID = @EvolveUnitToCustomerLink_ToEmail_ID, EvolveUnitToCustomerLink_CCEmail_IDS = @EvolveUnitToCustomerLink_CCEmail_IDS, EvolveUnitToCustomerLink_EmailSubject = @EvolveUnitToCustomerLink_EmailSubject, EvolveUnitToCustomerLink_EmailBody = @EvolveUnitToCustomerLink_EmailBody, EvolveUnitToCustomerLink_Status = @EvolveUnitToCustomerLink_Status WHERE EvolveUnitToCustomerLink_ID = @EvolveUnitToCustomerLink_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1452: Error while UPDATE Unit To Customer Link "+error.message);
            return new Error(" EERR1452: Error while UPDATE Unit To Customer Link "+error.message);
        }
    },
    checkDuplicate : async function (data) {
        try {
            if(data.EvolveUnitToCustomerLink_ID != ''){
                return await Evolve.SqlPool.request()
                .input('EvolveUnitToCustomerLink_ID',Evolve.Sql.Int, data.EvolveUnitToCustomerLink_ID)
                .input('EvolveDocument_ID',Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveUnit_ID',Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveSupplier_ID',Evolve.Sql.Int, data.EvolveSupplier_ID)
                .query("SELECT * FROM EvolveUnitToCustomerLink WHERE EvolveDocument_ID = @EvolveDocument_ID AND EvolveUnit_ID = @EvolveUnit_ID AND EvolveSupplier_ID = @EvolveSupplier_ID AND EvolveUnitToCustomerLink_ID != @EvolveUnitToCustomerLink_ID")
            }else{
                 return await Evolve.SqlPool.request()
                .input('EvolveDocument_ID',Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveUnit_ID',Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveSupplier_ID',Evolve.Sql.Int, data.EvolveSupplier_ID)

                .query("SELECT * FROM EvolveUnitToCustomerLink WHERE EvolveDocument_ID = @EvolveDocument_ID AND EvolveUnit_ID = @EvolveUnit_ID AND EvolveSupplier_ID = @EvolveSupplier_ID")
            }
         
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
    },

   



}
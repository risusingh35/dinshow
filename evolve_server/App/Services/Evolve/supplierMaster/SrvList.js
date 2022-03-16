'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    checkCustExits: async function (EvolveSupplier_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSupplier_Code', Evolve.Sql.NVarChar , EvolveSupplier_Code)
                .query('SELECT EvolveSupplier_ID FROM EvolveSupplier WHERE EvolveSupplier_Code LIKE @EvolveSupplier_Code');
        } catch (error) {
            Evolve.Log.error(" EERR1211: Error while checking Cust Exits "+error.message);
            return new Error(" EERR1211: Error while checking Cust Exits "+error.message);
        }
    },

    addCustomer : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSupplier_Name', Evolve.Sql.NVarChar , data['Customer Name'])
                .input('EvolveSupplier_Code', Evolve.Sql.NVarChar , data['Customer Code'])
                .input('EvolveSupplier_Address', Evolve.Sql.NVarChar , data['Customer Address'])
                .input('EvolveSupplier_City', Evolve.Sql.NVarChar , data['Customer City'])
                .input('EvolveSupplier_State', Evolve.Sql.NVarChar , data['Customer State'])
                .input('EvolveSupplier_Country', Evolve.Sql.NVarChar , data['Customer Country'])
                .input('EvolveSupplier_Zip', Evolve.Sql.NVarChar , data['Customer Zip'])
                .input('EvolveSupplier_ContactPerson', Evolve.Sql.NVarChar , data['Customer Contact Person'])
                .input('EvolveSupplier_Phone', Evolve.Sql.NVarChar , data['Customer Contact Number'])
                .input('EvolveSupplier_Type', Evolve.Sql.NVarChar , 'customer')
                .input('EvolveSupplier_Email', Evolve.Sql.NVarChar , data['Email'])
                .input('EvolveSupplier_Gstin', Evolve.Sql.NVarChar , data['GST IN'])
                .query('INSERT INTO EvolveSupplier (EvolveSupplier_Name,EvolveSupplier_Code,EvolveSupplier_Address,EvolveSupplier_City,EvolveSupplier_State,EvolveSupplier_Country,EvolveSupplier_Zip,EvolveSupplier_ContactPerson,EvolveSupplier_Phone,EvolveSupplier_Type, EvolveSupplier_Email, EvolveSupplier_Gstin) VALUES (@EvolveSupplier_Name,@EvolveSupplier_Code,@EvolveSupplier_Address,@EvolveSupplier_City,@EvolveSupplier_State,@EvolveSupplier_Country,@EvolveSupplier_Zip,@EvolveSupplier_ContactPerson,@EvolveSupplier_Phone,@EvolveSupplier_Type, @EvolveSupplier_Email, @EvolveSupplier_Gstin)');
        } catch (error) {
            Evolve.Log.error(" EERR1212: Error while adding Customer "+error.message);
            return new Error(" EERR1212: Error while adding Customer "+error.message);
        }
    },

    updateCustomer : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSupplier_ID', Evolve.Sql.NVarChar , data['EvolveSupplier_ID'])
                .input('EvolveSupplier_Name', Evolve.Sql.NVarChar , data['Customer Name'])
                .input('EvolveSupplier_Address', Evolve.Sql.NVarChar , data['Customer Address'])
                .input('EvolveSupplier_City', Evolve.Sql.NVarChar , data['Customer City'])
                .input('EvolveSupplier_State', Evolve.Sql.NVarChar , data['Customer State'])
                .input('EvolveSupplier_Country', Evolve.Sql.NVarChar , data['Customer Country'])
                .input('EvolveSupplier_Zip', Evolve.Sql.NVarChar , data['Customer Zip'])
                .input('EvolveSupplier_ContactPerson', Evolve.Sql.NVarChar , data['Customer Contact Person'])
                .input('EvolveSupplier_Phone', Evolve.Sql.NVarChar , data['Customer Contact Number'])
                .input('EvolveSupplier_Email', Evolve.Sql.NVarChar , data['Email'])
                .input('EvolveSupplier_Gstin', Evolve.Sql.NVarChar , data['GST IN'])
                .query('UPDATE EvolveSupplier SET EvolveSupplier_Name = @EvolveSupplier_Name , EvolveSupplier_Address = @EvolveSupplier_Address , EvolveSupplier_City = @EvolveSupplier_City , EvolveSupplier_State = @EvolveSupplier_State ,  EvolveSupplier_Country = @EvolveSupplier_Country , EvolveSupplier_Zip = @EvolveSupplier_Zip , EvolveSupplier_ContactPerson = @EvolveSupplier_ContactPerson , EvolveSupplier_Phone = @EvolveSupplier_Phone, EvolveSupplier_Email = @EvolveSupplier_Email, EvolveSupplier_Gstin = @EvolveSupplier_Gstin WHERE EvolveSupplier_ID = @EvolveSupplier_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1213: Error while updating Customer "+error.message);
            return new Error(" EERR1213: Error while updating Customer "+error.message);
        }
    },

    getCustomerList: async function (start ,length ,search  ) {
        try {
            return await Evolve.SqlPool.request()
            .input('start', Evolve.Sql.Int, start)
            .input('length', Evolve.Sql.Int, length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT es.* , ea.EvolveAddress_Code , ecu.EvolveCurrency_Code , ept.EvolvePayTerms_Code , eins.EvolveInvStatus_Code , eu.EvolveUnit_Code FROM EvolveSupplier es left join EvolveAddress ea on ea.EvolveAddress_ID = es.EvolveAddress_ID left join EvolveCurrency ecu on ecu.EvolveCurrency_ID = es.EvolveCurrency_ID left join EvolvePayTerms ept on ept.EvolvePayTerms_ID = es.EvolvePayTerms_ID left join EvolveInvStatus eins on eins.EvolveInvStatus_ID = es.EvolveInvStatus_ID left join EvolveUnit eu on eu.EvolveUnit_ID = es.EvolveUnit_ID WHERE  (es.EvolveSupplier_Code LIKE @search OR es.EvolveSupplier_Name LIKE @search or ea.EvolveAddress_Code like @search or ecu.EvolveCurrency_Code like @search or ept.EvolvePayTerms_Code like @search or eins.EvolveInvStatus_Code like @search or eu.EvolveUnit_Code like @search ) ORDER BY es.EvolveSupplier_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
                // .query("SELECT * FROM EvolveSupplier WHERE  (EvolveSupplier_Code LIKE @search OR EvolveSupplier_Name LIKE @search) ORDER BY EvolveSupplier_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1214: Error while getting Customer List "+error.message);
            return new Error(" EERR1214: Error while getting Customer List "+error.message);
        }
    },
    getCustomerCount : async function (search) {
        try {
            
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(" SELECT COUNT(es.EvolveSupplier_ID) as count FROM EvolveSupplier es left join EvolveAddress ea on ea.EvolveAddress_ID = es.EvolveAddress_ID left join EvolveCurrency ecu on ecu.EvolveCurrency_ID = es.EvolveCurrency_ID left join EvolvePayTerms ept on ept.EvolvePayTerms_ID = es.EvolvePayTerms_ID left join EvolveInvStatus eins on eins.EvolveInvStatus_ID = es.EvolveInvStatus_ID left join EvolveUnit eu on eu.EvolveUnit_ID = es.EvolveUnit_ID WHERE  (es.EvolveSupplier_Code LIKE @search OR es.EvolveSupplier_Name LIKE @search or ea.EvolveAddress_Code like @search or ecu.EvolveCurrency_Code like @search or ept.EvolvePayTerms_Code like @search or eins.EvolveInvStatus_Code like @search or eu.EvolveUnit_Code like @search )")
            // .query("SELECT COUNT(EvolveSupplier_ID) as count  FROM EvolveSupplier WHERE  (EvolveSupplier_Code LIKE @search OR EvolveSupplier_Name LIKE @search) ");
        } catch (error) {
            Evolve.Log.error("EERR3067 : Error while get customer Count "+error.message);
            return new Error("EERR3067 : Error while get customer Count "+error.message);
        }
    },
}
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getEInvoiceListCount: async function (search) {
        try {
                return await Evolve.SqlPool.request()
                    .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                    .query("SELECT COUNT(EvolveEinvoice_ID) AS count FROM EvolveEinvoice WHERE EvolveEinvoice_Number LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1061: Error while getting E-Invoice List Count " + error.message);
            return new Error(" EERR1061: Error while getting E-Invoice List Count " + error.message);
        }
    },

    getEInvoiceList: async function (start, length, search) {
        try {
                return await Evolve.SqlPool.request()
                    .input('start', Evolve.Sql.Int, start)
                    .input('length', Evolve.Sql.Int, length)
                    .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                    .query("SELECT ei.*, ed.EvolveDocument_Name FROM EvolveEinvoice ei,EvolveDocument ed WHERE ei.EvolveDocument_ID = ed.EvolveDocument_ID AND ei.EvolveEinvoice_Number LIKE @search ORDER BY ei.EvolveEinvoice_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1062: Error while getting E-Invoice List " + error.message);
            return new Error(" EERR1062: Error while getting E-Invoice List " + error.message);
        }
    },
    getSingleEinvoiceList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoice_ID', Evolve.Sql.Int, data.EvolveEinvoice_ID)
                .query("SELECT ei.*, ed.EvolveDocument_Name FROM EvolveEinvoice ei, EvolveDocument ed WHERE ed.EvolveDocument_ID = ei.EvolveDocument_ID AND EvolveEinvoice_ID = @EvolveEinvoice_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Single Evolve Invoice data " + error.message);
            return new Error(" EERR1063: Error while getting Single Evolve Invoice data " + error.message);
        }
    }, 
    getEinvoiceItemList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoice_ID', Evolve.Sql.Int, data.EvolveEinvoice_ID)
                .query("SELECT * FROM EvolveEinvoiceItemList WHERE EvolveEinvoice_ID = @EvolveEinvoice_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Single Evolve Invoice Item data " + error.message);
            return new Error(" EERR1063: Error while getting Single Evolve Invoice Item data " + error.message);
        }
    },
    updateEinvoiceColumn: async function (data) {
        try {
                let sqlQuery = "UPDATE EvolveEinvoice SET " + data.Key + " = '" +data.Value + "' WHERE EvolveEinvoice_ID = " + data.EvolveEinvoice_ID;
                console.log(sqlQuery);
                return await Evolve.SqlPool.request().query(sqlQuery)

        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while Update EInvoice Column value " + error.message);
            return new Error(" EERR1063: Error while Update EInvoice Column value " + error.message);
        }
    },
    getSingleEinvoiceLineID: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceLine_ID', Evolve.Sql.Int, data.EvolveEinvoiceLine_ID)
                .query("SELECT * FROM EvolveEinvoiceItemList WHERE EvolveEinvoiceLine_ID = @EvolveEinvoiceLine_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Single Evolve Invoice Item data " + error.message);
            return new Error(" EERR1063: Error while getting Single Evolve Invoice Item data " + error.message);
        }
    },
    updateEinvoiceLineColumn: async function (data) {
        try {
                let sqlQuery = "UPDATE EvolveEinvoiceItemList SET " + data.Key + " = '" +data.Value + "' WHERE EvolveEinvoiceLine_ID = " + data.EvolveEinvoiceLine_ID;
                console.log(sqlQuery);
                return await Evolve.SqlPool.request().query(sqlQuery)

        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while Update EInvoice Line Column value " + error.message);
            return new Error(" EERR1063: Error while Update EInvoice Line Column value " + error.message);
        }
    },
    

}
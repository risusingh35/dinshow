'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getGspList: async function () {
        try {
            return await Evolve.SqlPool.request()
                // .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveGSP");
        } catch (error) {
            Evolve.Log.error("EERR32451: Error while getting Gsp List " + error.message);
            return new Error("EERR32451: Error while getting Gsp List " + error.message);
        }
    },
    getCustomerCountList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveSupplier_ID) AS 'CustomerCount' FROM EvolveSupplier");
        } catch (error) {
            Evolve.Log.error("EERR32452: Error while getting Customer List " + error.message);
            return new Error("EERR32452: Error while getting Customer List " + error.message);
        }
    },
    getTotalEInvoiceProcess: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveEinvoice_ID) AS 'Count' FROM EvolveEinvoice WHERE EvolveEinvoice_Status = 'PROCESS'");
        } catch (error) {
            Evolve.Log.error("EERR32453: Error while getting Total E-Invoice Process List " + error.message);
            return new Error("EERR32453: Error while getting Total E-Invoice Process List " + error.message);
        }
    },
    getTotalEInvoiceError: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveEinvoice_ID) AS 'Count' FROM EvolveEinvoice WHERE EvolveEinvoice_Status = 'ERROR'");
        } catch (error) {
            Evolve.Log.error("EERR32454 : Error while getting Total E-Invoice Error List " + error.message);
            return new Error("EERR32454 : Error while getting Total E-Invoice Error List " + error.message);
        }
    },
    getCompletedInvoiceList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT count(DISTINCT einv.EvolveInvoice_Number) 'Total_Invoice', (SELECT count(DISTINCT EvolveInvoice_Number) from EvolveInvoice where cast(EvolveInvoice_CreatedAt as Date) = cast(getdate() as Date)) 'Today', (SELECT count(DISTINCT EvolveInvoice_Number)  from EvolveInvoice where MONTH(EvolveInvoice_CreatedAt) = MONTH(getdate()))'Current_month', (SELECT count(DISTINCT EvolveInvoice_Number) from EvolveInvoice where EvolveInvoice_CreatedAt>= DATEADD(wk,DATEDIFF(wk,0,getdate()),0))'Current_WEEK', (SELECT count(DISTINCT EvolveInvoice_Number)  FROM EvolveInvoice WHERE DATEPART(m, EvolveInvoice_CreatedAt) = DATEPART(m, DATEADD(m, -1, getdate())))'Last_month' from EvolveInvoice as einv");
        } catch (error) {
            Evolve.Log.error("EERR32455 : Error while getting completed and total  invoice count  " + error.message);
            return new Error("EERR32455 : Error while getting completed and total  invoice count  " + error.message);
        }
    },
    getLastMonthEInvoiceProcess: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveEinvoice_ID) AS 'Count' FROM EvolveEinvoice WHERE EvolveEinvoice_Status = 'PROCESS' AND EvolveEinvoice_CreatedAt >= DATEADD(day,-30, GETDATE())");
        } catch (error) {
            Evolve.Log.error("EERR32456 : Error while getting last month E-Invoice Process List " + error.message);
            return new Error("EERR32456 : Error while getting last month E-Invoice Process List " + error.message);
        }
    },
    getLastWeekEInvoiceProcess: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveEinvoice_ID) AS 'Count' FROM EvolveEinvoice WHERE EvolveEinvoice_Status = 'PROCESS' AND EvolveEinvoice_CreatedAt >= DATEADD(day,-7, GETDATE())");
        } catch (error) {
            Evolve.Log.error("EERR32457: Error while getting last week E-Invoice Process List " + error.message);
            return new Error("EERR32457: Error while getting last week E-Invoice Process List " + error.message);
        }
    },
    getTodayEInvoiceProcess: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveEinvoice_ID) AS 'Count' FROM EvolveEinvoice WHERE EvolveEinvoice_Status = 'PROCESS' AND convert(varchar, EvolveEinvoice_CreatedAt, 1) = convert(varchar, getdate(), 1)");
        } catch (error) {
            Evolve.Log.error("EERR32458 : Error while getting todays E-Invoice Process List " + error.message);
            return new Error("EERR32458 : Error while getting todays E-Invoice Process List " + error.message);
        }
    },
    getLastMonthEInvoiceError: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveEinvoice_ID) AS 'Count' FROM EvolveEinvoice WHERE EvolveEinvoice_Status = 'ERROR' AND EvolveEinvoice_CreatedAt >= DATEADD(day,-30, GETDATE())");
        } catch (error) {
            Evolve.Log.error("EERR32459: Error while getting last month E-Invoice Error List " + error.message);
            return new Error("EERR32459: Error while getting last month E-Invoice Error List " + error.message);
        }
    },
    getLastWeekEInvoiceError: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveEinvoice_ID) AS 'Count' FROM EvolveEinvoice WHERE EvolveEinvoice_Status = 'ERROR' AND  EvolveEinvoice_CreatedAt >= DATEADD(day,-7, GETDATE())");
        } catch (error) {
            Evolve.Log.error("EERR32461: Error while getting last week E-Invoice Error List " + error.message);
            return new Error("EERR32461: Error while getting last week E-Invoice Error List " + error.message);
        }
    },
    getTodaysEInvoiceError: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveEinvoice_ID) AS 'Count' FROM EvolveEinvoice WHERE EvolveEinvoice_Status = 'ERROR' AND  convert(varchar, EvolveEinvoice_CreatedAt, 1) = convert(varchar, getdate(), 1)");
        } catch (error) {
            Evolve.Log.error("EERR32460 : Error while getting todays E-Invoice Error List " + error.message);
            return new Error("EERR32460 : Error while getting todays E-Invoice Error List " + error.message);
        }
    },
    getLastTenDayData: async function () {
        try {
            return await Evolve.SqlPool.request()
                // .query("SELECT convert(varchar, ei.EvolveInvoice_CreatedAt, 23) as 'date', COUNT(DISTINCT ei.EvolveInvoice_Number) as 'count' FROM EvolveInvoice ei WHERE ei.EvolveInvoice_CreatedAt >= DATEADD(day,-10, GETDATE())  GROUP BY ei.EvolveInvoice_CreatedAt");
                .query("SELECT convert(varchar, ei.EvolveInvoice_CreatedAt, 23) as 'date', COUNT(DISTINCT ei.EvolveInvoice_Number) as 'count' FROM EvolveInvoice ei WHERE ei.EvolveInvoice_CreatedAt >= DATEADD(day,-9, GETDATE())  GROUP BY (convert(varchar, ei.EvolveInvoice_CreatedAt, 23))");
        } catch (error) {
            Evolve.Log.error("EERR32460 : Error while getting last 10 day data " + error.message);
            return new Error("EERR32460 : Error while getting last 10 day data " + error.message);
        }
    },
    getUnitWiseData: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT eu.EvolveUnit_Name, eu.EvolveUnit_Code, (select count(DISTINCT ei.EvolveInvoice_Number) from EvolveInvoice ei where eu.EvolveUnit_ID = ei.EvolveUnit_ID) 'Total_Invoice',(select count(DISTINCT ei.EvolveInvoice_Number) from EvolveInvoice ei where cast(ei.EvolveInvoice_CreatedAt as Date) = cast(getdate() as Date) and eu.EvolveUnit_ID = ei.EvolveUnit_ID) 'Today',(select count(DISTINCT ei.EvolveInvoice_Number) from EvolveInvoice ei where MONTH(ei.EvolveInvoice_CreatedAt) = MONTH(getdate()) and eu.EvolveUnit_ID = ei.EvolveUnit_ID)'Current_month' , (select count(DISTINCT ei.EvolveInvoice_Number) from EvolveInvoice ei where ei.EvolveInvoice_CreatedAt>= DATEADD(wk,DATEDIFF(wk,0,getdate()),0) and eu.EvolveUnit_ID = ei.EvolveUnit_ID)'Current_WEEK', (select count(DISTINCT ei.EvolveInvoice_Number) from EvolveInvoice ei where DATEPART(m, ei.EvolveInvoice_CreatedAt) = DATEPART(m, DATEADD(m, -1, getdate())) and eu.EvolveUnit_ID = ei.EvolveUnit_ID)'Last_month' FROM EvolveUnit eu");
        } catch (error) {
            Evolve.Log.error("EERR32460 : Error while getting unit wise data " + error.message);
            return new Error("EERR32460 : Error while getting unit wise data " + error.message);
        }
    },
    getIOQueue: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveIO_ID) AS count FROM EvolveIO");
        } catch (error) {
            Evolve.Log.error("EERR32460 : Error while getting unit wise data " + error.message);
            return new Error("EERR32460 : Error while getting unit wise data " + error.message);
        }
    },

} 
'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getDocumentTypeList: async function () {
        try {
          
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveDocumentType");

        } catch (error) {
            Evolve.Log.error(" EERR2085: Error while getting Document Type List "+error.message);
            return new Error(" EERR2085: Error while getting Document Type List "+error.message);
        }
    },
    getSupplierList: async function () {
        try {
        

            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveSupplier");

        } catch (error) {
            Evolve.Log.error(" EERR2086: Error while getting Supplier List "+error.message);
            return new Error(" EERR2086: Error while getting Supplier List "+error.message);
        }
    },

    getGateTransactionList: async function () {
        try {
          
            console.log("get table called ")

            return await Evolve.SqlPool.request()
                .query("SELECT ege.*  ,  edtype.EvolveDocumentType_Name   , es.EvolveSupplier_Name  FROM EvolveGateEntry ege , EvolveDocumentType edtype , EvolveSupplier es  WHERE ege.EvolveGateEntry_DocumentTypeID = edtype.EvolveDocumentType_ID  AND es.EvolveSupplier_ID =  ege.EvolveGateEntry_SupplierID");

        } catch (error) {
            Evolve.Log.error(" EERR2087: Error while getting Gate Transaction List "+error.message);
            return new Error(" EERR2087: Error while getting Gate Transaction List "+error.message);
        }
    },

    addGateEntry: async function (data , EvolveGateEntry_QRCode) {
        try {

            console.log("correct services is called dddddddddddddddddddddd>>> ")

            console.log("doc id is >>>>. " ,  data)
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();


        
             return await Evolve.SqlPool.request()

            


        
                .input('EvolveGateEntry_QRCode', Evolve.Sql.NVarChar, "GE"+EvolveGateEntry_QRCode)

                .input('EvolveGateEntry_DocumentTypeID', Evolve.Sql.Int, data.EvolveGateEntry_DocumentTypeID)
				.input('EvolveGateEntry_InOut', Evolve.Sql.NVarChar, data.EvolveGateEntry_InOut)
				.input('EvolveGateEntry_SupplierID', Evolve.Sql.Int, data.EvolveGateEntry_SupplierID)
				.input('EvolveGateEntry_TruckNumber', Evolve.Sql.NVarChar, data.EvolveGateEntry_TruckNumber)
				.input('EvolveGateEntry_DriverName', Evolve.Sql.NVarChar, data.EvolveGateEntry_DriverName)
				.input('EvolveGateEntry_DriverContact', Evolve.Sql.NVarChar, data.EvolveGateEntry_DriverContact)
			    .input('EvolveGateEntry_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGateEntry_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGateEntry_UpdatedAt', Evolve.Sql.Int, dataTime)
                .input('EvolveGateEntry_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                
                .query("INSERT INTO EvolveGateEntry (EvolveGateEntry_QRCode , EvolveGateEntry_DocumentTypeID, EvolveGateEntry_InOut, EvolveGateEntry_SupplierID, EvolveGateEntry_TruckNumber, EvolveGateEntry_DriverName,EvolveGateEntry_DriverContact, EvolveGateEntry_CreatedUser, EvolveGateEntry_CreatedAt, EvolveGateEntry_UpdatedAt, EvolveGateEntry_UpdatedUser) VALUES (@EvolveGateEntry_QRCode,@EvolveGateEntry_DocumentTypeID, @EvolveGateEntry_InOut, @EvolveGateEntry_SupplierID, @EvolveGateEntry_TruckNumber, @EvolveGateEntry_DriverName, @EvolveGateEntry_DriverContact, @EvolveGateEntry_CreatedUser, @EvolveGateEntry_CreatedAt, @EvolveGateEntry_UpdatedAt, @EvolveGateEntry_UpdatedUser)  ")

        } catch (error) {
            Evolve.Log.error(" EERR2088: Error while adding Gate Entry "+error.message);
            return new Error(" EERR2088: Error while adding Gate Entry "+error.message);
        }
    },

    getTopEntry: async function () {
        try {
          
            console.log("get table called ")

            return await Evolve.SqlPool.request()
                .query("SELECT TOP(1) [EvolveGateEntry_QRCode] FROM [EvolveGateEntry] ORDER BY [EvolveGateEntry_ID] DESC ");
                

             

        } catch (error) {
            Evolve.Log.error(" EERR2089: Error while getting Top Entry "+error.message);
            return new Error(" EERR2089: Error while getting Top Entry "+error.message);
        }
    },
    getIdCount: async function () {
        try {
          
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveGateEntry_ID) as count FROM EvolveGateEntry ");
             } catch (error) {
            Evolve.Log.error(" EERR2090: Error while getting Id Count "+error.message);
            return new Error(" EERR2090: Error while getting Id Count "+error.message);
        }
    },

    getSingleEnteryData: async function (EvolveGateEntry_ID) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT ege.*  ,  edtype.EvolveDocumentType_Name   , es.EvolveSupplier_Name  FROM EvolveGateEntry ege , EvolveDocumentType edtype , EvolveSupplier es  WHERE ege.EvolveGateEntry_DocumentTypeID = edtype.EvolveDocumentType_ID  AND es.EvolveSupplier_ID =  ege.EvolveGateEntry_SupplierID  AND ege.EvolveGateEntry_ID = "+EvolveGateEntry_ID);
            } catch (error) {
            Evolve.Log.error(" EERR2091: Error while getting Single Entery Data "+error.message);
            return new Error(" EERR2091: Error while getting Single Entery Data "+error.message);
        }
    },





}
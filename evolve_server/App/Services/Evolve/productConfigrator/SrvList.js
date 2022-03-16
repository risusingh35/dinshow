'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProductListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
            .query("SELECT COUNT(EvolveProductConfigrator_ID) as count FROM EvolveProductConfigrator WHERE EvolveProductConfigrator_Code LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Product List "+error.message);
            return new Error(" EERR####: Error while get Product List "+error.message);
        }
    }, 

    getProductList: async function (start, length ,search) {
        console.log(start, length ,search);
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

                .query("SELECT EPC.*,EP.EvolveProduct_Name,EPCLR.EvolveProductColour_Name,EPD.EvolveProductDesign_Name,EC.EvolveCustomer_Name FROM EvolveProductConfigrator AS EPC LEFT JOIN EvolveProduct AS EP ON EP.EvolveProduct_ID = EPC.EvolveProduct_ID LEFT JOIN EvolveProductColour AS EPCLR ON EPCLR.EvolveProductColour_ID = EPC.EvolveProductColour_ID LEFT JOIN EvolveProductDesign AS EPD ON EPD.EvolveProductDesign_ID = EPC.EvolveProductDesign_ID LEFT JOIN EvolveCustomer AS EC ON EC.EvolveCustomer_ID = EPC.EvolveCustomer_ID AND EPC.EvolveProductConfigrator_Code LIKE @search ORDER BY EPC.EvolveProductConfigrator_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")

                

            } catch (error) {                

            Evolve.Log.error(" EERR####: Error while get Product list"+error.message);
            return new Error(" EERR####: Error while get Product list"+error.message);
        }
    },

    	// -- Product  List ---
	
    getProductNameList: async function () {
      
    try {
        return await Evolve.SqlPool.request()
            .query("SELECT * FROM EvolveProduct")
        } catch (error) {                
        Evolve.Log.error(" EERR####: Error while get  Product  list"+error.message);
        return new Error(" EERR####: Error while get  Product  list"+error.message);
    }
    },

    
// -- Product Colour List --

    getProductColourList: async function () {
      
    try {
        return await Evolve.SqlPool.request()
            .query("SELECT * FROM EvolveProductColour")
        } catch (error) {                
        Evolve.Log.error(" EERR####: Error while get  Product Color  list"+error.message);
        return new Error(" EERR####: Error while get  Product Color list"+error.message);
        }
    },

// -- Product Design List ----

    getProductDesignList: async function () {
  
    try {
        return await Evolve.SqlPool.request()
            .query("SELECT * FROM EvolveProductDesign")
        } catch (error) {                
        Evolve.Log.error(" EERR####: Error while get  Product Design list"+error.message);
        return new Error(" EERR####: Error while get  Product Design list"+error.message);
        }
    },

// -- Customer List ---

    getCustomerNameList: async function () {
  
    try {
        return await Evolve.SqlPool.request()
            .query("SELECT * FROM EvolveCustomer")
        } catch (error) {                
        Evolve.Log.error(" EERR####: Error while get  Customer list"+error.message);
        return new Error(" EERR####: Error while get  Customer  list"+error.message);
        }
    },

    SearchAllData: async function (con) {
        try {
                return await Evolve.SqlPool.request()

                .query("SELECT EPC.*,EP.EvolveProduct_Name,EPCLR.EvolveProductColour_Name,EPD.EvolveProductDesign_Name,EC.EvolveCustomer_Name FROM EvolveProductConfigrator AS EPC LEFT JOIN EvolveProduct AS EP ON EP.EvolveProduct_ID = EPC.EvolveProduct_ID LEFT JOIN EvolveProductColour AS EPCLR ON EPCLR.EvolveProductColour_ID = EPC.EvolveProductColour_ID LEFT JOIN EvolveProductDesign AS EPD ON EPD.EvolveProductDesign_ID = EPC.EvolveProductDesign_ID LEFT JOIN EvolveCustomer AS EC ON EC.EvolveCustomer_ID = EPC.EvolveCustomer_ID "+ con +" ")
                

            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while Searching Data"+error.message);
            return new Error(" EERR####: Error while Searching Data"+error.message);
        }
    },

   
}
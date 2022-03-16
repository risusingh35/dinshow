'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    

// --- Insert  Configrator ----
		
    getProductNameList: async function () {
      
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveProduct")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get  Product  list"+error.message);
            return new Error(" EERR####: Error while get  Product  list"+error.message);
        }
    },

    getProductTypeList: async function () {
      
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveProductType")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get  Product Type list"+error.message);
            return new Error(" EERR####: Error while get  Product Type list"+error.message);
        }
    },

    getProductGradeList: async function () {
      
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveProductGrade")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get  Product Grade list"+error.message);
            return new Error(" EERR####: Error while get  Product Grade list"+error.message);
        }
    },
	
    getProductColorList: async function () {
      
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveProductColour")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get  Product Color  list"+error.message);
            return new Error(" EERR####: Error while get  Product Color list"+error.message);
        }
    },
	
    getProductDesignList: async function () {
      
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveProductDesign")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get  Product Design list"+error.message);
            return new Error(" EERR####: Error while get  Product Design list"+error.message);
        }
    },

    getCustomerList: async function () {
      
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveCustomer")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get  Customer list"+error.message);
            return new Error(" EERR####: Error while get  Customer  list"+error.message);
        }
    },
       
    getItemList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveItem")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get  Bom  list"+error.message);
            return new Error(" EERR####: Error while get  Bom   list"+error.message);
        }
    },

    getUomList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveUom")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get Uom list"+error.message);
            return new Error(" EERR####: Error while get Uom list"+error.message);
        }
    },

    getProductQuality: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("select * from EvolveProductQuality")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get  Bom  list"+error.message);
            return new Error(" EERR####: Error while get  Bom   list"+error.message);
        }
    },

    checkProductExistOrNot: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProductDesign_ID', Evolve.Sql.NVarChar, data.EvolveProductDesign_ID)
                .input('EvolveProduct_ID', Evolve.Sql.NVarChar, data.EvolveProduct_ID)
                .input('EvolveProductColour_ID', Evolve.Sql.NVarChar, data.EvolveProductColour_ID)
                .input('EvolveProductDesign_Grade', Evolve.Sql.NVarChar, data.EvolveProductDesign_Grade)
                .input('EvolveProductDesign_Width', Evolve.Sql.NVarChar, data.EvolveProductDesign_Width)
                .input('EvolveProductConfigrator_Thikness', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_Thikness)
                .query("select * from EvolveProductConfigrator where (EvolveProductDesign_ID = @EvolveProductDesign_ID AND EvolveProduct_ID = @EvolveProduct_ID AND EvolveProductColour_ID = @EvolveProductColour_ID AND EvolveProductDesign_Grade = @EvolveProductDesign_Grade AND EvolveProductConfigrator_Width = @EvolveProductDesign_Width AND EvolveProductConfigrator_Thikness = @EvolveProductConfigrator_Thikness)")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while Check product"+error.message);
            return new Error(" EERR####: Error while Check product"+error.message);
        }
    },
    
    getProductSeq: async function (data) {
      
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProduct_ID', Evolve.Sql.NVarChar, data.EvolveProduct_ID)
                .query("SELECT EvolveProduct_Sequence as seq FROM EvolveProduct where EvolveProduct_ID = @EvolveProduct_ID")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get  Product  list"+error.message);
            return new Error(" EERR####: Error while get  Product  list"+error.message);
        }
    },

    createProductConfigrator: async function (data) {
        console.log("the data of add configrator",data);
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProductConfigrator_Code', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_Code)
                .input('EvolveProduct_ID', Evolve.Sql.Int, data.EvolveProduct_ID)
                .input('EvolveProductColour_ID', Evolve.Sql.Int, data.EvolveProductColour_ID)
                .input('EvolveProductDesign_ID', Evolve.Sql.Int, data.EvolveProductDesign_ID)
                .input('EvolveProductDesign_Grade', Evolve.Sql.Int, data.EvolveProductDesign_Grade)
                .input('EvolveProductConfigrator_Type', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_Type)
                .input('EvolveProductConfigrator_Width', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_Width)
                .input('EvolveProductConfigrator_Thikness', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_Thikness)
                .input('EvolveProductConfigrator_Process', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_Process)
                .input('EvolveProductConfigrator_Jercy', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_Jercy)
                .input('EvolveProductConfigrator_Paper', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_Paper)
                .input('EvolveProductConfigrator_TopCoat', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_TopCoat)
                .input('EvolveProductConfigrator_FoamCoat', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_FoamCoat)
                .input('EvolveProductConfigrator_AdhesiveCoat', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_AdhesiveCoat)
                .input('EvolveProductConfigrator_SemiFG', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_SemiFG)
                .input('EvolveProductConfigrator_Lacquer', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_Lacquer)
                .input('EvolveProductConfigrator_Inline', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_Inline)
                .input('EvolveProductConfigrator_CreatedAt', Evolve.Sql.NVarChar,datetime)
                .input('EvolveProductConfigrator_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                
                .query('INSERT INTO EvolveProductConfigrator(EvolveProduct_ID,EvolveProductConfigrator_Code,EvolveProductColour_ID,EvolveProductDesign_ID, EvolveProductDesign_Grade , EvolveProductConfigrator_Type,EvolveProductConfigrator_Width ,EvolveProductConfigrator_Thikness ,EvolveProductConfigrator_Process ,EvolveProductConfigrator_Jercy ,EvolveProductConfigrator_Paper ,EvolveProductConfigrator_TopCoat,EvolveProductConfigrator_FoamCoat,EvolveProductConfigrator_AdhesiveCoat,EvolveProductConfigrator_SemiFG,EvolveProductConfigrator_Lacquer,EvolveProductConfigrator_Inline,EvolveProductConfigrator_CreatedAt,EvolveProductConfigrator_CreatedUser)VALUES (@EvolveProduct_ID,@EvolveProductConfigrator_Code,@EvolveProductColour_ID,@EvolveProductDesign_ID,@EvolveProductDesign_Grade ,@EvolveProductConfigrator_Type ,@EvolveProductConfigrator_Width ,@EvolveProductConfigrator_Thikness ,@EvolveProductConfigrator_Process ,@EvolveProductConfigrator_Jercy ,@EvolveProductConfigrator_Paper ,@EvolveProductConfigrator_TopCoat,@EvolveProductConfigrator_FoamCoat,@EvolveProductConfigrator_AdhesiveCoat,@EvolveProductConfigrator_SemiFG ,@EvolveProductConfigrator_Lacquer,@EvolveProductConfigrator_Inline,@EvolveProductConfigrator_CreatedAt,	@EvolveProductConfigrator_CreatedUser);select @@IDENTITY AS \'inserted_id\'');

        } catch (error) {
            Evolve.Log.error(" EERR1174: Erorr while adding Configrator "+error.message);
            return new Error(" EERR1174: Erorr while adding Configrator "+error.message);
        }
    },

    createProductConfigratorDetails: async function (data,EvolveUser_ID) {
        console.log("createProductConfigratorDetailsSRVLIST",data);
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProductConfigrator_ID', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_ID)
                .input('EvolveProductConfigratorDetails_Desc1', Evolve.Sql.NVarChar, data.EvolveProductConfigratorDetails_Desc1)
                .input('EvolveProductConfigratorDetails_Desc2', Evolve.Sql.NVarChar, data.EvolveProductConfigratorDetails_Desc2)
                .input('EvolveProductConfigratorDetails_Item', Evolve.Sql.NVarChar, data.EvolveProductConfigratorDetails_Item)
                .input('EvolveProductConfigratorDetails_Code', Evolve.Sql.NVarChar, data.EvolveProductConfigratorDetails_Code)
                .input('EvolveProductConfigratorDetails_Status', Evolve.Sql.NVarChar, data.EvolveProductConfigratorDetails_Status)
                .input('EvolveProductConfigratorDetails_Message', Evolve.Sql.NVarChar, data.EvolveProductConfigratorDetails_Message)
                .input('EvolveProductConfigratorDetails_Path', Evolve.Sql.NVarChar, data.EvolveProductConfigratorDetails_Path)
                .input('EvolveProductConfigratorDetails_Gsm', Evolve.Sql.NVarChar, data.EvolveProductConfigratorDetails_Gsm)
                .input('EvolveProductConfigratorDetails_CreatedAt', Evolve.Sql.NVarChar,datetime)
                .input('EvolveProductConfigratorDetails_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                
                .query('INSERT INTO EvolveProductConfigratorDetails (EvolveProductConfigrator_ID , EvolveProductConfigratorDetails_Desc1 ,EvolveProductConfigratorDetails_Desc2 ,EvolveProductConfigratorDetails_Item ,EvolveProductConfigratorDetails_Code ,EvolveProductConfigratorDetails_Status ,EvolveProductConfigratorDetails_Message ,EvolveProductConfigratorDetails_Path , EvolveProductConfigratorDetails_Gsm , EvolveProductConfigratorDetails_CreatedAt ,EvolveProductConfigratorDetails_CreatedUser) VALUES (@EvolveProductConfigrator_ID ,@EvolveProductConfigratorDetails_Desc1,@EvolveProductConfigratorDetails_Desc2 ,@EvolveProductConfigratorDetails_Item ,@EvolveProductConfigratorDetails_Code ,@EvolveProductConfigratorDetails_Status ,@EvolveProductConfigratorDetails_Message , @EvolveProductConfigratorDetails_Path , @EvolveProductConfigratorDetails_Gsm ,@EvolveProductConfigratorDetails_CreatedAt ,@EvolveProductConfigratorDetails_CreatedUser)');

        } catch (error) {
            Evolve.Log.error(" EERR1174: Erorr while adding Configrator Details "+error.message);
            return new Error(" EERR1174: Erorr while adding Configrator Details "+error.message);
        }
    },

    getConfigratorDetailList: async function (data) {
      
        try {
            console.log("the data",data);
            return await Evolve.SqlPool.request()
                .input('EvolveProductConfigrator_ID', Evolve.Sql.NVarChar, data.EvolveProductConfigrator_ID)
                .query("select * from EvolveProductConfigratorDetails where EvolveProductConfigrator_ID = @EvolveProductConfigrator_ID")
            } catch (error) {                
            Evolve.Log.error(" EERR####: Error while get Product Configrator Detail list"+error.message);
            return new Error(" EERR####: Error while get Product Configrator Detail list"+error.message);
        }
    },

    updateProductConfigratorDetails: async function (data) {
        console.log("updateProductConfigratorDetails",data);
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProductConfigratorDetails_ID', Evolve.Sql.Int, data.EvolveProductConfigratorDetails_ID)
                .input('EvolveProductConfigratorDetails_Status', Evolve.Sql.NVarChar, data.EvolveProductConfigratorDetails_Status)
                .input('EvolveProductConfigratorDetails_Message', Evolve.Sql.NVarChar, data.EvolveProductConfigratorDetails_Message)
                .input('EvolveProductConfigratorDetails_UpdatedAt', Evolve.Sql.NVarChar,datetime)
                .input('EvolveProductConfigratorDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                
                .query('UPDATE EvolveProductConfigratorDetails SET EvolveProductConfigratorDetails_Status = @EvolveProductConfigratorDetails_Status ,EvolveProductConfigratorDetails_Message = @EvolveProductConfigratorDetails_Message,EvolveProductConfigratorDetails_UpdatedAt = EvolveProductConfigratorDetails_UpdatedAt ,EvolveProductConfigratorDetails_UpdatedUser = EvolveProductConfigratorDetails_UpdatedUser WHERE EvolveProductConfigratorDetails_ID = @EvolveProductConfigratorDetails_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1174: Erorr while Update Configrator Details "+error.message);
            return new Error(" EERR1174: Erorr while Update Configrator Details "+error.message);
        }
    },
  
}   
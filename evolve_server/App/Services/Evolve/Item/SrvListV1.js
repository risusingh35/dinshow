'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

            .query(" SELECT COUNT(EvolveItem_ID) as count FROM EvolveItem WHERE EvolveItem_Name LIKE @search ")

        } catch (error) {
          Evolve.Log.error(" EERR32606: Error while getting Item List Count "+error.message);
          return new Error(" EERR32606: Error while getting Item List Count "+error.message);
        }
      },

    getItemsList: async function (start ,length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start',Evolve.Sql.Int,start)
                .input('length',Evolve.Sql.Int,length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

                .query(" SELECT ei.EvolveItem_ID, ei.EvolveItem_Name, ei.EvolveItem_Code, ei.EvolveItem_Desc, ei.EvolveCustItem_Code, ei.EvolveUnit_ID , ei.EvolveSticker_ID , eu.EvolveUnit_Code, es.EvolveSticker_Name  FROM EvolveItem ei LEFT JOIN EvolveSticker es ON es.EvolveSticker_ID = ei.EvolveSticker_ID LEFT JOIN EvolveUnit eu ON ei.EvolveUnit_ID = eu.EvolveUnit_ID WHERE EvolveItem_Name LIKE @search ORDER BY EvolveItem_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR32607: Error while getting Item List "+error.message);
            return new Error(" EERR32607: Error while getting Item List "+error.message);
        }
    },

    getModelList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query(" SELECT EvolveModel_ID, EvolveModel_Name FROM EvolveModel ");
        } catch (error) {
            Evolve.Log.error(" EERR32608: Error while getting Model List "+error.message);
            return new Error(" EERR32608: Error while getting Model List "+error.message);
        }
    },

    getUnitList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query(" SELECT EvolveUnit_ID, EvolveUnit_Code FROM EvolveUnit ");
        } catch (error) {
            Evolve.Log.error(" EERR32609: Error while getting Unit List "+error.message);
            return new Error(" EERR32609: Error while getting Unit List "+error.message);
        }
    },

    getLabelFormateList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query(" SELECT EvolveSticker_ID, EvolveSticker_Name FROM EvolveSticker ");
        } catch (error) {
            Evolve.Log.error(" EERR32610: Error while getting Item List "+error.message);
            return new Error(" EERR32610: Error while getting Item List "+error.message);
        }
    },

    addtItem : async function (data) {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveItem_Name', Evolve.Sql.NVarChar , data.EvolveItem_Name)
            .input('EvolveItem_Code', Evolve.Sql.NVarChar , data.EvolveItem_Code)
            .input('EvolveItem_Desc', Evolve.Sql.NVarChar , data.EvolveItem_Desc)
            .input('EvolveCustItem_Code', Evolve.Sql.NVarChar , data.EvolveCustItem_Code)
            .input('EvolveUnit_ID', Evolve.Sql.NVarChar , data.EvolveUnit_ID)
            .input('EvolveSticker_ID', Evolve.Sql.NVarChar , data.EvolveSticker_ID)
            .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, dateTime)
            .input('EvolveItem_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveItem_CreatedAt', Evolve.Sql.NVarChar, dateTime)
            .input('EvolveItem_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query(" INSERT INTO EvolveItem (EvolveItem_Name, EvolveItem_Code, EvolveItem_Desc, EvolveCustItem_Code, EvolveUnit_ID, EvolveSticker_ID, EvolveItem_UpdateAt, EvolveItem_UpdateUser, EvolveItem_CreatedAt, EvolveItem_CreatedUser) VALUES (@EvolveItem_Name, @EvolveItem_Code, @EvolveItem_Desc, @EvolveCustItem_Code, @EvolveUnit_ID, @EvolveSticker_ID, @EvolveItem_UpdateAt, @EvolveItem_UpdateUser, @EvolveItem_CreatedAt, @EvolveItem_CreatedUser) ");
        } catch (error) {
            Evolve.Log.error(" EERR32611: Error while Add Item "+error.message);
            return new Error(" EERR32611: Error while Add Item "+error.message);
        }
    },

    editItem : async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveItem_ID', Evolve.Sql.NVarChar , data.EvolveItem_ID)
            .input('EvolveItem_Name', Evolve.Sql.NVarChar , data.EvolveItem_Name)
            .input('EvolveItem_Code', Evolve.Sql.NVarChar , data.EvolveItem_Code)
            .input('EvolveItem_Desc', Evolve.Sql.NVarChar , data.EvolveItem_Desc)
            .input('EvolveCustItem_Code', Evolve.Sql.NVarChar , data.EvolveCustItem_Code)
            .input('EvolveUnit_ID', Evolve.Sql.NVarChar , data.EvolveUnit_ID)
            .input('EvolveSticker_ID', Evolve.Sql.NVarChar , data.EvolveSticker_ID)
            .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, dateTime)
            .input('EvolveItem_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query(" UPDATE EvolveItem SET EvolveItem_Name = @EvolveItem_Name, EvolveItem_Code = @EvolveItem_Code, EvolveItem_Desc = @EvolveItem_Desc, EvolveCustItem_Code = @EvolveCustItem_Code, EvolveUnit_ID = @EvolveUnit_ID, EvolveSticker_ID = @EvolveSticker_ID, EvolveItem_UpdateAt = @EvolveItem_UpdateAt, EvolveItem_UpdateUser = @EvolveItem_UpdateUser WHERE EvolveItem_ID = @EvolveItem_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32612: Error while Edit Item "+error.message);
            return new Error(" EERR32612: Error while Edit Item "+error.message);
        }
    },

    deleteItem : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveItem_ID', Evolve.Sql.Int , data.EvolveItem_ID)
                .query(" DELETE FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32613: Error while Delete Item "+error.message);
            return new Error(" EERR32613: Error while Delete Item "+error.message);
        }
    },

    checkItemCodeExists : async function (EvolveItem_Code) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveItem_Code', Evolve.Sql.NVarChar , EvolveItem_Code)
                .query(" SELECT EvolveItem_ID FROM EvolveItem WHERE EvolveItem_Code = @EvolveItem_Code ");
        } catch (error) {
            Evolve.Log.error(" EERR32614: Error while Check Item Code Exists "+error.message);
            return new Error(" EERR32614: Error while Check Item Code Exists "+error.message);
        }
    },

    getUnitId : async function (EvolveUnit_Code) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveUnit_Code', Evolve.Sql.NVarChar , EvolveUnit_Code)
                .query(" SELECT EvolveUnit_ID FROM EvolveUnit WHERE EvolveUnit_Code = @EvolveUnit_Code ");
        } catch (error) {
            Evolve.Log.error(" EERR32615: Error while Check Item Code Exists "+error.message);
            return new Error(" EERR32615: Error while Check Item Code Exists "+error.message);
        }
    },

    updateItemCsv : async function (data, user) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveItem_Name', Evolve.Sql.NVarChar, data['ITEM NAME'])
            .input('EvolveItem_Code', Evolve.Sql.NVarChar, data['ITEM CODE'])
            .input('EvolveItem_Desc', Evolve.Sql.NVarChar, data['ADIENT ITEM DESCRIPTION'])
            .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
            .input('EvolveCustItem_Code', Evolve.Sql.NVarChar , data['CUST ITEM CODE'])
            .input('EvolveItem_UpdateUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, datetime)
                .query(" UPDATE EvolveItem SET EvolveItem_Name = @EvolveItem_Name, EvolveItem_Desc =  @EvolveItem_Desc, EvolveUnit_ID = @EvolveUnit_ID, EvolveCustItem_Code = @EvolveCustItem_Code, EvolveItem_UpdateUser = @EvolveItem_UpdateUser, EvolveItem_UpdateAt = @EvolveItem_UpdateAt WHERE EvolveItem_Code = @EvolveItem_Code ");
        } catch (error) {
            Evolve.Log.error(" EERR32616: Error while Update Item csv "+error.message);
            return new Error(" EERR32616: Error while Update Item csv "+error.message);
        }
    },

    checkModelCode : async function (EvolveModel_Code) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveModel_Code', Evolve.Sql.NVarChar , EvolveModel_Code)
                .query(" SELECT EvolveModel_ID FROM EvolveModel WHERE EvolveModel_Code = @EvolveModel_Code ");
        } catch (error) {
            Evolve.Log.error(" EERR32617: Error while Check Model Code "+error.message);
            return new Error(" EERR32617: Error while Check Model Code "+error.message);
        }
    },

    updateModelCsv : async function (data, user) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveModel_ID', Evolve.Sql.NVarChar , data.EvolveModel_ID)
            .input('EvolveModel_Code', Evolve.Sql.NVarChar , data['MODEL CODE'])
            .input('EvolveModel_Name', Evolve.Sql.NVarChar , data['MODEL NAME'])
            .input('EvolveModel_Desc', Evolve.Sql.NVarChar , data['MODEL DESC'])
            .input('EvolveModel_OnOff', Evolve.Sql.NVarChar , data['MODEL ON/OFF'])
            .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
            .input('EvolveModel_UpdatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveModel_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(" UPDATE EvolveModel SET  EvolveModel_Name = @EvolveModel_Name , EvolveModel_Desc = @EvolveModel_Desc, EvolveModel_OnOff = @EvolveModel_OnOff, EvolveUnit_ID = @EvolveUnit_ID, EvolveModel_UpdatedUser = @EvolveModel_UpdatedUser, EvolveModel_UpdatedAt = @EvolveModel_UpdatedAt WHERE EvolveModel_ID = @EvolveModel_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32618: Error while Update Model Csv "+error.message);
            return new Error(" EERR32618: Error while Update Model Csv "+error.message);
        }
    },

    addModelCsv : async function (data, user) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveModel_Code', Evolve.Sql.NVarChar , data['MODEL CODE'])
            .input('EvolveModel_Name', Evolve.Sql.NVarChar , data['MODEL NAME'])
            .input('EvolveModel_Desc', Evolve.Sql.NVarChar , data['MODEL DESC'])
            .input('EvolveModel_OnOff', Evolve.Sql.NVarChar , data['MODEL ON/OFF'])
            .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
            .input('EvolveModel_CreatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveModel_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveModel_UpdatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveModel_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(" INSERT INTO EvolveModel (EvolveModel_Code, EvolveModel_Name, EvolveModel_Desc, EvolveModel_OnOff, EvolveUnit_ID, EvolveModel_CreatedUser, EvolveModel_CreatedAt, EvolveModel_UpdatedUser, EvolveModel_UpdatedAt) VALUES (@EvolveModel_Code, @EvolveModel_Name, @EvolveModel_Desc, @EvolveModel_OnOff, @EvolveUnit_ID, @EvolveModel_CreatedUser, @EvolveModel_CreatedAt, @EvolveModel_UpdatedUser, @EvolveModel_UpdatedAt) ");
        } catch (error) {
            Evolve.Log.error(" EERR32619: Error while Add Model Csv "+error.message);
            return new Error(" EERR32619: Error while Add Model Csv "+error.message);
        }
    },

    addItemCsv : async function (data, user) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveItem_Name', Evolve.Sql.Int , data['ITEM NAME'])
            .input('EvolveItem_Code', Evolve.Sql.NVarChar , data['ITEM CODE'])
            .input('EvolveItem_Desc', Evolve.Sql.NVarChar , data['ADIENT ITEM DESCRIPTION'])
            .input('EvolveUnit_ID', Evolve.Sql.Int , data.EvolveUnit_ID)
            .input('EvolveCustItem_Code', Evolve.Sql.NVarChar , data['CUST ITEM CODE'])
            .input('EvolveItem_CreatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveItem_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveItem_UpdateUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, datetime)
            .query(" INSERT INTO EvolveItem (EvolveItem_Name, EvolveItem_Code, EvolveItem_Desc, EvolveUnit_ID, EvolveCustItem_Code, EvolveItem_CreatedUser, EvolveItem_CreatedAt, EvolveItem_UpdateUser, EvolveItem_UpdateAt) values (@EvolveItem_Name, @EvolveItem_Code, @EvolveItem_Desc, @EvolveUnit_ID, @EvolveCustItem_Code, @EvolveItem_CreatedUser, @EvolveItem_CreatedAt, @EvolveItem_UpdateUser, @EvolveItem_UpdateAt) ");
        } catch (error) {
            Evolve.Log.error(" EERR32620: Error while Add Item Csv "+error.message);
            return new Error(" EERR32620: Error while Add Item Csv "+error.message);
        }
    },

    checkSerialPrefix : async function (EvolveModel_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveModel_ID', Evolve.Sql.Int , EvolveModel_ID)
                .query(" SELECT EvolveSerial_ID FROM EvolveSerial WHERE EvolveModel_ID = @EvolveModel_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32621: Error while Check Serial Prefix "+error.message);
            return new Error(" EERR32621: Error while Check Serial Prefix "+error.message);
        }
    },
        

    updateSerialPrefix : async function (data, user) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveSerial_Code', Evolve.Sql.NVarChar , data['MODEL CODE'])
            .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar , data['MODEL SR PREFIX'])  
            .input('EvolveSerial_Width', Evolve.Sql.Int , data['MODEL SR WIDTH'])
            .input('EvolveModel_ID', Evolve.Sql.Int , data.EvolveModel_ID)
            .input('EvolveUnit_ID', Evolve.Sql.Int , data.EvolveUnit_ID)
            .input('EvolveSerial_UpdatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveSerial_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(" UPDATE EvolveSerial SET EvolveSerial_Code = @EvolveSerial_Code, EvolveSerial_Prefix = @EvolveSerial_Prefix, EvolveSerial_Width = @EvolveSerial_Width, EvolveUnit_ID = @EvolveUnit_ID, EvolveSerial_UpdatedUser = @EvolveSerial_UpdatedUser, EvolveSerial_UpdatedAt = @EvolveSerial_UpdatedAt WHERE EvolveModel_ID = @EvolveModel_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32622: Error while Update Serial Prefix "+error.message);
            return new Error(" EERR32622: Error while Update Serial Prefix "+error.message);
        }
    },

    addSerialPrefix : async function (data, user) {
        try {
            let EvolveSerial_Reset = "";
            for (let i = 0 ; i < parseInt(data['MODEL SR WIDTH']) ; i++){
                EvolveSerial_Reset = EvolveSerial_Reset + '9';
            }
            console.log(EvolveSerial_Reset , 'EvolveSerial_Reset>>>>>>>>');
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveSerial_Code', Evolve.Sql.NVarChar , data['MODEL CODE'])
            .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar , data['MODEL SR PREFIX'])  
            .input('EvolveSerial_Width', Evolve.Sql.Int , data['MODEL SR WIDTH'])  
            .input('EvolveModel_ID', Evolve.Sql.Int , data.EvolveModel_ID)
            .input('EvolveUnit_ID', Evolve.Sql.Int , data.EvolveUnit_ID)
            .input('EvolveSerial_Start', Evolve.Sql.Int , 1)
            .input('EvolveSerial_Next', Evolve.Sql.Int , 1)
            .input('EvolveSerial_Reset', Evolve.Sql.Int , EvolveSerial_Reset)
            .input('EvolveSerial_CreatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveSerial_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveSerial_UpdatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveSerial_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(" INSERT INTO EvolveSerial (EvolveSerial_Code, EvolveSerial_Prefix, EvolveSerial_Width, EvolveModel_ID, EvolveUnit_ID, EvolveSerial_Start, EvolveSerial_Next, EvolveSerial_Reset, EvolveSerial_CreatedUser, EvolveSerial_CreatedAt, EvolveSerial_UpdatedUser, EvolveSerial_UpdatedAt ) VALUES (@EvolveSerial_Code, @EvolveSerial_Prefix, @EvolveSerial_Width, @EvolveModel_ID, @EvolveUnit_ID, @EvolveSerial_Start, @EvolveSerial_Next, @EvolveSerial_Reset , @EvolveSerial_CreatedUser, @EvolveSerial_CreatedAt, @EvolveSerial_UpdatedUser, @EvolveSerial_UpdatedAt ) ");
        } catch (error) {
            Evolve.Log.error(" EERR32623: Error while Add Serial Prefix "+error.message);
            return new Error(" EERR32623: Error while Add Serial Prefix "+error.message);
        }
    },

    checkItemToModel : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveModel_ID', Evolve.Sql.Int , data.EvolveModel_ID)
            .input('EvolveItem_ID', Evolve.Sql.Int , data.EvolveItem_ID)
                .query(" SELECT EvolveItemToModel_ID FROM EvolveItemToModel WHERE EvolveModel_ID = @EvolveModel_ID AND EvolveItem_ID = @EvolveItem_ID");
        } catch (error) {
            Evolve.Log.error(" EERR32624: Error while Check Item To Model "+error.message);
            return new Error(" EERR32624: Error while Check Item To Model "+error.message);
        }
    },

    UpdateItemToModel : async function(data, user) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveItemToModel_ID', Evolve.Sql.Int , data.EvolveItemToModel_ID)
            .input('EvolveModel_ID', Evolve.Sql.Int , data.EvolveModel_ID)
            .input('EvolveItem_ID', Evolve.Sql.Int , data.EvolveItem_ID)
            .input('EvolveUnit_ID', Evolve.Sql.Int , data.EvolveUnit_ID)
            .input('EvolveItemToModel_UpdatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveItemToModel_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(" UPDATE EvolveItemToModel SET EvolveModel_ID = @EvolveModel_ID, EvolveItem_ID = @EvolveItem_ID, EvolveUnit_ID = @EvolveUnit_ID, EvolveItemToModel_UpdatedUser = @EvolveItemToModel_UpdatedUser, EvolveItemToModel_UpdatedAt = @EvolveItemToModel_UpdatedAt WHERE EvolveItemToModel_ID = @EvolveItemToModel_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32625: Error while Update Item To Model "+error.message);
            return new Error(" EERR32625: Error while Update Item To Model "+error.message);
        }
    },

    addItemToModel : async function (data, user) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveModel_ID', Evolve.Sql.Int , data.EvolveModel_ID)
            .input('EvolveItem_ID', Evolve.Sql.Int , data.EvolveItem_ID)
            .input('EvolveUnit_ID', Evolve.Sql.Int , data.EvolveUnit_ID)
            .input('EvolveItemToModel_CreatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveItemToModel_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveItemToModel_UpdatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveItemToModel_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(" INSERT INTO EvolveItemToModel (EvolveModel_ID, EvolveItem_ID, EvolveUnit_ID, EvolveItemToModel_CreatedUser, EvolveItemToModel_CreatedAt, EvolveItemToModel_UpdatedUser, EvolveItemToModel_UpdatedAt ) VALUES (@EvolveModel_ID, @EvolveItem_ID, @EvolveUnit_ID, @EvolveItemToModel_CreatedUser, @EvolveItemToModel_CreatedAt, @EvolveItemToModel_UpdatedUser, @EvolveItemToModel_UpdatedAt ) ");
        } catch (error) {
            Evolve.Log.error(" EERR32626: Error while Add Item To Model "+error.message);
            return new Error(" EERR32626: Error while Add Item To Model "+error.message);
        }
    },

    updateSerialPrefixV2 : async function (data, user) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveSerial_Code', Evolve.Sql.NVarChar , data['MODEL SR PREFIX'])
            .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar , data['MODEL SR PREFIX'])  
            .input('EvolveSerial_Width', Evolve.Sql.Int , data['MODEL SR WIDTH'])
            .input('EvolveModel_ID', Evolve.Sql.Int , data.EvolveItem_ID)
            .input('EvolveUnit_ID', Evolve.Sql.Int , data.EvolveUnit_ID)
            .input('EvolveSerial_UpdatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveSerial_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(" UPDATE EvolveSerial SET EvolveSerial_Code = @EvolveSerial_Code, EvolveSerial_Prefix = @EvolveSerial_Prefix, EvolveSerial_Width = @EvolveSerial_Width, EvolveUnit_ID = @EvolveUnit_ID, EvolveSerial_UpdatedUser = @EvolveSerial_UpdatedUser, EvolveSerial_UpdatedAt = @EvolveSerial_UpdatedAt WHERE EvolveModel_ID = @EvolveModel_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32622: Error while Update Serial Prefix "+error.message);
            return new Error(" EERR32622: Error while Update Serial Prefix "+error.message);
        }
    },

    addSerialPrefixV2 : async function (data, user) {
        try {
            let EvolveSerial_Reset = "";
            for (let i = 0 ; i < parseInt(data['MODEL SR WIDTH']) ; i++){
                EvolveSerial_Reset = EvolveSerial_Reset + '9';
            }
            console.log(EvolveSerial_Reset , 'EvolveSerial_Reset>>>>>>>>');
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveSerial_Code', Evolve.Sql.NVarChar , data['MODEL SR PREFIX'])
            .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar , data['MODEL SR PREFIX'])  
            .input('EvolveSerial_Width', Evolve.Sql.Int , data['MODEL SR WIDTH'])  
            .input('EvolveModel_ID', Evolve.Sql.Int , data.EvolveItem_ID)
            .input('EvolveUnit_ID', Evolve.Sql.Int , data.EvolveUnit_ID)
            .input('EvolveSerial_Start', Evolve.Sql.Int , 1)
            .input('EvolveSerial_Next', Evolve.Sql.Int , 1)
            .input('EvolveSerial_Reset', Evolve.Sql.Int , EvolveSerial_Reset)
            .input('EvolveSerial_CreatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveSerial_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveSerial_UpdatedUser', Evolve.Sql.Int, user.EvolveUser_ID)
            .input('EvolveSerial_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(" INSERT INTO EvolveSerial (EvolveSerial_Code, EvolveSerial_Prefix, EvolveSerial_Width, EvolveModel_ID, EvolveUnit_ID, EvolveSerial_Start, EvolveSerial_Next, EvolveSerial_Reset, EvolveSerial_CreatedUser, EvolveSerial_CreatedAt, EvolveSerial_UpdatedUser, EvolveSerial_UpdatedAt ) VALUES (@EvolveSerial_Code, @EvolveSerial_Prefix, @EvolveSerial_Width, @EvolveModel_ID, @EvolveUnit_ID, @EvolveSerial_Start, @EvolveSerial_Next, @EvolveSerial_Reset , @EvolveSerial_CreatedUser, @EvolveSerial_CreatedAt, @EvolveSerial_UpdatedUser, @EvolveSerial_UpdatedAt ) ");
        } catch (error) {
            Evolve.Log.error(" EERR32623: Error while Add Serial Prefix "+error.message);
            return new Error(" EERR32623: Error while Add Serial Prefix "+error.message);
        }
    }

}
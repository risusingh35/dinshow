'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


  getItemGroupListCount : async function (search) {
    try {
      return await Evolve.SqlPool.request()
      .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

        .query("SELECT COUNT(ei.EvolveItem_ID) as count  FROM EvolveItem ei ,  EvolveUom euom WHERE euom.EvolveUom_ID = ei.EvolveUom_ID  AND ei.EvolveItem_Code LIKE @search   ")
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },

  getItemsList : async function (start ,length,search) {
    try {
        return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

            .query("SELECT ei.*, euom.EvolveUom_Uom, etc.EvolveTaxClass_Code  FROM EvolveItem ei, EvolveUom euom, EvolveTaxClass etc WHERE euom.EvolveUom_ID = ei.EvolveUom_ID  AND ei.EvolveTaxClass_ID = etc.EvolveTaxClass_ID AND ei.EvolveItem_Code LIKE @search ORDER BY ei.EvolveItem_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
    } catch (error) {
        Evolve.Log.error(" EERR1240: Error while getting Item List "+error.message);
        return new Error(" EERR1240: Error while getting Item List "+error.message);
    }
},


    checkItemExist : async function (EvolveItem_Code) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveItem_Code', Evolve.Sql.NVarChar, EvolveItem_Code)

            .query(" SELECT * FROM EvolveItem WHERE EvolveItem_Code = @EvolveItem_Code ")

        } catch (error) {
          Evolve.Log.error(" EERR32606: Error while check item code "+error.message);
          return new Error(" EERR32606: Error while check item code "+error.message);
        }
      },

      updateItemMaster : async function (EvolveUser_ID, data) {
        // console.log("update item>>>>>>", data);
        try {
          let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
          let EvolveItem_Desc  = data['Desc1'] + data['Desc2']
          return await Evolve.SqlPool.request()
          .input('EvolveItem_ID', Evolve.Sql.NVarChar, data['EvolveItem_ID'])
          .input('EvolveItem_Code', Evolve.Sql.NVarChar, data['Item'])
          .input('EvolveItem_Desc', Evolve.Sql.NVarChar, EvolveItem_Desc)
          .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
          // .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
          .input('EvolveTaxClass_ID', Evolve.Sql.Int, data.EvolveTaxClass_ID)
          .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, datetime)
          .input('EvolveItem_UpdateUser', Evolve.Sql.Int, EvolveUser_ID)

            .query(" UPDATE EvolveItem SET EvolveItem_Code = @EvolveItem_Code, EvolveItem_Desc = @EvolveItem_Desc, EvolveUom_ID = @EvolveUom_ID , EvolveTaxClass_ID = @EvolveTaxClass_ID, EvolveItem_UpdateAt = @EvolveItem_UpdateAt, EvolveItem_UpdateUser = @EvolveItem_UpdateUser WHERE EvolveItem_ID = @EvolveItem_ID")

        } catch (error) {
          Evolve.Log.error(" EERR32606: Error while update item master "+error.message);
          return new Error(" EERR32606: Error while update item master "+error.message);
        }
      },
      
      addItemMaster : async function (EvolveUser_ID, data) {
        // console.log("add item>>>>>>>", data);
        try {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        let EvolveItem_Desc  = data['Desc1'] + data['Desc2']
          return await Evolve.SqlPool.request()
          .input('EvolveItem_Code', Evolve.Sql.NVarChar, data['Item'])
          .input('EvolveItem_Desc', Evolve.Sql.NVarChar, EvolveItem_Desc)
          .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
          // .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
          .input('EvolveTaxClass_ID', Evolve.Sql.Int, data.EvolveTaxClass_ID)
          .input('EvolveItem_CreatedAt', Evolve.Sql.NVarChar, datetime)
          .input('EvolveItem_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
          .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, datetime)
          .input('EvolveItem_UpdateUser', Evolve.Sql.Int, EvolveUser_ID)



            .query(" INSERT INTO EvolveItem (EvolveItem_Code, EvolveItem_Desc, EvolveUom_ID, EvolveTaxClass_ID, EvolveItem_CreatedAt, EvolveItem_CreatedUser, EvolveItem_UpdateAt, EvolveItem_UpdateUser) VALUES (@EvolveItem_Code, @EvolveItem_Desc, @EvolveUom_ID, @EvolveTaxClass_ID, @EvolveItem_CreatedAt, @EvolveItem_CreatedUser, @EvolveItem_UpdateAt, @EvolveItem_UpdateUser) ;select @@IDENTITY AS \'inserted_id\' ")

        } catch (error) {
          Evolve.Log.error(" EERR32606: Error while add item code "+error.message);
          return new Error(" EERR32606: Error while add item code "+error.message);
        }
      },
      

      checkUomExist : async function (EvolveUom_Uom) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveUom_Uom', Evolve.Sql.NVarChar, EvolveUom_Uom)

            .query(" SELECT * FROM EvolveUom WHERE EvolveUom_Uom = @EvolveUom_Uom ")

        } catch (error) {
          Evolve.Log.error(" EERR32606: Error while check uom code "+error.message);
          return new Error(" EERR32606: Error while check uom code "+error.message);
        }
      },

      addUom : async function (EvolveUom_Uom) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveUom_Uom', Evolve.Sql.NVarChar, EvolveUom_Uom)

            .query(" INSERT INTO EvolveUom (EvolveUom_Uom) VALUES (@EvolveUom_Uom) ;select @@IDENTITY AS \'inserted_id\' ")

        } catch (error) {
          Evolve.Log.error(" EERR32606: Error while add uom "+error.message);
          return new Error(" EERR32606: Error while add uom "+error.message);
        }
      },

      getUnitId : async function (EvolveUnit_Code) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveUnit_Code', Evolve.Sql.NVarChar, EvolveUnit_Code)

            .query(" SELECT * FROM EvolveUnit WHERE EvolveUnit_Code = @EvolveUnit_Code ")

        } catch (error) {
          Evolve.Log.error(" EERR32606: Error while check unit code "+error.message);
          return new Error(" EERR32606: Error while check unit code "+error.message);
        }
      },

      checkTaxClass : async function (EvolveTaxClass_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveTaxClass_Code', Evolve.Sql.NVarChar, EvolveTaxClass_Code)
                .query(' SELECT * FROM EvolveTaxClass WHERE EvolveTaxClass_Code = @EvolveTaxClass_Code ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while check tax class code "+error.message);
            return new Error(" EERR####: Erorr while check tax class code "+error.message);
        }
    },

    addTaxClass : async function (EvolveUser_ID, data) {
		let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveTaxClass_Code', Evolve.Sql.NVarChar, data['Tax Class'])
				.input('EvolveTaxClass_CreatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveTaxClass_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
				.input('EvolveTaxClass_UpdatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveTaxClass_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)

				.query("INSERT INTO EvolveTaxClass (EvolveTaxClass_Code, EvolveTaxClass_CreatedAt, EvolveTaxClass_CreatedUser, EvolveTaxClass_UpdatedUser, EvolveTaxClass_UpdatedAt) VALUES (@EvolveTaxClass_Code, @EvolveTaxClass_CreatedAt, @EvolveTaxClass_CreatedUser, @EvolveTaxClass_UpdatedUser, @EvolveTaxClass_UpdatedAt) ;select @@IDENTITY AS \'inserted_id\' ");

		} catch (error) {
			Evolve.Log.error(" EERR####: Erorr while add tax class code is exist or not " + error.message);
			return new Error(" EERR####: Erorr while add tax class code is exist or not " + error.message);
		}
	  },

    createItemUnitLink : async function (EvolveUser_ID, EvolveItem_ID, EvolveUnit_ID) {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      try {
        return await Evolve.SqlPool.request()
          .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
          .input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)
          .input('EvolveItemUnitLink_CreatedAt', Evolve.Sql.NVarChar, datetime)
          .input('EvolveItemUnitLink_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
          .input('EvolveItemUnitLink_UpdatedAt', Evolve.Sql.NVarChar, datetime)
          .input('EvolveItemUnitLink_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
  
          .query("INSERT INTO EvolveItemUnitLink (EvolveItem_ID, EvolveUnit_ID, EvolveItemUnitLink_CreatedAt, EvolveItemUnitLink_CreatedUser, EvolveItemUnitLink_UpdatedUser, EvolveItemUnitLink_UpdatedAt) VALUES (@EvolveItem_ID, @EvolveUnit_ID, @EvolveItemUnitLink_CreatedAt, @EvolveItemUnitLink_CreatedUser, @EvolveItemUnitLink_UpdatedUser, @EvolveItemUnitLink_UpdatedAt) ");
  
      } catch (error) {
        Evolve.Log.error(" EERR####: Erorr while create item unit link " + error.message);
        return new Error(" EERR####: Erorr while create item unit link " + error.message);
      }
    },

    checkItemUnitLinkExist : async function (EvolveItem_ID, EvolveUnit_ID) {
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
          .input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)
          .query(' SELECT * FROM EvolveItemUnitLink WHERE EvolveItem_ID = @EvolveItem_ID AND EvolveUnit_ID = @EvolveUnit_ID ');

      } catch (error) {
          Evolve.Log.error(" EERR####: Erorr while check item Unit Link "+error.message);
          return new Error(" EERR####: Erorr while check item Unit Link "+error.message);
      }
  }, 
}
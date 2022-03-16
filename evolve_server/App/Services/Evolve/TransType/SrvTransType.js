'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  addTransType: async function (data) {
    try {


      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input('EvolveTranstype_code', Evolve.Sql.NVarChar, data.EvolveTranstype_code)
        .input('EvolveTranstype_desc', Evolve.Sql.NVarChar, data.EvolveTranstype_desc)
       
        .input('EvolveTranstype_createduser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveTranstype_createdat', Evolve.Sql.NVarChar, dataTime)
       
        .query('INSERT INTO EvolveTranstype (EvolveTranstype_code , EvolveTranstype_desc, EvolveTranstype_createduser, EvolveTranstype_createdat ) VALUES(@EvolveTranstype_code , @EvolveTranstype_desc,@EvolveTranstype_createduser,@EvolveTranstype_createdat )')
    } catch (error) {
      Evolve.Log.error(" EERR1438: Error while adding Trans Type "+error.message);
      return new Error(" EERR1438: Error while adding Trans Type "+error.message);
    }
  },

  getTransTypeListCount: async function (search) {
    try {
        return await Evolve.SqlPool.request()
        .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
        .query(' select COUNT(EvolveTranstype_ID) as count  from EvolveTranstype where EvolveTranstype_code Like @search');
    } catch (error) {
        Evolve.Log.error(" Error while getting Trans Type List Count "+error.message);
        return new Error(" Error while getting Trans Type Count "+error.message);
    }
},

  getTransTypeList: async function (start,length,search) {
    try {
      return await Evolve.SqlPool.request()
      .input('start', Evolve.Sql.Int, start)
      .input('length', Evolve.Sql.Int, length)
      .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

      .query("SELECT * FROM EvolveTranstype WHERE EvolveTranstype_code LIKE @search ORDER BY EvolveTranstype_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");

    } catch (error) {
      Evolve.Log.error(" EERR1439: Error while getting Trans Type List "+error.message);
      return new Error(" EERR1439: Error while getting Trans Type List "+error.message);
    }
  },

  getSingleTransTypeData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .query("SELECT  EvolveTranstype_ID , EvolveTranstype_code , EvolveTranstype_desc FROM EvolveTranstype  WHERE    EvolveTranstype_ID =" + data.EvolveTranstype_ID)
    } catch (error) {
      Evolve.Log.error(" EERR1440: Error while getting Single Trans Type Data "+error.message);
      return new Error(" EERR1440: Error while getting Single Trans Type Data "+error.message);  
    }
  },

  updateTransType: async function (data) {
    try {
      
      console.log(data)
  
      return await Evolve.SqlPool.request()

        .input('EvolveTranstype_ID', Evolve.Sql.Int, data.EvolveTranstype_ID)
        .input('EvolveTranstype_code', Evolve.Sql.NVarChar, data.EvolveTranstype_code)
        .input('EvolveTranstype_desc', Evolve.Sql.NVarChar, data.EvolveTranstype_desc)
     
        .query('UPDATE EvolveTranstype SET EvolveTranstype_code=@EvolveTranstype_code,EvolveTranstype_desc=@EvolveTranstype_desc   WHERE  EvolveTranstype_ID = @EvolveTranstype_ID');

    } catch (error) {
      Evolve.Log.error(" EERR1441: Error while updating Trans Type "+error.message);
      return new Error(" EERR1441: Error while updating Trans Type "+error.message);
    }
  },
  deleteTransType: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .query("Delete From EvolveTranstype WHERE EvolveTranstype_ID=" + data.id)
    } catch (error) {
      Evolve.Log.error(" EERR1442: Error while deleting Trans Type "+error.message);
      return new Error(" EERR1442: Error while deleting Trans Type "+error.message);
    }
  },









}
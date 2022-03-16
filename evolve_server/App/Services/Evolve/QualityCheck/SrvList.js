'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getQCTemplateListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
            .query('SELECT COUNT(EvolveQCTemp_ID) AS count  FROM EvolveQCTemp WHERE EvolveQCTemp_Name LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR1389: Error while getting QC Template List Count "+error.message);
            return new Error(" EERR1389: Error while getting QC Template List Count "+error.message);
        }
    },
    getQCTemplateList: async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
                .query('SELECT * FROM EvolveQCTemp WHERE EvolveQCTemp_Name LIKE @search ORDER BY EvolveQCTemp_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1390: Error while getting QC Template List "+error.message);
            return new Error(" EERR1390: Error while getting QC Template List "+error.message);
        }
    },
    addQCTemplate: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveQCTemp_Name', Evolve.Sql.NVarChar, data.EvolveQCTemp_Name)
                .input('EvolveQCTemp_Desc', Evolve.Sql.NVarChar, data.EvolveQCTemp_Desc)
                .input('EvolveQCTemp_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveQCTemp_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveQCTemp (EvolveQCTemp_Name, EvolveQCTemp_Desc, EvolveQCTemp_CreatedAt, EvolveQCTemp_CreatedUser) VALUES (@EvolveQCTemp_Name, @EvolveQCTemp_Desc, @EvolveQCTemp_CreatedAt, @EvolveQCTemp_CreatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR1391: Error while adding QC Template "+error.message);
            return new Error(" EERR1391: Error while adding QC Template "+error.message);
        }
    },
    getSingleQCTemplate: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveQCTemp_ID', Evolve.Sql.Int, data.EvolveQCTemp_ID)
                .query('SELECT * FROM EvolveQCTemp WHERE EvolveQCTemp_ID = @EvolveQCTemp_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1392: Error while getting Single QC Template "+error.message);
            return new Error(" EERR1392: Error while getting Single QC Template "+error.message);
        }
    },
    updateQCTempalte: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveQCTemp_ID', Evolve.Sql.NVarChar, data.EvolveQCTemp_ID)
                .input('EvolveQCTemp_Name', Evolve.Sql.NVarChar, data.EvolveQCTemp_Name)
                .input('EvolveQCTemp_Desc', Evolve.Sql.NVarChar, data.EvolveQCTemp_Desc)
                .query('UPDATE EvolveQCTemp SET EvolveQCTemp_Name = @EvolveQCTemp_Name, EvolveQCTemp_Desc = @EvolveQCTemp_Desc WHERE EvolveQCTemp_ID = @EvolveQCTemp_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1393: Error while updating QC Template "+error.message);
            return new Error(" EERR1393: Error while updating QC Template "+error.message);
        }
    },
    getAllQCTemplateList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select * from EvolveQCTemp')
        } catch (error) {
            Evolve.Log.error(" EERR1394: Error while getting All QC Template List "+error.message);
            return new Error(" EERR1394: Error while getting All QC Template List "+error.message);
        }
    },
    addQCValue: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveQCTemp_ID', Evolve.Sql.Int, data.EvolveQCTemp_ID)
                .input('EvolveQCVal_Seq', Evolve.Sql.Int, data.EvolveQCVal_Seq)
                .input('EvolveQCVal_Desc', Evolve.Sql.NVarChar, data.EvolveQCVal_Desc)
                .input('EvolveQCVal_Type', Evolve.Sql.NVarChar, data.EvolveQCVal_Type)
                .input('EvolveQCVal_Value', Evolve.Sql.NVarChar, data.EvolveQCVal_Value)
                .input('EvolveQCVal_Compare_Type', Evolve.Sql.NVarChar, data.EvolveQCVal_Compare_Type)
                .input('EvolveQCVal_Compare_Value', Evolve.Sql.NVarChar, data.EvolveQCVal_Compare_Value)
                .input('EvolveQCVal_Required', Evolve.Sql.Bit, data.EvolveQCVal_Required)
                .input('EvolveQCVal_Auto', Evolve.Sql.Bit, data.EvolveQCVal_Auto)
                .input('EvolveQCVal_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveQCVal_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveQCVal (EvolveQCTemp_ID,EvolveQCVal_Seq,EvolveQCVal_Desc,EvolveQCVal_Type,EvolveQCVal_Value, EvolveQCVal_Compare_Type, EvolveQCVal_Compare_Value, EvolveQCVal_Required, EvolveQCVal_Auto, EvolveQCVal_CreatedAt, EvolveQCVal_CreatedUser) VALUES (@EvolveQCTemp_ID, @EvolveQCVal_Seq, @EvolveQCVal_Desc, @EvolveQCVal_Type, @EvolveQCVal_Value, @EvolveQCVal_Compare_Type, @EvolveQCVal_Compare_Value, @EvolveQCVal_Required, @EvolveQCVal_Auto, @EvolveQCVal_CreatedAt, @EvolveQCVal_CreatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR1395: Error while adding QC Value "+error.message);
            return new Error(" EERR1395: Error while adding QC Value "+error.message);
        }
    },
    getSingleQCTempProcessList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveQCTemp_ID', Evolve.Sql.Int, data.EvolveQCTemp_ID)
                .query('SELECT eqcv.EvolveQCVal_ID, eqcv.EvolveQCVal_Desc, eqcv.EvolveQCVal_Seq, eqct.EvolveQCTemp_Name FROM EvolveQCVal eqcv, EvolveQCTemp eqct WHERE eqcv.EvolveQCTemp_ID = @EvolveQCTemp_ID AND eqcv.EvolveQCTemp_ID = eqct.EvolveQCTemp_ID  ORDER BY eqcv.EvolveQCVal_ID ASC');
        } catch (error) {
            Evolve.Log.error(" EERR1396: Error while getting Single QC Temp Process List "+error.message);
            return new Error(" EERR1396: Error while getting Single QC Temp Process List "+error.message);
        }
    },
    getQCVSequenceNo: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveQCTemp_ID', Evolve.Sql.Int, data.EvolveQCTemp_ID)
                .query('SELECT COUNT(EvolveQCTemp_ID) AS sequenceNo FROM EvolveQCVal WHERE EvolveQCTemp_ID = @EvolveQCTemp_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1397: Error while getting QCV Sequence No "+error.message);
            return new Error(" EERR1397: Error while getting QCV Sequence No "+error.message);
        }
    },


}
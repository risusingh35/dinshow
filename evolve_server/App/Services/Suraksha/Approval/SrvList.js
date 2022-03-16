'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {



    getRoleList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveRole_ID, EvolveRole_Name  FROM EvolveRole");
        } catch (error) {
            Evolve.Log.error(" EERR32785: Error while get role list " + error.message);
            return new Error(" EERR32785: Error while get role list " + error.message);
        }
    },
    getUserList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
             .query("SELECT eu.EvolveUser_Name ,eu.EvolveUser_ID   FROM EvolveUser eu , EvolveUserRoleLink eurl  WHERE eurl.EvolveRole_ID = @EvolveRole_ID  AND eurl.EvolveUser_ID = eu.EvolveUser_ID");
        } catch (error) {
            Evolve.Log.error(" EERR32786: Error while get user list " + error.message);
            return new Error(" EERR32786: Error while get user list " + error.message);
        }
    },

    checkMatrixName: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveApproval_name', Evolve.Sql.NVarChar, data.EvolveApproval_name)
             .query("SELECT * FROM  EvolveApproval  WHERE EvolveApproval_name=@EvolveApproval_name");
        } catch (error) {
            Evolve.Log.error("EERR32787 : Error while check matrix name " + error.message);
            return new Error("EERR32787 : Error while check matrix name " + error.message);
        }
    },
    addMatrixData: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveApproval_seq', Evolve.Sql.Int, data.EvolveApproval_seq)
                .input('EvolveRole_id', Evolve.Sql.Int, data.EvolveRole_id)
                .input('EvolveApproval_primaryUser_id', Evolve.Sql.Int, data.EvolveApproval_primaryUser_id)
                .input('EvolveApproval_secondUser_id', Evolve.Sql.Int, data.EvolveApproval_secondUser_id)
                .input('EvolveApproval_tertiaryUser_id', Evolve.Sql.Int, data.EvolveApproval_tertiaryUser_id)

                .input('EvolveApproval_param', Evolve.Sql.Int, data.EvolveApproval_param)
                .input('EvolveApproval_name', Evolve.Sql.NVarChar, data.EvolveApproval_name)
        
                .input('EvolveApproval_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveApproval_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveApproval_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveApproval_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('INSERT INTO EvolveApproval (EvolveApproval_seq , EvolveRole_id ,EvolveApproval_primaryUser_id , EvolveApproval_secondUser_id,EvolveApproval_tertiaryUser_id, EvolveApproval_param, EvolveApproval_CreatedAt, EvolveApproval_CreatedUser, EvolveApproval_UpdatedAt, EvolveApproval_UpdatedUser,EvolveApproval_name) VALUES(@EvolveApproval_seq , @EvolveRole_id, @EvolveApproval_primaryUser_id ,@EvolveApproval_secondUser_id,@EvolveApproval_tertiaryUser_id, @EvolveApproval_param, @EvolveApproval_CreatedAt, @EvolveApproval_CreatedUser, @EvolveApproval_UpdatedAt, @EvolveApproval_UpdatedUser,@EvolveApproval_name)')
        } catch (error) {
            Evolve.Log.error(" EERR32788 : Error while add matrix data " + error.message);
            return new Error(" EERR32788 : Error while add matrix data" + error.message);
        }
    },
    getMatrixCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query(" SELECT   DISTINCT(eappo.EvolveApproval_name) , (SELECT COUNT(EvolveApproval_id)  FROM EvolveApproval eapp WHERE eapp.EvolveApproval_name = eappo.EvolveApproval_name   ) as 'rows'   FROM  EvolveApproval eappo WHERE eappo.EvolveApproval_name LIKE @search  ");
        } catch (error) {
            Evolve.Log.error(" EERR32789: Error while get matrix count " + error.message);
            return new Error(" EERR32789: Error while get matrix count " + error.message);
        }
    },
    getMatrixList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT   DISTINCT(eappo.EvolveApproval_name) , (SELECT COUNT(EvolveApproval_id)  FROM EvolveApproval eapp WHERE eapp.EvolveApproval_name = eappo.EvolveApproval_name   ) as 'rows'   FROM  EvolveApproval eappo WHERE eappo.EvolveApproval_name LIKE @search  ORDER BY eappo.EvolveApproval_name DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR32790: Error while getting matrix List " + error.message);
            return new Error(" EERR32790: Error while getting matrix List " + error.message);
        }
    },
    getSingleMatrixDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApproval_name', Evolve.Sql.NVarChar,data.EvolveApproval_name)
                .query("  SELECT eapr.*  ,er.EvolveRole_Name , (SELECT eu.EvolveUser_Name  FROM  EvolveUser eu WHERE eapr.EvolveApproval_primaryUser_id = eu.EvolveUser_ID) as 'EvolveApproval_PU' , (SELECT eu.EvolveUser_Name  FROM  EvolveUser eu WHERE eapr.EvolveApproval_secondUser_id = eu.EvolveUser_ID) as 'EvolveApproval_SU' , (SELECT eu.EvolveUser_Name  FROM  EvolveUser eu WHERE eapr.EvolveApproval_tertiaryUser_id = eu.EvolveUser_ID) as 'EvolveApproval_TU' FROM EvolveApproval eapr  , EvolveRole er WHERE eapr.EvolveRole_id = er.EvolveRole_ID AND    EvolveApproval_name=@EvolveApproval_name");
        } catch (error) {
            Evolve.Log.error(" EERR32791 : Error while get matrix details " + error.message);
            return new Error(" EERR32791 : Error while get matrix details " + error.message);
        }
    },
    deleteMatrixDetails : async function(data){
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApproval_name', Evolve.Sql.NVarChar,data.editedMatrixName)
                .query("DELETE FROM EvolveApproval WHERE EvolveApproval_name=@EvolveApproval_name");
        } catch (error) {
            Evolve.Log.error("EERR32792 : Error while delete matrix details " + error.message);
            return new Error("EERR32792 : Error while delete matrix details " + error.message);
        }


    },
    checkMatrixNameOnUpdate: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('editedMatrixName', Evolve.Sql.NVarChar, data.editedMatrixName)
            .input('EvolveApproval_name', Evolve.Sql.NVarChar, data.EvolveApproval_name)

             .query("SELECT * FROM  EvolveApproval  WHERE EvolveApproval_name != @editedMatrixName AND EvolveApproval_name=@EvolveApproval_name ");
        } catch (error) {
            Evolve.Log.error("EERR32793 : Error while check matrix name " + error.message);
            return new Error("EERR32793 : Error while check matrix name " + error.message);
        }
    },



}
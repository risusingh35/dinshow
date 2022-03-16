'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllReasonList: async function (start, length, search) {
        try {

            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query('SELECT * FROM EvolveReason WHERE EvolveReason_Name LIKE @search OR EvolveReason_Code LIKE @search ORDER BY EvolveReason_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1398: Error while getting All Reason List " + error.message);
            return new Error(" EERR1398: Error while getting All Reason List " + error.message);
        }
    },

    checkReason: async function (data) {
        try {
            
            return await Evolve.SqlPool.request()
                .input('EvolveReason_Code', Evolve.Sql.NVarChar, data.EvolveReason_Code)
                .query("SELECT COUNT(EvolveReason_ID) as count from EvolveReason WHERE EvolveReason_Code = @EvolveReason_Code")
        } catch (error) {
            Evolve.Log.error(" EERR1399: Error while check reason " + error.message);
            return new Error(" EERR1399: Error while check reason " + error.message);
        }
    },

    createReason: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveReason_Name', Evolve.Sql.NVarChar, data.EvolveReason_Name)
                .input('EvolveReason_Code', Evolve.Sql.NVarChar, data.EvolveReason_Code)
                .input('EvolveReason_Desc', Evolve.Sql.NVarChar, data.EvolveReason_Desc)
                .input('EvolveReason_Type', Evolve.Sql.NVarChar, data.EvolveReason_Type)
                .input('EvolveReason_IsParent', Evolve.Sql.Bit, data.EvolveReason_IsParent)
                // .input('EvolveReason_Colour', Evolve.Sql.NVarChar, data.EvolveReason_Colour)
                // .input('EvolveReason_Status', Evolve.Sql.Int, data.EvolveReason_Status)
                .query("INSERT INTO EvolveReason (EvolveReason_Name,EvolveReason_Code,EvolveReason_Desc,EvolveReason_Type,EvolveReason_IsParent) VALUES (@EvolveReason_Name,@EvolveReason_Code,@EvolveReason_Desc,@EvolveReason_Type,@EvolveReason_IsParent);select @@IDENTITY AS 'inserted_id'");
        } catch (error) {
            Evolve.Log.error(" EERR1399: Error while creating Reason " + error.message);
            return new Error(" EERR1399: Error while creating Reason " + error.message);
        }
    },

    reasonRules: async function (data) {
        try {
            if(data.EvolveReason_IsParent == true){
            return await Evolve.SqlPool.request()
                .input('EvolveReasonRules_IsScarpReq', Evolve.Sql.Bit, data.EvolveReasonRules_IsScarpReq)
                .input('EvolveReasonRules_IsCommentsReq', Evolve.Sql.Bit, data.EvolveReasonRules_IsCommentsReq)
                .input('EvolveReasonRules_IsQtyReq', Evolve.Sql.Bit, data.EvolveReasonRules_IsQtyReq)
                .input('EvolveReason_ID', Evolve.Sql.Int, data.EvolveReason_ID)
                // .input('EvolveReason_Colour', Evolve.Sql.NVarChar, data.EvolveReason_Colour)
                // .input('EvolveReason_Status', Evolve.Sql.Int, data.EvolveReason_Status)
                .query("INSERT INTO EvolveReasonRules (EvolveReasonRules_IsScarpReq, EvolveReasonRules_IsCommentsReq, EvolveReasonRules_IsQtyReq, EvolveReason_ID) VALUES (@EvolveReasonRules_IsScarpReq, @EvolveReasonRules_IsCommentsReq, @EvolveReasonRules_IsQtyReq, @EvolveReason_ID)");
            }else{
                return await Evolve.SqlPool.request()
                .input('EvolveReasonRules_IsScarpReq', Evolve.Sql.Bit, false)
                .input('EvolveReasonRules_IsCommentsReq', Evolve.Sql.Bit, false)
                .input('EvolveReasonRules_IsQtyReq', Evolve.Sql.Bit, false)
                .input('EvolveReason_ID', Evolve.Sql.Int, data.EvolveReason_ID)
                // .input('EvolveReason_Colour', Evolve.Sql.NVarChar, data.EvolveReason_Colour)
                // .input('EvolveReason_Status', Evolve.Sql.Int, data.EvolveReason_Status)
                .query("INSERT INTO EvolveReasonRules (EvolveReasonRules_IsScarpReq, EvolveReasonRules_IsCommentsReq, EvolveReasonRules_IsQtyReq, EvolveReason_ID) VALUES (@EvolveReasonRules_IsScarpReq, @EvolveReasonRules_IsCommentsReq, @EvolveReasonRules_IsQtyReq, @EvolveReason_ID)");
                
            }
        } catch (error) {
            Evolve.Log.error(" EERR1399: Error while creating Reason " + error.message);
            return new Error(" EERR1399: Error while creating Reason " + error.message);
        }
    },

    createReasonToMachine: async function (reason_id, machine_id, user_id) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveReason_ID', Evolve.Sql.Int, reason_id)
                .input('EvolveMachine_ID', Evolve.Sql.Int, machine_id)
                .input('EvolveReasonToMachine_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveReasonToMachine_CreatedUser', Evolve.Sql.Int, user_id)
                .input('EvolveReasonToMachine_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveReasonToMachine_UpdatedUser', Evolve.Sql.Int, user_id)
                .query("INSERT INTO EvolveReasonToMachine (EvolveReason_ID,EvolveMachine_ID,EvolveReasonToMachine_CreatedAt,EvolveReasonToMachine_CreatedUser,EvolveReasonToMachine_UpdatedAt,EvolveReasonToMachine_UpdatedUser) VALUES (@EvolveReason_ID,@EvolveMachine_ID,@EvolveReasonToMachine_CreatedAt,@EvolveReasonToMachine_CreatedUser,@EvolveReasonToMachine_UpdatedAt,@EvolveReasonToMachine_UpdatedUser)");

        } catch (error) {
            Evolve.Log.error(" EERR1400: Error while creating Reason To Machine " + error.message);
            return new Error(" EERR1400: Error while creating Reason To Machine " + error.message);
        }
    },

    selectSingleReason: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveReason_ID', Evolve.Sql.Int, data.EvolveReason_ID)
                // .query('SELECT er.EvolveReason_Name, er.EvolveReason_Code, er.EvolveReason_Desc, er.EvolveReason_Type, er.EvolveReason_IsParent, err.EvolveReasonRules_IsScarpReq, err.EvolveReasonRules_IsCommentsReq, err.EvolveReasonRules_IsQtyReq FROM EvolveReason er, EvolveReasonRules err WHERE er.EvolveReason_ID  = @EvolveReason_ID and err.EvolveReason_ID  = @EvolveReason_ID ');
                .query('SELECT er.EvolveReason_Name, er.EvolveReason_Code, er.EvolveReason_Desc, er.EvolveReason_Type, er.EvolveReason_IsParent, err.EvolveReasonRules_IsScarpReq, err.EvolveReasonRules_IsCommentsReq, err.EvolveReasonRules_IsQtyReq FROM EvolveReason er LEFT JOIN EvolveReasonRules err ON  err.EvolveReason_ID  = er.EvolveReason_ID WHERE er.EvolveReason_ID   = @EvolveReason_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR1401: Error while selecting Single Reason " + error.message);
            return new Error(" EERR1401: Error while selecting Single Reason " + error.message);
        }
    },

    checkUpdateReason: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveReason_Code', Evolve.Sql.NVarChar, data.EvolveReason_Code)
                .input('EvolveReason_ID', Evolve.Sql.Int, data.EvolveReason_ID)
                .query("SELECT COUNT(EvolveReason_ID) as count from EvolveReason WHERE EvolveReason_Code = @EvolveReason_Code and EvolveReason_ID != @EvolveReason_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1399: Error while check reason " + error.message);
            return new Error(" EERR1399: Error while check reason " + error.message);
        }
    },

    updateReason: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveReason_ID', Evolve.Sql.Int, data.EvolveReason_ID)
                .input('EvolveReason_Name', Evolve.Sql.NVarChar, data.EvolveReason_Name)
                .input('EvolveReason_Code', Evolve.Sql.NVarChar, data.EvolveReason_Code)
                .input('EvolveReason_Desc', Evolve.Sql.NVarChar, data.EvolveReason_Desc)
                .input('EvolveReason_Type', Evolve.Sql.NVarChar, data.reasonType)
                .input('EvolveReason_IsParent', Evolve.Sql.NVarChar, data.reasonIsParent)
                .input('EvolveReasonRules_IsScarpReq', Evolve.Sql.Bit, data.EvolveReasonRules_IsScarpReq)
                .input('EvolveReasonRules_IsCommentsReq', Evolve.Sql.Bit, data.EvolveReasonRules_IsCommentsReq)
                .input('EvolveReasonRules_IsQtyReq', Evolve.Sql.Bit, data.EvolveReasonRules_IsQtyReq)
                // .input('EvolveReason_Colour', Evolve.Sql.NVarChar, data.EvolveReason_Colour)
                // .input('EvolveReason_Status', Evolve.Sql.Int, data.EvolveReason_Status)
                .query('BEGIN TRANSACTION UPDATE EvolveReason SET EvolveReason_Name = @EvolveReason_Name , EvolveReason_Code = @EvolveReason_Code , EvolveReason_Desc = @EvolveReason_Desc, EvolveReason_Type = @EvolveReason_Type, EvolveReason_IsParent= @EvolveReason_IsParent WHERE EvolveReason_ID = @EvolveReason_ID UPDATE EvolveReasonRules SET EvolveReasonRules_IsScarpReq=@EvolveReasonRules_IsScarpReq, EvolveReasonRules_IsCommentsReq=@EvolveReasonRules_IsCommentsReq, EvolveReasonRules_IsQtyReq=@EvolveReasonRules_IsQtyReq FROM EvolveReason er, EvolveReasonRules err WHERE er.EvolveReason_ID = @EvolveReason_ID and err.EvolveReason_ID = @EvolveReason_ID COMMIT;');

        } catch (error) {
            Evolve.Log.error(" EERR1402: Error while updating Reason " + error.message);
            return new Error(" EERR1402: Error while updating Reason " + error.message);
        }
    },

    changeReasonStatus: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveReason_ID', Evolve.Sql.Int, data.EvolveReason_ID)
                .input('EvolveReason_Status', Evolve.Sql.Int, data.EvolveReason_Status)
                .query('UPDATE EvolveReason SET EvolveReason_Status = @EvolveReason_Status WHERE EvolveReason_ID = @EvolveReason_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1403: Error while changing Reason Status " + error.message);
            return new Error(" EERR1403: Error while changing Reason Status " + error.message);
        }
    },

    getReasoToMachine: async function (reason_id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveReason_ID', Evolve.Sql.Int, reason_id)
                .query('SELECT * FROM EvolveReasonToMachine WHERE EvolveReason_ID = @EvolveReason_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1404: Error while getting Reason To Machine " + error.message);
            return new Error(" EERR1404: Error while getting Reason To Machine " + error.message);
        }
    },
    getAllReasonCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query('  SELECT COUNT(EvolveReason_ID) as count  FROM EvolveReason WHERE EvolveReason_Name LIKE @search OR EvolveReason_Code LIKE @search ');
        } catch (error) {
            Evolve.Log.error("EERR3085 : Error while get reason count " + error.message);
            return new Error("EERR3085 : Error while get reason count " + error.message);
        }
        
    },
    
    reasonCodeList: async function () {
        try {
            
            return await Evolve.SqlPool.request()
                
                .query("SELECT * from EvolveReason ")
        } catch (error) {
            Evolve.Log.error(" EERR1399: Error while check reason " + error.message);
            return new Error(" EERR1399: Error while check reason " + error.message);
        }
    },

}
























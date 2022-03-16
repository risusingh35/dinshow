'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addRooms: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveRoom_Name', Evolve.Sql.NVarChar, data.EvolveRoom_Name)
                .input('EvolveRoom_Desc', Evolve.Sql.NVarChar, data.EvolveRoom_Desc)
                .input('EvolveRoom_Status', Evolve.Sql.NVarChar, data.EvolveRoom_Status)
                .input('EvolveRoom_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveRoom_UpdateAt', Evolve.Sql.NVarChar, datetime)
                .query('INSERT INTO EvolveRoom (EvolveRoom_Name, EvolveRoom_Desc, EvolveRoom_Status, EvolveRoom_CreatedAt, EvolveRoom_UpdateAt) VALUES (@EvolveRoom_Name, @EvolveRoom_Desc, @EvolveRoom_Status, @EvolveRoom_CreatedAt, @EvolveRoom_UpdateAt)');
        } catch (error) {
            Evolve.Log.error(" EERR1107: Error while adding rooms "+error.message);
            return new Error(" EERR1107: Error while adding rooms "+error.message);
        }
    },

    getRoomsCount: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('select count(EvolveRoom_Id) AS count from EvolveRoom');
        } catch (error) {
            Evolve.Log.error(" EERR1108: Error while getting rooms count "+error.message);
            return new Error(" EERR1108: Error while getting rooms count "+error.message);
        }
    },

    getRoomsDatatableList: async function (start, length) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query('SELECT * from EvolveRoom ORDER BY EvolveRoom_Id OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1109: Error while getting rooms database list "+error.message);
            return new Error(" EERR1109: Error while getting rooms database list "+error.message);
        }
    },

    getSingleRoom: async function (EvolveRoom_Id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveRoom_Id', Evolve.Sql.Int, EvolveRoom_Id)
                .query('SELECT * FROM EvolveRoom WHERE EvolveRoom_Id = @EvolveRoom_Id');
        } catch (error) {
            Evolve.Log.error(" EERR1110: Error while getting single room "+error.message);
            return new Error(" EERR1110: Error while getting single room "+error.message);
        }
    },

    editRoom: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveRoom_Id', Evolve.Sql.NVarChar, data.EvolveRoom_Id)
                .input('EvolveRoom_Name', Evolve.Sql.NVarChar, data.EvolveRoom_Name)
                .input('EvolveRoom_Desc', Evolve.Sql.NVarChar, data.EvolveRoom_Desc)
                .input('EvolveRoom_Status', Evolve.Sql.NVarChar, data.EvolveRoom_Status)
                .input('EvolveRoom_UpdateAt', Evolve.Sql.NVarChar, datetime)

                .query('UPDATE EvolveRoom SET EvolveRoom_Name = @EvolveRoom_Name, EvolveRoom_Desc = @EvolveRoom_Desc, EvolveRoom_Status = @EvolveRoom_Status, EvolveRoom_UpdateAt = @EvolveRoom_UpdateAt WHERE EvolveRoom_Id = @EvolveRoom_Id');
        } catch (error) {
            Evolve.Log.error(" EERR1111: Error while editing room "+error.message);
            return new Error(" EERR1111: Error while editing room "+error.message);
        }
    },

}
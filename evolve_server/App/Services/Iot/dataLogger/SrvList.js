'use strict';

const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    async addNewDeviceData (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveIoTDataLogger_DeviceID', Evolve.Sql.NVarChar, data.EvolveIoTDataLogger_DeviceID)
                .input('EvolveIoTDataLogger_Weight', Evolve.Sql.Int, data.EvolveIoTDataLogger_Weight)

                .input('EvolveIoTDataLogger_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveIoTDataLogger_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("INSERT INTO EvolveIotDataLogger (EvolveIoTDataLogger_DeviceID, EvolveIoTDataLogger_Weight, EvolveIoTDataLogger_CreatedAt, EvolveIoTDataLogger_CreatedUser) VALUES (@EvolveIoTDataLogger_DeviceID, @EvolveIoTDataLogger_Weight, @EvolveIoTDataLogger_CreatedAt, @EvolveIoTDataLogger_CreatedUser);");
        }
        catch (error) {
            const msg = `Error while add device data to data logger ${error.message}`;
            
            Evolve.Log.error(msg);
            return new Error(msg);
        }
    }
}
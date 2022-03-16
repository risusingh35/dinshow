'use strict';

const Evolve = require('../../../../Boot/Evolve');

module.exports = {

    /**
     * Get number of total documents depending on serach query
     * @async
     * @param {string} [search] 
     * @returns {Promise<object | Error}
     */
    async getDeviceListCount(search) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('search', Evolve.Sql.NVarChar, `%${search}%`)
                .query("SELECT COUNT(EvolveDevice_ID) AS COUNT FROM EvolveDevice WHERE EvolveDevice_Code LIKE @search;");
        }
        catch (error) {
            const msg = `Error while get tax class list count ${error.message}`;

            Evolve.Log.Error(msg);
            return new Error(msg);
        }
    },

    getAllDeviceList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT ed.* ,convert(varchar, ed.EvolveDevice_CreatedAt, 120) as EvolveDevice_DateConverted, el.EvolveLocation_Code , edt.EvolveDevice_Code AS EvolveDevice_Type FROM EvolveDevice ed , EvolveLocation el , EvolveDeviceType edt WHERE ed.EvolveLocation_ID = el.EvolveLocation_ID  AND ed.EvolveDeviceType_ID = edt.EvolveDeviceType_ID AND ed.EvolveDevice_Code LIKE @search ORDER BY ed.EvolveDevice_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY;");
        }
        catch (error) {
            const msg = `Error while getting IoT device list ${error.message}`;

            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    // /**
    //  * Get IoT device list
    //  * @async
    //  * @param {number} start - Start index of records 
    //  * @param {number} length - Length requested record
    //  * @param {string} [search] - Search query string
    //  * @returns {Promise<any>}
    //  */
    // async getDeviceList (start, length, search = '') {
    //     try {
    //         return await Evolve.SqlPool
    //             .request()
    //             .input('start', Evolve.Sql.Int, start)
    //             .input('length', Evolve.Sql.Int, length)
    //             .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
    //             .query("SELECT * FROM EvolveIoTDeviceList ORDER BY EvolveIoTDeviceList_Id DESC;");
    //     }
    //     catch (error) {
    //         const msg = `Error while getting IoT device list ${error.message}`;

    //         Evolve.Log.error(msg);
    //         return new Error(msg);
    //     }
    // },

    // /**
    //  * Add new device
    //  * @async
    //  * @param {object} data - Device data 
    //  * @returns {Promise<any>}
    //  */
    // async addNewDevice (data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

    //     try {
    //         return await Evolve.SqlPool
    //             .request()
    //             .input("EvolveIoTDeviceList_Name", Evolve.Sql.NVarChar, data.EvolveIoTDeviceList_Name)
    //             .input('EvolveIoTDeviceList_DeviceUid', Evolve.Sql.NVarChar, data.EvolveIoTDeviceList_DeviceUid)
    //             .input('EvolveIoTDeviceList_Location', Evolve.Sql.NVarChar, data.EvolveIoTDeviceList_Location)
    //             .input('EvolveIoTDeviceList_UnitName', Evolve.Sql.NVarChar, data.EvolveIoTDeviceList_UnitName)
    //             .input('EvolveIoTDeviceList_UnitValue', Evolve.Sql.Int, data.EvolveIoTDeviceList_UnitValue)
    //             .input('EvolveIoTDeviceList_Origin', Evolve.Sql.NVarChar, data.EvolveIoTDeviceList_Origin)

    //             .input('EvolveIoTDeviceList_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveIoTDeviceList_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveIoTDeviceList_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveIoTDeviceList_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .query("INSERT INTO EvolveIoTDeviceList (EvolveIoTDeviceList_Name, EvolveIoTDeviceList_DeviceUid, EvolveIoTDeviceList_Location, EvolveIoTDeviceList_UnitValue, EvolveIoTDeviceList_UnitName, EvolveIoTDeviceList_Origin, EvolveIoTDeviceList_CreatedAt, EvolveIoTDeviceList_CreatedUser, EvolveIoTDeviceList_UpdatedAt, EvolveIoTDeviceList_UpdatedUser) VALUES (@EvolveIoTDeviceList_Name, @EvolveIoTDeviceList_DeviceUid, @EvolveIoTDeviceList_Location, @EvolveIoTDeviceList_UnitValue, @EvolveIoTDeviceList_UnitName, @EvolveIoTDeviceList_Origin, @EvolveIoTDeviceList_CreatedAt, @EvolveIoTDeviceList_CreatedUser, @EvolveIoTDeviceList_UpdatedAt, @EvolveIoTDeviceList_UpdatedUser);");
    //     }
    //     catch (error) {
    //         const msg = `Error while add new IoT device ${error.message}`;

    //         Evolve.Log.error(msg);
    //         return new Error(msg);
    //     }
    // },

    // /**
    //  * Update single device
    //  * @async
    //  * @param {object} data - Updated data
    //  * @returns {Promise<any>}
    //  */
    // async updateDevice (data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

    //     try {
    //         return await Evolve.SqlPool
    //             .request()
    //             .input('EvolveIoTDeviceList_Id', Evolve.Sql.Int, data.EvolveIoTDeviceList_Id)
    //             .input("EvolveIoTDeviceList_Name", Evolve.Sql.NVarChar, data.EvolveIoTDeviceList_Name)
    //             .input('EvolveIoTDeviceList_DeviceUid', Evolve.Sql.NVarChar, data.EvolveIoTDeviceList_DeviceUid)
    //             .input('EvolveIoTDeviceList_Location', Evolve.Sql.NVarChar, data.EvolveIoTDeviceList_Location)
    //             .input('EvolveIoTDeviceList_UnitName', Evolve.Sql.NVarChar, data.EvolveIoTDeviceList_UnitName)
    //             .input('EvolveIoTDeviceList_UnitValue', Evolve.Sql.Int, data.EvolveIoTDeviceList_UnitValue)
    //             .input('EvolveIoTDeviceList_Origin', Evolve.Sql.NVarChar, data.EvolveIoTDeviceList_Origin)

    //             .input('EvolveIoTDeviceList_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveIoTDeviceList_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .query("UPDATE EvolveIoTDeviceList SET EvolveIoTDeviceList_Name=@EvolveIoTDeviceList_Name, EvolveIoTDeviceList_DeviceUid=@EvolveIoTDeviceList_DeviceUid, EvolveIoTDeviceList_Location=@EvolveIoTDeviceList_Location, EvolveIoTDeviceList_UnitName=@EvolveIoTDeviceList_UnitName, EvolveIoTDeviceList_UnitValue=@EvolveIoTDeviceList_UnitValue, EvolveIoTDeviceList_Origin=@EvolveIoTDeviceList_Origin, EvolveIoTDeviceList_UpdatedAt=@EvolveIoTDeviceList_UpdatedAt, EvolveIoTDeviceList_UpdatedUser=@EvolveIoTDeviceList_UpdatedUser WHERE EvolveIoTDeviceList_Id=@EvolveIoTDeviceList_Id;");
    //     }
    //     catch (error) {
    //         const msg = `Error while update device ${error.message}`;

    //         Evolve.Log.error(msg);
    //         return new Error(msg);
    //     }
    // },

    // /**
    //  * Delete single device
    //  * @async
    //  * @param {number} id - Device Id
    //  * @returns {Promise<any>}
    //  */
    // async deleteOneDevice (id) {
    //     try {
    //         if (!id) {
    //             throw("Require device id");
    //         }

    //         // Delete device details
    //         await Evolve.SqlPool.request()
    //             .input("EvolveIoTDeviceDetail_DeviceId", Evolve.Sql.Int, id)
    //             .query("DELETE FROM EvolveIotDeviceDetail WHERE EvolveIoTDeviceDetail_DeviceId=@EvolveIoTDeviceDetail_DeviceId");

    //         return await Evolve.SqlPool
    //             .request()
    //             .input('EvolveIoTDeviceList_Id', Evolve.Sql.Int, id)
    //             .query("DELETE FROM EvolveIoTDeviceList WHERE EvolveIoTDeviceList_Id=@EvolveIoTDeviceList_Id;");
    //     }
    //     catch (error) {
    //         const msg = `Error while delete device ${error.message}`;

    //         Evolve.Log.error(msg);
    //         return new Error(msg);
    //     }
    // }

    async getAQIDeviceList() {
        try {
            return await Evolve.SqlPool
                .request()
                .query("select ed.* from EvolveDevice ed , EvolveDeviceType edt where ed.EvolveDeviceType_ID = edt.EvolveDeviceType_ID AND edt.EvolveDevice_Code = 'AQI';");
        }
        catch (error) {
            const msg = `Error while getting AQI devices ${error.message}`;

            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    async getScaleDeviceList() {
        try {
            return await Evolve.SqlPool
                .request()
                .query("select ed.* from EvolveDevice ed , EvolveDeviceType edt where ed.EvolveDeviceType_ID = edt.EvolveDeviceType_ID AND edt.EvolveDevice_Code = 'SCALE';");
        }
        catch (error) {
            const msg = `Error while getting Scale devices ${error.message}`;

            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    deviceLocations: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveLocation");
        } catch (error) {

            Evolve.Log.error(" EERR1600: Error while getting device Locations " + error.message);
            return new Error(" EERR1600: Error while getting device Locations " + error.message);
        }
    },

    getDeviceLocations: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .query("SELECT * FROM EvolveLocation WHERE EvolveLocation_ID=@EvolveLocation_ID");
        } catch (error) {

            Evolve.Log.error(" EERR1601: Error while in Device Locations " + error.message);
            return new Error(" EERR1601: Error while in Device Locations " + error.message);
        }
    },

    getDeviceData: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT ed.*, edt.EvolveDevice_Name as deviceType, ei.EvolveLocation_Code FROM EvolveDevice ed JOIN EvolveDeviceType edt ON ed.EvolveDeviceType_ID = edt.EvolveDeviceType_ID INNER JOIN EvolveLocation ei ON ed.EvolveLocation_ID = ei.EvolveLocation_ID      order by ed.EvolveDevice_ID desc");
        } catch (error) {

            Evolve.Log.error(" EERR1602: Error while getting Device Data " + error.message);
            return new Error(" EERR1602: Error while getting Device Data " + error.message);
        }
    },

    getDeviceType: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveDeviceType_ID, EvolveDevice_Name FROM EvolveDeviceType");
        } catch (error) {

            Evolve.Log.error(" EERR1599: Error while getting Device Type " + error.message);
            return new Error(" EERR1599: Error while getting Device Type " + error.message);
        }
    },

    getSingleDeviceData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_ID', Evolve.Sql.Int, data.EvolveDevice_ID)
                .query("SELECT * FROM EvolveDevice WHERE EvolveDevice_ID = @EvolveDevice_ID");
        } catch (error) {

            Evolve.Log.error(" EERR1604: Error while getting Single Device Data " + error.message);
            return new Error(" EERR1604: Error while getting Single Device Data " + error.message);
        }
    },

    /**
     * Add new device
     * @async
     * @param {object} data - Device data 
     * @returns {Promise<any>}
     */
    async addNewDevice(data) {
        console.log("addNewDevice>>>>", data);
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveDevice_Name', Evolve.Sql.NVarChar, data.EvolveDevice_Name)
                .input('EvolveDeviceType_ID', Evolve.Sql.Int, data.EvolveDeviceType_ID)
                .input('EvolveDevice_Code', Evolve.Sql.NVarChar, data.EvolveDevice_Code)
                .input('EvolveDevice_String', Evolve.Sql.NVarChar, data.EvolveDevice_String)
                .input('EvolveDevice_MqttIP', Evolve.Sql.NVarChar, data.EvolveDevice_MqttIP)
                .input('EvolveDevice_Port', Evolve.Sql.NVarChar, data.EvolveDevice_Port)
                .input('EvolveDevice_Subscriber', Evolve.Sql.NVarChar, data.EvolveDevice_Subscriber)
                .input('EvolveDevice_API', Evolve.Sql.NVarChar, data.EvolveDevice_API)
                .input('EvolveDevice_Status', Evolve.Sql.NVarChar, data.EvolveDevice_Status)
                .input('EvolveDevice_SendOption', Evolve.Sql.NVarChar, data.EvolveDevice_SendOption)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveDevice_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDevice_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveDevice_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDevice_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query("INSERT INTO EvolveDevice (EvolveDevice_Name, EvolveDeviceType_ID, EvolveDevice_Code, EvolveDevice_String, EvolveDevice_MqttIP, EvolveDevice_Port, EvolveDevice_Subscriber, EvolveDevice_API, EvolveDevice_CreatedUser, EvolveDevice_CreatedAt, EvolveDevice_UpdatedUser, EvolveDevice_UpdatedAt, EvolveDevice_Status, EvolveDevice_SendOption,EvolveLocation_ID) VALUES (@EvolveDevice_Name, @EvolveDeviceType_ID, @EvolveDevice_Code, @EvolveDevice_String, @EvolveDevice_MqttIP, @EvolveDevice_Port, @EvolveDevice_Subscriber, @EvolveDevice_API, @EvolveDevice_CreatedUser, @EvolveDevice_CreatedAt, @EvolveDevice_UpdatedUser, @EvolveDevice_UpdatedAt, @EvolveDevice_Status, @EvolveDevice_SendOption, @EvolveLocation_ID);");
        }
        catch (error) {
            const msg = `Error while add new device ${error.message}`;

            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    updateDevice: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_ID', Evolve.Sql.Int, data.EvolveDevice_ID)
                .input('EvolveDevice_Name', Evolve.Sql.NVarChar, data.EvolveDevice_Name)
                .input('EvolveDeviceType_ID', Evolve.Sql.Int, data.EvolveDeviceType_ID)
                .input('EvolveDevice_Code', Evolve.Sql.NVarChar, data.EvolveDevice_Code)
                .input('EvolveDevice_String', Evolve.Sql.NVarChar, data.EvolveDevice_String)
                .input('EvolveDevice_MqttIP', Evolve.Sql.NVarChar, data.EvolveDevice_MqttIP)
                .input('EvolveDevice_Port', Evolve.Sql.NVarChar, data.EvolveDevice_Port)
                .input('EvolveDevice_Subscriber', Evolve.Sql.NVarChar, data.EvolveDevice_Subscriber)
                .input('EvolveDevice_API', Evolve.Sql.NVarChar, data.EvolveDevice_API)
                .input('EvolveDevice_Status', Evolve.Sql.NVarChar, data.EvolveDevice_Status)
                .input('EvolveDevice_SendOption', Evolve.Sql.NVarChar, data.EvolveDevice_SendOption)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveDevice_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDevice_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query("UPDATE EvolveDevice SET EvolveDevice_Name = @EvolveDevice_Name, EvolveDeviceType_ID = @EvolveDeviceType_ID, EvolveDevice_Code = @EvolveDevice_Code, EvolveDevice_String = @EvolveDevice_String, EvolveDevice_MqttIP = @EvolveDevice_MqttIP, EvolveDevice_Port = @EvolveDevice_Port, EvolveDevice_Subscriber = @EvolveDevice_Subscriber, EvolveDevice_API = @EvolveDevice_API, EvolveDevice_UpdatedUser = @EvolveDevice_UpdatedUser, EvolveDevice_UpdatedAt = @EvolveDevice_UpdatedAt, EvolveDevice_Status = @EvolveDevice_Status, EvolveDevice_SendOption = @EvolveDevice_SendOption , EvolveLocation_ID = @EvolveLocation_ID WHERE EvolveDevice_ID = @EvolveDevice_ID");
        } catch (error) {

            Evolve.Log.error(" EERR1605: Error while updating Device " + error.message);
            return new Error(" EERR1605: Error while updating Device " + error.message);
        }
    },

    deleteDevice: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_ID', Evolve.Sql.Int, data.EvolveDevice_ID)
                .query("DELETE FROM EvolveDevice WHERE EvolveDevice_ID = @EvolveDevice_ID");
        } catch (error) {

            Evolve.Log.error(" EERR1606: Error while deleting Device " + error.message);
            return new Error(" EERR1606: Error while deleting Device " + error.message);
        }
    },

    getDeviceDataByCode: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_Code', Evolve.Sql.NVarChar, data.EvolveDevice_Code)
                .query("SELECT * FROM EvolveDevice WHERE EvolveDevice_Code = @EvolveDevice_Code");
        } catch (error) {

            Evolve.Log.error(" EERR1615: Error while getting Device Data By Code " + error.message);
            return new Error(" EERR1615: Error while getting Device Data By Code " + error.message);
        }
    },

    updateDeviceAPI: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_ID', Evolve.Sql.Int, data.EvolveDevice_ID)
                .input('EvolveDevice_API', Evolve.Sql.NVarChar, data.EvolveDevice_API)
                .query("UPDATE EvolveDevice SET EvolveDevice_API = @EvolveDevice_API WHERE EvolveDevice_ID = @EvolveDevice_ID");
        } catch (error) {

            Evolve.Log.error(" EERR1616: Error while updating Device API " + error.message);
            return new Error(" EERR1616: Error while updating Device API " + error.message);
        }
    },

    async getPLCDeviceList () {
        try {
            return await Evolve.SqlPool
                .request()
                .query("select ed.* from EvolveDevice ed , EvolveDeviceType edt where ed.EvolveDeviceType_ID = edt.EvolveDeviceType_ID AND edt.EvolveDevice_Code = 'PLC';");
        }
        catch (error) {
            const msg = `Error while getting PLC devices ${error.message}`;
    
            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },
}
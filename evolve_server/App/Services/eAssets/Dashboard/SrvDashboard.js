'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getTotalInBeds: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveBed_ID) AS count FROM EvolveBeds WHERE EvolveBed_Status = 1");
        } catch (error) {
            Evolve.Log.error(" EERR1095: Error while getting Total in beds "+error.message);
            return new Error(" EERR1095: Error while getting Total in beds "+error.message);
        }
    },
    gettotalBeds: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveBed_ID) AS count FROM EvolveBeds ");
        } catch (error) {
            Evolve.Log.error(" EERR1096: Error while getting total Beds "+error.message);
            return new Error(" EERR1096: Error while getting total Beds "+error.message);
        }
    },
    gettotalOutBeds: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveBed_ID) AS count FROM EvolveBeds WHERE EvolveBed_Status = 0 ");
        } catch (error) {
            Evolve.Log.error(" EERR1097: Error while getting total Out Beds "+error.message);
            return new Error(" EERR1097: Error while getting total Out Beds "+error.message);
        }
    },
    getWorkOrderCompletedData: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveProdOrders_ID) AS count FROM EvolveProdOrders WHERE EvolveProdOrders_Status = 'completed' ");
        } catch (error) {
            Evolve.Log.error(" EERR1098: Error while getting Work Order Completed Data "+error.message);
            return new Error(" EERR1098: Error while getting Work Order Completed Data "+error.message);
        }
    },
    getWorkOrderInProgressData: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveProdOrders_ID) AS count FROM EvolveProdOrders WHERE EvolveProdOrders_Status = 'open'");
        } catch (error) {
            Evolve.Log.error(" EERR1099: Error while getting Work Order In Progress Data "+error.message);
            return new Error(" EERR1099: Error while getting Work Order In Progress Data "+error.message);
        }
    },



}
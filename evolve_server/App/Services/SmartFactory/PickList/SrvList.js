'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getAllSalesOrderListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT count(es.EvolveSalesOrder_ID)  FROM EvolveSalesOrder es LEFT JOIN  EvolveCustomer ec on ec.EvolveCustomer_ID = es.EvolveCustomer_ID WHERE es.EvolveSalesOrder_Number LIKE @search AND ec.EvolveCustomer_Code LIKE @search  ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get menu type Count "+error.message);
            return new Error(" EERR####: Error while get menu type Count "+error.message);
        }
    },

    getAllSalesOrderList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT es.* , ec.EvolveCustomer_Code , (SELECT ea.EvolveAddress_Code FROM EvolveAddress ea where ea.EvolveAddress_ID = es.EvolveBillTo_ID) as 'BillTo' , (SELECT ea.EvolveAddress_Code FROM EvolveAddress ea where ea.EvolveAddress_ID = es.EvolveShipTo_ID) as 'ShipTo' FROM EvolveSalesOrder es LEFT JOIN  EvolveCustomer ec on ec.EvolveCustomer_ID = es.EvolveCustomer_ID WHERE es.EvolveSalesOrder_Number LIKE @search AND ec.EvolveCustomer_Code LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get menu type list"+error.message);
            return new Error(" EERR####: Error while get menu type list"+error.message);
        }
    },



}
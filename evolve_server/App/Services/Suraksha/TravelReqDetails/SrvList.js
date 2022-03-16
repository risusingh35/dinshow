'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

	getTravelReqDetails: async function (start, length, search) {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT   * FROM  EvolveTravelReqDetails");
		} catch (error) {
			Evolve.Log.error("  Error while getting travel request details  " + error.message);
			return new Error("  Error while getting travel request details  " + error.message);
		}
	},

	addTravelReqDetails: async function (data) {
		try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

			return await Evolve.SqlPool.request()
				.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
				.input('EvolveTravelReqDetails_startDate', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_startDate)
				.input('EvolveTravelReqDetails_endDate', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_endDate)
				.input('EvolveTravelModes_id', Evolve.Sql.Int, data.EvolveTravelModes_id)
				.input('EvolveTravelReqDetails_accomod', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_accomod)
				.input('EvolveTravelReqDetails_address', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_address)
				.input('EvolveTravelReqDetails_latLong', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_latLong)
				.input('EvolveTravelReqDetails_city', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_city)
				.input('EvolveTravelReqDetails_country', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_country)
				.input('EvolveTravelReqDetails_district', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_district)
				.input('EvolveTravelReqDetails_pincode', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_pincode)

				.input('EvolveTravelReqDetails_CreatedAt', Evolve.Sql.NVarChar, dataTime)
				.input('EvolveTravelReqDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveTravelReqDetails_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.input('EvolveTravelReqDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query('INSERT INTO EvolveTravelReqDetails (  EvolveTravelReq_id,EvolveTravelReqDetails_startDate ,EvolveTravelReqDetails_endDate,EvolveTravelModes_id,EvolveTravelReqDetails_accomod,EvolveTravelReqDetails_address,EvolveTravelReqDetails_latLong,EvolveTravelReqDetails_city,EvolveTravelReqDetails_country,EvolveTravelReqDetails_district,EvolveTravelReqDetails_pincode, EvolveTravelReqDetails_CreatedAt ,EvolveTravelReqDetails_CreatedUser , EvolveTravelReqDetails_UpdatedAt , EvolveTravelReqDetails_UpdatedUser )  VALUES ( @EvolveTravelReq_id,@EvolveTravelReqDetails_startDate ,@EvolveTravelReqDetails_endDate,@EvolveTravelModes_id,@EvolveTravelReqDetails_accomod,@EvolveTravelReqDetails_address,@EvolveTravelReqDetails_latLong,@EvolveTravelReqDetails_city,@EvolveTravelReqDetails_country,@EvolveTravelReqDetails_district,@EvolveTravelReqDetails_pincode, @EvolveTravelReqDetails_CreatedAt ,@EvolveTravelReqDetails_CreatedUser , @EvolveTravelReqDetails_UpdatedAt , @EvolveTravelReqDetails_UpdatedUser) ;');
		} catch (error) {
			Evolve.Log.error("  Error while add Request " + error.message);
			return new Error("  Error while add Request " + error.message);
		}
	},
	deleteTravelReqDetails: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveTravelReqDetails_id', Evolve.Sql.Int, data.EvolveTravelReqDetails_id)

				.query('DELETE FROM  EvolveTravelReqDetails WHERE EvolveTravelReqDetails_id = @EvolveTravelReqDetails_id');
		} catch (error) {
			Evolve.Log.error(" Error while delete travel request details " + error.message);
			return new Error(" Error while delete travel request details " + error.message);
		}
	},
	getSingleTravelReqDetails: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveTravelReqDetails_id', Evolve.Sql.Int, data.EvolveTravelReqDetails_id)
				.query(" SELECT   * FROM  EvolveTravelReqDetails WHERE EvolveTravelReqDetails_id = @EvolveTravelReqDetails_id  ");
		} catch (error) {
			Evolve.Log.error(" Error while get travel request details details " + error.message);
			return new Error(" Error while get travel request details details " + error.message);
		}
	},
	updateTravelReqDetails: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveTravelReqDetails_id', Evolve.Sql.Int, data.EvolveTravelReqDetails_id)
				.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
				.input('EvolveTravelReqDetails_startDate', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_startDate)
				.input('EvolveTravelReqDetails_endDate', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_endDate)
				.input('EvolveTravelModes_id', Evolve.Sql.Int, data.EvolveTravelModes_id)
				.input('EvolveTravelReqDetails_accomod', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_accomod)
				.input('EvolveTravelReqDetails_address', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_address)
				.input('EvolveTravelReqDetails_latLong', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_latLong)
				.input('EvolveTravelReqDetails_city', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_city)
				.input('EvolveTravelReqDetails_country', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_country)
				.input('EvolveTravelReqDetails_district', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_district)
				.input('EvolveTravelReqDetails_pincode', Evolve.Sql.NVarChar, data.EvolveTravelReqDetails_pincode)
				.query(" UPDATE EvolveTravelReqDetails SET EvolveTravelReq_id=@EvolveTravelReq_id ,  EvolveTravelReqDetails_startDate=@EvolveTravelReqDetails_startDate ,EvolveTravelReqDetails_endDate=@EvolveTravelReqDetails_endDate , EvolveTravelModes_ID = @EvolveTravelModes_ID ,EvolveTravelReqDetails_accomod=@EvolveTravelReqDetails_accomod ,  EvolveTravelReqDetails_address=@EvolveTravelReqDetails_address ,EvolveTravelReqDetails_latLong=@EvolveTravelReqDetails_latLong ,EvolveTravelReqDetails_city=@EvolveTravelReqDetails_city , EvolveTravelReqDetails_country=@EvolveTravelReqDetails_country , EvolveTravelReqDetails_district=@EvolveTravelReqDetails_district ,EvolveTravelReqDetails_pincode=@EvolveTravelReqDetails_pincode   WHERE EvolveTravelReqDetails_id=@EvolveTravelReqDetails_id");
		} catch (error) {
			Evolve.Log.error("  Error while update travel request details details " + error.message);
			return new Error("  Error while update travel request details details " + error.message);
		}
	},
	addRequestDetails: async function (body, id) {
		try {
			let error = false;
			for (let index = 0; index < body.length; index++) {
				const d = body[index];
				let addResult = await Evolve.SqlPool.request()
					.input('EvolveTravelReq_id', id)
					.input('EvolveTravelReqDetails_startDate', new Date(d.EvolveTravelReqDetails_startDate))
					.input('EvolveTravelReqDetails_endDate', new Date(d.EvolveTravelReqDetails_endDate))
					.input('EvolveTravelModes_id', '1')
					.input('EvolveTravelReqDetails_accomod', d.EvolveTravelReqDetails_accomod)
					.input('EvolveTravelReqDetails_address', d.EvolveTravelReqDetails_address)
					.input('EvolveTravelReqDetails_latLong', d.EvolveTravelReqDetails_latLong)
					.input('EvolveTravelReqDetails_city', d.EvolveTravelReqDetails_city)
					.input('EvolveTravelReqDetails_country', d.EvolveTravelReqDetails_country)
					.input('EvolveTravelReqDetails_district', d.EvolveTravelReqDetails_district)
					.input('EvolveTravelReqDetails_pincode', d.EvolveTravelReqDetails_pincode)
					.query('INSERT INTO EvolveTravelReqDetails  (    EvolveTravelReq_id,EvolveTravelReqDetails_startDate,EvolveTravelReqDetails_endDate,EvolveTravelModes_id,EvolveTravelReqDetails_accomod,EvolveTravelReqDetails_address,EvolveTravelReqDetails_latLong,EvolveTravelReqDetails_city,EvolveTravelReqDetails_country,EvolveTravelReqDetails_district,EvolveTravelReqDetails_pincode)VALUES (@EvolveTravelReq_id,@EvolveTravelReqDetails_startDate,@EvolveTravelReqDetails_endDate,@EvolveTravelModes_id,@EvolveTravelReqDetails_accomod,@EvolveTravelReqDetails_address,@EvolveTravelReqDetails_latLong,@EvolveTravelReqDetails_city,@EvolveTravelReqDetails_country,@EvolveTravelReqDetails_district,@EvolveTravelReqDetails_pincode);');

				if (addResult instanceof Error || addResult.rowsAffected < 1) {

					error = true;

				}
			}
			return error;

		} catch (error) {
			Evolve.Log.error(error);
			throw error;
		}

	},
	deleteRequestDetails: async function (id) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveTravelReq_id', id)
				.query('DELETE FROM EvolveTravelReqDetails  WHERE EvolveTravelReq_id = @EvolveTravelReq_id ');
		} catch (error) {
			Evolve.Log.error(error);
			throw error;
		}

	},


}
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    
	addTravelHist: async function (data) {
		try {

			return await Evolve.SqlPool.request()
	
				.input('EvolveTravelHistory_address',Evolve.Sql.NVarChar, data.EvolveTravelHistory_address)
				.input('EvolveTravelHistory_latLong',Evolve.Sql.NVarChar, (data.EvolveTravelHistory_latLong))
				.input('EvolveTravelHistory_city',Evolve.Sql.NVarChar, (data.EvolveTravelHistory_city))
				.input('EvolveTravelHistory_country',Evolve.Sql.NVarChar, data.EvolveTravelHistory_country)
				.input('EvolveTravelHistory_district',Evolve.Sql.NVarChar, data.EvolveTravelHistory_district)
				.input('EvolveTravelHistory_pincode',Evolve.Sql.NVarChar, (data.EvolveTravelHistory_pincode))
				.input('EvolveTravelHistory_CreatedAt', Evolve.Sql.NVarChar, data.date)
				.input('EvolveTravelHistory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveTravelHistory_UpdatedAt', Evolve.Sql.NVarChar, data.date)
				.input('EvolveTravelHistory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveTravelHistory_covid',Evolve.Sql.NVarChar, JSON.stringify(data.EvolveTravelHistory_covid))
				.input('EvolveStatus_id',Evolve.Sql.Int, data.EvolveStatus_id)
				.input('EvolveTravelReq_id',Evolve.Sql.Int, data.EvolveTravelReq_id)

				.query('INSERT INTO EvolveTravelHistory ( EvolveTravelHistory_address,EvolveTravelHistory_latLong,  EvolveTravelHistory_city ,EvolveTravelHistory_country ,EvolveTravelHistory_district ,EvolveTravelHistory_pincode , EvolveTravelHistory_covid ,EvolveTravelHistory_CreatedAt,EvolveTravelHistory_CreatedUser,EvolveTravelHistory_UpdatedAt,EvolveTravelHistory_UpdatedUser,EvolveStatus_id,EvolveTravelReq_id)  VALUES ( @EvolveTravelHistory_address, @EvolveTravelHistory_latLong, @EvolveTravelHistory_city ,@EvolveTravelHistory_country,@EvolveTravelHistory_district,@EvolveTravelHistory_pincode,@EvolveTravelHistory_covid,@EvolveTravelHistory_CreatedAt,@EvolveTravelHistory_CreatedUser,@EvolveTravelHistory_UpdatedAt,@EvolveTravelHistory_UpdatedUser,@EvolveStatus_id,@EvolveTravelReq_id);');
		} catch (error) {
			Evolve.Log.error("  Error while add travel history"+error.message);
			return new Error("  Error while add travel history"+error.message);
		}
    },
	updateTravelHist: async function (data) {
		try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

			return await Evolve.SqlPool.request()
			.input('EvolveTravelHistory_id',Evolve.Sql.Int,
			data.EvolveTravelHistory_id)
			.input('EvolveTravelReq_id',Evolve.Sql.Int,
			data.EvolveTravelReq_id)
			.input('EvolveTravelHistory_address',Evolve.NVarChar.Int, data.EvolveTravelHistory_address)
			.input('EvolveTravelHistory_latLong',Evolve.NVarChar.NVarChar, new Date(data.EvolveTravelHistory_latLong))
			.input('EvolveTravelHistory_city',Evolve.Sql.NVarChar, new Date(data.EvolveTravelHistory_city))
			.input('EvolveTravelHistory_country',Evolve.Sql.NVarChar, data.EvolveTravelHistory_country)
			.input('EvolveTravelHistory_district',Evolve.Sql.NVarChar, data.EvolveTravelHistory_district)
			.input('EvolveTravelHistory_pincode',Evolve.Sql.NVarChar, JSON.stringify(data.EvolveTravelHistory_pincode))
	
			.input('EvolveTravelHistory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			.input('EvolveTravelHistory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			.input('EvolveTravelHistory_covid',Evolve.Sql.NVarChar, data.EvolveTravelHistory_covid)
			.input('EvolveStatus_id',Evolve.Sql.Int, data.EvolveStatus_id)
				.query('UPDATE EvolveTravelHistory SET EvolveTravelReq_id=@EvolveTravelReq_id ,EvolveTravelHistory_address =@EvolveTravelHistory_address ,EvolveTravelHistory_latLong=@EvolveTravelHistory_latLong ,  EvolveTravelHistory_city=@EvolveTravelHistory_city ,EvolveTravelHistory_country=@EvolveTravelHistory_country ,EvolveTravelHistory_district=@EvolveTravelHistory_district ,  EvolveTravelHistory_pincode=@EvolveTravelHistory_pincode , EvolveTravelHistory_UpdatedAt=@EvolveTravelHistory_UpdatedAt, EvolveTravelHistory_UpdatedUser=@EvolveTravelHistory_UpdatedUser ,EvolveTravelHistory_covid=@EvolveTravelHistory_covid ,EvolveStatus_id=@EvolveStatus_id WHERE EvolveTravelHistory_id=@EvolveTravelHistory_id  ');
		} catch (error) {
			Evolve.Log.error("Error while Update Travel history"+error.message);
			return new Error("Error while Update Travel history"+error.message);
		}
	},
	getTravelHistCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                // .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query(" SELECT   COUNT(EvolveTravelHistory_id) as count FROM  EvolveTravelHistory");
        } catch (error) {
            Evolve.Log.error("Error while get travel history count " + error.message);
            return new Error("Error while get travel history count " + error.message);
        }
    },
    getTravelHistList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query("SELECT   * FROM  EvolveTravelModes EvolveTravelHistory  ORDER BY EvolveTravelModes_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error("Error while getting travel history List " + error.message);
            return new Error("Error while getting travel history List " + error.message);
        }
	},
	addCovidData: async function (details) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCovidData_Data', Evolve.Sql.NVarChar, details)
           
                .query("INSERT INTO EvolveCovidData (EvolveCovidData_Data) VALUES (@EvolveCovidData_Data)");
        } catch (error) {
            Evolve.Log.error("Error while getting travel history List " + error.message);
            return new Error("Error while getting travel history List " + error.message);
        }
    },


    


}
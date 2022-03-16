'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

	getTravelModeCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query(" SELECT   COUNT(EvolveTravelModes_ID) as count FROM  EvolveTravelModes  WHERE EvolveTravelModes_Name LIKE @search  ");
        } catch (error) {
            Evolve.Log.error(" EERR32806: Error while get travel mode count " + error.message);
            return new Error(" EERR32806: Error while get travel mode count " + error.message);
        }
    },
    getTravelModeList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT   * FROM  EvolveTravelModes WHERE EvolveTravelModes_Name LIKE @search  ORDER BY EvolveTravelModes_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR32807: Error while getting travel mode List " + error.message);
            return new Error(" EERR32807: Error while getting travel mode List " + error.message);
        }
    },

	addTravelMode: async function (data) {
		try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
	
			return await Evolve.SqlPool.request()
			  .input('EvolveTravelModes_Type', Evolve.Sql.NVarChar, data.EvolveTravelModes_Type)
			  .input('EvolveTravelModes_Name', Evolve.Sql.NVarChar, data.EvolveTravelModes_Name)
			  .input('EvolveTravelModes_CreatedAt', Evolve.Sql.NVarChar, dataTime)
			  .input('EvolveTravelModes_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			  .input('EvolveTravelModes_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			  .input('EvolveTravelModes_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query('INSERT INTO EvolveTravelModes (  EvolveTravelModes_Type,EvolveTravelModes_Name , EvolveTravelModes_CreatedAt ,EvolveTravelModes_CreatedUser , EvolveTravelModes_UpdatedAt , EvolveTravelModes_UpdatedUser )  VALUES ( @EvolveTravelModes_Type,@EvolveTravelModes_Name , @EvolveTravelModes_CreatedAt ,@EvolveTravelModes_CreatedUser , @EvolveTravelModes_UpdatedAt , @EvolveTravelModes_UpdatedUser) ;');
		} catch (error) {
			Evolve.Log.error(" EERR32808 : Error while add Request "+error.message);
			return new Error(" EERR32808 : Error while add Request "+error.message);
		}
    },
    
    getTravelMode: async function () {
		try {
			return await Evolve.SqlPool.request()
			 .query('SELECT * FROM  EvolveTravelModes');
	
		} catch (error) {
			Evolve.Log.error("EERR32809 : Error while get all request "+error.message);
			return new Error("EERR32809 : Error while get all request "+error.message);
		}
	},
    deleteTravelMode: async function (data) {
		try {
            return await Evolve.SqlPool.request()
				.input('EvolveTravelModes_ID', Evolve.Sql.Int, data.EvolveTravelModes_ID)
				
				.query('DELETE FROM  EvolveTravelModes WHERE EvolveTravelModes_ID = @EvolveTravelModes_ID');
		} catch (error) {
			Evolve.Log.error("EERR32810 : Error while delete Travel Mode "+error.message);
			return new Error("EERR32810 : Error while delete Travel Mode "+error.message);
		}
	},
	getSingleModeDetails: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveTravelModes_ID', Evolve.Sql.Int, data.EvolveTravelModes_ID)
			
                .query(" SELECT   * FROM  EvolveTravelModes WHERE EvolveTravelModes_ID = @EvolveTravelModes_ID  ");
        } catch (error) {
            Evolve.Log.error("EERR32811: Error while get travel mode details " + error.message);
            return new Error("EERR32811: Error while get travel mode details " + error.message);
        }
	},
	updatTravelModeDetails: async function (data) {
        try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
			
			return await Evolve.SqlPool.request()
				.input('EvolveTravelModes_ID', Evolve.Sql.Int, data.EvolveTravelModes_ID)
				.input('EvolveTravelModes_Type', Evolve.Sql.NVarChar, data.EvolveTravelModes_Type)
				.input('EvolveTravelModes_Name', Evolve.Sql.NVarChar, data.EvolveTravelModes_Name)
				.input('EvolveTravelModes_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.input('EvolveTravelModes_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query(" UPDATE EvolveTravelModes SET EvolveTravelModes_Type=@EvolveTravelModes_Type ,  EvolveTravelModes_Name=@EvolveTravelModes_Name ,EvolveTravelModes_UpdatedAt=@EvolveTravelModes_UpdatedAt ,EvolveTravelModes_UpdatedUser=@EvolveTravelModes_UpdatedUser  WHERE EvolveTravelModes_ID = @EvolveTravelModes_ID  ");
        } catch (error) {
            Evolve.Log.error(" EERR32812: Error while update travel mode details " + error.message);
            return new Error(" EERR32812: Error while update travel mode details " + error.message);
        }
	},
	checkTravelMode: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			// .input('EvolveTravelModes_ID', Evolve.Sql.Int, data.EvolveTravelModes_ID)
			.input('EvolveTravelModes_Type', Evolve.Sql.NVarChar, data.EvolveTravelModes_Type)
			.input('EvolveTravelModes_Name', Evolve.Sql.NVarChar, data.EvolveTravelModes_Name)
			.query(" SELECT   * FROM  EvolveTravelModes WHERE EvolveTravelModes_Type=@EvolveTravelModes_Type AND EvolveTravelModes_Name=@EvolveTravelModes_Name  ");
        } catch (error) {
            Evolve.Log.error(" EERR32813: Error while check travel mode details " + error.message);
            return new Error(" EERR32813: Error while check travel mode details " + error.message);
        }
	},
	checkTravelModeOnUpdate: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveTravelModes_ID', Evolve.Sql.Int, data.EvolveTravelModes_ID)
			.input('EvolveTravelModes_Type', Evolve.Sql.NVarChar, data.EvolveTravelModes_Type)
			.input('EvolveTravelModes_Name', Evolve.Sql.NVarChar, data.EvolveTravelModes_Name)
			.query(" SELECT   * FROM  EvolveTravelModes WHERE EvolveTravelModes_Type=@EvolveTravelModes_Type AND EvolveTravelModes_Name=@EvolveTravelModes_Name  AND EvolveTravelModes_ID != @EvolveTravelModes_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32814: Error while check travel mode details " + error.message);
            return new Error(" EERR32814: Error while check travel mode details " + error.message);
        }
	},

    


}
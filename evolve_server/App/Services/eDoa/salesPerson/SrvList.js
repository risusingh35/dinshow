'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getSalesPersonListCount: async function (search ,EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
            .query(" SELECT COUNT(EvolveSalesPerson_ID) AS count FROM EvolveSalesPerson WHERE EvolveSalesPerson_Code LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get sales person list count "+error.message);
            return new Error(" EERR####: Error while get sales person list count "+error.message);
        }
    },

    getSalesPersonList: async function (start, length ,search , EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
                .query(" SELECT * FROM EvolveSalesPerson WHERE EvolveSalesPerson_Code LIKE @search ORDER BY EvolveSalesPerson_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get sales person ist "+error.message);
            return new Error(" EERR####: Error while get sales person ist "+error.message);
        }
    },

    // addSalesPerson: async function (EvolveUser_ID, data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveSalesPerson_Code', Evolve.Sql.NVarChar, data.EvolveSalesPerson_Code)
    //             .input('EvolveSalesPerson_Commission', Evolve.Sql.Float, data.EvolveSalesPerson_Commission)
    //             .input('EvolveSalesPerson_Territory', Evolve.Sql.NVarChar, data.EvolveSalesPerson_Territory)
    //             .input('EvolveSalesPerson_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .input('EvolveSalesPerson_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveSalesPerson_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .input('EvolveSalesPerson_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                
    //             .query(' INSERT INTO EvolveSalesPerson (EvolveSalesPerson_Code, EvolveSalesPerson_Commission, EvolveSalesPerson_Territory, EvolveSalesPerson_CreatedUser, EvolveSalesPerson_CreatedAt, EvolveSalesPerson_UpdatedUser,EvolveSalesPerson_UpdatedAt) VALUES (@EvolveSalesPerson_Code, @EvolveSalesPerson_Commission, @EvolveSalesPerson_Territory, @EvolveSalesPerson_CreatedUser, @EvolveSalesPerson_CreatedAt, @EvolveSalesPerson_UpdatedUser, @EvolveSalesPerson_UpdatedAt) ');

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####: Erorr while add sales person "+error.message);
    //         return new Error(" EERR####: Erorr while add sales person "+error.message);
    //     }
    // },

    // updateSalesPerson : async function (EvolveUser_ID, data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveSalesPerson_ID', Evolve.Sql.Int, data.EvolveSalesPerson_ID)
    //             .input('EvolveSalesPerson_Code', Evolve.Sql.NVarChar, data.EvolveSalesPerson_Code)
    //             .input('EvolveSalesPerson_Commission', Evolve.Sql.Float, data.EvolveSalesPerson_Commission)
    //             .input('EvolveSalesPerson_Territory', Evolve.Sql.NVarChar, data.EvolveSalesPerson_Territory)
    //             .input('EvolveSalesPerson_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .input('EvolveSalesPerson_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            
    //             .query(' UPDATE EvolveSalesPerson SET EvolveSalesPerson_Code = @EvolveSalesPerson_Code, EvolveSalesPerson_Commission = @EvolveSalesPerson_Commission, EvolveSalesPerson_Territory = @EvolveSalesPerson_Territory WHERE EvolveSalesPerson_ID = @EvolveSalesPerson_ID ');

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####:  Erorr while update sales person"+error.message);
    //         return new Error(" EERR####:  Erorr while update sales person"+error.message);
    //     }
    // },

    deleteSalesPerson : async function (EvolveSalesPerson_ID) {
        try {
            return await Evolve.SqlPool.request()
            
            .input('EvolveSalesPerson_ID', Evolve.Sql.Int, EvolveSalesPerson_ID)
            
                .query(' DELETE FROM EvolveSalesPerson WHERE EvolveSalesPerson_ID = @EvolveSalesPerson_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while delete sales person "+error.message);
            return new Error(" EERR####:  Erorr while delete sales person "+error.message);
        }
    },

    checkSalesPersonCodeExist : async function (EvolveSalesPerson_Code) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveSalesPerson_Code', Evolve.Sql.NVarChar, EvolveSalesPerson_Code)
            .query(' SELECT * FROM EvolveSalesPerson WHERE EvolveSalesPerson_Code = @EvolveSalesPerson_Code ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while check sales person code "+error.message);
            return new Error(" EERR####:  Erorr while check sales person code "+error.message);
        }
    },

    addSalesPerson: async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                // .input('EvolveSalesPerson_Code', Evolve.Sql.NVarChar, data['Sort Name'])
                // .input('EvolveSalesPerson_Name', Evolve.Sql.NVarChar, data['Slspsn'])

                .input('EvolveSalesPerson_Code', Evolve.Sql.NVarChar, data['Slspsn'])
                .input('EvolveSalesPerson_Name', Evolve.Sql.NVarChar, data['Sort Name'])
                .input('EvolveSalesPerson_Email', Evolve.Sql.NVarChar, data['Email'])
                .input('EvolveSalesPerson_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveSalesPerson_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSalesPerson_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveSalesPerson_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                
                .query(' INSERT INTO EvolveSalesPerson (EvolveSalesPerson_Code, EvolveSalesPerson_Name, EvolveSalesPerson_Email, EvolveSalesPerson_CreatedUser, EvolveSalesPerson_CreatedAt, EvolveSalesPerson_UpdatedUser,EvolveSalesPerson_UpdatedAt) VALUES (@EvolveSalesPerson_Code, @EvolveSalesPerson_Name, @EvolveSalesPerson_Email, @EvolveSalesPerson_CreatedUser, @EvolveSalesPerson_CreatedAt, @EvolveSalesPerson_UpdatedUser, @EvolveSalesPerson_UpdatedAt) ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add sales person "+error.message);
            return new Error(" EERR####: Erorr while add sales person "+error.message);
        }
    },

    updateSalesPerson : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSalesPerson_ID', Evolve.Sql.Int, data['EvolveSalesPerson_ID'])
                .input('EvolveSalesPerson_Code', Evolve.Sql.NVarChar,data['Slspsn'])
                .input('EvolveSalesPerson_Name', Evolve.Sql.NVarChar, data['Sort Name'])
                .input('EvolveSalesPerson_Email', Evolve.Sql.NVarChar, data['Email'])
                .input('EvolveSalesPerson_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveSalesPerson_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            
                .query(' UPDATE EvolveSalesPerson SET EvolveSalesPerson_Code = @EvolveSalesPerson_Code, EvolveSalesPerson_Name = @EvolveSalesPerson_Name, EvolveSalesPerson_Email = @EvolveSalesPerson_Email, EvolveSalesPerson_UpdatedUser = @EvolveSalesPerson_UpdatedUser, EvolveSalesPerson_UpdatedAt = @EvolveSalesPerson_UpdatedAt WHERE EvolveSalesPerson_ID = @EvolveSalesPerson_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while update sales person"+error.message);
            return new Error(" EERR####:  Erorr while update sales person"+error.message);
        }
    },



}
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
	getUsersDatatableList: async function (id, start, length) {
		try {
			return await Evolve.SqlPool.request()
				.input('start', Evolve.Sql.Int, start)
				.input('length', Evolve.Sql.Int, length)
				.query('select EvolveUser_ID,EvolveUser_login,EvolveUser_Name,EvolveUser_EmailID,EvolveUser_CreatedAt from EvolveUser ORDER BY EvolveUser_ID DESC');
		} catch (error) {
			Evolve.Log.error(" EERR1470: Error while getting Users Datatable List "+error.message);
			return new Error(" EERR1470: Error while getting Users Datatable List "+error.message);
		}
	},
	deleteUser: async function (id) {
		try {
			return await Evolve.SqlPool.request()
				.input('id', Evolve.Sql.Int, id)
				.query('DELETE FROM EvolveUser WHERE EvolveUser_ID = @id')
		} catch (error) {
			Evolve.Log.error(" EERR1471: Error while deleting User "+error.message);
			return new Error(" EERR1471: Error while deleting User "+error.message);
		}
	},

	getCompanyListById: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
				.query('SELECT eut.EvolveUnit_ID , eut.EvolveUnit_Name FROM EvolveCompany ec , EvolveUnit eut WHERE ec.EvolveCompany_ID = eut.EvolveCompany_ID  AND ec.EvolveCompany_ID = @EvolveCompany_ID')
		} catch (error) {
			Evolve.Log.error(" EERR1472: Error while gettting Company List By Id "+error.message);
			return new Error(" EERR1472: Error while gettting Company List By Id "+error.message);
		}
	},

	CompanyList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('select EvolveCompany_ID,EvolveCompany_Name from EvolveCompany')
		} catch (error) {
			Evolve.Log.error(" EERR1473: Error in Company List "+error.message);
			return new Error(" EERR1473: Error in Company List "+error.message);
		}
	},

	getRoleList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT EvolveRole_ID,EvolveRole_Name FROM EvolveRole WHERE EvolveRole_IsActive = 1')
		} catch (error) {
			Evolve.Log.error(" EERR1474: Error while getting Role List "+error.message);
			return new Error(" EERR1474: Error while getting Role List "+error.message);
		}
	},

	selectSingleUser: async function (data) {
		try {
			let userRes = {};
			let userData = await Evolve.SqlPool.request()
				.query('SELECT eu.*, em.EvolveMenu_AppId FROM EvolveUser eu LEFT JOIN EvolveMenu em ON em.EvolveMenu_Id = eu.EvolveUser_DefaultMenu_ID WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
			if (userData.rowsAffected > 0) {
				userRes['user'] = userData.recordset[0]
				let userRole = await Evolve.SqlPool.request()
					.query('select EvolveRole_ID From EvolveUserRoleLink WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
				if (userRole.rowsAffected > 0) {
					userRes['role'] = userRole.recordset
				}
				else {
					Evolve.Log.error(" EERR1475: Error : User Role Not Found ");
					return new Error(" EERR1475: Error : User Role Not Found ");
				}
				let userUnit = await Evolve.SqlPool.request()
					.query('select EvolveUnit_ID From EvolveUserUnitLink WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
				if (userUnit.rowsAffected > 0) {
					userRes['unit'] = userUnit.recordset
				}
				else {
					Evolve.Log.error(" EERR1476: Error : User Unit Not Found ");
					return new Error(" EERR1476: Error : User Unit Not Found ");
				}
				let userCompany = await Evolve.SqlPool.request()
					.query('select EvolveCompany_ID From EvolveUserCompanyLink WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
				if (userCompany.rowsAffected > 0) {
					userRes['company'] = userCompany.recordset
				}
				else {
					Evolve.Log.error(" EERR1477: Error : User Company Link Not Found ");
					return new Error(" EERR1477: Error : User Company Link Not Found ");
				}
				let assignedBranch = await Evolve.SqlPool.request()
					.query('select EvolveBranch_ID FROM EvolveUserToBranch WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
				userRes['Branch'] = assignedBranch.recordset

				return userRes;
			}
			else {
				Evolve.Log.error(" EERR1478: Error : User Not Found");
				return new Error(" EERR1478: Error : User Not Found");
			}
		} catch (error) {
			Evolve.Log.error(" EERR1479: Error while selecting single user "+error.message);
			return new Error(" EERR1479: Error while selecting single user "+error.message);
		}
	},

	getLastPassword: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
				.query("SELECT EvolveUser_OldPassword from EvolveUser where EvolveUser_ID = @EvolveUser_ID");
		} catch (error) {
			Evolve.Log.error(" EERR1480: Error while getting Last Password "+error.message);
			return new Error(" EERR1480: Error while getting Last Password "+error.message);
		}
	},

	updateUser: async function (data) {
		try {
			let dataTime = new Date();
			let update_user = '';
			if (data.EvolveUser_password == '') {
				update_user = await Evolve.SqlPool.request()
					.input('EvolveUser_ID', Evolve.Sql.NVarChar, data.EvolveUser_ID)
					.input('EvolveUser_login', Evolve.Sql.NVarChar, data.EvolveUser_login)
					.input('EvolveUser_EmailID', Evolve.Sql.NVarChar, data.EvolveUser_EmailID)
					.input('EvolveUser_Name', Evolve.Sql.NVarChar, data.EvolveUser_Name)
					.input('EvolveUser_IsActive', Evolve.Sql.Bit, data.EvolveUser_IsActive)
					.input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
					.input('EvolveUser_UpdatedAt', Evolve.Sql.DateTime, dataTime)
					.input('EvolveUser_PrintAllow', Evolve.Sql.Bit, data.EvolveUser_PrintAllow)
					.input('EvolveUser_CreatePoAllow', Evolve.Sql.Bit, data.EvolveUser_CreatePoAllow)
					.input('EvolveUser_IsBranchUser', Evolve.Sql.Bit, data.EvolveUser_IsBranchUser)
					.input('EvolveUser_ActiveDirIsActive', Evolve.Sql.Bit, data.EvolveUser_ActiveDirIsActive)
					.input('EvolveUser_ActiveDirUrl', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUrl)
					.input('EvolveUser_ActiveDirBaseDN', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirBaseDN)
					.input('EvolveUser_ActiveDirUserName', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUserName)
					.input('EvolveUser_ActiveDirPassword', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirPassword)
					.input('EvolveUser_DefaultMenu_ID', Evolve.Sql.Int, data.EvolveUser_DefaultMenu_ID)
					.query('UPDATE EvolveUser SET EvolveUser_login=@EvolveUser_login,EvolveUser_EmailID=@EvolveUser_EmailID,EvolveUser_Name=@EvolveUser_Name,EvolveUser_IsActive=@EvolveUser_IsActive,EvolveUser_UpdatedUser=@EvolveUser_UpdatedUser,EvolveUser_UpdatedAt=@EvolveUser_UpdatedAt , EvolveUser_PrintAllow = @EvolveUser_PrintAllow  , EvolveUser_CreatePoAllow = @EvolveUser_CreatePoAllow  , EvolveUser_IsBranchUser=@EvolveUser_IsBranchUser , EvolveUser_ActiveDirIsActive = @EvolveUser_ActiveDirIsActive , EvolveUser_ActiveDirUrl = @EvolveUser_ActiveDirUrl , EvolveUser_ActiveDirBaseDN = @EvolveUser_ActiveDirBaseDN , EvolveUser_ActiveDirUserName = @EvolveUser_ActiveDirUserName , EvolveUser_ActiveDirPassword = @EvolveUser_ActiveDirPassword, EvolveUser_DefaultMenu_ID = @EvolveUser_DefaultMenu_ID WHERE EvolveUser_ID=@EvolveUser_ID');
			} else {
				let user_pass = Evolve.Bcrypt.hashSync(data.EvolveUser_password, 10)
				update_user = await Evolve.SqlPool.request()
					.input('EvolveUser_ID', Evolve.Sql.NVarChar, data.EvolveUser_ID)
					.input('EvolveUser_login', Evolve.Sql.NVarChar, data.EvolveUser_login)
					.input('EvolveUser_EmailID', Evolve.Sql.NVarChar, data.EvolveUser_EmailID)
					.input('EvolveUser_Name', Evolve.Sql.NVarChar, data.EvolveUser_Name)
					.input('EvolveUser_password', Evolve.Sql.NVarChar, user_pass)
					.input('EvolveUser_IsActive', Evolve.Sql.Bit, data.EvolveUser_IsActive)
					.input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
					.input('EvolveUser_UpdatedAt', Evolve.Sql.DateTime, dataTime)
					.input('EvolveUser_PrintAllow', Evolve.Sql.Bit, data.EvolveUser_PrintAllow)
					.input('EvolveUser_CreatePoAllow', Evolve.Sql.Bit, data.EvolveUser_CreatePoAllow)
					.input('EvolveUser_IsBranchUser', Evolve.Sql.Bit, data.EvolveUser_IsBranchUser)
					.input('EvolveUser_ActiveDirIsActive', Evolve.Sql.Bit, data.EvolveUser_ActiveDirIsActive)
					.input('EvolveUser_ActiveDirUrl', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUrl)
					.input('EvolveUser_ActiveDirBaseDN', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirBaseDN)
					.input('EvolveUser_ActiveDirUserName', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUserName)
					.input('EvolveUser_ActiveDirPassword', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirPassword)
					.input('EvolveUser_DefaultMenu_ID', Evolve.Sql.Int, data.EvolveUser_DefaultMenu_ID)
					.query('UPDATE EvolveUser SET EvolveUser_login=@EvolveUser_login,EvolveUser_EmailID=@EvolveUser_EmailID,EvolveUser_Name=@EvolveUser_Name,EvolveUser_password=@EvolveUser_password,EvolveUser_IsActive=@EvolveUser_IsActive,EvolveUser_UpdatedUser=@EvolveUser_UpdatedUser,EvolveUser_UpdatedAt=@EvolveUser_UpdatedAt ,EvolveUser_PrintAllow = @EvolveUser_PrintAllow , EvolveUser_CreatePoAllow= @EvolveUser_CreatePoAllow  , EvolveUser_IsBranchUser = @EvolveUser_IsBranchUser , EvolveUser_ActiveDirIsActive = @EvolveUser_ActiveDirIsActive , EvolveUser_ActiveDirUrl = @EvolveUser_ActiveDirUrl , EvolveUser_ActiveDirBaseDN = @EvolveUser_ActiveDirBaseDN , EvolveUser_ActiveDirUserName = @EvolveUser_ActiveDirUserName , EvolveUser_ActiveDirPassword = @EvolveUser_ActiveDirPassword, EvolveUser_DefaultMenu_ID = @EvolveUser_DefaultMenu_ID  WHERE EvolveUser_ID=@EvolveUser_ID');
			}
			if (update_user instanceof Error || update_user.rowsAffected < 1) {
				Evolve.Log.Error(" EERR1481: Error In Create User ", result);
				return new Error(" EERR1481: Error In Create User ")
			} else {
				let update_userToCmp = await Evolve.SqlPool.request()
					.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
					.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
					.input('EvolveUserCompanyLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
					.input('EvolveUserCompanyLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
					.query('UPDATE EvolveUserCompanyLink SET EvolveCompany_ID=@EvolveCompany_ID,EvolveUserCompanyLink_UpdatedUser=@EvolveUserCompanyLink_UpdatedUser,EvolveUserCompanyLink_UpdatedAt=@EvolveUserCompanyLink_UpdatedAt WHERE EvolveUser_ID = @EvolveUser_ID');

				if (update_userToCmp instanceof Error || update_userToCmp.rowsAffected < 1) {
					Evolve.Log.Error(" EERR1482: Error In Update User To Company Link ", update_userToCmp);
					return new Error(" EERR1482: Error In Update User To Company Link")
				}
				else {
					let userUnits = await Evolve.SqlPool.request()
						.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
						.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
						.query('select EvolveUnit_ID From EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID AND  EvolveCompany_ID = @EvolveCompany_ID')
					if (userUnits) {
						if (userUnits.rowsAffected > 0) {
							let unitData = userUnits.recordset
							let unitAll = []
							let unitGet = []
							for (let i = 0; i < unitData.length; i++) {
								unitAll[i] = unitData[i]['EvolveUnit_ID']
							}
							for (let i = 0; i < data.EvolveUnit_ID.length; i++) {
								unitGet[i] = parseInt(data.EvolveUnit_ID[i])
							}
							var removed_unit = unitAll.filter(function (obj) { return unitGet.indexOf(obj) == -1; });
							var added_unit = unitGet.filter(function (obj) { return unitAll.indexOf(obj) == -1; });
							for (let i = 0; i < removed_unit.length; i++) {
								let remove_unit = await Evolve.SqlPool.request()
									.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
									.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
									.input('EvolveUnit_ID', Evolve.Sql.Int, removed_unit[i])
									.query('DELETE FROM EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveCompany_ID = @EvolveCompany_ID AND EvolveUnit_ID = @EvolveUnit_ID')
							}
							for (let i = 0; i < added_unit.length; i++) {
								let add_unit = await Evolve.SqlPool.request()
									.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
									.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
									.input('EvolveUnit_ID', Evolve.Sql.Int, added_unit[i])
									.input('EvolveUserUnitLink_CreatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
									.input('EvolveUserUnitLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
									.input('EvolveUserUnitLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
									.input('EvolveUserUnitLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
									.query('INSERT INTO EvolveUserUnitLink (EvolveUser_ID,EvolveCompany_ID,EvolveUnit_ID,EvolveUserUnitLink_CreatedUser,EvolveUserUnitLink_CreatedAt,EvolveUserUnitLink_UpdatedUser,EvolveUserUnitLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveCompany_ID,@EvolveUnit_ID,@EvolveUserUnitLink_CreatedUser,@EvolveUserUnitLink_CreatedAt,@EvolveUserUnitLink_UpdatedUser,@EvolveUserUnitLink_UpdatedAt)');
							}
						}
					} else {
						Evolve.Log.Error(" EERR1483: Error In Get User Units ", userUnits);
						return new Error(" EERR1483: Error In Get User Units ")
					}
					let userRoles = await Evolve.SqlPool.request()
						.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
						.query('select EvolveRole_ID From EvolveUserRoleLink WHERE EvolveUser_ID = @EvolveUser_ID')
					if (userRoles) {
						if (userRoles.rowsAffected > 0) {
							let roleData = userRoles.recordset
							let roleAll = []
							let roleGet = []
							for (let i = 0; i < roleData.length; i++) {
								roleAll[i] = roleData[i]['EvolveRole_ID']
							}
							for (let i = 0; i < data.EvolveRole_ID.length; i++) {
								roleGet[i] = parseInt(data.EvolveRole_ID[i])
							}
							var removed_role = roleAll.filter(function (obj) { return roleGet.indexOf(obj) == -1; });
							var added_role = roleGet.filter(function (obj) { return roleAll.indexOf(obj) == -1; });
							for (let i = 0; i < removed_role.length; i++) {
								let remove_unit = await Evolve.SqlPool.request()
									.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
									.input('EvolveRole_ID', Evolve.Sql.Int, removed_role[i])
									.query('DELETE FROM EvolveUserRoleLink WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveRole_ID = @EvolveRole_ID')
							}
							for (let i = 0; i < added_role.length; i++) {
								let add_role = await Evolve.SqlPool.request()
									.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
									.input('EvolveRole_ID', Evolve.Sql.Int, added_role[i])
									.input('EvolveUserRoleLink_CreatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
									.input('EvolveUserRoleLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
									.input('EvolveUserRoleLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
									.input('EvolveUserRoleLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
									.query('INSERT INTO EvolveUserRoleLink (EvolveUser_ID,EvolveRole_ID,EvolveUserRoleLink_CreatedUser,EvolveUserRoleLink_CreatedAt,EvolveUserRoleLink_UpdatedUser,EvolveUserRoleLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveRole_ID,@EvolveUserRoleLink_CreatedUser,@EvolveUserRoleLink_CreatedAt,@EvolveUserRoleLink_UpdatedUser,@EvolveUserRoleLink_UpdatedAt)');
							}
						}
					} else {
						Evolve.Log.Error(" EERR1484: Error In Get User Units ", userUnits);
						return new Error(" EERR1484: Error In Get User Units ")
					}
				}
				return update_user;
			}
		} catch (error) {
			Evolve.Log.error(" EERR1485: Error while updating user "+error.message);
			return new Error(" EERR1485: Error while updating user "+error.message);
		}
	},

	createUser: async function (data) {
		try {
			let dataTime = new Date();
			let user_pass = Evolve.Bcrypt.hashSync(data.EvolveUser_password, 10)
			let create_user = await Evolve.SqlPool.request()
				.input('EvolveUser_login', Evolve.Sql.NVarChar, data.EvolveUser_login)
				.input('EvolveUser_EmailID', Evolve.Sql.NVarChar, data.EvolveUser_EmailID)
				.input('EvolveUser_Name', Evolve.Sql.NVarChar, data.EvolveUser_Name)
				.input('EvolveUser_password', Evolve.Sql.NVarChar, user_pass)
				.input('EvolveUser_IsActive', Evolve.Sql.Bit, data.EvolveUser_IsActive)
				.input('EvolveUser_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveUser_CreatedAt', Evolve.Sql.DateTime, dataTime)
				.input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveUser_UpdatedAt', Evolve.Sql.DateTime, dataTime)
				.input('EvolveUser_PrintAllow', Evolve.Sql.Bit, data.EvolveUser_PrintAllow)
				.input('EvolveUser_CreatePoAllow', Evolve.Sql.Bit, data.EvolveUser_CreatePoAllow)
				.input('EvolveUser_IsBranchUser', Evolve.Sql.Bit, data.EvolveUser_IsBranchUser)
				.input('EvolveUser_OldPassword', Evolve.Sql.NVarChar, '0,0,' + user_pass)
				.input('EvolveUser_ActiveDirIsActive', Evolve.Sql.Bit, data.EvolveUser_ActiveDirIsActive)
				.input('EvolveUser_ActiveDirUrl', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUrl)
				.input('EvolveUser_ActiveDirBaseDN', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirBaseDN)
				.input('EvolveUser_ActiveDirUserName', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUserName)
				.input('EvolveUser_ActiveDirPassword', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirPassword)
				.input('EvolveUser_DefaultMenu_ID', Evolve.Sql.Int, data.EvolveUser_DefaultMenu_ID)

				.query('INSERT INTO EvolveUser (EvolveUser_login,EvolveUser_EmailID,EvolveUser_Name,EvolveUser_password,EvolveUser_IsActive,EvolveUser_CreatedUser,EvolveUser_CreatedAt,EvolveUser_UpdatedUser,EvolveUser_UpdatedAt,EvolveUser_PrintAllow,EvolveUser_CreatePoAllow,EvolveUser_OldPassword ,  EvolveUser_IsBranchUser,EvolveUser_ActiveDirIsActive,EvolveUser_ActiveDirUrl,EvolveUser_ActiveDirBaseDN,EvolveUser_ActiveDirUserName,EvolveUser_ActiveDirPassword,EvolveUser_DefaultMenu_ID) VALUES (@EvolveUser_login,@EvolveUser_EmailID,@EvolveUser_Name,@EvolveUser_password,@EvolveUser_IsActive,@EvolveUser_CreatedUser,@EvolveUser_CreatedAt,@EvolveUser_UpdatedUser,@EvolveUser_UpdatedAt,@EvolveUser_PrintAllow,@EvolveUser_CreatePoAllow,@EvolveUser_OldPassword ,@EvolveUser_IsBranchUser,@EvolveUser_ActiveDirIsActive,@EvolveUser_ActiveDirUrl,@EvolveUser_ActiveDirBaseDN,@EvolveUser_ActiveDirUserName,@EvolveUser_ActiveDirPassword, @EvolveUser_DefaultMenu_ID);select @@IDENTITY AS \'inserted_id\'');

			if (create_user instanceof Error || create_user.rowsAffected < 1) {
				Evolve.Log.Error(" EERR1486: Error In Create User ", result);
				return new Error(" EERR1486: Error In Create User ")
			} else {
				let inserted_id_user = create_user.recordset[0].inserted_id;

				let create_userToCmp = await Evolve.SqlPool.request()
					.input('EvolveUser_ID', Evolve.Sql.Int, inserted_id_user)
					.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
					.input('EvolveUserCompanyLink_IsDefault', Evolve.Sql.Bit, false)
					.input('EvolveUserCompanyLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
					.input('EvolveUserCompanyLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
					.input('EvolveUserCompanyLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
					.input('EvolveUserCompanyLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
					.query('INSERT INTO EvolveUserCompanyLink (EvolveUser_ID,EvolveCompany_ID,EvolveUserCompanyLink_IsDefault,EvolveUserCompanyLink_CreatedUser,EvolveUserCompanyLink_CreatedAt,EvolveUserCompanyLink_UpdatedUser,EvolveUserCompanyLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveCompany_ID,@EvolveUserCompanyLink_IsDefault,@EvolveUserCompanyLink_CreatedUser,@EvolveUserCompanyLink_CreatedAt,@EvolveUserCompanyLink_UpdatedUser,@EvolveUserCompanyLink_UpdatedAt);select @@IDENTITY AS \'inserted_id\'');

				if (create_userToCmp instanceof Error || create_userToCmp.rowsAffected < 1) {
					Evolve.Log.Error(" EERR1487: Error In Create User To Company Link ", result);
					return new Error(" EERR1487: Error In Create User To Company Link ")
				} else {
					for (let i = 0; i < data.EvoleUnit_ID.length; i++) {
						await Evolve.SqlPool.request()
							.input('EvolveUser_ID', Evolve.Sql.Int, inserted_id_user)
							.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
							.input('EvolveUnit_ID', Evolve.Sql.Int, data.EvoleUnit_ID[i])
							.input('EvolveUserUnitLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolveUserUnitLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
							.input('EvolveUserUnitLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolveUserUnitLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
							.query('INSERT INTO EvolveUserUnitLink (EvolveUser_ID,EvolveCompany_ID,EvolveUnit_ID,EvolveUserUnitLink_CreatedUser,EvolveUserUnitLink_CreatedAt,EvolveUserUnitLink_UpdatedUser,EvolveUserUnitLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveCompany_ID,@EvolveUnit_ID,@EvolveUserUnitLink_CreatedUser,@EvolveUserUnitLink_CreatedAt,@EvolveUserUnitLink_UpdatedUser,@EvolveUserUnitLink_UpdatedAt)');
					}

					for (let i = 0; i < data.EvoleRole_ID.length; i++) {
						await Evolve.SqlPool.request()
							.input('EvolveUser_ID', Evolve.Sql.Int, inserted_id_user)
							.input('EvolveRole_ID', Evolve.Sql.Int, data.EvoleRole_ID[i])
							.input('EvolveUserRoleLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolveUserRoleLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
							.input('EvolveUserRoleLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolveUserRoleLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
							.query('INSERT INTO EvolveUserRoleLink (EvolveUser_ID,EvolveRole_ID,EvolveUserRoleLink_CreatedUser,EvolveUserRoleLink_CreatedAt,EvolveUserRoleLink_UpdatedUser,EvolveUserRoleLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveRole_ID,@EvolveUserRoleLink_CreatedUser,@EvolveUserRoleLink_CreatedAt,@EvolveUserRoleLink_UpdatedUser,@EvolveUserRoleLink_UpdatedAt)');
					}
				}
				return create_user;
			}
		} catch (error) {
			Evolve.Log.error(" EERR1488: Error while creating user "+error.message);
			return new Error(" EERR1488: Error while creating user "+error.message);
		}
	},

	getBranchList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT * FROM EvolveBranch')
		} catch (error) {
			Evolve.Log.error(" EERR1489: Error while getting branch list "+error.message);
			return new Error(" EERR1489: Error while getting branch list "+error.message);
		}
	},

	assignBranch: async function (data, branch_id) {
		try {
			let dataTime = new Date();
			return await Evolve.SqlPool.request()
				.input('EvolveBranch_ID', Evolve.Sql.Int, branch_id)
				.input('EvolveUser_ID', Evolve.Sql.Int, data.insertUser_ID)
				.input('EvolveUserToBranch_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveUserToBranch_CreatedAt', Evolve.Sql.DateTime, dataTime)
				.input('EvolveUserToBranch_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveUserToBranch_UpdatedAt', Evolve.Sql.DateTime, dataTime)
				.query('INSERT INTO EvolveUserToBranch (EvolveBranch_ID ,EvolveUser_ID,EvolveUserToBranch_CreatedUser,EvolveUserToBranch_CreatedAt,EvolveUserToBranch_UpdatedUser,EvolveUserToBranch_UpdatedAt)VALUES (@EvolveBranch_ID,@EvolveUser_ID,@EvolveUserToBranch_CreatedUser,@EvolveUserToBranch_CreatedAt,@EvolveUserToBranch_UpdatedUser,@EvolveUserToBranch_UpdatedAt) ');
		} catch (error) {
			Evolve.Log.error(" EERR1490: Error while assigning Branch "+error.message);
			return new Error(" EERR1490: Error while assigning Branch "+error.message);
		}
	},


	// updateBranch: async function (data) {
	// 	try {
	// 		let dataTime = new Date();
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveBranch_ID', Evolve.Sql.Int, data.EvolveBranch_ID)
	// 			.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
	// 			.input('EvolveUserToBranch_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
	// 			.input('EvolveUserToBranch_CreatedAt', Evolve.Sql.DateTime, dataTime)
	// 			.input('EvolveUserToBranch_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
	// 			.input('EvolveUserToBranch_UpdatedAt', Evolve.Sql.DateTime, dataTime)
	// 			.query('INSERT INTO EvolveUserToBranch (EvolveBranch_ID ,EvolveUser_ID,EvolveUserToBranch_CreatedUser,EvolveUserToBranch_CreatedAt,EvolveUserToBranch_UpdatedUser,EvolveUserToBranch_UpdatedAt)VALUES (@EvolveBranch_ID,@EvolveUser_ID,@EvolveUserToBranch_CreatedUser,@EvolveUserToBranch_CreatedAt,@EvolveUserToBranch_UpdatedUser,@EvolveUserToBranch_UpdatedAt) ');

	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },


	deleteBranchAssignment: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveUser_ID', Evolve.Sql.Int, data.insertUser_ID)
				.query('DELETE FROM EvolveUserToBranch WHERE EvolveUser_ID = @EvolveUser_ID')
		} catch (error) {
			Evolve.Log.error(" EERR1491: Error while  deleting Branch Assignment "+error.message);
			return new Error(" EERR1491: Error while  deleting Branch Assignment "+error.message);
		}
	},

	getAppList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT * FROM EvolveApp");
		} catch (error) {
			Evolve.Log.error(" EERR1492: Error while getting App List "+error.message);
			return new Error(" EERR1492: Error while getting App List "+error.message);
		}
	},
	getDefaultMenuList: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
				.query("SELECT EvolveMenu_Id, EvolveMenu_Name FROM EvolveMenu WHERE EvolveMenu_AppId = @EvolveMenu_AppId AND EvolveMenu_IsActive = 'true'");
		} catch (error) {
			Evolve.Log.error(" EERR1493: Error while getting Default Menu List "+error.message);
			return new Error(" EERR1493: Error while getting Default Menu List "+error.message);
		}
	},


	demoInsert : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveStudent_Fname', Evolve.Sql.NVarChar, data.EvolveStudent_Fname)
				.input('EvolveStudent_Lname', Evolve.Sql.NVarChar, data.EvolveStudent_Lname)
				.query('INSERT INTO EvolveStudent (EvolveStudent_Fname,EvolveStudent_Lname) VALUES(@EvolveStudent_Fname,@EvolveStudent_Lname)');
		} catch (error) {
			Evolve.Log.error("Error while demo insert "+error.message);
			return new Error("Error while demo insert "+error.message);
		}
	},

	demoAnkitFormData : async function(data){
		try {
			return await Evolve.SqlPool.request()
		.input('EvolveForm_FirstName', Evolve.Sql.NVarChar, data.EvolveForm_FirstName)
		.input('EvolveForm_MiddelName', Evolve.Sql.NVarChar, data.EvolveForm_MiddelName)
		.input('EvolveForm_LastName', Evolve.Sql.NVarChar, data.EvolveForm_LastName)
		.input('EvolveForm_DateOfBirth', Evolve.Sql.Date, data.EvolveForm_DateOfBirth)
		.input('EvolveForm_Gender', Evolve.Sql.NVarChar, data.EvolveForm_Gender)
		.input('EvolveForm_MaritalStatus', Evolve.Sql.NVarChar, data.EvolveForm_MaritalStatus)
		.input('EvolveForm_Address', Evolve.Sql.NVarChar, data.EvolveForm_Address)
		.input('EvolveForm_State', Evolve.Sql.NVarChar, data.EvolveForm_State)
		.input('EvolveForm_City', Evolve.Sql.NVarChar, data.EvolveForm_City)
		.input('EvolveForm_ContactNumber', Evolve.Sql.BigInt, data.EvolveForm_ContactNumber)
		.input('EvolveForm_EmailAddress', Evolve.Sql.NVarChar, data.EvolveForm_EmailAddress)
		.input('EvolveForm_HeigherEducation', Evolve.Sql.NVarChar, data.EvolveForm_HeigherEducation)
		.input('EvolveForm_Occupation', Evolve.Sql.NVarChar, data.EvolveForm_Occupation)
		.input('EvolveForm_Hobbies_PlayingGames', Evolve.Sql.Bit, data.EvolveForm_Hobbies_PlayingGames)
		.input('EvolveForm_Hobbies_Singing', Evolve.Sql.Bit, data.EvolveForm_Hobbies_Singing)
		.input('EvolveForm_Hobbies_Dance', Evolve.Sql.Bit, data.EvolveForm_Hobbies_Dance)
		.input('EvolveForm_Hobbies_VisitNewPlaces', Evolve.Sql.Bit, data.EvolveForm_Hobbies_VisitNewPlaces)
		.input('EvolveForm_Hobbies_Reading', Evolve.Sql.Bit, data.EvolveForm_Hobbies_Reading)
		.query('INSERT INTO DemoAnkitFormData (EvolveForm_FirstName,EvolveForm_MiddelName,EvolveForm_LastName,EvolveForm_DateOfBirth,EvolveForm_Gender,EvolveForm_MaritalStatus,EvolveForm_Address,EvolveForm_State,EvolveForm_City,EvolveForm_ContactNumber,EvolveForm_EmailAddress,EvolveForm_HeigherEducation,EvolveForm_Occupation,EvolveForm_Hobbies_PlayingGames,EvolveForm_Hobbies_Singing,EvolveForm_Hobbies_Dance,EvolveForm_Hobbies_VisitNewPlaces,EvolveForm_Hobbies_Reading) VALUES(@EvolveForm_FirstName,@EvolveForm_MiddelName,@EvolveForm_LastName,@EvolveForm_DateOfBirth,@EvolveForm_Gender,@EvolveForm_MaritalStatus,@EvolveForm_Address,@EvolveForm_State,@EvolveForm_City,@EvolveForm_ContactNumber	,@EvolveForm_EmailAddress,@EvolveForm_HeigherEducation,@EvolveForm_Occupation,@EvolveForm_Hobbies_PlayingGames,@EvolveForm_Hobbies_Singing,@EvolveForm_Hobbies_Dance,@EvolveForm_Hobbies_VisitNewPlaces,@EvolveForm_Hobbies_Reading)');
		
		} catch (error) {
			Evolve.Log.error("Error while insertiiiing Form Data "+error.message);
			return new Error("Error while insertiiiing Form Data "+error.message);
		}
	},

	// SO Shipment -- start
	getShipDetails : async function(EvolveSoPickList_ShipID,displayRecord,startFrom) { 
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveSoPickList_ShipID', Evolve.Sql.NVarChar, EvolveSoPickList_ShipID)
			.input('displayRecord', Evolve.Sql.Int, displayRecord)
			.input('startFrom', Evolve.Sql.Int, startFrom)
			.query(" SELECT sup.EvolveSupplier_Name, so.EvolveSalesOrder_ShipTo, so.EvolveSalesOrder_Number, sol.EvolveSalesOrderLine_Number, ei.EvolveItem_Code, ei.EvolveItem_Desc, sol.EvolveSalesOrderLine_OrderQty, sopl.EvolvePickList_QtyPick, (select count(sopld.EvolveInventory_ID) from EvolveSoPickListDetail sopld, EvolveSoPickList sopl where sopld.EvolveSoPickList_ID=sopl.EvolveSoPickList_ID and sopl.EvolveSoPickList_ShipID=@EvolveSoPickList_ShipID) as totalPallets from EvolveSoPickList sopl, EvolveSupplier sup, EvolveSalesOrder so, EvolveSalesOrderLine sol, EvolveItem ei where sopl.EvolveSalesOrder_ID=so.EvolveSalesOrder_ID and so.EvolveSalesOrder_Cust=sup.EvolveSupplier_Code and so.EvolveSalesOrder_ID= sol.EvolveSalesOrder_ID and sopl.EvolveItem_ID= ei.EvolveItem_ID and sopl.EvolveSoPickList_ShipID= @EvolveSoPickList_ShipID order by so.EvolveSalesOrder_ID offset @startFrom rows fetch next @displayRecord rows only")
		} catch (error) {
			Evolve.Log.error("Error while getting SO ShipData "+error.message);
			return new Error("Error while getting SO ShipData "+error.message);
		}
	},

	getShipDetailsCount : async function(EvolveSoPickList_ShipID) {
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveSoPickList_ShipID', Evolve.Sql.NVarChar, EvolveSoPickList_ShipID)
			.query(" SELECT COUNT( esol.EvolveSalesOrderLine_ID ) as count from EvolveSalesOrderLine esol, EvolveSoPickList espl WHERE esol.EvolveSalesOrder_ID=espl.EvolveSalesOrder_ID and espl.EvolveSoPickList_ShipID = @EvolveSoPickList_ShipID ")
		} catch (error) {
			Evolve.Log.error("Error while getting SO ShipDataCount "+error.message);
			return new Error("Error while getting SO ShipDataCount "+error.message);
		}
	},

	confirmShipment : async function(confirmShipment_data) {
		try {
			let datetime = new Date();
			console.log(datetime)
			return await Evolve.SqlPool.request()
			.input('EvolveSoPickList_ShipID', Evolve.Sql.Int, confirmShipment_data.EvolveSoPickList_ShipID)
			.input('EvolveSoPickList_TotalPallets', Evolve.Sql.Int, confirmShipment_data.EvolveSoPickList_TotalPallets)
			.input('EvolveSoPickList_GrossWT', Evolve.Sql.Int, confirmShipment_data.EvolveSoPickList_GrossWT)
			.input('EvolveSoPickList_ShipVia', Evolve.Sql.Int, confirmShipment_data.EvolveSoPickList_ShipVia)
			.input('EvolveSoPickList_Remarks', Evolve.Sql.NVarChar, confirmShipment_data.EvolveSoPickList_Remarks)
			.input('EvolveSoPickList_UpdatedAt', Evolve.Sql.DateTime, datetime)
			.query(" BEGIN TRANSACTION UPDATE EvolveSoPickList SET EvolveSoPickList_TotalPallets=@EvolveSoPickList_TotalPallets, EvolveSoPickList_GrossWT=@EvolveSoPickList_GrossWT, EvolveSoPickList_ShipVia=@EvolveSoPickList_ShipVia, EvolveSoPickList_Remarks=@EvolveSoPickList_Remarks, EvolveSoPickList_UpdatedAt=@EvolveSoPickList_UpdatedAt WHERE EvolveSoPickList_ShipID=@EvolveSoPickList_ShipID UPDATE EvolveInventory SET EvolveInventory_Status = 'SHIPPED', EvolveInventory_QtyOnHand = 0 FROM EvolveInventory einv, EvolveSoPickList esopl, EvolveSoPickListDetail esopld WHERE esopl.EvolveSoPickList_ID=esopld.EvolveSoPickList_ID and esopld.EvolveInventory_ID=einv.EvolveInventory_ID and esopl.EvolveSoPickList_ShipID=@EvolveSoPickList_ShipID COMMIT ")
		} catch (error) {
			Evolve.Log.error("Error while inserting Shipment Data--srv "+error.message);
			return new Error("Error while inserting Shipment Data--srv "+error.message);
		}
	},

	getShipmentReport : async function(displayRecord,startFrom) {
		try {
			return await Evolve.SqlPool.request()
			.input('displayRecord', Evolve.Sql.Int, displayRecord)
			.input('startFrom', Evolve.Sql.Int, startFrom)
			.query(" SELECT 'true' as isActive, sopl.EvolveSoPickList_ShipID, sopl.EvolveSoPickList_UpdatedAt, so.EvolveSalesOrder_Shipto, sopl.EvolveSoPickList_TotalPallets, sopl.EvolveSoPickList_GrossWT, sopl.EvolveSoPickList_Remarks FROM EvolveSoPickList sopl, EvolveSalesOrder so WHERE sopl.EvolveSalesOrder_ID=so.EvolveSalesOrder_ID order by sopl.EvolveSoPickList_ShipID offset @startFrom rows fetch next @displayRecord rows only ")
		} catch (error) {
			Evolve.Log.error("Error while getting SO Shipment Report--srv "+error.message);
			return new Error("Error while getting SO Shipment Report--srv "+error.message);
		}
	},

	getShipmentReportCount : async function() {
		try {
			return await Evolve.SqlPool.request()
			.query(" SELECT COUNT(EvolveSoPickList_ShipID) as count from EvolveSoPickList ")
		} catch (error) {
			Evolve.Log.error("Error while getting SO Shipment ReportCount--srv "+error.message);
			return new Error("Error while getting SO Shipment ReportCount--srv "+error.message);
		}
	},

	getshipmentReportDetail : async function(shipID) {
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveSoPickList_ShipID', Evolve.Sql.Int, shipID)
			.query(" SELECT einv.EvolveInventory_RefNumber, einv.EvolveInventory_QtyOnHand, ei.EvolveItem_Code, ei.EvolveItem_Desc, esol.EvolveSalesOrderLine_Number  FROM EvolveInventory einv, EvolveItem ei, EvolveSalesOrderLine esol, EvolveSoPickList espl, EvolveSoPickListDetail espld WHERE espl.EvolveSoPickList_ID = espld.EvolveSoPickList_ID and espld.EvolveInventory_ID = einv.EvolveInventory_ID and einv.EvolveItem_ID = ei.EvolveItem_ID and espl.EvolveSalesOrder_ID = esol.EvolveSalesOrder_ID and espl.EvolveSoPickList_ShipID=@EvolveSoPickList_ShipID")
		} catch (error) {
			Evolve.Log.error("Error while getting SO Shipment Report Detaails--srv "+error.message);
			return new Error("Error while getting SO Shipment Report Detaails--srv "+error.message);
		}
	},

	getshipmentPrintReportDetails : async function(shipID){
		try {
			return await Evolve.SqlPool.request()
		.input('EvolveSoPickList_ShipID', Evolve.Sql.NVarChar, shipID)
		.query('select esol.EvolveSalesOrderLine_Number, eso.EvolveSalesOrder_Number , eso.EvolveSalesOrder_Custpo , eit.EvolveItem_Code , eit.EvolveItem_Desc , eu.EvolveUom_Uom , esopd.EvolveSoPickListDetail_ReqQty, esopd.EvolveSoPickListDetail_QtyPick , eso.EvolveSalesOrder_Date , esol.EvolveSalesOrderLine_DueDate from EvolveSoPickList esop , EvolveSoPickListDetail esopd , EvolveSalesOrder eso,  EvolveSalesOrderLine esol , EvolveInventory ein , EvolveItem eit , EvolveUom eu where esop.EvolveSalesOrderLine_ID = esol.EvolveSalesOrderLine_ID and eso.EvolveSalesOrder_ID = esop.EvolveSalesOrder_ID and eit.EvolveItem_Code = esol.EvolveSalesOrderLine_Part and esop.EvolveSoPickList_ID = esopd.EvolveSoPickList_ID and esopd.EvolveInventory_ID = ein.EvolveInventory_ID and ein.EvolveUom_ID = eu.EvolveUom_ID and esop.EvolveSoPickList_ShipID = @EvolveSoPickList_ShipID')
		} catch (error) {
			Evolve.Log.error("Error while getting print SO Shipment Report Detaails--srv "+error.message);
			return new Error("Error while getting print SO Shipment Report Detaails--srv "+error.message);
		}
	},

	getprintPalletdata : async function (solinenumber){
		try {
			return await Evolve.SqlPool.request()
		.input('solinenumber', Evolve.Sql.Int, solinenumber)
		.query('SELECT ein.EvolveInventory_RefNumber , ein.EvolveInventory_QtyOnHand , ein.EvolveInventory_LotNumber , ein.EvolveInventory_CreatedAt from EvolveInventory ein , EvolveSoPickListDetail esopd , EvolveSoPickList esop , EvolveSalesOrderLine esol where esop.EvolveSoPickList_ID = esopd.EvolveSoPickList_ID and esopd.EvolveInventory_ID = ein.EvolveInventory_ID and esop.EvolveSalesOrderLine_ID = esol.EvolveSalesOrderLine_ID and esol.EvolveSalesOrderLine_Number = @solinenumber')
		} catch (error) {
			Evolve.Log.error("Error while getting print SO Shipment Report pallet Detaails--srv "+error.message);
			return new Error("Error while getting print SO Shipment Report pallet Detaails--srv "+error.message);
		}
	},

	getcustomerShiptodetail : async function(shipID){
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveSoPickList_ShipID', Evolve.Sql.NVarChar, shipID)
			.query('SELECT esup.EvolveSupplier_Name , eso.EvolveSalesOrder_Shipto , esup.EvolveSupplier_Address , esup.EvolveSupplier_TaxNumber from EvolveSoPickList esop , EvolveSalesOrder eso , EvolveSupplier esup where esop.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID and eso.EvolveSalesOrder_Shipto = esup.EvolveSupplier_Code and esop.EvolveSoPickList_ShipID = @EvolveSoPickList_ShipID')

		} catch (error) {
			Evolve.Log.error("Error while getting customer ship to Detaails--srv "+error.message);
			return new Error("Error while getting customer ship to Detaails--srv "+error.message);
		}
	},

	getcustomerBilltodetail : async function(shipID){
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveSoPickList_ShipID', Evolve.Sql.NVarChar, shipID)
			.query('SELECT esup.EvolveSupplier_Name , eso.EvolveSalesOrder_Billto , esup.EvolveSupplier_Address , esup.EvolveSupplier_TaxNumber from EvolveSoPickList esop , EvolveSalesOrder eso , EvolveSupplier esup where esop.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID and eso.EvolveSalesOrder_Billto = esup.EvolveSupplier_Code and esop.EvolveSoPickList_ShipID = @EvolveSoPickList_ShipID')

		} catch (error) {
			Evolve.Log.error("Error while getting customer bill to Detaails--srv "+error.message);
			return new Error("Error while getting customer bill to Detaails--srv "+error.message);
		}
	},

	getbasicDetail : async function(shipID){
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveSoPickList_ShipID', Evolve.Sql.NVarChar, shipID)
			.query('SELECT EvolveSoPickList_TotalPallets , EvolveSoPickList_GrossWT , EvolveSoPickList_Remarks from EvolveSoPickList where EvolveSoPickList_ShipID = @EvolveSoPickList_ShipID')

		} catch (error) {
			Evolve.Log.error("Error while getting customer bill to Detaails--srv "+error.message);
			return new Error("Error while getting customer bill to Detaails--srv "+error.message);
		}
	}

	// SO Shipment -- end
}
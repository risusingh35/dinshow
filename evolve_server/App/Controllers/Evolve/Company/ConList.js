'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getCompanyList: async function (req, res) {
        try {

            let start = parseInt(req.body.startFrom);
            console.log("This is start==>"+start);
            let length = parseInt(req.body.displayRecord);
            console.log("This is length==>"+length);
            let search = req.body.search;
            let getCompanyListCount = await Evolve.App.Services.Evolve.Company.SrvList.getCompanyListCount(search);
            let companies = await Evolve.App.Services.Evolve.Company.SrvList.getCompanyList(start , length, search);
            
            if (companies instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while getting company list !",
                    result: companies.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getCompanyListCount.recordset[0].count,
                    records: companies.recordset
                }

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Company list get successfully !",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0208: Error while getting company list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0208: Error while getting company list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleSection: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Company.SrvList.getSingleSection(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get single section",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Section single list",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0209: Error while getting single section "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0209: Error while getting single section "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteSection: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Company.SrvList.deleteSection(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete section !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Section deleted successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0210: Error while deleting the section "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0210: Error while deleting the section "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateSection: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Company.SrvList.updateSection(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error while update section",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Section Updated successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0211: Error while update section "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0211: Error while update section "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    createCompany: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            if (req.body.EvolveCompany_LogoImage != '') {
                let d = new Date();
                let time = d.getTime();
                let extention = req.body.EvolveCompany_LogoImage.substring("data:image/".length,
                    req.body.EvolveCompany_LogoImage.indexOf(";base64")
                );
                let fileName = time + "_company_logo." + extention;
                req.body.imageName = fileName;
                let base64Data = req.body.EvolveCompany_LogoImage.replace(/^data:image\/png;base64,/, "");
                base64Data = req.body.EvolveCompany_LogoImage.replace(/^data:image\/jpeg;base64,/, "");
                Evolve.Fs.writeFile(Evolve.Config.imageUploadPath + fileName, base64Data, "base64",
                    function (err) {
                        if (err) {
                            console.log(err);
                            // res.json(0);
                        } else {
                            console.log("The file was saved!");
                            // res.json(fileName);
                        }
                    }
                );
                req.body.EvolveCompany_LogoImage = req.body.imageName;
                console.log("req.body.EvolveCompany_LogoImage", req.body.EvolveCompany_LogoImage)
            }
            let result = await Evolve.App.Services.Evolve.Company.SrvList.createCompany(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Create Company",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Company Created",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
          Evolve.Log.error(" EERR0212: Error while creating company "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0212: Error while creating company "+error.message,
            result: null
          };
          res.send(obj);
        }
    },
    selectSingleCompany : async function(req,res){
        try {
            let singleCompany = await Evolve.App.Services.Evolve.Company.SrvList.selectSingleCompany(req.body.EvolveCompany_ID);
            if (singleCompany instanceof Error || singleCompany.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get single Company",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Single Company Get",
                    result: singleCompany.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error while get single company "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "  Error while get single company "+error.message,
            result: null
          };
          res.send(obj);
        }
    },
    updateCompany : async function(req,res){
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            if (req.body.EvolveCompany_LogoImage != '') {
                let d = new Date();
                let time = d.getTime();
                let extention = req.body.EvolveCompany_LogoImage.substring("data:image/".length,
                    req.body.EvolveCompany_LogoImage.indexOf(";base64")
                );
                let fileName = time + "_company_logo." + extention;
                req.body.imageName = fileName;
                let base64Data = req.body.EvolveCompany_LogoImage.replace(/^data:image\/png;base64,/, "");
                base64Data = req.body.EvolveCompany_LogoImage.replace(/^data:image\/jpeg;base64,/, "");
                Evolve.Fs.writeFile(Evolve.Config.imageUploadPath + fileName, base64Data, "base64",
                    function (err) {
                        if (err) {
                            console.log(err);
                            // res.json(0);
                        } else {
                            console.log("The file was saved!");
                            // res.json(fileName);
                        }
                    }
                );
                req.body.EvolveCompany_LogoImage = req.body.imageName;
                console.log("req.body.EvolveCompany_LogoImage", req.body.EvolveCompany_LogoImage)
            }
            let result = await Evolve.App.Services.Evolve.Company.SrvList.updateCompany(req.body);
            if (result instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Create Company",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Company Updated",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error while update company "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "  Error while get update company "+error.message,
            result: null
          };
          res.send(obj);
        }
    }
}
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getUnitList: async function (req, res) {
    try {
      let start = parseInt(req.body.startFrom);
      let length = parseInt(req.body.displayRecord);
      let search = req.body.search;
      let count = await Evolve.App.Services.Evolve.Unit.SrvList.unitListCount(search);
      let units = await Evolve.App.Services.Evolve.Unit.SrvList.getUnitList(start, length, search);
      if (units instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while unit list !",
          result: units.message
        };
        res.send(obj);
      } else {
        let resObj = {
          noOfRecord: count.recordset[0].count,
          records: units.recordset
        }
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Unit list",
          result: resObj
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0425: Error while getting unit list " + error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0425: Error while getting unit list " + error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getCompanyList: async function (req, res) {
    try {
      let companies = await Evolve.App.Services.Evolve.Unit.SrvList.getCompanyList();
      if (companies instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while company list !",
          result: companies.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "company list get successfully !",
          result: companies.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0426: Error while getting company list " + error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0426: Error while getting company list " + error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deleteSection: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.Unit.SrvList.deleteSection(req.body.id);
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
      Evolve.Log.error(" EERR0427: Error while deleting section " + error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0427: Error while deleting section " + error.message,
        result: null
      };
      res.send(obj);
    }
  },

  updateUnit: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      if (req.body.imageChanged == true) {
        let d = new Date();
        let time = d.getTime();
        let extention = req.body.EvolveUnit_LogoImage.substring("data:image/".length, req.body.EvolveUnit_LogoImage.indexOf(";base64"));
        let fileName = time + "_unit_logo." + extention;
        req.body.imageName = fileName;
        console.log("change logo==============")
        let base64Data = req.body.EvolveUnit_LogoImage.replace(/^data:image\/png;base64,/, "");
        base64Data = req.body.EvolveUnit_LogoImage.replace(/^data:image\/jpeg;base64,/, "");
        Evolve.Fs.writeFile(Evolve.Config.imageUploadPath + fileName, base64Data, "base64", function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("===============The file was saved!=============");
          }
        }
        );
        req.body.EvolveUnit_LogoImage = req.body.imageName;
      }
      let result = await Evolve.App.Services.Evolve.Unit.SrvList.updateUnit(req.body);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on update unit",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Unit updated succsessfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0428: Error while updating unit " + error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0428: Error while updating unit " + error.message,
        result: null
      };
      res.send(obj);
    }
  },

  createUnit: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      if (req.body.EvolveUnit_LogoImage != '') {
        let d = new Date();
        let time = d.getTime();
        let extention = req.body.EvolveUnit_LogoImage.substring("data:image/".length, req.body.EvolveUnit_LogoImage.indexOf(";base64"));
        let fileName = time + "_unit_logo." + extention;
        req.body.imageName = fileName;
        let base64Data = req.body.EvolveUnit_LogoImage.replace(/^data:image\/png;base64,/, "");
        base64Data = req.body.EvolveUnit_LogoImage.replace(/^data:image\/jpeg;base64,/, "");
        Evolve.Fs.writeFile(Evolve.Config.imageUploadPath + fileName, base64Data, "base64", function (err) {
          if (err) {
            console.log(err);
            // res.json(0);
          } else {
            console.log("The file was saved!");
            // res.json(fileName);
          }
        }
        );
        req.body.EvolveUnit_LogoImage = req.body.imageName;
      }
      let result = await Evolve.App.Services.Evolve.Unit.SrvList.createUnit(req.body);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Query",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Unit Created",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0429: Error while creating unit " + error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0429: Error while creating unit " + error.message,
        result: null
      };
      res.send(obj);
    }
  },

  selectSingleUnit: async function (req, res) {
    try {
      let unitData = await Evolve.App.Services.Evolve.Unit.SrvList.selectSingleUnit(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Unit List",
        result: unitData
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0430: Error while selecting single unit " + error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0430: Error while selecting single unit " + error.message,
        result: null
      };
      res.send(obj);
    }
  },

  uploadUnitMasterCsv: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID
      if (req.files.fileData) {
        let csv = req.files.fileData;
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(csv.name)[1];
        let date = new Date();
        let fileName = 'unitMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

        // Use the mv() method to place the file somewhere on your server
        csv.mv('./csv/doa/' + fileName, async function (error) {
          if (error) {
            // console.log("Error in File Upload ::", error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
          } else {
            let csvDataArray = await Evolve.Csv().fromFile('./csv/doa/' + fileName);
            // console.log("csvDataArray>>>>>", csvDataArray);
            let errorMessage = 'Error While Upload Unit Master!!';
            let errorStatus = false;
            if (errorStatus == false) {
              for (let i = 0; i < csvDataArray.length; i++) {
                if (csvDataArray[i]['Site'] == '' || csvDataArray[i]['Site'] == undefined) {
                  errorStatus = true;
                  errorMessage = 'Error In Upload Unit Master !! File Is Not Proper !! '
                }
              }
            }
            if (errorStatus == false) {
              for (let i = 0; i < csvDataArray.length; i++) {
                errorStatus = false;

                if (csvDataArray[i]['Entity'] != '' && csvDataArray[i]['Entity'] != undefined && csvDataArray[i]['Entity'] != null) {
                  let checkCompanyExist = await Evolve.App.Services.Evolve.Unit.SrvList.checkCompanyExist(csvDataArray[i]['Entity']);

                  if (checkCompanyExist instanceof Error) {
                    errorStatus = true;
                    Evolve.Log.error("Error While Check Company Exists or Not");
                  }
                  else if (checkCompanyExist.rowsAffected > 0) {
                    csvDataArray[i]['EvolveCompany_ID'] = checkCompanyExist.recordset[0].EvolveCompany_ID;
                  }
                  else {
                    let addCompany = await Evolve.App.Services.Evolve.Unit.SrvList.addCompany(req.EvolveUser_ID, csvDataArray[i]);
                    if (addCompany instanceof Error || addCompany.rowsAffected < 1) {
                      errorStatus = true;
                      Evolve.Log.error("Error While Add Company");
                    }
                    else {
                      csvDataArray[i]['EvolveCompany_ID'] = addCompany.recordset[0].inserted_id;
                    }
                  }
                }
                if (errorStatus == false) {
                  let checkUnitCodeExist = await Evolve.App.Services.Evolve.Unit.SrvList.checkUnitCodeExist(csvDataArray[i]['Site']);
                  if (checkUnitCodeExist instanceof Error) {
                    errorStatus = true;
                    Evolve.Log.error(checkUnitCodeExist.message);
                  }
                  else if (checkUnitCodeExist.rowsAffected > 0) {
                    csvDataArray[i]['EvolveUnit_ID'] = checkUnitCodeExist.recordset[0].EvolveUnit_ID;
                    let updateUnitMaster = await Evolve.App.Services.Evolve.Unit.SrvList.updateUnitMaster(req.EvolveUser_ID, csvDataArray[i]);
                    if (updateUnitMaster instanceof Error || updateUnitMaster.rowsAffected < 1) {
                      errorStatus = true;
                      Evolve.Log.error("Error In Update Unit" + csvDataArray[i]['Site']);
                    }
                  }
                  else {
                    let addUnitMaster = await Evolve.App.Services.Evolve.Unit.SrvList.addUnitMaster(req.EvolveUser_ID, csvDataArray[i]);
                    if (addUnitMaster instanceof Error || addUnitMaster.rowsAffected < 1) {
                      errorStatus = true;
                      Evolve.Log.error("Error In Add Unit" + csvDataArray[i]['Site']);
                    }
                  }
                }

              }

            }
            else {
              errorStatus = true;
            }
            if (errorStatus == true) {
              let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
              res.send(obj);
            }
            else {
              let obj = { statusCode: 200, status: "success", message: 'Unit Master uploaded succsessfully', result: null };
              res.send(obj);
            }
          }
        });
      }
    } catch (error) {
      Evolve.Log.error(" EERR####: Error while uploading CSV Unit Master " + error.message);
      let obj = {
        statusCode: 400, status: "fail",
        message: " EERR####: Error while uploading CSV Credit terms ", result: null
      };
      res.send(obj);
    }
  },
}
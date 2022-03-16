const Evolve = require("../../../../Boot/Evolve");

module.exports = {

    getAllLabelCommandList : async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
          let length = parseInt(req.body.displayRecord);
          let search = req.body.search;

      let count = await  Evolve.App.Services.Evolve.labelCommandMaster.SrvList.getAllLabelCommandListCount(search);
      
      let list = await Evolve.App.Services.Evolve.labelCommandMaster.SrvList.getAllLabelCommandList(start , length ,search);

      if (list instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error in getting label command list",
          result: list.message
        };
        res.send(obj);
      } 
      else {
        let resObj = {
            noOfRecord: count.recordset[0].count,
            records: list.recordset
        }
        let obj = {
          statusCode: 200,
          status: "success",
          message: "label master List",
          result: resObj
        };
        res.send(obj);
      }
        } catch (error) {
            Evolve.Log.error(" EERR32552: Error while getting label commandm master list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32552: Error while getting label commandm master list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getParameters : async function (req, res) {
        try {
      let getParameters = await Evolve.App.Services.Evolve.labelCommandMaster.SrvList.getParameters(req.body.EvolveStickerCmd_ID);
      if (getParameters instanceof Error || getParameters.rowsAffected < 1 ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error in getting parameter list",
          result: getParameters.message
        };
        res.send(obj);
      } 
      else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "parameter List",
          result: getParameters.recordset
        };
        res.send(obj);
      }
        } catch (error) {
            Evolve.Log.error(" EERR32553: Error while getting parameter list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32553: Error while getting parameter list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    csvLabelCmdUpload : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.csvFile) {
                let csv = req.files.csvFile;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'labelCmd_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/labelCmd/' + fileName, async function (error) {
                    if (error) {
                        // console.log("Error in File Upload ::", error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let labelCmdArray = await Evolve.Csv().fromFile('./csv/labelCmd/' + fileName);
                        let errorStatus = false;
                        if (errorStatus == false) {
                            for (let i = 0; i < labelCmdArray.length; i++) {
                                // console.log(labelCmdArray[labelCmdArray.length-1]);
                                if (labelCmdArray[i]['EvolveLabelCmdCode'] == undefined || labelCmdArray[i]['EvolveLabelCmdName'] == undefined || labelCmdArray[i]['EvolveLabelCmdDesc'] == undefined || labelCmdArray[i]['EvolveLabelUsage'] == undefined || labelCmdArray[i]['EvolveLabelCmdCode'] == '' || labelCmdArray[i]['EvolveLabelCmdName'] == '' || labelCmdArray[i]['EvolveLabelCmdDesc'] == '' || labelCmdArray[i]['EvolveLabelUsage'] == '') {
                                    errorStatus = true;
                                }
                                // console.log(labelCmdArray[i]['EvolveLabelCmdCode'] , 'Error Status : ' , errorStatus);
                            }
                        }
                        if (errorStatus == false) {
                            for (let i = 0; i < labelCmdArray.length; i++) {
                                let checkLabelCmdExits = await Evolve.App.Services.Evolve.labelCommandMaster.SrvList.checkLabelCmdExits(labelCmdArray[i]['EvolveLabelCmdCode']);
                                if (checkLabelCmdExits.rowsAffected > 0) {
                                    labelCmdArray[i].EvolveStickerCmd_ID = checkLabelCmdExits.recordset[0].EvolveStickerCmd_ID;
                                    let updateLabelCmdCsv = await Evolve.App.Services.Evolve.labelCommandMaster.SrvList.updateLabelCmdCsv(labelCmdArray[i], req.body);
                                    if (updateLabelCmdCsv.rowsAffected <= 0 || updateLabelCmdCsv instanceof Error ) {
                                        errorStatus = true;
                                        Evolve.Log.error(updateLabelCmdCsv.message);
                                    }
                                }
                                else {
                                    let addLabelCmdCsv = await Evolve.App.Services.Evolve.labelCommandMaster.SrvList.addLabelCmdCsv(labelCmdArray[i], req.body);
                                    if (addLabelCmdCsv.rowsAffected <= 0 || addLabelCmdCsv instanceof Error ) {
                                        errorStatus = true;
                                        Evolve.Log.error(addLabelCmdCsv.message);
                                    }
                                }
                                let checkLabelCmdExitsAfterAdd = await Evolve.App.Services.Evolve.labelCommandMaster.SrvList.checkLabelCmdExits(labelCmdArray[i]['EvolveLabelCmdCode']);
                                labelCmdArray[i].EvolveStickerCmd_ID = checkLabelCmdExitsAfterAdd.recordset[0].EvolveStickerCmd_ID;
                                if (labelCmdArray[i]['EvolveLabelCmdUsageKey'] != undefined || labelCmdArray[i]['EvolveLabelCmdUsageKey'] != ''){
                                    let checkLabelCmdParamExits = await Evolve.App.Services.Evolve.labelCommandMaster.SrvList.checkLabelCmdParamExits(labelCmdArray[i]['EvolveLabelCmdUsageKey'], labelCmdArray[i].EvolveStickerCmd_ID);
                                    if (checkLabelCmdParamExits.rowsAffected > 0) {
                                        labelCmdArray[i].EvolveStickerCmdParams_ID = checkLabelCmdParamExits.recordset[0].EvolveStickerCmdParams_ID;
                                        let updateLabelCmdParamsCsv = await Evolve.App.Services.Evolve.labelCommandMaster.SrvList.updateLabelCmdParamsCsv(labelCmdArray[i], req.body);
                                        if (updateLabelCmdParamsCsv.rowsAffected <= 0 || updateLabelCmdParamsCsv instanceof Error ) {
                                            errorStatus = true;
                                            Evolve.Log.error(updateLabelCmdParamsCsv.message);
                                        }
                                    }
                                    else {
                                        let addLabelCmdParamsCsv = await Evolve.App.Services.Evolve.labelCommandMaster.SrvList.addLabelCmdParamsCsv(labelCmdArray[i], req.body);
                                        if (addLabelCmdParamsCsv.rowsAffected <= 0 || addLabelCmdParamsCsv instanceof Error ) {
                                            errorStatus = true;
                                            Evolve.Log.error(addLabelCmdParamsCsv.message);
                                        }
                                    }
                                }
                            }

                        }
                        if (errorStatus == true) {
                            let obj = { statusCode: 400, status: "fail", message: 'Error while upload Label Commands!', result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: 'Label Commands uploaded succsessfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR32554: Error while uploading csv Label Command "+error.message);
            let obj = { 
                statusCode: 400, status: "fail", 
                message: " EERR32554: Error while uploading csv Label Command "+error.message, result: null };
            res.send(obj);
        }
    }

}

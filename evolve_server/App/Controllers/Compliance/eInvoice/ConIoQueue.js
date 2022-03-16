'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getIoReportData: async function (req, res) {
        try {
          let start = parseInt(req.body.startFrom);
          let length = parseInt(req.body.displayRecord);
          let search = req.body.search;

          let andkey = true;
          let condition = "";
          if (req.body.startDate != "" && req.body.endDate != "") {
            if (andkey == true) {
              condition = condition + " WHERE ";
            }
            condition =
              condition +"cast(EvolveIO_File_InTime as date) >=" +"'" +req.body.startDate +"'" +" and cast(EvolveIO_File_InTime as date) <=" +"'" +req.body.endDate +"'" + " AND EvolveIO_Code lIKE '%" + search + "%'" 
            andkey = true;
          }else{
            condition = " WHERE EvolveIO_Code lIKE '%" + search + "%'"
          }
    
          let ioDataCount = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.getIoReportDataCountList(condition, search);
          let ioDataList = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.getIoReportDataDatatableList(start, length, condition, search);
            if (ioDataList instanceof Error) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while get IO Data List !",
                result: ioDataList.message
              };
              res.send(obj);
            }
            else{
              let resObj = {
                noOfRecord: ioDataCount.recordset[0].count,
                records: ioDataList.recordset
              }
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Menu list",
                result: resObj
              };
              res.send(obj);
            }
        } catch (error) {
          Evolve.Log.error(" EERR0252: Error while getting Io report data "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0252: Error while getting Io report data "+error.message,
            result: null
          };
          res.send(obj);
        }
    },
    
    reQueueProcess: async function (req, res) {
        try {
            let ioServerUrl;
            let ArchivePath;
            let InPath;
            let EINVBASEURL = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.getGlobleVariableEInv('EINVBASEURL');
            if (EINVBASEURL instanceof Error || EINVBASEURL.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Key EINVBASEURL does not exist in IO Configration",
                    result: null
                };
                res.send(obj);
            }
            else {
                ioServerUrl = EINVBASEURL.recordset[0].EvolveEinvoiceConfig_Value;
                let EINVARCHIVEPATH = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.getGlobleVariableEInv('EINVARCHIVEPATH');
                if (EINVARCHIVEPATH instanceof Error || EINVARCHIVEPATH.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Key EINVARCHIVEPATH does not exist in IO Configration",
                        result: null
                    };
                    res.send(obj);
                }
                else {
                    ArchivePath = EINVARCHIVEPATH.recordset[0].EvolveEinvoiceConfig_Value;
                    let EINVINPATH = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.getGlobleVariableEInv('EINVINPATH');
                    if (EINVINPATH instanceof Error || EINVINPATH.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Key EINVINPATH does not exist in IO Configration",
                            result: null
                        };
                        res.send(obj);
                    }
                    else {
                        let EinvIOFolderName = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.getGlobleVariableEInv('EINVIOFOLDERNAME');
                        if (EinvIOFolderName instanceof Error || EinvIOFolderName.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Key EINVIOFOLDERNAME does not exist in IO Configration",
                                result: null
                            };
                            res.send(obj);
                        }else {
                            // InPath = EINVINPATH.recordset[0].EvolveEinvoiceConfig_Value;
                            let path = '../'+EinvIOFolderName.recordset[0].EvolveEinvoiceConfig_Value+'/EINV/ARCHIVE/'+req.body.FileName;
                            InPath = '../'+EinvIOFolderName.recordset[0].EvolveEinvoiceConfig_Value+'/EINV/IN/'+req.body.FileName;
                            console.log("File Path====", path)
                            console.log("File In Path====", InPath)
                            if (Evolve.Fs.existsSync(path)) {
                              console.log("==================File Exit Found=========")
                              Evolve.Fs.rename(path, InPath, function (err) {
                                if (err) throw err
                                Evolve.Log.info('Successfully renamed - ERROR moved!')
                              });
                                // await Evolve.Fs.promises.rename(path, InPath);
                                console.log("File Moveto Done ...");
                                
                                let ioQueueDelete = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.ioQueueDelete(req.body);
                                  if (ioQueueDelete instanceof Error || ioQueueDelete.rowsAffected < 1) {
                                      let obj = {
                                          statusCode: 400,
                                          status: "fail",
                                          message: "Error In Delete IO Queue",
                                          result: null
                                      };
                                      res.send(obj);
                                  }else {
                                    let obj = {
                                      statusCode: 200,
                                      status: "success",
                                      message: "File Move SuccessFully ",
                                      result: null
                                    };
                                    res.send(obj);   
                                  }
                                
                            } else {

                              console.log("==================File Not Found=========")
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "File Not Found! ",
                                    result: null
                                };
                                res.send(obj);   
                            }
                        }
                    }
                }
            }       

          // let changeIoCodeStatus = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.changeIoCodeStatus(req.body.id);
          // if (changeIoCodeStatus instanceof Error) {
          //   let obj = {
          //     statusCode: 400,
          //     status: "fail",
          //     message: "IO data not found ! ",
          //     result: null
          //   };
          //   res.send(obj);
          // } else {
          //   let obj = {
          //     statusCode: 200,
          //     status: "success",
          //     message: "Successfully !",
          //     result: ""
          //   };
          //   res.send(obj);
          // }
        } catch (error) {
          Evolve.Log.error(" EERR0254: Error while changing Io Code Status "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0254: Error while changing Io Code Status "+error.message,
            result: null
          };
          res.send(obj);
        }
    },
    getGlobleVariableEInv: async function (req, res) {
        try {
            let response = {};
            let ioPublicFolders = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableIo('PUBLICDIR');
            if (ioPublicFolders instanceof Error || ioPublicFolders.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Key PUBLICDIR does not exist in IO Configration",
                    result: null
                };
                res.send(obj);
            }
            else {
                response['PUBLICDIR'] = ioPublicFolders.recordset[0].EvolveIOConfig_Value;
                let EINVBASEURL = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.getGlobleVariableEInv('EINVBASEURL');
                if (EINVBASEURL instanceof Error || EINVBASEURL.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Key EINVBASEURL does not exist in IO Configration",
                        result: null
                    };
                    res.send(obj);
                }
                else {
                    response['EINVBASEURL'] = EINVBASEURL.recordset[0].EvolveEinvoiceConfig_Value;
                    let EINVARCHIVEPATH = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.getGlobleVariableEInv('EINVARCHIVEPATH');
                    if (EINVARCHIVEPATH instanceof Error || EINVARCHIVEPATH.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Key EINVARCHIVEPATH does not exist in E Invoice Configration",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        response['EINVARCHIVEPATH'] = EINVARCHIVEPATH.recordset[0].EvolveEinvoiceConfig_Value;
                        let obj = {
                            statusCode: 200,
                            status: "Success",
                            message: "Success",
                            result: response
                        };
                        res.send(obj);
                    }
                }
            }    
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error While getting E Invoice globle variable " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteIOQueue: async function (req, res) {
      try {
          req.body.EvolveUser_ID = req.EvolveUser_ID;
          let result = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.deleteIOQueue(req.body);
          if (result instanceof Error) {
              let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "Error while Delete IO Queue!",
                  result: null
              };
              res.send(obj);
          } else {
              let obj = {
                  statusCode: 200,
                  status: "Success",
                  message: "Delete IO Queue Successfully",
                  result: "Success"
              };
              res.send(obj);
          }
      } catch (error) {
          Evolve.Log.error(" EERR0237: Error while Delete IO Queue "+error.message);
          let obj = {
              statusCode: 400,
              status: "fail",
              message: " EERR0237: Error while Delete IO Queue"+error.message,
              result: null
          };
          res.send(obj);
      }
  },

}
'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
  getReasonParentList: async function (req, res) {
    
        try {
          let list = await Evolve.App.Services.Evolve.SubReason.SrvSubReasonList.getReasonParentList(req.body);
          
          if (list instanceof Error ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while get tingParent list !",
              result: list.message
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Parent List Found",
              result:  list.recordset,
            };
          // console.log(obj.result)
          res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" Error while getting parent List "+error.message);
          let obj = {
            statusCode: 400,
            message: " Error while getting parent List "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getReasonTypeChildList: async function (req, res){
        try {
          let list = await Evolve.App.Services.Evolve.SubReason.SrvSubReasonList.getReasonTypeChildList(req.body);
        if(list instanceof Error){
          let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error while getting reason type Child List !",
                    result: list.message
                  };
                  res.send(obj);

        }else{
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Sub Reason list",
            result:  list.recordset,
          };
        res.send(obj);

        }
          
        } catch (error) {
          Evolve.Log.error(" EERR3164: Error while getting Reason Type Child List "+error.message);
          let obj = {
            statusCode: 400,
            message: " EERR3164: Error while getting Reason Type Child List "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      selectSingleSubReason: async function(req,res){
        try {
          let list = await Evolve.App.Services.Evolve.SubReason.SrvSubReasonList.selectSingleSubReason(req.body);
          if(list instanceof Error){
            let obj = {
                      statusCode: 400,
                      status: "fail",
                      message: "Error while getting selectSingleSubReason !",
                      result: list.message
                    };
                    res.send(obj);
  
          }else{
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Sub Reason list",
              result:  list.recordset[0],
            };
          res.send(obj);
  
          }
          
        } catch (error) {
          Evolve.Log.error(" Error while selecting  sub reason "+error.message);
          let obj = {
            statusCode: 400,
            message: " Error while selecting  sub reason "+error.message,
            result: null
          };
          res.send(obj);
        }
    
       
      },


      getSubReasonFinalList: async function (req,res){
        try {
          let start = parseInt(req.body.startFrom);
          let length = parseInt(req.body.displayRecord);
          let search = req.body.search;
          let list = await Evolve.App.Services.Evolve.SubReason.SrvSubReasonList.getSubReasonFinalList(start, length,search);
          let count = await Evolve.App.Services.Evolve.SubReason.SrvSubReasonList.getAllSubReasonCount(search)
        
         
          if (list instanceof Error ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: " Error while getting Reason Final List ! ",
              result: list.message
            };
            res.send(obj);
          } else {
            let resObj = {
              noOfRecord: count.recordset[0].count,
              records: list.recordset
          }
          let obj = {
              statusCode: 200,
              status: "success",
              message: " Reason list Found ",
              result: resObj
          };
          res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR3166: Error while getting Reason Final List "+error.message);
          let obj = {
            statusCode: 400,
            message: " EERR3166: Error while getting Reason Final List "+error.message,
            result: null
          };
          res.send(obj);
        }

      },

      insertSubReason: async function (req, res) {
        try {
          req.body.EvolveUser_ID = req.EvolveUser_ID;
          let checkSubReasons = await Evolve.App.Services.Evolve.SubReason.SrvSubReasonList.checkSubReasons(req.body);

          if (checkSubReasons.recordset[0].count > 0) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " SubReason already exist! Please Enter New One !",
                result: null
            };
            res.send(obj);
        }else{
          
          let result = await Evolve.App.Services.Evolve.SubReason.SrvSubReasonList.insertSubReason(req.body)
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error while adding sub reason ",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Sub reason added successfully ",
                    result: result.recordset
                };
                res.send(obj);
            }
        }
            
        } catch (error) {
            Evolve.Log.error(" EERR3165: Error while adding sub reason "+error);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3165: Error while adding sub reason "+error,
                result: null
            };
            res.send(obj);
        }
    },
    

    updateSubReasons: async function (req, res) {
      try {      
        
          let checkSubReasonsEdit = await Evolve.App.Services.Evolve.SubReason.SrvSubReasonList.checkSubReasonsEdit(req.body);
          if (checkSubReasonsEdit.recordset[0].count > 0) {
              let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: " SubReason already exist! Please Enter New One !",
                  result: null
              };
              res.send(obj);
          } else {
              req.body.EvolveUser_ID = req.EvolveUser_ID;
              let result = await Evolve.App.Services.Evolve.SubReason.SrvSubReasonList.updateSubReasons(req.body);
              if (result instanceof Error || result.rowsAffected < 1) {
                  let obj = {
                      statusCode: 400,
                      status: "fail",
                      message: " Error while updating sub reasons" ,
                      result: null 
                  };
                  res.send(obj);
              } else {
                  let obj = {
                      statusCode: 200,
                      status: "success",
                      message: "EERR3167: Sub Reasons updated successfully ",
                      result: result.recordset
                  };
                  res.send(obj);
                }
          }
      } catch (error) {
          Evolve.Log.error(" EERR3167: Error while updating Sub Reasons "+error.message);
          let obj = {
              statusCode: 400,
              status: "fail",
              message: " EERR3167: Error while updating Sub Reasons "+error.message,
              result: null
          };
          res.send(obj);
      }
  },

  
  delete_SubReason: async function(req,res){
    try {
    
    let list = await Evolve.App.Services.Evolve.SubReason.SrvSubReasonList.delete_SubReason(req.body);
    if(list instanceof Error){
      let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while deleting subreason!",
                result: list.message
              };
              res.send(obj);

    }else{
      let obj = {
        statusCode: 200,
        status: "success",
        message: " SubReason Deleted Successfully",
        result:  list.message
      };
    res.send(obj);

    }
      
    } catch (error) {
      Evolve.Log.error(" EERR3169: Error while deleting Sub Reasons "+error.message);
      let obj = {
          statusCode: 400,
          status: "fail",
          message: " EERR3169: Error while deleting Sub Reasons "+error.message,
          result: null
      };
      res.send(obj);
      
    }
  },

}
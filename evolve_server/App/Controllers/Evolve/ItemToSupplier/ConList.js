'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllReasonList: async function (req, res) {
        try {
            let reason = await Evolve.App.Services.Evolve.ItemToSupplier.SrvList.getAllReasonList();
            if (reason instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error on Query", result: reason.message };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "All Reason Got Successfully ", result: reason.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0269: Error while getting all reason list "+error.message);
            let obj = { statusCode: 400,  status: "fail", message: " EERR0269: Error while getting all reason list "+error.message, result: null };
            res.send(obj);
        }
    },

    
  getItem: async function (req, res) {
    try {
      let poList = await Evolve.App.Services.Evolve.ItemToSupplier.SrvList.getItem(
        req.body.term
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item List",
        result: poList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0270: Error while getting item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0270: Error while getting item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getSupplierList: async function (req, res) {
    try {
   
      let getSupplierList = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.getSupplierList();
      if (getSupplierList instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get Supplier list",
          result: getSupplierList.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Supplier List",
          result: getSupplierList.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0271: Error while getting supplier list "+error.message);

    }
  },

  getTemplateList: async function (req, res) {
    try {
   
      let tempList = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.getTemplateList();
      if (tempList instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get Template list",
          result: tempList.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Template List",
          result: tempList.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0272: Error while getting template list "+error.message);

    }
  },

  assignItemToSuppliers: async function (req, res) {
    try {
   
        let error = false ;
        let obj = {
          EvolveUser_ID : req.EvolveUser_ID,
          EvolveItem_ID : req.body.EvolveItem_ID,
          EvolveUom_ID : req.body.EvolveUom_ID,
          EvolveItemSupLink_CustomerItem : req.body.EvolveItemSupLink_CustomerItem,
          EvolveItemSupLink_Comments : req.body.EvolveItemSupLink_Comments

        }

        for(let i= 0; i<req.body.selectedSuppliers.length ; i++)
        {
            
            if(error == false)
            {
            
            let assign = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.assignItemToSuppliers(obj , req.body.selectedSuppliers[i].EvolveSupplier_ID);

            if (assign instanceof Error ) {
               error = true ;                
                };
            }
        }

        if(error == true)
        {
          let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Assign Item to Suppliers",
          result: ""
        };
        res.send(obj);

        }
        else
        {
            let obj = {
                      statusCode: 200,
                      status: "success",
                      message: "Item to suppliers assigned succsesssfully",
                      result: ""
                    };
                    res.send(obj);
       }
        
    
 
    } catch (error) {
      Evolve.Log.error(" EERR0273: Error while assign Item to suppliers "+error.message);

    }
  },

  getAssignedList: async function (req, res) {
    try {
      let start = parseInt(req.body.startFrom);
          let length = parseInt(req.body.displayRecord);
          let search = req.body.search;
      let count = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.getAssignedListCount(search);
      
      let list = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.getAssignedList(start , length ,search);
      if (list instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get  list",
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
          message: "Assined List",
          result: resObj
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0274: Error while getting assigned list "+error.message);

    }
  },

  getSingleAssignData: async function (req, res) {
    try {
   
      let data = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.getSingleAssignData(req.body.EvolveItem_ID);
      if (data instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get  data",
          result: data.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Assined List",
          result: data.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0275: Error while getting single assign data "+error.message);

    }
  },

  updateItemToSuppliers: async function (req, res) {
    try {
        let error = false ;
        let deleteAssignment  = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.deleteCurrentAssignment(req.body.EvolveItem_ID);
     
           if (deleteAssignment instanceof Error ) {
       
            error = true ;                
           }
           let obj = {
            EvolveUser_ID : req.EvolveUser_ID,
            EvolveItem_ID : req.body.EvolveItem_ID,
            EvolveUom_ID : req.body.EvolveUom_ID,
            EvolveItemSupLink_CustomerItem : req.body.EvolveItemSupLink_CustomerItem,
            EvolveItemSupLink_Comments : req.body.EvolveItemSupLink_Comments
        }
        for(let i= 0; i<req.body.selectedSuppliers.length ; i++)
        {
            if(error == false)
            {
                
            console.log("assing called.>><<<<<<<<<<<<>>>>>>>>><<<<<<<<<<");
            let assign = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.assignItemToSuppliers(obj , req.body.selectedSuppliers[i].EvolveSupplier_ID);

            if (assign instanceof Error ) {
               error = true ;                
                };
            }
        }

        if(error == true)
        {
          let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Assign Item to Suppliers",
          result: ""
        };
        res.send(obj);

        }
        else
        {
            let obj = {
                      statusCode: 200,
                      status: "success",
                      message: "Item to suppliers assigned succsesssfully",
                      result: ""
                    };
                    res.send(obj);
       }
        
    
 
    } catch (error) {
      Evolve.Log.error(" EERR0276: Error while updating Item to Suppliers "+error.message);

    }
  },

  
  getItemList: async function (req, res) {
    try {
   
      let items = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.getItemList();
      if (items instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get Template list",
          result: items.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Template List",
          result: items.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0277: Error while getting Item list"+error.message);

    }
  },

    
  deleteAssignment: async function (req, res) {
    try {
          let deleteAsssgnment = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.deleteAssignment( req.body.id);
      if (deleteAsssgnment instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while delete assignmenr",
          result: deleteAsssgnment.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Assignment deleted succsessfully ",
          result: deleteAsssgnment.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0278: Error while delete assignment"+error.message);

    }
  },
  getLocationList: async function (req, res) {
    try {
   
      let locations = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.getLocationList();
      if (locations instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get Template list",
          result: locations.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Template List",
          result: locations.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0279: Error while getting location list "+error.message);

    }
  },
  getUomList : async function (req,res){
    try {
   
      let uoms = await  Evolve.App.Services.Evolve.ItemToSupplier.SrvList.getUomList();
      if (uoms instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get Template list",
          result: uoms.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Template List",
          result: uoms.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0279: Error while getting Uom list "+error.message);

    }
  }





}
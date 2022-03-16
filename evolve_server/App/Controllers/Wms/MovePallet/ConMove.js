'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

	// getItem: async function (req, res) {
	// 	try {
         
	// 	  let poList = await Evolve.App.Services.Wms.MovePallet.SrvMove.getItem(
	// 		req.body.term
	// 	  );
	// 	  let obj = {
	// 		statusCode: 200,
	// 		status: "success",
	// 		message: "Item List",
	// 		result: poList.recordsets[0]
	// 	  };
	// 	  res.send(obj);
	// 	} catch (error) {
	// 	  Evolve.Log.error(error.message);
	// 	  let obj = {
	// 		statusCode: 400,
	// 		status: "fail",
	// 		message: error.message,
	// 		result: null
	// 	  };
	// 	  res.send(obj);
	// 	}
  //     },
      
  //     getInventoryItemNumber: async function (req, res) {
  //       try {
  //           let poList = await Evolve.App.Services.Wms.MovePallet.SrvMove.getInventoryItemNumber();
  //           let obj = { statusCode: 200, status: "success", message: "item List", result: poList.recordsets[0] };
  //           res.send(obj);
  //       } catch (error) {
  //           Evolve.Log.error(error.message);
  //           let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
  //           res.send(obj);
  //       }
  //   },
    
    getReasonList: async function (req, res) {
        try {
            let reasonList = await Evolve.App.Services.Wms.MovePallet.SrvMove.getReasonList();
            let obj = { statusCode: 200, status: "success", message: "Reason List", result: reasonList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0973: Error while getting reason list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0973: Error while getting reason list "+error.message, result: null };
            res.send(obj);
        }
    },




	  getPalletList: async function (req, res) {
        try {
             let poDetailsList = [];
            if (req.body.EvolveItem_ID.length == 0 && req.body.EvolveInventory_Refnumber == '0') {
                // console.log("firts condition called of pllet list")
                poDetailsList = await Evolve.App.Services.Wms.MovePallet.SrvMove.getPalletList();
            }
            // if (req.body.EvolveItem_ID.length != 0 && req.body.EvolveInventory_Refnumber == '0') {
            //     poDetailsList = await Evolve.App.Services.Wms.MovePallet.SrvMove.getPalletListByItemId(req.body.EvolveItem_ID);
            // }
            if (req.body.EvolveItem_ID.length == 0 && req.body.EvolveInventory_Refnumber != '0') {
                poDetailsList = await Evolve.App.Services.Wms.MovePallet.SrvMove.getPalletListByRefnumber(req.body.EvolveInventory_Refnumber);
            }
            // if (req.body.EvolveItem_ID.length != 0 && req.body.EvolveInventory_Refnumber != '0') {
            //     poDetailsList = await Evolve.App.Services.Wms.MovePallet.SrvMove.getPalletListByItemIdAndRefnumber(req.body.EvolveItem_ID, req.body.EvolveInventory_Refnumber);
            // }
           
            let obj = { statusCode: 200, status: "success", message: "Pallet List", result: poDetailsList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0974: Error while getting pallet list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0974: Error while getting pallet list "+error.message, result: null };
            res.send(obj);
        }
	},
	


	
	movePallet: async function (req, res) {
      try {
        let getTransTypeID = await Evolve.App.Services.Wms.MovePallet.SrvMove.getTransTypeID('RCPT-MV-PLT');
        if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
            let obj = { statusCode: 400, status: "fail", message: "Error while get EvolveTranstype_ID", result: null };
            res.send(obj);
        } 
        else
        {
          req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID;
          let getPalletDetails = await Evolve.App.Services.Wms.MovePallet.SrvMove.getPalletDetails(req.body.EvolveInventory_ID);
          if (getPalletDetails instanceof Error || getTransTypeID.rowsAffected < 1) 
          {
            let obj = { statusCode: 400, status: "fail", message: "Error while getting pallet data ", result: null };
            res.send(obj);
          } 
          else
          {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateLocation = await Evolve.App.Services.Wms.MovePallet.SrvMove.updateLocation(req.body);
            if (updateLocation instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error while change location", result: null };
                res.send(obj);
            } else {
              let  data = getPalletDetails.recordset[0]
              let history_Data = {
                'EvolveCompany_ID': req.EvolveCompany_ID,
                'EvolveUnit_ID': req.EvolveUnit_ID,
                'EvolveTranstype_code': 'RCPT-MV-PLT',
                'EvolveItem_ID': data.EvolveItem_ID,
                'EvolveInventoryTransHistory_Number' :null, // WO / PO / SO NUMBER 
                'EvolveInventoryTransHistory_Line' :null, // PO / SO LINE NUMBER
                'EvolveInventoryTransHistory_LotSerial' :  data.EvolveInventory_LotNumber,
                'EvolveInventoryTransHistory_RefNumber' : data.EvolveInventory_RefNumber,
                'EvolveInventoryTransHistory_FromRefNumber' : null,
                'EvolveInventoryTransHistory_QtyRequire' :  null,
                'EvolveInventoryTransHistory_Qty' :data.EvolveInventory_QtyOnHand,
                'EvolveUom_ID':null,
                'EvolveLocation_FromID': data.EvolveLocation_ID,
                'EvolveLocation_ToID': req.body.EvolveToLocation_ID,
                'EvolveReason_ID' : req.body.EvolveReason_ID,
                'EvolveInventoryTransHistory_InventoryStatus' : data.EvolveInventory_Status,
                'EvolveInventoryTransHistory_PostingStatus' : data.EvolveInventory_PostingStatus,
                'EvolveInventoryTransHistory_Remark' : null,
                'EvolveUser_ID' : req.EvolveUser_ID
              };
              let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                if (add_history instanceof Error  || add_history.rowsAffected < 1) {
                    let obj = { statusCode: 400, status: "fail", message: "Error while adding  history", result: null };
                    res.send(obj);
                }
                else
                {
                      let ioFields = {
                        'EvolveItem_Code': data.EvolveItem_Code,
                        'EvolveInventory_QtyOnHand' :data.EvolveInventory_QtyOnHand, 
                        'FromUnitCode': '10-100',
                        'ToUnitCode': '10-100',
                        'FromLocation': data.EvolveLocation_Name,
                        'ToLOcation': req.body.locName ,
                        'EvolveInventory_LotNumber': data.EvolveInventory_LotNumber ,
                        'EvolveInventory_RefNumber': data.EvolveInventory_RefNumber ,
                      };
                      let ioData = {
                        EvolveIO_Data : ioFields , 
                        EvolveIO_Direction: 0, // 1 Means IN Direction , 0 Means Out Direction
                        EvolveIO_Code: "EVOLVEMOVEOB", // EVOLVEPOOB = po receive
                        EvolveIO_Data_Formate: "XML",
                        EvolveIO_ERP_Type: "QAD",
                        EvolveIO_Status: 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
                        EvolveIO_File_Data: ''
                      }

                  let addIoData = await Evolve.App.Services.Wms.MovePallet.SrvMove.addIOData(ioData);
                  

                    if (addIoData instanceof Error || addIoData.rowsAffected < 1 ) {
                      console.log("entered in error  >>>> ")
                        let obj = { statusCode: 400, status: "fail", message: "Error while adding io data", result: null };
                        res.send(obj);
                    }
                    else
                    {
                              let obj = { statusCode: 200, status: "success", message: "Pallet moved successfully", result: null };
                              res.send(obj);
                    }
                  }
                

                }
            
            }
          }
        }
     catch (error) {
          Evolve.Log.error(" EERR0975: Error while moving pallet "+error.message);
          // let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
          // res.send(obj);
      }
    },

    getLocationList: async function (req, res) {
		// console.log("SEARCH TERM IS >>>>> " , req.query.term)
		try {
		  let locationList = await Evolve.App.Services.Wms.MovePallet.SrvMove.getLocationList(
			req.query.term
		  );
		  let obj = {
			statusCode: 200,
			status: "success",
			message: "Location List",
			result: locationList.recordset
		  };
		  res.send(obj);
		} catch (error) {
		  Evolve.Log.error(" EERR0976: Error while getting location list "+error.message);
		  let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0976: Error while getting location list "+error.message,
            result: null
		  };
		  res.send(obj);
		}
      },
      


	



}
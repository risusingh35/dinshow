'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
  getIPAddemblyParentItems: async function(req, res) {
    try {
      let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.getIPAddemblyParentItems();
      if(response instanceof Error || response.rowsAffected < 1){
        let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
        res.send(obj);
      }else{
        let obj = { statusCode: 200, status: "success", message: "Parent Items get successfully", result: response.recordset };
        res.send(obj);
      }
     
    } catch (error) {
      Evolve.Log.error(error.message);
      let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
      res.send(obj);
    }
    },
    getIPAssemblyBarcodeList: async function(req, res) {
    try {
      let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.getIPAssemblyBarcodeList();
      if(response instanceof Error){
        let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
        res.send(obj);
      }else{
        let obj = { statusCode: 200, status: "success", message: "Barcode details getted successfully", result: response.recordset };
        res.send(obj);
      }
     
    } catch (error) {
      Evolve.Log.error(error.message);
      let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
      res.send(obj);
    }
    },
    getOnchangeIPAssemblyParent: async function(req, res) {
    try {
      let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.getOnchangeIPAssemblyParent(req.body);
      if(response instanceof Error || response.rowsAffected < 1){
        let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
        res.send(obj);
      }else{
        let obj = { statusCode: 200, status: "success", message: "Parent Description Get Successfully", result: response.recordset };
        res.send(obj);
      }
     
    } catch (error) {
      Evolve.Log.error(error.message);
      let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
      res.send(obj);
    }
    },
  
    startIpAssemblyScrewOp: async function(req, res) {
      try {
    
        req.body.EvolveCompany_ID = req.EvolveCompany_ID;
        req.body.EvolveUnit_ID = req.EvolveUnit_ID
        req.body.EvolveUser_ID = req.EvolveUser_ID
    
        // let child_barcode =  req.body.child_barcode;	
        let check_validbarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.checkIPAssemblyValidChildBarcode(req.body);
        if(check_validbarcode instanceof Error){
          let obj = { statusCode: 400, status: "fail", message: 'Error While Check Child Barcode', result: null };
          res.send(obj);
        }else if(check_validbarcode.rowsAffected <1)
        {
          let obj = { statusCode: 400, status: "fail", message: 'Child Barcode Not Found', result: null };
          res.send(obj);
    
        }else{
          if(check_validbarcode.recordset[0].is_valid_barcode == 'true'){	
            let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.getIPAssemblyParentSerial(req.body);
            if(response instanceof Error || response.rowsAffected < 1){
              let obj = { statusCode: 400, status: "fail", message: "Parent Work order does not exist", result: null };
              res.send(obj);
            }else{
  
             let addAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.addIPAssemblyAudit(req.body,1,0);
  
            if(addAudit instanceof Error || addAudit.rowsAffected < 1){
  
              let obj = { statusCode: 400, status: "fail", message: "Error While Add Audit Data", result: null };
              res.send(obj);
  
  
            }else{
              let obj = { statusCode: 200, status: "success", message: "Start Screw Operation !", result: response.recordset[0] };
              res.send(obj);
            }
             }
          }
          else{
            let obj = { statusCode: 400, status: "fail", message: "Scanned Barcode not in IP Assembly queue", result: null };
            res.send(obj);
          }
    
      }
      } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
      }
      },
    checkIPAssemblyBarcodePrinted: async function(req, res) {
    try {
      let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.checkIPAssemblyBarcodePrinted(req.body);
      console.log("Check Print Barcode ",response.recordsets);
      if(response instanceof Error || response.rowsAffected < 1){
        let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
        res.send(obj);
      }else{
        let obj = { statusCode: 200, status: "success", message: "Reprint barcode is valid", result: response.recordset };
        res.send(obj);
      }
  
    } catch (error) {
      Evolve.Log.error(error.message);
      let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
      res.send(obj);
    }
    },
    printIPAssyBarcode: async function(req, res) {
      try {
            let child_barcode = req.body.child_barcode;
            let parent_barcode = req.body.parent_barcode;
            let ZplData = "^XA^FO40,30^GB540,260,8^FS\r\n"+
            "^FO40,160^GB540,0,8^FS\r\n"+
            "^LL100,^PW900^LH0,0\r\n"+
            "^MD3\r\n"+
            "^CF0,30\r\n"+
            "^FO180,70^FDFG PART NO:^FS^FO70,180^FDCHILD PART NO:^FS\r\n"+
            "^CF0,30\r\n"+
            "^FO180,110^SN"+parent_barcode+",1,Y^FS\r\n"+
            "^FO70,220^SN"+child_barcode+",1,Y^FS\r\n"+
            "^FT80,150^BQN,2,4^SN###"+parent_barcode+",1,Y^FS\r\n"+
            "^FT450,280^BQN,2,4^SN###"+child_barcode+",1,Y^FS\r\n"+
            "^PQ1\r\n"+
            "^XZ";
  
            Evolve.Fs.writeFile(Evolve.ConfigData.App.dirIPAssemblyPrint+'/'+parent_barcode+'.txt',ZplData,function(err){
              if(err){
                let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
                res.send(obj);
              } else {
                let obj = { statusCode: 200, status: "success", message: "Barcode Printed", result: null };
                res.send(obj);
              }
            });
      } catch (error) {
          Evolve.Log.error(error.message);
          let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
          res.send(obj);
      }
    },
    getAssemblyBracodeDetails: async function(req, res) {
      try {
          let details = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.getAssemblyBracodeDetails(req.body.EvolveProdOrdersDetail_Serial);
          if(details instanceof Error || details.rowsAffected < 1){
            let obj = { statusCode: 400, status: "fail", message: "Error While Get Barcode Details", result: null };
            res.send(obj);
          } else {
            let obj = { statusCode: 200, status: "fail", message: "Assembly Barcode", result: details.recordset[0] };
            res.send(obj);
          }
      } catch (error) {
          Evolve.Log.error(error.message);
          let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
          res.send(obj);
      }
    },
    ipAssemblyCheckAudit: async function(req, res) {
      try {
        let error = false ;
        let errorMessege ;
        let isBarcodeAvl = false ;
          let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.ipAssemblyCheckAudit();
          if(itemDetail instanceof Error){
    
            error = true ;
            errorMessege = 'No Ip Assembly Audit Data Found'
          } else {
           
            if(itemDetail.rowsAffected > 0) {
              if(itemDetail.recordset[0].EvolveIPAssemblyAudit_S3 == true){
              isBarcodeAvl = true ;
  
              let data ={};
              data.child_barcode = itemDetail.recordset[0].EvolveIPAssemblyAudit_Barcode;
              data.parent_item_id = itemDetail.recordset[0].EvolveIPAssemblyAudit_ParentItemId;
  
              data.EvolveCompany_ID =1;
              data.EvolveUnit_ID = 1;
              data.EvolveUser_ID = 1 ;       
  
  
                let check_validbarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.checkIPAssemblyValidChildBarcode(data);
                if(check_validbarcode instanceof Error){
  
                  error = true ;
                  errorMessege = 'Error While Check Barcode'
  
                }else if(check_validbarcode.rowsAffected == 0){
                  error = true ;
                  errorMessege = 'Invalid Barcode'
  
                }else{
  
                  if(check_validbarcode.recordset[0].is_valid_barcode == 'true'){	
                    let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.getIPAssemblyParentSerial(data);
                    if(response instanceof Error || response.rowsAffected < 1){

                      error = true ;
                      errorMessege = 'Parent Work order does not exist'
  
  
                    }else{
  
                      let child_serial_id = check_validbarcode.recordset[0].EvolveProdOrdersDetail_ID;
                   
                     let update_child = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.updateIpAssemblyChildParentSerial(data,response.recordset[0]);
                      console.log('update_child>>>>' ,  update_child)
                      if(update_child.rowsAffected > 0){
                        let updateChildWo = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.updateIpAssemblyChildWo(data);
                        if(updateChildWo instanceof Error ){
                          error = true ;
                          errorMessege = 'Error While Update Child Work Order Status'
               
            
                        }else{
                        let updateParentWo = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.updateIpAssemblyParentWo(response.recordset[0]);
                        if(updateParentWo instanceof Error ){
                          error = true ;
                          errorMessege = 'Error While Update Parent Work Order Status'
          
            
                        }else{
                        let update_assembly = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.insertIPAssebmly(response.recordset[0],child_serial_id);
                        if(update_assembly instanceof Error || update_assembly.rowsAffected < 1){
                 
                          error = true ;
                          errorMessege = 'Error While Insert IP Assembly Data'
                        }else{
                              let getChildWoData = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.getIpAssemblyChildWoData(data);
                              if(getChildWoData instanceof Error || getChildWoData.rowsAffected < 1){
                         
                                error = true ;
                                errorMessege = 'Error While Get Child Work Order Data'
            
                              }else{
                                let getParentWoData = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.getParentWoData(response.recordset[0]);
                                if(getParentWoData instanceof Error || getParentWoData.rowsAffected < 1){
                                  
                               
                                  error = true ;
                                  errorMessege = 'Error While Get Parent Work Order Data'
            
                                }else{
            
                                  let ipFlaming = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.getIpFlamingData(data);
            
                                  let foamingLamination ;
            
                        
                                  let  foamingOrLaminationOk;
                                  let  foamingOrLaminationPartTime;
          
                                    foamingLamination = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.getIpFoamingData(data);
            
                                        foamingOrLaminationOk = new Date(foamingLamination.recordset[0].EvolveIpFoaming_PartOkTime);
                                        foamingOrLaminationPartTime = foamingOrLaminationOk.getFullYear()+"-"+(foamingOrLaminationOk.getMonth() + 1)+"-"+foamingOrLaminationOk.getDate()+" "+foamingOrLaminationOk.getHours()+":"+foamingOrLaminationOk.getMinutes()+":"+foamingOrLaminationOk.getSeconds()+"."+foamingOrLaminationOk.getMilliseconds();
            
                                let flamingOkTime = new Date(ipFlaming.recordset[0].EvolveIpFlaming_PartOkTime);
                                let flamingPartTime = flamingOkTime.getFullYear()+"-"+(flamingOkTime.getMonth() + 1)+"-"+flamingOkTime.getDate()+" "+flamingOkTime.getHours()+":"+flamingOkTime.getMinutes()+":"+flamingOkTime.getSeconds()+"."+flamingOkTime.getMilliseconds();
                              
            
                                // Insert One Record With For get index Number...
            
                                let dataInTrans = {
                                  'ITEMNO' : getChildWoData.recordset[0].EvolveItem_Code,
                                  'CPART' : data.child_barcode,
                                  'WONO' : getChildWoData.recordset[0].EvolveProdOrders_Order,
                                  'PSERIAL' : response.recordset[0].EvolveProdOrdersDetail_Serial,
                                  'FZ1862276_TIME' : flamingPartTime,
                                  'FZ1862276_PartOK': (ipFlaming.recordset[0].EvolveIpFlaming_IsPartOk == true)? 1 : 0,
                                  'K3220_TIME' : foamingOrLaminationPartTime,
                                  'PPART' : response.recordset[0].EvolveProdOrdersDetail_Serial,
                                }
            
            
            
                                let inBoundResult = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.saveIpAssemblyInTrans(data,dataInTrans);
            
                                if( inBoundResult instanceof Error ){
                     
                                  let obj = { statusCode: 400, status: "fail", message: "Error in XML", result: null };
                                  res.send(obj);
                                }
                                else
                                {
            
                                  let xml = Evolve.Xml.create('DocumentElement', { version:"1.0", encoding: 'UTF-8' });
                                  xml.ele('CHLDBKFLSH')
                                    .ele('DANO',Math.floor((Math.random() * 100000) + 1)).up()
                                    .ele('ITEMNO',getChildWoData.recordset[0].EvolveItem_Code).up()
                                    .ele('CPART',data.child_barcode).up()
                                    .ele('WONO',getChildWoData.recordset[0].EvolveProdOrders_Order).up()
                                    .ele('PLINE','IMM15').up()
                                    .ele('INVQTY',1).up()
                                    .ele('PSERIAL',response.recordset[0].EvolveProdOrdersDetail_Serial).up()
                                    .ele('FZ1862276_TIME',flamingPartTime).up()
                                    .ele('FZ1862276_PartOK',(ipFlaming.recordset[0].EvolveIpFlaming_IsPartOk == true)? 1 : 0).up()
                                    .end();
                                  xml.ele('PRNTBKFLSH')
                                    .ele('DANO',Math.floor((Math.random() * 100000) + 1)).up()
                                    .ele('ITEMNO',getParentWoData.recordset[0].EvolveItem_Code).up()
                                    .ele('PPART',response.recordset[0].EvolveProdOrdersDetail_Serial).up()
                                    .ele('WONO',getParentWoData.recordset[0].EvolveProdOrders_Order).up()
                                    .ele('PLINE','IP2RH').up()
                                    .ele('INVQTY',1).up()
                                    .end();
                                  let xmldoc = xml.end({ pretty: true });
                                  console.log(xmldoc);
                                  console.log("xmldoc::", xmldoc)
                                  let fileName  = data.child_barcode + "_xml.xml";
                                  Evolve.Fs.writeFile(Evolve.ConfigData.App.dirPath+'/'+fileName, xmldoc, function(err) {
                                      if(err) {
                                        error = true;
                                        errorMessege = err;
                                          console.log(err);
                                      }else{
                                          console.log("The file was saved!");
                                          // Update status of XML.
            
                              Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.updateInTransStatus(inBoundResult,'L');
                              Evolve.Fs.writeFile(Evolve.ConfigData.App.dirPath_mounted+'/'+fileName, xmldoc, function(err) { 
                                if(err) {
                                  error = true;
                                  errorMessege = err;
                                  console.log(err);
                                }else{
                                  console.log("The file was saved to Mounted Folder! ");
                                }
                               })
                                   } 
                                   });
            
      
                                }
                                }
                              }
                          
                            }
                    
                      }
                        
                        }
                      }else{
                        error = true ;
                        errorMessege = 'Barcodes not updated'
  
                      }
  
                    }
                  }
  
  
  
                }
                }
              }
        
          }
  
          if(isBarcodeAvl == true){
          if(error == false){
  
            await Evolve.App.Services.SmartFactory.MfProcess.SrvIPAssembly.TruncateIpAssemblyAudit();
  
              await Evolve.Io.emit('checkIPAssyS3', {
                message : 'OK',
                barcode : itemDetail.recordset[0].EvolveIPAssemblyAudit_Barcode,
                EvolveIPAssemblyAudit_ParentItemId : itemDetail.recordset[0].EvolveIPAssemblyAudit_ParentItemId,
  
              });
  
  
          }else{
            await Evolve.Io.emit('checkIPAssyS3', {
              message : 'Errror While Compete Screw Operation',
              barcode : itemDetail.recordset[0].EvolveIPAssemblyAudit_Barcode,
              EvolveIPAssemblyAudit_ParentItemId : itemDetail.recordset[0].EvolveIPAssemblyAudit_ParentItemId,
            });
  
          }
          }
    
        setTimeout(function(){
          Evolve.App.Controllers.SmartFactory.MfProcess.ConIPAssembly.ipAssemblyCheckAudit();
        },1000);
    
      } catch (error) {
          Evolve.Log.error(error.message);
          
      }
    },
}
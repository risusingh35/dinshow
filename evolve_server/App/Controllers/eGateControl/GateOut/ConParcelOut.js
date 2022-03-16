'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

  addParcelData: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;

      let lastReference = await Evolve.App.Services.eGateControl.GateOut.SrvParcelOut.getLastReference(req.body);
      if (lastReference instanceof Error) {
        let obj = { statusCode: 400, status: "fail", message: "EERR0176: Error on get last reference number ", result: null };
        res.send(obj);
      }
      else {
        let date = new Date();
        let mm = date.getMonth() + 1;
        if (mm < 10) {
          mm = '0' + mm
        }
        let yy = date.getFullYear() + "";
        yy = yy.substring(1);
        yy = yy.substring(1);
        let barcode;
        if (lastReference.rowsAffected == 1) {
          let count = await Evolve.App.Services.eGateControl.GateOut.SrvParcelOut.getIdCount();
          count = count.recordset[0].count
          let lastCode = lastReference.recordset[0].EvolveGate_RefNumber;
          lastCode = lastCode.substring(1)
          lastCode = lastCode.substring(1)
          console.log("last code >>>>>", lastCode);
          let num = parseInt(count) + 1;
          var str = "" + num;
          var pad = "0000";
          var codeString = pad.substring(0, pad.length - str.length) + str; //0001
          barcode = mm + yy + codeString;
        }
        else {
          barcode = mm + yy + "0001";

        }
        if (req.body.image != '') {
          // let d = new Date();
          let time = date.getTime();
          let imageData = req.body.image;
          let extention = imageData.substring(
            "data:image/".length,
            imageData.indexOf(";base64")
          );
          let fileName = "GN" + barcode + "." + extention;
          req.body.imageName = fileName;
          let base64Data = imageData.replace(/^data:image\/png;base64,/, "");
          base64Data = imageData.replace(/^data:image\/jpeg;base64,/, "");
          Evolve.Fs.writeFile(
            Evolve.Config.imageUploadPath + fileName,
            base64Data,
            "base64",
            function (err) {
              if (err) {
                console.log(err);
                // res.json(0);
              } else {

              }
            }
          );
          req.body.EvolveGate_Image = req.body.imageName;

        }
        let addParcel = await Evolve.App.Services.eGateControl.GateOut.SrvParcelOut.addParcelData(req.body, barcode);
        if (addParcel instanceof Error) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message:  " EERR0177: Error while Add Parcel Data !",
            addParcel: null
          };
          res.send(obj);
        } else {
          let obj = {
            statusCode: 200,
            status: "Parcel Out Successfully",
            message: "Parcel Out Successfully",
            result: addParcel.recordset
          };
          res.send(obj);
        }










      }





      // let addParcel = await Evolve.App.Services.eGateControl.GateOut.SrvParcelOut.addParcelData(req.body);
      // if (addParcel instanceof Error) {
      //     let obj = {
      //         statusCode: 400,
      //         status: "fail",
      //         message: "Error while Add Parcel Data !",
      //         addParcel: null
      //     };
      //     res.send(obj);
      // } else {
      //     let obj = {
      //         statusCode: 200,
      //         status: "Parcel added Successfully",
      //         message: "Parcel added Successfully",
      //         result: addParcel.recordset
      //     };
      //     res.send(obj);
      // }
    } catch (error) {
      Evolve.Log.error(" EERR0178: Error while adding parcel data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0178: Error while adding parcel data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },




}
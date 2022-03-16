'use strict';
const Evolve = require("../../../../Boot/Evolve");
const nodemailer = require('nodemailer');
module.exports = {

    saveAllbedsIntoRAM: async function () {
        try {
            console.log("Save All Tag in RAM Called...")
            Evolve.EvolveRFID = [];
            let result = await Evolve.App.Services.eAssets.MqttServices.SrvMqttAssets.getAllBeds();
            if (result instanceof Error || result.rowsAffected < 1) {
                console.log("Error on Save Tag into RAM..")
            } else {
                for (let i = 0; i < result.recordset.length; i++) {
                    Evolve.EvolveRFID.push({
                        "EvolveBed_ID": result.recordset[i].EvolveBed_ID,
                        "EvolveBed_RFID": result.recordset[i].EvolveBed_RFID,
                        "IN": 'F'
                    })
                }
            }
        } catch (error) { 
            Evolve.Log.error(" EERR0134: Error while saving all beds into RAM "+error.message);
            console.log(" EERR0134: Error while saving all beds into RAM "+ error)
        }
    },

    // Save all data into Database & check old status
    saveAllbedsInOutTime: async function () {
        try {
            // Save To Database
            for (let i = 0; i < Evolve.EvolveRFID.length; i++) {
                // if(Evolve.EvolveRFID[i].IN == 'F'){
                // Bed is not in store Room
                //await Evolve.App.Services.eAssets.MqttServices.SrvMqttAssets.saveOutBed(Evolve.EvolveRFID[i].EvolveBed_ID);
                // }else{
                // Bed in store room so update status 
                //await Evolve.App.Services.eAssets.MqttServices.SrvMqttAssets.saveInBed(Evolve.EvolveRFID[i].EvolveBed_ID);
                // }

                if (Evolve.EvolveRFID[i].IN == 'T') {
                    await Evolve.App.Services.eAssets.MqttServices.SrvMqttAssets.saveBedInOut(Evolve.EvolveRFID[i].EvolveBed_ID);
                }
            }

            // console.log(">>>>>", Evolve.EvolveRFID) 

            // Reset 
            for (let i = 0; i < Evolve.EvolveRFID.length; i++) {
                Evolve.EvolveRFID[i].IN = "F";
            }

            setTimeout(function () {
                Evolve.App.Controllers.eAssets.MqttController.ConMqttAssets.saveAllbedsInOutTime();
            }, Evolve.Config.timer);

        } catch (error) {
            Evolve.Log.error(" EERR1026: Error while save all beds in out time  "+error.message);
            console.log(" EERR1026: Error while save all beds in out time  "+error)
        }
    },

    todayHistory: async function (req, res) {
        try {
            let todayhistorydata = await Evolve.App.Services.eAssets.MqttServices.SrvMqttAssets.todayHistory();
            var d = new Date();
            var name = d.getTime();
            let OTP = name;
            let defaultTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: Evolve.Config.email,
                    pass: Evolve.Config.pass
                }
            });
            // console.log("Do Email...", OTP);
            // if Is Email Id
            const fs = require('fs');
            const { Parser } = require('json2csv');
            const fields = ['Bed Code', 'Room No', 'Bed Out Time', 'Bed In Time', 'Bed Duration'];
            let historydata = [];
            for (let i = 0; i < todayhistorydata.recordset.length; i++) {
                let BedOutTime;
                if (todayhistorydata.recordset[i].EvolveBedHistory_OutTime != null) {
                    let ebhouttime = new Date(todayhistorydata.recordset[i].EvolveBedHistory_OutTime);
                    let outdate = ebhouttime.getUTCDate();
                    let outmonth = parseInt(ebhouttime.getUTCMonth() + 1);
                    let outyear = ebhouttime.getUTCFullYear();
                    let outhours = ebhouttime.getUTCHours();
                    let outminutes = ebhouttime.getUTCMinutes();
                    let outampm = outhours >= 12 ? "PM" : "AM";
                    outhours = outhours % 12;
                    outhours = outhours ? outhours : 12;
                    outminutes = outminutes < 10 ? "0" + outminutes : outminutes;
                    BedOutTime = outdate + "/" + outmonth + "/" + outyear + " " + outhours + ":" + outminutes + " " + outampm;
                }
                else {
                    BedOutTime = "-";
                }
                let BedInTime;
                if (todayhistorydata.recordset[i].EvolveBedHistory_InTime != null) {
                    console.log("in bedintime");
                    let ebhintime = new Date(todayhistorydata.recordset[i].EvolveBedHistory_InTime);
                    let indate = ebhintime.getUTCDate();
                    let inmonth = parseInt(ebhintime.getUTCMonth() + 1);
                    let inyear = ebhintime.getUTCFullYear();
                    let inhours = ebhintime.getUTCHours();
                    let inminutes = ebhintime.getUTCMinutes();
                    let inampm = inhours >= 12 ? "PM" : "AM";
                    inhours = inhours % 12;
                    inhours = inhours ? inhours : 12;
                    inminutes = inminutes < 10 ? "0" + inminutes : inminutes;
                    BedInTime = indate + "/" + inmonth + "/" + inyear + " " + inhours + ":" + inminutes + " " + inampm;
                }
                else {
                    console.log("out bed in time");
                    BedInTime = "-";
                }
                let durseconds = todayhistorydata.recordset[i].EvolveBedHistory_Duration;
                let durminutes = Math.floor(durseconds / 60);
                let durhours = (durminutes / 60);
                let durrhours = Math.floor(durhours);
                let durmint = (durhours - durrhours) * 60;
                let durrminutes = Math.round(durmint);
                let BedDurations = durrhours + " hour(s) and " + durrminutes + " minute(s).";

                historydata.push({
                    "Bed Code": todayhistorydata.recordset[i].EvolveBed_Code,
                    "Room No": todayhistorydata.recordset[i].EvolveRoom_Name,
                    "Bed Out Time": BedOutTime,
                    "Bed In Time": BedInTime,
                    "Bed Duration": BedDurations,
                });
            }
            const json2csvParser = new Parser({ fields, unwind: 'Duration' });
            const csv = json2csvParser.parse(historydata);

            let eBykeDate = new Date();
            let eBykedate = eBykeDate.getUTCDate();
            let eBykemonth = parseInt(eBykeDate.getUTCMonth() + 1);
            let eBykeyear = eBykeDate.getUTCFullYear();

            let eBykeTodayDate = eBykedate + "/" + eBykemonth + "/" + eBykeyear;
            // var ccmaillist = [
            //     'darshan@alitersolutions.com',
            // ];
            // console.log(csv);
            var mailOptions = {
                to: Evolve.Config.toemail,
                // cc: ccmaillist,
                from: Evolve.Config.email,
                subject: 'Evolve Assets Tracking : ' + eBykeTodayDate,
                text: 'Hi Sir,\n\n' +
                    ' Please Find Attachment Report \n\n' +
                    ' Date : ' + eBykeTodayDate + ' \n\n' +
                    ' Thanks, \n\n' +
                    'The Evolve Aliter Solutions \n\n',
                // subject: 'The Byke Suraj Plaza CSV Report date : ' + eBykeTodayDate,
                // text: 'Hi Sir,\n\n' +
                //     ' Please Find Attachment Report \n\n' +
                //     ' Date : ' + eBykeTodayDate + ' \n\n' +
                //     ' Thanks, \n\n' +
                //     'The Byke Suraj Plaza - Thane\n\n',
                attachments: [{
                    filename: name + '.csv',
                    content: csv
                }],
            };
            // console.log("Do Email...", OTP);
            defaultTransport.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log("Do Nothing...", error);
                } else {
                    console.log("Email Sending........")
                }
            });
            console.log("name >>", name)
            fs.writeFile('csv/' + name + '.csv', csv, function (err) {
                if (err) {
                    console.log('Error');
                }
                console.log('file saved');
            });
        } catch (error) {
            Evolve.Log.error("EERR0135: Error in today History"+error.message);
        }
    },

}
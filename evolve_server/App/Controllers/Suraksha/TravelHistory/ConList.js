'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    
    updateTravelHist: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let updateReq = await Evolve.App.Services.Suraksha.TravelHistory.SrvList.updateTravelHist(req.body)
            if (updateReq instanceof Error || updateReq.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Updated travel History ",
                    result: '',
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "travel History Updated Successfully !",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTravelHistList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Suraksha.TravelHistory.SrvList.getTravelHistCount(search);

            let result = await Evolve.App.Services.Suraksha.TravelHistory.SrvList.getTravelHistList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error While get Travel Mode List !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: result.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" Error while get Travel Mode List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " Error while get Travel Mode List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // addTravelHist: async function (req, res) {
    //     try {
    //             let error = false ;
    //             let  userId ;

    //             console.log("req.body???" ,  req.body)
    
    //         for(let i=0  ; i<req.body.length ; i++){
    //             let  district  =  '';
    //             let state = '';

    //             if(error == false){
    //                 let histDetails = JSON.parse(req.body[i])

    //                 let userDetails = histDetails.user_data
    //                 userId = userDetails.EvolveUser_id

    //                 let latlng = histDetails.latitude+","+histDetails.longitude//'23.552060,72.746160'
    //                 let url   = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latlng+'&key=AIzaSyBoWUUa_DrB7d3J8IRNBTbjj-BftB1Uakk' ;
    //                 let apiData = await Evolve.Axios.get(url,  {
    //                     "method": "GET",
    //                     "scheme": "https",
    //                     "accept-language": "en-US,en;q=0.9",
    //                     "cache-control": "no-cache",
    //                     "pragma": "no-cache",
    //                     "sec-fetch-dest": "document",
    //                     "sec-fetch-mode": "navigate",
    //                     "sec-fetch-site": "none",
    //                     "sec-fetch-user": "?1",
    //                     "upgrade-insecure-requests": "1",
    //                     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
    //                 });
            
    //                 let data = apiData.data.results[0].address_components
    //                 let details = {
    //                     EvolveUser_ID : userDetails.EvolveUser_id,
    //                     EvolveTravelReq_id : userDetails.EvolveTravelReq_id,
    //                     EvolveTravelHistory_address :  '',
    //                     EvolveTravelHistory_latLong : latlng ,
    //                     EvolveTravelHistory_city : '',
    //                     EvolveTravelHistory_country : '',
    //                     EvolveTravelHistory_district : '',
    //                     EvolveTravelHistory_pincode : '',
    //                     EvolveStatus_id : userDetails.EvolveTravelReq_TripStatusID,
    //                     EvolveTravelHistory_covid : '',
    //                     EvolveTravelHistory_state : '',
    //                 };
    //                 for(let i=0 ; i < data.length ; i++){

    //                     if(data[i].types[0] == 'route'){

    //                         details.EvolveTravelHistory_address += data[i].long_name
    //                     }
    //                     else if(data[i].types[0] == 'neighborhood'){

    //                         details.EvolveTravelHistory_address += ','+data[i].long_name

    //                     }else if(data[i].types[0] == 'political'){

    //                         details.EvolveTravelHistory_address += ','+data[i].long_name

    //                     }else if(data[i].types[0] == 'locality'){
                            
    //                         details.EvolveTravelHistory_city += data[i].long_name

    //                     }else if(data[i].types[0] == 'administrative_area_level_2'){

    //                         details.EvolveTravelHistory_district += data[i].long_name

    //                         district = data[i].long_name;

    //                     }else if(data[i].types[0] == 'country'){

    //                         details.EvolveTravelHistory_country += data[i].long_name
    //                     }else if(data[i].types[0] == 'postal_code'){

    //                         details.EvolveTravelHistory_pincode += data[i].long_name
    //                     }else if(data[i].types[0] == 'administrative_area_level_1'){

    //                         details.EvolveTravelHistory_state += data[i].long_name
    //                         state = data[i].long_name

    //                     }
    //                 }
    //                 console.log("district>>" , district)
    //                 console.log("state>>" , state)

    //                 let covidData =  await Evolve.Axios.get('https://api.covid19india.org/state_district_wise.json',   {
                    
    //                     "method": "GET",
    //                     "scheme": "https",
    //                     "accept-language": "en-US,en;q=0.9",
    //                     "cache-control": "no-cache",
    //                     "pragma": "no-cache",
    //                     "sec-fetch-dest": "document",
    //                     "sec-fetch-mode": "navigate",
    //                     "sec-fetch-site": "none",
    //                     "sec-fetch-user": "?1",
    //                     "upgrade-insecure-requests": "1",
    //                     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
    //                 });
                 
    //                     covidData = covidData.data
                

    //                     let distData = {}
    //                     if(covidData[state] == undefined){
    //                         distData.state = state;
    //                         distData.district = district;
    //                     }else{
            
    //                     if(covidData[state].districtData != undefined){        
    //                     let stateData = covidData[state].districtData ;
            
                        
    //                     distData = stateData[district];
    //                     distData.state = state;
    //                     distData.district = district;
    //                     }else{
    //                         let stateData = covidData[state] ;
    //                         distData = stateData;
    //                         distData.state = state;
    //                         distData.district = district;
            
    //                     }
    //                 }

    //                 console.log("distData>>" ,  distData)
    //                 details.EvolveTravelHistory_covid = distData;
    //                 let addTravelHist = await Evolve.App.Services.Suraksha.TravelHistory.SrvList.addTravelHist(details)

    //                 if (addTravelHist instanceof Error ) {

    //                     error = true ;

    //                 }
    //             }

    //          }

    //         if (error == true) {
    //             let response = {
    //                 statusCode: 400,
    //                 status: "fail",
    //                 message: "Error While Add travel History",
    //                 result: '',
    //             };
    //             res.send(response);
    //         } else {

    //             let data = {} ;
    //             data.notifType = 'ADDHISTORY';
    //             data.loggedUserID = userId
    //             let sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)

    //             let response = {
    //                 statusCode: 200,
    //                 status: "success",
    //                 message: "success",
    //                 result: null
    //             };
    //             res.send(response);
    //         }
     
    //     } catch (error) {
    //         Evolve.Log.error("Error While Add travel History" + error.message);
    //         let response = {
    //             statusCode: 400,
    //             status: "fail",
    //             message: "Error While Add travel History",
    //             result: '',
    //         };
    //         res.send(response);

    //     }
    // },


    addTravelHist: async function (req, res) {
        try {

                let  bodyArray  = JSON.parse(req.body.data);

                let error = false ;

            for(let i=0  ; i<bodyArray.length ; i++){
                let  district  =  '';
                let state = '';

                if(error == false){
                    let locDetails = bodyArray[i]

                    let latlng = locDetails.latitude+","+locDetails.longitude//'23.552060,72.746160'
                    let url   = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latlng+'&key=AIzaSyBoWUUa_DrB7d3J8IRNBTbjj-BftB1Uakk' ;
                    let apiData = await Evolve.Axios.get(url,  {
                        "method": "GET",
                        "scheme": "https",
                        "accept-language": "en-US,en;q=0.9",
                        "cache-control": "no-cache",
                        "pragma": "no-cache",
                        "sec-fetch-dest": "document",
                        "sec-fetch-mode": "navigate",
                        "sec-fetch-site": "none",
                        "sec-fetch-user": "?1",
                        "upgrade-insecure-requests": "1",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
                    });
            
                    let data = apiData.data.results[0].address_components
                    let details = {
                        EvolveUser_ID : locDetails.EvolveUser_id,
                        EvolveTravelReq_id : locDetails.EvolveTravelReq_id,
                        EvolveTravelHistory_address :  '',
                        EvolveTravelHistory_latLong : latlng ,
                        EvolveTravelHistory_city : '',
                        EvolveTravelHistory_country : '',
                        EvolveTravelHistory_district : '',
                        EvolveTravelHistory_pincode : '',
                        EvolveStatus_id : locDetails.EvolveTravelReq_TripStatusID,
                        EvolveTravelHistory_covid : '',
                        EvolveTravelHistory_state : '',
                        date : locDetails.date,

                        
                    };
                    for(let i=0 ; i < data.length ; i++){

                        if(data[i].types[0] == 'route'){

                            details.EvolveTravelHistory_address += data[i].long_name
                        }
                        else if(data[i].types[0] == 'neighborhood'){

                            details.EvolveTravelHistory_address += ','+data[i].long_name

                        }else if(data[i].types[0] == 'political'){

                            details.EvolveTravelHistory_address += ','+data[i].long_name

                        }else if(data[i].types[0] == 'locality'){
                            
                            details.EvolveTravelHistory_city += data[i].long_name

                        }else if(data[i].types[0] == 'administrative_area_level_2'){

                            details.EvolveTravelHistory_district += data[i].long_name

                            district = data[i].long_name;

                        }else if(data[i].types[0] == 'country'){

                            details.EvolveTravelHistory_country += data[i].long_name
                        }else if(data[i].types[0] == 'postal_code'){

                            details.EvolveTravelHistory_pincode += data[i].long_name
                        }else if(data[i].types[0] == 'administrative_area_level_1'){

                            details.EvolveTravelHistory_state += data[i].long_name
                            state = data[i].long_name

                        }
                    }

                    let covidData =  await Evolve.Axios.get('https://api.covid19india.org/state_district_wise.json',   {
                    
                        "method": "GET",
                        "scheme": "https",
                        "accept-language": "en-US,en;q=0.9",
                        "cache-control": "no-cache",
                        "pragma": "no-cache",
                        "sec-fetch-dest": "document",
                        "sec-fetch-mode": "navigate",
                        "sec-fetch-site": "none",
                        "sec-fetch-user": "?1",
                        "upgrade-insecure-requests": "1",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
                    });
                 
                        covidData = covidData.data
                

                        let distData = {}
                        if(covidData[state] == undefined){
                            distData.state = state;
                            distData.district = district;
                        }else{
            
                        if(covidData[state].districtData != undefined){        
                        let stateData = covidData[state].districtData ;
            
                        
                        distData = stateData[district];
                        distData.state = state;
                        distData.district = district;
                        }else{
                            let stateData = covidData[state] ;
                            distData = stateData;
                            distData.state = state;
                            distData.district = district;
            
                        }
                    }
                    details.EvolveTravelHistory_covid = distData;
                    let addTravelHist = await Evolve.App.Services.Suraksha.TravelHistory.SrvList.addTravelHist(details)

                    if (addTravelHist instanceof Error ) {

                        error = true ;

                    }
                }

             }
            if (error == true) {
                let response = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Add travel History",
                    result: '',
                };
                res.send(response);
            } else {

                let data = {} ;
                data.notifType = 'ADDHISTORY';
                data.loggedUserID = bodyArray[0].EvolveUser_id
                let sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)

                let response = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: null
                };
                res.send(response);
            }
     
        } catch (error) {
            Evolve.Log.error("Error While Add travel History" + error.message);
            let response = {
                statusCode: 400,
                status: "fail",
                message: "Error While Add travel History",
                result: '',
            };
            res.send(response);

        }
    },
}
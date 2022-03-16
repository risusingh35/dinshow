'use strict';
/* Copyright (C) 2019 Aliter business solutions Pvt Ltd to Present 
 * All Rights Reserved.
 * Version : 1.1.0
 * You should have received a copy of the GNU license with
 * this file. If not, please write to : vijay@alitersolutions.com, 
 * or visit : https://www.alitersolutions.com

 /**
  * Load Required Models 
  */


/** For Server Operation */
var express = require('express');
var fs = require('fs');
var join = require('path').join;
var path = require("path");
var FsTree = require("directory-tree");
// var FsTree = 
/** For Log Operation */
var winston = require('winston');
require('winston-daily-rotate-file');
var ip = require('ip');




/** For View Operation */


/** For Middlewares Operation */
var Joi = require('joi');
var Jwt = require('jsonwebtoken');
var Bcrypt = require('bcryptjs');
var Md5 = require('md5');
var ActiveDirectory = require('activedirectory');
var xmlbuilder = require('xmlbuilder');
var uuid = require('uuid');
var xml2js = require('xml2js');

/** For Database Operation */
var sql = require("mssql");
var redis = require("redis");
var asyncRedis = require("async-redis");
var mongoose = require('mongoose');
const { MongoClient, ObjectID } = require('mongodb');
// var ObjectID = require('mongodb').ObjectID;

/** For File Operation  */
var Csv = require('csvtojson');
var jsonexport = require('jsonexport');
var Xlsx = require('xlsx');
var pdfExtract = require("pdf2json");

/** For API Operation  */
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var axios = require('axios');

/** Proecess */
var child_process = require('child_process');
var socketIOClient = require('socket.io-client');
var schedule = require('node-schedule');
var mqtt = require('mqtt');
var nodemailer = require('nodemailer');
var Client = require("ssh2-sftp-client");

/** Request Module For ZPL Label API Response **/
var request = require('request');
var PNG = require('pngjs').PNG;
var rgbaToZ64 = require('zpl-image').rgbaToZ64;
var pdflib = require("pdf-lib")

// Print NPM
// var edge = require('edge-js');
// let tsclibnet = 'dll/tsclibnet.dll';

/** For Run CMD Command */

var cmd = require('node-cmd');

// For notification  on user device

var FCM = require('fcm-node');

// For Encryption in hash

var Crypto = require('crypto');

/** 
 * Environment Variable Setting
 */
require('dotenv').config()

/**
 * Loading Global Variable
 */

const Evolve = new require('../Boot/Evolve');

/**
 * Loading App
 */
Evolve.App = express();

Evolve.App.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

/**
 * Set View Folder Path
 */


Evolve.App.use(express.static('./build'));
Evolve.App.use(express.static('./public'));

Evolve.App.set('view engine', 'html');

/**
 *  Loading Security
 */

Evolve.App.use(fileUpload());

/**
 *  Body Parser
 */
// Evolve.App.use(bodyParser({ limit: '50mb' })); //Now deprecated 
Evolve.App.use(bodyParser.json({ limit: '50mb', extended: true }));
Evolve.App.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

/**
 * Set View Folder Path
 */

Evolve.App.use(express.static('./public'));


Evolve.Router = express.Router();
Evolve.Joi = Joi;
Evolve.Sql = sql;
Evolve.Mongoose = mongoose;
Evolve.Mongo = {};
Evolve.ObjectID = ObjectID;

Evolve.UUID = uuid;
Evolve.EvolveUsersAuth = []; // Save Evolve Auth Details
Evolve.UUID = uuid;
Evolve.Jwt = Jwt;
Evolve.JwtSecret = 'Evolve@$$#@!@!D##';
Evolve.Bcrypt = Bcrypt;
Evolve.Md5Enc = Md5;
Evolve.AD = ActiveDirectory;
Evolve.ADQueue = []; // ActiveDirectory Queur
Evolve.SqlPools = [];
Evolve.SqlPool = [];

Evolve.EvolveLogDB = {};
Evolve.EvolveAdminDB = {};
Evolve.EvolveMainDB = {};
Evolve.EvolveIoDB = {};
Evolve.EvolveCrmDB = {};
Evolve.EvolveIotDB = {};
Evolve.EvolveBrpDB = {};

Evolve.Csv = Csv;
Evolve.CsvExport = jsonexport;
Evolve.Axios = axios;
Evolve.ChildProcess = child_process;
Evolve.Schedule = schedule;
Evolve.Fs = fs;
Evolve.pdfExtract = pdfExtract;
Evolve.Weight = '0';
Evolve.WcmTask = [];
Evolve.EvolveWsM = [];
Evolve.MqttClient = mqtt;
Evolve.Xml = xmlbuilder;
Evolve.Xlsx = Xlsx;
Evolve.Milling = {};
Evolve.Vibration = {};
Evolve.vibrationBarcode = '';
Evolve.vibrationMessageStatus = {
    partOk: '-',
    step: 7
}; // Last Part Complited
Evolve.FsTree = FsTree;
Evolve.path = path;
Evolve.CMD = cmd;
Evolve.FCM = FCM;
Evolve.AuthToken = [];
Evolve.Devices = [];
Evolve.CFD = {
    tc: 0,
    mc: 0,
    ac: 0,
    trip: 0
};


Evolve.Suraksha = [];
Evolve.SurakshaToken = "";
Evolve.SurakshaCowin = [];
Evolve.Crypto = Crypto;
Evolve.Xml2JS = new xml2js.Parser();
Evolve.Xmlbuilder = xmlbuilder;
Evolve.PdfLib = pdflib;

//UUID 

var uuid = require('uuid');
Evolve.UUID = uuid;

// deviceDatils
Evolve.EvolveDeviceDatils = []
Evolve.EvolveIOTDevice = [];

// Mixing start WoDatils
Evolve.MixingStartPODatils = []

// CFD Start WoDatils 
Evolve.CFDStartPODatils = []



// Printer
Evolve.PrintJob = []; // Array For Que Print JOB
Evolve.PrinterList = []; // Array For Que Print JOB
//Evolve.Edge = edge; 
Evolve.Edge = {};
Evolve.Print = {};
Evolve.Mailer = nodemailer;
Evolve.sFtpClient = Client;

// Request Module For ZPL Label API Response
Evolve.request = request;
Evolve.PNG = PNG;
Evolve.rgbaToZ64 = rgbaToZ64;

// Generate Serial Number

var sequential = require("sequential-ids");

Evolve.Generator = new sequential.Generator({
    digits: 1,
    letters: 0,
    store: function(key, id) {},
    restore: "8"
});

/**
 * Loading Config
 */
Evolve.Config = {};
Evolve.ConfigData = new Array();
fs.readdirSync(join(__dirname, '../Config'))
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(function(file) {
        Evolve.ConfigData[file.split('.')[0]] = require(join(join(__dirname, '../Config'), file))
    });

Evolve.Log = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
        new(winston.transports.DailyRotateFile)({
            filename: path.join(Evolve.ConfigData.App.logger.logFolder, '/' + '%DATE%_' + Evolve.ConfigData.App.logger.logFilePrefix + '.log'),
            datePattern: 'DD-MM-YYYY',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

Evolve.Log.add(new winston.transports.Console({
    timestamp: true,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
            const { timestamp, level, message, ...args } = info;
            const ts = timestamp.slice(0, 19).replace('T', ' ');
            return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        })
    ),
}));



Evolve.Log.info('Loading... DB Connection');
Evolve.Log.info('Loading... SqlDB Connection');


(async function() {
    try {


        let sqlConfig = {
            server: process.env.EVOLVE_SQL_SERVER,
            database: process.env.EVOLVE_SQL_DB,
            port: parseInt(process.env.EVOLVE_SQL_PORT),
            user: process.env.EVOLVE_SQL_USER,
            password: process.env.EVOLVE_SQL_PASSWORD,
            pool: {
                max: 100,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: (process.env.EVOLVE_SQL_ENCRIPTION == '1') ? true : false, // Use this if you're on Windows Azure
                stream: true,
                packetSize: 12768,
                trustServerCertificate: true
            }
        };

        Evolve.SqlPool = await Evolve.Sql.connect(sqlConfig);

        try {

            Evolve.EvolveMainDB = await createPool(sqlConfig, process.env.EVOLVE_SQL_MAIN_DB);
            Evolve.EvolveLogDB = await createPool(sqlConfig, process.env.EVOLVE_SQL_LOG_DB);
            Evolve.EvolveAdminDB = await createPool(sqlConfig, process.env.EVOLVE_SQL_ADMIN_DB);
            Evolve.EvolveIoDB = await createPool(sqlConfig, process.env.EVOLVE_SQL_IO_DB);
            Evolve.EvolveCrmDB = await createPool(sqlConfig, process.env.EVOLVE_SQL_CRM_DB);
            Evolve.EvolveIotDB = await createPool(sqlConfig, process.env.EVOLVE_SQL_IOT_DB);
            Evolve.EvolveBrpDB = await createPool(sqlConfig, process.env.EVOLVE_SQL_BRP_DB);


        } catch (error) {
            console.log(error);
        }


        // Get Default Confuguration Data

        let EvolveConfig = await Evolve.SqlPool.request().query("SELECT * FROM EvolveConfig");
        if (EvolveConfig instanceof Error || EvolveConfig.rowsAffected < 1) {
            Evolve.Log.error('Evolve Config Not Found!');
        } else {
            Evolve.Log.info('Loading... SqlDB Connection');
            EvolveConfig = EvolveConfig.recordsets[0];
            Evolve.Config = {};
            for (let i = 0; i < EvolveConfig.length; i++) {
                Evolve.Config[EvolveConfig[i].EvolveConfig_Key] = EvolveConfig[i].EvolveConfig_Value;
            }
        }

        let EvolveIOConfig = await Evolve.SqlPool.request().query("SELECT * FROM EvolveIOConfig");
        if (EvolveIOConfig instanceof Error || EvolveIOConfig.rowsAffected < 1) {
            Evolve.Log.error('EvolveIOConfig Not Found!');
        } else {
            Evolve.Log.info('Loading... SqlDB Connection');
            EvolveIOConfig = EvolveIOConfig.recordsets[0];
            Evolve.EvolveIOConfig = {};
            for (let i = 0; i < EvolveIOConfig.length; i++) {
                Evolve.EvolveIOConfig[EvolveIOConfig[i].EvolveIOConfig_Key.trim()] = EvolveIOConfig[i].EvolveIOConfig_Value;
            }
        }

        let EvolveEinvoiceConfig = await Evolve.SqlPool.request().query("SELECT * FROM EvolveEinvoiceConfig");
        if (EvolveEinvoiceConfig instanceof Error || EvolveEinvoiceConfig.rowsAffected < 1) {
            Evolve.Log.error('EvolveEinvoiceConfig Not Found!');
        } else {
            Evolve.Log.info('Loading... SqlDB Connection');
            EvolveEinvoiceConfig = EvolveEinvoiceConfig.recordsets[0];
            Evolve.EvolveEinvoiceConfig = {};
            for (let i = 0; i < EvolveEinvoiceConfig.length; i++) {
                Evolve.EvolveEinvoiceConfig[EvolveEinvoiceConfig[i].EvolveEinvoiceConfig_Key] = EvolveEinvoiceConfig[i].EvolveEinvoiceConfig_Value;
            }
        }


        Evolve.Log.info('Loading... Aliter Server.');
        Evolve.Io = {};
        Evolve.HttpServer = {};

        /** Redis Server  */
        if (Evolve.Config.redis != undefined && Evolve.Config.redis == '1') {

            let RedisClient = redis.createClient({
                host: Evolve.Config.redisHost,
                port: Evolve.Config.redisPort,
                // password: ''
            });
            Evolve.Redis = asyncRedis.decorate(RedisClient); // for Async / Await use in Redis 

        }





        Evolve.Custom = {};
        fs.readdirSync(join(__dirname, '../Custom'))
            .filter(file => ~file.search(/^[^\.].*\.js$/))
            .forEach(function(file) {
                Evolve.Custom[file.split('.')[0]] = require(join(join(__dirname, '../Custom'), file))
            });


        Evolve.Server = {};
        let insidePath = null;
        fs.readdirSync(path.join(__dirname, '../', './Server'))
            .filter(function(file) {
                return (file.indexOf(".") !== 0) && (file.indexOf(".") === -1);
            }).forEach(function(dir) {
                Evolve.Server[dir] = {};
                //Evolve.Log.info('Loading... Evolve ' + dir);
                fs.readdirSync(path.join(__dirname, '../', './Server', dir)).filter(function(file) {
                    return (file.indexOf(".") !== 0);
                }).forEach(function(subDir) {

                    //Evolve.Log.info('Loading... Evolve Sub Directory :' + subDir);
                    insidePath = dir + '/' + subDir;
                    if (fs.existsSync(path.join(__dirname, '../', './Server', insidePath))) {
                        if (fs.lstatSync(path.join(__dirname, '../', './Server', insidePath)).isFile()) {
                            //Evolve.Log.info('Loading... File :' + subDir);
                            Evolve.Server[dir][subDir.split('.')[0]] = require(path.join(__dirname, '../', './Server', dir, subDir)); // Add File in Sub Folder Object
                        } else {
                            Evolve.Server[dir][subDir] = {};
                            //Evolve.Log.info('Loading... Evolve Sub Directory Folder:' + insidePath);

                            fs.readdirSync(path.join(__dirname, '../', './Server', insidePath)).filter(function(file) {
                                return (file.indexOf(".") !== 0);
                            }).forEach(function(subInnerDir) {
                                insidePath = dir + '/' + subDir + '/' + subInnerDir;
                                //Evolve.Log.info('Loading... Evolve Sub  Inner Directory :' + subInnerDir);
                                if (fs.lstatSync(path.join(__dirname, '../', './Server', insidePath)).isFile()) {
                                    //Evolve.Log.info('Loading... Sub  File :'+subInnerDir);
                                    Evolve.Server[dir][subDir][subInnerDir.split('.')[0]] = require(path.join(__dirname, '../', './Server', dir + '/' + subDir, subInnerDir)); // Add File in Sub Folder Object
                                } else {
                                    Evolve.Server[dir][subDir][subInnerDir] = {};
                                    //Evolve.Log.info('Loading... Evolve Sub Inner Directory Folder:'+insidePath);

                                    fs.readdirSync(path.join(__dirname, '../', './Server', insidePath)).filter(function(file) {
                                        return (file.indexOf(".") !== 0);
                                    }).forEach(function(subInnerLastDir) {
                                        insidePath = dir + '/' + subDir + '/' + subInnerDir + '/' + subInnerLastDir;
                                        //	Evolve.Log.info('Loading... Evolve Sub  Inner Directory :'+subInnerLastDir);
                                        if (fs.lstatSync(path.join(__dirname, '../', './Server', insidePath)).isFile()) {
                                            //	Evolve.Log.info('Loading... Sub Last  File :'+subInnerLastDir);
                                            Evolve.Server[dir][subDir][subInnerDir][subInnerLastDir.split('.')[0]] = require(path.join(__dirname, '../', './Server', dir + '/' + subDir + '/' + subInnerDir, subInnerLastDir)); // Add File in Sub Folder Object
                                        } else {
                                            //	Evolve.Log.info('Loading... Sub Last  Folder Plase Change Your Code:'+subInnerLastDir);
                                        }

                                    });
                                }
                            });

                        }

                    }
                });
            });

        /**
         * Set Http Server
         */
        if (Evolve.ConfigData.Database.connectionType == 'local') {
            Evolve.HttpServer = require('http').Server(Evolve.App);
        } else {
            console.log("SSH LOGIN...........")
                // let https_options = {
                // 	key 	: fs.readFileSync("public/SSL/private.pem"),
                // 	cert	: fs.readFileSync("public/SSL/gdig2.crt.pem"),
                // 	ca  	: [fs.readFileSync('public/SSL/gd_bundle-g2-g1.crt')]
                // };
                // console.log("https_options :",https_options)
                //Evolve.HttpServer = require('https').Server(https_options,Evolve.App);
            Evolve.HttpServer = require('http').Server(Evolve.App);
        }


        Evolve.Log.info('Initializing App Server...');
        fs.readdirSync(path.join(__dirname, '../', './App'))
            .filter(function(file) {
                return (file.indexOf(".") !== 0) && (file.indexOf(".") === -1);
            })
            .forEach(function(dir) {
                if (dir != 'Views' && dir != 'Routes') { // Ignore Load Views & Routes in Sys Object
                    Evolve.App[dir] = {};
                    Evolve.Log.info('Loading... App' + dir);
                    fs.readdirSync(path.join(__dirname, '../', './App', dir)).filter(function(file) {
                        return (file.indexOf(".") !== 0);
                    }).forEach(function(subDir) {

                        insidePath = dir + '/' + subDir;
                        //Evolve.Log.info('Loading... APP Sub Directory :' + subDir);
                        // Evolve.Log.info('insidePath... APP Sub Directory :'+insidePath);
                        if (fs.existsSync(path.join(__dirname, '../', './App', insidePath))) {
                            if (fs.lstatSync(path.join(__dirname, '../', './App', insidePath)).isFile()) {
                                //Evolve.Log.info('Loading... File :'+subDir);
                                Evolve.App[dir][subDir.split('.')[0]] = require(path.join(__dirname, '../', './App', dir, subDir)); // Add File in Sub Folder Object
                            } else {
                                Evolve.App[dir][subDir] = {};
                                //Evolve.Log.info('Loading... App Sub Directory Folder:'+insidePath);
                                fs.readdirSync(path.join(__dirname, '../', './App', insidePath)).filter(function(file) {
                                    return (file.indexOf(".") !== 0);
                                }).forEach(function(subInnerDir) {
                                    insidePath = dir + '/' + subDir + '/' + subInnerDir;
                                    //Evolve.Log.info('Loading... App Sub  Inner Directory :>>>'+subInnerDir);
                                    if (fs.lstatSync(path.join(__dirname, '../', './App', insidePath)).isFile()) {
                                        //Evolve.Log.info('Loading... App Sub  File :'+subInnerDir);
                                        Evolve.App[dir][subDir][subInnerDir.split('.')[0]] = require(path.join(__dirname, '../', './App', dir + '/' + subDir, subInnerDir)); // Add File in Sub Folder Object
                                    } else {
                                        Evolve.App[dir][subDir][subInnerDir] = {};
                                        //	Evolve.Log.info('Loading... App Sub Inner Directory Folder:'+insidePath);

                                        fs.readdirSync(path.join(__dirname, '../', './App', insidePath)).filter(function(file) {
                                            return (file.indexOf(".") !== 0);
                                        }).forEach(function(subInnerLastDir) {
                                            insidePath = dir + '/' + subDir + '/' + subInnerDir + '/' + subInnerLastDir;
                                            //Evolve.Log.info('Loading... App Sub  Inner Directory :'+subInnerLastDir);
                                            if (fs.lstatSync(path.join(__dirname, '../', './App', insidePath)).isFile()) {
                                                //Evolve.Log.info('Loading... Sub Last  File :'+subInnerLastDir);
                                                Evolve.App[dir][subDir][subInnerDir][subInnerLastDir.split('.')[0]] = require(path.join(__dirname, '../', './App', dir + '/' + subDir + '/' + subInnerDir, subInnerLastDir)); // Add File in Sub Folder Object
                                            } else {
                                                //	Evolve.Log.info('Loading... Sub Last  Folder Plase Change Your Code:'+subInnerLastDir);
                                            }

                                        });
                                    }
                                });

                            }

                        }
                    });
                }

            });

        Evolve.Log.info('Loading... Router');
        insidePath = null;
        fs.readdirSync(join(__dirname, '../App/Routes'))
            .filter(function(file) {
                return (file.indexOf(".") !== 0);
            })
            .forEach(function(dir) {
                // Evolve.App[dir] = {};
                if (fs.lstatSync(path.join(__dirname, '../', './App/Routes', dir)).isFile()) {
                    Evolve.App.use('/', require(join(join(__dirname, '../App/Routes'), dir))) // Dir As file Name
                } else {
                    fs.readdirSync(path.join(__dirname, '../', './App/Routes', dir)).filter(function(file) {
                        return (file.indexOf(".") !== 0);
                    }).forEach(function(subDir) {
                        insidePath = dir + '/' + subDir;
                        if (fs.lstatSync(path.join(__dirname, '../', './App/Routes', insidePath)).isFile()) {
                            Evolve.App.use('/', require(join(join(__dirname, '../App/Routes'), insidePath))) // Dir As file Name
                        } else {
                            insidePath = dir + '/' + subDir;
                            fs.readdirSync(join(__dirname, '../App/Routes', insidePath))
                                .filter(file => ~file.search(/^[^\.].*\.js$/))
                                .forEach(function(file) {
                                    Evolve.App.use('/', require(join(join(__dirname, '../App/Routes', insidePath), file))); // Register Router to app.use
                                });
                        }
                    });
                }
            });


        /**       
         *  Mqtt Connection
         */

        if (Evolve.Config.mqtt != undefined && Evolve.Config.mqtt == '1') {

            Evolve.Log.info('Loading... Mqtt Connection');

            let topicSubscribed = false;


            let options = {
                clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
                username: Evolve.Config.mqttUsername,
                password: Evolve.Config.mqttPassword,
                clean: true
            };


            Evolve.MqttClient = mqtt.connect(Evolve.Config.mqttPrefix + "://" + Evolve.Config.mqttIp + ":" + Evolve.Config.mqttPort, options);
            Evolve.MqttClient.on('connect', async function() {
                if (topicSubscribed == false) {
                    // let Subscribe = Evolve.Config.mqttSubscribe.split(",");

                    Evolve.Log.info('Mqtt Subscriber Ready....');
                    // Subscribe.forEach(function (sub) {
                    //     console.log("sub :", sub)
                    //     Evolve.MqttClient.subscribe(sub);
                    // })

                    let deviceList = await Evolve.SqlPool.request().query(" SELECT EvolveDevice_Subscriber FROM EvolveDevice");
                    if (deviceList instanceof Error || deviceList.rowsAffected < 1) {
                        Evolve.Log.error("Error while getting Device List IOT Memory");
                    } else {
                        for (let i = 0; i < deviceList.recordset.length; i++) {
                            let data = deviceList.recordset[i];
                            if (data.EvolveDevice_Subscriber != null) {
                                Evolve.Log.info("Subscriber is Ready :" + data.EvolveDevice_Subscriber);
                                Evolve.MqttClient.subscribe(deviceList.recordset[i].EvolveDevice_Subscriber);
                            }

                        }
                    }


                    topicSubscribed = true;
                    Evolve.MqttClient.on('message', function(topic, reqData) {
                        // Redirect.... Data flow
                        Evolve.App.Controllers.Iot.iotControllers.filterRequestData(topic, reqData);
                    })
                } else {
                    Evolve.Log.info('Mqtt Subscriber Ready....');
                }

            });
            Evolve.MqttClient.on('reconnect', function() {
                Evolve.Log.error('Evolve Mqtt reconnecting...');
            })
            Evolve.MqttClient.on('error', function() {
                Evolve.Log.error('Evolve Mqtt error');
            })
        }

        /**       
         *  Socket IO Connection
         */

        if (Evolve.Config.socket != undefined && Evolve.Config.socket == '1') {
            // Socket IO
            Evolve.Log.info('Loading... Socket Connection');
            Evolve.Io = require('socket.io')(Evolve.HttpServer, { 'pingTimeout': Evolve.Config.socketPingTimeout, 'pingInterval': Evolve.Config.socketPingInterval });
            Evolve.Io.on('connection', async function(socket) {
                //Evolve.Log.info('Some One Connected :' + socket.id);
                Object.keys(Evolve.Server.Sockets).forEach(function(key) { // Register Socket File in Socket Variable
                    Evolve.Server.Sockets[key](socket)
                })
            });

            // for Send Brodacast 
            /**   
            await Evolve.Io.emit('DataChange', {
                message: "Barcode Scanned successfully"
            }); */


            // socket Client Connected 
            if (Evolve.Config.socketClient != undefined && Evolve.Config.socketClient == '1') {
                Evolve.socketClient = socketIOClient('http://' + Evolve.Config.socketClientHost + ':' + Evolve.Config.socketClientPort);
                Evolve.Log.info('Evolve Socket Client Connecting...');
                Evolve.socketClient.on('connect', function() {
                    Evolve.Log.info('Evolve Milling Scoket Connected.');
                });
            }
        }

        /**       
         *  Redis Connection
         */

        if (Evolve.Config.redis != undefined && Evolve.Config.redis == '1') {


            Evolve.Redis.on("error", function(error) {
                console.error(error);
            });

        }

        /**
         *  MogoDB Connection
         */


        if (Evolve.Config.mongodb != undefined && Evolve.Config.mongodb == '1') {
            console.log("Loading Mongo DB Connection.........!!");
            let dbURI = '';
            if (process.env.EVOLVE_MONGODB_TYPE == 'LOCAL') {
                dbURI = 'mongodb://' + process.env.EVOLVE_MONGODB_HOST + ':' + process.env.EVOLVE_MONGODB_PORT;

            } else {
                dbURI = 'mongodb://' + process.env.EVOLVE_MONGODB_USER + ':' + process.env.EVOLVE_MONGODB_PASSWORD + '@' + process.env.EVOLVE_MONGODB_HOST + ':' + process.env.EVOLVE_MONGODB_PORT;

            }


            console.log("dbURI>>>>", dbURI);
            let client = new MongoClient(dbURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            await client.connect();
            Evolve.Mongo = await client.db(process.env.EVOLVE_MONGODB_DATABASE);
            console.log("Mongo DB Connection Successfully Established..........!!");

            // Evolve.Mongo = await client.connect();
            // console.log('Connected successfully to server');
            // const db = client.db(dbName);
            // const collection = db.collection('documents');

            /*
            Evolve.Mongoose.connect(dbURI);
            Evolve.Mongoose.connection.on('connected', async function () {
                Evolve.Log.info('Mongoose default connection connected');
                console.log("mongoose", Evolve.Mongoose.model('IOT'));
                // await Evolve.Mongoose.model('IOT').create({
                //     name: "PICK to Lisght",
                //     code: "PTL003",
                // });


            console.log("dbURI>>>>", dbURI);
            let client = new MongoClient(dbURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
*/
        }


        let date = new Date();
        let dateTime = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' Time ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        Evolve.HttpServer.listen(process.env.EVOLVE_PORT); //Evolve.Config.port
        console.log("(---------------------------------------------------------------)");
        console.log(" |                    Evolve Server Started...                  |");
        console.log(" |                 Date :" + dateTime + "                |");
        console.log(" |                  http://" + ip.address() + ":" + process.env.EVOLVE_PORT + "                    |");
        console.log("(---------------------------------------------------------------)");


        // Called Auto Load Files
        Evolve.Custom.load.constructor();
        //Evolve.Custom.test.constructor();


        let dt = await Evolve.Custom.load.getDT();

        module.exports = {
            app: Evolve.App,
            server: Evolve.Server
        };

    } catch (err) {
        Evolve.Log.error("Evolve Error When Start Sql Server : " + err.message)
    }
})()

sql.on('error', err => {
    // ... error handler
    Evolve.Log.error("Error in Sql Server", err)
})

/** Pool for Muliple Connection */
async function createPool(config, database) {
    // config.database = database;
    // console.log('database>>>',database);
    //  return (new sql.ConnectionPool(config)).connect().then((pool) => {
    //   return pool;
    // })
}
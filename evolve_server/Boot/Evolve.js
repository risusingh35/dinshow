/**
 * Title : Evolve Boot
 * Desc :  Boot Variable for Memory 
 */

 module.exports = Evolve = Evolve;

 function Evolve() {
	 this.EvolveUsersAuth = [];
	 this.UUID = {};
	 this.Util = {};
	 this.ConfigData = {};
	 this.Config = {};
	 this.App = {};
	 this.Io = {};
	 this.HttServer = {};
	 this.MqttClient = {};
	 this.RedisClient = {};
	 this.SqlPool = {};
	 this.SqlPools = []; 
 
	 this.EvolveLogDB = {};
	 this.EvolveAdminDB = {};
	 this.EvolveMainDB = {};
	 this.EvolveIoDB = {};
	 this.EvolveCrmDB = {};
	 this.EvolveIotDB = {};
	 this.EvolveBrpDB = {};
	 this.Xml2JS = {};
	 this.Xmlbuilder = {};
 
 
	 this.Redis = {};
	 this.Sql = {};
	 this.Mongoose = {};
	 this.Mongo = {};
 
	 this.Jwt = {};
	 this.JwtSecret = '';
	 this.Bcrypt = {};
	 this.Md5Enc = {};
	 this.Csv = {};
	 this.CsvExport = {};
	 this.Axios = {};
	 this.ChildProcess = {};
	 this.Fs = {};
	 this.Weight = 0;
	 this.Xml = {};
	 this.pdfExtract = {};
	 this.Xlsx = {};
	 this.Json2CSV = {};
	 this.AD = {};
	 this.ADQueue = [];
	 this.Mailer = {};
	 this.sFtpClient = {};
	 this.AuthToken = [];
	 this.PdfLib = {};
 
 
 
	 // Socket Server
	 this.HttpServer = {};
	 this.socketClient = {};
 
 
	 // MAchine Array
	 this.Milling = {};
	 this.Vibration = {};
	 this.vibrationBarcode = '';
	 this.vibrationMessageStatus = {
		 partOk: '-',
		 pnok: '-',
		 step: 7
	 };
 
 
	 // IOT
	 this.WcmTask = []; // Weight Capture Machine
	 this.MqttClient = {};
	 this.EvolveWsM = []; // Evolve Weight Scale Machine Current Weight Store into Array
	 this.EvolveIOTDevice = [];
 
 
	 // Printer Object Array
	 this.PrintJob = [];
	 this.Print = {};
	 this.Edge = {};
 
 
	 // For Setting
	 this.CMD = {};
 
	 // Suraksha
	 this.Suraksha = [];
	 this.SurakshaToken = "";
	 this.SurakshaCowin = [];
	 this.Crypto = {};
 
	 //uuid
 
	 this.UUID = {};
 
	 //Serial Number Generator
 
	 this.Generator = {};
 
 };
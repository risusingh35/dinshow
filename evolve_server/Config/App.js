module.exports = {

	// port: 5156, // Server Port

	logger: {
		logFolder: 'Log', // Change Your Name With Your Custom Folder
		logFilePrefix: 'evolve_server',
	},
	// mobile: 9998000756,
	// email: 'chauhanravatraj@gmail.com',
	// pass: 'ravatraj999',
	// toemail: 'darshan@alitersolutions.com',
	// mqtt: {
	// 	prefix: 'mqtt',
	// 	ip: 'localhost', // Dev Server : 110.227.250.194 // Local : 192.168.137.149 // Evolve Server : 110.227.250.194  // 
	// 	port: 5143,
	// 	username: 'evolve@mqtt',
	// 	password: 'evolve@123'
	// },
	// printer: { // Printer Setting
	// 	ipaddress: '192.168.1.5', // 192.168.1.60 
	// 	port: '3002',
	// 	delay: '500',
	// 	printJobInterval: 2000
	// },

	// // XML

	// dirPath: './xml',

	// //Print Sambha Folder Path
	// dirWorkOrderPrint: './barcode',
	// dirAssemblyPrint: './barcode',
	// dirDoorAssemblyPrint: './barcode',
	// dirConsoleAssemblyPrint: './barcode',
	// qad: {
	// 	sambaFolderReadInterval: 10000,
	// 	sambaInFolderPath: './Qad/sambaIn/',
	// 	sambaOutFolderPath: './Qad/sambaOut/',
	// 	sambaOutDownTimeFolderPath: './Qad/sambaOut/',
	// 	archiveFileLocation: './Qad/archive/in/'
	// },
	// imageUploadPath: './upload/img/',
	// pdfUploadPath: './upload/pdf/',

	// printer: { url: 'http://192.168.0.108/print', KonnectID: '6881ffbf713c' },
	// csvReportPath: './csv',


	// byke: {
	// 	INiKonnectId: '3c88ffbf713c',
	// 	OUTiKonnectId: '20a89e286f24',
	// },

	
	// YFAI PRINTER

	printer : { // Printer Setting
		ipaddress: '192.168.1.5', // 192.168.1.60 
		port: '3002',
		delay:'500',
		printJobInterval : 2000
	},
	dirPath : 'E:/NODE_APP/YFAI/xml',
	// dirPath_mounted : '../../../../../../mnt/MES/yfvs', // QAD Mounted Folder on centos 

	dirPath_mounted : 'E:/NODE_APP/YFAI/mounted',

	//Print Sambha Folder Path
	// dirWorkOrderPrint : '/Evolve/Work_Order/input',
	 dirWorkOrderPrint : 'D:/NODE-APP/BARCODE/wo',

	dirAssemblyPrint : '/Evolve/FG_Parts/input',
	dirDoorAssemblyPrint : '/Evolve/Door_Assembly/input',
	dirConsoleAssemblyPrint : '/Evolve/Console_Assembly/input',

	dirIpFlamingPrint : 'D:/NODE-APP/BARCODE/flaming',
	dirIpFoamingPrint : 'D:/NODE-APP/BARCODE/foaming',
	dirHPLaminationPrint : 'D:/NODE-APP/BARCODE/hplamination',
	dirIPAssemblyPrint : 'D:/NODE-APP/BARCODE/ipAssembly',
	dirPoRecievePrint :  'D:/NODE-APP/BARCODE/poRecieve',
	


}

// nodemon --ignore sessions/ index.js

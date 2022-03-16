<template>
	<div>
	</div>
</template>
<script>

import jspdf from 'jspdf'
import 'jspdf-autotable';

 
export default {
	name: 'JsPdf',
	props: {
		reqdata: {
			type: Object,
			default: () => {}
		}	
	},
	watch: {
		reqdata (data){
			console.log('data::', data) 
			if(data.type=='PDI') {
				this.printPDI(data);
			}
		},
	},
	mounted () {

	},
	created: async function () {
		console.log("PDF Called......");
		
		
	},
	methods : {
		async printPDI (data){
			console.log("data.printData", data)

			//doc.addImage(logo, 'PNG', 10, 5, 50, 10);         
			
			let pdfName = new Date();
			let logo = "";
			let manufacturerObj = {
				name  : 'York IND PVT LTD',
				address : 'Mumbai',
				city : 'Mumbai'
			}


			let doc = new jspdf({format: 'a4'});
			doc.setFontSize(10);
			doc.setFontType('bold');
			doc.text("PDI", 98, 18);

			// Box 1-1 PDI Record From
            
			doc.line(10, 20, 10, 25); // vertical line |
			doc.line(10, 20, 200, 20); // horizontal line  ---   start point - end point
			doc.line(10, 25, 200, 25); // horizontal line  ---   start point - end point
			doc.line(200, 20, 200, 25); // vertical line |	

			//  PDI Record From
			doc.setFontSize(8);
			doc.setFontType('bold');
			doc.text("PDI RECORD FORM", 90, 23);


			// box 2-1 

			doc.line(10, 25, 10, 30); // vertical line |
			doc.line(10, 30, 60, 30); // horizontal line  ---   start point - end point
			doc.line(60, 25, 60, 30); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("abc ", 13, 28);

			// box 2-2 
			doc.line(60, 30, 105, 30); // horizontal line  ---   start point - end point
			doc.line(105, 25, 105, 30); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Do Date : ", 63, 28);

			// box 2-3 
			doc.line(105, 30, 155, 30); // horizontal line  ---   start point - end point
			doc.line(155, 25, 155, 30); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("So No : ", 108, 28);

			// box 2-4 
			doc.line(155, 30, 200, 30); // horizontal line  ---   start point - end point
			doc.line(200, 25, 200, 30); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Ship Date : ", 158, 28);


			// box 3-1 
			doc.line(10, 30, 10, 35); // vertical line |
			doc.line(10, 35, 60, 35); // horizontal line  ---   start point - end point
			doc.line(60, 30, 60, 35); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Customer Name : ", 13, 33);

			// box 3-2 
			doc.line(60, 35, 105, 35); // horizontal line  ---   start point - end point
			doc.line(105, 30, 105, 35); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Ship To : ", 63, 33);

			// box 3-3 
			doc.line(105, 35, 155, 35); // horizontal line  ---   start point - end point
			doc.line(155, 30, 155, 35); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Bill To : ", 108, 33);

			// box 3-4 
			doc.line(155, 35, 200, 35); // horizontal line  ---   start point - end point
			doc.line(200, 30, 200, 35); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Item : ", 158, 33);


			// box 4-1 
			doc.line(10, 35, 10, 40); // vertical line |
			doc.line(10, 40, 60, 40); // horizontal line  ---   start point - end point
			doc.line(60, 35, 60, 40); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("LR No. : ", 13, 38);

			// box 4-2 
			doc.line(60, 40, 105, 40); // horizontal line  ---   start point - end point
			doc.line(105, 35, 105, 40); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("LR Date : ", 63, 38);

			// box 4-3 
			doc.line(105, 40, 155, 40); // horizontal line  ---   start point - end point
			doc.line(155, 35, 155, 40); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Vehical No : ", 108, 38);

			// box 4-4 
			doc.line(155, 40, 200, 40); // horizontal line  ---   start point - end point
			doc.line(200, 35, 200, 40); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Transporter : ", 158, 38);


			// box 5-1 
			doc.line(10, 40, 10, 45); // vertical line |
			doc.line(10, 45, 35, 45); // horizontal line  ---   start point - end point
			doc.line(35, 40, 35, 45); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Invoice No. - ", 13, 43);

			// box 5-2
			doc.line(35, 45, 60, 45); // horizontal line  ---   start point - end point
			doc.line(60, 40, 60, 45); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Axle Type - ", 48, 43);

			// box 5-3
			doc.line(60, 45, 105, 45); // horizontal line  ---   start point - end point
			doc.line(105, 40, 105, 45); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("PDI Date - ", 63, 43);

			// box 5-4
			doc.line(105, 45, 130, 45); // horizontal line  ---   start point - end point
			doc.line(130, 40, 130, 45); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("QTY - ", 108, 43);

			// box 5-5
			doc.line(130, 45, 155, 45); // horizontal line  ---   start point - end point
			doc.line(155, 40, 155, 45); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Tonnes - ", 133, 43);
		

			// box 5-6
			doc.line(155, 45, 200, 45); // horizontal line  ---   start point - end point
			doc.line(200, 40, 200, 45); // vertical line |	

			doc.setFontSize(6);
			doc.setFontStyle('normal');
			doc.text("Customer - ", 158, 43);
			
			


			doc.setDrawColor(0, 0, 0); // black colour
			doc.setLineWidth(0.2);
        

			// Footer Box

			doc.setDrawColor(0, 0, 0); // black colour
			doc.setLineWidth(0.2);
            


			// doc.autoPrint({variant: 'non-conform'}); // Auto Print Page

			var header = function (data) {
				doc.setFontSize(6);
				doc.setTextColor(255, 0, 0);
				doc.setFontStyle('normal');
			};
           
			doc.setFontSize(6);
			doc.setFontStyle('normal');
   
			var options = {
				didDrawPage: header,
				margin: {
					top: 70, 
					left:10
				},
				styles: {
					overflow: 'linebreak',
					fontSize: 6,
					minCellHeight: 10,
					cellWidth: 'wrap',
					//fillColor: [128, 128, 128]
				},
				columnStyles: {
					1: {cellWidth: 10},
					2: {cellWidth: 10},
					3: {cellWidth: 10},
					4: {cellWidth: 10},
					5: {cellWidth: 10},
					// 6: {cellWidth: 10},
					//7: {cellWidth: 10},
					//8: {cellWidth: 10},
					//9: {cellWidth: 10},
					//10: {cellWidth: 10},
				},
				startY: 60,
				startX: 9,
				theme: 'striped'
			};
  
			var columns = [
				{title: "Sr No", dataKey: "srno", width: 10},
				{title: "Item Code", dataKey: "itemCode", width: 10}, 
				{title: "Description", dataKey: "desc", width: 10}, 
				{title: "Qty", dataKey: "qty", width: 10}, 
				{title: "UOM", dataKey: "uom", width: 10}, 
			];
            
			let rows = [];
			// let columns = [];

	 		for(let i=0; i<data.printData.tableData.length; i++){
			//	console.log("data.printData.tableData[i].EvolveItem_CODE", data.printData.tableData[i].EvolveItem_CODE)

				rows.push({"srno": i+1, 
					"itemCode": data.printData.tableData[i].EvolveItem_CODE, 
					"desc" : data.printData.tableData[i].EvolveItem_Desc, 
					"qty" : data.printData.tableData[i].Qty, 
					"uom":data.printData.tableData[i].UOM
				});
			}

			// for(let i=0; i < data.printData.tableData.length; i++){
			// 	rows.push({
			// 		"ParaValue": data.printData.tableData[i].ParaValue
			// 	});
			// }
			// console.log("table_value", rows);
			// for(let p=0; p < data.printData.tableHeadData.length; p++){
			// 	columns.push({
			// 		"title": data.printData.tableHeadData[p].headers,
			// 		"dataKey" : data.printData.tableHeadData[p].headers,
			// 		width : 10
			// 	});
			// }

			//console.log("rows>>>", rows)

			doc.autoTable(columns, rows, options);   //From dynamic data.
			doc.save('DeliveryChallan.pdf');
			
		},
	}
}
</script>

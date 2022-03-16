<template>
	<div>
		<img id="itf">
		<span id="myCanvas"></span>
	</div>
</template>
<script>
import jspdf from "jspdf";
import "jspdf-autotable";
import jsbarcode from "jsbarcode";

export default {
	name: "JsPdf",
	props: {
		reqdata: {
			type: Object,
			default: () => {}
		}
	},
	watch: {
		reqdata (data) {
			console.log("data::", data);
			this.printPDI(data);
		}
	},
	mounted () {},
	created: async function () {
		console.log("PDF Called......");
	},
	methods: {
		async printPDI (data) {
			console.log("data.printData", data);
			//doc.addImage(logo, 'PNG', 10, 5, 50, 10);

			let pdfName = new Date();
			// let logo = "";
 
			// Store Image Base64 in Array
			let base64Array = [];

			let doc = new jspdf({ format: "a4", orientation: "landscape" });
			doc.setFontSize(15);
			doc.setFontType("bold");
			doc.text(data.printData.title, 125, 18);
			 
			 
			let logo = await this.getBase64Image(data.logo);
			console.log("logo", logo)
			doc.addImage(logo, 'PNG', 240, 7, 50, 10);
			 doc.setFontSize(9);

			// doc.text("Document Type ", 25, 40);
			// doc.text(":", 63, 40);
			// doc.text(data.printData.title, 65, 40);

			var header = function (data) {
				doc.setFontSize(5);
				doc.setFontStyle("normal");
				doc.setLineWidth(1);
				// doc.setTextColor(255, 0, 0);
			};

			doc.setFontSize(5);
			doc.setFontStyle("normal");
			doc.setLineWidth(1);

			var options = {
				didDrawPage: header,
				startY: 30, // Margin From Top
				startX: 9,
				theme: "striped"
			};
			var headerData = [];
			for (let i = 0; i < data.printData.tableData.header.length; i++) {
				headerData.push({
					title: data.printData.tableData.header[i],
					dataKey: i,
					width: 10
				});
			}
			console.log("headerCol>>>>", headerData);
			let rowData = []
			for (let i = 0; i < data.printData.tableData.data.length; i++) {
				rowData.push(Object.assign({}, data.printData.tableData.data[i]));
			}
			console.log("rowData>>", rowData)
			// doc.autoTable({ html: '#evolveDT' }) // Direct Ptint Table
 			doc.autoTable(headerData, rowData, options); //From dynamic data.
			doc.save(data.printData.fileName+'.pdf');
		},
	 
		async getBase64Image (url) {
			return new Promise((resolve, reject) => {
				var xhr = new XMLHttpRequest();
				xhr.onload = function () {
					var reader = new FileReader();
					reader.onloadend = function () {
						resolve(reader.result);
					};
					reader.readAsDataURL(xhr.response);
				};
				xhr.onerror = reject;
				xhr.open('GET', url);
				xhr.responseType = 'blob';
				xhr.send();
			});
		}
	}
};
</script>

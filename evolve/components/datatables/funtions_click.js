$(function () {

	let baseURL = document.getElementById("baseURL").value;
	let token = document.getElementById("token").value;
	let deleteApi = document.getElementById("deleteApi").value;
	let closeApi = document.getElementById("closeApi").value;
	$(document).on('click', '.edit', function () {
		let id = $(this).attr('data-id');
		localStorage.setItem("edit_id", id);
		// document.getElementById('edit_url').click();
		// document.getElementById("edit_url_Shiv").href = "/shiv/";
		document.getElementById('edit_url').click();
	});

	// $(document).on('click', '.active', function () {
	// 	let id = $(this).attr('data-id');
	// 	let active_status = $(this).attr('data-active');
	// 	localStorage.setItem("active_id", id);
	// 	localStorage.setItem("active_status", active_status);
	// 	document.getElementById('active_url').click();
	// });

	// $(document).on('click', '.start_wo', function () {
	// 	let id = $(this).attr('data-id');
	// 	$(this).prop('disabled', true);
	// 	$(this).attr('disabled', true);
	// 	localStorage.setItem("wo_id", id);
	// 	document.getElementById('start_wo').click();
	// });

	// $(document).on('click', '.downloadPO_xls', function () {
	// 	let id = $(this).attr('data-id');
	// 	// $(this).prop('disabled', true);
	// 	// $(this).attr('disabled', true);
	// 	localStorage.setItem("wo_id", id);
	// 	document.getElementById('downloadPO_xls').click();
	// });

	// $(document).on('click', '.wo_planning', function () {
	// 	let id = $(this).attr('data-id');
	// 	// $(this).prop('disabled', true);
	// 	// $(this).attr('disabled', true);
	// 	localStorage.setItem("wo_id", id);
	// 	document.getElementById('wo_planning').click();
	// });


	// $(document).on('click', '.close_wo', function () {
	// 	let id = $(this).attr('data-id');
	// 	$(this).prop('disabled', true);
	// 	localStorage.setItem("wo_id", id);
	// 	document.getElementById('close_wo').click();
	// });

	// $(document).on('click', '.detail_wo', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("wo_id", id);
	// 	document.getElementById('detail_wo').click();
	// });

	//section
	// $(document).on('click', '.edit_section', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("edit_section_id", id);
	// 	document.getElementById('edit_section').click();
	// });

	// Shift Master Edit
	// $(document).on('click', '.edit_shift', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("edit_shift_id", id);
	// 	document.getElementById('edit_shift').click();
	// });
	// Process Template Edit
	// $(document).on('click', '.edit_processtemplate', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("edit_processtemplate_id", id);
	// 	document.getElementById('edit_processtemplate').click();
	// });

	// edit_serialnumber

	// edit_serialnumber
	// $(document).on('click', '.edit_serialnumber', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("edit_serialnumber_id", id);
	// 	document.getElementById('edit_serialnumber').click();
	// });
	// show teplate process sequence

	// $(document).on('click', '.showteplateprocess', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("showteplateprocess_id", id);
	// 	document.getElementById('showteplateprocess').click();
	// });

	// show edit PArt bom Master

	// $(document).on('click', '.edit_partbommaster', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("edit_partbommaster_id", id);
	// 	document.getElementById('edit_partbommaster').click();
	// });

	$(document).on('click', '.delete', function () {
		console.log("delete fired>>>> ")
		let thisRef = this;
		let id = $(this).attr('data-id');
		$(this).prop('disabled', true);
		UIkit.modal.confirm('Are You Sure..!').then(function () {
			$.ajax({
				type: 'POST',
				headers: {
					'Authorization': token
				},
				url: deleteApi,
				data: { id: id },
				success: function (resultData) {
					if (resultData.status == 'success') {
						let config = {};
						config.timeout = 3000;
						config.status = 'success';
						let text = "Data delete successfully";
						UIkit.notification(text, config);
						$(thisRef).parent().parent().hide(700);
					} else {
						let config = {};
						config.timeout = 3000;
						config.status = 'danger';
						let text = "Unable to delete data!";
						UIkit.notification(text, config);
					}
				}
			});
		}, function () {
			console.log('Rejected.')
		})
	});
	// $(document).on('click', '.close', function () {
	// 	let thisRef = this;
	// 	let id = $(this).attr('data-id');
	// 	$(this).prop('disabled', true);
	// 	UIkit.modal.confirm('Are You Sure..!').then(function () {
	// 		$.ajax({
	// 			type: 'POST',
	// 			headers: {
	// 				'Authorization': token
	// 			},
	// 			url: closeApi,
	// 			data: { id: id },
	// 			success: function (resultData) {
	// 				if (resultData.status == 'success') {
	// 					let config = {};
	// 					config.timeout = 3000;
	// 					config.status = 'success';
	// 					let text = "Work order close successfully";
	// 					UIkit.notification(text, config);
	// 					$(thisRef).parent().parent().hide(700);
	// 				} else {
	// 					let config = {};
	// 					config.timeout = 3000;
	// 					config.status = 'danger';
	// 					let text = "Unable to close work order!";
	// 					$(thisRef).prop('disabled', false);
	// 					UIkit.notification(text, config);
	// 				}
	// 			}
	// 		});
	// 	}, function () {
	// 		$(this).prop('disabled', false);
	// 		console.log('Rejected.')
	// 	})
	// });

	// $(document).on('click', '.prodDetails', function () {
	// 	let id = $(this).attr('data-id');
	// 	console.log("plan_id : ", id)
	// 	localStorage.setItem("planid", id);
	// 	document.getElementById('showPlanDetails').click();
	// });
	// $(document).on('click', '.edit_prodDetails', function () {
	// 	let id = $(this).attr('data-id');
	// 	console.log("plan_id : ", id)
	// 	localStorage.setItem("planid", id);
	// 	document.getElementById('edit_showPlanDetails').click();
	// });
	// $(document).on('click', '.publish_plan', function () {
	// 	let id = $(this).attr('data-id');
	// 	console.log("plan_id : ", id)
	// 	localStorage.setItem("planid", id);
	// 	document.getElementById('publish_plan').click();
	// });
	// $(document).on('click', '.printProdOrders', function () {
	// 	let id = $(this).attr('data-id');
	// 	console.log("printProdOrdersId : ", id)
	// 	localStorage.setItem("printProdOrdersId", id);
	// 	document.getElementById('printProdOrderButton').click();
	// });

	/** Start : Evolve Role List */
	// $(document).on('click', '.show_menu', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("roleId", id);
	// });

	// $(document).on('click', '.show_buisness_line', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("branchId", id);
	// 	document.getElementById('show_buisness_line_url').click();
	// });
	/** End : Evolve Role List */

	// do list
	// $(document).on('click', '.do_print', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("do_id", id);
	// 	document.getElementById('print_do').click();
	// });

	// $(document).on('click', '.showprocvalidtaion', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("showprocvalidation_id", id);
	// 	document.getElementById('showprocvalidation').click();
	// });

	// $(document).on('click', '.edit_rework', function () {
	// 	let epod_id = $(this).attr('data-id');
	// 	localStorage.setItem("edit_epod_Id", epod_id);
	// 	let rework_id = $(this).attr('data-rid');
	// 	localStorage.setItem("edit_rework_Id", rework_id);
	// 	document.getElementById('edit_rework').click();
	// });

	// $(document).on('click', '.edit_scrap', function () {
	// 	let epod_id = $(this).attr('data-id');
	// 	localStorage.setItem("edit_epod_Id", epod_id);
	// 	let rework_id = $(this).attr('data-rid');
	// 	localStorage.setItem("edit_rework_Id", rework_id);
	// 	document.getElementById('edit_scrap').click();
	// });

	// $(document).on('click', '.delete_device', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("delete_Id", id);
	// 	document.getElementById('delete_device_url').click();
	// });

	// $(document).on('click', '.code_data', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("io_data_id", id);
	// 	document.getElementById('code_data_url').click();
	// });
	// $(document).on('click', '.io_file_data', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("io_data_id", id);
	// 	document.getElementById('io_file_data_url').click();
	// });

	// $(document).on('click', '.deleteDo', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("doId", id);
	// 	document.getElementById('delete_do').click();
	// });
	// $(document).on('click', '.deletebyFunction', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("deleteId", id);
	// 	document.getElementById('deletebyFunction_url').click();
	// });

	$(document).on('click', '.showGstPDF', function () {
		let id = $(this).attr('data-id');
		localStorage.setItem("showGstId", id);
		document.getElementById('gstShow_url').click();
	});

	$(document).on('click', '.gstpdfdownload', function () {
		let id = $(this).attr('data-id');
		localStorage.setItem("downloadGstId", id);
		document.getElementById('gstDownload_url').click();
	});

	// Assets Bed History start

	// $(document).on("click", ".bedhistory", function () {
	// 	let id = $(this).attr("data-id");
	// 	localStorage.setItem("bed_id", id);
	// 	document.getElementById("bedhistory_url").click();
	// });

	// Assets Bed History End

	// Quality Check Show Process start

	// $(document).on("click", ".showQCProcess", function () {
	// 	let id = $(this).attr("data-id");
	// 	localStorage.setItem("qcTempID", id);
	// 	document.getElementById("showQCProcess").click();

	// });
	// $(document).on("click", ".qc_edit_rework", function () {
	// 	let id = $(this).attr("data-id");
	// 	localStorage.setItem("qc_rework_ID", id);
	// 	document.getElementById("qcReork").click();

	// });
	// $(document).on("click", ".qc_edit_scrap", function () {
	// 	let id = $(this).attr("data-id");
	// 	localStorage.setItem("qc_scrap_ID", id);
	// 	document.getElementById("qcScrap").click();

	// });

	// Quality Check Show Process End

	// Gate module

	// $(document).on("click", ".outVisitor", function () {
	// 	let id = $(this).attr("data-id");
	// 	let name = $(this).attr("data-visitorName");
	// 	localStorage.setItem("get_id", id);
	// 	localStorage.setItem("get_name", name);
	// 	document.getElementById("outVisitor").click();
	// });
	// $(document).on("click", ".visitorPrint", function () {
	// 	let id = $(this).attr("data-id");
	// 	localStorage.setItem("gate_id", id);
	// 	document.getElementById("visitorPrint").click();
	// });

	// $(document).on("click", ".visitorTrack", function () {
	// 	let id = $(this).attr("data-id");
	// 	localStorage.setItem("gate_id", id);
	// 	document.getElementById("visitorTrack").click();
	// });

	// $(document).on("click", ".visitorSms", function () {
	// 	let id = $(this).attr("data-id");
	// 	localStorage.setItem("gate_id", id);
	// 	document.getElementById("visitorSms").click();
	// });
	// $(document).on("click", ".visitorEmail", function () {
	// 	let id = $(this).attr("data-id");
	// 	localStorage.setItem("gate_id", id);
	// 	document.getElementById("visitorEmail").click();
	// });

	// Label Language
	$(document).on("click", ".l_Keyword", function () {
		let keyword = $(this).attr("data-keyword");
		localStorage.setItem("edit_keyword", keyword);
		document.getElementById("edit_url").click();
	});

	// $(document).on('click', '.visitoImage', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("edit_id", id);
	// 	document.getElementById('visitor_image').click();
	// });
	// $(document).on('click', '.show_business_line', function () {
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("branchId", id);
	// 	document.getElementById('show_business_line_url').click();
	// });
	// $(document).on('click', '.edit_unit', function () {
	// 	console.log("Edit called >> ")
	// 	let id = $(this).attr('data-id');
	// 	localStorage.setItem("unitId", id);
	// 	document.getElementById('edit_unit').click();
	// });


});
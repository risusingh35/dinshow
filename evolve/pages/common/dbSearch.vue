<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<div class="evolve-page">
			<div class="evolve-page-header">
				<div class="evolve-page-header-icons">
					<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getAllMenuList()"></a>
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
					<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
				</div>
			 
				<div v-if="params.EvolveMenu_Id" class="evolve-page-header-icons">
					<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', params.EvolveMenu_Id)"></a>
				</div>
				<div class="evolve-page-header-icons evolve-float-right"> 
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$store.dispatch('removeOneTab', '/common/dbSearch')"></a>
				</div>
			
				<div class="evolve-page-header-icons evolve-float-right">
				<!-- <button
					class="sc-button sc-button-mini header-button-evolve"
					type="button"
					@click="onCreateOrEditMenu('')"
				>
					{{ translate.db_search }}
				</button> -->
				</div>
			 
				<div class="evolve-page-header-icons evolve-float-right">
				<!-- <a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600" @click="downloadCsv()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-pdf md-color-red-600" @click="downloadPdf()"></a> -->
				</div>
			</div>
			<div id="sc-page-content" uk-grid>
				<div class="uk-card uk-width-1-1 uk-box-shadow-small">
					<div clsass="uk-card-body">
						<form name="dbDescriptor" class="uk-grid uk-margin-top" uk-grid="masonry: true">
							<div class="uk-grid uk-width-1-3@s" uk-grid="masonry: true">
								<div class="uk-width-1-1@m uk-grid">
									<div class="sc-input-wrapper">
										<input 
											v-model="tableValueSearchInput" 
											type="text" 
											class="uk-input sc-vue-input"
											placeholder="Enter Values to Search for"
										>
										<span class="sc-input-bar"></span>
									</div>
								</div>

								<div class="uk-width-1-1@m uk-grid">
									<div class="uk-first-column uk-margin-small-top">
										<div class="uk-grid uk-child-width-1-1@s">
											<label for="table-type-input-1" class="uk-first-column">
												<input 
													id="table-type-input-1" 
													v-model="tableTypeInput" 
													type="radio"
													name="tableTypeInput" 
													value="At least one of the words"
													class="uk-radio"
												>
												<span>At least one of the words</span>
											</label> 
											<br>
											<label for="table-type-input-2">
												<input 
													id="table-type-input-2" 
													v-model="tableTypeInput" 
													type="radio"
													name="tableTypeInput" 
													checked="checked" 
													value="All Words"
													class="uk-radio"
												>
												<span>All Words</span>
											</label>
											<br>
											<label for="table-type-input-3">
												<input 
													id="table-type-input-3"
													v-model="tableTypeInput" 
													type="radio"
													name="tableTypeInput" 
													checked="checked" 
													value="As regular expression"
													class="uk-radio"
												>
												<span>As regular expression</span>
											</label>
										</div>
									</div>
								</div>

								<div class="uk-width-1-1@m uk-grid">
									<div class="uk-first-column">
										<app-secondary-loader v-if="loadingState" />
										<button 
											v-else
											type="button"
											class="sc-button sc-button-success uk-margin-small-top" 
											@click="getTableList"
										>
											Search
										</button>
									</div>
								</div>
							</div>

							<div v-show="tableList.length" class="uk-grid uk-width-1-3@m">
								<Select2
									v-model="selectedTableName"
									name="tableNameSelectInput"
									:settings="{ 
										'width': '100%', 
										'placeholder': 'Select Table', 
										allowClear: true 
									}"
									class="uk-width-1-1@m uk-grid"
								>
									<option key value>
										Select Table
									</option>
									<option
										v-for="tableItem in tableList"
										:key="tableItem.tableName"
										:value="tableItem.tableName"
									>
										{{ tableItem.tableName }} - {{ tableItem.totalCount }}
									</option>
								</Select2>
							</div>


							<div v-show="columns.length" class="uk-grid uk-width-1-3@s">
								<Select2
									:multiple="true"
									:settings="{ 
										'width': '100%',  
										'placeholder': 'Select Columns', 
										'allowClear': false 
									}" 
									class="uk-width-1-1@m uk-grid"
									name="tableColumnSelectInput"
									:value="selectedColumnNames"
									@change="handleColumnNameSelection"
								>
									<option
										v-for="col in columns"
										:key="col.COLUMN_NAME"
										:value="col.COLUMN_NAME"
									>
										{{ col.COLUMN_NAME }}
									</option>
								</Select2>
							</div>
						</form>
                    
						<br>
						<form 
							v-if="columns.length" 
							ref="tableDataFilterForm" 
							class="uk-margin-right" 
							name="table-data-filter-form"
							@submit.prevent="getTableData"
						>
							<div class="uk-align-right">
								<button type="submit" class="sc-button sc-button-small sc-button-primary">
									Search in Table option
								</button>
							</div>

							<div class="uk-overflow-auto">
								<table class="uk-table uk-table-hover uk-table-middle">
									<thead>
										<tr>
											<th>Field Name</th>
											<th>Field Type</th>
											<th>Operator</th>
											<th>Values</th>
										</tr>
									</thead>
                            
									<tbody>
										<tr 
											v-for="col in selectedCols"
											:key="col.COLUMN_NAME"
										>
											<td>{{ col.COLUMN_NAME }}</td>
											<td>{{ col.DATA_TYPE }}</td>
											<td>
												<select name="queryOperator" data-form-name="table-data-filter-form" :data-column-name="col.COLUMN_NAME" class="uk-select">
													<option v-if="col.DATA_TYPE === 'int'" value="BETWEEN">
														BETWEEN
													</option>
													<option v-if="col.DATA_TYPE === 'varchar' || col.DATA_TYPE === 'text'" value="LIKE">
														LIKE
													</option>
													<option v-if="col.DATA_TYPE === 'varchar' || col.DATA_TYPE === 'text'" value="%LIKE%">
														LIKE %...%
													</option>
													<option value="=">
														=
													</option>
												</select>
											</td>
											<td>
												<div class="sc-input-wrapper">
													<input 
														type="text" 
														name="queryValue"
														class="uk-input sc-vue-input uk-form-width-medium"
														data-form-name="table-data-filter-form"
														:data-column-name="col.COLUMN_NAME"
														:value="bindPreInsertedValues(col.COLUMN_NAME)"
														:placeholder="col.DATA_TYPE | queryFieldPlaceholder"
													>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</form>

						<br>

						<div v-if="columns.length" class="uk-child-width-1-1@s uk-grid uk-margin-right">
							<div class="uk-flex uk-flex-right">
								<button 
									class="sc-button sc-button-success sc-button-small uk-margin-left" 
									@click="openAddRowModal"
								>
									Add new Rows
								</button>
								<button class="sc-button sc-button-small uk-margin-left"
									:disabled="selectedRowIds.length !== 1"
									@click="duplicateRowModal"
								>
									Duplicate Row
								</button>
								<button class="sc-button sc-button-small uk-margin-left"
									:disabled="selectedRowIds.length !== 1"
									@click="openUpdateRowModal"
								>
									Edit Rows
								</button>
								<button class="sc-button sc-button-small sc-button-success uk-margin-left" @click="getTableData">
									Refresh
								</button>
								<button 
									class="sc-button sc-button-small sc-button-danger uk-margin-left"
									:disabled="selectedRowIds.length === 0"
									@click="deleteTableRows"
								>
									Delete Rows
								</button>
								<button class="sc-button sc-button-small sc-button-primary uk-margin-left">
									Search
								</button>
							</div>

							<div class="uk-overflow-auto uk-margin-top">
								<table class="uk-table uk-table-hover uk-table-middle uk-table-divider">
									<thead>
										<tr>
											<th class="uk-table-shrink">
												<div class="p-icon pretty" p-checkbox="">
													<input type="checkbox" @change="handleAllRowSelection"> 
													<div class="state">
														<i class="icon mdi mdi-check"></i>
														<label>
														</label>
													</div>
												</div>
											</th>
											<th v-for="(col, index) in selectedColumnNames" :key="index">
												{{ col }}
											</th>
										</tr>
									</thead> 
									<tbody>
										<tr 
											v-for="(row) in tableRows"
											:key="row._id_"
											:data-row-id="row._id_"
										>
											<td>
												<div class="p-icon pretty">
													<input 
														type="checkbox" 
														name="table-data-row"
														:value="row._id_" 
														:checked="row._selected_"
														@change="handleRowSelection"
													>

													<div class="state">
														<i class="icon mdi mdi-check"></i>
														<label></label>
													</div>
												</div>
											</td> 
											<td 
												v-for="(col) in selectedColumnNames" 
												:key="col"
											>
												{{ row[col] }}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
	
			<div v-if="showRecordModal" id="modify_db_record_modal" class="uk-modal" data-uk-modal>
				<form ref="tableOperationForm" class="uk-modal-dialog" @submit.prevent="handleOperations">
					<button class="uk-modal-close-default" type="button" data-uk-close></button>
					<div class="uk-modal-header">
						<h2 class="uk-modal-title">
							{{ showRecordModifyModalTitle }}
						</h2>
					</div>
					<div class="uk-modal-body">
						<div class="uk-grid">
							<div v-for="col in columns" :key="col.COLUMN_NAME" class="uk-width-1-3@m uk-grid">
								<label>{{ col.COLUMN_NAME }} <small>({{ col.DATA_TYPE }})</small></label>
								<div class="sc-input-wrapper sc-input-wrapper-outline">
									<input 
										type="text" 
										data-form-name="modify-record"
										:data-field-name="col.COLUMN_NAME"
										class="uk-input sc-vue-input sc-input-outline"
										:disabled="col.COLUMN_NAME | checkExplicitAssignment"
									>
								</div>
							</div>
						</div>
					</div>
					<div class="uk-modal-footer uk-text-right">
						<button class="sc-button sc-button-flat sc-button-flat-danger" type="button" @click="removeRecordModal">
							Cancel
						</button>
						<button class="sc-button" type="submit">
							Done
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppDataView',

	layout: 'eDefault',

	components: {
		Select2: process.client ? () => import('~/components/Select2') : null,
	},

	filters: {

		/**
		 * Check explicite assignment for column names
		 * @param {string} colname - Column name
		 */
		checkExplicitAssignment (colname) {
			const ctxlist = [
				'CreatedAt',
				'UpdatedAt',
				'CreatedUser',
				'UpdatedUser',
				'ID',
				'Id'
			];

			return ctxlist.some((ctx) => colname.endsWith(ctx));
		},

		queryFieldPlaceholder (type) {
			type = (type || '').toUpperCase();
			let msg;

			switch (type) {
			case 'INT':
			case 'NUMBER':
				msg = "e.g. 0 ~ n";
				break;

			case 'VARCHAR':
			case 'CHAR':
				msg = "e.g. Text";
				break;

			case 'DATETIME':
			case 'DATE':
				msg = "e.g. YYYY-MM-DD ~ YYYY-MM-DD";
				break;

			case 'BIT':
				msg = "e.g. 0 or 1";
				break;
			}

			return msg;
		}
	},

	props: {
		params: {
			type: Object,
			default: () => {}
		}
	},

	data () {
		return {
			columnSearchAttempt: 0,
			tableValueSearchInput: '',
			tableTypeInput: 'At least one of the words',
			tableList: [],
			tableRows: [],
			pendingOperation: null,
			primaryColumn: null,
			columns: [],
			selectedTableName: '',
			selectedColumns: [],
			selectedRowIds: [],
			selectedRows: [],
			selectedColumnNames: [],
			preInsertedInputs: [],
			loadingState: false,
			showRecordModifyModal: false,
			showRecordModifyModalTitle: 'Record view',
			recordData: null,


			translate : {
				db_search : "DB Search",
			}
		}
	},

	computed: {
		selectedCols () {
			if (this.selectedColumns.length > 0) {
				return this.selectedColumns;
			}
			else {
				return this.columns;
			}
		},

		tableDataFilterForm () {
			return this.$refs['tableDataFilterForm'];
		},

		currentDatetime () {
			let date = new Date();
			let dateTime = date.getFullYear() 
				+ '-' + (date.getMonth() + 1) 
				+ '-' + date.getDate() 
				+ ' ' + date.getHours() 
				+ ':' + date.getMinutes() 
				+ ':' + date.getSeconds();

			return dateTime;
		},

		tableOperationForm () {
			return this.$refs['tableOperationForm'];
		},

		tableOperationInputs () {
			const form = this.tableOperationForm;
			const inputs = Array.from(form.querySelectorAll("[data-form-name='modify-record']"));

			return inputs;
		}
	},

	watch: {
		async selectedTableName (newTableName) {
			if (newTableName.length > 0) {
				await this.getTableColumns();
			}
			const table = this.tableList.find(item => item.tableName === newTableName);

			this.columnSearchAttempt = 0;
			this.selectedRowIds = [];
			this.selectedRows = [];
			this.tableRows = [];

			if (table && Array.isArray(table.columns)) {
				this.selectedColumnNames = table.columns.map(col => {
					this.preInsertedInputs.push(col.columnName);
					return col.columnName;
				});
			}
		},

		selectedColumnNames (colNames = []) {
			this.columnSearchAttempt++;

			this.selectedColumns = this.columns.filter(item => {
				const name = item.COLUMN_NAME;

				if (colNames.includes(name)) {
					return item;
				}
			});

			// check for pre inserted values
			if (this.columnSearchAttempt > 1) {
				let newEntries = this.preInsertedInputs.filter(val => colNames.includes(val));
				this.preInsertedInputs = newEntries;
			}
		},

		selectedRowIds (list = []) {
			const rows = list.map((id) => {
				const row = this.tableRows.find(rowItem => rowItem._id_ == id);

				return row;
			});

			this.selectedRows = rows;
		}
	},

	mounted () {
		this.removeRecordModal();
	},

	methods: {
		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},

		getTableOperationInputs () {
			const form = this.tableOperationForm;
			const inputs = Array.from(form.querySelectorAll("[data-form-name='modify-record']"));

			return inputs;
		},
		bindPreInsertedValues (colname) {
			if (this.preInsertedInputs.includes(colname)) {
				return this.tableValueSearchInput;
			} 
			return undefined;
		},
		async handleOperations () {
			const inputs = this.getTableOperationInputs();
			const tableName = this.selectedTableName;
			const tablePrimaryKey = this.primaryColumn;
			const operation = this.pendingOperation;
			let payload;
			let response;

			// form input values
			let values = {};
			
			// exported values
			let exp = {};

			inputs.forEach(input => {
				const fieldName = input.getAttribute('data-field-name')
				const value = input.value;

				Reflect.set(values, fieldName, value);

				if (!input.getAttribute('disabled')) {
					Reflect.set(exp, fieldName, value);
				}
			});

			// Apply db operation

			if (operation === 'ADD' || operation === 'DUPLICATE') {
				payload = {
					data: exp,
					tableName
				}
			}
			else if (operation === 'UPDATE') {
				payload = {
					data: exp,
					tableName,
					updateIdColumnName: tablePrimaryKey,
					updateIdValue: values[tablePrimaryKey]
				}
			}

			response = await this.applyOperation(operation, payload);
			this.notification("success", 3000, response.message);

			this.removeRecordModal();
			await this.getTableData();
		},

		async applyOperation (operation = '', payload = {}) {
			let endpoint;

			switch (operation) {
			case 'ADD':
			case 'DUPLICATE':
				endpoint = "/api/v1/evolve/DbSearch/addDataInTable";
				break;

			case 'UPDATE':
				endpoint = "/api/v1/evolve/DbSearch/updateDataInTable";
				break;

			case 'DELETE':
				endpoint = "/api/v1/evolve/DbSearch/deleteDataInTable";
				break;
			}

			const response = await this
				.$axios
				.$post(endpoint, payload)
				.catch(e => {
					this.notification("danger", 3000, "Problem with connecting to server!");
			   });

			const status = response.statusCode;

			if (status === 200 || status === 201) {
				return response;
			}
			else {
				this.notification("danger", 3000, response.message);
			}
		},

		handleAllRowSelection ($event) {
			const checked = $event.target.checked;
			let rows = [];

			this.tableRows = this.tableRows.map(row => {
				if (checked === true) {
					rows.push(row._id_);
				}

				row._selected_ = checked;
				
				return row;
			});

			this.selectedRowIds = (checked === true)? rows: [];
		},
		
		handleRowSelection ($event) {
			const checked = $event.target.checked;
			const value = $event.target.value;

			if (checked == true && !this.selectedRowIds.includes(value)) {
				this.selectedRowIds.push(value);
			}
			else {
				let rows = this.selectedRowIds;
				this.selectedRowIds = rows.filter(row => row != value);
			}
		},

		changeRegularTableName (value = '') {
			let tableIndexName = value;
			tableIndexName = tableIndexName.replace("[dbo].[", "");
			tableIndexName = tableIndexName.replace("]", "");

			return tableIndexName;
		},

		changeRegularColumnName (value = '') {
			let column = value.replace('[', '');
			column = column.replace(']', '');
			return column;
		},

		async getTableList () {
			this.loadingState = true;
			const payload = {
				search: this.tableValueSearchInput,
				searchType: this.tableTypeInput
			};

			const response = await this
				.$axios
				.$post('/api/v1/evolve/DbSearch/getAllTableList', payload)
				.catch(e => {
				    this.notification("danger", 3000, "Problem with connecting to server!");
			    });
			const status = response.statusCode;

			this.loadingState = false;

			if (status === 200) {
				let list = response.result;

				if (Array.isArray(list)) {
					list = list.map(item => {
						item.tableName = this.changeRegularTableName(item.tableName);
						item.columns = item.columns.map(col => {
							col.columnName = this.changeRegularColumnName(col.columnName);

							return col;
						});

						return item;
					})

					this.tableList = list;
				}
			}
			else {
				this.notification("danger", 3000, response.message);
			}
		},

		/**
         * Fetch table columns by Table Name
         * @async
         * @return {Promise<object>}
         */
		async getTableColumns () {
			const payload = {
			    tableName: this.selectedTableName
			};
	
			const response = await this
				.$axios
				.$post('/api/v1/evolve/DbSearch/getAllColumnList', payload)
				.catch(e => {
				    this.notification("danger", 3000, "Problem with connecting to server!");
			    });
			const status = response.statusCode;
	
			if (status === 200) {
				const list = response.result;

				if (Array.isArray(list)) {
					const primaryKeys = ['id', 'Id', 'ID'];
					let primary; 

					list.forEach(col => {
						const colName = col.COLUMN_NAME;

						if (primaryKeys.some(key => colName.endsWith(key))) {
							primary = colName;
						}
					});

					this.primaryColumn = primary;
					this.columns = list;
				}
			}
			else {
				this.notification("danger", 3000, response.message);
			}
		},

		getFilterQueryList () {
			let table;
			let filterList = {};

			if (this.tableDataFilterForm) {
				table = this.tableDataFilterForm;
			}

			const rowElems = table.querySelectorAll("[data-form-name='table-data-filter-form']");

			for (const el of rowElems) {
				const rowName = el.getAttribute('data-column-name') || null;
				const name = el.getAttribute('name') || null;
				let colName, colValue;

				switch (name) {
				case 'queryOperator':
					colName = 'operator';
					colValue = el.value;
					break;

				case 'queryValue':
					colName = 'value';
					colValue = el.value;
					break;
				}
				
				if (Reflect.has(filterList, rowName)) {
					const row = Reflect.get(filterList, rowName) || {};
					Reflect.set(row, colName, colValue);
					Reflect.set(filterList, rowName, row);
				}
				else {
					let row = {
						columnName: rowName,
						[colName]: colValue
					};
	
					Reflect.set(filterList, rowName, row);
				}
			}

			// to array
			filterList = Object.values(filterList);

			// remove undefined properties
			filterList = filterList.filter(item => {
				if (typeof item.value === 'string' && item.value.length > 0) {
					return item;
				}
			})

			return filterList;
		},

		getSelectedOneRow () {
			return this.selectedRows[this.selectedRows.length - 1];
		},

		async getTableData () {
			const tableName = this.selectedTableName;
			const filterList = this.getFilterQueryList();
			const payload = {
				tableName,
				filterList
			};

			const response = await this
				.$axios
				.$post('/api/v1/evolve/DbSearch/getTableData', payload)
				.catch(e => {
				    this.notification("danger", 3000, "Problem with connecting to server!");
			    });
			const status = response.statusCode;

			this.selectedRowIds = [];
			this.selectedRows = [];
			this.pendingOperation = null;

			if (status === 200) {
				let list = response.result;

				if (Array.isArray(list)) {
					list = list.map(item => {
						Reflect.set(item, '_selected_', false);
						Reflect.set(item, '_id_', item[this.primaryColumn] || null);

						return item;
					})

					this.tableRows = list;
				}
			}
			else {
				this.notification("danger", 3000, response.message);
			}
		},

		handleColumnNameSelection (cols) {
			this.selectedColumnNames = cols;
		},

		openAddRowModal () {
			this.tableOperationForm.reset();
			this.showRecordModal("Add new row");
			this.pendingOperation = 'ADD';
		},
		
		duplicateRowModal () {
			this.pendingOperation = null;
			this.tableOperationForm.reset();
			const inputs = this.getTableOperationInputs();
			const row = this.getSelectedOneRow();

			if (!row) {
				alert("Can't find selected record");
				return '';
			}
		
			inputs.forEach(input => {
				const fieldName = input.getAttribute('data-field-name')
				let value = Reflect.get(row, fieldName);

				input.value = String(value);
			})
			this.showRecordModal("Duplicate row");
			this.pendingOperation = 'DUPLICATE';
		},
		openUpdateRowModal () {
			this.pendingOperation = null;
			this.tableOperationForm.reset();
			const inputs = this.getTableOperationInputs();
			const id = this.selectedRowIds[this.selectedRowIds.length - 1];
			const row = this.tableRows.find(item => item._id_ == id)

			inputs.forEach(input => {
				const fieldName = input.getAttribute('data-field-name');
				let value = Reflect.get(row, fieldName);

				input.value = String(value);
			})

			this.showRecordModal("Edit row");
			this.pendingOperation = 'UPDATE';
		},

		async deleteTableRows () {
			let dataTodelete = this.selectedRowIds;
			let confirmation = confirm("Are you sure that you want to remove this records?");

			if (!(Array.isArray(dataTodelete) && dataTodelete.length > 0)) {
				return;
			}

			if (confirmation === false) {
				return;
			}

			const payload = {
				dataTodelete,
				tableName: this.selectedTableName,
				deleteIdColumnName: this.primaryColumn
			};

			const response = await this.applyOperation("DELETE", payload);
			this.notification("success", 3000, response.message);

			this.pendingOperation = null;
			await this.getTableData();
		},

		removeRecordModal: function () {
			UIkit.modal("#modify_db_record_modal").hide();
			this.tableOperationForm.reset();
			this.pendingOperation = null;
		},

		/**
         * Show record modal
         * @param {string} title - Modal title
         */
		showRecordModal (title) {
			if (typeof title === 'string' && title.length > 0) {
				this.showRecordModifyModalTitle = title;
			} 

			UIkit.modal("#modify_db_record_modal").show();
		},
	}
}
</script>
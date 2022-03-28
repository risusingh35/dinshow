<template>
	<div>
		<!-- V3 Setup Start>>>>>>>>>>>>>-->
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons evolve-float-right">
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-close-box md-color-red-600"
					@click="
            $store.dispatch('removeOneTab', pageURL);
            $destroy();
          "
				></a>
			</div>
		</div>

		<client-only>
			<div id="sc-page-content" class="evolve-page-body">
				<div id="nav-mdi" class="uk-card">
					<div class="uk-card-body min-height-back">
						<div class="uk-modal-body" style="padding-top: 0px">
							<div class="uk-grid" data-uk-grid>
								<!-- Modle start -->
								<div class="uk-text-right uk-width-1-1@m uk-margin-remove">
									<div class="uk-float-right">
										<button
											v-if="isSaveAllow"
											class="sc-button datatable-print-button sc-button-primary"
											:disabled="isLableDisabled"
											@click="savePr(true)"
										>
											{{ translate.save }}
										</button>
									</div>
								</div>
								<div>
									<div
										id="pr_line"
										ref="m"
										class="uk-modal"
										data-uk-modal
										bg-close="false"
									>
										<div class="uk-modal-dialog" style="width: 1500px">
											<form class="sc-padding">
												<button
													class="uk-modal-close-default"
													type="button"
													data-uk-close
												></button>
												<div class="uk-modal-header">
													<h2 class="uk-modal-title">
														{{ translate.line_no }} :
														<span v-if="currentLineIndex == null">{{
															lineDetailList.length + 1
														}}</span><span v-else>{{
															lineDetailList[currentLineIndex]
																.EvolvePRDetails_LineNo
														}}</span>
													</h2>
												</div>
												<!-- //UK Model start -->
												<div class="uk-modal-body">
													<PrettyCheck
														v-model="isItemActive"
														:disabled="isLableDisabled"
														class="p-switch pretty"
														name="isItemActive"
													>
														{{ translate.is_item_active }}
													</PrettyCheck>

													<div
														class="uk-child-width-1-3@m uk-grid"
														data-uk-grid
													>
														<div class="uk-width-1-3@m">
															<div class="uk-grid" data-uk-grid>
																<div class="uk-width-1-2@m">
																	<label
																		for="table lable"
																		class="evolve-input-lable"
																	>{{ translate.item }}{{ itemCode }}
																	</label>
																</div>
																<div class="uk-width-1-2@m">
																	<ScInput
																		v-if="isItemActive == true"
																		v-model="itemCode"
																		:disabled="isLableDisabled"
																		name="itemCode"
																		mode="outline"
																		placeholder="ITEM CODE"
																	></ScInput>

																	<Select2Search
																		v-else
																		v-model="itemId"
																		:disabled="isLableDisabled"
																		name="itemId"
																		:settings="{
																			width: '100%',
																			placeholder: translate.select,
																			allowClear: true,
																		}"
																		:ajax-url="getItemList"
																		:minimum-input-length="3"
																		@change="getItemDetails()"
																	></Select2Search>
																</div>
															</div>
														</div>
														<div class="uk-width-1-3@m">
															<div class="uk-grid" data-uk-grid>
																<div class="uk-width-1-2@m">
																	<label
																		for="table lable"
																		class="evolve-input-lable"
																	>{{ translate.item_desc }}</label>
																</div>
																<div class="uk-width-1-2@m">
																	<ScInput
																		v-if="isItemActive == true"
																		v-model="itemDesc"
																		:disabled="isLableDisabled"
																		name="itemDesc"
																		mode="outline"
																		:placeholder="translate.item_desc"
																	></ScInput>
																	<ScInput
																		v-else
																		v-model="itemDesc"
																		name="itemDesc"
																		mode="outline"
																		:placeholder="translate.item_desc"
																		disabled
																	></ScInput>
																</div>
															</div>
														</div>
														<div class="uk-width-1-3@m">
															<div class="uk-grid" data-uk-grid>
																<div class="uk-width-1-2@m">
																	<label
																		for="table lable"
																		class="evolve-input-lable"
																	>{{ translate.uom }}</label>
																</div>
																<div class="uk-width-1-2@m">
																	<ScInput
																		v-if="isItemActive == true"
																		v-model="itemUom"
																		:disabled="isLableDisabled"
																		name="itemUom"
																		mode="outline"
																		:placeholder="translate.uom"
																	></ScInput>
																	<ScInput
																		v-else
																		v-model="itemUom"
																		name="itemUom"
																		mode="outline"
																		:placeholder="translate.uom"
																		disabled
																	></ScInput>
																</div>
															</div>
														</div>
													</div>
													<div
														class="uk-child-width-1-3@m uk-grid"
														data-uk-grid
													>
														<div class="uk-width-1-3@m">
															<div class="uk-grid" data-uk-grid>
																<div class="uk-width-1-2@m">
																	<label
																		for="table lable"
																		class="evolve-input-lable"
																	>{{ translate.need_date }} : </label>
																</div>
																<div class="uk-width-1-2@m">
																	<ScInput
																		v-model="NeedDate"
																		v-flatpickr="{
																			altInput: false,
																			dateFormat: 'd-m-Y',
																			allowInput: false,
																			minDate: 'today',
																		}"
																		:disabled="isLableDisabled"
																		name="NeedDate"
																		:placeholder="translate.select_date"
																		mode="outline"
																	></ScInput>
																</div>
															</div>
														</div>
														<div class="uk-width-1-3@m">
															<div class="uk-grid" data-uk-grid>
																<div class="uk-width-1-2@m">
																	<label
																		for="table lable"
																		class="evolve-input-lable"
																	>{{ translate.due_date }}</label>
																</div>
																<div class="uk-width-1-2@m">
																	<ScInput
																		v-model="dueDate"
																		v-flatpickr="{
																			altInput: false,
																			dateFormat: 'd-m-Y',
																			allowInput: false,
																			minDate: 'today',
																		}"
																		:disabled="isLableDisabled"
																		name="dueDate"
																		:placeholder="translate.select_date"
																		mode="outline"
																	></ScInput>
																</div>
															</div>
														</div>
														<div class="uk-width-1-3@m">
															<div class="uk-grid" data-uk-grid>
																<div class="uk-width-1-2@m">
																	<label
																		for="table lable"
																		class="evolve-input-lable"
																	>
																		{{ translate.qty }}</label>
																</div>
																<div class="uk-width-1-2@m">
																	<ScInput
																		v-model="itemQty"
																		:disabled="isLableDisabled"
																		name="itemQty"
																		type="number"
																		mode="outline"
																		:placeholder="translate.qty"
																		@input="getTotalPrice()"
																	></ScInput>
																</div>
															</div>
														</div>
													</div>
													<div
														class="uk-child-width-1-3@m uk-grid"
														data-uk-grid
													>
														<div class="uk-width-1-3@m">
															<div class="uk-grid" data-uk-grid>
																<div class="uk-width-1-2@m">
																	<label
																		for="table lable"
																		class="evolve-input-lable"
																	>{{ translate.price }}</label>
																</div>
																<div class="uk-width-1-2@m">
																	<ScInput
																		v-model="itemPrice"
																		:disabled="isLableDisabled"
																		name="itemPrice"
																		type="number"
																		mode="outline"
																		:placeholder="translate.price"
																		@input="getTotalPrice()"
																	></ScInput>
																</div>
															</div>
														</div>
														<div class="uk-width-1-3@m">
															<div class="uk-grid" data-uk-grid>
																<div class="uk-width-1-2@m">
																	<label
																		for="table lable"
																		class="evolve-input-lable"
																	>{{
																		translate.total_cust_unit_price
																	}}</label>
																</div>
																<div class="uk-width-1-2@m">
																	<ScInput
																		v-model="totalItemPrice"
																		name="totalItemPrice"
																		type="number"
																		mode="outline"
																		disabled
																		:placeholder="
																			translate.total_cust_unit_price
																		"
																	></ScInput>
																</div>
															</div>
														</div>
													</div>
													<div class="uk-modal-footer uk-text-right">
														<button
															class="
                                sc-button sc-button-flat sc-button-flat-danger
                                uk-modal-close
                              "
															type="button"
														>
															{{ translate.cancel }}
														</button>
														<button
															:disabled="isLableDisabled"
															class="sc-button"
															type="button"
															@click="saveLineData()"
														>
															{{ translate.save }}
														</button>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>

								<div class="uk-child-width-1-4@m uk-grid" data-uk-grid>
									<div></div>
									<div></div>
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m"></div>
											<div class="uk-width-1-2@m">
												<span>{{ selectedSupplier1 }}</span>
											</div>
										</div>
									</div>
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m"></div>
											<div class="uk-width-1-2@m">
												<span><span>{{ selectedShipTo2 }}</span>
												</span>
											</div>
										</div>
									</div>

									<!-- p-switch pretty -->
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable">{{
													translate.category
												}} : </label>
											</div>
											<div class="uk-width-1-2@m">
												<Select2
													v-model="$v.categoryId.$model"
													:disabled="isLableDisabled"
													name="categoryId"
													:error-class="$v.categoryId.$error"
													:validator="$v.categoryId"
													:settings="{
														width: '100%',
														placeholder: translate.select,
														allowClear: true,
													}"
													@change="onChangeCategory()"
												>
													<option key value>
														{{ translate.select }}
													</option>
													<option
														v-for="category in categoryList"
														:key="category.EvolveCategory_ID"
														:value="category.EvolveCategory_ID"
													>
														{{ category.EvolveCategory_Code }}-{{
															category.EvolveCategory_Desc
														}}
													</option>
												</Select2>
											</div>
										</div>
									</div>
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable">{{
													translate.req_nbr
												}} : </label>
											</div>

											<div class="uk-width-1-2@m">
												<ScInput
													v-model="$v.reqNo.$model"
													:error-class="$v.reqNo.$error"
													:validator="$v.reqNo"
													name="reqNo"
													mode="outline"
													:placeholder="translate.req_nbr"
													disabled
												></ScInput>
											</div>
										</div>
									</div>
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable">{{
													translate.supplier
												}} : </label>
											</div>
											<div class="uk-width-1-2@m">
												<Select2Search
													v-model="$v.supplierID.$model"
													:error-class="$v.supplierID.$error"
													:validator="$v.supplierID"
													name="supplierID"
													:settings="{
														width: '100%',
														placeholder: translate.select,
														allowClear: true,
													}"
													:ajax-url="getCustList"
													:minimum-input-length="3"
													:disabled="isLableDisabled"
													@change="getSupplierDetails()"
												></Select2Search>
											</div>
										</div>
									</div>
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable"
													class="evolve-input-lable"
												>{{ translate.shipto }} : 
												</label>
											</div>

											<div class="uk-width-1-2@m">
												<Select2Search
													v-model="$v.shipToAddId.$model"
													:error-class="$v.shipToAddId.$error"
													:validator="$v.shipToAddId"
													:disabled="isLableDisabled"
													name="shipToAddId"
													:settings="{
														width: '100%',
														placeholder: translate.select,
														allowClear: true,
													}"
													:ajax-url="getShipList"
													:minimum-input-length="3"
													@change="getShipToDetails()"
												></Select2Search>
											</div>
										</div>
									</div>

									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable"
													class="evolve-input-lable"
												>{{ translate.currency }} :</label>
											</div>
											<div class="uk-width-1-2@m">
												<Select2
													v-model="$v.currencyId.$model"
													:error-class="$v.currencyId.$error"
													:validator="$v.currencyId"
													:settings="{
														width: '100%',
														placeholder: translate.select,
														allowClear: true,
													}"
													name="currencyId"
													:disabled="isLableDisabled"
												>
													<option key="" value="" selected>
														{{ translate.select }}
													</option>
													<option
														v-for="currency in currencyList"
														:key="currency.EvolveGenericCodeMaster_ID"
														:value="currency.EvolveGenericCodeMaster_ID"
													>
														{{ currency.EvolveGenericCodeMaster_Value }}
													</option>
												</Select2>
											</div>
										</div>
									</div>
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable"
													class="evolve-input-lable"
												>{{ translate.project }} : </label>
											</div>
											<div class="uk-width-1-2@m">
												<Select2
													v-model="$v.projectId.$model"
													:error-class="$v.projectId.$error"
													:validator="$v.projectId"
													:settings="{
														width: '100%',
														placeholder: translate.select,
														allowClear: true,
													}"
													name="projectId"
													:disabled="isLableDisabled"
												>
													<option key="" value="" selected>
														{{ translate.select }}
													</option>
													<option
														v-for="project in projectList"
														:key="project.EvolveProject_ID"
														:value="project.EvolveProject_ID"
													>
														{{ project.EvolveProject_Code }}
													</option>
												</Select2>
											</div>
										</div>
									</div>
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable">{{
													translate.buyer
												}} : </label>
											</div>
											<div class="uk-width-1-2@m">
												<Select2
													v-model="$v.buyerId.$model"
													:error-class="$v.buyerId.$error"
													:validator="$v.buyerId"
													:disabled="isLableDisabled"
													:settings="{
														width: '100%',
														placeholder: translate.select,
														allowClear: true,
													}"
													name="buyerId"
												>
													<option key="" value="" selected>
														{{ translate.select }}
													</option>
													<option
														v-for="buyer in buyerList"
														:key="buyer.EvolveUser_ID"
														:value="buyer.EvolveUser_ID"
													>
														{{ buyer.EvolveUser_Name }}
													</option>
												</Select2>
											</div>
										</div>
									</div>
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable">{{
													translate.user
												}} : </label>
											</div>
											<div class="uk-width-1-2@m">
												<Select2
													v-model="$v.endUserId.$model"
													:disabled="isLableDisabled"
													:settings="{
														width: '100%',
														placeholder: 'SELECT',
														allowClear: true,
													}"
													name="endUserId"
													:error-class="$v.endUserId.$error"
													:validator="$v.endUserId"
												>
													<option key="" value="" selected>
														SELECT
													</option>
													<option
														v-for="endUser in endUserList"
														:key="endUser.EvolveUser_ID"
														:value="endUser.EvolveUser_ID"
													>
														{{ endUser.EvolveUser_Name }}
													</option>
												</Select2>
											</div>
										</div>
									</div>
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable">{{
													translate.sub_account
												}} : </label>
											</div>
											<div class="uk-width-1-2@m">
												<!-- <ScInput
													v-model="$v.subAcc.$model"
													:disabled="isLableDisabled"
													name="subAcc"
													mode="outline"
													placeholder="SUB-ACCOUNT"
													:error-class="$v.subAcc.$error"
													:validator="$v.subAcc"
												></ScInput> -->
												<ScInput
													v-model="subAcc"
													:disabled="true"
													name="subAcc"
													mode="outline"
													placeholder="SUB-ACCOUNT"
												></ScInput>
											</div>
										</div>
									</div>
									<!-- <div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable">{{
													translate.cost_center
												}} : </label>
											</div>
											<div class="uk-width-1-2@m">
												<ScInput
													v-model="$v.costCenter.$model"
													:disabled="isLableDisabled"
													name="costCenter"
													mode="outline"
													placeholder="COST CENTER"
													:error-class="$v.costCenter.$error"
													:validator="$v.costCenter"
												></ScInput>
											</div>
										</div>
									</div> -->

									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable">{{
													translate.req_date
												}} : </label>
											</div>
											<div class="uk-width-1-2@m">
												<ScInput
													v-model="$v.reqDate.$model"
													v-flatpickr="{
														altInput: false,
														dateFormat: 'd-m-Y',
														allowInput: false,
														minDate: 'today',
													}"
													:error-class="$v.reqDate.$error"
													:validator="$v.reqDate"
													:disabled="isLableDisabled"
													name="reqDate"
													:placeholder="translate.select_date"
													mode="outline"
												></ScInput>
											</div>
										</div>
									</div>
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable">{{
													translate.pr_end_date
												}} : </label>
											</div>
											<div class="uk-width-1-2@m">
												<ScInput
													v-model="headerNeedDate"
													v-flatpickr="{
														altInput: false,
														dateFormat: 'd-m-Y',
														allowInput: false,
														minDate: 'today',
													}"
													:disabled="isLableDisabled"
													name="headerNeedDate"
													placeholder="Select Date.."
													mode="outline"
												></ScInput>
											</div>
										</div>
									</div>
									<div class="uk-width-1-4@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable">{{
													translate.pr_due_date
												}} : </label>
											</div>
											<div class="uk-width-1-2@m">
												<ScInput
													v-model="headerDueDate"
													v-flatpickr="{
														altInput: false,
														dateFormat: 'd-m-Y',
														allowInput: false,
														minDate: 'today',
													}"
													:disabled="isLableDisabled"
													name="headerDueDate"
													placeholder="Select Date.."
													mode="outline"
												></ScInput>
											</div>
										</div>
									</div>
									<div class="uk-width-1-3@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable"
													class="evolve-input-lable"
												>{{ translate.remarks }} : </label>
											</div>
											<div class="uk-width-1-2@m">
												<ScTextarea
													v-model="$v.addtionalRemarks.$model"
													:error-class="$v.addtionalRemarks.$error"
													:validator="$v.addtionalRemarks"
													:disabled="isLableDisabled"
													mode="outline"
													:placeholder="translate.additional_remarks"
													name="addtionalRemarks"
													:rows="3"
												></ScTextarea>
											</div>
										</div>
									</div>
									<div class="uk-width-1-3@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable"
													class="evolve-input-lable"
												>{{ translate.details }}:</label>
											</div>
											<div class="uk-width-1-2@m">
												<ScTextarea
													v-model="$v.shipToDetails.$model"
													:error-class="$v.shipToDetails.$error"
													:validator="$v.shipToDetails"
													name="shipToDetails"
													:disabled="isLableDisabled"
													mode="outline"
													:placeholder="translate.additional_remarks"
													:rows="3"
												></ScTextarea>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="uk-width-1-1@m"></div>
							<div class="uk-text-right uk-width-1-1@m">
								<button
									:disabled="isLableDisabled"
									class="sc-button datatable-print-button sc-button-primary"
									type="submit"
									data-uk-toggle="target : #pr_line"
									@click="resetLineDetails()"
								>
									{{ translate.addnewline }}
								</button>
							</div>
							<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
								<div>
									<div class="uk-overflow-auto">
										<client-only>
											<table class="uk-table uk-table-striped">
												<thead>
													<tr>
														<th>{{ translate.line_no }}</th>
														<th>{{ translate.need_date }}</th>
														<th>{{ translate.due_date }}</th>
														<th>{{ translate.item_code }}</th>
														<th>{{ translate.item_desc }}</th>
														<!-- <th>UOM</th> -->
														<th>{{ translate.qty }}</th>
														<th>{{ translate.per_unit_cost }}</th>
														<th>
															{{ translate.total_cost }} <br>({{ totalCost }})
														</th>
														<th>{{ translate.actions }}</th>
													</tr>
												</thead>
												<tbody>
													<tr
														v-for="(line, index) in lineDetailList"
														:key="index"
													>
														<td>{{ line.EvolvePRDetails_LineNo }}</td>
														<td>{{ line.EvolvePRDetails_NeedDate }}</td>
														<td>{{ line.EvolvePRDetails_DueDate }}</td>
														<td>{{ line.EvolveItem_Code }}</td>
														<td>{{ line.EvolveItem_Desc }}</td>

														<td>{{ line.EvolvePRDetails_Qty }}</td>
														<td>{{ line.EvolvePRDetails_ItemUnitPrice }}</td>
														<td>{{ line.EvolvePRDetails_ItemTotalPrice }}</td>

														<td>
															<button
																:disabled="isLableDisabled"
																title="Edit"
																class="
                                sc-button sc-button-primary
                                waves-effect
                                sc-button-mini
                                waves-button waves-light
                              "
																@click="getSingleLineDetails(index)"
															>
																<i class="mdi mdi-square-edit-outline"></i>
															</button>
															<button
																:disabled="isLableDisabled"
																title="Delete"
																class="
                                sc-button sc-button-danger
                                waves-effect
                                sc-button-mini
                              "
																@click="onDeleteLine(index)"
															>
																<i class="mdi mdi-delete"></i>
															</button>
														</td>
													</tr>
												</tbody>
											</table>
										</client-only>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</client-only>
	</div>
</template>
<style>
</style>
<script>
import { validationMixin } from "vuelidate";
import ScInput from "~/components/Input";
import ScTextarea from "~/components/Textarea";

import PrettyCheck from "pretty-checkbox-vue/check";

import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import Input from "../../../components/Input.vue";

// import moment from "~/plugins/moment";
if (process.client) {
	require("~/plugins/daterangepicker");
	require("~/plugins/flatpickr");
	//   import PrettyCheck from "pretty-checkbox-vue/check";
	var Paginate = require("vuejs-paginate");
}

export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	layout: "eDefault",
	components: {
		ScInput,
		PrettyCheck,
		Select2: process.client ? () => import("~/components/Select2") : null,
		Select2Search: process.client
			? () => import("~/components/ajaxSearch/Select2Search")
			: null,

		ScTextarea,
	},
	mixins: [validationMixin],

	data () {
		return {
			translate: {
				is_item_active:"ITEM IS ACTIVE",
				line_no: "LINE NO",
				item_desc: "ITEM DESCRIPTION",
				uom: "UOM",
				need_date: "NEED DATE",
				select_date: "Select Date..",
				due_date: "DUE DATE",
				qty: "QTY",
				total_cust_unit_price: "TOTAL CUST UNIT PRICE",
				currency: "CURRENCY",
				project: "PROJECT",
				remarks: "REMARKS",
				additional_remarks: "ADDITIONAL REMARKS ",
				details: "DETAILS",
				item_code: "ITEM CODE",
				item_desc: "ITEM DESC",
				per_unit_cost: "PER UNIT COST",
				total_cost: "TOTAL COST",
				actions: "ACTIONS",
				user: "END USER",
				shipto: "SHIP TO",
				addnewline: "ADD NEW LINE",
				price: "PRICE",
				item: "ITEM:",
				req_date: "REQSTN DATE",
				sub_account: "SUB ACCOUNT",
				cost_center: "COST CENTER",
				pr_end_date: "NEED DATE",
				pr_due_date: "DUE DATE",
				buyer: "BUYER",
				supplier: "SUPPLIER",
				req_nbr: "REQ NBR",
				select: "SELECT",
				endUserList: [],
				category: "CATEGORY",
				status_code_type: "Status Code Type",
				status_code: "Status Code",
				matrixType: "matrixType",
				action: "Action",
				cancel: "Cancel",
				save: "Save",
				add_status_code: "Add Status Code",
				is_required: "Is Required",
				select_status_code_type: "Select Status Code Type",
				enter_status_code: "Enter Status Code",
				search_here: "Search Here",
				back: "Back",
			},
	
			
			EvolveMenu_Id: this.$route.query.EvolveMenu_Id,
			pageURL: "/eDoa/Requisition/option",
			/* Start : EvolveDataTable */
			search: "", // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5, 6, 7],
			pdfExportColums: [0, 1, 2, 3, 4, 5, 6, 7],
			/** End : EvolveDataTable */
			//
			headerNeedDate: "",
			headerDueDate: "",
			endUserId: "",
			subAcc: "",
			costCenter: "",

			userList: [],
			approvalList: [],
			remarks: "",
			userId: "",
			customerList: [],
			shipToAddressList: [],
			projectList: [],
			addressList: [],
			// selectedProcessDetails.processId : '',
			selectedProcessDetails: {
				processId: "",
				matrixIndexId: "",
				sequence: "",
			},

			processId: "",
			approvalProcessDetails: [],
			backUrl: "",
			isNewLine: false,
			reqNo: "",
			supplierID: "",
			shipToAddId: "",
			currencyId: "",
			reqDate: "",
			categoryId: "",
			addtionalRemarks: "",
			buyerList: [],
			totalItemPrice: "",
			// lineItemMrp : '',
			itemPrice: "",
			linAddtionalRemarks: "",
			// ///////////////
			itemId: "",
			itemCode: "",
			itemUom: "",
			itemDesc: "",
			itemQty: "",
			unitCode: "",
			unitId: "",
			approvalMatrixId: "",
			slectedCustomer: "",
			NeedDate: "",
			dueDate: "",
			totalCost: 0,
			getItemList:
        this.$axios.defaults.baseURL + "api/v1/eDoa/Requisition/getItemList",
			getCustList:
        this.$axios.defaults.baseURL + "api/v1/eDoa/Requisition/getSupList",
			getShipList:
			this.$axios.defaults.baseURL + "api/v1/eDoa/Requisition/getShipList",
		
 	// getShipList:this.$axios.defaults.baseURL + "api/v1/eDoa/Requisition/getAdressList",
			lineDetailList: [],
			prId: "",
			isLableDisabled: false,
			isSubmitAllow: false,
			isSaveAllow: true,
			isReleaseAllow: false,
			currentLineIndex: null,
			taxEnvList: [],
			selectedSupplier: "",
			unitStateCode: "",
			customerStateCode: "",
			shipToAdress: "",
			billToAddress: "",
			shipToDetails: "",
			selectedSupplier1: "",
			selectedShipTo2: "",
			endUserList: "",
			isSavedDisabled: false,
			projectId: "",
			documentList: [],
			currencyList: [],
			buyerId: "",
			selectedShipTo: "",
			categoryList: [],
			isItemActive: false,
		};
	},
	computed: {},
	mounted () {},
	beforeDestroy () {
		// clearInterval(this.ramUpdateInterval);
	},

	created: async function () {
		this.prId = this.$route.query.PR_ID;
		this.removeModal();
		await this.geGenericCodeMasterList();
		await this.getBuyerList();
		await this.getCategoryList();
		await this.getProjectList();
		await this.getUserDetails();
		if (this.prId == undefined || this.prId == "") {
			this.prId = "";
			// await  this.getReqSerialNumber();
			this.selectedSupplier1 = "";
			this.selectedShipTo1 = "";
		} else {
			await this.getSinglePrData();
			// await this.getSupplierList();
		}

		// this.loaderShow()
		// await this.getSalesPersonList();
		// await this.getAdressList();
		// await this.getCreditTermsList();
		// await this.getApprovalMatrixList();
		// await this.getSupplierList();
		// this.loaderHide() ;

		// this.prId = this.$route.query.PR_ID;
		// this.isDisabled = this.$route.query.isLabelShow;
		// this.getQuoteDtails();
	},
	beforeMount () {
		this.translateLanguage();
	},
	validations: {
		endUserId: {
			required,
		},
		// subAcc: {
		// 	required,
		// },
		// costCenter: {
		// 	required,
		// },
		headerNeedDate: {
			required,
		},
		headerDueDate: {
			required,
		},

		categoryId: {
			required,
		},
		reqNo: {
			required,
		},
		supplierID: {
			required,
		},
		currencyId: {
			required,
		},
		projectId: {
			required,
		},
		reqDate: {
			required,
		},
		buyerId: {
			required,
		},
		addtionalRemarks: {
			required,
		},
		shipToDetails: {
			required,
		},
		shipToAddId: {
			required,
		},
		// itemId: {
		// 	required,
		// },
		// itemDesc: {
		//  	required,
		// },
		// itemUom: {
		//  	required,
		// },
		// NeedDate: {
		//  	required,
		// },
		// dueDate: {
		//  	required,
		// },

		// validation not require becouse already valideted at Adding line item
		// itemQty: {
		//  	required,
		// },
		// itemPrice: {
		// 	required,
		// },
		// totalItemPrice: {
		// 	required,
		// },
	},

	methods: {
		/** Default Method For All Pages : Start Here */
		translateLanguage: async function () {
			let languageId = this.$auth.$storage.getLocalStorage("EvolveLanguage_ID");
			if (languageId != undefined) {
				const languageTranstale = await this.$axios
					.$post("/api/v1/evolve/translate", {
						languageId: languageId,
						translate: this.translate,
					})
					.catch((e) => {});
				if (languageTranstale) {
					let tra = this.translate;
					Object.keys(this.translate).forEach(function (key) {
						languageTranstale.result.forEach(function (obj) {
							if (obj.EvolvelLabel_KeyWord == key) {
								tra[key] = obj.EvolveLabel_Term;
							}
						});
					});
				}
			}
		},
		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},
		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		/** Default Method For All Pages : End Here */
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getApprovalList();
		},

		/* Datatable Methods -- End */

		async onBackClick () {
			this.$router.push("/eDoa/salesQuote/list");
		},
		async addNewLine () {
			this.isNewLine = this.isNewLine == true ? false : true;
		},
		async resetLineDetails () {
			this.itemCode = "";
			this.itemUom = "";
			this.NeedDate = "";
			this.dueDate = "";
			this.itemId = "";
			this.itemDesc = "";
			this.itemQty = "";
			this.itemPrice = "";
			this.totalItemPrice = "";
			this.isItemActive=false;

			this.currentLineIndex = null;
		},

		async getSupplierDetails () {
			this.selectedSupplier = "";
		},
		async getProjectList () {
			let list = await this.$axios
				.$post("/api/v1/eDoa/Requisition/getProjectList", {})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});

			if (list.statusCode == 200) {
				this.projectList = list.result;
			} else {
				this.notification("danger", 3000, list.message);
			}
		},
		async getCategoryList () {
			let list = await this.$axios
				.$post("/api/v1/eDoa/Requisition/getCategoryList", {})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});

			if (list.statusCode == 200) {
				this.categoryList = list.result;
			} else {
				this.notification("danger", 3000, list.message);
			}
		},

		async getBuyerList () {
			let list = await this.$axios
				.$post("/api/v1/eDoa/Requisition/getBuyerList", {})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});

			if (list.statusCode == 200) {
				this.buyerList = list.result;
				this.endUserList = list.result;
			} else {
				this.notification("danger", 3000, list.message);
			}
		},

		async getUserDetails () {
			let list = await this.$axios
				.$post("/api/v1/eDoa/Requisition/getUserDetails", {})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});

			if (list.statusCode == 200) {
				this.unitCode = list.result.EvolveUnit_Code + "";
				this.unitId = list.result.EvolveUnit_ID + "";
				this.unitStateCode = list.result.EvolveUnit_State + "";
			} else {
				this.notification("danger", 3000, list.message);
			}
		},
		async geGenericCodeMasterList () {
			let list = await this.$axios
				.$post("/api/v1/eDoa/Requisition/geGenericCodeMasterList", {})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (list.statusCode == 200) {
				this.currencyList = list.result.currencyList;
			} else {
				this.notification("danger", 3000, list.message);
			}
		},

		async getItemDetails () {
			
			if (this.itemId != null && this.itemId !='') {

				let itemDetails = await this.$axios
					.$post("/api/v1/eDoa/Requisition/getItemDetails", {
						EvolveItem_ID: this.itemId,
						EvolveUnit_ID: this.unitId,
						EvolvePRDetails_IsMemoItem:this.isItemActive,
						EvolveItem_Code:this.itemCode,
					})
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				console.log("	async getItemDetails () {==================", itemDetails);
				if (itemDetails.statusCode == 200) {
					this.itemDesc = itemDetails.result.EvolveItem_Desc;
					this.itemCode = itemDetails.result.EvolveItem_Code;
					this.itemUom = itemDetails.result.EvolveUom_Uom;
				} else {
					this.notification("danger", 3000, itemDetails.message);
				}
			} else {
				this.lineTaxClassId = "";
				this.itemDesc = "";
				this.itemCode = "";
				this.itemUom = "";
				this.NeedDate=''
				this.dueDate=''
				this.lineItemMrp = "";
				this.lineAgreementDiscount = "";
				 
			}
		},
		async saveLineData () {
			this.itemQty = this.itemQty.replace(/,/g, "");
			if ((this.itemId != ''&&  this.itemId != null) ||( this.itemCode != '' &&  this.itemCode != null)
			
			&&  this.itemDesc != '' && this.itemDesc != null && this.itemQty != '' &&   this.itemQty != null
			//  && this.itemPrice!=null && this.itemPrice!='' 
			// && this.needDate!=null && this.needDate!=''
			// && this.dueDate!=null && this.dueDate!='' 
			// && this.itemCode != '' &&  this.itemCode != null && this.itemUom != '' && this.itemUom != null
			
			)
				
			// 		this.itemId != "" &&
			// this.itemQty != "" &&
			// this.itemId != null &&
			// this.itemQty != null &&
			// this.itemPrice != null &&
			// this.itemPrice != "" &&
			// this.NeedDate != null &&
			// this.NeedDate != "" &&
			// this.dueDate != null &&
			// this.dueDate != ""
			 {
				if (this.currentLineIndex == null) {
					console.log("ifffffffffffffffffffffffffffffffffffff");
					let itemCode				
					if (this.isItemActive==true){
						 itemCode=this.itemCode
					}
					else{
					 itemCode=this.itemCode
					}
					this.lineDetailList.push({
						EvolvePRDetails_IsMemoItem:this.isItemActive,
						EvolveItem_Code :itemCode,
						EvolveUom_Uom : this.itemUom,
						EvolveItem_Desc: this.itemDesc,
						EvolveItem_ID: this.itemId,
						EvolvePRDetails_LineNo: this.lineDetailList.length + 1,
						EvolvePRDetails_Qty: parseFloat(this.itemQty)
							.toFixed(2)
							.toString()
							.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
						EvolvePRDetails_DueDate: this.dueDate,
						EvolvePRDetails_NeedDate: this.NeedDate,
						EvolvePRDetails_Rmrks: this.addtionalRemarks,
						EvolvePRDetails_ItemTotalPrice: this.totalItemPrice,
						EvolvePRDetails_ItemUnitPrice: this.itemPrice,
					});
				} else {
					console.log("elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
					this.lineDetailList[this.currentLineIndex].EvolveItem_Code =
            this.itemCode;
					this.lineDetailList[this.currentLineIndex].EvolveItem_ID =
            this.itemId;
					this.lineDetailList[this.currentLineIndex].EvolvePRDetails_Qty =
            parseFloat(this.itemQty)
            	.toFixed(2)
            	.toString()
            	.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
					this.lineDetailList[this.currentLineIndex].EvolvePRDetails_NeedDate =
            this.NeedDate;
					this.lineDetailList[this.currentLineIndex].EvolvePRDetails_DueDate =
            this.dueDate;
					this.lineDetailList[this.currentLineIndex].EvolvePRDetails_Rmrks =
            this.addtionalRemarks;
					this.lineDetailList[this.currentLineIndex].EvolveItem_Desc =
            this.itemDesc;
					this.lineDetailList[
						this.currentLineIndex
					].EvolvePRDetails_ItemUnitPrice = this.itemPrice;
					this.lineDetailList[
						this.currentLineIndex
					].EvolvePRDetails_ItemTotalPrice = this.totalItemPrice;
				}
				
				await this.getTotalCustPrice();
				UIkit.modal("#pr_line").hide();
				await this.resetLineDetails();
			} else {
				this.notification(
					"danger",
					3000,
					"Please Fill All Required  Fields line item !"
				);
			}
		},
		async getTotalPrice () {
			if (this.itemQty != "" && this.itemPrice != "") {
				this.totalItemPrice =
          parseFloat(this.itemQty * this.itemPrice)
          	.toFixed(2)
          	.toString()
          	.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "";
			} else {
				this.totalItemPrice = "";
			}

			this.getLineTotalCustPrice();
		},
		async getLineTotalCustPrice () {
			this.itemQty = this.itemQty.replace(/,/g, "");
			this.totalItemPrice = this.totalItemPrice.replace(/,/g, "");
			if (this.itemQty != "" && this.totalItemPrice != "") {
				this.totalCost =
          (parseFloat(this.itemQty) * parseFloat(this.totalItemPrice))
          	.toFixed(2)
          	.toString()
          	.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "";
			} else {
				this.totalCost = "";
			}
		},
		async onDeleteLine (index) {
			this.lineDetailList.splice(index, 1);
			for (let i = index
				; i < this.lineDetailList.length; i++) {
				this.lineDetailList[i].EvolvePRDetails_LineNo -= 1;
			}
		},
		async savePr (action) {
			// alert(this.itemQty)
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Field All Required fields ");
			} else if (this.lineDetailList.length == 0) {
				this.notification("danger", 3000, "Please Add Line Details");
			} else {
				let quoteDetails = {

					EvolvePR_ID: this.prId,
					EvolvePR_NO: this.reqNo,
					EvolveCategory_ID: this.categoryId,
					EvolveAddress_ID: this.shipToAddId,
					EvolvePR_CurrencyID: this.currencyId,
					EvolveSupplier_ID: parseInt(this.supplierID),
					EvolveProject_ID: this.projectId,
					EvolvePR_BuyerID: this.buyerId,
					EvolveUnit_ID: parseInt(this.unitId),
					EvolvePR_Rmrks: this.addtionalRemarks,
					EvolvePR_Status: "SAVED",
					EvolvePRDetails: this.lineDetailList,
					EvolvePR_TotalCost: parseFloat(this.totalCost.replace(/,/g, "")),
					EvolvePR_Date: this.reqDate,
					EvolvePR_EndUserID: this.endUserId,
					EvolvePR_SubAccount: this.subAcc,
					EvolvePR_CostCenter: this.costCenter,
					EvolvePR_NeedDate: this.headerNeedDate,
					EvolvePR_DueDate: this.headerDueDate,
				};
				let savePrDetails = "";

				if (this.prId != "") {
					savePrDetails = await this.$axios
						.$post(
							"/api/v1/eDoa/Requisition/updateRequisitionById",
							quoteDetails
						)
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem with connecting to server!"
							);
						});
				} else {
					savePrDetails = await this.$axios
						.$post(
							"/api/v1/eDoa/Requisition/saveRequisitionDetails",
							quoteDetails
						)
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem with connecting to server!"
							);
						});
				}

				if (savePrDetails.statusCode == 200) {
					if (action) {
						this.notification("success", 3000, savePrDetails.message);
					}
					this.$destroy();
					this.$store.dispatch("removeOneTab", this.pageURL);
					this.$store.dispatch("addNewTab", { url: "/eDoa/Requisition/list" });
				} else {
					this.notification("danger", 3000, savePrDetails.message);
					this.$destroy();
					this.$store.dispatch("removeOneTab", this.pageURL);
					this.$store.dispatch("addNewTab", { url: "/eDoa/Requisition/list" });
				}
			}

			this.isSavedDisabled = false;
		},
		async getTotalCustPrice () {
			let totalCost = 0;
			for (let i = 0; i < this.lineDetailList.length; i++) {
				totalCost += parseFloat(
					this.lineDetailList[
						i
					].EvolvePRDetails_ItemTotalPrice.toString().replace(/,/g, "")
				);
			}

			this.totalCost =
        parseFloat(totalCost)
        	.toFixed(2)
        	.toString()
        	.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "";
		},

		getSinglePrData: async function () {
			let prDetails = await this.$axios
				.$post("/api/v1/eDoa/Requisition/getSinglePrData", {
					EvolvePR_ID: this.prId,
				})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});

			if (prDetails.statusCode == 200) {
				console.log(
					"this.subAc  prDetails.result.prHead[0]>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
					prDetails.result.prHead[0]
				);
				if (prDetails.result.prHead[0].EvolvePR_Status == "SAVED") {
					this.isSubmitAllow = true;
					this.isSaveAllow = true;
					this.isReleaseAllow = false;
				} else if (
					prDetails.result.prHead[0].EvolvePR_Status == "QADSUBMITED" ||
          prDetails.result.prHead[0].EvolvePR_Status == "ERRORQADRELEASE"
				) {
					this.isSaveAllow = false;
					this.isReleaseAllow = true;
					this.isSubmitAllow = false;
				} else if (prDetails.result.prHead[0].EvolvePR_Status == "SUBMITED") {
					this.isSaveAllow = true;
					this.isReleaseAllow = false;
					this.isSubmitAllow = false;
				} else if (
					prDetails.result.prHead[0].EvolvePR_Status == "RELEASED" ||
          prDetails.result.prHead[0].EvolvePR_Status == "APPROVED" ||
          prDetails.result.prHead[0].EvolvePR_Status == "INRELEASE" ||
          prDetails.result.prHead[0].EvolvePR_Status == "QADRELEASED"
				) {
					this.isSaveAllow = false;
					this.isReleaseAllow = false;
					this.isSubmitAllow = false;
				}
				this.approvalMatrixId =
          prDetails.result.prHead[0].EvolveApprovalMatrix_ID + "";
				this.prId = prDetails.result.prHead[0].EvolvePR_ID + "";
				this.reqNo = prDetails.result.prHead[0].EvolvePR_NO + "";
				this.supplierID = prDetails.result.prHead[0].EvolveSupplier_ID + "";

				this.subAcc = prDetails.result.prHead[0].EvolvePR_SubAccount;

				this.costCenter = prDetails.result.prHead[0].EvolvePR_CostCenter;
				this.headerNeedDate = prDetails.result.prHead[0].headerNeedDate + "";
				this.headerDueDate = prDetails.result.prHead[0].headerDueDate + "";
				this.endUserId = prDetails.result.prHead[0].EvolvePR_EndUserID;

				console.log(
					"prDetails.result.prHead[0].EvolveSupplier_ID:",
					prDetails.result.prHead[0].EvolveSupplier_ID,
					"this.supplierID",
					this.supplierID
				);
				this.unitId = prDetails.result.prHead[0].EvolveUnit_ID + "";
				this.shipToAddId = prDetails.result.prHead[0].EvolveAddress_ID + "";
				this.reqDate = prDetails.result.prHead[0].reqDate + "";
				this.addtionalRemarks = prDetails.result.prHead[0].EvolvePR_Rmrks + "";

				this.categoryId = prDetails.result.prHead[0].EvolveCategory_ID + "";
				this.projectId = prDetails.result.prHead[0].EvolveProject_ID + "";
				this.currencyId = prDetails.result.prHead[0].EvolvePR_CurrencyID + "";
				this.buyerId = prDetails.result.prHead[0].EvolvePR_BuyerID + "";
				this.totalCost = prDetails.result.prHead[0].EvolvePR_TotalCost + "";
				this.selectedSupplier =
          prDetails.result.prHead[0].EvolveSupplier_Code +
          "-" +
          prDetails.result.prHead[0].EvolveSupplier_Name;

				await this.getShipToDetails();
				this.selectedSupplier1 = this.selectedSupplier;
				this.selectedShipTo2 = this.selectedShipTo1;
				this.lineDetailList = prDetails.result.prDetails;
			} else {
				this.notification("danger", 3000, prDetails.message);
			}
		},

		getSingleLineDetails: async function (index) {
			this.lineDetailList[index].EvolvePRDetails_Qty = this.lineDetailList[
				index
			].EvolvePRDetails_Qty.toString().replace(/,/g, "");

			this.lineDetailList[index].EvolvePRDetails_ItemTotalPrice =
        this.lineDetailList[
        	index
        ].EvolvePRDetails_ItemTotalPrice.toString().replace(/,/g, "");

			this.lineDetailList[index].EvolvePRDetails_ItemUnitPrice =
        this.lineDetailList[
        	index
        ].EvolvePRDetails_ItemUnitPrice.toString().replace(/,/g, "");

			this.currentLineIndex = index;

			this.itemId = this.lineDetailList[index].EvolveItem_ID + "";
			this.itemQty =
        parseFloat(this.lineDetailList[index].EvolvePRDetails_Qty).toFixed(2) +
        "";
		
			this.NeedDate =
        this.lineDetailList[index].EvolvePRDetails_NeedDate == null
        	? ""
        	: this.lineDetailList[index].EvolvePRDetails_NeedDate + "";
			// this.linePromiseDate = this.lineDetailList[index].EvolveSalesQuoteDetails_PromiseDate == null ? '' : this.lineDetailList[index].EvolveSalesQuoteDetails_PromiseDate+'';
			this.dueDate =
        this.lineDetailList[index].EvolvePRDetails_DueDate == null
        	? ""
        	: this.lineDetailList[index].EvolvePRDetails_DueDate + "";

			this.itemCode = this.lineDetailList[index].EvolveItem_Code + "";
			this.itemPrice = this.lineDetailList[index].EvolvePRDetails_ItemUnitPrice;
			this.totalItemPrice =
        this.lineDetailList[index].EvolvePRDetails_ItemTotalPrice + "";

			this.lineDetailList[index].EvolvePRDetails_Qty = parseFloat(
				(this.lineDetailList[index].EvolvePRDetails_Qty + "").replace(
					/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
					""
				)
			);
			 this.isItemActive = this.lineDetailList[index].EvolvePRDetails_IsMemoItem
			await this.getItemDetails();
			UIkit.modal("#pr_line").show();
		},

		async getShipToDetails () {
			if (this.shipToAddId != "" && this.shipToAddId !=undefined && this.shipToAddId !=null) {
				let details = await this.$axios
					.$post("/api/v1/eDoa/Requisition/getShipToDetails", {
						EvolveShipToUnit_ID: this.shipToAddId,
						// EvolveAddress_ID
						// EvolveShipTo_ID
					})
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				if (details.statusCode == 200) {
					
					this.shipToAdress =
            (details.result.EvolveUnit_Addr == null
            	? ""
            	: details.result.EvolveUnit_Addr) +
            " " +
			  (details.result.EvolveUnit_Addr1 == null
            	? ""
            	: details.result.EvolveUnit_Addr1) +
            " " +
            (details.result.EvolveUnit_Addr2 == null
            	? ""
            	: details.result.EvolveUnit_Addr2) +
            " " +
          
            (details.result.EvolveUnit_City == null
            	? ""
            	: details.result.EvolveUnit_City);
					this.shipToDetails = "Ship TO : " + this.shipToAdress;
					this.selectedShipTo =
            details.result.EvolveUnit_Code +
            " " +
            details.result.EvolveAddress_SearchName;
					this.selectedShipTo1 = details.result.EvolveUnit_Code;
				} else {
					this.notification("danger", 3000, details.message);
				}
			}
		},

		async onChangeCategory () {
			if (this.categoryId != "") {
				let reqNo = await this.$axios
					.$post("/api/v1/eDoa/Requisition/getReqSerialNo", {
						EvolveCategory_ID: this.categoryId,
					})
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});

				if (reqNo.statusCode == 200) {
					this.reqNo = reqNo.result;
					// console.log("this.reqNo", this.reqNo);
				} else {
					this.notification("danger", 3000, reqNo.message);
				}
			} else {
				this.reqNo = "";
			}
		},
	},
};
</script>
<style lang="scss">
.directory-table-scroll.small-first-col td:first-child,
.directory-table-scroll.small-first-col th:first-child {
  flex-basis: 20%;
  flex-grow: 1;
}
.directory-table-scroll {
  /*width:100%; */
  display: block;
  empty-cells: hide;
}

.directory-table-scroll thead {
  position: relative;
  display: block;
  width: 100%;
  overflow-y: scroll;
}

.directory-table-scroll tbody {
  /* Position */
  display: block;
  position: relative;
  width: 100%;
  overflow-y: scroll;
}

.directory-table-scroll tr {
  width: 100%;
  display: flex;
}

.directory-table-scroll td,
.directory-table-scroll th {
  flex-basis: 100%;
  flex-grow: 2;
  display: block;
  /* padding: 1rem; */
  text-align: center;
}
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>
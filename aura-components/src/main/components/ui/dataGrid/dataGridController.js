/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
({
	init: function (cmp, evt, hlp) {
		var modelItemsKey, items;
		
		// Use for loading logic. 
		cmp._hasDataProvider = cmp._dataProviders && cmp._dataProviders.length > 0;

		// Attempt to extract the initial set of items. 
		if (cmp._hasDataProvider) {
			modelItemsKey = cmp._dataProviders[0].get('v.modelItemsKey');	

			if (modelItemsKey) {
				items = cmp.get('v.dataProvider.0.m.' + modelItemsKey);
			}
		}

		// Set the initial items and then fire provide against 
		// the dataProvider to configure paging.
		if (items) {
			cmp.setValue('v.items', items);	
		}

		// Dynamically build rowTemplate and rows.
		hlp.initializeColumns(cmp);
		hlp.constructSummaryRow(cmp);
		hlp.deriveItemShape(cmp);
		hlp.constructTable(cmp); 
	},

	handleRerenderComplete: function (cmp, evt, hlp) {
		var concrete = cmp.getConcreteComponent();
		
		if (concrete._sorting) {
			concrete._sorting = false;
		}
	},

	handleItemsChange: function (cmp, evt, hlp) {
		hlp.handleItemsChange(cmp, evt.getParams());
		if (concrete._sorting) {
			concrete._sorting = false;
		}
	},

	handleItemsChange: function (cmp, evt, hlp) {
		hlp.handleItemsChange(cmp, evt.getParams());
	},

	handleColumnSortChange: function (cmp, evt, hlp) {
		var concrete; 

		if (evt) {
			concrete = cmp.getConcreteComponent();

			concrete._sorting = true;
			cmp.setValue('v.sortBy', evt);

			// 'Fire' action to reset selection.
			hlp.handleAction(concrete, {
				name 	: 'dataGrid:select',
				value 	: false
			});
		}
	},

	handleClick: function (cmp, evt, hlp) {
		var name, index, value, globalId, item;

		if (evt.target && evt.target.className === 'action') {
			hlp.handleAction(cmp, {
				name 		: $A.util.getDataAttribute(evt.target, 'action-name'),
				index   	: $A.util.getDataAttribute(evt.target, 'item-index'),
				value 		: $A.util.getDataAttribute(evt.target, 'action-value'),
				globalId 	: $A.util.getDataAttribute(evt.target, 'action-global-id')
			});
		}
	},

	onitemchange: function (cmp, evt, hlp) {
		var item; 

		if (evt) {
			// Write through changed value.
			item = cmp.getValue('v.items.' + evt.index);
			item.getValue(evt.column).setValue(evt.value);

			// TODO: check for required fields!

			cmp.get('v.dataWriter')[0].getSuper().getValue('v.items').push({ 
				operation	: 'save', 
				record		: item.unwrap()
			});
		}
	}
})
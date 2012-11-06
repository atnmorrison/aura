/*
 * Copyright (C) 2012 salesforce.com, inc.
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
/*jslint sub: true */
/**
 * @namespace The local storage adapter for storage service implementation
 * @constructor
 */
var LocalStorageAdapter = function LocalStorageAdapter() {
};

LocalStorageAdapter.prototype.getName = function() {
	return "local";
};

LocalStorageAdapter.prototype.getItem = function(key) {
	var json = window.localStorage.getItem(key);
	return json ? $A.util["json"].decode(json) : undefined;
};

LocalStorageAdapter.prototype.setItem = function(key, value) {
	if (!value) {
		this.removeItem(key);
	} else {
		var json = $A.util["json"].encode(value);
		window.localStorage.setItem(key, json);
	}
};

LocalStorageAdapter.prototype.removeItem = function(key) {
	window.localStorage.removeItem(key);
};


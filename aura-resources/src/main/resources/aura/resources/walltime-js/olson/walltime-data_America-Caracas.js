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
(function() {
    window.WallTime || (window.WallTime = {});
    window.WallTime.data = {
        rules: {},
        zones: {"America/Caracas":[{"name":"America/Caracas","_offset":"-4:27:44","_rule":"-","format":"LMT","_until":"1890"},{"name":"America/Caracas","_offset":"-4:27:40","_rule":"-","format":"CMT","_until":"1912 Feb 12"},{"name":"America/Caracas","_offset":"-4:30","_rule":"-","format":"VET","_until":"1965"},{"name":"America/Caracas","_offset":"-4:00","_rule":"-","format":"VET","_until":"2007 Dec 9 03:00"},{"name":"America/Caracas","_offset":"-4:30","_rule":"-","format":"VET","_until":""}]}
    };
    window.WallTime.autoinit = true;
}).call(this);
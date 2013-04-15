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
 * A base class for a Aura Action to be passed to an associated component. An
 * Action is created in a client-side or server-side controller. Invoke a
 * client-side Action in a controller by declaring cmp.get("c.actionName"). Call
 * a server-side controller from a client-side controller.
 *
 * @constructor
 * @param {Object}
 *            def The definition of the Action.
 * @param {Function}
 *            method The method for the Action. For client-side Action only. A
 *            function to serialize the Action as a String in the JSON
 *            representation.
 * @param {Object}
 *            paramDefs The parameter definitions for the Action.
 * @param {Object}
 *            cmp The component associated with the Action.
 */
var Action = function Action(def, method, paramDefs, cmp) {
    this.def = def;
    this.meth = method;
    this.paramDefs = paramDefs;
    this.cmp = cmp;
    this.params = {};
    this.state = "NEW";
};

Action.prototype.nextActionId = 1;
Action.prototype.auraType = "Action";

/**
 * Gets the Action Id.
 *
 * @private
 * @returns {String}
 */
Action.prototype.getId = function() {
    if (!this.id) {
        this.id = (Action.prototype.nextActionId++) + "." + $A.getContext().getNum();
    }

    return this.id;
};

/**
 * Gets the next action scoped Id.
 *
 * @private
 * @returns {String}
 */
Action.prototype.getNextGlobalId = function() {
    if (!this.nextGlobalId) {
        this.nextGlobalId = 1;
    }

    return this.nextGlobalId++;
};

/**
 * Gets the ActionDef object. Shorthand: get("def")
<<<<<<< HEAD
 *
=======
 *
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 * @returns {ActionDef}
 */
Action.prototype.getDef = function() {
    return this.def;
};

/**
 * Sets parameters for the Action. Maps key in paramDefs to config.
<<<<<<< HEAD
 *
 * @param {Object}
 *            config The parameters for the Action.
=======
 *
 * @param {Object} config The parameters for the Action.
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 */
Action.prototype.setParams = function(config) {
    var paramDefs = this.paramDefs;
    for ( var key in paramDefs) {
        this.params[key] = config[key];
    }
};

/**
 * Gets an Action parameter.
<<<<<<< HEAD
 *
 * @param {String}
 *            name The name of the Action parameter.
=======
 *
 * @param {String} name The name of the Action parameter.
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 * @returns {Array}
 */
Action.prototype.getParam = function(name) {
    return this.params[name];
};

/**
 * Gets the collection of parameters for this Action.
<<<<<<< HEAD
 *
=======
 *
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 * @returns {Object}
 */
Action.prototype.getParams = function() {
    return this.params;
};

/**
 * Gets the component for this Action.
<<<<<<< HEAD
 *
=======
 *
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 * @private
 */
Action.prototype.getComponent = function() {
    return this.cmp;
};

/**
<<<<<<< HEAD
 * Sets the callback function that is executed after the server-side Action
 * returns.<br/> Call a server-side controller from a client-side controller
 * using callback.<br/>
 *
 * @param {Object}
 *            scope The scope in which the function is executed.
 * @param {Function}
 *            callback The callback function to run for each controller.
=======
 * Sets the callback function that is executed after the server-side Action returns.<br/> Call a server-side controller
 * from a client-side controller using callback.<br/>
 *
 * @param {Object} scope The scope in which the function is executed.
 * @param {Function} callback The callback function to run for each controller.
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 */
Action.prototype.setCallback = function(scope, callback) {
    this.callbackScope = scope;
    this.callback = callback;
};

/**
<<<<<<< HEAD
 * Runs the Action. Checks that the event is client-side before running.<br/>
 * For server-side Actions, use runAfter() instead.<br/>
 *
 * @param {Event}
 *            evt The event that calls the Action.
 */
Action.prototype.run = function(evt) {
    $A.assert(this.def.isClientAction(), "Run() cannot be called on a server action. Use runAfter() on a server action instead.");
    this.state = "RUNNING";
    var finished = false;
    try {
        var helper = this.cmp.getDef().getHelper();
        this.meth.call(this, this.cmp, evt, helper);
        finished = true;
    } catch (e) {
        $A.log("Action failed: " + this.cmp.getDef().getDescriptor().getQualifiedName() + " -> " + this.getDef().getName(), e);
    } finally {
        if (!finished) {
            this.state = "FAILURE";
        }
    }
};

/**
 * Gets the current state of the Action. Possible values are "NEW", "RUNNING",
 * and "FAILURE". <br/>
 *
=======
 * Runs the Action. Checks that the event is client-side before running.<br/> For server-side Actions, use runAfter()
 * instead.<br/>
 *
 * @param {Event} evt The event that calls the Action.
 */
Action.prototype.run = function(evt) {
    $A.assert(this.def.isClientAction(), "Run() cannot be called on a server action. Use runAfter() on a server action instead.");
    this.state = "RUNNING";
    var finished = false;
    try {
        var helper = this.cmp.getDef().getHelper();
        this.meth.call(this, this.cmp, evt, helper);
        finished = true;
    } catch (e) {
        $A.log("Action failed: " + this.cmp.getDef().getDescriptor().getQualifiedName() + " -> " + this.getDef().getName(), e);
    } finally {
        if (!finished) {
            this.state = "FAILURE";
        }
    }
};

/**
 * Gets the current state of the Action. Possible values are "NEW", "RUNNING", and "FAILURE". <br/>
 *
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 * @returns {String}
 */
Action.prototype.getState = function() {
    return this.state;
};

/**
<<<<<<< HEAD
 * Gets the return value of the Action. A server-side Action can return any
 * object containing serializable JSON data.<br/>
=======
 * Gets the return value of the Action. A server-side Action can return any object containing serializable JSON data.<br/>
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 */
Action.prototype.getReturnValue = function() {
    return this.returnValue;
};

/**
<<<<<<< HEAD
 * Returns an error object with a message field, or in development modes, a
 * stack field. For server-side Action only.
 *
=======
 * Returns an error object with a message field, or in development modes, a stack field. For server-side Action only.
 *
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 * @public
 */
Action.prototype.getError = function() {
    return this.error;
};

/**
<<<<<<< HEAD
 * Adds the server-side action to the queue. Checks that the event is
 * server-side before enqueuing.<br/> For client-side Action, use run()
 * instead.<br/>
 *
 * @param {Action}
 *            action The action to run after the function.
=======
 * Adds the server-side action to the queue. Checks that the event is server-side before enqueuing.<br/> For
 * client-side Action, use run() instead.<br/>
 *
 * @param {Action} action The action to run after the function.
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 */
Action.prototype.runAfter = function(action) {
    $A.assert(action.def.isServerAction(), "RunAfter() cannot be called on a client action. Use run() on a client action instead.");
    $A.services.event.enqueueAction(action);
};

/**
 * Returns a response function if the Action is complete.
<<<<<<< HEAD
 *
=======
 *
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 * @private
 * @param {Object}
 *            response
 */
Action.prototype.complete = function(response) {
<<<<<<< HEAD
    this.sanitizeStoredResponse(response);

    this.state = response["state"];
    this.returnValue = response.returnValue;
    this.error = response.error;
    this.storage = response["storage"];

    var completeAction = true;
    if (this.originalResponse) {
        // Compare the refresh response with the original response and only
        // complete the action if they differ
        var originalValue = $A.util.json.encode(this.originalResponse["returnValue"]);
        var refreshedValue = $A.util.json.encode(response["returnValue"]);
        if (refreshedValue === originalValue) {
            var originalComponents = $A.util.json.encode(this.originalResponse["components"]);
            var refreshedComponents = $A.util.json.encode(response["components"]);
            if (refreshedComponents === originalComponents) {
                completeAction = false;

                var storageService = this.getStorage();
                storageService.log("Action.complete(): no change in refresh action response, skipping replay.", this);

                this.fireRefreshEvent(this, this.getComponent(), "refreshEnd");
            }
        }
    }

    var context = $A.getContext();
    var previous = context.setCurrentAction(this);
    try {
        var components = response["components"];

        if (completeAction) {
            // Add in any Action scoped components /or partial configs
            if (components) {
                context.joinComponentConfigs(components);
            }

            if (this.callback && (this.cmp === undefined || this.cmp.isValid())) {
                this.callback.call(this.callbackScope, this);
            }
        }

        var storage = this.getStorage();
        if (storage && this._isStorable() && this.getState() === "SUCCESS") {
            var storageName = storage.getName();
            var key = this.getStorageKey();
            if (!this.storage) {
                // Rewrite any embedded ComponentDef from object to descriptor
                // only
                for ( var globalId in components) {
                    var c = components[globalId];
                    if (c) {
                        var def = c["componentDef"];
                        c["componentDef"] = {
                            "descriptor" : def["descriptor"]
                        };
                    }
                }

                var stored = {
                    "returnValue" : response.returnValue,
                    "components" : components,
                    "state" : "SUCCESS",
                    "storage" : {
                        "name" : storageName,
                        "created" : new Date().getTime()
                    }
                };

                storage.put(key, stored);
            } else {
                // Initiate auto refresh if configured to do so
                this.refresh(response);
            }
        }
    } finally {
        context.setCurrentAction(previous);
    }
=======
    this.sanitizeStoredResponse(response);

    this.state = response["state"];
    this.returnValue = response.returnValue;
    this.error = response.error;
    this.storage = response["storage"];

    var context = $A.getContext();
    var previous = context.setCurrentAction(this);
    try {
        // Add in any Action scoped components /or partial configs
        var components = response["components"];
        if (components) {
            context.joinComponentConfigs(components);
        }

        if (this.callback && (this.cmp === undefined || this.cmp.isValid())) {
            this.callback.call(this.callbackScope, this);
        }

        var storage = this.getStorage();
        if (storage && this._isStorable() && this.getState() === "SUCCESS") {
            var storageName = storage.getName();
            var key = this.getStorageKey();
            if (!this.storage) {
                // Rewrite any embedded ComponentDef from object to descriptor only
                for ( var globalId in components) {
                    var c = components[globalId];
                    if (c) {
                        var def = c["componentDef"];
                        c["componentDef"] = {
                            "descriptor" : def["descriptor"]
                        };
                    }
                }

                var stored = {
                    "returnValue" : response.returnValue,
                    "components" : components,
                    "state" : "SUCCESS",
                    "storage" : {
                        "name" : storageName,
                        "created" : new Date().getTime()
                    }
                };

                storage.put(key, stored);
            } else {
                // DCHASMAN TODO Just update the last accessed timestamp for the item
                // storage.log("Updating last accessed timestamp for action in " + storageName + " storage adapter",
                // key);

                // Initiate auto refresh if configured to do so
                this.refresh();
            }
        }
    } finally {
        context.setCurrentAction(previous);
    }
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
};

/**
 * Marks the Action as abortable. For server-side Actions only.
 */
Action.prototype.setAbortable = function() {
    this.abortable = true;
};

/**
 * Checks if the function is abortable. For server-side Action only.
<<<<<<< HEAD
 *
=======
 *
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 * @returns {Boolean} The function is abortable (true), or false otherwise.
 */
Action.prototype.isAbortable = function() {
    return this.abortable || false;
};

/**
<<<<<<< HEAD
 * An exclusive Action is processed on an XMLHttpRequest of its own.
 * a.setExclusive(true) and a.setExclusive() are the same. <br/> For server-side
 * Action only.
 *
 * @param {Object}
 *            val
=======
 * An exclusive Action is processed on an XMLHttpRequest of its own. a.setExclusive(true) and a.setExclusive() are the
 * same. <br/> For server-side Action only.
 *
 * @param {Object} val
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 * @returns {Boolean} The value is exclusive (true), or false otherwise.
 */
Action.prototype.setExclusive = function(val) {
    this.exclusive = val === undefined ? true : val;
};

/**
 * Returns true if a given function is exclusive, or false otherwise.
<<<<<<< HEAD
 *
=======
 *
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 * @returns {Boolean}
 */
Action.prototype.isExclusive = function() {
    return this.exclusive || false;
};

/**
 * Marks the Action as storable and abortable. For server-side Actions only.
<<<<<<< HEAD
 *
 * @param {Object}
 *            config Optional. A set of key/value pairs that specify the storage
 *            options to set. You can set the following options: ignoreExisting
 *            and refresh.
=======
 *
 * @param {Object} config Optional. A set of key/value pairs that specify the storage options to set. You can set the
 *        following options: ignoreExisting and refresh.
>>>>>>> 1525c91... Aura framework changes to support transactions using Jiffy Transaction API
 */
Action.prototype.setStorable = function(config) {
    $A.assert(this.def.isServerAction(), "setStorable() cannot be called on a client action.");
    this.storable = true;
    this.storableConfig = config;

    // Storable actions must also be abortable (idempotent, replayable and
    // non-mutating)
    this.setAbortable();
};

/**
 * Checks if the function is storable. For server-side Action only.
 *
 * @returns {Boolean} The function is storable (true), or false otherwise.
 */
Action.prototype.isStorable = function() {
    var ignoreExisting = this.storableConfig && this.storableConfig["ignoreExisting"];
    return this._isStorable() && !ignoreExisting;
};

Action.prototype._isStorable = function() {
    return this.storable || false;
};

/**
 * Gets the storage key in name-value pairs.
 *
 * @private
 */
Action.prototype.getStorageKey = function() {
    return this.getDef().getDescriptor().toString() + ":" + $A.util["json"].encode(this.getParams());
};

/**
 * Checks if the object is from the current storage.
 */
Action.prototype.isFromStorage = function() {
    return !$A.util.isUndefinedOrNull(this.storage);
};

/**
 * Chains a function to run after this Action. For server-side Action only.
 */
Action.prototype.setChained = function() {
    this.chained = true;
    this.runAfter(this);
};

/**
 * Returns true if a given function is chained, or false otherwise. For
 * server-side Action only.
 *
 * @private
 * @returns {Boolean}
 */
Action.prototype.isChained = function() {
    return this.chained || false;
};

/**
 * Returns the key/value pair of the Action id, descriptor, and parameters in
 * JSON format.<br/>
 */
Action.prototype.toJSON = function() {
    return {
        "id" : this.getId(),
        "descriptor" : this.getDef().getDescriptor(),
        "params" : this.getParams()
    };
};

/**
 * Refreshes the Action. Used with storage.
<<<<<<< HEAD
 *
 * @private
 */
Action.prototype.refresh = function(originalResponse) {
    // If this action was served from storage let's automatically try to get the
    // latest from the server too
    var storage = this.storage;
    if (storage) {
        var storageService = this.getStorage();
        var autoRefreshInterval = this.storableConfig ? this.storableConfig["refresh"] * 1000 : storageService.getDefaultAutoRefreshInterval();

        // Only auto refresh if the data we have is more than
        // v.autoRefreshInterval seconds old
        var now = new Date().getTime();
        var action = this;
        if ((now - storage["created"]) > autoRefreshInterval) {
            storageService.log("Action.refresh(): auto refresh begin", action);

            var cmp = action.getComponent();
            this.fireRefreshEvent(action, cmp, "refreshBegin");

            var refreshAction = action.getDef().newInstance(cmp);
            refreshAction.setCallback(action.callbackScope, action.callback);
            refreshAction.setParams(action.params);
            refreshAction.setStorable({
                "ignoreExisting" : true
            });

            refreshAction.sanitizeStoredResponse(originalResponse);
            refreshAction.originalResponse = originalResponse;

            var originalCallbackScope = action.callbackScope;
            var originalCallback = action.callback;

            refreshAction.setCallback(originalCallbackScope, function(a) {
                if (originalCallback) {
                    // Chain to the original callback to let it do its thing
                    originalCallback.call(originalCallbackScope, a);
                }

                a.fireRefreshEvent(a, cmp, "refreshEnd");

                storageService.log("Action.refresh(): auto refresh end", a);
            });

            action.runAfter(refreshAction);
        }
    }
};

/**
 * Sanitize generation number references to allow actions to be replayed w/out
 * globalId conflicts.
 *
 * @private
 */
Action.prototype.sanitizeStoredResponse = function(response) {
    var santizedComponents = {};

    var globalId;
    var suffix = this.getId();
    var components = response["components"];
    for (globalId in components) {
        var newGlobalId = globalId.substr(0, globalId.indexOf(":") + 1) + suffix;

        // Rewrite the globalId
        var c = components[globalId];
        c["globalId"] = newGlobalId;

        santizedComponents[newGlobalId] = c;
    }

    response["components"] = santizedComponents;

    var returnValue = response["returnValue"];
    if (returnValue) {
        globalId = returnValue["globalId"];
        if (globalId) {
            returnValue["globalId"] = globalId.substr(0, globalId.indexOf(":") + 1) + suffix;
        }
    }
};

/**
 * Gets the Action storage.
 *
 * @private
 * @returns {Storage}
 */
Action.prototype.getStorage = function() {
    return $A.storageService.getStorage("actions");
};

/**
 * @private
 */
Action.prototype.fireRefreshEvent = function(action, cmp, event) {
    if (cmp) {
        var isRefreshObserver = cmp.isInstanceOf("auraStorage:refreshObserver");
        if (isRefreshObserver) {
            // If our component implements auraStorage:refreshObserver then let
            // it know that refreshing has started
            cmp.getEvent(event).setParams({
                "action" : action
            }).fire();
        }
    }
};

// #include aura.controller.Action_export

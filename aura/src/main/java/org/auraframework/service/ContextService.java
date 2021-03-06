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
package org.auraframework.service;

import java.util.Set;

import org.auraframework.def.AttributeDef;
import org.auraframework.def.BaseComponentDef;
import org.auraframework.def.DefDescriptor;
import org.auraframework.def.Definition;
import org.auraframework.system.AuraContext;
import org.auraframework.system.AuraContext.Access;
import org.auraframework.system.AuraContext.Format;
import org.auraframework.system.AuraContext.Mode;
import org.auraframework.system.SourceLoader;
import org.auraframework.throwable.quickfix.QuickFixException;

/**
 * <p>
 * Service for creating or interacting with a {@link AuraContext} A AuraContext
 * must be started before working using any other service.
 * </p>
 * <p>
 * Instances of all AuraServices should be retrieved from {@link Aura}
 * </p>
 */
public interface ContextService extends AuraService {

    /**
     * Start a AuraContext with the given Mode, Format, and Access
     */
    AuraContext startContext(Mode mode, Format format, Access access, DefDescriptor<? extends BaseComponentDef> appDesc);

    /**
     * Start a AuraContext and include these extra source loaders
     * 
     * @throws QuickFixException
     */
    AuraContext startContext(Mode mode, Set<SourceLoader> loaders, Format format, Access access,
            DefDescriptor<? extends BaseComponentDef> appDesc) throws QuickFixException;

    /**
     * Start a AuraContext with the given Mode, Format, and Access
     */
    AuraContext startContext(Mode mode, Format format, Access access);

    /**
     * Start a AuraContext and include these extra source loaders
     * 
     * @throws QuickFixException
     */
    AuraContext startContext(Mode mode, Set<SourceLoader> loaders, Format format, Access access)
            throws QuickFixException;

    /**
     * Start a AuraContext and include debug tool usage
     */
    AuraContext startContext(Mode mode, Format format, Access access,
                    DefDescriptor<? extends BaseComponentDef> appDesc, boolean isDebugToolEnabled);
	
    /**
     * Start a AuraContext and include extra source loaders and debug tool usage
     */
    AuraContext startContext(Mode mode, Set<SourceLoader> loaders,
                    Format format, Access access,
                    DefDescriptor<? extends BaseComponentDef> appDesc,
                    boolean isDebugToolEnabled);
	
    /**
     * Close the current AuraContext, no matter which type it is.
     */
    void endContext();

    /**
     * Push a 'system-only' context used for private rendering.
     *
     * This call may only be used once a context has been established. Once you push the
     * server context, you must always popServerContext(). (i.e. with a try {} finally {}.
     * Anything done within the system context will not be serialized to the client.
     *
     * @return the system context in force.
     */
    AuraContext pushSystemContext();

    /**
     * Pop a system context previously pushed.
     */
    void popSystemContext();

    /**
     * Get the current context if there is one. Throws a runtime exception if
     * one is not established.
     */
    AuraContext getCurrentContext();

    /**
     * Check if there is there a {@link AuraContext} currently established
     */
    boolean isEstablished();

    /**
     * Throw a RuntimeException if no context is currently established.
     */
    void assertEstablished();
}

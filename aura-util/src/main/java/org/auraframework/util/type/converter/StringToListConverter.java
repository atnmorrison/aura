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
package org.auraframework.util.type.converter;

import java.util.ArrayList;
import java.util.List;

import org.auraframework.util.type.Converter;

/**
 * Used by aura.util.type.TypeUtil
 */
@SuppressWarnings("rawtypes")
public class StringToListConverter implements Converter<String, List> {

    @Override
    public List<String> convert(String value) {
        List<String> ret = new ArrayList<String>();
        ret.add(value);
        return ret;
    }

    @Override
    public Class<String> getFrom() {
        return String.class;
    }

    @Override
    public Class<List> getTo() {
        return List.class;
    }

    @Override
    public Class<?>[] getToParameters() {
        return null;
    }

}

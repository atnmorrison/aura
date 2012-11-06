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
package org.auraframework.util.javascript;

import java.io.*;
import java.util.*;

/**
 * Implementation of the common stuff shared between the main javascript library in sfdc and the new directive based javascript groups
 *
 *
 *
 */
public abstract class CommonJavascriptGroupImpl implements JavascriptGroup {

    protected final String name;
    protected final File root;
    protected SortedSet<File> files;
    protected long lastMod = -1;

    public CommonJavascriptGroupImpl(String name, File root) {
        this.name = name;
        this.root = root;
        this.files = new TreeSet<File>();
    }

    /**
     * clears the files and lastmod for reparsing
     */
    protected void reset() {
        this.files.clear();
        this.lastMod = -1;
    }

    @Override
    public long getLastMod() {
        return lastMod;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Set<File> getFiles() {
        return files;
    }

    protected void addFile(File f) {
        lastMod = Math.max(lastMod, f.lastModified());
        files.add(f);
    }

    @Override
    public File addFile(String s) throws IOException {
        File f = new File(root, s);
        if (!f.exists() || !f.isFile() || !f.getName().endsWith(".js")) {
            throw new FileNotFoundException("File did not exist or was not a .js file: " + f.getAbsolutePath());
        }
        addFile(f);
        return f;
    }

    @Override
    public File addDirectory(String s) throws IOException {
        File dir = new File(root, s);
        if (!dir.exists() || !dir.isDirectory()) {
            throw new FileNotFoundException("Directory did not exist: " + s);
        }
        addDirectory(dir);
        return dir;
    }

    private void addDirectory(File dir) {
        for (File f : dir.listFiles(JS_FILTER)) {
            if (f.isDirectory()) {
                addDirectory(f);
            } else {
                addFile(f);
            }
        }
    }

    public static final FileFilter JS_FILTER = new FileFilter() {
        @Override
        public boolean accept(File dir) {
            return dir.isDirectory() || dir.getName().endsWith(".js");
        }
    };
}

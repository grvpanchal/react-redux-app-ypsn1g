const SystemJS = require('systemjs');
// const url = require('url');
const importMap = require('../importmap.json');

global.require = require;
const { applyImportMap, setBaseUrl } = SystemJS;
// const basePath = url.pathToFileURL(process.cwd()).href;
// setBaseUrl(global.System, basePath);
applyImportMap(global.System, {
    imports: {
        ...importMap.imports,
        "@mfe/hello": "./build/static/js/mfe-hello.js",
        "@mfe/app": "./build/server/server.system.js",
    }});
const System = global.System = SystemJS.System;

global.System.import('@mfe/app');

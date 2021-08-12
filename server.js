const fs = require('fs')
const express = require('express')
const { createStore } = require('redux');
const url = require('url');
const SystemJS = require('systemjs');

const { rootReducer } = require('./server.config');
const importMap = require('./public/importmap.json');

const store = createStore(rootReducer);

global.System = SystemJS.System;
const { applyImportMap, setBaseUrl } = SystemJS;
const basePath = url.pathToFileURL(process.cwd()).href;
setBaseUrl(global.System, basePath);
applyImportMap(global.System, importMap);

const port = 3000
const app = express()
app.use(express.static('build', { index: false }))

const indexHTML = fs.readFileSync('./public/index.html', { encoding: 'utf8', flag: 'r' });

app.get('/', async (req, res) => {
    const AppJs = await global.System.import('@mfe/app');
    const { default: React } = await global.System.import('react');
    const { renderToString } = await global.System.import('react-dom/server');
    const AppElement = React.createElement(AppJs.default, { store });
    const outputReactDom = renderToString(AppElement);
    const outputHTML = indexHTML
        .replace(
            /(<div id="root"><\/div>)/igm,
            `
            <div id="root">${outputReactDom}</div>
            <script type="systemjs-module" src="/static/js/main.system.js"></script>
        `);
    
    res.send(outputHTML)
})

app.listen(port, () => {
  console.log(`SystemJS SSR app listening at http://localhost:${port}`)
})
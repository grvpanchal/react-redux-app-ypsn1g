const fs = require('fs')
const express = require('express')
const React = require('react');
const url = require('url');
const SystemJS = require('systemjs');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');

const importMap = require('./public/importmap.json');

global.System = SystemJS.System;
const { applyImportMap, setBaseUrl } = SystemJS;

const basePath = url.pathToFileURL(process.cwd()).href;
setBaseUrl(global.System, basePath);

applyImportMap(global.System, importMap);


const app = express()
app.use(express.static('build', {
    index: false
}))
const port = 3000

app.use(express.static('build', {
    index: false
}))

const indexHTML = fs.readFileSync('./public/index.html',{ encoding:'utf8', flag:'r'});

app.get('/', async (req, res) => {
    const AppJs = await global.System.import('@mfe/app');
    const AppEle = React.createElement(AppJs.default);
    const ReduxProvider = React.createElement(Provider, { store: AppJs.store }, AppEle);
    const outputReactDom = renderToString(ReduxProvider);
    const outputHTML = indexHTML
        .replace(
            /(<div id="root"><\/div>)/igm,
            `
            <div id="root">
                ${outputReactDom}
            </div>
            <script type="systemjs-module" src="/static/js/main.system.js"></script>
        `);
    
  res.send(outputHTML)
})

app.listen(port, () => {
  console.log(`SystemJS SSR app listening at http://localhost:${port}`)
})
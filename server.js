const express = require('express')
const React = require('react');
const url = require('url');
const SystemJS = require('systemjs');
// const { createStore, combineReducers } = require('redux');
const { Provider } = require('react-redux');
// const { StaticRouter } = require('react-router-dom');
const { renderToString } = require('react-dom/server');

global.System = SystemJS.System;
const { applyImportMap, setBaseUrl } = SystemJS;

const basePath = url.pathToFileURL(process.cwd()).href;
console.log(basePath);
setBaseUrl(global.System, basePath);

applyImportMap(global.System, {
    imports: {
        react: 'https://cdn.jsdelivr.net/npm/@esm-bundle/react@16.14.0/system/react.development.js',
        'react-dom': 'https://cdn.jsdelivr.net/npm/@esm-bundle/react-dom@16.14.0/system/react-dom.development.js',
        '@mfe/app': './build/static/js/mfe-app.system.js',
    },
});


const app = express()
app.use(express.static('build', {
    index: false
}))
const port = 3000

app.use(express.static('build', {
    index: false
}))

app.get('/', async (req, res) => {
    const AppJs = await global.System.import('@mfe/app');
    const AppEle = React.createElement(AppJs.default);
    const ReduxProvider = React.createElement(Provider, { store: AppJs.store }, AppEle);
    const outputReactDom = renderToString(ReduxProvider);
    const outputHTML = `
<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Title Page</title>

        <!-- Bootstrap CSS -->
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.min.js"></script>

        <script type="systemjs-importmap">
            {
                "imports": {
                "react": "https://cdn.jsdelivr.net/npm/@esm-bundle/react@16.14.0/system/react.development.js",
                "react-dom": "https://cdn.jsdelivr.net/npm/@esm-bundle/react-dom@16.14.0/system/react-dom.development.js",
                "@mfe/app": "http://localhost:3000/static/js/mfe-app.system.js"
                }
            }
            </script>

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.3/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <div id="root">${outputReactDom}</div>
        <script type="systemjs-module" src="/static/js/main.system.js"></script>
    </body>
</html>
    `
  res.send(outputHTML)
})

app.listen(port, () => {
  console.log(`SystemJS SSR app listening at http://localhost:${port}`)
})
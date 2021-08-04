const React = require('react');
const url = require('url');
const SystemJS = require('systemjs');
const { Provider } = require('react-redux');
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
        '@mbp/pwa-app': './build/static/js/mfe-app.system.js',
        '@mbp/checkout': './server/react-hello-world.js',
    },
});

global.System.import('@mbp/pwa-app')
    .then((m) => {
        if (m && m.default) {
            console.log('================================================');
            console.log('The build of SystemJS is intact');
            console.log('================================================');
            console.dir(m);

            const AppJs = m;
            const AppEle = React.createElement(AppJs.default);
            const ReduxProvider = React.createElement(Provider, { store: AppJs.store }, AppEle);
            const rendered = renderToString(ReduxProvider);
            console.log('rendered', rendered);
        }
    })
    .catch((e) => console.error(e));

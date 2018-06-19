/* @flow */
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { StaticRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import routes from './routes.js';
import { AccountReducer } from './reducers/account';

const store = createStore(
	combineReducers({
		account: AccountReducer
	}),
);

const renderStatic = (url : string) : string => `
<html>
    <head>
        <title>Hello World</title>
        <link href="https://unpkg.com/basscss@8.0.2/css/basscss.min.css" rel="stylesheet"></link>
        <link href="./css/style.bundle.css" rel="stylesheet"></link>
    </head>
    <body>
        <div id="mountPoint">${renderToString(
                <Provider store={store}>
                    <StaticRouter location={url}>
                        <Switch>
                            {routes.map(([path, component, exact], i) => (
                                <Route key={path} path={path} component={component} exact={(exact === 'exact')}/>
                            ))}
                        </Switch>
                    </StaticRouter>
                </Provider>
            )}</div>
        <script type="text/javascript" src="./js/app.bundle.js"></script>
    </body>
</html>`;

export default renderStatic;
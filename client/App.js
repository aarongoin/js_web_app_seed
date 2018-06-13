/* @flow */
import * as React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { AccountReducer } from './reducers/account';
import { logoutUser } from './actions/account';
import api from './api/index';
import routes from './routes';

const Store : Object = createStore(
    combineReducers({
        account: AccountReducer
    }),
    applyMiddleware(api)
);

type Props = {
    isLoggedIn: boolean,
    logout: Function
};

class Main extends React.Component<Props> {
    onComponentWillUnmount() {
        if (this.props.isLoggedIn) this.props.logout();
    }

    render() : React.Element<Router> {
        return (
            <Router>
                <Switch>
                    {routes.map(([path, component, exact] : [string, Function, string]) : React.Element<Route> => <Route exact={exact === 'exact'} path={path} component={component} />)}
                </Switch>
            </Router>
        );
    }
}

const App = connect(
    (state : Object) : Object => ({
        isLoggedIn: state.account.user !== null
    }),
    (dispatch : Function) : Object => ({
        logout: () : 'undefined' => dispatch(logoutUser())
    })
)(Main);

const AppWithStore = (store : Object) : React.Element<Provider> => (
    <Provider store={store}>
        <App />
    </Provider>
);

render(
    AppWithStore(Store),
    document.getElementById('mountPoint')
);
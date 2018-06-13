/* @flow */
import AccountAPI from './account';
import type { AccountAction } from '../actions/account';


declare type Action = AccountAction | { +type: string };

// list of API action handlers
// each action handler should be a function(dispatch, action) => true if handler took care of action, else false
const APIS = [
    AccountAPI
];

// Custom Redux middleware for handling actions that trigger API requests
const api = ({ getState, dispatch } : {getState : Function, dispatch : Function}) : Function => {
        return (next : Function) : Function => (action : Action) : Action => {
        // dispatch action down chain
        const result = next(action);

        // iterate through APIs until one matches action and returns false
        for (let API of APIS)
            if (API(dispatch, action)) break;

        return result;
    }
}

export default api;
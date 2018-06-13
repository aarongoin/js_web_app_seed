/* @flow */
import { receivedUser, failedToLogin, checkedUsername } from '../actions/account';


export const registerUser = (dispatch : Function, username : String, password : String) : Promise<Object> => window.fetch('/join',
    {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: new window.Headers({ 'Content-Type': 'application/json' })
    })
    .then((res: Response) => {
        switch (res.status) {
            case 201:
                return res.json().then((user : Object) => dispatch(receivedUser(user)));
            case 409:
                return dispatch(failedToLogin('An account with this username already exists.'))
            case 500:
                return dispatch(failedToLogin('Unknown server error.'));
            default:
                throw Error(`Failed to handle response status code ${res.status}`);
        }
    })
    .catch(error => console.error('Error registering user', error));


export const loginUser = (dispatch : Function, username : String, password: String): Promise<Object> => window.fetch('/login',
    {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: new window.Headers({ 'Content-Type': 'application/json' })
    })
    .then((res : Response) => {
        switch (res.status) {
            case 201:
                return res.json().then(user => dispatch(receivedUser(user)));
            case 400:
                return dispatch(failedToLogin('An account for this username does not exist.'));
            case 409:
                return dispatch(failedToLogin('User is already logged in.'));
            case 500:
                return dispatch(failedToLogin('Unknown server error.'));
            default:
                throw Error(`Failed to handle response status code ${res.status}`);
        }
    })
    .catch(error => console.error('Error registering user', error));


export const logoutUser = (dispatch : Function) : Promise<Object> => window.fetch('/logout',
    {
        method: 'PUT',
        credentials: 'include'
    })
    .then(res => res.status === 200 ? console.log('Goodbye!') : console.error('Unknown server error.'))
    .catch(error => console.error('Error logging out user', error));


export const checkUsername = (dispatch : Function, name : String) : Promise<Object> => window.fetch('/username',
    {
        method: 'POST',
        body: JSON.stringify({name}),
        headers: new window.Headers({ 'Content-Type': 'application/json' })
    })
    .then((res: Response) => {
        switch (res.status) {
            case 200:
                return res.json().then(result => dispatch(checkedUsername(result)));
            case 500:
                return console.log('Unknown server error.');
            default:
                throw Error(`Failed to handle response status code ${res.status}`);
        }
    })
    .catch(error => console.error(error));

const AccountAPI = (dispatch : Function, action : Object) : boolean => {
    // respond to actions
    switch (action.type) {
        case 'REQUEST_REGISTER_USER':
            registerUser(dispatch, action.username, action.password);
            return true;
        case 'REQUEST_LOGIN_USER':
            loginUser(dispatch, action.username, action.password);
            return true;
        case 'REQUEST_LOGOUT_USER':
            logoutUser(dispatch);
            return true;
        case 'REQUEST_USERNAME':
            checkUsername(dispatch, action.name);
            return true;
        default:
            return false;
    }
}

export default AccountAPI;
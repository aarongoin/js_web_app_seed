/* @flow */

declare type RegisterAction = { +type: 'REQUEST_REGISTER_USER', +username: string, +password: string };
declare type LoginAction = { +type: 'REQUEST_LOGIN_USER', +username: string, +password: string };
declare type ReceivedUserAction = { +type: 'RECEIVED_USER', +user: Object };
declare type LoginFailureAction = { +type: 'LOGIN_FAILURE', +reason: string };
declare type LogoutUserAction = { +type: 'REQUEST_LOGOUT' };

declare type ValidateUsernameAction = { +type: 'REQUEST_USERNAME', +name: string };
declare type UsernameValidityAction = { +type: 'RECEIVED_USERNAME', +validity: Object };

export type AccountAction = RegisterAction | LoginAction | ReceivedUserAction | LoginFailureAction | LogoutUserAction | ValidateUsernameAction | UsernameValidityAction;


export const registerUser = (username: string, password: string): RegisterAction => ({ type: 'REQUEST_REGISTER_USER', username, password });
export const loginUser = (username : string, password : string) : LoginAction => ({ type: 'REQUEST_LOGIN_USER', username, password });
export const receivedUser = (user : Object) : ReceivedUserAction => ({ type: 'RECEIVED_USER', user });
export const failedToLogin = (reason : string) : LoginFailureAction => ({ type: 'LOGIN_FAILURE', reason });

export const logoutUser = () : LogoutUserAction => ({ type: 'REQUEST_LOGOUT' });

export const checkUsername = (name : string) : ValidateUsernameAction => ({ type: 'REQUEST_USERNAME', name });
export const checkedUsername = (validity : Object) : UsernameValidityAction => ({ type: 'RECEIVED_USERNAME', validity });
const initState = () => ({
    user: null,
    waitingForLogin: false,
    loginErrorMsg: '',
    validName: false
});

export const AccountReducer = (state, action) => {
    state = state || initState();

    switch (action.type) {
        case 'REQUEST_REGISTER_USER':
        case 'REQUEST_LOGIN_USER':
            state = { ...state, waitingForLogin: true };
            break;
        case 'RECEIVED_USER':
            state = { ...state, user: action.user, validName: true, waitingForLogin: false };
            break;
        case 'RECEIVED_USERNAME':
            state = { ...state, validName: action.validity };
            break;
        case 'LOGIN_FAILURE':
            state = { ...state, loginErrorMsg: action.errorMsg };
        default:
            break;
    }
    
    return state;
}
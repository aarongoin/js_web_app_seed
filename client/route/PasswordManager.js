/* @flow */
import * as React from 'react';

const Style = {
    pw: {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0)'
    }
};

const PasswordManager = () : React.Element<'div'> => (
    <div key="password_route" style={Style.pw}>
        Password management form here...
    </div>
);
export default PasswordManager;
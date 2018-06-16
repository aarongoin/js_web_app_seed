/* @flow */
import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser, checkUsername } from '../actions/account';

import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

type Props = {
    loginUser : Function,
    checkUsername : Function,
};

type State = {
    username: string,
    password: string,
};

class Login extends React.Component<Props, State> {

    static defaultProps = {
        loginUser: (username : string, password : string) => null,
        checkUsername : (username : string) => null
    };

    state : State = {
        username: "",
        password: ""
    };

    onSubmit : Function = () => null;
    onChange : Function = () => null;

    onSubmit = (event: Object) => {
        event.preventDefault();
        this.props.loginUser(this.state.username, this.state.password);
    };

    onChange = (event : Object) => {
        // strip whitespace from value
        this.setState({ [event.target.name]: event.target.value.replace(/\s+/g, '') });
    };

    defaultState() : State {
        return {
            username: "",
            password: ""
        }
    };

    render() {
        return (
            <Container key="login_route" className="flex_center" style={{height: '100%'}}>
                <Form onSubmit={this.onSubmit} style={{ width: '30rem', backgroundColor: '#fff', padding: '2rem' }}>
                    <legend>Login</legend>
                    <Input
                        name="username"
                        label="Email Address"
                        type="email"
                        floatingLabel={true}
                        required={true}
                        value={this.state.username}
                        onChange={this.onChange}
                    />
                    <Input
                        name="password"
                        label="Password"
                        type="password"
                        floatingLabel={true}
                        required={true}
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <Button color="primary">Submit</Button>
                </Form>
            </Container>
        );
    }

}

const LoginForm = connect(
    undefined,
    dispatch => ({
        loginUser: (username : string, password : string) => dispatch(loginUser(username, password)),
        checkUsername: (username : string) => dispatch(checkUsername(username))
    })
)(Login);


export default LoginForm;
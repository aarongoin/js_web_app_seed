/* @flow */
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from '../actions/account';

import Container from 'muicss/lib/react/container';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

type Props = {
    registerUser: Function,
};

type State = {
    username: string,
    password: string,
};

class Join extends React.Component<Props, State> {

    static defaultProps = {
        registerUser: () => null,
    };

    state: State = {
        username: "",
        password: ""
    };

    onSubmit: Function = () => null;
    onChange: Function = () => null;

    onSubmit = (event: Object) => {
        event.preventDefault();
        this.props.registerUser(this.state.username, this.state.password);
    };

    onChange = (event: Object) => {
        // strip whitespace from value
        this.setState({ [event.target.name]: event.target.value.replace(/\s+/g, '') });
    };

    defaultState(): State {
        return {
            username: "",
            password: ""
        }
    };

    render() {
        return (
            <Container key="login_route" className="flex_center">
                <Form onSubmit={this.onSubmit} style={{ width: '30rem', backgroundColor: '#fff', padding: '2rem' }}>
                    <legend>Join</legend>
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

const JoinForm = connect(
    undefined,
    dispatch => ({
        registerUser: (username, password) => dispatch(registerUser(username, password))
    })
)(Join);


export default JoinForm;
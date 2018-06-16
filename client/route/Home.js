/* @flow */
import * as React from 'react';
import { Link } from 'react-router-dom';

import Container from 'muicss/lib/react/container';
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';


const Home = () => (
    <Container key="home_route">
        <Appbar className="flex_right">
            <Link to="/login"><Button variant="flat" className="mr2">Login</Button></Link>
            <Link to="/join"><Button variant="flat" className="mr2">Join</Button></Link>
        </Appbar>
        <Container className="flex_center" style={{ height: '30rem'}}>
            Home screen here...
        </Container>
    </Container>
);

export default Home;


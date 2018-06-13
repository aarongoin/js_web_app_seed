import React from 'react';

const Style = {
    home: {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0)'
    }
};

const Home = () => (
    <div key="main" style={Style.home}>
        Hello world.
    </div>
);
export default Home;
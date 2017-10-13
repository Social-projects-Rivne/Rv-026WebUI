import React, { Component } from 'react';

import Header from '../../common/Header';
import TestComponentOnMainPage from './TestComponentOnMainPage';

const bannerBlock = {
    fontSize: '80px',
    color: '#ffffff',
    textAlign: 'center',
};

const comment = {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: '30px',
};

const background = {
    background: "url('/public/images/common/main-page.png')",
    height: 'calc(100vh - 60px)',
    textAlign: 'center',
    backgroundSize: 'cover',
};


class MainPage extends Component {
    render() {
        return (
            <div style={background}>
                <Header />
                <p style={bannerBlock}>FOOD MAKE & DELIEVERY</p>
                <p style={comment}>forget about hunger forever with FM&D!</p>
                <TestComponentOnMainPage />
            </div>

        );
    }
}

export default MainPage;

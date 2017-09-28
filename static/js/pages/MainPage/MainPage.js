import React, { Component } from 'react';

import Header from '../../common/Header';

const bannerBlock = {
    fontSize:'80px',
    color:'white',
    textAlign: 'center',
}

const comment = {
    color:'white',
    textAlign: 'center',
    fontSize:'30px'
}

const background = {
    background: "url('public/images/New Project.png')",
    height:'100vh',
    textAlign: 'center',
    backgroundSize: 'cover'
}


class MainPage extends Component {
    render(){
        return(
            <div style={background}>
                <Header />
                <p style={bannerBlock}>FOOD MAKE & DELIEVERY</p>
                <p style={comment}>forget about hunger forever with FM&D!</p>
            </div>

        );
    }
}

export default MainPage;

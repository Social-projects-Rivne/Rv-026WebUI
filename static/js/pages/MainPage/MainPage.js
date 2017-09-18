import React, { Component } from 'react';

import Header from '../../common/Header';

const bannerBlock = {
    fontSize:'80px',
    color:'white',
    marginLeft:'150px',
    paddingRight:'20px'
}

const comment = {
    color:'white',
    textAlign: 'center',
    fontSize:'30px',
    marginTop:'-30px',
    paddingRight:'20px'
}

const background = {
    background: "url('public/New Project.png')",
    height:'884px',
    textAlign: 'center'
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



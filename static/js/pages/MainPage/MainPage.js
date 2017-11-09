import React, { Component } from 'react';
import Carousel from 're-carousel';
import Header from '../../common/Header';
import constants from '../../common/constants';

class MainPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="main-page" style={constants.background}>
                    <Carousel auto>
                        <div className="main-slider" style={{ backgroundImage: "url('/public/images/slider/slide-1.jpg')", height: '100%', backgroundSize: 'cover' }}>
                            <p>FOOD MAKE & DELIEVERY</p>
                        </div>
                        <div className="main-slider" style={{ backgroundImage: "url('/public/images/slider/slide-2.jpg')", height: '100%', backgroundSize: 'cover' }}>
                            <p>Forget about hunger forever!</p>
                        </div>
                        <div className="main-slider" style={{ backgroundImage: "url('/public/images/slider/slide-3.jpg')", height: '100%', backgroundSize: 'cover' }}>
                            <p>Make your life better with FM&D!</p>
                        </div>
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default MainPage;

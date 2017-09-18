import React, { Component } from 'react';

import Footer from './Footer';

class MainLayout extends Component {
    render() {
        return (
            <div>
                    {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default MainLayout;

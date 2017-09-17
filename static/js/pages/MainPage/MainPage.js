import React, { Component } from 'react';
import TestComponentOnMainPage from './TestComponentOnMainPage';

class MainPage extends Component {  
   render() {
      return (
         <div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore consequatur, odio facilis? 
                Illo similique architecto voluptatem, asperiores! 
                Quo minus explicabo delectus modi unde, recusandae 
                facere aperiam at quis eius. Soluta!
            </p>
            <TestComponentOnMainPage />
         </div>
      );
   }
}

export default MainPage;
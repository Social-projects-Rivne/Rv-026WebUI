import React, { Component } from 'react';
import {FormGroup, FormControl, Navbar, Pager } from 'react-bootstrap';
import mySearch from './SearchScript';

import _ from 'lodash';
import axios from 'axios';

/*import SearchBar from './SearchBar';
import SearchElements from './SearchElements';*/

const searchcomp = {
    position: 'absolute'
} 

import config from '../../../../config';

import testData from './testData';

const Search = {
    width: '100%', /* Full-width */
    fontSize: '16px', /* Increase font-size */
    padding: '12px 20px 12px 40px', /* Add some padding */
    border: '1px solid #ddd', /* Add a grey border */
    marginBottom: '12px' /* Add some space below the input */

}

class SearchComponent extends Component {

    render() {

        return (

            <div>
                <Pager>
                <Navbar.Form>
                    <FormGroup>
                        <FormControl
                            type="text"
                            style={Search}
                            id="myInput"
                            onKeyPress={mySearch}
                            placeholder="Search for names.."
                        />
                    </FormGroup>

                </Navbar.Form>
                </Pager>
            </div>
        );
    }
}

export default SearchComponent;
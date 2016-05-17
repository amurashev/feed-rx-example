import React from 'react';
import { render } from 'react-dom';

import Layout from './containers/layout'


export default class {

    constructor(){
        render(
            <Layout />,
            document.getElementById('questions-feed_wrapper')
        );
   }
}



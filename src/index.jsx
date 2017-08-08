import React from 'react';
import ReactDOM from 'react-dom';
import AddInfo from './AddInfo.jsx';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

ReactDOM.render(
    <Router>
      <div>

        <Route path='/' component={AddInfo} />

      </div>
    </Router>,
    document.getElementById('root')
);

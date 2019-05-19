import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Routes from './components/Routes';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { library } from '@fortawesome/fontawesome-svg-core';

import './App.css';

import {
  faMoon, faSun, faStickyNote, faLeaf
} from '@fortawesome/free-solid-svg-icons';

import {
  faClone, faWindowMaximize, faCircle, faSquare
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faMoon, faSun, faClone, faStickyNote, faWindowMaximize, faLeaf, faCircle, faSquare
);




class App extends Component {

  render() {
    return (
        <div>
            <Route component={Routes}/>
        </div>
      )
  }

}

export default App;

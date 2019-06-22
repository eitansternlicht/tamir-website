import * as React from 'react';
import { Component } from 'react';
import { Typography, Grid } from '@material-ui/core/';
import { MainScene } from './Scenes';
import Upload from './utils/Upload';
import Select from './components/Select';
import './App.css';

const styleForPaper = {
  width: '400px',
  height: '400px',
};

class App extends Component {

  render() {
    // return <Select />;
    return <MainScene />;

  }
}

export default App;

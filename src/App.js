import * as React from 'react';
import { Component } from 'react';
import { Dropzone, Table } from './components';
import faker from "faker";
import row from './utils/createRowData';
import { MainScene } from './Scenes';
import './App.css';



class App extends Component {

  render() {
    // return <Table rows={row} />;
    return <MainScene />;
  }
}

export default App;

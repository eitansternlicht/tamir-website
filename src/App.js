import * as React from 'react';
import { Component } from 'react';
import { Dropzone } from './components';
import './App.css';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Dropzone />
        </header>
      </div>
    );
  }
}

export default App;

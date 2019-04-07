import React, { Component } from "react";
import { Dropzone } from "./components";
import "./App.css";

class App extends Component {
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

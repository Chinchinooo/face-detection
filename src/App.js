import React, { Component } from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm />
        <Rank />
        {/* <FaceRecognition /> */}
      </div>
    )
  };
}

export default App;

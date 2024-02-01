import React, { Component } from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import ParticlesBg from 'particles-bg'
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <ParticlesBg color="#ff0000" num={80} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    )
  };
}

export default App;

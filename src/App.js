import React, { Component } from 'react';
import SignIn from './component/SignIn/SignIn';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Register from './component/Register/Register';
import ParticlesBg from 'particles-bg'
import './App.css';

const setUpApi = (imageUrl) => {
  const PAT = 'cb83ac0e74fc4b31b7aebed914efd14b';
  const USER_ID = 'chino';       
  const APP_ID = 'face';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(console.log);
  }

  loadUser = (data) => {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }});
  }

  calculateFaceLocation = (data) =>  {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})

    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", setUpApi(this.state.input))
    .then(response => response.json())
    .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } else if (route === 'signin') {
      this.setState({isSignedIn: false})
    }
    this.setState({route: route})
  }
  
  render () {
   const { imageUrl, route, box, isSignedIn } = this.state;
    return (
      <div className="App">
        <ParticlesBg color="#ff0000" num={80} type="cobweb" bg={true} />
        <Logo />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
            route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
        </div>
    )
  };
}

export default App;
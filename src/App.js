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


const initialState = {
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

const setupClarifai = (imageUrl) => {
  const PAT = '1e22cd8561764f53941656d4809df205';
  const USER_ID = 'chino';
  const APP_ID = 'face-detect-app';
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







/* const setUpApi = (imageUrl) => {
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
} */


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
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

/*   calculateFaceLocation = (data) =>  {
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
  } */

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    const { input, user } = this.state;
     const requestOptions = setupClarifai(input);

    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error with Clarifai request");
      }
      return response.json(); // Parse the response as JSON
    })
    .then(data => {
      this.setState({ imageUrl: input });

      const regions = data.outputs[0]?.data?.regions || []; // Safely access regions array

      // Update the user's entry count on the backend
      return fetch('http://localhost:3000/image', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id }), // Pass the user ID to update
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to update user entry count");
          }
          return response.json(); // Parse the updated count from the response
        })
        .then(count => {
          // Update the user's entry count in the local state
          this.setState(prevState => ({
            user: { ...prevState.user, entries: count },
          }));

          return regions; // Return regions to be processed further
        });
    })
    .then(regions => {
      // Process the regions and log relevant information
      regions.forEach(region => {
        const boundingBox = region.region_info.bounding_box;
        const topRow = (boundingBox.top_row * 100).toFixed(2);
        const leftCol = (boundingBox.left_col * 100).toFixed(2);
        const bottomRow = (boundingBox.bottom_row * 100).toFixed(2);
        const rightCol = (boundingBox.right_col * 100).toFixed(2);

        console.log(
          `Face detected with bounding box: top: ${topRow}%, left: ${leftCol}%, bottom: ${bottomRow}%, right: ${rightCol}%`
        );
      });
    })
    .catch(error => {
      console.error("An error occurred during processing:", error);
    });
};
  
     /*  fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", setUpApi(this.state.input))
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log())
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(error => console.log('error', error));
  } */
  
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render () {
   const { imageUrl, route, box, isSignedIn } = this.state;
    return (
      <div className="App">
        <ParticlesBg color="#ff0000" num={80} type="cobweb" bg={true} />
        <Logo />
        <Navigation 
          isSignedIn={isSignedIn} 
          onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}/>
              <FaceRecognition
                box={box}
                imageUrl={imageUrl} />
            </div>
          : (
            route === 'signin'
            ? <SignIn 
              loadUser={this.loadUser} 
              onRouteChange={this.onRouteChange}/>
            : <Register 
              loadUser={this.loadUser} 
              onRouteChange={this.onRouteChange}/>
          )
        }
        </div>
    )
  };
}

export default App;
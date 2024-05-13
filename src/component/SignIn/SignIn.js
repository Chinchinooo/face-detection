import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://face-detection-backend-jl6b.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(data => Promise.reject(data));
            }
        })
            .then(user => {
              if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home');
                }
            })
            .catch(error => {
            alert(error);
            });
    }

    render() {
        const {onRouteChange} = this.props;
        return (
            <div className="flex justify-center items-center vh-100">
                <article className="br2 ba dark-gray b--white-50 centerSignIn mw5">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 white">
                            <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                className="pa2 white input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                className="b pa2 white input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.onPasswordChange}/>
                            </div>
                            </fieldset>
                            <div className="">
                            <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--white bg-transparent dim pointer f6 dib white" type="submit" value="Sign in"/>
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('register')} className="f6 link pointer dim white db">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default SignIn;

 /* onSubmit = () => {
    const { input, user } = this.state;
     const requestOptions = setupClarifai(input); */

   /*  fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
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
        this.displayFaceBox(this.calculateFaceLocation(region))
      });
    })
    .catch(error => {
      console.error("An error occurred during processing:", error);
    });
}; */
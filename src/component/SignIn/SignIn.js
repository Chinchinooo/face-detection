import React from 'react';
import './SignIn.css';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPass: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPassChange = (event) => {
        this.setState({signInPass: event.target.value})
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
                                <input className="pa2 white input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 white input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                            </fieldset>
                            <div className="">
                            <input onClick={() => onRouteChange('home')} className="b ph3 pv2 input-reset ba b--white bg-transparent dim pointer f6 dib white" type="submit" value="Sign in"/>
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

export default Signin;
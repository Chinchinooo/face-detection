import React from 'react';

const SignIn = ({onRouteChange}) => {
  return (
    <div className="flex justify-center items-center vh-100">
    <article class="br2 ba dark-gray b--white-50 mv4 mw5">
        <main className="pa4 black-80">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0 white">
                <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                <div class="mt3">
                    <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" for="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input onClick={() => onRouteChange('home')} className="b ph3 pv2 input-reset ba b--white bg-transparent dim pointer f6 dib white" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} class="f6 link pointer dim white db">Register</p>
                </div>
            </form>
        </main>
    </article>
    </div>
  );
}

export default SignIn;
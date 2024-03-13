import React from 'react';
import './Navigation.css'

const Navigation = ({onRouteChange, isSignedIn}) => {
        if (isSignedIn) {
            return(
                <nav className='flex-end'>
                    <p onClick={() => onRouteChange('signout')} className='f5 link dim white ba br1 pa2 pointer mr3'>Sign out</p>
            </nav>
            )
        } else {
            return (
                <nav className='flex-end'>
                    <p onClick={() => onRouteChange('signin')} className='f5 link dim white ba br1 pa2 pointer mr3'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f5 link dim white ba br1 pa2 pointer mr3'>Register</p>
                </nav>
                );
        }
}

export default Navigation;
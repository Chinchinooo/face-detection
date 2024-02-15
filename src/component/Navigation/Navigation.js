import React from 'react';
import './Navigation.css'

const Navigation = ({onRouteChange}) => {
    return (
        <nav className='flex-end'>
            <p onClick={() => onRouteChange('signin')} className='f5 link dim white ba br1 pa2 pointer mr3'>
                Sign out
            </p>
        </nav>
    );
}

export default Navigation;
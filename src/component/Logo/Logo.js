import React from 'react';
import logo from './logo.png'
import Tilt from 'react-parallax-tilt';

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    500,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const Logo = () => {
    return (
        <div className='ma3 mt1' style={{ position: 'absolute', top: 0, left: 0 }}>
            <Tilt className='Tilt' options={defaultOptions} style={{ height: 100, width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className='Tilt-inner'>
                    <img style={{height:60, width:60}} src={logo} alt="logo"></img >
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className='center pa2 display'>
           <img src={imageUrl} alt=''/>
        </div>
    );
}

export default FaceRecognition;
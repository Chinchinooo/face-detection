import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className='center pa2'>
           <img src={imageUrl} alt=''/>
        </div>
    );
}

export default FaceRecognition;
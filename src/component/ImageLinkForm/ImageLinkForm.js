import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = () => {
    return (
        <div>
            <div className="center">
                <p className='f3 white'>
                Miao can detect hooman faces. Try me.
                </p>
            </div>
            <div className="center">
                <div className="form center pa4 ba br1 white">
                   <input className="f4 pa2 w-70 center" type='text' placeholder="Gimme pics now"/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-transparent ba br1 b--white">Detect</button> 
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm
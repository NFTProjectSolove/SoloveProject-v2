import {useState, useEffect, useRef} from 'react';

function Roadmap(){


    function Slogun(){

        return(
            <div className="slideText-wrap2">
        <div className="slideText-wrap">
            <div className = "slideText-box">
              <ul>
                <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
              </ul>
            </div>
            <div className = "slideText2-box">
              <ul>
                <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
              </ul>
            </div>
            <div className = "slideText-box">
              <ul>
                <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
              </ul>
            </div>
            <div className = "slideText2-box">
              <ul>
                <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
              </ul>
            </div>
            
        </div>
        </div>
        )
    }

    

    return(
      <div className = 'Roadmapwall'>
        <div className = 'wallpluscircle'>
          <Slogun></Slogun>
        </div>
      </div>    
    )
};

export default Roadmap;

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

    
    function Scrolldown (){

        const scrollToTop = () => {
            window.scroll({
                top: 300,
                behavior: 'smooth'
            })
  
        }
        
        return (
  
          <div className = "Scrolldown" onClick={scrollToTop}>
              <p className='Scrolldowntext'>scroll down</p>
          </div>
  
        )
      }

    return(
<div>
                <div className = 'Roadmapwall'>
                      <Scrolldown></Scrolldown>
                    <div className = "Circle">
                        <Slogun></Slogun>
                    </div>
                </div>
        </div>
        
        
    )
};

export default Roadmap;

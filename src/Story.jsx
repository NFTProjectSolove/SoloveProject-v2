import React, { useState, useEffect } from "react";
import Typingword from './typingText';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesOptions } from "./particlesConfig";

    const particlesInit = async (main) => {
      console.log(main);
  
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(main);
    };
    
function Story (){
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    useEffect(() => {
      window.addEventListener("scroll", updateScroll);
  }, []);
    
    return(
      <div className="tranPage">
        <div className="storyContainer">
          <Particles class="background" init={particlesInit} options={particlesOptions} style={{ position: 'absolute', width: '100%', height: '200vh', left: 0, top: 0, zIndex: -1}}/>
          <div className="storytext" style={{width:"100%"}}>
            <h1>Solove Universe</h1>
            <img className="scrolldown" alt="scrolldown" src="/scrolldown.png" style={{filter:"invert(100%)", height: 'calc(17px + 1vw)', margin:"0 auto"}}/>
          </div>
          <div className="storySection1">
            {scrollPosition >= 150 ? <Typingword typingText="In the vast universe, a new parallel world of our galaxy was born."></Typingword> : null}
          </div>
          <div className="storySection2">
            {scrollPosition >= 680 ? <Typingword typingText="Having existed since the beginning, Queen Ali becomes interested in these spaces and creates a set of data forms."></Typingword> : null}
          </div>
        </div> 
      </div>  
    )
  }

export default Story
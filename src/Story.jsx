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
            <img className="scrolldown" alt="scrolldown" src="/scrolldown.png" style={{filter:"invert(100%)", height: 'calc(17px + 1vw)', margin:"0 auto", opacity:"0.76"}}/>
          </div>
          <div className="storySection1">
            {scrollPosition >= 150 ? <Typingword typingText="In the year 2050, a curious and adventurous bored ape set off on a journey through the vast universe aboard Elon Musk's state-of-the-art spaceship. The ape traveled far and wide, seeking out new experiences and cultures, until they stumbled upon an incredible new world known as the Solove Universe."></Typingword> : null}
          </div>
          <div className="storySection2">
            {scrollPosition >= 680 ? <Typingword typingText="In the Solove Universe, the bored ape discovered a thriving society of Solovions who embraced a culture of love, inclusivity, and mutual respect. The Solovions celebrated diversity in all its forms, and there are no marginalization and discrimination depending on their identities and beliefs."></Typingword> : null}
          </div>
          <div className="storySection3">
            {scrollPosition >= 1210 ? <Typingword typingText="As news of the Solovion's equitable and loving world spread to Earth, people who have felt uncomfortable expressing themselves openly became interested in becoming Solovions. However, becoming a Solovion required more than just a desire or intention."></Typingword> : null}
          </div>
          <div className="storySection4">
            {scrollPosition >= 1740 ? <Typingword typingText="To address this, the Solovion Queen, in her wisdom, created the form of a data avatar called Solover for people to settle into. People who settled into their avatar connected with others from all over the world who shared their values and beliefs. They knew that together, they could build a better future for all. So, they urged others to join them in the Solove Universe, to become Solovers and be a part of this groundbreaking new movement."></Typingword> : null}
          </div>
        </div> 
      </div>  
    )
  }

export default Story
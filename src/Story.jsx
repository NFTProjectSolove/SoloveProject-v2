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
            {scrollPosition >= 150 ? <Typingword typingText="2050년 bored ape 한 마리가 일론머스크가 만든 우주선을 타고 광할한 우주를 여행하다가 solove universe를 발견."></Typingword> : null}
          </div>
          <div className="storySection2">
            {scrollPosition >= 680 ? <Typingword typingText="solove universe에서 solovion들의 진보된 사랑이 존재했고 서로 이를 모두 존중하는 분위기."></Typingword> : null}
          </div>
          <div className="storySection3">
            {scrollPosition >= 1210 ? <Typingword typingText="지구에 사는 사람들은 solovion이 되고 싶었지만 그들이 될 수 없었습니다."></Typingword> : null}
          </div>
          <div className="storySection4">
            {scrollPosition >= 1740 ? <Typingword typingText="이를 가엾게 생각한 태초에 solovion인 퀸이 데이터형태의 아바타 solover 만들어 사람들이 정착할수 있도록 도왔습니다. 여러분도 솔러버가 될수있습니다. 솔러브 월드로 오세요. "></Typingword> : null}
          </div>
        </div> 
      </div>  
    )
  }

export default Story
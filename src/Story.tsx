import React, { useState, useEffect } from "react";
import Typingword from './typingText';

function Story (){
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScroll);
    }, []);
      
    return(
      <>
        <div className="storyContainer">
          <div className="storySection1">
            {scrollPosition >= 150 ? <Typingword typingText="안녕하세요. 천재 최현욱입니다."></Typingword> : null}
          </div>
        </div> 
      </>  
    )
  }

export default Story
import {useState, useEffect, useRef} from 'react';
import styled from "styled-components";

const itemSize = 200;

type IntervalFunction = () => ( unknown | void )

const Image = styled.img`
  width: calc(${itemSize*2}px + 40vw);
  height: calc(${itemSize}px + 20vw);
`; 

const SliderContainerWrap = styled.div`
`;

const SliderContainer = styled.div`
  position: relative;
  width: calc(${itemSize*2}px + 40vw);
  height: calc(${itemSize}px + 20vw);
  overflow:hidden;
`;

const SliderButton = styled.div`
  position: absolute;
  width: calc(15px + 1vw);
  height: calc(15px + 1vw);
  background: tranparent;
  cursor: pointer;
  margin-top:calc(${-1*itemSize/2-10}px - 10vw);
  filter: invert(100%);
  opacity:0.7;
`;

const ImgBox =styled.div`
position: absolute; 
left: 0;
display: flex;
`;

const CSSBox= styled.div`
width: calc(${itemSize*2}px + 40vw);
height: calc(${itemSize}px + 20vw);
  box-shadow:5px 5px 40px 5px rgba(0,0,0,0.5);
`;

function Slider(){
    const [currentIndex,SetCurrentIndex] = useState(1);
    const imageSrc1 = ["slide1.jpg","slide2.jpg","slide3.jpg"]; //src는 다 다른걸로 해주세요
    const imageSrc = [imageSrc1[imageSrc1.length-1]].concat(imageSrc1,imageSrc1[0]) 
    const imageContainer = imageSrc.map((src,idx) => (<Image src={src} key={idx} />));
    const [transitionTime, SettimeIndex] = useState(0.2);

    function ClickPrev(){   
      SettimeIndex(0.2)
      if(currentIndex>0){SetCurrentIndex(currentIndex => currentIndex - 1)}
    }

    function ClickNext(){
      SettimeIndex(0.2)
      if(currentIndex<imageSrc.length-1){SetCurrentIndex(currentIndex => currentIndex + 1)}
    }

    function useInterval( callback: IntervalFunction, delay: number | null ) {

      const savedCallback = useRef<IntervalFunction| null>( null )
      useEffect( () => {
        if (delay === null) return;
        savedCallback.current = callback
      } )
    
      useEffect( () => {
         if (delay === null) return;
        function tick() {
          if ( savedCallback.current !== null ) {
            savedCallback.current()
          }
        }
        const id = setInterval( tick, delay )
        return () => clearInterval( id )
    
      }, [ delay ] )
    }
    
    useInterval(() => {SlideSetIndex()}, currentIndex===imageSrc.length-1||currentIndex===0 ? 201 : 4000);
 
    function SlideSetIndex(){
      SettimeIndex(0.2)
      if(currentIndex===imageSrc.length-1){
        SetCurrentIndex(1)
        SettimeIndex(0)
      }
      else if(currentIndex===0){
        SetCurrentIndex(imageSrc.length-2)
        SettimeIndex(0)
      }
      else
      SetCurrentIndex(currentIndex => currentIndex + 1)

    }
    
    return(
      <CSSBox>
        <SliderContainerWrap>
        <SliderContainer>
          <div className="SlideBox" style={{
            transform:`translateX(calc(${(itemSize*2*-1*currentIndex)}px + 40vw*${(-1*currentIndex)}`, 
            transitionDuration: `${transitionTime}s`
            }}>
            <ImgBox>
              {imageContainer}
            </ImgBox>
          </div>
        </SliderContainer>
          <SliderButton className="SlideButtonPrev" style={{marginLeft:`calc(0px - 1vw - 15px)`, transform:`translateX(calc(0px - 1vw - 10px))`}} onClick={() => ClickPrev()}><img src='slidebutton.png' style={{  width: 'calc(15px + 1vw)', height: 'calc(15px + 1vw);'}}></img></SliderButton>
          <SliderButton className="SlideButtonNext" style={{marginLeft:`calc(${(2*itemSize)}px + 40vw)`, transform:`translateX(calc(1vw + 10px))`}} onClick={() => ClickNext()}><img src='slidebutton.png' style={{  width: 'calc(15px + 1vw)', height: 'calc(15px + 1vw);', transform: 'scaleX(-1)'}}></img></SliderButton>
        </SliderContainerWrap>
      </CSSBox>
    );

};

export default Slider
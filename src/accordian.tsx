import React, { useState, useRef, useEffect } from "react";
import { FiPlus } from "react-icons/fi";

type propsType = {
  questiontext:string;
  answertext:string;
}

export default function Appa({questiontext, answertext}: propsType) {
  

  const [active, setActive] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(contentRef.current){
      contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
    }
    else{
      console.log("Error")
    }
  }, [contentRef, active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  return (
      <>
        <div className="Appa">
        <div style={{margin:'0 auto', width:`calc(200px + 35vw)`}}>
          <button
            style={{width:'100%'}}
            className={`question-section ${active}`}
            onClick={toggleAccordion}
          >
            <div style = {{display: 'flex', alignItems: 'center',  justifyContent: 'center', flexDirection: 'column'}}>
              <div className="question-align">
                <h4 className="question-style">
                  {questiontext}
                </h4>
                <FiPlus 
                  className={active ? `question-icon rotate` : `question-icon`}
                />
              </div>
              <div className={active ? `bar1` : ``}></div>
              <div
                ref={contentRef}
                className={active ? `answer answer-divider` : `answer`}
              >
                <p>{answertext}</p>
                <p>{answertext}</p>
                <p>{answertext}</p>
                <p>{answertext}</p>

              </div>
            </div>

          </button>
        </div>
        </div>
    </>
  );
}
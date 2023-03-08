import React, { useState, useRef, useEffect } from "react";
import { FiPlus } from "react-icons/fi";

type propsType = {
  questiontext:string;
  answertext1:string;
  answertext2:string;
  answertext3:string;
  answertext4:string;
  answertext5:string;
  answertext6:string;
  answertext7:string;
  answertext8:string;
}

export default function Appa({questiontext, answertext1, answertext2, answertext3, answertext4, answertext5, answertext6, answertext7, answertext8}: propsType) {
  

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
                <p>{answertext1}</p>
                <p >
                  <a href="www.solove.com">{answertext2}</a>
                </p>
                <p>
                  <a href="twitter.com/solove">{answertext3}</a>
                </p>
                <p>
                  <a href="discord.gg/solove">{answertext4}</a>
                </p>
                <p>{answertext5}</p>
                <p>{answertext6}</p>
                <p>{answertext7}</p>
                <p>{answertext8}</p>
              </div>
            </div>

          </button>
        </div>
        </div>
    </>
  );
}
import React from 'react';
import Accordian from './accordian';

function Faq() {
    return (
        <div className="tranPage">
        <div id='faq' style={{ backgroundColor: 'black', width: '100vw', height: '150vh', position: 'relative', top: '0', overflow: 'hidden' }}>
            <div style={{ width: '100%', position: 'absolute', top: '15%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            <div className="FAQtext">F A Q</div>
            <Accordian questiontext = "Hi" answertext = "bye"/>
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "Hi" answertext = "bye"/>
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "Hi" answertext = "bye"/>
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "Hi" answertext = "bye"/>
        </div>
        </div>
        </div>
    )
};

export default Faq;
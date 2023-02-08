import React from 'react';
import Accordian from './accordian';

function Faq() {
    return (
        <div className="tranPage">
        <div id='faq' style={{ backgroundColor: 'black', width: '100vw', height: '150vh', position: 'relative', top: '0', overflow: 'hidden' }}>
            <div style={{ width: '100%', position: 'absolute', top: '15%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            <div className="FAQtext">F A Q</div>
            <Accordian questiontext = "What sort of stuff do you do on the weekends?" answertext = "I work as a tour guide for a local tour company. I’ve worked there for three years now."/>
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "Do you feel like grabbing a bite?" answertext = "I work as a tour guide for a local tour company. I’ve worked there for three years now."/>
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "have you heard that I moved to a new apartment?" answertext = "I work as a tour guide for a local tour company. I’ve worked there for three years now."/>
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "Would you be up for a movie some time?" answertext = "I work as a tour guide for a local tour company. I’ve worked there for three years now."/>
        </div>
        </div>
        </div>
    )
};

export default Faq;
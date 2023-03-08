import React from 'react';
import Accordian from './accordian';

function Faq() {
    return (
        <div className="tranPage">
        <div id='faq' style={{ backgroundColor: 'black', width: '100vw', height: '150vh', position: 'relative', top: '0', overflow: 'hidden' }}>
            <div style={{ width: '100%', position: 'absolute', top: '15%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            <div className="FAQtext">F A Q</div>
            <Accordian questiontext = "What is Solove?" answertext1 = "Solove has many meanings. The biggest meaning is So love. We focus on the power of love and positivity. The name is a combination of two simple words, So and Love, which together create a powerful message." answertext2 = "" answertext3 = ""answertext4 = "" answertext5 = "-" answertext6= "another mean is that" answertext7 = "1. It could be a play on the word solve, indicating that your team is focused on finding solutions to complex problems or challenges." answertext8 = "2. Solove could be a combination of solar and evolve, suggesting that your team values personal growth and progress."/>
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "What are the official links?" answertext1 = "Please only use the following links" answertext2= "Minting Website: www.solove.com" answertext3 = "Twitter: twitter.com/solove" answertext4= "" answertext5 = "Please be aware that we will ever DM you or contact you directly" answertext6 = "" answertext7 = ""answertext8 = "" />
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "What is the price and how many can one person buy?" answertext1 = "You can buy two per wallet, and the price is free." answertext2 = "" answertext3 = ""answertext4 = "" answertext5 = "" answertext6 = "" answertext7 = ""answertext8 = "" />
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "When is the minting?" answertext1 = "The minting date will be announced later, and after the people registered on the Allowlist have minted, the remaining quantity can be purchased in the public sale." answertext2 = "" answertext3 = ""answertext4 = "" answertext5 = "" answertext6 = "" answertext7 = ""answertext8 = "" />
        </div>
        </div>
        </div>
    )
};

export default Faq;
import React from 'react';
import Accordian from './accordian';

function Faq() {
    return (
        <div className="tranPage">
        <div id='faq' style={{ backgroundColor: 'black', width: '100vw', height: '150vh', position: 'relative', top: '0', overflow: 'hidden' }}>
            <div style={{ width: '100%', position: 'absolute', top: '15%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            <div className="FAQtext">F A Q</div>
            <Accordian questiontext = "What is Solove?" answertext = "It's a project ."/>
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "What are the official links?" answertext = "Please only use the following links: Minting Website: www.solove.com Twitter: twitter.com/solove Discord: discord.gg/solove Please be aware that we will ever DM you or contact you directly"/>
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "What is the price and how many can one person buy?" answertext = "You can buy two per wallet, and the price is free."/>
          <div style={{paddingTop:'30px'}}></div>
            <Accordian questiontext = "When is the minting?" answertext = "The minting date will be announced later, and after the people registered on the Allowlist have minted, the remaining quantity can be purchased in the public sale."/>
        </div>
        </div>
        </div>
    )
};

export default Faq;
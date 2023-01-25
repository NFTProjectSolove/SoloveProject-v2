import React from 'react';
import Accordian from './accordian';

function Faq() {
    return (
        <div id='faq' style={{ backgroundColor: 'black', width: '100vw', height: '100vh', position: 'relative', top: '0', overflow: 'hidden' }}>
            <div style={{ width: '100%', position: 'absolute', top: '15%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            <div className="FAQtext">FAQ</div>
            <Accordian />
          <div style={{paddingTop:'30px'}}></div>
          <Accordian />
          <div style={{paddingTop:'30px'}}></div>
          <Accordian />
          <div style={{paddingTop:'30px'}}></div>
          <Accordian />
            </div>

        </div>
    )
};

export default Faq;
import {BsPlusCircleFill,BsFillXCircleFill } from 'react-icons/bs'
import React, {useEffect, useState, useRef} from 'react';

function SnsLogo(){
    const [buttonState, SetButtonState] = useState<boolean>(false);     //false 시 close 된 상태 true 시 버튼이 나타나는 상태
    const openUl = useRef<HTMLUListElement>(null);
    const closeUl = useRef<HTMLUListElement>(null);
    useEffect(()=>{
        if(buttonState){
            if(openUl.current && closeUl.current){

                closeUl.current.style.opacity='0'
                openUl.current.classList.remove("snsDisappear")
                openUl.current.classList.add("snsAppear")
            }
        }
        else{
            if(openUl.current && closeUl.current){
                closeUl.current.style.opacity='1'
                openUl.current.classList.remove("snsAppear")
                openUl.current.classList.add("snsDisappear")
            } 
        }  
            
    },[buttonState])

    return(
        <div className="snsLogoContainer">
            <div style={{position:'relative',width:'auto'}}>
                <ul className="openUl" ref={openUl} >
                    <li><img src="/opensea.svg" alt='openseaLogo' /></li>
                    <li><img src="/twitter.svg" alt='twitterLogo' /> </li>
                    <li><img src="/discord.svg" alt='discordLogo' /> </li>
                    <li><div className="snsButton snsCloseButton" onClick={()=>SetButtonState(false)}><BsFillXCircleFill /></div></li>
                </ul>
            
                <ul className="closeUl" ref={closeUl}>
                    <li><div className="snsButton snsOpenButton" onClick={()=>buttonState?SetButtonState(false):SetButtonState(true)}><BsPlusCircleFill /></div></li>
                </ul>
                
            </div>
        </div>
    )
}

export default SnsLogo;
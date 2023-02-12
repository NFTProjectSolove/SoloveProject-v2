    import {BsPlusCircleFill,BsFillXCircleFill } from 'react-icons/bs'
    import React, {useEffect, useState, useRef} from 'react';
    import mint from "./Mint";

    const PROJECT_NAME = process.env.REACT_APP_PROJECT_NAME

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
                        <li>
                            <a target="_blank" rel='noreferrer' href={`https://testnets.opensea.io/collection/${PROJECT_NAME}`}>
                                <img src="/opensea.svg" alt='openseaLogo' />
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel='noreferrer' href={`https://twitter.com`}>
                                <img src="/twitter.svg" alt='twitterLogo' />
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel='noreferrer' href={`https://discord.com`}>
                                <img src="/discord.svg" alt='discordLogo' />
                            </a> 
                        </li>
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
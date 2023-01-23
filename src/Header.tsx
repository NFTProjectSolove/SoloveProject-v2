import styled from "styled-components";
import { NavLink } from 'react-router-dom';    
import {ConnectButton} from '@rainbow-me/rainbowkit';

const StyledLink = styled(NavLink)`
  margin: 30px;
  text-decoration-line: none;
`

function Header(){
    return(
      <div id="header">
        <div className="navbar">
          <div className="navbarLogo">
            <img src="/solovelogo.svg" alt="Logo" style={{height:'calc(20px + 0.7vw)'}}/>
          </div>
          <div className="navbarMenu">
            <StyledLink className={({ isActive }) => isActive ? 'active' : ''} to='/'><p>HOME</p></StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : ''} to='/About'><p>ABOUT</p></StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : ''} to='/Roadmap'><p>ROADMAP</p></StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : ''} to='/Faq'><p>FAQ</p></StyledLink>
            <StyledLink className={({ isActive }) => isActive ? 'active' : ''} to='/Mint'><p>MINT</p></StyledLink>
          </div>
          <div>
            <ConnectButton />
          </div>
        </div>
      </div>
    )
  }
  
export default Header
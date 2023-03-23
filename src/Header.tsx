import styled from "styled-components";
import { NavLink, useNavigate } from 'react-router-dom';    
import {ConnectButton} from '@rainbow-me/rainbowkit';
import { GiHamburgerMenu } from "react-icons/gi";
import {useState} from 'react';

const StyledLink = styled(NavLink)`
  margin: 30px;
  text-decoration-line: none;
`

function Header(){
  const [toggleOn, SetToggleOn] = useState(false)

  const toggleClick = () => {
    (toggleOn)? SetToggleOn(false): SetToggleOn(true); 
  }

  const NavbarMenu = () => {
    return(
      <>
        <StyledLink onClick={()=>{SetToggleOn(false)}} className={({ isActive }) => isActive ? 'active' : ''} to='/'><p>HOME</p></StyledLink>
        <StyledLink onClick={()=>{SetToggleOn(false)}} className={({ isActive }) => isActive ? 'active' : ''} to='/Story'><p>STORY</p></StyledLink>
        <StyledLink onClick={()=>{SetToggleOn(false)}} className={({ isActive }) => isActive ? 'active' : ''} to='/Roadmap'><p>ROADMAP</p></StyledLink>
        <StyledLink onClick={()=>{SetToggleOn(false)}} className={({ isActive }) => isActive ? 'active' : ''} to='/Faq'><p>FAQ</p></StyledLink>
        <StyledLink onClick={()=>{SetToggleOn(false)}} className={({ isActive }) => isActive ? 'active' : ''} to='/Mint'><p>MINT</p></StyledLink>
      </>
    )
  }

  const Navigate = useNavigate()


    return(
      <div id="header">
        <div className="navbar">
          <GiHamburgerMenu className="navbarHamburger" color="white" onClick={toggleClick} />
          <div className="navbarLogo" onClick={()=>{Navigate('/', {replace:true})}} style={{cursor:"pointer"}}>
            <img className="navLogoImg" src="/solovelogo.svg" alt="LogoWithText"/>
            <img className="navOnlyLogoImg" src="/icon.png" alt="Logo" />
          </div>
          <div className="navbarMenu">
            <NavbarMenu/>
          </div>
          <div>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted;
                const connected =
                  ready &&
                  account &&
                  chain

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none'
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button onClick={openConnectModal} type="button" className="connectButtonHeader">
                            Connect
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button" className="connectButtonHeader">
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div style={{gap: 12}} className="connectButtonHeader">
                          <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center', color:'white'}}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            
                          </button>
                          <button onClick={openAccountModal} type="button" >
                            {account.displayName}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
        <div className="toggle">
          {toggleOn && <div className="navbarMenuMobile"><NavbarMenu/></div> }
        </div>
      </div>
    )
  }
  
export default Header
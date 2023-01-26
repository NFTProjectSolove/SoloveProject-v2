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
                            Connect Wallet
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
                        <div style={{ display: 'flex', gap: 12}} className="connectButtonHeader">
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
      </div>
    )
  }
  
export default Header
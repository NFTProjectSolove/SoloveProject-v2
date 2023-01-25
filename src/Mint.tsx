import {
  Button,
  Container,
  Text,
  Image,
  Box,
  Link,
  Skeleton,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import abiFile from './Solove.json';
import { motion } from 'framer-motion';
console.log(abiFile.abi)
const CONTRACT_ADDRESS = '0x0037AC3738aE7141A2BCCa597005ED21544331b9';

const getOpenSeaURL = (tokenId: string | number) =>
    `https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${tokenId}`;

function Mint() {
  const contractConfig = {
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: abiFile.abi,
  };
  const [mintcnt, setMintcnt] = useState(1);

  const connectedAccount = '0x9aaB929c32B3CCe2ec0FdBbB21DdD070Fb359fb6';
  const amount = ethers.utils.parseEther('0.001');

  const { data: tokenURI } = useContractRead({
    ...contractConfig,
    functionName: 'commonTokenURI',
  });
  const [imgURL, setImgURL] = useState('');

  const { writeAsync: mint, error: mintError } = useContractWrite({
    ...contractConfig,
    functionName: 'payToMint',
    args: {
      from: connectedAccount,
      value: amount._hex,
    }
  });
  const [mintLoading, setMintLoading] = useState(false);
  const { address } = useAccount();
  const isConnected = !!address;
  const [mintedTokenId, setMintedTokenId] = useState<number>();

  const onMintClick = async () => {
    try {
      setMintLoading(true);
      const tx = await mint();
      const receipt = await tx.wait();
      console.log('TX receipt', receipt);
      // @ts-ignore
      const mintedTokenId = await receipt.events[0].args[2].toString();
      setMintedTokenId(mintedTokenId);
    } catch (error) {
      console.error(error);
    } finally {
      setMintLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (tokenURI) {
        const res = await (await fetch(tokenURI as unknown as string)).json();
        setImgURL(res.image);
      }
    })();
  }, [tokenURI]);

  const Counter = () => {
    const mintcntList = [1, 2, 3, 4, 5];
    const handleSelect = (e:any) => {
    setMintcnt(e.target.value);
  };
      return (
      <div className = "counterContainer">
        <div className="counterInfo1"> 
          <span className="num"> 0.02 </span> 
          <span className="unit"> eth </span>
          <span>
            <select className="select" onChange={handleSelect} value={mintcnt}> 
              {mintcntList.map((item) => (
              <option value={item} key={item}> {item}</option>))}
              </select>
          </span>
        </div>
        <div className="bar"></div>
        <div className="counterInfo2">
          <span className="label">TOTAL : </span> 
          <span className="num"> {+mintcnt*0.02}</span>
          <span className="unit">eth</span>
        </div>
      </div>
    );
  };

  return (
    <div className = "mintwall">
      <div className="mintcharactor">
        <img alt="char_solove" src="/mintcharactor.png" ></img>
      </div>

      <div className="mintContainer">
        <Counter/>
        <div className="buttonContainer">
          {!isConnected&&<ConnectButton.Custom>
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
                              <button onClick={openConnectModal} type="button" className="connectButtonMint">
                                Connect Wallet
                              </button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <button onClick={openChainModal} type="button" className="connectButtonMint">
                                Wrong network
                              </button>
                            );
                          }
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>}
          {isConnected &&
            <Button
            height={'3rem'}
            width={'10rem'}
            className='mintButton'
            backgroundColor={'#7A7F92'}
            disabled={!isConnected || mintLoading}
            onClick={onMintClick}
            fontSize={'1.5rem'}
            font-family='PoppinsLight'
            borderRadius={'20px'}
            _hover={{bg :'#9197ac'}}
            _active={{
              transform: 'scale(0.98)',
            }}
          >Mint Now</Button>}
          
        </div>
        
      </div>
      


      {mintError && (
        <Text marginTop='4'>⛔️ Mint unsuccessful! Error message:</Text>
      )}

      {mintError && (
        <pre style={{ marginTop: '8px', color: 'red' }}>
          <code>{JSON.stringify(mintError, null, ' ')}</code>
        </pre>
      )}
      {mintLoading && <Text marginTop='2'>Minting... please wait</Text>}

      {mintedTokenId && (
        <Text marginTop='2'>
          🥳 Mint successful! You can view your NFT{' '}
          <Link
            isExternal
            href={getOpenSeaURL(mintedTokenId)}
            color='blue'
            textDecoration='underline'
          >
            here!
          </Link>
        </Text>
      )}
  </div>
  )
}

export default Mint;

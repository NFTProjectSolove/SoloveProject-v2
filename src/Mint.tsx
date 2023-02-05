import {
  Button,
  Text,
  Link,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead, useContractWrite} from 'wagmi';
import abiFile from './Solove.json';
import { MerkleTree } from 'merkletreejs';
import { ethers } from 'ethers';
window.Buffer = window.Buffer || require("buffer").Buffer;

const keccak256 = require('keccak256');


let whitelistAddresses = [
  "0X5B38DA6A701C568545DCFCB03FCB875F56BEDDC4",
  "0X5A641E5FB72A2FD9137312E7694D42996D689D99",
  "0XDCAB482177A592E424D1C8318A464FC922E8DE40",
  "0X6E21D37E07A6F7E53C7ACE372CEC63D4AE4B6BD0",
  "0X09BAAB19FC77C19898140DADD30C4685C597620B",
  "0XCC4C29997177253376528C05D3DF91CF2D69061A",
  "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
  "0x2f9C64174Afa42C87da579Cb8DffD3bb1301b6D9",
  "0x9aaB929c32B3CCe2ec0FdBbB21DdD070Fb359fb6"
];


const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256);


const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const getOpenSeaURL = (tokenId: string | number) =>
    `https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${tokenId}`;

function Mint() {
  const contractConfig = {
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: abiFile,
  };

  const [mintcnt, setMintcnt] = useState(1);

  const { data: tokenURI } = useContractRead({
    ...contractConfig,
    functionName: 'notRevealedUri',
  });
  const [imgURL, setImgURL] = useState('');

  const { writeAsync: mint, error: mintError } = useContractWrite({
    ...contractConfig,
    functionName: 'whitelistmint'
  });
  const [mintLoading, setMintLoading] = useState(false);
  const { address } = useAccount();
  const isConnected = !!address;
  const [mintedTokenId, setMintedTokenId] = useState<number>();

  const onMintClick = async () => {
    try {
      setMintLoading(true);
      const proof = merkleTree.getHexProof(keccak256(address));
      console.log(mintcnt)
      console.log(address)
      console.log(proof)
      const tx = await mint({
        args: [mintcnt, proof, { value: ethers.utils.parseEther(String(mintcnt*0.2))}],
      });
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

  useEffect(()=>{
    if(mintError){
      alert("⛔️ Mint unsuccessful! Error message:" + JSON.stringify(mintError, null, ' '))
    }
  },[mintError])

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
            <span className="label">TOTAL </span>
            <span className="num"> {+mintcnt*0.02}</span>
            <span className="unit">eth</span>
          </div>
        </div>
    );
  };

  return (
      <div className="tranPage">
        <div className = "mintwall">
          <div className="mintContainer">
            <div className="mintcharactor">
              <img alt="char_solove" src="/mintcharactor.png" ></img>
            </div>
            <Counter/>
            <div className="buttonContainer">
              {!isConnected&&
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
                                  userSelect: 'none',
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
                      height={'5vh'}
                      width={'clamp(120px,15vw,250px)'}
                      white-space= {'nowrap'}
                      className='mintButton'
                      backgroundColor={'#7A7F92'}
                      disabled={!isConnected || mintLoading}
                      onClick={onMintClick}
                      fontSize={'clamp(12px,5vw,20px)'}
                      font-family='PoppinsLight'
                      borderRadius={'20px'}
                      _hover={{bg :'#9197ac'}}
                  >Mint Now</Button>}
            </div>
          </div>


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
      </div>
  )
}


export default Mint;


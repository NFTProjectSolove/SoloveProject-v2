import {
  Button,
  Text,
  Link,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
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

function Mint() {
  const contractConfig = {
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: abiFile,
  };

  const [mintcnt, setMintcnt] = useState(1);

  // const { data: tokenURI } = useContractRead({
  //   ...contractConfig,
  //   functionName: 'notRevealedUri',
  // });
  const [imgURL, setImgURL] = useState('');

  const { writeAsync: mint, error: mintError } = useContractWrite({
    addressOrName: "0x16eBA794fE1B433eE5B13977CE79E0fAfbE0eEd9",
    contractInterface: abiFile,
    functionName: 'whitelistmint'
  });
  const [mintLoading, setMintLoading] = useState(false);
  const { address } = useAccount();
  const isConnected = !!address;
  const [mintedTokenId, setMintedTokenId] = useState<string|number>(0);
  const [isDisabledByDate, setIsDisabledByDate] = useState<boolean>(true);
  const disabledDate = "2023-02-10";  //mint 날짜 넣어주면 됨 입력된 날짜에 열림

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

  useEffect(()=>{
    if(mintError){
      Swal.fire({
        html: JSON.stringify(mintError,null,' '),
        icon:"error",
      })
    }
    if(mintedTokenId){
      Swal.fire(
      {
        html:'Mint successful! You can view your NFT\n  <a target="_blank" href="https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${tokenId}"><p style="color:green">Click me!</p></a>',
        icon:'success',
      });
    }
    if(mintLoading){
      Swal.fire({
        text: 'Minting.. please wait ',
        icon: 'info',
        toast: true,
        timerProgressBar: true,
        timer:10000
      })
    }
  },[mintError, mintedTokenId, mintLoading])

  useEffect(() => {
    const now = new Date();
    if (now >= new Date(disabledDate)) {
      setIsDisabledByDate(false);
    }
  }, [disabledDate]);

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
                                      <p>Connect Wallet</p>
                                    </button>
                                );
                              }

                              if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button" className="connectButtonMint">
                                      <p>Wrong network</p>
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
                      width={'clamp(120px,20vw,250px)'}
                      white-space= {'nowrap'}
                      className='mintButton'
                      backgroundColor={'#7A7F92'}
                      disabled={!isConnected || mintLoading}
                      onClick={onMintClick}
                      fontSize={'clamp(12px,5vw,20px)'}
                      font-family='PoppinsLight'
                      borderRadius={'20px'}
                      _hover={{bg :'#9197ac'}}
                      isDisabled={isDisabledByDate}
                  > {isDisabledByDate ? 'Coming Soon' :'Mint Now'}</Button>}
            </div>
          </div>
        </div>
      </div>
  )
}


export default Mint;


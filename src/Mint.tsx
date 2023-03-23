import {
  Button,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAccount, useContractWrite} from 'wagmi';
import abiFile from './Solove.json';
import { MerkleTree } from 'merkletreejs';
import dummy from './whitelist.json'

window.Buffer = window.Buffer || require("buffer").Buffer;
const keccak256 = require('keccak256');
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS

const addresses = dummy;

const leaves = addresses.map(x => keccak256(x))
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })

function buf2hex(x: any){
  return '0x' + x.toString('hex')
}


function Mint() {
  const [mintcnt, setMintcnt] = useState(1);

  const { writeAsync: mint, error: mintError } = useContractWrite({
    // @ts-ignore
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: abiFile,
    functionName: 'whitelistmint'
  });
  const [mintLoading, setMintLoading] = useState(false);
  const { address } = useAccount();
  const isConnected = !!address;
  const [mintedTokenId, setMintedTokenId] = useState<string|number>(0);
  const [isDisabledByDate, setIsDisabledByDate] = useState<boolean>(true);
  const disabledDate = '2023-04-08T11:00:00Z';  //mint 날짜 넣어주면 됨 입력된 날짜에 열림 시간은 영국시간 기준


  const onMintClick = async () => {
    try {
      setMintLoading(true);
      const proof = tree.getProof(keccak256(address)).map(x => buf2hex(x.data))
      const tx = await mint({
        args: [mintcnt, proof],
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
      setMintedTokenId(0);
    }
  };

  useEffect(()=>{
    if(mintError){
      let json = JSON.stringify(mintError,['reason'],' ')
      let second = json.substring(0,json.lastIndexOf('"'))
      let third = second.substring(second.lastIndexOf('"')+1)
      Swal.fire({
        html: third.substring(third.lastIndexOf(':')+1),
        icon:"error",
      })
    }
    if(mintedTokenId){
      Swal.fire(
          {
            html:'Mint successful! You can view your NFT\n  <a target="_blank" href={`https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${mintedTokenId}`><p style="color:green">Click me!</p></a>',
            icon:'success',
          });
    }
    if(mintLoading){
      Swal.fire({
        titleText:'Minting',
        text: 'Please wait. . .',
        timerProgressBar: true,
        timer:100000
      })
    }
  },[mintError, mintedTokenId, mintLoading])

  useEffect(() => {
    const now = new Date();
    console.log("Rendring on Date UseEffect")
    console.log(now); // 한국시간
    console.log(new Date(disabledDate)) // 왜 23시 한국시간으로 변환됨?
    if (now >= new Date(disabledDate)) {
      setIsDisabledByDate(false);
      
    }
  }, []);

  const Counter = () => {
    const mintcntList = [1, 2];
    const handleSelect = (e:any) => {
      setMintcnt(e.target.value);
    };
    return (
        <div className = "counterContainer">
          <div className="counterInfo1">
            <span className="num"> 2 </span>
            <span className="unit"> Per Wallet </span>
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
            <span className="num"> {+mintcnt}</span>
            <span className="unit">EA</span>
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
            <a target="_blank" href="https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${tokenId}"></a>
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
                      width={'clamp(140px,20vw,250px)'}
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


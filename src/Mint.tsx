import {
  Button,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAccount, useContractWrite} from 'wagmi';
import abiFile from './Solove.json';
import { MerkleTree } from 'merkletreejs';
window.Buffer = window.Buffer || require("buffer").Buffer;
const keccak256 = require('keccak256');


let addresses = [
  "0X5B38DA6A701C568545DCFCB03FCB875F56BEDDC4",
  "0X5A641E5FB72A2FD9137312E7694D42996D689D99",
  "0XDCAB482177A592E424D1C8318A464FC922E8DE40",
  "0X6E21D37E07A6F7E53C7ACE372CEC63D4AE4B6BD0",
  "0X09BAAB19FC77C19898140DADD30C4685C597620B",
  "0XCC4C29997177253376528C05D3DF91CF2D69061A",
  "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
  "0x2f9C64174Afa42C87da579Cb8DffD3bb1301b6D9",
  "0x9aaB929c32B3CCe2ec0FdBbB21DdD070Fb359fb6",
  "0x15979297a8B1a4e52294c9E21D5423EddB5Da5C4"
];

const leaves = addresses.map(x => keccak256(x))
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })

function buf2hex(x: any){
  return '0x' + x.toString('hex')
}


function Mint() {
  const [mintcnt, setMintcnt] = useState(1);

  const { writeAsync: mint, error: mintError } = useContractWrite({
    addressOrName: "0xA58C589B1d06f4af76a97152431a1333A09Ac05f",
    contractInterface: abiFile,
    functionName: 'whitelistmint'
  });
  const [mintLoading, setMintLoading] = useState(false);
  const { address } = useAccount();
  const isConnected = !!address;
  const [mintedTokenId, setMintedTokenId] = useState<string|number>(0);
  const [isDisabledByDate, setIsDisabledByDate] = useState<boolean>(true);
  const disabledDate = "2023-02-05";  //mint 날짜 넣어주면 됨 입력된 날짜에 열림

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
            html:'Mint successful! You can view your NFT\n  <a target="_blank" href="https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${mintedTokenId}"><p style="color:green">Click me!</p></a>',
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


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
  import abiFile from './abiFile.json';
  import { motion } from 'framer-motion';
  
  const CONTRACT_ADDRESS = '0xaa3906f986e0cd86e64c1e30ce500c1de1ef46ad';
  
  const getOpenSeaURL = (tokenId: string | number) =>
    `https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${tokenId}`;
  
  function Mint() {
    const contractConfig = {
      addressOrName: CONTRACT_ADDRESS,
      contractInterface: abiFile.abi,
    };
    const { data: tokenURI } = useContractRead({
      ...contractConfig,
      functionName: 'commonTokenURI',
    });
    const [imgURL, setImgURL] = useState('');
  
    const { writeAsync: mint, error: mintError } = useContractWrite({
      ...contractConfig,
      functionName: 'mint',
    });
    const [mintLoading, setMintLoading] = useState(false);
    const { address } = useAccount();
    const isConnected = !!address;
    const [mintedTokenId, setMintedTokenId] = useState<number>();
  
    const onMintClick = async () => {
      try {
        setMintLoading(true);
        const tx = await mint({
          args: [address, { value: ethers.utils.parseEther('0.001') }],
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
  
    return (
      <div className = "mintwall">
        <div className="mintcharactor">
          <img alt="char_solove" src="/mintcharactor.png" id="mintcharacterimg"></img>
        </div>

        <span className="buttonspan">
        
          {isConnected && <Button
            disabled={!isConnected || mintLoading}
            marginTop='6'
            onClick={onMintClick}
            textColor='white' 
            bg='blue.500'
            _hover={{
              bg: 'blue.700',
            }}
          >🎉 Mint</Button>}
        </span>
        
  

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
    );
  }
  
  export default Mint;
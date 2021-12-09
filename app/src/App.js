import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import animation from './assets/nouns-blue.png';

import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'artbybloc';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);


  // Actions

  /*
  * Declare your function
  */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

          /*
          * the solana object gives us a function that will allow us to connect directly with the user's wallet!
          */
         const response = await solana.connect({ onlyIfTrusted: true });
         console.log(
           'Connected with Public Key:',
           response.publicKey.toString()
         );

         /*
         * Set the user's publicKey in state, to be used later
         */
        setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*
  * Define this method so that your code does not break
  * We will write the logic for this next
  */
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };


  /*
  * You want to render this UI when the user has not connect their wallet to the dApp yet
  */
  const renderNotConnectedContainer = () => (
    <div>
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect Wallet
    </button>

    <img alt="Nouns Animation" className="animation" src={animation} />
    </div>
  );

  /*
  * When your component first mounts, let's check to see if you have a connected Phantom Wallet
  */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Toon Bits</p>
          <p className="sub-text">Limited edition NFTs. a NounsDAO derivative.</p>
          {/* Render your connect to wallet button right here */}
          {/* Add the condition to show this - but ONLY if we do NOT have a wallet address */}
          {!walletAddress && renderNotConnectedContainer()}

          {/* Check for walletAddress and then pass in walletAddress */}
          {walletAddress && <CandyMachine walletAddress={window.solana} />}
        </div>
          
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`made by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;

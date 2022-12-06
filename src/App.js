import logo from './MediaHochLogoBlackGlow.png';
import './App.css';

import { ethers } from 'ethers';
import contractABI from './deployedContractABI.json';

const contractAddress = '0xcc506A56f17962a7bc929De183b1fee958E71c5C';
var signerAddress = "";
var signer;
var provider;
var tx;

const connectMetaMask = async () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  provider = new ethers.providers.Web3Provider(window.ethereum)

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  signer = provider.getSigner()

  //mine///////////////////////////////////
  signerAddress = await signer.getAddress();


}
const load = async () => {
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const mess = await contract.isSaleActive();

  const conWithSigner = contract.connect(signer);

  tx = await conWithSigner.mint(1,{value: ethers.utils.parseEther("0.101")});
  alert(mess);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='whiteText'><span className='blackText'>MediaHoch</span>Crazzie Kiddies</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Mint some of my shit bro!
        </p>
        <button className="interactButton" onClick={connectMetaMask}>Connect MetaMask Wallet</button>
        <button className="interactButton" onClick={load}>Mint</button>
      </header>
    </div>
  );
}

export default App;

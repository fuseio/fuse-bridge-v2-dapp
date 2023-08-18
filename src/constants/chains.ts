import { ChainConfigLike } from "./types";
import matic from "../assets/matic.png";
import eth from "../assets/eth.png";
import bnb from "../assets/bnb.png";
import gnosis from "../assets/gnosis.png";
import celo from "../assets/celo.png";
import arbi from "../assets/arbi.png";
import optimism from "../assets/optimism.png";
import voltage from "../assets/voltage.png";

export const chains: ChainConfigLike[] = [
  // {
  //   chainName: "Ethereum",
  //   chainId: 101,
  //   icon: eth,
  //   lzChainId: 100,
  //   rpc: "https://mainnet.infura.io/v3/3d8a7f0e7d9a4b0e8b0b3b0b9f1b9b9b",
  //   enabled: false,
  //   appLogo: voltage,
  //   appName: "Voltage FInance",
  //   appURL: "https://app.voltage.finance/#/bridge",
  // },
  // {
  //   chainName: "BNB",
  //   chainId: 102,
  //   icon: bnb,
  //   lzChainId: 101,
  //   rpc: "https://bsc-dataseed.binance.org/",
  //   enabled: false,
  //   appLogo: voltage,
  //   appName: "Voltage FInance",
  //   appURL: "https://app.voltage.finance/#/bridge",
  // },
  {
    chainName: "Polygon",
    lzChainId: 109,
    icon: matic,
    rpc: "https://rpc-mainnet.maticvigil.com",
    chainId: 137,
  },
  {
    chainName: "Gnosis",
    lzChainId: 145,
    icon: gnosis,
    rpc: "https://rpc.gnosischain.com/",
    chainId: 100,
  },
  // {
  //     chainName: "Celo",
  //     chainId: 125,
  //     icon: celo
  // },
  {
      chainName: "Arbitrum",
      lzChainId: 110,
      icon: arbi,
      chainId: 42161,
      rpc: "https://arb1.arbitrum.io/rpc",
  },
  {
      chainName: "Optimism",
      lzChainId: 111,
      icon: optimism,
      rpc: "https://mainnet.optimism.io",
      chainId: 10,
  },
];

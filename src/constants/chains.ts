import { ChainConfigLike } from "./types";
import matic from "../assets/matic.png";
import arbi from "../assets/arbi.png";
import optimism from "../assets/optimism.png";
import maticLogo from "../assets/matic";
import arbiLogo from "../assets/arbi";
import optimismLogo from "../assets/optimism";

export const chains: ChainConfigLike[] = [
  {
    chainName: "Polygon",
    lzChainId: 109,
    icon: matic,
    rpc: "https://rpc-mainnet.maticvigil.com",
    chainId: 137,
    logo: maticLogo,
  },
  // {
  //   chainName: "Gnosis",
  //   lzChainId: 145,
  //   icon: gnosis,
  //   rpc: "https://rpc.gnosischain.com/",
  //   chainId: 100,
  //   logo: gnosisLogo,
  // },
  {
    chainName: "Arbitrum",
    lzChainId: 110,
    icon: arbi,
    chainId: 42161,
    rpc: "https://arb1.arbitrum.io/rpc",
    logo: arbiLogo,
  },
  {
    chainName: "Optimism",
    lzChainId: 111,
    icon: optimism,
    rpc: "https://mainnet.optimism.io",
    chainId: 10,
    logo: optimismLogo,
  },
];

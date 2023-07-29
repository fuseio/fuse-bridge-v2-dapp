import { ChainConfigLike } from "./types";
import matic from "../assets/matic.png";
import eth from "../assets/eth.png"
import bnb from "../assets/bnb.png"
import gnosis from "../assets/gnosis.png"
import celo from "../assets/celo.png"
import arbi from "../assets/arbi.png"
import optimism from "../assets/optimism.png"

export const chains : ChainConfigLike[] = [
    {
        chainName: "Ethereum",
        chainId: 1,
        icon: eth
    },
    {
        chainName: "BNB",
        chainId: 56,
        icon: bnb
    },
    {
        chainName: "Gnosis",
        chainId: 100,
        icon: gnosis
    },
    {
        chainName: "Polygon",
        chainId: 137,
        icon: matic
    },
    {
        chainName: "Celo",
        chainId: 42220,
        icon: celo
    },
    {
        chainName: "Arbitrum",
        chainId: 42161,
        icon: arbi
    },
    {
        chainName: "Optimism",
        chainId: 300,
        icon: optimism
    },
];
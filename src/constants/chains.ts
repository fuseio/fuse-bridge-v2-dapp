import { ChainConfigLike } from "./types";
import matic from "../assets/matic.png";
import eth from "../assets/eth.png"
import bnb from "../assets/bnb.png"
import gnosis from "../assets/gnosis.png"
import celo from "../assets/celo.png"
import arbi from "../assets/arbi.png"
import optimism from "../assets/optimism.png"

export const chains : ChainConfigLike[] = [
    // {
    //     chainName: "Ethereum",
    //     chainId: 101,
    //     icon: eth
    // },
    // {
    //     chainName: "BNB",
    //     chainId: 102,
    //     icon: bnb
    // },
    {
        chainName: "Gnosis",
        chainId: 145,
        icon: gnosis
    },
    {
        chainName: "Polygon",
        chainId: 109,
        icon: matic
    },
    // {
    //     chainName: "Celo",
    //     chainId: 125,
    //     icon: celo
    // },
    // {
    //     chainName: "Arbitrum",
    //     chainId: 110,
    //     icon: arbi
    // },
    // {
    //     chainName: "Optimism",
    //     chainId: 111,
    //     icon: optimism
    // },
];
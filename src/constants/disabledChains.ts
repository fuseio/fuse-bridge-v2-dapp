import eth from "../assets/eth.png";
import bnb from "../assets/bnb.png";
import voltage from "../assets/voltage.png";
import { DisabledChainConfigLike } from "./types";

export const disabledChains: DisabledChainConfigLike[] = [
  {
    chainName: "Ethereum",
    icon: eth,
    appLogo: voltage,
    appName: "Voltage FInance",
    appURL: "https://app.voltage.finance/#/bridge",
  },
  {
    chainName: "BNB",
    icon: bnb,
    appLogo: voltage,
    appName: "Voltage Finance",
    appURL: "https://app.voltage.finance/#/bridge",
  },
];

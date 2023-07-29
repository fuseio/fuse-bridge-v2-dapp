import { CoinConfigLike } from "./types";
import usdc from "../assets/usdc.png";

export const coins: CoinConfigLike[] = [
  {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    icon: usdc,
  },
];

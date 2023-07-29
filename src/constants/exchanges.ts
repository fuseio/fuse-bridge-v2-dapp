import { ExchangeConfigLike } from "./types";
import binance from "../assets/binance.png";
import coinbase from "../assets/coinbase.png";
import kucoin from "../assets/kucoin.png";
import huobi from "../assets/huobi.png";

export const exchanges: ExchangeConfigLike[] = [
  {
    name: "Binance",
    icon: binance,
    website: "https://www.binance.com",
  },
  {
    name: "Coinbase",
    icon: coinbase,
    website: "https://www.coinbase.com",
  },
  {
    name: "KuCoin",
    icon: kucoin,
    website: "https://www.kucoin.com",
  },
  {
    name: "Huobi Global",
    icon: huobi,
    website: "https://www.huobi.com",
  },
];

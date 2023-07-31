import { brideConfig } from "./bridge";
import {
  createAppConfig,
  createChainConfig,
  createCoinConfig,
  createExchangeConfig,
} from "./types";
import { chains } from "./chains";
import { coins } from "./coins";
import { exchanges } from "./exchanges";

export const CONFIG = {
  fuseRPC: "https://rpc.fuse.io",
};

export const chainConfig = createChainConfig(chains);
export const exchangeConfig = createExchangeConfig(exchanges);
export const coinConfig = createCoinConfig(coins);
export const appConfig = createAppConfig(brideConfig, chainConfig, coinConfig);

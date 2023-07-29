import {
  type AppConfigLike,
  createAppConfig,
} from "@layerzerolabs/ui-app-config";
import config from "./bridge.json";
import {
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

export const appConfig = createAppConfig(config as AppConfigLike);
export const chainConfig = createChainConfig(chains);
export const exchangeConfig = createExchangeConfig(exchanges);
export const coinConfig = createCoinConfig(coins);

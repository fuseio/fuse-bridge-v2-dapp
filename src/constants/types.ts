import { TokenConfig, type AppConfigLike } from "@layerzerolabs/ui-app-config";
export interface ChainConfigLike {
  chainId: number;
  chainName: string;
  icon: string;
}

export interface ChainConfig {
  chains: ChainConfigLike[];
}

export interface ExchangeConfig {
  exchanges: ExchangeConfigLike[];
}

export const createChainConfig = (config: ChainConfigLike[]): ChainConfig => {
  return {
    chains: config,
  };
};

export const createExchangeConfig = (
  config: ExchangeConfigLike[]
): ExchangeConfig => {
  return {
    exchanges: config,
  };
};

export interface CoinConfigLike {
  name: string;
  symbol: string;
  decimals: number;
  icon: string;
}

export interface ExchangeConfigLike {
  name: string;
  icon: string;
  website: string;
}

export interface CoinConfig {
  coins: CoinConfigLike[];
}

export const createCoinConfig = (config: CoinConfigLike[]): CoinConfig => {
  return {
    coins: config,
  };
};

export interface BridgeConfigLike {
  version: number;
  original: {
    chainId: number;
    address: string;
  }[];
  wrapped: {
    chainId: number;
    address: string;
  };
  tokens: {
    chainId: number;
    decimals: number;
    symbol: string;
    name: string;
    address: string;
  }[][];
}

interface WrappedBridgeConfig {
  version: number;
  wrapped: {
    chainId: number;
    address: string;
  };
  chains: {
    chainId: number;
    name: string;
    icon: string;
    bridge: string | undefined;
    tokens:
      | {
          decimals: number;
          symbol: string;
          name: string;
          address: string;
          icon: string;
        }[];
  }[];
}

export interface BrideConfig {
  wrappedBridge: WrappedBridgeConfig;
}

export const createAppConfig = (
  brideConfig: BridgeConfigLike,
  chainConfig: ChainConfig,
  tokenConfig: CoinConfig
): BrideConfig => {
  return {
    wrappedBridge: {
      version: brideConfig.version,
      wrapped: {
        chainId: brideConfig.wrapped.chainId,
        address: brideConfig.wrapped.address,
      },
      chains: chainConfig.chains.map((chain) => {
        let tokens: {
          decimals: number;
          symbol: string;
          name: string;
          address: string;
          icon: string;
        }[] = [];
        if (brideConfig.tokens.length > 0) {
          tokenConfig.coins.forEach((coin) => {
            const token = brideConfig.tokens
              .find((token) => token[0].symbol === coin.symbol)
              ?.find((token) => token.chainId === chain.chainId);
            if (token) {
              tokens.push({
                ...token,
                icon: coin.icon,
              });
            }
          });
        }
        return {
          chainId: chain.chainId,
          name: chain.chainName,
          icon: chain.icon,
          bridge: brideConfig.original.find(
            (bridge) => bridge.chainId === chain.chainId
          )?.address,
          tokens: tokens,
        };
      }),
    },
  };
};

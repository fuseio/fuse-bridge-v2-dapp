import { TokenConfig, type AppConfigLike } from "@layerzerolabs/ui-app-config";
export interface ChainConfigLike {
  lzChainId: number;
  chainName: string;
  icon: string;
  rpc: string;
  chainId: number;
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
    lzChainId: number;
    address: string;
    tokens: {
      decimals: number;
      symbol: string;
      name: string;
      address: string;
      icon: string;
    }[];
  };
  chains: {
    lzChainId: number;
    chainId: number;
    name: string;
    icon: string;
    bridge: string;
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

export interface BridgeConfig {
  wrappedBridge: WrappedBridgeConfig;
}

export const createAppConfig = (
  bridgeConfig: BridgeConfigLike,
  chainConfig: ChainConfig,
  tokenConfig: CoinConfig
): BridgeConfig => {
  let wrappedTokens: {
    decimals: number;
    symbol: string;
    name: string;
    address: string;
    icon: string;
  }[] = [];
  if (bridgeConfig.tokens.length > 0) {
    tokenConfig.coins.forEach((coin) => {
      const token = bridgeConfig.tokens
        .find((token) => token[0].symbol === coin.symbol)
        ?.find((token) => token.chainId === bridgeConfig.wrapped.chainId);
      if (token) {
        wrappedTokens.push({
          ...token,
          icon: coin.icon,
        });
      }
    });
  }
  return {
    wrappedBridge: {
      version: bridgeConfig.version,
      wrapped: {
        lzChainId: bridgeConfig.wrapped.chainId,
        address: bridgeConfig.wrapped.address,
        tokens: wrappedTokens,
      },
      chains: chainConfig.chains.map((chain) => {
        let tokens: {
          decimals: number;
          symbol: string;
          name: string;
          address: string;
          icon: string;
        }[] = [];
        if (bridgeConfig.tokens.length > 0) {
          tokenConfig.coins.forEach((coin) => {
            const token = bridgeConfig.tokens
              .find((token) => token[0].symbol === coin.symbol)
              ?.find((token) => token.chainId === chain.lzChainId);
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
          lzChainId: chain.lzChainId,
          name: chain.chainName,
          icon: chain.icon,
          bridge: bridgeConfig.original.find(
            (bridge) => bridge.chainId === chain.lzChainId
          )?.address as string,
          tokens: tokens,
        };
      }),
    },
  };
};

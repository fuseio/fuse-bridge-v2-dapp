import { disabledChains } from "./disabledChains";

export interface ChainConfigLike {
  lzChainId: number;
  chainName: string;
  icon: string;
  rpc: string;
  chainId: number;
}

export interface DisabledChainConfigLike {
  chainName: string;
  icon: string;
  appName: string;
  appLogo: string;
  appURL: string;
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
  bridges: {
    name: string;
    icon: string;
    website: string;
  }[];
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
  disabledChains: DisabledChainConfigLike[];
  chains: {
    lzChainId: number;
    chainId: number;
    name: string;
    icon: string;
    bridge: string;
    rpcUrl: string;
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
      disabledChains: disabledChains,
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
                address: token.address,
                decimals: token.decimals,
                name: token.name,
                symbol: token.symbol,
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
          rpcUrl: chain.rpc,
        };
      }),
    },
  };
};

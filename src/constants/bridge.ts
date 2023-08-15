export const bridgeConfig = {
  version: 2,
  fuse: {
    chainId: 138,
    wrapped: "0xD1Ac21964B2f8e4AFD153e2EBD1A7c1cbC906232",
  },
  original: [
    {
      address: "0xaed3be75aa2b9b6cdc2c88517f37789edac3b2cd",
      chainId: 109,
    },
    {
      address: "0x4FC9bDf473169f7e166e754B597BF16ea100f34E",
      chainId: 145,
    },
  ],
  wrapped: [
    {
      address: "0x9145a2AAf6D26835B75F82A3627F9710f8Ff42a9",
      chainId: 109,
    },
    {
      address: "0xacf8b63990C4097996cb4e54A8ea233B4A1Aae26",
      chainId: 145,
    },
  ],
  originalFuse: [
    {
      address: "0xaed3be75aa2b9b6cdc2c88517f37789edac3b2cd",
      chainId: 109,
    },
    {
      address: "0x0724e10e5e4dAe33bF5A70B4dfaF5C0709Ee31B9",
      chainId: 145,
    },
  ],
  tokens: [
    [
      {
        chainId: 138,
        decimals: 6,
        symbol: "USDC",
        name: "USD Coin",
        isBridged: true,
        isNative: false,
        address: "0xACc70d3F4E7BA788eaC341940a059BA0F64B3F70",
      },
      {
        chainId: 109,
        decimals: 6,
        symbol: "USDC",
        name: "USD Coin (PoS)",
        isBridged: false,
        isNative: false,
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      },
      {
        chainId: 145,
        decimals: 6,
        symbol: "USDC",
        name: "USD//C on xDai",
        isBridged: false,
        isNative: false,
        address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
      },
    ],
    [
      {
        chainId: 138,
        decimals: 18,
        symbol: "FUSE",
        name: "FUSE",
        isBridged: false,
        isNative: true,
      },
      {
        chainId: 109,
        decimals: 18,
        symbol: "FUSE",
        name: "FUSE",
        isBridged: true,
        isNative: true,
        address: "0xEB78AcE67166F4e1d11104f4ee392DF95dA2Ee1d",
      },
      {
        chainId: 145,
        decimals: 18,
        symbol: "FUSE",
        name: "FUSE",
        isBridged: true,
        isNative: true,
        address: "0x1eB36C6ae1BCc157884a69292e322cfF13B0C729",
      },
    ],
  ],
};

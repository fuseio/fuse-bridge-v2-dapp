export const bridgeConfig = {
  version: 2,
  fuse: {
    chainId: 138,
    wrapped: "0xD1Ac21964B2f8e4AFD153e2EBD1A7c1cbC906232",
  },
  original: [
    {
      address: "0xf13E38a2712d0d8B9F2cc6273b477c2E226aBaf2",
      chainId: 109,
    },
    {
      address: "0x4FC9bDf473169f7e166e754B597BF16ea100f34E",
      chainId: 145,
    },
    {
      address: "0xC228745fa51493953EC541cd8a1A4E701dF59198",
      chainId: 111,
    },
    {
      address: "0x4433cb67B36769C9B7e3370a07d833686e533Ed2",
      chainId: 110,
    },
  ],
  wrapped: [
    {
      address: "0xDC37922417CD39eC47656dc4D4D1F77Bf092b8C4",
      chainId: 109,
    },
    {
      address: "0xc4250151baA72aAF19E5Ae16DaDC1aC138786D2D",
      chainId: 145,
    },
    {
      address: "0x7cD0A46CdF7a47A0d62A3Cf5Bda959dc95dE0C20",
      chainId: 111,
    },
    {
      address: "0x60e0c697b119ab5306cb748Fced80D7B5065e796",
      chainId: 110,
    },
  ],
  originalFuse: [
    {
      address: "0x332Dad0edca11b4557D81Ebc7b36718dc6C26B9d",
      chainId: 109,
    },
    {
      address: "0xfd7dd23a97d08DF2c6Ce548D96B932c87D1aB42F",
      chainId: 145,
    },
    {
      address: "0x78b4B46F94c1544FcD81B8f4C5f13557134d1D89",
      chainId: 111,
    },
    {
      address: "0xc30Aa40e311D58863700BD2584073a6aB4f807cB",
      chainId: 110,
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
      {
        chainId: 111,
        decimals: 6,
        symbol: "USDC",
        name: "USDC Coin",
        isBridged: false,
        isNative: false,
        address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
      },
      {
        chainId: 110,
        decimals: 6,
        symbol: "USDC",
        name: "USDC Coin",
        isBridged: false,
        isNative: false,
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
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
        address: "",
      },
      {
        chainId: 109,
        decimals: 18,
        symbol: "FUSE",
        name: "FUSE",
        isBridged: true,
        isNative: true,
        address: "0x6D17B36deE78bcc1cba11f98390C89baFf7e5aB4",
      },
      {
        chainId: 145,
        decimals: 18,
        symbol: "FUSE",
        name: "FUSE",
        isBridged: true,
        isNative: true,
        address: "0x3973e9cAE693A95CB5D78E8875d042fD19942D9b",
      },
      {
        chainId: 111,
        decimals: 18,
        symbol: "FUSE",
        name: "FUSE",
        isBridged: true,
        isNative: true,
        address: "0xBE97d90A525eCd5e6a0102483C5817D5799F9cB3",
      },
      {
        chainId: 110,
        decimals: 18,
        symbol: "FUSE",
        name: "FUSE",
        isBridged: true,
        isNative: true,
        address: "0x491D56121c2A212407B5A8348ad7905EE1aE9b60",
      },
    ],
  ],
};

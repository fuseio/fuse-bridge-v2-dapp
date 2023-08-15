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
    ],
  ],
};

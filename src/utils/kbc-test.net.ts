
export const KBCTestnet = {
  id: 22000,
  name: 'KBC TESTNET',
  network: 'kbc-testnet',
  nativeCurrency: {
    name: 'Test KBC',
    symbol: 'TKBC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.kbcfoundation.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'KBC Testnet Explorer',
      url: 'https://testnet-explorer.kbcfoundation.com',
    },
  },
  testnet: true,
};

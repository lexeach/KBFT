
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


// // import { defineChain } from '../../utils/chain/defineChain.js'
// import { defineChain } from '/Users/algocoder/Desktop/gutam/KBFT-1.1/node_modules/viem/utils/chain/defineChain.ts'
// // import { defineChain } from '/Users/nasir/Desktop/Personal/Gautam/update-code-with-connect-btn/node_modules/viem/utils/chain/defineChain.ts'

// export const kbcTestnet = {
//   // export const kbcTestnet = /*#__PURE__*/ defineChain({
//   id: 22000,
//   name: 'KBC TESTNET',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'KBC',
//     symbol: 'TKBC',
//   },
//   rpcUrls: {
//     default: { http: ['https://testnet-rpc.kbcfoundation.com'] },
//   },
//   blockExplorers: {
//     default: {
//       name: 'KBCScan',
//       url: 'https://testnet-scan.kbcfoundation.com',
//       apiUrl: 'https://testnet-scan.kbcfoundation.com/api',
//     },
//   },
//   contracts: {
//     multicall3: {
//       address: '0xca11bde05977b3631167028862be2a173976ca11',
//       blockCreated: 1742248,
//     },
//   },
//   testnet: true,
// }
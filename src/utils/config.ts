import { http, createConfig } from 'wagmi'
// import { bscTestnet } from 'wagmi/chains'
import { KBCTestnet } from './kbc-test.net'

export const config = createConfig({
  chains: [ KBCTestnet],
  transports: {
    [KBCTestnet.id]: http(),
  },
})
import { baseSepolia } from 'thirdweb/chains';
import { inAppWallet } from 'thirdweb/wallets';

export const wallets = [
  inAppWallet({
    auth: {
      options: ["passkey"],
      passkeyDomain: "thirdweb.com",
    },
    smartAccount: {
      chain: baseSepolia,
      sponsorGas: true,
    },
  }),
]; 
import React from 'react';
import { StyleSheet } from 'react-native';
import { ConnectButton } from 'thirdweb/react';
import { client } from '@/constants/thirdweb';
import { baseSepolia } from 'thirdweb/chains';
import { useColorScheme } from 'react-native';
import { wallets } from '@/app/(tabs)/index'; // Import the wallets array from your index file

export function ConnectWallet() {
  const theme = useColorScheme();

  return (
    <ConnectButton
      client={client}
      theme={theme || "dark"}
      wallets={wallets}
      chain={baseSepolia}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
});
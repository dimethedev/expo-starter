import { StyleSheet, View, useColorScheme, Pressable } from "react-native";
import { TokenList } from "@/components/TokenList";
import { ActionButtons } from "@/components/ActionButtons";
import { ParallaxScrollView } from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useActiveAccount } from "thirdweb/react";
import { ConnectWallet } from "@/components/ConnectWallet";
import { theme } from "@/constants/theme";
import { ThemedButton } from "@/components/ThemedButton";
import { useConnect } from "thirdweb/react";
import { inAppWallet, createWallet, hasStoredPasskey } from "thirdweb/wallets";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from 'react';
import { createThirdwebClient } from "thirdweb";
import { chain } from "@/constants/chain";
import { SendModal } from "@/components/SendModal";


const client = createThirdwebClient({
  clientId: process.env.EXPO_PUBLIC_THIRDWEB_CLIENT_ID,
});

export const ConnectWithGoogle = () => {
  const { connect, isConnecting } = useConnect();
  return (
    <ThemedButton
      title="Connect with Google"
      loading={isConnecting}
      loadingTitle="Connecting..."
      onPress={() => {
        connect(async () => {
          const w = inAppWallet({
            smartAccount: {
              chain,
              sponsorGas: true,
            },
          });
          await w.connect({
            client,
            strategy: "google",
          });
          return w;
        });
      }}
    />
  );
};

export const ConnectWithMetaMask = () => {
  const { connect, isConnecting } = useConnect();
  return (
    <ThemedButton
      title="Connect with MetaMask"
      variant="secondary"
      loading={isConnecting}
      loadingTitle="Connecting..."
      onPress={() => {
        connect(async () => {
          const w = createWallet("io.metamask");
          await w.connect({
            client,
          });
          return w;
        });
      }}
    />
  );
};

export const ConnectWithPasskey = () => {
  const { connect } = useConnect();
  return (
    <ThemedButton
      title="Login with Passkey"
      onPress={() => {
        connect(async () => {
          const hasPasskey = await hasStoredPasskey(client);
          const w = inAppWallet({
            auth: {
              options: ["passkey"],
              passkeyDomain: "thirdweb.com",
            },
          });
          await w.connect({
            client,
            strategy: "passkey",
            type: hasPasskey ? "sign-in" : "sign-up",
          });
          return w;
        });
      }}
    />
  );
};

export default function HomeScreen() {
  const account = useActiveAccount();
  const colorScheme = useColorScheme();
  const colors = theme.colors[colorScheme || 'dark'];

  const mockTokens = [
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: "1.234",
      value: "2,468.12",
      icon: require("@/assets/images/eth-icon.png"),
    },
  ];

  const [showNetworks, setShowNetworks] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('Sonic');
  const networks = ['Sonic', 'Solana', 'Base', 'Ethereum'];

  // Add state for modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#0D1B24", dark: "#0D1B24" }}
    >
      <ThemedView style={styles.balanceContainer}>
        <ThemedView style={styles.balanceWrapper}>
          <ThemedText 
            type="title" 
            style={styles.balanceText}
          >
            $1234.56
          </ThemedText>
          <ThemedText 
            type="subtext" 
            style={styles.balanceLabel}
          >
            Your Balance
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ActionButtons />

      <ThemedView style={styles.tabContainer}>
        <ThemedButton 
          title="Tokens" 
          variant="outline"
          style={styles.tabButton} 
        />
        <ThemedButton 
          title="NFTs" 
          variant="outline"
          style={styles.tabButton} 
        />
      </ThemedView>
      
      <TokenList 
        tokens={mockTokens}
        onTokenPress={(token) => console.log('Token pressed:', token)}
      />

      {!account && <ConnectWallet />}
      
      <SendModal 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)}
        connectedClient={client} 
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B24', // Dark blue background
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    opacity: 0.1,
  },
  balanceContainer: {
    paddingVertical: 12,
    width: '100%',
  },
  balanceWrapper: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  balanceText: {
    fontSize: 32, // Slightly reduced from 36
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 8,
    includeFontPadding: false, // This helps with text layout consistency
    lineHeight: 40, // Explicit line height to prevent cutting off
  },
  balanceLabel: {
    marginTop: 4,
    fontSize: 16,
    textAlign: 'center',
  },
  networkContainer: {
    paddingHorizontal: 20,
    marginTop: 4,
  },
  networkIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  networkIconWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  networkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00000040',
  },
  networkLabel: {
    fontSize: 12,
    color: '#000000',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 2,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  tabButton: {
    flex: 1,
    borderColor: '#FFFFFF40',
    borderRadius: 20,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 16,
    zIndex: 2, // Ensure container is above other elements
  },
  listHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 3, // Higher than listHeaderContainer
  },
  networkDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#162B35',
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  networkText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  networkList: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: 150,
    backgroundColor: '#162B35',
    borderRadius: 8,
    marginTop: 4,
    zIndex: 999, // Very high to ensure it's above everything
  },
  networkOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF10',
  },
  networkOptionText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

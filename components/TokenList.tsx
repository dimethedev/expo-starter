import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  icon: any; // You'll want to type this properly based on your icon system
  value?: string;
}

interface TokenListProps {
  tokens: Token[];
  onTokenPress?: (token: Token) => void;
}

export function TokenList({ tokens, onTokenPress }: TokenListProps) {
  const [showNetworks, setShowNetworks] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('Sonic');
  const networks = ['Sonic', 'Solana', 'Base', 'Ethereum'];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.listHeaderContainer}>
        <ThemedText style={styles.listHeaderText}>Tokens</ThemedText>
        <View style={styles.dropdownContainer}>
          <Pressable 
            style={styles.networkDropdown}
            onPress={() => setShowNetworks(!showNetworks)}
          >
            <ThemedText style={styles.networkText}>{selectedNetwork}</ThemedText>
            <Ionicons 
              name={showNetworks ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#FFFFFF" 
            />
          </Pressable>
          {showNetworks && (
            <ThemedView style={styles.networkList}>
              {networks.map((network) => (
                <Pressable
                  key={network}
                  style={styles.networkOption}
                  onPress={() => {
                    setSelectedNetwork(network);
                    setShowNetworks(false);
                  }}
                >
                  <ThemedText style={styles.networkOptionText}>{network}</ThemedText>
                </Pressable>
              ))}
            </ThemedView>
          )}
        </View>
      </ThemedView>

      {tokens.map((token, index) => (
        <Pressable
          key={`${token.symbol}-${index}`}
          onPress={() => onTokenPress?.(token)}
        >
          <ThemedView style={styles.tokenRow}>
            <View style={styles.leftContent}>
              <Image source={token.icon} style={styles.tokenIcon} />
              <View>
                <ThemedText>{token.name}</ThemedText>
                <ThemedText type="subtext">{token.symbol}</ThemedText>
              </View>
            </View>
            <View style={styles.rightContent}>
              <ThemedText>{token.balance}</ThemedText>
              {token.value && (
                <ThemedText type="subtext">${token.value}</ThemedText>
              )}
            </View>
          </ThemedView>
        </Pressable>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    zIndex: 1,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 2, // Ensure container is above other elements
  },
  listHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
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
    elevation: 5, // For Android
    borderWidth: 1,
    borderColor: '#FFFFFF20',
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
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3E50',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  tokenIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
}); 
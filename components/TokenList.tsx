import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

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
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.header}>Tokens</ThemedText>
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
  },
  header: {
    marginBottom: 16,
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
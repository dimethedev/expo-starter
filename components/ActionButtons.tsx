import React, { useState } from 'react';
import { ThemedButton } from './ThemedButton';
import { useActiveAccount } from 'thirdweb/react';
import { AddressModal } from './AddressModal';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

export function ActionButtons() {
  const account = useActiveAccount();
  const [showAddress, setShowAddress] = useState(false);

  const actions = [
    {
      icon: 'arrow-up-outline',
      label: 'Send',
      onPress: () => console.log('Send pressed'),
    },
    {
      icon: 'git-compare-outline',
      label: 'Bridge',
      onPress: () => console.log('Bridge pressed'),
    },
    {
      icon: 'arrow-down-outline',
      label: 'Receive',
      onPress: () => setShowAddress(true),
    },
    {
      icon: 'apps-outline',
      label: 'DeFi',
      onPress: () => console.log('DeFi pressed'),
    },
  ];

  return (
    <>
      <View style={styles.container}>
        {actions.map((action, index) => (
          <Pressable
            key={index}
            style={styles.actionButton}
            onPress={action.onPress}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={action.icon} size={24} color="#FFFFFF" />
            </View>
            <ThemedText style={styles.label}>{action.label}</ThemedText>
          </Pressable>
        ))}
      </View>

      {account && (
        <AddressModal
          visible={showAddress}
          address={account.address}
          onClose={() => setShowAddress(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
  },
}); 
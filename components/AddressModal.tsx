import React, { useState } from 'react';
import { Modal, StyleSheet, View, Pressable, Clipboard } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface AddressModalProps {
  visible: boolean;
  address: string;
  onClose: () => void;
}

export function AddressModal({ visible, address, onClose }: AddressModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setString(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <ThemedView style={styles.modalView}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Receive</ThemedText>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
          <ThemedText style={styles.subtitle}>Your Public Address</ThemedText>
          <ThemedView style={styles.addressContainer}>
            <View style={styles.addressRow}>
              <ThemedText style={styles.address}>{address}</ThemedText>
              <Pressable 
                onPress={copyToClipboard}
                style={({ pressed }) => [
                  styles.copyButton,
                  pressed && styles.copyButtonPressed
                ]}
              >
                <Ionicons 
                  name={copied ? "checkmark" : "copy-outline"} 
                  size={20} 
                  color="#FFFFFF" 
                />
              </Pressable>
            </View>
          </ThemedView>
          {copied && (
            <ThemedText style={styles.copiedText}>Address copied!</ThemedText>
          )}
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#162B35',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF80',
    marginBottom: 12,
  },
  addressContainer: {
    backgroundColor: '#0D1B24',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  address: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  copyButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#3498db',
  },
  copyButtonPressed: {
    backgroundColor: '#2980b9',
  },
  copiedText: {
    color: '#2ecc71',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
}); 
import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { ThemedButton } from './ThemedButton';
import { ThemedInput } from './ThemedInput';
import { Ionicons } from '@expo/vector-icons';
import { useSendTransaction, useActiveAccount, useEstimateGas, useWalletBalance } from 'thirdweb/react';
interface SendModalProps {
  visible: boolean;
  onClose: () => void;
}
export function SendModal({ visible, onClose }: SendModalProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { mutate: sendTransaction, isLoading } = useSendTransaction();
  const [estimatedGas, setEstimatedGas] = useState<string | null>(null);
  // For now, we're just showing the native token info
  const tokenInfo = {
    symbol: 'S',
    name: 'Sonic',
    chainId: 146,
    decimals: 18,
  };

  const currentWallet = useActiveAccount();
  console.log("Attempting to get wallet balance");

  // Get balance for the selected token
  const { data: balance, error: balanceError, isLoading: balanceLoading } = useWalletBalance({
    chain: {
      chainId: 146,
      rpc: ["https://rpc.soniclabs.com"],
      name: "Sonic",
      nativeCurrency: {
        name: "Sonic",
        symbol: "S",
        decimals: 18
      },
      shortName: "sonic",
      slug: "sonic",
      chain: "sonic",
      testnet: false,
      network: "sonic"
    },
    address: currentWallet?.address,
    token: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  });

  // Add immediate logging
  console.log("Balance request params:", {
    chain: {
      chainId: 146,
      rpc: ["https://rpc.soniclabs.com"],
      name: "Sonic"
    },
    address: currentWallet?.address,
    token: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  });

  // Add more detailed error logging
  useEffect(() => {
    if (balanceError) {
      console.error("Detailed balance error:", {
        error: balanceError,
        message: balanceError?.message,
        cause: balanceError?.cause
      });
    }
  }, [balanceError]);

  useEffect(() => {
    console.log("Balance effect triggered");
    if (balanceLoading) {
      console.log("Loading balance...");
    }
    if (balanceError) {
      console.error("Balance error:", balanceError);
    }
    if (balance) {
      console.log("Balance received:", balance);
    }
    console.log("Current wallet:", currentWallet?.address);
  }, [balance, balanceError, balanceLoading, currentWallet]);

  // Estimate gas when recipient and amount change
  const { data: gasEstimate, isLoading: isEstimating } = useEstimateGas({
    to: recipient,
    value: amount,
    enabled: !!recipient && !!amount,
  });
  useEffect(() => {
    if (gasEstimate) {
      setEstimatedGas(gasEstimate.toString());
    }
  }, [gasEstimate]);

  // Reset states when modal opens
  useEffect(() => {
    if (visible) {
      setRecipient('');
      setAmount('');
      setError(null);
      setEstimatedGas(null);
    }
  }, [visible]);

  // Validate amount against balance immediately when modal opens and when amount changes
  useEffect(() => {
    if (!balance) {
      setError('Unable to fetch balance');
      return;
    }

    if (!amount) {
      setError(null);
      return;
    }

    const amountValue = parseFloat(amount);
    const balanceValue = parseFloat(balance.displayValue);
    
    if (isNaN(amountValue)) {
      setError('Please enter a valid number');
    } else if (amountValue <= 0) {
      setError('Amount must be greater than 0');
    } else if (amountValue > balanceValue) {
      setError(`Insufficient balance. You have ${balanceValue} ${tokenInfo.symbol}`);
    } else {
      setError(null);
    }
  }, [amount, balance, tokenInfo.symbol]);

  const handleSend = async () => {
    if (!balance) {
      setError('Unable to fetch balance');
      return;
    }

    const amountValue = parseFloat(amount);
    const balanceValue = parseFloat(balance.displayValue);

    if (amountValue > balanceValue) {
      setError(`Insufficient balance. You have ${balanceValue} ${tokenInfo.symbol}`);
      return;
    }

    if (error) return;
    
    try {
      await sendTransaction({
        to: recipient,
        value: amount,
        chainId: tokenInfo.chainId,
      });
      onClose();
    } catch (error) {
      console.error('Transaction failed:', error);
      setError('Transaction failed');
    }
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
            <ThemedText style={styles.title}>Send {tokenInfo.symbol}</ThemedText>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color="#000000" />
            </Pressable>
          </View>

      <View style={styles.tokenInfo}>
        <View style={styles.tokenBadge}>
          <ThemedText style={styles.tokenSymbol}>{tokenInfo.symbol}</ThemedText>
        </View>
        <View>
          <ThemedText style={styles.tokenName}>{tokenInfo.name} Token</ThemedText>
          <ThemedText style={styles.balance}>
            Balance: {balance ? parseFloat(balance.displayValue).toFixed(4) : '0'} {tokenInfo.symbol}
          </ThemedText>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Recipient Address</ThemedText>
          <ThemedInput
            value={recipient}
            onChangeText={setRecipient}
            placeholder="0x..."
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Amount ({tokenInfo.symbol})</ThemedText>
          <ThemedInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0.0"
            keyboardType="decimal-pad"
            style={styles.input}
          />
        </View>

        {estimatedGas && (
          <View style={styles.gasEstimate}>
            <ThemedText style={styles.gasText}>
              Estimated Gas: {isEstimating ? 'Calculating...' : `${estimatedGas} ${tokenInfo.symbol}`}
            </ThemedText>
          </View>
        )}

        <ThemedButton
          title={isLoading ? "Sending..." : "Send"}
          onPress={handleSend}
          disabled={isLoading || !recipient || !amount || !!error}
          style={styles.sendButton}
        />

        {error && (
          <ThemedText style={styles.errorText}>
            {error}
          </ThemedText>
        )}
      </View>
    </ThemedView>
  </View>
</Modal>

  );
}
const styles = StyleSheet.create({
  // ... existing styles ...
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  tokenBadge: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tokenSymbol: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tokenName: {
    color: '#00000080',
    fontSize: 16,
  },
  balance: {
    color: '#00000080',
    fontSize: 14,
    marginTop: 2,
  },
  gasEstimate: {
    backgroundColor: '#0D1B24',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  gasText: {
    color: '#000000',
    fontSize: 14,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#000000',
  },
  input: {
    backgroundColor: '#0D1B24',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
    padding: 12,
    color: '#000000',
  },
  sendButton: {
    marginTop: 8,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
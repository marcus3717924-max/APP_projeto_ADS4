import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
}

const HomeScreen = () => {
  const transactions: Transaction[] = [
    { id: '1', title: 'FreeLancer', category: 'Ganhos', amount: 100 },
    { id: '2', title: 'Padaria', category: 'Gastos', amount: -30 },
    { id: '3', title: 'Fiis', category: 'Investimentos', amount: -130 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meu App Finanças</Text>
        </View>

        {/* Cards Grid */}
        <View style={styles.cardsContainer}>
          <View style={styles.cardRow}>
            <View style={[styles.card, styles.cardBlue]}>
              <Text style={styles.cardLabel}>Saldo Total</Text>
              <Text style={styles.cardValue}>R$ 935,00</Text>
            </View>
            <View style={[styles.card, styles.cardGreen]}>
              <Text style={styles.cardLabel}>Ganhos</Text>
              <Text style={styles.cardValue}>R$ 3000,00</Text>
            </View>
          </View>
          <View style={styles.cardRow}>
            <View style={[styles.card, styles.cardRed]}>
              <Text style={styles.cardLabel}>Gastos</Text>
              <Text style={styles.cardValue}>R$ 2065,00</Text>
            </View>
            <View style={[styles.card, styles.cardYellow]}>
              <Text style={styles.cardLabel}>Investimentos</Text>
              <Text style={styles.cardValue}>R$ 300,00</Text>
            </View>
          </View>
        </View>

        {/* Transações Recentes */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Transações Recentes</Text>
          <View style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>
                    {transaction.title}
                  </Text>
                  <Text style={styles.transactionCategory}>
                    {transaction.category}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    transaction.amount > 0 && styles.positiveAmount,
                  ]}>
                  R$ {Math.abs(transaction.amount)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardsContainer: {
    padding: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardBlue: {
    backgroundColor: '#4A90E2',
  },
  cardGreen: {
    backgroundColor: '#50C878',
  },
  cardRed: {
    backgroundColor: '#FF6B6B',
  },
  cardYellow: {
    backgroundColor: '#FFD93D',
  },
  cardLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  transactionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  positiveAmount: {
    color: '#50C878',
  },
});

export default HomeScreen;
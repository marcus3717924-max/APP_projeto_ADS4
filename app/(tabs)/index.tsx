import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'income' | 'expense' | 'investment';
}

const HomeScreen = () => {
  const router = useRouter();

  const transactions: Transaction[] = [
    { id: '1', title: 'FreeLancer', category: 'Ganhos', amount: 100, type: 'income' },
    { id: '2', title: 'Padaria', category: 'Gastos', amount: -30, type: 'expense' },
    { id: '3', title: 'Fiis', category: 'Investimentos', amount: -130, type: 'investment' },
  ];

  const handleCardPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, Usuário</Text>
            <Text style={styles.headerTitle}>Visão Geral Financeira</Text>
          </View>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>U</Text>
          </View>
        </View>

        {/* Saldo Total Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Total</Text>
          <Text style={styles.balanceValue}>R$ 935,00</Text>
          <View style={styles.balanceIndicator}>
            <Text style={styles.balanceChange}>+2.5%</Text>
            <Text style={styles.balanceChangeLabel}>este mês</Text>
          </View>
        </View>

        {/* Cards Grid */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity 
            style={[styles.card, styles.cardIncome]}
            activeOpacity={0.7}
            onPress={() => handleCardPress('/ganhos')}
          >
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>↑</Text>
            </View>
            <Text style={styles.cardLabel}>Ganhos</Text>
            <Text style={styles.cardValue}>R$ 3.000,00</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.card, styles.cardExpense]}
            activeOpacity={0.7}
            onPress={() => handleCardPress('/gastos')}
          >
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>↓</Text>
            </View>
            <Text style={styles.cardLabel}>Gastos</Text>
            <Text style={styles.cardValue}>R$ 2.065,00</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity 
            style={[styles.card, styles.cardInvestment]}
            activeOpacity={0.7}
            onPress={() => handleCardPress('/investimentos')}
          >
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>📊</Text>
            </View>
            <Text style={styles.cardLabel}>Investimentos</Text>
            <Text style={styles.cardValue}>R$ 300,00</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.card, styles.cardSavings]}
            activeOpacity={0.7}
          >
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>🎯</Text>
            </View>
            <Text style={styles.cardLabel}>Economia</Text>
            <Text style={styles.cardValue}>31%</Text>
          </TouchableOpacity>
        </View>

        {/* Transações Recentes */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Transações Recentes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIconContainer,
                    transaction.type === 'income' && styles.incomeIcon,
                    transaction.type === 'expense' && styles.expenseIcon,
                    transaction.type === 'investment' && styles.investmentIcon,
                  ]}>
                    <Text style={styles.transactionIcon}>
                      {transaction.type === 'income' ? '↑' : 
                       transaction.type === 'expense' ? '↓' : '📊'}
                    </Text>
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionTitle}>{transaction.title}</Text>
                    <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    transaction.amount > 0 && styles.positiveAmount,
                    transaction.amount < 0 && styles.negativeAmount,
                  ]}>
                  {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount)}
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
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0F172A',
    paddingVertical: 28,
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  balanceCard: {
    backgroundColor: '#8B5CF6',
    marginHorizontal: 24,
    marginTop: -20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 12,
  },
  balanceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceChange: {
    fontSize: 14,
    color: '#86EFAC',
    fontWeight: '700',
    marginRight: 6,
  },
  balanceChangeLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    marginTop: 16,
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardIncome: {
    backgroundColor: '#10B981',
  },
  cardExpense: {
    backgroundColor: '#EF4444',
  },
  cardInvestment: {
    backgroundColor: '#3B82F6',
  },
  cardSavings: {
    backgroundColor: '#F59E0B',
  },
  cardIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 20,
  },
  cardLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  transactionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  seeAll: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  transactionsList: {
    gap: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  incomeIcon: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  expenseIcon: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  investmentIcon: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  transactionIcon: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  transactionAmount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  positiveAmount: {
    color: '#10B981',
  },
  negativeAmount: {
    color: '#EF4444',
  },
});

export default HomeScreen;
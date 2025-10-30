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

interface Investimento {
  id: string;
  title: string;
  description: string;
  amount: number;
}

const InvestimentosScreen = () => {
  const investimentos: Investimento[] = [
    { id: '1', title: 'Fiis', description: 'HFOF11', amount: 130 },
    { id: '2', title: 'Renda Fixa', description: 'Caixinha Nubank', amount: 170 },
  ];

  const totalInvestimentos = investimentos.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header com Total */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Investimentos</Text>
        <Text style={styles.headerTotal}>
          R$ {totalInvestimentos.toFixed(2).replace('.', ',')}
        </Text>
      </View>

      {/* Botão Adicionar */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Investimentos com Borda Cinza */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.listContainer}>
          <View style={styles.listInner}>
            {investimentos.map((investimento, index) => (
              <View 
                key={investimento.id} 
                style={[
                  styles.investimentoItem,
                  index === investimentos.length - 1 && styles.lastItem
                ]}
              >
                <View style={styles.investimentoInfo}>
                  <Text style={styles.investimentoTitle}>{investimento.title}</Text>
                  <Text style={styles.investimentoDescription}>{investimento.description}</Text>
                </View>
                <Text style={styles.investimentoAmount}>
                  R$ {investimento.amount.toFixed(2).replace('.', ',')}
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
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  headerTotal: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  addButtonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#e8e8e8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  addButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#D3D3D3',
    borderRadius: 16,
    padding: 4,
  },
  listInner: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  investimentoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  investimentoInfo: {
    flex: 1,
  },
  investimentoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  investimentoDescription: {
    fontSize: 14,
    color: '#999',
  },
  investimentoAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginLeft: 12,
  },
});

export default InvestimentosScreen;
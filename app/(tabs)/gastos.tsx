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

interface Gasto {
  id: string;
  title: string;
  description: string;
  amount: number;
}

const GastosScreen = () => {
  const gastos: Gasto[] = [
    { id: '1', title: 'Padaria', description: 'Lanche da Tarde', amount: 30 },
    { id: '2', title: 'Padaria', description: 'Café da manhã', amount: 35 },
    { id: '3', title: 'Mercado', description: 'Mês Atual', amount: 1300 },
    { id: '4', title: 'Água', description: 'Mês Atual', amount: 350 },
    { id: '5', title: 'Luz', description: 'Mês Atual', amount: 350 },
  ];

  const totalGastos = gastos.reduce((sum, gasto) => sum + gasto.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header com Total */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Gastos</Text>
        <Text style={styles.headerTotal}>
          R$ {totalGastos.toFixed(2).replace('.', ',')}
        </Text>
      </View>

      {/* Botão Adicionar */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Gastos com Borda Roxa */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.listContainer}>
          <View style={styles.listInner}>
            {gastos.map((gasto, index) => (
              <View 
                key={gasto.id} 
                style={[
                  styles.gastoItem,
                  index === gastos.length - 1 && styles.lastItem
                ]}
              >
                <View style={styles.gastoInfo}>
                  <Text style={styles.gastoTitle}>{gasto.title}</Text>
                  <Text style={styles.gastoDescription}>{gasto.description}</Text>
                </View>
                <Text style={styles.gastoAmount}>
                  R$ {gasto.amount.toFixed(2).replace('.', ',')}
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
    borderColor: '#9B7EDE',
    borderRadius: 16,
    padding: 4,
  },
  listInner: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  gastoItem: {
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
  gastoInfo: {
    flex: 1,
  },
  gastoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  gastoDescription: {
    fontSize: 14,
    color: '#999',
  },
  gastoAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginLeft: 12,
  },
});

export default GastosScreen;
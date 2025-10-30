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

interface Ganho {
  id: string;
  title: string;
  description: string;
  amount: number;
}

const GanhosScreen = () => {
  const ganhos: Ganho[] = [
    { id: '1', title: 'FreeLancer', description: 'Logotipo', amount: 100 },
    { id: '2', title: 'FreeLancer', description: 'Edição de Fotos', amount: 100 },
    { id: '3', title: 'Salário', description: 'Mês Atual', amount: 2500 },
    { id: '4', title: 'FreeLancer', description: 'Edição de Vídeo', amount: 150 },
    { id: '5', title: 'Freelancer', description: 'Designer gráfico', amount: 150 },
  ];

  const totalGanhos = ganhos.reduce((sum, ganho) => sum + ganho.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header com Total */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Ganhos</Text>
        <Text style={styles.headerTotal}>
          R$ {totalGanhos.toFixed(2).replace('.', ',')}
        </Text>
      </View>

      {/* Botão Adicionar */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Ganhos */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.listContainer}>
          {ganhos.map((ganho, index) => (
            <View 
              key={ganho.id} 
              style={[
                styles.ganhoItem,
                index === ganhos.length - 1 && styles.lastItem
              ]}
            >
              <View style={styles.ganhoInfo}>
                <Text style={styles.ganhoTitle}>{ganho.title}</Text>
                <Text style={styles.ganhoDescription}>{ganho.description}</Text>
              </View>
              <Text style={styles.ganhoAmount}>
                R$ {ganho.amount.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          ))}
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
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  ganhoItem: {
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
  ganhoInfo: {
    flex: 1,
  },
  ganhoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  ganhoDescription: {
    fontSize: 14,
    color: '#999',
  },
  ganhoAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginLeft: 12,
  },
});

export default GanhosScreen;
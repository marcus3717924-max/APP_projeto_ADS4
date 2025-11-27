import React, { useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Gasto {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  category: 'food' | 'bills' | 'shopping' | 'transport' | 'other';
}

const GastosScreen = () => {
  const [gastos, setGastos] = useState<Gasto[]>([
    { id: '1', title: 'Padaria', description: 'Lanche da Tarde', amount: 30, date: '18 Nov', category: 'food' },
    { id: '2', title: 'Padaria', description: 'Café da manhã', amount: 35, date: '18 Nov', category: 'food' },
    { id: '3', title: 'Mercado', description: 'Mês Atual', amount: 1300, date: '15 Nov', category: 'shopping' },
    { id: '4', title: 'Água', description: 'Mês Atual', amount: 350, date: '10 Nov', category: 'bills' },
    { id: '5', title: 'Luz', description: 'Mês Atual', amount: 350, date: '10 Nov', category: 'bills' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [novoGasto, setNovoGasto] = useState({
    title: '',
    description: '',
    amount: '',
    category: 'other' as 'food' | 'bills' | 'shopping' | 'transport' | 'other',
  });

  const totalGastos = gastos.reduce((sum, gasto) => sum + gasto.amount, 0);
  const limiteMenusal = 2500;

  const categorias = [
    { value: 'food', label: 'Alimentação', icon: '🍽️' },
    { value: 'bills', label: 'Contas', icon: '💡' },
    { value: 'shopping', label: 'Compras', icon: '🛒' },
    { value: 'transport', label: 'Transporte', icon: '🚗' },
    { value: 'other', label: 'Outros', icon: '💳' },
  ];

  const getCategoryIcon = (category: string) => {
    const cat = categorias.find(c => c.value === category);
    return cat ? cat.icon : '💳';
  };

  const handleAdicionarGasto = () => {
    if (!novoGasto.title || !novoGasto.description || !novoGasto.amount) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const amount = parseFloat(novoGasto.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

    const gasto: Gasto = {
      id: Date.now().toString(),
      title: novoGasto.title,
      description: novoGasto.description,
      amount: amount,
      date: dataFormatada,
      category: novoGasto.category,
    };

    setGastos([gasto, ...gastos]);
    setModalVisible(false);
    setNovoGasto({ title: '', description: '', amount: '', category: 'other' });
    Alert.alert('Sucesso', 'Gasto adicionado com sucesso!');
  };

  const handleDeletarGasto = (id: string) => {
    Alert.alert(
      'Confirmar',
      'Deseja realmente excluir este gasto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => setGastos(gastos.filter(g => g.id !== id))
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>Gastos do Mês</Text>
          <Text style={styles.headerTotal}>
            R$ {totalGastos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={styles.headerIconContainer}>
          <Text style={styles.headerIcon}>↓</Text>
        </View>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Limite Mensal</Text>
          <Text style={styles.statValue}>R$ {limiteMenusal.toLocaleString('pt-BR')}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min((totalGastos / limiteMenusal) * 100, 100)}%` }]} />
          </View>
          {totalGastos > limiteMenusal && (
            <Text style={styles.warningText}>
              ⚠️ Você ultrapassou seu limite em R$ {(totalGastos - limiteMenusal).toFixed(2)}
            </Text>
          )}
        </View>
      </View>

      {/* Botão Adicionar */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity 
          style={styles.addButton} 
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonIcon}>+</Text>
          <Text style={styles.addButtonText}>Adicionar Gasto</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Gastos */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Todas as Transações ({gastos.length})</Text>
          {gastos.map((gasto) => (
            <TouchableOpacity 
              key={gasto.id} 
              style={styles.gastoItem}
              activeOpacity={0.7}
              onLongPress={() => handleDeletarGasto(gasto.id)}
            >
              <View style={styles.gastoIconContainer}>
                <Text style={styles.gastoIcon}>{getCategoryIcon(gasto.category)}</Text>
              </View>
              <View style={styles.gastoInfo}>
                <Text style={styles.gastoTitle}>{gasto.title}</Text>
                <Text style={styles.gastoDescription}>{gasto.description}</Text>
              </View>
              <View style={styles.gastoRight}>
                <Text style={styles.gastoAmount}>
                  -R$ {gasto.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={styles.gastoDate}>{gasto.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal Adicionar Gasto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Gasto</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalBody}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Categoria *</Text>
                  <View style={styles.categoryContainer}>
                    {categorias.map((cat) => (
                      <TouchableOpacity
                        key={cat.value}
                        style={[
                          styles.categoryButton,
                          novoGasto.category === cat.value && styles.categoryButtonActive
                        ]}
                        onPress={() => setNovoGasto({...novoGasto, category: cat.value as any})}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.categoryIcon}>{cat.icon}</Text>
                        <Text style={[
                          styles.categoryLabel,
                          novoGasto.category === cat.value && styles.categoryLabelActive
                        ]}>
                          {cat.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Título *</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={novoGasto.title}
                      onChangeText={(text) => setNovoGasto({...novoGasto, title: text})}
                      placeholder="Ex: Supermercado, Uber"
                      placeholderTextColor="#94A3B8"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Descrição *</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={novoGasto.description}
                      onChangeText={(text) => setNovoGasto({...novoGasto, description: text})}
                      placeholder="Ex: Compras do mês"
                      placeholderTextColor="#94A3B8"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Valor (R$) *</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={novoGasto.amount}
                      onChangeText={(text) => setNovoGasto({...novoGasto, amount: text})}
                      placeholder="0,00"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={handleAdicionarGasto}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalButtonText}>Adicionar Gasto</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.modalCancelButton}
                  onPress={() => setModalVisible(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalCancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerLabel: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 6,
    fontWeight: '600',
  },
  headerTotal: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -1,
  },
  headerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 28,
    color: '#EF4444',
  },
  statsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 4,
  },
  warningText: {
    fontSize: 13,
    color: '#F59E0B',
    fontWeight: '600',
  },
  addButtonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  addButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonIcon: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  gastoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  gastoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  gastoIcon: {
    fontSize: 22,
  },
  gastoInfo: {
    flex: 1,
  },
  gastoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  gastoDescription: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  gastoRight: {
    alignItems: 'flex-end',
  },
  gastoAmount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 4,
  },
  gastoDate: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#64748B',
    fontWeight: '600',
  },
  modalBody: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 10,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryButtonActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: '#EF4444',
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryLabelActive: {
    color: '#EF4444',
  },
  inputWrapper: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0F172A',
  },
  modalButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  modalCancelButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  modalCancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.3,
  },
});

export default GastosScreen;
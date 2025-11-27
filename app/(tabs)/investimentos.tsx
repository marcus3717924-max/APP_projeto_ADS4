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

interface Investimento {
  id: string;
  title: string;
  description: string;
  amount: number;
  percentage: number;
  type: 'stocks' | 'fixed' | 'crypto' | 'other';
}

const InvestimentosScreen = () => {
  const [investimentos, setInvestimentos] = useState<Investimento[]>([
    { id: '1', title: 'Fiis', description: 'HFOF11', amount: 130, percentage: 43.3, type: 'stocks' },
    { id: '2', title: 'Renda Fixa', description: 'Caixinha Nubank', amount: 170, percentage: 56.7, type: 'fixed' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [novoInvestimento, setNovoInvestimento] = useState({
    title: '',
    description: '',
    amount: '',
    type: 'other' as 'stocks' | 'fixed' | 'crypto' | 'other',
  });

  const totalInvestimentos = investimentos.reduce((sum, inv) => sum + inv.amount, 0);

  const tiposInvestimento = [
    { value: 'stocks', label: 'Ações/FIIs', icon: '📊' },
    { value: 'fixed', label: 'Renda Fixa', icon: '🏦' },
    { value: 'crypto', label: 'Cripto', icon: '₿' },
    { value: 'other', label: 'Outros', icon: '💼' },
  ];

  const getTypeIcon = (type: string) => {
    const tipo = tiposInvestimento.find(t => t.value === type);
    return tipo ? tipo.icon : '💼';
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'stocks': return '#3B82F6';
      case 'fixed': return '#10B981';
      case 'crypto': return '#F59E0B';
      default: return '#8B5CF6';
    }
  };

  const calcularPercentuais = (invs: Investimento[]) => {
    const total = invs.reduce((sum, inv) => sum + inv.amount, 0);
    return invs.map(inv => ({
      ...inv,
      percentage: total > 0 ? (inv.amount / total) * 100 : 0
    }));
  };

  const handleAdicionarInvestimento = () => {
    if (!novoInvestimento.title || !novoInvestimento.description || !novoInvestimento.amount) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const amount = parseFloat(novoInvestimento.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    const investimento: Investimento = {
      id: Date.now().toString(),
      title: novoInvestimento.title,
      description: novoInvestimento.description,
      amount: amount,
      percentage: 0,
      type: novoInvestimento.type,
    };

    const novosInvestimentos = calcularPercentuais([investimento, ...investimentos]);
    setInvestimentos(novosInvestimentos);
    setModalVisible(false);
    setNovoInvestimento({ title: '', description: '', amount: '', type: 'other' });
    Alert.alert('Sucesso', 'Investimento adicionado com sucesso!');
  };

  const handleDeletarInvestimento = (id: string) => {
    Alert.alert(
      'Confirmar',
      'Deseja realmente excluir este investimento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            const novosInvestimentos = investimentos.filter(inv => inv.id !== id);
            setInvestimentos(calcularPercentuais(novosInvestimentos));
          }
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
          <Text style={styles.headerLabel}>Carteira de Investimentos</Text>
          <Text style={styles.headerTotal}>
            R$ {totalInvestimentos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={styles.headerIconContainer}>
          <Text style={styles.headerIcon}>📈</Text>
        </View>
      </View>

      {/* Cards de Resumo */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Rendimento Mensal</Text>
          <Text style={styles.summaryValue}>+R$ 12,50</Text>
          <Text style={styles.summaryPercentage}>+4.2%</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Rentabilidade</Text>
          <Text style={styles.summaryValue}>8.5%</Text>
          <Text style={styles.summaryPercentage}>ao ano</Text>
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
          <Text style={styles.addButtonText}>Novo Investimento</Text>
        </TouchableOpacity>
      </View>

      {/* Gráfico de Distribuição */}
      {investimentos.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Distribuição da Carteira</Text>
          <View style={styles.chartBar}>
            {investimentos.map((inv) => (
              <View 
                key={inv.id} 
                style={[
                  styles.chartSegment, 
                  { 
                    width: `${inv.percentage}%`,
                    backgroundColor: getTypeColor(inv.type),
                  }
                ]} 
              />
            ))}
          </View>
          <View style={styles.legendContainer}>
            {investimentos.map((inv) => (
              <View key={inv.id} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: getTypeColor(inv.type) }]} />
                <Text style={styles.legendText}>{inv.title} ({inv.percentage.toFixed(1)}%)</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Lista de Investimentos */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Meus Investimentos ({investimentos.length})</Text>
          {investimentos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📊</Text>
              <Text style={styles.emptyStateText}>Nenhum investimento ainda</Text>
              <Text style={styles.emptyStateSubtext}>Adicione seu primeiro investimento</Text>
            </View>
          ) : (
            investimentos.map((investimento) => (
              <TouchableOpacity 
                key={investimento.id} 
                style={styles.investimentoItem}
                activeOpacity={0.7}
                onLongPress={() => handleDeletarInvestimento(investimento.id)}
              >
                <View style={[
                  styles.investimentoIconContainer,
                  { backgroundColor: `${getTypeColor(investimento.type)}15` }
                ]}>
                  <Text style={styles.investimentoIcon}>{getTypeIcon(investimento.type)}</Text>
                </View>
                <View style={styles.investimentoInfo}>
                  <Text style={styles.investimentoTitle}>{investimento.title}</Text>
                  <Text style={styles.investimentoDescription}>{investimento.description}</Text>
                </View>
                <View style={styles.investimentoRight}>
                  <Text style={styles.investimentoAmount}>
                    R$ {investimento.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Text>
                  <View style={styles.percentageTag}>
                    <Text style={styles.percentageText}>{investimento.percentage.toFixed(1)}%</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal Adicionar Investimento */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Investimento</Text>
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
                  <Text style={styles.label}>Tipo de Investimento *</Text>
                  <View style={styles.typeContainer}>
                    {tiposInvestimento.map((tipo) => (
                      <TouchableOpacity
                        key={tipo.value}
                        style={[
                          styles.typeButton,
                          novoInvestimento.type === tipo.value && styles.typeButtonActive,
                          { borderColor: novoInvestimento.type === tipo.value ? getTypeColor(tipo.value) : '#E2E8F0' }
                        ]}
                        onPress={() => setNovoInvestimento({...novoInvestimento, type: tipo.value as any})}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.typeIcon}>{tipo.icon}</Text>
                        <Text style={[
                          styles.typeLabel,
                          novoInvestimento.type === tipo.value && styles.typeLabelActive
                        ]}>
                          {tipo.label}
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
                      value={novoInvestimento.title}
                      onChangeText={(text) => setNovoInvestimento({...novoInvestimento, title: text})}
                      placeholder="Ex: HFOF11, Tesouro Direto"
                      placeholderTextColor="#94A3B8"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Descrição *</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={novoInvestimento.description}
                      onChangeText={(text) => setNovoInvestimento({...novoInvestimento, description: text})}
                      placeholder="Ex: Fundo Imobiliário"
                      placeholderTextColor="#94A3B8"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Valor Investido (R$) *</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={novoInvestimento.amount}
                      onChangeText={(text) => setNovoInvestimento({...novoInvestimento, amount: text})}
                      placeholder="0,00"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={handleAdicionarInvestimento}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalButtonText}>Adicionar Investimento</Text>
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
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 28,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  summaryPercentage: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600',
  },
  addButtonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
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
  chartContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  chartBar: {
    height: 12,
    borderRadius: 6,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 16,
  },
  chartSegment: {
    height: '100%',
  },
  legendContainer: {
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94A3B8',
  },
  investimentoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  investimentoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  investimentoIcon: {
    fontSize: 22,
  },
  investimentoInfo: {
    flex: 1,
  },
  investimentoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  investimentoDescription: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  investimentoRight: {
    alignItems: 'flex-end',
  },
  investimentoAmount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  percentageTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  percentageText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
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
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeButtonActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  typeIcon: {
    fontSize: 18,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  typeLabelActive: {
    color: '#3B82F6',
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
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#3B82F6',
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

export default InvestimentosScreen;
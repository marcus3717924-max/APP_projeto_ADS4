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

interface Ganho {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
}

const GanhosScreen = () => {
  const [ganhos, setGanhos] = useState<Ganho[]>([
    { id: '1', title: 'FreeLancer', description: 'Logotipo', amount: 100, date: '15 Nov' },
    { id: '2', title: 'FreeLancer', description: 'Edição de Fotos', amount: 100, date: '14 Nov' },
    { id: '3', title: 'Salário', description: 'Mês Atual', amount: 2500, date: '10 Nov' },
    { id: '4', title: 'FreeLancer', description: 'Edição de Vídeo', amount: 150, date: '08 Nov' },
    { id: '5', title: 'Freelancer', description: 'Designer gráfico', amount: 150, date: '05 Nov' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [novoGanho, setNovoGanho] = useState({
    title: '',
    description: '',
    amount: '',
  });

  const totalGanhos = ganhos.reduce((sum, ganho) => sum + ganho.amount, 0);

  const handleAdicionarGanho = () => {
    if (!novoGanho.title || !novoGanho.description || !novoGanho.amount) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const amount = parseFloat(novoGanho.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

    const ganho: Ganho = {
      id: Date.now().toString(),
      title: novoGanho.title,
      description: novoGanho.description,
      amount: amount,
      date: dataFormatada,
    };

    setGanhos([ganho, ...ganhos]);
    setModalVisible(false);
    setNovoGanho({ title: '', description: '', amount: '' });
    Alert.alert('Sucesso', 'Ganho adicionado com sucesso!');
  };

  const handleDeletarGanho = (id: string) => {
    Alert.alert(
      'Confirmar',
      'Deseja realmente excluir este ganho?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => setGanhos(ganhos.filter(g => g.id !== id))
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
          <Text style={styles.headerLabel}>Ganhos do Mês</Text>
          <Text style={styles.headerTotal}>
            R$ {totalGanhos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={styles.headerIconContainer}>
          <Text style={styles.headerIcon}>↑</Text>
        </View>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Meta Mensal</Text>
          <Text style={styles.statValue}>R$ 3.500</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min((totalGanhos / 3500) * 100, 100)}%` }]} />
          </View>
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
          <Text style={styles.addButtonText}>Adicionar Ganho</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Ganhos */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Todas as Transações ({ganhos.length})</Text>
          {ganhos.map((ganho) => (
            <TouchableOpacity 
              key={ganho.id} 
              style={styles.ganhoItem}
              activeOpacity={0.7}
              onLongPress={() => handleDeletarGanho(ganho.id)}
            >
              <View style={styles.ganhoIconContainer}>
                <Text style={styles.ganhoIcon}>💰</Text>
              </View>
              <View style={styles.ganhoInfo}>
                <Text style={styles.ganhoTitle}>{ganho.title}</Text>
                <Text style={styles.ganhoDescription}>{ganho.description}</Text>
              </View>
              <View style={styles.ganhoRight}>
                <Text style={styles.ganhoAmount}>
                  +R$ {ganho.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={styles.ganhoDate}>{ganho.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal Adicionar Ganho */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Ganho</Text>
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
                  <Text style={styles.label}>Título *</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={novoGanho.title}
                      onChangeText={(text) => setNovoGanho({...novoGanho, title: text})}
                      placeholder="Ex: Freelancer, Salário"
                      placeholderTextColor="#94A3B8"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Descrição *</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={novoGanho.description}
                      onChangeText={(text) => setNovoGanho({...novoGanho, description: text})}
                      placeholder="Ex: Logo, Projeto X"
                      placeholderTextColor="#94A3B8"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Valor (R$) *</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={novoGanho.amount}
                      onChangeText={(text) => setNovoGanho({...novoGanho, amount: text})}
                      placeholder="0,00"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={handleAdicionarGanho}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalButtonText}>Adicionar Ganho</Text>
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
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 28,
    color: '#10B981',
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
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  addButtonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
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
  ganhoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  ganhoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  ganhoIcon: {
    fontSize: 22,
  },
  ganhoInfo: {
    flex: 1,
  },
  ganhoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  ganhoDescription: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  ganhoRight: {
    alignItems: 'flex-end',
  },
  ganhoAmount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  ganhoDate: {
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
    maxHeight: '80%',
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
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#10B981',
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

export default GanhosScreen;
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const PerfilScreen = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');

  const handleSalvarAlteracoes = () => {
    console.log('Salvando alterações...');
    // Aqui você implementaria a lógica de salvar
  };

  const handleSairDaConta = () => {
    console.log('Saindo da conta...');
    // Aqui você implementaria a lógica de logout
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Formulário de Informações Pessoais */}
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formIcon}>👤</Text>
            <Text style={styles.formTitle}>Informações Pessoais</Text>
          </View>

          <View style={styles.formContent}>
            {/* Nome Completo */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo *</Text>
              <TextInput
                style={styles.input}
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
                placeholder=""
                placeholderTextColor="#999"
              />
            </View>

            {/* E-mail */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail *</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder=""
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Data de Nascimento */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Data de nascimento *</Text>
              <TextInput
                style={styles.input}
                value={dataNascimento}
                onChangeText={setDataNascimento}
                placeholder=""
                placeholderTextColor="#999"
              />
            </View>

            {/* Senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha *</Text>
              <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                placeholder="••••••••••••••"
                placeholderTextColor="#ccc"
                secureTextEntry
              />
            </View>

            {/* Botões */}
            <TouchableOpacity 
              style={styles.buttonSalvar}
              onPress={handleSalvarAlteracoes}
            >
              <Text style={styles.buttonSalvarText}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.buttonSair}
              onPress={handleSairDaConta}
            >
              <Text style={styles.buttonSairText}>🚪 Sair da Conta</Text>
            </TouchableOpacity>
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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  navIcon: {
    padding: 8,
  },
  navIconActive: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  navIconText: {
    fontSize: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 16,
    overflow: 'hidden',
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  formIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  formContent: {
    padding: 20,
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a2e',
    backgroundColor: '#fff',
  },
  buttonSalvar: {
    backgroundColor: '#d0d0d0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
  buttonSalvarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  buttonSair: {
    backgroundColor: '#e8e8e8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonSairText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
});

export default PerfilScreen;
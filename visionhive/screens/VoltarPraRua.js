import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FilialContext } from '../context/FilialContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VoltarPraRua({ navigation }) {
  const { filial } = useContext(FilialContext);

  const [busca, setBusca] = useState('');
  const [motos, setMotos] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const chave = `@motos_filial_${filial}`;
      const dados = await AsyncStorage.getItem(chave);
      const lista = dados ? JSON.parse(dados) : [];
      setMotos(lista);
    };
    carregar();
  }, [filial]);

  const remover = async () => {
    if (!busca) {
      Alert.alert('Erro', 'Informe chassi, placa ou motor.');
      return;
    }

    const novaLista = motos.filter(
      (m) =>
        m.chassi !== busca &&
        m.placa !== busca &&
        m.motor !== busca
    );

    if (novaLista.length === motos.length) {
      Alert.alert('Não encontrada', 'Nenhuma moto com esse identificador.');
      return;
    }

    try {
      const chave = `@motos_filial_${filial}`;
      await AsyncStorage.setItem(chave, JSON.stringify(novaLista));
      setMotos(novaLista);
      setBusca('');
      Alert.alert('Sucesso', 'Moto removida com sucesso.');
    } catch (e) {
      console.error('Erro ao remover moto:', e);
      Alert.alert('Erro', 'Não foi possível remover a moto.');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        showBackButton={true}
        onBackPress={() => navigation.navigate('MenuPrincipal')}
      />
      <Text style={styles.filial}>Filial: {filial}</Text>

      <View style={styles.content}>
        <Text style={styles.label}>Buscar por Chassi, Placa ou Motor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: XYZ1234 ou 9CHASSI..."
          placeholderTextColor="#888"
          value={busca}
          onChangeText={setBusca}
        />

        <Button title="Voltar pra Rua" onPress={remover} color="#0088ff" />
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  filial: {
    color: '#0f0',
    fontSize: 18,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    marginBottom: 20,
    padding: 10,
    borderRadius: 4,
  },
});

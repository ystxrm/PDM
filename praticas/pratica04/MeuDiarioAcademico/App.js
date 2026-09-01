import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  BUTTON_TEXT,
  LIST_TITLE,
  SWITCH_LABEL,
} from './labels';


const disciplinasFixas = [
  { id: '1', nome: 'Programação para Dispositivos Móveis' },
  { id: '2', nome: 'Banco de Dados II' },
  { id: '3', nome: 'Engenharia de Software' },
  { id: '4', nome: 'Redes de Computadores' },
];

export default function App() {
  const [texto, setTexto] = useState('');
  const [apenasObrigatorias, setApenasObrigatorias] = useState(false); // desafio opcional

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <Text style={styles.header}>{APP_TITLE}</Text>


      <Text style={styles.sectionLabel}>Cadastrar nova disciplina</Text>
      <Row texto={texto} setTexto={setTexto} />
      <Row2 apenasObrigatorias={apenasObrigatorias} setApenasObrigatorias={setApenasObrigatorias} />

      
      <Text style={styles.listTitle}>{LIST_TITLE}</Text>
      <ScrollView style={styles.list}>
        {disciplinasFixas.map((disciplina) => (
          <Text key={disciplina.id} style={styles.item}>
            {disciplina.nome}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


function Row({ texto, setTexto }) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder={INPUT_PLACEHOLDER}
        value={texto}
        onChangeText={setTexto}
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => setTexto('')}
      >
        <Text style={styles.buttonText}>{BUTTON_TEXT}</Text>
      </Pressable>
    </View>
  );
}

function Row2({ apenasObrigatorias, setApenasObrigatorias }) {
  return (
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>{SWITCH_LABEL}</Text>
      <Switch value={apenasObrigatorias} onValueChange={setApenasObrigatorias} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
  
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F6FA',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center', 
    color: '#2B2D42',
  },

  sectionLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },

  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

 
  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#8D99AE',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },

  
  button: {
    width: '28%',
    backgroundColor: '#3A86FF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20,
  },
  buttonPressed: {
    backgroundColor: '#265DBE', 
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    color: '#555',
  },

  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#2B2D42',
  },

  
  list: {
    flex: 1,
  },

  item: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});

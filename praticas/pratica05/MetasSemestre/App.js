import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  // Estado do texto digitado no input
  const [texto, setTexto] = useState('');

  // Estado da lista de metas: cada item = { id, texto, criadaEm, concluida }
  const [metas, setMetas] = useState([]);

  // Evita que o efeito de SALVAR rode antes da carga inicial terminar
  // (senão sobrescreveríamos o storage com um array vazio na abertura do app).
  const [carregando, setCarregando] = useState(true);

  // ---------------------------------------------------------------------
  // useEffect #1 — CARREGAR metas do AsyncStorage quando o app é montado.
  // Roda uma única vez (array de dependências vazio: []).
  // ---------------------------------------------------------------------
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados !== null) {
          setMetas(JSON.parse(dados));
        }
      } catch (erro) {
        console.log('Erro ao carregar metas:', erro);
        Alert.alert(
          'Erro ao carregar',
          'Não foi possível carregar suas metas salvas.'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarMetas();
  }, []);

  // ---------------------------------------------------------------------
  // useEffect #2 — SALVAR metas no AsyncStorage sempre que a lista mudar.
  // Depende de [metas], então roda toda vez que setMetas é chamado.
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (carregando) return; // não salva por cima dos dados enquanto ainda carrega

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        console.log('Erro ao salvar metas:', erro);
        Alert.alert(
          'Erro ao salvar',
          'Não foi possível salvar suas metas. Tente novamente.'
        );
      }
    }

    salvarMetas();
  }, [metas, carregando]);

  // Adiciona uma nova meta, validando texto vazio
  function handleAdd() {
    const textoLimpo = texto.trim();

    if (textoLimpo.length === 0) {
      Alert.alert('Ops!', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    // Nunca mutar o array: sempre criar um novo com spread
    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setTexto('');
  }

  // Remove uma meta pelo id (filter cria um novo array, sem mutação)
  function handleDelete(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  // Alterna o status "concluída" de uma meta pelo id
  function handleToggle(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  const pendentes = metas.filter((m) => !m.concluida).length;
  const concluidas = metas.filter((m) => m.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <Image source={require('./assets/icon.png')} style={styles.logo} />
          <View>
            <Text style={styles.title}>Metas do Semestre</Text>
            <Text style={styles.subtitle}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput value={texto} onChangeText={setTexto} onAdd={handleAdd} />

        <MetaList
          metas={metas}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
});

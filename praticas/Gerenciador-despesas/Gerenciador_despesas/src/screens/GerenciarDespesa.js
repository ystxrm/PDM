import { useContext, useLayoutEffect, useState } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DespesasContext } from '../store/despesas-context';
import { getDataFormatada } from '../util/data';
import { CATEGORIAS } from '../util/filtros';

export default function GerenciarDespesa({ route, navigation }) {
  const { despesas, adicionarDespesa, atualizarDespesa, excluirDespesa } = useContext(DespesasContext);

  const despesaId = route.params?.despesaId;
  const editando = !!despesaId;
  const despesaAtual = despesas.find((d) => d.id === despesaId);

  const [descricao, setDescricao] = useState(despesaAtual?.descricao ?? '');
  const [valor, setValor] = useState(despesaAtual ? despesaAtual.valor.toFixed(2) : '');
  const [data, setData] = useState(despesaAtual?.data ?? new Date());
  const [categoria, setCategoria] = useState(despesaAtual?.categoria ?? '');
  const [mostrarPicker, setMostrarPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: editando ? 'Editar Despesa' : 'Adicionar Despesa' });
  }, [navigation, editando]);

  // Limita a duas casas decimais
  function tratarValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) setValor(normalizado);
  }

  function aoMudarData(evento, dataSelecionada) {
    setMostrarPicker(false);
    if (evento.type === 'set' && dataSelecionada) setData(dataSelecionada);
  }

  function confirmar() {
    const valorNumerico = parseFloat(valor);
    if (!descricao.trim() || !valor || isNaN(valorNumerico) || valorNumerico <= 0 || !categoria) {
      Alert.alert('Dados inválidos', 'Preencha descrição, valor (maior que zero) e categoria.');
      return;
    }
    const dados = { descricao: descricao.trim(), valor: valorNumerico, data, categoria };
    if (editando) atualizarDespesa(despesaId, dados);
    else adicionarDespesa(dados);
    navigation.goBack();
  }

  function excluir() {
    excluirDespesa(despesaId);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Ex: Mercado" />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={tratarValor}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Text style={styles.label}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
        <Text>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarPicker && <DateTimePicker value={data} mode="date" onChange={aoMudarData} />}

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategoria(cat)}
            style={[styles.chip, categoria === cat && styles.chipAtivo]}
          >
            <Text style={[styles.chipTexto, categoria === cat && styles.chipTextoAtivo]}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.botoes}>
        <Button title="Cancelar" color="#888" onPress={() => navigation.goBack()} />
        <Button title={editando ? 'Atualizar' : 'Adicionar'} color="#3e04c4" onPress={confirmar} />
      </View>
      {editando && (
        <View style={styles.excluir}>
          <Button title="Excluir" color="#c0392b" onPress={excluir} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f0ff' },
  label: { marginTop: 14, marginBottom: 4, fontWeight: 'bold', color: '#3e04c4' },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#ccc' },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, backgroundColor: '#e5e5e5' },
  chipAtivo: { backgroundColor: '#3e04c4' },
  chipTexto: { color: '#333', fontWeight: '600' },
  chipTextoAtivo: { color: '#fff' },
  botoes: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 28 },
  excluir: { marginTop: 16 },
});

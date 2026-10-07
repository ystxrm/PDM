import { useContext, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS, filtrarPorCategoria } from '../util/filtros';

const OPCOES = ['Todas', ...CATEGORIAS];

export default function TodasDespesas() {
  const { despesas } = useContext(DespesasContext);
  const [filtro, setFiltro] = useState('Todas');

  const despesasFiltradas = filtrarPorCategoria(despesas, filtro);

  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtros}>
          {OPCOES.map((opcao) => (
            <Pressable
              key={opcao}
              onPress={() => setFiltro(opcao)}
              style={[styles.chip, filtro === opcao && styles.chipAtivo]}
            >
              <Text style={[styles.chipTexto, filtro === opcao && styles.chipTextoAtivo]}>{opcao}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={filtro === 'Todas' ? 'Total' : `Total - ${filtro}`}
        textoFallback="Nenhuma despesa encontrada."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f0ff' },
  filtros: { paddingHorizontal: 16, paddingTop: 12, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: '#e5e5e5' },
  chipAtivo: { backgroundColor: '#3e04c4' },
  chipTexto: { color: '#333', fontWeight: '600' },
  chipTextoAtivo: { color: '#fff' },
});

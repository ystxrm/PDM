import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';

export default function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { despesaId: id })}
      style={({ pressed }) => pressed && styles.pressionado}
    >
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <View style={styles.linha}>
            <Text style={styles.data}>{getDataFormatada(data)}</Text>
            <View style={styles.tag}>
              <Text style={styles.tagTexto}>{categoria}</Text>
            </View>
          </View>
        </View>
        <View style={styles.valorBox}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressionado: { opacity: 0.7 },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#3e04c4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
  },
  info: { flex: 1 },
  descricao: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  data: { color: '#e4d9fd' },
  tag: { backgroundColor: '#e5e5e5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  tagTexto: { fontSize: 12, color: '#333', fontWeight: '600' },
  valorBox: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, minWidth: 90, alignItems: 'center' },
  valor: { fontWeight: 'bold', color: '#3e04c4' },
});

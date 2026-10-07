import { StyleSheet, Text, View } from 'react-native';

const LIMITE = 200;

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      {/* Bônus: vermelho quando ultrapassa R$ 200,00 */}
      <Text style={[styles.soma, somaDespesas > LIMITE && styles.somaAlta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#e4d9fd',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: { fontSize: 14, color: '#3e04c4' },
  soma: { fontSize: 16, fontWeight: 'bold', color: '#3e04c4' },
  somaAlta: { color: 'red' },
});

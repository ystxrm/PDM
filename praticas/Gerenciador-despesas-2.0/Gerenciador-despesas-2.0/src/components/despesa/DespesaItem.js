import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../constants/theme';
import { formatCurrency, formatDate } from '../../utils/format';

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: id })}
      style={({ pressed }) => [styles.card, { backgroundColor: theme.card }, pressed && styles.pressed]}
    >
      <View style={styles.info}>
        <Text style={[styles.description, { color: theme.text }]} numberOfLines={1}>
          {description}
        </Text>
        <Text style={[styles.meta, { color: theme.textSecondary }]}>
          {formatDate(date)} · {category}
        </Text>
      </View>
      <View style={[styles.amountBox, { backgroundColor: theme.primary }]}>
        <Text style={[styles.amount, { color: theme.onPrimary }]}>{formatCurrency(amount)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  pressed: { opacity: 0.7 },
  info: { flex: 1, marginRight: 12 },
  description: { fontSize: 16, fontWeight: 'bold' },
  meta: { fontSize: 12, marginTop: 4 },
  amountBox: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, minWidth: 90, alignItems: 'center' },
  amount: { fontWeight: 'bold' },
});

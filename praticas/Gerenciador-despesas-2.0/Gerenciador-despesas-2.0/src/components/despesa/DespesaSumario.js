import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../constants/theme';
import { formatCurrency } from '../../utils/format';

export default function DespesaSumario({ expenses, periodName }) {
  const theme = useTheme();
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const count = expenses.length;

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View>
        <Text style={[styles.period, { color: theme.textSecondary }]}>{periodName}</Text>
        <Text style={[styles.count, { color: theme.textSecondary }]}>
          {count} {count === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.total, { color: theme.primary }]}>{formatCurrency(total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  period: { fontSize: 12 },
  count: { fontSize: 14, marginTop: 2 },
  total: { fontSize: 20, fontWeight: 'bold' },
});

import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../constants/theme';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();
  const theme = useTheme();

  const recentes = useMemo(() => {
    const limite = new Date();
    limite.setDate(limite.getDate() - 7);
    limite.setHours(0, 0, 0, 0);
    return expenses.filter((e) => e.date >= limite);
  }, [expenses]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, paddingTop: 12 }}>
      <DespesaSaida expenses={recentes} periodName="Últimos 7 dias" />
    </View>
  );
}

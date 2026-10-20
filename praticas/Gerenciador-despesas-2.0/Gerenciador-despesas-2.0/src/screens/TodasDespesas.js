import React, { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../constants/theme';
import useDebounce from '../hooks/useDebounce';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function TodasDespesas() {
  const { expenses } = useExpenses();
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const filtradas = useMemo(() => {
    const termo = debouncedQuery.trim().toLowerCase();
    if (!termo) return expenses;
    return expenses.filter((e) => e.description.toLowerCase().includes(termo));
  }, [expenses, debouncedQuery]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar por descrição"
        placeholderTextColor={theme.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          styles.search,
          { backgroundColor: theme.inputBackground, borderColor: theme.border, color: theme.text },
        ]}
      />
      <DespesaSaida expenses={filtradas} periodName={debouncedQuery.trim() ? 'Resultado da busca' : 'Total'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12 },
  search: {
    marginHorizontal: 12,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
});

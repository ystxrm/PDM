import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../constants/theme';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ expenses, ListHeaderComponent }) {
  const theme = useTheme();

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem {...item} />}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="wallet-outline" size={64} color={theme.textSecondary} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>Nenhuma despesa</Text>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Nenhuma despesa encontrada. Toque em + para adicionar.
          </Text>
        </View>
      }
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  empty: { alignItems: 'center', padding: 32, marginTop: 24 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 12 },
  emptyText: { fontSize: 14, marginTop: 6, textAlign: 'center' },
});

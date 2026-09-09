import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import MetaItem from './MetaItem';

/**
 * MetaList
 * Lista rolável de metas (FlatList é preferível ao ScrollView para listas,
 * pois renderiza os itens sob demanda).
 *
 * Props:
 * - metas: Array<{ id, texto, criadaEm, concluida }>
 * - onDelete: function(id)
 * - onToggle: function(id)
 */
export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          Nenhuma meta cadastrada ainda.{'\n'}Adicione a primeira acima! 🎯
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <MetaItem meta={item} onDelete={onDelete} onToggle={onToggle} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9AA0A6',
    fontSize: 15,
    lineHeight: 22,
  },
});

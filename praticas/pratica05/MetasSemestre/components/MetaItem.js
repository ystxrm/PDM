import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

/**
 * MetaItem
 * Renderiza uma meta individual.
 *
 * Props:
 * - meta: { id, texto, criadaEm, concluida }
 * - onDelete: function(id)        -> remove a meta
 * - onToggle: function(id)        -> marca/desmarca como concluída
 */
export default function MetaItem({ meta, onDelete, onToggle }) {
  const data = new Date(meta.criadaEm);
  const dataFormatada = data.toLocaleDateString('pt-BR');

  return (
    <View style={styles.card}>
      <Pressable
        style={styles.textArea}
        onPress={() => onToggle(meta.id)}
        android_ripple={{ color: '#E0E0E6' }}
      >
        <Text style={[styles.texto, meta.concluida && styles.textoRiscado]}>
          {meta.concluida ? '✅ ' : '⬜ '}
          {meta.texto}
        </Text>
        <Text style={styles.data}>Criada em {dataFormatada}</Text>
      </Pressable>

      <Pressable
        onPress={() => onDelete(meta.id)}
        android_ripple={{ color: '#FCA5A5', borderless: true }}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
      >
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E6',
  },
  textArea: {
    flex: 1,
  },
  texto: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  textoRiscado: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  data: {
    fontSize: 11,
    color: '#9AA0A6',
    marginTop: 4,
  },
  deleteButton: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  deleteText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 14,
  },
});

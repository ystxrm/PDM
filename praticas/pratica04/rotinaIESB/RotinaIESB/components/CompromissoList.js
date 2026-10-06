import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={itens.length === 0 && styles.vazioContainer}
        ListEmptyComponent={<Text style={styles.vazioTexto}>{listaVazia}</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTexto}>{item.texto}</Text>
              <Text style={styles.itemData}>
                {new Date(item.criadoEm).toLocaleString('pt-BR')}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.removerBotao,
                pressed && styles.removerBotaoPressionado,
              ]}
              android_ripple={{ color: '#ffffff55' }}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.removerTexto}>Remover</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1c1c1c',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemTexto: {
    fontSize: 15,
    color: '#1c1c1c',
  },
  itemData: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  removerBotao: {
    backgroundColor: '#e74c3c',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  removerBotaoPressionado: {
    opacity: 0.75,
  },
  removerTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  vazioContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vazioTexto: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
});
import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

/**
 * MetaInput
 * Componente controlado: quem guarda o estado do texto é o App (pai).
 *
 * Props:
 * - value: string            -> texto atual do input (controlado pelo pai)
 * - onChangeText: function   -> chamado a cada tecla digitada
 * - onAdd: function          -> chamado ao tocar no botão "Adicionar"
 */
export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova meta de estudo..."
        placeholderTextColor="#9AA0A6"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />

      <Pressable
        onPress={onAdd}
        android_ripple={{ color: '#3730A3', borderless: false }}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E0E0E6',
  },
  button: {
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

import React, { useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';
import { formatDate } from '../utils/format';

const AMOUNT_REGEX = /^\d*\.?\d{0,2}$/;

function validate(values) {
  const errors = {};
  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }
  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  if (values.date > endOfToday) {
    errors.date = 'A data não pode ser futura.';
  }
  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }
  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const theme = useTheme();

  const existing = isEditing ? expenses.find((e) => e.id === expenseId) : null;

  const [form, setForm] = useState({
    description: existing?.description ?? '',
    amount: existing ? String(existing.amount) : '',
    date: existing?.date ?? new Date(),
    category: existing?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  function handleChange(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    // Reavalia apenas o campo que já estava com erro
    if (errors[field]) {
      const newErrors = validate(next);
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  }

  function handleAmountChange(text) {
    const normalized = text.replace(',', '.');
    if (AMOUNT_REGEX.test(normalized)) handleChange('amount', normalized);
  }

  function handleDateChange(event, selected) {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (event.type === 'dismissed' || !selected) return;
    handleChange('date', selected);
  }

  function handleSave() {
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };
    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);
    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerRight: isEditing
        ? () => (
            <Pressable onPress={handleDelete} accessibilityLabel="Excluir despesa">
              <Ionicons name="trash-outline" size={24} color={theme.danger} />
            </Pressable>
          )
        : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, isEditing, theme]);

  const inputStyle = (field) => [
    styles.input,
    {
      backgroundColor: theme.inputBackground,
      color: theme.text,
      borderColor: errors[field] ? theme.danger : theme.border,
    },
  ];

  const renderError = (field) =>
    errors[field] ? <Text style={[styles.error, { color: theme.danger }]}>{errors[field]}</Text> : null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
        <TextInput
          style={inputStyle('description')}
          value={form.description}
          onChangeText={(t) => handleChange('description', t)}
          placeholder="Ex.: Almoço"
          placeholderTextColor={theme.textSecondary}
        />
        {renderError('description')}

        <Text style={[styles.label, { color: theme.text }]}>Valor (R$)</Text>
        <TextInput
          style={inputStyle('amount')}
          value={form.amount}
          onChangeText={handleAmountChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={theme.textSecondary}
        />
        {renderError('amount')}

        <Text style={[styles.label, { color: theme.text }]}>Data</Text>
        {Platform.OS === 'android' ? (
          <Pressable style={inputStyle('date')} onPress={() => setShowDatePicker(true)}>
            <Text style={{ color: theme.text, fontSize: 16 }}>{formatDate(form.date)}</Text>
          </Pressable>
        ) : (
          <View style={[inputStyle('date'), styles.iosDate]}>
            <DateTimePicker
              value={form.date}
              mode="date"
              display="compact"
              onChange={handleDateChange}
              themeVariant={theme.isDark ? 'dark' : 'light'}
            />
          </View>
        )}
        {Platform.OS === 'android' && showDatePicker && (
          <DateTimePicker value={form.date} mode="date" display="default" onChange={handleDateChange} />
        )}
        {renderError('date')}

        <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
        <Pressable style={inputStyle('category')} onPress={() => setShowCategories(true)}>
          <Text style={{ color: form.category ? theme.text : theme.textSecondary, fontSize: 16 }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
        </Pressable>
        {renderError('category')}

        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [styles.saveButton, { backgroundColor: theme.primary }, pressed && { opacity: 0.8 }]}
        >
          <Text style={[styles.saveText, { color: theme.onPrimary }]}>
            {isEditing ? 'Salvar alterações' : 'Salvar'}
          </Text>
        </Pressable>
      </ScrollView>

      <Modal
        visible={showCategories}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategories(false)}
      >
        <Pressable style={[styles.overlay, { backgroundColor: theme.overlay }]} onPress={() => setShowCategories(false)}>
          <View style={[styles.sheet, { backgroundColor: theme.card }]}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={[styles.option, { borderBottomColor: theme.border }]}
                onPress={() => {
                  handleChange('category', cat);
                  setShowCategories(false);
                }}
              >
                <Text
                  style={{
                    color: cat === form.category ? theme.primary : theme.text,
                    fontSize: 16,
                    fontWeight: cat === form.category ? 'bold' : 'normal',
                  }}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 40 },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16 },
  iosDate: { alignItems: 'flex-start', paddingVertical: 6 },
  error: { fontSize: 12, marginTop: 4 },
  saveButton: { marginTop: 28, padding: 14, borderRadius: 8, alignItems: 'center' },
  saveText: { fontSize: 16, fontWeight: 'bold' },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, paddingBottom: 32 },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  option: { paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth },
});

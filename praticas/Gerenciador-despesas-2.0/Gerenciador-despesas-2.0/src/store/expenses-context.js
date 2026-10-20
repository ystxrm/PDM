import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

export function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? { ...expense, ...action.payload.data } : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

const ExpensesContext = createContext(null);

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega os dados salvos ao iniciar
  useEffect(() => {
    async function load() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const saved = JSON.parse(json);
          if (Array.isArray(saved)) {
            dispatch({
              type: 'SET',
              payload: saved.map((e) => ({ ...e, date: new Date(e.date) })),
            });
          }
        }
      } catch (error) {
        console.warn('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    load();
  }, []);

  // Salva a cada alteração (somente depois do carregamento inicial)
  useEffect(() => {
    if (!isLoaded) return;
    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('Erro ao salvar despesas:', error);
      }
    }
    save();
  }, [expenses, isLoaded]);

  const addExpense = useCallback((data) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    dispatch({ type: 'ADD', payload: { id, ...data } });
  }, []);

  const updateExpense = useCallback((id, data) => {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  }, []);

  const deleteExpense = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  const value = useMemo(
    () => ({ expenses, addExpense, updateExpense, deleteExpense }),
    [expenses, addExpense, updateExpense, deleteExpense]
  );

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider');
  }
  return context;
}

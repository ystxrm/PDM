import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { ExpensesContextProvider } from './src/store/expenses-context';
import { useTheme } from './src/constants/theme';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function AbasDespesas() {
  const theme = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.card, borderTopColor: theme.border },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        headerRight: ({ tintColor }) => (
          <Pressable
            onPress={() => navigation.navigate('GerenciarDespesa')}
            style={{ marginRight: 16 }}
            accessibilityLabel="Adicionar despesa"
          >
            <Ionicons name="add" size={28} color={tintColor} />
          </Pressable>
        ),
      })}
    >
      <Tabs.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas as despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
      />
    </Tabs.Navigator>
  );
}

function Navegacao() {
  const theme = useTheme();
  const navTheme = {
    ...DefaultTheme,
    dark: theme.isDark,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.primary,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.card },
          headerTintColor: theme.text,
        }}
      >
        <Stack.Screen name="Abas" component={AbasDespesas} options={{ headerShown: false }} />
        <Stack.Screen
          name="GerenciarDespesa"
          component={GerenciarDespesa}
          options={{ presentation: 'modal', title: 'Nova despesa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ExpensesContextProvider>
      <Navegacao />
    </ExpensesContextProvider>
  );
}

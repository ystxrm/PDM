import { StatusBar } from 'expo-status-bar';
import { Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DespesasProvider from './src/store/despesas-context';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function VisaoDespesas() {
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#3e04c4' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#3e04c4',
        headerRight: ({ tintColor }) => (
          <Pressable style={{ marginRight: 16 }} onPress={() => navigation.navigate('GerenciarDespesa')}>
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
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <DespesasProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerStyle: { backgroundColor: '#3e04c4' }, headerTintColor: '#fff' }}
          >
            <Stack.Screen name="VisaoDespesas" component={VisaoDespesas} options={{ headerShown: false }} />
            <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} options={{ presentation: 'modal' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </DespesasProvider>
    </>
  );
}

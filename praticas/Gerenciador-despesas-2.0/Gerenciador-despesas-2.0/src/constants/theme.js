import { useColorScheme } from 'react-native';

export const themes = {
  light: {
    isDark: false,
    background: '#f4f4f8',
    card: '#ffffff',
    text: '#1c1c28',
    textSecondary: '#6b6b80',
    border: '#d9d9e3',
    inputBackground: '#ffffff',
    primary: '#5b3fd1',
    onPrimary: '#ffffff',
    danger: '#d93025',
    overlay: 'rgba(0,0,0,0.4)',
  },
  dark: {
    isDark: true,
    background: '#121218',
    card: '#1e1e29',
    text: '#f2f2f7',
    textSecondary: '#a0a0b5',
    border: '#35354a',
    inputBackground: '#2a2a38',
    primary: '#9f87ff',
    onPrimary: '#121218',
    danger: '#ff6b61',
    overlay: 'rgba(0,0,0,0.6)',
  },
};

export function useTheme() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? themes.dark : themes.light;
}

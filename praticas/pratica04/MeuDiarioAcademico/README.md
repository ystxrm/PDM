# MeuDiarioAcademico

Atividade 01 — Fundamentos de UI, Componentes e Layout
Disciplina: Programação para Dispositivos Móveis (React Native / Expo)
Professor: Marcelo Alves Farias — IESB

## O que o app faz

Tela inicial de cadastro rápido de disciplinas do semestre:

- Cabeçalho com o título do app
- Linha (`flexDirection: 'row'`) com um `TextInput` (~70% da largura) e um
  botão "Adicionar" (~28% da largura), feito com `Pressable` (com estilo de
  pressionado) em vez de `Button` — desafio opcional
- `Switch` "Mostrar apenas obrigatórias" (ainda sem filtro real) — desafio opcional
- Lista estática "Minhas disciplinas", renderizada com `.map`

## Comando usado para criar o projeto

```bash
npx create-expo-app@latest MeuDiarioAcademico --template blank
```

Dependência nativa instalada com o Expo (em vez de npm/yarn puro):

```bash
npx expo install react-native-safe-area-context
```

## Como rodar

```bash
cd MeuDiarioAcademico
npm install
npx expo start
```

Depois é só escanear o QR Code com o app **Expo Go** (Android/iOS) ou abrir
em um emulador Android pressionando `a` no terminal.

## Estrutura de arquivos

```
MeuDiarioAcademico/
├── App.js          # Tela principal (layout, componentes, estilos)
├── labels.js        # Rótulos/textos exportados e importados em App.js
├── app.json
├── babel.config.js
├── package.json
└── assets/
```

## Organização do código (import/export)

Todos os textos exibidos na tela (título do app, placeholder do input,
texto do botão, título da lista, label do switch) ficam centralizados em
`labels.js` e são importados em `App.js` via:

```js
import { APP_TITLE, INPUT_PLACEHOLDER, BUTTON_TEXT, LIST_TITLE, SWITCH_LABEL } from './labels';
```

## Decisões de layout (Flexbox)

- `container` (SafeAreaView) usa `flex: 1` para ocupar toda a tela.
- A linha de cadastro usa `flexDirection: 'row'` para colocar o `TextInput`
  e o `Pressable` lado a lado, com `justifyContent: 'space-between'` para
  distribuir o espaço entre eles e `alignItems: 'center'` para alinhar
  verticalmente elementos de alturas diferentes.
- O botão usa `alignItems: 'center'` + `justifyContent: 'center'` internamente
  para centralizar o texto dentro dele.
- A lista usa `flex: 1` para ocupar o espaço restante da tela e ficar rolável.
- Dimensão percentual (`%`): `input` tem `width: '68%'` e o botão
  `width: '28%'`, demonstrando o uso de largura relativa em vez de valores
  fixos em pixels.

## Prints da tela

> Substituir pelos prints reais do app rodando no emulador/Expo Go.

`assets/print-tela-inicial.png`

## Checklist de entrega

- [x] Projeto sobe com `npx expo start`
- [x] Import/export de rótulos (`labels.js`)
- [x] Layout com Flexbox coerente (row + column)
- [x] StyleSheet organizado e comentado
- [x] README com prints e explicação breve
- [x] `node_modules` não incluído (ver `.gitignore`)

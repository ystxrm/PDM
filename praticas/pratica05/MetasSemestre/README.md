# MetasSemestre 🎯

App em React Native (Expo) para cadastrar metas de estudo do semestre, com
persistência local via `AsyncStorage`. O aluno adiciona metas, marca como
concluídas, remove itens, e tudo continua salvo mesmo depois de fechar o app.

## Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR code com o app **Expo Go** (Android/iOS) ou rode em um emulador.

## Estrutura do projeto

```
MetasSemestre/
├── App.js
├── app.json
├── assets/
│   └── icon.png
└── components/
    ├── MetaInput.js
    ├── MetaItem.js
    └── MetaList.js
```

## Como os requisitos foram atendidos

### A) Estado e lista
Em `App.js`:
- `const [texto, setTexto] = useState('')` guarda o texto do input.
- `const [metas, setMetas] = useState([])` guarda o array de metas.
- Cada meta é criada como `{ id, texto, criadaEm, concluida }`, com
  `id: Date.now().toString()` (nunca usamos o índice do array como id,
  para a remoção continuar correta mesmo se a lista for reordenada).

### B) Componentização (`components/`)
- **`MetaInput.js`** — `TextInput` controlado + `Pressable` de adicionar.
  Recebe `value`, `onChangeText` e `onAdd` como props; não guarda estado
  próprio, o estado do texto vive no `App.js`.
- **`MetaList.js`** — usa `FlatList` (melhor que `ScrollView` para listas,
  pois só renderiza os itens visíveis). Recebe `metas`, `onDelete` e
  `onToggle`, e delega a renderização de cada linha para `MetaItem.js`.
- **`MetaItem.js`** — componente auxiliar para exibir uma meta individual,
  com toque para concluir (`onToggle`) e botão "✕" para remover
  (`onDelete`).

### C) Eventos
- **Adicionar**: `handleAdd()` em `App.js` valida com `texto.trim().length === 0`
  e mostra `Alert.alert(...)` se estiver vazio, antes de criar a meta.
- **Remover**: `handleDelete(id)` usa `metasAtuais.filter(meta => meta.id !== id)`
  — cria um novo array, nunca muta o existente.
- **Concluir**: `handleToggle(id)` usa `.map(...)` para trocar `concluida`
  apenas do item clicado, também sem mutação.
- **Feedback visual**: todos os `Pressable` (adicionar, remover, marcar
  como concluída) usam `android_ripple` para dar feedback tátil no Android.

### D) Persistência (o ponto mais importante)
Os dois `useEffect` ficam em `App.js`:

1. **Carregar (linhas ~30–48)** — roda uma única vez, na montagem do app
   (`useEffect(..., [])`). Lê a chave `@metas_semestre` do `AsyncStorage`,
   faz `JSON.parse` e joga o resultado em `setMetas`. Está envolvido em
   `try/catch`, com um `Alert` amigável em caso de erro. No `finally`,
   marca `setCarregando(false)`.

2. **Salvar (linhas ~53–68)** — roda toda vez que `metas` muda
   (`useEffect(..., [metas, carregando])`). Faz `JSON.stringify(metas)` e
   grava com `AsyncStorage.setItem`. Também com `try/catch` e `Alert` em
   caso de falha.

   ⚠️ **Detalhe importante**: existe uma flag `carregando` que começa em
   `true`. O efeito de salvar verifica `if (carregando) return;` no início.
   Isso evita o erro clássico de, assim que o app abre, o efeito de salvar
   disparar com a lista ainda vazia e **sobrescrever** os dados que
   acabaram de ser lidos do `AsyncStorage`.

### E) UI
- `SafeAreaProvider` envolve o app e `SafeAreaView` evita que o conteúdo
  fique atrás do notch/status bar.
- Cabeçalho com `Image` local (`./assets/icon.png`) + título "Metas do
  Semestre".
- Lista rolável com `FlatList` (dentro de `MetaList.js`).

### Desafio opcional (implementado)
- Campo `concluida: boolean` em cada meta.
- Tocar no texto da meta alterna o estado concluída/pendente, com estilo
  `textDecorationLine: 'line-through'` quando concluída.
- Contador no cabeçalho: **"X pendentes / Y concluídas"**, calculado a
  partir do array `metas` a cada renderização.

## Erros comuns evitados
- ✅ O carregamento inicial roda antes de qualquer salvamento (flag `carregando`).
- ✅ `id` é gerado com `Date.now().toString()`, nunca o índice do array.
- ✅ Todo `setMetas` usa `filter`/`map`/spread — nunca `push`/`splice` direto no array.
- ✅ Instalação do AsyncStorage via `npx expo install`, não `npm install` puro.

## Prints (adicionar antes de abrir o PR)

> Substitua os itens abaixo pelos prints reais do app rodando.

1. **Lista vazia** — tela inicial, sem metas cadastradas.
2. **Com itens** — algumas metas cadastradas, uma marcada como concluída.
3. **Após reabrir o app** — feche completamente o Expo Go/app e abra de
   novo, mostrando que as metas continuam lá (prova da persistência).

## Link do Pull Request

> Adicionar aqui o link do PR aberto no repositório da disciplina.

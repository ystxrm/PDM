# Gerenciador de Despesas (React Native / Expo)

Expansão do gerenciador de despesas com **categorias** e **filtro dinâmico**.

## Executar
```bash
npm install
npx expo install --fix   # alinha versões ao SDK do Expo
npx expo start
```

## Destaques
- `GerenciarDespesa.js`: estado `categoria`, seleção via `Pressable`, Regex `/^\d*\.?\d{0,2}$/`, DateTimePicker, validação de descrição/valor/categoria.
- `DespesaItem.js`: exibe data (`getDataFormatada`), descrição, valor e tag de categoria.
- `DespesaSumario.js`: `.reduce()` + `R$ x.toFixed(2)`; **bônus**: vermelho acima de R$ 200,00.
- `TodasDespesas.js`: filtro por categoria com `.filter()` (`src/util/filtros.js`) reaproveitando `DespesaSaida`.

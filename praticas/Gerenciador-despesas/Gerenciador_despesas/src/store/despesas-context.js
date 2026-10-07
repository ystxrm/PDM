import { createContext, useState } from 'react';
import { getDataMenosDias } from '../util/data';

const hoje = new Date();

const DESPESAS_INICIAIS = [
  { id: 'd1', descricao: 'Supermercado', valor: 89.9, data: getDataMenosDias(hoje, 2), categoria: 'Alimentação' },
  { id: 'd2', descricao: 'Ônibus', valor: 12.5, data: getDataMenosDias(hoje, 1), categoria: 'Transporte' },
  { id: 'd3', descricao: 'Cinema', valor: 45.0, data: getDataMenosDias(hoje, 5), categoria: 'Lazer' },
  { id: 'd4', descricao: 'Conta de luz', valor: 130.75, data: getDataMenosDias(hoje, 10), categoria: 'Contas' },
  { id: 'd5', descricao: 'Almoço', valor: 32.0, data: getDataMenosDias(hoje, 3), categoria: 'Alimentação' },
];

export const DespesasContext = createContext({
  despesas: [],
  adicionarDespesa: () => {},
  atualizarDespesa: () => {},
  excluirDespesa: () => {},
});

export default function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  const adicionarDespesa = (dados) =>
    setDespesas((atual) => [{ ...dados, id: String(Date.now()) }, ...atual]);

  const atualizarDespesa = (id, dados) =>
    setDespesas((atual) => atual.map((d) => (d.id === id ? { ...d, ...dados } : d)));

  const excluirDespesa = (id) =>
    setDespesas((atual) => atual.filter((d) => d.id !== id));

  return (
    <DespesasContext.Provider value={{ despesas, adicionarDespesa, atualizarDespesa, excluirDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}

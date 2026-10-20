import React from 'react';
import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

export default function DespesaSaida({ expenses, periodName }) {
  return (
    <DespesaLista
      expenses={expenses}
      ListHeaderComponent={<DespesaSumario expenses={expenses} periodName={periodName} />}
    />
  );
}

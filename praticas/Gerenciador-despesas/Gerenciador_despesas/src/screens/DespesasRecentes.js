import { useContext } from 'react';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { DespesasContext } from '../store/despesas-context';
import { getDataMenosDias } from '../util/data';

export default function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);
  const limite = getDataMenosDias(new Date(), 7);
  const recentes = despesas.filter((d) => d.data >= limite);

  return (
    <DespesaSaida
      despesas={recentes}
      periodo="Últimos 7 dias"
      textoFallback="Nenhuma despesa nos últimos 7 dias."
    />
  );
}

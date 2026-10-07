export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

// Retorna apenas as despesas da categoria escolhida ('Todas' = sem filtro)
export function filtrarPorCategoria(despesas, categoria) {
  if (!categoria || categoria === 'Todas') return despesas;
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

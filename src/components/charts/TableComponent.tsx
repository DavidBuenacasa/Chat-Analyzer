import { CATEGORIES, LABELS, MONTHS, sumCounts } from "./buscadorDatos";
import type { Months } from "./buscadorDatos";
export default function TableComponent({ data }: { data: Months }) {
  const format = (value: number) => value.toLocaleString("es-ES");
  return <div className="db-table-scroll" tabIndex={0} role="region" aria-label="Detalle de mensajes por mes, desplazamiento horizontal"><table className="db-table">
    <caption className="db-sr-only">Mensajes por mes y tipo para los filtros seleccionados</caption>
    <thead><tr><th scope="col">Mes</th>{CATEGORIES.map((key) => <th scope="col" key={key}>{LABELS[key]}</th>)}<th scope="col">Total</th></tr></thead>
    <tbody>{MONTHS.map((month) => <tr key={month}><th scope="row">{month}</th>{CATEGORIES.map((key) => <td key={key}>{format(data[month][key])}</td>)}<td><strong>{format(sumCounts(data[month]))}</strong></td></tr>)}</tbody>
    <tfoot><tr><th scope="row">Total</th>{CATEGORIES.map((key) => <td key={key}>{format(MONTHS.reduce((sum, month) => sum + data[month][key], 0))}</td>)}<td>{format(MONTHS.reduce((sum, month) => sum + sumCounts(data[month]), 0))}</td></tr></tfoot>
  </table></div>;
}

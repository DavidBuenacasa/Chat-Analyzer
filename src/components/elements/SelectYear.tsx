import { useId } from "react";
import { formatYear } from "../charts/buscadorDatos";
interface Props { years: string[]; value: string; onYearChange: (year: string) => void }
export default function SelectYear({ years, value, onYearChange }: Props) {
  const id = useId();
  return <div className="db-filter"><label htmlFor={id}>Periodo</label><select id={id} value={value} onChange={(event) => onYearChange(event.target.value)}><option value="0">Todos los años</option>{years.map((year) => <option key={year} value={year}>{formatYear(year)}</option>)}</select></div>;
}

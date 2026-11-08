import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { PieData } from "./buscadorDatos";
import { CHART_COLORS } from "./BarChartComponentByYear";
export default function PieChartComponent({ data, title }: { data: PieData[]; title: string }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return <article className="db-person"><h3>{title}</h3>{total === 0 ? <p className="db-empty">Sin mensajes en este periodo.</p> : <>
    <div className="db-donut" role="img" aria-label={`Distribución de ${total.toLocaleString("es-ES")} mensajes de ${title}; desglose a continuación.`}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="88%" paddingAngle={2} isAnimationActive={false}>{data.map((item, index) => <Cell key={item.name} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="var(--db-card)" />)}</Pie><Tooltip contentStyle={{ background: "var(--db-card)", color: "var(--db-text)", border: "1px solid var(--db-line)", borderRadius: 12 }} /></PieChart></ResponsiveContainer></div>
    <p className="db-person-total">{total.toLocaleString("es-ES")} <span>mensajes</span></p>
    <ul className="db-legend">{data.map((item, index) => <li key={item.name}><i style={{ background: CHART_COLORS[index % CHART_COLORS.length] }} aria-hidden="true" /><span>{item.name}</span><strong>{item.value.toLocaleString("es-ES")}</strong></li>)}</ul>
  </>}</article>;
}

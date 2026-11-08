import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { ChartData } from "./buscadorDatos";
export const CHART_COLORS = ["#16866c", "#66b6a3", "#628bcb", "#d6a54c", "#aa81bc", "#cf7b73", "#7a9e50"];
export default function RechartsBarChart({ data }: { data: ChartData }) {
  if (!data.data.length || !data.series.length) return <p className="db-empty">No hay datos disponibles.</p>;
  return <div className="db-chart" role="img" aria-label={`Mensajes por periodo de ${data.series.map((s) => s.name).join(", ")}. Consulta el detalle numérico en la tabla inferior.`}><ResponsiveContainer width="100%" height="100%"><BarChart data={data.data} margin={{ top: 18, right: 12, left: 0, bottom: 10 }} accessibilityLayer>
    <CartesianGrid strokeDasharray="3 4" vertical={false} stroke="var(--db-line)" />
    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--db-muted)" }} tickFormatter={(value: string) => value.length > 4 ? value.slice(0, 3) : value} axisLine={false} tickLine={false} minTickGap={10} />
    <YAxis allowDecimals={false} width={55} tick={{ fontSize: 11, fill: "var(--db-muted)" }} axisLine={false} tickLine={false} />
    <Tooltip contentStyle={{ background: "var(--db-card)", color: "var(--db-text)", border: "1px solid var(--db-line)", borderRadius: 12 }} cursor={{ fill: "var(--db-soft)" }} />
    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
    {data.series.map((series, index) => <Bar key={series.key} dataKey={series.key} name={series.name} fill={CHART_COLORS[index % CHART_COLORS.length]} radius={[4, 4, 0, 0]} maxBarSize={34} isAnimationActive={false} />)}
  </BarChart></ResponsiveContainer></div>;
}

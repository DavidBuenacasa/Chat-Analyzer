import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RechartsBarChart from "./components/charts/BarChartComponentByYear";
import BuscadorDatos, { parseChatData, MONTHS, sumCounts, formatYear } from "./components/charts/buscadorDatos";
import type { ChatRecord } from "./components/charts/buscadorDatos";
import SelectYear from "./components/elements/SelectYear";
import SelectPersona from "./components/elements/SelectPersona";
import PieChartComponent from "./components/charts/PieChartComponent";
import TableComponent from "./components/charts/TableComponent";
import HeaderNavComponent from "./components/elements/headerNav";
import "./styles/dashboard.css";
const finder = new BuscadorDatos();

function DashboardContent({ records }: { records: ChatRecord[] }) {
  const years = useMemo(() => finder.añosList(records), [records]);
  const people = useMemo(() => finder.personasList(records), [records]);
  const [year, setYear] = useState("0");
  const [person, setPerson] = useState(people[0] ?? "");
  const yearly = useMemo(() => finder.barChartByYear(records), [records]);
  const monthly = useMemo(() => finder.barChartByMonth(records, year), [records, year]);
  const breakdowns = useMemo(() => people.map((name) => ({ name, data: finder.pieChartByYear(records, year, name) })), [records, year, people]);
  const table = useMemo(() => finder.tableChart(records, year, person), [records, year, person]);
  const summary = useMemo(() => {
    const selected = records.filter((record) => year === "0" || record.año === year);
    let total = 0, text = 0;
    for (const record of selected) for (const months of record.mensajes) for (const month of MONTHS) { const counts = months[month]; total += sumCounts(counts); text += counts.mensajesTexto; }
    return { total, multimedia: total - text, people: new Set(selected.map((record) => record.nombre)).size };
  }, [records, year]);
  const period = year === "0" ? "Todos los años" : formatYear(year);
  return <main className="db-main">
    <header className="db-heading"><div><span className="db-eyebrow">TU CONVERSACIÓN, EN DATOS</span><h1>La historia de tu chat.</h1><p>Explora cómo cambia la conversación y qué aporta cada persona.</p></div><Link className="db-link" to="/">Analizar otro chat <span aria-hidden="true">↗</span></Link></header>
    <div className="db-toolbar"><div><strong>Vista general</strong><span>El periodo se aplica al resumen, los meses, los tipos y la tabla.</span></div><SelectYear years={years} value={year} onYearChange={setYear} /></div>
    <section className="db-kpis" aria-label={`Resumen: ${period}`}>
      {[{ label: "Mensajes", value: summary.total, note: period }, { label: "Participantes", value: summary.people, note: "Con registros en el periodo" }, { label: "Multimedia", value: summary.multimedia, note: "Audios, imágenes y otros archivos" }].map((item) => <article key={item.label}><span>{item.label}</span><strong>{item.value.toLocaleString("es-ES")}</strong><small>{item.note}</small></article>)}
    </section>
    <div className="db-chart-grid"><section className="db-panel"><div className="db-panel-head"><div><h2>Una conversación que evoluciona</h2><p>Mensajes por año · Histórico completo</p></div></div><RechartsBarChart data={yearly} /></section><section className="db-panel"><div className="db-panel-head"><div><h2>El ritmo de cada mes</h2><p>Mensajes por participante · {period}</p></div></div><RechartsBarChart data={monthly} /></section></div>
    <section className="db-panel"><div className="db-panel-head"><div><h2>Las formas de conversar</h2><p>Tipos de mensaje por participante · {period}</p></div></div><div className="db-people">{breakdowns.map((item) => <PieChartComponent key={item.name} title={item.name} data={item.data} />)}</div></section>
    <section className="db-panel"><div className="db-panel-head"><div><h2>Cada mensaje cuenta</h2><p>Detalle mensual · {person} · {period}</p></div><SelectPersona personas={people} value={person} onPersonaChange={setPerson} /></div><TableComponent data={table} /></section>
    <p className="db-footnote">Las cifras reflejan los mensajes que el analizador ha reconocido en el archivo exportado.</p>
  </main>;
}

export default function Dashboard() {
  const location = useLocation();
  const parsed = useMemo(() => {
    try { return { records: parseChatData(location.state as unknown), invalid: false }; }
    catch { return { records: [], invalid: true }; }
  }, [location.state]);
  return <div className="wa-dashboard"><HeaderNavComponent />{parsed.records.length ? <DashboardContent key={location.key} records={parsed.records} /> : <main className="db-fallback"><span className="db-eyebrow">WHATSAPP ANALYZER</span><h1>{parsed.invalid ? "Necesitamos una conversación" : "No encontramos mensajes"}</h1><p>{parsed.invalid ? "Vuelve al inicio y analiza un chat para consultar sus estadísticas." : "Comprueba que el archivo corresponde a un chat de iPhone compatible con el analizador."}</p><Link className="db-link" to="/">Volver al inicio →</Link></main>}</div>;
}

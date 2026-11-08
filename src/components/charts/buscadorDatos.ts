export const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"] as const;
export const CATEGORIES = ["mensajesTexto", "mensajesAudio", "fotos", "videos", "stickers", "gifs", "multimediaOmitido"] as const;
export type Category = typeof CATEGORIES[number];
export type Counts = Record<Category, number>;
export type Months = Record<string, Counts>;
export interface ChatRecord { nombre: string; año: string; mensajes: Months[] }
export interface ChartData { series: { key: string; name: string }[]; data: { name: string; [key: string]: string | number }[] }
export interface PieData { name: string; value: number }
export const LABELS: Record<Category, string> = { mensajesTexto: "Texto", mensajesAudio: "Audios", fotos: "Fotos", videos: "Vídeos", stickers: "Stickers", gifs: "GIF", multimediaOmitido: "Multimedia omitido" };
export const formatYear = (year: string) => /^\d{2}$/.test(year) ? `20${year}` : year;
export const emptyCounts = (): Counts => ({ mensajesTexto: 0, mensajesAudio: 0, fotos: 0, videos: 0, stickers: 0, gifs: 0, multimediaOmitido: 0 });
export const sumCounts = (counts: Counts) => CATEGORIES.reduce((sum, key) => sum + counts[key], 0);
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

/** Valida el contrato que devuelve Stats; nunca evalúa datos del archivo. */
export function parseChatData(input: unknown): ChatRecord[] {
  const parsed: unknown = typeof input === "string" ? JSON.parse(input) : input;
  if (!Array.isArray(parsed)) throw new Error("Formato de estadísticas no válido.");
  return parsed.map((record: unknown) => {
    if (!isObject(record) || typeof record.nombre !== "string" || !record.nombre.trim() || typeof record.año !== "string" || !/^\d{2}(\d{2})?$/.test(record.año) || !Array.isArray(record.mensajes)) throw new Error("Registro de estadísticas no válido.");
    const mensajes = record.mensajes.map((months: unknown) => {
      if (!isObject(months)) throw new Error("Meses no válidos.");
      const normalized: Months = {};
      for (const month of MONTHS) {
        const source = months[month];
        const counts = emptyCounts();
        if (source !== undefined) {
          if (!isObject(source)) throw new Error("Contadores no válidos.");
          for (const key of CATEGORIES) {
            const value = source[key] ?? 0;
            if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error("Contador no válido.");
            counts[key] = value;
          }
        }
        normalized[month] = counts;
      }
      return normalized;
    });
    return { nombre: record.nombre, año: record.año, mensajes };
  });
}

export default class BuscadorDatos {
  añosList(records: ChatRecord[]) { return [...new Set(records.map((r) => r.año))].sort((a,b) => Number(formatYear(a)) - Number(formatYear(b))); }
  personasList(records: ChatRecord[]) { return [...new Set(records.map((r) => r.nombre))].sort((a,b) => a.localeCompare(b, "es")); }
  tableChart(records: ChatRecord[], year: string, person: string): Months {
    const result: Months = Object.fromEntries(MONTHS.map((month) => [month, emptyCounts()]));
    for (const record of records) {
      if ((year !== "0" && record.año !== year) || record.nombre !== person) continue;
      for (const months of record.mensajes) for (const month of MONTHS) for (const key of CATEGORIES) result[month][key] += months[month]?.[key] ?? 0;
    }
    return result;
  }
  pieChartByYear(records: ChatRecord[], year: string, person: string): PieData[] {
    const months = this.tableChart(records, year, person);
    return CATEGORIES.map((key) => ({ name: LABELS[key], value: MONTHS.reduce((sum, month) => sum + months[month][key], 0) }));
  }
  private bars(records: ChatRecord[], year?: string): ChartData {
    const people = this.personasList(records);
    const series = people.map((name, index) => ({ key: `person${index}`, name }));
    const groups = year === undefined ? this.añosList(records) : [...MONTHS];
    return { series, data: groups.map((group) => {
      const row: ChartData["data"][number] = { name: year === undefined ? formatYear(group) : group };
      for (const item of series) {
        const months = this.tableChart(records, year === undefined ? group : year, item.name);
        row[item.key] = year === undefined ? MONTHS.reduce((sum, month) => sum + sumCounts(months[month]), 0) : sumCounts(months[group]);
      }
      return row;
    }) };
  }
  barChartByYear(records: ChatRecord[]) { return this.bars(records); }
  barChartByMonth(records: ChatRecord[], year: string) { return this.bars(records, year); }
}

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import FileSelectComponent from "./components/elements/FileSelectComponent";
import RadioButtonComponent from "./components/elements/RadioButtonComponent";
import HeaderNavComponent from "./components/elements/headerNav";
import Stats from "./fichero/Stats";
import "./styles/inicio.css";

export default function Inicio() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [platform, setPlatform] = useState("");
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const processing = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (processing.current) return;
    if (!file) return setError("Selecciona un archivo de conversación.");
    if (!/\.txt$/i.test(file.name)) return setError("El archivo debe tener extensión .txt.");
    if (file.size === 0) return setError("El archivo está vacío. Exporta de nuevo la conversación.");
    if (platform !== "iphone") return setError("Selecciona la plataforma de origen.");
    setError("");
    processing.current = true;
    setIsAnalyzing(true);
    try {
      // Permite que el navegador pinte el estado de carga antes del análisis.
      await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
      const stats = new Stats(file, platform);
      await stats.analizar();
      navigate("/dashboard", { state: stats.obtenerData() });
    } catch {
      setError("No se ha podido analizar la conversación. Comprueba que es un chat exportado desde WhatsApp sin archivos multimedia.");
    } finally {
      processing.current = false;
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="wa-home">
      <HeaderNavComponent />
      <main className="wa-layout">
        <section className="wa-intro" aria-labelledby="wa-title">
          <span className="wa-eyebrow">WHATSAPP ANALYZER</span>
          <h1 id="wa-title">Cada conversación<br />tiene una <em>historia.</em></h1>
          <p>Descubre los patrones, los momentos y las personas que dan vida a tus chats.</p>
          <ul className="wa-features">
            <li><span aria-hidden="true">01</span> Tu actividad a lo largo del tiempo</li>
            <li><span aria-hidden="true">02</span> Quién participa más en el chat</li>
            <li><span aria-hidden="true">03</span> Una nueva perspectiva de tus mensajes</li>
          </ul>
          <div className="wa-note">Empieza con una conversación exportada de WhatsApp en formato .txt.</div>
        </section>
        <section className="wa-card" aria-labelledby="wa-form-title">
          <div className="wa-card-heading"><span className="wa-badge">EMPIEZA AQUÍ</span><h2 id="wa-form-title">Explora tu conversación</h2><p>Prepara tu archivo y descubre qué cuenta tu chat.</p></div>
          <form onSubmit={handleSubmit} aria-busy={isAnalyzing}>
            <fieldset className="wa-fields" disabled={isAnalyzing}>
              <FileSelectComponent file={file} onChange={(nextFile) => { setFile(nextFile); setError(""); }} />
              <RadioButtonComponent value={platform} onChange={(value) => { setPlatform(value); setError(""); }} />
            </fieldset>
            {error && <div className="wa-error" role="alert">{error}</div>}
            <button className="wa-submit" type="submit" disabled={isAnalyzing}>
              {isAnalyzing ? <><span className="wa-spinner" aria-hidden="true" /> Analizando conversación…</> : <>Analizar conversación <span aria-hidden="true">→</span></>}
            </button>
            <p className="wa-status" role="status">{isAnalyzing ? "Estamos preparando tus estadísticas." : "Sin configurar cuentas ni conectar WhatsApp."}</p>
          </form>
          <details className="wa-help"><summary>¿Cómo exporto mi conversación?</summary><p>En WhatsApp para iPhone, abre el chat, pulsa el nombre del contacto o grupo y selecciona «Exportar chat» → «Sin archivos». Si recibes un ZIP, extráelo y selecciona el archivo .txt.</p></details>
        </section>
      </main>
    </div>
  );
}

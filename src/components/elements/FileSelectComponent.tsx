import { useId, useState } from "react";
import type { DragEvent } from "react";

interface FileSelectComponentProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function FileSelectComponent({ file, onChange }: FileSelectComponentProps) {
  const id = useId();
  const [isDragging, setIsDragging] = useState(false);
  const [dropError, setDropError] = useState("");
  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length !== 1) {
      setDropError("Arrastra un único archivo .txt.");
      return;
    }
    setDropError("");
    onChange(event.dataTransfer.files[0]);
  }
  return (
    <div className="wa-field">
      <label className="wa-label" htmlFor={id}><span>01</span> Sube tu conversación</label>
      <label className={`wa-dropzone${isDragging ? " is-dragging" : ""}${file ? " has-file" : ""}`} htmlFor={id}
        onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)} onDrop={handleDrop}>
        <input id={id} type="file" accept=".txt,text/plain" aria-describedby={`${id}-hint`}
          onChange={(event) => { const selected = event.target.files?.[0]; if (selected) { setDropError(""); onChange(selected); } event.target.value = ""; }} />
        <svg className="wa-upload-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 16V3m-5 5 5-5 5 5M4 15v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5" /></svg>
        <strong>{file ? file.name : "Arrastra aquí tu archivo"}</strong>
        <span>{file ? `${(file.size / 1024).toLocaleString("es-ES", { maximumFractionDigits: 1 })} KB · Pulsa para cambiarlo` : "o pulsa para seleccionarlo"}</span>
        <small id={`${id}-hint`}>Conversación exportada · Formato .txt</small>
      </label>
      {dropError && <p className="wa-error" role="alert">{dropError}</p>}
      {file && <button type="button" className="wa-remove" onClick={() => { onChange(null); setDropError(""); }}>Quitar archivo</button>}
    </div>
  );
}

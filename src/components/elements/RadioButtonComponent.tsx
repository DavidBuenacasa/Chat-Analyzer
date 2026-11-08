import { useId } from "react";

interface RadioButtonComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RadioButtonComponent({ value, onChange }: RadioButtonComponentProps) {
  const id = useId();
  return (
    <fieldset className="wa-platforms">
      <legend className="wa-label"><span>02</span> Elige la plataforma de origen</legend>
      <label className="wa-platform" htmlFor={id}>
        <input id={id} type="radio" name={`platform-${id}`} value="iphone" checked={value === "iphone"} onChange={() => onChange("iphone")} />
        <svg width="25" height="30" viewBox="0 0 24 30" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="5" y="2" width="14" height="26" rx="3" /><path d="M10 5h4m-3 20h2" /></svg>
        <span><strong>iPhone</strong><small>Chat exportado desde iOS</small></span>
      </label>
      <p className="wa-platform-note">Por ahora, solo se admite el formato de iPhone.</p>
    </fieldset>
  );
}

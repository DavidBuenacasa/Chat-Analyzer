import { useId } from "react";
interface Props { personas: string[]; value: string; onPersonaChange: (person: string) => void }
export default function SelectPersona({ personas, value, onPersonaChange }: Props) {
  const id = useId();
  return <div className="db-filter"><label htmlFor={id}>Participante</label><select id={id} value={value} disabled={!personas.length} onChange={(event) => onPersonaChange(event.target.value)}>{personas.map((person) => <option key={person} value={person}>{person}</option>)}</select></div>;
}

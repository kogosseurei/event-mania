import type { ReactElement } from 'react';
import { university } from '@/config';
export interface FacultySelectProps {
  value: string | null;
  onChange(value: string | null): void;
}
export function FacultySelect({ value, onChange }: FacultySelectProps): ReactElement {
  return (
    <label className="field">
      Your faculty <span className="optional-label">Optional · helps us find relevant events</span>
      <select value={value ?? ''} onChange={(event) => onChange(event.target.value || null)}>
        <option value="">All faculties</option>
        {university.faculties.map((faculty) => (
          <option key={faculty}>{faculty}</option>
        ))}
      </select>
    </label>
  );
}

import type { ReactElement } from 'react';
export interface McpToolDocsProps {
  title: string;
  name: string;
  description: string;
  schema: string;
  example: string;
}
export function McpToolDocs({
  title,
  name,
  description,
  schema,
  example,
}: McpToolDocsProps): ReactElement {
  return (
    <article className="tool-doc">
      <h3>{title}</h3>
      <code>{name}</code>
      <p>{description}</p>
      <details>
        <summary>Input schema</summary>
        <pre>
          <code>{schema}</code>
        </pre>
      </details>
      <pre>
        <code>{example}</code>
      </pre>
    </article>
  );
}

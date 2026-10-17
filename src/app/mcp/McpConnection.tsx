import type { ReactElement } from 'react';
export interface McpConnectionProps {
  endpoint: string;
}
export function McpConnection({ endpoint }: McpConnectionProps): ReactElement {
  const configuration = {
    mcpServers: { 'campus-events': { command: 'npx', args: ['-y', 'mcp-remote', endpoint] } },
  };
  return (
    <section className="section">
      <h2>Connect your assistant</h2>
      <p>
        Use this Streamable HTTP endpoint with a compatible MCP client. This server is read only and
        cannot save or RSVP.
      </p>
      <pre>
        <code>{endpoint}</code>
      </pre>
      <h3>For clients using mcp-remote</h3>
      <pre>
        <code>{JSON.stringify(configuration, null, 2)}</code>
      </pre>
    </section>
  );
}

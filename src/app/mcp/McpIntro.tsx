import type { ReactElement } from 'react';
import { Bot, ShieldCheck } from 'lucide-react';
export function McpIntro(): ReactElement {
  return (
    <div className="mcp-intro">
      <Bot size={36} />
      <div>
        <h2>Ask what’s happening.</h2>
        <p>Find events, explore venues, and get recommendations based on your interests.</p>
      </div>
      <ShieldCheck size={24} />
    </div>
  );
}

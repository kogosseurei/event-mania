import type { ReactElement } from 'react';
import { z } from 'zod';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { toolRegistry } from '@/server/tools';
import { AppShell, PageContainer, PageHeader } from '@/components/layout';
import { McpIntro } from './McpIntro';
import { McpConnection } from './McpConnection';
import { McpToolDocs } from './McpToolDocs';
export default function McpDocs(): ReactElement {
  const endpoint = `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/mcp`;
  const tools = toolRegistry.map((tool) => (
    <McpToolDocs
      key={tool.name}
      title={tool.title}
      name={tool.name}
      description={tool.description}
      schema={JSON.stringify(z.toJSONSchema(tool.schema), null, 2)}
      example={JSON.stringify({ name: tool.name, arguments: tool.example }, null, 2)}
    />
  ));
  return (
    <AppShell>
      <PageContainer>
        <PageHeader
          eyebrow="A LITTLE HELP FROM YOUR ASSISTANT"
          title="Your campus, in conversation."
          description="Connect your AI assistant to discover campus events without leaving your chat."
        />
        <McpIntro />
        <McpConnection endpoint={endpoint} />
        <section className="section">
          <h2>Five ways to explore</h2>
          <p>
            Inputs and examples come from the running server registry. Requests are limited to 20
            per minute per IP.
          </p>
          {tools}
        </section>
        <Link className="button button-primary" href="/browse">
          Explore in the app
          <ArrowUpRight size={16} />
        </Link>
      </PageContainer>
    </AppShell>
  );
}

/**
 * Newton MCP — wraps the Newton math solver API (free, no auth)
 *
 * Tools:
 * - simplify: simplify a mathematical expression
 * - derive: find the derivative of an expression with respect to x
 * - integrate: find the indefinite integral of an expression
 * - factor: factor a polynomial expression
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://newton.vercel.app/api/v2';

const tools: McpToolExport['tools'] = [
  {
    name: 'simplify',
    description:
      'Simplify a mathematical expression (e.g., "2^2+2(2)" → "8"). Supports standard algebraic notation.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        expression: {
          type: 'string',
          description: 'Mathematical expression to simplify (e.g., "2^2+2(2)", "x^2+2x+1")',
        },
      },
      required: ['expression'],
    },
  },
  {
    name: 'derive',
    description:
      'Compute the derivative of a mathematical expression with respect to x (e.g., "x^2" → "2 x")',
    inputSchema: {
      type: 'object' as const,
      properties: {
        expression: {
          type: 'string',
          description: 'Expression to differentiate (e.g., "x^2", "sin(x)", "x^3+2x^2+x")',
        },
      },
      required: ['expression'],
    },
  },
  {
    name: 'integrate',
    description:
      'Compute the indefinite integral of a mathematical expression with respect to x (e.g., "x^2" → "(1/3)x^3")',
    inputSchema: {
      type: 'object' as const,
      properties: {
        expression: {
          type: 'string',
          description: 'Expression to integrate (e.g., "x^2", "cos(x)", "x^3+x")',
        },
      },
      required: ['expression'],
    },
  },
  {
    name: 'factor',
    description:
      'Factor a polynomial expression (e.g., "x^2-1" → "(x-1)(x+1)", "x^2+3x+2" → "(x+1)(x+2)")',
    inputSchema: {
      type: 'object' as const,
      properties: {
        expression: {
          type: 'string',
          description: 'Polynomial expression to factor (e.g., "x^2-1", "x^2+3x+2")',
        },
      },
      required: ['expression'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const expression = args.expression as string;
  switch (name) {
    case 'simplify':
      return callNewton('simplify', expression);
    case 'derive':
      return callNewton('derive', expression);
    case 'integrate':
      return callNewton('integrate', expression);
    case 'factor':
      return callNewton('factor', expression);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function callNewton(operation: string, expression: string) {
  const encodedExpr = encodeURIComponent(expression);
  const res = await fetch(`${BASE_URL}/${operation}/${encodedExpr}`);
  if (!res.ok) throw new Error(`Newton API error: ${res.status} ${res.statusText}`);

  const data = (await res.json()) as {
    operation?: string;
    expression?: string;
    result?: string;
    error?: string;
  };

  if (data.error) throw new Error(`Newton error: ${data.error}`);

  return {
    operation: data.operation ?? operation,
    input: data.expression ?? expression,
    result: data.result ?? null,
  };
}

export default { tools, callTool } satisfies McpToolExport;

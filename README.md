# mcp-newton

Newton MCP — wraps the Newton math solver API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `simplify` | Reduce a mathematical expression to its simplest form. Input algebraic notation (e.g., "2^2+2(2)"). Returns simplified result. |
| `derive` | Find the derivative of an expression with respect to x. Input algebraic notation (e.g., "x^2"). Returns the derivative. |
| `integrate` | Find the indefinite integral of an expression with respect to x. Input algebraic notation (e.g., "x^2"). Returns antiderivative with constant C. |
| `factor` | Factor a polynomial into irreducible factors. Input polynomial (e.g., "x^2-1" or "x^2+3x+2"). Returns factored form. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "newton": {
      "url": "https://gateway.pipeworx.io/newton/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Newton data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT

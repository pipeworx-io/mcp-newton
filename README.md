# @pipeworx/mcp-newton

MCP server for symbolic math operations via the [Newton API](https://newton.vercel.app/). Free, no authentication required.

## Tools

| Tool | Description |
|------|-------------|
| `simplify` | Simplify a mathematical expression |
| `derive` | Compute the derivative of an expression with respect to x |
| `integrate` | Compute the indefinite integral of an expression |
| `factor` | Factor a polynomial expression |

## Quickstart via Pipeworx Gateway

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "newton__derive",
      "arguments": { "expression": "x^3+2x^2+x" }
    },
    "id": 1
  }'
```

## License

MIT

# Cursor setup

Add the official endpoint in Cursor's MCP settings or merge this into the project's `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "mobbin": {
      "url": "https://api.mobbin.com/mcp"
    }
  }
}
```

Restart Cursor if necessary, invoke a Mobbin tool, and complete OAuth in the browser.

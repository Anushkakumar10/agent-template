# Installation

## Requirements

- Python 3.11+
- [uv](https://docs.astral.sh/uv/) (recommended) or pip

## Install ak-agent-template

=== "uv (recommended)"

    ```bash
    uv tool install ak-agent-template
    ```

=== "pip"

    ```bash
    pip install ak-agent-template
    ```

=== "pipx"

    ```bash
    pipx install ak-agent-template
    ```

## Verify Installation

```bash
ak-agent-template --version
```

## Create Your First Project

```bash
# Interactive wizard (recommended)
ak-agent-template new

# Quick mode with options
ak-agent-template create my_app \
  --database postgresql \
  --auth jwt \
  --frontend nextjs

# Use presets
ak-agent-template create my_app --preset ai-agent
```

## Available Presets

| Preset | Description |
|--------|-------------|
| `--preset production` | Full production setup with Redis, Sentry, Kubernetes, Prometheus |
| `--preset ai-agent` | AI agent with WebSocket streaming and conversation persistence |
| `--minimal` | Minimal project with no extras |

## Project Dependencies

Generated projects use [uv](https://docs.astral.sh/uv/) for dependency management:

```bash
cd my_app/backend
make install  # Installs all dependencies
```

## Next Steps

- [Quick Start](guides/quick-start.md) - Set up your development environment
- [Configuration](guides/configuration.md) - Learn about configuration options
- [AI Agents](ai-agent.md) - Configure AI frameworks

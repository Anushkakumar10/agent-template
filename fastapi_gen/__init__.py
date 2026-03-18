"""Full-Stack AI Agent Template Generator."""

from importlib.metadata import PackageNotFoundError, version

try:
    __version__ = version("ak-agent-template")
except PackageNotFoundError:
    __version__ = "0.0.0"  # Development/editable install fallback

import os
import shutil
import tempfile
from pathlib import Path
from typing import Any

from fastapi_gen.config import ProjectConfig
from fastapi_gen.generator import generate_project


def validate_and_parse_config(config_dict: dict[str, Any]) -> ProjectConfig:
    """Validate and parse config dictionary into a ProjectConfig instance."""
    return ProjectConfig.model_validate(config_dict)


def generate_agent_zip(config_dict: dict[str, Any]) -> str:
    """Generate agent project in a temporary directory and return zip file path.
    
    Caller is responsible for cleaning up the zip file after serving.
    """
    config = validate_and_parse_config(config_dict)

    temp_dir = tempfile.mkdtemp(prefix="agent_gen_")
    temp_path = Path(temp_dir)

    try:
        # Generate project into temp_dir
        project_path = generate_project(config, output_dir=temp_path)

        # Create zip archive
        archive_name = os.path.join(temp_dir, f"{config.project_slug}")
        zip_file_path = shutil.make_archive(
            base_name=archive_name,
            format="zip",
            root_dir=temp_dir,
            base_dir=config.project_slug,
        )

        return zip_file_path
    except Exception:
        shutil.rmtree(temp_dir, ignore_errors=True)
        raise

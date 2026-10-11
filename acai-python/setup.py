import sys
from setuptools import setup, find_packages
import pathlib

here = pathlib.Path(__file__).parent.resolve()
sys.path.insert(0, str(here / 'src'))

from acai.constants import SDK_VERSION

# Get the long description from the README file
long_description = (here / "README.md").read_text(encoding="utf-8")

setup(
    name="acai-analytics",
    version=SDK_VERSION,
    description="The official Acai backend Python SDK for server-side instrumentation.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/your-org/acai-python",  # Optional
    author="Acai Inc.",
    author_email="sdk.dev@acai.com",
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        # Indicate who your project is intended for
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
    keywords="acai, python, backend, analytics",
    package_dir={"": "src"},
    packages=["acai"],
    python_requires=">=3.6, <4",
    license='MIT License',
    project_urls={
        "Bug Reports": "https://github.com/your-org/acai-python/issues",
        "Source": "https://github.com/your-org/acai-python",
        "Developer Doc": "https://docs.acai.io/sdks/python/"
    },
)

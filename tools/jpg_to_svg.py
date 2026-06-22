#!/usr/bin/env python3
"""Convert JPG/JPEG files to SVG wrappers with embedded image data.

This tool does not trace pixels into vector paths. It creates a valid SVG that
contains the original JPG as a base64 data URI, preserving the source image
quality and dimensions without external dependencies.
"""

from __future__ import annotations

import argparse
import base64
import html
import sys
from pathlib import Path
from typing import Iterable


JPEG_EXTENSIONS = {".jpg", ".jpeg"}
SOF_MARKERS = {
    0xC0,
    0xC1,
    0xC2,
    0xC3,
    0xC5,
    0xC6,
    0xC7,
    0xC9,
    0xCA,
    0xCB,
    0xCD,
    0xCE,
    0xCF,
}
NO_PAYLOAD_MARKERS = {0x01, 0xD8, 0xD9, *range(0xD0, 0xD8)}


class ConversionError(Exception):
    """Raised when a JPG file cannot be converted."""


def read_jpeg_size(path: Path) -> tuple[int, int]:
    data = path.read_bytes()

    if len(data) < 4 or data[:2] != b"\xff\xd8":
        raise ConversionError(f"{path} is not a valid JPG file")

    index = 2
    while index < len(data):
        while index < len(data) and data[index] != 0xFF:
            index += 1

        while index < len(data) and data[index] == 0xFF:
            index += 1

        if index >= len(data):
            break

        marker = data[index]
        index += 1

        if marker in NO_PAYLOAD_MARKERS:
            continue

        if marker == 0xDA:
            break

        if index + 2 > len(data):
            break

        segment_length = int.from_bytes(data[index : index + 2], "big")
        if segment_length < 2 or index + segment_length > len(data):
            break

        if marker in SOF_MARKERS:
            segment = data[index + 2 : index + segment_length]
            if len(segment) < 5:
                break
            height = int.from_bytes(segment[1:3], "big")
            width = int.from_bytes(segment[3:5], "big")
            if width <= 0 or height <= 0:
                break
            return width, height

        index += segment_length

    raise ConversionError(f"Could not read JPG dimensions from {path}")


def svg_for_jpg(path: Path, title: str | None = None) -> str:
    width, height = read_jpeg_size(path)
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    label = html.escape(title or path.stem, quote=True)

    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'width="{width}" height="{height}" viewBox="0 0 {width} {height}" '
        f'role="img" aria-label="{label}">\n'
        f'  <title>{label}</title>\n'
        f'  <image width="{width}" height="{height}" '
        f'preserveAspectRatio="xMidYMid meet" '
        f'href="data:image/jpeg;base64,{encoded}" />\n'
        "</svg>\n"
    )


def iter_jpg_files(source: Path, recursive: bool) -> Iterable[Path]:
    if source.is_file():
        if source.suffix.lower() not in JPEG_EXTENSIONS:
            raise ConversionError(f"{source} is not a .jpg or .jpeg file")
        yield source
        return

    if not source.is_dir():
        raise ConversionError(f"{source} does not exist")

    pattern = "**/*" if recursive else "*"
    for path in sorted(source.glob(pattern)):
        if path.is_file() and path.suffix.lower() in JPEG_EXTENSIONS:
            yield path


def output_path_for(source: Path, input_file: Path, output: Path | None, out_dir: Path | None) -> Path:
    if source.is_file():
        return output or input_file.with_suffix(".svg")

    base_dir = out_dir or source
    relative = input_file.relative_to(source)
    return base_dir / relative.with_suffix(".svg")


def convert_file(input_file: Path, output_file: Path, overwrite: bool, title: str | None) -> None:
    if output_file.exists() and not overwrite:
        raise ConversionError(f"{output_file} already exists. Use --overwrite to replace it.")

    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(svg_for_jpg(input_file, title), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert JPG/JPEG files to SVG files that embed the original image."
    )
    parser.add_argument("source", nargs="?", type=Path, help="Input .jpg/.jpeg file or directory")
    parser.add_argument("-o", "--output", type=Path, help="Output SVG path for a single input file")
    parser.add_argument("--out-dir", type=Path, help="Output directory for batch conversion")
    parser.add_argument("-r", "--recursive", action="store_true", help="Convert JPG files in subdirectories")
    parser.add_argument("--overwrite", action="store_true", help="Replace existing SVG files")
    parser.add_argument("--title", help="SVG title/aria-label for a single input file")
    return parser.parse_args()


def clean_input_path(value: str) -> Path:
    return Path(value.strip().strip('"').strip("'"))


def ask_yes_no(question: str, default: bool = False) -> bool:
    suffix = "Y/n" if default else "y/N"
    answer = input(f"{question} ({suffix}): ").strip().lower()
    if not answer:
        return default
    return answer in {"y", "yes"}


def convert_source(
    source: Path,
    output: Path | None = None,
    out_dir: Path | None = None,
    recursive: bool = False,
    overwrite: bool = False,
    title: str | None = None,
) -> int:
    source = source.resolve()

    if output and source.is_dir():
        raise ConversionError("--output can only be used with a single input file")

    if title and source.is_dir():
        raise ConversionError("--title can only be used with a single input file")

    converted = 0
    for input_file in iter_jpg_files(source, recursive):
        output_file = output_path_for(source, input_file, output, out_dir)
        convert_file(input_file, output_file, overwrite, title)
        print(f"{input_file} -> {output_file}")
        converted += 1

    if converted == 0:
        raise ConversionError(f"No JPG files found in {source}")

    print(f"Converted {converted} file(s).")
    return 0


def run_interactive() -> int:
    print("JPG to SVG converter")
    print("Tip: You can also drag a .jpg file onto this exe.")
    print()

    source_text = input("JPG file or folder path: ").strip()
    if not source_text:
        raise ConversionError("No input path provided")

    source = clean_input_path(source_text)
    if source.is_file():
        output_text = input("Output SVG path (blank = same folder/name): ").strip()
        output = clean_input_path(output_text) if output_text else None
        title = input("SVG title (blank = file name): ").strip() or None
        return convert_source(source, output=output, overwrite=True, title=title)

    out_dir_text = input("Output folder (blank = same folder): ").strip()
    out_dir = clean_input_path(out_dir_text) if out_dir_text else None
    recursive = ask_yes_no("Include subfolders", default=True)
    overwrite = ask_yes_no("Overwrite existing SVG files", default=True)
    return convert_source(source, out_dir=out_dir, recursive=recursive, overwrite=overwrite)


def pause_before_exit() -> None:
    try:
        input("\nPress Enter to close...")
    except EOFError:
        pass


def main() -> int:
    args = parse_args()
    if args.source is None:
        return run_interactive()

    return convert_source(
        args.source,
        output=args.output,
        out_dir=args.out_dir,
        recursive=args.recursive,
        overwrite=args.overwrite,
        title=args.title,
    )


if __name__ == "__main__":
    should_pause = len(sys.argv) == 1
    try:
        raise SystemExit(main())
    except ConversionError as error:
        print(f"error: {error}")
        raise SystemExit(1)
    finally:
        if should_pause:
            pause_before_exit()

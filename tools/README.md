# JPG to SVG Tool

Convert JPG/JPEG files into SVG files that embed the original JPG as base64.
This keeps the original photo quality and dimensions, and it does not require
Python packages outside the standard library.

## Usage

Windows executable:

```bash
tools\dist\jpg-to-svg.exe public\images\photo.jpg
```

You can also double-click `tools\dist\jpg-to-svg.exe`. When opened without
arguments, it will ask for a JPG file or folder path and wait before closing.

To convert one file quickly, drag a `.jpg` or `.jpeg` file onto
`tools\dist\jpg-to-svg.exe`.

Windows executable with custom output:

```bash
tools\dist\jpg-to-svg.exe public\images\photo.jpg -o public\images\photo.svg
```

Single file:

```bash
python tools/jpg_to_svg.py public/images/photo.jpg
```

Custom output:

```bash
python tools/jpg_to_svg.py public/images/photo.jpg -o public/images/photo.svg
```

Convert a folder:

```bash
python tools/jpg_to_svg.py public/images --recursive --overwrite
```

Write batch output to another folder:

```bash
python tools/jpg_to_svg.py public/images --recursive --out-dir public/svg-images
```

## Rebuild the EXE

```bash
python -m PyInstaller --onefile --clean --name jpg-to-svg --distpath tools\dist --workpath tools\build --specpath tools tools\jpg_to_svg.py
```

Note: this is an SVG wrapper around the JPG. It is not vector tracing into
paths. For real vector tracing, use a tracing tool such as Inkscape or Potrace
after converting the image to a suitable bitmap format.

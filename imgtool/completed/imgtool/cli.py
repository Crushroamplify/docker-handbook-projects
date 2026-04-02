"""imgtool — a read-only CLI that inspects image files in a directory."""

import argparse
import os
import sys

IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".gif",
    ".bmp", ".webp", ".svg", ".tiff",
}


def _find_images(path):
    """Walk *path* and yield (filepath, extension, size) for every image file."""
    for root, _dirs, files in os.walk(path):
        for name in sorted(files):
            ext = os.path.splitext(name)[1].lower()
            if ext in IMAGE_EXTENSIONS:
                full = os.path.join(root, name)
                yield full, ext, os.path.getsize(full)


def _format_size(nbytes):
    """Return a human-friendly size string."""
    for unit in ("B", "KB", "MB", "GB"):
        if nbytes < 1024:
            return f"{nbytes:.1f} {unit}"
        nbytes /= 1024
    return f"{nbytes:.1f} TB"


# ── commands ────────────────────────────────────────────────────────

def cmd_scan(args):
    """List every image file found under the given path."""
    images = list(_find_images(args.path))
    if not images:
        print(f"No image files found in {args.path}")
        return

    print(f"Image files in {args.path}\n")
    for filepath, _ext, size in images:
        print(f"  {filepath}  ({_format_size(size)})")
    print(f"\n{len(images)} image(s) found.")


def cmd_report(args):
    """Print a summary report of image files under the given path."""
    images = list(_find_images(args.path))
    if not images:
        print(f"No image files found in {args.path}")
        return

    # counts and sizes by extension
    by_ext = {}
    total_size = 0
    for filepath, ext, size in images:
        by_ext.setdefault(ext, {"count": 0, "size": 0})
        by_ext[ext]["count"] += 1
        by_ext[ext]["size"] += size
        total_size += size

    smallest = min(images, key=lambda x: x[2])
    largest = max(images, key=lambda x: x[2])

    print(f"Image report for {args.path}")
    print("=" * 50)
    print(f"\n{'Extension':<12}{'Count':>8}{'Total Size':>14}")
    print(f"{'-' * 12}{'-' * 8}{'-' * 14}")
    for ext in sorted(by_ext):
        info = by_ext[ext]
        print(f"{ext:<12}{info['count']:>8}{_format_size(info['size']):>14}")

    print(f"\nTotal images : {len(images)}")
    print(f"Total size   : {_format_size(total_size)}")
    print(f"Smallest     : {smallest[0]} ({_format_size(smallest[2])})")
    print(f"Largest      : {largest[0]} ({_format_size(largest[2])})")


# ── entry point ─────────────────────────────────────────────────────

def main(argv=None):
    parser = argparse.ArgumentParser(
        prog="imgtool",
        description="Inspect image files in a directory (read-only).",
    )
    sub = parser.add_subparsers(dest="command")
    sub.required = True

    scan_p = sub.add_parser("scan", help="List all image files")
    scan_p.add_argument("path", help="Directory to scan")
    scan_p.set_defaults(func=cmd_scan)

    report_p = sub.add_parser("report", help="Generate a summary report")
    report_p.add_argument("path", help="Directory to report on")
    report_p.set_defaults(func=cmd_report)

    args = parser.parse_args(argv)
    args.func(args)


if __name__ == "__main__":
    main()

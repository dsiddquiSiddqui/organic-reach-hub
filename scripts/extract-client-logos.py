from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / ".tmp" / "profile-pages"
OUTPUT = ROOT / "public" / "client-logos"
OUTPUT.mkdir(parents=True, exist_ok=True)


def export_grid(source: str, bounds: tuple[int, int, int, int], columns: int, rows: int, names: list[str]) -> None:
    image = Image.open(SOURCE / source).convert("RGB")
    left, top, right, bottom = bounds
    cell_width = (right - left) / columns
    cell_height = (bottom - top) / rows

    for index, name in enumerate(names):
        row, column = divmod(index, columns)
        x1 = round(left + column * cell_width + 18)
        y1 = round(top + row * cell_height + 18)
        x2 = round(left + (column + 1) * cell_width - 18)
        y2 = round(top + (row + 1) * cell_height - 18)
        crop = image.crop((x1, y1, x2, y2))
        crop.thumbnail((720, 520), Image.Resampling.LANCZOS)
        crop.save(OUTPUT / f"{name}.webp", "WEBP", quality=88, method=6)


export_grid(
    "logos-09.png",
    (116, 58, 3421, 2040),
    5,
    3,
    [
        "design-and-excellence", "eden-montessori", "riviera-shades", "restorfx", "klick-health",
        "world-wide-movers", "brand-mark-01", "brand-mark-02", "food-brand", "the-pink-stone",
        "igloo-pakistan", "target-pest-control", "maroc-hammam-spa", "ma-cattles-and-farm", "hanzala-employment-services",
    ],
)

export_grid(
    "logos-10.png",
    (540, 65, 3194, 2040),
    4,
    3,
    [
        "good-guy-vapes", "mia-enterprises", "youexcel", "brand-mark-03",
        "laila-majnu", "turkish-beauty-saloon", "clifton-surgical", "gaba",
        "tatheer-collections", "urban-kids", "jilani-taylors", "brand-mark-04",
    ],
)

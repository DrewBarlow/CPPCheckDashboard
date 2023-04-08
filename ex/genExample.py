from html import escape
from typing import Generator, Tuple

INPUT_FILENAME: str = "test.cpp"
OUTPUT_FILENAME: str = "out.html"

CHECKED_VALID: str = "checkedNoErr"
CHECKED_ERROR: str = "checkedErr"
NOT_CHECKED: str = "notChecked"

class Line:
    def __init__(self, line: str, /, *, color_class: str=NOT_CHECKED) -> None:
        self._line: str = line
        self._class: str = color_class
        if "//" not in line:
            self._class = CHECKED_VALID
        return

    def get_data(self) -> Tuple[str, str]:
        return self._line, self._class

def simulate_tok_stream() -> Generator[Line, None, None]:
    with open(INPUT_FILENAME, 'r') as file:
        line: str = file.readline()
        while line:
            yield Line(line)
            line = file.readline()

    return

def main() -> None:
    with open(OUTPUT_FILENAME, 'w') as file:
        file.write("""<!DOCTYPE html>
<html>
  <head>
    <style>
      html * {
        font-family: "Courier New", Courier, monospace; 
        font-weight: 700;
        line-height: 26.4px;
      } 
      h1 { font-size: 30px; }
      p { font-size: 18px; }
      .checkedNoErr { background: #B0FFAD; }
      .notChecked { background: #FFADAD; }
      .checkedErr { background: #FFDEAD; }
      .outer { border: 1px solid #000000; }
      .inner {
        border: 2px solid black;
        font-size: 24px;
      }
    </style>
  </head>

  <body>
    <table class="outer">
""")
        file.write(f"      <h1>{escape(INPUT_FILENAME)}</h1>\n")
        file.write("""      <table class="inner">
        <thead></thead>
""")
        for line in simulate_tok_stream():
            line, color_class = line.get_data()
            file.write(f"        <tr><td class={color_class}>{escape(line)}</td></tr>")
        file.write("""      </table>
    </table>
  </body>
</html>
""")

    return

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Rewrite the Russian localisation bundles from fake-Latin into real Cyrillic.

The 2015 build had no Cyrillic anywhere in it. Russian was typed on a ЙЦУКЕН
keyboard with the US layout active, so it reached the .properties files as the
Latin characters printed on those keys ("Xnj |nj pf pder gjpflb?"), and was
rendered with stuff/Munro_ru.ttf, a font whose Latin slots hold Cyrillic
outlines. Opening a bundle in any other program showed gibberish, the text was
unsearchable and unspellcheckable, and no letter could be used that the trick
had no slot for - which is why the script has no ё.

The table below is not guessed from the keyboard layout: every entry was read
off Munro_ru.ttf by rendering its glyph and identifying the letter drawn there.
Most of it does follow ЙЦУКЕН, but the letters that would have collided with
punctuation the game needs were moved elsewhere, which is why б, ю, э, Б, Э and
Х sit where they do, and why the colon had to move out to '*'.

Run from anywhere:  python tools/i18n/jcuken_to_cyrillic.py

The conversion is one-way and has already been applied to the bundles in git.
This file is kept as the record of what the mapping was.
"""

import pathlib
import sys

# Latin character in the old files -> the Cyrillic letter Munro_ru.ttf draws there.
LOWER = {
    'f': 'а', '<': 'б', 'd': 'в', 'u': 'г', 'l': 'д', 't': 'е', ';': 'ж',
    'p': 'з', 'b': 'и', 'q': 'й', 'r': 'к', 'k': 'л', 'v': 'м', 'y': 'н',
    'j': 'о', 'g': 'п', 'h': 'р', 'c': 'с', 'n': 'т', 'e': 'у', 'a': 'ф',
    '[': 'х', 'w': 'ц', 'x': 'ч', 'i': 'ш', 'o': 'щ', ']': 'ъ', 's': 'ы',
    'm': 'ь', '|': 'э', '>': 'ю', 'z': 'я',
}

UPPER = {
    'F': 'А', '$': 'Б', 'D': 'В', 'U': 'Г', 'L': 'Д', 'T': 'Е', ':': 'Ж',
    'P': 'З', 'B': 'И', 'Q': 'Й', 'R': 'К', 'K': 'Л', 'V': 'М', 'Y': 'Н',
    'J': 'О', 'G': 'П', 'H': 'Р', 'C': 'С', 'N': 'Т', 'E': 'У', 'A': 'Ф',
    '{': 'Х', 'W': 'Ц', 'X': 'Ч', 'I': 'Ш', 'O': 'Щ', '}': 'Ъ', 'S': 'Ы',
    'M': 'Ь', '_': 'Э', 'Z': 'Я',
}

# ':' had to give up its own slot to Ж, so the colon was parked on '*'.
PUNCTUATION = {'*': ':'}

TABLE = {**LOWER, **UPPER, **PUNCTUATION}

# Everything a converted value is allowed to contain besides Cyrillic.
PASS_THROUGH = set(" .,:!?-()0123456789'\"/%+#&@")

# Trailing filler: each bundle was written into a fixed 10000-byte buffer and
# padded to the end with NULs or spaces, which Java properties would otherwise
# count as part of the last value.
PADDING = b'\x00 \r\n'


def decode(text):
    return ''.join(TABLE.get(ch, ch) for ch in text)


def convert(path):
    """Rewrite one bundle in place. Returns (number of keys, leftover characters)."""
    raw = path.read_bytes().rstrip(PADDING).decode('cp1252')

    out = []
    leftovers = set()
    keys = 0
    for line in raw.split('\r\n' if '\r\n' in raw else '\n'):
        line = line.strip('\x00 \t\r\n')
        if not line:
            continue
        if line.startswith(('#', '!')) or '=' not in line:
            out.append(line)
            continue
        key, value = line.split('=', 1)
        value = decode(value)
        leftovers |= {c for c in value if not ('Ѐ' <= c <= 'ӿ' or c in PASS_THROUGH)}
        out.append(key + '=' + value)
        keys += 1

    path.write_bytes(('\r\n'.join(out) + '\r\n').encode('utf-8'))
    return keys, leftovers


def main():
    root = pathlib.Path(__file__).resolve().parents[2] / 'assets'
    bundles = sorted(root.glob('bundle_ru_*.properties')) + [root / 'strings' / 'bundle_ru.properties']

    problems = 0
    for path in bundles:
        if not path.exists() or not path.stat().st_size:
            print('{:34s} empty, skipped'.format(path.name))
            continue
        keys, leftovers = convert(path)
        note = ''
        if leftovers:
            note = '  UNCONVERTED: ' + ' '.join(sorted(repr(c) for c in leftovers))
            problems += 1
        print('{:34s} {:4d} keys{}'.format(path.name, keys, note))

    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())

# Localization notes

How the Russian script stopped being Latin gibberish behind a trick font.

## The trick

Nothing in the 2015 build was Cyrillic. Open `assets/bundle_ru_INTRO.properties`
in any editor and the first line reads:

```
sound1=Xnj |nj pf pder gjpflb?
```

That is "Что это за звук позади?" typed on a ЙЦУКЕН keyboard with the US layout
still active. The letters that reached the file are the ones printed on those
keys. It was made readable again at the other end by `stuff/Munro_ru.ttf`, a font
whose Latin slots do not hold Latin: ask it for `X` and it draws Ч, ask for `n`
and it draws т. Two wrongs lining up.

The game switched fonts with the language, so English got real Munro and Russian
got the substitute, and on screen both looked correct.

## Why it could not stay

The text was unsearchable, unspellcheckable and unreadable to every tool that
touched it, including the author's own editor. Translating it meant owning a
keyboard layout rather than a dictionary. The alphabet was whatever the font had
slots for, which is why 875 lines of Russian script contain no ё at all — there
was nowhere to put it. And the substitute font is a monospaced 12x16 face wearing
Munro's name records, so Russian rendered at a different size, weight and rhythm
from English for reasons no one chose.

## Reading the table back

The mapping was not assumed from the keyboard layout, because it does not follow
it. Every glyph in `Munro_ru.ttf` was rendered and identified by eye, which turned
up six slots that had been moved: б, ю and э sit on `<`, `>` and `|`, their
capitals on `$`, `_` and `{`, and the colon was pushed out to `*` because Ж had
taken its key. A layout-based guess would have corrupted all six.

The verified table is `tools/i18n/jcuken_to_cyrillic.py`, which is also the script
that did the conversion. It is kept as the record of what the mapping was.
`stuff/Munro_ru.ttf` is kept for the same reason and is no longer loaded.

## The font

Munro has no Cyrillic, so Russian needed a pixel face that encodes it properly
rather than one more workaround. It uses
[Ark Pixel](https://github.com/TakWolf/ark-pixel-font) 10px proportional, under
the SIL Open Font License (`stuff/ark-pixel-OFL.txt`), unmodified from the
2026.09.01 release.

It is drawn on a 10px grid, so at `size = 10` every stroke lands on a whole pixel
the way Munro does at that size, and its 7px cap height sits within a quarter of a
pixel of Munro's. Russian and English now render at one size, and the two
hand-measured x offsets that used to compensate for the old font's width are gone,
replaced by centring the prompt inside the frame it belongs to.

FreeType only rasterises the characters it is asked for and libGDX's default set
stops at Latin-1, so `Assets.loadLanguage` appends the Cyrillic block explicitly.
Without that the bundles are correct and every Russian line draws blank.

## What changed

- **15 Russian bundles, 875 lines**, rewritten from fake Latin to UTF-8 Cyrillic.
  libGDX reads `.properties` as UTF-8 already, so no loader change was needed.
- **Trailing filler dropped.** Every Russian bundle had been written into a fixed
  10000-byte buffer and padded to the end with NULs or spaces, which Java
  properties counts as part of the last value in the file.
- **`Assets.loadLanguage`** loads Ark Pixel for Russian at size 10 with Cyrillic
  in the character set, instead of `Munro_ru.ttf` at size 8.
- **`LanguageScreen`** no longer carries `"Yf;fnm {"` hardcoded in the source. It
  reads the `use` key like every other screen.

## Verification

`./gradlew smokeTest` boots the game and screenshots the Russian main menu. Beyond
that, the converted bundles were checked to hold the same key set as their English
counterparts, and every character of every converted value was checked to land in
the Cyrillic block or in punctuation the game already used — the conversion script
reports a failure if any does not.

Comparing key sets turned up one thing that had nothing to do with Russian.
`bundle_en_HDREAM2.properties` began with a UTF-8 BOM, and neither `I18NBundle`
nor `PropertiesUtils` strips one, so its first key parsed as U+FEFF followed by
`not` rather than as `not`. It was latent rather than live: hdream2.js never asks
for that key, and the five levels that do — hcave, hclub, hday3, hday4 and hpast —
each define their own BOM-free copy. Stripped in a separate commit; no bundle
carries a BOM now.

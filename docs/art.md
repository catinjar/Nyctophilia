# Art

Nyctophilia is pixel art drawn for a 320x180 canvas and then blown up to whatever the monitor
is, with a CRT filter over the top. Everything about how it looks comes from four decisions:
the tiny resolution, the two-texture lighting model, the post-processing pass, and a bitmap
font rendered at 10 pixels.

## Resolution and scale

The world camera is an orthographic 320x180. The interface camera is a second orthographic
camera at the same size, so interface coordinates in the source are literally pixels of the
virtual screen. Only the main menu is different: it uses a 1920x1080 virtual viewport, because
it draws a full-resolution background and a 200-point Roboto title.

The player is fixed at `y = 15`, which is the floor line. Most rooms put a 15-unit floor band
at the bottom and another at the top, leaving a 150-unit wall.

| Thing | Source pixels | World units |
| --- | --- | --- |
| Player sprite | 16 x 56 | 32 x 112 |
| Player lamp halo | 60 x 60 | 120 x 120 |
| A door | ~5 x 50 | ~8 x 125 |
| A table | 19 x 20 | 38 x 40 |
| A wall panel | 80 x 50 | 240 x 150 |

Props are usually drawn at exactly 2x their clip. Walls and floors are stretched further,
because they are tiling fills rather than objects. There is no global scale factor anywhere in
the code: every entity carries its own bounds, and the clip is whatever region of the sheet it
points at. That is a level-authoring convention, not an engine rule.

## Sprite sheets

Each level has exactly two textures, named after it:

- `assets/level_items/<level>_level.png` — every prop, wall, floor and character in that level
- `assets/level_items/<level>_light.png` — every light shape used in that level

`assets/levels/<level>_items.txt` is the clip map: two dictionaries of name to rectangle, one
for props and one for lights. `Assets.loadLevel` walks those rectangles and builds a
`TextureRegion` per name. An entity in the level file and a rectangle in the clip map are
matched by key, so a prop named `door` draws the region named `door`.

Sheet sizes are small and hand-packed, not generated: 256x256 or 512x256 for props, and 60x60
up to 300x150 for lights. The house levels share the same 512x256 layout because they are the
same house redrawn four times.

`assets/stuff/pack.json` is a libGDX texture-packer settings file with `filterMin` and
`filterMag` set to `Nearest`. No atlas is actually produced from it at build time; it is the
record of the intended settings, and nearest filtering is what keeps the art crisp when the
320x180 canvas is scaled to a 1080p screen.

### Shared sheets

| File | Size | Contents |
| --- | --- | --- |
| `stuff/items.png` | 256x256 | Both player characters. Rows at y=0 and y=112 are the eight-frame walk cycles; rows at y=56 and y=168 are the two-frame idles. Each frame 16x56 |
| `stuff/light.png` | 60x60 | The player's lamp halo, the one light that follows you |
| `stuff/inventory.png` | 125x25 | Five 25x25 item icons: note, key, light bulb, crowbar, map |
| `stuff/UI.png` | 64x64 | Two nine-patch frames at (0,0) and (10,0), three one-pixel tint swatches, and the two 30x20 flags |
| `stuff/background.png` | 160x180 | Main menu. Top half is the scrolling diffuse, bottom half is its light map |
| `stuff/catinbank.png` | 1920x1080 | Studio logo, full screen |
| `stuff/brushed.png` | 384x336 | Background plate for the developer editor panel only |
| `stuff/uiskin.png` | 256x128 | scene2d skin for the editor, with `uiskin.json` and `uiskin.atlas` |

The two player characters share one silhouette and differ only in clothing: the first wears
jeans and a light shirt, the second a dark suit. Carrying the light bulb swaps between them,
and swapping also swaps the whole room, so the two bodies read as the same person in two
versions of the world.

The inventory icon a script passes to `addItem(name, function, x, y)` is a coordinate into
`inventory.png`: key at 25, light bulb at 50, crowbar at 75, map at 100. Notes always draw the
icon at 0.

## Lighting

There are two shaders and they are short enough to read in full.

`shaders/defaultShader.glsl` is an ordinary textured sprite shader. It draws the light pass.

`shaders/pixelShader.glsl` is the whole lighting model:

```glsl
vec3 ambient = ambientColor.rgb * ambientColor.a;
vec3 intensity = ambient + light.rgb;
vec3 finalColor = diffuseColor.rgb * intensity;
```

The light map is sampled in screen space, not in texture space, so a light shape sits where it
is drawn on screen regardless of what is under it.

That means a scene's look is set by three numbers and a handful of blobs:

- `color` — a `Vector3` ambient tint
- `intensity` — how much of that tint reaches the picture
- the visible lights in the scene, drawn from the level's light sheet

Light art is deliberately not pixel art. Open `hday1_light.png` and it is four soft blurred
shapes, reused by name across the whole house: a grey trapezoid for a room's ceiling fill, a
warm diagonal streak for light through a window, a blue blob for television glow, and a
yellow-green disc for the sun. They are blurred because they are multiplied into the scene
rather than drawn on it. The whole house needs only eight light rectangles; the night level
adds three more for the figure in the living room.

Typical settings across the game:

| Mood | color | intensity | Used by |
| --- | --- | --- | --- |
| Full daylight | 1, 1, 1 | 1.0 | `hpast`, exteriors, credits, title cards |
| Overcast interior | 0.9, 0.9, 0.9 | 0.3–0.5 | House bathrooms and store rooms |
| Cold night | 0.3, 0.3, 0.7 | 0.7–0.9 | Intro corridor, the night level, the club's back room |
| Cave green | 0.5, 0.7, 0.5 | 0.6 | The catacombs |
| Dream yellow | 0.7, 0.7, 0.3 | 0.6 | The other side of the light bulb |
| Near-black | 0.3, 0.3, 0.3 | 0.3 | The bad ending |
| Black | 0, 0, 0 | 0.0 | The psychologist scene, which is text on nothing |

Scripts switch mood by toggling lights on and off, not by changing these numbers: `lights`,
`lightsKitchen`, `useLamp`, `useClicker` and `offTv` all just flip a light's visibility and
play a click.

`Level.lightEnabled` turns the entire pipeline off. When it is false, the light pass is skipped
and the post processor is disabled, so the screen shows raw unlit sprites. That is how the
intro title cards, the day-number cards and the good ending render flat and clean.

## The CRT pass

`third-party/postprocessing` is the `com.bitfire` library, vendored from upstream because it
was published to a dead Google Code project and never reached Maven Central. The shaders it
uses were always in `assets/shaders/`, not inside the library, so the effect is exactly the one
the game shipped with.

Three screens build the same effect: the logo, the main menu and the world renderer.

```java
int effects = Effect.TweakContrast.v | Effect.PhosphorVibrance.v
            | Effect.Scanlines.v | Effect.Tint.v;
crt = new CrtMonitor(w, h, false, false, RgbMode.ChromaticAberrations, effects);
```

The combine pass is set to take nothing from source 1 and everything from source 2, so the
filtered image fully replaces the raw one rather than blending with it.

`crt.setTime(t)` is fed the accumulated frame time, which is what animates the scanline roll.
It is only advanced while the level has lighting enabled, so the flat title cards are also
still cards.

## Fonts

Three, all loaded in `Assets`.

| Font | Size | Where |
| --- | --- | --- |
| `stuff/Munro_en.ttf` | 10 | All English in-game text |
| `stuff/ark-pixel-10px-proportional-latin.ttf` | 10 | All Russian in-game text |
| `stuff/Roboto-Black.ttf` | 200 | Only the main menu title and byline |

Munro is a pixel face with no Cyrillic. In 2015 that was worked around with `stuff/Munro_ru.ttf`,
a font whose Latin slots hold Cyrillic outlines, driven by Russian typed on a ЙЦУКЕН keyboard
with the US layout active. The bundles now hold real Cyrillic and Russian uses Ark Pixel, which
is drawn on the same 10-pixel grid and whose cap height sits within a quarter pixel of Munro's,
so both languages render at one size. See [LOCALIZATION.md](../LOCALIZATION.md).

`Munro_ru.ttf` is still in the repository as the record of the mapping and is no longer loaded.
`stuff/sans13.fnt` and `sans13.png` belong to the editor skin.

Text colour is a near-white `0.95, 0.95, 0.95`. The highlight colour for a selected menu entry
is set as `(0, 2, 1, 1)` — green over-driven past one, which clamps to a bright cyan-green.

## Interface

All chrome comes out of `stuff/UI.png`:

- two nine-patches, 10x10 with 2-pixel edges, one plain and one highlighted, used for every
  framed box in the game
- three single-pixel swatches sampled as tints: a blue for selection bars, a white for the
  strike-through on a completed task, a black for the note-reading overlay
- two 30x20 flags for the language picker

Layout is hard-coded in `WorldRenderer` in virtual pixels. The subtitle box is a 288x35 frame
at the top; the Press X prompt is a 70x20 frame centred at the bottom; the inventory is one
290x131 frame with three tab frames above it.

## Credits and title cards

Text that has to look like art rather than like dialogue is drawn as art. The intro's three
title cards, the day-number cards and the credits frames are all sprite regions on the level
sheets, and each has an English and a Russian variant selected by the script:

```javascript
world.getLevel().getScene().getEntity(world.getLanguage() ? "day1" : "rday1 ").setVisible(true);
```

That is why `intro_level.png` contains words, and why entity keys like `nyctophilia_r`,
`presents_r`, `game_r` and `rday2` exist. It also means new languages need new art, not just a
new bundle.

## Asset inventory

217 files, 105 MB, all recovered from the shipped Steam build.

| Group | Count |
| --- | --- |
| Level sprite and light sheets | 28 |
| Level files and clip maps | 30 |
| Scripts | 14 |
| Shaders | 18 |
| Music tracks | 20 |
| Sound effects | 26 |
| Footstep samples | 25 |
| Localization bundles | 32 |
| Shared art, fonts, skin | the rest |

Music is 20 looping MP3 tracks, one per mood, cross-faded by `MusicFader` and named in the
scripts by title: `Garden`, `Home`, `Kitchen`, `Cave`, `Night`, `Devil`, `Misanthropy`,
`Purgatory`, `Day`, `Last Dream`, `First Dream`, `In The End`, `Trailer`,
`Nyctophilia - Shattered Dreams`, and five more. The folder also carries the album art the
soundtrack shipped with.

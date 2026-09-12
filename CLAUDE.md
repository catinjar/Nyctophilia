# CLAUDE.md

Nyctophilia is a 2D pixel-art psychological thriller, released on Steam in 2015, written in
Java against libGDX. The project files were lost; everything here was recovered out of the
shipped build and then brought forward to a current JVM. Treat it as a restoration project:
the game is finished and shipped, and the value of this repository is that it still runs and
still matches what players bought.

## Commands

Build the single self-contained jar (`build/libs/nyctophilia-1.1.0-all.jar`):

```bash
./gradlew fatJar
```

Run from source. Starts fullscreen; `Escape` opens the pause menu:

```bash
./gradlew run
```

Verify a change. Boots the real game class windowed, checks level deserialization, the script
engine, the localization bundles and the editor skin, writes screenshots to
`build/smoke-shots/`, then exits. Needs a display:

```bash
./gradlew smokeTest
```

There is no unit-test suite. `smokeTest` is the whole safety net, so run it after any change
to source, assets, or the build.

## Layout

| Path | Contents |
| --- | --- |
| `src/ru/catinbank/framework/` | Reusable engine pieces: entities, loaders, faders, the script bridge |
| `src/ru/catinbank/nyctophilia/` | The game itself: screens, world, renderer, assets, inventory |
| `src/ru/catinbank/nyctophilia/desktop/` | Launcher and LWJGL memory-backend selection |
| `assets/levels/` | 15 levels as Gson JSON, plus a `_items` clip map each |
| `assets/scripts/` | 14 JavaScript files, 666 functions, the entire plot |
| `assets/level_items/` | One sprite sheet and one light sheet per level |
| `assets/bundle_*_*.properties` | 15 localization bundles in English and Russian |
| `assets/stuff/`, `shaders/`, `music/`, `sounds/`, `steps/` | Shared art, GLSL, audio |
| `third-party/postprocessing/` | The CRT effect library, upstream source, never published to a repo |
| `tools/smoke/`, `tools/i18n/` | Build verification, and the record of the Cyrillic conversion |

Player progress lives in `~/.prefs/nyctophilia`, not in this directory.

## Architecture in brief

`Nyctophilia` is a libGDX `Game` that hands off between four screens: logo, language picker,
main menu, and `GameScreen`. `GameScreen` owns a `World` and a `WorldRenderer`.

A `Level` is a map of named `Scene`s; a `Scene` is a flat side-scrolling room holding `Entity`
objects and `Light` objects. Nothing about a level is compiled in. The geometry is JSON, the
sprite regions are a clip map into one sheet, and every behaviour is the name of a JavaScript
function stored on the entity. Walking next to a usable entity selects it; pressing `X` calls
that function name through Rhino.

Scripts drive everything: dialogue, scene changes, level changes, item grants, music, fades.
They run on their own thread and mutate the world while the render thread reads it. That is
the original design, not an accident, and `thread.sleep` inside a script is how cutscenes are
timed.

Read [docs/technical.md](docs/technical.md) before changing any of this.

## Rules for working here

- **Assets are irreplaceable.** They are the only surviving copies, recovered from the Steam
  build. `.gitattributes` stores them byte for byte with no end-of-line translation. Do not
  reformat, re-encode, or "tidy" a level file, bundle, shader, or image.
- **The save format is a compatibility surface.** Levels, clip maps and inventories are Gson
  JSON over plain fields, and a saved game is that JSON inside `~/.prefs/nyctophilia`. Adding,
  renaming, or retyping a field in `Level`, `Scene`, `Entity`, `Light`, `ClipManager`, `Item`,
  `Note`, `Goal` or `Inventory` breaks 2015 saves. Gson 2.11 reads them today; keep it that way.
- **Do not rewrite the script bridge.** `assets/scripts/` is 666 functions of shipped plot. Any
  change to how `ScriptLauncher` binds `world` or `thread` risks all of it at once.
- **Prefer the smallest change that works.** Three documents record why the current shape is
  the current shape: [RESURRECTION.md](RESURRECTION.md), [UPGRADE.md](UPGRADE.md),
  [LOCALIZATION.md](LOCALIZATION.md). Read the relevant one before undoing something.
- **Check, do not assume, when touching dependencies.** Both the libGDX and the LWJGL moves
  were done by resolving old bytecode against the new library rather than by fixing whatever
  the compiler complained about first. That is the standard here.

## Code style

The 2015 sources use tabs, Allman braces, one-line getters and setters, and no Javadoc. New
code in `src/` should match. Comments added during the restoration explain why something
changed since 2015 and are worth keeping. Package names are lowercase `ru.catinbank.*`.

## Knowledge base

| Document | Covers |
| --- | --- |
| [docs/technical.md](docs/technical.md) | Engine, rendering, scripting, save format, known quirks |
| [docs/story.md](docs/story.md) | Plot, characters, chronology, every text source |
| [docs/art.md](docs/art.md) | Sprite sheets, lighting, the CRT pass, fonts, palette |
| [docs/game-design.md](docs/game-design.md) | Verbs, inventory, goals, pacing, the two endings |
| [docs/levels.md](docs/levels.md) | Level file format, scene graphs, the cave maze, editor |

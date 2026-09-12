# Nyctophilia

2D psychological thriller made with Java and libgdx
https://store.steampowered.com/app/402890/Nyctophilia/

Originally built in 2015 against Java 7 and libGDX 1.2.0. The project files and
assets were lost; everything here was recovered from the shipped Steam build. See
[RESURRECTION.md](RESURRECTION.md) for what was missing and how it came back,
[UPGRADE.md](UPGRADE.md) for the move to a current libGDX, and
[LOCALIZATION.md](LOCALIZATION.md) for how the Russian script was stored.

[docs/](docs/) describes the game itself: how it is
[built](docs/technical.md), what it
[says](docs/story.md), how it
[looks](docs/art.md), how it
[plays](docs/game-design.md), and how its
[levels](docs/levels.md) are put together.

## Requirements

A JDK 21 or newer. Nothing else — the Gradle wrapper fetches its own Gradle and
every dependency comes from Maven Central.

## Build

```bash
./gradlew fatJar
```

Produces `build/libs/nyctophilia-1.1.0-all.jar`, a single self-contained file
holding the game, its assets and native libraries for Windows, Linux and macOS,
Apple Silicon included. Run it with `java -jar`, the same way the Steam build ran.

## Run from source

```bash
./gradlew run
```

The game starts fullscreen. Press `Escape` to leave it.

## Verify a build

```bash
./gradlew smokeTest
```

Boots the real game class in a window, checks that levels deserialize, the script
engine resolves, the localization bundles load, the editor skin still builds its
widgets and the renderer produces frames, writes screenshots to
`build/smoke-shots/`, then exits. Needs a display.

## Layout

| Path | Contents |
| --- | --- |
| `src/` | Game and framework sources, package `ru.catinbank` |
| `docs/` | Knowledge base: technical, story, art, design, levels |
| `assets/` | Levels, scripts, shaders, textures, fonts, audio, localization |
| `third-party/` | The CRT post-processing library, never published to a repository |
| `tools/smoke/` | Build verification harness |
| `tools/i18n/` | The ЙЦУКЕН-to-Cyrillic conversion, kept as the record of the mapping |
| `Build/` | The 2015 Steam build, kept for reference, not tracked in git |

Player progress lives in `~/.prefs/nyctophilia`, not in this directory.

# Nyctophilia

2D psychological thriller made with Java and libgdx
https://store.steampowered.com/app/402890/Nyctophilia/

Originally built in 2015 against Java 7. The project files and assets were lost;
everything here was recovered from the shipped Steam build. See
[RESURRECTION.md](RESURRECTION.md) for what was missing and how it came back.

## Requirements

A JDK 21 or newer. Nothing else — the Gradle wrapper fetches its own Gradle, and
all dependencies come from Maven Central except one vendored jar in `libs/`.

## Build

```bash
./gradlew fatJar
```

Produces `build/libs/nyctophilia-1.1.0-all.jar`, a single self-contained file
holding the game, its assets and native libraries for Windows, Linux and macOS.
Run it with `java -jar`, the same way the Steam build ran.

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
engine resolves, the localization bundles load and the renderer produces frames,
writes screenshots to `build/smoke-shots/`, then exits. Needs a display.

## Layout

| Path | Contents |
| --- | --- |
| `src/` | Game and framework sources, package `ru.catinbank` |
| `assets/` | Levels, scripts, shaders, textures, fonts, audio, localization |
| `libs/` | The one dependency that was never published to a repository |
| `tools/smoke/` | Build verification harness |
| `Build/` | The 2015 Steam build, kept for reference, not tracked in git |

Player progress lives in `~/.prefs/nyctophilia`, not in this directory.
